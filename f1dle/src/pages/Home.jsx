import { useMemo, useState } from "react";
import { drivers } from "../data/drivers";
import { getDriverOfDay } from "../utils/getDriverOfDay";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GuessRow from "../components/GuessRow";
import ResultModal from "../components/ResultModal";

function Home() {
  const correctDriver = useMemo(() => getDriverOfDay(), []);
  const [guesses, setGuesses] = useState([]);
  const [won, setWon] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const guessedIds = guesses.map((guess) => guess.id);
  const isGameOver = won;

  const handleGuess = (driver) => {
    if (isGameOver || guessedIds.includes(driver.id)) return;
    const updatedGuesses = [driver, ...guesses];
    setGuesses(updatedGuesses);

    if (driver.name === correctDriver.name) {
      setWon(true);
      setShowResult(true);
    }
  };

  return (
    <div className="container">
      <Header />
      <p className="attempts">Sem limite de chutes. Continue até acertar.</p>

      <SearchBar
        drivers={drivers}
        guessedIds={guessedIds}
        disabled={isGameOver}
        onGuess={handleGuess}
      />

      <div className="guess-row guess-row-head">
        <div>Piloto</div>
        <div>Nacionalidade</div>
        <div>Equipes</div>
        <div>Número</div>
        <div>Estreia</div>
        <div>Títulos</div>
        <div>Status</div>
      </div>

      <div className="guesses">  {guesses.map((guess, index) => (
        <GuessRow
          key={guess.id}
          guess={guess}
          correct={correctDriver}
          delay={index * 90}
          isCorrectGuess={guess.id === correctDriver.id}
        />
      ))}
      </div>

      <p className="legend">Dica: setas ↑↓ indicam se o valor correto é maior ou menor.</p>

      {won && <h2 className="win">Você acertou! 🎉</h2>}
      <ResultModal
        isOpen={showResult}
        won={won}
        correctDriver={correctDriver}
        attempts={guesses.length}
        onClose={() => setShowResult(false)}
      />
    </div>
  );
}

export default Home;