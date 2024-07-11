import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import { useAuth } from "../../context/authContext";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = () => {
  const params = useLocalSearchParams(); // Use useLocalSearchParams to get the params
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);

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
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
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
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatScreen;

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import io from "socket.io-client";
// import { useAuth } from "../../context/authContext";
// import { useLocalSearchParams } from "expo-router";

// const ChatScreen = () => {
//   const params = useLocalSearchParams(); // Use useLocalSearchParams to get the params
//   const { userId1, userId2 } = params; // Extract userId1 and userId2 from params
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const socket = useRef(null);

//   useEffect(() => {
//     if (user && user._id && !socket.current) {
//       socket.current = io("http://192.168.0.236:3000", {
//         query: { userId: user._id }, // Pass the user ID here
//       });
//       console.log("Attempting to connect to socket...");

//       socket.current.on("connect", () => {
//         console.log("Connected to socket");
//       });

//       socket.current.on("connect_error", (error) => {
//         console.error("Connection error:", error);
//       });

//       socket.current.on("private message", (msg) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//         console.log("Received private message:", msg);
//       });

//       socket.current.on("disconnect", (reason) => {
//         console.log(`Disconnected from socket: ${reason}`);
//       });
//     }
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, [user._id]); // Ensure this useEffect runs only once by passing user._id as a dependency

//   const fetchMessages = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `http://192.168.0.236:3000/message/${userId1}/${userId2}`
//       );

//       // Log the response status and headers
//       console.log("Response status:", response.status);
//       console.log("Response headers:", response.headers);

//       // Log the response to inspect it
//       const text = await response.text();
//       console.log("Server response:", text);

//       // Parse the response as JSON
//       const data = JSON.parse(text);
//       console.log("Parsed data:", data);

//       setMessages(data.messages);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   }, [userId1, userId2]);

//   useEffect(() => {
//     if (userId1 && userId2) {
//       fetchMessages();
//     }
//   }, [userId1, userId2, fetchMessages]);

//   const sendMessage = () => {
//     if (message && socket.current) {
//       const newMessage = {
//         from: { _id: user._id, username: user.username },
//         message,
//         timestamp: new Date().toISOString(),
//       };

//       // Add the message to the local state immediately
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       console.log(`Sending message from ${user._id} to ${userId2}: ${message}`);
//       socket.current.emit("private message", {
//         from: user._id,
//         to: userId2, // Use the second user ID
//         message,
//       });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     console.log("messages", messages);
//   }, [messages]);

//   const renderItem = ({ item }) => {
//     const isSentByCurrentUser = item.from._id === user._id;
//     return (
//       <View
//         style={[
//           styles.message,
//           isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
//         ]}
//       >
//         <Text>
//           {item.from?.username ? `${item.from.username}: ` : ""}
//           {item.message}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//       />
//       <TextInput
//         value={message}
//         onChangeText={setMessage}
//         placeholder="Type a message"
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   message: {
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   sentMessage: {
//     backgroundColor: "#d1e7ff", // Light blue for sent messages
//     alignSelf: "flex-end",
//   },
//   receivedMessage: {
//     backgroundColor: "#fff3cd", // Light yellow for received messages
//     alignSelf: "flex-start",
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 10,
//   },
// });

// export default ChatScreen;
