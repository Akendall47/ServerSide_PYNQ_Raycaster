(()=>{var eM=Object.create;var m0=Object.defineProperty;var nM=Object.getOwnPropertyDescriptor;var iM=Object.getOwnPropertyNames;var sM=Object.getPrototypeOf,aM=Object.prototype.hasOwnProperty;var Ci=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var rM=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of iM(t))!aM.call(e,s)&&s!==n&&m0(e,s,{get:()=>t[s],enumerable:!(i=nM(t,s))||i.enumerable});return e};var Kn=(e,t,n)=>(n=e!=null?eM(sM(e)):{},rM(t||!e||!e.__esModule?m0(n,"default",{value:e,enumerable:!0}):n,e));var A0=Ci(Ht=>{"use strict";var Jd=Symbol.for("react.transitional.element"),oM=Symbol.for("react.portal"),lM=Symbol.for("react.fragment"),cM=Symbol.for("react.strict_mode"),uM=Symbol.for("react.profiler"),hM=Symbol.for("react.consumer"),dM=Symbol.for("react.context"),fM=Symbol.for("react.forward_ref"),pM=Symbol.for("react.suspense"),mM=Symbol.for("react.memo"),x0=Symbol.for("react.lazy"),gM=Symbol.for("react.activity"),g0=Symbol.iterator;function vM(e){return e===null||typeof e!="object"?null:(e=g0&&e[g0]||e["@@iterator"],typeof e=="function"?e:null)}var S0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b0=Object.assign,M0={};function hr(e,t,n){this.props=e,this.context=t,this.refs=M0,this.updater=n||S0}hr.prototype.isReactComponent={};hr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};hr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function E0(){}E0.prototype=hr.prototype;function jd(e,t,n){this.props=e,this.context=t,this.refs=M0,this.updater=n||S0}var Qd=jd.prototype=new E0;Qd.constructor=jd;b0(Qd,hr.prototype);Qd.isPureReactComponent=!0;var v0=Array.isArray;function Zd(){}var Te={H:null,A:null,T:null,S:null},T0=Object.prototype.hasOwnProperty;function Kd(e,t,n){var i=n.ref;return{$$typeof:Jd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function _M(e,t){return Kd(e.type,t,e.props)}function $d(e){return typeof e=="object"&&e!==null&&e.$$typeof===Jd}function yM(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var _0=/\/+/g;function Yd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yM(""+e.key):t.toString(36)}function xM(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Zd,Zd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function ur(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Jd:case oM:r=!0;break;case x0:return r=e._init,ur(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Yd(e,0):i,v0(s)?(n="",r!=null&&(n=r.replace(_0,"$&/")+"/"),ur(s,t,n,"",function(c){return c})):s!=null&&($d(s)&&(s=_M(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(_0,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(v0(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Yd(i,l),r+=ur(i,t,n,a,s);else if(l=vM(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Yd(i,l++),r+=ur(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return ur(xM(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function mc(e,t,n){if(e==null)return e;var i=[],s=0;return ur(e,i,"","",function(a){return t.call(n,a,s++)}),i}function SM(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var y0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},bM={map:mc,forEach:function(e,t,n){mc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return mc(e,function(){t++}),t},toArray:function(e){return mc(e,function(t){return t})||[]},only:function(e){if(!$d(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ht.Activity=gM;Ht.Children=bM;Ht.Component=hr;Ht.Fragment=lM;Ht.Profiler=uM;Ht.PureComponent=jd;Ht.StrictMode=cM;Ht.Suspense=pM;Ht.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Te;Ht.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Te.H.useMemoCache(e)}};Ht.cache=function(e){return function(){return e.apply(null,arguments)}};Ht.cacheSignal=function(){return null};Ht.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=b0({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!T0.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return Kd(e.type,s,i)};Ht.createContext=function(e){return e={$$typeof:dM,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:hM,_context:e},e};Ht.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)T0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return Kd(e,a,s)};Ht.createRef=function(){return{current:null}};Ht.forwardRef=function(e){return{$$typeof:fM,render:e}};Ht.isValidElement=$d;Ht.lazy=function(e){return{$$typeof:x0,_payload:{_status:-1,_result:e},_init:SM}};Ht.memo=function(e,t){return{$$typeof:mM,type:e,compare:t===void 0?null:t}};Ht.startTransition=function(e){var t=Te.T,n={};Te.T=n;try{var i=e(),s=Te.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Zd,y0)}catch(a){y0(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),Te.T=t}};Ht.unstable_useCacheRefresh=function(){return Te.H.useCacheRefresh()};Ht.use=function(e){return Te.H.use(e)};Ht.useActionState=function(e,t,n){return Te.H.useActionState(e,t,n)};Ht.useCallback=function(e,t){return Te.H.useCallback(e,t)};Ht.useContext=function(e){return Te.H.useContext(e)};Ht.useDebugValue=function(){};Ht.useDeferredValue=function(e,t){return Te.H.useDeferredValue(e,t)};Ht.useEffect=function(e,t){return Te.H.useEffect(e,t)};Ht.useEffectEvent=function(e){return Te.H.useEffectEvent(e)};Ht.useId=function(){return Te.H.useId()};Ht.useImperativeHandle=function(e,t,n){return Te.H.useImperativeHandle(e,t,n)};Ht.useInsertionEffect=function(e,t){return Te.H.useInsertionEffect(e,t)};Ht.useLayoutEffect=function(e,t){return Te.H.useLayoutEffect(e,t)};Ht.useMemo=function(e,t){return Te.H.useMemo(e,t)};Ht.useOptimistic=function(e,t){return Te.H.useOptimistic(e,t)};Ht.useReducer=function(e,t,n){return Te.H.useReducer(e,t,n)};Ht.useRef=function(e){return Te.H.useRef(e)};Ht.useState=function(e){return Te.H.useState(e)};Ht.useSyncExternalStore=function(e,t,n){return Te.H.useSyncExternalStore(e,t,n)};Ht.useTransition=function(){return Te.H.useTransition()};Ht.version="19.2.4"});var dr=Ci((H2,w0)=>{"use strict";w0.exports=A0()});var B0=Ci(Ne=>{"use strict";function sf(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<gc(s,t))e[i]=t,e[n]=s,n=i;else break t}}function Ri(e){return e.length===0?null:e[0]}function _c(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>gc(o,n))l<s&&0>gc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>gc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function gc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ne.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(C0=performance,Ne.unstable_now=function(){return C0.now()}):(tf=Date,R0=tf.now(),Ne.unstable_now=function(){return tf.now()-R0});var C0,tf,R0,Ji=[],Cs=[],MM=1,$n=null,gn=3,af=!1,Oo=!1,Po=!1,rf=!1,U0=typeof setTimeout=="function"?setTimeout:null,L0=typeof clearTimeout=="function"?clearTimeout:null,D0=typeof setImmediate<"u"?setImmediate:null;function vc(e){for(var t=Ri(Cs);t!==null;){if(t.callback===null)_c(Cs);else if(t.startTime<=e)_c(Cs),t.sortIndex=t.expirationTime,sf(Ji,t);else break;t=Ri(Cs)}}function of(e){if(Po=!1,vc(e),!Oo)if(Ri(Ji)!==null)Oo=!0,pr||(pr=!0,fr());else{var t=Ri(Cs);t!==null&&lf(of,t.startTime-e)}}var pr=!1,Bo=-1,I0=5,O0=-1;function P0(){return rf?!0:!(Ne.unstable_now()-O0<I0)}function ef(){if(rf=!1,pr){var e=Ne.unstable_now();O0=e;var t=!0;try{t:{Oo=!1,Po&&(Po=!1,L0(Bo),Bo=-1),af=!0;var n=gn;try{e:{for(vc(e),$n=Ri(Ji);$n!==null&&!($n.expirationTime>e&&P0());){var i=$n.callback;if(typeof i=="function"){$n.callback=null,gn=$n.priorityLevel;var s=i($n.expirationTime<=e);if(e=Ne.unstable_now(),typeof s=="function"){$n.callback=s,vc(e),t=!0;break e}$n===Ri(Ji)&&_c(Ji),vc(e)}else _c(Ji);$n=Ri(Ji)}if($n!==null)t=!0;else{var a=Ri(Cs);a!==null&&lf(of,a.startTime-e),t=!1}}break t}finally{$n=null,gn=n,af=!1}t=void 0}}finally{t?fr():pr=!1}}}var fr;typeof D0=="function"?fr=function(){D0(ef)}:typeof MessageChannel<"u"?(nf=new MessageChannel,N0=nf.port2,nf.port1.onmessage=ef,fr=function(){N0.postMessage(null)}):fr=function(){U0(ef,0)};var nf,N0;function lf(e,t){Bo=U0(function(){e(Ne.unstable_now())},t)}Ne.unstable_IdlePriority=5;Ne.unstable_ImmediatePriority=1;Ne.unstable_LowPriority=4;Ne.unstable_NormalPriority=3;Ne.unstable_Profiling=null;Ne.unstable_UserBlockingPriority=2;Ne.unstable_cancelCallback=function(e){e.callback=null};Ne.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I0=0<e?Math.floor(1e3/e):5};Ne.unstable_getCurrentPriorityLevel=function(){return gn};Ne.unstable_next=function(e){switch(gn){case 1:case 2:case 3:var t=3;break;default:t=gn}var n=gn;gn=t;try{return e()}finally{gn=n}};Ne.unstable_requestPaint=function(){rf=!0};Ne.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=gn;gn=e;try{return t()}finally{gn=n}};Ne.unstable_scheduleCallback=function(e,t,n){var i=Ne.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:MM++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,sf(Cs,e),Ri(Ji)===null&&e===Ri(Cs)&&(Po?(L0(Bo),Bo=-1):Po=!0,lf(of,n-i))):(e.sortIndex=s,sf(Ji,e),Oo||af||(Oo=!0,pr||(pr=!0,fr()))),e};Ne.unstable_shouldYield=P0;Ne.unstable_wrapCallback=function(e){var t=gn;return function(){var n=gn;gn=t;try{return e.apply(this,arguments)}finally{gn=n}}}});var z0=Ci((G2,F0)=>{"use strict";F0.exports=B0()});var V0=Ci(Sn=>{"use strict";var EM=dr();function H0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Rs(){}var xn={d:{f:Rs,r:function(){throw Error(H0(522))},D:Rs,C:Rs,L:Rs,m:Rs,X:Rs,S:Rs,M:Rs},p:0,findDOMNode:null},TM=Symbol.for("react.portal");function AM(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:TM,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var Fo=EM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function yc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Sn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=xn;Sn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(H0(299));return AM(e,t,null,n)};Sn.flushSync=function(e){var t=Fo.T,n=xn.p;try{if(Fo.T=null,xn.p=2,e)return e()}finally{Fo.T=t,xn.p=n,xn.d.f()}};Sn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,xn.d.C(e,t))};Sn.prefetchDNS=function(e){typeof e=="string"&&xn.d.D(e)};Sn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=yc(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?xn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&xn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Sn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=yc(t.as,t.crossOrigin);xn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&xn.d.M(e)};Sn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=yc(n,t.crossOrigin);xn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Sn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=yc(t.as,t.crossOrigin);xn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else xn.d.m(e)};Sn.requestFormReset=function(e){xn.d.r(e)};Sn.unstable_batchedUpdates=function(e,t){return e(t)};Sn.useFormState=function(e,t,n){return Fo.H.useFormState(e,t,n)};Sn.useFormStatus=function(){return Fo.H.useHostTransitionStatus()};Sn.version="19.2.4"});var xc=Ci((X2,k0)=>{"use strict";function G0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(G0)}catch(e){console.error(e)}}G0(),k0.exports=V0()});var eS=Ci(Wu=>{"use strict";var Qe=z0(),m_=dr(),wM=xc();function j(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function g_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function El(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function v_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function __(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function X0(e){if(El(e)!==e)throw Error(j(188))}function CM(e){var t=e.alternate;if(!t){if(t=El(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return X0(s),e;if(a===i)return X0(s),t;a=a.sibling}throw Error(j(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(j(189))}}if(n.alternate!==i)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function y_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=y_(e),t!==null)return t;e=e.sibling}return null}var Ce=Object.assign,RM=Symbol.for("react.element"),Sc=Symbol.for("react.transitional.element"),qo=Symbol.for("react.portal"),xr=Symbol.for("react.fragment"),x_=Symbol.for("react.strict_mode"),Gf=Symbol.for("react.profiler"),S_=Symbol.for("react.consumer"),is=Symbol.for("react.context"),Bp=Symbol.for("react.forward_ref"),kf=Symbol.for("react.suspense"),Xf=Symbol.for("react.suspense_list"),Fp=Symbol.for("react.memo"),Ds=Symbol.for("react.lazy"),Wf=Symbol.for("react.activity"),DM=Symbol.for("react.memo_cache_sentinel"),W0=Symbol.iterator;function zo(e){return e===null||typeof e!="object"?null:(e=W0&&e[W0]||e["@@iterator"],typeof e=="function"?e:null)}var NM=Symbol.for("react.client.reference");function qf(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===NM?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xr:return"Fragment";case Gf:return"Profiler";case x_:return"StrictMode";case kf:return"Suspense";case Xf:return"SuspenseList";case Wf:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case qo:return"Portal";case is:return e.displayName||"Context";case S_:return(e._context.displayName||"Context")+".Consumer";case Bp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Fp:return t=e.displayName||null,t!==null?t:qf(e.type)||"Memo";case Ds:t=e._payload,e=e._init;try{return qf(e(t))}catch{}}return null}var Yo=Array.isArray,It=m_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re=wM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ca={pending:!1,data:null,method:null,action:null},Yf=[],Sr=-1;function Ii(e){return{current:e}}function an(e){0>Sr||(e.current=Yf[Sr],Yf[Sr]=null,Sr--)}function be(e,t){Sr++,Yf[Sr]=e.current,e.current=t}var Li=Ii(null),ul=Ii(null),Vs=Ii(null),tu=Ii(null);function eu(e,t){switch(be(Vs,t),be(ul,e),be(Li,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Kv(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Kv(t),e=Vx(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}an(Li),be(Li,e)}function zr(){an(Li),an(ul),an(Vs)}function Zf(e){e.memoizedState!==null&&be(tu,e);var t=Li.current,n=Vx(t,e.type);t!==n&&(be(ul,e),be(Li,n))}function nu(e){ul.current===e&&(an(Li),an(ul)),tu.current===e&&(an(tu),Sl._currentValue=Ca)}var cf,q0;function Ea(e){if(cf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);cf=t&&t[1]||"",q0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+cf+e+q0}var uf=!1;function hf(e,t){if(!e||uf)return"";uf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){var u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(f){if(f&&u&&typeof f.stack=="string")return[f.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=s);break}}}finally{uf=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ea(n):""}function UM(e,t){switch(e.tag){case 26:case 27:case 5:return Ea(e.type);case 16:return Ea("Lazy");case 13:return e.child!==t&&t!==null?Ea("Suspense Fallback"):Ea("Suspense");case 19:return Ea("SuspenseList");case 0:case 15:return hf(e.type,!1);case 11:return hf(e.type.render,!1);case 1:return hf(e.type,!0);case 31:return Ea("Activity");default:return""}}function Y0(e){try{var t="",n=null;do t+=UM(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Jf=Object.prototype.hasOwnProperty,zp=Qe.unstable_scheduleCallback,df=Qe.unstable_cancelCallback,LM=Qe.unstable_shouldYield,IM=Qe.unstable_requestPaint,zn=Qe.unstable_now,OM=Qe.unstable_getCurrentPriorityLevel,b_=Qe.unstable_ImmediatePriority,M_=Qe.unstable_UserBlockingPriority,iu=Qe.unstable_NormalPriority,PM=Qe.unstable_LowPriority,E_=Qe.unstable_IdlePriority,BM=Qe.log,FM=Qe.unstable_setDisableYieldValue,Tl=null,Hn=null;function Ps(e){if(typeof BM=="function"&&FM(e),Hn&&typeof Hn.setStrictMode=="function")try{Hn.setStrictMode(Tl,e)}catch{}}var Vn=Math.clz32?Math.clz32:VM,zM=Math.log,HM=Math.LN2;function VM(e){return e>>>=0,e===0?32:31-(zM(e)/HM|0)|0}var bc=256,Mc=262144,Ec=4194304;function Ta(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ru(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=Ta(i):(r&=o,r!==0?s=Ta(r):n||(n=o&~e,n!==0&&(s=Ta(n))))):(o=i&~a,o!==0?s=Ta(o):r!==0?s=Ta(r):n||(n=i&~e,n!==0&&(s=Ta(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function Al(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function GM(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function T_(){var e=Ec;return Ec<<=1,(Ec&62914560)===0&&(Ec=4194304),e}function ff(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function kM(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Vn(n),p=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var f=u[d];f!==null&&(f.lane&=-536870913)}n&=~p}i!==0&&A_(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function A_(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Vn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function w_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Vn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function C_(e,t){var n=t&-t;return n=(n&42)!==0?1:Hp(n),(n&(e.suspendedLanes|t))!==0?0:n}function Hp(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Vp(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function R_(){var e=re.p;return e!==0?e:(e=window.event,e===void 0?32:Kx(e.type))}function Z0(e,t){var n=re.p;try{return re.p=e,t()}finally{re.p=n}}var ta=Math.random().toString(36).slice(2),un="__reactFiber$"+ta,Dn="__reactProps$"+ta,jr="__reactContainer$"+ta,jf="__reactEvents$"+ta,XM="__reactListeners$"+ta,WM="__reactHandles$"+ta,J0="__reactResources$"+ta,Cl="__reactMarker$"+ta;function Gp(e){delete e[un],delete e[Dn],delete e[jf],delete e[XM],delete e[WM]}function br(e){var t=e[un];if(t)return t;for(var n=e.parentNode;n;){if(t=n[jr]||n[un]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=i_(e);e!==null;){if(n=e[un])return n;e=i_(e)}return t}e=n,n=e.parentNode}return null}function Qr(e){if(e=e[un]||e[jr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Zo(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(j(33))}function Ur(e){var t=e[J0];return t||(t=e[J0]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function sn(e){e[Cl]=!0}var D_=new Set,N_={};function Fa(e,t){Hr(e,t),Hr(e+"Capture",t)}function Hr(e,t){for(N_[e]=t,e=0;e<t.length;e++)D_.add(t[e])}var qM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),j0={},Q0={};function YM(e){return Jf.call(Q0,e)?!0:Jf.call(j0,e)?!1:qM.test(e)?Q0[e]=!0:(j0[e]=!0,!1)}function zc(e,t,n){if(YM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Tc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function ji(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function ei(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function U_(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ZM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Qf(e){if(!e._valueTracker){var t=U_(e)?"checked":"value";e._valueTracker=ZM(e,t,""+e[t])}}function L_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=U_(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function su(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var JM=/[\n"\\]/g;function si(e){return e.replace(JM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Kf(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ei(t)):e.value!==""+ei(t)&&(e.value=""+ei(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?$f(e,r,ei(t)):n!=null?$f(e,r,ei(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+ei(o):e.removeAttribute("name")}function I_(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Qf(e);return}n=n!=null?""+ei(n):"",t=t!=null?""+ei(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Qf(e)}function $f(e,t,n){t==="number"&&su(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Lr(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+ei(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function O_(e,t,n){if(t!=null&&(t=""+ei(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+ei(n):""}function P_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(j(92));if(Yo(i)){if(1<i.length)throw Error(j(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=ei(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Qf(e)}function Vr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var jM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function K0(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||jM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function B_(e,t,n){if(t!=null&&typeof t!="object")throw Error(j(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&K0(e,s,i)}else for(var a in t)t.hasOwnProperty(a)&&K0(e,a,t[a])}function kp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var QM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),KM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Hc(e){return KM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ss(){}var tp=null;function Xp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mr=null,Ir=null;function $0(e){var t=Qr(e);if(t&&(e=t.stateNode)){var n=e[Dn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Kf(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+si(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Dn]||null;if(!s)throw Error(j(90));Kf(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&L_(i)}break t;case"textarea":O_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Lr(e,!!n.multiple,t,!1)}}}var pf=!1;function F_(e,t,n){if(pf)return e(t,n);pf=!0;try{var i=e(t);return i}finally{if(pf=!1,(Mr!==null||Ir!==null)&&(Vu(),Mr&&(t=Mr,e=Ir,Ir=Mr=null,$0(t),e)))for(t=0;t<e.length;t++)$0(e[t])}}function hl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Dn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var cs=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ep=!1;if(cs)try{mr={},Object.defineProperty(mr,"passive",{get:function(){ep=!0}}),window.addEventListener("test",mr,mr),window.removeEventListener("test",mr,mr)}catch{ep=!1}var mr,Bs=null,Wp=null,Vc=null;function z_(){if(Vc)return Vc;var e,t=Wp,n=t.length,i,s="value"in Bs?Bs.value:Bs.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Vc=s.slice(e,1<i?1-i:void 0)}function Gc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ac(){return!0}function tv(){return!1}function Nn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ac:tv,this.isPropagationStopped=tv,this}return Ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ac)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ac)},persist:function(){},isPersistent:Ac}),t}var za={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Du=Nn(za),Rl=Ce({},za,{view:0,detail:0}),$M=Nn(Rl),mf,gf,Ho,Nu=Ce({},Rl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ho&&(Ho&&e.type==="mousemove"?(mf=e.screenX-Ho.screenX,gf=e.screenY-Ho.screenY):gf=mf=0,Ho=e),mf)},movementY:function(e){return"movementY"in e?e.movementY:gf}}),ev=Nn(Nu),t1=Ce({},Nu,{dataTransfer:0}),e1=Nn(t1),n1=Ce({},Rl,{relatedTarget:0}),vf=Nn(n1),i1=Ce({},za,{animationName:0,elapsedTime:0,pseudoElement:0}),s1=Nn(i1),a1=Ce({},za,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),r1=Nn(a1),o1=Ce({},za,{data:0}),nv=Nn(o1),l1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},c1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},u1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function h1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=u1[e])?!!t[e]:!1}function qp(){return h1}var d1=Ce({},Rl,{key:function(e){if(e.key){var t=l1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Gc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?c1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qp,charCode:function(e){return e.type==="keypress"?Gc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),f1=Nn(d1),p1=Ce({},Nu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),iv=Nn(p1),m1=Ce({},Rl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qp}),g1=Nn(m1),v1=Ce({},za,{propertyName:0,elapsedTime:0,pseudoElement:0}),_1=Nn(v1),y1=Ce({},Nu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),x1=Nn(y1),S1=Ce({},za,{newState:0,oldState:0}),b1=Nn(S1),M1=[9,13,27,32],Yp=cs&&"CompositionEvent"in window,Qo=null;cs&&"documentMode"in document&&(Qo=document.documentMode);var E1=cs&&"TextEvent"in window&&!Qo,H_=cs&&(!Yp||Qo&&8<Qo&&11>=Qo),sv=" ",av=!1;function V_(e,t){switch(e){case"keyup":return M1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function G_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Er=!1;function T1(e,t){switch(e){case"compositionend":return G_(t);case"keypress":return t.which!==32?null:(av=!0,sv);case"textInput":return e=t.data,e===sv&&av?null:e;default:return null}}function A1(e,t){if(Er)return e==="compositionend"||!Yp&&V_(e,t)?(e=z_(),Vc=Wp=Bs=null,Er=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return H_&&t.locale!=="ko"?null:t.data;default:return null}}var w1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!w1[e.type]:t==="textarea"}function k_(e,t,n,i){Mr?Ir?Ir.push(i):Ir=[i]:Mr=i,t=bu(t,"onChange"),0<t.length&&(n=new Du("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ko=null,dl=null;function C1(e){Fx(e,0)}function Uu(e){var t=Zo(e);if(L_(t))return e}function ov(e,t){if(e==="change")return t}var X_=!1;cs&&(cs?(Cc="oninput"in document,Cc||(_f=document.createElement("div"),_f.setAttribute("oninput","return;"),Cc=typeof _f.oninput=="function"),wc=Cc):wc=!1,X_=wc&&(!document.documentMode||9<document.documentMode));var wc,Cc,_f;function lv(){Ko&&(Ko.detachEvent("onpropertychange",W_),dl=Ko=null)}function W_(e){if(e.propertyName==="value"&&Uu(dl)){var t=[];k_(t,dl,e,Xp(e)),F_(C1,t)}}function R1(e,t,n){e==="focusin"?(lv(),Ko=t,dl=n,Ko.attachEvent("onpropertychange",W_)):e==="focusout"&&lv()}function D1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Uu(dl)}function N1(e,t){if(e==="click")return Uu(t)}function U1(e,t){if(e==="input"||e==="change")return Uu(t)}function L1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var kn=typeof Object.is=="function"?Object.is:L1;function fl(e,t){if(kn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Jf.call(t,s)||!kn(e[s],t[s]))return!1}return!0}function cv(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uv(e,t){var n=cv(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=cv(n)}}function q_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?q_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Y_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=su(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=su(e.document)}return t}function Zp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var I1=cs&&"documentMode"in document&&11>=document.documentMode,Tr=null,np=null,$o=null,ip=!1;function hv(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ip||Tr==null||Tr!==su(i)||(i=Tr,"selectionStart"in i&&Zp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),$o&&fl($o,i)||($o=i,i=bu(np,"onSelect"),0<i.length&&(t=new Du("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Tr)))}function Ma(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ar={animationend:Ma("Animation","AnimationEnd"),animationiteration:Ma("Animation","AnimationIteration"),animationstart:Ma("Animation","AnimationStart"),transitionrun:Ma("Transition","TransitionRun"),transitionstart:Ma("Transition","TransitionStart"),transitioncancel:Ma("Transition","TransitionCancel"),transitionend:Ma("Transition","TransitionEnd")},yf={},Z_={};cs&&(Z_=document.createElement("div").style,"AnimationEvent"in window||(delete Ar.animationend.animation,delete Ar.animationiteration.animation,delete Ar.animationstart.animation),"TransitionEvent"in window||delete Ar.transitionend.transition);function Ha(e){if(yf[e])return yf[e];if(!Ar[e])return e;var t=Ar[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Z_)return yf[e]=t[n];return e}var J_=Ha("animationend"),j_=Ha("animationiteration"),Q_=Ha("animationstart"),O1=Ha("transitionrun"),P1=Ha("transitionstart"),B1=Ha("transitioncancel"),K_=Ha("transitionend"),$_=new Map,sp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");sp.push("scrollEnd");function vi(e,t){$_.set(e,t),Fa(t,[e])}var au=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ti=[],wr=0,Jp=0;function Lu(){for(var e=wr,t=Jp=wr=0;t<e;){var n=ti[t];ti[t++]=null;var i=ti[t];ti[t++]=null;var s=ti[t];ti[t++]=null;var a=ti[t];if(ti[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&ty(n,s,a)}}function Iu(e,t,n,i){ti[wr++]=e,ti[wr++]=t,ti[wr++]=n,ti[wr++]=i,Jp|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function jp(e,t,n,i){return Iu(e,t,n,i),ru(e)}function Va(e,t){return Iu(e,null,null,t),ru(e)}function ty(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-Vn(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function ru(e){if(50<ll)throw ll=0,Tp=null,Error(j(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Cr={};function F1(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bn(e,t,n,i){return new F1(e,t,n,i)}function Qp(e){return e=e.prototype,!(!e||!e.isReactComponent)}function rs(e,t){var n=e.alternate;return n===null?(n=Bn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ey(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function kc(e,t,n,i,s,a){var r=0;if(i=e,typeof e=="function")Qp(e)&&(r=1);else if(typeof e=="string")r=VE(e,n,Li.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Wf:return e=Bn(31,n,t,s),e.elementType=Wf,e.lanes=a,e;case xr:return Ra(n.children,s,a,t);case x_:r=8,s|=24;break;case Gf:return e=Bn(12,n,t,s|2),e.elementType=Gf,e.lanes=a,e;case kf:return e=Bn(13,n,t,s),e.elementType=kf,e.lanes=a,e;case Xf:return e=Bn(19,n,t,s),e.elementType=Xf,e.lanes=a,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case is:r=10;break t;case S_:r=9;break t;case Bp:r=11;break t;case Fp:r=14;break t;case Ds:r=16,i=null;break t}r=29,n=Error(j(130,e===null?"null":typeof e,"")),i=null}return t=Bn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Ra(e,t,n,i){return e=Bn(7,e,i,t),e.lanes=n,e}function xf(e,t,n){return e=Bn(6,e,null,t),e.lanes=n,e}function ny(e){var t=Bn(18,null,null,0);return t.stateNode=e,t}function Sf(e,t,n){return t=Bn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var dv=new WeakMap;function ai(e,t){if(typeof e=="object"&&e!==null){var n=dv.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Y0(t)},dv.set(e,t),t)}return{value:e,source:t,stack:Y0(t)}}var Rr=[],Dr=0,ou=null,pl=0,ni=[],ii=0,js=null,Di=1,Ni="";function es(e,t){Rr[Dr++]=pl,Rr[Dr++]=ou,ou=e,pl=t}function iy(e,t,n){ni[ii++]=Di,ni[ii++]=Ni,ni[ii++]=js,js=e;var i=Di;e=Ni;var s=32-Vn(i)-1;i&=~(1<<s),n+=1;var a=32-Vn(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,Di=1<<32-Vn(t)+s|n<<s|i,Ni=a+e}else Di=1<<a|n<<s|i,Ni=e}function Kp(e){e.return!==null&&(es(e,1),iy(e,1,0))}function $p(e){for(;e===ou;)ou=Rr[--Dr],Rr[Dr]=null,pl=Rr[--Dr],Rr[Dr]=null;for(;e===js;)js=ni[--ii],ni[ii]=null,Ni=ni[--ii],ni[ii]=null,Di=ni[--ii],ni[ii]=null}function sy(e,t){ni[ii++]=Di,ni[ii++]=Ni,ni[ii++]=js,Di=t.id,Ni=t.overflow,js=e}var hn=null,we=null,$t=!1,Gs=null,ri=!1,ap=Error(j(519));function Qs(e){var t=Error(j(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ml(ai(t,e)),ap}function fv(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[un]=e,t[Dn]=i,n){case"dialog":Jt("cancel",t),Jt("close",t);break;case"iframe":case"object":case"embed":Jt("load",t);break;case"video":case"audio":for(n=0;n<yl.length;n++)Jt(yl[n],t);break;case"source":Jt("error",t);break;case"img":case"image":case"link":Jt("error",t),Jt("load",t);break;case"details":Jt("toggle",t);break;case"input":Jt("invalid",t),I_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Jt("invalid",t);break;case"textarea":Jt("invalid",t),P_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||Hx(t.textContent,n)?(i.popover!=null&&(Jt("beforetoggle",t),Jt("toggle",t)),i.onScroll!=null&&Jt("scroll",t),i.onScrollEnd!=null&&Jt("scrollend",t),i.onClick!=null&&(t.onclick=ss),t=!0):t=!1,t||Qs(e,!0)}function pv(e){for(hn=e.return;hn;)switch(hn.tag){case 5:case 31:case 13:ri=!1;return;case 27:case 3:ri=!0;return;default:hn=hn.return}}function gr(e){if(e!==hn)return!1;if(!$t)return pv(e),$t=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Dp(e.type,e.memoizedProps)),n=!n),n&&we&&Qs(e),pv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));we=n_(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));we=n_(e)}else t===27?(t=we,ea(e.type)?(e=Ip,Ip=null,we=e):we=t):we=hn?li(e.stateNode.nextSibling):null;return!0}function La(){we=hn=null,$t=!1}function bf(){var e=Gs;return e!==null&&(Cn===null?Cn=e:Cn.push.apply(Cn,e),Gs=null),e}function ml(e){Gs===null?Gs=[e]:Gs.push(e)}var rp=Ii(null),Ga=null,as=null;function Us(e,t,n){be(rp,t._currentValue),t._currentValue=n}function os(e){e._currentValue=rp.current,an(rp)}function op(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function lp(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),op(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(j(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),op(r,n,e),r=null}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function Kr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(j(387));if(r=r.memoizedProps,r!==null){var o=s.type;kn(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===tu.current){if(r=s.alternate,r===null)throw Error(j(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Sl):e=[Sl])}s=s.return}e!==null&&lp(t,e,n,i),t.flags|=262144}function lu(e){for(e=e.firstContext;e!==null;){if(!kn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ia(e){Ga=e,as=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dn(e){return ay(Ga,e)}function Rc(e,t){return Ga===null&&Ia(e),ay(e,t)}function ay(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},as===null){if(e===null)throw Error(j(308));as=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else as=as.next=t;return n}var z1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},H1=Qe.unstable_scheduleCallback,V1=Qe.unstable_NormalPriority,Ye={$$typeof:is,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function tm(){return{controller:new z1,data:new Map,refCount:0}}function Dl(e){e.refCount--,e.refCount===0&&H1(V1,function(){e.controller.abort()})}var tl=null,cp=0,Gr=0,Or=null;function G1(e,t){if(tl===null){var n=tl=[];cp=0,Gr=Tm(),Or={status:"pending",value:void 0,then:function(i){n.push(i)}}}return cp++,t.then(mv,mv),t}function mv(){if(--cp===0&&tl!==null){Or!==null&&(Or.status="fulfilled");var e=tl;tl=null,Gr=0,Or=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function k1(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var gv=It.S;It.S=function(e,t){yx=zn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&G1(e,t),gv!==null&&gv(e,t)};var Da=Ii(null);function em(){var e=Da.current;return e!==null?e:ye.pooledCache}function Xc(e,t){t===null?be(Da,Da.current):be(Da,t.pool)}function ry(){var e=em();return e===null?null:{parent:Ye._currentValue,pool:e}}var $r=Error(j(460)),nm=Error(j(474)),Ou=Error(j(542)),cu={then:function(){}};function vv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function oy(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ss,ss),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yv(e),e;default:if(typeof t.status=="string")t.then(ss,ss);else{if(e=ye,e!==null&&100<e.shellSuspendCounter)throw Error(j(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yv(e),e}throw Na=t,$r}}function Aa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Na=n,$r):n}}var Na=null;function _v(){if(Na===null)throw Error(j(459));var e=Na;return Na=null,e}function yv(e){if(e===$r||e===Ou)throw Error(j(483))}var Pr=null,gl=0;function Dc(e){var t=gl;return gl+=1,Pr===null&&(Pr=[]),oy(Pr,e,t)}function Vo(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Nc(e,t){throw t.$$typeof===RM?Error(j(525)):(e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ly(e){function t(h,m){if(e){var _=h.deletions;_===null?(h.deletions=[m],h.flags|=16):_.push(m)}}function n(h,m){if(!e)return null;for(;m!==null;)t(h,m),m=m.sibling;return null}function i(h){for(var m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function s(h,m){return h=rs(h,m),h.index=0,h.sibling=null,h}function a(h,m,_){return h.index=_,e?(_=h.alternate,_!==null?(_=_.index,_<m?(h.flags|=67108866,m):_):(h.flags|=67108866,m)):(h.flags|=1048576,m)}function r(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,m,_,S){return m===null||m.tag!==6?(m=xf(_,h.mode,S),m.return=h,m):(m=s(m,_),m.return=h,m)}function l(h,m,_,S){var T=_.type;return T===xr?d(h,m,_.props.children,S,_.key):m!==null&&(m.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ds&&Aa(T)===m.type)?(m=s(m,_.props),Vo(m,_),m.return=h,m):(m=kc(_.type,_.key,_.props,null,h.mode,S),Vo(m,_),m.return=h,m)}function c(h,m,_,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=Sf(_,h.mode,S),m.return=h,m):(m=s(m,_.children||[]),m.return=h,m)}function d(h,m,_,S,T){return m===null||m.tag!==7?(m=Ra(_,h.mode,S,T),m.return=h,m):(m=s(m,_),m.return=h,m)}function p(h,m,_){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=xf(""+m,h.mode,_),m.return=h,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Sc:return _=kc(m.type,m.key,m.props,null,h.mode,_),Vo(_,m),_.return=h,_;case qo:return m=Sf(m,h.mode,_),m.return=h,m;case Ds:return m=Aa(m),p(h,m,_)}if(Yo(m)||zo(m))return m=Ra(m,h.mode,_,null),m.return=h,m;if(typeof m.then=="function")return p(h,Dc(m),_);if(m.$$typeof===is)return p(h,Rc(h,m),_);Nc(h,m)}return null}function u(h,m,_,S){var T=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return T!==null?null:o(h,m,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Sc:return _.key===T?l(h,m,_,S):null;case qo:return _.key===T?c(h,m,_,S):null;case Ds:return _=Aa(_),u(h,m,_,S)}if(Yo(_)||zo(_))return T!==null?null:d(h,m,_,S,null);if(typeof _.then=="function")return u(h,m,Dc(_),S);if(_.$$typeof===is)return u(h,m,Rc(h,_),S);Nc(h,_)}return null}function f(h,m,_,S,T){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return h=h.get(_)||null,o(m,h,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Sc:return h=h.get(S.key===null?_:S.key)||null,l(m,h,S,T);case qo:return h=h.get(S.key===null?_:S.key)||null,c(m,h,S,T);case Ds:return S=Aa(S),f(h,m,_,S,T)}if(Yo(S)||zo(S))return h=h.get(_)||null,d(m,h,S,T,null);if(typeof S.then=="function")return f(h,m,_,Dc(S),T);if(S.$$typeof===is)return f(h,m,_,Rc(m,S),T);Nc(m,S)}return null}function v(h,m,_,S){for(var T=null,C=null,R=m,x=m=0,M=null;R!==null&&x<_.length;x++){R.index>x?(M=R,R=null):M=R.sibling;var F=u(h,R,_[x],S);if(F===null){R===null&&(R=M);break}e&&R&&F.alternate===null&&t(h,R),m=a(F,m,x),C===null?T=F:C.sibling=F,C=F,R=M}if(x===_.length)return n(h,R),$t&&es(h,x),T;if(R===null){for(;x<_.length;x++)R=p(h,_[x],S),R!==null&&(m=a(R,m,x),C===null?T=R:C.sibling=R,C=R);return $t&&es(h,x),T}for(R=i(R);x<_.length;x++)M=f(R,h,x,_[x],S),M!==null&&(e&&M.alternate!==null&&R.delete(M.key===null?x:M.key),m=a(M,m,x),C===null?T=M:C.sibling=M,C=M);return e&&R.forEach(function(D){return t(h,D)}),$t&&es(h,x),T}function b(h,m,_,S){if(_==null)throw Error(j(151));for(var T=null,C=null,R=m,x=m=0,M=null,F=_.next();R!==null&&!F.done;x++,F=_.next()){R.index>x?(M=R,R=null):M=R.sibling;var D=u(h,R,F.value,S);if(D===null){R===null&&(R=M);break}e&&R&&D.alternate===null&&t(h,R),m=a(D,m,x),C===null?T=D:C.sibling=D,C=D,R=M}if(F.done)return n(h,R),$t&&es(h,x),T;if(R===null){for(;!F.done;x++,F=_.next())F=p(h,F.value,S),F!==null&&(m=a(F,m,x),C===null?T=F:C.sibling=F,C=F);return $t&&es(h,x),T}for(R=i(R);!F.done;x++,F=_.next())F=f(R,h,x,F.value,S),F!==null&&(e&&F.alternate!==null&&R.delete(F.key===null?x:F.key),m=a(F,m,x),C===null?T=F:C.sibling=F,C=F);return e&&R.forEach(function(P){return t(h,P)}),$t&&es(h,x),T}function g(h,m,_,S){if(typeof _=="object"&&_!==null&&_.type===xr&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case Sc:t:{for(var T=_.key;m!==null;){if(m.key===T){if(T=_.type,T===xr){if(m.tag===7){n(h,m.sibling),S=s(m,_.props.children),S.return=h,h=S;break t}}else if(m.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ds&&Aa(T)===m.type){n(h,m.sibling),S=s(m,_.props),Vo(S,_),S.return=h,h=S;break t}n(h,m);break}else t(h,m);m=m.sibling}_.type===xr?(S=Ra(_.props.children,h.mode,S,_.key),S.return=h,h=S):(S=kc(_.type,_.key,_.props,null,h.mode,S),Vo(S,_),S.return=h,h=S)}return r(h);case qo:t:{for(T=_.key;m!==null;){if(m.key===T)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(h,m.sibling),S=s(m,_.children||[]),S.return=h,h=S;break t}else{n(h,m);break}else t(h,m);m=m.sibling}S=Sf(_,h.mode,S),S.return=h,h=S}return r(h);case Ds:return _=Aa(_),g(h,m,_,S)}if(Yo(_))return v(h,m,_,S);if(zo(_)){if(T=zo(_),typeof T!="function")throw Error(j(150));return _=T.call(_),b(h,m,_,S)}if(typeof _.then=="function")return g(h,m,Dc(_),S);if(_.$$typeof===is)return g(h,m,Rc(h,_),S);Nc(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,m!==null&&m.tag===6?(n(h,m.sibling),S=s(m,_),S.return=h,h=S):(n(h,m),S=xf(_,h.mode,S),S.return=h,h=S),r(h)):n(h,m)}return function(h,m,_,S){try{gl=0;var T=g(h,m,_,S);return Pr=null,T}catch(R){if(R===$r||R===Ou)throw R;var C=Bn(29,R,null,h.mode);return C.lanes=S,C.return=h,C}}}var Oa=ly(!0),cy=ly(!1),Ns=!1;function im(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function up(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ks(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ae&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=ru(e),ty(e,null,n),t}return Iu(e,i,t,n),ru(e)}function el(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,w_(e,n)}}function Mf(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var hp=!1;function nl(){if(hp){var e=Or;if(e!==null)throw e}}function il(e,t,n,i){hp=!1;var s=e.updateQueue;Ns=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,d=c=l=null,o=a;do{var u=o.lane&-536870913,f=u!==o.lane;if(f?(Kt&u)===u:(i&u)===u){u!==0&&u===Gr&&(hp=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var v=e,b=o;u=t;var g=n;switch(b.tag){case 1:if(v=b.payload,typeof v=="function"){p=v.call(g,p,u);break t}p=v;break t;case 3:v.flags=v.flags&-65537|128;case 0:if(v=b.payload,u=typeof v=="function"?v.call(g,p,u):v,u==null)break t;p=Ce({},p,u);break t;case 2:Ns=!0}}u=o.callback,u!==null&&(e.flags|=64,f&&(e.flags|=8192),f=s.callbacks,f===null?s.callbacks=[u]:f.push(u))}else f={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=f,l=p):d=d.next=f,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;f=o,o=f.next,f.next=null,s.lastBaseUpdate=f,s.shared.pending=null}}while(!0);d===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=d,a===null&&(s.shared.lanes=0),$s|=r,e.lanes=r,e.memoizedState=p}}function uy(e,t){if(typeof e!="function")throw Error(j(191,e));e.call(t)}function hy(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)uy(n[e],t)}var kr=Ii(null),uu=Ii(0);function xv(e,t){e=fs,be(uu,e),be(kr,t),fs=e|t.baseLanes}function dp(){be(uu,fs),be(kr,kr.current)}function sm(){fs=uu.current,an(kr),an(uu)}var Xn=Ii(null),oi=null;function Ls(e){var t=e.alternate;be(Ve,Ve.current&1),be(Xn,e),oi===null&&(t===null||kr.current!==null||t.memoizedState!==null)&&(oi=e)}function fp(e){be(Ve,Ve.current),be(Xn,e),oi===null&&(oi=e)}function dy(e){e.tag===22?(be(Ve,Ve.current),be(Xn,e),oi===null&&(oi=e)):Is(e)}function Is(){be(Ve,Ve.current),be(Xn,Xn.current)}function Pn(e){an(Xn),oi===e&&(oi=null),an(Ve)}var Ve=Ii(0);function hu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Up(n)||Lp(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var us=0,Gt=null,ve=null,We=null,du=!1,Br=!1,Pa=!1,fu=0,vl=0,Fr=null,X1=0;function Oe(){throw Error(j(321))}function am(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kn(e[n],t[n]))return!1;return!0}function rm(e,t,n,i,s,a){return us=a,Gt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,It.H=e===null||e.memoizedState===null?ky:vm,Pa=!1,a=n(i,s),Pa=!1,Br&&(a=py(t,n,i,s)),fy(e),a}function fy(e){It.H=_l;var t=ve!==null&&ve.next!==null;if(us=0,We=ve=Gt=null,du=!1,vl=0,Fr=null,t)throw Error(j(300));e===null||Ze||(e=e.dependencies,e!==null&&lu(e)&&(Ze=!0))}function py(e,t,n,i){Gt=e;var s=0;do{if(Br&&(Fr=null),vl=0,Br=!1,25<=s)throw Error(j(301));if(s+=1,We=ve=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}It.H=Xy,a=t(n,i)}while(Br);return a}function W1(){var e=It.H,t=e.useState()[0];return t=typeof t.then=="function"?Nl(t):t,e=e.useState()[0],(ve!==null?ve.memoizedState:null)!==e&&(Gt.flags|=1024),t}function om(){var e=fu!==0;return fu=0,e}function lm(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function cm(e){if(du){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}du=!1}us=0,We=ve=Gt=null,Br=!1,vl=fu=0,Fr=null}function bn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return We===null?Gt.memoizedState=We=e:We=We.next=e,We}function Ge(){if(ve===null){var e=Gt.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=We===null?Gt.memoizedState:We.next;if(t!==null)We=t,ve=e;else{if(e===null)throw Gt.alternate===null?Error(j(467)):Error(j(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},We===null?Gt.memoizedState=We=e:We=We.next=e}return We}function Pu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Nl(e){var t=vl;return vl+=1,Fr===null&&(Fr=[]),e=oy(Fr,e,t),t=Gt,(We===null?t.memoizedState:We.next)===null&&(t=t.alternate,It.H=t===null||t.memoizedState===null?ky:vm),e}function Bu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Nl(e);if(e.$$typeof===is)return dn(e)}throw Error(j(438,String(e)))}function um(e){var t=null,n=Gt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Gt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Pu(),Gt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=DM;return t.index++,n}function hs(e,t){return typeof t=="function"?t(e):t}function Wc(e){var t=Ge();return hm(t,ve,e)}function hm(e,t,n){var i=e.queue;if(i===null)throw Error(j(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,d=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(Kt&p)===p:(us&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Gr&&(d=!0);else if((us&u)===u){c=c.next,u===Gr&&(d=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,Gt.lanes|=u,$s|=u;p=c.action,Pa&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Gt.lanes|=p,$s|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!kn(a,e.memoizedState)&&(Ze=!0,d&&(n=Or,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Ef(e){var t=Ge(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);kn(a,t.memoizedState)||(Ze=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function my(e,t,n){var i=Gt,s=Ge(),a=$t;if(a){if(n===void 0)throw Error(j(407));n=n()}else n=t();var r=!kn((ve||s).memoizedState,n);if(r&&(s.memoizedState=n,Ze=!0),s=s.queue,dm(_y.bind(null,i,s,e),[e]),s.getSnapshot!==t||r||We!==null&&We.memoizedState.tag&1){if(i.flags|=2048,Xr(9,{destroy:void 0},vy.bind(null,i,s,n,t),null),ye===null)throw Error(j(349));a||(us&127)!==0||gy(i,t,n)}return n}function gy(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Gt.updateQueue,t===null?(t=Pu(),Gt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vy(e,t,n,i){t.value=n,t.getSnapshot=i,yy(t)&&xy(e)}function _y(e,t,n){return n(function(){yy(t)&&xy(e)})}function yy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kn(e,n)}catch{return!0}}function xy(e){var t=Va(e,2);t!==null&&Rn(t,e,2)}function pp(e){var t=bn();if(typeof e=="function"){var n=e;if(e=n(),Pa){Ps(!0);try{n()}finally{Ps(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:e},t}function Sy(e,t,n,i){return e.baseState=n,hm(e,ve,typeof i=="function"?i:hs)}function q1(e,t,n,i,s){if(zu(e))throw Error(j(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};It.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,by(t,a)):(a.next=n.next,t.pending=n.next=a)}}function by(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=It.T,r={};It.T=r;try{var o=n(s,i),l=It.S;l!==null&&l(r,o),Sv(e,t,o)}catch(c){mp(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),It.T=a}}else try{a=n(s,i),Sv(e,t,a)}catch(c){mp(e,t,c)}}function Sv(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){bv(e,t,i)},function(i){return mp(e,t,i)}):bv(e,t,n)}function bv(e,t,n){t.status="fulfilled",t.value=n,My(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,by(e,n)))}function mp(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,My(t),t=t.next;while(t!==i)}e.action=null}function My(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ey(e,t){return t}function Mv(e,t){if($t){var n=ye.formState;if(n!==null){t:{var i=Gt;if($t){if(we){e:{for(var s=we,a=ri;s.nodeType!==8;){if(!a){s=null;break e}if(s=li(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){we=li(s.nextSibling),i=s.data==="F!";break t}}Qs(i)}i=!1}i&&(t=n[0])}}return n=bn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ey,lastRenderedState:t},n.queue=i,n=Hy.bind(null,Gt,i),i.dispatch=n,i=pp(!1),a=gm.bind(null,Gt,!1,i.queue),i=bn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=q1.bind(null,Gt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function Ev(e){var t=Ge();return Ty(t,ve,e)}function Ty(e,t,n){if(t=hm(e,t,Ey)[0],e=Wc(hs)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Nl(t)}catch(r){throw r===$r?Ou:r}else i=t;t=Ge();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Gt.flags|=2048,Xr(9,{destroy:void 0},Y1.bind(null,s,n),null)),[i,a,e]}function Y1(e,t){e.action=t}function Tv(e){var t=Ge(),n=ve;if(n!==null)return Ty(t,n,e);Ge(),t=t.memoizedState,n=Ge();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Xr(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Gt.updateQueue,t===null&&(t=Pu(),Gt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Ay(){return Ge().memoizedState}function qc(e,t,n,i){var s=bn();Gt.flags|=e,s.memoizedState=Xr(1|t,{destroy:void 0},n,i===void 0?null:i)}function Fu(e,t,n,i){var s=Ge();i=i===void 0?null:i;var a=s.memoizedState.inst;ve!==null&&i!==null&&am(i,ve.memoizedState.deps)?s.memoizedState=Xr(t,a,n,i):(Gt.flags|=e,s.memoizedState=Xr(1|t,a,n,i))}function Av(e,t){qc(8390656,8,e,t)}function dm(e,t){Fu(2048,8,e,t)}function Z1(e){Gt.flags|=4;var t=Gt.updateQueue;if(t===null)t=Pu(),Gt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function wy(e){var t=Ge().memoizedState;return Z1({ref:t,nextImpl:e}),function(){if((ae&2)!==0)throw Error(j(440));return t.impl.apply(void 0,arguments)}}function Cy(e,t){return Fu(4,2,e,t)}function Ry(e,t){return Fu(4,4,e,t)}function Dy(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ny(e,t,n){n=n!=null?n.concat([e]):null,Fu(4,4,Dy.bind(null,t,e),n)}function fm(){}function Uy(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&am(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ly(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&am(t,i[1]))return i[0];if(i=e(),Pa){Ps(!0);try{e()}finally{Ps(!1)}}return n.memoizedState=[i,t],i}function pm(e,t,n){return n===void 0||(us&1073741824)!==0&&(Kt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=Sx(),Gt.lanes|=e,$s|=e,n)}function Iy(e,t,n,i){return kn(n,t)?n:kr.current!==null?(e=pm(e,n,i),kn(e,t)||(Ze=!0),e):(us&42)===0||(us&1073741824)!==0&&(Kt&261930)===0?(Ze=!0,e.memoizedState=n):(e=Sx(),Gt.lanes|=e,$s|=e,t)}function Oy(e,t,n,i,s){var a=re.p;re.p=a!==0&&8>a?a:8;var r=It.T,o={};It.T=o,gm(e,!1,t,n);try{var l=s(),c=It.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=k1(l,i);sl(e,t,d,Gn(e))}else sl(e,t,i,Gn(e))}catch(p){sl(e,t,{then:function(){},status:"rejected",reason:p},Gn())}finally{re.p=a,r!==null&&o.types!==null&&(r.types=o.types),It.T=r}}function J1(){}function gp(e,t,n,i){if(e.tag!==5)throw Error(j(476));var s=Py(e).queue;Oy(e,s,t,Ca,n===null?J1:function(){return By(e),n(i)})}function Py(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ca,baseState:Ca,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:Ca},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function By(e){var t=Py(e);t.next===null&&(t=e.alternate.memoizedState),sl(e,t.next.queue,{},Gn())}function mm(){return dn(Sl)}function Fy(){return Ge().memoizedState}function zy(){return Ge().memoizedState}function j1(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Gn();e=ks(n);var i=Xs(t,e,n);i!==null&&(Rn(i,t,n),el(i,t,n)),t={cache:tm()},e.payload=t;return}t=t.return}}function Q1(e,t,n){var i=Gn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},zu(e)?Vy(t,n):(n=jp(e,t,n,i),n!==null&&(Rn(n,e,i),Gy(n,t,i)))}function Hy(e,t,n){var i=Gn();sl(e,t,n,i)}function sl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(zu(e))Vy(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,kn(o,r))return Iu(e,t,s,0),ye===null&&Lu(),!1}catch{}if(n=jp(e,t,s,i),n!==null)return Rn(n,e,i),Gy(n,t,i),!0}return!1}function gm(e,t,n,i){if(i={lane:2,revertLane:Tm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},zu(e)){if(t)throw Error(j(479))}else t=jp(e,n,i,2),t!==null&&Rn(t,e,2)}function zu(e){var t=e.alternate;return e===Gt||t!==null&&t===Gt}function Vy(e,t){Br=du=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Gy(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,w_(e,n)}}var _l={readContext:dn,use:Bu,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useLayoutEffect:Oe,useInsertionEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useSyncExternalStore:Oe,useId:Oe,useHostTransitionStatus:Oe,useFormState:Oe,useActionState:Oe,useOptimistic:Oe,useMemoCache:Oe,useCacheRefresh:Oe};_l.useEffectEvent=Oe;var ky={readContext:dn,use:Bu,useCallback:function(e,t){return bn().memoizedState=[e,t===void 0?null:t],e},useContext:dn,useEffect:Av,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,qc(4194308,4,Dy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return qc(4194308,4,e,t)},useInsertionEffect:function(e,t){qc(4,2,e,t)},useMemo:function(e,t){var n=bn();t=t===void 0?null:t;var i=e();if(Pa){Ps(!0);try{e()}finally{Ps(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=bn();if(n!==void 0){var s=n(t);if(Pa){Ps(!0);try{n(t)}finally{Ps(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=Q1.bind(null,Gt,e),[i.memoizedState,e]},useRef:function(e){var t=bn();return e={current:e},t.memoizedState=e},useState:function(e){e=pp(e);var t=e.queue,n=Hy.bind(null,Gt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:fm,useDeferredValue:function(e,t){var n=bn();return pm(n,e,t)},useTransition:function(){var e=pp(!1);return e=Oy.bind(null,Gt,e.queue,!0,!1),bn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Gt,s=bn();if($t){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),ye===null)throw Error(j(349));(Kt&127)!==0||gy(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Av(_y.bind(null,i,a,e),[e]),i.flags|=2048,Xr(9,{destroy:void 0},vy.bind(null,i,a,n,t),null),n},useId:function(){var e=bn(),t=ye.identifierPrefix;if($t){var n=Ni,i=Di;n=(i&~(1<<32-Vn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=fu++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=X1++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:mm,useFormState:Mv,useActionState:Mv,useOptimistic:function(e){var t=bn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=gm.bind(null,Gt,!0,n),n.dispatch=t,[e,t]},useMemoCache:um,useCacheRefresh:function(){return bn().memoizedState=j1.bind(null,Gt)},useEffectEvent:function(e){var t=bn(),n={impl:e};return t.memoizedState=n,function(){if((ae&2)!==0)throw Error(j(440));return n.impl.apply(void 0,arguments)}}},vm={readContext:dn,use:Bu,useCallback:Uy,useContext:dn,useEffect:dm,useImperativeHandle:Ny,useInsertionEffect:Cy,useLayoutEffect:Ry,useMemo:Ly,useReducer:Wc,useRef:Ay,useState:function(){return Wc(hs)},useDebugValue:fm,useDeferredValue:function(e,t){var n=Ge();return Iy(n,ve.memoizedState,e,t)},useTransition:function(){var e=Wc(hs)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Nl(e),t]},useSyncExternalStore:my,useId:Fy,useHostTransitionStatus:mm,useFormState:Ev,useActionState:Ev,useOptimistic:function(e,t){var n=Ge();return Sy(n,ve,e,t)},useMemoCache:um,useCacheRefresh:zy};vm.useEffectEvent=wy;var Xy={readContext:dn,use:Bu,useCallback:Uy,useContext:dn,useEffect:dm,useImperativeHandle:Ny,useInsertionEffect:Cy,useLayoutEffect:Ry,useMemo:Ly,useReducer:Ef,useRef:Ay,useState:function(){return Ef(hs)},useDebugValue:fm,useDeferredValue:function(e,t){var n=Ge();return ve===null?pm(n,e,t):Iy(n,ve.memoizedState,e,t)},useTransition:function(){var e=Ef(hs)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Nl(e),t]},useSyncExternalStore:my,useId:Fy,useHostTransitionStatus:mm,useFormState:Tv,useActionState:Tv,useOptimistic:function(e,t){var n=Ge();return ve!==null?Sy(n,ve,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:um,useCacheRefresh:zy};Xy.useEffectEvent=wy;function Tf(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Ce({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var vp={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Gn(),s=ks(i);s.payload=t,n!=null&&(s.callback=n),t=Xs(e,s,i),t!==null&&(Rn(t,e,i),el(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Gn(),s=ks(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Xs(e,s,i),t!==null&&(Rn(t,e,i),el(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Gn(),i=ks(n);i.tag=2,t!=null&&(i.callback=t),t=Xs(e,i,n),t!==null&&(Rn(t,e,n),el(t,e,n))}};function wv(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!fl(n,i)||!fl(s,a):!0}function Cv(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&vp.enqueueReplaceState(t,t.state,null)}function Ba(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Ce({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function Wy(e){au(e)}function qy(e){console.error(e)}function Yy(e){au(e)}function pu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Rv(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function _p(e,t,n){return n=ks(n),n.tag=3,n.payload={element:null},n.callback=function(){pu(e,t)},n}function Zy(e){return e=ks(e),e.tag=3,e}function Jy(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Rv(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Rv(t,n,i),typeof s!="function"&&(Ws===null?Ws=new Set([this]):Ws.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function K1(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Kr(t,n,s,!0),n=Xn.current,n!==null){switch(n.tag){case 31:case 13:return oi===null?yu():n.alternate===null&&Pe===0&&(Pe=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===cu?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Pf(e,i,s)),!1;case 22:return n.flags|=65536,i===cu?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Pf(e,i,s)),!1}throw Error(j(435,n.tag))}return Pf(e,i,s),yu(),!1}if($t)return t=Xn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==ap&&(e=Error(j(422),{cause:i}),ml(ai(e,n)))):(i!==ap&&(t=Error(j(423),{cause:i}),ml(ai(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=ai(i,n),s=_p(e.stateNode,i,s),Mf(e,s),Pe!==4&&(Pe=2)),!1;var a=Error(j(520),{cause:i});if(a=ai(a,n),ol===null?ol=[a]:ol.push(a),Pe!==4&&(Pe=2),t===null)return!0;i=ai(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=_p(n.stateNode,i,e),Mf(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(Ws===null||!Ws.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Zy(s),Jy(s,e,n,i),Mf(n,s),!1}n=n.return}while(n!==null);return!1}var _m=Error(j(461)),Ze=!1;function cn(e,t,n,i){t.child=e===null?cy(t,null,n,i):Oa(t,e.child,n,i)}function Dv(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ia(t),i=rm(e,t,n,r,a,s),o=om(),e!==null&&!Ze?(lm(e,t,s),ds(e,t,s)):($t&&o&&Kp(t),t.flags|=1,cn(e,t,i,s),t.child)}function Nv(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!Qp(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,jy(e,t,a,i,s)):(e=kc(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ym(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:fl,n(r,i)&&e.ref===t.ref)return ds(e,t,s)}return t.flags|=1,e=rs(a,i),e.ref=t.ref,e.return=t,t.child=e}function jy(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(fl(a,i)&&e.ref===t.ref)if(Ze=!1,t.pendingProps=i=a,ym(e,s))(e.flags&131072)!==0&&(Ze=!0);else return t.lanes=e.lanes,ds(e,t,s)}return yp(e,t,n,i,s)}function Qy(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Uv(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Xc(t,a!==null?a.cachePool:null),a!==null?xv(t,a):dp(),dy(t);else return i=t.lanes=536870912,Uv(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(Xc(t,a.cachePool),xv(t,a),Is(t),t.memoizedState=null):(e!==null&&Xc(t,null),dp(),Is(t));return cn(e,t,s,n),t.child}function Jo(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uv(e,t,n,i,s){var a=em();return a=a===null?null:{parent:Ye._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Xc(t,null),dp(),dy(t),e!==null&&Kr(e,t,i,!0),t.childLanes=s,null}function Yc(e,t){return t=mu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Lv(e,t,n){return Oa(t,e.child,null,n),e=Yc(t,t.pendingProps),e.flags|=2,Pn(t),t.memoizedState=null,e}function $1(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if($t){if(i.mode==="hidden")return e=Yc(t,i),t.lanes=536870912,Jo(null,e);if(fp(t),(e=we)?(e=kx(e,ri),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:js!==null?{id:Di,overflow:Ni}:null,retryLane:536870912,hydrationErrors:null},n=ny(e),n.return=t,t.child=n,hn=t,we=null)):e=null,e===null)throw Qs(t);return t.lanes=536870912,null}return Yc(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(fp(t),s)if(t.flags&256)t.flags&=-257,t=Lv(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(j(558));else if(Ze||Kr(e,t,n,!1),s=(n&e.childLanes)!==0,Ze||s){if(i=ye,i!==null&&(r=C_(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Va(e,r),Rn(i,e,r),_m;yu(),t=Lv(e,t,n)}else e=a.treeContext,we=li(r.nextSibling),hn=t,$t=!0,Gs=null,ri=!1,e!==null&&sy(t,e),t=Yc(t,i),t.flags|=4096;return t}return e=rs(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Zc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(j(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function yp(e,t,n,i,s){return Ia(t),n=rm(e,t,n,i,void 0,s),i=om(),e!==null&&!Ze?(lm(e,t,s),ds(e,t,s)):($t&&i&&Kp(t),t.flags|=1,cn(e,t,n,s),t.child)}function Iv(e,t,n,i,s,a){return Ia(t),t.updateQueue=null,n=py(t,i,n,s),fy(e),i=om(),e!==null&&!Ze?(lm(e,t,a),ds(e,t,a)):($t&&i&&Kp(t),t.flags|=1,cn(e,t,n,a),t.child)}function Ov(e,t,n,i,s){if(Ia(t),t.stateNode===null){var a=Cr,r=n.contextType;typeof r=="object"&&r!==null&&(a=dn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=vp,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},im(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?dn(r):Cr,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Tf(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&vp.enqueueReplaceState(a,a.state,null),il(t,i,a,s),nl(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=Ba(n,o);a.props=l;var c=a.context,d=n.contextType;r=Cr,typeof d=="object"&&d!==null&&(r=dn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&Cv(t,a,i,r),Ns=!1;var u=t.memoizedState;a.state=u,il(t,i,a,s),nl(),c=t.memoizedState,o||u!==c||Ns?(typeof p=="function"&&(Tf(t,n,p,i),c=t.memoizedState),(l=Ns||wv(t,n,l,i,u,c,r))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,up(e,t),r=t.memoizedProps,d=Ba(n,r),a.props=d,p=t.pendingProps,u=a.context,c=n.contextType,l=Cr,typeof c=="object"&&c!==null&&(l=dn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Cv(t,a,i,l),Ns=!1,u=t.memoizedState,a.state=u,il(t,i,a,s),nl();var f=t.memoizedState;r!==p||u!==f||Ns||e!==null&&e.dependencies!==null&&lu(e.dependencies)?(typeof o=="function"&&(Tf(t,n,o,i),f=t.memoizedState),(d=Ns||wv(t,n,d,i,u,f,l)||e!==null&&e.dependencies!==null&&lu(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,f,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,f,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=f),a.props=i,a.state=f,a.context=l,i=d):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Zc(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=Oa(t,e.child,null,s),t.child=Oa(t,null,n,s)):cn(e,t,n,s),t.memoizedState=a.state,e=t.child):e=ds(e,t,s),e}function Pv(e,t,n,i){return La(),t.flags|=256,cn(e,t,n,i),t.child}var Af={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function wf(e){return{baseLanes:e,cachePool:ry()}}function Cf(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Fn),e}function Ky(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(Ve.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if($t){if(s?Ls(t):Is(t),(e=we)?(e=kx(e,ri),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:js!==null?{id:Di,overflow:Ni}:null,retryLane:536870912,hydrationErrors:null},n=ny(e),n.return=t,t.child=n,hn=t,we=null)):e=null,e===null)throw Qs(t);return Lp(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,s?(Is(t),s=t.mode,o=mu({mode:"hidden",children:o},s),i=Ra(i,s,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=wf(n),i.childLanes=Cf(e,r,n),t.memoizedState=Af,Jo(null,i)):(Ls(t),xp(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(a)t.flags&256?(Ls(t),t.flags&=-257,t=Rf(e,t,n)):t.memoizedState!==null?(Is(t),t.child=e.child,t.flags|=128,t=null):(Is(t),o=i.fallback,s=t.mode,i=mu({mode:"visible",children:i.children},s),o=Ra(o,s,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,Oa(t,e.child,null,n),i=t.child,i.memoizedState=wf(n),i.childLanes=Cf(e,r,n),t.memoizedState=Af,t=Jo(null,i));else if(Ls(t),Lp(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(j(419)),i.stack="",i.digest=r,ml({value:i,source:null,stack:null}),t=Rf(e,t,n)}else if(Ze||Kr(e,t,n,!1),r=(n&e.childLanes)!==0,Ze||r){if(r=ye,r!==null&&(i=C_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,Va(e,i),Rn(r,e,i),_m;Up(o)||yu(),t=Rf(e,t,n)}else Up(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,we=li(o.nextSibling),hn=t,$t=!0,Gs=null,ri=!1,e!==null&&sy(t,e),t=xp(t,i.children),t.flags|=4096);return t}return s?(Is(t),o=i.fallback,s=t.mode,l=e.child,c=l.sibling,i=rs(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=rs(c,o):(o=Ra(o,s,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,Jo(null,i),i=t.child,o=e.child.memoizedState,o===null?o=wf(n):(s=o.cachePool,s!==null?(l=Ye._currentValue,s=s.parent!==l?{parent:l,pool:l}:s):s=ry(),o={baseLanes:o.baseLanes|n,cachePool:s}),i.memoizedState=o,i.childLanes=Cf(e,r,n),t.memoizedState=Af,Jo(e.child,i)):(Ls(t),n=e.child,e=n.sibling,n=rs(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function xp(e,t){return t=mu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function mu(e,t){return e=Bn(22,e,null,t),e.lanes=0,e}function Rf(e,t,n){return Oa(t,e.child,null,n),e=xp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Bv(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),op(e.return,t,n)}function Df(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function $y(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=Ve.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,be(Ve,r),cn(e,t,i,n),i=$t?pl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Bv(e,n,t);else if(e.tag===19)Bv(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&hu(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Df(t,!1,s,n,a,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&hu(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Df(t,!0,n,null,a,i);break;case"together":Df(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function ds(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$s|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Kr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=rs(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=rs(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ym(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&lu(e)))}function tE(e,t,n){switch(t.tag){case 3:eu(t,t.stateNode.containerInfo),Us(t,Ye,e.memoizedState.cache),La();break;case 27:case 5:Zf(t);break;case 4:eu(t,t.stateNode.containerInfo);break;case 10:Us(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fp(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Ls(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Ky(e,t,n):(Ls(t),e=ds(e,t,n),e!==null?e.sibling:null);Ls(t);break;case 19:var s=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Kr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return $y(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),be(Ve,Ve.current),i)break;return null;case 22:return t.lanes=0,Qy(e,t,n,t.pendingProps);case 24:Us(t,Ye,e.memoizedState.cache)}return ds(e,t,n)}function tx(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ze=!0;else{if(!ym(e,n)&&(t.flags&128)===0)return Ze=!1,tE(e,t,n);Ze=(e.flags&131072)!==0}else Ze=!1,$t&&(t.flags&1048576)!==0&&iy(t,pl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Aa(t.elementType),t.type=e,typeof e=="function")Qp(e)?(i=Ba(e,i),t.tag=1,t=Ov(null,t,e,i,n)):(t.tag=0,t=yp(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Bp){t.tag=11,t=Dv(null,t,e,i,n);break t}else if(s===Fp){t.tag=14,t=Nv(null,t,e,i,n);break t}}throw t=qf(e)||e,Error(j(306,t,""))}}return t;case 0:return yp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Ba(i,t.pendingProps),Ov(e,t,i,s,n);case 3:t:{if(eu(t,t.stateNode.containerInfo),e===null)throw Error(j(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,up(e,t),il(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Us(t,Ye,i),i!==a.cache&&lp(t,[Ye],n,!0),nl(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Pv(e,t,i,n);break t}else if(i!==s){s=ai(Error(j(424)),t),ml(s),t=Pv(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,we=li(e.firstChild),hn=t,$t=!0,Gs=null,ri=!0,n=cy(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(La(),i===s){t=ds(e,t,n);break t}cn(e,t,i,n)}t=t.child}return t;case 26:return Zc(e,t),e===null?(n=a_(t.type,null,t.pendingProps,null))?t.memoizedState=n:$t||(n=t.type,e=t.pendingProps,i=Mu(Vs.current).createElement(n),i[un]=t,i[Dn]=e,fn(i,n,e),sn(i),t.stateNode=i):t.memoizedState=a_(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Zf(t),e===null&&$t&&(i=t.stateNode=Xx(t.type,t.pendingProps,Vs.current),hn=t,ri=!0,s=we,ea(t.type)?(Ip=s,we=li(i.firstChild)):we=s),cn(e,t,t.pendingProps.children,n),Zc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&$t&&((s=i=we)&&(i=CE(i,t.type,t.pendingProps,ri),i!==null?(t.stateNode=i,hn=t,we=li(i.firstChild),ri=!1,s=!0):s=!1),s||Qs(t)),Zf(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Dp(s,a)?i=null:r!==null&&Dp(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=rm(e,t,W1,null,null,n),Sl._currentValue=s),Zc(e,t),cn(e,t,i,n),t.child;case 6:return e===null&&$t&&((e=n=we)&&(n=RE(n,t.pendingProps,ri),n!==null?(t.stateNode=n,hn=t,we=null,e=!0):e=!1),e||Qs(t)),null;case 13:return Ky(e,t,n);case 4:return eu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Oa(t,null,i,n):cn(e,t,i,n),t.child;case 11:return Dv(e,t,t.type,t.pendingProps,n);case 7:return cn(e,t,t.pendingProps,n),t.child;case 8:return cn(e,t,t.pendingProps.children,n),t.child;case 12:return cn(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,Us(t,t.type,i.value),cn(e,t,i.children,n),t.child;case 9:return s=t.type._context,i=t.pendingProps.children,Ia(t),s=dn(s),i=i(s),t.flags|=1,cn(e,t,i,n),t.child;case 14:return Nv(e,t,t.type,t.pendingProps,n);case 15:return jy(e,t,t.type,t.pendingProps,n);case 19:return $y(e,t,n);case 31:return $1(e,t,n);case 22:return Qy(e,t,n,t.pendingProps);case 24:return Ia(t),i=dn(Ye),e===null?(s=em(),s===null&&(s=ye,a=tm(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},im(t),Us(t,Ye,s)):((e.lanes&n)!==0&&(up(e,t),il(t,null,null,n),nl()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),Us(t,Ye,i)):(i=a.cache,Us(t,Ye,i),i!==s.cache&&lp(t,[Ye],n,!0))),cn(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(j(156,t.tag))}function Qi(e){e.flags|=4}function Nf(e,t,n,i,s){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(Ex())e.flags|=8192;else throw Na=cu,nm}else e.flags&=-16777217}function Fv(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yx(t))if(Ex())e.flags|=8192;else throw Na=cu,nm}function Uc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?T_():536870912,e.lanes|=t,Wr|=t)}function Go(e,t){if(!$t)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Ae(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&65011712,i|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function eE(e,t,n){var i=t.pendingProps;switch($p(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ae(t),null;case 1:return Ae(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),os(Ye),zr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(gr(t)?Qi(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,bf())),Ae(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(Qi(t),a!==null?(Ae(t),Fv(t,a)):(Ae(t),Nf(t,s,null,i,n))):a?a!==e.memoizedState?(Qi(t),Ae(t),Fv(t,a)):(Ae(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Qi(t),Ae(t),Nf(t,s,e,i,n)),null;case 27:if(nu(t),n=Vs.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Qi(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Ae(t),null}e=Li.current,gr(t)?fv(t,e):(e=Xx(s,i,n),t.stateNode=e,Qi(t))}return Ae(t),null;case 5:if(nu(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Qi(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Ae(t),null}if(a=Li.current,gr(t))fv(t,a);else{var r=Mu(Vs.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[un]=t,a[Dn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(fn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Qi(t)}}return Ae(t),Nf(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Qi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(j(166));if(e=Vs.current,gr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=hn,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[un]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||Hx(e.nodeValue,n)),e||Qs(t,!0)}else e=Mu(e).createTextNode(i),e[un]=t,t.stateNode=e}return Ae(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=gr(t),n!==null){if(e===null){if(!i)throw Error(j(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(557));e[un]=t}else La(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ae(t),e=!1}else n=bf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Pn(t),t):(Pn(t),null);if((t.flags&128)!==0)throw Error(j(558))}return Ae(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=gr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(j(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(j(317));s[un]=t}else La(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ae(t),s=!1}else s=bf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Pn(t),t):(Pn(t),null)}return Pn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Uc(t,t.updateQueue),Ae(t),null);case 4:return zr(),e===null&&Am(t.stateNode.containerInfo),Ae(t),null;case 10:return os(t.type),Ae(t),null;case 19:if(an(Ve),i=t.memoizedState,i===null)return Ae(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Go(i,!1);else{if(Pe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=hu(e),a!==null){for(t.flags|=128,Go(i,!1),e=a.updateQueue,t.updateQueue=e,Uc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ey(n,e),n=n.sibling;return be(Ve,Ve.current&1|2),$t&&es(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&zn()>vu&&(t.flags|=128,s=!0,Go(i,!1),t.lanes=4194304)}else{if(!s)if(e=hu(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Uc(t,e),Go(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!$t)return Ae(t),null}else 2*zn()-i.renderingStartTime>vu&&n!==536870912&&(t.flags|=128,s=!0,Go(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=zn(),e.sibling=null,n=Ve.current,be(Ve,s?n&1|2:n&1),$t&&es(t,i.treeForkCount),e):(Ae(t),null);case 22:case 23:return Pn(t),sm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ae(t),t.subtreeFlags&6&&(t.flags|=8192)):Ae(t),n=t.updateQueue,n!==null&&Uc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&an(Da),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),os(Ye),Ae(t),null;case 25:return null;case 30:return null}throw Error(j(156,t.tag))}function nE(e,t){switch($p(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return os(Ye),zr(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return nu(t),null;case 31:if(t.memoizedState!==null){if(Pn(t),t.alternate===null)throw Error(j(340));La()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Pn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));La()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return an(Ve),null;case 4:return zr(),null;case 10:return os(t.type),null;case 22:case 23:return Pn(t),sm(),e!==null&&an(Da),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return os(Ye),null;case 25:return null;default:return null}}function ex(e,t){switch($p(t),t.tag){case 3:os(Ye),zr();break;case 26:case 27:case 5:nu(t);break;case 4:zr();break;case 31:t.memoizedState!==null&&Pn(t);break;case 13:Pn(t);break;case 19:an(Ve);break;case 10:os(t.type);break;case 22:case 23:Pn(t),sm(),e!==null&&an(Da);break;case 24:os(Ye)}}function Ul(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){de(t,t.return,o)}}function Ks(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(d){de(s,l,d)}}}i=i.next}while(i!==a)}}catch(d){de(t,t.return,d)}}function nx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{hy(t,n)}catch(i){de(e,e.return,i)}}}function ix(e,t,n){n.props=Ba(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){de(e,t,i)}}function al(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(s){de(e,t,s)}}function Ui(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){de(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){de(e,t,s)}else n.current=null}function sx(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){de(e,e.return,s)}}function Uf(e,t,n){try{var i=e.stateNode;bE(i,e.type,n,t),i[Dn]=t}catch(s){de(e,e.return,s)}}function ax(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ea(e.type)||e.tag===4}function Lf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||ax(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ea(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Sp(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ss));else if(i!==4&&(i===27&&ea(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Sp(e,t,n),e=e.sibling;e!==null;)Sp(e,t,n),e=e.sibling}function gu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&ea(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(gu(e,t,n),e=e.sibling;e!==null;)gu(e,t,n),e=e.sibling}function rx(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);fn(t,i,n),t[un]=e,t[Dn]=n}catch(a){de(e,e.return,a)}}var ns=!1,qe=!1,If=!1,zv=typeof WeakSet=="function"?WeakSet:Set,nn=null;function iE(e,t){if(e=e.containerInfo,Cp=wu,e=Y_(e),Zp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var s=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,d=0,p=e,u=null;e:for(;;){for(var f;p!==n||s!==0&&p.nodeType!==3||(o=r+s),p!==a||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(f=p.firstChild)!==null;)u=p,p=f;for(;;){if(p===e)break e;if(u===n&&++c===s&&(o=r),u===a&&++d===i&&(l=r),(f=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=f}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Rp={focusedElem:e,selectionRange:n},wu=!1,nn=t;nn!==null;)if(t=nn,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,nn=e;else for(;nn!==null;){switch(t=nn,a=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)s=e[n],s.ref.impl=s.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&a!==null){e=void 0,n=t,s=a.memoizedProps,a=a.memoizedState,i=n.stateNode;try{var v=Ba(n.type,s);e=i.getSnapshotBeforeUpdate(v,a),i.__reactInternalSnapshotBeforeUpdate=e}catch(b){de(n,n.return,b)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Np(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Np(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(j(163))}if(e=t.sibling,e!==null){e.return=t.return,nn=e;break}nn=t.return}}function ox(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:$i(e,n),i&4&&Ul(5,n);break;case 1:if($i(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){de(n,n.return,r)}else{var s=Ba(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){de(n,n.return,r)}}i&64&&nx(n),i&512&&al(n,n.return);break;case 3:if($i(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{hy(e,t)}catch(r){de(n,n.return,r)}}break;case 27:t===null&&i&4&&rx(n);case 26:case 5:$i(e,n),t===null&&i&4&&sx(n),i&512&&al(n,n.return);break;case 12:$i(e,n);break;case 31:$i(e,n),i&4&&ux(e,n);break;case 13:$i(e,n),i&4&&hx(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=dE.bind(null,n),DE(e,n))));break;case 22:if(i=n.memoizedState!==null||ns,!i){t=t!==null&&t.memoizedState!==null||qe,s=ns;var a=qe;ns=i,(qe=t)&&!a?ts(e,n,(n.subtreeFlags&8772)!==0):$i(e,n),ns=s,qe=a}break;case 30:break;default:$i(e,n)}}function lx(e){var t=e.alternate;t!==null&&(e.alternate=null,lx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Gp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ue=null,wn=!1;function Ki(e,t,n){for(n=n.child;n!==null;)cx(e,t,n),n=n.sibling}function cx(e,t,n){if(Hn&&typeof Hn.onCommitFiberUnmount=="function")try{Hn.onCommitFiberUnmount(Tl,n)}catch{}switch(n.tag){case 26:qe||Ui(n,t),Ki(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:qe||Ui(n,t);var i=Ue,s=wn;ea(n.type)&&(Ue=n.stateNode,wn=!1),Ki(e,t,n),cl(n.stateNode),Ue=i,wn=s;break;case 5:qe||Ui(n,t);case 6:if(i=Ue,s=wn,Ue=null,Ki(e,t,n),Ue=i,wn=s,Ue!==null)if(wn)try{(Ue.nodeType===9?Ue.body:Ue.nodeName==="HTML"?Ue.ownerDocument.body:Ue).removeChild(n.stateNode)}catch(a){de(n,t,a)}else try{Ue.removeChild(n.stateNode)}catch(a){de(n,t,a)}break;case 18:Ue!==null&&(wn?(e=Ue,t_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Jr(e)):t_(Ue,n.stateNode));break;case 4:i=Ue,s=wn,Ue=n.stateNode.containerInfo,wn=!0,Ki(e,t,n),Ue=i,wn=s;break;case 0:case 11:case 14:case 15:Ks(2,n,t),qe||Ks(4,n,t),Ki(e,t,n);break;case 1:qe||(Ui(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&ix(n,t,i)),Ki(e,t,n);break;case 21:Ki(e,t,n);break;case 22:qe=(i=qe)||n.memoizedState!==null,Ki(e,t,n),qe=i;break;default:Ki(e,t,n)}}function ux(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Jr(e)}catch(n){de(t,t.return,n)}}}function hx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Jr(e)}catch(n){de(t,t.return,n)}}function sE(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new zv),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new zv),t;default:throw Error(j(435,e.tag))}}function Lc(e,t){var n=sE(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=fE.bind(null,e,i);i.then(s,s)}})}function Tn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i],a=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(ea(o.type)){Ue=o.stateNode,wn=!1;break t}break;case 5:Ue=o.stateNode,wn=!1;break t;case 3:case 4:Ue=o.stateNode.containerInfo,wn=!0;break t}o=o.return}if(Ue===null)throw Error(j(160));cx(a,r,s),Ue=null,wn=!1,a=s.alternate,a!==null&&(a.return=null),s.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)dx(t,e),t=t.sibling}var gi=null;function dx(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tn(t,e),An(e),i&4&&(Ks(3,e,e.return),Ul(3,e),Ks(5,e,e.return));break;case 1:Tn(t,e),An(e),i&512&&(qe||n===null||Ui(n,n.return)),i&64&&ns&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var s=gi;if(Tn(t,e),An(e),i&512&&(qe||n===null||Ui(n,n.return)),i&4){var a=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,s=s.ownerDocument||s;e:switch(i){case"title":a=s.getElementsByTagName("title")[0],(!a||a[Cl]||a[un]||a.namespaceURI==="http://www.w3.org/2000/svg"||a.hasAttribute("itemprop"))&&(a=s.createElement(i),s.head.insertBefore(a,s.querySelector("head > title"))),fn(a,i,n),a[un]=e,sn(a),i=a;break t;case"link":var r=o_("link","href",s).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(a=r[o],a.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&a.getAttribute("rel")===(n.rel==null?null:n.rel)&&a.getAttribute("title")===(n.title==null?null:n.title)&&a.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}a=s.createElement(i),fn(a,i,n),s.head.appendChild(a);break;case"meta":if(r=o_("meta","content",s).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(a=r[o],a.getAttribute("content")===(n.content==null?null:""+n.content)&&a.getAttribute("name")===(n.name==null?null:n.name)&&a.getAttribute("property")===(n.property==null?null:n.property)&&a.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}a=s.createElement(i),fn(a,i,n),s.head.appendChild(a);break;default:throw Error(j(468,i))}a[un]=e,sn(a),i=a}e.stateNode=i}else l_(s,e.type,e.stateNode);else e.stateNode=r_(s,i,e.memoizedProps);else a!==i?(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,i===null?l_(s,e.type,e.stateNode):r_(s,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Uf(e,e.memoizedProps,n.memoizedProps)}break;case 27:Tn(t,e),An(e),i&512&&(qe||n===null||Ui(n,n.return)),n!==null&&i&4&&Uf(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Tn(t,e),An(e),i&512&&(qe||n===null||Ui(n,n.return)),e.flags&32){s=e.stateNode;try{Vr(s,"")}catch(v){de(e,e.return,v)}}i&4&&e.stateNode!=null&&(s=e.memoizedProps,Uf(e,s,n!==null?n.memoizedProps:s)),i&1024&&(If=!0);break;case 6:if(Tn(t,e),An(e),i&4){if(e.stateNode===null)throw Error(j(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(v){de(e,e.return,v)}}break;case 3:if(Qc=null,s=gi,gi=Eu(t.containerInfo),Tn(t,e),gi=s,An(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Jr(t.containerInfo)}catch(v){de(e,e.return,v)}If&&(If=!1,fx(e));break;case 4:i=gi,gi=Eu(e.stateNode.containerInfo),Tn(t,e),An(e),gi=i;break;case 12:Tn(t,e),An(e);break;case 31:Tn(t,e),An(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Lc(e,i)));break;case 13:Tn(t,e),An(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Hu=zn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Lc(e,i)));break;case 22:s=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=ns,d=qe;if(ns=c||s,qe=d||l,Tn(t,e),qe=d,ns=c,An(e),i&8192)t:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(n===null||l||ns||qe||wa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,s)r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(v){de(l,l.return,v)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=s?"":l.memoizedProps}catch(v){de(l,l.return,v)}}}else if(t.tag===18){if(n===null){l=t;try{var f=l.stateNode;s?e_(f,!0):e_(l.stateNode,!1)}catch(v){de(l,l.return,v)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Lc(e,n))));break;case 19:Tn(t,e),An(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Lc(e,i)));break;case 30:break;case 21:break;default:Tn(t,e),An(e)}}function An(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(ax(i)){n=i;break}i=i.return}if(n==null)throw Error(j(160));switch(n.tag){case 27:var s=n.stateNode,a=Lf(e);gu(e,a,s);break;case 5:var r=n.stateNode;n.flags&32&&(Vr(r,""),n.flags&=-33);var o=Lf(e);gu(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Lf(e);Sp(e,c,l);break;default:throw Error(j(161))}}catch(d){de(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function fx(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;fx(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function $i(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ox(e,t.alternate,t),t=t.sibling}function wa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ks(4,t,t.return),wa(t);break;case 1:Ui(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&ix(t,t.return,n),wa(t);break;case 27:cl(t.stateNode);case 26:case 5:Ui(t,t.return),wa(t);break;case 22:t.memoizedState===null&&wa(t);break;case 30:wa(t);break;default:wa(t)}e=e.sibling}}function ts(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags;switch(a.tag){case 0:case 11:case 15:ts(s,a,n),Ul(4,a);break;case 1:if(ts(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){de(i,i.return,c)}if(i=a,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)uy(l[s],o)}catch(c){de(i,i.return,c)}}n&&r&64&&nx(a),al(a,a.return);break;case 27:rx(a);case 26:case 5:ts(s,a,n),n&&i===null&&r&4&&sx(a),al(a,a.return);break;case 12:ts(s,a,n);break;case 31:ts(s,a,n),n&&r&4&&ux(s,a);break;case 13:ts(s,a,n),n&&r&4&&hx(s,a);break;case 22:a.memoizedState===null&&ts(s,a,n),al(a,a.return);break;case 30:break;default:ts(s,a,n)}t=t.sibling}}function xm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Dl(n))}function Sm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Dl(e))}function mi(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)px(e,t,n,i),t=t.sibling}function px(e,t,n,i){var s=t.flags;switch(t.tag){case 0:case 11:case 15:mi(e,t,n,i),s&2048&&Ul(9,t);break;case 1:mi(e,t,n,i);break;case 3:mi(e,t,n,i),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Dl(e)));break;case 12:if(s&2048){mi(e,t,n,i),e=t.stateNode;try{var a=t.memoizedProps,r=a.id,o=a.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){de(t,t.return,l)}}else mi(e,t,n,i);break;case 31:mi(e,t,n,i);break;case 13:mi(e,t,n,i);break;case 23:break;case 22:a=t.stateNode,r=t.alternate,t.memoizedState!==null?a._visibility&2?mi(e,t,n,i):rl(e,t):a._visibility&2?mi(e,t,n,i):(a._visibility|=2,_r(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),s&2048&&xm(r,t);break;case 24:mi(e,t,n,i),s&2048&&Sm(t.alternate,t);break;default:mi(e,t,n,i)}}function _r(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:_r(a,r,o,l,s),Ul(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?_r(a,r,o,l,s):rl(a,r):(d._visibility|=2,_r(a,r,o,l,s)),s&&c&2048&&xm(r.alternate,r);break;case 24:_r(a,r,o,l,s),s&&c&2048&&Sm(r.alternate,r);break;default:_r(a,r,o,l,s)}t=t.sibling}}function rl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:rl(n,i),s&2048&&xm(i.alternate,i);break;case 24:rl(n,i),s&2048&&Sm(i.alternate,i);break;default:rl(n,i)}t=t.sibling}}var jo=8192;function vr(e,t,n){if(e.subtreeFlags&jo)for(e=e.child;e!==null;)mx(e,t,n),e=e.sibling}function mx(e,t,n){switch(e.tag){case 26:vr(e,t,n),e.flags&jo&&e.memoizedState!==null&&GE(n,gi,e.memoizedState,e.memoizedProps);break;case 5:vr(e,t,n);break;case 3:case 4:var i=gi;gi=Eu(e.stateNode.containerInfo),vr(e,t,n),gi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=jo,jo=16777216,vr(e,t,n),jo=i):vr(e,t,n));break;default:vr(e,t,n)}}function gx(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ko(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];nn=i,_x(i,e)}gx(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)vx(e),e=e.sibling}function vx(e){switch(e.tag){case 0:case 11:case 15:ko(e),e.flags&2048&&Ks(9,e,e.return);break;case 3:ko(e);break;case 12:ko(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Jc(e)):ko(e);break;default:ko(e)}}function Jc(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];nn=i,_x(i,e)}gx(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ks(8,t,t.return),Jc(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Jc(t));break;default:Jc(t)}e=e.sibling}}function _x(e,t){for(;nn!==null;){var n=nn;switch(n.tag){case 0:case 11:case 15:Ks(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Dl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,nn=i;else t:for(n=e;nn!==null;){i=nn;var s=i.sibling,a=i.return;if(lx(i),i===n){nn=null;break t}if(s!==null){s.return=a,nn=s;break t}nn=a}}}var aE={getCacheForType:function(e){var t=dn(Ye),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return dn(Ye).controller.signal}},rE=typeof WeakMap=="function"?WeakMap:Map,ae=0,ye=null,jt=null,Kt=0,he=0,On=null,Fs=!1,to=!1,bm=!1,fs=0,Pe=0,$s=0,Ua=0,Mm=0,Fn=0,Wr=0,ol=null,Cn=null,bp=!1,Hu=0,yx=0,vu=1/0,_u=null,Ws=null,je=0,qs=null,qr=null,ls=0,Mp=0,Ep=null,xx=null,ll=0,Tp=null;function Gn(){return(ae&2)!==0&&Kt!==0?Kt&-Kt:It.T!==null?Tm():R_()}function Sx(){if(Fn===0)if((Kt&536870912)===0||$t){var e=Mc;Mc<<=1,(Mc&3932160)===0&&(Mc=262144),Fn=e}else Fn=536870912;return e=Xn.current,e!==null&&(e.flags|=32),Fn}function Rn(e,t,n){(e===ye&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(Yr(e,0),zs(e,Kt,Fn,!1)),wl(e,n),((ae&2)===0||e!==ye)&&(e===ye&&((ae&2)===0&&(Ua|=n),Pe===4&&zs(e,Kt,Fn,!1)),Oi(e))}function bx(e,t,n){if((ae&6)!==0)throw Error(j(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Al(e,t),s=i?cE(e,t):Of(e,t,!0),a=i;do{if(s===0){to&&!i&&zs(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!oE(n)){s=Of(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=ol;var l=o.current.memoizedState.isDehydrated;if(l&&(Yr(o,r).flags|=256),r=Of(o,r,!1),r!==2){if(bm&&!l){o.errorRecoveryDisabledLanes|=a,Ua|=a,s=4;break t}a=Cn,Cn=s,a!==null&&(Cn===null?Cn=a:Cn.push.apply(Cn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Yr(e,0),zs(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(j(345));case 4:if((t&4194048)!==t)break;case 6:zs(i,t,Fn,!Fs);break t;case 2:Cn=null;break;case 3:case 5:break;default:throw Error(j(329))}if((t&62914560)===t&&(s=Hu+300-zn(),10<s)){if(zs(i,t,Fn,!Fs),Ru(i,0,!0)!==0)break t;ls=t,i.timeoutHandle=Gx(Hv.bind(null,i,n,Cn,_u,bp,t,Fn,Ua,Wr,Fs,a,"Throttled",-0,0),s);break t}Hv(i,n,Cn,_u,bp,t,Fn,Ua,Wr,Fs,a,null,-0,0)}}break}while(!0);Oi(e)}function Hv(e,t,n,i,s,a,r,o,l,c,d,p,u,f){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ss},mx(t,a,p);var v=(a&62914560)===a?Hu-zn():(a&4194048)===a?yx-zn():0;if(v=kE(p,v),v!==null){ls=a,e.cancelPendingCommit=v(Gv.bind(null,e,t,a,n,i,s,r,o,l,d,p,null,u,f)),zs(e,a,r,!c);return}}Gv(e,t,a,n,i,s,r,o,l)}function oE(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!kn(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function zs(e,t,n,i){t&=~Mm,t&=~Ua,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-Vn(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&A_(e,n,t)}function Vu(){return(ae&6)===0?(Ll(0,!1),!1):!0}function Em(){if(jt!==null){if(he===0)var e=jt.return;else e=jt,as=Ga=null,cm(e),Pr=null,gl=0,e=jt;for(;e!==null;)ex(e.alternate,e),e=e.return;jt=null}}function Yr(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,TE(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ls=0,Em(),ye=e,jt=n=rs(e.current,null),Kt=t,he=0,On=null,Fs=!1,to=Al(e,t),bm=!1,Wr=Fn=Mm=Ua=$s=Pe=0,Cn=ol=null,bp=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var s=31-Vn(i),a=1<<s;t|=e[s],i&=~a}return fs=t,Lu(),n}function Mx(e,t){Gt=null,It.H=_l,t===$r||t===Ou?(t=_v(),he=3):t===nm?(t=_v(),he=4):he=t===_m?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,On=t,jt===null&&(Pe=1,pu(e,ai(t,e.current)))}function Ex(){var e=Xn.current;return e===null?!0:(Kt&4194048)===Kt?oi===null:(Kt&62914560)===Kt||(Kt&536870912)!==0?e===oi:!1}function Tx(){var e=It.H;return It.H=_l,e===null?_l:e}function Ax(){var e=It.A;return It.A=aE,e}function yu(){Pe=4,Fs||(Kt&4194048)!==Kt&&Xn.current!==null||(to=!0),($s&134217727)===0&&(Ua&134217727)===0||ye===null||zs(ye,Kt,Fn,!1)}function Of(e,t,n){var i=ae;ae|=2;var s=Tx(),a=Ax();(ye!==e||Kt!==t)&&(_u=null,Yr(e,t)),t=!1;var r=Pe;t:do try{if(he!==0&&jt!==null){var o=jt,l=On;switch(he){case 8:Em(),r=6;break t;case 3:case 2:case 9:case 6:Xn.current===null&&(t=!0);var c=he;if(he=0,On=null,Nr(e,o,l,c),n&&to){r=0;break t}break;default:c=he,he=0,On=null,Nr(e,o,l,c)}}lE(),r=Pe;break}catch(d){Mx(e,d)}while(!0);return t&&e.shellSuspendCounter++,as=Ga=null,ae=i,It.H=s,It.A=a,jt===null&&(ye=null,Kt=0,Lu()),r}function lE(){for(;jt!==null;)wx(jt)}function cE(e,t){var n=ae;ae|=2;var i=Tx(),s=Ax();ye!==e||Kt!==t?(_u=null,vu=zn()+500,Yr(e,t)):to=Al(e,t);t:do try{if(he!==0&&jt!==null){t=jt;var a=On;e:switch(he){case 1:he=0,On=null,Nr(e,t,a,1);break;case 2:case 9:if(vv(a)){he=0,On=null,Vv(t);break}t=function(){he!==2&&he!==9||ye!==e||(he=7),Oi(e)},a.then(t,t);break t;case 3:he=7;break t;case 4:he=5;break t;case 7:vv(a)?(he=0,On=null,Vv(t)):(he=0,On=null,Nr(e,t,a,7));break;case 5:var r=null;switch(jt.tag){case 26:r=jt.memoizedState;case 5:case 27:var o=jt;if(r?Yx(r):o.stateNode.complete){he=0,On=null;var l=o.sibling;if(l!==null)jt=l;else{var c=o.return;c!==null?(jt=c,Gu(c)):jt=null}break e}}he=0,On=null,Nr(e,t,a,5);break;case 6:he=0,On=null,Nr(e,t,a,6);break;case 8:Em(),Pe=6;break t;default:throw Error(j(462))}}uE();break}catch(d){Mx(e,d)}while(!0);return as=Ga=null,It.H=i,It.A=s,ae=n,jt!==null?0:(ye=null,Kt=0,Lu(),Pe)}function uE(){for(;jt!==null&&!LM();)wx(jt)}function wx(e){var t=tx(e.alternate,e,fs);e.memoizedProps=e.pendingProps,t===null?Gu(e):jt=t}function Vv(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Iv(n,t,t.pendingProps,t.type,void 0,Kt);break;case 11:t=Iv(n,t,t.pendingProps,t.type.render,t.ref,Kt);break;case 5:cm(t);default:ex(n,t),t=jt=ey(t,fs),t=tx(n,t,fs)}e.memoizedProps=e.pendingProps,t===null?Gu(e):jt=t}function Nr(e,t,n,i){as=Ga=null,cm(t),Pr=null,gl=0;var s=t.return;try{if(K1(e,s,t,n,Kt)){Pe=1,pu(e,ai(n,e.current)),jt=null;return}}catch(a){if(s!==null)throw jt=s,a;Pe=1,pu(e,ai(n,e.current)),jt=null;return}t.flags&32768?($t||i===1?e=!0:to||(Kt&536870912)!==0?e=!1:(Fs=e=!0,(i===2||i===9||i===3||i===6)&&(i=Xn.current,i!==null&&i.tag===13&&(i.flags|=16384))),Cx(t,e)):Gu(t)}function Gu(e){var t=e;do{if((t.flags&32768)!==0){Cx(t,Fs);return}e=t.return;var n=eE(t.alternate,t,fs);if(n!==null){jt=n;return}if(t=t.sibling,t!==null){jt=t;return}jt=t=e}while(t!==null);Pe===0&&(Pe=5)}function Cx(e,t){do{var n=nE(e.alternate,e);if(n!==null){n.flags&=32767,jt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){jt=e;return}jt=e=n}while(e!==null);Pe=6,jt=null}function Gv(e,t,n,i,s,a,r,o,l){e.cancelPendingCommit=null;do ku();while(je!==0);if((ae&6)!==0)throw Error(j(327));if(t!==null){if(t===e.current)throw Error(j(177));if(a=t.lanes|t.childLanes,a|=Jp,kM(e,n,a,r,o,l),e===ye&&(jt=ye=null,Kt=0),qr=t,qs=e,ls=n,Mp=a,Ep=s,xx=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,pE(iu,function(){return Lx(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=It.T,It.T=null,s=re.p,re.p=2,r=ae,ae|=4;try{iE(e,t,n)}finally{ae=r,re.p=s,It.T=i}}je=1,Rx(),Dx(),Nx()}}function Rx(){if(je===1){je=0;var e=qs,t=qr,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=It.T,It.T=null;var i=re.p;re.p=2;var s=ae;ae|=4;try{dx(t,e);var a=Rp,r=Y_(e.containerInfo),o=a.focusedElem,l=a.selectionRange;if(r!==o&&o&&o.ownerDocument&&q_(o.ownerDocument.documentElement,o)){if(l!==null&&Zp(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var f=u.getSelection(),v=o.textContent.length,b=Math.min(l.start,v),g=l.end===void 0?b:Math.min(l.end,v);!f.extend&&b>g&&(r=g,g=b,b=r);var h=uv(o,b),m=uv(o,g);if(h&&m&&(f.rangeCount!==1||f.anchorNode!==h.node||f.anchorOffset!==h.offset||f.focusNode!==m.node||f.focusOffset!==m.offset)){var _=p.createRange();_.setStart(h.node,h.offset),f.removeAllRanges(),b>g?(f.addRange(_),f.extend(m.node,m.offset)):(_.setEnd(m.node,m.offset),f.addRange(_))}}}}for(p=[],f=o;f=f.parentNode;)f.nodeType===1&&p.push({element:f,left:f.scrollLeft,top:f.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var S=p[o];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}wu=!!Cp,Rp=Cp=null}finally{ae=s,re.p=i,It.T=n}}e.current=t,je=2}}function Dx(){if(je===2){je=0;var e=qs,t=qr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=It.T,It.T=null;var i=re.p;re.p=2;var s=ae;ae|=4;try{ox(e,t.alternate,t)}finally{ae=s,re.p=i,It.T=n}}je=3}}function Nx(){if(je===4||je===3){je=0,IM();var e=qs,t=qr,n=ls,i=xx;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?je=5:(je=0,qr=qs=null,Ux(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(Ws=null),Vp(n),t=t.stateNode,Hn&&typeof Hn.onCommitFiberRoot=="function")try{Hn.onCommitFiberRoot(Tl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=It.T,s=re.p,re.p=2,It.T=null;try{for(var a=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];a(o.value,{componentStack:o.stack})}}finally{It.T=t,re.p=s}}(ls&3)!==0&&ku(),Oi(e),s=e.pendingLanes,(n&261930)!==0&&(s&42)!==0?e===Tp?ll++:(ll=0,Tp=e):ll=0,Ll(0,!1)}}function Ux(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Dl(t)))}function ku(){return Rx(),Dx(),Nx(),Lx()}function Lx(){if(je!==5)return!1;var e=qs,t=Mp;Mp=0;var n=Vp(ls),i=It.T,s=re.p;try{re.p=32>n?32:n,It.T=null,n=Ep,Ep=null;var a=qs,r=ls;if(je=0,qr=qs=null,ls=0,(ae&6)!==0)throw Error(j(331));var o=ae;if(ae|=4,vx(a.current),px(a,a.current,r,n),ae=o,Ll(0,!1),Hn&&typeof Hn.onPostCommitFiberRoot=="function")try{Hn.onPostCommitFiberRoot(Tl,a)}catch{}return!0}finally{re.p=s,It.T=i,Ux(e,t)}}function kv(e,t,n){t=ai(n,t),t=_p(e.stateNode,t,2),e=Xs(e,t,2),e!==null&&(wl(e,2),Oi(e))}function de(e,t,n){if(e.tag===3)kv(e,e,n);else for(;t!==null;){if(t.tag===3){kv(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ws===null||!Ws.has(i))){e=ai(n,e),n=Zy(2),i=Xs(t,n,2),i!==null&&(Jy(n,i,t,e),wl(i,2),Oi(i));break}}t=t.return}}function Pf(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new rE;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(bm=!0,s.add(n),e=hE.bind(null,e,t,n),t.then(e,e))}function hE(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ye===e&&(Kt&n)===n&&(Pe===4||Pe===3&&(Kt&62914560)===Kt&&300>zn()-Hu?(ae&2)===0&&Yr(e,0):Mm|=n,Wr===Kt&&(Wr=0)),Oi(e)}function Ix(e,t){t===0&&(t=T_()),e=Va(e,t),e!==null&&(wl(e,t),Oi(e))}function dE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ix(e,n)}function fE(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(j(314))}i!==null&&i.delete(t),Ix(e,n)}function pE(e,t){return zp(e,t)}var xu=null,yr=null,Ap=!1,Su=!1,Bf=!1,Hs=0;function Oi(e){e!==yr&&e.next===null&&(yr===null?xu=yr=e:yr=yr.next=e),Su=!0,Ap||(Ap=!0,gE())}function Ll(e,t){if(!Bf&&Su){Bf=!0;do for(var n=!1,i=xu;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-Vn(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Xv(i,a))}else a=Kt,a=Ru(i,i===ye?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||Al(i,a)||(n=!0,Xv(i,a));i=i.next}while(n);Bf=!1}}function mE(){Ox()}function Ox(){Su=Ap=!1;var e=0;Hs!==0&&EE()&&(e=Hs);for(var t=zn(),n=null,i=xu;i!==null;){var s=i.next,a=Px(i,t);a===0?(i.next=null,n===null?xu=s:n.next=s,s===null&&(yr=n)):(n=i,(e!==0||(a&3)!==0)&&(Su=!0)),i=s}je!==0&&je!==5||Ll(e,!1),Hs!==0&&(Hs=0)}function Px(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-Vn(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=GM(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=ye,n=Kt,n=Ru(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&df(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Al(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&df(i),Vp(n)){case 2:case 8:n=M_;break;case 32:n=iu;break;case 268435456:n=E_;break;default:n=iu}return i=Bx.bind(null,e),n=zp(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&df(i),e.callbackPriority=2,e.callbackNode=null,2}function Bx(e,t){if(je!==0&&je!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ku()&&e.callbackNode!==n)return null;var i=Kt;return i=Ru(e,e===ye?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(bx(e,i,t),Px(e,zn()),e.callbackNode!=null&&e.callbackNode===n?Bx.bind(null,e):null)}function Xv(e,t){if(ku())return null;bx(e,t,!0)}function gE(){AE(function(){(ae&6)!==0?zp(b_,mE):Ox()})}function Tm(){if(Hs===0){var e=Gr;e===0&&(e=bc,bc<<=1,(bc&261888)===0&&(bc=256)),Hs=e}return Hs}function Wv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Hc(""+e)}function qv(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function vE(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=Wv((s[Dn]||null).action),r=i.submitter;r&&(t=(t=r[Dn]||null)?Wv(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Du("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Hs!==0){var l=r?qv(s,r):new FormData(s);gp(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=r?qv(s,r):new FormData(s),gp(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Ic=0;Ic<sp.length;Ic++)Oc=sp[Ic],Yv=Oc.toLowerCase(),Zv=Oc[0].toUpperCase()+Oc.slice(1),vi(Yv,"on"+Zv);var Oc,Yv,Zv,Ic;vi(J_,"onAnimationEnd");vi(j_,"onAnimationIteration");vi(Q_,"onAnimationStart");vi("dblclick","onDoubleClick");vi("focusin","onFocus");vi("focusout","onBlur");vi(O1,"onTransitionRun");vi(P1,"onTransitionStart");vi(B1,"onTransitionCancel");vi(K_,"onTransitionEnd");Hr("onMouseEnter",["mouseout","mouseover"]);Hr("onMouseLeave",["mouseout","mouseover"]);Hr("onPointerEnter",["pointerout","pointerover"]);Hr("onPointerLeave",["pointerout","pointerover"]);Fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_E=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yl));function Fx(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){au(d)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){au(d)}s.currentTarget=null,a=l}}}}function Jt(e,t){var n=t[jf];n===void 0&&(n=t[jf]=new Set);var i=e+"__bubble";n.has(i)||(zx(t,e,2,!1),n.add(i))}function Ff(e,t,n){var i=0;t&&(i|=4),zx(n,e,i,t)}var Pc="_reactListening"+Math.random().toString(36).slice(2);function Am(e){if(!e[Pc]){e[Pc]=!0,D_.forEach(function(n){n!=="selectionchange"&&(_E.has(n)||Ff(n,!1,e),Ff(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Pc]||(t[Pc]=!0,Ff("selectionchange",!1,t))}}function zx(e,t,n,i){switch(Kx(t)){case 2:var s=qE;break;case 8:s=YE;break;default:s=Dm}n=s.bind(null,t,n,e),s=void 0,!ep||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function zf(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=br(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}F_(function(){var c=a,d=Xp(n),p=[];t:{var u=$_.get(e);if(u!==void 0){var f=Du,v=e;switch(e){case"keypress":if(Gc(n)===0)break t;case"keydown":case"keyup":f=f1;break;case"focusin":v="focus",f=vf;break;case"focusout":v="blur",f=vf;break;case"beforeblur":case"afterblur":f=vf;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=ev;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=e1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=g1;break;case J_:case j_:case Q_:f=s1;break;case K_:f=_1;break;case"scroll":case"scrollend":f=$M;break;case"wheel":f=x1;break;case"copy":case"cut":case"paste":f=r1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=iv;break;case"toggle":case"beforetoggle":f=b1}var b=(t&4)!==0,g=!b&&(e==="scroll"||e==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var m=c,_;m!==null;){var S=m;if(_=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||_===null||h===null||(S=hl(m,h),S!=null&&b.push(xl(m,S,_))),g)break;m=m.return}0<b.length&&(u=new f(u,v,null,n,d),p.push({event:u,listeners:b}))}}if((t&7)===0){t:{if(u=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",u&&n!==tp&&(v=n.relatedTarget||n.fromElement)&&(br(v)||v[jr]))break t;if((f||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,f?(v=n.relatedTarget||n.toElement,f=c,v=v?br(v):null,v!==null&&(g=El(v),b=v.tag,v!==g||b!==5&&b!==27&&b!==6)&&(v=null)):(f=null,v=c),f!==v)){if(b=ev,S="onMouseLeave",h="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(b=iv,S="onPointerLeave",h="onPointerEnter",m="pointer"),g=f==null?u:Zo(f),_=v==null?u:Zo(v),u=new b(S,m+"leave",f,n,d),u.target=g,u.relatedTarget=_,S=null,br(d)===c&&(b=new b(h,m+"enter",v,n,d),b.target=_,b.relatedTarget=g,S=b),g=S,f&&v)e:{for(b=yE,h=f,m=v,_=0,S=h;S;S=b(S))_++;S=0;for(var T=m;T;T=b(T))S++;for(;0<_-S;)h=b(h),_--;for(;0<S-_;)m=b(m),S--;for(;_--;){if(h===m||m!==null&&h===m.alternate){b=h;break e}h=b(h),m=b(m)}b=null}else b=null;f!==null&&Jv(p,u,f,b,!1),v!==null&&g!==null&&Jv(p,g,v,b,!0)}}t:{if(u=c?Zo(c):window,f=u.nodeName&&u.nodeName.toLowerCase(),f==="select"||f==="input"&&u.type==="file")var C=ov;else if(rv(u))if(X_)C=U1;else{C=D1;var R=R1}else f=u.nodeName,!f||f.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&kp(c.elementType)&&(C=ov):C=N1;if(C&&(C=C(e,c))){k_(p,C,n,d);break t}R&&R(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&$f(u,"number",u.value)}switch(R=c?Zo(c):window,e){case"focusin":(rv(R)||R.contentEditable==="true")&&(Tr=R,np=c,$o=null);break;case"focusout":$o=np=Tr=null;break;case"mousedown":ip=!0;break;case"contextmenu":case"mouseup":case"dragend":ip=!1,hv(p,n,d);break;case"selectionchange":if(I1)break;case"keydown":case"keyup":hv(p,n,d)}var x;if(Yp)t:{switch(e){case"compositionstart":var M="onCompositionStart";break t;case"compositionend":M="onCompositionEnd";break t;case"compositionupdate":M="onCompositionUpdate";break t}M=void 0}else Er?V_(e,n)&&(M="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(M="onCompositionStart");M&&(H_&&n.locale!=="ko"&&(Er||M!=="onCompositionStart"?M==="onCompositionEnd"&&Er&&(x=z_()):(Bs=d,Wp="value"in Bs?Bs.value:Bs.textContent,Er=!0)),R=bu(c,M),0<R.length&&(M=new nv(M,e,null,n,d),p.push({event:M,listeners:R}),x?M.data=x:(x=G_(n),x!==null&&(M.data=x)))),(x=E1?T1(e,n):A1(e,n))&&(M=bu(c,"onBeforeInput"),0<M.length&&(R=new nv("onBeforeInput","beforeinput",null,n,d),p.push({event:R,listeners:M}),R.data=x)),vE(p,e,c,n,d)}Fx(p,t)})}function xl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function bu(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=hl(e,n),s!=null&&i.unshift(xl(e,s,a)),s=hl(e,t),s!=null&&i.push(xl(e,s,a))),e.tag===3)return i;e=e.return}return[]}function yE(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Jv(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=hl(n,a),c!=null&&r.unshift(xl(n,c,l))):s||(c=hl(n,a),c!=null&&r.push(xl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var xE=/\r\n?/g,SE=/\u0000|\uFFFD/g;function jv(e){return(typeof e=="string"?e:""+e).replace(xE,`
`).replace(SE,"")}function Hx(e,t){return t=jv(t),jv(e)===t}function ge(e,t,n,i,s,a){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Vr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Vr(e,""+i);break;case"className":Tc(e,"class",i);break;case"tabIndex":Tc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Tc(e,n,i);break;case"style":B_(e,i,a);break;case"data":if(t!=="object"){Tc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Hc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&ge(e,t,"name",s.name,s,null),ge(e,t,"formEncType",s.formEncType,s,null),ge(e,t,"formMethod",s.formMethod,s,null),ge(e,t,"formTarget",s.formTarget,s,null)):(ge(e,t,"encType",s.encType,s,null),ge(e,t,"method",s.method,s,null),ge(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Hc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=ss);break;case"onScroll":i!=null&&Jt("scroll",e);break;case"onScrollEnd":i!=null&&Jt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(j(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Hc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Jt("beforetoggle",e),Jt("toggle",e),zc(e,"popover",i);break;case"xlinkActuate":ji(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ji(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ji(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ji(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ji(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ji(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ji(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ji(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ji(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":zc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=QM.get(n)||n,zc(e,n,i))}}function wp(e,t,n,i,s,a){switch(n){case"style":B_(e,i,a);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(j(60));e.innerHTML=n}}break;case"children":typeof i=="string"?Vr(e,i):(typeof i=="number"||typeof i=="bigint")&&Vr(e,""+i);break;case"onScroll":i!=null&&Jt("scroll",e);break;case"onScrollEnd":i!=null&&Jt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=ss);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!N_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),t=n.slice(2,s?n.length-7:void 0),a=e[Dn]||null,a=a!=null?a[n]:null,typeof a=="function"&&e.removeEventListener(t,a,s),typeof i=="function")){typeof a!="function"&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,s);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):zc(e,n,i)}}}function fn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Jt("error",e),Jt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:ge(e,t,a,r,n,null)}}s&&ge(e,t,"srcSet",n.srcSet,n,null),i&&ge(e,t,"src",n.src,n,null);return;case"input":Jt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":s=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":a=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(j(137,t));break;default:ge(e,t,i,d,n,null)}}I_(e,a,o,l,c,r,s,!1);return;case"select":Jt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ge(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?Lr(e,!!i,t,!1):n!=null&&Lr(e,!!i,n,!0);return;case"textarea":Jt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(j(91));break;default:ge(e,t,r,o,n,null)}P_(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":ge(e,t,l,i,n,null));return;case"dialog":Jt("beforetoggle",e),Jt("toggle",e),Jt("cancel",e),Jt("close",e);break;case"iframe":case"object":Jt("load",e);break;case"video":case"audio":for(i=0;i<yl.length;i++)Jt(yl[i],e);break;case"image":Jt("error",e),Jt("load",e);break;case"details":Jt("toggle",e);break;case"embed":case"source":case"link":Jt("error",e),Jt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:ge(e,t,c,i,n,null)}return;default:if(kp(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&wp(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ge(e,t,o,i,n,null))}function bE(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,d=null;for(f in n){var p=n[f];if(n.hasOwnProperty(f)&&p!=null)switch(f){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(f)||ge(e,t,f,null,i,p)}}for(var u in i){var f=i[u];if(p=n[u],i.hasOwnProperty(u)&&(f!=null||p!=null))switch(u){case"type":a=f;break;case"name":s=f;break;case"checked":c=f;break;case"defaultChecked":d=f;break;case"value":r=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(j(137,t));break;default:f!==p&&ge(e,t,u,f,i,p)}}Kf(e,r,o,l,c,d,a,s);return;case"select":f=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":f=l;default:i.hasOwnProperty(a)||ge(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":u=a;break;case"defaultValue":o=a;break;case"multiple":r=a;default:a!==l&&ge(e,t,s,a,i,l)}t=o,n=r,i=f,u!=null?Lr(e,!!n,u,!1):!!i!=!!n&&(t!=null?Lr(e,!!n,t,!0):Lr(e,!!n,n?[]:"",!1));return;case"textarea":f=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ge(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":u=s;break;case"defaultValue":f=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(j(91));break;default:s!==a&&ge(e,t,r,s,i,a)}O_(e,u,f);return;case"option":for(var v in n)u=n[v],n.hasOwnProperty(v)&&u!=null&&!i.hasOwnProperty(v)&&(v==="selected"?e.selected=!1:ge(e,t,v,null,i,u));for(l in i)u=i[l],f=n[l],i.hasOwnProperty(l)&&u!==f&&(u!=null||f!=null)&&(l==="selected"?e.selected=u&&typeof u!="function"&&typeof u!="symbol":ge(e,t,l,u,i,f));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&ge(e,t,b,null,i,u);for(c in i)if(u=i[c],f=n[c],i.hasOwnProperty(c)&&u!==f&&(u!=null||f!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(j(137,t));break;default:ge(e,t,c,u,i,f)}return;default:if(kp(t)){for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!==void 0&&!i.hasOwnProperty(g)&&wp(e,t,g,void 0,i,u);for(d in i)u=i[d],f=n[d],!i.hasOwnProperty(d)||u===f||u===void 0&&f===void 0||wp(e,t,d,u,i,f);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&ge(e,t,h,null,i,u);for(p in i)u=i[p],f=n[p],!i.hasOwnProperty(p)||u===f||u==null&&f==null||ge(e,t,p,u,i,f)}function Qv(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ME(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&Qv(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,p=l.initiatorType;d&&Qv(p)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Cp=null,Rp=null;function Mu(e){return e.nodeType===9?e:e.ownerDocument}function Kv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Vx(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Dp(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hf=null;function EE(){var e=window.event;return e&&e.type==="popstate"?e===Hf?!1:(Hf=e,!0):(Hf=null,!1)}var Gx=typeof setTimeout=="function"?setTimeout:void 0,TE=typeof clearTimeout=="function"?clearTimeout:void 0,$v=typeof Promise=="function"?Promise:void 0,AE=typeof queueMicrotask=="function"?queueMicrotask:typeof $v<"u"?function(e){return $v.resolve(null).then(e).catch(wE)}:Gx;function wE(e){setTimeout(function(){throw e})}function ea(e){return e==="head"}function t_(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),Jr(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")cl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,cl(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[Cl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&cl(e.ownerDocument.body);n=s}while(n);Jr(t)}function e_(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function Np(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Np(n),Gp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function CE(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Cl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=li(e.nextSibling),e===null)break}return null}function RE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=li(e.nextSibling),e===null))return null;return e}function kx(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=li(e.nextSibling),e===null))return null;return e}function Up(e){return e.data==="$?"||e.data==="$~"}function Lp(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function DE(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function li(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Ip=null;function n_(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return li(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function i_(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Xx(e,t,n){switch(t=Mu(n),e){case"html":if(e=t.documentElement,!e)throw Error(j(452));return e;case"head":if(e=t.head,!e)throw Error(j(453));return e;case"body":if(e=t.body,!e)throw Error(j(454));return e;default:throw Error(j(451))}}function cl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Gp(e)}var ci=new Map,s_=new Set;function Eu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ps=re.d;re.d={f:NE,r:UE,D:LE,C:IE,L:OE,m:PE,X:FE,S:BE,M:zE};function NE(){var e=ps.f(),t=Vu();return e||t}function UE(e){var t=Qr(e);t!==null&&t.tag===5&&t.type==="form"?By(t):ps.r(e)}var eo=typeof document>"u"?null:document;function Wx(e,t,n){var i=eo;if(i&&typeof t=="string"&&t){var s=si(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),s_.has(s)||(s_.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),fn(t,"link",e),sn(t),i.head.appendChild(t)))}}function LE(e){ps.D(e),Wx("dns-prefetch",e,null)}function IE(e,t){ps.C(e,t),Wx("preconnect",e,t)}function OE(e,t,n){ps.L(e,t,n);var i=eo;if(i&&e&&t){var s='link[rel="preload"][as="'+si(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+si(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+si(n.imageSizes)+'"]')):s+='[href="'+si(e)+'"]';var a=s;switch(t){case"style":a=Zr(e);break;case"script":a=no(e)}ci.has(a)||(e=Ce({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),ci.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Il(a))||t==="script"&&i.querySelector(Ol(a))||(t=i.createElement("link"),fn(t,"link",e),sn(t),i.head.appendChild(t)))}}function PE(e,t){ps.m(e,t);var n=eo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+si(i)+'"][href="'+si(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=no(e)}if(!ci.has(a)&&(e=Ce({rel:"modulepreload",href:e},t),ci.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ol(a)))return}i=n.createElement("link"),fn(i,"link",e),sn(i),n.head.appendChild(i)}}}function BE(e,t,n){ps.S(e,t,n);var i=eo;if(i&&e){var s=Ur(i).hoistableStyles,a=Zr(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Il(a)))o.loading=5;else{e=Ce({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ci.get(a))&&wm(e,n);var l=r=i.createElement("link");sn(l),fn(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,jc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function FE(e,t){ps.X(e,t);var n=eo;if(n&&e){var i=Ur(n).hoistableScripts,s=no(e),a=i.get(s);a||(a=n.querySelector(Ol(s)),a||(e=Ce({src:e,async:!0},t),(t=ci.get(s))&&Cm(e,t),a=n.createElement("script"),sn(a),fn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function zE(e,t){ps.M(e,t);var n=eo;if(n&&e){var i=Ur(n).hoistableScripts,s=no(e),a=i.get(s);a||(a=n.querySelector(Ol(s)),a||(e=Ce({src:e,async:!0,type:"module"},t),(t=ci.get(s))&&Cm(e,t),a=n.createElement("script"),sn(a),fn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function a_(e,t,n,i){var s=(s=Vs.current)?Eu(s):null;if(!s)throw Error(j(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Zr(n.href),n=Ur(s).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Zr(n.href);var a=Ur(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Il(e)))&&!a._p&&(r.instance=a,r.state.loading=5),ci.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ci.set(e,n),a||HE(s,e,n,r.state))),t&&i===null)throw Error(j(528,""));return r}if(t&&i!==null)throw Error(j(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=no(n),n=Ur(s).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(j(444,e))}}function Zr(e){return'href="'+si(e)+'"'}function Il(e){return'link[rel="stylesheet"]['+e+"]"}function qx(e){return Ce({},e,{"data-precedence":e.precedence,precedence:null})}function HE(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),fn(t,"link",n),sn(t),e.head.appendChild(t))}function no(e){return'[src="'+si(e)+'"]'}function Ol(e){return"script[async]"+e}function r_(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+si(n.href)+'"]');if(i)return t.instance=i,sn(i),i;var s=Ce({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),sn(i),fn(i,"style",s),jc(i,n.precedence,e),t.instance=i;case"stylesheet":s=Zr(n.href);var a=e.querySelector(Il(s));if(a)return t.state.loading|=4,t.instance=a,sn(a),a;i=qx(n),(s=ci.get(s))&&wm(i,s),a=(e.ownerDocument||e).createElement("link"),sn(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),fn(a,"link",i),t.state.loading|=4,jc(a,n.precedence,e),t.instance=a;case"script":return a=no(n.src),(s=e.querySelector(Ol(a)))?(t.instance=s,sn(s),s):(i=n,(s=ci.get(a))&&(i=Ce({},n),Cm(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),sn(s),fn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(j(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,jc(i,n.precedence,e));return t.instance}function jc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function wm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Cm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Qc=null;function o_(e,t,n){if(Qc===null){var i=new Map,s=Qc=new Map;s.set(n,i)}else s=Qc,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[Cl]||a[un]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function l_(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function VE(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Yx(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function GE(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Zr(i.href),a=t.querySelector(Il(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Tu.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,sn(a);return}a=t.ownerDocument||t,i=qx(i),(s=ci.get(s))&&wm(i,s),a=a.createElement("link"),sn(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),fn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Tu.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Vf=0;function kE(e,t){return e.stylesheets&&e.count===0&&Kc(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Kc(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&Vf===0&&(Vf=62500*ME());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Kc(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>Vf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function Tu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Kc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Au=null;function Kc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Au=new Map,t.forEach(XE,e),Au=null,Tu.call(e))}function XE(e,t){if(!(t.state.loading&4)){var n=Au.get(e);if(n)var i=n.get(null);else{n=new Map,Au.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=Tu.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Sl={$$typeof:is,Provider:null,Consumer:null,_currentValue:Ca,_currentValue2:Ca,_threadCount:0};function WE(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ff(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ff(0),this.hiddenUpdates=ff(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function Zx(e,t,n,i,s,a,r,o,l,c,d,p){return e=new WE(e,t,n,r,l,c,d,p,o),t=1,a===!0&&(t|=24),a=Bn(3,null,null,t),e.current=a,a.stateNode=e,t=tm(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},im(a),e}function Jx(e){return e?(e=Cr,e):Cr}function jx(e,t,n,i,s,a){s=Jx(s),i.context===null?i.context=s:i.pendingContext=s,i=ks(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=Xs(e,i,t),n!==null&&(Rn(n,e,t),el(n,e,t))}function c_(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Rm(e,t){c_(e,t),(e=e.alternate)&&c_(e,t)}function Qx(e){if(e.tag===13||e.tag===31){var t=Va(e,67108864);t!==null&&Rn(t,e,67108864),Rm(e,67108864)}}function u_(e){if(e.tag===13||e.tag===31){var t=Gn();t=Hp(t);var n=Va(e,t);n!==null&&Rn(n,e,t),Rm(e,t)}}var wu=!0;function qE(e,t,n,i){var s=It.T;It.T=null;var a=re.p;try{re.p=2,Dm(e,t,n,i)}finally{re.p=a,It.T=s}}function YE(e,t,n,i){var s=It.T;It.T=null;var a=re.p;try{re.p=8,Dm(e,t,n,i)}finally{re.p=a,It.T=s}}function Dm(e,t,n,i){if(wu){var s=Op(i);if(s===null)zf(e,t,i,Cu,n),h_(e,i);else if(JE(s,e,t,n,i))i.stopPropagation();else if(h_(e,i),t&4&&-1<ZE.indexOf(e)){for(;s!==null;){var a=Qr(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=Ta(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Vn(r);o.entanglements[1]|=l,r&=~l}Oi(a),(ae&6)===0&&(vu=zn()+500,Ll(0,!1))}}break;case 31:case 13:o=Va(a,2),o!==null&&Rn(o,a,2),Vu(),Rm(a,2)}if(a=Op(i),a===null&&zf(e,t,i,Cu,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else zf(e,t,i,null,n)}}function Op(e){return e=Xp(e),Nm(e)}var Cu=null;function Nm(e){if(Cu=null,e=br(e),e!==null){var t=El(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=v_(t),e!==null)return e;e=null}else if(n===31){if(e=__(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Cu=e,null}function Kx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(OM()){case b_:return 2;case M_:return 8;case iu:case PM:return 32;case E_:return 268435456;default:return 32}default:return 32}}var Pp=!1,Ys=null,Zs=null,Js=null,bl=new Map,Ml=new Map,Os=[],ZE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function h_(e,t){switch(e){case"focusin":case"focusout":Ys=null;break;case"dragenter":case"dragleave":Zs=null;break;case"mouseover":case"mouseout":Js=null;break;case"pointerover":case"pointerout":bl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ml.delete(t.pointerId)}}function Xo(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Qr(t),t!==null&&Qx(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function JE(e,t,n,i,s){switch(t){case"focusin":return Ys=Xo(Ys,e,t,n,i,s),!0;case"dragenter":return Zs=Xo(Zs,e,t,n,i,s),!0;case"mouseover":return Js=Xo(Js,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return bl.set(a,Xo(bl.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,Ml.set(a,Xo(Ml.get(a)||null,e,t,n,i,s)),!0}return!1}function $x(e){var t=br(e.target);if(t!==null){var n=El(t);if(n!==null){if(t=n.tag,t===13){if(t=v_(n),t!==null){e.blockedOn=t,Z0(e.priority,function(){u_(n)});return}}else if(t===31){if(t=__(n),t!==null){e.blockedOn=t,Z0(e.priority,function(){u_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function $c(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Op(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);tp=i,n.target.dispatchEvent(i),tp=null}else return t=Qr(n),t!==null&&Qx(t),e.blockedOn=n,!1;t.shift()}return!0}function d_(e,t,n){$c(e)&&n.delete(t)}function jE(){Pp=!1,Ys!==null&&$c(Ys)&&(Ys=null),Zs!==null&&$c(Zs)&&(Zs=null),Js!==null&&$c(Js)&&(Js=null),bl.forEach(d_),Ml.forEach(d_)}function Bc(e,t){e.blockedOn===t&&(e.blockedOn=null,Pp||(Pp=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,jE)))}var Fc=null;function f_(e){Fc!==e&&(Fc=e,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,function(){Fc===e&&(Fc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Nm(i||n)===null)continue;break}var a=Qr(n);a!==null&&(e.splice(t,3),t-=3,gp(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function Jr(e){function t(l){return Bc(l,e)}Ys!==null&&Bc(Ys,e),Zs!==null&&Bc(Zs,e),Js!==null&&Bc(Js,e),bl.forEach(t),Ml.forEach(t);for(var n=0;n<Os.length;n++){var i=Os[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Os.length&&(n=Os[0],n.blockedOn===null);)$x(n),n.blockedOn===null&&Os.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Dn]||null;if(typeof a=="function")r||f_(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Dn]||null)o=r.formAction;else if(Nm(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),f_(n)}}}function tS(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function Um(e){this._internalRoot=e}Xu.prototype.render=Um.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));var n=t.current,i=Gn();jx(n,i,e,t,null,null)};Xu.prototype.unmount=Um.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;jx(e.current,2,null,e,null,null),Vu(),t[jr]=null}};function Xu(e){this._internalRoot=e}Xu.prototype.unstable_scheduleHydration=function(e){if(e){var t=R_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Os.length&&t!==0&&t<Os[n].priority;n++);Os.splice(n,0,e),n===0&&$x(e)}};var p_=m_.version;if(p_!=="19.2.4")throw Error(j(527,p_,"19.2.4"));re.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=CM(t),e=e!==null?y_(e):null,e=e===null?null:e.stateNode,e};var QE={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:It,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Wo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Wo.isDisabled&&Wo.supportsFiber))try{Tl=Wo.inject(QE),Hn=Wo}catch{}var Wo;Wu.createRoot=function(e,t){if(!g_(e))throw Error(j(299));var n=!1,i="",s=Wy,a=qy,r=Yy;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Zx(e,1,!1,null,null,n,i,null,s,a,r,tS),e[jr]=t.current,Am(e),new Um(t)};Wu.hydrateRoot=function(e,t,n){if(!g_(e))throw Error(j(299));var i=!1,s="",a=Wy,r=qy,o=Yy,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Zx(e,1,!0,t,n??null,i,s,l,a,r,o,tS),t.context=Jx(null),n=t.current,i=Gn(),i=Hp(i),s=ks(i),s.callback=null,Xs(n,s,i),n=i,t.current.lanes=n,wl(t,n),Oi(t),e[jr]=t.current,Am(e),new Xu(t)};Wu.version="19.2.4"});var sS=Ci((q2,iS)=>{"use strict";function nS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nS)}catch(e){console.error(e)}}nS(),iS.exports=eS()});var zb=Ci(Gd=>{"use strict";var _2=Symbol.for("react.transitional.element"),y2=Symbol.for("react.fragment");function Fb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:_2,type:e,key:i,ref:t!==void 0?t:null,props:n}}Gd.Fragment=y2;Gd.jsx=Fb;Gd.jsxs=Fb});var or=Ci((CU,Hb)=>{"use strict";Hb.exports=zb()});var Ts=Kn(dr()),Wb=Kn(sS()),qb=Kn(xc());var Es=Kn(dr()),Vb=Kn(xc());var TS=0,dg=1,AS=2;var nc=1,wS=2,Ao=3,Ss=0,Fe=1,Gi=2,ki=0,Za=1,fg=2,pg=3,mg=4,CS=5;var ca=100,RS=101,DS=102,NS=103,US=104,LS=200,IS=201,OS=202,PS=203,ph=204,mh=205,BS=206,FS=207,zS=208,HS=209,VS=210,GS=211,kS=212,XS=213,WS=214,gh=0,vh=1,_h=2,Ja=3,yh=4,xh=5,Sh=6,bh=7,gg=0,qS=1,YS=2,Ei=0,vg=1,_g=2,yg=3,tr=4,xg=5,Sg=6,bg=7;var Mg=300,va=301,er=302,Zh=303,Jh=304,ic=306,Mh=1e3,Fi=1001,Eh=1002,ke=1003,ZS=1004;var sc=1005;var pn=1006,jh=1007;var _a=1008;var Ln=1009,Eg=1010,Tg=1011,wo=1012,Qh=1013,Ti=1014,Ai=1015,Xi=1016,Kh=1017,$h=1018,Co=1020,Ag=35902,wg=35899,Cg=1021,Rg=1022,di=1023,zi=1026,ya=1027,Dg=1028,td=1029,nr=1030,ed=1031;var nd=1033,ac=33776,rc=33777,oc=33778,lc=33779,id=35840,sd=35841,ad=35842,rd=35843,od=36196,ld=37492,cd=37496,ud=37488,hd=37489,dd=37490,fd=37491,pd=37808,md=37809,gd=37810,vd=37811,_d=37812,yd=37813,xd=37814,Sd=37815,bd=37816,Md=37817,Ed=37818,Td=37819,Ad=37820,wd=37821,Cd=36492,Rd=36494,Dd=36495,Nd=36283,Ud=36284,Ld=36285,Id=36286;var Vl=2300,Th=2301,dh=2302,ig=2303,sg=2400,ag=2401,rg=2402;var JS=3200;var Ng=0,jS=1,Ms="",on="srgb",ja="srgb-linear",Gl="linear",le="srgb";var Ya=7680;var og=519,QS=512,KS=513,$S=514,Od=515,tb=516,eb=517,Pd=518,nb=519,lg=35044;var Ug="300 es",Si=2e3,_o=2001;function KE(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function $E(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function yo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function ib(){let e=yo("canvas");return e.style.display="block",e}var aS={},xo=null;function Lg(...e){let t="THREE."+e.shift();xo?xo("log",t,...e):console.log(t,...e)}function sb(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Pt(...e){e=sb(e);let t="THREE."+e.shift();if(xo)xo("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Ot(...e){e=sb(e);let t="THREE."+e.shift();if(xo)xo("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function kl(...e){let t=e.join(" ");t in aS||(aS[t]=!0,Pt(...e))}function ab(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var rb={[gh]:vh,[_h]:Sh,[yh]:bh,[Ja]:xh,[vh]:gh,[Sh]:_h,[bh]:yh,[xh]:Ja},bs=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Lm=Math.PI/180,Ah=180/Math.PI;function cc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(vn[e&255]+vn[e>>8&255]+vn[e>>16&255]+vn[e>>24&255]+"-"+vn[t&255]+vn[t>>8&255]+"-"+vn[t>>16&15|64]+vn[t>>24&255]+"-"+vn[n&63|128]+vn[n>>8&255]+"-"+vn[n>>16&255]+vn[n>>24&255]+vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]).toLowerCase()}function te(e,t,n){return Math.max(t,Math.min(n,e))}function tT(e,t){return(e%t+t)%t}function Im(e,t,n){return(1-n)*e+n*t}function Pl(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Un(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var se=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Hi=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],d=i[s+2],p=i[s+3],u=a[r+0],f=a[r+1],v=a[r+2],b=a[r+3];if(p!==b||l!==u||c!==f||d!==v){let g=l*u+c*f+d*v+p*b;g<0&&(u=-u,f=-f,v=-v,b=-b,g=-g);let h=1-o;if(g<.9995){let m=Math.acos(g),_=Math.sin(m);h=Math.sin(h*m)/_,o=Math.sin(o*m)/_,l=l*h+u*o,c=c*h+f*o,d=d*h+v*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+f*o,d=d*h+v*o,p=p*h+b*o;let m=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=m,c*=m,d*=m,p*=m}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],p=a[r],u=a[r+1],f=a[r+2],v=a[r+3];return t[n]=o*v+d*p+l*f-c*u,t[n+1]=l*v+d*u+c*p-o*f,t[n+2]=c*v+d*f+o*u-l*p,t[n+3]=d*v-o*p-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),p=o(a/2),u=l(i/2),f=l(s/2),v=l(a/2);switch(r){case"XYZ":this._x=u*d*p+c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p-u*f*v;break;case"YXZ":this._x=u*d*p+c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p+u*f*v;break;case"ZXY":this._x=u*d*p-c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p-u*f*v;break;case"ZYX":this._x=u*d*p-c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p+u*f*v;break;case"YZX":this._x=u*d*p+c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p-u*f*v;break;case"XZY":this._x=u*d*p-c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p+u*f*v;break;default:Pt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],p=n[10],u=i+o+p;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>p){let f=2*Math.sqrt(1+i-o-p);this._w=(d-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>p){let f=2*Math.sqrt(1+o-i-p);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+p-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+s*c-a*l,this._y=s*d+r*l+a*o-i*c,this._z=a*d+r*c+i*l-s*o,this._w=r*d-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(rS.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(rS.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),d=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*d,this.y=i+l*d+o*c-a*p,this.z=s+l*p+a*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Om.copy(this).projectOnVector(t),this.sub(Om)}reflect(t){return this.sub(Om.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Om=new k,rS=new Hi,kt=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=n,d[4]=a,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],u=i[2],f=i[5],v=i[8],b=s[0],g=s[3],h=s[6],m=s[1],_=s[4],S=s[7],T=s[2],C=s[5],R=s[8];return a[0]=r*b+o*m+l*T,a[3]=r*g+o*_+l*C,a[6]=r*h+o*S+l*R,a[1]=c*b+d*m+p*T,a[4]=c*g+d*_+p*C,a[7]=c*h+d*S+p*R,a[2]=u*b+f*m+v*T,a[5]=u*g+f*_+v*C,a[8]=u*h+f*S+v*R,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*r*d-n*o*c-i*a*d+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],p=d*r-o*c,u=o*l-d*a,f=c*a-r*l,v=n*p+i*u+s*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return t[0]=p*b,t[1]=(s*c-d*i)*b,t[2]=(o*i-s*r)*b,t[3]=u*b,t[4]=(d*n-s*l)*b,t[5]=(s*a-o*n)*b,t[6]=f*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*a)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Pm.makeScale(t,n)),this}rotate(t){return this.premultiply(Pm.makeRotation(-t)),this}translate(t,n){return this.premultiply(Pm.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Pm=new kt,oS=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lS=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eT(){let e={enabled:!0,workingColorSpace:ja,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===le&&(s.r=xs(s.r),s.g=xs(s.g),s.b=xs(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===le&&(s.r=vo(s.r),s.g=vo(s.g),s.b=vo(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ms?Gl:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return kl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return kl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[ja]:{primaries:t,whitePoint:i,transfer:Gl,toXYZ:oS,fromXYZ:lS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:t,whitePoint:i,transfer:le,toXYZ:oS,fromXYZ:lS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),e}var ee=eT();function xs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function vo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var io,wh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{io===void 0&&(io=yo("canvas")),io.width=t.width,io.height=t.height;let s=io.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=io}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=yo("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=xs(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(xs(n[i]/255)*255):n[i]=xs(n[i]);return{data:n,width:t.width,height:t.height}}else return Pt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},nT=0,So=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=cc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Bm(s[r].image)):a.push(Bm(s[r]))}else a=Bm(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function Bm(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?wh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Pt("Texture: Unable to serialize Texture."),{})}var iT=0,Fm=new k,Mn=class e extends bs{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Fi,s=Fi,a=pn,r=_a,o=di,l=Ln,c=e.DEFAULT_ANISOTROPY,d=Ms){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=cc(),this.name="",this.source=new So(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fm).x}get height(){return this.source.getSize(Fm).y}get depth(){return this.source.getSize(Fm).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Pt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Pt(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mh:t.x=t.x-Math.floor(t.x);break;case Fi:t.x=t.x<0?0:1;break;case Eh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mh:t.y=t.y-Math.floor(t.y);break;case Fi:t.y=t.y<0?0:1;break;case Eh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=Mg;Mn.DEFAULT_ANISOTROPY=1;var Le=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],d=l[4],p=l[8],u=l[1],f=l[5],v=l[9],b=l[2],g=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,S=(f+1)/2,T=(h+1)/2,C=(d+u)/4,R=(p+b)/4,x=(v+g)/4;return _>S&&_>T?_<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(_),s=C/i,a=R/i):S>T?S<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(S),i=C/s,a=x/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=R/a,s=x/a),this.set(i,s,a,n),this}let m=Math.sqrt((g-v)*(g-v)+(p-b)*(p-b)+(u-d)*(u-d));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(p-b)/m,this.z=(u-d)/m,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this.w=te(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this.w=te(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ch=class extends bs{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Le(0,0,t,n),this.scissorTest=!1,this.viewport=new Le(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Mn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new So(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zn=class extends Ch{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Xl=class extends Mn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Rh=class extends Mn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Be=class e{constructor(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g)}set(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=u,h[3]=f,h[7]=v,h[11]=b,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();let n=this.elements,i=t.elements,s=1/so.setFromMatrixColumn(t,0).length(),a=1/so.setFromMatrixColumn(t,1).length(),r=1/so.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*d,f=r*p,v=o*d,b=o*p;n[0]=l*d,n[4]=-l*p,n[8]=c,n[1]=f+v*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=v+f*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*d,f=l*p,v=c*d,b=c*p;n[0]=u+b*o,n[4]=v*o-f,n[8]=r*c,n[1]=r*p,n[5]=r*d,n[9]=-o,n[2]=f*o-v,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*d,f=l*p,v=c*d,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=v+f*o,n[1]=f+v*o,n[5]=r*d,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*d,f=r*p,v=o*d,b=o*p;n[0]=l*d,n[4]=v*c-f,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=f*c-v,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,f=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=b-u*p,n[8]=v*p+f,n[1]=p,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=f*p+v,n[10]=u-b*p}else if(t.order==="XZY"){let u=r*l,f=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=-p,n[8]=c*d,n[1]=u*p+b,n[5]=r*d,n[9]=f*p-v,n[2]=v*p-f,n[6]=o*d,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sT,t,aT)}lookAt(t,n,i){let s=this.elements;return Wn.subVectors(t,n),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),na.crossVectors(i,Wn),na.lengthSq()===0&&(Math.abs(i.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),na.crossVectors(i,Wn)),na.normalize(),qu.crossVectors(Wn,na),s[0]=na.x,s[4]=qu.x,s[8]=Wn.x,s[1]=na.y,s[5]=qu.y,s[9]=Wn.y,s[2]=na.z,s[6]=qu.z,s[10]=Wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],u=i[9],f=i[13],v=i[2],b=i[6],g=i[10],h=i[14],m=i[3],_=i[7],S=i[11],T=i[15],C=s[0],R=s[4],x=s[8],M=s[12],F=s[1],D=s[5],P=s[9],A=s[13],U=s[2],B=s[6],z=s[10],H=s[14],$=s[3],K=s[7],dt=s[11],gt=s[15];return a[0]=r*C+o*F+l*U+c*$,a[4]=r*R+o*D+l*B+c*K,a[8]=r*x+o*P+l*z+c*dt,a[12]=r*M+o*A+l*H+c*gt,a[1]=d*C+p*F+u*U+f*$,a[5]=d*R+p*D+u*B+f*K,a[9]=d*x+p*P+u*z+f*dt,a[13]=d*M+p*A+u*H+f*gt,a[2]=v*C+b*F+g*U+h*$,a[6]=v*R+b*D+g*B+h*K,a[10]=v*x+b*P+g*z+h*dt,a[14]=v*M+b*A+g*H+h*gt,a[3]=m*C+_*F+S*U+T*$,a[7]=m*R+_*D+S*B+T*K,a[11]=m*x+_*P+S*z+T*dt,a[15]=m*M+_*A+S*H+T*gt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],p=t[6],u=t[10],f=t[14],v=t[3],b=t[7],g=t[11],h=t[15],m=l*f-c*u,_=o*f-c*p,S=o*u-l*p,T=r*f-c*d,C=r*u-l*d,R=r*p-o*d;return n*(b*m-g*_+h*S)-i*(v*m-g*T+h*C)+s*(v*_-b*T+h*R)-a*(v*S-b*C+g*R)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],p=t[9],u=t[10],f=t[11],v=t[12],b=t[13],g=t[14],h=t[15],m=n*o-i*r,_=n*l-s*r,S=n*c-a*r,T=i*l-s*o,C=i*c-a*o,R=s*c-a*l,x=d*b-p*v,M=d*g-u*v,F=d*h-f*v,D=p*g-u*b,P=p*h-f*b,A=u*h-f*g,U=m*A-_*P+S*D+T*F-C*M+R*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/U;return t[0]=(o*A-l*P+c*D)*B,t[1]=(s*P-i*A-a*D)*B,t[2]=(b*R-g*C+h*T)*B,t[3]=(u*C-p*R-f*T)*B,t[4]=(l*F-r*A-c*M)*B,t[5]=(n*A-s*F+a*M)*B,t[6]=(g*S-v*R-h*_)*B,t[7]=(d*R-u*S+f*_)*B,t[8]=(r*P-o*F+c*x)*B,t[9]=(i*F-n*P-a*x)*B,t[10]=(v*C-b*S+h*m)*B,t[11]=(p*S-d*C-f*m)*B,t[12]=(o*M-r*D-l*x)*B,t[13]=(n*D-i*M+s*x)*B,t[14]=(b*_-v*T-g*m)*B,t[15]=(d*T-p*_+u*m)*B,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,d=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*r,0,c*l-s*o,d*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,d=r+r,p=o+o,u=a*c,f=a*d,v=a*p,b=r*d,g=r*p,h=o*p,m=l*c,_=l*d,S=l*p,T=i.x,C=i.y,R=i.z;return s[0]=(1-(b+h))*T,s[1]=(f+S)*T,s[2]=(v-_)*T,s[3]=0,s[4]=(f-S)*C,s[5]=(1-(u+h))*C,s[6]=(g+m)*C,s[7]=0,s[8]=(v+_)*R,s[9]=(g-m)*R,s[10]=(1-(u+b))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinant();if(a===0)return i.set(1,1,1),n.identity(),this;let r=so.set(s[0],s[1],s[2]).length(),o=so.set(s[4],s[5],s[6]).length(),l=so.set(s[8],s[9],s[10]).length();a<0&&(r=-r),_i.copy(this);let c=1/r,d=1/o,p=1/l;return _i.elements[0]*=c,_i.elements[1]*=c,_i.elements[2]*=c,_i.elements[4]*=d,_i.elements[5]*=d,_i.elements[6]*=d,_i.elements[8]*=p,_i.elements[9]*=p,_i.elements[10]*=p,n.setFromRotationMatrix(_i),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=Si,l=!1){let c=this.elements,d=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s),v,b;if(l)v=a/(r-a),b=r*a/(r-a);else if(o===Si)v=-(r+a)/(r-a),b=-2*r*a/(r-a);else if(o===_o)v=-r/(r-a),b=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Si,l=!1){let c=this.elements,d=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),f=-(i+s)/(i-s),v,b;if(l)v=1/(r-a),b=r/(r-a);else if(o===Si)v=-2/(r-a),b=-(r+a)/(r-a);else if(o===_o)v=-1/(r-a),b=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},so=new k,_i=new Be,sT=new k(0,0,0),aT=new k(1,1,1),na=new k,qu=new k,Wn=new k,cS=new Be,uS=new Hi,Mi=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],d=s[9],p=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-te(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-te(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Pt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return cS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return uS.setFromEuler(this),this.setFromQuaternion(uS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mi.DEFAULT_ORDER="XYZ";var Wl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rT=0,hS=new k,ao=new Hi,ms=new Be,Yu=new k,Bl=new k,oT=new k,lT=new Hi,dS=new k(1,0,0),fS=new k(0,1,0),pS=new k(0,0,1),mS={type:"added"},cT={type:"removed"},ro={type:"childadded",child:null},zm={type:"childremoved",child:null},Jn=class e extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rT++}),this.uuid=cc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new k,n=new Mi,i=new Hi,s=new k(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Be},normalMatrix:{value:new kt}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ao.setFromAxisAngle(t,n),this.quaternion.multiply(ao),this}rotateOnWorldAxis(t,n){return ao.setFromAxisAngle(t,n),this.quaternion.premultiply(ao),this}rotateX(t){return this.rotateOnAxis(dS,t)}rotateY(t){return this.rotateOnAxis(fS,t)}rotateZ(t){return this.rotateOnAxis(pS,t)}translateOnAxis(t,n){return hS.copy(t).applyQuaternion(this.quaternion),this.position.add(hS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(dS,t)}translateY(t){return this.translateOnAxis(fS,t)}translateZ(t){return this.translateOnAxis(pS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ms.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Yu.copy(t):Yu.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Bl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ms.lookAt(Bl,Yu,this.up):ms.lookAt(Yu,Bl,this.up),this.quaternion.setFromRotationMatrix(ms),s&&(ms.extractRotation(s.matrixWorld),ao.setFromRotationMatrix(ms),this.quaternion.premultiply(ao.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mS),ro.child=t,this.dispatchEvent(ro),ro.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(cT),zm.child=t,this.dispatchEvent(zm),zm.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ms.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ms.multiply(t.parent.matrixWorld)),t.applyMatrix4(ms),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mS),ro.child=t,this.dispatchEvent(ro),ro.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bl,t,oT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bl,lT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),p=r(t.shapes),u=r(t.skeletons),f=r(t.animations),v=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=s,i;function r(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Jn.DEFAULT_UP=new k(0,1,0);Jn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=class extends Jn{constructor(){super(),this.isGroup=!0,this.type="Group"}},uT={type:"move"},bo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let g=n.getJointPose(b,i),h=this._getHandJoint(c,b);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),f=.02,v=.005;c.inputState.pinching&&u>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(uT)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new bi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},ob={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ia={h:0,s:0,l:0},Zu={h:0,s:0,l:0};function Hm(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Wt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=ee.workingColorSpace){return this.r=t,this.g=n,this.b=i,ee.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=ee.workingColorSpace){if(t=tT(t,1),n=te(n,0,1),i=te(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=Hm(r,a,t+1/3),this.g=Hm(r,a,t),this.b=Hm(r,a,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,n=on){function i(a){a!==void 0&&parseFloat(a)<1&&Pt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Pt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Pt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=on){let i=ob[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Pt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xs(t.r),this.g=xs(t.g),this.b=xs(t.b),this}copyLinearToSRGB(t){return this.r=vo(t.r),this.g=vo(t.g),this.b=vo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return ee.workingToColorSpace(_n.copy(this),t),Math.round(te(_n.r*255,0,255))*65536+Math.round(te(_n.g*255,0,255))*256+Math.round(te(_n.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ee.workingColorSpace){ee.workingToColorSpace(_n.copy(this),n);let i=_n.r,s=_n.g,a=_n.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,d=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=d<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=ee.workingColorSpace){return ee.workingToColorSpace(_n.copy(this),n),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=on){ee.workingToColorSpace(_n.copy(this),t);let n=_n.r,i=_n.g,s=_n.b;return t!==on?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(ia),this.setHSL(ia.h+t,ia.s+n,ia.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ia),t.getHSL(Zu);let i=Im(ia.h,Zu.h,n),s=Im(ia.s,Zu.s,n),a=Im(ia.l,Zu.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_n=new Wt;Wt.NAMES=ob;var ua=class extends Jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}},yi=new k,gs=new k,Vm=new k,vs=new k,oo=new k,lo=new k,gS=new k,Gm=new k,km=new k,Xm=new k,Wm=new Le,qm=new Le,Ym=new Le,la=class e{constructor(t=new k,n=new k,i=new k){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),yi.subVectors(t,n),s.cross(yi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){yi.subVectors(s,n),gs.subVectors(i,n),Vm.subVectors(t,n);let r=yi.dot(yi),o=yi.dot(gs),l=yi.dot(Vm),c=gs.dot(gs),d=gs.dot(Vm),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,f=(c*l-o*d)*u,v=(r*d-o*l)*u;return a.set(1-f-v,v,f)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,vs)===null?!1:vs.x>=0&&vs.y>=0&&vs.x+vs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,vs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,vs.x),l.addScaledVector(r,vs.y),l.addScaledVector(o,vs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return Wm.setScalar(0),qm.setScalar(0),Ym.setScalar(0),Wm.fromBufferAttribute(t,n),qm.fromBufferAttribute(t,i),Ym.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Wm,a.x),r.addScaledVector(qm,a.y),r.addScaledVector(Ym,a.z),r}static isFrontFacing(t,n,i,s){return yi.subVectors(i,n),gs.subVectors(t,n),yi.cross(gs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yi.subVectors(this.c,this.b),gs.subVectors(this.a,this.b),yi.cross(gs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;oo.subVectors(s,i),lo.subVectors(a,i),Gm.subVectors(t,i);let l=oo.dot(Gm),c=lo.dot(Gm);if(l<=0&&c<=0)return n.copy(i);km.subVectors(t,s);let d=oo.dot(km),p=lo.dot(km);if(d>=0&&p<=d)return n.copy(s);let u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(oo,r);Xm.subVectors(t,a);let f=oo.dot(Xm),v=lo.dot(Xm);if(v>=0&&f<=v)return n.copy(a);let b=f*c-l*v;if(b<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(lo,o);let g=d*v-f*p;if(g<=0&&p-d>=0&&f-v>=0)return gS.subVectors(a,s),o=(p-d)/(p-d+(f-v)),n.copy(s).addScaledVector(gS,o);let h=1/(g+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(oo,r).addScaledVector(lo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ha=class{constructor(t=new k(1/0,1/0,1/0),n=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(xi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(xi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=xi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,xi):xi.fromBufferAttribute(a,r),xi.applyMatrix4(t.matrixWorld),this.expandByPoint(xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ju.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ju.copy(i.boundingBox)),Ju.applyMatrix4(t.matrixWorld),this.union(Ju)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xi),xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fl),ju.subVectors(this.max,Fl),co.subVectors(t.a,Fl),uo.subVectors(t.b,Fl),ho.subVectors(t.c,Fl),sa.subVectors(uo,co),aa.subVectors(ho,uo),ka.subVectors(co,ho);let n=[0,-sa.z,sa.y,0,-aa.z,aa.y,0,-ka.z,ka.y,sa.z,0,-sa.x,aa.z,0,-aa.x,ka.z,0,-ka.x,-sa.y,sa.x,0,-aa.y,aa.x,0,-ka.y,ka.x,0];return!Zm(n,co,uo,ho,ju)||(n=[1,0,0,0,1,0,0,0,1],!Zm(n,co,uo,ho,ju))?!1:(Qu.crossVectors(sa,aa),n=[Qu.x,Qu.y,Qu.z],Zm(n,co,uo,ho,ju))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_s[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_s[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_s[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_s[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_s[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_s[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_s[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_s[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_s),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},_s=[new k,new k,new k,new k,new k,new k,new k,new k],xi=new k,Ju=new ha,co=new k,uo=new k,ho=new k,sa=new k,aa=new k,ka=new k,Fl=new k,ju=new k,Qu=new k,Xa=new k;function Zm(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){Xa.fromArray(e,a);let o=s.x*Math.abs(Xa.x)+s.y*Math.abs(Xa.y)+s.z*Math.abs(Xa.z),l=t.dot(Xa),c=n.dot(Xa),d=i.dot(Xa);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var Je=new k,Ku=new se,hT=0,Yn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hT++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=lg,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ku.fromBufferAttribute(this,n),Ku.applyMatrix3(t),this.setXY(n,Ku.x,Ku.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Je.fromBufferAttribute(this,n),Je.applyMatrix3(t),this.setXYZ(n,Je.x,Je.y,Je.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Je.fromBufferAttribute(this,n),Je.applyMatrix4(t),this.setXYZ(n,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Je.fromBufferAttribute(this,n),Je.applyNormalMatrix(t),this.setXYZ(n,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Je.fromBufferAttribute(this,n),Je.transformDirection(t),this.setXYZ(n,Je.x,Je.y,Je.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Pl(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Un(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Pl(n,this.array)),n}setX(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Pl(n,this.array)),n}setY(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Pl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Pl(n,this.array)),n}setW(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array),s=Un(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array),s=Un(s,this.array),a=Un(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lg&&(t.usage=this.usage),t}};var ql=class extends Yn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Yl=class extends Yn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var hi=class extends Yn{constructor(t,n,i){super(new Float32Array(t),n,i)}},dT=new ha,zl=new k,Jm=new k,Mo=class{constructor(t=new k,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):dT.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zl.subVectors(t,this.center);let n=zl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(zl,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jm.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zl.copy(t.center).add(Jm)),this.expandByPoint(zl.copy(t.center).sub(Jm))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},fT=0,ui=new Be,jm=new Jn,fo=new k,qn=new ha,Hl=new ha,rn=new k,Vi=class e extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fT++}),this.uuid=cc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(KE(t)?Yl:ql)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new kt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ui.makeRotationFromQuaternion(t),this.applyMatrix4(ui),this}rotateX(t){return ui.makeRotationX(t),this.applyMatrix4(ui),this}rotateY(t){return ui.makeRotationY(t),this.applyMatrix4(ui),this}rotateZ(t){return ui.makeRotationZ(t),this.applyMatrix4(ui),this}translate(t,n,i){return ui.makeTranslation(t,n,i),this.applyMatrix4(ui),this}scale(t,n,i){return ui.makeScale(t,n,i),this.applyMatrix4(ui),this}lookAt(t){return jm.lookAt(t),jm.updateMatrix(),this.applyMatrix4(jm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fo).negate(),this.translate(fo.x,fo.y,fo.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new hi(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Pt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ha);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];qn.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(qn.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Hl.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(qn.min,Hl.min),qn.expandByPoint(rn),rn.addVectors(qn.max,Hl.max),qn.expandByPoint(rn)):(qn.expandByPoint(Hl.min),qn.expandByPoint(Hl.max))}qn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)rn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(rn));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)rn.fromBufferAttribute(o,c),l&&(fo.fromBufferAttribute(t,c),rn.add(fo)),s=Math.max(s,i.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new k,l[x]=new k;let c=new k,d=new k,p=new k,u=new se,f=new se,v=new se,b=new k,g=new k;function h(x,M,F){c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,M),p.fromBufferAttribute(i,F),u.fromBufferAttribute(a,x),f.fromBufferAttribute(a,M),v.fromBufferAttribute(a,F),d.sub(c),p.sub(c),f.sub(u),v.sub(u);let D=1/(f.x*v.y-v.x*f.y);isFinite(D)&&(b.copy(d).multiplyScalar(v.y).addScaledVector(p,-f.y).multiplyScalar(D),g.copy(p).multiplyScalar(f.x).addScaledVector(d,-v.x).multiplyScalar(D),o[x].add(b),o[M].add(b),o[F].add(b),l[x].add(g),l[M].add(g),l[F].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let x=0,M=m.length;x<M;++x){let F=m[x],D=F.start,P=F.count;for(let A=D,U=D+P;A<U;A+=3)h(t.getX(A+0),t.getX(A+1),t.getX(A+2))}let _=new k,S=new k,T=new k,C=new k;function R(x){T.fromBufferAttribute(s,x),C.copy(T);let M=o[x];_.copy(M),_.sub(T.multiplyScalar(T.dot(M))).normalize(),S.crossVectors(C,M);let D=S.dot(l[x])<0?-1:1;r.setXYZW(x,_.x,_.y,_.z,D)}for(let x=0,M=m.length;x<M;++x){let F=m[x],D=F.start,P=F.count;for(let A=D,U=D+P;A<U;A+=3)R(t.getX(A+0)),R(t.getX(A+1)),R(t.getX(A+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Yn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new k,a=new k,r=new k,o=new k,l=new k,c=new k,d=new k,p=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){let v=t.getX(u+0),b=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,b),r.fromBufferAttribute(n,g),d.subVectors(r,a),p.subVectors(s,a),d.cross(p),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,a),p.subVectors(s,a),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)rn.fromBufferAttribute(t,n),rn.normalize(),t.setXYZ(n,rn.x,rn.y,rn.z)}toNonIndexed(){function t(o,l){let c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d),f=0,v=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?f=l[b]*o.data.stride+o.offset:f=l[b]*d;for(let h=0;h<d;h++)u[v++]=c[f++]}return new Yn(u,d,p)}if(this.index===null)return Pt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let d=0,p=c.length;d<p;d++){let u=c[d],f=t(u,i);l.push(f)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){let f=c[p];d.push(f.toJSON(t.data))}d.length>0&&(s[l]=d,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(n))}let a=t.morphAttributes;for(let c in a){let d=[],p=a[c];for(let u=0,f=p.length;u<f;u++)d.push(p[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,d=r.length;c<d;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var pT=0,da=class extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pT++}),this.uuid=cc(),this.name="",this.type="Material",this.blending=Za,this.side=Ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ph,this.blendDst=mh,this.blendEquation=ca,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Ja,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=og,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ya,this.stencilZFail=Ya,this.stencilZPass=Ya,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Pt(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Pt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Za&&(i.blending=this.blending),this.side!==Ss&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ph&&(i.blendSrc=this.blendSrc),this.blendDst!==mh&&(i.blendDst=this.blendDst),this.blendEquation!==ca&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ja&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==og&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ya&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ya&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ya&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ys=new k,Qm=new k,$u=new k,ra=new k,Km=new k,th=new k,$m=new k,Dh=class{constructor(t=new k,n=new k(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ys)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=ys.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ys.copy(this.origin).addScaledVector(this.direction,n),ys.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){Qm.copy(t).add(n).multiplyScalar(.5),$u.copy(n).sub(t).normalize(),ra.copy(this.origin).sub(Qm);let a=t.distanceTo(n)*.5,r=-this.direction.dot($u),o=ra.dot(this.direction),l=-ra.dot($u),c=ra.lengthSq(),d=Math.abs(1-r*r),p,u,f,v;if(d>0)if(p=r*l-o,u=r*o-l,v=a*d,p>=0)if(u>=-v)if(u<=v){let b=1/d;p*=b,u*=b,f=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u<=-v?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c):u<=v?(p=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Qm).addScaledVector($u,u),f}intersectSphere(t,n){ys.subVectors(t.center,this.origin);let i=ys.dot(this.direction),s=ys.dot(ys)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),d>=0?(a=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(a=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,ys)!==null}intersectTriangle(t,n,i,s,a){Km.subVectors(n,t),th.subVectors(i,t),$m.crossVectors(Km,th);let r=this.direction.dot($m),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ra.subVectors(this.origin,t);let l=o*this.direction.dot(th.crossVectors(ra,th));if(l<0)return null;let c=o*this.direction.dot(Km.cross(ra));if(c<0||l+c>r)return null;let d=-o*ra.dot($m);return d<0?null:this.at(d/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Zl=class extends da{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=gg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},vS=new Be,Wa=new Dh,eh=new Mo,_S=new k,nh=new k,ih=new k,sh=new k,tg=new k,ah=new k,yS=new k,rh=new k,_t=class extends Jn{constructor(t=new Vi,n=new Zl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){ah.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let d=o[l],p=a[l];d!==0&&(tg.fromBufferAttribute(p,t),r?ah.addScaledVector(tg,d):ah.addScaledVector(tg.sub(n),d))}n.add(ah)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),eh.copy(i.boundingSphere),eh.applyMatrix4(a),Wa.copy(t.ray).recast(t.near),!(eh.containsPoint(Wa.origin)===!1&&(Wa.intersectSphere(eh,_S)===null||Wa.origin.distanceToSquared(_S)>(t.far-t.near)**2))&&(vS.copy(a).invert(),Wa.copy(t.ray).applyMatrix4(vS),!(i.boundingBox!==null&&Wa.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Wa)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,p=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=m,T=_;S<T;S+=3){let C=o.getX(S),R=o.getX(S+1),x=o.getX(S+2);s=oh(this,h,t,i,c,d,p,C,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let g=v,h=b;g<h;g+=3){let m=o.getX(g),_=o.getX(g+1),S=o.getX(g+2);s=oh(this,r,t,i,c,d,p,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=m,T=_;S<T;S+=3){let C=S,R=S+1,x=S+2;s=oh(this,h,t,i,c,d,p,C,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let g=v,h=b;g<h;g+=3){let m=g,_=g+1,S=g+2;s=oh(this,r,t,i,c,d,p,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}}};function mT(e,t,n,i,s,a,r,o){let l;if(t.side===Fe?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===Ss,o),l===null)return null;rh.copy(o),rh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(rh);return c<n.near||c>n.far?null:{distance:c,point:rh.clone(),object:e}}function oh(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,nh),e.getVertexPosition(l,ih),e.getVertexPosition(c,sh);let d=mT(e,t,n,i,nh,ih,sh,yS);if(d){let p=new k;la.getBarycoord(yS,nh,ih,sh,p),s&&(d.uv=la.getInterpolatedAttribute(s,o,l,c,p,new se)),a&&(d.uv1=la.getInterpolatedAttribute(a,o,l,c,p,new se)),r&&(d.normal=la.getInterpolatedAttribute(r,o,l,c,p,new k),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new k,materialIndex:0};la.getNormal(nh,ih,sh,u.normal),d.face=u,d.barycoord=p}return d}var Nh=class extends Mn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=ke,d=ke,p,u){super(null,r,o,l,c,d,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var eg=new k,gT=new k,vT=new kt,Bi=class{constructor(t=new k(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=eg.subVectors(i,n).cross(gT.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(eg),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||vT.getNormalMatrix(t),s=this.coplanarPoint(eg).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},qa=new Mo,_T=new se(.5,.5),lh=new k,Eo=class{constructor(t=new Bi,n=new Bi,i=new Bi,s=new Bi,a=new Bi,r=new Bi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Si,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],p=a[5],u=a[6],f=a[7],v=a[8],b=a[9],g=a[10],h=a[11],m=a[12],_=a[13],S=a[14],T=a[15];if(s[0].setComponents(c-r,f-d,h-v,T-m).normalize(),s[1].setComponents(c+r,f+d,h+v,T+m).normalize(),s[2].setComponents(c+o,f+p,h+b,T+_).normalize(),s[3].setComponents(c-o,f-p,h-b,T-_).normalize(),i)s[4].setComponents(l,u,g,S).normalize(),s[5].setComponents(c-l,f-u,h-g,T-S).normalize();else if(s[4].setComponents(c-l,f-u,h-g,T-S).normalize(),n===Si)s[5].setComponents(c+l,f+u,h+g,T+S).normalize();else if(n===_o)s[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qa.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qa)}intersectsSprite(t){qa.center.set(0,0,0);let n=_T.distanceTo(t.center);return qa.radius=.7071067811865476+n,qa.applyMatrix4(t.matrixWorld),this.intersectsSphere(qa)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(lh.x=s.normal.x>0?t.max.x:t.min.x,lh.y=s.normal.y>0?t.max.y:t.min.y,lh.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(lh)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Jl=class extends Mn{constructor(t=[],n=va,i,s,a,r,o,l,c,d){super(t,n,i,s,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var fa=class extends Mn{constructor(t,n,i=Ti,s,a,r,o=ke,l=ke,c,d=zi,p=1){if(d!==zi&&d!==ya)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new So(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Uh=class extends fa{constructor(t,n=Ti,i=va,s,a,r=ke,o=ke,l,c=zi){let d={width:t,height:t,depth:1},p=[d,d,d,d,d,d];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},jl=class extends Mn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},At=class e extends Vi{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],d=[],p=[],u=0,f=0;v("z","y","x",-1,-1,i,n,t,r,a,0),v("z","y","x",1,-1,i,n,-t,r,a,1),v("x","z","y",1,1,t,i,n,s,r,2),v("x","z","y",1,-1,t,i,-n,s,r,3),v("x","y","z",1,-1,t,n,i,s,a,4),v("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new hi(c,3)),this.setAttribute("normal",new hi(d,3)),this.setAttribute("uv",new hi(p,2));function v(b,g,h,m,_,S,T,C,R,x,M){let F=S/R,D=T/x,P=S/2,A=T/2,U=C/2,B=R+1,z=x+1,H=0,$=0,K=new k;for(let dt=0;dt<z;dt++){let gt=dt*D-A;for(let ft=0;ft<B;ft++){let Xt=ft*F-P;K[b]=Xt*m,K[g]=gt*_,K[h]=U,c.push(K.x,K.y,K.z),K[b]=0,K[g]=0,K[h]=C>0?1:-1,d.push(K.x,K.y,K.z),p.push(ft/R),p.push(1-dt/x),H+=1}}for(let dt=0;dt<x;dt++)for(let gt=0;gt<R;gt++){let ft=u+gt+B*dt,Xt=u+gt+B*(dt+1),ne=u+(gt+1)+B*(dt+1),fe=u+(gt+1)+B*dt;l.push(ft,Xt,fe),l.push(Xt,ne,fe),$+=6}o.addGroup(f,$,M),f+=$,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Qa=class e extends Vi{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,p=t/o,u=n/l,f=[],v=[],b=[],g=[];for(let h=0;h<d;h++){let m=h*u-r;for(let _=0;_<c;_++){let S=_*p-a;v.push(S,-m,0),b.push(0,0,1),g.push(_/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let m=0;m<o;m++){let _=m+c*h,S=m+c*(h+1),T=m+1+c*(h+1),C=m+1+c*h;f.push(_,S,C),f.push(S,T,C)}this.setIndex(f),this.setAttribute("position",new hi(v,3)),this.setAttribute("normal",new hi(b,3)),this.setAttribute("uv",new hi(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function ir(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Pt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function yn(e){let t={};for(let n=0;n<e.length;n++){let i=ir(e[n]);for(let s in i)t[s]=i[s]}return t}function yT(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ig(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var lb={clone:ir,merge:yn},xT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ST=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,jn=class extends da{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xT,this.fragmentShader=ST,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ir(t.uniforms),this.uniformsGroups=yT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Lh=class extends jn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ce=class extends da{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ng,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ih=class extends da{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=JS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oh=class extends da{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ch(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}var pa=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ph=class extends pa{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sg,endingEnd:sg}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case ag:a=t,o=2*n-i;break;case rg:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ag:r=t,l=2*i-n;break;case rg:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,d=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*d,this._offsetNext=r*d}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,f=this._weightNext,v=(i-n)/(s-n),b=v*v,g=b*v,h=-u*g+2*u*b-u*v,m=(1+u)*g+(-1.5-2*u)*b+(-.5+u)*v+1,_=(-1-f)*g+(1.5+f)*b+.5*v,S=f*g-f*b;for(let T=0;T!==o;++T)a[T]=h*r[d+T]+m*r[c+T]+_*r[l+T]+S*r[p+T];return a}},Bh=class extends pa{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=(i-n)/(s-n),p=1-d;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*d;return a}},Fh=class extends pa{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},zh=class extends pa{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this.settings||this.DefaultSettings_,p=d.inTangents,u=d.outTangents;if(!p||!u){let b=(i-n)/(s-n),g=1-b;for(let h=0;h!==o;++h)a[h]=r[c+h]*g+r[l+h]*b;return a}let f=o*2,v=t-1;for(let b=0;b!==o;++b){let g=r[c+b],h=r[l+b],m=v*f+b*2,_=u[m],S=u[m+1],T=t*f+b*2,C=p[T],R=p[T+1],x=(i-n)/(s-n),M,F,D,P,A;for(let U=0;U<8;U++){M=x*x,F=M*x,D=1-x,P=D*D,A=P*D;let z=A*n+3*P*x*_+3*D*M*C+F*s-i;if(Math.abs(z)<1e-10)break;let H=3*P*(_-n)+6*D*x*(C-_)+3*M*(s-C);if(Math.abs(H)<1e-10)break;x=x-z/H,x=Math.max(0,Math.min(1,x))}a[b]=A*g+3*P*x*S+3*D*M*R+F*h}return a}},Qn=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ch(n,this.TimeBufferType),this.values=ch(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:ch(t.times,Array),values:ch(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Fh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ph(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new zh(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.settings=this.settings),n}setInterpolation(t){let n;switch(t){case Vl:n=this.InterpolantFactoryMethodDiscrete;break;case Th:n=this.InterpolantFactoryMethodLinear;break;case dh:n=this.InterpolantFactoryMethodSmooth;break;case ig:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Pt("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vl;case this.InterpolantFactoryMethodLinear:return Th;case this.InterpolantFactoryMethodSmooth:return dh;case this.InterpolantFactoryMethodBezier:return ig}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Ot("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&$E(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===dh,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],d=t[o+1];if(c!==d&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,f=p+i;for(let v=0;v!==i;++v){let b=n[p+v];if(b!==n[u+v]||b!==n[f+v]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let f=0;f!==i;++f)n[u+f]=n[p+f]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};Qn.prototype.ValueTypeName="";Qn.prototype.TimeBufferType=Float32Array;Qn.prototype.ValueBufferType=Float32Array;Qn.prototype.DefaultInterpolation=Th;var ma=class extends Qn{constructor(t,n,i){super(t,n,i)}};ma.prototype.ValueTypeName="bool";ma.prototype.ValueBufferType=Array;ma.prototype.DefaultInterpolation=Vl;ma.prototype.InterpolantFactoryMethodLinear=void 0;ma.prototype.InterpolantFactoryMethodSmooth=void 0;var Hh=class extends Qn{constructor(t,n,i,s){super(t,n,i,s)}};Hh.prototype.ValueTypeName="color";var Vh=class extends Qn{constructor(t,n,i,s){super(t,n,i,s)}};Vh.prototype.ValueTypeName="number";var Gh=class extends pa{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let d=c+o;c!==d;c+=4)Hi.slerpFlat(a,0,r,c-o,r,c,l);return a}},Ql=class extends Qn{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new Gh(this.times,this.values,this.getValueSize(),t)}};Ql.prototype.ValueTypeName="quaternion";Ql.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends Qn{constructor(t,n,i){super(t,n,i)}};ga.prototype.ValueTypeName="string";ga.prototype.ValueBufferType=Array;ga.prototype.DefaultInterpolation=Vl;ga.prototype.InterpolantFactoryMethodLinear=void 0;ga.prototype.InterpolantFactoryMethodSmooth=void 0;var kh=class extends Qn{constructor(t,n,i,s){super(t,n,i,s)}};kh.prototype.ValueTypeName="vector";var fh={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(xS(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!xS(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function xS(e){try{let t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Xh=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,a===!1&&s.onStart!==void 0&&s.onStart(d,r,o),a=!0},this.itemEnd=function(d){r++,s.onProgress!==void 0&&s.onProgress(d,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,p){return c.push(d,p),this},this.removeHandler=function(d){let p=c.indexOf(d);return p!==-1&&c.splice(p,2),this},this.getHandler=function(d){for(let p=0,u=c.length;p<u;p+=2){let f=c[p],v=c[p+1];if(f.global&&(f.lastIndex=0),f.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},cb=new Xh,To=class{constructor(t){this.manager=t!==void 0?t:cb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};To.DEFAULT_MATERIAL_NAME="__DEFAULT";var po=new WeakMap,Wh=class extends To{constructor(t){super(t)}load(t,n,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,r=fh.get(`image:${t}`);if(r!==void 0){if(r.complete===!0)a.manager.itemStart(t),setTimeout(function(){n&&n(r),a.manager.itemEnd(t)},0);else{let p=po.get(r);p===void 0&&(p=[],po.set(r,p)),p.push({onLoad:n,onError:s})}return r}let o=yo("img");function l(){d(),n&&n(this);let p=po.get(this)||[];for(let u=0;u<p.length;u++){let f=p[u];f.onLoad&&f.onLoad(this)}po.delete(this),a.manager.itemEnd(t)}function c(p){d(),s&&s(p),fh.remove(`image:${t}`);let u=po.get(this)||[];for(let f=0;f<u.length;f++){let v=u[f];v.onError&&v.onError(p)}po.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),fh.add(`image:${t}`,o),a.manager.itemStart(t),o.src=t,o}};var Kl=class extends To{constructor(t){super(t)}load(t,n,i,s){let a=new Mn,r=new Wh(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(o){a.image=o,a.needsUpdate=!0,n!==void 0&&n(a)},i,s),a}},$l=class extends Jn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}};var ng=new Be,SS=new k,bS=new k,cg=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eo,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;SS.setFromMatrixPosition(t.matrixWorld),n.position.copy(SS),bS.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(bS),n.updateMatrixWorld(),ng.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ng,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===_o||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ng)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},uh=new k,hh=new Hi,Pi=new k,tc=class extends Jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(uh,hh,Pi),Pi.x===1&&Pi.y===1&&Pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uh,hh,Pi.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(uh,hh,Pi),Pi.x===1&&Pi.y===1&&Pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uh,hh,Pi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},oa=new k,MS=new se,ES=new se,Ke=class extends tc{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Ah*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Lm*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ah*2*Math.atan(Math.tan(Lm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){oa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oa.x,oa.y).multiplyScalar(-t/oa.z),oa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(oa.x,oa.y).multiplyScalar(-t/oa.z)}getViewSize(t,n){return this.getViewBounds(t,MS,ES),n.subVectors(ES,MS)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Lm*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var ug=class extends cg{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0}},En=class extends $l{constructor(t,n,i=0,s=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ug}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}},ec=class extends tc{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Ka=class extends $l{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}};var mo=-90,go=1,qh=class extends Jn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(mo,go,t,n);s.layers=this.layers,this.add(s);let a=new Ke(mo,go,t,n);a.layers=this.layers,this.add(a);let r=new Ke(mo,go,t,n);r.layers=this.layers,this.add(r);let o=new Ke(mo,go,t,n);o.layers=this.layers,this.add(o);let l=new Ke(mo,go,t,n);l.layers=this.layers,this.add(l);let c=new Ke(mo,go,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_o)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,d]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(p,u,f),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Yh=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},$a=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=bT.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function bT(){this._document.hidden===!1&&this.reset()}var Og="\\[\\]\\.:\\/",MT=new RegExp("["+Og+"]","g"),Pg="[^"+Og+"]",ET="[^"+Og.replace("\\.","")+"]",TT=/((?:WC+[\/:])*)/.source.replace("WC",Pg),AT=/(WCOD+)?/.source.replace("WCOD",ET),wT=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Pg),CT=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Pg),RT=new RegExp("^"+TT+AT+wT+CT+"$"),DT=["material","materials","bones","map"],hg=class{constructor(t,n,i){let s=i||Re.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Re=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(MT,"")}static parseTrackName(t){let n=RT.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);DT.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Pt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=hg;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Y2=new Float32Array(1);function Bg(e,t,n,i){let s=NT(i);switch(n){case Cg:return e*t;case Dg:return e*t/s.components*s.byteLength;case td:return e*t/s.components*s.byteLength;case nr:return e*t*2/s.components*s.byteLength;case ed:return e*t*2/s.components*s.byteLength;case Rg:return e*t*3/s.components*s.byteLength;case di:return e*t*4/s.components*s.byteLength;case nd:return e*t*4/s.components*s.byteLength;case ac:case rc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oc:case lc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case sd:case rd:return Math.max(e,16)*Math.max(t,8)/4;case id:case ad:return Math.max(e,8)*Math.max(t,8)/2;case od:case ld:case ud:case hd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case cd:case dd:case fd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case md:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case gd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case vd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case _d:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case yd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case xd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case bd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Md:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ed:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Td:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ad:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case wd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Cd:case Rd:case Dd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Nd:case Ud:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ld:case Id:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function NT(e){switch(e){case Ln:case Eg:return{byteLength:1,components:1};case wo:case Tg:case Xi:return{byteLength:2,components:1};case Kh:case $h:return{byteLength:2,components:4};case Ti:case Qh:case Ai:return{byteLength:4,components:1};case Ag:case wg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Pt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function Ub(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function LT(e){let t=new WeakMap;function n(o,l){let c=o.array,d=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=e.HALF_FLOAT:f=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=e.SHORT;else if(c instanceof Uint32Array)f=e.UNSIGNED_INT;else if(c instanceof Int32Array)f=e.INT;else if(c instanceof Int8Array)f=e.BYTE;else if(c instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let d=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,d);else{p.sort((f,v)=>f.start-v.start);let u=0;for(let f=1;f<p.length;f++){let v=p[u],b=p[f];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++u,p[u]=b)}p.length=u+1;for(let f=0,v=p.length;f<v;f++){let b=p[f];e.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var IT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,OT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,PT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,BT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,HT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,VT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,XT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,YT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ZT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,JT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,QT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$T=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,eA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,iA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,aA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uA="gl_FragColor = linearToOutputTexel( gl_FragColor );",hA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,fA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_A=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,EA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,TA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,AA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,CA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,RA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,DA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,UA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,LA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,OA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,PA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,BA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,VA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ZA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$A=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ew=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ow=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_w=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ew=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Aw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ww=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Uw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ow=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ww=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$w=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tC=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eC=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nC=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sC=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aC=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rC=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oC=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uC=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:IT,alphahash_pars_fragment:OT,alphamap_fragment:PT,alphamap_pars_fragment:BT,alphatest_fragment:FT,alphatest_pars_fragment:zT,aomap_fragment:HT,aomap_pars_fragment:VT,batching_pars_vertex:GT,batching_vertex:kT,begin_vertex:XT,beginnormal_vertex:WT,bsdfs:qT,iridescence_fragment:YT,bumpmap_pars_fragment:ZT,clipping_planes_fragment:JT,clipping_planes_pars_fragment:jT,clipping_planes_pars_vertex:QT,clipping_planes_vertex:KT,color_fragment:$T,color_pars_fragment:tA,color_pars_vertex:eA,color_vertex:nA,common:iA,cube_uv_reflection_fragment:sA,defaultnormal_vertex:aA,displacementmap_pars_vertex:rA,displacementmap_vertex:oA,emissivemap_fragment:lA,emissivemap_pars_fragment:cA,colorspace_fragment:uA,colorspace_pars_fragment:hA,envmap_fragment:dA,envmap_common_pars_fragment:fA,envmap_pars_fragment:pA,envmap_pars_vertex:mA,envmap_physical_pars_fragment:AA,envmap_vertex:gA,fog_vertex:vA,fog_pars_vertex:_A,fog_fragment:yA,fog_pars_fragment:xA,gradientmap_pars_fragment:SA,lightmap_pars_fragment:bA,lights_lambert_fragment:MA,lights_lambert_pars_fragment:EA,lights_pars_begin:TA,lights_toon_fragment:wA,lights_toon_pars_fragment:CA,lights_phong_fragment:RA,lights_phong_pars_fragment:DA,lights_physical_fragment:NA,lights_physical_pars_fragment:UA,lights_fragment_begin:LA,lights_fragment_maps:IA,lights_fragment_end:OA,logdepthbuf_fragment:PA,logdepthbuf_pars_fragment:BA,logdepthbuf_pars_vertex:FA,logdepthbuf_vertex:zA,map_fragment:HA,map_pars_fragment:VA,map_particle_fragment:GA,map_particle_pars_fragment:kA,metalnessmap_fragment:XA,metalnessmap_pars_fragment:WA,morphinstance_vertex:qA,morphcolor_vertex:YA,morphnormal_vertex:ZA,morphtarget_pars_vertex:JA,morphtarget_vertex:jA,normal_fragment_begin:QA,normal_fragment_maps:KA,normal_pars_fragment:$A,normal_pars_vertex:tw,normal_vertex:ew,normalmap_pars_fragment:nw,clearcoat_normal_fragment_begin:iw,clearcoat_normal_fragment_maps:sw,clearcoat_pars_fragment:aw,iridescence_pars_fragment:rw,opaque_fragment:ow,packing:lw,premultiplied_alpha_fragment:cw,project_vertex:uw,dithering_fragment:hw,dithering_pars_fragment:dw,roughnessmap_fragment:fw,roughnessmap_pars_fragment:pw,shadowmap_pars_fragment:mw,shadowmap_pars_vertex:gw,shadowmap_vertex:vw,shadowmask_pars_fragment:_w,skinbase_vertex:yw,skinning_pars_vertex:xw,skinning_vertex:Sw,skinnormal_vertex:bw,specularmap_fragment:Mw,specularmap_pars_fragment:Ew,tonemapping_fragment:Tw,tonemapping_pars_fragment:Aw,transmission_fragment:ww,transmission_pars_fragment:Cw,uv_pars_fragment:Rw,uv_pars_vertex:Dw,uv_vertex:Nw,worldpos_vertex:Uw,background_vert:Lw,background_frag:Iw,backgroundCube_vert:Ow,backgroundCube_frag:Pw,cube_vert:Bw,cube_frag:Fw,depth_vert:zw,depth_frag:Hw,distance_vert:Vw,distance_frag:Gw,equirect_vert:kw,equirect_frag:Xw,linedashed_vert:Ww,linedashed_frag:qw,meshbasic_vert:Yw,meshbasic_frag:Zw,meshlambert_vert:Jw,meshlambert_frag:jw,meshmatcap_vert:Qw,meshmatcap_frag:Kw,meshnormal_vert:$w,meshnormal_frag:tC,meshphong_vert:eC,meshphong_frag:nC,meshphysical_vert:iC,meshphysical_frag:sC,meshtoon_vert:aC,meshtoon_frag:rC,points_vert:oC,points_frag:lC,shadow_vert:cC,shadow_frag:uC,sprite_vert:hC,sprite_frag:dC},ct={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},qi={basic:{uniforms:yn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:yn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:yn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:yn([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:yn([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:yn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:yn([ct.points,ct.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:yn([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:yn([ct.common,ct.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:yn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:yn([ct.sprite,ct.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:yn([ct.common,ct.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:yn([ct.lights,ct.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};qi.physical={uniforms:yn([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var Bd={r:0,b:0,g:0},sr=new Mi,fC=new Be;function pC(e,t,n,i,s,a){let r=new Wt(0),o=s===!0?0:1,l,c,d=null,p=0,u=null;function f(m){let _=m.isScene===!0?m.background:null;if(_&&_.isTexture){let S=m.backgroundBlurriness>0;_=t.get(_,S)}return _}function v(m){let _=!1,S=f(m);S===null?g(r,o):S&&S.isColor&&(g(S,1),_=!0);let T=e.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(m,_){let S=f(_);S&&(S.isCubeTexture||S.mapping===ic)?(c===void 0&&(c=new _t(new At(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:ir(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),sr.copy(_.backgroundRotation),sr.x*=-1,sr.y*=-1,sr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fC.makeRotationFromEuler(sr)),c.material.toneMapped=ee.getTransfer(S.colorSpace)!==le,(d!==S||p!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=S,p=S.version,u=e.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new _t(new Qa(2,2),new jn({name:"BackgroundMaterial",uniforms:ir(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:Ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ee.getTransfer(S.colorSpace)!==le,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||p!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,d=S,p=S.version,u=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,_){m.getRGB(Bd,Ig(e)),n.buffers.color.setClear(Bd.r,Bd.g,Bd.b,_,a)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(m,_=1){r.set(m),o=_,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,g(r,o)},render:v,addToRenderList:b,dispose:h}}function mC(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(D,P,A,U,B){let z=!1,H=p(D,U,A,P);a!==H&&(a=H,c(a.object)),z=f(D,U,A,B),z&&v(D,U,A,B),B!==null&&t.update(B,e.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,S(D,P,A,U),B!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return e.createVertexArray()}function c(D){return e.bindVertexArray(D)}function d(D){return e.deleteVertexArray(D)}function p(D,P,A,U){let B=U.wireframe===!0,z=i[P.id];z===void 0&&(z={},i[P.id]=z);let H=D.isInstancedMesh===!0?D.id:0,$=z[H];$===void 0&&($={},z[H]=$);let K=$[A.id];K===void 0&&(K={},$[A.id]=K);let dt=K[B];return dt===void 0&&(dt=u(l()),K[B]=dt),dt}function u(D){let P=[],A=[],U=[];for(let B=0;B<n;B++)P[B]=0,A[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:A,attributeDivisors:U,object:D,attributes:{},index:null}}function f(D,P,A,U){let B=a.attributes,z=P.attributes,H=0,$=A.getAttributes();for(let K in $)if($[K].location>=0){let gt=B[K],ft=z[K];if(ft===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(ft=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(ft=D.instanceColor)),gt===void 0||gt.attribute!==ft||ft&&gt.data!==ft.data)return!0;H++}return a.attributesNum!==H||a.index!==U}function v(D,P,A,U){let B={},z=P.attributes,H=0,$=A.getAttributes();for(let K in $)if($[K].location>=0){let gt=z[K];gt===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(gt=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(gt=D.instanceColor));let ft={};ft.attribute=gt,gt&&gt.data&&(ft.data=gt.data),B[K]=ft,H++}a.attributes=B,a.attributesNum=H,a.index=U}function b(){let D=a.newAttributes;for(let P=0,A=D.length;P<A;P++)D[P]=0}function g(D){h(D,0)}function h(D,P){let A=a.newAttributes,U=a.enabledAttributes,B=a.attributeDivisors;A[D]=1,U[D]===0&&(e.enableVertexAttribArray(D),U[D]=1),B[D]!==P&&(e.vertexAttribDivisor(D,P),B[D]=P)}function m(){let D=a.newAttributes,P=a.enabledAttributes;for(let A=0,U=P.length;A<U;A++)P[A]!==D[A]&&(e.disableVertexAttribArray(A),P[A]=0)}function _(D,P,A,U,B,z,H){H===!0?e.vertexAttribIPointer(D,P,A,B,z):e.vertexAttribPointer(D,P,A,U,B,z)}function S(D,P,A,U){b();let B=U.attributes,z=A.getAttributes(),H=P.defaultAttributeValues;for(let $ in z){let K=z[$];if(K.location>=0){let dt=B[$];if(dt===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(dt=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(dt=D.instanceColor)),dt!==void 0){let gt=dt.normalized,ft=dt.itemSize,Xt=t.get(dt);if(Xt===void 0)continue;let ne=Xt.buffer,fe=Xt.type,Z=Xt.bytesPerElement,st=fe===e.INT||fe===e.UNSIGNED_INT||dt.gpuType===Qh;if(dt.isInterleavedBufferAttribute){let at=dt.data,Ft=at.stride,Nt=dt.offset;if(at.isInstancedInterleavedBuffer){for(let Ut=0;Ut<K.locationSize;Ut++)h(K.location+Ut,at.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ut=0;Ut<K.locationSize;Ut++)g(K.location+Ut);e.bindBuffer(e.ARRAY_BUFFER,ne);for(let Ut=0;Ut<K.locationSize;Ut++)_(K.location+Ut,ft/K.locationSize,fe,gt,Ft*Z,(Nt+ft/K.locationSize*Ut)*Z,st)}else{if(dt.isInstancedBufferAttribute){for(let at=0;at<K.locationSize;at++)h(K.location+at,dt.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let at=0;at<K.locationSize;at++)g(K.location+at);e.bindBuffer(e.ARRAY_BUFFER,ne);for(let at=0;at<K.locationSize;at++)_(K.location+at,ft/K.locationSize,fe,gt,ft*Z,ft/K.locationSize*at*Z,st)}}else if(H!==void 0){let gt=H[$];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(K.location,gt);break;case 3:e.vertexAttrib3fv(K.location,gt);break;case 4:e.vertexAttrib4fv(K.location,gt);break;default:e.vertexAttrib1fv(K.location,gt)}}}}m()}function T(){M();for(let D in i){let P=i[D];for(let A in P){let U=P[A];for(let B in U){let z=U[B];for(let H in z)d(z[H].object),delete z[H];delete U[B]}}delete i[D]}}function C(D){if(i[D.id]===void 0)return;let P=i[D.id];for(let A in P){let U=P[A];for(let B in U){let z=U[B];for(let H in z)d(z[H].object),delete z[H];delete U[B]}}delete i[D.id]}function R(D){for(let P in i){let A=i[P];for(let U in A){let B=A[U];if(B[D.id]===void 0)continue;let z=B[D.id];for(let H in z)d(z[H].object),delete z[H];delete B[D.id]}}}function x(D){for(let P in i){let A=i[P],U=D.isInstancedMesh===!0?D.id:0,B=A[U];if(B!==void 0){for(let z in B){let H=B[z];for(let $ in H)d(H[$].object),delete H[$];delete B[z]}delete A[U],Object.keys(A).length===0&&delete i[P]}}}function M(){F(),r=!0,a!==s&&(a=s,c(a.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:F,dispose:T,releaseStatesOfGeometry:C,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:g,disableUnusedAttributes:m}}function gC(e,t,n){let i;function s(c){i=c}function a(c,d){e.drawArrays(i,c,d),n.update(d,i,1)}function r(c,d,p){p!==0&&(e.drawArraysInstanced(i,c,d,p),n.update(d,i,p))}function o(c,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,p);let f=0;for(let v=0;v<p;v++)f+=d[v];n.update(f,i,1)}function l(c,d,p,u){if(p===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)r(c[v],d[v],u[v]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,p);let v=0;for(let b=0;b<p;b++)v+=d[b]*u[b];n.update(v,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function vC(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==di&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let x=R===Xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Ln&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ai&&!x)}function l(R){if(R==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",d=l(c);d!==c&&(Pt("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:S,maxSamples:T,samples:C}}function _C(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Bi,o=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let f=p.length!==0||u||i!==0||s;return s=u,i=p.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=d(p,u,0)},this.setState=function(p,u,f){let v=p.clippingPlanes,b=p.clipIntersection,g=p.clipShadows,h=e.get(p);if(!s||v===null||v.length===0||a&&!g)a?d(null):c();else{let m=a?0:i,_=m*4,S=h.clippingState||null;l.value=S,S=d(v,u,_,f);for(let T=0;T!==_;++T)S[T]=n[T];h.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(p,u,f,v){let b=p!==null?p.length:0,g=null;if(b!==0){if(g=l.value,v!==!0||g===null){let h=f+b*4,m=u.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<h)&&(g=new Float32Array(h));for(let _=0,S=f;_!==b;++_,S+=4)r.copy(p[_]).applyMatrix4(m,o),r.normal.toArray(g,S),g[S+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,g}}var xa=4,ub=[.125,.215,.35,.446,.526,.582],rr=20,yC=256,uc=new ec,hb=new Wt,Fg=null,zg=0,Hg=0,Vg=!1,xC=new k,No=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=xC}=a;Fg=this._renderer.getRenderTarget(),zg=this._renderer.getActiveCubeFace(),Hg=this._renderer.getActiveMipmapLevel(),Vg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pb(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fb(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Fg,zg,Hg),this._renderer.xr.enabled=Vg,t.scissorTest=!1,Ro(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===va||t.mapping===er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fg=this._renderer.getRenderTarget(),zg=this._renderer.getActiveCubeFace(),Hg=this._renderer.getActiveMipmapLevel(),Vg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Xi,format:di,colorSpace:ja,depthBuffer:!1},s=db(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=db(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=SC(a)),this._blurMaterial=MC(a,t,n),this._ggxMaterial=bC(a,t,n)}return s}_compileMaterial(t){let n=new _t(new Vi,t);this._renderer.compile(n,uc)}_sceneToCubeUV(t,n,i,s,a){let l=new Ke(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(hb),p.toneMapping=Ei,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _t(new At,new Zl({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,h=!1,m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,h=!0):(g.color.copy(hb),h=!0);for(let _=0;_<6;_++){let S=_%3;S===0?(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[_],a.y,a.z)):S===1?(l.up.set(0,0,c[_]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[_],a.z)):(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[_]));let T=this._cubeSize;Ro(s,S*T,_>2?T:0,T,T),p.setRenderTarget(s),h&&p.render(b,l),p.render(t,l)}p.toneMapping=f,p.autoClear=u,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===va||t.mapping===er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pb()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fb());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;Ro(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,uc)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,f=p*u,{_lodMax:v}=this,b=this._sizeLods[i],g=3*b*(i>v-xa?i-v+xa:0),h=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=v-n,Ro(a,g,h,3*b,2*b),s.setRenderTarget(a),s.render(o,uc),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=v-i,Ro(t,g,h,3*b,2*b),s.setRenderTarget(t),s.render(o,uc)}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Ot("blur direction must be either latitudinal or longitudinal!");let d=3,p=this._lodMeshes[s];p.material=c;let u=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*rr-1),b=a/v,g=isFinite(a)?1+Math.floor(d*b):rr;g>rr&&Pt(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${rr}`);let h=[],m=0;for(let R=0;R<rr;++R){let x=R/b,M=Math.exp(-x*x/2);h.push(M),R===0?m+=M:R<g&&(m+=2*M)}for(let R=0;R<h.length;R++)h[R]=h[R]/m;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=v,u.mipInt.value=_-i;let S=this._sizeLods[s],T=3*S*(s>_-xa?s-_+xa:0),C=4*(this._cubeSize-S);Ro(n,T,C,3*S,2*S),l.setRenderTarget(n),l.render(p,uc)}};function SC(e){let t=[],n=[],i=[],s=e,a=e-xa+1+ub.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);t.push(o);let l=1/o;r>e-xa?l=ub[r-e+xa-1]:r===0&&(l=0),n.push(l);let c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],f=6,v=6,b=3,g=2,h=1,m=new Float32Array(b*v*f),_=new Float32Array(g*v*f),S=new Float32Array(h*v*f);for(let C=0;C<f;C++){let R=C%3*2/3-1,x=C>2?0:-1,M=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];m.set(M,b*v*C),_.set(u,g*v*C);let F=[C,C,C,C,C,C];S.set(F,h*v*C)}let T=new Vi;T.setAttribute("position",new Yn(m,b)),T.setAttribute("uv",new Yn(_,g)),T.setAttribute("faceIndex",new Yn(S,h)),i.push(new _t(T,null)),s>xa&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function db(e,t,n){let i=new Zn(e,t,n);return i.texture.mapping=ic,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ro(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function bC(e,t,n){return new jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yC,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function MC(e,t,n){let i=new Float32Array(rr),s=new k(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:rr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function fb(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function pb(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Hd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var zd=class extends Zn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Jl(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new At(5,5,5),a=new jn({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Fe,blending:ki});a.uniforms.tEquirect.value=n;let r=new _t(s,a),o=n.minFilter;return n.minFilter===_a&&(n.minFilter=pn),new qh(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function EC(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){let f=u.mapping;if(f===Zh||f===Jh)if(t.has(u)){let v=t.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let b=new zd(v.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let f=u.mapping,v=f===Zh||f===Jh,b=f===va||f===er;if(v||b){let g=n.get(u),h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new No(e)),g=v?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{let m=u.image;return v&&m&&m.height>0||b&&m&&l(m)?(i===null&&(i=new No(e)),g=v?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,f){return f===Zh?u.mapping=va:f===Jh&&(u.mapping=er),u}function l(u){let f=0,v=6;for(let b=0;b<v;b++)u[b]!==void 0&&f++;return f===v}function c(u){let f=u.target;f.removeEventListener("dispose",c);let v=t.get(f);v!==void 0&&(t.delete(f),v.dispose())}function d(u){let f=u.target;f.removeEventListener("dispose",d);let v=n.get(f);v!==void 0&&(n.delete(f),v.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function TC(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&kl("WebGLRenderer: "+i+" extension not supported."),s}}}function AC(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let v in u.attributes)t.remove(u.attributes[v]);u.removeEventListener("dispose",r),delete s[u.id];let f=a.get(u);f&&(t.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let f in u)t.update(u[f],e.ARRAY_BUFFER)}function c(p){let u=[],f=p.index,v=p.attributes.position,b=0;if(v===void 0)return;if(f!==null){let m=f.array;b=f.version;for(let _=0,S=m.length;_<S;_+=3){let T=m[_+0],C=m[_+1],R=m[_+2];u.push(T,C,C,R,R,T)}}else{let m=v.array;b=v.version;for(let _=0,S=m.length/3-1;_<S;_+=3){let T=_+0,C=_+1,R=_+2;u.push(T,C,C,R,R,T)}}let g=new(v.count>=65535?Yl:ql)(u,1);g.version=b;let h=a.get(p);h&&t.remove(h),a.set(p,g)}function d(p){let u=a.get(p);if(u){let f=p.index;f!==null&&u.version<f.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function wC(e,t,n){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,f){e.drawElements(i,f,a,u*r),n.update(f,i,1)}function c(u,f,v){v!==0&&(e.drawElementsInstanced(i,f,a,u*r,v),n.update(f,i,v))}function d(u,f,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,v);let g=0;for(let h=0;h<v;h++)g+=f[h];n.update(g,i,1)}function p(u,f,v,b){if(v===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<u.length;h++)c(u[h]/r,f[h],b[h]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,b,0,v);let h=0;for(let m=0;m<v;m++)h+=f[m]*b[m];n.update(h,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function CC(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Ot("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function RC(e,t,n){let i=new WeakMap,s=new Le;function a(r,o,l){let c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==p){let M=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],m=o.morphAttributes.color||[],_=0;f===!0&&(_=1),v===!0&&(_=2),b===!0&&(_=3);let S=o.attributes.position.count*_,T=1;S>t.maxTextureSize&&(T=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let C=new Float32Array(S*T*4*p),R=new Xl(C,S,T,p);R.type=Ai,R.needsUpdate=!0;let x=_*4;for(let F=0;F<p;F++){let D=g[F],P=h[F],A=m[F],U=S*T*4*F;for(let B=0;B<D.count;B++){let z=B*x;f===!0&&(s.fromBufferAttribute(D,B),C[U+z+0]=s.x,C[U+z+1]=s.y,C[U+z+2]=s.z,C[U+z+3]=0),v===!0&&(s.fromBufferAttribute(P,B),C[U+z+4]=s.x,C[U+z+5]=s.y,C[U+z+6]=s.z,C[U+z+7]=0),b===!0&&(s.fromBufferAttribute(A,B),C[U+z+8]=s.x,C[U+z+9]=s.y,C[U+z+10]=s.z,C[U+z+11]=A.itemSize===4?s.w:1)}}u={count:p,texture:R,size:new se(S,T)},i.set(o,u),o.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let v=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(e,"morphTargetBaseInfluence",v),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function DC(e,t,n,i,s){let a=new WeakMap;function r(c){let d=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==d&&(t.update(u),a.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){let f=c.skeleton;a.get(f)!==d&&(f.update(),a.set(f,d))}return u}function o(){a=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}var NC={[vg]:"LINEAR_TONE_MAPPING",[_g]:"REINHARD_TONE_MAPPING",[yg]:"CINEON_TONE_MAPPING",[tr]:"ACES_FILMIC_TONE_MAPPING",[Sg]:"AGX_TONE_MAPPING",[bg]:"NEUTRAL_TONE_MAPPING",[xg]:"CUSTOM_TONE_MAPPING"};function UC(e,t,n,i,s){let a=new Zn(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),r=new Zn(t,n,{type:Xi,depthBuffer:!1,stencilBuffer:!1}),o=new Vi;o.setAttribute("position",new hi([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new hi([0,2,0,0,2,0],2));let l=new Lh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new _t(o,l),d=new ec(-1,1,1,-1,0,1),p=null,u=null,f=!1,v,b=null,g=[],h=!1;this.setSize=function(m,_){a.setSize(m,_),r.setSize(m,_);for(let S=0;S<g.length;S++){let T=g[S];T.setSize&&T.setSize(m,_)}},this.setEffects=function(m){g=m,h=g.length>0&&g[0].isRenderPass===!0;let _=a.width,S=a.height;for(let T=0;T<g.length;T++){let C=g[T];C.setSize&&C.setSize(_,S)}},this.begin=function(m,_){if(f||m.toneMapping===Ei&&g.length===0)return!1;if(b=_,_!==null){let S=_.width,T=_.height;(a.width!==S||a.height!==T)&&this.setSize(S,T)}return h===!1&&m.setRenderTarget(a),v=m.toneMapping,m.toneMapping=Ei,!0},this.hasRenderPass=function(){return h},this.end=function(m,_){m.toneMapping=v,f=!0;let S=a,T=r;for(let C=0;C<g.length;C++){let R=g[C];if(R.enabled!==!1&&(R.render(m,T,S,_),R.needsSwap!==!1)){let x=S;S=T,T=x}}if(p!==m.outputColorSpace||u!==m.toneMapping){p=m.outputColorSpace,u=m.toneMapping,l.defines={},ee.getTransfer(p)===le&&(l.defines.SRGB_TRANSFER="");let C=NC[u];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,m.setRenderTarget(b),m.render(c,d),b=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),l.dispose()}}var Lb=new Mn,Xg=new fa(1,1),Ib=new Xl,Ob=new Rh,Pb=new Jl,mb=[],gb=[],vb=new Float32Array(16),_b=new Float32Array(9),yb=new Float32Array(4);function Lo(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=mb[s];if(a===void 0&&(a=new Float32Array(s),mb[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function $e(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function tn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Vd(e,t){let n=gb[t];n===void 0&&(n=new Int32Array(t),gb[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function LC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function IC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($e(n,t))return;e.uniform2fv(this.addr,t),tn(n,t)}}function OC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if($e(n,t))return;e.uniform3fv(this.addr,t),tn(n,t)}}function PC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($e(n,t))return;e.uniform4fv(this.addr,t),tn(n,t)}}function BC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if($e(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),tn(n,t)}else{if($e(n,i))return;yb.set(i),e.uniformMatrix2fv(this.addr,!1,yb),tn(n,i)}}function FC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if($e(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),tn(n,t)}else{if($e(n,i))return;_b.set(i),e.uniformMatrix3fv(this.addr,!1,_b),tn(n,i)}}function zC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if($e(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),tn(n,t)}else{if($e(n,i))return;vb.set(i),e.uniformMatrix4fv(this.addr,!1,vb),tn(n,i)}}function HC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function VC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($e(n,t))return;e.uniform2iv(this.addr,t),tn(n,t)}}function GC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($e(n,t))return;e.uniform3iv(this.addr,t),tn(n,t)}}function kC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($e(n,t))return;e.uniform4iv(this.addr,t),tn(n,t)}}function XC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function WC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($e(n,t))return;e.uniform2uiv(this.addr,t),tn(n,t)}}function qC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($e(n,t))return;e.uniform3uiv(this.addr,t),tn(n,t)}}function YC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($e(n,t))return;e.uniform4uiv(this.addr,t),tn(n,t)}}function ZC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(Xg.compareFunction=n.isReversedDepthBuffer()?Pd:Od,a=Xg):a=Lb,n.setTexture2D(t||a,s)}function JC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||Ob,s)}function jC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Pb,s)}function QC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Ib,s)}function KC(e){switch(e){case 5126:return LC;case 35664:return IC;case 35665:return OC;case 35666:return PC;case 35674:return BC;case 35675:return FC;case 35676:return zC;case 5124:case 35670:return HC;case 35667:case 35671:return VC;case 35668:case 35672:return GC;case 35669:case 35673:return kC;case 5125:return XC;case 36294:return WC;case 36295:return qC;case 36296:return YC;case 35678:case 36198:case 36298:case 36306:case 35682:return ZC;case 35679:case 36299:case 36307:return JC;case 35680:case 36300:case 36308:case 36293:return jC;case 36289:case 36303:case 36311:case 36292:return QC}}function $C(e,t){e.uniform1fv(this.addr,t)}function tR(e,t){let n=Lo(t,this.size,2);e.uniform2fv(this.addr,n)}function eR(e,t){let n=Lo(t,this.size,3);e.uniform3fv(this.addr,n)}function nR(e,t){let n=Lo(t,this.size,4);e.uniform4fv(this.addr,n)}function iR(e,t){let n=Lo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function sR(e,t){let n=Lo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function aR(e,t){let n=Lo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function rR(e,t){e.uniform1iv(this.addr,t)}function oR(e,t){e.uniform2iv(this.addr,t)}function lR(e,t){e.uniform3iv(this.addr,t)}function cR(e,t){e.uniform4iv(this.addr,t)}function uR(e,t){e.uniform1uiv(this.addr,t)}function hR(e,t){e.uniform2uiv(this.addr,t)}function dR(e,t){e.uniform3uiv(this.addr,t)}function fR(e,t){e.uniform4uiv(this.addr,t)}function pR(e,t,n){let i=this.cache,s=t.length,a=Vd(n,s);$e(i,a)||(e.uniform1iv(this.addr,a),tn(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=Xg:r=Lb;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function mR(e,t,n){let i=this.cache,s=t.length,a=Vd(n,s);$e(i,a)||(e.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||Ob,a[r])}function gR(e,t,n){let i=this.cache,s=t.length,a=Vd(n,s);$e(i,a)||(e.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||Pb,a[r])}function vR(e,t,n){let i=this.cache,s=t.length,a=Vd(n,s);$e(i,a)||(e.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||Ib,a[r])}function _R(e){switch(e){case 5126:return $C;case 35664:return tR;case 35665:return eR;case 35666:return nR;case 35674:return iR;case 35675:return sR;case 35676:return aR;case 5124:case 35670:return rR;case 35667:case 35671:return oR;case 35668:case 35672:return lR;case 35669:case 35673:return cR;case 5125:return uR;case 36294:return hR;case 36295:return dR;case 36296:return fR;case 35678:case 36198:case 36298:case 36306:case 35682:return pR;case 35679:case 36299:case 36307:return mR;case 35680:case 36300:case 36308:case 36293:return gR;case 36289:case 36303:case 36311:case 36292:return vR}}var Wg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=KC(n.type)}},qg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=_R(n.type)}},Yg=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Gg=/(\w+)(\])?(\[|\.)?/g;function xb(e,t){e.seq.push(t),e.map[t.id]=t}function yR(e,t,n){let i=e.name,s=i.length;for(Gg.lastIndex=0;;){let a=Gg.exec(i),r=Gg.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){xb(n,c===void 0?new Wg(o,e,t):new qg(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new Yg(o),xb(n,p)),n=p}}}var Do=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);yR(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function Sb(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var xR=37297,SR=0;function bR(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var bb=new kt;function MR(e){ee._getMatrix(bb,ee.workingColorSpace,e);let t=`mat3( ${bb.elements.map(n=>n.toFixed(4))} )`;switch(ee.getTransfer(e)){case Gl:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Pt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Mb(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+bR(e.getShaderSource(t),o)}else return a}function ER(e,t){let n=MR(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var TR={[vg]:"Linear",[_g]:"Reinhard",[yg]:"Cineon",[tr]:"ACESFilmic",[Sg]:"AgX",[bg]:"Neutral",[xg]:"Custom"};function AR(e,t){let n=TR[t];return n===void 0?(Pt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Fd=new k;function wR(){ee.getLuminanceCoefficients(Fd);let e=Fd.x.toFixed(4),t=Fd.y.toFixed(4),n=Fd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dc).join(`
`)}function RR(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function DR(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function dc(e){return e!==""}function Eb(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var NR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zg(e){return e.replace(NR,LR)}var UR=new Map;function LR(e,t){let n=qt[t];if(n===void 0){let i=UR.get(t);if(i!==void 0)n=qt[i],Pt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Zg(n)}var IR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ab(e){return e.replace(IR,OR)}function OR(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function wb(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var PR={[nc]:"SHADOWMAP_TYPE_PCF",[Ao]:"SHADOWMAP_TYPE_VSM"};function BR(e){return PR[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var FR={[va]:"ENVMAP_TYPE_CUBE",[er]:"ENVMAP_TYPE_CUBE",[ic]:"ENVMAP_TYPE_CUBE_UV"};function zR(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":FR[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var HR={[er]:"ENVMAP_MODE_REFRACTION"};function VR(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":HR[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var GR={[gg]:"ENVMAP_BLENDING_MULTIPLY",[qS]:"ENVMAP_BLENDING_MIX",[YS]:"ENVMAP_BLENDING_ADD"};function kR(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":GR[e.combine]||"ENVMAP_BLENDING_NONE"}function XR(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function WR(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=BR(n),c=zR(n),d=VR(n),p=kR(n),u=XR(n),f=CR(n),v=RR(a),b=s.createProgram(),g,h,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(dc).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(dc).join(`
`),h.length>0&&(h+=`
`)):(g=[wb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dc).join(`
`),h=[wb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ei?"#define TONE_MAPPING":"",n.toneMapping!==Ei?qt.tonemapping_pars_fragment:"",n.toneMapping!==Ei?AR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,ER("linearToOutputTexel",n.outputColorSpace),wR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(dc).join(`
`)),r=Zg(r),r=Eb(r,n),r=Tb(r,n),o=Zg(o),o=Eb(o,n),o=Tb(o,n),r=Ab(r),o=Ab(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===Ug?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ug?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let _=m+g+r,S=m+h+o,T=Sb(s,s.VERTEX_SHADER,_),C=Sb(s,s.FRAGMENT_SHADER,S);s.attachShader(b,T),s.attachShader(b,C),n.index0AttributeName!==void 0?s.bindAttribLocation(b,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function R(D){if(e.debug.checkShaderErrors){let P=s.getProgramInfoLog(b)||"",A=s.getShaderInfoLog(T)||"",U=s.getShaderInfoLog(C)||"",B=P.trim(),z=A.trim(),H=U.trim(),$=!0,K=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if($=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,b,T,C);else{let dt=Mb(s,T,"vertex"),gt=Mb(s,C,"fragment");Ot("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+dt+`
`+gt)}else B!==""?Pt("WebGLProgram: Program Info Log:",B):(z===""||H==="")&&(K=!1);K&&(D.diagnostics={runnable:$,programLog:B,vertexShader:{log:z,prefix:g},fragmentShader:{log:H,prefix:h}})}s.deleteShader(T),s.deleteShader(C),x=new Do(s,b),M=DR(s,b)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(b,xR)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=SR++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=T,this.fragmentShader=C,this}var qR=0,Jg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new jg(t),n.set(t,i)),i}},jg=class{constructor(t){this.id=qR++,this.code=t,this.usedTimes=0}};function YR(e,t,n,i,s,a){let r=new Wl,o=new Jg,l=new Set,c=[],d=new Map,p=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function b(x,M,F,D,P){let A=D.fog,U=P.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=t.get(x.envMap||B,z),$=H&&H.mapping===ic?H.image.height:null,K=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Pt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let dt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,gt=dt!==void 0?dt.length:0,ft=0;U.morphAttributes.position!==void 0&&(ft=1),U.morphAttributes.normal!==void 0&&(ft=2),U.morphAttributes.color!==void 0&&(ft=3);let Xt,ne,fe,Z;if(K){let ue=qi[K];Xt=ue.vertexShader,ne=ue.fragmentShader}else Xt=x.vertexShader,ne=x.fragmentShader,o.update(x),fe=o.getVertexShaderID(x),Z=o.getFragmentShaderID(x);let st=e.getRenderTarget(),at=e.state.buffers.depth.getReversed(),Ft=P.isInstancedMesh===!0,Nt=P.isBatchedMesh===!0,Ut=!!x.map,ze=!!x.matcap,lt=!!H,Dt=!!x.aoMap,Qt=!!x.lightMap,zt=!!x.bumpMap,Ee=!!x.normalMap,N=!!x.displacementMap,Xe=!!x.emissiveMap,oe=!!x.metalnessMap,xe=!!x.roughnessMap,Et=x.anisotropy>0,w=x.clearcoat>0,y=x.dispersion>0,I=x.iridescence>0,J=x.sheen>0,Q=x.transmission>0,Y=Et&&!!x.anisotropyMap,yt=w&&!!x.clearcoatMap,rt=w&&!!x.clearcoatNormalMap,Rt=w&&!!x.clearcoatRoughnessMap,Lt=I&&!!x.iridescenceMap,tt=I&&!!x.iridescenceThicknessMap,nt=J&&!!x.sheenColorMap,xt=J&&!!x.sheenRoughnessMap,bt=!!x.specularMap,pt=!!x.specularColorMap,Yt=!!x.specularIntensityMap,L=Q&&!!x.transmissionMap,ot=Q&&!!x.thicknessMap,it=!!x.gradientMap,vt=!!x.alphaMap,et=x.alphaTest>0,q=!!x.alphaHash,St=!!x.extensions,Bt=Ei;x.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Bt=e.toneMapping);let Se={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:Xt,fragmentShader:ne,defines:x.defines,customVertexShaderID:fe,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Nt,batchingColor:Nt&&P._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&P.instanceColor!==null,instancingMorph:Ft&&P.morphTexture!==null,outputColorSpace:st===null?e.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ja,alphaToCoverage:!!x.alphaToCoverage,map:Ut,matcap:ze,envMap:lt,envMapMode:lt&&H.mapping,envMapCubeUVHeight:$,aoMap:Dt,lightMap:Qt,bumpMap:zt,normalMap:Ee,displacementMap:N,emissiveMap:Xe,normalMapObjectSpace:Ee&&x.normalMapType===jS,normalMapTangentSpace:Ee&&x.normalMapType===Ng,metalnessMap:oe,roughnessMap:xe,anisotropy:Et,anisotropyMap:Y,clearcoat:w,clearcoatMap:yt,clearcoatNormalMap:rt,clearcoatRoughnessMap:Rt,dispersion:y,iridescence:I,iridescenceMap:Lt,iridescenceThicknessMap:tt,sheen:J,sheenColorMap:nt,sheenRoughnessMap:xt,specularMap:bt,specularColorMap:pt,specularIntensityMap:Yt,transmission:Q,transmissionMap:L,thicknessMap:ot,gradientMap:it,opaque:x.transparent===!1&&x.blending===Za&&x.alphaToCoverage===!1,alphaMap:vt,alphaTest:et,alphaHash:q,combine:x.combine,mapUv:Ut&&v(x.map.channel),aoMapUv:Dt&&v(x.aoMap.channel),lightMapUv:Qt&&v(x.lightMap.channel),bumpMapUv:zt&&v(x.bumpMap.channel),normalMapUv:Ee&&v(x.normalMap.channel),displacementMapUv:N&&v(x.displacementMap.channel),emissiveMapUv:Xe&&v(x.emissiveMap.channel),metalnessMapUv:oe&&v(x.metalnessMap.channel),roughnessMapUv:xe&&v(x.roughnessMap.channel),anisotropyMapUv:Y&&v(x.anisotropyMap.channel),clearcoatMapUv:yt&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Rt&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:xt&&v(x.sheenRoughnessMap.channel),specularMapUv:bt&&v(x.specularMap.channel),specularColorMapUv:pt&&v(x.specularColorMap.channel),specularIntensityMapUv:Yt&&v(x.specularIntensityMap.channel),transmissionMapUv:L&&v(x.transmissionMap.channel),thicknessMapUv:ot&&v(x.thicknessMap.channel),alphaMapUv:vt&&v(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ee||Et),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!U.attributes.uv&&(Ut||vt),fog:!!A,useFog:x.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&Ee===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:at,skinning:P.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:ft,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&F.length>0,shadowMapType:e.shadowMap.type,toneMapping:Bt,decodeVideoTexture:Ut&&x.map.isVideoTexture===!0&&ee.getTransfer(x.map.colorSpace)===le,decodeVideoTextureEmissive:Xe&&x.emissiveMap.isVideoTexture===!0&&ee.getTransfer(x.emissiveMap.colorSpace)===le,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Gi,flipSided:x.side===Fe,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:St&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&x.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function g(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let F in x.defines)M.push(F),M.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(h(M,x),m(M,x),M.push(e.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function h(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function m(x,M){r.disableAll(),M.instancing&&r.enable(0),M.instancingColor&&r.enable(1),M.instancingMorph&&r.enable(2),M.matcap&&r.enable(3),M.envMap&&r.enable(4),M.normalMapObjectSpace&&r.enable(5),M.normalMapTangentSpace&&r.enable(6),M.clearcoat&&r.enable(7),M.iridescence&&r.enable(8),M.alphaTest&&r.enable(9),M.vertexColors&&r.enable(10),M.vertexAlphas&&r.enable(11),M.vertexUv1s&&r.enable(12),M.vertexUv2s&&r.enable(13),M.vertexUv3s&&r.enable(14),M.vertexTangents&&r.enable(15),M.anisotropy&&r.enable(16),M.alphaHash&&r.enable(17),M.batching&&r.enable(18),M.dispersion&&r.enable(19),M.batchingColor&&r.enable(20),M.gradientMap&&r.enable(21),x.push(r.mask),r.disableAll(),M.fog&&r.enable(0),M.useFog&&r.enable(1),M.flatShading&&r.enable(2),M.logarithmicDepthBuffer&&r.enable(3),M.reversedDepthBuffer&&r.enable(4),M.skinning&&r.enable(5),M.morphTargets&&r.enable(6),M.morphNormals&&r.enable(7),M.morphColors&&r.enable(8),M.premultipliedAlpha&&r.enable(9),M.shadowMapEnabled&&r.enable(10),M.doubleSided&&r.enable(11),M.flipSided&&r.enable(12),M.useDepthPacking&&r.enable(13),M.dithering&&r.enable(14),M.transmission&&r.enable(15),M.sheen&&r.enable(16),M.opaque&&r.enable(17),M.pointsUvs&&r.enable(18),M.decodeVideoTexture&&r.enable(19),M.decodeVideoTextureEmissive&&r.enable(20),M.alphaToCoverage&&r.enable(21),x.push(r.mask)}function _(x){let M=f[x.type],F;if(M){let D=qi[M];F=lb.clone(D.uniforms)}else F=x.uniforms;return F}function S(x,M){let F=d.get(M);return F!==void 0?++F.usedTimes:(F=new WR(e,M,x,s),c.push(F),d.set(M,F)),F}function T(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function C(x){o.remove(x)}function R(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:T,releaseShaderCache:C,programs:c,dispose:R}}function ZR(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function JR(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Cb(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Rb(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,v,b,g,h){let m=e[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:v,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:g,group:h},e[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=v,m.materialVariant=r(u),m.groupOrder=b,m.renderOrder=u.renderOrder,m.z=g,m.group=h),t++,m}function l(u,f,v,b,g,h){let m=o(u,f,v,b,g,h);v.transmission>0?i.push(m):v.transparent===!0?s.push(m):n.push(m)}function c(u,f,v,b,g,h){let m=o(u,f,v,b,g,h);v.transmission>0?i.unshift(m):v.transparent===!0?s.unshift(m):n.unshift(m)}function d(u,f){n.length>1&&n.sort(u||JR),i.length>1&&i.sort(f||Cb),s.length>1&&s.sort(f||Cb)}function p(){for(let u=t,f=e.length;u<f;u++){let v=e[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:d}}function jR(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new Rb,e.set(i,[r])):s>=a.length?(r=new Rb,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function QR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new k,color:new Wt};break;case"SpotLight":n={position:new k,direction:new k,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new k,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new k,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":n={color:new Wt,position:new k,halfWidth:new k,halfHeight:new k};break}return e[t.id]=n,n}}}function KR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var $R=0;function t2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function e2(e){let t=new QR,n=KR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let s=new k,a=new Be,r=new Be;function o(c){let d=0,p=0,u=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,v=0,b=0,g=0,h=0,m=0,_=0,S=0,T=0,C=0,R=0;c.sort(t2);for(let M=0,F=c.length;M<F;M++){let D=c[M],P=D.color,A=D.intensity,U=D.distance,B=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===nr?B=D.shadow.map.texture:B=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=P.r*A,p+=P.g*A,u+=P.b*A;else if(D.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(D.sh.coefficients[z],A);R++}else if(D.isDirectionalLight){let z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,$=n.get(D);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,i.directionalShadow[f]=$,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=D.shadow.matrix,m++}i.directional[f]=z,f++}else if(D.isSpotLight){let z=t.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(P).multiplyScalar(A),z.distance=U,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,i.spot[b]=z;let H=D.shadow;if(D.map&&(i.spotLightMap[T]=D.map,T++,H.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[b]=H.matrix,D.castShadow){let $=n.get(D);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,i.spotShadow[b]=$,i.spotShadowMap[b]=B,S++}b++}else if(D.isRectAreaLight){let z=t.get(D);z.color.copy(P).multiplyScalar(A),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=z,g++}else if(D.isPointLight){let z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){let H=D.shadow,$=n.get(D);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,$.shadowCameraNear=H.camera.near,$.shadowCameraFar=H.camera.far,i.pointShadow[v]=$,i.pointShadowMap[v]=B,i.pointShadowMatrix[v]=D.shadow.matrix,_++}i.point[v]=z,v++}else if(D.isHemisphereLight){let z=t.get(D);z.skyColor.copy(D.color).multiplyScalar(A),z.groundColor.copy(D.groundColor).multiplyScalar(A),i.hemi[h]=z,h++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;let x=i.hash;(x.directionalLength!==f||x.pointLength!==v||x.spotLength!==b||x.rectAreaLength!==g||x.hemiLength!==h||x.numDirectionalShadows!==m||x.numPointShadows!==_||x.numSpotShadows!==S||x.numSpotMaps!==T||x.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=g,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=R,x.directionalLength=f,x.pointLength=v,x.spotLength=b,x.rectAreaLength=g,x.hemiLength=h,x.numDirectionalShadows=m,x.numPointShadows=_,x.numSpotShadows=S,x.numSpotMaps=T,x.numLightProbes=R,i.version=$R++)}function l(c,d){let p=0,u=0,f=0,v=0,b=0,g=d.matrixWorldInverse;for(let h=0,m=c.length;h<m;h++){let _=c[h];if(_.isDirectionalLight){let S=i.directional[p];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),p++}else if(_.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),r.identity(),a.copy(_.matrixWorld),a.premultiply(g),r.extractRotation(a),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),v++}else if(_.isPointLight){let S=i.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){let S=i.hemi[b];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),b++}}}return{setup:o,setupView:l,state:i}}function Db(e){let t=new e2(e),n=[],i=[];function s(d){c.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function r(d){i.push(d)}function o(){t.setup(n)}function l(d){t.setupView(n,d)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function n2(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new Db(e),t.set(s,[o])):a>=r.length?(o=new Db(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var i2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,a2=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],r2=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Nb=new Be,hc=new k,kg=new k;function o2(e,t,n){let i=new Eo,s=new se,a=new se,r=new Le,o=new Ih,l=new Oh,c={},d=n.maxTextureSize,p={[Ss]:Fe,[Fe]:Ss,[Gi]:Gi},u=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:i2,fragmentShader:s2}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let v=new Vi;v.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new _t(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let h=this.type;this.render=function(C,R,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===wS&&(Pt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=nc);let M=e.getRenderTarget(),F=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),P=e.state;P.setBlending(ki),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let A=h!==this.type;A&&R.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(B=>B.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,B=C.length;U<B;U++){let z=C[U],H=z.shadow;if(H===void 0){Pt("WebGLShadowMap:",z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let $=H.getFrameExtents();s.multiply($),a.copy(H.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/$.x),s.x=a.x*$.x,H.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/$.y),s.y=a.y*$.y,H.mapSize.y=a.y));let K=e.state.buffers.depth.getReversed();if(H.camera._reversedDepth=K,H.map===null||A===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ao){if(z.isPointLight){Pt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Zn(s.x,s.y,{format:nr,type:Xi,minFilter:pn,magFilter:pn,generateMipmaps:!1}),H.map.texture.name=z.name+".shadowMap",H.map.depthTexture=new fa(s.x,s.y,Ai),H.map.depthTexture.name=z.name+".shadowMapDepth",H.map.depthTexture.format=zi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ke,H.map.depthTexture.magFilter=ke}else z.isPointLight?(H.map=new zd(s.x),H.map.depthTexture=new Uh(s.x,Ti)):(H.map=new Zn(s.x,s.y),H.map.depthTexture=new fa(s.x,s.y,Ti)),H.map.depthTexture.name=z.name+".shadowMap",H.map.depthTexture.format=zi,this.type===nc?(H.map.depthTexture.compareFunction=K?Pd:Od,H.map.depthTexture.minFilter=pn,H.map.depthTexture.magFilter=pn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ke,H.map.depthTexture.magFilter=ke);H.camera.updateProjectionMatrix()}let dt=H.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<dt;gt++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(H.map),e.clear());let ft=H.getViewport(gt);r.set(a.x*ft.x,a.y*ft.y,a.x*ft.z,a.y*ft.w),P.viewport(r)}if(z.isPointLight){let ft=H.camera,Xt=H.matrix,ne=z.distance||ft.far;ne!==ft.far&&(ft.far=ne,ft.updateProjectionMatrix()),hc.setFromMatrixPosition(z.matrixWorld),ft.position.copy(hc),kg.copy(ft.position),kg.add(a2[gt]),ft.up.copy(r2[gt]),ft.lookAt(kg),ft.updateMatrixWorld(),Xt.makeTranslation(-hc.x,-hc.y,-hc.z),Nb.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Nb,ft.coordinateSystem,ft.reversedDepth)}else H.updateMatrices(z);i=H.getFrustum(),S(R,x,H.camera,z,this.type)}H.isPointLightShadow!==!0&&this.type===Ao&&m(H,x),H.needsUpdate=!1}h=this.type,g.needsUpdate=!1,e.setRenderTarget(M,F,D)};function m(C,R){let x=t.update(b);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Zn(s.x,s.y,{format:nr,type:Xi})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(R,null,x,u,b,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(R,null,x,f,b,null)}function _(C,R,x,M){let F=null,D=x.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)F=D;else if(F=x.isPointLight===!0?l:o,e.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let P=F.uuid,A=R.uuid,U=c[P];U===void 0&&(U={},c[P]=U);let B=U[A];B===void 0&&(B=F.clone(),U[A]=B,R.addEventListener("dispose",T)),F=B}if(F.visible=R.visible,F.wireframe=R.wireframe,M===Ao?F.side=R.shadowSide!==null?R.shadowSide:R.side:F.side=R.shadowSide!==null?R.shadowSide:p[R.side],F.alphaMap=R.alphaMap,F.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,F.map=R.map,F.clipShadows=R.clipShadows,F.clippingPlanes=R.clippingPlanes,F.clipIntersection=R.clipIntersection,F.displacementMap=R.displacementMap,F.displacementScale=R.displacementScale,F.displacementBias=R.displacementBias,F.wireframeLinewidth=R.wireframeLinewidth,F.linewidth=R.linewidth,x.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let P=e.properties.get(F);P.light=x}return F}function S(C,R,x,M,F){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&F===Ao)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,C.matrixWorld);let A=t.update(C),U=C.material;if(Array.isArray(U)){let B=A.groups;for(let z=0,H=B.length;z<H;z++){let $=B[z],K=U[$.materialIndex];if(K&&K.visible){let dt=_(C,K,M,F);C.onBeforeShadow(e,C,R,x,A,dt,$),e.renderBufferDirect(x,null,A,dt,C,$),C.onAfterShadow(e,C,R,x,A,dt,$)}}}else if(U.visible){let B=_(C,U,M,F);C.onBeforeShadow(e,C,R,x,A,B,null),e.renderBufferDirect(x,null,A,B,C,null),C.onAfterShadow(e,C,R,x,A,B,null)}}let P=C.children;for(let A=0,U=P.length;A<U;A++)S(P[A],R,x,M,F)}function T(C){C.target.removeEventListener("dispose",T);for(let x in c){let M=c[x],F=C.target.uuid;F in M&&(M[F].dispose(),delete M[F])}}}function l2(e,t){function n(){let L=!1,ot=new Le,it=null,vt=new Le(0,0,0,0);return{setMask:function(et){it!==et&&!L&&(e.colorMask(et,et,et,et),it=et)},setLocked:function(et){L=et},setClear:function(et,q,St,Bt,Se){Se===!0&&(et*=Bt,q*=Bt,St*=Bt),ot.set(et,q,St,Bt),vt.equals(ot)===!1&&(e.clearColor(et,q,St,Bt),vt.copy(ot))},reset:function(){L=!1,it=null,vt.set(-1,0,0,0)}}}function i(){let L=!1,ot=!1,it=null,vt=null,et=null;return{setReversed:function(q){if(ot!==q){let St=t.get("EXT_clip_control");q?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),ot=q;let Bt=et;et=null,this.setClear(Bt)}},getReversed:function(){return ot},setTest:function(q){q?st(e.DEPTH_TEST):at(e.DEPTH_TEST)},setMask:function(q){it!==q&&!L&&(e.depthMask(q),it=q)},setFunc:function(q){if(ot&&(q=rb[q]),vt!==q){switch(q){case gh:e.depthFunc(e.NEVER);break;case vh:e.depthFunc(e.ALWAYS);break;case _h:e.depthFunc(e.LESS);break;case Ja:e.depthFunc(e.LEQUAL);break;case yh:e.depthFunc(e.EQUAL);break;case xh:e.depthFunc(e.GEQUAL);break;case Sh:e.depthFunc(e.GREATER);break;case bh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}vt=q}},setLocked:function(q){L=q},setClear:function(q){et!==q&&(et=q,ot&&(q=1-q),e.clearDepth(q))},reset:function(){L=!1,it=null,vt=null,et=null,ot=!1}}}function s(){let L=!1,ot=null,it=null,vt=null,et=null,q=null,St=null,Bt=null,Se=null;return{setTest:function(ue){L||(ue?st(e.STENCIL_TEST):at(e.STENCIL_TEST))},setMask:function(ue){ot!==ue&&!L&&(e.stencilMask(ue),ot=ue)},setFunc:function(ue,Yi,Zi){(it!==ue||vt!==Yi||et!==Zi)&&(e.stencilFunc(ue,Yi,Zi),it=ue,vt=Yi,et=Zi)},setOp:function(ue,Yi,Zi){(q!==ue||St!==Yi||Bt!==Zi)&&(e.stencilOp(ue,Yi,Zi),q=ue,St=Yi,Bt=Zi)},setLocked:function(ue){L=ue},setClear:function(ue){Se!==ue&&(e.clearStencil(ue),Se=ue)},reset:function(){L=!1,ot=null,it=null,vt=null,et=null,q=null,St=null,Bt=null,Se=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},p={},u=new WeakMap,f=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,T=null,C=null,R=new Wt(0,0,0),x=0,M=!1,F=null,D=null,P=null,A=null,U=null,B=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,H=0,$=e.getParameter(e.VERSION);$.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec($)[1]),z=H>=1):$.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),z=H>=2);let K=null,dt={},gt=e.getParameter(e.SCISSOR_BOX),ft=e.getParameter(e.VIEWPORT),Xt=new Le().fromArray(gt),ne=new Le().fromArray(ft);function fe(L,ot,it,vt){let et=new Uint8Array(4),q=e.createTexture();e.bindTexture(L,q),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let St=0;St<it;St++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(ot,0,e.RGBA,1,1,vt,0,e.RGBA,e.UNSIGNED_BYTE,et):e.texImage2D(ot+St,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,et);return q}let Z={};Z[e.TEXTURE_2D]=fe(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=fe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=fe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=fe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),st(e.DEPTH_TEST),r.setFunc(Ja),zt(!1),Ee(dg),st(e.CULL_FACE),Dt(ki);function st(L){d[L]!==!0&&(e.enable(L),d[L]=!0)}function at(L){d[L]!==!1&&(e.disable(L),d[L]=!1)}function Ft(L,ot){return p[L]!==ot?(e.bindFramebuffer(L,ot),p[L]=ot,L===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=ot),L===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=ot),!0):!1}function Nt(L,ot){let it=f,vt=!1;if(L){it=u.get(ot),it===void 0&&(it=[],u.set(ot,it));let et=L.textures;if(it.length!==et.length||it[0]!==e.COLOR_ATTACHMENT0){for(let q=0,St=et.length;q<St;q++)it[q]=e.COLOR_ATTACHMENT0+q;it.length=et.length,vt=!0}}else it[0]!==e.BACK&&(it[0]=e.BACK,vt=!0);vt&&e.drawBuffers(it)}function Ut(L){return v!==L?(e.useProgram(L),v=L,!0):!1}let ze={[ca]:e.FUNC_ADD,[RS]:e.FUNC_SUBTRACT,[DS]:e.FUNC_REVERSE_SUBTRACT};ze[NS]=e.MIN,ze[US]=e.MAX;let lt={[LS]:e.ZERO,[IS]:e.ONE,[OS]:e.SRC_COLOR,[ph]:e.SRC_ALPHA,[VS]:e.SRC_ALPHA_SATURATE,[zS]:e.DST_COLOR,[BS]:e.DST_ALPHA,[PS]:e.ONE_MINUS_SRC_COLOR,[mh]:e.ONE_MINUS_SRC_ALPHA,[HS]:e.ONE_MINUS_DST_COLOR,[FS]:e.ONE_MINUS_DST_ALPHA,[GS]:e.CONSTANT_COLOR,[kS]:e.ONE_MINUS_CONSTANT_COLOR,[XS]:e.CONSTANT_ALPHA,[WS]:e.ONE_MINUS_CONSTANT_ALPHA};function Dt(L,ot,it,vt,et,q,St,Bt,Se,ue){if(L===ki){b===!0&&(at(e.BLEND),b=!1);return}if(b===!1&&(st(e.BLEND),b=!0),L!==CS){if(L!==g||ue!==M){if((h!==ca||S!==ca)&&(e.blendEquation(e.FUNC_ADD),h=ca,S=ca),ue)switch(L){case Za:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case fg:e.blendFunc(e.ONE,e.ONE);break;case pg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case mg:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Ot("WebGLState: Invalid blending: ",L);break}else switch(L){case Za:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case fg:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case pg:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mg:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",L);break}m=null,_=null,T=null,C=null,R.set(0,0,0),x=0,g=L,M=ue}return}et=et||ot,q=q||it,St=St||vt,(ot!==h||et!==S)&&(e.blendEquationSeparate(ze[ot],ze[et]),h=ot,S=et),(it!==m||vt!==_||q!==T||St!==C)&&(e.blendFuncSeparate(lt[it],lt[vt],lt[q],lt[St]),m=it,_=vt,T=q,C=St),(Bt.equals(R)===!1||Se!==x)&&(e.blendColor(Bt.r,Bt.g,Bt.b,Se),R.copy(Bt),x=Se),g=L,M=!1}function Qt(L,ot){L.side===Gi?at(e.CULL_FACE):st(e.CULL_FACE);let it=L.side===Fe;ot&&(it=!it),zt(it),L.blending===Za&&L.transparent===!1?Dt(ki):Dt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),a.setMask(L.colorWrite);let vt=L.stencilWrite;o.setTest(vt),vt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Xe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?st(e.SAMPLE_ALPHA_TO_COVERAGE):at(e.SAMPLE_ALPHA_TO_COVERAGE)}function zt(L){F!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),F=L)}function Ee(L){L!==TS?(st(e.CULL_FACE),L!==D&&(L===dg?e.cullFace(e.BACK):L===AS?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):at(e.CULL_FACE),D=L}function N(L){L!==P&&(z&&e.lineWidth(L),P=L)}function Xe(L,ot,it){L?(st(e.POLYGON_OFFSET_FILL),(A!==ot||U!==it)&&(A=ot,U=it,r.getReversed()&&(ot=-ot),e.polygonOffset(ot,it))):at(e.POLYGON_OFFSET_FILL)}function oe(L){L?st(e.SCISSOR_TEST):at(e.SCISSOR_TEST)}function xe(L){L===void 0&&(L=e.TEXTURE0+B-1),K!==L&&(e.activeTexture(L),K=L)}function Et(L,ot,it){it===void 0&&(K===null?it=e.TEXTURE0+B-1:it=K);let vt=dt[it];vt===void 0&&(vt={type:void 0,texture:void 0},dt[it]=vt),(vt.type!==L||vt.texture!==ot)&&(K!==it&&(e.activeTexture(it),K=it),e.bindTexture(L,ot||Z[L]),vt.type=L,vt.texture=ot)}function w(){let L=dt[K];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function y(){try{e.compressedTexImage2D(...arguments)}catch(L){Ot("WebGLState:",L)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(L){Ot("WebGLState:",L)}}function J(){try{e.texSubImage2D(...arguments)}catch(L){Ot("WebGLState:",L)}}function Q(){try{e.texSubImage3D(...arguments)}catch(L){Ot("WebGLState:",L)}}function Y(){try{e.compressedTexSubImage2D(...arguments)}catch(L){Ot("WebGLState:",L)}}function yt(){try{e.compressedTexSubImage3D(...arguments)}catch(L){Ot("WebGLState:",L)}}function rt(){try{e.texStorage2D(...arguments)}catch(L){Ot("WebGLState:",L)}}function Rt(){try{e.texStorage3D(...arguments)}catch(L){Ot("WebGLState:",L)}}function Lt(){try{e.texImage2D(...arguments)}catch(L){Ot("WebGLState:",L)}}function tt(){try{e.texImage3D(...arguments)}catch(L){Ot("WebGLState:",L)}}function nt(L){Xt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),Xt.copy(L))}function xt(L){ne.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),ne.copy(L))}function bt(L,ot){let it=c.get(ot);it===void 0&&(it=new WeakMap,c.set(ot,it));let vt=it.get(L);vt===void 0&&(vt=e.getUniformBlockIndex(ot,L.name),it.set(L,vt))}function pt(L,ot){let vt=c.get(ot).get(L);l.get(ot)!==vt&&(e.uniformBlockBinding(ot,vt,L.__bindingPointIndex),l.set(ot,vt))}function Yt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),d={},K=null,dt={},p={},u=new WeakMap,f=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,T=null,C=null,R=new Wt(0,0,0),x=0,M=!1,F=null,D=null,P=null,A=null,U=null,Xt.set(0,0,e.canvas.width,e.canvas.height),ne.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:st,disable:at,bindFramebuffer:Ft,drawBuffers:Nt,useProgram:Ut,setBlending:Dt,setMaterial:Qt,setFlipSided:zt,setCullFace:Ee,setLineWidth:N,setPolygonOffset:Xe,setScissorTest:oe,activeTexture:xe,bindTexture:Et,unbindTexture:w,compressedTexImage2D:y,compressedTexImage3D:I,texImage2D:Lt,texImage3D:tt,updateUBOMapping:bt,uniformBlockBinding:pt,texStorage2D:rt,texStorage3D:Rt,texSubImage2D:J,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:yt,scissor:nt,viewport:xt,reset:Yt}}function c2(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new se,d=new WeakMap,p,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,y){return f?new OffscreenCanvas(w,y):yo("canvas")}function b(w,y,I){let J=1,Q=Et(w);if((Q.width>I||Q.height>I)&&(J=I/Math.max(Q.width,Q.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let Y=Math.floor(J*Q.width),yt=Math.floor(J*Q.height);p===void 0&&(p=v(Y,yt));let rt=y?v(Y,yt):p;return rt.width=Y,rt.height=yt,rt.getContext("2d").drawImage(w,0,0,Y,yt),Pt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+yt+")."),rt}else return"data"in w&&Pt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function g(w){return w.generateMipmaps}function h(w){e.generateMipmap(w)}function m(w){return w.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?e.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(w,y,I,J,Q=!1){if(w!==null){if(e[w]!==void 0)return e[w];Pt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Y=y;if(y===e.RED&&(I===e.FLOAT&&(Y=e.R32F),I===e.HALF_FLOAT&&(Y=e.R16F),I===e.UNSIGNED_BYTE&&(Y=e.R8)),y===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.R8UI),I===e.UNSIGNED_SHORT&&(Y=e.R16UI),I===e.UNSIGNED_INT&&(Y=e.R32UI),I===e.BYTE&&(Y=e.R8I),I===e.SHORT&&(Y=e.R16I),I===e.INT&&(Y=e.R32I)),y===e.RG&&(I===e.FLOAT&&(Y=e.RG32F),I===e.HALF_FLOAT&&(Y=e.RG16F),I===e.UNSIGNED_BYTE&&(Y=e.RG8)),y===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RG8UI),I===e.UNSIGNED_SHORT&&(Y=e.RG16UI),I===e.UNSIGNED_INT&&(Y=e.RG32UI),I===e.BYTE&&(Y=e.RG8I),I===e.SHORT&&(Y=e.RG16I),I===e.INT&&(Y=e.RG32I)),y===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGB8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGB16UI),I===e.UNSIGNED_INT&&(Y=e.RGB32UI),I===e.BYTE&&(Y=e.RGB8I),I===e.SHORT&&(Y=e.RGB16I),I===e.INT&&(Y=e.RGB32I)),y===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGBA16UI),I===e.UNSIGNED_INT&&(Y=e.RGBA32UI),I===e.BYTE&&(Y=e.RGBA8I),I===e.SHORT&&(Y=e.RGBA16I),I===e.INT&&(Y=e.RGBA32I)),y===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(Y=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(Y=e.R11F_G11F_B10F)),y===e.RGBA){let yt=Q?Gl:ee.getTransfer(J);I===e.FLOAT&&(Y=e.RGBA32F),I===e.HALF_FLOAT&&(Y=e.RGBA16F),I===e.UNSIGNED_BYTE&&(Y=yt===le?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function S(w,y){let I;return w?y===null||y===Ti||y===Co?I=e.DEPTH24_STENCIL8:y===Ai?I=e.DEPTH32F_STENCIL8:y===wo&&(I=e.DEPTH24_STENCIL8,Pt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ti||y===Co?I=e.DEPTH_COMPONENT24:y===Ai?I=e.DEPTH_COMPONENT32F:y===wo&&(I=e.DEPTH_COMPONENT16),I}function T(w,y){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==ke&&w.minFilter!==pn?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function C(w){let y=w.target;y.removeEventListener("dispose",C),x(y),y.isVideoTexture&&d.delete(y)}function R(w){let y=w.target;y.removeEventListener("dispose",R),F(y)}function x(w){let y=i.get(w);if(y.__webglInit===void 0)return;let I=w.source,J=u.get(I);if(J){let Q=J[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(w),Object.keys(J).length===0&&u.delete(I)}i.remove(w)}function M(w){let y=i.get(w);e.deleteTexture(y.__webglTexture);let I=w.source,J=u.get(I);delete J[y.__cacheKey],r.memory.textures--}function F(w){let y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(y.__webglFramebuffer[J]))for(let Q=0;Q<y.__webglFramebuffer[J].length;Q++)e.deleteFramebuffer(y.__webglFramebuffer[J][Q]);else e.deleteFramebuffer(y.__webglFramebuffer[J]);y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer[J])}else{if(Array.isArray(y.__webglFramebuffer))for(let J=0;J<y.__webglFramebuffer.length;J++)e.deleteFramebuffer(y.__webglFramebuffer[J]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&e.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let J=0;J<y.__webglColorRenderbuffer.length;J++)y.__webglColorRenderbuffer[J]&&e.deleteRenderbuffer(y.__webglColorRenderbuffer[J]);y.__webglDepthRenderbuffer&&e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let I=w.textures;for(let J=0,Q=I.length;J<Q;J++){let Y=i.get(I[J]);Y.__webglTexture&&(e.deleteTexture(Y.__webglTexture),r.memory.textures--),i.remove(I[J])}i.remove(w)}let D=0;function P(){D=0}function A(){let w=D;return w>=s.maxTextures&&Pt("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function U(w){let y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function B(w,y){let I=i.get(w);if(w.isVideoTexture&&oe(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&I.__version!==w.version){let J=w.image;if(J===null)Pt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Pt("WebGLRenderer: Texture marked for update but image is incomplete");else{Z(I,w,y);return}}else w.isExternalTexture&&(I.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+y)}function z(w,y){let I=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&I.__version!==w.version){Z(I,w,y);return}else w.isExternalTexture&&(I.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+y)}function H(w,y){let I=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&I.__version!==w.version){Z(I,w,y);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+y)}function $(w,y){let I=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&I.__version!==w.version){st(I,w,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+y)}let K={[Mh]:e.REPEAT,[Fi]:e.CLAMP_TO_EDGE,[Eh]:e.MIRRORED_REPEAT},dt={[ke]:e.NEAREST,[ZS]:e.NEAREST_MIPMAP_NEAREST,[sc]:e.NEAREST_MIPMAP_LINEAR,[pn]:e.LINEAR,[jh]:e.LINEAR_MIPMAP_NEAREST,[_a]:e.LINEAR_MIPMAP_LINEAR},gt={[QS]:e.NEVER,[nb]:e.ALWAYS,[KS]:e.LESS,[Od]:e.LEQUAL,[$S]:e.EQUAL,[Pd]:e.GEQUAL,[tb]:e.GREATER,[eb]:e.NOTEQUAL};function ft(w,y){if(y.type===Ai&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===pn||y.magFilter===jh||y.magFilter===sc||y.magFilter===_a||y.minFilter===pn||y.minFilter===jh||y.minFilter===sc||y.minFilter===_a)&&Pt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(w,e.TEXTURE_WRAP_S,K[y.wrapS]),e.texParameteri(w,e.TEXTURE_WRAP_T,K[y.wrapT]),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,K[y.wrapR]),e.texParameteri(w,e.TEXTURE_MAG_FILTER,dt[y.magFilter]),e.texParameteri(w,e.TEXTURE_MIN_FILTER,dt[y.minFilter]),y.compareFunction&&(e.texParameteri(w,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(w,e.TEXTURE_COMPARE_FUNC,gt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ke||y.minFilter!==sc&&y.minFilter!==_a||y.type===Ai&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(w,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Xt(w,y){let I=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",C));let J=y.source,Q=u.get(J);Q===void 0&&(Q={},u.set(J,Q));let Y=U(y);if(Y!==w.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,I=!0),Q[Y].usedTimes++;let yt=Q[w.__cacheKey];yt!==void 0&&(Q[w.__cacheKey].usedTimes--,yt.usedTimes===0&&M(y)),w.__cacheKey=Y,w.__webglTexture=Q[Y].texture}return I}function ne(w,y,I){return Math.floor(Math.floor(w/I)/y)}function fe(w,y,I,J){let Y=w.updateRanges;if(Y.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,y.width,y.height,I,J,y.data);else{Y.sort((tt,nt)=>tt.start-nt.start);let yt=0;for(let tt=1;tt<Y.length;tt++){let nt=Y[yt],xt=Y[tt],bt=nt.start+nt.count,pt=ne(xt.start,y.width,4),Yt=ne(nt.start,y.width,4);xt.start<=bt+1&&pt===Yt&&ne(xt.start+xt.count-1,y.width,4)===pt?nt.count=Math.max(nt.count,xt.start+xt.count-nt.start):(++yt,Y[yt]=xt)}Y.length=yt+1;let rt=e.getParameter(e.UNPACK_ROW_LENGTH),Rt=e.getParameter(e.UNPACK_SKIP_PIXELS),Lt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,y.width);for(let tt=0,nt=Y.length;tt<nt;tt++){let xt=Y[tt],bt=Math.floor(xt.start/4),pt=Math.ceil(xt.count/4),Yt=bt%y.width,L=Math.floor(bt/y.width),ot=pt,it=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,Yt,L,ot,it,I,J,y.data)}w.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,rt),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Rt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Lt)}}function Z(w,y,I){let J=e.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(J=e.TEXTURE_2D_ARRAY),y.isData3DTexture&&(J=e.TEXTURE_3D);let Q=Xt(w,y),Y=y.source;n.bindTexture(J,w.__webglTexture,e.TEXTURE0+I);let yt=i.get(Y);if(Y.version!==yt.__version||Q===!0){n.activeTexture(e.TEXTURE0+I);let rt=ee.getPrimaries(ee.workingColorSpace),Rt=y.colorSpace===Ms?null:ee.getPrimaries(y.colorSpace),Lt=y.colorSpace===Ms||rt===Rt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let tt=b(y.image,!1,s.maxTextureSize);tt=xe(y,tt);let nt=a.convert(y.format,y.colorSpace),xt=a.convert(y.type),bt=_(y.internalFormat,nt,xt,y.colorSpace,y.isVideoTexture);ft(J,y);let pt,Yt=y.mipmaps,L=y.isVideoTexture!==!0,ot=yt.__version===void 0||Q===!0,it=Y.dataReady,vt=T(y,tt);if(y.isDepthTexture)bt=S(y.format===ya,y.type),ot&&(L?n.texStorage2D(e.TEXTURE_2D,1,bt,tt.width,tt.height):n.texImage2D(e.TEXTURE_2D,0,bt,tt.width,tt.height,0,nt,xt,null));else if(y.isDataTexture)if(Yt.length>0){L&&ot&&n.texStorage2D(e.TEXTURE_2D,vt,bt,Yt[0].width,Yt[0].height);for(let et=0,q=Yt.length;et<q;et++)pt=Yt[et],L?it&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,pt.width,pt.height,nt,xt,pt.data):n.texImage2D(e.TEXTURE_2D,et,bt,pt.width,pt.height,0,nt,xt,pt.data);y.generateMipmaps=!1}else L?(ot&&n.texStorage2D(e.TEXTURE_2D,vt,bt,tt.width,tt.height),it&&fe(y,tt,nt,xt)):n.texImage2D(e.TEXTURE_2D,0,bt,tt.width,tt.height,0,nt,xt,tt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){L&&ot&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,bt,Yt[0].width,Yt[0].height,tt.depth);for(let et=0,q=Yt.length;et<q;et++)if(pt=Yt[et],y.format!==di)if(nt!==null)if(L){if(it)if(y.layerUpdates.size>0){let St=Bg(pt.width,pt.height,y.format,y.type);for(let Bt of y.layerUpdates){let Se=pt.data.subarray(Bt*St/pt.data.BYTES_PER_ELEMENT,(Bt+1)*St/pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,Bt,pt.width,pt.height,1,nt,Se)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,0,pt.width,pt.height,tt.depth,nt,pt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,et,bt,pt.width,pt.height,tt.depth,0,pt.data,0,0);else Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?it&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,et,0,0,0,pt.width,pt.height,tt.depth,nt,xt,pt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,et,bt,pt.width,pt.height,tt.depth,0,nt,xt,pt.data)}else{L&&ot&&n.texStorage2D(e.TEXTURE_2D,vt,bt,Yt[0].width,Yt[0].height);for(let et=0,q=Yt.length;et<q;et++)pt=Yt[et],y.format!==di?nt!==null?L?it&&n.compressedTexSubImage2D(e.TEXTURE_2D,et,0,0,pt.width,pt.height,nt,pt.data):n.compressedTexImage2D(e.TEXTURE_2D,et,bt,pt.width,pt.height,0,pt.data):Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?it&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,pt.width,pt.height,nt,xt,pt.data):n.texImage2D(e.TEXTURE_2D,et,bt,pt.width,pt.height,0,nt,xt,pt.data)}else if(y.isDataArrayTexture)if(L){if(ot&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,bt,tt.width,tt.height,tt.depth),it)if(y.layerUpdates.size>0){let et=Bg(tt.width,tt.height,y.format,y.type);for(let q of y.layerUpdates){let St=tt.data.subarray(q*et/tt.data.BYTES_PER_ELEMENT,(q+1)*et/tt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,q,tt.width,tt.height,1,nt,xt,St)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,nt,xt,tt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,bt,tt.width,tt.height,tt.depth,0,nt,xt,tt.data);else if(y.isData3DTexture)L?(ot&&n.texStorage3D(e.TEXTURE_3D,vt,bt,tt.width,tt.height,tt.depth),it&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,nt,xt,tt.data)):n.texImage3D(e.TEXTURE_3D,0,bt,tt.width,tt.height,tt.depth,0,nt,xt,tt.data);else if(y.isFramebufferTexture){if(ot)if(L)n.texStorage2D(e.TEXTURE_2D,vt,bt,tt.width,tt.height);else{let et=tt.width,q=tt.height;for(let St=0;St<vt;St++)n.texImage2D(e.TEXTURE_2D,St,bt,et,q,0,nt,xt,null),et>>=1,q>>=1}}else if(Yt.length>0){if(L&&ot){let et=Et(Yt[0]);n.texStorage2D(e.TEXTURE_2D,vt,bt,et.width,et.height)}for(let et=0,q=Yt.length;et<q;et++)pt=Yt[et],L?it&&n.texSubImage2D(e.TEXTURE_2D,et,0,0,nt,xt,pt):n.texImage2D(e.TEXTURE_2D,et,bt,nt,xt,pt);y.generateMipmaps=!1}else if(L){if(ot){let et=Et(tt);n.texStorage2D(e.TEXTURE_2D,vt,bt,et.width,et.height)}it&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,nt,xt,tt)}else n.texImage2D(e.TEXTURE_2D,0,bt,nt,xt,tt);g(y)&&h(J),yt.__version=Y.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function st(w,y,I){if(y.image.length!==6)return;let J=Xt(w,y),Q=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+I);let Y=i.get(Q);if(Q.version!==Y.__version||J===!0){n.activeTexture(e.TEXTURE0+I);let yt=ee.getPrimaries(ee.workingColorSpace),rt=y.colorSpace===Ms?null:ee.getPrimaries(y.colorSpace),Rt=y.colorSpace===Ms||yt===rt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Lt=y.isCompressedTexture||y.image[0].isCompressedTexture,tt=y.image[0]&&y.image[0].isDataTexture,nt=[];for(let q=0;q<6;q++)!Lt&&!tt?nt[q]=b(y.image[q],!0,s.maxCubemapSize):nt[q]=tt?y.image[q].image:y.image[q],nt[q]=xe(y,nt[q]);let xt=nt[0],bt=a.convert(y.format,y.colorSpace),pt=a.convert(y.type),Yt=_(y.internalFormat,bt,pt,y.colorSpace),L=y.isVideoTexture!==!0,ot=Y.__version===void 0||J===!0,it=Q.dataReady,vt=T(y,xt);ft(e.TEXTURE_CUBE_MAP,y);let et;if(Lt){L&&ot&&n.texStorage2D(e.TEXTURE_CUBE_MAP,vt,Yt,xt.width,xt.height);for(let q=0;q<6;q++){et=nt[q].mipmaps;for(let St=0;St<et.length;St++){let Bt=et[St];y.format!==di?bt!==null?L?it&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St,0,0,Bt.width,Bt.height,bt,Bt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St,Yt,Bt.width,Bt.height,0,Bt.data):Pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St,0,0,Bt.width,Bt.height,bt,pt,Bt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St,Yt,Bt.width,Bt.height,0,bt,pt,Bt.data)}}}else{if(et=y.mipmaps,L&&ot){et.length>0&&vt++;let q=Et(nt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,vt,Yt,q.width,q.height)}for(let q=0;q<6;q++)if(tt){L?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,nt[q].width,nt[q].height,bt,pt,nt[q].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Yt,nt[q].width,nt[q].height,0,bt,pt,nt[q].data);for(let St=0;St<et.length;St++){let Se=et[St].image[q].image;L?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St+1,0,0,Se.width,Se.height,bt,pt,Se.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St+1,Yt,Se.width,Se.height,0,bt,pt,Se.data)}}else{L?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,bt,pt,nt[q]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Yt,bt,pt,nt[q]);for(let St=0;St<et.length;St++){let Bt=et[St];L?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St+1,0,0,bt,pt,Bt.image[q]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,St+1,Yt,bt,pt,Bt.image[q])}}}g(y)&&h(e.TEXTURE_CUBE_MAP),Y.__version=Q.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function at(w,y,I,J,Q,Y){let yt=a.convert(I.format,I.colorSpace),rt=a.convert(I.type),Rt=_(I.internalFormat,yt,rt,I.colorSpace),Lt=i.get(y),tt=i.get(I);if(tt.__renderTarget=y,!Lt.__hasExternalTextures){let nt=Math.max(1,y.width>>Y),xt=Math.max(1,y.height>>Y);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?n.texImage3D(Q,Y,Rt,nt,xt,y.depth,0,yt,rt,null):n.texImage2D(Q,Y,Rt,nt,xt,0,yt,rt,null)}n.bindFramebuffer(e.FRAMEBUFFER,w),Xe(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,Q,tt.__webglTexture,0,N(y)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,J,Q,tt.__webglTexture,Y),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ft(w,y,I){if(e.bindRenderbuffer(e.RENDERBUFFER,w),y.depthBuffer){let J=y.depthTexture,Q=J&&J.isDepthTexture?J.type:null,Y=S(y.stencilBuffer,Q),yt=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Xe(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,N(y),Y,y.width,y.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,N(y),Y,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,Y,y.width,y.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,yt,e.RENDERBUFFER,w)}else{let J=y.textures;for(let Q=0;Q<J.length;Q++){let Y=J[Q],yt=a.convert(Y.format,Y.colorSpace),rt=a.convert(Y.type),Rt=_(Y.internalFormat,yt,rt,Y.colorSpace);Xe(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,N(y),Rt,y.width,y.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,N(y),Rt,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,Rt,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Nt(w,y,I){let J=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=i.get(y.depthTexture);if(Q.__renderTarget=y,(!Q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),J){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,y.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),ft(e.TEXTURE_CUBE_MAP,y.depthTexture);let Lt=a.convert(y.depthTexture.format),tt=a.convert(y.depthTexture.type),nt;y.depthTexture.format===zi?nt=e.DEPTH_COMPONENT24:y.depthTexture.format===ya&&(nt=e.DEPTH24_STENCIL8);for(let xt=0;xt<6;xt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,nt,y.width,y.height,0,Lt,tt,null)}}else B(y.depthTexture,0);let Y=Q.__webglTexture,yt=N(y),rt=J?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,Rt=y.depthTexture.format===ya?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(y.depthTexture.format===zi)Xe(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Rt,rt,Y,0,yt):e.framebufferTexture2D(e.FRAMEBUFFER,Rt,rt,Y,0);else if(y.depthTexture.format===ya)Xe(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Rt,rt,Y,0,yt):e.framebufferTexture2D(e.FRAMEBUFFER,Rt,rt,Y,0);else throw new Error("Unknown depthTexture format")}function Ut(w){let y=i.get(w),I=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){let J=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),J){let Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,J.removeEventListener("dispose",Q)};J.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=J}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(I)for(let J=0;J<6;J++)Nt(y.__webglFramebuffer[J],w,J);else{let J=w.texture.mipmaps;J&&J.length>0?Nt(y.__webglFramebuffer[0],w,0):Nt(y.__webglFramebuffer,w,0)}else if(I){y.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[J]),y.__webglDepthbuffer[J]===void 0)y.__webglDepthbuffer[J]=e.createRenderbuffer(),Ft(y.__webglDepthbuffer[J],w,!1);else{let Q=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer[J];e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,Y)}}else{let J=w.texture.mipmaps;if(J&&J.length>0?n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),Ft(y.__webglDepthbuffer,w,!1);else{let Q=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,Y)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ze(w,y,I){let J=i.get(w);y!==void 0&&at(J.__webglFramebuffer,w,w.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Ut(w)}function lt(w){let y=w.texture,I=i.get(w),J=i.get(y);w.addEventListener("dispose",R);let Q=w.textures,Y=w.isWebGLCubeRenderTarget===!0,yt=Q.length>1;if(yt||(J.__webglTexture===void 0&&(J.__webglTexture=e.createTexture()),J.__version=y.version,r.memory.textures++),Y){I.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer[rt]=[];for(let Rt=0;Rt<y.mipmaps.length;Rt++)I.__webglFramebuffer[rt][Rt]=e.createFramebuffer()}else I.__webglFramebuffer[rt]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)I.__webglFramebuffer[rt]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(yt)for(let rt=0,Rt=Q.length;rt<Rt;rt++){let Lt=i.get(Q[rt]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=e.createTexture(),r.memory.textures++)}if(w.samples>0&&Xe(w)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){let Rt=Q[rt];I.__webglColorRenderbuffer[rt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[rt]);let Lt=a.convert(Rt.format,Rt.colorSpace),tt=a.convert(Rt.type),nt=_(Rt.internalFormat,Lt,tt,Rt.colorSpace,w.isXRRenderTarget===!0),xt=N(w);e.renderbufferStorageMultisample(e.RENDERBUFFER,xt,nt,w.width,w.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,I.__webglColorRenderbuffer[rt])}e.bindRenderbuffer(e.RENDERBUFFER,null),w.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Ft(I.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Y){n.bindTexture(e.TEXTURE_CUBE_MAP,J.__webglTexture),ft(e.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let Rt=0;Rt<y.mipmaps.length;Rt++)at(I.__webglFramebuffer[rt][Rt],w,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Rt);else at(I.__webglFramebuffer[rt],w,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);g(y)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(yt){for(let rt=0,Rt=Q.length;rt<Rt;rt++){let Lt=Q[rt],tt=i.get(Lt),nt=e.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(nt=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(nt,tt.__webglTexture),ft(nt,Lt),at(I.__webglFramebuffer,w,Lt,e.COLOR_ATTACHMENT0+rt,nt,0),g(Lt)&&h(nt)}n.unbindTexture()}else{let rt=e.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(rt=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(rt,J.__webglTexture),ft(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let Rt=0;Rt<y.mipmaps.length;Rt++)at(I.__webglFramebuffer[Rt],w,y,e.COLOR_ATTACHMENT0,rt,Rt);else at(I.__webglFramebuffer,w,y,e.COLOR_ATTACHMENT0,rt,0);g(y)&&h(rt),n.unbindTexture()}w.depthBuffer&&Ut(w)}function Dt(w){let y=w.textures;for(let I=0,J=y.length;I<J;I++){let Q=y[I];if(g(Q)){let Y=m(w),yt=i.get(Q).__webglTexture;n.bindTexture(Y,yt),h(Y),n.unbindTexture()}}}let Qt=[],zt=[];function Ee(w){if(w.samples>0){if(Xe(w)===!1){let y=w.textures,I=w.width,J=w.height,Q=e.COLOR_BUFFER_BIT,Y=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,yt=i.get(w),rt=y.length>1;if(rt)for(let Lt=0;Lt<y.length;Lt++)n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Lt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Lt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer);let Rt=w.texture.mipmaps;Rt&&Rt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let Lt=0;Lt<y.length;Lt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),rt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,yt.__webglColorRenderbuffer[Lt]);let tt=i.get(y[Lt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,tt,0)}e.blitFramebuffer(0,0,I,J,0,0,I,J,Q,e.NEAREST),l===!0&&(Qt.length=0,zt.length=0,Qt.push(e.COLOR_ATTACHMENT0+Lt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Qt.push(Y),zt.push(Y),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,zt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Qt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),rt)for(let Lt=0;Lt<y.length;Lt++){n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Lt,e.RENDERBUFFER,yt.__webglColorRenderbuffer[Lt]);let tt=i.get(y[Lt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Lt,e.TEXTURE_2D,tt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let y=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function N(w){return Math.min(s.maxSamples,w.samples)}function Xe(w){let y=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function oe(w){let y=r.render.frame;d.get(w)!==y&&(d.set(w,y),w.update())}function xe(w,y){let I=w.colorSpace,J=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||I!==ja&&I!==Ms&&(ee.getTransfer(I)===le?(J!==di||Q!==Ln)&&Pt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",I)),y}function Et(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=A,this.resetTextureUnits=P,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=H,this.setTextureCube=$,this.rebindTextures=ze,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function u2(e,t){function n(i,s=Ms){let a,r=ee.getTransfer(s);if(i===Ln)return e.UNSIGNED_BYTE;if(i===Kh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===$h)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Ag)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===wg)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Eg)return e.BYTE;if(i===Tg)return e.SHORT;if(i===wo)return e.UNSIGNED_SHORT;if(i===Qh)return e.INT;if(i===Ti)return e.UNSIGNED_INT;if(i===Ai)return e.FLOAT;if(i===Xi)return e.HALF_FLOAT;if(i===Cg)return e.ALPHA;if(i===Rg)return e.RGB;if(i===di)return e.RGBA;if(i===zi)return e.DEPTH_COMPONENT;if(i===ya)return e.DEPTH_STENCIL;if(i===Dg)return e.RED;if(i===td)return e.RED_INTEGER;if(i===nr)return e.RG;if(i===ed)return e.RG_INTEGER;if(i===nd)return e.RGBA_INTEGER;if(i===ac||i===rc||i===oc||i===lc)if(r===le)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===ac)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===ac)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===id||i===sd||i===ad||i===rd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===id)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ad)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===od||i===ld||i===cd||i===ud||i===hd||i===dd||i===fd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===od||i===ld)return r===le?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===cd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ud)return a.COMPRESSED_R11_EAC;if(i===hd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===dd)return a.COMPRESSED_RG11_EAC;if(i===fd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pd||i===md||i===gd||i===vd||i===_d||i===yd||i===xd||i===Sd||i===bd||i===Md||i===Ed||i===Td||i===Ad||i===wd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===pd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===md)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_d)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===bd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Md)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ed)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Td)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ad)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cd||i===Rd||i===Dd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Cd)return r===le?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nd||i===Ud||i===Ld||i===Id)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Nd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Ud)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ld)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Id)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Co?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var h2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Qg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new jl(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new jn({vertexShader:h2,fragmentShader:d2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new _t(new Qa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kg=class extends bs{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,f=null,v=null,b=typeof XRWebGLBinding<"u",g=new Qg,h={},m=n.getContextAttributes(),_=null,S=null,T=[],C=[],R=new se,x=null,M=new Ke;M.viewport=new Le;let F=new Ke;F.viewport=new Le;let D=[M,F],P=new Yh,A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let st=T[Z];return st===void 0&&(st=new bo,T[Z]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Z){let st=T[Z];return st===void 0&&(st=new bo,T[Z]=st),st.getGripSpace()},this.getHand=function(Z){let st=T[Z];return st===void 0&&(st=new bo,T[Z]=st),st.getHandSpace()};function B(Z){let st=C.indexOf(Z.inputSource);if(st===-1)return;let at=T[st];at!==void 0&&(at.update(Z.inputSource,Z.frame,c||r),at.dispatchEvent({type:Z.type,data:Z.inputSource}))}function z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",H);for(let Z=0;Z<T.length;Z++){let st=C[Z];st!==null&&(C[Z]=null,T[Z].disconnect(st))}A=null,U=null,g.reset();for(let Z in h)delete h[Z];t.setRenderTarget(_),f=null,u=null,p=null,s=null,S=null,fe.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&Pt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Pt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",z),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,Ft=null,Nt=null;m.depth&&(Nt=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,at=m.stencil?ya:zi,Ft=m.stencil?Co:Ti);let Ut={colorFormat:n.RGBA8,depthFormat:Nt,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(Ut),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Zn(u.textureWidth,u.textureHeight,{format:di,type:Ln,depthTexture:new fa(u.textureWidth,u.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let at={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,n,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Zn(f.framebufferWidth,f.framebufferHeight,{format:di,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),fe.setContext(s),fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(Z){for(let st=0;st<Z.removed.length;st++){let at=Z.removed[st],Ft=C.indexOf(at);Ft>=0&&(C[Ft]=null,T[Ft].disconnect(at))}for(let st=0;st<Z.added.length;st++){let at=Z.added[st],Ft=C.indexOf(at);if(Ft===-1){for(let Ut=0;Ut<T.length;Ut++)if(Ut>=C.length){C.push(at),Ft=Ut;break}else if(C[Ut]===null){C[Ut]=at,Ft=Ut;break}if(Ft===-1)break}let Nt=T[Ft];Nt&&Nt.connect(at)}}let $=new k,K=new k;function dt(Z,st,at){$.setFromMatrixPosition(st.matrixWorld),K.setFromMatrixPosition(at.matrixWorld);let Ft=$.distanceTo(K),Nt=st.projectionMatrix.elements,Ut=at.projectionMatrix.elements,ze=Nt[14]/(Nt[10]-1),lt=Nt[14]/(Nt[10]+1),Dt=(Nt[9]+1)/Nt[5],Qt=(Nt[9]-1)/Nt[5],zt=(Nt[8]-1)/Nt[0],Ee=(Ut[8]+1)/Ut[0],N=ze*zt,Xe=ze*Ee,oe=Ft/(-zt+Ee),xe=oe*-zt;if(st.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(xe),Z.translateZ(oe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Nt[10]===-1)Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{let Et=ze+oe,w=lt+oe,y=N-xe,I=Xe+(Ft-xe),J=Dt*lt/w*Et,Q=Qt*lt/w*Et;Z.projectionMatrix.makePerspective(y,I,J,Q,Et,w),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function gt(Z,st){st===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(st.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let st=Z.near,at=Z.far;g.texture!==null&&(g.depthNear>0&&(st=g.depthNear),g.depthFar>0&&(at=g.depthFar)),P.near=F.near=M.near=st,P.far=F.far=M.far=at,(A!==P.near||U!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),A=P.near,U=P.far),P.layers.mask=Z.layers.mask|6,M.layers.mask=P.layers.mask&-5,F.layers.mask=P.layers.mask&-3;let Ft=Z.parent,Nt=P.cameras;gt(P,Ft);for(let Ut=0;Ut<Nt.length;Ut++)gt(Nt[Ut],Ft);Nt.length===2?dt(P,M,F):P.projectionMatrix.copy(M.projectionMatrix),ft(Z,P,Ft)};function ft(Z,st,at){at===null?Z.matrix.copy(st.matrixWorld):(Z.matrix.copy(at.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(st.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ah*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(Z){return h[Z]};let Xt=null;function ne(Z,st){if(d=st.getViewerPose(c||r),v=st,d!==null){let at=d.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Ft=!1;at.length!==P.cameras.length&&(P.cameras.length=0,Ft=!0);for(let lt=0;lt<at.length;lt++){let Dt=at[lt],Qt=null;if(f!==null)Qt=f.getViewport(Dt);else{let Ee=p.getViewSubImage(u,Dt);Qt=Ee.viewport,lt===0&&(t.setRenderTargetTextures(S,Ee.colorTexture,Ee.depthStencilTexture),t.setRenderTarget(S))}let zt=D[lt];zt===void 0&&(zt=new Ke,zt.layers.enable(lt),zt.viewport=new Le,D[lt]=zt),zt.matrix.fromArray(Dt.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(Dt.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),lt===0&&(P.matrix.copy(zt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ft===!0&&P.cameras.push(zt)}let Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=i.getBinding();let lt=p.getDepthInformation(at[0]);lt&&lt.isValid&&lt.texture&&g.init(lt,s.renderState)}if(Nt&&Nt.includes("camera-access")&&b){t.state.unbindTexture(),p=i.getBinding();for(let lt=0;lt<at.length;lt++){let Dt=at[lt].camera;if(Dt){let Qt=h[Dt];Qt||(Qt=new jl,h[Dt]=Qt);let zt=p.getCameraImage(Dt);Qt.sourceTexture=zt}}}}for(let at=0;at<T.length;at++){let Ft=C[at],Nt=T[at];Ft!==null&&Nt!==void 0&&Nt.update(Ft,st,c||r)}Xt&&Xt(Z,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),v=null}let fe=new Ub;fe.setAnimationLoop(ne),this.setAnimationLoop=function(Z){Xt=Z},this.dispose=function(){}}},ar=new Mi,f2=new Be;function p2(e,t){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Ig(e)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function s(g,h,m,_,S){h.isMeshBasicMaterial?a(g,h):h.isMeshLambertMaterial?(a(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(a(g,h),p(g,h)):h.isMeshPhongMaterial?(a(g,h),d(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(a(g,h),u(g,h),h.isMeshPhysicalMaterial&&f(g,h,S)):h.isMeshMatcapMaterial?(a(g,h),v(g,h)):h.isMeshDepthMaterial?a(g,h):h.isMeshDistanceMaterial?(a(g,h),b(g,h)):h.isMeshNormalMaterial?a(g,h):h.isLineBasicMaterial?(r(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,m,_):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Fe&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Fe&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let m=t.get(h),_=m.envMap,S=m.envMapRotation;_&&(g.envMap.value=_,ar.copy(S),ar.x*=-1,ar.y*=-1,ar.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),g.envMapRotation.value.setFromMatrix4(f2.makeRotationFromEuler(ar)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function r(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,m,_){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*m,g.scale.value=_*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function p(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function f(g,h,m){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Fe&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,h){h.matcap&&(g.matcap.value=h.matcap)}function b(g,h){let m=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function m2(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,_){let S=_.program;i.uniformBlockBinding(m,S)}function c(m,_){let S=s[m.id];S===void 0&&(v(m),S=d(m),s[m.id]=S,m.addEventListener("dispose",g));let T=_.program;i.updateUBOMapping(m,T);let C=t.render.frame;a[m.id]!==C&&(u(m),a[m.id]=C)}function d(m){let _=p();m.__bindingPointIndex=_;let S=e.createBuffer(),T=m.__size,C=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,T,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,S),S}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let _=s[m.id],S=m.uniforms,T=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let C=0,R=S.length;C<R;C++){let x=Array.isArray(S[C])?S[C]:[S[C]];for(let M=0,F=x.length;M<F;M++){let D=x[M];if(f(D,C,M,T)===!0){let P=D.__offset,A=Array.isArray(D.value)?D.value:[D.value],U=0;for(let B=0;B<A.length;B++){let z=A[B],H=b(z);typeof z=="number"||typeof z=="boolean"?(D.__data[0]=z,e.bufferSubData(e.UNIFORM_BUFFER,P+U,D.__data)):z.isMatrix3?(D.__data[0]=z.elements[0],D.__data[1]=z.elements[1],D.__data[2]=z.elements[2],D.__data[3]=0,D.__data[4]=z.elements[3],D.__data[5]=z.elements[4],D.__data[6]=z.elements[5],D.__data[7]=0,D.__data[8]=z.elements[6],D.__data[9]=z.elements[7],D.__data[10]=z.elements[8],D.__data[11]=0):(z.toArray(D.__data,U),U+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,P,D.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(m,_,S,T){let C=m.value,R=_+"_"+S;if(T[R]===void 0)return typeof C=="number"||typeof C=="boolean"?T[R]=C:T[R]=C.clone(),!0;{let x=T[R];if(typeof C=="number"||typeof C=="boolean"){if(x!==C)return T[R]=C,!0}else if(x.equals(C)===!1)return x.copy(C),!0}return!1}function v(m){let _=m.uniforms,S=0,T=16;for(let R=0,x=_.length;R<x;R++){let M=Array.isArray(_[R])?_[R]:[_[R]];for(let F=0,D=M.length;F<D;F++){let P=M[F],A=Array.isArray(P.value)?P.value:[P.value];for(let U=0,B=A.length;U<B;U++){let z=A[U],H=b(z),$=S%T,K=$%H.boundary,dt=$+K;S+=K,dt!==0&&T-dt<H.storage&&(S+=T-dt),P.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=H.storage}}}let C=S%T;return C>0&&(S+=T-C),m.__size=S,m.__cache={},this}function b(m){let _={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(_.boundary=4,_.storage=4):m.isVector2?(_.boundary=8,_.storage=8):m.isVector3||m.isColor?(_.boundary=16,_.storage=12):m.isVector4?(_.boundary=16,_.storage=16):m.isMatrix3?(_.boundary=48,_.storage=48):m.isMatrix4?(_.boundary=64,_.storage=64):m.isTexture?Pt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Pt("WebGLRenderer: Unsupported uniform value type.",m),_}function g(m){let _=m.target;_.removeEventListener("dispose",g);let S=r.indexOf(_.__bindingPointIndex);r.splice(S,1),e.deleteBuffer(s[_.id]),delete s[_.id],delete a[_.id]}function h(){for(let m in s)e.deleteBuffer(s[m]);r=[],s={},a={}}return{bind:l,update:c,dispose:h}}var g2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Wi=null;function v2(){return Wi===null&&(Wi=new Nh(g2,16,16,nr,Xi),Wi.name="DFG_LUT",Wi.minFilter=pn,Wi.magFilter=pn,Wi.wrapS=Fi,Wi.wrapT=Fi,Wi.generateMipmaps=!1,Wi.needsUpdate=!0),Wi}var Uo=class{constructor(t={}){let{canvas:n=ib(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ln}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=r;let b=f,g=new Set([nd,ed,td]),h=new Set([Ln,Ti,wo,Co,Kh,$h]),m=new Uint32Array(4),_=new Int32Array(4),S=null,T=null,C=[],R=[],x=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,F=!1;this._outputColorSpace=on;let D=0,P=0,A=null,U=-1,B=null,z=new Le,H=new Le,$=null,K=new Wt(0),dt=0,gt=n.width,ft=n.height,Xt=1,ne=null,fe=null,Z=new Le(0,0,gt,ft),st=new Le(0,0,gt,ft),at=!1,Ft=new Eo,Nt=!1,Ut=!1,ze=new Be,lt=new k,Dt=new Le,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},zt=!1;function Ee(){return A===null?Xt:1}let N=i;function Xe(E,O){return n.getContext(E,O)}try{let E={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"183"}`),n.addEventListener("webglcontextlost",St,!1),n.addEventListener("webglcontextrestored",Bt,!1),n.addEventListener("webglcontextcreationerror",Se,!1),N===null){let O="webgl2";if(N=Xe(O,E),N===null)throw Xe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw Ot("WebGLRenderer: "+E.message),E}let oe,xe,Et,w,y,I,J,Q,Y,yt,rt,Rt,Lt,tt,nt,xt,bt,pt,Yt,L,ot,it,vt;function et(){oe=new TC(N),oe.init(),ot=new u2(N,oe),xe=new vC(N,oe,t,ot),Et=new l2(N,oe),xe.reversedDepthBuffer&&u&&Et.buffers.depth.setReversed(!0),w=new CC(N),y=new ZR,I=new c2(N,oe,Et,y,xe,ot,w),J=new EC(M),Q=new LT(N),it=new mC(N,Q),Y=new AC(N,Q,w,it),yt=new DC(N,Y,Q,it,w),pt=new RC(N,xe,I),nt=new _C(y),rt=new YR(M,J,oe,xe,it,nt),Rt=new p2(M,y),Lt=new jR,tt=new n2(oe),bt=new pC(M,J,Et,yt,v,l),xt=new o2(M,yt,xe),vt=new m2(N,w,xe,Et),Yt=new gC(N,oe,w),L=new wC(N,oe,w),w.programs=rt.programs,M.capabilities=xe,M.extensions=oe,M.properties=y,M.renderLists=Lt,M.shadowMap=xt,M.state=Et,M.info=w}et(),b!==Ln&&(x=new UC(b,n.width,n.height,s,a));let q=new Kg(M,N);this.xr=q,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let E=oe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=oe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Xt},this.setPixelRatio=function(E){E!==void 0&&(Xt=E,this.setSize(gt,ft,!1))},this.getSize=function(E){return E.set(gt,ft)},this.setSize=function(E,O,X=!0){if(q.isPresenting){Pt("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=E,ft=O,n.width=Math.floor(E*Xt),n.height=Math.floor(O*Xt),X===!0&&(n.style.width=E+"px",n.style.height=O+"px"),x!==null&&x.setSize(n.width,n.height),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(gt*Xt,ft*Xt).floor()},this.setDrawingBufferSize=function(E,O,X){gt=E,ft=O,Xt=X,n.width=Math.floor(E*X),n.height=Math.floor(O*X),this.setViewport(0,0,E,O)},this.setEffects=function(E){if(b===Ln){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let O=0;O<E.length;O++)if(E[O].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(z)},this.getViewport=function(E){return E.copy(Z)},this.setViewport=function(E,O,X,G){E.isVector4?Z.set(E.x,E.y,E.z,E.w):Z.set(E,O,X,G),Et.viewport(z.copy(Z).multiplyScalar(Xt).round())},this.getScissor=function(E){return E.copy(st)},this.setScissor=function(E,O,X,G){E.isVector4?st.set(E.x,E.y,E.z,E.w):st.set(E,O,X,G),Et.scissor(H.copy(st).multiplyScalar(Xt).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(E){Et.setScissorTest(at=E)},this.setOpaqueSort=function(E){ne=E},this.setTransparentSort=function(E){fe=E},this.getClearColor=function(E){return E.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,X=!0){let G=0;if(E){let V=!1;if(A!==null){let ut=A.texture.format;V=g.has(ut)}if(V){let ut=A.texture.type,mt=h.has(ut),ht=bt.getClearColor(),Mt=bt.getClearAlpha(),wt=ht.r,Vt=ht.g,Zt=ht.b;mt?(m[0]=wt,m[1]=Vt,m[2]=Zt,m[3]=Mt,N.clearBufferuiv(N.COLOR,0,m)):(_[0]=wt,_[1]=Vt,_[2]=Zt,_[3]=Mt,N.clearBufferiv(N.COLOR,0,_))}else G|=N.COLOR_BUFFER_BIT}O&&(G|=N.DEPTH_BUFFER_BIT),X&&(G|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&N.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",St,!1),n.removeEventListener("webglcontextrestored",Bt,!1),n.removeEventListener("webglcontextcreationerror",Se,!1),bt.dispose(),Lt.dispose(),tt.dispose(),y.dispose(),J.dispose(),yt.dispose(),it.dispose(),vt.dispose(),rt.dispose(),q.dispose(),q.removeEventListener("sessionstart",o0),q.removeEventListener("sessionend",l0),Sa.stop()};function St(E){E.preventDefault(),Lg("WebGLRenderer: Context Lost."),F=!0}function Bt(){Lg("WebGLRenderer: Context Restored."),F=!1;let E=w.autoReset,O=xt.enabled,X=xt.autoUpdate,G=xt.needsUpdate,V=xt.type;et(),w.autoReset=E,xt.enabled=O,xt.autoUpdate=X,xt.needsUpdate=G,xt.type=V}function Se(E){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ue(E){let O=E.target;O.removeEventListener("dispose",ue),Yi(O)}function Yi(E){Zi(E),y.remove(E)}function Zi(E){let O=y.get(E).programs;O!==void 0&&(O.forEach(function(X){rt.releaseProgram(X)}),E.isShaderMaterial&&rt.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,X,G,V,ut){O===null&&(O=Qt);let mt=V.isMesh&&V.matrixWorld.determinant()<0,ht=Jb(E,O,X,G,V);Et.setMaterial(G,mt);let Mt=X.index,wt=1;if(G.wireframe===!0){if(Mt=Y.getWireframeAttribute(X),Mt===void 0)return;wt=2}let Vt=X.drawRange,Zt=X.attributes.position,Ct=Vt.start*wt,pe=(Vt.start+Vt.count)*wt;ut!==null&&(Ct=Math.max(Ct,ut.start*wt),pe=Math.min(pe,(ut.start+ut.count)*wt)),Mt!==null?(Ct=Math.max(Ct,0),pe=Math.min(pe,Mt.count)):Zt!=null&&(Ct=Math.max(Ct,0),pe=Math.min(pe,Zt.count));let He=pe-Ct;if(He<0||He===1/0)return;it.setup(V,G,ht,X,Mt);let Ie,me=Yt;if(Mt!==null&&(Ie=Q.get(Mt),me=L,me.setIndex(Ie)),V.isMesh)G.wireframe===!0?(Et.setLineWidth(G.wireframeLinewidth*Ee()),me.setMode(N.LINES)):me.setMode(N.TRIANGLES);else if(V.isLine){let mn=G.linewidth;mn===void 0&&(mn=1),Et.setLineWidth(mn*Ee()),V.isLineSegments?me.setMode(N.LINES):V.isLineLoop?me.setMode(N.LINE_LOOP):me.setMode(N.LINE_STRIP)}else V.isPoints?me.setMode(N.POINTS):V.isSprite&&me.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)kl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))me.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let mn=V._multiDrawStarts,Tt=V._multiDrawCounts,In=V._multiDrawCount,ie=Mt?Q.get(Mt).bytesPerElement:1,pi=y.get(G).currentProgram.getUniforms();for(let wi=0;wi<In;wi++)pi.setValue(N,"_gl_DrawID",wi),me.render(mn[wi]/ie,Tt[wi])}else if(V.isInstancedMesh)me.renderInstances(Ct,He,V.count);else if(X.isInstancedBufferGeometry){let mn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Tt=Math.min(X.instanceCount,mn);me.renderInstances(Ct,He,Tt)}else me.render(Ct,He)};function r0(E,O,X){E.transparent===!0&&E.side===Gi&&E.forceSinglePass===!1?(E.side=Fe,E.needsUpdate=!0,pc(E,O,X),E.side=Ss,E.needsUpdate=!0,pc(E,O,X),E.side=Gi):pc(E,O,X)}this.compile=function(E,O,X=null){X===null&&(X=E),T=tt.get(X),T.init(O),R.push(T),X.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),E!==X&&E.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),T.setupLights();let G=new Set;return E.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let ut=V.material;if(ut)if(Array.isArray(ut))for(let mt=0;mt<ut.length;mt++){let ht=ut[mt];r0(ht,X,V),G.add(ht)}else r0(ut,X,V),G.add(ut)}),T=R.pop(),G},this.compileAsync=function(E,O,X=null){let G=this.compile(E,O,X);return new Promise(V=>{function ut(){if(G.forEach(function(mt){y.get(mt).currentProgram.isReady()&&G.delete(mt)}),G.size===0){V(E);return}setTimeout(ut,10)}oe.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Wd=null;function Zb(E){Wd&&Wd(E)}function o0(){Sa.stop()}function l0(){Sa.start()}let Sa=new Ub;Sa.setAnimationLoop(Zb),typeof self<"u"&&Sa.setContext(self),this.setAnimationLoop=function(E){Wd=E,q.setAnimationLoop(E),E===null?Sa.stop():Sa.start()},q.addEventListener("sessionstart",o0),q.addEventListener("sessionend",l0),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;let X=q.enabled===!0&&q.isPresenting===!0,G=x!==null&&(A===null||X)&&x.begin(M,A);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,O,A),T=tt.get(E,R.length),T.init(O),R.push(T),ze.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ft.setFromProjectionMatrix(ze,Si,O.reversedDepth),Ut=this.localClippingEnabled,Nt=nt.init(this.clippingPlanes,Ut),S=Lt.get(E,C.length),S.init(),C.push(S),q.enabled===!0&&q.isPresenting===!0){let mt=M.xr.getDepthSensingMesh();mt!==null&&qd(mt,O,-1/0,M.sortObjects)}qd(E,O,0,M.sortObjects),S.finish(),M.sortObjects===!0&&S.sort(ne,fe),zt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,zt&&bt.addToRenderList(S,E),this.info.render.frame++,Nt===!0&&nt.beginShadows();let V=T.state.shadowsArray;if(xt.render(V,E,O),Nt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&x.hasRenderPass())===!1){let mt=S.opaque,ht=S.transmissive;if(T.setupLights(),O.isArrayCamera){let Mt=O.cameras;if(ht.length>0)for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt];u0(mt,ht,E,Zt)}zt&&bt.render(E);for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt];c0(S,E,Zt,Zt.viewport)}}else ht.length>0&&u0(mt,ht,E,O),zt&&bt.render(E),c0(S,E,O)}A!==null&&P===0&&(I.updateMultisampleRenderTarget(A),I.updateRenderTargetMipmap(A)),G&&x.end(M),E.isScene===!0&&E.onAfterRender(M,E,O),it.resetDefaultState(),U=-1,B=null,R.pop(),R.length>0?(T=R[R.length-1],Nt===!0&&nt.setGlobalState(M.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function qd(E,O,X,G){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ft.intersectsSprite(E)){G&&Dt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ze);let mt=yt.update(E),ht=E.material;ht.visible&&S.push(E,mt,ht,X,Dt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ft.intersectsObject(E))){let mt=yt.update(E),ht=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Dt.copy(E.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Dt.copy(mt.boundingSphere.center)),Dt.applyMatrix4(E.matrixWorld).applyMatrix4(ze)),Array.isArray(ht)){let Mt=mt.groups;for(let wt=0,Vt=Mt.length;wt<Vt;wt++){let Zt=Mt[wt],Ct=ht[Zt.materialIndex];Ct&&Ct.visible&&S.push(E,mt,Ct,X,Dt.z,Zt)}}else ht.visible&&S.push(E,mt,ht,X,Dt.z,null)}}let ut=E.children;for(let mt=0,ht=ut.length;mt<ht;mt++)qd(ut[mt],O,X,G)}function c0(E,O,X,G){let{opaque:V,transmissive:ut,transparent:mt}=E;T.setupLightsView(X),Nt===!0&&nt.setGlobalState(M.clippingPlanes,X),G&&Et.viewport(z.copy(G)),V.length>0&&fc(V,O,X),ut.length>0&&fc(ut,O,X),mt.length>0&&fc(mt,O,X),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function u0(E,O,X,G){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[G.id]===void 0){let Ct=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[G.id]=new Zn(1,1,{generateMipmaps:!0,type:Ct?Xi:Ln,minFilter:_a,samples:Math.max(4,xe.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let ut=T.state.transmissionRenderTarget[G.id],mt=G.viewport||z;ut.setSize(mt.z*M.transmissionResolutionScale,mt.w*M.transmissionResolutionScale);let ht=M.getRenderTarget(),Mt=M.getActiveCubeFace(),wt=M.getActiveMipmapLevel();M.setRenderTarget(ut),M.getClearColor(K),dt=M.getClearAlpha(),dt<1&&M.setClearColor(16777215,.5),M.clear(),zt&&bt.render(X);let Vt=M.toneMapping;M.toneMapping=Ei;let Zt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),T.setupLightsView(G),Nt===!0&&nt.setGlobalState(M.clippingPlanes,G),fc(E,X,G),I.updateMultisampleRenderTarget(ut),I.updateRenderTargetMipmap(ut),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let pe=0,He=O.length;pe<He;pe++){let Ie=O[pe],{object:me,geometry:mn,material:Tt,group:In}=Ie;if(Tt.side===Gi&&me.layers.test(G.layers)){let ie=Tt.side;Tt.side=Fe,Tt.needsUpdate=!0,h0(me,X,G,mn,Tt,In),Tt.side=ie,Tt.needsUpdate=!0,Ct=!0}}Ct===!0&&(I.updateMultisampleRenderTarget(ut),I.updateRenderTargetMipmap(ut))}M.setRenderTarget(ht,Mt,wt),M.setClearColor(K,dt),Zt!==void 0&&(G.viewport=Zt),M.toneMapping=Vt}function fc(E,O,X){let G=O.isScene===!0?O.overrideMaterial:null;for(let V=0,ut=E.length;V<ut;V++){let mt=E[V],{object:ht,geometry:Mt,group:wt}=mt,Vt=mt.material;Vt.allowOverride===!0&&G!==null&&(Vt=G),ht.layers.test(X.layers)&&h0(ht,O,X,Mt,Vt,wt)}}function h0(E,O,X,G,V,ut){E.onBeforeRender(M,O,X,G,V,ut),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(M,O,X,G,E,ut),V.transparent===!0&&V.side===Gi&&V.forceSinglePass===!1?(V.side=Fe,V.needsUpdate=!0,M.renderBufferDirect(X,O,G,V,E,ut),V.side=Ss,V.needsUpdate=!0,M.renderBufferDirect(X,O,G,V,E,ut),V.side=Gi):M.renderBufferDirect(X,O,G,V,E,ut),E.onAfterRender(M,O,X,G,V,ut)}function pc(E,O,X){O.isScene!==!0&&(O=Qt);let G=y.get(E),V=T.state.lights,ut=T.state.shadowsArray,mt=V.state.version,ht=rt.getParameters(E,V.state,ut,O,X),Mt=rt.getProgramCacheKey(ht),wt=G.programs;G.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;let Vt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;G.envMap=J.get(E.envMap||G.environment,Vt),G.envMapRotation=G.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,wt===void 0&&(E.addEventListener("dispose",ue),wt=new Map,G.programs=wt);let Zt=wt.get(Mt);if(Zt!==void 0){if(G.currentProgram===Zt&&G.lightsStateVersion===mt)return f0(E,ht),Zt}else ht.uniforms=rt.getUniforms(E),E.onBeforeCompile(ht,M),Zt=rt.acquireProgram(ht,Mt),wt.set(Mt,Zt),G.uniforms=ht.uniforms;let Ct=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=nt.uniform),f0(E,ht),G.needsLights=Qb(E),G.lightsStateVersion=mt,G.needsLights&&(Ct.ambientLightColor.value=V.state.ambient,Ct.lightProbe.value=V.state.probe,Ct.directionalLights.value=V.state.directional,Ct.directionalLightShadows.value=V.state.directionalShadow,Ct.spotLights.value=V.state.spot,Ct.spotLightShadows.value=V.state.spotShadow,Ct.rectAreaLights.value=V.state.rectArea,Ct.ltc_1.value=V.state.rectAreaLTC1,Ct.ltc_2.value=V.state.rectAreaLTC2,Ct.pointLights.value=V.state.point,Ct.pointLightShadows.value=V.state.pointShadow,Ct.hemisphereLights.value=V.state.hemi,Ct.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ct.spotLightMatrix.value=V.state.spotLightMatrix,Ct.spotLightMap.value=V.state.spotLightMap,Ct.pointShadowMatrix.value=V.state.pointShadowMatrix),G.currentProgram=Zt,G.uniformsList=null,Zt}function d0(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=Do.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function f0(E,O){let X=y.get(E);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function Jb(E,O,X,G,V){O.isScene!==!0&&(O=Qt),I.resetTextureUnits();let ut=O.fog,mt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,ht=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ja,Mt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,wt=J.get(G.envMap||mt,Mt),Vt=G.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Zt=!!X.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!X.morphAttributes.position,pe=!!X.morphAttributes.normal,He=!!X.morphAttributes.color,Ie=Ei;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ie=M.toneMapping);let me=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,mn=me!==void 0?me.length:0,Tt=y.get(G),In=T.state.lights;if(Nt===!0&&(Ut===!0||E!==B)){let en=E===B&&G.id===U;nt.setState(G,E,en)}let ie=!1;G.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==In.state.version||Tt.outputColorSpace!==ht||V.isBatchedMesh&&Tt.batching===!1||!V.isBatchedMesh&&Tt.batching===!0||V.isBatchedMesh&&Tt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Tt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Tt.instancing===!1||!V.isInstancedMesh&&Tt.instancing===!0||V.isSkinnedMesh&&Tt.skinning===!1||!V.isSkinnedMesh&&Tt.skinning===!0||V.isInstancedMesh&&Tt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Tt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Tt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Tt.instancingMorph===!1&&V.morphTexture!==null||Tt.envMap!==wt||G.fog===!0&&Tt.fog!==ut||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==nt.numPlanes||Tt.numIntersection!==nt.numIntersection)||Tt.vertexAlphas!==Vt||Tt.vertexTangents!==Zt||Tt.morphTargets!==Ct||Tt.morphNormals!==pe||Tt.morphColors!==He||Tt.toneMapping!==Ie||Tt.morphTargetsCount!==mn)&&(ie=!0):(ie=!0,Tt.__version=G.version);let pi=Tt.currentProgram;ie===!0&&(pi=pc(G,O,V));let wi=!1,ba=!1,lr=!1,_e=pi.getUniforms(),ln=Tt.uniforms;if(Et.useProgram(pi.program)&&(wi=!0,ba=!0,lr=!0),G.id!==U&&(U=G.id,ba=!0),wi||B!==E){Et.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),_e.setValue(N,"projectionMatrix",E.projectionMatrix),_e.setValue(N,"viewMatrix",E.matrixWorldInverse);let ws=_e.map.cameraPosition;ws!==void 0&&ws.setValue(N,lt.setFromMatrixPosition(E.matrixWorld)),xe.logarithmicDepthBuffer&&_e.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_e.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),B!==E&&(B=E,ba=!0,lr=!0)}if(Tt.needsLights&&(In.state.directionalShadowMap.length>0&&_e.setValue(N,"directionalShadowMap",In.state.directionalShadowMap,I),In.state.spotShadowMap.length>0&&_e.setValue(N,"spotShadowMap",In.state.spotShadowMap,I),In.state.pointShadowMap.length>0&&_e.setValue(N,"pointShadowMap",In.state.pointShadowMap,I)),V.isSkinnedMesh){_e.setOptional(N,V,"bindMatrix"),_e.setOptional(N,V,"bindMatrixInverse");let en=V.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),_e.setValue(N,"boneTexture",en.boneTexture,I))}V.isBatchedMesh&&(_e.setOptional(N,V,"batchingTexture"),_e.setValue(N,"batchingTexture",V._matricesTexture,I),_e.setOptional(N,V,"batchingIdTexture"),_e.setValue(N,"batchingIdTexture",V._indirectTexture,I),_e.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&_e.setValue(N,"batchingColorTexture",V._colorsTexture,I));let As=X.morphAttributes;if((As.position!==void 0||As.normal!==void 0||As.color!==void 0)&&pt.update(V,X,pi),(ba||Tt.receiveShadow!==V.receiveShadow)&&(Tt.receiveShadow=V.receiveShadow,_e.setValue(N,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(ln.envMapIntensity.value=O.environmentIntensity),ln.dfgLUT!==void 0&&(ln.dfgLUT.value=v2()),ba&&(_e.setValue(N,"toneMappingExposure",M.toneMappingExposure),Tt.needsLights&&jb(ln,lr),ut&&G.fog===!0&&Rt.refreshFogUniforms(ln,ut),Rt.refreshMaterialUniforms(ln,G,Xt,ft,T.state.transmissionRenderTarget[E.id]),Do.upload(N,d0(Tt),ln,I)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Do.upload(N,d0(Tt),ln,I),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_e.setValue(N,"center",V.center),_e.setValue(N,"modelViewMatrix",V.modelViewMatrix),_e.setValue(N,"normalMatrix",V.normalMatrix),_e.setValue(N,"modelMatrix",V.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let en=G.uniformsGroups;for(let ws=0,cr=en.length;ws<cr;ws++){let p0=en[ws];vt.update(p0,pi),vt.bind(p0,pi)}}return pi}function jb(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Qb(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,O,X){let G=y.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),y.get(E.texture).__webglTexture=O,y.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:X,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){let X=y.get(E);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0};let Kb=N.createFramebuffer();this.setRenderTarget=function(E,O=0,X=0){A=E,D=O,P=X;let G=null,V=!1,ut=!1;if(E){let ht=y.get(E);if(ht.__useDefaultFramebuffer!==void 0){Et.bindFramebuffer(N.FRAMEBUFFER,ht.__webglFramebuffer),z.copy(E.viewport),H.copy(E.scissor),$=E.scissorTest,Et.viewport(z),Et.scissor(H),Et.setScissorTest($),U=-1;return}else if(ht.__webglFramebuffer===void 0)I.setupRenderTarget(E);else if(ht.__hasExternalTextures)I.rebindTextures(E,y.get(E.texture).__webglTexture,y.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Vt=E.depthTexture;if(ht.__boundDepthTexture!==Vt){if(Vt!==null&&y.has(Vt)&&(E.width!==Vt.image.width||E.height!==Vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(E)}}let Mt=E.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(ut=!0);let wt=y.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(wt[O])?G=wt[O][X]:G=wt[O],V=!0):E.samples>0&&I.useMultisampledRTT(E)===!1?G=y.get(E).__webglMultisampledFramebuffer:Array.isArray(wt)?G=wt[X]:G=wt,z.copy(E.viewport),H.copy(E.scissor),$=E.scissorTest}else z.copy(Z).multiplyScalar(Xt).floor(),H.copy(st).multiplyScalar(Xt).floor(),$=at;if(X!==0&&(G=Kb),Et.bindFramebuffer(N.FRAMEBUFFER,G)&&Et.drawBuffers(E,G),Et.viewport(z),Et.scissor(H),Et.setScissorTest($),V){let ht=y.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,ht.__webglTexture,X)}else if(ut){let ht=O;for(let Mt=0;Mt<E.textures.length;Mt++){let wt=y.get(E.textures[Mt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Mt,wt.__webglTexture,X,ht)}}else if(E!==null&&X!==0){let ht=y.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ht.__webglTexture,X)}U=-1},this.readRenderTargetPixels=function(E,O,X,G,V,ut,mt,ht=0){if(!(E&&E.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt){Et.bindFramebuffer(N.FRAMEBUFFER,Mt);try{let wt=E.textures[ht],Vt=wt.format,Zt=wt.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht),!xe.textureFormatReadable(Vt)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xe.textureTypeReadable(Zt)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-G&&X>=0&&X<=E.height-V&&N.readPixels(O,X,G,V,ot.convert(Vt),ot.convert(Zt),ut)}finally{let wt=A!==null?y.get(A).__webglFramebuffer:null;Et.bindFramebuffer(N.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(E,O,X,G,V,ut,mt,ht=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt)if(O>=0&&O<=E.width-G&&X>=0&&X<=E.height-V){Et.bindFramebuffer(N.FRAMEBUFFER,Mt);let wt=E.textures[ht],Vt=wt.format,Zt=wt.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht),!xe.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xe.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ct=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ct),N.bufferData(N.PIXEL_PACK_BUFFER,ut.byteLength,N.STREAM_READ),N.readPixels(O,X,G,V,ot.convert(Vt),ot.convert(Zt),0);let pe=A!==null?y.get(A).__webglFramebuffer:null;Et.bindFramebuffer(N.FRAMEBUFFER,pe);let He=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ab(N,He,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ct),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ut),N.deleteBuffer(Ct),N.deleteSync(He),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,X=0){let G=Math.pow(2,-X),V=Math.floor(E.image.width*G),ut=Math.floor(E.image.height*G),mt=O!==null?O.x:0,ht=O!==null?O.y:0;I.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,mt,ht,V,ut),Et.unbindTexture()};let $b=N.createFramebuffer(),tM=N.createFramebuffer();this.copyTextureToTexture=function(E,O,X=null,G=null,V=0,ut=0){let mt,ht,Mt,wt,Vt,Zt,Ct,pe,He,Ie=E.isCompressedTexture?E.mipmaps[ut]:E.image;if(X!==null)mt=X.max.x-X.min.x,ht=X.max.y-X.min.y,Mt=X.isBox3?X.max.z-X.min.z:1,wt=X.min.x,Vt=X.min.y,Zt=X.isBox3?X.min.z:0;else{let ln=Math.pow(2,-V);mt=Math.floor(Ie.width*ln),ht=Math.floor(Ie.height*ln),E.isDataArrayTexture?Mt=Ie.depth:E.isData3DTexture?Mt=Math.floor(Ie.depth*ln):Mt=1,wt=0,Vt=0,Zt=0}G!==null?(Ct=G.x,pe=G.y,He=G.z):(Ct=0,pe=0,He=0);let me=ot.convert(O.format),mn=ot.convert(O.type),Tt;O.isData3DTexture?(I.setTexture3D(O,0),Tt=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(I.setTexture2DArray(O,0),Tt=N.TEXTURE_2D_ARRAY):(I.setTexture2D(O,0),Tt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);let In=N.getParameter(N.UNPACK_ROW_LENGTH),ie=N.getParameter(N.UNPACK_IMAGE_HEIGHT),pi=N.getParameter(N.UNPACK_SKIP_PIXELS),wi=N.getParameter(N.UNPACK_SKIP_ROWS),ba=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ie.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ie.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,wt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Zt);let lr=E.isDataArrayTexture||E.isData3DTexture,_e=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){let ln=y.get(E),As=y.get(O),en=y.get(ln.__renderTarget),ws=y.get(As.__renderTarget);Et.bindFramebuffer(N.READ_FRAMEBUFFER,en.__webglFramebuffer),Et.bindFramebuffer(N.DRAW_FRAMEBUFFER,ws.__webglFramebuffer);for(let cr=0;cr<Mt;cr++)lr&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,y.get(E).__webglTexture,V,Zt+cr),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,y.get(O).__webglTexture,ut,He+cr)),N.blitFramebuffer(wt,Vt,mt,ht,Ct,pe,mt,ht,N.DEPTH_BUFFER_BIT,N.NEAREST);Et.bindFramebuffer(N.READ_FRAMEBUFFER,null),Et.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||E.isRenderTargetTexture||y.has(E)){let ln=y.get(E),As=y.get(O);Et.bindFramebuffer(N.READ_FRAMEBUFFER,$b),Et.bindFramebuffer(N.DRAW_FRAMEBUFFER,tM);for(let en=0;en<Mt;en++)lr?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ln.__webglTexture,V,Zt+en):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ln.__webglTexture,V),_e?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,As.__webglTexture,ut,He+en):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,As.__webglTexture,ut),V!==0?N.blitFramebuffer(wt,Vt,mt,ht,Ct,pe,mt,ht,N.COLOR_BUFFER_BIT,N.NEAREST):_e?N.copyTexSubImage3D(Tt,ut,Ct,pe,He+en,wt,Vt,mt,ht):N.copyTexSubImage2D(Tt,ut,Ct,pe,wt,Vt,mt,ht);Et.bindFramebuffer(N.READ_FRAMEBUFFER,null),Et.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _e?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Tt,ut,Ct,pe,He,mt,ht,Mt,me,mn,Ie.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(Tt,ut,Ct,pe,He,mt,ht,Mt,me,Ie.data):N.texSubImage3D(Tt,ut,Ct,pe,He,mt,ht,Mt,me,mn,Ie):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ut,Ct,pe,mt,ht,me,mn,Ie.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ut,Ct,pe,Ie.width,Ie.height,me,Ie.data):N.texSubImage2D(N.TEXTURE_2D,ut,Ct,pe,mt,ht,me,mn,Ie);N.pixelStorei(N.UNPACK_ROW_LENGTH,In),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie),N.pixelStorei(N.UNPACK_SKIP_PIXELS,pi),N.pixelStorei(N.UNPACK_SKIP_ROWS,wi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ba),ut===0&&O.generateMipmaps&&N.generateMipmap(Tt),Et.unbindTexture()},this.initRenderTarget=function(E){y.get(E).__webglFramebuffer===void 0&&I.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?I.setTextureCube(E,0):E.isData3DTexture?I.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?I.setTexture2DArray(E,0):I.setTexture2D(E,0),Et.unbindTexture()},this.resetState=function(){D=0,P=0,A=null,Et.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),n.unpackColorSpace=ee._getUnpackColorSpace()}};var Io=Kn(or()),x2="/assets/pynqcast-white.png",$g=class extends ua{constructor(){super();let t=new At;t.deleteAttribute("uv");let n=new _t(t,[new ce({color:8947848,side:Fe}),new ce({color:8947848,side:Fe}),new ce({color:16777215,side:Fe}),new ce({color:4473924,side:Fe}),new ce({color:8947848,side:Fe}),new ce({color:8947848,side:Fe})]);n.scale.setScalar(10),this.add(n);let i=new En(16729088,2,20);i.position.set(5,5,5),this.add(i);let s=new En(17663,1,20);s.position.set(-5,5,-5),this.add(s);let a=new En(16777215,1,20);a.position.set(0,10,0),this.add(a)}};function S2({hostSlot:e}){let t=(0,Es.useRef)(null),n=(0,Es.useRef)(null),i=(0,Es.useRef)(null),[s,a]=(0,Es.useState)(!1);return(0,Es.useEffect)(()=>{let r=document.getElementById("page-about");if(!r)return;let o=()=>a(!r.hidden);o();let l=new MutationObserver(o);return l.observe(r,{attributes:!0,attributeFilter:["hidden"]}),()=>l.disconnect()},[]),(0,Es.useEffect)(()=>{if(!s)return()=>{};let r=t.current,o=n.current,l=i.current,c=e?.closest(".about-sprite-wrap");if(!r||!o||!l||!c)return()=>{};c.classList.add("board-ready");let d=Math.max(420,Math.round(r.clientWidth||620)),p=Math.max(420,Math.round(r.clientHeight||420)),u=new Uo({antialias:!1,alpha:!0});u.setSize(Math.floor(d/4),Math.floor(p/4)),u.domElement.style.width=`${d}px`,u.domElement.style.height=`${p}px`,u.domElement.style.imageRendering="pixelated",u.setClearColor(0,0),u.toneMapping=tr,u.toneMappingExposure=1.2,u.setPixelRatio(1),u.outputColorSpace=on,o.appendChild(u.domElement);let f=new No(u);f.compileEquirectangularShader();let v=f.fromScene(new $g).texture;f.dispose();let b=new ua;b.environment=v;let g=new Ke(38,d/p,.1,100);g.position.set(0,.2,7.5),g.lookAt(0,0,0),b.add(new Ka(3342336,8));let h=new En(12260608,600,16),m=new En(16777215,400,7),_=new En(16772829,300,6),S=new En(1127338,150,10);h.position.set(2.5,1.8,3),m.position.set(1,1.5,2.5),_.position.set(-1.6,1.1,2),S.position.set(-2.4,1.6,-2.8),b.add(h),b.add(m),b.add(_),b.add(S);let T=new ce({color:4523014,metalness:.85,roughness:.08,emissive:new Wt("#120002"),emissiveIntensity:.38,envMapIntensity:1.8}),C=new ce({color:2752514,metalness:.8,roughness:.15,envMapIntensity:1.2}),R=new ce({color:16758784,metalness:1,roughness:.04,emissive:new Wt("#221100"),emissiveIntensity:.15,envMapIntensity:2.5}),x=new ce({color:65348,emissive:new Wt("#00ff44"),emissiveIntensity:.8,metalness:0,roughness:.5}),M=new bi;M.scale.setScalar(1.22),b.add(M);let F=new _t(new At(3.55,2.3,.16),C);M.add(F);let D=new _t(new At(3.35,2.1,.11),T);D.position.z=.03,M.add(D);let P=new _t(new At(3.35,2.1,.11),T);P.position.z=-.03,M.add(P);let A=(lt,Dt,Qt,zt,Ee=.012)=>{let N=new _t(new At(Qt,zt,Ee),R);N.position.set(lt,Dt,.09),M.add(N)};A(-.12,.56,.64,.03),A(.42,.56,.46,.03),A(.72,.48,.03,.18),A(.98,.48,.22,.03),A(-.78,.1,.36,.03),A(-.94,.02,.03,.46),A(-.84,-.18,.2,.03),A(.12,.1,.72,.03),A(.82,.02,.03,.7),A(.6,-.24,.42,.03),A(-.3,-.22,.03,.48),A(-.08,-.56,1.08,.03),A(-1.18,-.64,.03,.2),A(-1.04,-.72,.24,.03),A(.92,-.74,.03,.28),A(1.08,-.6,.28,.03),A(-.82,.84,1.22,.026),A(-.14,.94,.026,.12),A(-1.34,.32,.03,.86),A(1.3,.26,.03,.74);let U=new _t(new At(.85,.85,.12),C);U.position.set(-.3,.1,.14),M.add(U);let B=new _t(new At(.75,.75,.03),T);B.position.set(-.3,.1,.21),M.add(B);let z=new _t(new At(.55,.38,.08),C);z.position.set(.95,.55,.12),M.add(z);for(let lt=0;lt<3;lt++){let Dt=new _t(new At(.18,.22,.1),C);Dt.position.set(-1.2+lt*.26,-.7,.13),M.add(Dt)}let H=new _t(new At(.22,.18,.2),C);H.position.set(1.6,.2,.14),M.add(H);let $=new _t(new At(.28,.16,.18),C);$.position.set(1.6,-.15,.14),M.add($);let K=new _t(new At(.24,.22,.22),C);K.position.set(1.6,.6,.14),M.add(K);for(let lt=0;lt<2;lt++){let Dt=new _t(new At(.14,.48,.1),C);Dt.position.set(-1.6,.3-lt*.6,.12),M.add(Dt)}let dt=new _t(new At(1.8,.1,.08),C);dt.position.set(.1,1.08,.12),M.add(dt);let gt=new _t(new At(.22,.22,.24),C);gt.position.set(-1.45,-.95,.16),M.add(gt);let ft=new _t(new At(.32,.18,.1),R);ft.position.set(.9,-1.02,.1),M.add(ft);for(let lt=0;lt<4;lt++){let Dt=new _t(new At(.06,.06,.05),x);Dt.position.set(.3+lt*.12,.75,.18),M.add(Dt)}for(let lt=0;lt<2;lt++){let Dt=new _t(new At(.1,.1,.08),C);Dt.position.set(.55+lt*.18,-.55,.14),M.add(Dt)}for(let lt=0;lt<14;lt++){let Dt=new _t(new At(.06,.06,.12),R);Dt.position.set(-1.1+lt*.18,1.1,.1),M.add(Dt);let Qt=Dt.clone();Qt.position.y=1.18,M.add(Qt)}for(let lt=0;lt<18;lt++){let Dt=new _t(new At(.055,.18,.04),R);Dt.position.set(-1.28+lt*.145,-1.08,.06),M.add(Dt)}let ne=new Kl().load(x2,()=>{ne.magFilter=ke,ne.minFilter=ke,ne.generateMipmaps=!1,ne.colorSpace=on,ne.needsUpdate=!0}),fe=new ce({map:ne,color:16777215,metalness:.18,roughness:.36,emissive:new Wt("#220000"),emissiveIntensity:.2,transparent:!0,alphaTest:.08}),Z=new _t(new Qa(3.28,2),fe);Z.position.set(.04,.04,-.106),Z.rotation.y=Math.PI,M.add(Z);let st=[T,C,R,x,fe],at=[F.geometry,D.geometry,P.geometry,Z.geometry],Ft=[F,D,P,Z];M.children.forEach(lt=>{Ft.includes(lt)||at.push(lt.geometry)});let Nt=0,Ut=new $a,ze=()=>{Ut.update();let lt=Ut.getElapsed(),Dt=Math.sin(lt*1.4),Qt=(Dt+1)/2;M.rotation.y=lt*1.1,M.rotation.x=.25+Math.sin(lt*.5)*.08,M.rotation.z=Math.sin(lt*.7)*.06,M.position.y=.22+Dt*.18,h.position.x=Math.cos(lt*.6)*4,h.position.z=Math.sin(lt*.6)*4+2,m.position.x=Math.cos(lt*2.2)*2.5,m.position.y=Math.sin(lt*1.6)*2,m.position.z=2.5,_.position.x=Math.cos(lt*1.8+Math.PI)*2,_.position.y=Math.sin(lt*2.1+Math.PI)*1.5,_.position.z=2;let zt=.5+Qt*.5,Ee=.25+Qt*.25,N=Math.sin(M.rotation.z)*-18;l.style.transform=`translateX(calc(-50% + ${N.toFixed(1)}px)) scaleX(${zt.toFixed(3)}) scaleY(${Ee.toFixed(3)})`,l.style.opacity=(.15+Qt*.45).toFixed(3),u.render(b,g),Nt=requestAnimationFrame(ze)};return ze(),()=>{c.classList.remove("board-ready"),cancelAnimationFrame(Nt),ne.dispose(),v.dispose(),st.forEach(lt=>lt.dispose()),at.forEach(lt=>lt?.dispose()),u.dispose(),o&&u.domElement.parentNode===o&&o.removeChild(u.domElement)}},[e,s]),(0,Io.jsxs)("div",{ref:t,style:{width:"100%",height:420,position:"relative",overflow:"visible"},children:[(0,Io.jsx)("div",{ref:n,style:{position:"absolute",inset:0,overflow:"visible",transform:"translateY(-88px)"}}),(0,Io.jsx)("div",{ref:i,style:{position:"absolute",bottom:8,left:"50%",width:320,height:28,background:"radial-gradient(ellipse at center, rgba(160,12,8,0.6) 0%, rgba(90,4,4,0.28) 45%, transparent 72%)",filter:"blur(10px)",pointerEvents:"none",transformOrigin:"center center"}})]})}function t0({portalTarget:e}){return e?(0,Vb.createPortal)((0,Io.jsx)(S2,{hostSlot:e}),e):null}var Me=Kn(dr());var W=Kn(or()),b2=8,Gb=["#00ff88","#00d4ff","#ffaa00","#ff6688","#a855f7","#7cfffa","#ffd700","#f05252"];function De(e,t=0){let n=Number(e);return Number.isFinite(n)?n:t}function kb(e={}){return{player_key:String(e.player_key||""),display_name:String(e.display_name||e.username||e.player_key||"unknown player"),username:String(e.username||""),controller_key:String(e.controller_key||""),identity_source:String(e.identity_source||""),first_seen_at:String(e.first_seen_at||""),last_seen_at:String(e.last_seen_at||""),last_match_id:String(e.last_match_id||""),match_count:De(e.match_count),matches_as_runner:De(e.matches_as_runner),matches_as_tagger:De(e.matches_as_tagger),wins_as_runner:De(e.wins_as_runner),wins_as_tagger:De(e.wins_as_tagger),total_wins:De(e.total_wins),total_tags_landed:De(e.total_tags_landed),times_tagged:De(e.times_tagged),total_bits_collected:De(e.total_bits_collected)}}function M2(e={}){return{timestamp:String(e.timestamp||""),match_id:String(e.match_id||""),status:String(e.status||""),role:String(e.role||""),won:De(e.won),map_name:String(e.map_name||""),game_mode:De(e.game_mode),duration_ms:De(e.duration_ms),tag_count:De(e.tag_count),bits_collected:De(e.bits_collected),bits_total:De(e.bits_total),winner:String(e.winner||"")}}function Xd(e){return e==="runner"?"Runner":e==="tagger"?"Tagger":e==="ghost"?"Ghost":"Offline"}function E2(e){return De(e)===1?"Chase Bits":"Chase"}function T2(e,t){return t?`${Math.round(e/t*100)}%`:"0%"}function e0(e){return e?e.replace("T"," "):"\u2014"}function A2(e){return e?e>=6e4?`${(e/6e4).toFixed(1)} min`:`${(e/1e3).toFixed(1)} s`:"\u2014"}function kd(e){return Number.isFinite(e)?e.toFixed(1):"\u2014"}function Xb(e){return Number.isFinite(e)?`${Math.round(e)}\xB0`:"\u2014"}function n0(e){return!!(De(e?.flags)&b2)||!!e?.is_ghost}function w2(e){return e?n0(e)?"ghost":De(e.id)===1?"runner":De(e.id)===2?"tagger":null:null}function C2(e){let t=String(e||"player"),n=0;for(let i=0;i<t.length;i+=1)n=(n<<5)-n+t.charCodeAt(i),n|=0;return Gb[Math.abs(n)%Gb.length]}function R2(e,t){let n=new ce({color:t,metalness:.25,roughness:.5,emissive:t.clone().multiplyScalar(.12)}),i=new ce({color:t.clone().multiplyScalar(.35),metalness:.4,roughness:.35}),s=new ce({color:16777215,emissive:16777215,emissiveIntensity:.5}),a=new ce({color:4386,metalness:.9,roughness:.08,emissive:t,emissiveIntensity:.25}),r=new _t(new At(.72,.72,.72),n);r.position.y=2,e.add(r);let o=new _t(new At(.64,.2,.12),a);o.position.set(0,1.96,.34),e.add(o);for(let p of[-.14,.14]){let u=new _t(new At(.1,.1,.06),s);u.position.set(p,2,.38),e.add(u)}let l=new _t(new At(.06,.45,.06),n);l.position.set(0,2.58,0),e.add(l);let c=new _t(new At(.14,.14,.14),new ce({color:16777215,emissive:t,emissiveIntensity:1.2}));c.position.set(0,2.86,0),e.add(c);let d=new _t(new At(.82,.88,.52),i);d.position.y=1.18,e.add(d);for(let p of[1.3,1.05]){let u=new _t(new At(.84,.08,.54),n);u.position.y=p,e.add(u)}for(let p of[-1,1]){let u=new _t(new At(.22,.65,.22),n);u.position.set(p*.52,1.28,0),e.add(u);let f=new _t(new At(.24,.24,.24),i);f.position.set(p*.52,.86,0),e.add(f)}for(let p of[-1,1]){let u=new _t(new At(.28,.55,.28),i);u.position.set(p*.2,.42,0),e.add(u);let f=new _t(new At(.32,.16,.42),n);f.position.set(p*.2,.08,.06),e.add(f)}}function D2(e,t){let n=new ce({color:t,metalness:.35,roughness:.4,emissive:t.clone().multiplyScalar(.15)}),i=new ce({color:t.clone().multiplyScalar(.3),metalness:.5,roughness:.3}),s=new ce({color:16720384,emissive:16720384,emissiveIntensity:.6}),a=new _t(new At(.78,.68,.72),n);a.position.y=2,e.add(a);let r=new _t(new At(.7,.1,.14),i);r.position.set(0,2.12,.34),e.add(r);for(let p of[-.16,.16]){let u=new _t(new At(.14,.08,.06),s);u.position.set(p,2.02,.38),e.add(u)}for(let p=0;p<3;p+=1){let u=new _t(new At(.1,.22+p*.06,.1),n);u.position.set(-.22+p*.22,2.5+p*.04,0),e.add(u)}let o=new _t(new At(.92,.95,.58),i);o.position.y=1.16,e.add(o);let l=new _t(new At(.7,.5,.12),n);l.position.set(0,1.3,.3),e.add(l);let c=new _t(new At(.4,.06,.04),s);c.position.set(0,1.3,.37),c.rotation.z=.7,e.add(c);let d=c.clone();d.rotation.z=-.7,e.add(d);for(let p of[-1,1]){let u=new _t(new At(.28,.7,.28),n);u.position.set(p*.6,1.25,0),e.add(u);let f=new _t(new At(.3,.3,.3),i);f.position.set(p*.6,.8,0),e.add(f)}for(let p of[-1,1]){let u=new _t(new At(.32,.6,.32),i);u.position.set(p*.22,.38,0),e.add(u);let f=new _t(new At(.36,.18,.46),n);f.position.set(p*.22,.06,.06),e.add(f)}}function N2(e,t){let n=(o=.7,l=.3)=>new ce({color:t,metalness:.1,roughness:.6,emissive:t,emissiveIntensity:l,transparent:!0,opacity:o}),i=new ce({color:16777215,emissive:16777215,emissiveIntensity:.8}),s=new ce({color:1118515,emissive:t,emissiveIntensity:.2});[{w:.5,h:.2,d:.45,y:2.72},{w:.8,h:.3,d:.7,y:2.5},{w:1,h:.6,d:.9,y:2.1},{w:1.1,h:.7,d:1,y:1.55},{w:1.15,h:.5,d:1,y:1}].forEach(o=>{let l=new _t(new At(o.w,o.h,o.d),n());l.position.y=o.y,e.add(l)});let r=new _t(new At(.45,.45,.35),new ce({color:16777215,emissive:t,emissiveIntensity:.4,transparent:!0,opacity:.35}));r.position.y=1.7,e.add(r);for(let o=0;o<5;o+=1){let l=new _t(new At(.22,.3,.22),n(.55,.25));l.position.set(-.44+o*.22,.6,0),e.add(l);let c=new _t(new At(.18,.22,.18),n(.4,.2));c.position.set(-.44+o*.22,.35-o%2*.15,0),c.userData.tentacleIndex=o,e.add(c)}for(let o of[-.24,.24]){let l=new _t(new At(.3,.32,.14),i);l.position.set(o,2.12,.42),e.add(l);let c=new _t(new At(.14,.18,.06),s);c.position.set(o+.04,2.1,.5),e.add(c)}}function U2({player:e,pageVisible:t}){let n=(0,Me.useRef)(null),i=(0,Me.useRef)(null),[s,a]=(0,Me.useState)(!1),[r,o]=(0,Me.useState)(""),l=e.currentRole||"runner",c=l==="ghost";return(0,Me.useEffect)(()=>{let d=n.current;if(!d||!t)return a(!1),()=>{};let p=new IntersectionObserver(u=>{a(u.some(f=>f.isIntersecting))},{root:null,rootMargin:"220px 0px",threshold:.01});return p.observe(d),()=>p.disconnect()},[t,e.player_key]),(0,Me.useEffect)(()=>{let d=i.current;if(!d||!t||!s)return()=>{};let p=200,u=220,f=new Wt(C2(e.player_key||e.profile_key)),v=null;try{v=new Uo({antialias:!1,alpha:!0})}catch{return o("WEBGL UNAVAILABLE"),()=>{}}o(""),v.setSize(p/3,u/3),v.domElement.style.width=`${p}px`,v.domElement.style.height=`${u}px`,v.domElement.style.imageRendering="pixelated",v.setClearColor(0,0),v.toneMapping=tr,v.toneMappingExposure=1.3,v.setPixelRatio(1),v.outputColorSpace=on,d.appendChild(v.domElement);let b=new ua,g=new Ke(30,p/u,.1,100);g.position.set(0,1.8,6),g.lookAt(0,1,0),b.add(new Ka(1576992,4));let h=new En(f.getHex(),180,14);h.position.set(2.5,3.5,3);let m=new En(2245802,60,10);m.position.set(-3,2,-2);let _=new En(16777215,50,10);_.position.set(0,6,1),b.add(h),b.add(m),b.add(_);let S=new bi;b.add(S);let T=new _t(new At(1.8,.1,1.8),new ce({color:657944,metalness:.85,roughness:.15,emissive:f.clone().multiplyScalar(.04)}));T.position.y=-.05,b.add(T),l==="tagger"?D2(S,f):l==="ghost"?N2(S,f):R2(S,f);let C=new At(.07,.04,.07),R=new ce({color:f,emissive:f,emissiveIntensity:.9,transparent:!0,opacity:.55}),x=[];for(let P=0;P<10;P+=1){let A=new _t(C,R),U=P/10*Math.PI*2;A.position.set(Math.cos(U)*1,0,Math.sin(U)*1),S.add(A),x.push({mesh:A,baseAngle:U})}let M=new $a,F=0,D=()=>{M.update();let P=M.getElapsed();S.rotation.y=Math.sin(P*.7)*.45,c?(S.position.y=.15+Math.sin(P*1.2)*.22,S.children.forEach(A=>{A.userData.tentacleIndex!==void 0&&(A.position.y=.35-A.userData.tentacleIndex%2*.15+Math.sin(P*3+A.userData.tentacleIndex*1.5)*.1)})):S.position.y=Math.sin(P*1.5)*.08,h.intensity=140+Math.sin(P*2.2)*40,x.forEach((A,U)=>{let B=A.baseAngle+P*(c?.8:1.3),z=1+Math.sin(P*2.5+U)*.12;A.mesh.position.x=Math.cos(B)*z,A.mesh.position.z=Math.sin(B)*z,A.mesh.position.y=Math.sin(P*3.5+U*.7)*.06}),v.render(b,g),F=requestAnimationFrame(D)};return D(),()=>{cancelAnimationFrame(F);let P=new Set,A=new Set;b.traverse(U=>{U.geometry&&P.add(U.geometry),Array.isArray(U.material)?U.material.forEach(B=>A.add(B)):A.add(U.material)}),P.forEach(U=>U?.dispose?.()),A.forEach(U=>U?.dispose?.()),v.dispose(),d.contains(v.domElement)&&d.removeChild(v.domElement)}},[s,t,e.player_key,e.profile_key,e.currentRole]),(0,W.jsxs)("div",{ref:n,className:`player-trophy-shell${e.isOnline?"":" offline"}`,children:[(0,W.jsx)("div",{ref:i,className:"player-trophy-canvas"}),!t||!s?(0,W.jsx)("div",{className:"player-trophy-overlay",children:"STAND BY"}):null,r?(0,W.jsx)("div",{className:"player-trophy-overlay",children:r}):null,!r&&e.isOnline||!t||!s||e.isOnline?null:(0,W.jsx)("div",{className:"player-trophy-overlay",children:"OFFLINE"}),(0,W.jsx)("div",{className:"player-trophy-role",children:Xd(l)})]})}function L2({matches:e,loading:t,error:n}){let i=e.slice(0,10),s=e.slice(0,5),a=e.reduce((r,o)=>{let l=o.role==="tagger"?"tagger":"runner";return r[l].matches+=1,r[l].wins+=o.won?1:0,r[l].tags+=o.tag_count,r[l].bits+=o.bits_collected,r},{runner:{matches:0,wins:0,tags:0,bits:0},tagger:{matches:0,wins:0,tags:0,bits:0}});return(0,W.jsxs)("div",{className:"player-detail-panel",children:[(0,W.jsxs)("div",{className:"player-detail-head",children:[(0,W.jsxs)("div",{children:[(0,W.jsx)("div",{className:"panel-head-note",children:"expanded match tape"}),(0,W.jsx)("h3",{children:"Recent Match History"})]}),(0,W.jsx)("div",{className:"player-form-strip",children:s.length?s.map(r=>(0,W.jsx)("span",{className:`player-form-chip ${r.won?"win":"loss"}`,title:`${Xd(r.role)} \xB7 ${r.map_name||"unknown map"}`,children:r.won?"W":"L"},`${r.match_id}:${r.timestamp}`)):(0,W.jsx)("span",{className:"metric-note",children:"no completed matches yet"})})]}),(0,W.jsxs)("div",{className:"player-role-breakdown",children:[(0,W.jsxs)("div",{className:"panel-inset",children:[(0,W.jsx)("span",{className:"player-breakdown-label",children:"Runner career"}),(0,W.jsxs)("span",{children:[a.runner.wins,"/",a.runner.matches," wins"]}),(0,W.jsxs)("span",{children:[a.runner.tags," times tagged"]})]}),(0,W.jsxs)("div",{className:"panel-inset",children:[(0,W.jsx)("span",{className:"player-breakdown-label",children:"Tagger career"}),(0,W.jsxs)("span",{children:[a.tagger.wins,"/",a.tagger.matches," wins"]}),(0,W.jsxs)("span",{children:[a.tagger.tags," tags landed"]})]})]}),t?(0,W.jsxs)("div",{className:"player-detail-status",children:[(0,W.jsx)("span",{className:"player-spinner"}),(0,W.jsx)("span",{children:"LOADING MATCH TAPE..."})]}):null,!t&&n?(0,W.jsx)("div",{className:"player-detail-status error",children:n}):null,!t&&!n&&!i.length?(0,W.jsx)("div",{className:"player-detail-status",children:"NO MATCH HISTORY FOR THIS PLAYER YET."}):null,!t&&!n&&i.length?(0,W.jsx)("div",{className:"player-history-table-wrap",children:(0,W.jsxs)("table",{className:"player-history-table",children:[(0,W.jsx)("thead",{children:(0,W.jsxs)("tr",{children:[(0,W.jsx)("th",{children:"Time"}),(0,W.jsx)("th",{children:"Role"}),(0,W.jsx)("th",{children:"Result"}),(0,W.jsx)("th",{children:"Map"}),(0,W.jsx)("th",{children:"Mode"}),(0,W.jsx)("th",{children:"Duration"}),(0,W.jsx)("th",{children:"Tags"}),(0,W.jsx)("th",{children:"Bits"})]})}),(0,W.jsx)("tbody",{children:i.map(r=>(0,W.jsxs)("tr",{children:[(0,W.jsx)("td",{children:e0(r.timestamp)}),(0,W.jsx)("td",{children:Xd(r.role)}),(0,W.jsx)("td",{className:r.won?"result-win":"result-loss",children:r.won?"Won":"Lost"}),(0,W.jsx)("td",{children:r.map_name||"\u2014"}),(0,W.jsx)("td",{children:E2(r.game_mode)}),(0,W.jsx)("td",{children:A2(r.duration_ms)}),(0,W.jsx)("td",{children:r.tag_count}),(0,W.jsxs)("td",{children:[r.bits_collected,"/",r.bits_total||"\u2014"]})]},`${r.match_id}:${r.timestamp}`))})]})}):null]})}function i0(){let[e,t]=(0,Me.useState)([]),[n,i]=(0,Me.useState)([]),[s,a]=(0,Me.useState)(null),[r,o]=(0,Me.useState)([]),[l,c]=(0,Me.useState)(null),[d,p]=(0,Me.useState)(!0),[u,f]=(0,Me.useState)(!1),[v,b]=(0,Me.useState)(""),[g,h]=(0,Me.useState)(""),[m,_]=(0,Me.useState)(!1),S=(0,Me.useRef)(new Map),T=(0,Me.useRef)(null);async function C({silent:A=!1}={}){A||p(!0),b("");try{let U=await fetch("/api/players");if(!U.ok)throw new Error(`PLAYER PROFILE SCAN FAILED (${U.status})`);let B=await U.json(),z=Array.isArray(B.players)?B.players.map(kb):[];(0,Me.startTransition)(()=>t(z))}catch(U){b(U.message||"PLAYER PROFILE SCAN FAILED")}finally{p(!1)}}async function R(A){T.current=A,f(!0),h("");try{let U=await fetch(`/api/players/${encodeURIComponent(A)}`);if(!U.ok)throw new Error(`MATCH HISTORY FETCH FAILED (${U.status})`);let B=await U.json(),z=B.profile?kb(B.profile):null,H=Array.isArray(B.matches)?B.matches.map(M2):[];if(S.current.set(A,{profile:z,matches:H}),T.current!==A)return;c(z),o(H)}catch(U){if(T.current!==A)return;h(U.message||"MATCH HISTORY FETCH FAILED"),o([])}finally{T.current===A&&f(!1)}}function x(A){if(s===A){T.current=null,a(null),c(null),o([]),h(""),f(!1);return}a(A),h("");let U=S.current.get(A);if(U){T.current=A,c(U.profile),o(U.matches),f(!1);return}c(null),o([]),R(A)}(0,Me.useEffect)(()=>{C();let A=document.getElementById("page-players");if(!A)return()=>{};_(!A.hidden);let U=new MutationObserver(()=>{let B=!A.hidden;_(B),B&&C({silent:!0})});return U.observe(A,{attributes:!0,attributeFilter:["hidden"]}),()=>U.disconnect()},[]),(0,Me.useEffect)(()=>{let A=()=>{let B=Array.isArray(window.latestState?.players)?window.latestState.players.slice():[];(0,Me.startTransition)(()=>i(B))};A();let U=setInterval(A,500);return()=>clearInterval(U)},[]);let M=new Map;n.forEach(A=>{if(!A?.profile_key||n0(A))return;let U=M.get(A.profile_key);(!U||U.queued&&!A.queued)&&M.set(A.profile_key,A)});let F=n.filter(A=>n0(A)),D=e.map(A=>{let U=M.get(A.player_key)||null;return{...A,live:U,currentRole:w2(U),isOnline:!!(U&&!U.queued),isQueued:!!U?.queued}}).sort((A,U)=>Number(U.isOnline)-Number(A.isOnline)||String(U.last_seen_at).localeCompare(String(A.last_seen_at))),P=D.reduce((A,U)=>(A.totalWins+=U.total_wins,A.totalBits+=U.total_bits_collected,A.onlinePlayers+=U.isOnline?1:0,A),{totalWins:0,totalBits:0,onlinePlayers:0});return(0,W.jsxs)("div",{className:"player-stats-shell",children:[(0,W.jsxs)("div",{className:"player-stats-overview",children:[(0,W.jsxs)("div",{className:"panel-raised player-overview-card",children:[(0,W.jsx)("div",{className:"hud-label",children:"Registered Humans"}),(0,W.jsx)("div",{className:"player-overview-value",children:e.length}),(0,W.jsx)("div",{className:"hud-sub",children:"career profiles in DynamoDB"})]}),(0,W.jsxs)("div",{className:"panel-raised player-overview-card",children:[(0,W.jsx)("div",{className:"hud-label",children:"Live Humans"}),(0,W.jsx)("div",{className:"player-overview-value",children:P.onlinePlayers}),(0,W.jsx)("div",{className:"hud-sub",children:"joined from websocket feed"})]}),(0,W.jsxs)("div",{className:"panel-raised player-overview-card",children:[(0,W.jsx)("div",{className:"hud-label",children:"Career Wins"}),(0,W.jsx)("div",{className:"player-overview-value",children:P.totalWins}),(0,W.jsx)("div",{className:"hud-sub",children:"all recorded matches"})]}),(0,W.jsxs)("div",{className:"panel-raised player-overview-card",children:[(0,W.jsx)("div",{className:"hud-label",children:"Bits Banked"}),(0,W.jsx)("div",{className:"player-overview-value",children:P.totalBits}),(0,W.jsx)("div",{className:"hud-sub",children:"summed from player profiles"})]}),(0,W.jsxs)("div",{className:"panel-raised player-overview-card",children:[(0,W.jsx)("div",{className:"hud-label",children:"Live Ghosts"}),(0,W.jsx)("div",{className:"player-overview-value",children:F.length}),(0,W.jsx)("div",{className:"hud-sub",children:"websocket-only entities"})]}),(0,W.jsxs)("div",{className:"panel-raised player-overview-card player-overview-action",children:[(0,W.jsx)("div",{className:"hud-label",children:"Database Scan"}),(0,W.jsx)("button",{className:"control-btn start",type:"button",onClick:()=>C(),children:"Refresh Profiles"}),(0,W.jsx)("div",{className:"hud-sub",children:"re-pulls career aggregates"})]})]}),(0,W.jsxs)("div",{className:"panel-raised ghost-summary-panel",children:[(0,W.jsxs)("div",{className:"panel-head",children:[(0,W.jsx)("h2",{children:"Ghost Patrol"}),(0,W.jsx)("span",{className:"micro-chip",children:"live feed"})]}),F.length?(0,W.jsx)("div",{className:"ghost-summary-grid",children:F.map(A=>(0,W.jsxs)("div",{className:"panel-inset ghost-summary-card",children:[(0,W.jsx)("div",{className:"ghost-summary-name",children:A.display_name||A.username||`Ghost ${A.id||"?"}`}),(0,W.jsxs)("div",{className:"ghost-summary-meta",children:[(0,W.jsxs)("span",{children:[kd(De(A.x)),", ",kd(De(A.y))]}),(0,W.jsx)("span",{children:Xb(De(A.angle))})]})]},`${A.entity_key||A.profile_key||A.id}`))}):(0,W.jsx)("div",{className:"metric-note",children:"No ghosts are active in the live websocket feed right now."})]}),d?(0,W.jsx)("div",{className:"panel-raised player-status-panel",children:(0,W.jsxs)("div",{className:"player-detail-status",children:[(0,W.jsx)("span",{className:"player-spinner"}),(0,W.jsx)("span",{children:"SCANNING PLAYER DATABASE..."})]})}):null,!d&&v?(0,W.jsxs)("div",{className:"panel-raised player-status-panel",children:[(0,W.jsx)("div",{className:"player-detail-status error",children:v}),(0,W.jsx)("button",{className:"control-btn restart",type:"button",onClick:()=>C(),children:"Retry Scan"})]}):null,!d&&!v&&!D.length?(0,W.jsx)("div",{className:"panel-raised player-status-panel",children:(0,W.jsx)("div",{className:"player-detail-status",children:"NO PLAYERS RECORDED YET."})}):null,!d&&!v&&D.length?(0,W.jsx)("div",{className:"player-stats-grid",children:D.map(A=>{let U=A.match_count,B=s===A.player_key,z=A.isOnline?"online":A.isQueued?"queued":"offline",H=B?r:[],$=B&&l?.player_key===A.player_key?l:A;return(0,W.jsxs)("article",{className:`panel-raised player-stat-card${B?" expanded":""}`,children:[(0,W.jsxs)("button",{className:"player-card-head",type:"button",onClick:()=>x(A.player_key),children:[(0,W.jsxs)("div",{children:[(0,W.jsx)("div",{className:"player-card-title",children:A.display_name}),(0,W.jsx)("div",{className:"player-card-subtitle",children:A.player_key})]}),(0,W.jsx)("span",{className:`player-live-pill ${z}`,children:A.isOnline?`${Xd(A.currentRole)} live`:A.isQueued?"queued":"offline"})]}),(0,W.jsxs)("div",{className:"player-card-summary",children:[(0,W.jsx)(U2,{player:A,pageVisible:m}),(0,W.jsxs)("div",{className:"player-card-metrics",children:[(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"career win rate"}),(0,W.jsx)("span",{children:T2(A.total_wins,U)})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"runner record"}),(0,W.jsxs)("span",{children:[A.wins_as_runner,"/",A.matches_as_runner]})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"tagger record"}),(0,W.jsxs)("span",{children:[A.wins_as_tagger,"/",A.matches_as_tagger]})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"tags landed"}),(0,W.jsx)("span",{children:A.total_tags_landed})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"times tagged"}),(0,W.jsx)("span",{children:A.times_tagged})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"bits collected"}),(0,W.jsx)("span",{children:A.total_bits_collected})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"first seen"}),(0,W.jsx)("span",{children:e0($.first_seen_at)})]}),(0,W.jsxs)("div",{className:"metric-row",children:[(0,W.jsx)("span",{children:"last seen"}),(0,W.jsx)("span",{children:e0($.last_seen_at)})]}),(0,W.jsx)("div",{className:"metric-note",children:A.isOnline&&A.live?`Live @ (${kd(De(A.live.x))}, ${kd(De(A.live.y))}) \xB7 ${Xb(De(A.live.angle))}`:"No live websocket position for this player right now."})]})]}),(0,W.jsxs)("div",{className:"player-card-footer",children:[(0,W.jsxs)("div",{className:"micro-chip",children:[U," matches"]}),(0,W.jsx)("div",{className:"micro-chip",children:A.username||A.controller_key||"anonymous controller"}),(0,W.jsx)("div",{className:"micro-chip",children:$.identity_source||"unknown identity source"})]}),B?(0,W.jsx)(L2,{matches:H,loading:u,error:g}):null]},A.player_key)})}):null]})}var s0={pynq:`<div class="app-shell">
  <header class="topbar">
    <div class="brand-lockup">
      <div class="brand-title">PYNQ CAST</div>
      <div class="brand-sub">distributed FPGA raycaster monitor</div>
    </div>
    <nav class="top-nav">
      <button id="tab-game" class="nav-tab active" type="button" onclick="setActiveTab('game')">Game View</button>
      <button id="tab-server" class="nav-tab" type="button" onclick="setActiveTab('server')">Server Monitoring</button>
      <button id="tab-controls" class="nav-tab" type="button" onclick="setActiveTab('controls')">Controls &amp; Config</button>
      <button id="tab-about" class="nav-tab" type="button" onclick="setActiveTab('about')">About</button>
      <button id="tab-players" class="nav-tab" type="button" onclick="setActiveTab('players')">Player Stats</button>
    </nav>
    <div class="top-status">
      <span id="status" class="disconnected">\u25CF DISCONNECTED</span>
      <span id="game-chip">no game</span>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle theme">\u{1F319} Dark</button>
    </div>
  </header>

  <div id="pause-banner" class="pause-banner" hidden></div>

  <main class="page-shell">
    <section id="page-game" class="page">
      <div class="section-label">Game View</div>

      <div class="hud-grid">
        <div class="panel-raised hud-card">
          <div class="hud-label">Render Rate</div>
          <div class="fps-stack">
            <span id="fps">0</span>
            <span class="fps-unit">FPS</span>
          </div>
          <div id="hud-frame-ms" class="hud-sub">0.0 ms/frame</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">Game Mode</div>
          <div id="hud-view-mode" class="hud-value">chase</div>
          <div id="hud-map-name" class="hud-sub">chase</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">Match State</div>
          <div id="hud-match-state" class="hud-value">Idle</div>
          <div id="hud-player-count" class="hud-sub">0 entities online</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">Est. Latency</div>
          <div id="hud-latency" class="hud-value">\u2014 ms</div>
          <div class="hud-sub">server state age</div>
        </div>

        <div class="panel-terminal hud-events-card">
          <div class="hud-events-head">
            <div class="hud-label">Live Event Feed</div>
            <span id="hud-event-count" class="micro-chip">idle</span>
          </div>
          <div id="game-event-list" class="hud-events-list">
            <div class="hud-feed-empty">waiting for first match event...</div>
          </div>
        </div>
      </div>

      <div class="game-layout">
        <div class="panel-raised viewport-card">
          <div class="panel-head viewport-head">
            <h2>Raycast Arena</h2>
            <div class="viewport-head-meta">
              <span id="canvas-label" class="panel-head-note">fpga live \xB7 loading map\u2026</span>
              <div class="viewport-action-row">
                <button class="viewport-control-btn start" type="button" onclick="sendControl('start_match', 'start match')">Start</button>
                <button class="viewport-control-btn stop" type="button" onclick="sendControl('force_end', 'force end match')">End</button>
                <button
                  id="archive-toggle"
                  class="archive-toggle-btn"
                  type="button"
                  aria-controls="archive-drawer"
                  aria-expanded="false"
                  onclick="toggleArchiveDrawer()"
                >Archive</button>
              </div>
            </div>
          </div>
          <div class="viewport-wrap">
            <canvas id="arena" width="480" height="480"></canvas>
          </div>
          <aside id="archive-drawer" class="panel-raised archive-drawer" hidden>
            <div class="archive-drawer-head">
              <h2>DynamoDB + Replay</h2>
              <button class="archive-close-btn" type="button" onclick="toggleArchiveDrawer(false)">Close</button>
            </div>
            <div class="archive-drawer-body">
              <div>
                <div class="panel-head">
                  <h2>Archive</h2>
                  <span class="micro-chip">warm tier</span>
                </div>
                <div id="match-list"><span style="color:#90a3c4">loading...</span></div>
                <div class="ddb-note">warm tier only \xB7 recent META rows kept in DynamoDB \xB7 older match rows archived to S3</div>
              </div>

              <div>
                <div class="panel-head">
                  <h2>Replay</h2>
                  <span class="micro-chip">S3</span>
                </div>
                <div class="metric-note" id="replay-status">no replay loaded</div>
                <div class="replay-list" id="replay-list">
                  <button class="replay-btn empty" disabled>waiting for replayable matches...</button>
                </div>
                <div class="control-stack">
                  <button class="control-btn stop" type="button" onclick="stopReplay()">Stop Replay</button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div class="game-sidebar">
          <div class="panel-raised frame-panel sidebar-profiler-panel">
            <div class="panel-head">
              <h2>Pipeline Frame Timing</h2>
              <span class="micro-chip">stacked profiler</span>
            </div>
            <div class="frame-chart-container">
              <div class="target-lines">
                <div class="target-line target-60fps">
                  <span class="target-label">16.7MS (60FPS)</span>
                </div>
                <div class="target-line target-30fps">
                  <span class="target-label">33.3MS (30FPS)</span>
                </div>
              </div>

              <div class="stacked-bars" id="stacked-frame-chart"></div>

              <div class="bar-time-axis">
                <span>oldest</span>
                <span>newest</span>
              </div>
            </div>

            <div class="legend">
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-dispatch)"></span>Dispatch</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-compute)"></span>FPGA Compute</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-network)"></span>Network</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-composite)"></span>Composite</div>
            </div>

            <div class="metric-note profiler-note">Development timing shim for now. Replace this buffer with real per-stage frame telemetry once the websocket exposes it.</div>
          </div>

          <div class="panel-raised player-panel">
            <div class="panel-head">
              <h2>Player Stats</h2>
              <span class="micro-chip">live</span>
            </div>
            <div class="player-table-wrap">
              <table class="player-table">
                <thead><tr><th>ID</th><th>role</th><th>X</th><th>Y</th><th>angle</th><th>dist</th><th>status</th></tr></thead>
                <tbody id="player-tbody"></tbody>
              </table>
            </div>
          </div>

          <div class="panel-raised objective-panel">
            <div class="panel-head">
              <h2>Objective State</h2>
              <span class="micro-chip">bits</span>
            </div>
            <div class="metric-row"><span>mode</span><span id="bits-mode">\u2014</span></div>
            <div class="metric-row"><span>remaining</span><span id="bits-remaining">\u2014</span></div>
            <div class="metric-row"><span>collected</span><span id="bits-collected">\u2014</span></div>
            <div class="metric-row"><span>progress</span><span id="bits-progress">\u2014</span></div>
            <div class="bits-track"><div class="bits-fill" id="bits-fill"></div></div>
            <div class="metric-note" id="bits-note">runner wins by clearing every bit in chase_bits mode.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="page-server" class="page" hidden>
      <div class="section-label">Server Monitoring</div>

      <div class="server-grid">
        <div class="panel-raised server-health">
          <div class="panel-head">
            <h2>Node Health</h2>
            <span class="micro-chip">live</span>
          </div>
          <div class="status-grid">
            <div class="panel-inset status-card">
              <span class="status-name">Server</span>
              <span id="svc-server" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Sidecar</span>
              <span id="svc-sidecar" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Monitor</span>
              <span id="svc-monitor" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">P1 Node</span>
              <span id="node1-link" class="status-slot">offline \xB7 fpga</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">P2 Node</span>
              <span id="node2-link" class="status-slot">offline \xB7 fpga</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Live View</span>
              <span id="server-view-card" class="status-slot">game telemetry</span>
            </div>
          </div>
        </div>

        <div class="panel-raised pipeline-panel">
          <div class="panel-head">
            <h2>SEDA Pipeline</h2>
            <span class="micro-chip">actual runtime</span>
          </div>
          <div class="pipeline-board">
            <div class="pipeline-summary">Flow is \`nodes -> T1 -> T2\`, then \`T2 -> T3 -> nodes\` for broadcast and \`T2 -> T4 -> Redis -> sidecar -> AWS\` for persistence.</div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Input Path</div>
              <div class="pipe-card stage-net">
                <div class="pipe-card-label">clients</div>
                <div class="pipe-card-title">PYNQ Boards</div>
                <div class="pipe-card-desc">register, heartbeat, and movement packets</div>
                <div class="pipe-card-val">UDP gameplay traffic</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">UDP 9000</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">asyncio</div>
                <div class="pipe-card-title">T1 UDPReceiver</div>
                <div class="pipe-card-desc">shared EC2:9000 socket ingress</div>
                <div class="pipe-card-val">raw datagrams in</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">packet_queue</div>
              </div>

              <div class="pipe-card stage-logic">
                <div class="pipe-card-label">asyncio \xB7 20 Hz</div>
                <div class="pipe-card-title">T2 GameTick</div>
                <div class="pipe-card-desc">authoritative state, tags, bits, and broadcast build</div>
                <div class="pipe-card-val"><span id="pp-players">0</span> live players</div>
              </div>
            </div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Broadcast</div>
              <div class="pipe-jump pipe-jump-source">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">from T2</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">broadcast_queue</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">asyncio</div>
                <div class="pipe-card-title">T3 Broadcaster</div>
                <div class="pipe-card-desc">same EC2:9000 socket back out to nodes</div>
                <div class="pipe-card-val">UDP fan-out</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">shared EC2:9000</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">outbound</div>
                <div class="pipe-card-title">Active Nodes</div>
                <div class="pipe-card-desc">frame slices and state updates return to the players</div>
                <div class="pipe-card-val">same clients, reverse path</div>
              </div>
            </div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Persistence</div>
              <div class="pipe-jump pipe-jump-source">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">from T2</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">write_queue</div>
              </div>

              <div class="pipe-card stage-io">
                <div class="pipe-card-label">OS thread</div>
                <div class="pipe-card-title">T4 RedisWriter</div>
                <div class="pipe-card-desc">batches HSET and LPUSH, mirrors monitor events</div>
                <div class="pipe-card-val"><span id="pp-ops">\u2014</span> Redis ops/s</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">local Redis</div>
              </div>

              <div class="pipe-card stage-store">
                <div class="pipe-card-label">hot tier</div>
                <div class="pipe-card-title">Redis</div>
                <div class="pipe-card-desc">state hashes plus event and replay lists</div>
                <div class="pipe-card-val">cache + queues</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">BRPOP events + replay</div>
              </div>

              <div class="pipe-card stage-store">
                <div class="pipe-card-label">process</div>
                <div class="pipe-card-title">Sidecar</div>
                <div class="pipe-card-desc">blocks on events and replay, manages retention</div>
                <div class="pipe-card-metrics">
                  <div class="pipe-card-metric"><span id="pp-blocked">\u2014</span> blocked</div>
                  <div class="pipe-card-metric"><span id="pp-events">\u2014</span> events</div>
                </div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">AWS fan-out</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS warm tier</div>
                <div class="pipe-card-title">DynamoDB</div>
                <div class="pipe-card-desc">recent META plus tag and bit rows</div>
                <div class="pipe-card-val"><span id="pp-ddb">\u2014</span> warm matches</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS cold tier</div>
                <div class="pipe-card-title">S3</div>
                <div class="pipe-card-desc">compressed replays and DynamoDB archives</div>
                <div class="pipe-card-val">cold storage</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS async trigger</div>
                <div class="pipe-card-title">SNS / Lambda</div>
                <div class="pipe-card-desc">post-match summary path on \`match_end\`</div>
                <div class="pipe-card-val">summary hook</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-raised storage-panel">
          <div class="panel-head">
            <h2>Redis Hot Cache</h2>
            <span class="micro-chip">telemetry</span>
          </div>
          <div class="metric-row"><span>ops / sec</span><span id="r-ops">\u2014</span></div>
          <div class="metric-row"><span>memory</span><span id="r-mem">\u2014</span></div>
          <div class="metric-row"><span>clients</span><span id="r-clients">\u2014</span></div>
          <div class="metric-row"><span>blocked</span><span id="r-blocked">\u2014</span></div>
          <div class="metric-row"><span>pub/sub</span><span id="r-pubsub">\u2014</span></div>
          <div class="metric-row"><span>monitor load</span><span id="r-poll">\u2014</span></div>
          <div class="metric-note" id="redis-note">measuring live Redis load...</div>
        </div>

        <div class="panel-raised profiler-panel server-frame-panel">
          <div class="panel-head">
            <h2>Frame Timing</h2>
            <span class="micro-chip">sparkline</span>
          </div>
          <canvas id="frame-chart" width="560" height="88"></canvas>
          <div class="metric-note">Recent monitor render times. Taller bars mean slower browser-side drawing.</div>
        </div>
      </div>
    </section>

    <section id="page-controls" class="page" hidden>
      <div class="section-label">Controls &amp; Config</div>

      <div class="controls-grid">
        <div class="panel-raised controls-actions">
          <div class="panel-head">
            <h2>EC2 Service Controls</h2>
            <span class="micro-chip">services</span>
          </div>
          <div class="control-stack">
            <button class="control-btn start" type="button" onclick="sendControl('start_server', 'start server')">Start Server</button>
            <button class="control-btn stop" type="button" onclick="sendControl('stop_server', 'stop server')">Stop Server</button>
            <button class="control-btn start" type="button" onclick="sendControl('start_sidecar', 'start sidecar')">Start Sidecar</button>
            <button class="control-btn stop" type="button" onclick="sendControl('stop_sidecar', 'stop sidecar')">Stop Sidecar</button>
            <button class="control-btn restart" type="button" onclick="sendControl('restart_stack', 'restart stack')">Restart Stack</button>
          </div>
          <div class="metric-note" id="svc-note">controls run on EC2 only; FPGA boards stay connected over UDP</div>
        </div>

        <div class="panel-raised controls-sim">
          <div class="panel-head">
            <h2>Match Config</h2>
            <span class="micro-chip">fpga live</span>
          </div>
          <div>
            <div class="metric-note">Server ghost controls add pressure on the EC2 side without changing the board firmware.</div>
            <div class="metric-note" style="margin-top:12px;">Ghost Taggers</div>
            <div class="control-stack">
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_0', 'ghost count \u2192 0')">0 Ghosts</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_1', 'ghost count \u2192 1')">1 Ghost</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_2', 'ghost count \u2192 2')">2 Ghosts</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_3', 'ghost count \u2192 3')">3 Ghosts</button>
            </div>
            <div class="metric-note" style="margin-top:12px;">Map Selection</div>
            <div class="control-stack" id="map-btn-list">
              <span style="color:#90a3c4">loading maps...</span>
            </div>
            <div class="metric-note">Map changes publish to the live server and take effect on the next match reset.</div>
          </div>
        </div>

        <div class="panel-raised controls-notes">
          <div class="panel-head">
            <h2>Operator Notes</h2>
            <span class="micro-chip">quick guide</span>
          </div>
          <div class="note-list">
            <div class="metric-note">Game View keeps the FPGA arena, player state, replay drawer, and browser-side timing together in one place.</div>
            <div class="metric-note">Server Monitoring is the EC2 ops deck: service health, SEDA flow, Redis, warm/cold storage, and the stacked frame profiler.</div>
            <div class="metric-note">Controls &amp; Config only changes server-side match state. Board-side firmware and transport behavior still live in the PYNQ clients.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="page-about" class="page about-page" hidden>
      <div class="section-label">About PYNQCAST</div>

      <section class="about-hero">
        <div class="about-stage">
          <div class="about-stage-grid" aria-hidden="true"></div>
          <div class="about-light-cone" aria-hidden="true"></div>
          <div class="about-sprite-wrap">
            <div class="about-react-board-slot" aria-label="spinning PYNQ board showcase"></div>
          </div>
        </div>

        <div class="about-copy-column">
          <div class="about-title-row">
            <h2 class="about-title">&#9638; About PYNQCAST</h2>
          </div>

          <div class="about-copy about-copy-credits">
            <span class="about-copy-kicker">Built by</span>
            <span class="about-copy-names">Archie, Asad, Adil, Louis, Lucca, Nabeel, and Sam</span>
          </div>
        </div>
      </section>
    </section>

    <section id="page-players" class="page player-stats-page" hidden>
      <div class="section-label">Player Stats</div>
      <div id="player-stats-react-slot"></div>
    </section>
  </main>
</div>`,sim:`<div class="app-shell">
  <header class="topbar">
    <div class="brand-lockup">
      <div class="brand-title">PYNQ CAST</div>
      <div class="brand-sub">distributed FPGA raycaster monitor</div>
    </div>
    <nav class="top-nav">
      <button id="tab-game" class="nav-tab active" type="button" onclick="setActiveTab('game')">Game View</button>
      <button id="tab-server" class="nav-tab" type="button" onclick="setActiveTab('server')">Server Monitoring</button>
      <button id="tab-controls" class="nav-tab" type="button" onclick="setActiveTab('controls')">Controls &amp; Config</button>
      <button id="tab-about" class="nav-tab" type="button" onclick="setActiveTab('about')">About</button>
      <button id="tab-players" class="nav-tab" type="button" onclick="setActiveTab('players')">Player Stats</button>
    </nav>
    <div class="top-status">
      <span id="status" class="disconnected">\u25CF DISCONNECTED</span>
      <span id="game-chip">no game</span>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle theme">\u{1F319} Dark</button>
    </div>
  </header>

  <div id="pause-banner" class="pause-banner" hidden></div>

  <main class="page-shell">
    <section id="page-game" class="page">
      <div class="section-label">Game View</div>

      <div class="hud-grid">
        <div class="panel-raised hud-card">
          <div class="hud-label">Render Rate</div>
          <div class="fps-stack">
            <span id="fps">0</span>
            <span class="fps-unit">FPS</span>
          </div>
          <div id="hud-frame-ms" class="hud-sub">0.0 ms/frame</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">View Mode</div>
          <div id="hud-view-mode" class="hud-value">Map Play</div>
          <div id="hud-map-name" class="hud-sub">chase</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">Match State</div>
          <div id="hud-match-state" class="hud-value">Idle</div>
          <div id="hud-player-count" class="hud-sub">0 entities online</div>
        </div>

        <div class="panel-raised hud-card">
          <div class="hud-label">Est. Latency</div>
          <div id="hud-latency" class="hud-value">\u2014 ms</div>
          <div class="hud-sub">server state age</div>
        </div>

        <div class="panel-terminal hud-events-card">
          <div class="hud-events-head">
            <div class="hud-label">Live Event Feed</div>
            <span id="hud-event-count" class="micro-chip">idle</span>
          </div>
          <div id="game-event-list" class="hud-events-list">
            <div class="hud-feed-empty">waiting for first match event...</div>
          </div>
        </div>
      </div>

      <div class="game-layout">
        <div class="panel-raised viewport-card">
          <div class="panel-head viewport-head">
            <h2>Raycast Arena</h2>
            <div class="viewport-head-meta">
              <span id="canvas-label" class="panel-head-note">map play \xB7 loading map\u2026</span>
              <div class="viewport-action-row">
                <button class="viewport-control-btn start" type="button" onclick="sendControl('restart', 'start match')">Start</button>
                <button class="viewport-control-btn stop" type="button" onclick="sendControl('force_end', 'force end match')">End</button>
                <button
                  id="archive-toggle"
                  class="archive-toggle-btn"
                  type="button"
                  aria-controls="archive-drawer"
                  aria-expanded="false"
                  onclick="toggleArchiveDrawer()"
                >Archive</button>
              </div>
            </div>
          </div>
          <div class="viewport-wrap">
            <canvas id="arena" width="480" height="480"></canvas>
          </div>
          <aside id="archive-drawer" class="panel-raised archive-drawer" hidden>
            <div class="archive-drawer-head">
              <h2>DynamoDB + Replay</h2>
              <button class="archive-close-btn" type="button" onclick="toggleArchiveDrawer(false)">Close</button>
            </div>
            <div class="archive-drawer-body">
              <div>
                <div class="panel-head">
                  <h2>Archive</h2>
                  <span class="micro-chip">warm tier</span>
                </div>
                <div id="match-list"><span style="color:#90a3c4">loading...</span></div>
                <div class="ddb-note">warm tier only \xB7 recent META rows kept in DynamoDB \xB7 older match rows archived to S3</div>
              </div>

              <div>
                <div class="panel-head">
                  <h2>Replay</h2>
                  <span class="micro-chip">S3</span>
                </div>
                <div class="metric-note" id="replay-status">no replay loaded</div>
                <div class="replay-list" id="replay-list">
                  <button class="replay-btn empty" disabled>waiting for replayable matches...</button>
                </div>
                <div class="control-stack">
                  <button class="control-btn stop" type="button" onclick="stopReplay()">Stop Replay</button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div class="game-sidebar">
          <div class="panel-raised frame-panel sidebar-profiler-panel">
            <div class="panel-head">
              <h2>Pipeline Frame Timing</h2>
              <span class="micro-chip">stacked profiler</span>
            </div>
            <div class="frame-chart-container">
              <div class="target-lines">
                <div class="target-line target-60fps">
                  <span class="target-label">16.7MS (60FPS)</span>
                </div>
                <div class="target-line target-30fps">
                  <span class="target-label">33.3MS (30FPS)</span>
                </div>
              </div>

              <div class="stacked-bars" id="stacked-frame-chart"></div>

              <div class="bar-time-axis">
                <span>oldest</span>
                <span>newest</span>
              </div>
            </div>

            <div class="legend">
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-dispatch)"></span>Dispatch</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-compute)"></span>FPGA Compute</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-network)"></span>Network</div>
              <div class="legend-item"><span class="legend-swatch" style="background:var(--stage-composite)"></span>Composite</div>
            </div>

            <div class="metric-note profiler-note">Development timing shim for now. Replace this buffer with real per-stage frame telemetry once the websocket exposes it.</div>
          </div>

          <div class="panel-raised player-panel">
            <div class="panel-head">
              <h2>Player Stats</h2>
              <span class="micro-chip">live</span>
            </div>
            <div class="player-table-wrap">
              <table class="player-table">
                <thead><tr><th>ID</th><th>role</th><th>X</th><th>Y</th><th>angle</th><th>dist</th><th>status</th></tr></thead>
                <tbody id="player-tbody"></tbody>
              </table>
            </div>
          </div>

          <div class="panel-raised objective-panel">
            <div class="panel-head">
              <h2>Objective State</h2>
              <span class="micro-chip">bits</span>
            </div>
            <div class="metric-row"><span>mode</span><span id="bits-mode">\u2014</span></div>
            <div class="metric-row"><span>remaining</span><span id="bits-remaining">\u2014</span></div>
            <div class="metric-row"><span>collected</span><span id="bits-collected">\u2014</span></div>
            <div class="metric-row"><span>progress</span><span id="bits-progress">\u2014</span></div>
            <div class="bits-track"><div class="bits-fill" id="bits-fill"></div></div>
            <div class="metric-note" id="bits-note">runner wins by clearing every bit in chase_bits mode.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="page-server" class="page" hidden>
      <div class="section-label">Server Monitoring</div>

      <div class="server-grid">
        <div class="panel-raised server-health">
          <div class="panel-head">
            <h2>Node Health</h2>
            <span class="micro-chip">live</span>
          </div>
          <div class="status-grid">
            <div class="panel-inset status-card">
              <span class="status-name">Server</span>
              <span id="svc-server" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Sidecar</span>
              <span id="svc-sidecar" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Monitor</span>
              <span id="svc-monitor" class="status-slot">\u2014</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">P1 Node</span>
              <span id="node1-link" class="status-slot">offline \xB7 manual</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">P2 Node</span>
              <span id="node2-link" class="status-slot">offline \xB7 manual</span>
            </div>
            <div class="panel-inset status-card">
              <span class="status-name">Live View</span>
              <span id="server-view-card" class="status-slot">game telemetry</span>
            </div>
          </div>
        </div>

        <div class="panel-raised pipeline-panel">
          <div class="panel-head">
            <h2>SEDA Pipeline</h2>
            <span class="micro-chip">actual runtime</span>
          </div>
          <div class="pipeline-board">
            <div class="pipeline-summary">Flow is \`nodes -> T1 -> T2\`, then \`T2 -> T3 -> nodes\` for broadcast and \`T2 -> T4 -> Redis -> sidecar -> AWS\` for persistence.</div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Input Path</div>
              <div class="pipe-card stage-net">
                <div class="pipe-card-label">clients</div>
                <div class="pipe-card-title">PYNQ + Node Sims</div>
                <div class="pipe-card-desc">register, heartbeat, and movement packets</div>
                <div class="pipe-card-val">UDP gameplay traffic</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">UDP 9000</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">asyncio</div>
                <div class="pipe-card-title">T1 UDPReceiver</div>
                <div class="pipe-card-desc">shared EC2:9000 socket ingress</div>
                <div class="pipe-card-val">raw datagrams in</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">packet_queue</div>
              </div>

              <div class="pipe-card stage-logic">
                <div class="pipe-card-label">asyncio \xB7 20 Hz</div>
                <div class="pipe-card-title">T2 GameTick</div>
                <div class="pipe-card-desc">authoritative state, tags, bits, and broadcast build</div>
                <div class="pipe-card-val"><span id="pp-players">0</span> live players</div>
              </div>
            </div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Broadcast</div>
              <div class="pipe-jump pipe-jump-source">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">from T2</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">broadcast_queue</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">asyncio</div>
                <div class="pipe-card-title">T3 Broadcaster</div>
                <div class="pipe-card-desc">same EC2:9000 socket back out to nodes</div>
                <div class="pipe-card-val">UDP fan-out</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">shared EC2:9000</div>
              </div>

              <div class="pipe-card stage-net">
                <div class="pipe-card-label">outbound</div>
                <div class="pipe-card-title">Active Nodes</div>
                <div class="pipe-card-desc">frame slices and state updates return to the players</div>
                <div class="pipe-card-val">same clients, reverse path</div>
              </div>
            </div>

            <div class="pipeline-lane">
              <div class="pipeline-lane-tag">Persistence</div>
              <div class="pipe-jump pipe-jump-source">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">from T2</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">write_queue</div>
              </div>

              <div class="pipe-card stage-io">
                <div class="pipe-card-label">OS thread</div>
                <div class="pipe-card-title">T4 RedisWriter</div>
                <div class="pipe-card-desc">batches HSET and LPUSH, mirrors monitor events</div>
                <div class="pipe-card-val"><span id="pp-ops">\u2014</span> Redis ops/s</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">local Redis</div>
              </div>

              <div class="pipe-card stage-store">
                <div class="pipe-card-label">hot tier</div>
                <div class="pipe-card-title">Redis</div>
                <div class="pipe-card-desc">state hashes plus event and replay lists</div>
                <div class="pipe-card-val">cache + queues</div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">BRPOP events + replay</div>
              </div>

              <div class="pipe-card stage-store">
                <div class="pipe-card-label">process</div>
                <div class="pipe-card-title">Sidecar</div>
                <div class="pipe-card-desc">blocks on events and replay, manages retention</div>
                <div class="pipe-card-metrics">
                  <div class="pipe-card-metric"><span id="pp-blocked">\u2014</span> blocked</div>
                  <div class="pipe-card-metric"><span id="pp-events">\u2014</span> events</div>
                </div>
              </div>

              <div class="pipe-jump">
                <div class="pipe-jump-arrow">\u2192</div>
                <div class="pipe-jump-label">AWS fan-out</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS warm tier</div>
                <div class="pipe-card-title">DynamoDB</div>
                <div class="pipe-card-desc">recent META plus tag and bit rows</div>
                <div class="pipe-card-val"><span id="pp-ddb">\u2014</span> warm matches</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS cold tier</div>
                <div class="pipe-card-title">S3</div>
                <div class="pipe-card-desc">compressed replays and DynamoDB archives</div>
                <div class="pipe-card-val">cold storage</div>
              </div>

              <div class="pipe-card stage-ext">
                <div class="pipe-card-label">AWS async trigger</div>
                <div class="pipe-card-title">SNS / Lambda</div>
                <div class="pipe-card-desc">post-match summary path on \`match_end\`</div>
                <div class="pipe-card-val">summary hook</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-raised storage-panel">
          <div class="panel-head">
            <h2>Redis Hot Cache</h2>
            <span class="micro-chip">telemetry</span>
          </div>
          <div class="metric-row"><span>ops / sec</span><span id="r-ops">\u2014</span></div>
          <div class="metric-row"><span>memory</span><span id="r-mem">\u2014</span></div>
          <div class="metric-row"><span>clients</span><span id="r-clients">\u2014</span></div>
          <div class="metric-row"><span>blocked</span><span id="r-blocked">\u2014</span></div>
          <div class="metric-row"><span>pub/sub</span><span id="r-pubsub">\u2014</span></div>
          <div class="metric-row"><span>monitor load</span><span id="r-poll">\u2014</span></div>
          <div class="metric-note" id="redis-note">measuring live Redis load...</div>
        </div>

        <div class="panel-raised profiler-panel server-frame-panel">
          <div class="panel-head">
            <h2>Frame Timing</h2>
            <span class="micro-chip">sparkline</span>
          </div>
          <canvas id="frame-chart" width="560" height="88"></canvas>
          <div class="metric-note">Recent monitor render times. Taller bars mean slower browser-side drawing.</div>
        </div>
      </div>
    </section>

    <section id="page-controls" class="page" hidden>
      <div class="section-label">Controls &amp; Config</div>

      <div class="controls-grid">
        <div class="panel-raised controls-actions">
          <div class="panel-head">
            <h2>EC2 Service Controls</h2>
            <span class="micro-chip">services</span>
          </div>
          <div class="control-stack">
            <button class="control-btn start" type="button" onclick="sendControl('start_server', 'start server')">Start Server</button>
            <button class="control-btn stop" type="button" onclick="sendControl('stop_server', 'stop server')">Stop Server</button>
            <button class="control-btn start" type="button" onclick="sendControl('start_sidecar', 'start sidecar')">Start Sidecar</button>
            <button class="control-btn stop" type="button" onclick="sendControl('stop_sidecar', 'stop sidecar')">Stop Sidecar</button>
            <button class="control-btn restart" type="button" onclick="sendControl('restart_stack', 'restart stack')">Restart Stack</button>
          </div>
          <div class="metric-note" id="svc-note">controls run on EC2 only; node simulators still start locally</div>
        </div>

        <div class="panel-raised controls-sim">
          <div class="panel-head">
            <h2>Simulation Mode</h2>
            <span class="micro-chip">manual / auto</span>
          </div>
          <div class="metric-note">View Mode</div>
          <div class="control-pair" id="view-mode-btns"></div>
          <div class="metric-note" id="view-mode-note">map play is the default and forces both simulator nodes back to manual control.</div>

          <div id="orbit-mode-controls" hidden>
            <div class="metric-note" style="margin-top:12px;">Orbit Test Controls</div>
            <div class="metric-note">Orbit view is only for smoke-testing server movement. Auto/manual switching stays here.</div>
            <div class="metric-note" style="margin-top:12px;">Node 1</div>
            <div class="control-pair">
              <button class="control-btn start" type="button" onclick="requestNodeMode(1, 'auto')">P1 Auto</button>
              <button class="control-btn restart" type="button" onclick="requestNodeMode(1, 'manual')">P1 Manual</button>
            </div>
            <div class="metric-note" style="margin-top:12px;">Node 2</div>
            <div class="control-pair">
              <button class="control-btn start" type="button" onclick="requestNodeMode(2, 'auto')">P2 Auto</button>
              <button class="control-btn restart" type="button" onclick="requestNodeMode(2, 'manual')">P2 Manual</button>
            </div>
          </div>

          <div id="map-play-controls">
            <div class="metric-note" style="margin-top:12px;">Ghost Taggers (simulates PYNQ menu)</div>
            <div class="control-stack">
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_0', 'ghost count \u2192 0')">0 Ghosts</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_1', 'ghost count \u2192 1')">1 Ghost</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_2', 'ghost count \u2192 2')">2 Ghosts</button>
              <button class="control-btn" type="button" onclick="sendControl('set_ghosts_3', 'ghost count \u2192 3')">3 Ghosts</button>
            </div>
            <div class="metric-note" style="margin-top:12px;">Map (hot-swap mid-session)</div>
            <div class="control-stack" id="map-btn-list">
              <span style="color:#90a3c4">loading maps...</span>
            </div>
            <div class="metric-note">Map play is manual-only. Focus the relevant tmux pane before using arrow keys.</div>
          </div>
        </div>

        <div class="panel-raised controls-notes">
          <div class="panel-head">
            <h2>Operator Notes</h2>
            <span class="micro-chip">quick guide</span>
          </div>
          <div class="note-list">
            <div class="metric-note">Game View is the showpiece: viewport, player state, bit progress, and frame timing stay together there.</div>
            <div class="metric-note">Server Monitoring is the ops deck: health, pipeline throughput, storage tiers, replay archive, and the stacked frame profiler.</div>
            <div class="metric-note">Controls &amp; Config keeps the active knobs isolated so runtime actions stop fighting with the visual telemetry pages.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="page-about" class="page about-page" hidden>
      <div class="section-label">About PYNQCAST</div>

      <section class="about-hero">
        <div class="about-stage">
          <div class="about-stage-grid" aria-hidden="true"></div>
          <div class="about-light-cone" aria-hidden="true"></div>
          <div class="about-sprite-wrap">
            <div class="about-react-board-slot" aria-label="spinning PYNQ board showcase"></div>
          </div>
        </div>

        <div class="about-copy-column">
          <div class="about-title-row">
            <h2 class="about-title">&#9638; About PYNQCAST</h2>
          </div>

          <div class="about-copy about-copy-credits">
            <span class="about-copy-kicker">Built by</span>
            <span class="about-copy-names">Archie, Asad, Adil, Louis, Lucca, Nabeel, and Sam</span>
          </div>
        </div>
      </section>
    </section>

    <section id="page-players" class="page player-stats-page" hidden>
      <div class="section-label">Player Stats</div>
      <div id="player-stats-react-slot"></div>
    </section>
  </main>
</div>`};var fi=Kn(or()),a0=["/monitor-state.js","/monitor-render.js","/monitor-app.js"];function I2(){if(window.__monitorLegacyBootstrapped)return;window.__monitorLegacyBootstrapped=!0;let e=t=>{if(t>=a0.length){window.dispatchEvent(new Event("monitor:legacy-ready"));return}let n=document.createElement("script");n.src=a0[t],n.async=!1,n.onload=()=>e(t+1),n.onerror=()=>{console.error(`[monitor-ui] failed to load legacy script: ${a0[t]}`)},document.body.appendChild(n)};e(0)}function O2({hostRef:e,mode:t}){let[n,i]=(0,Ts.useState)(null),[s,a]=(0,Ts.useState)(null);return(0,Ts.useLayoutEffect)(()=>{let r=e.current;if(!r)return()=>{};let o=0,l=()=>{i(r.querySelector(".about-react-board-slot")||null),a(r.querySelector("#player-stats-react-slot")||null)};l(),o=requestAnimationFrame(l);let c=new MutationObserver(l);return c.observe(r,{childList:!0,subtree:!0}),()=>{cancelAnimationFrame(o),c.disconnect()}},[e,t]),!n&&!s?null:(0,fi.jsxs)(fi.Fragment,{children:[(0,fi.jsx)(t0,{portalTarget:n}),s?(0,qb.createPortal)((0,fi.jsx)(i0,{}),s):null]})}function P2({mode:e}){let t=(0,Ts.useRef)(null);return(0,Ts.useEffect)(()=>{I2()},[]),(0,fi.jsxs)(fi.Fragment,{children:[(0,fi.jsx)("div",{ref:t,className:"react-monitor-root",dangerouslySetInnerHTML:{__html:s0[e]||s0.pynq}}),(0,fi.jsx)(O2,{hostRef:t,mode:e})]})}var B2=window.__MONITOR_MODE__==="sim"?"sim":"pynq",Yb=document.getElementById("root");if(!Yb)throw new Error("Missing #root for monitor React mount");(0,Wb.createRoot)(Yb).render((0,fi.jsx)(P2,{mode:B2}));})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
