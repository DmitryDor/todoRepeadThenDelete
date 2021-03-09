import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    changeTaskFilter: (value: FilterValueType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    filter: FilterValueType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoId: string) => void
}


export const Todolist = (props: PropsType) => {


    const onAllClickHandler = () => {
        props.changeTaskFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeTaskFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeTaskFilter('completed', props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (

        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTask = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked
                                props.changeTaskStatus(t.id, newStatus, props.id)
                            }
                            const changeTaskTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.id)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}
                                           onChange={onChangeTaskStatusHandler}/>
                                    <EditableSpan task={t} title={t.title} changeTaskTitle={changeTaskTitle}/>
                                    <button onClick={removeTask}>x</button>
                                </li>
                            )
                        }
                    )
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'isActive' : ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'isActive' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'isActive' : ''}>Completed
                </button>
            </div>
        </div>
    )
}

type EditableSpanPropsType = {
    task: TaskType
    title: string
    changeTaskTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = props => {

    let [showEditMode, setShowEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    const editModeOn = () => {
        setShowEditMode(true)
    }
    const editModeOff = () => {
        setShowEditMode(false)
    }
    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setTitle(newTitle)
        props.changeTaskTitle(newTitle)
    }

    return (
        showEditMode
            ? <input autoFocus onBlur={editModeOff} value={title} onChange={changeTaskTitle}/>
            : <span className={props.task.isDone ? 'isDone' : ''}
                    onDoubleClick={editModeOn}
            >{props.task.title}</span>
    )
}

