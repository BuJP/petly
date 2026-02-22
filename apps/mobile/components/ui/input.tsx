import {
  borderWidth,
  colors,
  fontSize,
  radius,
  spacing,
} from "@/constants/theme";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export type InputProps = TextInputProps & React.RefAttributes<TextInput>;

export const Input = (props: InputProps) => {
  const { editable = true, style, ...rest } = props;

  return (
    <TextInput
      editable={editable}
      style={[styles.input, !editable && styles.disabled, style]}
      placeholderTextColor={colors.input.placeholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.input.background,
    borderColor: colors.input.border,
    borderWidth: borderWidth.thin,
    borderRadius: radius.lg,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
    fontSize: fontSize[16],
    color: colors.input.foreground,
  },
  disabled: {
    opacity: 0.5,
  },
});
