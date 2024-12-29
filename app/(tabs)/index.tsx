import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addItem = () => {
    if (text.trim() === '') return;

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) => (index === editIndex ? text : item));
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, text]);
    }
    setText('');
  };

  const editItem = (index: number) => {
    setText(items[index]);
    setEditIndex(index);
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Belajar React Native' },
    { id: 2, title: 'Mengerjakan tugas' },
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan item"
        value={text}
        onChangeText={setText}
      />
      <Button title={editIndex !== null ? 'Update' : 'Add'} onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editItem(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(index)}>
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
