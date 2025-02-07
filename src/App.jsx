// import viteLogo from '/vite.svg'
import { languages } from "./languages";

function App() {
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
  return (
    <main>
      <header className="text-center">
        <h1 className="font-medium text-xl text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-sm max-w-[350px] text-gray-500">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <div className="bg-[#10A95B] flex flex-col justify-center items-center text-[#F9F4DA] rounded-md my-8 p-4">
        <h2 className="my-1 text-xl">YOU WIN!</h2>
        <p className="my-1">Well done! 🎉</p>
      </div>
      <div className="flex flex-wrap max-w-[350px] gap-[5px] justify-center">
        {languagesElements}
      </div>
    </main>
  );
}

export default App;
