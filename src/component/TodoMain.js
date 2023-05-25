import React from 'react'
import TodoItem from './TodoItem'

import './scss/TodoMain.scss';

const TodoMain = ({ todoList, remove }) => {
// const TodoMain = (ppprops) => {

    // console.log(ppprops.todoList);

    const renderTodoItem = () => {

        // const todoItems = [];
        // for(const todo of todoList) {
        //     todoItems.push(<TodoItem />);
        // }

        // const todoItems = () => {
        //     todoList.map(todo => <TodoItem />);
        // }

        // return todoItems;

    };

// remove 받아서 todoitem에게 전달

  return (
    <ul className = 'todo-list'>
        {
            // renderTodoItem()
            // 객체 하나하나가 todo임. 
            todoList.map(todo => <TodoItem key={todo.id} item={todo} remove={remove}/>)
        }
    </ul>
  )
}

export default TodoMain