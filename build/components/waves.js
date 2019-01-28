"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expo_1 = require("expo");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const { Lottie } = expo_1.DangerZone;
const { LottieView } = Lottie;
class Waves extends react_1.PureComponent {
    render() {
        return (react_2.default.createElement(LottieView, { source: require('../design-assets/exports/waves.json'), autoPlay: true, loop: true }));
    }
}
exports.default = Waves;
