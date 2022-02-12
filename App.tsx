import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type GuessProps = {
  value: string;
  submitted: boolean;
  answer: string;
  addCorrectLetter: (char: string) => void;
  addCloseMatchLetter: (char: string) => void;
  addIncorrectLetter: (char: string) => void;
};

const createLetterMap = (answer: string) => {
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

const Guess = ({
  value,
  submitted,
  answer,
  addCloseMatchLetter,
  addCorrectLetter,
  addIncorrectLetter,
}: GuessProps) => {
  const answerLetterMap = createLetterMap(answer);
  const [tileColours, setTileColours] = useState([
    styles.whiteBackground,
    styles.whiteBackground,
    styles.whiteBackground,
    styles.whiteBackground,
    styles.whiteBackground,
  ]);

  useEffect(() => {
    if (submitted) {
      const guessLetterMap: Map<string, number[]> = createLetterMap(value);

      Array.from(guessLetterMap.keys()).forEach((char) => {
        let charIndexes = guessLetterMap.get(char);

        if (!answerLetterMap.has(char)) {
          charIndexes!.forEach(
            (charIdx) => (tileColours[charIdx] = styles.greyBackground)
          );
          addIncorrectLetter(char);
        } else {
          charIndexes!.forEach((charIdx) => {
            if (answerLetterMap.get(char)!.includes(charIdx)) {
              tileColours[charIdx] = styles.greenBackground;
              charIndexes = charIndexes!.filter((idx) => idx !== charIdx);
              answerLetterMap.set(
                char,
                answerLetterMap.get(char)!.filter((idx) => idx !== charIdx)
              );
              addCorrectLetter(char);
            }
          });
          charIndexes!.forEach((charIdx, i) => {
            if (i < answerLetterMap.get(char)!.length) {
              tileColours[charIdx] = styles.yellowBackground;
              addCloseMatchLetter(char);
            } else {
              tileColours[charIdx] = styles.greyBackground;
            }
          });
        }
      });
    }
  }, [submitted]);

  value = value.toUpperCase();
  // set outline to black for filled letter
  return (
    <View style={styles.guess}>
      <View style={[styles.guessBox, tileColours[0]]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[0] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, tileColours[1]]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[1] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, tileColours[2]]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[2] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, tileColours[3]]}>
        <Text style={[styles.letter, submitted && styles.whiteText]}>
          {value[3] ?? ""}
        </Text>
      </View>
      <View style={[styles.guessBox, tileColours[4]]}>
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
  correctLetters: string[];
  closeMatchLetters: string[];
  incorrectLetters: string[];
};

const Keyboard = ({
  onKeyPress,
  onDelete,
  onSubmit,
  correctLetters,
  closeMatchLetters,
  incorrectLetters,
}: KeyboardProps) => {
  const topRow = "QWERTYUIOP";
  const middleRow = "ASDFGHJKL";
  const bottomRow = "ZXCVBNM";

  const calculateKeyStyles = (char: string): [ViewStyle, TextStyle] => {
    if (correctLetters.includes(char)) {
      return [styles.greenBackground, styles.whiteText];
    } else if (closeMatchLetters.includes(char)) {
      return [styles.yellowBackground, styles.whiteText];
    } else if (incorrectLetters.includes(char)) {
      return [styles.greyBackground, styles.whiteText];
    } else {
      return [styles.whiteBackground, styles.blackText];
    }
  };

  return (
    <View style={styles.keyboard}>
      <View style={styles.keyboardRow}>
        {topRow.split("").map((char) => {
          const keyStyles = calculateKeyStyles(char);
          return (
            <View
              style={[styles.keyboardKey, keyStyles[0]]}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={[styles.keyboardLetter, keyStyles[1]]}>{char}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.keyboardRow}>
        {middleRow.split("").map((char) => {
          const keyStyles = calculateKeyStyles(char);
          return (
            <View
              style={[styles.keyboardKey, keyStyles[0]]}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={[styles.keyboardLetter, keyStyles[1]]}>{char}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.keyboardRow}>
        <View onTouchEnd={onSubmit}>
          <Text>Submit</Text>
        </View>
        {bottomRow.split("").map((char) => {
          const keyStyles = calculateKeyStyles(char);
          return (
            <View
              style={[styles.keyboardKey, keyStyles[0]]}
              onTouchEnd={() => onKeyPress(char)}
              key={`key-${char}`}
            >
              <Text style={[styles.keyboardLetter, keyStyles[1]]}>{char}</Text>
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

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const answer = "HELLO";
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [closeMatchLetters, setCloseMatchLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);

  const addCorrectLetter = (char: string) => {
    if (closeMatchLetters.indexOf(char) !== -1) {
      setCloseMatchLetters(
        closeMatchLetters.filter((letter) => letter !== char)
      );
    }
    if (correctLetters.indexOf(char) === -1) {
      setCorrectLetters((correctLetters) => [...correctLetters, char]);
    }
  };

  const addCloseMatchLetter = (char: string) => {
    if (correctLetters.indexOf(char) !== -1) {
      return;
    }
    if (closeMatchLetters.indexOf(char) === -1) {
      setCloseMatchLetters((closeMatchLetters) => [...closeMatchLetters, char]);
    }
  };

  const addIncorrectLetter = (char: string) => {
    if (incorrectLetters.indexOf(char) === -1) {
      setIncorrectLetters((incorrectLetters) => [...incorrectLetters, char]);
    }
  };

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
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Guess
        value={guesses[1] ?? (guesses.length === 1 ? currentGuess : "")}
        submitted={guesses.length >= 2}
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Guess
        value={guesses[2] ?? (guesses.length === 2 ? currentGuess : "")}
        submitted={guesses.length >= 3}
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Guess
        value={guesses[3] ?? (guesses.length === 3 ? currentGuess : "")}
        submitted={guesses.length >= 4}
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Guess
        value={guesses[4] ?? (guesses.length === 4 ? currentGuess : "")}
        submitted={guesses.length >= 5}
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Guess
        value={guesses[5] ?? (guesses.length === 5 ? currentGuess : "")}
        submitted={guesses.length >= 6}
        answer={answer}
        addCorrectLetter={addCorrectLetter}
        addCloseMatchLetter={addCloseMatchLetter}
        addIncorrectLetter={addIncorrectLetter}
      />
      <Keyboard
        onKeyPress={onKeyPress}
        onDelete={onDelete}
        onSubmit={onSubmit}
        correctLetters={correctLetters}
        closeMatchLetters={closeMatchLetters}
        incorrectLetters={incorrectLetters}
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
  blackText: {
    color: "black",
  },
});
