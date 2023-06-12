import React from 'react';
import {Grid, Button, Container, Typography, TextField} from "@mui/material";

import { API_BASE_URL as BASE, USER } from '../../config/host-config';

import { redirect, useNavigate } from 'react-router-dom';

const Login = () => {

    const redirection = useNavigate();

    const REQUEST_URL = BASE + USER + '/signin';

    // 서버에 AJAX요청
    const fetchLogin = async() => {

        // 이메일, 비밀번호 입력 태그 얻어오기
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        const res = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })
        });

        if (res.status === 400) { // 가입이 안되어 있거나, 비번틀린 경우 -> 서버에서 텍스트 주니까 텍스트로 읽어야함
            const text = await res.text(); // 서버에서 온 문자열 읽기
            alert(text);
            return;
        }

        // const json = await res.json(); // 서버에서 온 json 읽기
        // console.log(json);
        // alert(json);
        // alert(json.userName);
        const { token, userName, email, role} = await res.json(); // 서버에서 온 json 읽기


        // json에 담긴 인증정보(토큰)를 클라이언트에게 보관시킴
        // 보관하는 위치가 2군데임!
        // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨 (자동로그인 처럼 됨)
        // 2. 세션 스토리지 (우리가 아는 세션과 다름. 브라우저 안에 있은 클라이언트 세션) - 브라우저가 종료되면 사라짐 (일반 로그인처럼 됨)

        // 1. 로컬스토리지에 담는 방법 - localStorage
        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USERNAME', userName);
        localStorage.setItem('USER_ROLE', role);

        // 2. 브라우저 끄면 종료 되게 하는 방법 (세션 스토리지) - sessionStorage
        // sessionStorage.setItem('ACCESS_TOKEN', token);
        // sessionStorage.setItem('LOGIN_USERNAME', userName);
        // sessionStorage.setItem('USER_ROLE', role);




        // 홈으로 리다이렉트
        redirection('/');



    };


    // 로그인 요청 핸들러
    const loginHandler = e => {
        e.preventDefault();
    
        // 서버에 로그인 요청전송
        fetchLogin();
    
    };
    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>

            <form noValidate onSubmit={loginHandler}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
      )
}

export default Login