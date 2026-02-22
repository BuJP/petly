import { colors, fonts, fontSize } from "@/constants/theme";
import React from "react";
import { Text as RNText, StyleSheet, type TextProps } from "react-native";

type TextVariant =
  | "default"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "p"
  | "large"
  | "small"
  | "muted";

type Props = TextProps & {
  variant?: TextVariant;
};

const TextClassContext = React.createContext<TextVariant | undefined>(
  undefined,
);

export const Text = ({ variant, style, ...rest }: Props) => {
  const contextVariant = React.useContext(TextClassContext);
  const resolvedVariant = variant ?? contextVariant ?? "default";

  return (
    <RNText style={[styles.base, styles[resolvedVariant], style]} {...rest} />
  );
};

export { TextClassContext };

const styles = StyleSheet.create({
  base: {
    color: colors.foreground,
    fontSize: fontSize["16"],
    fontFamily: fonts.regular,
  },
  default: {},
  h1: {
    fontSize: fontSize["32"],
    fontFamily: fonts.extraBold,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  h2: {
    fontSize: fontSize["28"],
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  h3: {
    fontSize: fontSize["24"],
    fontFamily: fonts.semibold,
    lineHeight: 32,
  },
  h4: {
    fontSize: fontSize["20"],
    fontFamily: fonts.semibold,
    lineHeight: 28,
  },
  lead: {
    fontSize: fontSize["20"],
    color: colors.muted,
    lineHeight: 28,
  },
  p: {
    fontSize: fontSize["16"],
    lineHeight: 24,
  },
  large: {
    fontSize: fontSize["18"],
    fontFamily: fonts.semibold,
    lineHeight: 26,
  },
  small: {
    fontSize: fontSize["14"],
    fontFamily: fonts.medium,
    lineHeight: 20,
  },
  muted: {
    fontSize: fontSize["14"],
    color: colors.muted,
    lineHeight: 20,
  },
});
