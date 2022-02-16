import { useState } from "react";
import { StyleSheet, View, Modal, Text, Pressable } from "react-native";
import Guess from "./Guess";
import Keyboard from "./Keyboard";
import * as words from "./fiveLetterWords.json";
import Toast from "react-native-toast-message";

const wordList = words.words;

type GameState = "inProgress" | "won" | "lost";

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [answer, setAnswer] = useState(
    wordList[Math.round(Math.random() * (wordList.length - 1))]
  );
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [closeMatchLetters, setCloseMatchLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>("inProgress");

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
      Toast.show({
        type: "error",
        text1: "Uh Oh",
        text2: "Finish your word!",
      });
      return;
    }
    if (!words.words.includes(currentGuess.toLowerCase())) {
      Toast.show({
        type: "error",
        text1: "Uh Oh",
        text2: "Word not recognised",
      });
      return;
    }
    if (guesses.includes(currentGuess)) {
      Toast.show({
        type: "error",
        text1: "Uh Oh",
        text2: "You've already guessed this word",
      });
      return;
    }
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess("");
    if (currentGuess.toLowerCase() === answer.toLowerCase()) {
      setTimeout(() => {
        setGameState("won");
      }, 1500);
      return;
    }
    if (guesses.length === 5) {
      setTimeout(() => {
        setGameState("lost");
      }, 1500);
      return;
    }
    // detect whether the game has been won or lost
    // if lost toast/modal with answer
    // if win modal and 'refresh' button
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

  const resetGameBoard = () => {
    setGuesses([]);
    setCurrentGuess("");
    setAnswer(wordList[Math.round(Math.random() * (wordList.length - 1))]);
    setCloseMatchLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setGameState("inProgress");
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
      <Modal
        visible={["won", "lost"].includes(gameState)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {gameState === "won" && <Text>Im a model and I won</Text>}
            {gameState === "lost" && (
              <Text>Im a model and I lost {answer}</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => resetGameBoard()}
            >
              <Text style={styles.textStyle}>Start New Game</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Toast />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
