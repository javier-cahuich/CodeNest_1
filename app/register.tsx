import * as React from "react";
import { Redirect, router } from "expo-router";
import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { useAuthStore } from "@/stores/auth-store";

type FieldErrors = {
  email?: string;
  password?: string;
  form?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterScreen() {
  const status = useAuthStore((state) => state.status);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);
  const clearRegistrationMessage = useAuthStore((state) => state.clearRegistrationMessage);
  const signUpWithEmail = useAuthStore((state) => state.signUpWithEmail);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});

  React.useEffect(() => {
    clearAuthError();
    clearRegistrationMessage();

    return () => {
      clearAuthError();
    };
  }, [clearAuthError, clearRegistrationMessage]);

  const handleRegister = React.useCallback(async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const nextErrors: FieldErrors = {};

    if (!trimmedEmail) {
      nextErrors.email = "El correo electrónico es obligatorio.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!trimmedPassword) {
      nextErrors.password = "La contraseña es obligatoria.";
    } else if (trimmedPassword.length < 6) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const result = await signUpWithEmail({ email: trimmedEmail, password: trimmedPassword });

    setIsSubmitting(false);

    if (result.error) {
      setFieldErrors({ form: result.error });
      return;
    }

    router.replace("/(tabs)/profile");
  }, [email, password, signUpWithEmail]);

  if (status === "authenticated") {
    return <Redirect href="/(tabs)/profile" />;
  }

  return (
    <Screen scroll contentClassName="gap-5">
      <View className="rounded-[32px] border border-border bg-card px-5 py-6">
        <View className="flex-row items-start gap-4">
          <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-primary/10">
            <LucideIcon name="UserPlus" size={24} className="text-primary" />
          </View>
          <View className="flex-1">
            <Text className="text-h2 text-card-foreground">Registro</Text>
            <Text className="mt-2 text-body leading-6 text-muted-foreground">
              Crea tu cuenta con correo y contraseña para guardar tu sesión en Supabase.
            </Text>
          </View>
        </View>
      </View>

      <View className="rounded-[28px] border border-border bg-card px-5 py-5">
        <Text className="text-caption uppercase tracking-[0.24em] text-muted-foreground">
          Nueva cuenta
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
            {fieldErrors.email ? (
              <Text className="text-caption leading-5 text-destructive">{fieldErrors.email}</Text>
            ) : null}
          </View>

          <View className="gap-2">
            <Text className="text-body text-card-foreground">Contraseña</Text>
            <Input
              autoCapitalize="none"
              autoComplete="password"
              onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={password}
            />
            {fieldErrors.password ? (
              <Text className="text-caption leading-5 text-destructive">
                {fieldErrors.password}
              </Text>
            ) : null}
          </View>
        </View>

        {fieldErrors.form ? (
          <View className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
            <Text className="text-body leading-6 text-destructive">{fieldErrors.form}</Text>
          </View>
        ) : (
          <Text className="mt-4 text-body leading-6 text-muted-foreground">
            Si tu proyecto requiere verificación por correo, verás un aviso para revisar tu email
            antes de iniciar sesión.
          </Text>
        )}

        <Button className="mt-5 h-12 rounded-2xl" disabled={isSubmitting} onPress={handleRegister}>
          <LucideIcon name="UserPlus" size={18} className="mr-2 text-primary-foreground" />
          <Text className="text-button text-primary-foreground">
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Text>
        </Button>

        <Button
          variant="outline"
          className="mt-3 h-12 rounded-2xl"
          disabled={isSubmitting}
          onPress={() => router.back()}
        >
          <Text className="text-button text-foreground">Volver</Text>
        </Button>
      </View>
    </Screen>
  );
}
