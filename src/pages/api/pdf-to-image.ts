import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import pdfPoppler from "pdf-poppler";
import nc from "next-connect";

const unlinkAsync = promisify(fs.unlink);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { pdfBuffer } = req.body;

  if (!pdfBuffer) {
    res.status(400).json({ error: "PDF buffer is required" });
    return;
  }

  try {
    const pdfPath = path.join(process.cwd(), "temp.pdf");
    fs.writeFileSync(pdfPath, Buffer.from(pdfBuffer));

    const opts = {
      format: "png",
      page: 1,
      scale: 4096,
    };

    const imagePath = await pdfPoppler.convert(pdfPath, opts);

    const imageData = fs.readFileSync(imagePath);
    const imageBase64 = imageData.toString("base64");

    await unlinkAsync(pdfPath);
    await unlinkAsync(imagePath);

    res.status(200).json({ image: `data:image/jpeg;base64,${imageBase64}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to convert PDF to image" });
  }
});

export default handler;
