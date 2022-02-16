import { StyleSheet, Text, View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";

type KeyboardProps = {
  onKeyPress: (_: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  correctLetters: string[];
  closeMatchLetters: string[];
  incorrectLetters: string[];
};

type KeyProps = {
  onKeyPress: (_: string) => void;
  keyStyles: [{}, {}],
  char: string
}

const Key = ({ keyStyles, onKeyPress, char}: KeyProps) => {
  return(
    <TouchableOpacity>
      <View
      style={[styles.keyboardKey, keyStyles[0]]}
      onTouchEnd={() => onKeyPress(char)}
      key={`key-${char}`}
      >
        <Text style={[styles.keyboardLetter, keyStyles[1]]}>{char}</Text>
      </View>
    </TouchableOpacity>
    
  )
}

export default function Keyboard({
  onKeyPress,
  onDelete,
  onSubmit,
  correctLetters,
  closeMatchLetters,
  incorrectLetters,
}: KeyboardProps) {
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
            <Key keyStyles={keyStyles} onKeyPress={onKeyPress} char={char} key={`key-${char}`}/>
          );
        })}
      </View>
      <View style={styles.keyboardRow}>
        {middleRow.split("").map((char) => {
          const keyStyles = calculateKeyStyles(char);
          return (
            <Key keyStyles={keyStyles} onKeyPress={onKeyPress} char={char} key={`key-${char}`}/>
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
            <Key keyStyles={keyStyles} onKeyPress={onKeyPress} char={char} key={`key-${char}`}/>
          );
        })}
        <View onTouchEnd={() => onDelete()}>
          <Text>Delete</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 5
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
