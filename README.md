Quattera – Programmieren III (WiSe24/25)
Dieses Projekt wurde im Rahmen des Kurses Programmieren III im Wintersemester 2024/25 an der Hochschule für Gestaltung Schwäbisch Gmünd entwickelt.
Es handelt sich um eine interaktive SvelteKit-basierte Webanwendung, in der Nutzer Spielkarten generieren und in verschiedenen Spielen einsetzen können.





🚀 Installation & Start
Um das Projekt lokal zu starten, führe folgende Befehle im Terminal aus:

bash
Kopieren
Bearbeiten
npm install  # Installiere alle Abhängigkeiten
npm run dev  # Starte den Entwicklungsserver
Das Projekt läuft standardmäßig auf:
👉 http://localhost:5173/ (abhängig von deiner Vite/SvelteKit-Konfiguration)

Falls Probleme auftreten, stelle sicher, dass Node.js und npm korrekt installiert sind.





🛠️ Technologien & Tools
Frontend: SvelteKit
Backend: MongoDB Atlas (Cloud-Datenbank)
Datenbankanbindung: MongoDB mit mongodb-Node.js Library
KI-Integration: OpenAI API (GPT-4o für Kartengenerierung und Rätselspiel)
Styling: Custom CSS mit Flexbox/Grid





🎮 Features
📌 Spielkarten-Erstellung mit OpenAI
Nutzer können den Namen eines Tieres eingeben und eine KI-generierte Spielkarte erstellen.
Die OpenAI API generiert passende Werte für Attribute wie Gewicht, Geschwindigkeit, Alter, Intelligenz usw.
Es wird ein realistisches Bild für das Tier erzeugt.
Die Karten können in der persönlichen Sammlung gespeichert werden.
🎲 Game Hub – Die Spiele


🧠 Memory
Klassisches Memory-Spiel mit den Karten aus der Datenbank
🧐 Rate-Spiel ("Guess the Animal")

Guess Me
Nutzer erhalten 5 zufällige Karten, eine ist das geheime Tier
Mit Fragen an die OpenAI API kann man Hinweise bekommen
Der User kann Karten ausschließen, bis nur eine übrig bleibt
Hat er das richtige Tier gefunden? Ein Overlay zeigt das Ergebnis

❓ Quiz
Zufällige Tierfragen aus der Datenbank mit Antwortmöglichkeiten
📂 Collection Page
Zeigt alle erstellten und gespeicherten Karten aus der Datenbank an.
Karten können durchsucht und sortiert werden.
Eigene Karten können bearbeitet oder gelöscht werden.




📡 Datenbank-Verbindung
Das Projekt nutzt eine MongoDB Atlas-Cloud-Datenbank.
Die Verbindung wird über eine .env Datei gespeichert, um sensible Daten wie Passwörter nicht direkt im Code zu hinterlegen.

🌍 Um die Datenbankverbindung lokal herzustellen:
Erstelle eine .env Datei im Hauptverzeichnis mit folgendem Inhalt:
ini
Kopieren
Bearbeiten
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@quartettdb.yd2eh.mongodb.net/QuartettDBAtlas
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
Setze deine MongoDB Atlas Zugangsdaten (USERNAME und PASSWORD) ein.
Stelle sicher, dass deine IP in MongoDB Atlas freigegeben ist (0.0.0.0/0 für universellen Zugriff).



✅ To-Do (Verbesserungen)
Highscore-Listen verbessern (bessere Darstellung & Rankings)
Responsives Layout optimieren (insbesondere in den Spielen)
Animationen & UI-Details für ein flüssigeres Spielerlebnis


📌 Fazit
Mir hat der Kurs viel Spaß gemacht, und ich konnte sehr viel über SvelteKit, MongoDB, OpenAI und API-Integration lernen.
Ich hoffe, dass das Projekt weiter ausgebaut werden kann und vielleicht sogar als interaktive Lernplattform genutzt werden kann! 🎉😊