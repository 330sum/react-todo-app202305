// 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
export const setLoginUserInfo = ({token, userName, role}) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('USER_ROLE', role);
};


// 로그인한 유저의 데이터객체를 반환하는 함수
export const getLoginUserInfo = () => {

    return {
        token: localStorage.getItem('ACCESS_TOKEN'),
        userName: localStorage.getItem('LOGIN_USERNAME'),
        role: localStorage.getItem('USER_ROLE')
    };
};


// 로그인 여부를 확인하는 함수
export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN'); // 로컬스토리지에서 getItem 했는데, true 로그인, false면 로그인 안함
// 위의 한 줄은 아래와 같은 내용임
// const isLogin = () => {
//     const token = localStorage.getItem('ACCESS_TOKEN');
//     if (token === null) return false;
//     return true;
// };
