import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const WORD_WIDTH = 180;

function SplashScreen() {
  const kTranslate = useRef(new Animated.Value(0)).current;
  const rakenOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const playAnimation = () => {
    kTranslate.setValue(0);
    rakenOpacity.setValue(0);
    buttonOpacity.setValue(0);

    Animated.sequence([
      Animated.delay(1000),

      Animated.parallel([
        Animated.timing(kTranslate, {
          toValue: -92,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rakenOpacity, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 2600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    playAnimation();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.center}>
        <View style={styles.row}>
          <View style={styles.word}>
            <Animated.Text
              style={[
                styles.text,
                styles.raken,
                { opacity: rakenOpacity },
              ]}
            >
              raken
            </Animated.Text>

            <Animated.Text
              style={[
                styles.text,
                { transform: [{ translateX: kTranslate }] },
              ]}
            >
              K
            </Animated.Text>
          </View>

          <Text style={[styles.text, styles.ms]}>MS</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  word: {
    width: WORD_WIDTH,
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 130,
  },
  raken: {
    position: 'absolute',
    left: -67,
  },
  text: {
    color: 'red',
    fontSize: 36,
    fontWeight: '900',

    //I tried a glow but hate it so I made it black for now
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  ms: {
    marginLeft: 12,
    left: -30,
  },
  buttonContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SplashScreen;
