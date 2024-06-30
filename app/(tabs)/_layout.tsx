import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeCustomHeader from "../../components/homescreen/HomeCustomHeader";
// import CreateListingCustomHeader from "@/components/createListing/CreateListingCustomHeader";

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
          paddingTop: ys(10),
        },
      }}
    >
      {/* //// */}
      <Tabs.Screen
        name="test2"
        options={{
          title: "Test2",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search-outline" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* //// */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          // header: () => <HomeCustomHeader />,
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
            <TabBarIcon name={focused ? "add" : "add-outline"} color={color} />
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
