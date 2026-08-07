import { Redirect, router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginScreen() {
  const status = useAuthStore((state) => state.status);
  const authError = useAuthStore((state) => state.authError);
  const signInWithEmail = useAuthStore((state) => state.signInWithEmail);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, [clearAuthError]);

  const handleLogin = React.useCallback(async () => {
    setIsSubmitting(true);
    const result = await signInWithEmail({ email, password });
    setIsSubmitting(false);

    if (!result.error) {
      router.replace("/(tabs)/profile");
    }
  }, [email, password, signInWithEmail]);

  if (status === "authenticated") {
    return <Redirect href="/(tabs)/profile" />;
  }

  return (
    <Screen scroll contentClassName="gap-5">
      <View className="rounded-[32px] border border-border bg-card px-5 py-6">
        <View className="flex-row items-start gap-4">
          <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-primary/10">
            <LucideIcon name="ShieldCheck" size={24} className="text-primary" />
          </View>
          <View className="flex-1">
            <Text className="text-h2 text-card-foreground">Iniciar sesión</Text>
            <Text className="mt-2 text-body leading-6 text-muted-foreground">
              Accede con tu cuenta de Supabase para ver tu correo y mantener la sesión activa.
            </Text>
          </View>
        </View>
      </View>

      <View className="rounded-[28px] border border-border bg-card px-5 py-5">
        <Text className="text-caption uppercase tracking-[0.24em] text-muted-foreground">
          Acceso
        </Text>

        <View className="mt-5 gap-4">
          <View className="gap-2">
            <Text className="text-body text-card-foreground">Correo electrónico</Text>
            <Input
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="tu@correo.com"
              value={email}
            />
          </View>

          <View className="gap-2">
            <Text className="text-body text-card-foreground">Contraseña</Text>
            <Input
              autoCapitalize="none"
              autoComplete="password"
              onChangeText={setPassword}
              placeholder="Tu contraseña"
              secureTextEntry
              value={password}
            />
          </View>
        </View>

        {authError ? (
          <View className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
            <Text className="text-body leading-6 text-destructive">{authError}</Text>
          </View>
        ) : null}

        <Button className="mt-5 h-12 rounded-2xl" disabled={isSubmitting} onPress={handleLogin}>
          <LucideIcon name="LogIn" size={18} className="mr-2 text-primary-foreground" />
          <Text className="text-button text-primary-foreground">
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Text>
        </Button>

        <Button
          variant="outline"
          className="mt-3 h-12 rounded-2xl"
          disabled={isSubmitting}
          onPress={() => router.back()}
        >
          <Text className="text-button text-foreground">Volver a Perfil</Text>
        </Button>

        <Text className="mt-4 text-body leading-6 text-muted-foreground">
          Esta pantalla usa autenticación real con Supabase. Necesitas una cuenta ya registrada en
          tu proyecto para poder acceder.
        </Text>
      </View>
    </Screen>
  );
}
