import React from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'

import './scss/TodoTemplate.scss';

const TodoTemplate = () => {

    // 서버에 할일 목록(json)을 요청해서 받아와야 함
    const todos = [
        {
            id: 1,
            title: '아침 산책하기',
            done: false
        },
        {
            id: 2,
            title: '오늘 주간 신문 읽기',
            done: true
        },
        {
            id: 3,
            title: '샌드위치 사먹기',
            done: false
        },
        {
            id: 4,
            title: '리액트 복습하기',
            done: false
        },
    ];


    // 하위컴포넌트 -> 상위컴포넌트 :  데이터 주는 방법 (콜백함수 이용)
    // 상위컴포넌트에서 함수 만들기 (addTodo)
    // 받고싶은 데이터의 매개변수 만들기 (todoText)
    // 함수를 하위컴포넌트에게 보냄- 50번라인(addTodo)
    // TodoInput컴포넌트(하위컴포넌트)에게 todoText(매개변수)를 받아오는 함수
    const addTodo = todoText => {
        console.log('할일 정보 in TodoTemplate: ', todoText);
    }

  return (
   <div className='TodoTemplate'>
        <TodoHeader />
        <TodoMain todoList={todos} />
        <TodoInput addTodo={addTodo}/>
   </div>
  )
}

export default TodoTemplate