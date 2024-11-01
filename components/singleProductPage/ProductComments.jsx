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

//TODO:       - Refresh comments when new comment added by the user

const ProductComments = ({ product, productComments, setProductComments }) => {
  const { xsm, xl, xxl, paddingTop } = sizes;
  const { user } = useAuth();
  const [newComment, setNewComment] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Sort comments when component mounts or product prop changes
    if (productComments) {
      const sorted = sortComments(productComments);
      setSortedComments(sorted);
    }
  }, [productComments]);

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
    setProductComments((prevComments) => [...prevComments, tempComment]);
    setNewComment(""); // Clear input after adding the comment

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

      // Log the full response for debugging purposes
      console.log("Server response data:", data);

      // Check if the response contains the expected structure
      if (data && data.product && Array.isArray(data.product.comments)) {
        // Get the latest comment from the product's comments array
        const newCommentFromServer =
          data.product.comments[data.product.comments.length - 1];

        // Replace the temporary comment with the actual one from the server response
        setProductComments((prevComments) =>
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
      setProductComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== tempComment._id)
      );
    }
  };

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const commentsToShow = showAllComments
    ? sortedComments
    : sortedComments.slice(0, 3);
  return (
    <View>
      <CustomText subtitle bold>
        Comments ({productComments?.length})
      </CustomText>

      <View style={{ paddingTop: ys(paddingTop) }}>
        <View className="bg-grayb rounded-lg" style={{ position: "relative" }}>
          <TextInput
            multiline={true} // Enable multiline input
            textAlignVertical="top" // Align text to the top
            placeholder="Add your comment here"
            value={newComment} // Set the value to the comment
            onChangeText={(text) => setNewComment(text)} // Update the comment state on text change
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
        {/* //TODO: maybe change this a flatlist later, but then the parent comonent needs to be changed too to a flatlist */}
        <View>
          {productComments?.length > 0 ? (
            <View>
              {commentsToShow.map((comment) => (
                <View
                  key={comment?._id || `temp-${Date.now()}`}
                  className="flex-row"
                  style={{ paddingTop: ys(paddingTop) }}
                >
                  <View>
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: `/sellerprofile/[id]`,
                          params: { id: comment?.user?._id },
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
                          comment?.user?.avatar
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
                              params: { id: comment?.user?._id },
                            })
                          }
                        >
                          <CustomText b300 md bold>
                            {comment?.user?.username}
                          </CustomText>
                        </Pressable>
                        <CustomText b75 xxs>
                          {comment?.createdAt
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
                        {comment?.text}
                      </CustomText>
                    </View>
                  </View>
                </View>
              ))}

              {productComments?.length > 3 && (
                // <View>
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
                // </View>
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
