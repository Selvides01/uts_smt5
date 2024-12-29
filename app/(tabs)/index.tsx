import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<{ id: number; title: string }[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://api.example.com/items'); // Replace with your API endpoint
      const data = await response.json();
      setItems(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch items');
    }
  };

  const addItem = async () => {
    if (text.trim() === '') return;

    if (editId !== null) {
      const updatedItem = { id: editId, title: text };
      try {
        const response = await fetch(`https://api.example.com/items/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });
        if (response.ok) {
          setItems((prevItems) =>
            prevItems.map((item) => (item.id === editId ? updatedItem : item))
          );
          setEditId(null);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update item');
      }
    } else {
      try {
        const response = await fetch('https://api.example.com/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: text }),
        });
        const newItem = await response.json();
        setItems((prevItems) => [...prevItems, newItem]);
      } catch (error) {
        Alert.alert('Error', 'Failed to add item');
      }
    }

    setText('');
  };

  const editItem = (id: number, title: string) => {
    setText(title);
    setEditId(id);
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`https://api.example.com/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan item"
        value={text}
        onChangeText={setText}
      />
      <Button title={editId !== null ? 'Update' : 'Add'} onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editItem(item.id, item.title)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
