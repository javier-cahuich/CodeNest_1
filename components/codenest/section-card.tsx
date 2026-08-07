import type { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function SectionCard({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <View className={cn("rounded-[28px] border border-border bg-card px-5 py-5", className)}>
      {eyebrow ? (
        <Text className="text-caption uppercase tracking-[0.28em] text-muted-foreground">
          {eyebrow}
        </Text>
      ) : null}
      <Text className="mt-2 text-h3 text-card-foreground">{title}</Text>
      <View className="mt-4 gap-3">{children}</View>
    </View>
  );
}
