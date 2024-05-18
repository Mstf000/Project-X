// import React, { useEffect } from 'react';
// import './Game.css';
// import { TweenMax, TimelineMax, Elastic, Power4 } from 'gsap';
// import * as createjs from 'createjs-module';
// import 'createjs-soundjs';
// import * as ndgmr from 'ndgmr';

// const Game = () => {
//     useEffect(() => {
//         // canvas setup
//         const canvas = document.getElementById('canvas');
//         const w = (canvas.width = window.innerWidth);
//         const h = (canvas.height = window.innerHeight);

//         const dropZone = document.getElementById('drop-zone');
//         const successCallback = document.querySelector('.success-callback');
//         const reloadButton = document.getElementById('try-again');

//         // Register sounds
//         const collision = 'collision';
//         const collision2 = 'collision2';
//         const process2 = 'process2';
//         const win = 'win';
//         const error = 'error';

//         function loadSound() {
//             createjs.Sound.registerSound('https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/collision.wav', collision, 1);
//             createjs.Sound.registerSound('https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/collision2.wav', collision2, 1);
//             createjs.Sound.registerSound('https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/win.wav', win, 1);
//             createjs.Sound.registerSound('https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/error.wav', error, 1);
//             createjs.Sound.registerSound('https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/process2.wav', process2, 1);
//         }

//         window.onload = loadSound;

//         // Stage inits
//         const stage = new createjs.Stage('canvas');
//         stage.enableMouseOver();
//         createjs.Touch.enable(stage);

//         const ripples = [];
//         const shadowRipples = [];
//         const ripplesLength = 8;

//         function drawRipples(posX, posY, radius, pantek) {
//             const ripple = new createjs.Shape();
//             ripple.graphics.beginStroke('#eee').setStrokeStyle(3).drawCircle(0, 0, 80 * radius);

//             const shadowRipple = new createjs.Shape();
//             shadowRipple.graphics.beginFill('#c0392b').drawCircle(0, 0, 80 * radius);
//             shadowRipple.alpha = 0;

//             shadowRipples.push(shadowRipple);

//             const rippleCtr = new createjs.Container().addChild(ripple, shadowRipple);
//             rippleCtr.x = posX;
//             rippleCtr.y = posY;
//             rippleCtr.alpha = 1 - 0.15 * pantek;

//             ripples.push(rippleCtr);
//             stage.addChild(rippleCtr);
//         }

//         for (let i = 0; i < ripplesLength; i++) {
//             const num = i + 1;
//             drawRipples(w / 2, h / 2, num, i);
//         }

//         const circle = new createjs.Shape();
//         circle.width = 100;
//         circle.graphics.beginFill('#2c3e50').drawCircle(0, 0, circle.width);

//         const shadowCircle = new createjs.Shape();
//         shadowCircle.width = 100;
//         shadowCircle.graphics.beginFill('#E60012').drawCircle(0, 0, shadowCircle.width);

//         const shadowCircleCtr = new createjs.Container().addChild(shadowCircle);
//         shadowCircleCtr.x = w / 2;
//         shadowCircleCtr.y = h / 2;
//         shadowCircleCtr.alpha = 0;

//         const circleCtr = new createjs.Container().addChild(circle);
//         circleCtr.x = w / 2;
//         circleCtr.y = h / 2;
//         circleCtr.status = false;

//         const characters = [
//             // Add the URLs of the character images here
//             'character1.png',
//             'character2.png',
//             'character3.png',
//             'character4.png',
//         ];

//         const imagesArray = [];
//         const propsArray = [];
//         const imagesLength = 4;

//         function drawImage(posX, posY, index) {
//             const image = new Image();
//             image.src = characters[index];
//             const bitmap = new createjs.Bitmap(image);

//             const bitmapCtr = new createjs.Container().addChild(bitmap);
//             const bitmapProps = {
//                 width: 128,
//                 height: 128,
//                 rotation: -10,
//                 oriX: posX,
//                 oriY: posY,
//             };

//             bitmapCtr.x = posX;
//             bitmapCtr.y = posY;
//             bitmapCtr.oriX = posX;
//             bitmapCtr.oriY = posY;
//             bitmapCtr.rotation = bitmapProps.rotation;

//             bitmapCtr.key = index === 2;

//             bitmapCtr.regX = bitmapProps.width / 2;
//             bitmapCtr.regY = bitmapProps.height / 2;

