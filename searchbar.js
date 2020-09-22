import React, { Component } from 'react';
import { Animated, View, StyleSheet, Text, TextInput, Keyboard } from 'react-native';

class Searchbar extends Component {

    isOpened = false;
    containerDimensions = undefined;

    state = {
        animated: new Animated.Value(-100),
        textDimensions: undefined
    }

    open() {
        const { animated } = this.state;
        const { isOpened } = this;
        const { marginRight, duration } = this.props;
        if (isOpened) return;
        this.isOpened = true;
        Animated.timing(
            animated,
            {
                toValue: marginRight,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
    }

    close() {
        const { animated, textDimensions } = this.state;
        const { duration } = this.props;
        const { isOpened } = this;
        if (!isOpened) return;
        this.isOpened = false;
        Animated.timing(
            animated,
            {
                toValue: -textDimensions.width,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
    }

    onLayout = event => {
        const { textDimensions } = this.state;
        if (textDimensions) return // layout was already called
        const { width, height } = event.nativeEvent.layout;
        this.setState({ textDimensions: { width, height } })
        const { animated } = this.state;
        animated.setValue(-width);
    }

    onFocusInput = () => {
        const { onFocus } = this.props;
        onFocus();
    }

    onPressCancel = () => {
        const { onCancel } = this.props;
        Keyboard.dismiss();
        onCancel();
    }


    render() {
        const { animated, textDimensions } = this.state;
        const {
            cancelText,
            cancelTextStyle,
            onLayout,
            placeholder,
            placeholderTextColor,
            searchbarStyle,
            backgroundColor,
            onChangeText,
            searchBarIcon
        } = this.props;
        return (
            <View onLayout={onLayout} style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={[styles.barWrapper, searchbarStyle]}>
                    {searchBarIcon}
                    <TextInput
                        onFocus={this.onFocusInput}
                        style={[styles.textInput]}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={onChangeText}
                    />
                </View>
                {
                    textDimensions ?
                        <Animated.Text onPress={this.onPressCancel} style={[{ marginRight: animated }, styles.cacelText, cancelTextStyle]} >{cancelText}</Animated.Text> :
                        <Text style={[{ opacity: 0, position: "absolute" }, styles.cacelText, cancelTextStyle]} onLayout={this.onLayout}>{cancelText}</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    barWrapper: {
        flex: 1,
        marginVertical: 10,
        height: 30,
        marginHorizontal: 20,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        borderRadius: 10
    },
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10
    },
    cacelText: {
        color: "#d32f2f",
        fontSize: 16,
    }
});

export default Searchbar;