import express, { Request, Response } from "express";
import router from "./src/routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "all good" });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
