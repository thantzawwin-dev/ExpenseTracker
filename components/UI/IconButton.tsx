import {
  StyleSheet,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
  PressableProps,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

// Extract the correct type for the `name` prop from Ionicons
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type Props = PressableProps & {
  icon: IoniconsName;
  size: number;
  color?: string;
};

const IconButton = ({ icon, size, color, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View>
        <Ionicons name={icon} size={size} color={color} onPress={() => {}} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.5,
  },
});
