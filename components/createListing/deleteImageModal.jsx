// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Modal as RNModal,
//   ModalProps,
// } from "react-native";
// import { KeyboardAvoidingView } from "react-native";

// export default function Modal({
//   isOpen,
//   onDeletePress,
//   onCancelPress,
//   ...rest
// }) {
//   return (
//     <RNModal
//       visible={isOpen}
//       transparent={true}
//       animationType="fade"
//       statusBarTranslucent
//       {...rest}
//     >
//       <View style={styles.modalBackground}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.actionButton} onPress={onDeletePress}>
//             <Text style={styles.actionText}>{rest.text1}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionButton} onPress={onCancelPress}>
//             <Text style={styles.actionText}>{rest.text2}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </RNModal>
//   );
// }

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     padding: 20,
//     minHeight: 170, // Set a minimum height for the modal content
//     maxHeight: 250, // Set a maximum height for the modal content
//   },
//   actionButton: {
//     width: "100%",
//     padding: 15,
//     backgroundColor: "#34C759",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   actionText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal as RNModal,
  ModalProps,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

export default function Modal({
  isOpen,
  onDeletePress,
  onCancelPress,
  ...rest
}) {
  return (
    <RNModal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.actionButton} onPress={onDeletePress}>
            <Text style={styles.actionText}>{rest.text1}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onCancelPress}>
            <Text style={styles.actionText}>{rest.text2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    minHeight: 170, // Set a minimum height for the modal content
    maxHeight: 250, // Set a maximum height for the modal content
  },
  actionButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#34C759",
    borderRadius: 5,
    marginBottom: 10,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
