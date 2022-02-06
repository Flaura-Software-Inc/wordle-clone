import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type GuessProps = {
  value: string;
  submitted: boolean;
  answerLetterMap: Map<string, number[]>;
};

const Guess = ({ value, submitted, answerLetterMap }: GuessProps) => {
  const getBackgroundColour = (letterIdx: number) => {
    if (!submitted) {
      return styles.whiteBackground;
    }

    const letter = value[letterIdx].toUpperCase();

    if (answerLetterMap.has(letter)) {
      if (answerLetterMap.get(letter)!.includes(letterIdx)) {
        return styles.greenBackground;
      }
      return styles.yellowBackground;
    } else {
      return styles.greyBackground;
    }
  };
  value = value.toUpperCase();
  // set outline to black for current letter
  return (
    <View style={styles.guess}>
      <View style={[styles.guessBox, getBackgroundColour(0)]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[0] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, getBackgroundColour(1)]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[1] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, getBackgroundColour(2)]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[2] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, getBackgroundColour(3)]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[3] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, getBackgroundColour(4)]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[4] ?? ""}
        </Text>
      </View>
    </View>
  );
};

type KeyboardProps = {
  onKeyPress: (_: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
};

const Keyboard = ({ onKeyPress, onDelete, onSubmit }: KeyboardProps) => {
  const topRow = "QWERTYUIOP";
  const middleRow = "ASDFGHJKL";
  const bottomRow = "ZXCVBNM";

  return (
    <View style={styles.keyboard}>
      <View style={styles.keyboardRow}>
        {topRow.split("").map((char) => {
          return (
            <View
              style={styles.keyboardKey}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={styles.keyboardLetter}>{char}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.keyboardRow}>
        {middleRow.split("").map((char) => {
          return (
            <View
              style={styles.keyboardKey}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={styles.keyboardLetter}>{char}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.keyboardRow}>
        <View onTouchEnd={onSubmit}>
          <Text>Submit</Text>
        </View>
        {bottomRow.split("").map((char) => {
          return (
            <View
              style={styles.keyboardKey}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={styles.keyboardLetter}>{char}</Text>
            </View>
          );
        })}
        <View onTouchEnd={() => onDelete()}>
          <Text>Delete</Text>
        </View>
      </View>
    </View>
  );
};

const createAnswerLetterMap = (answer: string) => {
  const letterMap: Map<string, number[]> = new Map();
  answer
    .toUpperCase()
    .split("")
    .forEach((char, i) => {
      if (letterMap.has(char)) {
        letterMap.get(char)!.push(i);
      } else {
        letterMap.set(char, [i]);
      }
    });
  return letterMap;
};

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const answer = "HELLO";
  const answerLetterMap = createAnswerLetterMap(answer);
  const onSubmit = () => {
    if (currentGuess.length < 5) {
      return;
    }
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess("");
    // detect whether the game has been won
  };
  const onKeyPress = (char: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + char);
    }
  };
  const onDelete = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Guess
        value={guesses[0] ?? (guesses.length === 0 ? currentGuess : "")}
        submitted={guesses.length >= 1}
        answerLetterMap={answerLetterMap}
      />
      <Guess
        value={guesses[1] ?? (guesses.length === 1 ? currentGuess : "")}
        submitted={guesses.length >= 2}
        answerLetterMap={answerLetterMap}
      />
      <Guess
        value={guesses[2] ?? (guesses.length === 2 ? currentGuess : "")}
        submitted={guesses.length >= 3}
        answerLetterMap={answerLetterMap}
      />
      <Guess
        value={guesses[3] ?? (guesses.length === 3 ? currentGuess : "")}
        submitted={guesses.length >= 4}
        answerLetterMap={answerLetterMap}
      />
      <Guess
        value={guesses[4] ?? (guesses.length === 4 ? currentGuess : "")}
        submitted={guesses.length >= 5}
        answerLetterMap={answerLetterMap}
      />
      <Guess
        value={guesses[5] ?? (guesses.length === 5 ? currentGuess : "")}
        submitted={guesses.length >= 6}
        answerLetterMap={answerLetterMap}
      />
      <Keyboard
        onKeyPress={onKeyPress}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
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
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  guessBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontSize: 30,
  },
  keyboard: {
    marginTop: 20,
    width: "85%",
  },
  keyboardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  keyboardKey: {
    fontSize: 25,
    width: 30,
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  keyboardLetter: {
    fontSize: 20,
  },
  greenBackground: {
    backgroundColor: "green",
    borderWidth: 0,
  },
  greyBackground: {
    backgroundColor: "grey",
    borderWidth: 0,
  },
  yellowBackground: {
    backgroundColor: "#c9b458",
    borderWidth: 0,
  },
  whiteBackground: {
    backgroundColor: "white",
  },
  whiteText: {
    color: "white",
  },
});
