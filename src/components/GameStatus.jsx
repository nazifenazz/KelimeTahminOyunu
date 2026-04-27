// Bu dosya oyunun bilgi paneli gibi calisiyor.
// Skor tur sayisi kalan hak dogru harfler yanlis harfler ve sonuc mesaji burada gosteriliyor.
export default function GameStatus({
  remainingRight,
  maxWrongCount,
  correctLetters,
  wrongLetters,
  message,
  isWin,
  isLose,
  word,
  playedCount,
  winCount,
  score,
}) {
  return (
    <div className="status-area">
      {/* En ustte genel istatistikleri gosteriyorum. */}
      <div className="score-grid">
        <p>
          Tur <strong>{playedCount}</strong>
        </p>
        <p>
          Kazanılan <strong>{winCount}</strong>
        </p>
        <p>
          Skor <strong>{score}</strong>
        </p>
      </div>

      <p className="status-title">
        Kalan hak <strong>{remainingRight}</strong>
      </p>

      {/* Burada kalan haklari kutucuk olarak da gosteriyorum. */}
      <div className="life-boxes" aria-label={`${remainingRight} hak kaldı`}>
        {Array.from({ length: maxWrongCount }).map((_, index) => {
          // Index kalan haktan kucukse o kutu dolu gorunuyor.
          const isActive = index < remainingRight;

          return (
            <span
              className={isActive ? "life-box active" : "life-box"}
              key={index}
            />
          );
        })}
      </div>

      {/* Dogru ve yanlis harfleri ayri gostermek daha acik olsun diye boyle yaptim. */}
      <div className="letter-lists">
        <p>
          Doğru harfler:{" "}
          {/* Hic veri yoksa bos kalmasin diye tire koydum. */}
          <strong>{correctLetters.length > 0 ? correctLetters.join(", ") : "-"}</strong>
        </p>

        <p>
          Yanlış harfler:{" "}
          {/* Join ile dizideki harfleri virgullu sekilde yazdiriyorum. */}
          <strong>{wrongLetters.length > 0 ? wrongLetters.join(", ") : "-"}</strong>
        </p>
      </div>

      {/* Message doluysa kullaniciya kisa bilgi mesaji gosteriliyor. */}
      {message && <p className="message">{message}</p>}

      {/* Burada kosullu render var. Hangisi dogruysa sadece o mesaj gorunuyor. */}
      {isWin && <p className="result win">Harika bildin.</p>}
      {isLose && (
        <p className="result lose">
          Bu tur olmadi. Kelime <strong>{word}</strong> idi.
        </p>
      )}
    </div>
  );
}
