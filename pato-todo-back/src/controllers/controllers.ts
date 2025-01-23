import { PrismaClient, Todo } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

enum TodoStatus {
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
}

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const checkUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid ? user : null;
};

export const createTodo = async (
  userId: number,
  title: string,
  description: string,
  dueDate: Date
) => {
  return await prisma.todo.create({
    data: {
      title,
      description,
      user: { connect: { id: userId } },
      status: TodoStatus.PENDING || undefined,
      dueDate,
    },
  });
};

export const getAllTodos = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      todos: true,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  return user.todos;
};

export const updateTodo = async (todoId: number, data: Partial<Todo>) => {
  return await prisma.todo.update({
    where: { id: todoId },
    data,
  });
};

export const deleteTodo = async (todoId: number) => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};

//TEST PURPOSES ONLY
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const deleteAllUsers = async () => {
  return await prisma.user.deleteMany();
};

export const getAllTodosAll = async () => {
  return await prisma.todo.findMany();
};

export const deleteAllTodos = async () => {
  return await prisma.todo.deleteMany();
};

export default prisma;
