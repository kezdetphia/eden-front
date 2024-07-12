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
import { useAuth } from "../../context/authContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { Image } from "expo-image";
import defaultAvatar from "../../assets/images/avatar.png";

const ChatScreen = () => {
  const { paddingSides, paddingTop, xl, xxl } = sizes;
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const router = useRouter();
  const flatListRef = useRef(null);

  const owner = params.owner ? JSON.parse(params.owner) : null;
  const recipient = owner;

  useEffect(() => {
    if (user && user._id && !socket.current) {
      socket.current = io("http://192.168.0.236:3000", {
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
          msg.from = { _id: recipient._id, username: recipient.username };
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
  }, [user._id, recipient?._id]);

  const fetchMessagesBetweenTwoUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://192.168.0.236:3000/message/conversationbetween/${user?._id}/${recipient?._id}`
      );

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [user._id, recipient?._id]);

  useEffect(() => {
    if (user && user._id && recipient && recipient._id) {
      fetchMessagesBetweenTwoUsers();
    }
  }, [user._id, recipient._id, fetchMessagesBetweenTwoUsers]);

  const sendMessage = useCallback(() => {
    if (message && recipient && socket.current) {
      const newMessage = {
        from: { _id: user._id, username: user.username },
        message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.current.emit("private message", {
        from: user._id,
        to: recipient._id,
        message,
      });
      setMessage("");
    }
  }, [message, recipient, user._id, user.username]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
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

  const renderItem = ({ item }) => {
    const isSentByCurrentUser = item.from._id === user._id;
    return (
      <View
        style={[
          styles.message,
          isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text>
          {item.from?.username ? `${item.from.username}: ` : ""}
          {item.message}
        </Text>
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
          onPress={() => router.push("/Messenger")}
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
          onPress={() => router.push(`/sellerprofile/${recipient?._id}`)}
        >
          <Image
            source={
              recipient?.avatar && recipient.avatar.trim() !== ""
                ? { uri: recipient.avatar }
                : defaultAvatar
            }
            style={{ width: xs(30), height: ys(30), borderRadius: 25 }}
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
        <View className="bg-grayb rounded-lg" style={{ position: "relative" }}>
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
    padding: 10,
    marginVertical: 10,
    fontFamily: "jakarta",
    fontSize: ms(14),
    color: "#2D2D2D",
    padding: xs(10),
    letterSpacing: 0.3,
    paddingRight: xs(40),
  },
});

export default ChatScreen;
