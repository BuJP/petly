import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formField";
import { IconButton } from "@/components/ui/iconButton";
import { Text } from "@/components/ui/text";
import { colors, fonts, fontSize, palette, spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <IconButton
            icon={ArrowLeft}
            size="lg"
            onPress={() => router.back()}
          />

          <View style={styles.header}>
            <Text variant="h1">{"Sign in to your\nAccount"}</Text>
            <Text variant="muted">Enter your email and password to log in</Text>
          </View>

          <View style={styles.form}>
            <FormField
              label="Email"
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <FormField
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
          </View>

          <Button variant="primary">
            <Button.Text>Log In</Button.Text>
          </Button>

          <View style={styles.footer}>
            <Text variant="muted">Don&apos;t have an account ?</Text>

            <Pressable
              onPress={() => router.push("/")} // todo: replace link
            >
              <Text style={styles.signUp}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    padding: spacing[6],
    gap: spacing[6],
  },
  header: {
    gap: spacing[2],
  },

  form: {
    gap: spacing[4],
  },
  backButton: {
    alignSelf: "flex-start",
    padding: spacing[1],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[1],
  },
  signUp: {
    color: palette.primary[500],
    fontFamily: fonts.semibold,
    fontSize: fontSize["16"],
  },
});
