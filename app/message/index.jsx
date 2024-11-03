import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { io } from "socket.io-client";
import Constants from "expo-constants";
import { format, isToday, isThisWeek } from "date-fns";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import defaultAvatar from "../../assets/images/avatar.png";
import CustomText from "../../components/customText";

const { EXPO_API_URL } = Constants.expoConfig.extra;

const Messages = () => {
  const { paddingSides } = sizes;
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const userId = user?._id;
  const router = useRouter();
  const socketRef = useRef(null);

  // Fetch all conversations for the user
  const getMyConvos = useCallback(async () => {
    try {
      const res = await fetch(
        `${EXPO_API_URL}/message/conversation/user/${userId}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.log(
          "Error fetching conversations:",
          errorData.message || "Unknown error"
        );
        return;
      }
      const data = await res.json();
      console.log("Fetched Conversations:", data); // Log fetched data
      setConvos(data);
      checkLastMessages(data); // Check last messages after fetching conversations
    } catch (err) {
      console.log("getMyConvos error", err.message);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getMyConvos();
    }
  }, [userId, getMyConvos]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (userId && !socketRef.current) {
      socketRef.current = io(EXPO_API_URL, {
        query: { userId },
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to socket");
      });

      socketRef.current.on("newMessage", (newMessage) => {
        console.log("Received newMessage:", newMessage);
        updateConvosWithNewMessage(newMessage);
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log(`Disconnected from socket: ${reason}`);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId]);

  // Update conversations when a new message is received
  const updateConvosWithNewMessage = (newMessage) => {
    // Ignore messages sent by the current user to prevent duplication
    if (newMessage.from === userId) {
      console.log("Ignored newMessage event from self:", newMessage);
      return;
    }

    setConvos((prevConvos) => {
      const updatedConvos = prevConvos.map((convo) => {
        if (convo._id === newMessage.conversationId) {
          return {
            ...convo,
            lastMessage: newMessage, // Update with the new lastMessage
            messages: [...(convo.messages || []), newMessage], // Append new message
          };
        }
        return convo;
      });
      checkLastMessages(updatedConvos);
      return updatedConvos;
    });
  };

  // Extract the last message from each conversation
  const checkLastMessages = useCallback(
    (convosToCheck) => {
      if (Array.isArray(convosToCheck) && convosToCheck.length > 0) {
        const lastMessages = convosToCheck.map((convo) => {
          const messages = convo.messages || [];
          const lastMessage = messages[messages.length - 1] || {};

          // Find the other participant in the conversation
          const otherParticipant = convo.participants.find(
            (participant) => participant._id !== userId
          );

          // Debugging logs
          console.log("Conversations data (convos):", convos);
          console.log("MESSAGESSS", messages);
          console.log("Processing convo:", convo);
          console.log("Other participant found:", otherParticipant);

          return {
            from: lastMessage.from || "",
            to: otherParticipant?._id || "", // Ensure recipientId is correctly set here
            message: lastMessage.message || "No messages yet.",
            timestamp: lastMessage.timestamp || "",
            productImageUrl: convo.productImageUrl || defaultAvatar,
            toUsername: otherParticipant?.username || "Unknown",
            productId: convo.productId, // Add productId
            conversationId: convo._id, // Add conversationId
          };
        });
        setLastMessages(lastMessages);
        console.log("Last Messages:", lastMessages);
      } else {
        console.log("convos is empty or undefined");
      }
    },
    [userId]
  );

  useEffect(() => {
    if (convos.length > 0) {
      checkLastMessages(convos);
    }
  }, [convos, checkLastMessages]);

  // Handle clicking on a conversation
  const onClickOnConversation = async (
    recipientId,
    productId,
    conversationId
  ) => {
    // Log the received parameters to debug
    console.log("onClickOnConversation params:", {
      recipientId,
      productId,
      conversationId,
    });

    // Ensure recipientId and productId are defined
    if (!recipientId || !productId) {
      console.error("Recipient ID or Product ID is undefined. Cannot proceed.");
      return;
    }

    // Find the recipient user in the conversations list
    const recipientUser = convos
      .flatMap((convo) => convo.participants)
      .find((participant) => participant._id === recipientId);

    // Find the conversation that matches both the recipient and the product ID
    const conversation = convos.find(
      (convo) =>
        convo.participants.some(
          (participant) => participant._id === recipientId
        ) && convo.productId?.toString() === productId.toString()
    );

    // If the conversation doesn't exist, log an error and exit the function
    if (!conversation) {
      console.error(
        `No conversation found for recipient ID: ${recipientId} and product ID: ${productId}`
      );
      return;
    }

    console.log(
      `Navigating to chat with conversation ID: ${conversation._id} for product ${productId}`
    );

    // Navigate to ChatScreen, passing the required parameters
    router.navigate({
      pathname: `/message/chat`,
      params: {
        paramDetails: JSON.stringify({
          ownerId: recipientUser?._id || "",
          ownerUsername: recipientUser?.username || "Unknown",
          productImage: encodeURIComponent(conversation.productImageUrl || ""),
          conversationId: conversation._id || "",
          productId: productId, // Pass productId to identify specific product conversation
        }),
        previousScreen: "notification",
      },
    });
  };

  // Format timestamp for display
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isThisWeek(date)) {
      return format(date, "EEEE");
    } else {
      return format(date, "MMMM d");
    }
  };

  // Render each conversation item
  const renderItem = ({ item }) => {
    // Log to verify the data structure of item
    console.log("Render item data:", item);

    if (!item) {
      console.error("Item is undefined", item);
      return null;
    }
    return (
      <Pressable
        onPress={() =>
          onClickOnConversation(item.to, item.productId, item.conversationId)
        }
      >
        <View className="pt-5 ">
          <View
            className="flex-row bg-white rounded-xl shadow-sm "
            style={{ padding: ms(15) }}
          >
            <Image
              source={
                item.productImageUrl
                  ? { uri: item.productImageUrl }
                  : defaultAvatar
              }
              style={{
                // width: xs(50),
                width: 50,
                // height: ys(50),
                height: 50,
                borderRadius: 99,
                marginRight: xs(paddingSides),
              }}
            />
            <View className="flex-col">
              <CustomText b200 style={{ paddingTop: ys(2) }}>
                {item.toUsername}
              </CustomText>

              <View className="flex-row items-center">
                <CustomText b200 style={{ paddingTop: ys(2) }}>
                  {item.message.length > 25
                    ? item.message.substring(0, 25) + "..."
                    : item.message}
                </CustomText>
                <CustomText
                  b200
                  style={{ paddingTop: ys(2), paddingLeft: xs(3) }}
                >
                  {formatDate(item.timestamp)}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={lastMessages}
        contentContainerStyle={
          {
            // paddingHorizontal: xs(paddingSides),
          }
        }
        keyExtractor={(item) =>
          `${item.conversationId}-${item.to}-${item.timestamp}`
        }
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  sentMessage: {
    backgroundColor: "#d1e7ff",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#fff3cd",
    alignSelf: "flex-start",
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.2,
    marginVertical: 10,
    fontFamily: "jakarta",
    fontSize: ms(14),
    padding: xs(10),
    letterSpacing: 0.3,
    paddingRight: xs(40),
  },
});

export default Messages;
