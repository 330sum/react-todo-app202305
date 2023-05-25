import React from 'react'
import TodoItem from './TodoItem'

import './scss/TodoMain.scss';

const TodoMain = ({ todoList }) => {
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



  return (
    <ul className = 'todo-list'>
        {
            // renderTodoItem()
            // 객체 하나하나가 todo임. 
            todoList.map(todo => <TodoItem key={todo.id} item={todo} />)
        }
    </ul>
  )
}

export default TodoMain