//             imagesArray.push(bitmapCtr);
//             propsArray.push(bitmapProps);

//             stage.addChild(bitmapCtr);
//         }

//         const sines = [w / 2 - 300, w / 2 - 300, w / 2 + 300, w / 2 + 300];
//         const coses = [h - h / 1.5, h - h / 3.5, h - h / 3.5, h - h / 1.5];

//         for (let i = 0; i < imagesLength; i++) {
//             drawImage(sines[i], coses[i], i);
//         }

//         stage.addChild(circleCtr, shadowCircleCtr);
//         TweenMax.ticker.addEventListener('tick', stage.update, stage);

//         function scaleIt(el, x, y, duration, ease) {
//             TweenMax.to(el, duration, { scaleX: x, scaleY: y, ease: ease });
//         }

//         function scaleRipples(arr, x, y, duration, staggerDelay, delay, ease) {
//             const tl = new TimelineMax({});
//             tl.staggerTo(arr, 0.6, { delay: delay, scaleX: x, scaleY: y, ease: ease, onComplete: function () { tl.stop(); } }, staggerDelay);
//         }

//         function scaleAlpha(el, x, y, alpha, duration) {
//             TweenMax.to(el, duration, { scaleX: x, scaleY: y, alpha: alpha, ease: Elastic.easeOut.config(1, 0.75) });
//         }

//         function back(el, posX, posY, delay) {
//             const tlTemp = new TimelineMax({});
//             tlTemp.to(el, 0.6, { delay: delay, x: posX, y: posY, ease: Elastic.easeOut.config(1, 0.75) });
//         }

//         let hit = false;
//         let bolehjalan = false;

//         imagesArray.forEach((imageCtr, index) => {
//             const tlImage = new TimelineMax({ repeat: -1, yoyo: true });
//             tlImage.to(imageCtr, 0.9, { delay: index * 0.2, rotation: propsArray[index].rotation * -1, ease: Power4.easeInOut });

//             imageCtr.on('pressmove', function (e) {
//                 tlImage.stop();
//                 const el = e.currentTarget;
//                 stage.setChildIndex(el, stage.getNumChildren() - 1);

//                 if (!hit) {
//                     scaleIt(el, 0.8, 0.8, 0.6, Power4.easeOut);
//                     TweenMax.to(el, 0.15, { x: e.stageX, y: e.stageY });

//                     const intersection = ndgmr.checkRectCollision(el, circleCtr);
//                     doHit(intersection, e);
//                 }
//             });

//             imageCtr.on('mouseover', function (e) {
//                 if (!bolehjalan) {
//                     const el = e.currentTarget;
//                     el.cursor = 'pointer';
//                     scaleIt(el, 1.2, 1.2, 0.6, Power4.easeOut);
//                 }
//             });

//             imageCtr.on('mouseout', function (e) {
//                 if (!bolehjalan) {
//                     const el = e.currentTarget;
//                     scaleIt(el, 1, 1, 0.3);
//                 }
//             });

//             imageCtr.on('pressup', function (e) {
//                 const el = e.currentTarget;

//                 if (bolehjalan) {
//                     scaleIt(el, 0.25, 0.25, 0.3);
//                     const playProcess = createjs.Sound.play(process2);
//                     playProcess.volume = 0.25;

//                     TweenMax.to(el, 0.3, {
//                         x: w / 2,
//                         y: h / 2,
//                         alpha: 0,
//                         ease: Power4.easeOut,
//                         onComplete: function () {
//                             scaleIt(circleCtr, 0.8, 0.8, 0.6, Power4.easeOut);
//                             scaleAlpha(shadowCircleCtr, 0.8, 0.8, 0, 0.6, Power4.easeOut);
//                             scaleRipples(ripples, 0.8, 0.8, 0.6, 0.015, 0.05, Power4.easeOut);
//                             inOrOut(el);
//                         },
//                     });
//                 } else {
//                     tlImage.resume();
//                     const playCollision = createjs.Sound.play(collision);
//                     playCollision.volume = 0.25;
//                     scaleIt(el, 1, 1, 0.3);
//                     back(el, propsArray[index].oriX, propsArray[index].oriY);
//                 }
//             });
//         });

