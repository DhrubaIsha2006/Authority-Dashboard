const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tourists = [
  { id: 1, lat: 22.5448, lng: 88.3426, status: 'Safe' },
  { id: 2, lat: 22.509634, lng: 88.404794, status: 'SOS' },
  { id: 3, lat: 22.5855, lng: 88.3475, status: 'Caution' },
];

app.get('/api/tourists', (req, res) => {
  res.json(tourists);
});

app.post('/api/tourists', (req, res) => {
  const newTourist = { id: Date.now(), ...req.body };
  tourists.push(newTourist);
  res.json(newTourist);
});



const PORT = 6000;
const HOST = '0.0.0.0'; // listen on all network interfaces
app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});
