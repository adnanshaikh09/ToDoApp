import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, TextInput, Button, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For the delete icon

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  // Function to add a task
  const addTask = () => {
    if (!taskTitle.trim()) return; // Ensuring task title is not empty
    const newTask = {
      id: tasks.length + 1, 
      title: taskTitle,    
      status: false,        
    };
    setTasks([...tasks, newTask]);  // Add the new task to the list
    setTaskTitle('');  // Clear the input after task is added
  };

  // Function to toggle task status
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Render individual task item
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      {/* Task title and status */}
      <Text style={[styles.taskText, item.status ? styles.doneText : styles.dueText]}>
        {item.title}
      </Text>
      {/* Switch to toggle between 'due/false' and 'done/true' */}
      <Switch
        value={item.status} // true = 'done', false = 'due'
        onValueChange={() => toggleTaskStatus(item.id)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={item.status ? '#4CAF50' : '#f4f3f4'}
      />
      {/* Delete button */}
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <MaterialIcons name="delete" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App Heading */}
      <Text style={styles.heading}>Todo list</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter task title"
          placeholderTextColor="#aaa"
          value={taskTitle}
          onChangeText={setTaskTitle}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={addTask}
          disabled={!taskTitle.trim()}
          style={[styles.addButton, { backgroundColor: taskTitle.trim() ? '#4CAF50' : '#B0BEC5' }]}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneText: {
    color: '#4CAF50',
    textDecorationLine: 'line-through',
  },
  dueText: {
    color: '#333',
  },
});

export default ToDoApp;
