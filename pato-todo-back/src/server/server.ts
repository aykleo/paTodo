import express from "express";

import cors from "cors";
import routes from "../routes/routes";
import testRoutes from "../routes/testRoutes";
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use("/", testRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
