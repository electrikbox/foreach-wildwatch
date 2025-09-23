import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarBackgroundColor: "transparent",
        }}
      />
      <Stack.Screen
        name="observation-form"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
          statusBarStyle: "light",
          statusBarBackgroundColor: "transparent",
        }}
      />
    </Stack>
  );
}
