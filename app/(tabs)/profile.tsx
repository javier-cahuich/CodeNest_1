import * as React from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfileTabScreen() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const registrationMessage = useAuthStore((state) => state.registrationMessage);
  const clearRegistrationMessage = useAuthStore((state) => state.clearRegistrationMessage);
  const signOut = useAuthStore((state) => state.signOut);

  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [signOutError, setSignOutError] = React.useState<string | null>(null);

  const handleSignOut = React.useCallback(async () => {
    setIsSigningOut(true);
    setSignOutError(null);

    const result = await signOut();

    setIsSigningOut(false);

    if (result.error) {
      setSignOutError(result.error);
    }
  }, [signOut]);

  React.useEffect(() => {
    if (registrationMessage) {
      clearRegistrationMessage();
    }
  }, [clearRegistrationMessage, registrationMessage]);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && Boolean(user);

  return (
    <Screen scroll contentClassName="gap-5">
      <View className="rounded-[32px] border border-border bg-card px-5 py-6">
        <View className="flex-row items-center gap-4">
          <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-primary/10">
            <LucideIcon name="UserRound" size={28} className="text-primary" />
          </View>
          <View className="flex-1">
            <Text className="text-h2 text-foreground">Tu perfil</Text>
            <Text className="mt-1 text-body text-muted-foreground">
              Gestiona el acceso a tu cuenta y revisa el estado actual de tu sesión.
            </Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View className="rounded-[28px] border border-border bg-secondary px-5 py-5">
          <Text className="text-h3 text-secondary-foreground">Comprobando sesión</Text>
          <Text className="mt-3 text-body leading-6 text-muted-foreground">
            Estamos verificando si ya existe una sesión activa en este dispositivo.
          </Text>
        </View>
      ) : null}

      {!isLoading && !isAuthenticated ? (
        <View className="rounded-[28px] border border-border bg-card px-5 py-5">
          <View className="flex-row items-start gap-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <LucideIcon name="LogIn" size={22} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-h3 text-card-foreground">Aún no has iniciado sesión</Text>
              <Text className="mt-2 text-body leading-6 text-muted-foreground">
                Entra con tu correo para guardar y recuperar tu sesión desde Supabase.
              </Text>
            </View>
          </View>

          <Button className="mt-5 h-12 rounded-2xl" onPress={() => router.push("/login")}>
            <LucideIcon name="Mail" size={18} className="mr-2 text-primary-foreground" />
            <Text className="text-button text-primary-foreground">Iniciar sesión</Text>
          </Button>

          <Button
            variant="outline"
            className="mt-3 h-12 rounded-2xl"
            onPress={() => router.push("/register")}
          >
            <LucideIcon name="UserPlus" size={18} className="mr-2 text-foreground" />
            <Text className="text-button text-foreground">Registrarse</Text>
          </Button>
        </View>
      ) : null}

      {!isLoading && isAuthenticated ? (
        <>
          <View className="rounded-[28px] border border-border bg-card px-5 py-5">
            <Text className="text-caption uppercase tracking-[0.24em] text-muted-foreground">
              Cuenta activa
            </Text>
            <View className="mt-4 flex-row items-start gap-4">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-success/10">
                <LucideIcon name="BadgeCheck" size={22} className="text-success" />
              </View>
              <View className="flex-1">
                <Text className="text-h3 text-card-foreground">Sesión iniciada</Text>
                <Text className="mt-2 text-body leading-6 text-muted-foreground">
                  {user?.email ?? "Correo no disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-[28px] border border-border bg-secondary px-5 py-5">
            <Text className="text-h3 text-secondary-foreground">Persistencia activa</Text>
            <Text className="mt-3 text-body leading-6 text-muted-foreground">
              La sesión se restaura al abrir la app y el estado se sincroniza automáticamente con
              Supabase.
            </Text>
          </View>

          {signOutError ? (
            <View className="rounded-[28px] border border-destructive/20 bg-destructive/10 px-5 py-4">
              <Text className="text-body leading-6 text-destructive">{signOutError}</Text>
            </View>
          ) : null}

          <Button
            variant="outline"
            className="h-12 rounded-2xl border-destructive/30"
            disabled={isSigningOut}
            onPress={handleSignOut}
          >
            <LucideIcon name="LogOut" size={18} className="mr-2 text-destructive" />
            <Text className="text-button text-destructive">
              {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </Text>
          </Button>
        </>
      ) : null}

      {!isLoading && !isAuthenticated && registrationMessage ? (
        <View className="rounded-[28px] border border-primary/20 bg-primary/10 px-5 py-5">
          <Text className="text-h3 text-card-foreground">Cuenta creada</Text>
          <Text className="mt-3 text-body leading-6 text-muted-foreground">
            {registrationMessage}
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}
