import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import io from "socket.io-client";
import { useAuth } from "@context/authContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "@constants/sizes";
import { Image } from "expo-image";
import defaultAvatar from "@assets/images/avatar.png";
import { format, isToday, isThisWeek, parseISO } from "date-fns";
import Constants from "expo-constants";
import CustomText from "../../../components/customText";

//TODO: when messages are sent when the user is not in the chat screen, the message is not displayed. need to fix
//Messages display in the right order when in the chat screen but when leave and come back the messages are grouped based on the sender

const ChatScreen = () => {
  const { EXPO_API_URL } = Constants.expoConfig.extra;
  const { paddingTop, xl, xxl } = sizes;
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const router = useRouter();
  const flatListRef = useRef(null);
  const previousScreen = params.previousScreen || null;
  const paramDetails = params.paramDetails
    ? JSON.parse(params.paramDetails)
    : null;
  const productDetails = paramDetails;

  const handleBackPress = () => {
    if (previousScreen === "notification") {
      router.navigate({
        pathname: "/notification",
        params: {
          previousWindow: "chat",
          productIdForImage: productDetails?.productId,
        },
      });
    } else if (previousScreen === "home") {
      router.navigate("home");
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (user && user._id && !socket.current) {
      console.log("url", EXPO_API_URL);
      socket.current = io(EXPO_API_URL, {
        // socket.current = io("http://192.168.0.182:3000", {
        query: { userId: user._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket");
      });

      socket.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.current.on("private message", (msg) => {
        if (!msg.from) {
          msg.from = {
            _id: productDetails?.ownerId,
            username: productDetails?.ownerUsername,
          };
        }
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.current.on("disconnect", (reason) => {
        console.log(`Disconnected from socket: ${reason}`);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user._id, productDetails?.ownerId]);

  const fetchMessagesBetweenTwoUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `${EXPO_API_URL}/message/conversationbetween/${user?._id}/${productDetails?.ownerId}`
      );

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [user._id, productDetails?.ownerId]);

  useEffect(() => {
    if (user && user._id && productDetails && productDetails?.ownerId) {
      fetchMessagesBetweenTwoUsers();
    }
  }, [user._id, productDetails?.ownerId, fetchMessagesBetweenTwoUsers]);

  const sendMessage = useCallback(() => {
    if (message && productDetails && socket.current) {
      const newMessage = {
        from: { _id: user?._id, username: user?.username },
        message,
        timestamp: new Date().toISOString(),
        productImageUrl: encodeURIComponent(productDetails?.productImage), // Encode the product image URL
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.current.emit("private message", {
        from: user?._id,
        to: productDetails?.ownerId,
        message,
        productImageUrl: encodeURIComponent(productDetails?.productImage), // Encode the product image URL
      });
      setMessage("");
    }
  }, [message, productDetails, user?._id, user?.username]);

  useEffect(() => {
    if (flatListRef.current && messages?.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) {
      console.log("timestamp", typeof timestamp);
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

  const renderItem = ({ item }) => {
    const isSentByCurrentUser = item.from._id === user._id;
    return (
      <View
        style={[
          styles.message,
          isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
          { maxWidth: "60%" }, // Limit the width to 60%
        ]}
      >
        <CustomText b200>{item.message}</CustomText>
        <View className="items-end" style={{ paddingTop: ys(1) }}>
          <CustomText
            b100
            xxs
            style={{
              paddingTop: ys(3),
            }}
          >
            {formatDate(item.timestamp)}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: ys(paddingTop * 0.75),
          marginBottom: ys(paddingTop * 0.75),
        }}
      >
        <Pressable
          onPress={handleBackPress}
          style={{ position: "absolute", left: 0 }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: ms(24),
              width: ms(30),
              height: ms(30),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowleft" size={ms(18)} color="white" />
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push(`/sellerprofile/${productDetails?.ownerId}`)
          }
        >
          <Image
            source={
              productDetails?.productImage &&
              productDetails?.productImage.trim() !== ""
                ? { uri: productDetails?.productImage }
                : defaultAvatar
            }
            style={{ width: xs(70), height: ys(30), borderRadius: 50 }}
          />
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ paddingTop: ys(paddingTop / 2) }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onContentSizeChange={() => {
          if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flexDirection: "column", justifyContent: "flex-end" }}
      >
        <View className="" style={{ position: "relative" }}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            style={[styles.input, { marginBottom: ys(10) }]}
          />
          <Feather
            title="Send"
            onPress={sendMessage}
            name="send"
            size={ms(xl)}
            color="#69D94E"
            style={{
              position: "absolute",
              right: xs(16),
              top: "55%",
              transform: [{ translateY: -ms(xxl) / 2 }],
            }}
          />
        </View>
      </KeyboardAvoidingView>
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

export default ChatScreen;
