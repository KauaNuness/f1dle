function ResultModal({ isOpen, won, correctDriver, attempts, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true"><div className={`modal-card ${won ? "modal-win" : ""}`}>
        <h2>{won ? "🏁 Você acertou!" : "Fim de jogo"}</h2>
        <p>
          Piloto do dia: <strong>{correctDriver.name}</strong>
        </p>
        <p>Tentativas usadas: {attempts}</p>
        <button type="button" onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default ResultModal;