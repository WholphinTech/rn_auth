import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TodoProvider } from "./src/context/TodoContext";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <TodoProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});
