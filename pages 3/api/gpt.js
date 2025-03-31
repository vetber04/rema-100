export default async function handler(req, res) {
  const { ingredients } = req.body;

  const fakeResponse = `
Rettnavn: Omelett med ost og tomat

Oppskrift:
1. Knekk eggene i en bolle og visp dem.
2. Hakk tomat og bland med eggene.
3. Stek blandingen i en panne med ost på toppen.
4. Brett omeletten og server.

Tilleggsforslag: Kjøp brød og pesto – perfekt til omeletten!
Humørtag: Rask, Vegetar, Komfort
  `;

  res.status(200).json({ result: fakeResponse });
}