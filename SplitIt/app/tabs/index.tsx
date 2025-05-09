import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

// Display account home view
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href={"/tabs/capture" as const}>Go to Details</Link>
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  // Container for account elements
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
