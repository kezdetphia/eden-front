import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign } from "@expo/vector-icons";
import {
  scale as xs,
  verticalScale as ys,
  moderateScale as ms,
} from "react-native-size-matters";
import { StatusBar } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      {/* added status bar dark mode */}
      <StatusBar barStyle="dark-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
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
            title: "home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home-outline" : "home-outline"}
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
                name={focused ? "search" : "search-outline"}
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
          name="notification"
          options={{
            title: "notification",

            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={
                  focused ? "notifications-outline" : "notifications-outline"
                }
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person-outline" : "person-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
