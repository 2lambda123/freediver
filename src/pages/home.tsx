import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import posed from 'react-native-pose';
import { TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { getHeaderHeight } from '../utils/header';

const breathCycle = 10;

interface HomeState {
  started: boolean;
  holdingBreath: boolean;
  currentTime: number;
}

interface SectionProps {
  height: number;
  width: number;
}

const Wrapper = styled.View`
  flex: 1;
  background: #111d2b;
  align-items: center;
  justify-content: center;
`;

const AppText = styled.Text`
  color: white;
  font-size: 20;
  text-align: center;
`;

const WaveContainer = styled.View<SectionProps>`
  position: absolute;
  ${({ height }) => `height: ${height};`};
  ${({ width }) => `width: ${width};`};
  background: black;
`;

const Wave = styled(Animated.View)`
  position: absolute;
  background: #ffffff;
  opacity: 0.5;
`;

const StartButton = styled.View`
  width: 150;
  height: 150;
  border-radius: 75;
  background: #df027d;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export class Home extends PureComponent<{}, HomeState> {
  private timer: any = undefined;

  static navigationOptions = () => {
    return {
      title: 'Freediver',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#242c3d',
        elevation: 0,
        borderBottomWidth: 0,
      },
    };
  };

  constructor(props: {}) {
    super(props);
    this.state = { started: false, currentTime: 0, holdingBreath: false };
    this.onClickStart = this.onClickStart.bind(this);
  }

  render() {
    const { started, currentTime, holdingBreath } = this.state;
    var { height, width } = Dimensions.get('window');
    const calcHeight = height - getHeaderHeight();
    var amountPerTick = calcHeight / breathCycle;

    let buttonText = 'Dive down';
    let buttonEnabled = true;

    if (started && holdingBreath) {
      buttonText = "I'm coming up for air";
      buttonEnabled = true;
    }

    if (started && !holdingBreath) {
      buttonText = 'You need to rest';
      buttonEnabled = false;
    }

    let spinValue = new Animated.Value(0);

    // First set up animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
      }),
    ).start();

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Wrapper>
        <WaveContainer width={width} height={height / 2}>
          <Wave style={{ transform: [{ rotate: spin }] }} />
        </WaveContainer>
        <TouchableOpacity disabled={!buttonEnabled} onPress={this.onClickStart}>
          <StartButton>
            <AppText>{buttonText}</AppText>
          </StartButton>
        </TouchableOpacity>
      </Wrapper>
    );
  }

  private onClickStart() {
    const { holdingBreath } = this.state;

    this.setState({
      started: true,
      holdingBreath: !holdingBreath,
    });

    if (this.timer) return;

    this.timer = setInterval(() => {
      const { currentTime } = this.state;

      if (currentTime >= breathCycle) {
        clearInterval(this.timer);
      }

      this.setState({
        currentTime: currentTime + 0.1,
      });
    }, 100);
  }
}
