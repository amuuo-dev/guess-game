// import viteLogo from '/vite.svg'
import { languages } from "./languages";
import { useState } from "react";
import clsx from "clsx";
// * Goal: Allow the user to start guessing the letters
//  *
//  * Challenge: Create a new array in state to hold user's
//  * guessed letters. When the user chooses a letter, add
//  * that letter to this state array.
//  *
//  * Don't worry about whether it was a right or wrong
//  * guess yet.

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetter, setGuessedLetter] = useState([]);
  // console.log(guessedLetter);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  }

  const languagesElements = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span key={index} style={styles} className="rounded-sm p-[4.5px]">
        {lang.name}
      </span>
    );
  });

  const letterElement = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      className="h-[40px] w-[40px] bg-[#323232] flex justify-center items-center text-lg border-b border-[#F9F4DA]"
    >
      {letter.toUpperCase()}
    </span>
  ));

  const keyboard = alphabet.split("").map((keyword, index) => {
    const isGuessed = guessedLetter.includes(keyword);
    const isCorrect = isGuessed && currentWord.includes(keyword);
    const isWrong = isGuessed && !currentWord.includes(keyword);
    const className = clsx(
      "h-[35px] w-[35px] bg-[#FCBA29] border border-[#D7D7D7] rounded-[3px] cursor-pointer text-black",
      {
        "!bg-[#10A95B]": isCorrect,
        "!bg-[#EC5D49]": isWrong,
      }
    );
    return (
      <button
        key={index}
        onClick={() => addGuessedLetter(keyword)}
        className={className}
      >
        {keyword.toUpperCase()}
      </button>
    );
  });
  return (
    <main>
      <header className="text-center">
        <h1 className="font-medium text-xl text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-sm max-w-[450px] text-gray-500">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <div className="bg-[#10A95B] flex flex-col justify-center items-center text-[#F9F4DA] rounded-md my-8 p-4">
        <h2 className="my-1 text-xl">YOU WIN!</h2>
        <p className="my-1">Well done! 🎉</p>
      </div>
      <div className="flex flex-wrap max-w-[450px] gap-[5px] justify-center mb-[36px]">
        {languagesElements}
      </div>
      <div className="flex justify-center gap-[2px] mb-[20px]">
        {letterElement}
      </div>
      <div className="flex flex-wrap gap-[8px] justify-center max-w-[450px] mb-[36px]">
        {keyboard}
      </div>
      <button className="bg-[#11B5E5] border border-[#D7D7D7] rounded-md w-[225px] h-[40px] px-3 py-1.5 block mx-auto cursor-pointer">
        New Game
      </button>
    </main>
  );
}
export default App;
