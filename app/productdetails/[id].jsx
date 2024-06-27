import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
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

const ProductDetail = () => {
  const { id: productId } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [imageHeight, setImageHeight] = useState(ys(300));
  const [error, setError] = useState(null);
  const { xxs, xsm, sm, md, lg, xl, xxl } = sizes;

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
    outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"],
    extrapolate: "clamp",
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar hidden={true} />
      <View className="flex-1 bg-60 ">
        <Animated.View
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
          <Pressable
            onPress={() => router.back()}
            style={{ marginTop: ys(25) }}
          >
            <Feather name="arrow-left-circle" size={ms(28)} color="#51A90E" />
          </Pressable>
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
              paddingHorizontal: ms(xsm),
              marginTop: -ys(20), // Move the view up to cover part of the image
              backgroundColor: "#fff", // Ensure the background color matches the desired color
              borderTopLeftRadius: 30, // Apply border radius to the top corners
              borderTopRightRadius: ms(30),
              paddingBottom: ys(5),
              paddingTop: ys(2),
              gap: ys(2),
            }}
          >
            <View
              style={{
                paddingBottom: ys(8),
                paddingTop: ys(8),
                gap: ys(2),
              }}
            >
              <View className="flex-row justify-between">
                <Text
                  className="font-bold"
                  style={{
                    fontSize: ms(xl),
                    fontFamily: "poppins",
                  }}
                >
                  {product?.title}
                </Text>
                <Text
                  className=""
                  style={{
                    fontFamily: "poppins",
                    fontSize: ms(sm),
                    paddingRight: ms(xsm),
                  }}
                >
                  {product?.location}
                </Text>
              </View>
              <Text style={{ fontFamily: "poppins", fontSize: ms(10) }}>
                Last Updated: {product?.updatedAt?.substring(0, 10)}
              </Text>
            </View>
            <Divider customStyle={{ marginBottom: ys(lg) }} />
            <View>
              <SendMessage product={product} style={{ marginBottom: ys(xl) }} />
              <ProductDesc product={product} style={{ paddingTop: ys(xl) }} />
              <View style={{ marginHorizontal: -ys(sm) }}>
                <WapperNeeds product={product} wantUnderLine={false} />
              </View>
              <Divider customStyle={{ marginVertical: ys(md) }} />
              <Divider customStyle={{ marginVertical: ys(md) }} />
              <ProductComments product={product} />
              <Divider customStyle={{ marginVertical: ys(md) }} />
              <SellerInfo product={product} />
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProductDetail;
