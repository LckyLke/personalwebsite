import connectMongo from "../../../database/conn";
import { getCard, postCard } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "MongoDB connection error" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getCard(req, res);
      break;
    case "POST":
      postCard(req, res);
      break;
    case "PUT":
      res.status(200).json({ name: "Sample Card" });
      break;
    case "DELETE":
      res.status(200).json({ name: "Sample Card" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
