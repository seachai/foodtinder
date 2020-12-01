import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';

import styled from 'styled-components';
import Deck from '../Components/Deck';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HomePage = (props) => {
  const { restaurants } = useAuth();

  return !restaurants ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <Deck id={props.location.state} restaurants={restaurants} />
    </Wrapper>
  );
};

export default HomePage;