//         function doHit(intersection) {
//             if (intersection) {
//                 const playCollision2 = createjs.Sound.play(collision2);
//                 playCollision2.volume = 0.25;
//                 scaleIt(circleCtr, 1.5, 1.5, 0.6, Power4.easeOut);
//                 scaleAlpha(shadowCircleCtr, 1.5, 1.5, 1, 0.6, Power4.easeOut);
//                 scaleRipples(ripples, 1.4, 1.4, 0.6, 0.015, 0.05, Power4.easeOut);
//                 TweenMax.to(dropZone, 0.3, { opacity: 0, scale: 0.5 });
//                 bolehjalan = true;
//             } else {
//                 scaleIt(circleCtr, 1, 1, 0.6, Power4.easeOut);
//                 scaleAlpha(shadowCircleCtr, 1, 1, 0, 0.6, Power4.easeOut);
//                 scaleRipples(ripples, 1, 1, 0.6, 0.015, 0.05, Power4.easeOut);
//                 TweenMax.to(dropZone, 0.3, { opacity: 1, scale: 1 });
//                 bolehjalan = false;
//             }
//         }

//         function inOrOut(el) {
//             if (!el.key) {
//                 const tl1 = new TimelineMax({});
//                 tl1.to(el, 0.45, {
//                     delay: 0.6,
//                     scaleX: 1,
//                     scaleY: 1,
//                     alpha: 1,
//                     ease: Power4.easeOut,
//                     onUpdate: function () {
//                         const playError = createjs.Sound.play(error);
//                         playError.volume = 0.25;
//                     },
//                 })
//                     .to(el, 0.45, {
//                         x: el.oriX,
//                         y: el.oriY,
//                         ease: Power4.easeOut,
//                         onUpdate: function () {
//                             dropZone.innerHTML = 'Try Again';
//                         },
//                     }, 0.6)
//                     .to(dropZone, 0.3, { opacity: 1, scale: 1 }, '-=0.15');

//                 const tl2 = new TimelineMax({});
//                 tl2.to([circleCtr, shadowCircleCtr], 1, {
//                     delay: 0.6,
//                     scaleX: 1,
//                     scaleY: 1,
//                     ease: Elastic.easeOut.config(2.5, 0.4),
//                 }).staggerTo(ripples, 1, {
//                     scaleX: 1,
//                     scaleY: 1,
//                     ease: Elastic.easeOut.config(2.5, 0.4),
//                 }, 0.05, 0.45);

//                 const tlshadowRipples = new TimelineMax({});
//                 tlshadowRipples.staggerTo(shadowRipples, 0.5, { alpha: 0.5, ease: Power4.easeOut }, 0.05, 0.45)
//                     .staggerTo(shadowRipples, 0.5, { alpha: 0, ease: Power4.easeOut }, 0.05, 0.55);
//             } else {
//                 const tl = new TimelineMax({});
//                 tl.to([circleCtr, shadowCircleCtr], 0.3, {
//                     delay: 0.6,
//                     scaleX: 1.5,
//                     scaleY: 1.5,
//                     ease: Elastic.easeOut.config(1, 0.75),
//                 }).staggerTo(ripples, 0.3, {
//                     scaleX: 1.2,
//                     scaleY: 1.2,
//                     ease: Power4.easeOut,
//                 }, 0.05, 0.5).to(imagesArray[2], 0.6, {
//                     scaleX: 1.4,
//                     scaleY: 1.4,
//                     alpha: 1,
//                     ease: Elastic.easeOut.config(1, 0.75),
//                 }, 0.6).to([imagesArray[0], imagesArray[1], imagesArray[3]], 0.6, { alpha: 0, ease: Elastic.easeOut.config(1, 0.95) }, 0.6);

//                 setTimeout(function () {
//                     const playWin = createjs.Sound.play(win);
//                     playWin.volume = 0.25;
//                 }, 600);

//                 setTimeout(function () {
//                     successCallback.classList.add('show');
//                 }, 750);
//             }
//         }

//         reloadButton.addEventListener('click', function () {
//             window.location.reload();
//         });
//     }, []);

//     return (
//         <div>
//             <h1 className="title">where's the<br />plumber?</h1>
//             <div id="drop-zone">Drop Zone</div>
//             <canvas id="canvas"></canvas>
//             <div className="hint">Hint: Drag and drop character into the drop zone</div>
//             <div className="success-callback">
//                 <h1 className="title">It's A Mario!</h1>
//                 <button id="try-again">Try Again</button>
//             </div>
//         </div>
//     );
// };

// export default Game;
