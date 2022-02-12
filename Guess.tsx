import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

export default function Guess({
  value,
  submitted,
  answer,
  addCloseMatchLetter,
  addCorrectLetter,
  addIncorrectLetter,
}: GuessProps) {
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
}

const styles = StyleSheet.create({
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
