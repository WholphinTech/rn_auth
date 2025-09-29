import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import AddTodo from "../components/addTodo/AddTodo";
import TodoItem from "../components/todoItem/TodoItem";
import { useTodoState } from "../context/TodoContext";
import { isBiometricAvailable } from "../services/auth";
import { Todo } from "../types";
import { styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const { todos, loaded } = useTodoState();
  const [biometricAvailable, setBiometricAvailable] = useState<boolean | null>(
    null
  );
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    (async () => {
      if (__DEV__) {
        setBiometricAvailable(true); // assume available in dev/emulator
      } else {
        const ok = await isBiometricAvailable();
        setBiometricAvailable(ok);
      }
    })();
  }, []);

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {biometricAvailable === false && (
        <View style={styles.warning}>
          <Text style={{ color: "#fff" }}>
            Biometric/device authentication is not set up on this device.
            Add/Edit/Delete operations will be blocked.
          </Text>
        </View>
      )}

      {/* <AddTodo /> */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TodoItem todo={item} onEdit={() => setEditingTodo(item)} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No todos yet</Text>
        )}
      />

      <AddTodo
        editingTodo={editingTodo}
        clearEditing={() => setEditingTodo(null)}
      />
    </View>
  );
}
