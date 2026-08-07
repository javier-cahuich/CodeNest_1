import * as React from "react";
import { ScrollView, View, type ScrollViewProps, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

type ScreenProps = {
  scroll?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
} & ViewProps &
  Pick<ScrollViewProps, "showsVerticalScrollIndicator" | "contentContainerStyle">;

export function Screen({
  children,
  className,
  contentClassName,
  scroll = false,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  ...props
}: ScreenProps) {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} className="flex-1 bg-background">
      {scroll ? (
        <ScrollView
          className={cn("flex-1", className)}
          contentContainerClassName={cn("px-5 pb-10 pt-4", contentClassName)}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn("flex-1 bg-background px-5 pb-10 pt-4", className)} {...props}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
