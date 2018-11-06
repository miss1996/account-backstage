(function(window){var svgSprite='<svg><symbol id="icon-fujian" viewBox="0 0 1024 1024"><path d="M724.818 78.653c85.013 50.646 113.954 160.982 63.308 245.999l-228.815 386.175c-33.462 56.978-106.72 75.969-163.696 42.507-56.978-33.462-75.969-106.72-42.507-163.696l182.689-309.307c8.139-14.468 27.129-18.99 40.698-10.851 14.471 8.139 18.993 27.133 10.851 40.698l-182.685 309.307c-17.184 28.035-7.232 65.115 20.802 82.298 28.035 17.184 65.115 7.238 82.298-20.802l228.815-386.175c33.462-56.978 14.471-130.233-42.508-163.696-56.975-33.462-130.234-14.473-163.696 42.508l-274.034 463.959c-50.646 85.010-21.706 195.347 63.308 245.994s195.35 21.706 245.999-63.308l228.811-386.175c8.139-14.473 27.133-18.994 40.701-10.855 14.469 8.142 18.991 27.133 10.851 40.701l-228.815 386.178c-66.925 113.954-214.341 151.94-328.297 84.11-113.954-66.925-151.94-214.341-84.11-328.297l274.033-463.957c49.742-85.015 160.079-113.050 245.999-63.31v0 0zM724.818 78.653z"  ></path></symbol><symbol id="icon-xiazai" viewBox="0 0 1024 1024"><path d="M486.4 637.44V179.2a25.6 25.6 0 0 1 51.2 0v458.24l101.12-101.12a25.6 25.6 0 0 1 36.1984 36.1984L512 735.4368l-162.9184-162.9184a25.6 25.6 0 0 1 36.1984-36.1984L486.4 637.44z m409.6 28.16a25.6 25.6 0 0 1 51.2 0v204.8a76.8 76.8 0 0 1-76.8 76.8H153.6A76.8 76.8 0 0 1 76.8 870.4v-204.8a25.6 25.6 0 0 1 51.2 0v204.8a25.6 25.6 0 0 0 25.6 25.6h716.8a25.6 25.6 0 0 0 25.6-25.6v-204.8z" fill="#9DA7B2" ></path></symbol><symbol id="icon-icon-" viewBox="0 0 1024 1024"><path d="M864 451.2c-9.6 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8L953.6 288l-112-108.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L1011.2 256c6.4 6.4 12.8 19.2 12.8 32s-6.4 25.6-12.8 32l-124.8 121.6c-6.4 6.4-12.8 9.6-22.4 9.6z"  ></path><path d="M960 1024H64c-35.2 0-64-28.8-64-64V64C0 28.8 28.8 0 64 0h576c19.2 0 32 12.8 32 32s-12.8 32-32 32H64v896h896V640c0-19.2 12.8-32 32-32s32 12.8 32 32v320c0 35.2-28.8 64-64 64z"  ></path><path d="M288 752c-19.2 0-32-12.8-32-32C256 464 464 256 720 256c19.2 0 32 12.8 32 32s-12.8 32-32 32C499.2 320 320 499.2 320 720c0 19.2-12.8 32-32 32z"  ></path><path d="M928 320h-224c-19.2 0-32-12.8-32-32s12.8-32 32-32h224c19.2 0 32 12.8 32 32s-12.8 32-32 32z"  ></path></symbol><symbol id="icon-tianjiaxiang" viewBox="0 0 1024 1024"><path d="M672 704v64a32 32 0 0 1-64 0v-64h-64a32 32 0 0 1 0-64h64v-64a32 32 0 0 1 64 0v64h64a32 32 0 0 1 0 64h-64z m-256 96h-96a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V288H352v448h64a32 32 0 0 1 0 64z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)