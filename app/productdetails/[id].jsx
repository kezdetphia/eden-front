import { View, Text, Pressable, Animated, StatusBar } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fontisto, AntDesign, Entypo } from "@expo/vector-icons";
import ProductDesc from "../../components/singleProductPage/ProductDesc";
import SellerInfo from "../../components/singleProductPage/SellerInfo";
import WapperNeeds from "../../components/singleProductPage/WapperNeeds";
import SendMessage from "../../components/singleProductPage/SendMessage";
import Divider from "../../components/Divider";
import ProductComments from "../../components/singleProductPage/ProductComments";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import PriceQuantityCard from "../../components/singleProductPage/PriceQuantityCard";

const ProductDetail = () => {
  const { id: productId } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [imageHeight, setImageHeight] = useState(ys(300));
  const [error, setError] = useState(null);
  const { xsm, sm, md, lg, xl, title, paddingSides, paddingTop } = sizes;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/getcorp/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.corp);
        setProduct(data.corp);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError(error);
      } finally {
      }
    };

    console.log("single page product", product);
    fetchProductDetails();
  }, [productId]);

  const backgroundColor = scrollY.interpolate({
    inputRange: [ys(100), imageHeight - ys(20)],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0.8)"],
    extrapolate: "clamp",
  });

  return (
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
                  height: ms(30), // // Set height to make it a circle
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
          <Image
            source={{
              uri: product?.image,
            }}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setImageHeight(height);
            }}
            style={{
              width: "100%",
              height: ys(400),
              overflow: "hidden",
              // borderBottomLeftRadius: -20, // Adjust the radius as needed
              // borderBottomRightRadius: 20,
            }}
          />
        </View>
        <View
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
              <Text
                className="text-b300"
                style={{
                  fontSize: ms(title),
                  fontFamily: "jakartaBold",
                  letterSpacing: 0.3,
                }}
              >
                {product?.title}
              </Text>

              <View
                className="rounded-full justify-center  "
                // style={{ overflow: "hidden" }}
                // style={{ paddingHorizontal: xs(paddingSides) }}
              >
                <View className="bg-myOrange rounded-md">
                  <Text
                    className="text-white"
                    style={{
                      fontFamily: "jakartaSemibold",
                      fontSize: ms(11),
                      paddingHorizontal: xs(8),
                      paddingVertical: ys(2),
                    }}
                  >
                    {product?.tier?.toUpperCase()}
                  </Text>
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
              <Text
                className="text-b200"
                style={{
                  fontFamily: "jakarta",
                  fontSize: ms(xsm),
                  paddingRight: ms(xsm),
                  letterSpacing: 0.3,
                }}
              >
                {product?.location}
              </Text>
            </View>
          </View>
          <View
            className="flex-row justify-between"
            style={{ paddingTop: ys(paddingTop) }}
          >
            <PriceQuantityCard
              quantity={product?.amount}
              price={product?.price}
              tier={product?.tier}
            />
          </View>
          <View>
            <View
              style={{
                paddingTop: ys(paddingSides + paddingSides + paddingTop - 5),
              }}
            >
              <WapperNeeds
                productOwner={product?.owner}
                wantUnderLine={false}
              />
            </View>
            {/* <SendMessage product={product} style={{ marginBottom: ys(xl) }} /> */}
            <View
              style={{
                paddingTop: ys(paddingSides + paddingSides + paddingTop - 5),
              }}
            >
              <ProductDesc desc={product?.desc} />
            </View>
            <View
              style={{
                paddingTop: ys(paddingSides + paddingSides + paddingTop - 5),
              }}
            >
              <SellerInfo owner={product?.owner} />
            </View>
            <View
              style={{
                paddingTop: ys(paddingSides + paddingSides + paddingTop - 5),
              }}
            >
              <ProductComments product={product} />
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ProductDetail;
