import { View, FlatList, Pressable } from "react-native";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";

import SecondaryPill from "../SecondaryPill";

const CategoryScroll = ({ categories, ownerNeedsForThisProduct }) => {
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
        data={ownerNeedsForThisProduct}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", marginHorizontal: xs(5) }}>
            <SecondaryPill props={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScroll;
