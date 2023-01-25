import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import {
  PanGestureHandler,
  ScrollView,
  State,
  RectButton,
  BorderlessButton,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';

import { USE_NATIVE_DRIVER } from '../../../../config';
import { LoremIpsum } from '../../../../common';

const RATIO = 3;

export class Swipeable extends Component {
  constructor(props) {
    super(props);
    this._width = 0;
    this._dragX = new Animated.Value(0);
    this._transX = this._dragX.interpolate({
      inputRange: [0, RATIO],
      outputRange: [0, 1],
    });
    this._showLeftAction = this._dragX.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });
    this._showRightAction = this._dragX.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, 0],
    });
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this._dragX } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }
  _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dragToss = 0.05;
      const endOffsetX =
        event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;

      let toValue = 0;
      if (endOffsetX > this._width / 2) {
        toValue = this._width * RATIO;
      } else if (endOffsetX < -this._width / 2) {
        toValue = -this._width * RATIO;
      }

      Animated.spring(this._dragX, {
        velocity: event.nativeEvent.velocityX,
        tension: 15,
        friction: 5,
        toValue,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    }
  };
  _onLayout = (event) => {
    this._width = event.nativeEvent.layout.width;
  };
  _reset = () => {
    Animated.spring(this._dragX, {
      toValue: 0,
      useNativeDriver: USE_NATIVE_DRIVER,
      tension: 15,
      friction: 5,
    }).start();
  };
  render() {
    const { children } = this.props;
    return (
      <View>
        <Animated.View
          style={[styles.rowAction, { opacity: this._showLeftAction }]}
        >
          <RectButton
            style={[styles.rowAction, styles.leftAction]}
            onPress={this._reset}
          >
            <Text style={styles.actionButtonText}>Green</Text>
          </RectButton>
        </Animated.View>
        <Animated.View
          style={[styles.rowAction, { opacity: this._showRightAction }]}
        >
          <RectButton
            style={[styles.rowAction, styles.rightAction]}
            onPress={this._reset}
          >
            <Text style={styles.actionButtonText}>Red</Text>
          </RectButton>
        </Animated.View>
        <PanGestureHandler
          {...this.props}
          activeOffsetX={[-10, 10]}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View
            style={{
              backgroundColor: 'white',
              transform: [{ translateX: this._transX }],
            }}
            onLayout={this._onLayout}
          >
            {children}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

export const InfoButton = (props) => (
  <BorderlessButton
    {...props}
    style={styles.infoButton}
    onPress={() => alert(`${props.name} info button clicked`)}
  >
    <View style={styles.infoButtonBorders}>
      <Text style={styles.infoButtonText}>i</Text>
    </View>
  </BorderlessButton>
);

export default class RowExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          waitFor={['dragbox', 'image_pinch', 'image_rotation', 'image_tilt']}
          style={styles.scrollView}
        >
          <Swipeable>
            <RectButton
              style={styles.rectButton}
              onPress={() => alert('First row clicked')}
            >
              <Text style={styles.buttonText}>
                Swipe this row & observe highlight delay
              </Text>

              <InfoButton name="first" />
            </RectButton>
          </Swipeable>
          <Swipeable>
            <RectButton
              style={styles.rectButton}
              onPress={() => alert('First row clicked')}
            >
              <Text style={styles.buttonText}>
                Swipe this row & observe highlight delay
              </Text>

              <InfoButton name="first" />
            </RectButton>
          </Swipeable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 55,
    flex: 1,
  },
  rectButton: {
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  rowAction: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAction: {
    backgroundColor: '#4CAF50',
  },
  rightAction: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonDelimiter: {
    height: 1,
    backgroundColor: '#999',
  },
  buttonText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  infoButton: {
    width: 40,
    height: 40,
  },
  infoButtonBorders: {
    borderColor: '#467AFB',
    borderWidth: 2,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  infoButtonText: {
    color: '#467AFB',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
