import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function CaptureScreen() {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Link href="/tabs/history">Access History</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
