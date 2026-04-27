// Bu dosya kullanicinin tahmin girdigi alan icin var.
// Input buton ve form gonderme mantigi burada duruyor.
// Kullanici harf ya da direkt kelimeyi bu kisimdan giriyor.
export default function GuessInput({ guess, setGuess, onGuess, disabled }) {
  // Form normalde gonderilince sayfa yenilenir.
  // Ben bunu istemedigim icin preventDefault kullandim.
  function handleSubmit(event) {
    event.preventDefault();
    onGuess();
  }

  return (
    // Form kullandigim icin Enter ile de tahmin yapilabiliyor.
    <form className="guess-form" onSubmit={handleSubmit}>
      <label htmlFor="guess">Harf ya da kelime tahminin</label>
      <div className="guess-controls">
        <input
          id="guess"
          type="text"
          // Bu controlled input ornegi.
          // Yani inputun icindeki degeri React kontrol ediyor.
          value={guess}
          // Oyun bittiginde input pasif olsun diye disabled kullandim.
          disabled={disabled}
          // Kullanici yazdikca setGuess calisiyor ve state guncelleniyor.
          onChange={(event) => setGuess(event.target.value)}
          placeholder="mesela a ya da elma"
          autoComplete="off"
        />
        {/* Input bosken butona basilip bos tahmin gitmesin diye pasif yaptim. */}
        <button type="submit" disabled={disabled || guess.trim().length === 0}>
          Tahmin Et
        </button>
      </div>
    </form>
  );
}
