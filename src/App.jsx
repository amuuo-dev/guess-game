import { languages } from "./languages";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const wrongGuessedCount = guessedLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const numGuessesLeft = languages.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetter.includes(letter));
  const isGameLost = wrongGuessedCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetter[guessedLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  function addGuessedLetter(letter) {
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetter([]);
  }

  const languagesElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessedCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span
        key={index}
        style={styles}
        className={clsx("relative rounded-sm p-[4.5px]", {
          "after:content-['💀'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:flex after:items-center after:justify-center after:bg-black/70 after:text-white after:text-[0.85rem] after:rounded-sm":
            isLanguageLost,
        })}
      >
        {lang.name}
      </span>
    );
  });

  const letterElement = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetter.includes(letter);
    const letterClassName = clsx(
      "h-[40px] w-[40px] bg-[#323232] flex justify-center items-center text-lg border-b border-[#F9F4DA]",
      isGameLost && !guessedLetter.includes(letter) && "text-[#EC5D49]"
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboard = alphabet.split("").map((keyword, index) => {
    const isGuessed = guessedLetter.includes(keyword);
    const isCorrect = isGuessed && currentWord.includes(keyword);
    const isWrong = isGuessed && !currentWord.includes(keyword);
    const className = clsx(
      "h-[35px] w-[35px] bg-[#FCBA29] border border-[#D7D7D7] rounded-[3px] cursor-pointer text-black",
      {
        "!bg-[#10A95B]": isCorrect,
        "!bg-[#EC5D49]": isWrong,
        "cursor-not-allowed opacity-50": isGameOver,
      }
    );
    return (
      <button
        key={index}
        disabled={isGameOver}
        aria-disabled={guessedLetter.includes(keyword)}
        aria-label={`Letter ${keyword}`}
        onClick={() => addGuessedLetter(keyword)}
        className={className}
      >
        {keyword.toUpperCase()}
      </button>
    );
  });
  const gameStatus = clsx(
    "flex flex-col justify-center items-center text-[#F9F4DA] rounded-md my-8 p-4 w-full max-w-[350px]",
    {
      "bg-[#10A95B]": isGameWon,
      "bg-[#BA2A2A]": isGameLost,
      "bg-[#7A5EA7] border border-dashed border-[#323232]":
        !isGameOver && isLastGuessIncorrect,
    }
  );

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="italic font-normal">
          {getFarewellText(languages[wrongGuessedCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  return (
    <main className="flex flex-col items-center">
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header className="text-center">
        <h1 className="font-medium text-xl text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-sm max-w-[350px] text-gray-500">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <div className={gameStatus} aria-live="polite" role="status">
        {renderGameStatus()}
      </div>
      <div className="flex flex-wrap max-w-[350px] gap-[5px] justify-center mb-[36px]">
        {languagesElements}
      </div>
      <div className="flex justify-center gap-[2px] mb-[20px]">
        {letterElement}
      </div>
      {/* for screen readers only a11y */}
      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetter.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <div className="flex flex-wrap gap-[8px] justify-center max-w-[450px] mb-[36px]">
        {keyboard}
      </div>
      {isGameOver && (
        <button
          className="bg-[#11B5E5] border border-[#D7D7D7] rounded-md w-[225px] h-[40px] px-3 py-1.5 block mx-auto cursor-pointer"
          onClick={startNewGame}
        >
          New Game
        </button>
      )}
    </main>
  );
}
export default App;
