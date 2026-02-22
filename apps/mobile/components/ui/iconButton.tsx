import { colors, palette, radius, spacing } from "@/constants/theme";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ButtonSize } from "./button";
import { LucideIcon } from "lucide-react-native";

type IconButtonProps = Omit<PressableProps, "style"> & {
  icon: LucideIcon;
  size?: ButtonSize;
};

export const IconButton = ({
  icon: Icon,
  size = "md",
  ...rest
}: IconButtonProps) => {
  const { disabled } = rest;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[`size_${size}`],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      <Icon size={iconSize[size]} color={colors.foreground} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: palette.gray[100],
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  pressed: { backgroundColor: palette.gray[200] },
  disabled: { opacity: 0.5 },

  size_sm: { padding: spacing[1] },
  size_md: { padding: spacing[2] },
  size_lg: { padding: spacing[3] },
});

const iconSize: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};
