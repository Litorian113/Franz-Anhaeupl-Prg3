// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import OpenAI from 'openai';
// import cors from 'cors';

// // Prüfen, ob API-Key vorhanden ist
// if (!process.env.OPENAI_API_KEY) {
//     console.error("❌ OPENAI_API_KEY nicht gefunden. Bitte überprüfe deine .env Datei.");
//     process.exit(1);
// }

// // Express-App einrichten
// const app = express();
// app.use(express.json());
// app.use(cors());

// // OpenAI API initialisieren
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// // API-Route für Tierdaten-Generierung
// app.post('/api/generate-animal', async (req, res) => {
//     try {
//         const { animalName } = req.body;

//         if (!animalName) {
//             return res.status(400).json({ error: 'Kein Tiername angegeben' });
//         }

//         // Anfrage an OpenAI senden
//         const completion = await openai.chat.completions.create({
//             model: 'gpt-4o',
//             messages: [{ 
//                 role: 'user', 
//                 content: `Gib mir interessante Fakten über das Tier: ${animalName}` 
//             }]
//         });

//         res.json({
//             text: completion.choices[0].message.content
//         });

//     } catch (err) {
//         console.error("❌ Fehler bei der OpenAI-Anfrage:", err);
//         res.status(500).json({ error: 'Interner Serverfehler' });
//     }
// });

// // Server starten
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
// });
