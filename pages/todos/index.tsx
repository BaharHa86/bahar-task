import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
 
import TodosList from "@/@core/components/todos-list";

interface Todo {
  id: number;
  text: string;
}

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Start the React project",
  },
  {
    id: 2,
    text: "Learn Redux",
  },
  {
    id: 3,
    text: "Practice TypeScript",
  },
];

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (newTodo === "") return;
    const newTodoObj = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      text: newTodo,
    };
    setTodos([...todos, newTodoObj]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleSaveEdit = (newText: string) => {
    if (editTodo === null) return;
    const editedTodos = todos.map((todo) =>
      todo.id === editTodo.id ? { ...todo, text: newText } : todo
    );
    setTodos(editedTodos);
    setEditTodo(null);
  };

  return (
    <Box p={2} sx={{display:'flex',flexDirection:'column', justifyContent:'center' ,alignItems:'center',width:'80vw', marginTop:10}}>
      <Typography variant="h4" gutterBottom>
        Todos List
      </Typography>
      <Box display="flex" alignItems="center" gap={5} width='50vw'>
        <TextField
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          margin="dense"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary"  sx={{width:200, padding:1.8}} onClick={handleAddTodo}>
          Add
        </Button>
      </Box>
      <TodosList todos={todos} editTodo={editTodo}  setEditTodo={ setEditTodo}   handleEditTodo={ handleEditTodo} handleDeleteTodo={handleDeleteTodo} handleSaveEdit={handleSaveEdit} />
    
    </Box>
  );
}

export default TodosPage;