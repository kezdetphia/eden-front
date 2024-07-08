// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import io from "socket.io-client";

// const SERVER_URL = "http://localhost:3000"; // Update with your server URL

// const App = () => {
//   useEffect(() => {
//     const socket = io(SERVER_URL);

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });

//     // Example of sending a message
//     socket.emit("chat message", {
//       text: "Hello from React Native!",
//       user: "user123", // Replace with actual user identifier
//     });

//     socket.on("chat message", (msg) => {
//       console.log("Received message:", msg);
//       // Handle received message in your React Native app
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Socket.io Chat Example</Text>
//     </View>
//   );
// };

// export default App;
