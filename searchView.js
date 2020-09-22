import React, {Component} from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from './helper';

const { height } = Dimensions.get("window");

class SearchView extends Component {
    isOpened = false;
    statusBarHeight= getStatusBarHeight();

    state = {
        animatedHeight: new Animated.Value(height - this.props.fullHeaderHeight),
        animatedOpacity: new Animated.Value(0),
        zIndex: -1
    }

    setZIndex = (zIndex) => {
        const { duration } = this.props;
        setTimeout(() => {
            this.setState({zIndex});
        }, duration)
    }

    open() {
        const { animatedHeight, animatedOpacity } = this.state;
        const { isOpened, statusBarHeight } = this;
        const { duration, searchbarHeight } = this.props;
        if (isOpened) return;
        this.isOpened = true;
        this.setState({zIndex: 1});
        Animated.timing(
            animatedOpacity,
            {
                toValue: 1,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
        Animated.timing(
            animatedHeight,
            {
                toValue: height - searchbarHeight - statusBarHeight,
                duration: duration,
                useNativeDriver: false
            },
        ).start();
    }

    close() {
        const { animatedOpacity,  animatedHeight} = this.state;
        const { duration, fullHeaderHeight } = this.props;
        const { isOpened, setZIndex } = this;
        if (!isOpened) return;
        this.isOpened = false;
        Animated.timing(
            animatedOpacity,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
        Animated.timing(
            animatedHeight,
            {
                toValue: height - fullHeaderHeight,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
        setZIndex(-1)
    }
    
    render(){
        const { children } = this.props;
        const { zIndex, animatedOpacity, animatedHeight } = this.state;
        return (
            <Animated.View style={[styles.container, {opacity: animatedOpacity, height: animatedHeight, zIndex: zIndex}]}>
                {children}
            </Animated.View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        zIndex: 1,
        // backgroundColor: 'red',
        position: "absolute",
        opacity: 0.5,
        bottom: 0
    }
})

export default SearchView;