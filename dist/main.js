!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist/",i(i.s=1)}([function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",s=t[3];if(!s)return i;if(e&&"function"==typeof btoa){var n=(r=s,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),h="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(h," */")),o=s.sources.map((function(t){return"/*# sourceURL=".concat(s.sourceRoot||"").concat(t," */")}));return[i].concat(o).concat([n]).join("\n")}var r,a,h;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,s){"string"==typeof t&&(t=[[null,t,""]]);var n={};if(s)for(var o=0;o<this.length;o++){var r=this[o][0];null!=r&&(n[r]=!0)}for(var a=0;a<t.length;a++){var h=[].concat(t[a]);s&&n[h[0]]||(i&&(h[2]?h[2]="".concat(i," and ").concat(h[2]):h[2]=i),e.push(h))}},e}},function(t,e,i){"use strict";i.r(e);i(2);function s(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var o={canvas:void 0,ctx:void 0,width:720,height:1280,assets:{bg:"assets/img/bg.jpg",user:{img:"assets/img/user-starship.png",frames:1},user_die:{img:"assets/img/user-starship-die-sprite.png",frames:10},bullet:"assets/img/bullet2.png",enemy_normal:{img:"assets/img/enemy-starship-normal.png",frames:1},enemy_stronger:{img:"assets/img/enemy-starship-stronger.png",frames:1},enemy_boss:{img:"assets/img/enemy-starship-boss.png",frames:1},enemy_normal_die:{img:"assets/img/enemy-starship-normal-die-sprite.png",frames:10},enemy_stronger_die:{img:"assets/img/enemy-starship-stronger-die-sprite.png",frames:10},enemy_boss_die:{img:"assets/img/enemy-starship-boss-die-sprite.png",frames:10}},user:void 0,bullet:void 0,movement:void 0,enemy:void 0,info:void 0,init:function(){var t=this;this.canvas=document.getElementById("game"),this.canvas.width=this.width,this.canvas.height=this.height,this.ctx=this.canvas.getContext("2d"),this.load().then((function(){t.movement.init(),t.info.setDefault(),t.setPositions(),t.start()}))},load:function(){var t=this;return new Promise((function(e){var i=Object.keys(t.assets).length,s=0;for(var n in t.assets){var o=t.assets[n].img||t.assets[n],r=new Image;r.src=o,r.onload=function(){++s==i&&e()},t.assets[n].img?t.assets[n].img=r:t.assets[n]=r}}))},start:function(){var t=this;this.run(),this.bulletsAddTimer=setInterval((function(){t.bullet.add()}),this.bullet.create_interval),this.enemy.add()},render:function(){var t=this;this.ctx.drawImage(this.assets.bg,0,0,this.width,this.height);var e=this.user.killing?this.assets.user_die:this.assets.user;this.user.render(this.ctx,e),this.enemy.list.forEach((function(e){var i=t.assets["enemy_".concat(e.type)],s=i.img,n=i.frames,o=s.width/n*e.frame,r=s.width/n,a=s.height;if(t.ctx.drawImage(s,o,0,r,a,e.x,e.y,e.width,e.height),!(e.xp<=0)){var h=100/e.xp_total*e.xp,c=e.width/100*h,u=e.x,l=e.y-10,f="#fff";h<50&&(f="#f90"),h<20&&(f="#f00"),t.ctx.beginPath(),t.ctx.fillStyle="rgba(255,255,255,.4)",t.ctx.rect(u,l,e.width,2),t.ctx.fill(),t.ctx.beginPath(),t.ctx.fillStyle=f,t.ctx.rect(u,l,c,2),t.ctx.fill()}})),this.bullet.list.forEach((function(e){t.ctx.drawImage(t.assets.bullet,e.x,e.y,e.width,e.height)})),this.info.render(this.ctx)},run:function(){var t=this;this.update(),this.render(),requestAnimationFrame((function(){t.run()}))},update:function(){this.bullet.move(),this.bullet.removeIfNeeded(),this.setPositions(),this.enemy.move()},setPositions:function(){this.user.x=this.movement.x-this.user.width/2,this.user.y=this.movement.y-this.user.height/2,this.bullet.x=this.user.x+this.user.width/2-this.bullet.width/2,this.bullet.y=this.user.y-this.bullet.height}};o.movement={x:0,y:0,positions:{start:{},move:{},origin:{}},styles:{},init:function(){var t=this;["mousedown","mousemove","mouseup","mouseleave","touchstart","touchmove","touchend"].forEach((function(e){o.canvas.addEventListener(e,(function(e){t.setPositions(e)}))})),["load","resize"].forEach((function(e){window.addEventListener(e,(function(){t.setStyles(getComputedStyle(o.canvas))}))})),this.setPositionsDefault()},setPositions:function(t){var e=this.getPositions(t),i=e.x,s=e.y;i=i||this.positions.move.x||this.x,s=s||this.positions.move.y||this.y,["mousedown","touchstart"].includes(t.type)&&(this.positions.start.x=i,this.positions.start.y=s,this.positions.move.x=i,this.positions.move.y=s,this.positions.origin.x=this.x,this.positions.origin.y=this.y),["mousemove","touchmove"].includes(t.type)&&(this.positions.move.x=i,this.positions.move.y=s),["mouseup","touchend","mouseleave"].includes(t.type)&&this.clearPositions(),["mousemove","touchmove"].includes(t.type)&&(this.positions.start.x||this.positions.start.y)&&(this.x=this.positions.origin.x+1.15*(this.positions.move.x-this.positions.start.x),this.y=this.positions.origin.y+1.15*(this.positions.move.y-this.positions.start.y),this.y-o.user.height/2<0&&(this.y=o.user.height/2),o.user.height/2>o.height-this.y&&(this.y=o.height-o.user.height/2),o.user.width/2>this.x&&(this.x=o.user.width/2),o.user.width/2>o.width-this.x&&(this.x=o.width-o.user.width/2))},clearPositions:function(){this.positions.start.x=null,this.positions.start.y=null,this.positions.move.x=null,this.positions.move.y=null,this.positions.origin.x=null,this.positions.origin.y=null},setPositionsDefault:function(){this.x=360,this.y=1100,this.clearPositions()},getPositions:function(t){var e,i,s=this.styles,n=s.width,r=s.height;if(["touchstart","touchmove"].includes(t.type)){var a=t.touches[0];e=a.clientX-a.target.offsetLeft,i=a.clientY-a.target.offsetTop}else e=t.layerX,i=t.layerY;var h=e/n*100,c=i/r*100;return{x:o.width/100*h,y:o.height/100*c}},setStyles:function(t){this.styles.width=parseFloat(t.width),this.styles.height=parseFloat(t.height)}},o.user={x:314,y:1e3,ratio:4,width:92,height:503/4,killing:!1,frame:0,render:function(t,e){var i=e.img,s=e.frames,n=i.width/s*this.frame,o=i.width/s,r=i.height;t.drawImage(i,n,0,o,r,this.x,this.y,this.width,this.height)},kill:function(t){var e=this;return new Promise((function(i){e.killing=!0,e.frame=0;var s=setInterval((function(){++e.frame>=t.frames&&(clearInterval(s),e.killing=!1,e.frame=0,i())}),1e3/24)}))},isCollised:function(t){var e=t.x,i=t.y,s=e,n=e+t.width,o=i,r=i+t.height;return this.x+this.width>s&&this.x<n&&this.y+this.height/1.5>o&&this.y<r}},o.enemy={list:[],enemy_conf:{xp:{normal:10,stronger:20,boss:30},xp_coef:1},move:function(){var t=this;this.list.forEach((function(e){e.x+=e.dx,e.y+=e.dy,e.xDir?e.dx+=.04:e.dx-=.04,Math.abs(e.dx)>1&&(e.xDir=!e.xDir),o.user.isCollised(function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?s(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},e))&&!o.user.killing&&(t.list.forEach((function(t){t._dy=t.dy,t.dy=-o.height/24})),o.user.kill(o.assets.user_die).then((function(){o.movement.setPositionsDefault(),o.info.lives-=1,o.info.lives<=0&&o.info.setDefault(),t.list.forEach((function(t){t.dy=t._dy,t.y=0-1.5*t.height,delete t._dy}))})))}))},add:function(){for(var t=0;t<5;t++){var e=this.getRandomType(),i=o.assets["enemy_".concat(e)].img,s=i.width,n=i.height;s/=4,n/=4;var r=Math.floor(this.enemy_conf.xp[e]*this.enemy_conf.xp_coef);this.list.push({type:e,xp:r,xp_total:r,x:142*t+40,y:-n,dy:.75,dx:0,killing:!1,frame:0,width:s,height:n})}},getRandomType:function(){return Math.random()<.8?"normal":Math.random()<.8?"stronger":"boss"},hit:function(t){var e=this,i=this.list[t];i.xp-=1,i.xp<=0&&("normal"!=i.type&&o.bullet.upTo(i.type),i.killing=!0,i.type="".concat(i.type,"_die"),this.kill(t).then((function(){e.list.splice(t,1),0==e.list.length&&e.add()})),o.info.scoreUp())},kill:function(t){var e=this;return new Promise((function(i){var s=e.list[t],n=o.assets["enemy_"+s.type].frames,r=setInterval((function(){++s.frame>=n&&(clearInterval(r),i())}),1e3/24)}))}},o.bullet={x:0,y:0,width:20,height:58,offset:.75,list:[],type:"default",types:{default:{interval:300,speed:20,count:1},secondary:{interval:200,speed:40,count:2},fast:{interval:150,speed:50,count:3}},get create_interval(){return this.types[this.type].interval},get speed(){return this.types[this.type].speed},get count(){return this.types[this.type].count},add:function(){for(var t=this.x-this.width*this.offset*this.count+this.width*this.offset,e=0;e<this.count;e++)t+=this.width*this.offset*2*(1*!!e),this.list.push({x:t,y:this.y+11,dx:0,dy:this.speed,width:this.width,height:this.height,readyToRemove:!1})},removeIfNeeded:function(){this.list=this.list.filter((function(t){return!t.readyToRemove}))},move:function(){var t=this;this.list.forEach((function(e,i){if(e.y-=e.dy,e.x-=e.dx,e.y+e.height<0)e.readyToRemove=!0;else for(var s in o.enemy.list){var n=o.enemy.list[s];if(!n.killing&&t.isCollised(n,i))return o.enemy.hit(s),void(e.readyToRemove=!0)}}))},isCollised:function(t,e){var i=this.list[e],s=i.x,n=i.x+i.width,o=i.y-i.dy,r=i.y+i.height-i.dy;return t.x+t.width>s&&t.x<n&&t.y+t.height/1.5>o&&t.y<r},upTo:function(t){var e=this;switch(t){case"fast":case"boss":this.type="fast";break;case"stronger":case"secondary":this.type="secondary";break;default:this.type="default"}setTimeout((function(){e.down()}),1e4)},down:function(){var t=["default","secondary","fast"],e=t.indexOf(this.type);--e<0&&(e=0),this.type=t[e]}},o.info={scores:null,recordScores:null,lives:null,render:function(t){var e=o.height-90;t.beginPath(),t.fillStyle="rgba(0,0,0,.5)",t.rect(0,e,150,90),t.fill(),t.beginPath(),t.fillStyle="#fff",t.font="bold ".concat(20,'px "Trebuchet MS"'),t.fillText("Lives: ".concat(this.lives),10,e+10+20,130),t.fillText("Scores: ".concat(this.scores),10,e+10+40,130),t.fillText("Record: ".concat(this.recordScores),10,e+10+60,130),t.fill()},scoreUp:function(){++this.scores>this.recordScores&&(this.recordScores=this.scores,localStorage.recordScores=this.scores)},setDefault:function(){this.lives=5,this.scores=0,this.recordScores=localStorage.recordScores||0}},o.init()},function(t,e,i){var s=i(3),n=i(4);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[t.i,n,""]]);var o={insert:"head",singleton:!1};s(n,o);t.exports=n.locals||{}},function(t,e,i){"use strict";var s,n=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},o=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),r=[];function a(t){for(var e=-1,i=0;i<r.length;i++)if(r[i].identifier===t){e=i;break}return e}function h(t,e){for(var i={},s=[],n=0;n<t.length;n++){var o=t[n],h=e.base?o[0]+e.base:o[0],c=i[h]||0,u="".concat(h," ").concat(c);i[h]=c+1;var l=a(u),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==l?(r[l].references++,r[l].updater(f)):r.push({identifier:u,updater:y(f,e),references:1}),s.push(u)}return s}function c(t){var e=document.createElement("style"),s=t.attributes||{};if(void 0===s.nonce){var n=i.nc;n&&(s.nonce=n)}if(Object.keys(s).forEach((function(t){e.setAttribute(t,s[t])})),"function"==typeof t.insert)t.insert(e);else{var r=o(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var u,l=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function f(t,e,i,s){var n=i?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(t.styleSheet)t.styleSheet.cssText=l(e,n);else{var o=document.createTextNode(n),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function d(t,e,i){var s=i.css,n=i.media,o=i.sourceMap;if(n?t.setAttribute("media",n):t.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var p=null,m=0;function y(t,e){var i,s,n;if(e.singleton){var o=m++;i=p||(p=c(e)),s=f.bind(null,i,o,!1),n=f.bind(null,i,o,!0)}else i=c(e),s=d.bind(null,i,e),n=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else n()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=n());var i=h(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var s=0;s<i.length;s++){var n=a(i[s]);r[n].references--}for(var o=h(t,e),c=0;c<i.length;c++){var u=a(i[c]);0===r[u].references&&(r[u].updater(),r.splice(u,1))}i=o}}}},function(t,e,i){"use strict";i.r(e);var s=i(0),n=i.n(s)()(!1);n.push([t.i,"*{padding:0;margin:0;box-sizing:border-box}body{position:fixed;top:0;left:0;right:0;bottom:0;overflow:hidden;display:flex;background-color:#222}.wrapper{position:relative;height:100%;width:100%}canvas{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;max-width:100%;max-height:100%;height:auto;width:auto;border:1px solid #aaa}",""]),e.default=n}]);