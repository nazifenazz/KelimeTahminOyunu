// Bu dosya projenin ana dosyasi.
// Oyunun genel mantigi burada.
// Stateler kategori secimi kelime secimi tahmin kontrolu skor hesabi
// ve hangi componente hangi bilginin gidecegi burada ayarlaniyor.
import { useMemo, useState } from "react";
import WordDisplay from "./components/WordDisplay.jsx";
import GuessInput from "./components/GuessInput.jsx";
import GameStatus from "./components/GameStatus.jsx";

// Oyunda cikabilecek kelimeleri burada tuttum.
// Database kullanmak yerine direkt dizi kullandim cunku daha basit.
// Her kelimenin bir de kategorisi var.
// word = kelimenin kendisi
// category = bu kelime meyve mi esya mi onu gosteriyor
const words = [
  { word: "elma", category: "Meyve" },
  { word: "armut", category: "Meyve" },
  { word: "muz", category: "Meyve" },
  { word: "kiraz", category: "Meyve" },
  { word: "limon", category: "Meyve" },
  { word: "portakal", category: "Meyve" },
  { word: "karpuz", category: "Meyve" },
  { word: "kavun", category: "Meyve" },
  { word: "uzum", category: "Meyve" },
  { word: "çilek", category: "Meyve" },
  { word: "şeftali", category: "Meyve" },
  { word: "kayısı", category: "Meyve" },
  { word: "erik", category: "Meyve" },
  { word: "incir", category: "Meyve" },
  { word: "nar", category: "Meyve" },
  { word: "ayva", category: "Meyve" },
  { word: "mandalina", category: "Meyve" },
  { word: "ananas", category: "Meyve" },
  { word: "mango", category: "Meyve" },
  { word: "avokado", category: "Meyve" },
  { word: "masa", category: "Eşya" },
  { word: "sandalye", category: "Eşya" },
  { word: "kalem", category: "Eşya" },
  { word: "defter", category: "Eşya" },
  { word: "telefon", category: "Eşya" },
  { word: "kitap", category: "Eşya" },
  { word: "silgi", category: "Eşya" },
  { word: "canta", category: "Eşya" },
  { word: "bardak", category: "Eşya" },
  { word: "tabak", category: "Eşya" },
  { word: "kaşık", category: "Eşya" },
  { word: "çatal", category: "Eşya" },
  { word: "lamba", category: "Eşya" },
  { word: "koltuk", category: "Eşya" },
  { word: "yastık", category: "Eşya" },
  { word: "perde", category: "Eşya" },
  { word: "ayna", category: "Eşya" },
  { word: "saat", category: "Eşya" },
  { word: "anahtar", category: "Eşya" },
  { word: "bilgisayar", category: "Eşya" },
  { word: "televizyon", category: "Eşya" },
  { word: "kumanda", category: "Eşya" },
  { word: "dolap", category: "Eşya" },
  { word: "kapı", category: "Eşya" },
  { word: "pencere", category: "Eşya" },
  { word: "havlu", category: "Eşya" },
  { word: "sabun", category: "Eşya" },
  { word: "fırça", category: "Eşya" },
  { word: "makas", category: "Eşya" },
  { word: "şapka", category: "Eşya" },
];

// Oyuncunun toplam kac yanlis hakki olacagini burada belirledim.
const maxWrongCount = 5;
const categories = ["Meyve", "Eşya"];

// Bu fonksiyon secilen kategoriye gore once listeyi filtreliyor.
// Sonra sadece o kategorideki kelimelerden rastgele bir tane donduruyor.
function getRandomWordInfo(selectedCategory) {
  const filteredWords = words.filter((item) => item.category === selectedCategory);
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}

