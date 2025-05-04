import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import List from '@/components/list';

// TODO: Bring user to add another receipt
function onPressLearnMore() {
    console.log("Hello")
}

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}> 
            <SafeAreaView style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Receipts</Text> 
                    <TouchableOpacity style={styles.addButton} onPress={onPressLearnMore}>
                        <Text style={styles.addButtonLabel}>+</Text>
                    </TouchableOpacity>
            </SafeAreaView>
            <List />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // Screen
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    // Title box
    titleContainer: {
        flexDirection: 'row',
    },
    // Label for button
    addButtonLabel: {
      fontSize: 48,
      color: 'lightslategrey',
    },
    // Add receipt button style
    addButton: {
      margin: 10,
      marginRight: 20,
    },
    // Title of screen
    pageTitle: {
      flex: 3,
      fontSize: 48,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginTop: 10,
      marginLeft: 15,
    },
  });