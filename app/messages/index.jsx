import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import io from "socket.io-client";
import { useAuth } from "../../context/authContext";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";

const ChatScreen = () => {
  const { paddingSides, paddingTop, title, subtitle, xl, xxl } = sizes;
  const params = useLocalSearchParams(); // Use useLocalSearchParams to get the params
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const router = useRouter();
  const route = useRoute();
  console.log("route", route);
  console.log("route params", route.params);

  const owner = params.owner ? JSON.parse(params.owner) : null; // Deserialize the owner object

  const recipient = owner;

  useEffect(() => {
    if (user && user._id && !socket.current) {
      socket.current = io("http://192.168.0.236:3000", {
        query: { userId: user._id }, // Pass the user ID here
      });
      console.log("Attempting to connect to socket...");

      socket.current.on("connect", () => {
        console.log("Connected to socket");
      });

      socket.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.current.on("private message", (msg) => {
        // Ensure the 'from' field is populated
        if (!msg.from) {
          msg.from = { _id: recipient._id, username: recipient.username };
        }
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log("Received private message:", msg);
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
  }, [user._id, recipient?._id]); // Ensure this useEffect runs only once by passing user._id and recipient._id as dependencies

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(
        `http://192.168.0.236:3000/message/${user?._id}/${recipient?._id}`
      );

      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Log the response to inspect it
      const text = await response.text();
      console.log("Server response:", text);

      // Parse the response as JSON
      const data = JSON.parse(text);
      console.log("Parsed data:", data);

      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [user._id, recipient?._id]);

  useEffect(() => {
    if (user && user._id && recipient && recipient?._id) {
      fetchMessages();
    }
  }, [user._id, recipient?._id, fetchMessages]);

  const sendMessage = () => {
    if (message && recipient && socket.current) {
      const newMessage = {
        from: { _id: user._id, username: user.username },
        message,
        timestamp: new Date().toISOString(),
      };

      // Add the message to the local state immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      console.log(
        `Sending message from ${user._id} to ${recipient._id}: ${message}`
      );
      socket.current.emit("private message", {
        from: user._id,
        to: recipient._id, // Use the dynamic recipient ID
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

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
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Blackish transparent background
              borderRadius: ms(24), // Make the background fully rounded
              width: ms(30), // Set width to make it a circle
              height: ms(30), // Set height to make it a circle
              justifyContent: "center", // Center the icon vertically
              alignItems: "center", // Center the icon horizontally
            }}
          >
            <AntDesign name="arrowleft" size={ms(18)} color="white" />
          </View>
        </Pressable>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={{ width: xs(30), height: ys(30), borderRadius: 25 }}
        />
      </View>
      <FlatList
        style={{ paddingTop: ys(paddingTop / 2) }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
      {/* <Button title="Send" onPress={sendMessage} /> */}
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
    // color: "#69D94E",
    padding: xs(10),
    letterSpacing: 0.3,

    paddingRight: xs(40), // Add padding to the right to make space for the icon
  },
});

export default ChatScreen;
