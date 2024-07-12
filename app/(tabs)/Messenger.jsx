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
import defaultAvatar from "../../assets/images/avatar.png";
import { format, isToday, isThisWeek, parseISO } from "date-fns";

const Chatt = () => {
  const { paddingSides, paddingTop, title, subtitle } = sizes;
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const userId = user?._id;
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      getMyConvos();
    }
  }, [userId]);

  const getMyConvos = async () => {
    console.log(" getMyconvos function");
    try {
      const res = await fetch(
        `http://192.168.0.236:3000/message/conversation/user/${userId}`
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
  };

  const checkLastMessages = () => {
    if (Array.isArray(convos) && convos.length > 0) {
      console.log("convos not undefined");
      const lastMessages = convos.map((convo) => {
        const lastMessage = convo.messages[convo.messages.length - 1];
        const otherParticipant = convo.participants.find(
          (participant) => participant._id !== userId
        );

        return {
          from: lastMessage.from,
          to: otherParticipant._id,
          message: lastMessage.message,
          timestamp: lastMessage.timestamp,
          avatar: otherParticipant.avatar,
          toUsername: otherParticipant.username,
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

  const onClickOnConversation = async (recepientId) => {
    const recepientUser = convos
      .flatMap((convo) => convo.participants)
      .find((participant) => participant._id === recepientId);
    if (recepientUser) {
      router.push({
        pathname: `/messages`,
        params: { owner: JSON.stringify(recepientUser) },
      });
    }
  };

  const processConversations = (conversations, currentUserId) => {
    conversations.forEach((conversation) => {
      console.log(`Conversation ID: ${conversation._id}`);

      // Find the other participant's ID (the one that is not the current user)
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id !== currentUserId
      );
      const otherParticipantId = otherParticipant ? otherParticipant._id : null;

      console.log(`Other Participant ID: ${otherParticipantId}`);

      conversation.messages.forEach((message) => {
        const sender = conversation.participants.find(
          (participant) => participant._id === message.from
        );

        if (sender) {
          console.log(`Message from ${sender.username}: ${message.message}`);
          console.log(`Sender Avatar: ${sender.avatar}`);
        } else {
          console.log(
            `Sender with ID ${message.from} not found among participants.`
          );
        }
      });
    });
  };

  const formatDate = (timestamp) => {
    const date = parseISO(timestamp);

    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isThisWeek(date)) {
      return format(date, "EEEE");
    } else {
      return format(date, "MMMM d");
    }
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
            <View className="py-5">
              <View className="flex-row">
                <Image
                  source={
                    item.avatar && item.avatar.trim() !== ""
                      ? { uri: item.avatar }
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
                  <Text className="text-b200 " style={styles.text}>
                    {item.toUsername}
                  </Text>
                  <View className="flex-row">
                    <Text className="text-b200 " style={styles.text}>
                      {item.message.length > 25
                        ? item.message.substring(0, 25) + "..."
                        : item.message}
                    </Text>
                    <Text className="text-b200 pl-3 " style={styles.text}>
                      - {formatDate(item.timestamp)}
                    </Text>
                  </View>
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
