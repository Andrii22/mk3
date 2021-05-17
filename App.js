import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _subscribe = () => {
    Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(100);
  }, []);

  const { x, y, z } = data;
  const degreesCoef = 0.00555555555;
  return (
    <View style={styles.firstLayer}>
      <View style={styles.secondLayer}>
        <Text
          style={[
            styles.paragraph,
            { position: 'absolute', top: '5%', left: '10%' },
          ]}>
          Degrees: {Math.round(180 - y / degreesCoef / 2)}°
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              position: 'absolute',
              top: '5%',
              right: '10%',
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'red',
              padding: 2,
            },
          ]}>
          270° equal 90°
        </Text>
        <Image
          style={{
            position: 'relative',
            height: 576 * 0.4,
            width: 576 * 0.4,
          }}
          source={require('./orientire.png')}
        />
        <Image
          style={{
            position: 'absolute',
            height: 240 * 0.2,
            width: 240 * 0.2,
            transform: [{ translateY: y / degreesCoef }],
          }}
          source={require('./circle.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstLayer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gray',
  },
  secondLayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  paragraph: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
