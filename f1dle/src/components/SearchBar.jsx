import { useState } from "react";

function SearchBar({ drivers, onGuess }) {
  const [input, setInput] = useState("");

  const suggestions = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (driver) => {
    onGuess(driver);
    setInput("");
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Digite o nome do piloto..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input && (
        <div className="suggestions">
          {suggestions.map((driver) => (
            <div
              key={driver.id}
              className="suggestion-item"
              onClick={() => handleSelect(driver)}
            >
              {driver.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
