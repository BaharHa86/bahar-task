import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
interface Todo {
    id: number;
    text: string;
}
interface TodosListProps {
    todos: Todo[];
    editTodo: Todo | null;
    setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
    handleEditTodo: (arg: Todo) => void;
    handleDeleteTodo: (arg: number) => void;
    handleSaveEdit: (arg: string) => void;
}

function TodosList({
    todos,
    editTodo,
    setEditTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleSaveEdit,
}: TodosListProps) {
    return (
        <Box
            sx={{
                width: '80%',
                '@media (max-width: 400px)': {
                    width: '100%',
                },
            }}
        >
            <List
                sx={{
                    width: '80%',
                    '@media (max-width: 400px)': {
                        width: '100%',
                    },
                }}
            >
                {todos.map((todo) => (
                    <ListItem key={todo.id}  sx={{
                        fontSize:'10px',
                        '@media (max-width: 400px)': {
                            fontSize: '5px',
                        },}}>
                        <ListItemText
                            primary={todo.text}
                            
                       
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge='end'
                                aria-label='edit'
                                onClick={() => handleEditTodo(todo)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge='end'
                                aria-label='delete'
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Modal
                open={editTodo !== null}
                onClose={() => setEditTodo(null)}
                aria-labelledby='edit-todo-modal'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='50vh'
                    style={{
                        backgroundColor: 'white',
                        width: '80%',

                        maxWidth: '500px',
                        margin: '0 auto',
                        padding: '16px',
                    }}
                >
                    <Typography variant='h5' gutterBottom>
                        Edit Todo
                    </Typography>
                    <TextField
                        value={editTodo?.text}
                        onChange={(e) => {
                            if (editTodo) {
                                setEditTodo({
                                    ...editTodo,
                                    text: e.target.value,
                                });
                            }
                        }}
                        placeholder='Enter new text for todo'
                        margin='dense'
                        variant='outlined'
                        fullWidth
                    />
                    <Box mt={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleSaveEdit(editTodo?.text ?? '')}
                        >
                            Save
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setEditTodo(null)}
                            style={{ marginLeft: '8px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default TodosList;
