import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import { useTodoDispatch } from "../context/TodoContext";
import { requireAuth } from "../services/auth";
import { Todo } from "../types";

export default function AddTodo({ editingTodo, clearEditing }: { editingTodo: Todo | null, clearEditing: () => void }) {
  const [text, setText] = useState(editingTodo?.title ?? '');
  const dispatch = useTodoDispatch();

  useEffect(() => {
    setText(editingTodo?.title ?? '');
  }, [editingTodo]);

  const onSubmit = async () => {
           
    const trimmed = text.trim();
    if (!trimmed) return;

    // const ok = await requireAuth(editingTodo ? 'Authenticate to update TODO' : 'Authenticate to add TODO');
    // if (!ok){
    //   Alert.alert(
    //     "Authentication failed",
    //     "You need biometric authentication to add todos."
    //   );
    //   return;

    // } 

    if (editingTodo) {
      dispatch({ type: 'UPDATE', payload: { id: editingTodo.id, title: trimmed } });
      clearEditing();
    } else {
      dispatch({ type: 'ADD', payload: { title: trimmed } });
    }

    setText('');
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








// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   Keyboard,
//   Alert,
// } from "react-native";
// import { useTodoDispatch } from "../context/TodoContext";
// import { requireAuth } from "../services/auth";

// /**
//  * AddTodo: small component with an input and an "Add" button.
//  * It calls requireAuth() before dispatching the ADD action.
//  */

// export default function AddTodo() {
//   const [text, setText] = useState("");
//   const dispatch = useTodoDispatch();

 
//   const onAdd = async () => {
//     const trimmed = text.trim();
//     if (!trimmed) return;
//     const ok = await requireAuth("Authenticate to add a TODO");
//     if (!ok) {
//       Alert.alert(
//         "Authentication failed",
//         "You need biometric authentication to add todos."
//       );
//       return;
//     }
//     dispatch({ type: "ADD", payload: { title: trimmed } });
//     setText("");
//     Keyboard.dismiss();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Add a todo..."
//         value={text}
//         onChangeText={setText}
//         style={styles.input}
//         onSubmitEditing={onAdd}
//         returnKeyType="done"
//       />
//       <Button title="Add" onPress={onAdd} />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 8, alignItems: "center", gap:10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding:10,
//     marginRight: 8,
    borderRadius: 4,
  },
});
