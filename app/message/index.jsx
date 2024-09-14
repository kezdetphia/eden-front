import React, { useEffect, useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
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
  const { paddingSides, paddingTop } = sizes;
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const userId = user?._id;
  const router = useRouter();
  const socket = io("http://192.168.0.225", {
    query: { userId },
  });

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
      processConversations(data, userId);
      setConvos(data);
    } catch (err) {
      console.log("getMyConvos error", err.message);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getMyConvos();
    }
  }, [userId, getMyConvos]);

  useFocusEffect(
    useCallback(() => {
      socket.on("newMessage", (newMessage) => {
        updateConvosWithNewMessage(newMessage);
      });
      return () => {
        socket.off("newMessage");
      };
    }, [socket])
  );

  const updateConvosWithNewMessage = (newMessage) => {
    setConvos((prevConvos) => {
      const updatedConvos = prevConvos.map((convo) => {
        if (convo._id === newMessage.conversationId) {
          return {
            ...convo,
            messages: [...convo.messages, newMessage],
          };
        }
        return convo;
      });
      checkLastMessages(updatedConvos);
      return updatedConvos;
    });
  };

  const checkLastMessages = useCallback(
    (convosToCheck = convos) => {
      if (Array.isArray(convosToCheck) && convosToCheck.length > 0) {
        const lastMessages = convosToCheck.map((convo) => {
          const lastMessage = convo.messages[convo.messages.length - 1];
          const otherParticipant = convo.participants.find(
            (participant) => participant._id !== userId
          );

          return {
            from: lastMessage.from,
            to: otherParticipant?._id || "",
            message: lastMessage.message || "",
            timestamp: lastMessage.timestamp || "",
            productImageUrl: convo.productImageUrl || defaultAvatar, // Use productImageUrl
            toUsername: otherParticipant?.username || "Unknown",
          };
        });
        setLastMessages(lastMessages);
      } else {
        console.log("convos is empty or undefined");
      }
    },
    [convos, userId]
  );

  useEffect(() => {
    checkLastMessages();
  }, [convos, checkLastMessages]);

  const onClickOnConversation = async (recepientId) => {
    const recepientUser = convos
      .flatMap((convo) => convo.participants)
      .find((participant) => participant._id === recepientId);
    const conversation = convos.find((convo) =>
      convo.participants.some((participant) => participant._id === recepientId)
    );
    if (recepientUser && conversation) {
      router.navigate({
        pathname: `/message/chat`,
        params: {
          paramDetails: JSON.stringify({
            ownerId: recepientUser?._id,
            ownerUsername: recepientUser?.username,
            productImage: encodeURIComponent(conversation.productImageUrl), // Pass encoded productImageUrl
          }),
          previousScreen: "notification",
        },
      });
    }
  };

  const processConversations = (conversations, currentUserId) => {
    conversations.forEach((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id !== currentUserId
      );
      const otherParticipantId = otherParticipant ? otherParticipant._id : null;

      conversation.messages.forEach((message) => {
        const sender = conversation.participants.find(
          (participant) => participant._id === message.from
        );

        if (sender) {
          // console.log(`Message from ${sender.username}: ${message.message}`);
          // console.log(`Sender Avatar: ${sender.avatar}`);
        } else {
          console
            .log
            // `Sender with ID ${message.from} not found among participants.`
            ();
        }
      });
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) {
      console.log("timestamp", typeof timestamp);
      return (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "blue",
          }}
        />
      );
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

  const renderItem = ({ item }) => {
    if (!item || !item.message) {
      console.error("Item or item.message is undefined", item);
      return null;
    }
    return (
      <Pressable onPress={() => onClickOnConversation(item.to)}>
        <View className="pt-5 ">
          <View
            className="flex-row bg-white rounded-xl shadow-sm"
            style={{ padding: ms(15) }}
          >
            <Image
              source={
                typeof item.productImageUrl === "string" &&
                item.productImageUrl.trim() !== ""
                  ? { uri: item.productImageUrl }
                  : defaultAvatar
              }
              style={{
                width: xs(30),
                height: ys(30),
                borderRadius: 25,
                marginRight: xs(paddingSides),
              }}
            />
            <View className="flex-col">
              <CustomText b200 style={{ paddingTop: ys(2) }}>
                {item.toUsername}
              </CustomText>

              <View className={`flex-row items-center  `}>
                <CustomText b200 style={{ paddingTop: ys(2) }}>
                  {item.message.length > 25
                    ? item.message.substring(0, 28) + "..."
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
    <View className="flex-1">
      <SafeAreaView />
      <FlatList
        data={lastMessages}
        contentContainerStyle={{
          paddingHorizontal: xs(paddingSides),
          // paddingTop: ys(paddingTop),
        }}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Messages;
