import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fontisto, AntDesign, Entypo } from "@expo/vector-icons";
import ProductDesc from "../../components/singleProductPage/ProductDesc";
import SellerInfo from "../../components/singleProductPage/SellerInfo";
import WapperNeeds from "../../components/singleProductPage/WapperNeeds";
import ProductComments from "../../components/singleProductPage/ProductComments";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import PriceQuantityCard from "../../components/singleProductPage/PriceQuantityCard";
import * as SecureStore from "expo-secure-store";
import CustomButton from "../../components/customButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useAuth } from "../../context/authContext";
import Constants from "expo-constants";
import CustomText from "../../components/customText";
import axios from "axios";

const { EXPO_API_URL } = Constants.expoConfig.extra;

// might add a modal to open images in its true ratio size

const { xsm, paddingSides, paddingTop } = sizes;

const ProductDetail = () => {
  const { id: productId } = useLocalSearchParams();
  // console.log("ProductDetail iddsdsdsdsds", productId);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [imageHeight, setImageHeight] = useState(ys(300));
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index
  const params = useLocalSearchParams();
  // console.log("singlepage params", params);
  const [productComments, setProductComments] = useState(product?.comments);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      try {
        const response = await axios.get(
          `${EXPO_API_URL}/getproduct/${productId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(response.data.product);
        setProductComments(response.data.product.comments);
        // console.log("SINGLEPRODUCT data", response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError(error);
        if (error.response) {
          console.error("Server error response:", error.response.data);
        } else {
          console.error("Network error or other issues:", error.message);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  // console.log("product", product);

  const backgroundColor = scrollY.interpolate({
    inputRange: [ys(100), imageHeight - ys(20)],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0.8)"],
    extrapolate: "clamp",
  });

  const handleBackPress = () => {
    if (params.previousWindow === "home") {
      router.navigate("home");
    } else {
      router.back();
    }
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: Dimensions.get("window").width,
        height: ys(400),
        overflow: "hidden",
      }}
    />
  );

  const handleScroll = (event) => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentIndex(index);
  };

  return (
    <>
      {product?.image[0] && (
        <View className="flex-1 bg-grayb ">
          <StatusBar hidden={true} />
          <Animated.View
            className=""
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              backgroundColor,
              width: "100%",
              height: ys(65),
              padding: ms(10),
            }}
          >
            <View
              className="flex flex-row justify-between "
              style={{ paddingHorizontal: xs(xsm) }}
            >
              <View>
                <Pressable
                  onPress={handleBackPress}
                  style={{ marginTop: ys(25) }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Blackish transparent background
                      borderRadius: ms(24), // Make the background fully rounded
                      width: ms(30), // Set width to make it a circle
                      height: ms(30), // Set height to make it a circle
                      justifyContent: "center", // Center the icon vertically
                      alignItems: "center", // Center the icon horizontally
                    }}
                  >
                    <AntDesign name="arrowleft" size={ms(18)} color="white" />
                  </View>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={() => router.back()}
                  style={{ marginTop: ys(25) }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Blackish transparent background
                      borderRadius: ms(24), // Make the background fully rounded
                      width: ms(30), // Set width to make it a circle
                      height: ms(30), // Set height to make it a circle
                      justifyContent: "center", // Center the icon vertically
                      alignItems: "center", // Center the icon horizontally
                    }}
                  >
                    <Fontisto name="share-a" size={ms(14)} color="white" />
                  </View>
                </Pressable>
              </View>
            </View>
          </Animated.View>
          <Animated.ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <View>
              <View>
                <FlatList
                  data={product?.image}
                  renderItem={renderItem}
                  horizontal
                  pagingEnabled
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={handleScroll}
                  onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setImageHeight(height);
                  }}
                />
                <View style={styles.dotContainer}>
                  {product?.image?.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        {
                          opacity: currentIndex === index ? 1 : 0.6,
                          backgroundColor:
                            currentIndex === index
                              ? "black"
                              : "rgba(0, 0, 0, 0.5)",
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>

            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={Platform.OS === "ios" ? 20 : 0}
              extraHeight={150}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              style={{
                paddingHorizontal: xs(paddingSides),
                marginTop: -ys(20), // Move the view up to cover part of the image
                // backgroundColor: "#F6F7F9",
                backgroundColor: "#FFF",
                borderTopLeftRadius: 30, // Apply border radius to the top corners
                borderTopRightRadius: ms(30),
                paddingBottom: ys(5),
                paddingTop: ys(2),
                gap: ys(2),
              }}
            >
              <View
                style={{
                  paddingTop: ys(paddingTop),
                }}
              >
                <View className="flex-row justify-between">
                  <CustomText b300 title bold>
                    {" "}
                    {product?.title}
                  </CustomText>

                  <View
                    className="rounded-full justify-center  "
                    // style={{ overflow: "hidden" }}
                    // style={{ paddingHorizontal: xs(paddingSides) }}
                  >
                    <View className="bg-myOrange rounded-md">
                      <CustomText
                        b300
                        title
                        white
                        semibold
                        xxs
                        style={{
                          paddingHorizontal: xs(8),
                          paddingVertical: ys(2),
                        }}
                      >
                        {product?.tier?.toUpperCase()}
                      </CustomText>
                    </View>
                  </View>
                </View>
                <View
                  style={{ paddingTop: ys(paddingTop) }}
                  className="flex-row items-center"
                >
                  <Entypo
                    className="pr-1 "
                    name="location-pin"
                    size={ms(18)}
                    color="#69D94E"
                  />
                  <CustomText
                    b200
                    sm
                    style={{
                      paddingRight: ms(xsm),
                    }}
                  >
                    {product?.location}
                  </CustomText>
                </View>
              </View>
              <View
                className="flex-row justify-between"
                style={{ paddingTop: ys(paddingTop) }}
              >
                <PriceQuantityCard
                  quantity={product?.availableQuantity}
                  price={product?.price}
                  tier={product?.tier}
                />
              </View>
              <View>
                {product?.tier === "Trade" && (
                  <View
                    style={{
                      paddingTop: ys(
                        paddingSides + paddingSides + paddingTop - 5
                      ),
                    }}
                  >
                    <WapperNeeds
                      // productOwner={product?.owner}
                      exchangingFor={product?.exchangeFor}
                      wantUnderLine={false}
                    />
                  </View>
                )}
                {/* <SendMessage product={product} style={{ marginBottom: ys(xl) }} /> */}
                <View style={styles.sectionContainer}>
                  <ProductDesc desc={product?.desc} />
                </View>
                <View style={styles.sectionContainer}>
                  <SellerInfo owner={product?.owner} />
                </View>
                <View style={styles.sectionContainer}>
                  <ProductComments
                    product={product}
                    productComments={productComments}
                    setProductComments={setProductComments}
                  />
                </View>
                <View
                  style={{
                    paddingTop: ys(paddingTop * 1.5),
                    paddingBottom: ys(paddingTop * 2),
                  }}
                >
                  <CustomButton
                    iconType={"Feather"}
                    icon={"message-square"}
                    text={"Send Message to Swapper"}
                    submit={() =>
                      // TODO:  - this needs to be specified to the owner once routes and controller is done
                      router.push({
                        pathname: `/message/chat`,
                        // params: { owner: JSON.stringify(product?.owner) },
                        // params: { owner: JSON.stringify({ paramDetails }) },
                        params: {
                          paramDetails: JSON.stringify({
                            ownerId: product?.owner?._id,
                            ownerUsername: product?.owner?.username,
                            productId,
                            productImage: encodeURI(product?.image),
                          }),
                        },
                      })
                    }
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Animated.ScrollView>
        </View>
      )}
      {/* // </KeyboardAwareScrollView> */}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  sectionContainer: {
    paddingTop: ys(paddingSides + paddingSides + paddingTop - 5),
  },
  dotContainer: {
    position: "absolute",
    bottom: ys(30), // Adjust this value to position the dots higher on the image
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: ms(10),
    width: ms(10),
    borderRadius: ms(40),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginHorizontal: ms(4),
  },
});
