import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// import CustomHeader from "../../components/homescreen/HomeCustomHeader";
import { AntDesign } from "@expo/vector-icons";

import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: "center",
          paddingTop: ys(5),
          paddingBottom: ys(20),
          height: ys(60),
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          // header: () => <CustomHeader />,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search-outline" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createListing"
        options={{
          headerShown: false,
          title: "Create listing",
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? "add" : "add-outline"} color={color} />
            <AntDesign name="pluscircle" size={ms(40)} color="#69D94E" />
          ),
        }}
      />
      <Tabs.Screen
        name="Messenger"
        options={{
          title: "messenger",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "airplane-outline" : "airplane-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
