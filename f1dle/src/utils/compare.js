// =============================
// COMPARAÇÃO DE STRINGS SIMPLES
// =============================
export const compareSimple = (guess, correct) => {
  return guess === correct ? "green" : "red";
};

// =============================
// COMPARAÇÃO DE ARRAYS (PARCIAL)
// =============================
export const compareArray = (guessArray, correctArray) => {
  // todos iguais
  const allEqual =
    guessArray.length === correctArray.length &&
    guessArray.every(item => correctArray.includes(item));

  if (allEqual) return "green";

  // pelo menos um igual
  const hasOne = guessArray.some(item =>
    correctArray.includes(item)
  );

  if (hasOne) return "yellow";

  return "red";
};

// =============================
// NÚMERO DO PILOTO (ARRAY)
// =============================
export const compareNumber = (guessNumbers, correctNumbers) => {
  const allEqual =
    guessNumbers.length === correctNumbers.length &&
    guessNumbers.every(num => correctNumbers.includes(num));

  if (allEqual) return "green";

  const hasOne = guessNumbers.some(num =>
    correctNumbers.includes(num)
  );

  if (hasOne) return "yellow";

  return "red";
};

// =============================
// TÍTULOS (APENAS VERDE OU VERMELHO)
// =============================
export const compareTitles = (guess, correct) => {
  return guess === correct ? "green" : "red";
};

// =============================
// ANO DE ESTREIA (COM SETA)
// =============================
export const compareYear = (guess, correct) => {
  if (guess === correct) {
    return {
      color: "green",
      arrow: "",
    };
  }

  if (guess < correct) {
    return {
      color: "red",
      arrow: "↑",
    };
  }

  return {
    color: "red",
    arrow: "↓",
  };
};

// =============================
// FUNÇÃO PRINCIPAL (OPCIONAL)
// =============================
// Se quiser comparar tudo de uma vez

export const compareDrivers = (guess, correct) => {
  return {
    name: compareSimple(guess.name, correct.name),
    nationality: compareSimple(guess.nationality, correct.nationality),
    teams: compareArray(guess.teams, correct.teams),
    number: compareNumber(guess.number, correct.number),
    titles: compareTitles(guess.titles, correct.titles),
    status: compareSimple(guess.status, correct.status),
    year: compareYear(guess.debut, correct.debut),
  };
};
