import { useMemo, useState } from "react";

function SearchBar({ drivers, guessedIds, disabled, onGuess }) {
  const [input, setInput] = useState("");

  const availableDrivers = useMemo(
    () => drivers.filter((driver) => !guessedIds.includes(driver.id)),
    [drivers, guessedIds]
  );

  const suggestions = useMemo(() => {
    const term = input.trim().toLowerCase();

    if (!term) return [];

    return availableDrivers.filter((driver) =>
      driver.name.toLowerCase().includes(term)
    );
  }, [availableDrivers, input]);

  const handleSelect = (driver) => {
    if (disabled) return;
    onGuess(driver);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && suggestions[0]) {
      event.preventDefault();
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={disabled ? "Rodada finalizada" : "Digite o nome do piloto..."}
        value={input}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {input && !disabled && (
        <div className="suggestions">{suggestions.length > 0 ? (
          suggestions.map((driver) => (
            <button
              type="button"
              key={driver.id}
              className="suggestion-item"
              onClick={() => handleSelect(driver)}
            >
              {driver.name}
            </button>
          ))
        ) : (
          <p className="suggestion-empty">Nenhum piloto encontrado.</p>
        )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;