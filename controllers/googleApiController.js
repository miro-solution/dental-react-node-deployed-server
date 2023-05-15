const axios = require('axios');
const getStreet = async (req, res) => {
  const param = req.query.params;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      param,
    )}&types=address&components=country:de&key=${process.env.GOOGLE_MAP_API_KEY}`,
  );
  const data = await response.data;

  res.status(200).json({ docs: data });
};
const getStreetNumber = async (req, res) => {
  try {
    const param = req.query.params;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        param,
      )}&types=address&components=country:de&key=${process.env.GOOGLE_MAP_API_KEY}`,
    );
    const data = await response.data;

    data && res.status(200).json({ docs: data });
    res.status(404).json();
  } catch (err) {}
};
const getPostalCode = async (req, res) => {
  const param = req.query.params;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        param,
      )}&types=(regions)&components=country:de&key=${process.env.GOOGLE_MAP_API_KEY}`,
    );

    const data = await response.data;
    data && res.status(200).json({ docs: data });
    res.status(404).json();
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
const getCity = async (req, res) => {
  try {
    const param = req.query.params;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        param,
      )}&types=(regions)&components=country:de&key=${process.env.GOOGLE_MAP_API_KEY}`,
    );
    const data = await response.data;

    data && res.status(200).json({ docs: data });
    res.status(404).json();
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
module.exports = {
  getCity,
  getPostalCode,
  getStreetNumber,
  getStreet,
};
