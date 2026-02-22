import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";
import { colors } from "@/constants/theme";

export default function publicLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.button.primary.background,
        // headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
