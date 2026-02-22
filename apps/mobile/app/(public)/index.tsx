import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>

      <Pressable
        onPress={() => {
          router.push("/auth/login");
        }}
      >
        <Text>redirect login</Text>
      </Pressable>
    </View>
  );
}
