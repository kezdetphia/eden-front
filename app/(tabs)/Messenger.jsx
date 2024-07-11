import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
const Chatt = () => {
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const userId = user?._id;
  const [recepientId, setRecepientId] = useState(null);
  const [recepientUser, setRecepientUser] = useState(null);

  const router = useRouter();

  // console.log("user here", user);
  useEffect(() => {
    if (userId) {
      getMyConvos();
    }
  }, [userId]);

  const getMyConvos = async () => {
    console.log(" getMyconvos function");
    try {
      const res = await fetch(`http://192.168.0.236:3000/message/${user?._id}`);

      // Check if response is not OK
      if (!res.ok) {
        // Attempt to parse the error message from the response
        const errorData = await res.json();
        console.log(
          "Error fetching conversations:",
          errorData.message || "Unknown error"
        );
        return; // Exit the function early
      }

      // Parse the response data
      const data = await res.json();
      console.log("getMyConvos", data);
      // console.log("This is data from getMyConvos", data);
      setConvos(data);
    } catch (err) {
      // Handle any network or other errors that occur
      console.log("getMyConvos error", err.message);
    }
  };

  const getRecepientUser = async (receipientID) => {
    console.log("getRecepientUser function");
    try {
      const res = await fetch(
        `http://192.168.0.236:3000/api/users/${receipientID}`
      );
      if (!res.ok) {
        console.log("getRecepientUser res not ok");
      }
      const data = await res.json();
      setRecepientUser(data);
      // console.log("RECEPEIENT DATA", data);
    } catch (err) {
      console.log("getRecepientUser error", err);
    }
  };

  const checkLastMessages = () => {
    console.log("checklastMessages function");

    if (Array.isArray(convos) && convos.length > 0) {
      console.log("convos not undefined");
      const lastMessages = convos.map((convo) => {
        const lastMessage = convo.messages[convo.messages.length - 1];
        const otherParticipant = convo.participants.find(
          (participant) => participant !== userId
        );
        return {
          from: lastMessage.from,
          to: otherParticipant,
          message: lastMessage.message,
          timestamp: lastMessage.timestamp,
        };
      });
      setLastMessages(lastMessages);
      console.log("Last Messages", lastMessages);
    } else {
      console.log("convos is empty or undefined");
    }
  };

  useEffect(() => {
    checkLastMessages();
  }, [convos]);

  useEffect(() => {
    if (recepientUser) {
      router.push({
        pathname: `/messages`,
        params: { owner: JSON.stringify(recepientUser) },
      });
      setRecepientId(null);
      setRecepientUser(null);
    }
  }, [recepientUser]);

  const onClickOnConversation = async (recepientID) => {
    await getRecepientUser(recepientID);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{convos?.length}</Text>
      {lastMessages?.map((lastMessage, index) => (
        <Pressable
          key={lastMessage.timestamp} // Ensure each child has a unique key
          onPress={() => onClickOnConversation(lastMessage.to)}
          // onPress={
          //   () => setRecepientId(lastMessage.from)
          //   router.push({
          //     pathname: `/messages`,
          //     params: { owner: JSON.stringify(lastMessage) },
          //   })
          // }
        >
          <View className="py-20">
            <Text>From: {lastMessage.from}</Text>
            <Text>Message: {lastMessage.message}</Text>
            <Text>timestamp: {lastMessage.timestamp}</Text>
            <Text>to: {lastMessage.to}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default Chatt;

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
//   const owner = params.owner ? JSON.parse(params.owner) : null; // Deserialize the owner object
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
//         // Ensure the 'from' field is populated
//         if (!msg.from) {
//           msg.from = { _id: owner._id, username: owner.username };
//         }
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
//         `http://192.168.0.236:3000/message/${user._id}/${owner._id}`
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
//   }, [user._id, owner._id]);

//   useEffect(() => {
//     if (user && user._id && owner && owner._id) {
//       fetchMessages();
//     }
//   }, [user._id, owner._id, fetchMessages]);

//   const sendMessage = () => {
//     if (message && owner && socket.current) {
//       const newMessage = {
//         from: { _id: user._id, username: user.username },
//         message,
//         timestamp: new Date().toISOString(),
//       };

//       // Add the message to the local state immediately
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       console.log(
//         `Sending message from ${user._id} to ${owner._id}: ${message}`
//       );
//       socket.current.emit("private message", {
//         from: user._id,
//         to: owner._id, // Use the deserialized owner ID
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
