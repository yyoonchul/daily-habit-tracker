import { Tabs } from 'expo-router';
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(analytics)" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="(management)" options={{ title: 'Manage' }} />
      <Tabs.Screen name="(settings)" options={{ title: 'Settings' }} />
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
    </Tabs>
  );
}
