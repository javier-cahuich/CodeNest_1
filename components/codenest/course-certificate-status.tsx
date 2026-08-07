import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import LucideIcon from "@/lib/icons/LucideIcon";

export function CourseCertificateStatus({ isAvailable }: { isAvailable: boolean }) {
  const title = isAvailable
    ? "¡Felicidades! Has completado el curso."
    : "Tu constancia está cerca";
  const description = isAvailable
    ? "Puedes ver y descargar tu constancia desde tu perfil."
    : "Obtén una constancia con una puntuación general mínima de 80.";

  return (
    <View
      accessible
      accessibilityLabel={`${title} ${description}`}
      className={cn(
        "mt-4 flex-row items-start gap-4 rounded-[28px] border px-5 py-5",
        isAvailable
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
          : "border-border bg-muted/60 opacity-70",
      )}
    >
      <View
        className={cn(
          "h-12 w-12 items-center justify-center rounded-2xl",
          isAvailable ? "bg-emerald-100 dark:bg-emerald-500/20" : "bg-muted-foreground/15",
        )}
      >
        <LucideIcon
          name={isAvailable ? "Award" : "Lock"}
          size={22}
          className={isAvailable ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}
        />
      </View>

      <View className="flex-1 gap-1">
        <Text
          className={cn(
            "text-h3 leading-6",
            isAvailable ? "text-emerald-800 dark:text-emerald-100" : "text-muted-foreground",
          )}
        >
          {title}
        </Text>
        <Text
          className={cn(
            "text-body leading-6",
            isAvailable ? "text-emerald-700 dark:text-emerald-200" : "text-muted-foreground",
          )}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
