import { router, useLocalSearchParams } from "expo-router";
import { LessonWizard } from "@/components/codenest/lesson-wizard";
import { SectionCard } from "@/components/codenest/section-card";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getModuleBySlug } from "@/data/codenest-modules";

export default function ModuleDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string }>();
  const module = params.slug ? getModuleBySlug(params.slug) : undefined;

  if (!module) {
    return (
      <Screen scroll contentClassName="justify-center gap-6">
        <SectionCard eyebrow="Contenido no disponible" title="No encontramos esta lección">
          <Text className="text-body leading-6 text-muted-foreground">
            Puede que el enlace ya no exista en esta demo o que la lección todavía no esté cargada.
          </Text>
          <Button onPress={() => router.replace("/(tabs)")}>
            <Text className="text-button text-primary-foreground">Volver al inicio</Text>
          </Button>
        </SectionCard>
      </Screen>
    );
  }

  return <LessonWizard module={module} />;
}
