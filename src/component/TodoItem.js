import React from 'react'
import {Md18UpRating, MdDelete, MdDone} from 'react-icons/md'

import './scss/TodoItem.scss'

const TodoItem = () => {
  return (
    <li className='todo-list-item'>
        <div className='check-circle'>
            <MdDone />
        </div>
        <span className='text'>할 일 어쩌구저쩌궁</span>
        <div className='remove'>
            <MdDelete />
        </div>
    </li>
  )
}

export default TodoItem