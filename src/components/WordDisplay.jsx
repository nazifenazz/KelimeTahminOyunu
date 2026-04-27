// Bu dosya kelimenin ekranda gorunen halini ayarlayan component.
// Harf bulunduysa harfi bulunmadiysa alt cizgiyi gosteriyor.
// Kullanici kelimeyi burada adim adim acilmis halde goruyor.
export default function WordDisplay({ word, guessedLetters, reveal }) {
  return (
    <div className="word-display" aria-label="Gizli kelime">
      {/* Burada split ile kelimeyi tek tek harflere ayirdim. */}
      {word.split("").map((letter, index) => {
        // Eger harf tahmin edildiyse harfi gosteriyorum.
        // Reveal true ise oyun bitmis demek. O zaman butun harfler gorunuyor.
        const isVisible = reveal || guessedLetters.includes(letter);

        return (
          // Map kullandigim icin React benden key istiyor.
          // O yuzden harf ve index bilgisini birlikte verdim.
          <span className="letter-box" key={`${letter}-${index}`}>
            {/* Harf bulunmadiysa alt cizgi gosteriyorum. */}
            {isVisible ? letter : "_"}
          </span>
        );
      })}
    </div>
  );
}
