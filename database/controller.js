/** Controller */
import Users from "../model/user.js";
import Cards from "../model/card.js";

//get: http://localhost:3000/api/users
export async function getUser(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "User not found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
}

//post: http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    const data = req.body;
    const alrUser = await Users.find({ name: data.name });
    console.log(alrUser);
    if (alrUser.length) {
      console.log("User already exists");
      return res.status(200).json(alrUser);
    }
    if (!data) return res.status(404).json({ error: "Form Data not found" });
    Users.create(data, (err, user) => {
      if (err) return res.status(404).json({ error: "User not created" });
      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "User not found" });
  }
}

//put: http://localhost:3000/api/users
export async function putUser(req, res) {
  try {
    const data = req.body;

    console.log("data: " + data["name"]);
    if (data) {
      const userSearched = await Users.findOne({ name: data.name });
      console.log("userSearched");
      console.log(userSearched);
      const user = await Users.findByIdAndUpdate(userSearched["_id"], data);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data" });
  }
}

//get: http://localhost:3000/api/cards
export async function getCard(req, res) {
  try {
    const cards = await Cards.find({});
    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Card not found" });
  }
}

//post: http://localhost:3000/api/cards
export async function postCard(req, res) {
  try {
    const data = req.body;
    if (!data) return res.status(404).json({ error: "Form Data not found" });
    Cards.create(data, (err, card) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ error: "Card not created" });
      }

      res.status(200).json(card);
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Card not found" });
  }
}
