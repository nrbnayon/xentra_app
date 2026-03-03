import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  // If authenticated, go to tabs
  if (isAuthenticated) {
    return <Redirect href="/(protected)" />;
  }

  // If not authenticated, go to login
  return <Redirect href="/(auth)/login" />;
}
