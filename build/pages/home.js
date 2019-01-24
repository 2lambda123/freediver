"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const native_1 = __importDefault(require("styled-components/native"));
const react_native_1 = require("react-native");
const header_1 = require("../utils/header");
const breathCycle = 10;
const Wrapper = native_1.default.View `
  flex: 1;
  background: #111d2b;
  align-items: center;
  justify-content: center;
`;
const AppText = native_1.default.Text `
  color: white;
  font-size: 20;
  text-align: center;
`;
const WaveContainer = native_1.default.View `
  position: absolute;
  ${({ height }) => `height: ${height};`};
  ${({ width }) => `width: ${width};`};
  background: black;
`;
const Wave = native_1.default(react_native_1.Animated.View) `
  position: absolute;
  background: #ffffff;
  opacity: 0.5;
`;
const StartButton = native_1.default.View `
  width: 150;
  height: 150;
  border-radius: 75;
  background: #df027d;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
class Home extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.timer = undefined;
        this.state = { started: false, currentTime: 0, holdingBreath: false };
        this.onClickStart = this.onClickStart.bind(this);
    }
    render() {
        const { started, currentTime, holdingBreath } = this.state;
        var { height, width } = react_native_1.Dimensions.get('window');
        const calcHeight = height - header_1.getHeaderHeight();
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
        let spinValue = new react_native_1.Animated.Value(0);
        // First set up animation
        react_native_1.Animated.loop(react_native_1.Animated.timing(spinValue, {
            toValue: 1,
            duration: 15000,
            easing: react_native_1.Easing.linear,
        })).start();
        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(WaveContainer, { width: width, height: height / 2 },
                react_1.default.createElement(Wave, { style: { transform: [{ rotate: spin }] } })),
            react_1.default.createElement(react_native_1.TouchableOpacity, { disabled: !buttonEnabled, onPress: this.onClickStart },
                react_1.default.createElement(StartButton, null,
                    react_1.default.createElement(AppText, null, buttonText)))));
    }
    onClickStart() {
        const { holdingBreath } = this.state;
        this.setState({
            started: true,
            holdingBreath: !holdingBreath,
        });
        if (this.timer)
            return;
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
Home.navigationOptions = () => {
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
exports.Home = Home;
