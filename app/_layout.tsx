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
          presentation: "transparentModal",
        }}
      />
    </Stack>
  );
}
