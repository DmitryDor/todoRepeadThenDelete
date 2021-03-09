import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./featchers/todolist/todolist";
import {v1} from "uuid";
import {AddItemForm} from "./featchers/AddItemForm/AddItemForm";

export type TasksType = Array<TaskType>

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ]
    })


    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    )

    const removeTask = (taskId: string, todoId: string) => {
        const stateCopy = {
            ...tasks,
            [todoId]: tasks[todoId].filter(t => t.id !== taskId)
        }
        setTasks(stateCopy)
    }

    const addTask = (title: string, todoId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const stateCopy = {
            ...tasks,
            [todoId]: [newTask, ...tasks[todoId]]
        }
        setTasks(stateCopy)
    }

    const changeTaskFilter = (value: FilterValueType, todoId: string) => {
        const stateCopy = [...todolists]
        const changeTodoFilter = stateCopy.find(tl => tl.id === todoId)
        if (changeTodoFilter) {
            changeTodoFilter.filter = value
        }
        setTodolists(stateCopy)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        const stateCopy = {...tasks}
        const neededTodo = stateCopy[todoId]
        const newTodo = neededTodo.find(t => t.id === taskId)
        if (newTodo) {
            newTodo.isDone = isDone
        }
        setTasks(stateCopy)
    }
    const changeTaskTitle = (taskId: string, title: string, todoId: string) => {
        const stateCopy = {...tasks}
        const neededTodo = stateCopy[todoId]
        const newTodo = neededTodo.find(t => t.id === taskId)
        if (newTodo) {
            newTodo.title = title
        }
        setTasks(stateCopy)
    }

    const removeTodolist = (todoId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todoId)
        setTodolists(newTodolists)
        delete tasks[todoId]
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist = {id: newTodolistId, title, filter: 'all' as const}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }


    return (

        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeTaskFilter={changeTaskFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
