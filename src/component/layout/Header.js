import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

import { isLogin, getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL, USER } from '../../config/host-config';

const Header = () => {
    
    const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`;

    const redirection = useNavigate();

    // 프로필 이미지url 상태변수
    const [profileUrl, setProfileUrl] = useState(null);

    const [userInfo, setUserInfo] = useState(getLoginUserInfo());

    const { token, userName, role } = userInfo;

    // 로그아웃 핸들러
    // 로컬스토리지 다 지우고 리다이렉트하면 됨
    const logoutHandler = e => {
        localStorage.clear();
        redirection('/login');
    };


    const fetchProfileImage = async() => {
        const res = await fetch(profileRequestURL, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + getLoginUserInfo().token}
        });

        if (res.status === 200) {
            // 서버에서 직렬화된 이미지가 응답된다.
           const profileBlob = await res.blob();
           // 해당 이미지를 imgUrl로 변경
           const imgUrl = window.URL.createObjectURL(profileBlob);
           setProfileUrl(imgUrl);
        }else {
            const err = await res.text();
            setProfileUrl(null);
        }

    };


    // useEffect : 첫 렌더링이 끝난 후 실행되는 함수
    useEffect(() => {
        // setUserInfo(getLoginUserInfo());
        fetchProfileImage();

    });
    // 의존성 배열
    // useEffect의 두번째 파라미더 [] 배열 (의존성 배열)
    // - 저 부분 생략 할 경우, 매 리렌더링될때마다 useEffect를 호출함
    // - 빈 배열을 넣을 경우, 첫 렌더링할때만 단 1번 useEffect를 호출
    // - 배열에 상태변수를 넣을 경우, 상태값이 변경될때마다 리렌더링함useEffect를 호출

    // 빈 배열일때 화면이 갱신이 안되는 이유?
    // 실행순서: Header, useState (근데 이 안에 객체가 없으니까 디스트럭쳐링 해도 업음), return 렌더링, isLogin하고 (그려놓고) userEffect정보를 부름

    return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            width: '100%'
        }}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h4">
                                {
                                    isLogin()
                                    ? userName + '님'
                                    : '오늘'
                                }
                                의 할일
                            </Typography> 
                            <img
                                src = {profileUrl || require('../../assets/img/anonymous.jpg')}
                                alt = '프사'
                                style={
                                    {
                                        marginLeft: 20,
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%'
                                    }
                                }
                            
                            />
                                
                        </div>
                    </Grid>

                    <Grid item>
                        <div className='btn-group'>
                            {isLogin() // 로그인했니?
                                ?
                                ( // ㅇㅇ. 로그인 함 
                                    <button className="logout-btn" onClick={logoutHandler}>로그아웃</button> 
                                )
                                :
                                ( // ㄴㄴ. 안함
                                    <>
                                        <Link to='/login'>로그인</Link>
                                        <Link to='/join'>회원가입</Link>
                                    </>
                                )
                            }
                        </div>
                    </Grid>
                   
                </Grid>
            </Toolbar>
        </AppBar>
      );
}

export default Header
