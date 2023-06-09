import React, {
    useEffect,
    useState
  } from 'react';
  import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Link
  } from "@mui/material";


  import {API_BASE_URL as BASE, USER} from '../../config/host-config';
import { json } from 'react-router-dom';
  
  const Join = () => {

    const API_BASE_URL = BASE + USER;
  
    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
      userName: '',
      password: '',
      email: ''
    });
  
    // 검증 메세지에 대한 상태변수 관리
    const [message, setMessage] = useState({
      userName: '',
      password: '',
      passwordCheck: '',
      email: ''
    });
  
    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
      userName: false,
      password: false,
      passwordCheck: false,
      email: false
    });
  
  
    // 검증데이터를 상태변수에 저장하는 함수
    const saveInputState = ({
      key,
      inputVal,
      flag,
      msg
    }) => {
  
      inputVal !== 'pass' && setUserValue({
        ...userValue,
        [key]: inputVal
      });
  
      setMessage({
        ...message,
        [key]: msg
      });
  
  
      setCorrect({
        ...correct,
        [key]: flag
      });
    };
  
  
    // 이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {
  
      const nameRegex = /^[가-힣]{2,5}$/;
  
      const inputVal = e.target.value;
      // 입력값 검증
      let msg; // 검증 메시지를 저장할 변수
      let flag; // 입력 검증체크 변수
  
      if (!inputVal) {
        msg = '유저 이름은 필수입니다.';
        flag = false;
      } else if (!nameRegex.test(inputVal)) {
        msg = '2~5글자 사이의 한글로 작성하세요!';
        flag = false;
      } else {
        msg = '사용 가능한 이름입니다.';
        flag = true;
      }
  
      saveInputState({
        key: 'userName',
        inputVal,
        msg,
        flag
      });
  
  
    };

    // 이메일 중복체크 서버통신 함수
    const fetchDuplicateCheck = email => {

        fetch(`${API_BASE_URL}/check?email=${email}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
            });

    };
  
  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = e => {

    const inputVal = e.target.value;

    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    let msg, flag;
    if (!inputVal) {
        msg = '이메일은 필수값입니다!';
        flag = false;
    } else if (!emailRegex.test(inputVal)) {
        msg = '이메일 형식이 아닙니다!';
        flag = false;
    } else {
        // 이메일 중복체크
        fetchDuplicateCheck(inputVal);

    }

  };
  
    // 패스워드 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        // 패스워드가 변동되면 확인란을 비우기
        document.getElementById('password-check').value ='';
        document.getElementById('check-span').textContent ='';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...message, passwordCheck: false});
        // 다시한번 그려져야함!

  
      const inputVal = e.target.value;
  
      const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  
      // 검증 시작
      let msg, flag;
      if (!e.target.value) { // 패스워드 안적은거
        msg = '비밀번호는 필수값입니다!';
        flag = false;
      } else if (!pwRegex.test(e.target.value)) {
        msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
        flag = false;
      } else {
        msg = '사용 가능한 비밀번호입니다.';
        flag = true;
      }
  
      saveInputState({
        key: 'password',
        inputVal,
        msg,
        flag
      });
  
    };
  
    // 비밀번호 확인란 검증 이벤트 핸들러
    const pwCheckHandler = e => {
      // 검증 시작
      let msg, flag;
      if (!e.target.value) { // 패스워드 안적은거
        msg = '비밀번호 확인란은 필수값입니다!';
        flag = false;
      } else if (userValue.password !== e.target.value) {
        msg = '패스워드가 일치하지 않습니다.';
        flag = false;
      } else {
        msg = '패스워드가 일치합니다.';
        flag = false;
      }
  
      saveInputState({
        key: 'passwordCheck',
        inputVal: 'pass',
        msg,
        flag
      });
  
    };
  
  
  
    const joinButtonClickHandler = e => {
  
      e.preventDefault();
  
      console.log(userValue);
    };
  
  
    // 렌더링이 끝난 이후 실행되는 함수
    useEffect(() => {
  
    }, []);
  
    return (
      <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
          <form noValidate>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Typography component="h1" variant="h5">
                          계정 생성
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          autoComplete="fname"
                          name="username"
                          variant="outlined"
                          required
                          fullWidth
                          id="username"
                          label="유저 이름"
                          autoFocus
                          onChange={nameHandler}
                      />
                      <span style={
                        correct.userName
                        ?{color:'green'}
                        : {color:'red'}
                      }>{message.userName}</span>
                      {/* 문자열만 {}생략가능 다른 모든것은 {}써야한다. */}
                      {/* 렌더링할때 쓸려면 데이터가 상태변수여야함!!!!!!!!!!!!!! */}
                      {/* <span>{msg}</span> 이딴식으로 쓰면 안됨!!!!!!!!!!!!!!!!*/}
                      {/* span들 태그 아님! jsx임! 자바스크립트임! 그래서 무조건 중괄호로 써야함! */}
                      {/* 문자는 중괄호 생략가능 바깥 중괄호 jsx문번, style은 객체로 중괄호에 싸서 넣어야함! 근데 지금은 문법 넣은거~~ */}
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="이메일 주소"
                          name="email"
                          autoComplete="email"
                          onChange={emailHandler}
                      />
                      <span style={
                        correct.email
                        ?{color:'green'}
                        : {color:'red'}
                      }>{message.email}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="패스워드"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={passwordHandler}
                      />
                      <span style={
                        correct.password
                        ?{color:'green'}
                        : {color:'red'}
                      }>{message.password}</span>
                  </Grid>
  
                  <Grid item xs={12}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password-check"
                          label="패스워드 확인"
                          type="password"
                          id="password-check"
                          autoComplete="check-password"
                          onChange={pwCheckHandler}                
                      />
                      <span id ='check-span' style={
                        correct.passwordCheck
                        ?{color:'green'}
                        : {color:'red'}
                      }>{message.passwordCheck}</span>
                  </Grid>
  
                  <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        style={{background: '#38d9a9'}}
                        onClick={joinButtonClickHandler}
                      >
                          계정 생성
                      </Button>
                  </Grid>
              </Grid>
              <Grid container justify="flex-end">
                  <Grid item>
                      <Link href="/login" variant="body2">
                          이미 계정이 있습니까? 로그인 하세요.
                      </Link>
                  </Grid>
              </Grid>
          </form>
      </Container>
    );
  
  }
  
  export default Join