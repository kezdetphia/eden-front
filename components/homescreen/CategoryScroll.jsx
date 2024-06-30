import { View, Text, FlatList, Pressable } from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import sizes from "../../constants/sizes";
import SecondaryPill from "../SecondaryPill";

const CategoryScroll = ({ categories }) => {
  const { paddingSides, xsm, sm, md, lg, xl, xxl } = sizes;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FlatList
        initialScrollToIndex={0}
        horizontal={true}
        contentContainerStyle={null}
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", marginHorizontal: xs(5) }}>
            {/* <View
              className={` bg-g50
                rounded-md flex-row items-center `}
              style={{
                paddingHorizontal: ms(md),
                paddingVertical: ys(2),
              }}
            >
              <Text
                className="text-g400"
                style={{
                  fontSize: ms(sm),
                  fontFamily: "jakarta",
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </View> */}
            <SecondaryPill props={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScroll;

//origi
// import { View, Text, FlatList, Pressable } from "react-native";
// import React, { useState } from "react";
// import {
//   scale as xs,
//   verticalScale as ys,
//   moderateScale as ms,
// } from "react-native-size-matters";
// import sizes from "../../constants/sizes";
// import { Image } from "expo-image";

// const CategoryScroll = ({
//   categories,
//   wantUnderLine,
//   onCategorySelect,
//   categoryImage,
// }) => {
//   const { xsm, sm, md, lg, xl, xxl } = sizes;
//   const [isCatScrollActive, setIsCatScrollActive] = useState(null);

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginTop: ys(xsm),
//       }}
//     >
//       <FlatList
//         initialScrollToIndex={0}
//         horizontal={true}
//         contentContainerStyle={{ paddingLeft: xs(xsm) }}
//         data={categories}
//         keyExtractor={(item) => item}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={{ alignItems: "center", marginHorizontal: xs(5) }}>
//             <Pressable
//               onPress={() => {
//                 setIsCatScrollActive(item);
//                 categoryImage ? onCategorySelect(item) : "";
//               }}
//             >
//               <View
//                 className={`${
//                   isCatScrollActive === item ? "bg-myGreenMed " : " bg-g50"
//                 } rounded-full flex-row items-center `}
//                 style={{
//                   padding: ms(md),
//                 }}
//               >
//                 {categoryImage ? (
//                   <Image
//                     source={categoryImage[item]}
//                     style={{ width: ms(30), height: ms(30) }}
//                   />
//                 ) : (
//                   <Text
//                     style={{
//                       fontSize: ms(md),
//                       fontFamily: "poppins",
//                       color: "darkgrey",
//                     }}
//                   >
//                     {item}
//                   </Text>
//                 )}
//               </View>
//             </Pressable>
//             {categoryImage ? (
//               <Text
//                 className="text-lightgrey  "
//                 style={{
//                   fontSize: ms(md),
//                   fontFamily: "poppins",
//                   marginTop: ys(6),
//                 }}
//               >
//                 {item}
//               </Text>
//             ) : (
//               ""
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default CategoryScroll;
