import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface GestureProps {
  width: number;
  height: number;
}

const PanGesture = ({ width, height }: GestureProps) => {
  return (
    <View>
      <Text>PanGesture</Text>
    </View>
  );
};

export default PanGesture;

const styles = StyleSheet.create({ container: {} });
