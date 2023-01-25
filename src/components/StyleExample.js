import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StyleExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Text style={styles.biggerText}>Other Text!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    fontSize: 50,
    marginVertical: 50,
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'pink',
    fontWeight: 'bold',
    flex: 1,
    marginVertical: 25,
    padding: '25% 0% 25% 24%',
    fontSize: 'inherit',
  },
  biggerText: {
    color: 'red',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    marginVertical: 25,
  },
});
export default StyleExample;
