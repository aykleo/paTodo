import express, { Request, Response } from "express";
import {
  createUser,
  checkUser,
  getAllTodos,
  updateTodo,
  createTodo,
  deleteTodo,
  getAllTodosAll,
} from "../controllers/controllers";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";

const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
    const token = jwt.sign(
      { username: username, userId: newUser.id },
      "#1234astra"
    );

    res
      .status(200)
      .json({ message: "User Created Successfully!!!", token: token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error signing up" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await checkUser(email, password);

    if (!User) {
      res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign({ email: email, userId: User?.id }, "#1234astra");
    res.status(200).json({ token: token, message: "Login Succesfully!!!" });
  } catch (error) {
    console.error(error);
    res.send(500).send("Internal Server Error");
  }
});

router.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodeToken = jwt.decode(token) as JwtPayload | null;
      const userId = decodeToken?.userId;
      const newTodo = await createTodo(userId, title, description, dueDate);
      if (newTodo) {
        res.status(200).json(newTodo);
      } else {
        res.status(409).send("Bad Request");
      }
    } else {
      res.status(401).send("Unauthorized: Token not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/updateTodo/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    console.log("Received Data:", { id, title, description, status, dueDate });

    const updatedTodo = await updateTodo(parseInt(id), {
      title,
      description,
      status,
      dueDate,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getTodos", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodeToken = jwt.decode(token) as JwtPayload | null;
      const email = decodeToken?.email;

      if (email) {
        const allTodos = await getAllTodos(email);

        if (allTodos && allTodos.length > 0) {
          res.status(200).json(allTodos);
          return;
        }
      }
    }

    res.status(404).send("No Todos Found !!!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    debugger;
    const todo_id = parseInt(req.params.id);

    const deleted = await deleteTodo(todo_id);
    if (deleted) {
      res.status(200).send("Todo deleted successfully!!!");
    }
  } catch (error) {
    console.error(error);
    res.send(500).send("Internal Server Error");
  }
});

router.get("/getAllTodos", async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodosAll();
    res.status(200).json({ data: todos, message: "All Todos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

export default router;
