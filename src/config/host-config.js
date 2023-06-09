// 컴포넌트가 아니고 설정파일이기 때문에 소문자로 파일명!!!!!!!!!!!!!

// 브라우저가 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

if (clientHostName === 'localhost') {
    backEndHostName = 'http://localhost:8181';
}else if (clientHostName === 'vanila.com') {
    backEndHostName = 'http://api.vanila.co.kr';
}

export const API_BASE_URL = backEndHostName;
export const TODO = '/api/todos';
export const USER = '/api/auth';