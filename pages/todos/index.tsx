import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

import TodosList from '@/@core/components/todos-list';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface Todo {
    id: number;
    text: string;
}

const initialTodos: Todo[] = [
    {
        id: 1,
        text: 'Start the React project',
    },
    {
        id: 2,
        text: 'Learn Redux',
    },
    {
        id: 3,
        text: 'Practice TypeScript',
    },
];

function TodosPage() {
    const { t } = useTranslation('common');

    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState('');
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    const handleAddTodo = () => {
        if (newTodo === '') return;
        const newTodoObj = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            text: newTodo,
        };
        setTodos([...todos, newTodoObj]);
        setNewTodo('');
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
    const placeHolder = t('Todos.Add a new todo');
    return (
        <Box
            p={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80vw',
                marginTop: 10,
            }}
        >
            <Typography variant='h4' gutterBottom>
                {t('Todos.Todos List')}
            </Typography>
            <Box
                display='flex'
                alignItems='center'
                gap={5}
                width='80%'
                sx={{
                    '@media (max-width: 450px)': {
                        flexDirection: 'column',
                    },
                }}
            >
                <TextField
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder={placeHolder}
                    margin='dense'
                    variant='outlined'
                    fullWidth
                    sx={{
                        '@media (max-width: 450px)': {
                            width: '100%',
                        },
                    }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        width: 200,
                        padding: 1.8,
                        '@media (max-width: 450px)': {
                            width: '100%',
                        },
                    }}
                    onClick={handleAddTodo}
                >
                    {t('Todos.Add')}
                </Button>
            </Box>
            <TodosList
                todos={todos}
                editTodo={editTodo}
                setEditTodo={setEditTodo}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleSaveEdit={handleSaveEdit}
            />
        </Box>
    );
}

export default TodosPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    };
};
