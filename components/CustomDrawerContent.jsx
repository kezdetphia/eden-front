import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        {/* Add custom content here */}
        <Text style={{ margin: 16, fontWeight: "bold" }}>
          Custom Drawer Header
        </Text>
      </View>
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
}
