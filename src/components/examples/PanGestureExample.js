import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { useSharedValue } from 'react-native-reanimated';

import { useAnimatedStyle } from 'react-native-reanimated';
import { withTiming } from 'react-native-reanimated';

function Trythis() {
  const { width } = useWindowDimensions();
  console.log(width);
  const END_POSITION = 333;
  const onRight = useSharedValue(true);
  const isPressed = useSharedValue(false);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(true)
    .onBegin((e) => {
      isPressed.value = true;
      console.log('eee', e);
    })
    .onUpdate((e) => {
      if (onRight.value) {
        position.value = -e.translationX;
      } else {
        position.value = 0;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 500 });
        onRight.value = false;
      } else {
        position.value = withTiming(0, {
          duration: 200,
        });
        onRight.value = true;
      }
    });
  // .onUpdate((e) => {
  //   if (onRight.value) {
  //     position.value = -e.translationX;
  //   } else {
  //     position.value = END_POSITION + e.translationX;
  //   }
  // })
  // .onEnd((e) => {
  //   if (position.value > END_POSITION / 2) {
  //     position.value = withTiming(END_POSITION, { duration: 100 });
  //     onRight.value = true;
  //   } else {
  //     position.value = withTiming(0, { duration: 100 });
  //     onRight.value = false;
  //   }
  // });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -position.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: -390,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ backgroundColor: 'green', flex: 1 }}> Garbage</Text>
          <Text style={{ backgroundColor: 'green', flex: 1 }}>Hey</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
export default function Example2() {
  return (
    <View style={styles.container}>
      <Trythis />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  box: {
    backgroundColor: 'blue',
    position: 'relative',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
});
