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
const waves_1 = __importDefault(require("../components/waves"));
const Wrapper = native_1.default.View `
  flex: 1;
  background: #111d2b;
  align-items: center;
  justify-content: center;
`;
class Home extends react_1.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(waves_1.default, null)));
    }
}
exports.Home = Home;
