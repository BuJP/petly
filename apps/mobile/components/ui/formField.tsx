import { Pressable, StyleSheet, View } from "react-native";
import { Input, InputProps } from "./input";
import { colors, fontSize, spacing } from "@/constants/theme";
import { Text } from "./text";
import React from "react";
import { Eye, EyeOff } from "lucide-react-native";

type FormFieldProps = InputProps & {
  label?: string;
  error?: string;
};

export const FormField = (props: FormFieldProps) => {
  const { label, error, secureTextEntry, ...inputProps } = props;

  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="small" style={styles.label}>
          {label}
        </Text>
      )}

      <Input
        secureTextEntry={secureTextEntry && !isVisible}
        rightElement={
          secureTextEntry ? (
            <Pressable
              onPress={() => setIsVisible((isVisible) => !isVisible)}
              hitSlop={8}
            >
              {isVisible ? (
                <Eye size={18} color={colors.muted} />
              ) : (
                <EyeOff size={18} color={colors.muted} />
              )}
            </Pressable>
          ) : undefined
        }
        {...inputProps}
      />

      {error && (
        <Text variant="small" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing["2"],
  },
  label: {
    paddingLeft: spacing[1],
  },
  error: {
    fontSize: fontSize["12"],
    color: colors.status.error,
    paddingLeft: spacing[1],
  },
});
