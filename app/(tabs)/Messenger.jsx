import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { Image } from "expo-image";

const Chatt = () => {
  const {
    xxs,
    xsm,
    sm,
    md,
    lg,
    xl,
    paddingSides,
    paddingTop,
    title,
    subtitle,
  } = sizes;
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const userId = user?._id;
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
      setRecepientUser(null);
    }
  }, [recepientUser]);

  const onClickOnConversation = async (recepientId) => {
    await getRecepientUser(recepientId);
  };

  return (
    <View className="flex-1  ">
      <SafeAreaView />
      <View
        className="flex-row justify-around"
        style={{ paddingTop: ys(paddingTop) }}
      >
        <Text>Messages</Text>
        <Text>Notifications</Text>
      </View>

      <FlatList
        data={lastMessages}
        contentContainerStyle={{ paddingHorizontal: xs(paddingSides) }}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <Pressable onPress={() => onClickOnConversation(item.to)}>
            <View className="py-20">
              <View className="flex-row">
                <Image
                  source={require("../../assets/images/avatar.png")}
                  style={{
                    width: xs(30),
                    height: ys(30),
                    borderRadius: 25,
                    marginRight: xs(paddingSides),
                  }}
                />
                <View className="flex-col">
                  <Text className="text-b200 " style={styles.text}>
                    From: {item.from}
                  </Text>
                  <Text className="text-b200 " style={styles.text}>
                    Message: {item.message}
                  </Text>
                  <Text className="text-b200 " style={styles.text}>
                    timestamp: {item.timestamp}
                  </Text>
                  <Text className="text-b200 " style={styles.text}>
                    to: {item.to}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Chatt;

const styles = StyleSheet.create({
  text: {
    fontFamily: "jakarta",
    paddingTop: ys(2),
    letterSpacing: 0.3,
  },
});
