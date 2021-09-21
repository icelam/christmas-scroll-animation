/* global TimelineMax */

/* 
 * Import
 */
import TweenMax from 'TweenMax';
import 'animation.gsap';
import 'debug.addIndicators';
import ScrollMagic from 'ScrollMagic';
import debounce from './utils/debounce';

/* 
 * Variables
 */
const elem_scene_1 = '#scene1';
const elem_house = '#house';
const elem_night = '#night';
const elem_calendar = '#calendar';
const elem_pot = '#pot';
const elem_tree = '#tree';
const elem_deco = '#deco';
const elem_balls = '#balls';
const elem_ball_y = '#ball_y';
const elem_ball_p = '#ball_p';
const elem_ball_r = '#ball_r';
const elem_star = '#star';
const elem_wish = '#wish';

/* 
 * Functions
 */
const calculateHeight = (h) => {
  return h / 1080 * 100 + 'vh';
};

const getWindowWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
};

const getWindowHeight = () => {
  return window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
};

const isLandscape = () => {
  if(window.orientation !== undefined) {
    return (window.orientation == 90 || window.orientation == -90);
  }
  return (getWindowHeight() / getWindowWidth() <= 1 ? true : false);
};

const orientationcChangeHandler = () => {
  if(!isLandscape()) {
    window.scrollTo(0, 0);
    document.getElementById('start_msg').innerHTML = 'Rotate your phone to start';
    document.getElementsByTagName('body')[0].style.overflow='hidden';
    document.getElementById('house').style.bottom = '-100vh';
  } else {
    document.getElementById('start_msg').innerHTML = 'Scroll';
    document.getElementsByTagName('body')[0].style.overflow='auto';
  }
};

/* 
 * Listeners
 */
window.addEventListener('orientationchange', debounce(orientationcChangeHandler, 250));

window.addEventListener('resize', debounce(orientationcChangeHandler, 250));

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

orientationcChangeHandler();

/* 
 * Animations
 */
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave',
    loglevel: 0
  }
});

var scene1_in_tween = new TimelineMax();
scene1_in_tween.add([
  TweenMax.to(elem_house, 1, {bottom: '0'}, '0')
]);

var scene1_animation_tween = new TimelineMax();
scene1_animation_tween.add([
  //add pot
  TweenMax.to(elem_pot, 1, {opacity: 1, bottom: calculateHeight(60)}, '0'),
  
  //grow tree
  TweenMax.to(elem_tree, 1, {scale: 1, delay: 1.25}, '0'),
  
  //add deco
  TweenMax.to(elem_deco, 1, {opacity: 1, bottom:  calculateHeight(233), delay: 2.5}, '0'),
  
  //drop balls
  TweenMax.to(elem_ball_y, 0.5, {opacity: 1, delay: 3}, '0'),
  TweenMax.to(elem_ball_y, 0.5, {top:  '22%', delay: 3.5}, '0'),
  TweenMax.to(elem_ball_y, 0.25, {scale: 1.1, delay: 3.75}),
  TweenMax.to(elem_ball_y, 0.25, {scale: 1, rotation: 15, delay: 4}),
  TweenMax.to(elem_ball_y, 0.25, {rotation: -15, delay: 4.25}),
  TweenMax.to(elem_ball_y, 0.25, {rotation: 0, delay: 4.5}),

  TweenMax.to(elem_ball_p, 0.5, {opacity: 1, delay: 3.5}, '0'),
  TweenMax.to(elem_ball_p, 0.5, {top:  '46%', delay: 4}, '0'),
  TweenMax.to(elem_ball_p, 0.25, {scale: 1.1, delay: 4.25}),
  TweenMax.to(elem_ball_p, 0.25, {scale: 1, rotation: 15, delay: 4.5}),
  TweenMax.to(elem_ball_p, 0.25, {rotation: -15, delay: 4.75}),
  TweenMax.to(elem_ball_p, 0.25, {rotation: 0, delay: 5}),

  TweenMax.to(elem_ball_r, 0.5, {opacity: 1, delay: 4}, '0'),
  TweenMax.to(elem_ball_r, 0.5, {top:  '61%', delay: 4.5}, '0'),
  TweenMax.to(elem_ball_r, 0.25, {scale: 1.1, delay: 4.75}),
  TweenMax.to(elem_ball_r, 0.25, {scale: 1, rotation: 15, delay: 5}),
  TweenMax.to(elem_ball_r, 0.25, {rotation: -15, delay: 5.25}),
  TweenMax.to(elem_ball_r, 0.25, {rotation: 0, delay: 5.5}),

  //place star
  TweenMax.to(elem_star, 1, {bottom: calculateHeight(788), opacity: 1, delay: 6}),

  //move room
  TweenMax.to(elem_house, 1, {backgroundPosition: '-120% 50%', delay: 7}),
  TweenMax.to(elem_night, 1, {left: '-40%', delay: 7}),
  TweenMax.to(elem_calendar, 1, {right: '20%', delay: 7}),
  TweenMax.to(elem_pot, 1, {left: calculateHeight(-780), delay: 7}),
  TweenMax.to(elem_tree, 1, {left: calculateHeight(-780), delay: 7}),
  TweenMax.to(elem_deco, 1, {left: calculateHeight(-780), delay: 7}),
  TweenMax.to(elem_balls, 1, {left: calculateHeight(-780), delay: 7}),
  TweenMax.to(elem_star, 1, {left: calculateHeight(-780), delay: 7}),

  //show text
  TweenMax.to(elem_wish, 1, {opacity: 1, delay: 8})
]);

new ScrollMagic.Scene({ duration: '100%' })
  .triggerElement('body')
  .setTween(scene1_in_tween)
  //.addIndicators()
  .addTo(controller);

new ScrollMagic.Scene({ duration: '2000%' })
  .setPin(elem_scene_1)
  .triggerElement(elem_scene_1)
  .setTween(scene1_animation_tween)
  //.addIndicators()
  .addTo(controller);
