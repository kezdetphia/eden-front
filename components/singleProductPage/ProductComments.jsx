import { View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import { useAuth } from "../../context/authContext";
import { Image } from "expo-image";
import { format, parseISO, isValid } from "date-fns";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import CustomText from "../customText";

const { EXPO_API_URL } = Constants.expoConfig.extra;
const { md } = sizes;

const ProductComments = ({ product }) => {
  const { xsm, xl, xxl, paddingTop } = sizes;
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState([]); // Local comments state

  const router = useRouter();

  useEffect(() => {
    // Sync comments when `product.comments` changes
    if (product?.comments) {
      setComments(sortComments(product.comments));
    }
  }, [product?.comments]);

  const sortComments = (comments) => {
    return comments
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const submitComment = async () => {
    const tempComment = {
      text: newComment,
      user,
      _id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Optimistically add the temporary comment
    setComments((prevComments) => [tempComment, ...prevComments]);
    setNewComment("");

    try {
      const res = await fetch(
        `${EXPO_API_URL}/addproductcomment/${product?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: { text: newComment, user: user._id },
          }),
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      console.log("Server response data:", data);

      if (data && data.product && Array.isArray(data.product.comments)) {
        const newCommentFromServer =
          data.product.comments[data.product.comments.length - 1];

        // Replace temporary comment with server response
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === tempComment._id ? newCommentFromServer : comment
          )
        );
      } else {
        console.error("Unexpected response structure:", data);
        throw new Error("Unexpected response structure: 'comment' not found");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);

      // Remove the temporary comment if the API call fails
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== tempComment._id)
      );
    }
  };

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const commentsToShow = showAllComments ? comments : comments.slice(0, 3);

  return (
    <View>
      <CustomText subtitle bold>
        Comments ({comments.length})
      </CustomText>

      <View style={{ paddingTop: ys(paddingTop) }}>
        <View className="bg-grayb rounded-lg" style={{ position: "relative" }}>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            placeholder="Add your comment here"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            style={{
              fontFamily: "jakarta",
              fontSize: ms(14),
              color: "#2D2D2D",
              padding: xs(10),
              paddingRight: xs(40),
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
          {comments.length > 0 ? (
            <View>
              {commentsToShow.map((comment) => (
                <View
                  key={comment._id}
                  className="flex-row"
                  style={{ paddingTop: ys(paddingTop) }}
                >
                  <View>
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: `/sellerprofile/[id]`,
                          params: { id: comment.user?._id },
                        })
                      }
                    >
                      <Image
                        style={{
                          height: ms(40),
                          width: ms(40),
                          borderRadius: ms(20),
                        }}
                        source={
                          comment.user?.avatar
                            ? { uri: comment.user.avatar }
                            : require("../../assets/images/avatar.png")
                        }
                      />
                    </Pressable>
                  </View>

                  <View className="flex-1" style={{ paddingLeft: xs(md) }}>
                    <View className="flex-col items-start">
                      <View className="w-full flex-row justify-between">
                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: `/sellerprofile/[id]`,
                              params: { id: comment.user?._id },
                            })
                          }
                        >
                          <CustomText b300 md bold>
                            {comment.user?.username}
                          </CustomText>
                        </Pressable>
                        <CustomText b75 xxs>
                          {comment.createdAt
                            ? isValid(parseISO(comment.createdAt))
                              ? format(
                                  parseISO(comment.createdAt),
                                  "h:mma  M/d/yy"
                                )
                              : "Invalid Date"
                            : "Unknown Date"}
                        </CustomText>
                      </View>

                      <CustomText
                        b100
                        xsm
                        style={{
                          paddingTop: ys(7),
                          paddingRight: xs(xsm),
                        }}
                      >
                        {comment.text}
                      </CustomText>
                    </View>
                  </View>
                </View>
              ))}

              {comments.length > 3 && (
                <Pressable
                  style={{ paddingTop: ys(paddingTop * 1.5) }}
                  onPress={handleToggleComments}
                >
                  <CustomText
                    g300
                    style={{
                      textAlign: "center",
                      paddingTop: ys(7),
                    }}
                  >
                    {showAllComments ? "Show Less" : "Read More..."}
                  </CustomText>
                </Pressable>
              )}
            </View>
          ) : (
            <View style={{ paddingTop: ys(paddingTop + 4) }}>
              <CustomText
                xsm
                b150
                style={{
                  textAlign: "center",
                }}
              >
                No comments yet...
              </CustomText>
              <CustomText
                b100
                xsm
                style={{
                  textAlign: "center",
                  paddingHorizontal: xs(xsm),
                }}
              >
                Be the first to ask questions, comment about this item, or share
                your experience
              </CustomText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductComments;
