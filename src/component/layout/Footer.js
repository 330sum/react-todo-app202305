import React from 'react';

const Footer = () => {
  return (
    <footer style={{
        width: '100%',
        padding: '50px 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        background: '#38d9a9',
        color: '#fff',
        marginTop: '50px'
        // 인라인 안좋지만, 만약 사용한다면 자바스크립트니까 객체로 넣어야함 중괄호 콤마잊지말것, 또 JS -대쉬 사용불가니까, 카멜케이스사용해야함.
    }}>copyright. 2023 happy new year~~!!</footer>
  );
};

export default Footer;