import React, {useState, useEffect} from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Like from '../../../assets/images/LIKE.png';
import Nope from '../../../assets/images/nope.png';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const  AnimatedStack = props => {
  const { data, renderItem, onSwipeRight, onSwipeLeft } = props;


  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

  const { width: screenWidth} = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () => 
    interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + 
    'deg',
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform:[
      {
      translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
  ]
  }))

  const nextCardStyle = useAnimatedStyle(() => ({
    transform:[
      {
      scale: interpolate(
        translateX.value, 
        [-hiddenTranslateX, 0, hiddenTranslateX], 
        [1, 0.8, 1]
        )
      },
    ],
    opacity: interpolate(
      translateX.value, 
      [-hiddenTranslateX, 0, hiddenTranslateX], 
      [1, 0.5, 1]
      )
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value, 
      [0, hiddenTranslateX / 5], 
      [0, 1],
      ),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value, 
      [0, -hiddenTranslateX / 5],
      [0, 1],
      ),
  }));

const gestureHandler = useAnimatedGestureHandler({
  onStart: (_, context) => {
    context.startX = translateX.value;
  },
  onActive: (event, context) => {
    translateX.value = context.startX + event.translationX;
  },
  onEnd: (event) => {
    if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
      translateX.value = withSpring(0);

      return;
    }

    translateX.value = withSpring(
      hiddenTranslateX * Math.sign(event.velocityX),
      {},
      () => runOnJS(setCurrentIndex)(currentIndex + 1)
    );

    const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
    onSwipe && runOnJS(onSwipe)(currentProfile);
  },
});

const swipeRight = () => {
  translateX.value = withSpring(
    hiddenTranslateX,
    {},
    () => runOnJS(setCurrentIndex)(currentIndex + 1)
  );
  onSwipeRight && runOnJS(onSwipeRight)(currentProfile);
};

const swipeLeft = () => {
  translateX.value = withSpring(
    -hiddenTranslateX,
    {},
    () => runOnJS(setCurrentIndex)(currentIndex + 1)
  );
  onSwipeLeft && runOnJS(onSwipeLeft)(currentProfile);
};

useEffect(() => {
  translateX.value = 0;
  setNextIndex(currentIndex + 1);
}, [currentIndex, translateX]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.root}>
        {nextProfile && (
          <View style={styles.nextCardContainer}>
            <Animated.View style={[styles.animatedCard, nextCardStyle]}>
              {renderItem({ item: nextProfile })}
            </Animated.View>
          </View>
        )}

        {currentProfile && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.animatedCard, cardStyle]}>
              <Animated.Image
                source={Like}
                style={[styles.like, { left: 10 }, likeStyle]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Nope}
                style={[styles.like, { right: 10 }, nopeStyle]}
                resizeMode="contain"
              />
              {renderItem({ item: currentProfile })}
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
      <View style={styles.icons}>

        <Pressable onPress={swipeLeft}>
          <View style={styles.button}>
            <AntDesign name="close" size={30} color="#ff4040" />
          </View>
        </Pressable>

        <View style={styles.button}>
          <FontAwesome name="star" size={28} color="#ffdf00" />
        </View>

        <Pressable onPress={swipeRight}>
          <View style={styles.button}>
            <AntDesign name="like1" size={25} color="#3e5fff" />
          </View>
        </Pressable>

      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  pageContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  root: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent:'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  button: {
    width: 110,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010',
    padding: 5,
    borderRadius: 50,
  }
})

export default AnimatedStack;