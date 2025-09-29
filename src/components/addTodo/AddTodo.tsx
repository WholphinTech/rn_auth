import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useTodoDispatch } from "../../context/TodoContext";
import { requireAuth } from "../../services/auth";
import { Todo } from "../../types";
import { styles } from "./AddTodo.styles";

export default function AddTodo({
  editingTodo,
  clearEditing,
}: {
  editingTodo: Todo | null;
  clearEditing: () => void;
}) {
  const [text, setText] = useState(editingTodo?.title ?? "");
  const dispatch = useTodoDispatch();

  useEffect(() => {
    setText(editingTodo?.title ?? "");
  }, [editingTodo]);

  const onSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert("Field required", "please enter something");
      return;
    }

    const ok = await requireAuth(
      editingTodo ? "Authenticate to update TODO" : "Authenticate to add TODO"
    );
    if (!ok) {
      Alert.alert(
        "Authentication failed",
        "You need biometric authentication to add todos."
      );
      return;
    }

    if (editingTodo) {
      dispatch({
        type: "UPDATE",
        payload: { id: editingTodo.id, title: trimmed },
      });
      clearEditing();
    } else {
      dispatch({ type: "ADD", payload: { title: trimmed } });
    }

    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={editingTodo ? "Edit todo..." : "Add a todo..."}
        value={text}
        onChangeText={setText}
        style={styles.input}
        onSubmitEditing={onSubmit}
      />
      <Button title={editingTodo ? "Update" : "Add"} onPress={onSubmit} />
      {editingTodo && <Button title="Cancel" onPress={clearEditing} />}
    </View>
  );
}
