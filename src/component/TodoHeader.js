import React from 'react'

import './scss/TodoHeader.scss';

const TodoHeader = ({ count }) => {
  return (
    <header>
        <h1>2023년 5월 24일</h1>
        <div className='day'>수요일</div>
        <div className='tasks-left'>할 일 {count()}개 남음</div>
    </header>
  )
}

export default TodoHeader