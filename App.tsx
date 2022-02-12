import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Guess from "./Guess";
import Keyboard from "./Keyboard";
import * as words from "./fiveLetterWords.json";

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [answer, setAnswer] = useState(
    words.words[Math.round(Math.random() * words.words.length)]
  );
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
    if (
      currentGuess.length < 5 ||
      !words.words.includes(currentGuess.toLowerCase())
    ) {
      // toast for reason
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
    <View style={styles.container}>
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
});
