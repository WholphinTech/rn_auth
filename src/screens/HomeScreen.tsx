/**
 * HomeScreen: renders AddTodo, flatlist of TodoItem.
 * If biometric is unavailable, shows a warning and disables mutation buttons (handled internally by the components).
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { useTodoState } from "../context/TodoContext";
import { isBiometricAvailable } from "../services/auth";
import { Todo } from "../types";

export default function HomeScreen() {
  const { todos, loaded } = useTodoState();
  const [biometricAvailable, setBiometricAvailable] = useState<boolean | null>(
    null
  );
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  //   useEffect(() => {
  //     (async () => {
  //       const ok = await isBiometricAvailable();
  //       setBiometricAvailable(ok); // true/false
  //     })();
  //   }, []);

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

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS === 'android' && !__DEV__) {
  //       const ok = await isBiometricAvailable();
  //       setBiometricAvailable(ok);
  //     } else {
  //       // in dev/emulator → assume available
  //       setBiometricAvailable(true);
  //     }
  //   })();
  // }, []);

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

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 32, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  warning: {
    backgroundColor: "#cc0000",
    padding: 8,
    margin: 8,
    borderRadius: 6,
  },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
});
