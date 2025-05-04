import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";

function receiptPress(id: String) {
  console.log(id)
}
// Sample data
const DATA = [
  { id: '1', title: "Meow" },
  { id: '2', title: "Bark" },
  { id: '3', title: "Oink" },
  { id: '4', title: "Moo" },
  { id: '5', title: "Quack" },
  { id: '6', title: "Neigh" },
  { id: '7', title: "Baa" },
  { id: '8', title: "Cluck" },
  { id: '9', title: "Coo" },
  { id: '10', title: "Ribbit" },
  { id: '11', title: "Howl" },
  { id: '12', title: "Squeal" },
  { id: '13', title: "Chirp" },
  { id: '14', title: "Hiss" },
  { id: '15', title: "Croak" },
];

// Ensures title is a string
type ItemProps = {
  title: string;
};

// Iterate through each item
const Item = ({ title }: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={() => receiptPress(title)}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

// Build the list container
export default function List() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

// Style the list
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'gainsboro',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
  },
});
