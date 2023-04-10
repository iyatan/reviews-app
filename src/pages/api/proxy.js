import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' query parameter." });
  }

  try {
    const response = await axios.get(url);
    res.setHeader("Content-Type", "text/css");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the resource." });
  }
}
