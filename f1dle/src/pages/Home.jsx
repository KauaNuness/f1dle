import { useMemo, useState } from "react";
import { drivers } from "../data/drivers";
import { getDriverOfDay } from "../utils/getDriverOfDay";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GuessRow from "../components/GuessRow";
import DriverImage from "../components/DriverImage";
import ResultModal from "../components/ResultModal";

const MAX_ATTEMPTS = 6;

function Home() {
const correctDriver = useMemo(() => getDriverOfDay(), []);
  const [guesses, setGuesses] = useState([]);
  const [won, setWon] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const attemptsLeft = MAX_ATTEMPTS - guesses.length;
  const guessedIds = guesses.map((guess) => guess.id);
  const isGameOver = won || attemptsLeft <= 0;

  const handleGuess = (driver) => {
    if (isGameOver || guessedIds.includes(driver.id)) return;

    setGuesses([driver, ...guesses]);
    const updatedGuesses = [driver, ...guesses];
    setGuesses(updatedGuesses);

    if (driver.name === correctDriver.name) {
      setWon(true);
      setShowResult(true);
      return;
    }

    if (updatedGuesses.length >= MAX_ATTEMPTS) {
      setShowResult(true);
    }
  };

  return (
    <div className="container">
      <Header />  
      <DriverImage driver={correctDriver} revealed={isGameOver} />

      <p className="attempts">
        Tentativas restantes: <strong>{attemptsLeft}</strong> / {MAX_ATTEMPTS}
      </p>

      <SearchBar
        drivers={drivers}
        guessedIds={guessedIds}
        disabled={isGameOver}
        onGuess={handleGuess}
      />

      <div className="guess-row guess-row-head">
        <div>Nacionalidade</div>
        <div>Equipes</div>
        <div>Número</div>
        <div>Estreia</div>
        <div>Títulos</div>
        <div>Status</div>
      </div>

      <div className="guesses">  {guesses.map((guess) => (
          <GuessRow key={guess.id} guess={guess} correct={correctDriver} />
        ))}
      </div>

      <p className="legend">Dica: setas ↑↓ indicam se o valor correto é maior ou menor.</p>

      {won && <h2 className="win">Você acertou! 🎉</h2>}

      {isGameOver && !won && <h2 className="lose">Que pena! Tente novamente amanhã.</h2>}

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