import React, { useState } from 'react';
import styled from 'styled-components';

import Register from '../Components/Register';
import Login from '../Components/Login';

import Wallpaper from '../public/images/landingpage.jpg';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(${Wallpaper});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LandingPage = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <Wrapper>
      {hasAccount ? (
        <Login setHasAccount={setHasAccount} />
      ) : (
        <Register setHasAccount={setHasAccount} />
      )}
    </Wrapper>
  );
};

export default LandingPage;
