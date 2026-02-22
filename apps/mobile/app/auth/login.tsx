import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text variant="h1">Sign in to your{"\n"}Account</Text>
    </SafeAreaView>
  );
}
