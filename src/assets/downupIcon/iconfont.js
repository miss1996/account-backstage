(function(window){var svgSprite='<svg><symbol id="icon-shangyi" viewBox="0 0 1024 1024"><path d="M59.7504 926.72h921.6v61.0304h-921.6V926.72z m12.8-834.4576h345.6v61.0816H72.5504V92.2624z m0 305.3056h345.6v61.0304H72.5504V397.568z m0 305.2544h345.6v61.0816H72.5504v-61.0816zM705.4848 36.6592l-236.1344 250.368 40.2944 42.7008 190.1056-195.3792V818.176h57.6V134.3488l184.32 195.3792 40.2944-42.752L745.8304 36.6592a26.7776 26.7776 0 0 0-40.3456 0z" fill="#30AABC" ></path></symbol><symbol id="icon-xiayi" viewBox="0 0 1024 1024"><path d="M50.8928 926.72h921.6v61.0304H50.8928V926.72zM63.6928 92.2624H409.2928v61.0816H63.6928V92.2624z m0 305.3056H409.2928v61.0304H63.6928V397.568z m0 305.2544H409.2928v61.0816H63.6928v-61.0816z m632.9856 106.1888L460.4928 558.6432l40.2944-42.7008 190.1056 195.3792V27.4944h57.6v683.8272l184.32-195.3792 40.2944 42.752-236.1344 250.368a26.7776 26.7776 0 0 1-40.2944 0z" fill="#30AABC" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)