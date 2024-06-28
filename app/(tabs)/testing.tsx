import React, { useReducer } from "react";
import { StyleSheet, Pressable } from "react-native";
import { AnimatePresence, View } from "moti";

function Shape({ bg }: { bg: string }) {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default function ExitBeforeEnter() {
  const [visible, toggle] = useReducer((s) => !s, true);

  return (
    <Pressable onPress={toggle} style={styles.container}>
      <AnimatePresence exitBeforeEnter>
        {/* simply pass a unique key to each direct child! */}
        {visible && <Shape bg="hotpink" key="hotpink" />}
        {!visible && <Shape bg="cyan" key="cyan" />}
      </AnimatePresence>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#9c1aff",
  },
});
