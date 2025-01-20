"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

enum TodoStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export enum SortingStatus {
  ALL,
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: TodoStatus;
}

interface TodoContextType {
  todos: Todo[];
  updateTodos: (newTodos: Todo[]) => void;
  addTodo: (newTodo: Todo) => void;
  getTodos: (token: string) => Promise<void>;
  sortingStatus: SortingStatus;
  setSortingStatus: (status: SortingStatus) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortingStatus, setSortingStatus] = useState<SortingStatus>(
    SortingStatus.ALL
  );

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("toDoList") || "[]");
    setTodos(savedTodos);
  }, []);

  const updateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem("toDoList", JSON.stringify(newTodos));
  };

  const addTodo = (newTodo: Todo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  };

  const getTodos = async (token: string) => {
    try {
      const getTodosResponse = await fetch("http://localhost:3333/getTodos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getTodosResponseText = await getTodosResponse.text();

      if (getTodosResponse.ok) {
        const todosData: Todo[] = JSON.parse(getTodosResponseText);
        updateTodos(todosData);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        updateTodos,
        getTodos,
        addTodo,
        sortingStatus,
        setSortingStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
