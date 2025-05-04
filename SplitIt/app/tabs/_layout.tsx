import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen name="index" options={{ title: 'Account' }} />
      <Tabs.Screen name="capture" options={{ title: 'Capture' }} />
      <Tabs.Screen name="history" options={{ title: '', }}/>
    </Tabs>
  );
}