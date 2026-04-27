// Bu dosya React uygulamasini baslatan dosya.
// App componenti burada ekrana baglaniyor.
// styles.css dosyasi da burada import edilerek tum projede kullaniliyor.
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Burada index.html icindeki root alanini bulup React uygulamasini onun icine basiyorum.
// App componenti de ana ekran olarak aciliyor.
createRoot(document.getElementById("root")).render(
  // StrictMode gelistirme asamasinda bazi hatalari daha kolay fark etmeye yardim eder.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
