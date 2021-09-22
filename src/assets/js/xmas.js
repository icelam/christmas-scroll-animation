/* global TimelineMax */

/*
 * Import
 */
import TweenMax from 'TweenMax';
import 'scrollmagic.animation.gsap';
import 'scrollmagic.debug.addIndicators';
// Issue when importing ScrollMagic: https://github.com/janpaepke/ScrollMagic/issues/717
// eslint-disable-next-line import/no-unresolved
import ScrollMagic from 'ScrollMagic';
import debounce from './utils/debounce';

/*
 * Variables
 */
const elementScene1 = '#scene1';
const elementHouse = '#house';
const elementNight = '#night';
const elementCalendar = '#calendar';
const elementPot = '#pot';
const elementTree = '#tree';
const elementDeco = '#deco';
const elementBalls = '#balls';
const elementBallYellow = '#ball_yellow';
const elementBallPurple = '#ball_purple';
const elementBallRed = '#ball_red';
const elementStar = '#star';
const elementWish = '#wish';

/*
 * Functions
 */
const calculateHeight = (height) => `${(height / 1080) * 100}vh`;

const getWindowWidth = () => (
  window.innerWidth
  || document.documentElement.clientWidth
  || document.getElementsByTagName('body')[0].clientWidth
);

const getWindowHeight = () => (
  window.innerHeight
  || document.documentElement.clientHeight
  || document.getElementsByTagName('body')[0].clientHeight
);

const isLandscape = () => {
  if (window.orientation !== undefined) {
    return (window.orientation === 90 || window.orientation === -90);
  }
  return (getWindowHeight() / getWindowWidth() <= 1);
};

const orientationcChangeHandler = () => {
  if (!isLandscape()) {
    window.scrollTo(0, 0);
    document.getElementById('start_msg').innerHTML = 'Rotate your phone to start';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementById('house').style.bottom = '-100vh';
  } else {
    document.getElementById('start_msg').innerHTML = 'Scroll';
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }
};

/*
 * Listeners
 */
window.addEventListener('orientationchange', debounce(orientationcChangeHandler, 250));

window.addEventListener('resize', debounce(orientationcChangeHandler, 250));

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

orientationcChangeHandler();

/*
 * Animations
 */
const controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave',
    loglevel: 0,
  },
});

const scene1InTween = new TimelineMax();
scene1InTween.add([
  TweenMax.to(elementHouse, 1, { bottom: '0' }, '0'),
]);

const scene1AnimationTween = new TimelineMax();
scene1AnimationTween.add([
  // add pot
  TweenMax.to(elementPot, 1, { opacity: 1, bottom: calculateHeight(60) }, '0'),

  // grow tree
  TweenMax.to(elementTree, 1, { scale: 1, delay: 1.25 }, '0'),

  // add deco
  TweenMax.to(elementDeco, 1, { opacity: 1, bottom: calculateHeight(233), delay: 2.5 }, '0'),

  // drop balls
  TweenMax.to(elementBallYellow, 0.5, { opacity: 1, delay: 3 }, '0'),
  TweenMax.to(elementBallYellow, 0.5, { top: '22%', delay: 3.5 }, '0'),
  TweenMax.to(elementBallYellow, 0.25, { scale: 1.1, delay: 3.75 }),
  TweenMax.to(elementBallYellow, 0.25, { scale: 1, rotation: 15, delay: 4 }),
  TweenMax.to(elementBallYellow, 0.25, { rotation: -15, delay: 4.25 }),
  TweenMax.to(elementBallYellow, 0.25, { rotation: 0, delay: 4.5 }),

  TweenMax.to(elementBallPurple, 0.5, { opacity: 1, delay: 3.5 }, '0'),
  TweenMax.to(elementBallPurple, 0.5, { top: '46%', delay: 4 }, '0'),
  TweenMax.to(elementBallPurple, 0.25, { scale: 1.1, delay: 4.25 }),
  TweenMax.to(elementBallPurple, 0.25, { scale: 1, rotation: 15, delay: 4.5 }),
  TweenMax.to(elementBallPurple, 0.25, { rotation: -15, delay: 4.75 }),
  TweenMax.to(elementBallPurple, 0.25, { rotation: 0, delay: 5 }),

  TweenMax.to(elementBallRed, 0.5, { opacity: 1, delay: 4 }, '0'),
  TweenMax.to(elementBallRed, 0.5, { top: '61%', delay: 4.5 }, '0'),
  TweenMax.to(elementBallRed, 0.25, { scale: 1.1, delay: 4.75 }),
  TweenMax.to(elementBallRed, 0.25, { scale: 1, rotation: 15, delay: 5 }),
  TweenMax.to(elementBallRed, 0.25, { rotation: -15, delay: 5.25 }),
  TweenMax.to(elementBallRed, 0.25, { rotation: 0, delay: 5.5 }),

  // place star
  TweenMax.to(elementStar, 1, { bottom: calculateHeight(788), opacity: 1, delay: 6 }),

  // move room
  TweenMax.to(elementHouse, 1, { backgroundPosition: '-120% 50%', delay: 7 }),
  TweenMax.to(elementNight, 1, { left: '-40%', delay: 7 }),
  TweenMax.to(elementCalendar, 1, { right: '20%', delay: 7 }),
  TweenMax.to(elementPot, 1, { left: calculateHeight(-780), delay: 7 }),
  TweenMax.to(elementTree, 1, { left: calculateHeight(-780), delay: 7 }),
  TweenMax.to(elementDeco, 1, { left: calculateHeight(-780), delay: 7 }),
  TweenMax.to(elementBalls, 1, { left: calculateHeight(-780), delay: 7 }),
  TweenMax.to(elementStar, 1, { left: calculateHeight(-780), delay: 7 }),

  // show text
  TweenMax.to(elementWish, 1, { opacity: 1, delay: 8 }),
]);

// show welcome screen when load
new ScrollMagic.Scene({ duration: '100%' })
  .triggerElement('body')
  .setTween(scene1InTween)
  // .addIndicators()
  .addTo(controller);

// start animation when having enough scroll
new ScrollMagic.Scene({ duration: '2000%' })
  .setPin(elementScene1)
  .triggerElement(elementScene1)
  .setTween(scene1AnimationTween)
  // .addIndicators()
  .addTo(controller);
