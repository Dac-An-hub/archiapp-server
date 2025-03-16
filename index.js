const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let allMsgs = [
  { msg: "Hello World", pseudo: "Admin", date: "2024-06-01T14:23:00.000Z" },
  { msg: "foobar", pseudo: "User123", date: "2023-11-15T09:12:00.000Z" },
  { msg: "CentraleSupelec Forever", pseudo: "Alumni", date: "2023-12-10T18:30:00.000Z" }
];

app.get('/msg/get/:num', (req, res) => {
  const num = parseInt(req.params.num, 10);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    res.json({ code: 1, message: allMsgs[num] });
  } else {
    res.status(404).json({ code: 0, error: "Message non trouvé" });
  }
});

app.get('/msg/getAll', (req, res) => {
  res.json(allMsgs);
});

app.get('/msg/count', (req, res) => {
  res.json({ count: allMsgs.length });
});

app.post('/msg/post', (req, res) => {
  const message = req.body.message ? req.body.message.trim() : "";
  const pseudo = req.body.pseudo ? req.body.pseudo.trim() : "Anonyme";

  if (message !== "") {
    const newMessage = {
      msg: message,
      pseudo: pseudo,
      date: new Date().toISOString()
    };
    allMsgs.push(newMessage);
    res.json({ code: 1, index: allMsgs.length - 1, message: newMessage });
  } else {
    res.status(400).json({ code: 0, error: "Message invalide" });
  }
});

app.delete('/msg/del/:num', (req, res) => {
  const num = parseInt(req.params.num, 10);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    allMsgs.splice(num, 1);
    res.json({ code: 1, message: "Message supprimé avec succès" });
  } else {
    res.status(404).json({ code: 0, error: "Message non trouvé" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}...`);
});
