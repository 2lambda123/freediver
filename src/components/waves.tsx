import React, { PureComponent } from 'react';
import { DangerZone } from 'expo';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { Lottie } = DangerZone;

interface WavesProps {
  animationWidth: number;
  animationHeight: number;
}

const StyledWaves = styled(Lottie)<WavesProps>`
  width: 100;
  height: 100;
`;

const Container = styled.View`
  flex: 1;
`;

export default class Waves extends PureComponent<{}> {
  public animation: any = undefined;

  constructor(props: {}) {
    super(props);
    this.playAnimation = this.playAnimation.bind(this);
  }

  componentDidMount() {
    this.playAnimation();
  }

  render() {
    return (
      <Container>
        <Lottie
            loop
            ref={(animation: any) => {
              this.animation = animation;
            }}
            source={require('../design-assets/exports/waves.json')}
          />
      </Container>
    );
  }

  private playAnimation() {
    if (this.animation) {
      this.animation.reset();
      this.animation.play();
    }
  };
}
