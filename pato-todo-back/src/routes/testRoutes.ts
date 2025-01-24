import express, { Request, Response } from "express";
import {
  getAllUsers,
  deleteAllUsers,
  deleteAllTodos,
} from "../controllers/controllers";
import cors from "cors";

const testRouter = express.Router();

testRouter.use(express.json());
testRouter.use(cors());

testRouter.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

testRouter.delete("/users", async (req, res) => {
  try {
    const result = await deleteAllUsers();
    res
      .status(200)
      .json({ message: "All users have been deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete users" });
  }
});

testRouter.delete("/deleteTodos", async (req: Request, res: Response) => {
  try {
    const result = await deleteAllTodos();
    res
      .status(200)
      .json({ message: "All todos have been deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete todos" });
  }
});

export default testRouter;
