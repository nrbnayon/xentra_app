import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="language-select" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="contest-rules" />
      <Stack.Screen name="privacy" />
    </Stack>
  );
}
