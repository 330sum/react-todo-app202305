import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'

import './scss/TodoTemplate.scss';

const TodoTemplate = () => {

    // 서버에 할일 목록(json)을 요청해서 받아와야 함
   

    // todos배열을 상태관리
    const [todos, setTodos] = useState([
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
    ]);

    // id값 시퀀스 생성 함수
    const makeNewId = () => {
        // 기존인덱스 todos의 마지막 인덱스 아이디 +1 리턴하기
        // return todos[todos.length - 1].id + 1; (근데아무것도 없으면 0-1니까 오류남 그래서 아래처럼작성)
        if (todos.length ===0) return 1;
        return todos[todos.length - 1].id + 1;
    }

    // 하위컴포넌트 -> 상위컴포넌트 :  데이터 주는 방법 (콜백함수 이용)
    // 상위컴포넌트에서 함수 만들기 (addTodo)
    // 받고싶은 데이터의 매개변수 만들기 (todoText)
    // 함수를 하위컴포넌트에게 보냄- 50번라인(addTodo)
    // TodoInput컴포넌트(하위컴포넌트)에게 todoText(매개변수)를 받아오는 함수
    const addTodo = todoText => {
        // console.log('할일 정보 in TodoTemplate: ', todoText);

        const newTodo = {
            id: makeNewId(),
            title: todoText,
            done: false
        };

        // todos.push(newTodo); // 푸쉬를 해도 안먹힘.
        // 상태값의 변경은 무조건 setter로만 해야함!!!!!!!!!!!!!!!!!!! 
        // 무조건!! 배열에 적용되는 함수 푸쉬, 스플라이트 그런거 절대 안 먹힘!!
        // 꼭!! 리액트의 상태변수는 무조건 setter를 통해서만 상태값을 변경해야 렌더링에 적용된다.
        // 다만 상태변수가 불변성(immutable)을 가지기 때문에
        // 기존의 상태에서 변경이 불가능하고 새로운 상태를 만들어서 변경해야한다. (배열생각하기)
        // 지금은 todos의 상태가 4개의 todo가 있는데, 5개의 배열로 못바꿈
        // 새로운 배열을 만들어서 이사해서 교체해야함 (성능문제는? 리액트는 성능문제가 안생기도록 useState에서 관리함)
        // setTodos(todos.concat([newTodo])); // js-study에 2-4.배열메서드 concat(): 배열연결하는 함수 복사본 나옴
        // todos는 배열인데, newTodo는 객체니까 [] 넣어야함
        setTodos([... todos, newTodo]); // 복사해서 추가하는 형태
    };

    // 정리정리------------------------------------------------------------------------------------------------
    // 지역변수는 값을 유지 못함. 값유지시키려면 상태변수를 써야함
    // 상태값을 변경해서 유지하려면 -> 세터로해야함 
    // -> 근데, 상태변수는 불변성을 띄기 때문에 새로운배열로 교체해주는 개념으로 가야함 
    // -> 복사해서 추가해주는 형태로 구현 (69번라인)

    // 랜더링된 다음에 실행된는 함수 useEffect
    // useEffect안에(콜백함수()=>{}, [])
    // 리액트에서 상태변수가 아니면 유지되지 않음. 그래서 적용되지 않음(counter랑 똑같은 개념)
    // 현재 todos가 지역변수이기 때문에 상태변수로 만들어줘야함 -> // todos배열을 상태관리
    useEffect(() => {
        console.log(todos);
    }, [todos]);
    // useEffect는 로그찍으려고 쓴거임. 지금 사용안함


    // 하위컴포넌트 -> 상위컴포넌트 :  데이터 주는 방법
    // 할 일 삭제 처리 함수
    const removeTodo = id => {
        console.log(`삭제대상 id: ${id}`);
        // 휴지통 누르면 값 찍힘

        // 상태값을 변경하기 위해 for문 돌려서 그 값을 찾고, 복사해서 그걸 지움
        // 근데 너무 코드가 기니까 아래처럼 작성

        const copyArr = todos.filter(todo => todo.id !== id);
        // filter를 사용해서 'id가 다른 것만 남겨라' (filter와 map은 사본배열 줌)
        setTodos(copyArr);
    };

    
    // 상태관리의 중앙집중화!! 패치할 때도 한곳에서 할 수 있음~

    // 하위컴포넌트 -> 상위컴포넌트 :  데이터 주는 방법
    // 할 일 체크 처리 함수
    const checkTodo = id => {
        console.log(`체크한 Todo id: ${id}`);

        const copyTodos = todos.map(todo => todo.id === id ? {... todo, done: !todo.done} : todo)
        // todos의 맵을 돌려서 todo 하나씩 뽑아냄 (반복문)
        // 그 4개 중에서 체크한 id와 id가 같으면 
        // 기존의 것 그대로 가져오고, true가 나오면 뒤짐고, 안나오면 그냥 todo로 둠
        // ... 9. 객체 구조분해 할당 보기
        setTodos(copyTodos);

        // 위 내용 풀어서 쓰면 아래와 같음
        // const copyTodos = [...todos];
        // for (const cTodo of copyTodos) {
        //   if (cTodo.id === id) {
        //     cTodo.done = !cTodo.done;
        //   }
        // }
        // setTodos(copyTodos);

    

    };









  return (
   <div className='TodoTemplate'>
        <TodoHeader />
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
        <TodoInput addTodo={addTodo}/>
   </div>
  )
}

export default TodoTemplate