import { View, Text, TextInput, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useAuth } from "../../context/authContext";

// TODO: - implement adding comments to the owner's product
//       - display comments conditionally if there is or isnt
//       - message user buttin direct user to the owners message window to send message

const ProductComments = ({ product }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState();
  const [commentingUser, setCommentingUser] = useState();
  const { xsm, xl, xxl, subtitle, paddingTop } = sizes;

  useEffect(() => {
    if (product && product.comments) {
      const comments = product.comments.map((comment) => ({
        text: comment.text,
        userId: comment.user._id,
        username: comment.user.username,
      }));
      console.log("productcomments, ", comments);
    } else {
      console.log("Product or comments are undefined");
    }
  }, [product]);

  const submitComment = async () => {
    try {
      console.log("User object before sending request:", user); // Log the user object
      const res = await fetch(
        `http://localhost:3000/addcropcomment/${product?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: { text: comment, user: user._id } }),
        }
      );
      console.log("this is user stufff", user);

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      console.log(data.comment);
      // setComment(data.comment);
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setError(error);
    } finally {
      // Any cleanup code if needed
    }
  };

  // useEffect(() => {
  //   const getCommentingUser = async () => {
  //     if (!comment?.user) return;

  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/users/${product?.comments?.user}`
  //       );
  //       if (!res.ok)
  //         throw new Error(
  //           "Network response was not ok while fetching commenting user"
  //         );
  //       const data = await res.json();
  //       console.log("commenting user data", data);
  //       setCommentingUser(data);
  //     } catch (error) {
  //       console.error("Failed to fetch commenting user:", error);
  //     }
  //   };

  //   getCommentingUser();
  // }, []);

  console.log("rpdict commentssss", product?.comments);

  return (
    <View>
      <Text
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
          letterSpacing: 0.3,
        }}
      >
        Comments
      </Text>

      <View style={{ paddingTop: ys(paddingTop) }}>
        <View className="bg-grayb rounded-lg" style={{ position: "relative" }}>
          <TextInput
            multiline={true} // Enable multiline input
            textAlignVertical="top" // Align text to the top
            placeholder="Add your comment here"
            value={comment} // Set the value to the comment
            onChangeText={(text) => setComment(text)} // Update the comment state on text change
            style={{
              fontFamily: "jakarta",
              fontSize: ms(14),
              // color: "#F6F7F9",
              color: "#2D2D2D",
              padding: xs(10),
              // borderWidth: 1,
              // borderColor: "#E6E6E6",
              letterSpacing: 0.3,

              paddingRight: xs(40), // Add padding to the right to make space for the icon
            }}
          />
          <Feather
            onPress={submitComment}
            name="send"
            size={ms(xl)}
            color="#69D94E"
            style={{
              position: "absolute",
              right: xs(16),
              top: "50%",
              transform: [{ translateY: -ms(xxl) / 2 }],
            }}
          />
        </View>

        <View>
          {product?.comments?.map((comment) => (
            <View key={comment._id}>
              <Text>{comment.text}</Text>
              <Text>{comment.user.username}</Text>
            </View>
          ))}
        </View>

        <View style={{ paddingTop: ys(paddingTop + 4) }}>
          <Text
            className="text-center "
            style={{
              fontSize: ms(12),
              fontFamily: "jakarta",

              fontStyle: "#E6E6E6",
              letterSpacing: 0.3,
            }}
          >
            No comments yet...
          </Text>
          <Text
            className=" text-center text-b100"
            style={{
              fontSize: ms(xsm),
              paddingHorizontal: xs(xsm),
              fontFamily: "jakarta",
              letterSpacing: 0.3,
            }}
          >
            Be the firts to ask questions, comments about this item, or share
            your experience
          </Text>
        </View>
      </View>
      <View style={{ paddingTop: ys(paddingTop + paddingTop / 2) }}>
        <Pressable
          onPress={() => {
            // Add your onPress functionality here
          }}
          style={{
            backgroundColor: "#69D94E",
            paddingVertical: ys(10),
            paddingHorizontal: xs(20),
            borderRadius: ms(5),
            alignItems: "center",
            justifyContent: "center",
            marginTop: ys(10),
            flexDirection: "row",
          }}
        >
          <Feather name="message-square" size={ms(xl)} color="#FFF" />
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: ms(14),
              fontFamily: "jakartaSemibold",
              marginLeft: xs(5),
              letterSpacing: 0.3,
            }}
          >
            Send Message to Swapper
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductComments;
