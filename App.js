import { StyleSheet, View } from 'react-native';
import Ball from './src/components/examples/RN-GestureHandler/DocExamples/Ball';
import RowExample from './src/components/examples/Rows';
import Example from './src/components/examples/RN-GestureHandler';
import Example2 from './src/components/examples/PanGestureExample';
export default function App() {
  return <Example2 />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
  },

  textContainer: {
    flex: 0.5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTextContainer: {
    flex: 0.8,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 8 },
    textShadowRadius: 4,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

{
  /* <View style={styles.container}>
<View style={styles.textContainer}>
  <View style={styles.innerTextContainer}>
    <Text style={styles.text}>Now I am centered in this purple box!</Text>
  </View>
</View>
</View> */
}
