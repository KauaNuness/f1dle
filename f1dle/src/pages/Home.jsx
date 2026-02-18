import { useState } from "react";
import { drivers } from "../data/drivers";
import { getDriverOfDay } from "../utils/getDriverOfDay";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GuessRow from "../components/GuessRow";
import DriverImage from "../components/DriverImage";

function Home() {
  const correctDriver = getDriverOfDay();
  const [guesses, setGuesses] = useState([]);
  const [won, setWon] = useState(false);

  const handleGuess = (driver) => {
    if (won) return;

    setGuesses([driver, ...guesses]);

    if (driver.name === correctDriver.name) {
      setWon(true);
    }
  };

  return (
    <div className="container">
      <Header />
      <DriverImage driver={correctDriver} revealed={won} />
      <SearchBar drivers={drivers} onGuess={handleGuess} />

      <div className="guesses">
        {guesses.map((g, index) => (
          <GuessRow key={index} guess={g} correct={correctDriver} />
        ))}
      </div>

      {won && <h2 className="win">Você acertou! 🎉</h2>}
    </div>
  );
}

export default Home;