export default function App() {
  // useState Reactte en cok kullanilan seylerden biri.
  // Degisen bilgileri burada tutuyoruz.
  // State degisince ekran da otomatik guncelleniyor.

  // Oyun basladi mi baslamadi mi bilgisini burada tutuyorum.
  // False ise baslangic ekrani gorunur.
  // True ise asil oyun ekrani gorunur.
  const [isStarted, setIsStarted] = useState(false);

  // Kullanicinin hangi kategoriyi sectigini burada tutuyorum.
  const [selectedCategory, setSelectedCategory] = useState("Meyve");

  // Secilen kelimeyi ve kategorisini burada tutuyorum.
  // Uygulama ilk acilinca getRandomWordInfo bir tane rastgele kelime getiriyor.
  const [wordInfo, setWordInfo] = useState(() => getRandomWordInfo("Meyve"));

  // Kolay kullanmak icin nesnenin icinden ayri ayri word ve category degiskenleri cikardim.
  const word = wordInfo.word;
  const category = wordInfo.category;

  // Inputa yazilan degeri burada tutuyorum.
  // Kullanici harf de yazabilir kelime de yazabilir.
  const [guess, setGuess] = useState("");

  // Kullanici hangi harfleri denediyse bu dizide birikiyor.
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Kac tane yanlis yapildigini burada tutuyorum.
  const [wrongCount, setWrongCount] = useState(0);

  // Ekranda kisa mesaj gostermek icin bunu kullaniyorum.
  // Mesela "Yanlis harf" ya da "Bu harfi zaten denedin" gibi.
  const [message, setMessage] = useState("");

  // Bunlar oyun istatistikleri.
  // playedCount = toplam biten oyun
  // winCount = kazanilan oyun sayisi
  // score = puan
  const [playedCount, setPlayedCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [score, setScore] = useState(0);

  // Kullanici direkt kelimeyi yazip bildiyse onu burada tutuyorum.
  const [finishedWord, setFinishedWord] = useState("");

  // Burada kullanici butun harfleri buldu mu diye kontrol ediyorum.
  // word.split("") kelimeyi harflere ayiriyor.
  // every ise tum harfler guessedLetters icinde var mi diye bakiyor.
  // useMemo kullanmamin sebebi bu hesap her renderda bosuna tekrar edilmesin diye.
  const allLettersFound = useMemo(
    () => word.split("").every((letter) => guessedLetters.includes(letter)),
    [word, guessedLetters]
  );

  // Eger kullanici butun kelimeyi tek seferde dogru yazdiysa bu true olur.
  const isWordGuessWin = finishedWord === word;

  // Iki farkli kazanma yolu var:
  // 1) butun harfleri bulmak
  // 2) direkt kelimeyi yazmak
  const isWin = allLettersFound || isWordGuessWin;

  // Yanlis sayisi hak sayisina ulasinca oyun kaybediliyor.
  const isLose = wrongCount >= maxWrongCount;

  // Oyun ya kazanildiysa ya da kaybedildiyse artik bitmistir.
  const gameOver = isWin || isLose;

  // Kalan hakki burada hesapliyorum.
  const remainingRight = maxWrongCount - wrongCount;

  // Dogru tahmin edilen harfleri ayri bir listeye koyuyorum.
  const correctLetters = guessedLetters.filter((letter) => word.includes(letter));

  // Yanlis tahmin edilen harfleri de ayri bir listeye koyuyorum.
  const wrongLetters = guessedLetters.filter((letter) => !word.includes(letter));

  // Oyun bitince istatistikleri burada guncelliyorum.
  // DidWin true gelirse kazanmis false gelirse kaybetmis demek.
  function finishGame(didWin) {
    // Oyun bitince toplam oynanan tur 1 artiyor.
    setPlayedCount(playedCount + 1);

    if (didWin) {
      // Kazanirsa kazanilan oyun sayisini artiriyorum.
      setWinCount(winCount + 1);

      // Skor verirken sabit 10 puan verdim.
      // Bir de kalan hak kadar ekstra puan ekledim.
      setScore(score + 10 + remainingRight);
      return;
    }

    // Kaybederse skor 5 azaliyor.
    // Math.max ile skorun 0'in altina dusmesini engelledim.
    setScore(Math.max(0, score - 5));
  }

  // Tahmin Et butonuna basinca bu fonksiyon calisiyor.
  // Form kullandigim icin Enter ile de ayni fonksiyon calisiyor.
  function handleGuess() {
    // Inputa yazilan degeri once temizliyorum.
    // trim bosluklari siler.
    // toLocaleLowerCase ise buyuk harfleri kucuk harfe cevirir.
    // Boylece " ELMA " yazilsa bile "elma" olur.
    const normalizedGuess = guess.trim().toLocaleLowerCase("tr-TR");

    // Oyun bittiyse yeni tahmin almasin diye burada durduruyorum.
    if (gameOver) {
      setGuess("");
      return;
    }

    // Kullanici hicbir sey yazmadan butona basarsa uyari veriyorum.
    if (normalizedGuess.length === 0) {
      setMessage("Önce bir harf ya da kelime yaz.");
      setGuess("");
      return;
    }

    // Eger 1 karakterden fazlaysa bunu harf degil kelime tahmini kabul ediyorum.
    if (normalizedGuess.length > 1) {
      // Yazilan kelime gizli kelime ile ayniysa direkt kazanmis oluyor.
      if (normalizedGuess === word) {
        setFinishedWord(word);
        setMessage("Doğru kelime tahmini.");
        finishGame(true);
      } else {
        // Kelime tahmini yanlissa bunu da bir yanlis hak saydim.
        const nextWrongCount = wrongCount + 1;
        setWrongCount(nextWrongCount);
        setMessage("Kelime tahmini yanlış.");

        // Eger bu yanlisla hak bittiyse oyunu kaybettiriyorum.
        if (nextWrongCount >= maxWrongCount) {
          finishGame(false);
        }
      }

      // Tahminden sonra inputu temizliyorum.
      setGuess("");
      return;
    }

    // Daha once denenmis bir harf tekrar yazildiysa tekrar eklemiyorum.
    // Sadece bilgi mesaji gosteriyorum.
    if (guessedLetters.includes(normalizedGuess)) {
      setMessage("Bu harfi zaten denedin.");
      setGuess("");
      return;
    }

    // Reactte eski diziyi direkt degistirmek iyi degil.
    // O yuzden spread ile yeni bir dizi olusturup ona harfi ekledim.
    const nextGuessedLetters = [...guessedLetters, normalizedGuess];
    setGuessedLetters(nextGuessedLetters);

    // Harf kelimenin icinde yoksa yanlis sayisini artiriyorum.
    // includes burada harf var mi yok mu ona bakiyor.
    if (!word.includes(normalizedGuess)) {
      const nextWrongCount = wrongCount + 1;
      setWrongCount(nextWrongCount);
      setMessage("Yanlış harf.");

      // Bu yanlistan sonra hak kalmadiysa oyun bitiyor.
      if (nextWrongCount >= maxWrongCount) {
        finishGame(false);
      }
    } else {
      // Harf dogruysa simdi butun harfler tamamlandi mi diye bir daha bakiyorum.
      const didWin = word
        .split("")
        .every((letter) => nextGuessedLetters.includes(letter));

      setMessage("Doğru harf.");

      // Eger tum harfler bulunduysa oyunu kazandiriyorum.
      if (didWin) {
        finishGame(true);
      }
    }

    // Her tahminden sonra inputu temizliyorum.
    setGuess("");
  }

  // Basla butonuna basinca oyun ekrani aciliyor.
  function startGame() {
    setWordInfo(getRandomWordInfo(selectedCategory));
    setGuess("");
    setGuessedLetters([]);
    setWrongCount(0);
    setIsStarted(true);
    setMessage("");
    setFinishedWord("");
  }

  // Tekrar oyna dediginde yeni kelime seciliyor.
  // Ama skor ve toplam istatistikler sifirlanmiyor.
  // Sadece o anki oyun sifirlaniyor.
  function resetGame() {
    setWordInfo(getRandomWordInfo(selectedCategory));
    setGuess("");
    setGuessedLetters([]);
    setWrongCount(0);
    setMessage("");
    setFinishedWord("");
  }

  // Kullanici kategori degistirirse yeni kategoriye gore kelime seciyorum.
  // Oyun aciksa da ekrani yeni kategoriye gore sifirliyorum.
  function handleCategoryChange(nextCategory) {
    setSelectedCategory(nextCategory);
    setWordInfo(getRandomWordInfo(nextCategory));
    setGuess("");
    setGuessedLetters([]);
    setWrongCount(0);
    setMessage("");
    setFinishedWord("");
  }

  return (
    <main className="app">
      {/* Burasi sayfadaki ana alan. */}
      <section className="game-panel" aria-label="Kelime tahmin oyunu">
        <header className="game-header">
          <h1>Kelime Tahmin Oyunu</h1>
        </header>

        {!isStarted ? (
          // Oyun baslamadiysa once bu ekran gorunuyor.
          <div className="start-screen">
            <div className="category-picker" role="tablist" aria-label="Kategori seçimi">
              {categories.map((item) => (
                <button
                  className={item === selectedCategory ? "category-option active" : "category-option"}
                  key={item}
                  onClick={() => handleCategoryChange(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <p>
              Başlamadan önce kategorini seç.
            </p>
            <button type="button" onClick={startGame}>
              Oyunu Başlat
            </button>
          </div>
        ) : (
          <>
            <div className="toolbar">
              <div className="category-picker" role="tablist" aria-label="Kategori seçimi">
                {categories.map((item) => (
                  <button
                    className={item === selectedCategory ? "category-option active" : "category-option"}
                    key={item}
                    onClick={() => handleCategoryChange(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>

            {/* Burada kategoriyi gosteriyorum ki oyuncuya biraz ipucu olsun. */}
              <p className="category-badge">
                Kategori: <strong>{category}</strong>
              </p>
            </div>

            {/* Gizli kelimeyi gosteren component burada cagriliyor. */}
            <WordDisplay word={word} guessedLetters={guessedLetters} reveal={gameOver} />

            {/* Tahmin girilen input alani burada geliyor. */}
            <GuessInput
              guess={guess}
              setGuess={setGuess}
              onGuess={handleGuess}
              disabled={gameOver}
            />

            {/* Oyunla ilgili bilgiler de bu componentte gosteriliyor. */}
            <GameStatus
              remainingRight={remainingRight}
              maxWrongCount={maxWrongCount}
              correctLetters={correctLetters}
              wrongLetters={wrongLetters}
              message={message}
              isWin={isWin}
              isLose={isLose}
              word={word}
              playedCount={playedCount}
              winCount={winCount}
              score={score}
            />

            {gameOver && (
              // Oyun bitince bu buton ekranda gorunuyor.
              <button className="secondary-button" type="button" onClick={resetGame}>
                Tekrar Oyna
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
