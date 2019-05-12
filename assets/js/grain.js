"use strict";var _createClass=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}console.clear();var Grain=function(){function t(e){_classCallCheck(this,t),this.patternSize=150,this.patternScaleX=1,this.patternScaleY=1,this.patternRefreshInterval=3,this.patternAlpha=15,this.canvas=e,this.ctx=this.canvas.getContext("2d"),this.ctx.scale(this.patternScaleX,this.patternScaleY),this.patternCanvas=document.createElement("canvas"),this.patternCanvas.width=this.patternSize,this.patternCanvas.height=this.patternSize,this.patternCtx=this.patternCanvas.getContext("2d"),this.patternData=this.patternCtx.createImageData(this.patternSize,this.patternSize),this.patternPixelDataLength=this.patternSize*this.patternSize*4,this.resize=this.resize.bind(this),this.loop=this.loop.bind(this),this.frame=0,window.addEventListener("resize",this.resize),this.resize(),window.requestAnimationFrame(this.loop)}return _createClass(t,[{key:"resize",value:function(){this.canvas.width=window.innerWidth*devicePixelRatio,this.canvas.height=window.innerHeight*devicePixelRatio}},{key:"update",value:function(){for(var t=this.patternPixelDataLength,e=this.patternData,a=this.patternAlpha,i=this.patternCtx,n=0;n<t;n+=4){var r=255*Math.random();e.data[n]=r,e.data[n+1]=r,e.data[n+2]=r,e.data[n+3]=a}i.putImageData(e,0,0)}},{key:"draw",value:function(){var t=this.ctx,e=this.patternCanvas,a=this.canvas,i=(this.viewHeight,a.width),n=a.height;t.clearRect(0,0,i,n),t.fillStyle=t.createPattern(e,"repeat"),t.fillRect(0,0,i,n)}},{key:"loop",value:function(){++this.frame%this.patternRefreshInterval==0&&(this.update(),this.draw()),window.requestAnimationFrame(this.loop)}}]),t}(),el=document.querySelector(".grain"),grain=new Grain(el);