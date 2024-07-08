import { View, Text, TextInput, Pressable } from "react-native";
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
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";

const { md } = sizes;

// TODO: - DONE- implement adding comments to the owner's product
//       - DONE - display comments conditionally if there is or isnt
//       - message user buttin direct user to the owners message window to send message
//       - Refresh comments when new comment added by the user

const ProductComments = ({ product }) => {
  const { xsm, xl, xxl, subtitle, paddingTop } = sizes;
  const { user } = useAuth();
  const [comment, setComment] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);

  const router = useRouter();

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

  useEffect(() => {
    // Sort comments when component mounts or product prop changes
    if (product?.comments) {
      const sorted = sortComments(product.comments);
      setSortedComments(sorted);
    }
  }, [product?.comments]);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const commentsToShow = showAllComments
    ? sortedComments
    : sortedComments.slice(0, 3);

  const sortComments = (comments) => {
    return comments
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const submitComment = async () => {
    try {
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
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log("retuirn data", data);
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setError(error);
    } finally {
      // Any cleanup code if needed
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: ms(subtitle),
          fontFamily: "jakartaBold",
          letterSpacing: 0.3,
        }}
      >
        Comments ({product?.comments.length})
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
        {/* //TODO: maybe change this a flatlist later, but then the parent comonent needs to be changed too to a flatlist */}
        <View>
          {product?.comments.length > 0 ? (
            <View>
              {commentsToShow.map((comment) => (
                <View
                  key={comment._id}
                  className="flex-row"
                  style={{ paddingTop: ys(paddingTop * 2) }}
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
                        source={require("../../assets/images/avatar.png")}
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
                          <Text
                            className="text-b300"
                            style={{
                              fontSize: ms(15),
                              fontFamily: "jakartaBold",
                              letterSpacing: 0.3,
                            }}
                          >
                            {comment?.user?.username}
                          </Text>
                        </Pressable>
                        <Text
                          className="text-b75"
                          style={{
                            fontSize: ms(10),
                            fontFamily: "jakarta",
                            letterSpacing: 0.3,
                          }}
                        >
                          {format(
                            parseISO(comment?.createdAt),
                            "h:mma  M/d/yy"
                          )}
                        </Text>
                      </View>

                      <Text
                        className="text-b100"
                        style={{
                          fontFamily: "jakarta",
                          paddingTop: ys(7),
                          letterSpacing: 0.3,
                          paddingRight: xs(xsm),
                        }}
                      >
                        {comment?.text}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {product?.comments.length > 3 && (
                // <View>
                <Pressable
                  style={{ paddingTop: ys(paddingTop * 1.5) }}
                  onPress={handleToggleComments}
                >
                  <Text
                    className="text-g300 text-center"
                    style={{
                      fontFamily: "jakarta",
                      paddingTop: ys(7),
                      letterSpacing: 0.3,
                    }}
                  >
                    {showAllComments ? "Show Less" : "Read More..."}
                  </Text>
                </Pressable>
                // </View>
              )}
            </View>
          ) : (
            <View style={{ paddingTop: ys(paddingTop + 4) }}>
              <Text
                className="text-center"
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
                className="text-center text-b100"
                style={{
                  fontSize: ms(xsm),
                  paddingHorizontal: xs(xsm),
                  fontFamily: "jakarta",
                  letterSpacing: 0.3,
                }}
              >
                Be the first to ask questions, comment about this item, or share
                your experience
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductComments;
