import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonContextValue = {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
};

const ButtonContext = React.createContext<ButtonContextValue>({
  variant: "primary",
  size: "md",
  disabled: false,
});

const useButton = () => React.useContext(ButtonContext);

type ButtonProps = Omit<PressableProps, "style"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

export const ButtonRoot = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = true,
    disabled,
    children,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  return (
    <ButtonContext.Provider value={{ variant, size, disabled: isDisabled }}>
      <Pressable
        disabled={isDisabled}
        role="button"
        aria-disabled={isDisabled}
        aria-busy={loading}
        style={({ pressed }) => [
          buttonStyles.base,
          buttonStyles[variant],
          buttonStyles[`size_${size}`],
          !fullWidth && { alignSelf: "flex-start" },
          pressed && !isDisabled && buttonStyles[`${variant}Pressed`],
          isDisabled && buttonStyles.disabled,
        ]}
        {...rest}
      >
        <View style={[{ opacity: loading ? 0 : 1 }, buttonStyles.wrapper]}>
          {children}
        </View>

        {loading && (
          <ActivityIndicator
            color={colors.button[variant].foreground}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </Pressable>
    </ButtonContext.Provider>
  );
};

const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["2"],
  },

  size_sm: { paddingVertical: spacing["2"], paddingHorizontal: spacing["3"] },
  size_md: { paddingVertical: spacing["3"], paddingHorizontal: spacing["4"] },
  size_lg: { paddingVertical: spacing["4"], paddingHorizontal: spacing["6"] },

  primary: { backgroundColor: colors.button.primary.background },
  primaryPressed: { backgroundColor: colors.button.primary.backgroundPressed },

  secondary: {
    backgroundColor: colors.button.secondary.background,
    borderColor: colors.button.secondary.border,
  },
  secondaryPressed: {
    backgroundColor: colors.button.secondary.backgroundPressed,
  },

  ghost: { backgroundColor: colors.button.ghost.background },
  ghostPressed: { backgroundColor: colors.button.ghost.backgroundPressed },

  destructive: { backgroundColor: colors.button.destructive.background },
  destructivePressed: {
    backgroundColor: colors.button.destructive.backgroundPressed,
  },

  disabled: { opacity: 0.5 },
});

const ButtonText = ({ children }: { children: React.ReactNode }) => {
  const { variant, size } = useButton();

  return (
    <Text
      style={[textStyles.base, textStyles[variant], textStyles[`size_${size}`]]}
    >
      {children}
    </Text>
  );
};

const textStyles = StyleSheet.create({
  base: { fontWeight: "600" },

  primary: { color: colors.button.primary.foreground },
  secondary: { color: colors.button.secondary.foreground },
  ghost: { color: colors.button.ghost.foreground },
  destructive: { color: colors.button.destructive.foreground },

  size_sm: { fontSize: fontSize["14"] },
  size_md: { fontSize: fontSize["16"] },
  size_lg: { fontSize: fontSize["18"] },
});

type ButtonIconProps = {
  icon: LucideIcon;
};

const ButtonIcon = ({ icon: Icon }: ButtonIconProps) => {
  const { variant, size } = useButton();

  return (
    <Icon size={iconSize[size]} color={colors.button[variant].foreground} />
  );
};

const iconSize: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

export const Button = Object.assign(ButtonRoot, {
  Text: ButtonText,
  Icon: ButtonIcon,
});
