"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
exports.LANDSCAPE = 'landscape';
exports.PORTRAIT = 'portrait';
exports.getHeaderHeight = () => {
    let height;
    const orientation = exports.getOrientation();
    height = exports.getHeaderSafeAreaHeight();
    height += react_native_1.DeviceInfo.isIPhoneX_deprecated && orientation === exports.PORTRAIT ? 24 : 0;
    return height;
};
// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
exports.getHeaderSafeAreaHeight = () => {
    const orientation = exports.getOrientation();
    if (react_native_1.Platform.OS === 'ios' && orientation === exports.LANDSCAPE && !react_native_1.Platform.isPad) {
        return 32;
    }
    return react_navigation_1.Header.HEIGHT;
};
exports.getOrientation = () => {
    const { width, height } = react_native_1.Dimensions.get('window');
    return width > height ? exports.LANDSCAPE : exports.PORTRAIT;
};
