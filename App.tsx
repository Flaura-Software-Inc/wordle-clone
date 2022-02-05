import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Guess = () => {
  return (
    <View style={styles.guess}>
      <View style={styles.guessBox}>
        <Text style={styles.letter}>H</Text>
      </View>
      <View style={styles.guessBox}>
        <Text style={styles.letter}>H</Text>
      </View>
      <View style={styles.guessBox}>
        <Text style={styles.letter}>H</Text>
      </View>
      <View style={styles.guessBox}>
        <Text style={styles.letter}>H</Text>
      </View>
      <View style={styles.guessBox}>
        <Text style={styles.letter}>H</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Guess />
      <Guess />
      <Guess />
      <Guess />
      <Guess />
      <Guess />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  guess: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  guessBox: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#a9a9a9",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontSize: 25,
  },
});
