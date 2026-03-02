function GuessRow({ guess, correct, delay = 0, isCorrectGuess = false }) {
  const getClass = (value, correctValue) => {
    if (value === correctValue) return "correct";
    return "wrong";
  };

  const getTeamClass = () => {
    const intersection = guess.teams.filter((team) =>
      correct.teams.includes(team)
    );

    if (
      intersection.length === correct.teams.length &&
      guess.teams.length === correct.teams.length
    ) {
      return "correct";
    }

    if (intersection.length > 0) {
      return "partial";
    }

    return "wrong";
  };

  const getHint = (value, correctValue) => {
    if (value === correctValue) return "";
    return value > correctValue ? " ↓" : " ↑";
  };

  return (<div
      className={`guess-row guess-row-animated ${isCorrectGuess ? "guess-row-win" : ""}`}
      style={{ "--guess-delay": `${delay}ms` }}
    >
      <div className="driver-cell">
        <img src={guess.image} alt={guess.name} className="driver-thumb" />
      </div>

      <div className={getClass(guess.nationality, correct.nationality)}>
        {guess.nationality}
      </div>

      <div className={getTeamClass()}>
        {guess.teams.join(", ")}
      </div>

      <div className={getClass(guess.number, correct.number)}>
        #{guess.number}
        {getHint(guess.number, correct.number)}
      </div>

      <div className={getClass(guess.debut, correct.debut)}>
        {guess.debut}
        {getHint(guess.debut, correct.debut)}
      </div>

      <div className={getClass(guess.titles, correct.titles)}>
        🏆 {guess.titles}
        {getHint(guess.titles, correct.titles)}
      </div>

      <div className={getClass(guess.status, correct.status)}>
        {guess.status}
      </div>
    </div>
  );
}

export default GuessRow;