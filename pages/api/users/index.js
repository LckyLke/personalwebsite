import connectMongo from "../../../database/conn";
import { getUser, postUser, putUser } from "../../../database/controller";
export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "MongoDB connection error" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      res.status(200).json({ name: "John Doe" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
