import {
  borderWidth,
  colors,
  fontSize,
  radius,
  spacing,
} from "@/constants/theme";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

export type InputProps = TextInputProps &
  React.RefAttributes<TextInput> & {
    rightElement?: React.ReactNode;
  };

export const Input = (props: InputProps) => {
  const { editable = true, style, rightElement, ...rest } = props;

  return (
    <View style={styles.wrapper}>
      <TextInput
        editable={editable}
        style={[styles.input, !editable && styles.disabled, style]}
        placeholderTextColor={colors.input.placeholder}
        {...rest}
      />
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.input.background,
    borderColor: colors.input.border,
    borderWidth: borderWidth.thin,
    borderRadius: radius.lg,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
    fontSize: fontSize[16],
    color: colors.input.foreground,
  },
  disabled: {
    opacity: 0.5,
  },
  rightElement: {
    paddingRight: spacing[3],
  },
});
