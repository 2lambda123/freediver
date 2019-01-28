import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Waves from '../components/waves';

interface HomeState {
  started: boolean;
  holdingBreath: boolean;
  currentTime: number;
}

const Wrapper = styled.View`
  flex: 1;
  background: #111d2b;
`;

export class Home extends PureComponent<{}, HomeState> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <Waves />
      </Wrapper>
    );
  }
}
