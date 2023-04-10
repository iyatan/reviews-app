import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../utils/sendEmail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("hereeeeeeee");
  if (req.method === "POST") {
    const { to, subject, html } = req.body;

    try {
      await sendEmail(to, subject, html);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
