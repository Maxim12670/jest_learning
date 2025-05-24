import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./src/routes";

const app = express();
const PORT = 8080;
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Requests work!)");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
