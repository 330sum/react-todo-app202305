import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import cn from 'classnames'

import './scss/TodoInput.scss';

const TodoInput = ({ addTodo }) => {

    // 입력창이 열리는 여부를 표현하는 상태값
    const [open, setOpen] = useState(false);

    // 할 일 입력창에 입력한 내용을 표현하는 상태값
    const [todoText, setTodoText] = useState('');

    // + 버튼 클릭시 이벤트 처리
    const onToggle = () => {
        setOpen(!open);




    };



    const showForm = () => {
        // 와.. 대박 신기방기...!
        
    };


    // 서브밋 이벤트 핸들러
    const submitHandler = e => {
        // e.preventDefault(); // 폼태그의 서브밋기능의 기능을 막아야 함 -> 왜? SPA방식은 한페이지에서만 일어나야하기 때문
        // console.log('서브밋 핸들러 - 폼이 제출됨!!');

        // // input 텍스트 읽기 (가져오기, 잡아오기)
        // const $input = document.querySelector('.insert-form input');
        // console.log($input.value); 

        // //input창 비우기
        // $input.value = '';

        // 위는 바닐라 스러움(태그잡아오는거). 아래는 리액트스러운 방법(상태값으로하는거) (45~58번)
        e.preventDefault();

        // console.log(todoText);   
        // 상위컴포넌트에서 만든 함수를 받아서 특정시점에 콜백해서 상위컴포넌트가 원하는 값을 넣어서 주기
        addTodo(todoText);
        
        // 입력이 끝나면 입력창 비우기
        setTodoText('');
    };
    
    // input change 이벤트 핸들러 함수
    const todoChangeHandler = e => {
        console.log(e.target.value);
        setTodoText(e.target.value); // 인풋에 타이핑하면 todo텍스트 상태변수에 저장 됨
        // 그때 todoText 찍어주면 됨 (47번라인)
    };


  return (
    <>
        {
            // 상태값에 따라서 조건부 랜더링을 할 수 있음! 이부분 진짜 중요!
            open && (<div className='form-wrapper'>
                        <form className='insert-form' onSubmit={submitHandler}>
                            <input 
                                type='text'
                                placeholder='할 일 을 입력 후, 엔터를  누르세요!'
                                onChange={todoChangeHandler}
                                autoFocus
                                value={todoText} // 값을 비웠는데 안보임 그걸 렌더링 해줘야 보임. (인풋박스가 비게 보이도록)
                            />
                        </form>
                    </div>)
        }

        {/* cn() : 첫번째 파라미터는 항상 유지할 클래스
                    두번째 파라미터는 논리 상태값
                     => 논리상태값이 true일 경우, 해당 클래스가 추가
                        false일 경우 제거
        
                    변수이름(open)과 css클래스(abc) 가 다른경우, 54번처럼 작성

        */}
        <button className={cn('insert-btn', {abc: open})} onClick={onToggle}>
            <MdAdd />
        </button>

    </>
  )
}

export default TodoInput