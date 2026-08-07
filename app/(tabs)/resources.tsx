import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import type { IconName } from "@/lib/icons/LucideIcon";
import LucideIcon from "@/lib/icons/LucideIcon";

const resources: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Guía de sintaxis",
    description: "Atajos mentales para recordar estructuras básicas de JavaScript.",
    icon: "BookText",
  },
  {
    title: "Mapa de conceptos",
    description: "Resumen visual de variables, condicionales, funciones y arreglos.",
    icon: "Map",
  },
  {
    title: "Buenas prácticas",
    description: "Nombres claros, orden y pequeños hábitos que mejoran tu código.",
    icon: "NotebookPen",
  },
];

export default function ResourcesTabScreen() {
  return (
    <Screen scroll contentClassName="gap-5">
      <View className="rounded-[32px] border border-border bg-card px-5 py-6">
        <Badge variant="outline" className="self-start px-3 py-1">
          <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
            Resources
          </Text>
        </Badge>
        <Text className="mt-4 text-h1 leading-10 text-foreground">
          Recursos para aprender mejor
        </Text>
        <Text className="mt-3 text-body leading-7 text-muted-foreground">
          Un espacio para material complementario, resúmenes y referencias rápidas para estudiar sin
          perder contexto.
        </Text>
      </View>

      {resources.map((resource) => (
        <View
          key={resource.title}
          className="rounded-[28px] border border-border bg-card px-5 py-5"
        >
          <View className="flex-row items-start gap-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-accent">
              <LucideIcon name={resource.icon} size={22} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-h3 text-card-foreground">{resource.title}</Text>
              <Text className="mt-2 text-body leading-6 text-muted-foreground">
                {resource.description}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </Screen>
  );
}
