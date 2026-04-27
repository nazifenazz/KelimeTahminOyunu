# Kelime Tahmin Oyunu

Bu proje React ile yapılmış tek sayfalık bir kelime tahmin oyunu.

## Özellikler

- Meyve ve eşya kategorisi seçme
- Rastgele kelime seçme
- Harf veya direkt kelime tahmini yapma
- Doğru ve yanlış harfleri ayrı gösterme
- Kalan hak sistemi
- Tur kazanılan oyun ve skor takibi
- Tekrar oynama

## Kullanılan Teknolojiler

- React
- JavaScript
- CSS
- Vite

## Projeyi Çalıştırma

Projeyi çalıştırmak için önce terminali açıp proje klasörüne gelinir.

Sonra şu komutlar yazılır.

```bash
npm install
npm run dev
```

Proje çalıştıktan sonra tarayıcıda şu adres açılır.

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

## Not

Bu projede oyun mantığı ağırlıklı olarak `src/App.jsx` dosyasında kuruludur.
