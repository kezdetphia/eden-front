import React, { useEffect, useState, useRef } from "react";
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
  const owner = params.owner ? JSON.parse(params.owner) : null; // Deserialize the owner object
  console.log("Received params:", JSON.stringify(params, null, 2));
  console.log("Deserialized owner:", owner);
  const ownerId = owner._id;
  console.log("owner iddddd", ownerId);
  const { user } = useAuth();
  console.log("user doc", user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
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
  }, [user._id]); // Ensure this useEffect runs only once by passing an empty dependency array

  const sendMessage = () => {
    const recipientUserId = ownerId; // Replace with the actual recipient user ID
    if (message && socket.current) {
      socket.current.emit("private message", {
        from: user._id,
        to: recipientUserId,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.message}</Text>
        )}
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
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatScreen;

// ----this works perfectly
// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import io from "socket.io-client";

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const socket = useRef(null);

//   useEffect(() => {
//     if (!socket.current) {
//       socket.current = io("http://192.168.0.236:3000"); // Use your actual machine IP address
//       console.log("Attempting to connect to socket...");

//       socket.current.on("connect", () => {
//         console.log("Connected to socket");
//       });

//       socket.current.on("connect_error", (error) => {
//         console.error("Connection error:", error);
//       });

//       socket.current.on("chat message", (msg) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//         console.log("Received message:", msg);
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
//   }, []); // Ensure this useEffect runs only once by passing an empty dependency array

//   const sendMessage = () => {
//     if (message && socket.current) {
//       socket.current.emit("chat message", message);
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     console.log("messages", messages);
//   }, [messages]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
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
//     backgroundColor: "#f1f1f1",
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 10,
//   },
// });

// export default ChatScreen;

// ----this works perfectly
