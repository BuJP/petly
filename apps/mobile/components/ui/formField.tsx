import { StyleSheet, View } from "react-native";
import { Input, InputProps } from "./input";
import { colors, fontSize, spacing } from "@/constants/theme";
import { Text } from "./text";

type FormFieldProps = InputProps & {
  label?: string;
  error?: string;
};

export const FormField = ({ label, error, ...inputProps }: FormFieldProps) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text variant="small" style={styles.label}>
          {label}
        </Text>
      )}
      <Input {...inputProps} />
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
