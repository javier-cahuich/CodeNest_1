import { type Session, type User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { useLessonProgressStore } from "@/stores/lesson-progress-store";

type AuthStatus = "loading" | "anonymous" | "authenticated";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = SignInParams;

type AuthState = {
  status: AuthStatus;
  isInitialized: boolean;
  session: Session | null;
  user: User | null;
  authError: string | null;
  registrationMessage: string | null;
  initialize: () => Promise<void>;
  clearAuthError: () => void;
  clearRegistrationMessage: () => void;
  signInWithEmail: (params: SignInParams) => Promise<{ error: string | null }>;
  signUpWithEmail: (params: SignUpParams) => Promise<{
    error: string | null;
    needsEmailVerification: boolean;
  }>;
  signOut: () => Promise<{ error: string | null }>;
};

let hasInitialized = false;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapAuthErrorMessage(message?: string) {
  if (!message) {
    return "No pudimos completar la autenticación. Inténtalo de nuevo.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos. Verifica tus datos e inténtalo otra vez.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Debes confirmar tu correo antes de iniciar sesión.";
  }

  if (normalized.includes("invalid email")) {
    return "Introduce un correo electrónico válido.";
  }

  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "Este correo ya está registrado. Inicia sesión o usa otro correo.";
  }

  if (normalized.includes("network")) {
    return "No se pudo conectar con Supabase. Revisa tu conexión e inténtalo de nuevo.";
  }

  return message;
}

function getAuthSnapshot(session: Session | null) {
  return {
    session,
    user: session?.user ?? null,
    status: session?.user ? ("authenticated" as const) : ("anonymous" as const),
    authError: null,
    registrationMessage: null,
    isInitialized: true,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "loading",
  isInitialized: false,
  session: null,
  user: null,
  authError: null,
  registrationMessage: null,
  clearAuthError: () => set({ authError: null }),
  clearRegistrationMessage: () => set({ registrationMessage: null }),
  initialize: async () => {
    if (hasInitialized) {
      return;
    }

    hasInitialized = true;
    set({ status: "loading", authError: null });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      useLessonProgressStore.getState().clearLessonProgress();
      set({
        status: "anonymous",
        session: null,
        user: null,
        isInitialized: true,
        authError: mapAuthErrorMessage(error.message),
        registrationMessage: null,
      });
    } else {
      set(getAuthSnapshot(session));
      if (session?.user) {
        void useLessonProgressStore.getState().loadCompletedLessons();
      } else {
        useLessonProgressStore.getState().clearLessonProgress();
      }
    }

    supabase.auth.onAuthStateChange((_event, nextSession) => {
      set(getAuthSnapshot(nextSession));
      if (nextSession?.user) {
        void useLessonProgressStore.getState().loadCompletedLessons();
      } else {
        useLessonProgressStore.getState().clearLessonProgress();
      }
    });
  },
  signInWithEmail: async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      const error = "Introduce un correo electrónico válido.";
      set({ authError: error });
      return { error };
    }

    if (!password.trim()) {
      const error = "La contraseña es obligatoria.";
      set({ authError: error });
      return { error };
    }

    set({ authError: null, registrationMessage: null });

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      const message = mapAuthErrorMessage(error.message);
      set({ authError: message });
      return { error: message };
    }

    set(getAuthSnapshot(session));
    void useLessonProgressStore.getState().loadCompletedLessons({ force: true });

    return { error: null };
  },
  signUpWithEmail: async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      const error = "Introduce un correo electrónico válido.";
      set({ authError: error });
      return { error, needsEmailVerification: false };
    }

    if (!password.trim()) {
      const error = "La contraseña es obligatoria.";
      set({ authError: error });
      return { error, needsEmailVerification: false };
    }

    if (password.trim().length < 6) {
      const error = "La contraseña debe tener al menos 6 caracteres.";
      set({ authError: error });
      return { error, needsEmailVerification: false };
    }

    set({ authError: null, registrationMessage: null });

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
    });

    if (error) {
      const message = mapAuthErrorMessage(error.message);
      set({ authError: message });
      return { error: message, needsEmailVerification: false };
    }

    if (session) {
      set(getAuthSnapshot(session));
      void useLessonProgressStore.getState().loadCompletedLessons({ force: true });
      return { error: null, needsEmailVerification: false };
    }

    const message =
      "Revisa tu correo para confirmar la cuenta antes de iniciar sesión. Cuando termines, podrás volver a acceder desde Perfil.";
    set({
      status: "anonymous",
      session: null,
      user: null,
      authError: null,
      registrationMessage: message,
      isInitialized: true,
    });

    return { error: null, needsEmailVerification: true };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      const message = mapAuthErrorMessage(error.message);
      set({ authError: message });
      return { error: message };
    }

    useLessonProgressStore.getState().clearLessonProgress();
    set({
      status: "anonymous",
      session: null,
      user: null,
      authError: null,
      registrationMessage: null,
      isInitialized: true,
    });

    return { error: null };
  },
}));
