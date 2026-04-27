# Kelime Tahmin Oyunu

Bu projede React kullanarak basit bir kelime tahmin oyunu yaptım.
Projeyi pembe tonlarda daha tatlı ve canlı bir arayüzle hazırladım.
Kullanıcı önce kategori seçiyor.
Sonra gelen kelimeyi harf harf ya da direkt kelime olarak tahmin etmeye çalışıyor.

## Özellikler

- Meyve ve eşya kategorisi seçme
- Pembe temalı arayüz
- Rastgele kelime getirme
- Harf tahmini yapma
- Direkt kelime tahmini yapma
- Doğru ve yanlış harfleri ayrı gösterme
- Kalan hakları gösterme
- Skor ve tur bilgisi tutma
- Tekrar oynama

## Kullanılan Teknolojiler

- React
- JavaScript
- CSS
- Vite

## Projeyi Çalıştırma

Projeyi çalıştırmak için terminalde proje klasörünü açıp şu komutları yazmak yeterli.

```bash
npm install
npm run dev
```

Sonra tarayıcıda şu adres açılır.

```txt
http://localhost:5173
```

## Proje Yapısı

```txt
src/
  App.jsx
  main.jsx
  styles.css
  components/
    WordDisplay.jsx
    GuessInput.jsx
    GameStatus.jsx
index.html
package.json
```

## Dosyalar Kısaca

- `App.jsx` dosyasında oyunun ana mantığı var.
- `GuessInput.jsx` input ve tahmin butonu için kullanılıyor.
- `WordDisplay.jsx` kelimenin ekranda görünmesini sağlıyor.
- `GameStatus.jsx` skor hak ve mesaj alanını gösteriyor.
- `styles.css` dosyasında tasarım var.
