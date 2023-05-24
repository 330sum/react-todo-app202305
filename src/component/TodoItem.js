import React from 'react'
import {Md18UpRating, MdDelete, MdDone} from 'react-icons/md'
import cn from 'classnames';


import './scss/TodoItem.scss'

const TodoItem = ( { item } ) => {

    const {id, title, done} = item;

  return (
    <li className='todo-list-item'>
        <div className={cn('check-circle', {active: done})}>
            {done && <MdDone />}
        </div>
        <span className={cn('text', {finish:done})}>{title}</span>
        <div className='remove'>
            <MdDelete />
        </div>
    </li>
  )
}

export default TodoItem