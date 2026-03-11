(()=>{var Gb=Object.create;var o0=Object.defineProperty;var kb=Object.getOwnPropertyDescriptor;var Xb=Object.getOwnPropertyNames;var Wb=Object.getPrototypeOf,qb=Object.prototype.hasOwnProperty;var bi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Yb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Xb(t))!qb.call(e,s)&&s!==n&&o0(e,s,{get:()=>t[s],enumerable:!(i=kb(t,s))||i.enumerable});return e};var bs=(e,t,n)=>(n=e!=null?Gb(Wb(e)):{},Yb(t||!e||!e.__esModule?o0(n,"default",{value:e,enumerable:!0}):n,e));var _0=bi(Pt=>{"use strict";var kd=Symbol.for("react.transitional.element"),Zb=Symbol.for("react.portal"),Jb=Symbol.for("react.fragment"),jb=Symbol.for("react.strict_mode"),Kb=Symbol.for("react.profiler"),Qb=Symbol.for("react.consumer"),$b=Symbol.for("react.context"),tM=Symbol.for("react.forward_ref"),eM=Symbol.for("react.suspense"),nM=Symbol.for("react.memo"),d0=Symbol.for("react.lazy"),iM=Symbol.for("react.activity"),l0=Symbol.iterator;function sM(e){return e===null||typeof e!="object"?null:(e=l0&&e[l0]||e["@@iterator"],typeof e=="function"?e:null)}var f0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},p0=Object.assign,m0={};function nr(e,t,n){this.props=e,this.context=t,this.refs=m0,this.updater=n||f0}nr.prototype.isReactComponent={};nr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};nr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function g0(){}g0.prototype=nr.prototype;function Xd(e,t,n){this.props=e,this.context=t,this.refs=m0,this.updater=n||f0}var Wd=Xd.prototype=new g0;Wd.constructor=Xd;p0(Wd,nr.prototype);Wd.isPureReactComponent=!0;var c0=Array.isArray;function Gd(){}var be={H:null,A:null,T:null,S:null},v0=Object.prototype.hasOwnProperty;function qd(e,t,n){var i=n.ref;return{$$typeof:kd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function aM(e,t){return qd(e.type,t,e.props)}function Yd(e){return typeof e=="object"&&e!==null&&e.$$typeof===kd}function rM(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var u0=/\/+/g;function Hd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?rM(""+e.key):t.toString(36)}function oM(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Gd,Gd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function er(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case kd:case Zb:r=!0;break;case d0:return r=e._init,er(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Hd(e,0):i,c0(s)?(n="",r!=null&&(n=r.replace(u0,"$&/")+"/"),er(s,t,n,"",function(c){return c})):s!=null&&(Yd(s)&&(s=aM(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(u0,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(c0(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Hd(i,l),r+=er(i,t,n,a,s);else if(l=sM(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Hd(i,l++),r+=er(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return er(oM(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function uc(e,t,n){if(e==null)return e;var i=[],s=0;return er(e,i,"","",function(a){return t.call(n,a,s++)}),i}function lM(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var h0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},cM={map:uc,forEach:function(e,t,n){uc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return uc(e,function(){t++}),t},toArray:function(e){return uc(e,function(t){return t})||[]},only:function(e){if(!Yd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Pt.Activity=iM;Pt.Children=cM;Pt.Component=nr;Pt.Fragment=Jb;Pt.Profiler=Kb;Pt.PureComponent=Xd;Pt.StrictMode=jb;Pt.Suspense=eM;Pt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=be;Pt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return be.H.useMemoCache(e)}};Pt.cache=function(e){return function(){return e.apply(null,arguments)}};Pt.cacheSignal=function(){return null};Pt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=p0({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!v0.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return qd(e.type,s,i)};Pt.createContext=function(e){return e={$$typeof:$b,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Qb,_context:e},e};Pt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)v0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return qd(e,a,s)};Pt.createRef=function(){return{current:null}};Pt.forwardRef=function(e){return{$$typeof:tM,render:e}};Pt.isValidElement=Yd;Pt.lazy=function(e){return{$$typeof:d0,_payload:{_status:-1,_result:e},_init:lM}};Pt.memo=function(e,t){return{$$typeof:nM,type:e,compare:t===void 0?null:t}};Pt.startTransition=function(e){var t=be.T,n={};be.T=n;try{var i=e(),s=be.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Gd,h0)}catch(a){h0(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),be.T=t}};Pt.unstable_useCacheRefresh=function(){return be.H.useCacheRefresh()};Pt.use=function(e){return be.H.use(e)};Pt.useActionState=function(e,t,n){return be.H.useActionState(e,t,n)};Pt.useCallback=function(e,t){return be.H.useCallback(e,t)};Pt.useContext=function(e){return be.H.useContext(e)};Pt.useDebugValue=function(){};Pt.useDeferredValue=function(e,t){return be.H.useDeferredValue(e,t)};Pt.useEffect=function(e,t){return be.H.useEffect(e,t)};Pt.useEffectEvent=function(e){return be.H.useEffectEvent(e)};Pt.useId=function(){return be.H.useId()};Pt.useImperativeHandle=function(e,t,n){return be.H.useImperativeHandle(e,t,n)};Pt.useInsertionEffect=function(e,t){return be.H.useInsertionEffect(e,t)};Pt.useLayoutEffect=function(e,t){return be.H.useLayoutEffect(e,t)};Pt.useMemo=function(e,t){return be.H.useMemo(e,t)};Pt.useOptimistic=function(e,t){return be.H.useOptimistic(e,t)};Pt.useReducer=function(e,t,n){return be.H.useReducer(e,t,n)};Pt.useRef=function(e){return be.H.useRef(e)};Pt.useState=function(e){return be.H.useState(e)};Pt.useSyncExternalStore=function(e,t,n){return be.H.useSyncExternalStore(e,t,n)};Pt.useTransition=function(){return be.H.useTransition()};Pt.version="19.2.4"});var To=bi((p2,y0)=>{"use strict";y0.exports=_0()});var R0=bi(we=>{"use strict";function Kd(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<hc(s,t))e[i]=t,e[n]=s,n=i;else break t}}function Mi(e){return e.length===0?null:e[0]}function fc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>hc(o,n))l<s&&0>hc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>hc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function hc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}we.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(x0=performance,we.unstable_now=function(){return x0.now()}):(Zd=Date,S0=Zd.now(),we.unstable_now=function(){return Zd.now()-S0});var x0,Zd,S0,ki=[],Ms=[],uM=1,Zn=null,hn=3,Qd=!1,Ao=!1,wo=!1,$d=!1,E0=typeof setTimeout=="function"?setTimeout:null,T0=typeof clearTimeout=="function"?clearTimeout:null,b0=typeof setImmediate<"u"?setImmediate:null;function dc(e){for(var t=Mi(Ms);t!==null;){if(t.callback===null)fc(Ms);else if(t.startTime<=e)fc(Ms),t.sortIndex=t.expirationTime,Kd(ki,t);else break;t=Mi(Ms)}}function tf(e){if(wo=!1,dc(e),!Ao)if(Mi(ki)!==null)Ao=!0,sr||(sr=!0,ir());else{var t=Mi(Ms);t!==null&&ef(tf,t.startTime-e)}}var sr=!1,Co=-1,A0=5,w0=-1;function C0(){return $d?!0:!(we.unstable_now()-w0<A0)}function Jd(){if($d=!1,sr){var e=we.unstable_now();w0=e;var t=!0;try{t:{Ao=!1,wo&&(wo=!1,T0(Co),Co=-1),Qd=!0;var n=hn;try{e:{for(dc(e),Zn=Mi(ki);Zn!==null&&!(Zn.expirationTime>e&&C0());){var i=Zn.callback;if(typeof i=="function"){Zn.callback=null,hn=Zn.priorityLevel;var s=i(Zn.expirationTime<=e);if(e=we.unstable_now(),typeof s=="function"){Zn.callback=s,dc(e),t=!0;break e}Zn===Mi(ki)&&fc(ki),dc(e)}else fc(ki);Zn=Mi(ki)}if(Zn!==null)t=!0;else{var a=Mi(Ms);a!==null&&ef(tf,a.startTime-e),t=!1}}break t}finally{Zn=null,hn=n,Qd=!1}t=void 0}}finally{t?ir():sr=!1}}}var ir;typeof b0=="function"?ir=function(){b0(Jd)}:typeof MessageChannel<"u"?(jd=new MessageChannel,M0=jd.port2,jd.port1.onmessage=Jd,ir=function(){M0.postMessage(null)}):ir=function(){E0(Jd,0)};var jd,M0;function ef(e,t){Co=E0(function(){e(we.unstable_now())},t)}we.unstable_IdlePriority=5;we.unstable_ImmediatePriority=1;we.unstable_LowPriority=4;we.unstable_NormalPriority=3;we.unstable_Profiling=null;we.unstable_UserBlockingPriority=2;we.unstable_cancelCallback=function(e){e.callback=null};we.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A0=0<e?Math.floor(1e3/e):5};we.unstable_getCurrentPriorityLevel=function(){return hn};we.unstable_next=function(e){switch(hn){case 1:case 2:case 3:var t=3;break;default:t=hn}var n=hn;hn=t;try{return e()}finally{hn=n}};we.unstable_requestPaint=function(){$d=!0};we.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=hn;hn=e;try{return t()}finally{hn=n}};we.unstable_scheduleCallback=function(e,t,n){var i=we.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:uM++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Kd(Ms,e),Mi(ki)===null&&e===Mi(Ms)&&(wo?(T0(Co),Co=-1):wo=!0,ef(tf,n-i))):(e.sortIndex=s,Kd(ki,e),Ao||Qd||(Ao=!0,sr||(sr=!0,ir()))),e};we.unstable_shouldYield=C0;we.unstable_wrapCallback=function(e){var t=hn;return function(){var n=hn;hn=t;try{return e.apply(this,arguments)}finally{hn=n}}}});var U0=bi((g2,D0)=>{"use strict";D0.exports=R0()});var L0=bi(vn=>{"use strict";var hM=To();function N0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Es(){}var gn={d:{f:Es,r:function(){throw Error(N0(522))},D:Es,C:Es,L:Es,m:Es,X:Es,S:Es,M:Es},p:0,findDOMNode:null},dM=Symbol.for("react.portal");function fM(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dM,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var Ro=hM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function pc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=gn;vn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(N0(299));return fM(e,t,null,n)};vn.flushSync=function(e){var t=Ro.T,n=gn.p;try{if(Ro.T=null,gn.p=2,e)return e()}finally{Ro.T=t,gn.p=n,gn.d.f()}};vn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,gn.d.C(e,t))};vn.prefetchDNS=function(e){typeof e=="string"&&gn.d.D(e)};vn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=pc(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?gn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&gn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};vn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=pc(t.as,t.crossOrigin);gn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&gn.d.M(e)};vn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=pc(n,t.crossOrigin);gn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};vn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=pc(t.as,t.crossOrigin);gn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else gn.d.m(e)};vn.requestFormReset=function(e){gn.d.r(e)};vn.unstable_batchedUpdates=function(e,t){return e(t)};vn.useFormState=function(e,t,n){return Ro.H.useFormState(e,t,n)};vn.useFormStatus=function(){return Ro.H.useHostTransitionStatus()};vn.version="19.2.4"});var nf=bi((_2,O0)=>{"use strict";function I0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(I0)}catch(e){console.error(e)}}I0(),O0.exports=L0()});var Yx=bi(zu=>{"use strict";var Ye=U0(),o_=To(),pM=nf();function J(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ml(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function c_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function u_(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function P0(e){if(ml(e)!==e)throw Error(J(188))}function mM(e){var t=e.alternate;if(!t){if(t=ml(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return P0(s),e;if(a===i)return P0(s),t;a=a.sibling}throw Error(J(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(J(189))}}if(n.alternate!==i)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function h_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=h_(e),t!==null)return t;e=e.sibling}return null}var Te=Object.assign,gM=Symbol.for("react.element"),mc=Symbol.for("react.transitional.element"),Bo=Symbol.for("react.portal"),ur=Symbol.for("react.fragment"),d_=Symbol.for("react.strict_mode"),Bf=Symbol.for("react.profiler"),f_=Symbol.for("react.consumer"),Ki=Symbol.for("react.context"),Np=Symbol.for("react.forward_ref"),Ff=Symbol.for("react.suspense"),zf=Symbol.for("react.suspense_list"),Lp=Symbol.for("react.memo"),Ts=Symbol.for("react.lazy"),Vf=Symbol.for("react.activity"),vM=Symbol.for("react.memo_cache_sentinel"),B0=Symbol.iterator;function Do(e){return e===null||typeof e!="object"?null:(e=B0&&e[B0]||e["@@iterator"],typeof e=="function"?e:null)}var _M=Symbol.for("react.client.reference");function Hf(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===_M?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ur:return"Fragment";case Bf:return"Profiler";case d_:return"StrictMode";case Ff:return"Suspense";case zf:return"SuspenseList";case Vf:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Bo:return"Portal";case Ki:return e.displayName||"Context";case f_:return(e._context.displayName||"Context")+".Consumer";case Np:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Lp:return t=e.displayName||null,t!==null?t:Hf(e.type)||"Memo";case Ts:t=e._payload,e=e._init;try{return Hf(e(t))}catch{}}return null}var Fo=Array.isArray,Rt=o_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se=pM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ma={pending:!1,data:null,method:null,action:null},Gf=[],hr=-1;function Ci(e){return{current:e}}function $e(e){0>hr||(e.current=Gf[hr],Gf[hr]=null,hr--)}function Se(e,t){hr++,Gf[hr]=e.current,e.current=t}var wi=Ci(null),el=Ci(null),Ps=Ci(null),Zc=Ci(null);function Jc(e,t){switch(Se(Ps,t),Se(el,e),Se(wi,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Xv(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Xv(t),e=Lx(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$e(wi),Se(wi,e)}function Rr(){$e(wi),$e(el),$e(Ps)}function kf(e){e.memoizedState!==null&&Se(Zc,e);var t=wi.current,n=Lx(t,e.type);t!==n&&(Se(el,e),Se(wi,n))}function jc(e){el.current===e&&($e(wi),$e(el)),Zc.current===e&&($e(Zc),dl._currentValue=Ma)}var sf,F0;function ya(e){if(sf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);sf=t&&t[1]||"",F0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+sf+e+F0}var af=!1;function rf(e,t){if(!e||af)return"";af=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){var u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(f){if(f&&u&&typeof f.stack=="string")return[f.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=s);break}}}finally{af=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ya(n):""}function yM(e,t){switch(e.tag){case 26:case 27:case 5:return ya(e.type);case 16:return ya("Lazy");case 13:return e.child!==t&&t!==null?ya("Suspense Fallback"):ya("Suspense");case 19:return ya("SuspenseList");case 0:case 15:return rf(e.type,!1);case 11:return rf(e.type.render,!1);case 1:return rf(e.type,!0);case 31:return ya("Activity");default:return""}}function z0(e){try{var t="",n=null;do t+=yM(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Xf=Object.prototype.hasOwnProperty,Ip=Ye.unstable_scheduleCallback,of=Ye.unstable_cancelCallback,xM=Ye.unstable_shouldYield,SM=Ye.unstable_requestPaint,On=Ye.unstable_now,bM=Ye.unstable_getCurrentPriorityLevel,p_=Ye.unstable_ImmediatePriority,m_=Ye.unstable_UserBlockingPriority,Kc=Ye.unstable_NormalPriority,MM=Ye.unstable_LowPriority,g_=Ye.unstable_IdlePriority,EM=Ye.log,TM=Ye.unstable_setDisableYieldValue,gl=null,Pn=null;function Us(e){if(typeof EM=="function"&&TM(e),Pn&&typeof Pn.setStrictMode=="function")try{Pn.setStrictMode(gl,e)}catch{}}var Bn=Math.clz32?Math.clz32:CM,AM=Math.log,wM=Math.LN2;function CM(e){return e>>>=0,e===0?32:31-(AM(e)/wM|0)|0}var gc=256,vc=262144,_c=4194304;function xa(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mu(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=xa(i):(r&=o,r!==0?s=xa(r):n||(n=o&~e,n!==0&&(s=xa(n))))):(o=i&~a,o!==0?s=xa(o):r!==0?s=xa(r):n||(n=i&~e,n!==0&&(s=xa(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function vl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function RM(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function v_(){var e=_c;return _c<<=1,(_c&62914560)===0&&(_c=4194304),e}function lf(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _l(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function DM(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Bn(n),p=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var f=u[d];f!==null&&(f.lane&=-536870913)}n&=~p}i!==0&&__(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function __(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Bn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function y_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Bn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function x_(e,t){var n=t&-t;return n=(n&42)!==0?1:Op(n),(n&(e.suspendedLanes|t))!==0?0:n}function Op(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Pp(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function S_(){var e=se.p;return e!==0?e:(e=window.event,e===void 0?32:Xx(e.type))}function V0(e,t){var n=se.p;try{return se.p=e,t()}finally{se.p=n}}var Js=Math.random().toString(36).slice(2),sn="__reactFiber$"+Js,An="__reactProps$"+Js,Vr="__reactContainer$"+Js,Wf="__reactEvents$"+Js,UM="__reactListeners$"+Js,NM="__reactHandles$"+Js,H0="__reactResources$"+Js,yl="__reactMarker$"+Js;function Bp(e){delete e[sn],delete e[An],delete e[Wf],delete e[UM],delete e[NM]}function dr(e){var t=e[sn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Vr]||n[sn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Jv(e);e!==null;){if(n=e[sn])return n;e=Jv(e)}return t}e=n,n=e.parentNode}return null}function Hr(e){if(e=e[sn]||e[Vr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function zo(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(J(33))}function br(e){var t=e[H0];return t||(t=e[H0]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[yl]=!0}var b_=new Set,M_={};function La(e,t){Dr(e,t),Dr(e+"Capture",t)}function Dr(e,t){for(M_[e]=t,e=0;e<t.length;e++)b_.add(t[e])}var LM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),G0={},k0={};function IM(e){return Xf.call(k0,e)?!0:Xf.call(G0,e)?!1:LM.test(e)?k0[e]=!0:(G0[e]=!0,!1)}function Lc(e,t,n){if(IM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function yc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Xi(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function jn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function E_(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function OM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function qf(e){if(!e._valueTracker){var t=E_(e)?"checked":"value";e._valueTracker=OM(e,t,""+e[t])}}function T_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=E_(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Qc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var PM=/[\n"\\]/g;function $n(e){return e.replace(PM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Yf(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+jn(t)):e.value!==""+jn(t)&&(e.value=""+jn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?Zf(e,r,jn(t)):n!=null?Zf(e,r,jn(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+jn(o):e.removeAttribute("name")}function A_(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){qf(e);return}n=n!=null?""+jn(n):"",t=t!=null?""+jn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),qf(e)}function Zf(e,t,n){t==="number"&&Qc(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Mr(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+jn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function w_(e,t,n){if(t!=null&&(t=""+jn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+jn(n):""}function C_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(J(92));if(Fo(i)){if(1<i.length)throw Error(J(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=jn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),qf(e)}function Ur(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var BM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function X0(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||BM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function R_(e,t,n){if(t!=null&&typeof t!="object")throw Error(J(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&X0(e,s,i)}else for(var a in t)t.hasOwnProperty(a)&&X0(e,a,t[a])}function Fp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var FM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),zM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ic(e){return zM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var Jf=null;function zp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fr=null,Er=null;function W0(e){var t=Hr(e);if(t&&(e=t.stateNode)){var n=e[An]||null;t:switch(e=t.stateNode,t.type){case"input":if(Yf(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+$n(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[An]||null;if(!s)throw Error(J(90));Yf(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&T_(i)}break t;case"textarea":w_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Mr(e,!!n.multiple,t,!1)}}}var cf=!1;function D_(e,t,n){if(cf)return e(t,n);cf=!0;try{var i=e(t);return i}finally{if(cf=!1,(fr!==null||Er!==null)&&(Ou(),fr&&(t=fr,e=Er,Er=fr=null,W0(t),e)))for(t=0;t<e.length;t++)W0(e[t])}}function nl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[An]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var is=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),jf=!1;if(is)try{ar={},Object.defineProperty(ar,"passive",{get:function(){jf=!0}}),window.addEventListener("test",ar,ar),window.removeEventListener("test",ar,ar)}catch{jf=!1}var ar,Ns=null,Vp=null,Oc=null;function U_(){if(Oc)return Oc;var e,t=Vp,n=t.length,i,s="value"in Ns?Ns.value:Ns.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Oc=s.slice(e,1<i?1-i:void 0)}function Pc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xc(){return!0}function q0(){return!1}function wn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?xc:q0,this.isPropagationStopped=q0,this}return Te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xc)},persist:function(){},isPersistent:xc}),t}var Ia={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Eu=wn(Ia),xl=Te({},Ia,{view:0,detail:0}),VM=wn(xl),uf,hf,Uo,Tu=Te({},xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Uo&&(Uo&&e.type==="mousemove"?(uf=e.screenX-Uo.screenX,hf=e.screenY-Uo.screenY):hf=uf=0,Uo=e),uf)},movementY:function(e){return"movementY"in e?e.movementY:hf}}),Y0=wn(Tu),HM=Te({},Tu,{dataTransfer:0}),GM=wn(HM),kM=Te({},xl,{relatedTarget:0}),df=wn(kM),XM=Te({},Ia,{animationName:0,elapsedTime:0,pseudoElement:0}),WM=wn(XM),qM=Te({},Ia,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),YM=wn(qM),ZM=Te({},Ia,{data:0}),Z0=wn(ZM),JM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},KM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function QM(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=KM[e])?!!t[e]:!1}function Hp(){return QM}var $M=Te({},xl,{key:function(e){if(e.key){var t=JM[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Pc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hp,charCode:function(e){return e.type==="keypress"?Pc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),t1=wn($M),e1=Te({},Tu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),J0=wn(e1),n1=Te({},xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hp}),i1=wn(n1),s1=Te({},Ia,{propertyName:0,elapsedTime:0,pseudoElement:0}),a1=wn(s1),r1=Te({},Tu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),o1=wn(r1),l1=Te({},Ia,{newState:0,oldState:0}),c1=wn(l1),u1=[9,13,27,32],Gp=is&&"CompositionEvent"in window,Go=null;is&&"documentMode"in document&&(Go=document.documentMode);var h1=is&&"TextEvent"in window&&!Go,N_=is&&(!Gp||Go&&8<Go&&11>=Go),j0=" ",K0=!1;function L_(e,t){switch(e){case"keyup":return u1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function I_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pr=!1;function d1(e,t){switch(e){case"compositionend":return I_(t);case"keypress":return t.which!==32?null:(K0=!0,j0);case"textInput":return e=t.data,e===j0&&K0?null:e;default:return null}}function f1(e,t){if(pr)return e==="compositionend"||!Gp&&L_(e,t)?(e=U_(),Oc=Vp=Ns=null,pr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return N_&&t.locale!=="ko"?null:t.data;default:return null}}var p1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Q0(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!p1[e.type]:t==="textarea"}function O_(e,t,n,i){fr?Er?Er.push(i):Er=[i]:fr=i,t=gu(t,"onChange"),0<t.length&&(n=new Eu("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var ko=null,il=null;function m1(e){Dx(e,0)}function Au(e){var t=zo(e);if(T_(t))return e}function $0(e,t){if(e==="change")return t}var P_=!1;is&&(is?(bc="oninput"in document,bc||(ff=document.createElement("div"),ff.setAttribute("oninput","return;"),bc=typeof ff.oninput=="function"),Sc=bc):Sc=!1,P_=Sc&&(!document.documentMode||9<document.documentMode));var Sc,bc,ff;function tv(){ko&&(ko.detachEvent("onpropertychange",B_),il=ko=null)}function B_(e){if(e.propertyName==="value"&&Au(il)){var t=[];O_(t,il,e,zp(e)),D_(m1,t)}}function g1(e,t,n){e==="focusin"?(tv(),ko=t,il=n,ko.attachEvent("onpropertychange",B_)):e==="focusout"&&tv()}function v1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Au(il)}function _1(e,t){if(e==="click")return Au(t)}function y1(e,t){if(e==="input"||e==="change")return Au(t)}function x1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zn=typeof Object.is=="function"?Object.is:x1;function sl(e,t){if(zn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Xf.call(t,s)||!zn(e[s],t[s]))return!1}return!0}function ev(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function nv(e,t){var n=ev(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=ev(n)}}function F_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?F_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function z_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Qc(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Qc(e.document)}return t}function kp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var S1=is&&"documentMode"in document&&11>=document.documentMode,mr=null,Kf=null,Xo=null,Qf=!1;function iv(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qf||mr==null||mr!==Qc(i)||(i=mr,"selectionStart"in i&&kp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Xo&&sl(Xo,i)||(Xo=i,i=gu(Kf,"onSelect"),0<i.length&&(t=new Eu("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=mr)))}function _a(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var gr={animationend:_a("Animation","AnimationEnd"),animationiteration:_a("Animation","AnimationIteration"),animationstart:_a("Animation","AnimationStart"),transitionrun:_a("Transition","TransitionRun"),transitionstart:_a("Transition","TransitionStart"),transitioncancel:_a("Transition","TransitionCancel"),transitionend:_a("Transition","TransitionEnd")},pf={},V_={};is&&(V_=document.createElement("div").style,"AnimationEvent"in window||(delete gr.animationend.animation,delete gr.animationiteration.animation,delete gr.animationstart.animation),"TransitionEvent"in window||delete gr.transitionend.transition);function Oa(e){if(pf[e])return pf[e];if(!gr[e])return e;var t=gr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in V_)return pf[e]=t[n];return e}var H_=Oa("animationend"),G_=Oa("animationiteration"),k_=Oa("animationstart"),b1=Oa("transitionrun"),M1=Oa("transitionstart"),E1=Oa("transitioncancel"),X_=Oa("transitionend"),W_=new Map,$f="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");$f.push("scrollEnd");function hi(e,t){W_.set(e,t),La(t,[e])}var $c=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Jn=[],vr=0,Xp=0;function wu(){for(var e=vr,t=Xp=vr=0;t<e;){var n=Jn[t];Jn[t++]=null;var i=Jn[t];Jn[t++]=null;var s=Jn[t];Jn[t++]=null;var a=Jn[t];if(Jn[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&q_(n,s,a)}}function Cu(e,t,n,i){Jn[vr++]=e,Jn[vr++]=t,Jn[vr++]=n,Jn[vr++]=i,Xp|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Wp(e,t,n,i){return Cu(e,t,n,i),tu(e)}function Pa(e,t){return Cu(e,null,null,t),tu(e)}function q_(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-Bn(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function tu(e){if(50<$o)throw $o=0,xp=null,Error(J(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var _r={};function T1(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ln(e,t,n,i){return new T1(e,t,n,i)}function qp(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ts(e,t){var n=e.alternate;return n===null?(n=Ln(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Y_(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Bc(e,t,n,i,s,a){var r=0;if(i=e,typeof e=="function")qp(e)&&(r=1);else if(typeof e=="string")r=CE(e,n,wi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Vf:return e=Ln(31,n,t,s),e.elementType=Vf,e.lanes=a,e;case ur:return Ea(n.children,s,a,t);case d_:r=8,s|=24;break;case Bf:return e=Ln(12,n,t,s|2),e.elementType=Bf,e.lanes=a,e;case Ff:return e=Ln(13,n,t,s),e.elementType=Ff,e.lanes=a,e;case zf:return e=Ln(19,n,t,s),e.elementType=zf,e.lanes=a,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ki:r=10;break t;case f_:r=9;break t;case Np:r=11;break t;case Lp:r=14;break t;case Ts:r=16,i=null;break t}r=29,n=Error(J(130,e===null?"null":typeof e,"")),i=null}return t=Ln(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Ea(e,t,n,i){return e=Ln(7,e,i,t),e.lanes=n,e}function mf(e,t,n){return e=Ln(6,e,null,t),e.lanes=n,e}function Z_(e){var t=Ln(18,null,null,0);return t.stateNode=e,t}function gf(e,t,n){return t=Ln(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var sv=new WeakMap;function ti(e,t){if(typeof e=="object"&&e!==null){var n=sv.get(e);return n!==void 0?n:(t={value:e,source:t,stack:z0(t)},sv.set(e,t),t)}return{value:e,source:t,stack:z0(t)}}var yr=[],xr=0,eu=null,al=0,Kn=[],Qn=0,Ws=null,Ei=1,Ti="";function Ji(e,t){yr[xr++]=al,yr[xr++]=eu,eu=e,al=t}function J_(e,t,n){Kn[Qn++]=Ei,Kn[Qn++]=Ti,Kn[Qn++]=Ws,Ws=e;var i=Ei;e=Ti;var s=32-Bn(i)-1;i&=~(1<<s),n+=1;var a=32-Bn(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,Ei=1<<32-Bn(t)+s|n<<s|i,Ti=a+e}else Ei=1<<a|n<<s|i,Ti=e}function Yp(e){e.return!==null&&(Ji(e,1),J_(e,1,0))}function Zp(e){for(;e===eu;)eu=yr[--xr],yr[xr]=null,al=yr[--xr],yr[xr]=null;for(;e===Ws;)Ws=Kn[--Qn],Kn[Qn]=null,Ti=Kn[--Qn],Kn[Qn]=null,Ei=Kn[--Qn],Kn[Qn]=null}function j_(e,t){Kn[Qn++]=Ei,Kn[Qn++]=Ti,Kn[Qn++]=Ws,Ei=t.id,Ti=t.overflow,Ws=e}var an=null,Ee=null,Jt=!1,Bs=null,ei=!1,tp=Error(J(519));function qs(e){var t=Error(J(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw rl(ti(t,e)),tp}function av(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[sn]=e,t[An]=i,n){case"dialog":qt("cancel",t),qt("close",t);break;case"iframe":case"object":case"embed":qt("load",t);break;case"video":case"audio":for(n=0;n<ul.length;n++)qt(ul[n],t);break;case"source":qt("error",t);break;case"img":case"image":case"link":qt("error",t),qt("load",t);break;case"details":qt("toggle",t);break;case"input":qt("invalid",t),A_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":qt("invalid",t);break;case"textarea":qt("invalid",t),C_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||Nx(t.textContent,n)?(i.popover!=null&&(qt("beforetoggle",t),qt("toggle",t)),i.onScroll!=null&&qt("scroll",t),i.onScrollEnd!=null&&qt("scrollend",t),i.onClick!=null&&(t.onclick=Qi),t=!0):t=!1,t||qs(e,!0)}function rv(e){for(an=e.return;an;)switch(an.tag){case 5:case 31:case 13:ei=!1;return;case 27:case 3:ei=!0;return;default:an=an.return}}function rr(e){if(e!==an)return!1;if(!Jt)return rv(e),Jt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Tp(e.type,e.memoizedProps)),n=!n),n&&Ee&&qs(e),rv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));Ee=Zv(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));Ee=Zv(e)}else t===27?(t=Ee,js(e.type)?(e=Rp,Rp=null,Ee=e):Ee=t):Ee=an?ii(e.stateNode.nextSibling):null;return!0}function Ca(){Ee=an=null,Jt=!1}function vf(){var e=Bs;return e!==null&&(En===null?En=e:En.push.apply(En,e),Bs=null),e}function rl(e){Bs===null?Bs=[e]:Bs.push(e)}var ep=Ci(null),Ba=null,$i=null;function ws(e,t,n){Se(ep,t._currentValue),t._currentValue=n}function es(e){e._currentValue=ep.current,$e(ep)}function np(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function ip(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),np(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(J(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),np(r,n,e),r=null}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function Gr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(J(387));if(r=r.memoizedProps,r!==null){var o=s.type;zn(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===Zc.current){if(r=s.alternate,r===null)throw Error(J(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(dl):e=[dl])}s=s.return}e!==null&&ip(t,e,n,i),t.flags|=262144}function nu(e){for(e=e.firstContext;e!==null;){if(!zn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ra(e){Ba=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rn(e){return K_(Ba,e)}function Mc(e,t){return Ba===null&&Ra(e),K_(e,t)}function K_(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},$i===null){if(e===null)throw Error(J(308));$i=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else $i=$i.next=t;return n}var A1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},w1=Ye.unstable_scheduleCallback,C1=Ye.unstable_NormalPriority,ke={$$typeof:Ki,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Jp(){return{controller:new A1,data:new Map,refCount:0}}function Sl(e){e.refCount--,e.refCount===0&&w1(C1,function(){e.controller.abort()})}var Wo=null,sp=0,Nr=0,Tr=null;function R1(e,t){if(Wo===null){var n=Wo=[];sp=0,Nr=xm(),Tr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return sp++,t.then(ov,ov),t}function ov(){if(--sp===0&&Wo!==null){Tr!==null&&(Tr.status="fulfilled");var e=Wo;Wo=null,Nr=0,Tr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function D1(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var lv=Rt.S;Rt.S=function(e,t){hx=On(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&R1(e,t),lv!==null&&lv(e,t)};var Ta=Ci(null);function jp(){var e=Ta.current;return e!==null?e:ve.pooledCache}function Fc(e,t){t===null?Se(Ta,Ta.current):Se(Ta,t.pool)}function Q_(){var e=jp();return e===null?null:{parent:ke._currentValue,pool:e}}var kr=Error(J(460)),Kp=Error(J(474)),Ru=Error(J(542)),iu={then:function(){}};function cv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function $_(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Qi,Qi),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,hv(e),e;default:if(typeof t.status=="string")t.then(Qi,Qi);else{if(e=ve,e!==null&&100<e.shellSuspendCounter)throw Error(J(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,hv(e),e}throw Aa=t,kr}}function Sa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Aa=n,kr):n}}var Aa=null;function uv(){if(Aa===null)throw Error(J(459));var e=Aa;return Aa=null,e}function hv(e){if(e===kr||e===Ru)throw Error(J(483))}var Ar=null,ol=0;function Ec(e){var t=ol;return ol+=1,Ar===null&&(Ar=[]),$_(Ar,e,t)}function No(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Tc(e,t){throw t.$$typeof===gM?Error(J(525)):(e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ty(e){function t(h,m){if(e){var _=h.deletions;_===null?(h.deletions=[m],h.flags|=16):_.push(m)}}function n(h,m){if(!e)return null;for(;m!==null;)t(h,m),m=m.sibling;return null}function i(h){for(var m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function s(h,m){return h=ts(h,m),h.index=0,h.sibling=null,h}function a(h,m,_){return h.index=_,e?(_=h.alternate,_!==null?(_=_.index,_<m?(h.flags|=67108866,m):_):(h.flags|=67108866,m)):(h.flags|=1048576,m)}function r(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,m,_,S){return m===null||m.tag!==6?(m=mf(_,h.mode,S),m.return=h,m):(m=s(m,_),m.return=h,m)}function l(h,m,_,S){var w=_.type;return w===ur?d(h,m,_.props.children,S,_.key):m!==null&&(m.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Ts&&Sa(w)===m.type)?(m=s(m,_.props),No(m,_),m.return=h,m):(m=Bc(_.type,_.key,_.props,null,h.mode,S),No(m,_),m.return=h,m)}function c(h,m,_,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=gf(_,h.mode,S),m.return=h,m):(m=s(m,_.children||[]),m.return=h,m)}function d(h,m,_,S,w){return m===null||m.tag!==7?(m=Ea(_,h.mode,S,w),m.return=h,m):(m=s(m,_),m.return=h,m)}function p(h,m,_){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=mf(""+m,h.mode,_),m.return=h,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case mc:return _=Bc(m.type,m.key,m.props,null,h.mode,_),No(_,m),_.return=h,_;case Bo:return m=gf(m,h.mode,_),m.return=h,m;case Ts:return m=Sa(m),p(h,m,_)}if(Fo(m)||Do(m))return m=Ea(m,h.mode,_,null),m.return=h,m;if(typeof m.then=="function")return p(h,Ec(m),_);if(m.$$typeof===Ki)return p(h,Mc(h,m),_);Tc(h,m)}return null}function u(h,m,_,S){var w=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return w!==null?null:o(h,m,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case mc:return _.key===w?l(h,m,_,S):null;case Bo:return _.key===w?c(h,m,_,S):null;case Ts:return _=Sa(_),u(h,m,_,S)}if(Fo(_)||Do(_))return w!==null?null:d(h,m,_,S,null);if(typeof _.then=="function")return u(h,m,Ec(_),S);if(_.$$typeof===Ki)return u(h,m,Mc(h,_),S);Tc(h,_)}return null}function f(h,m,_,S,w){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return h=h.get(_)||null,o(m,h,""+S,w);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case mc:return h=h.get(S.key===null?_:S.key)||null,l(m,h,S,w);case Bo:return h=h.get(S.key===null?_:S.key)||null,c(m,h,S,w);case Ts:return S=Sa(S),f(h,m,_,S,w)}if(Fo(S)||Do(S))return h=h.get(_)||null,d(m,h,S,w,null);if(typeof S.then=="function")return f(h,m,_,Ec(S),w);if(S.$$typeof===Ki)return f(h,m,_,Mc(m,S),w);Tc(m,S)}return null}function v(h,m,_,S){for(var w=null,C=null,T=m,x=m=0,E=null;T!==null&&x<_.length;x++){T.index>x?(E=T,T=null):E=T.sibling;var I=u(h,T,_[x],S);if(I===null){T===null&&(T=E);break}e&&T&&I.alternate===null&&t(h,T),m=a(I,m,x),C===null?w=I:C.sibling=I,C=I,T=E}if(x===_.length)return n(h,T),Jt&&Ji(h,x),w;if(T===null){for(;x<_.length;x++)T=p(h,_[x],S),T!==null&&(m=a(T,m,x),C===null?w=T:C.sibling=T,C=T);return Jt&&Ji(h,x),w}for(T=i(T);x<_.length;x++)E=f(T,h,x,_[x],S),E!==null&&(e&&E.alternate!==null&&T.delete(E.key===null?x:E.key),m=a(E,m,x),C===null?w=E:C.sibling=E,C=E);return e&&T.forEach(function(R){return t(h,R)}),Jt&&Ji(h,x),w}function b(h,m,_,S){if(_==null)throw Error(J(151));for(var w=null,C=null,T=m,x=m=0,E=null,I=_.next();T!==null&&!I.done;x++,I=_.next()){T.index>x?(E=T,T=null):E=T.sibling;var R=u(h,T,I.value,S);if(R===null){T===null&&(T=E);break}e&&T&&R.alternate===null&&t(h,T),m=a(R,m,x),C===null?w=R:C.sibling=R,C=R,T=E}if(I.done)return n(h,T),Jt&&Ji(h,x),w;if(T===null){for(;!I.done;x++,I=_.next())I=p(h,I.value,S),I!==null&&(m=a(I,m,x),C===null?w=I:C.sibling=I,C=I);return Jt&&Ji(h,x),w}for(T=i(T);!I.done;x++,I=_.next())I=f(T,h,x,I.value,S),I!==null&&(e&&I.alternate!==null&&T.delete(I.key===null?x:I.key),m=a(I,m,x),C===null?w=I:C.sibling=I,C=I);return e&&T.forEach(function(F){return t(h,F)}),Jt&&Ji(h,x),w}function g(h,m,_,S){if(typeof _=="object"&&_!==null&&_.type===ur&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case mc:t:{for(var w=_.key;m!==null;){if(m.key===w){if(w=_.type,w===ur){if(m.tag===7){n(h,m.sibling),S=s(m,_.props.children),S.return=h,h=S;break t}}else if(m.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Ts&&Sa(w)===m.type){n(h,m.sibling),S=s(m,_.props),No(S,_),S.return=h,h=S;break t}n(h,m);break}else t(h,m);m=m.sibling}_.type===ur?(S=Ea(_.props.children,h.mode,S,_.key),S.return=h,h=S):(S=Bc(_.type,_.key,_.props,null,h.mode,S),No(S,_),S.return=h,h=S)}return r(h);case Bo:t:{for(w=_.key;m!==null;){if(m.key===w)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(h,m.sibling),S=s(m,_.children||[]),S.return=h,h=S;break t}else{n(h,m);break}else t(h,m);m=m.sibling}S=gf(_,h.mode,S),S.return=h,h=S}return r(h);case Ts:return _=Sa(_),g(h,m,_,S)}if(Fo(_))return v(h,m,_,S);if(Do(_)){if(w=Do(_),typeof w!="function")throw Error(J(150));return _=w.call(_),b(h,m,_,S)}if(typeof _.then=="function")return g(h,m,Ec(_),S);if(_.$$typeof===Ki)return g(h,m,Mc(h,_),S);Tc(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,m!==null&&m.tag===6?(n(h,m.sibling),S=s(m,_),S.return=h,h=S):(n(h,m),S=mf(_,h.mode,S),S.return=h,h=S),r(h)):n(h,m)}return function(h,m,_,S){try{ol=0;var w=g(h,m,_,S);return Ar=null,w}catch(T){if(T===kr||T===Ru)throw T;var C=Ln(29,T,null,h.mode);return C.lanes=S,C.return=h,C}}}var Da=ty(!0),ey=ty(!1),As=!1;function Qp(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ap(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function zs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ie&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=tu(e),q_(e,null,n),t}return Cu(e,i,t,n),tu(e)}function qo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,y_(e,n)}}function _f(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var rp=!1;function Yo(){if(rp){var e=Tr;if(e!==null)throw e}}function Zo(e,t,n,i){rp=!1;var s=e.updateQueue;As=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,d=c=l=null,o=a;do{var u=o.lane&-536870913,f=u!==o.lane;if(f?(Zt&u)===u:(i&u)===u){u!==0&&u===Nr&&(rp=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var v=e,b=o;u=t;var g=n;switch(b.tag){case 1:if(v=b.payload,typeof v=="function"){p=v.call(g,p,u);break t}p=v;break t;case 3:v.flags=v.flags&-65537|128;case 0:if(v=b.payload,u=typeof v=="function"?v.call(g,p,u):v,u==null)break t;p=Te({},p,u);break t;case 2:As=!0}}u=o.callback,u!==null&&(e.flags|=64,f&&(e.flags|=8192),f=s.callbacks,f===null?s.callbacks=[u]:f.push(u))}else f={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=f,l=p):d=d.next=f,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;f=o,o=f.next,f.next=null,s.lastBaseUpdate=f,s.shared.pending=null}}while(!0);d===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=d,a===null&&(s.shared.lanes=0),Zs|=r,e.lanes=r,e.memoizedState=p}}function ny(e,t){if(typeof e!="function")throw Error(J(191,e));e.call(t)}function iy(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)ny(n[e],t)}var Lr=Ci(null),su=Ci(0);function dv(e,t){e=os,Se(su,e),Se(Lr,t),os=e|t.baseLanes}function op(){Se(su,os),Se(Lr,Lr.current)}function $p(){os=su.current,$e(Lr),$e(su)}var Vn=Ci(null),ni=null;function Cs(e){var t=e.alternate;Se(Be,Be.current&1),Se(Vn,e),ni===null&&(t===null||Lr.current!==null||t.memoizedState!==null)&&(ni=e)}function lp(e){Se(Be,Be.current),Se(Vn,e),ni===null&&(ni=e)}function sy(e){e.tag===22?(Se(Be,Be.current),Se(Vn,e),ni===null&&(ni=e)):Rs(e)}function Rs(){Se(Be,Be.current),Se(Vn,Vn.current)}function Nn(e){$e(Vn),ni===e&&(ni=null),$e(Be)}var Be=Ci(0);function au(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||wp(n)||Cp(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ss=0,Vt=null,pe=null,He=null,ru=!1,wr=!1,Ua=!1,ou=0,ll=0,Cr=null,U1=0;function Ue(){throw Error(J(321))}function tm(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zn(e[n],t[n]))return!1;return!0}function em(e,t,n,i,s,a){return ss=a,Vt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Rt.H=e===null||e.memoizedState===null?Oy:dm,Ua=!1,a=n(i,s),Ua=!1,wr&&(a=ry(t,n,i,s)),ay(e),a}function ay(e){Rt.H=cl;var t=pe!==null&&pe.next!==null;if(ss=0,He=pe=Vt=null,ru=!1,ll=0,Cr=null,t)throw Error(J(300));e===null||Xe||(e=e.dependencies,e!==null&&nu(e)&&(Xe=!0))}function ry(e,t,n,i){Vt=e;var s=0;do{if(wr&&(Cr=null),ll=0,wr=!1,25<=s)throw Error(J(301));if(s+=1,He=pe=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Rt.H=Py,a=t(n,i)}while(wr);return a}function N1(){var e=Rt.H,t=e.useState()[0];return t=typeof t.then=="function"?bl(t):t,e=e.useState()[0],(pe!==null?pe.memoizedState:null)!==e&&(Vt.flags|=1024),t}function nm(){var e=ou!==0;return ou=0,e}function im(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function sm(e){if(ru){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ru=!1}ss=0,He=pe=Vt=null,wr=!1,ll=ou=0,Cr=null}function _n(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Vt.memoizedState=He=e:He=He.next=e,He}function Fe(){if(pe===null){var e=Vt.alternate;e=e!==null?e.memoizedState:null}else e=pe.next;var t=He===null?Vt.memoizedState:He.next;if(t!==null)He=t,pe=e;else{if(e===null)throw Vt.alternate===null?Error(J(467)):Error(J(310));pe=e,e={memoizedState:pe.memoizedState,baseState:pe.baseState,baseQueue:pe.baseQueue,queue:pe.queue,next:null},He===null?Vt.memoizedState=He=e:He=He.next=e}return He}function Du(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bl(e){var t=ll;return ll+=1,Cr===null&&(Cr=[]),e=$_(Cr,e,t),t=Vt,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,Rt.H=t===null||t.memoizedState===null?Oy:dm),e}function Uu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bl(e);if(e.$$typeof===Ki)return rn(e)}throw Error(J(438,String(e)))}function am(e){var t=null,n=Vt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Vt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Du(),Vt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=vM;return t.index++,n}function as(e,t){return typeof t=="function"?t(e):t}function zc(e){var t=Fe();return rm(t,pe,e)}function rm(e,t,n){var i=e.queue;if(i===null)throw Error(J(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,d=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(Zt&p)===p:(ss&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Nr&&(d=!0);else if((ss&u)===u){c=c.next,u===Nr&&(d=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,Vt.lanes|=u,Zs|=u;p=c.action,Ua&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Vt.lanes|=p,Zs|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!zn(a,e.memoizedState)&&(Xe=!0,d&&(n=Tr,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function yf(e){var t=Fe(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);zn(a,t.memoizedState)||(Xe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function oy(e,t,n){var i=Vt,s=Fe(),a=Jt;if(a){if(n===void 0)throw Error(J(407));n=n()}else n=t();var r=!zn((pe||s).memoizedState,n);if(r&&(s.memoizedState=n,Xe=!0),s=s.queue,om(uy.bind(null,i,s,e),[e]),s.getSnapshot!==t||r||He!==null&&He.memoizedState.tag&1){if(i.flags|=2048,Ir(9,{destroy:void 0},cy.bind(null,i,s,n,t),null),ve===null)throw Error(J(349));a||(ss&127)!==0||ly(i,t,n)}return n}function ly(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Vt.updateQueue,t===null?(t=Du(),Vt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function cy(e,t,n,i){t.value=n,t.getSnapshot=i,hy(t)&&dy(e)}function uy(e,t,n){return n(function(){hy(t)&&dy(e)})}function hy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zn(e,n)}catch{return!0}}function dy(e){var t=Pa(e,2);t!==null&&Tn(t,e,2)}function cp(e){var t=_n();if(typeof e=="function"){var n=e;if(e=n(),Ua){Us(!0);try{n()}finally{Us(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:as,lastRenderedState:e},t}function fy(e,t,n,i){return e.baseState=n,rm(e,pe,typeof i=="function"?i:as)}function L1(e,t,n,i,s){if(Lu(e))throw Error(J(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Rt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,py(t,a)):(a.next=n.next,t.pending=n.next=a)}}function py(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Rt.T,r={};Rt.T=r;try{var o=n(s,i),l=Rt.S;l!==null&&l(r,o),fv(e,t,o)}catch(c){up(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Rt.T=a}}else try{a=n(s,i),fv(e,t,a)}catch(c){up(e,t,c)}}function fv(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){pv(e,t,i)},function(i){return up(e,t,i)}):pv(e,t,n)}function pv(e,t,n){t.status="fulfilled",t.value=n,my(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,py(e,n)))}function up(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,my(t),t=t.next;while(t!==i)}e.action=null}function my(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function gy(e,t){return t}function mv(e,t){if(Jt){var n=ve.formState;if(n!==null){t:{var i=Vt;if(Jt){if(Ee){e:{for(var s=Ee,a=ei;s.nodeType!==8;){if(!a){s=null;break e}if(s=ii(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Ee=ii(s.nextSibling),i=s.data==="F!";break t}}qs(i)}i=!1}i&&(t=n[0])}}return n=_n(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gy,lastRenderedState:t},n.queue=i,n=Ny.bind(null,Vt,i),i.dispatch=n,i=cp(!1),a=hm.bind(null,Vt,!1,i.queue),i=_n(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=L1.bind(null,Vt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function gv(e){var t=Fe();return vy(t,pe,e)}function vy(e,t,n){if(t=rm(e,t,gy)[0],e=zc(as)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=bl(t)}catch(r){throw r===kr?Ru:r}else i=t;t=Fe();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Vt.flags|=2048,Ir(9,{destroy:void 0},I1.bind(null,s,n),null)),[i,a,e]}function I1(e,t){e.action=t}function vv(e){var t=Fe(),n=pe;if(n!==null)return vy(t,n,e);Fe(),t=t.memoizedState,n=Fe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Ir(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Vt.updateQueue,t===null&&(t=Du(),Vt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function _y(){return Fe().memoizedState}function Vc(e,t,n,i){var s=_n();Vt.flags|=e,s.memoizedState=Ir(1|t,{destroy:void 0},n,i===void 0?null:i)}function Nu(e,t,n,i){var s=Fe();i=i===void 0?null:i;var a=s.memoizedState.inst;pe!==null&&i!==null&&tm(i,pe.memoizedState.deps)?s.memoizedState=Ir(t,a,n,i):(Vt.flags|=e,s.memoizedState=Ir(1|t,a,n,i))}function _v(e,t){Vc(8390656,8,e,t)}function om(e,t){Nu(2048,8,e,t)}function O1(e){Vt.flags|=4;var t=Vt.updateQueue;if(t===null)t=Du(),Vt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function yy(e){var t=Fe().memoizedState;return O1({ref:t,nextImpl:e}),function(){if((ie&2)!==0)throw Error(J(440));return t.impl.apply(void 0,arguments)}}function xy(e,t){return Nu(4,2,e,t)}function Sy(e,t){return Nu(4,4,e,t)}function by(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function My(e,t,n){n=n!=null?n.concat([e]):null,Nu(4,4,by.bind(null,t,e),n)}function lm(){}function Ey(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&tm(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ty(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&tm(t,i[1]))return i[0];if(i=e(),Ua){Us(!0);try{e()}finally{Us(!1)}}return n.memoizedState=[i,t],i}function cm(e,t,n){return n===void 0||(ss&1073741824)!==0&&(Zt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=fx(),Vt.lanes|=e,Zs|=e,n)}function Ay(e,t,n,i){return zn(n,t)?n:Lr.current!==null?(e=cm(e,n,i),zn(e,t)||(Xe=!0),e):(ss&42)===0||(ss&1073741824)!==0&&(Zt&261930)===0?(Xe=!0,e.memoizedState=n):(e=fx(),Vt.lanes|=e,Zs|=e,t)}function wy(e,t,n,i,s){var a=se.p;se.p=a!==0&&8>a?a:8;var r=Rt.T,o={};Rt.T=o,hm(e,!1,t,n);try{var l=s(),c=Rt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=D1(l,i);Jo(e,t,d,Fn(e))}else Jo(e,t,i,Fn(e))}catch(p){Jo(e,t,{then:function(){},status:"rejected",reason:p},Fn())}finally{se.p=a,r!==null&&o.types!==null&&(r.types=o.types),Rt.T=r}}function P1(){}function hp(e,t,n,i){if(e.tag!==5)throw Error(J(476));var s=Cy(e).queue;wy(e,s,t,Ma,n===null?P1:function(){return Ry(e),n(i)})}function Cy(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ma,baseState:Ma,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:as,lastRenderedState:Ma},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:as,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ry(e){var t=Cy(e);t.next===null&&(t=e.alternate.memoizedState),Jo(e,t.next.queue,{},Fn())}function um(){return rn(dl)}function Dy(){return Fe().memoizedState}function Uy(){return Fe().memoizedState}function B1(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Fn();e=Fs(n);var i=zs(t,e,n);i!==null&&(Tn(i,t,n),qo(i,t,n)),t={cache:Jp()},e.payload=t;return}t=t.return}}function F1(e,t,n){var i=Fn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Lu(e)?Ly(t,n):(n=Wp(e,t,n,i),n!==null&&(Tn(n,e,i),Iy(n,t,i)))}function Ny(e,t,n){var i=Fn();Jo(e,t,n,i)}function Jo(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Lu(e))Ly(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,zn(o,r))return Cu(e,t,s,0),ve===null&&wu(),!1}catch{}if(n=Wp(e,t,s,i),n!==null)return Tn(n,e,i),Iy(n,t,i),!0}return!1}function hm(e,t,n,i){if(i={lane:2,revertLane:xm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Lu(e)){if(t)throw Error(J(479))}else t=Wp(e,n,i,2),t!==null&&Tn(t,e,2)}function Lu(e){var t=e.alternate;return e===Vt||t!==null&&t===Vt}function Ly(e,t){wr=ru=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Iy(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,y_(e,n)}}var cl={readContext:rn,use:Uu,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useLayoutEffect:Ue,useInsertionEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useSyncExternalStore:Ue,useId:Ue,useHostTransitionStatus:Ue,useFormState:Ue,useActionState:Ue,useOptimistic:Ue,useMemoCache:Ue,useCacheRefresh:Ue};cl.useEffectEvent=Ue;var Oy={readContext:rn,use:Uu,useCallback:function(e,t){return _n().memoizedState=[e,t===void 0?null:t],e},useContext:rn,useEffect:_v,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Vc(4194308,4,by.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vc(4194308,4,e,t)},useInsertionEffect:function(e,t){Vc(4,2,e,t)},useMemo:function(e,t){var n=_n();t=t===void 0?null:t;var i=e();if(Ua){Us(!0);try{e()}finally{Us(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=_n();if(n!==void 0){var s=n(t);if(Ua){Us(!0);try{n(t)}finally{Us(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=F1.bind(null,Vt,e),[i.memoizedState,e]},useRef:function(e){var t=_n();return e={current:e},t.memoizedState=e},useState:function(e){e=cp(e);var t=e.queue,n=Ny.bind(null,Vt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:lm,useDeferredValue:function(e,t){var n=_n();return cm(n,e,t)},useTransition:function(){var e=cp(!1);return e=wy.bind(null,Vt,e.queue,!0,!1),_n().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Vt,s=_n();if(Jt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),ve===null)throw Error(J(349));(Zt&127)!==0||ly(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,_v(uy.bind(null,i,a,e),[e]),i.flags|=2048,Ir(9,{destroy:void 0},cy.bind(null,i,a,n,t),null),n},useId:function(){var e=_n(),t=ve.identifierPrefix;if(Jt){var n=Ti,i=Ei;n=(i&~(1<<32-Bn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=ou++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=U1++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:um,useFormState:mv,useActionState:mv,useOptimistic:function(e){var t=_n();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=hm.bind(null,Vt,!0,n),n.dispatch=t,[e,t]},useMemoCache:am,useCacheRefresh:function(){return _n().memoizedState=B1.bind(null,Vt)},useEffectEvent:function(e){var t=_n(),n={impl:e};return t.memoizedState=n,function(){if((ie&2)!==0)throw Error(J(440));return n.impl.apply(void 0,arguments)}}},dm={readContext:rn,use:Uu,useCallback:Ey,useContext:rn,useEffect:om,useImperativeHandle:My,useInsertionEffect:xy,useLayoutEffect:Sy,useMemo:Ty,useReducer:zc,useRef:_y,useState:function(){return zc(as)},useDebugValue:lm,useDeferredValue:function(e,t){var n=Fe();return Ay(n,pe.memoizedState,e,t)},useTransition:function(){var e=zc(as)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:bl(e),t]},useSyncExternalStore:oy,useId:Dy,useHostTransitionStatus:um,useFormState:gv,useActionState:gv,useOptimistic:function(e,t){var n=Fe();return fy(n,pe,e,t)},useMemoCache:am,useCacheRefresh:Uy};dm.useEffectEvent=yy;var Py={readContext:rn,use:Uu,useCallback:Ey,useContext:rn,useEffect:om,useImperativeHandle:My,useInsertionEffect:xy,useLayoutEffect:Sy,useMemo:Ty,useReducer:yf,useRef:_y,useState:function(){return yf(as)},useDebugValue:lm,useDeferredValue:function(e,t){var n=Fe();return pe===null?cm(n,e,t):Ay(n,pe.memoizedState,e,t)},useTransition:function(){var e=yf(as)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:bl(e),t]},useSyncExternalStore:oy,useId:Dy,useHostTransitionStatus:um,useFormState:vv,useActionState:vv,useOptimistic:function(e,t){var n=Fe();return pe!==null?fy(n,pe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:am,useCacheRefresh:Uy};Py.useEffectEvent=yy;function xf(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var dp={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Fn(),s=Fs(i);s.payload=t,n!=null&&(s.callback=n),t=zs(e,s,i),t!==null&&(Tn(t,e,i),qo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Fn(),s=Fs(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=zs(e,s,i),t!==null&&(Tn(t,e,i),qo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fn(),i=Fs(n);i.tag=2,t!=null&&(i.callback=t),t=zs(e,i,n),t!==null&&(Tn(t,e,n),qo(t,e,n))}};function yv(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!sl(n,i)||!sl(s,a):!0}function xv(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&dp.enqueueReplaceState(t,t.state,null)}function Na(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Te({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function By(e){$c(e)}function Fy(e){console.error(e)}function zy(e){$c(e)}function lu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Sv(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function fp(e,t,n){return n=Fs(n),n.tag=3,n.payload={element:null},n.callback=function(){lu(e,t)},n}function Vy(e){return e=Fs(e),e.tag=3,e}function Hy(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Sv(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Sv(t,n,i),typeof s!="function"&&(Vs===null?Vs=new Set([this]):Vs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function z1(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Gr(t,n,s,!0),n=Vn.current,n!==null){switch(n.tag){case 31:case 13:return ni===null?fu():n.alternate===null&&Ne===0&&(Ne=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===iu?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Uf(e,i,s)),!1;case 22:return n.flags|=65536,i===iu?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Uf(e,i,s)),!1}throw Error(J(435,n.tag))}return Uf(e,i,s),fu(),!1}if(Jt)return t=Vn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==tp&&(e=Error(J(422),{cause:i}),rl(ti(e,n)))):(i!==tp&&(t=Error(J(423),{cause:i}),rl(ti(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=ti(i,n),s=fp(e.stateNode,i,s),_f(e,s),Ne!==4&&(Ne=2)),!1;var a=Error(J(520),{cause:i});if(a=ti(a,n),Qo===null?Qo=[a]:Qo.push(a),Ne!==4&&(Ne=2),t===null)return!0;i=ti(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=fp(n.stateNode,i,e),_f(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(Vs===null||!Vs.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Vy(s),Hy(s,e,n,i),_f(n,s),!1}n=n.return}while(n!==null);return!1}var fm=Error(J(461)),Xe=!1;function nn(e,t,n,i){t.child=e===null?ey(t,null,n,i):Da(t,e.child,n,i)}function bv(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ra(t),i=em(e,t,n,r,a,s),o=nm(),e!==null&&!Xe?(im(e,t,s),rs(e,t,s)):(Jt&&o&&Yp(t),t.flags|=1,nn(e,t,i,s),t.child)}function Mv(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!qp(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Gy(e,t,a,i,s)):(e=Bc(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pm(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:sl,n(r,i)&&e.ref===t.ref)return rs(e,t,s)}return t.flags|=1,e=ts(a,i),e.ref=t.ref,e.return=t,t.child=e}function Gy(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(sl(a,i)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=i=a,pm(e,s))(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,rs(e,t,s)}return pp(e,t,n,i,s)}function ky(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Ev(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Fc(t,a!==null?a.cachePool:null),a!==null?dv(t,a):op(),sy(t);else return i=t.lanes=536870912,Ev(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(Fc(t,a.cachePool),dv(t,a),Rs(t),t.memoizedState=null):(e!==null&&Fc(t,null),op(),Rs(t));return nn(e,t,s,n),t.child}function Vo(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ev(e,t,n,i,s){var a=jp();return a=a===null?null:{parent:ke._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Fc(t,null),op(),sy(t),e!==null&&Gr(e,t,i,!0),t.childLanes=s,null}function Hc(e,t){return t=cu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Tv(e,t,n){return Da(t,e.child,null,n),e=Hc(t,t.pendingProps),e.flags|=2,Nn(t),t.memoizedState=null,e}function V1(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Jt){if(i.mode==="hidden")return e=Hc(t,i),t.lanes=536870912,Vo(null,e);if(lp(t),(e=Ee)?(e=Ox(e,ei),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ws!==null?{id:Ei,overflow:Ti}:null,retryLane:536870912,hydrationErrors:null},n=Z_(e),n.return=t,t.child=n,an=t,Ee=null)):e=null,e===null)throw qs(t);return t.lanes=536870912,null}return Hc(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(lp(t),s)if(t.flags&256)t.flags&=-257,t=Tv(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(J(558));else if(Xe||Gr(e,t,n,!1),s=(n&e.childLanes)!==0,Xe||s){if(i=ve,i!==null&&(r=x_(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Pa(e,r),Tn(i,e,r),fm;fu(),t=Tv(e,t,n)}else e=a.treeContext,Ee=ii(r.nextSibling),an=t,Jt=!0,Bs=null,ei=!1,e!==null&&j_(t,e),t=Hc(t,i),t.flags|=4096;return t}return e=ts(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Gc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(J(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pp(e,t,n,i,s){return Ra(t),n=em(e,t,n,i,void 0,s),i=nm(),e!==null&&!Xe?(im(e,t,s),rs(e,t,s)):(Jt&&i&&Yp(t),t.flags|=1,nn(e,t,n,s),t.child)}function Av(e,t,n,i,s,a){return Ra(t),t.updateQueue=null,n=ry(t,i,n,s),ay(e),i=nm(),e!==null&&!Xe?(im(e,t,a),rs(e,t,a)):(Jt&&i&&Yp(t),t.flags|=1,nn(e,t,n,a),t.child)}function wv(e,t,n,i,s){if(Ra(t),t.stateNode===null){var a=_r,r=n.contextType;typeof r=="object"&&r!==null&&(a=rn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=dp,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},Qp(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?rn(r):_r,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(xf(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&dp.enqueueReplaceState(a,a.state,null),Zo(t,i,a,s),Yo(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=Na(n,o);a.props=l;var c=a.context,d=n.contextType;r=_r,typeof d=="object"&&d!==null&&(r=rn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&xv(t,a,i,r),As=!1;var u=t.memoizedState;a.state=u,Zo(t,i,a,s),Yo(),c=t.memoizedState,o||u!==c||As?(typeof p=="function"&&(xf(t,n,p,i),c=t.memoizedState),(l=As||yv(t,n,l,i,u,c,r))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,ap(e,t),r=t.memoizedProps,d=Na(n,r),a.props=d,p=t.pendingProps,u=a.context,c=n.contextType,l=_r,typeof c=="object"&&c!==null&&(l=rn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&xv(t,a,i,l),As=!1,u=t.memoizedState,a.state=u,Zo(t,i,a,s),Yo();var f=t.memoizedState;r!==p||u!==f||As||e!==null&&e.dependencies!==null&&nu(e.dependencies)?(typeof o=="function"&&(xf(t,n,o,i),f=t.memoizedState),(d=As||yv(t,n,d,i,u,f,l)||e!==null&&e.dependencies!==null&&nu(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,f,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,f,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=f),a.props=i,a.state=f,a.context=l,i=d):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Gc(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=Da(t,e.child,null,s),t.child=Da(t,null,n,s)):nn(e,t,n,s),t.memoizedState=a.state,e=t.child):e=rs(e,t,s),e}function Cv(e,t,n,i){return Ca(),t.flags|=256,nn(e,t,n,i),t.child}var Sf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bf(e){return{baseLanes:e,cachePool:Q_()}}function Mf(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=In),e}function Xy(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(Be.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Jt){if(s?Cs(t):Rs(t),(e=Ee)?(e=Ox(e,ei),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ws!==null?{id:Ei,overflow:Ti}:null,retryLane:536870912,hydrationErrors:null},n=Z_(e),n.return=t,t.child=n,an=t,Ee=null)):e=null,e===null)throw qs(t);return Cp(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,s?(Rs(t),s=t.mode,o=cu({mode:"hidden",children:o},s),i=Ea(i,s,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=bf(n),i.childLanes=Mf(e,r,n),t.memoizedState=Sf,Vo(null,i)):(Cs(t),mp(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(a)t.flags&256?(Cs(t),t.flags&=-257,t=Ef(e,t,n)):t.memoizedState!==null?(Rs(t),t.child=e.child,t.flags|=128,t=null):(Rs(t),o=i.fallback,s=t.mode,i=cu({mode:"visible",children:i.children},s),o=Ea(o,s,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,Da(t,e.child,null,n),i=t.child,i.memoizedState=bf(n),i.childLanes=Mf(e,r,n),t.memoizedState=Sf,t=Vo(null,i));else if(Cs(t),Cp(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(J(419)),i.stack="",i.digest=r,rl({value:i,source:null,stack:null}),t=Ef(e,t,n)}else if(Xe||Gr(e,t,n,!1),r=(n&e.childLanes)!==0,Xe||r){if(r=ve,r!==null&&(i=x_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,Pa(e,i),Tn(r,e,i),fm;wp(o)||fu(),t=Ef(e,t,n)}else wp(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ee=ii(o.nextSibling),an=t,Jt=!0,Bs=null,ei=!1,e!==null&&j_(t,e),t=mp(t,i.children),t.flags|=4096);return t}return s?(Rs(t),o=i.fallback,s=t.mode,l=e.child,c=l.sibling,i=ts(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=ts(c,o):(o=Ea(o,s,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,Vo(null,i),i=t.child,o=e.child.memoizedState,o===null?o=bf(n):(s=o.cachePool,s!==null?(l=ke._currentValue,s=s.parent!==l?{parent:l,pool:l}:s):s=Q_(),o={baseLanes:o.baseLanes|n,cachePool:s}),i.memoizedState=o,i.childLanes=Mf(e,r,n),t.memoizedState=Sf,Vo(e.child,i)):(Cs(t),n=e.child,e=n.sibling,n=ts(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function mp(e,t){return t=cu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function cu(e,t){return e=Ln(22,e,null,t),e.lanes=0,e}function Ef(e,t,n){return Da(t,e.child,null,n),e=mp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rv(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),np(e.return,t,n)}function Tf(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function Wy(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=Be.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,Se(Be,r),nn(e,t,i,n),i=Jt?al:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Rv(e,n,t);else if(e.tag===19)Rv(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&au(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Tf(t,!1,s,n,a,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&au(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Tf(t,!0,n,null,a,i);break;case"together":Tf(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function rs(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Zs|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Gr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=ts(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ts(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&nu(e)))}function H1(e,t,n){switch(t.tag){case 3:Jc(t,t.stateNode.containerInfo),ws(t,ke,e.memoizedState.cache),Ca();break;case 27:case 5:kf(t);break;case 4:Jc(t,t.stateNode.containerInfo);break;case 10:ws(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,lp(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Cs(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Xy(e,t,n):(Cs(t),e=rs(e,t,n),e!==null?e.sibling:null);Cs(t);break;case 19:var s=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Gr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return Wy(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Se(Be,Be.current),i)break;return null;case 22:return t.lanes=0,ky(e,t,n,t.pendingProps);case 24:ws(t,ke,e.memoizedState.cache)}return rs(e,t,n)}function qy(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!pm(e,n)&&(t.flags&128)===0)return Xe=!1,H1(e,t,n);Xe=(e.flags&131072)!==0}else Xe=!1,Jt&&(t.flags&1048576)!==0&&J_(t,al,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Sa(t.elementType),t.type=e,typeof e=="function")qp(e)?(i=Na(e,i),t.tag=1,t=wv(null,t,e,i,n)):(t.tag=0,t=pp(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Np){t.tag=11,t=bv(null,t,e,i,n);break t}else if(s===Lp){t.tag=14,t=Mv(null,t,e,i,n);break t}}throw t=Hf(e)||e,Error(J(306,t,""))}}return t;case 0:return pp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Na(i,t.pendingProps),wv(e,t,i,s,n);case 3:t:{if(Jc(t,t.stateNode.containerInfo),e===null)throw Error(J(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,ap(e,t),Zo(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ws(t,ke,i),i!==a.cache&&ip(t,[ke],n,!0),Yo(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Cv(e,t,i,n);break t}else if(i!==s){s=ti(Error(J(424)),t),rl(s),t=Cv(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Ee=ii(e.firstChild),an=t,Jt=!0,Bs=null,ei=!0,n=ey(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ca(),i===s){t=rs(e,t,n);break t}nn(e,t,i,n)}t=t.child}return t;case 26:return Gc(e,t),e===null?(n=Kv(t.type,null,t.pendingProps,null))?t.memoizedState=n:Jt||(n=t.type,e=t.pendingProps,i=vu(Ps.current).createElement(n),i[sn]=t,i[An]=e,on(i,n,e),Qe(i),t.stateNode=i):t.memoizedState=Kv(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return kf(t),e===null&&Jt&&(i=t.stateNode=Px(t.type,t.pendingProps,Ps.current),an=t,ei=!0,s=Ee,js(t.type)?(Rp=s,Ee=ii(i.firstChild)):Ee=s),nn(e,t,t.pendingProps.children,n),Gc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Jt&&((s=i=Ee)&&(i=mE(i,t.type,t.pendingProps,ei),i!==null?(t.stateNode=i,an=t,Ee=ii(i.firstChild),ei=!1,s=!0):s=!1),s||qs(t)),kf(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Tp(s,a)?i=null:r!==null&&Tp(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=em(e,t,N1,null,null,n),dl._currentValue=s),Gc(e,t),nn(e,t,i,n),t.child;case 6:return e===null&&Jt&&((e=n=Ee)&&(n=gE(n,t.pendingProps,ei),n!==null?(t.stateNode=n,an=t,Ee=null,e=!0):e=!1),e||qs(t)),null;case 13:return Xy(e,t,n);case 4:return Jc(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Da(t,null,i,n):nn(e,t,i,n),t.child;case 11:return bv(e,t,t.type,t.pendingProps,n);case 7:return nn(e,t,t.pendingProps,n),t.child;case 8:return nn(e,t,t.pendingProps.children,n),t.child;case 12:return nn(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,ws(t,t.type,i.value),nn(e,t,i.children,n),t.child;case 9:return s=t.type._context,i=t.pendingProps.children,Ra(t),s=rn(s),i=i(s),t.flags|=1,nn(e,t,i,n),t.child;case 14:return Mv(e,t,t.type,t.pendingProps,n);case 15:return Gy(e,t,t.type,t.pendingProps,n);case 19:return Wy(e,t,n);case 31:return V1(e,t,n);case 22:return ky(e,t,n,t.pendingProps);case 24:return Ra(t),i=rn(ke),e===null?(s=jp(),s===null&&(s=ve,a=Jp(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},Qp(t),ws(t,ke,s)):((e.lanes&n)!==0&&(ap(e,t),Zo(t,null,null,n),Yo()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ws(t,ke,i)):(i=a.cache,ws(t,ke,i),i!==s.cache&&ip(t,[ke],n,!0))),nn(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(J(156,t.tag))}function Wi(e){e.flags|=4}function Af(e,t,n,i,s){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(gx())e.flags|=8192;else throw Aa=iu,Kp}else e.flags&=-16777217}function Dv(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!zx(t))if(gx())e.flags|=8192;else throw Aa=iu,Kp}function Ac(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?v_():536870912,e.lanes|=t,Or|=t)}function Lo(e,t){if(!Jt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&65011712,i|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function G1(e,t,n){var i=t.pendingProps;switch(Zp(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return Me(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),es(ke),Rr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(rr(t)?Wi(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,vf())),Me(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(Wi(t),a!==null?(Me(t),Dv(t,a)):(Me(t),Af(t,s,null,i,n))):a?a!==e.memoizedState?(Wi(t),Me(t),Dv(t,a)):(Me(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Wi(t),Me(t),Af(t,s,e,i,n)),null;case 27:if(jc(t),n=Ps.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Wi(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Me(t),null}e=wi.current,rr(t)?av(t,e):(e=Px(s,i,n),t.stateNode=e,Wi(t))}return Me(t),null;case 5:if(jc(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Wi(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Me(t),null}if(a=wi.current,rr(t))av(t,a);else{var r=vu(Ps.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[sn]=t,a[An]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(on(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Wi(t)}}return Me(t),Af(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Wi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(J(166));if(e=Ps.current,rr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=an,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[sn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||Nx(e.nodeValue,n)),e||qs(t,!0)}else e=vu(e).createTextNode(i),e[sn]=t,t.stateNode=e}return Me(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=rr(t),n!==null){if(e===null){if(!i)throw Error(J(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(557));e[sn]=t}else Ca(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),e=!1}else n=vf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Nn(t),t):(Nn(t),null);if((t.flags&128)!==0)throw Error(J(558))}return Me(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=rr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(J(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(J(317));s[sn]=t}else Ca(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),s=!1}else s=vf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Nn(t),t):(Nn(t),null)}return Nn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ac(t,t.updateQueue),Me(t),null);case 4:return Rr(),e===null&&Sm(t.stateNode.containerInfo),Me(t),null;case 10:return es(t.type),Me(t),null;case 19:if($e(Be),i=t.memoizedState,i===null)return Me(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Lo(i,!1);else{if(Ne!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=au(e),a!==null){for(t.flags|=128,Lo(i,!1),e=a.updateQueue,t.updateQueue=e,Ac(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Y_(n,e),n=n.sibling;return Se(Be,Be.current&1|2),Jt&&Ji(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&On()>hu&&(t.flags|=128,s=!0,Lo(i,!1),t.lanes=4194304)}else{if(!s)if(e=au(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Ac(t,e),Lo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Jt)return Me(t),null}else 2*On()-i.renderingStartTime>hu&&n!==536870912&&(t.flags|=128,s=!0,Lo(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=On(),e.sibling=null,n=Be.current,Se(Be,s?n&1|2:n&1),Jt&&Ji(t,i.treeForkCount),e):(Me(t),null);case 22:case 23:return Nn(t),$p(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),n=t.updateQueue,n!==null&&Ac(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&$e(Ta),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),es(ke),Me(t),null;case 25:return null;case 30:return null}throw Error(J(156,t.tag))}function k1(e,t){switch(Zp(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return es(ke),Rr(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return jc(t),null;case 31:if(t.memoizedState!==null){if(Nn(t),t.alternate===null)throw Error(J(340));Ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Nn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));Ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $e(Be),null;case 4:return Rr(),null;case 10:return es(t.type),null;case 22:case 23:return Nn(t),$p(),e!==null&&$e(Ta),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return es(ke),null;case 25:return null;default:return null}}function Yy(e,t){switch(Zp(t),t.tag){case 3:es(ke),Rr();break;case 26:case 27:case 5:jc(t);break;case 4:Rr();break;case 31:t.memoizedState!==null&&Nn(t);break;case 13:Nn(t);break;case 19:$e(Be);break;case 10:es(t.type);break;case 22:case 23:Nn(t),$p(),e!==null&&$e(Ta);break;case 24:es(ke)}}function Ml(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){ue(t,t.return,o)}}function Ys(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(d){ue(s,l,d)}}}i=i.next}while(i!==a)}}catch(d){ue(t,t.return,d)}}function Zy(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{iy(t,n)}catch(i){ue(e,e.return,i)}}}function Jy(e,t,n){n.props=Na(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){ue(e,t,i)}}function jo(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(s){ue(e,t,s)}}function Ai(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){ue(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){ue(e,t,s)}else n.current=null}function jy(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){ue(e,e.return,s)}}function wf(e,t,n){try{var i=e.stateNode;cE(i,e.type,n,t),i[An]=t}catch(s){ue(e,e.return,s)}}function Ky(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&js(e.type)||e.tag===4}function Cf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Ky(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&js(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gp(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Qi));else if(i!==4&&(i===27&&js(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(gp(e,t,n),e=e.sibling;e!==null;)gp(e,t,n),e=e.sibling}function uu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&js(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(uu(e,t,n),e=e.sibling;e!==null;)uu(e,t,n),e=e.sibling}function Qy(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);on(t,i,n),t[sn]=e,t[An]=n}catch(a){ue(e,e.return,a)}}var ji=!1,Ge=!1,Rf=!1,Uv=typeof WeakSet=="function"?WeakSet:Set,Ke=null;function X1(e,t){if(e=e.containerInfo,Mp=Su,e=z_(e),kp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var s=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,d=0,p=e,u=null;e:for(;;){for(var f;p!==n||s!==0&&p.nodeType!==3||(o=r+s),p!==a||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(f=p.firstChild)!==null;)u=p,p=f;for(;;){if(p===e)break e;if(u===n&&++c===s&&(o=r),u===a&&++d===i&&(l=r),(f=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=f}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ep={focusedElem:e,selectionRange:n},Su=!1,Ke=t;Ke!==null;)if(t=Ke,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ke=e;else for(;Ke!==null;){switch(t=Ke,a=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)s=e[n],s.ref.impl=s.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&a!==null){e=void 0,n=t,s=a.memoizedProps,a=a.memoizedState,i=n.stateNode;try{var v=Na(n.type,s);e=i.getSnapshotBeforeUpdate(v,a),i.__reactInternalSnapshotBeforeUpdate=e}catch(b){ue(n,n.return,b)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Ap(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ap(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(J(163))}if(e=t.sibling,e!==null){e.return=t.return,Ke=e;break}Ke=t.return}}function $y(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Yi(e,n),i&4&&Ml(5,n);break;case 1:if(Yi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){ue(n,n.return,r)}else{var s=Na(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){ue(n,n.return,r)}}i&64&&Zy(n),i&512&&jo(n,n.return);break;case 3:if(Yi(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{iy(e,t)}catch(r){ue(n,n.return,r)}}break;case 27:t===null&&i&4&&Qy(n);case 26:case 5:Yi(e,n),t===null&&i&4&&jy(n),i&512&&jo(n,n.return);break;case 12:Yi(e,n);break;case 31:Yi(e,n),i&4&&nx(e,n);break;case 13:Yi(e,n),i&4&&ix(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=$1.bind(null,n),vE(e,n))));break;case 22:if(i=n.memoizedState!==null||ji,!i){t=t!==null&&t.memoizedState!==null||Ge,s=ji;var a=Ge;ji=i,(Ge=t)&&!a?Zi(e,n,(n.subtreeFlags&8772)!==0):Yi(e,n),ji=s,Ge=a}break;case 30:break;default:Yi(e,n)}}function tx(e){var t=e.alternate;t!==null&&(e.alternate=null,tx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ce=null,Mn=!1;function qi(e,t,n){for(n=n.child;n!==null;)ex(e,t,n),n=n.sibling}function ex(e,t,n){if(Pn&&typeof Pn.onCommitFiberUnmount=="function")try{Pn.onCommitFiberUnmount(gl,n)}catch{}switch(n.tag){case 26:Ge||Ai(n,t),qi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ge||Ai(n,t);var i=Ce,s=Mn;js(n.type)&&(Ce=n.stateNode,Mn=!1),qi(e,t,n),tl(n.stateNode),Ce=i,Mn=s;break;case 5:Ge||Ai(n,t);case 6:if(i=Ce,s=Mn,Ce=null,qi(e,t,n),Ce=i,Mn=s,Ce!==null)if(Mn)try{(Ce.nodeType===9?Ce.body:Ce.nodeName==="HTML"?Ce.ownerDocument.body:Ce).removeChild(n.stateNode)}catch(a){ue(n,t,a)}else try{Ce.removeChild(n.stateNode)}catch(a){ue(n,t,a)}break;case 18:Ce!==null&&(Mn?(e=Ce,qv(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),zr(e)):qv(Ce,n.stateNode));break;case 4:i=Ce,s=Mn,Ce=n.stateNode.containerInfo,Mn=!0,qi(e,t,n),Ce=i,Mn=s;break;case 0:case 11:case 14:case 15:Ys(2,n,t),Ge||Ys(4,n,t),qi(e,t,n);break;case 1:Ge||(Ai(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Jy(n,t,i)),qi(e,t,n);break;case 21:qi(e,t,n);break;case 22:Ge=(i=Ge)||n.memoizedState!==null,qi(e,t,n),Ge=i;break;default:qi(e,t,n)}}function nx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{zr(e)}catch(n){ue(t,t.return,n)}}}function ix(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{zr(e)}catch(n){ue(t,t.return,n)}}function W1(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Uv),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Uv),t;default:throw Error(J(435,e.tag))}}function wc(e,t){var n=W1(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=tE.bind(null,e,i);i.then(s,s)}})}function Sn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i],a=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(js(o.type)){Ce=o.stateNode,Mn=!1;break t}break;case 5:Ce=o.stateNode,Mn=!1;break t;case 3:case 4:Ce=o.stateNode.containerInfo,Mn=!0;break t}o=o.return}if(Ce===null)throw Error(J(160));ex(a,r,s),Ce=null,Mn=!1,a=s.alternate,a!==null&&(a.return=null),s.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)sx(t,e),t=t.sibling}var ui=null;function sx(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Sn(t,e),bn(e),i&4&&(Ys(3,e,e.return),Ml(3,e),Ys(5,e,e.return));break;case 1:Sn(t,e),bn(e),i&512&&(Ge||n===null||Ai(n,n.return)),i&64&&ji&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var s=ui;if(Sn(t,e),bn(e),i&512&&(Ge||n===null||Ai(n,n.return)),i&4){var a=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,s=s.ownerDocument||s;e:switch(i){case"title":a=s.getElementsByTagName("title")[0],(!a||a[yl]||a[sn]||a.namespaceURI==="http://www.w3.org/2000/svg"||a.hasAttribute("itemprop"))&&(a=s.createElement(i),s.head.insertBefore(a,s.querySelector("head > title"))),on(a,i,n),a[sn]=e,Qe(a),i=a;break t;case"link":var r=$v("link","href",s).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(a=r[o],a.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&a.getAttribute("rel")===(n.rel==null?null:n.rel)&&a.getAttribute("title")===(n.title==null?null:n.title)&&a.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}a=s.createElement(i),on(a,i,n),s.head.appendChild(a);break;case"meta":if(r=$v("meta","content",s).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(a=r[o],a.getAttribute("content")===(n.content==null?null:""+n.content)&&a.getAttribute("name")===(n.name==null?null:n.name)&&a.getAttribute("property")===(n.property==null?null:n.property)&&a.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}a=s.createElement(i),on(a,i,n),s.head.appendChild(a);break;default:throw Error(J(468,i))}a[sn]=e,Qe(a),i=a}e.stateNode=i}else t_(s,e.type,e.stateNode);else e.stateNode=Qv(s,i,e.memoizedProps);else a!==i?(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,i===null?t_(s,e.type,e.stateNode):Qv(s,i,e.memoizedProps)):i===null&&e.stateNode!==null&&wf(e,e.memoizedProps,n.memoizedProps)}break;case 27:Sn(t,e),bn(e),i&512&&(Ge||n===null||Ai(n,n.return)),n!==null&&i&4&&wf(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Sn(t,e),bn(e),i&512&&(Ge||n===null||Ai(n,n.return)),e.flags&32){s=e.stateNode;try{Ur(s,"")}catch(v){ue(e,e.return,v)}}i&4&&e.stateNode!=null&&(s=e.memoizedProps,wf(e,s,n!==null?n.memoizedProps:s)),i&1024&&(Rf=!0);break;case 6:if(Sn(t,e),bn(e),i&4){if(e.stateNode===null)throw Error(J(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(v){ue(e,e.return,v)}}break;case 3:if(Wc=null,s=ui,ui=_u(t.containerInfo),Sn(t,e),ui=s,bn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{zr(t.containerInfo)}catch(v){ue(e,e.return,v)}Rf&&(Rf=!1,ax(e));break;case 4:i=ui,ui=_u(e.stateNode.containerInfo),Sn(t,e),bn(e),ui=i;break;case 12:Sn(t,e),bn(e);break;case 31:Sn(t,e),bn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wc(e,i)));break;case 13:Sn(t,e),bn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Iu=On()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wc(e,i)));break;case 22:s=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=ji,d=Ge;if(ji=c||s,Ge=d||l,Sn(t,e),Ge=d,ji=c,bn(e),i&8192)t:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(n===null||l||ji||Ge||ba(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,s)r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(v){ue(l,l.return,v)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=s?"":l.memoizedProps}catch(v){ue(l,l.return,v)}}}else if(t.tag===18){if(n===null){l=t;try{var f=l.stateNode;s?Yv(f,!0):Yv(l.stateNode,!1)}catch(v){ue(l,l.return,v)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,wc(e,n))));break;case 19:Sn(t,e),bn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,wc(e,i)));break;case 30:break;case 21:break;default:Sn(t,e),bn(e)}}function bn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Ky(i)){n=i;break}i=i.return}if(n==null)throw Error(J(160));switch(n.tag){case 27:var s=n.stateNode,a=Cf(e);uu(e,a,s);break;case 5:var r=n.stateNode;n.flags&32&&(Ur(r,""),n.flags&=-33);var o=Cf(e);uu(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Cf(e);gp(e,c,l);break;default:throw Error(J(161))}}catch(d){ue(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ax(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ax(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Yi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)$y(e,t.alternate,t),t=t.sibling}function ba(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ys(4,t,t.return),ba(t);break;case 1:Ai(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Jy(t,t.return,n),ba(t);break;case 27:tl(t.stateNode);case 26:case 5:Ai(t,t.return),ba(t);break;case 22:t.memoizedState===null&&ba(t);break;case 30:ba(t);break;default:ba(t)}e=e.sibling}}function Zi(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags;switch(a.tag){case 0:case 11:case 15:Zi(s,a,n),Ml(4,a);break;case 1:if(Zi(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){ue(i,i.return,c)}if(i=a,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)ny(l[s],o)}catch(c){ue(i,i.return,c)}}n&&r&64&&Zy(a),jo(a,a.return);break;case 27:Qy(a);case 26:case 5:Zi(s,a,n),n&&i===null&&r&4&&jy(a),jo(a,a.return);break;case 12:Zi(s,a,n);break;case 31:Zi(s,a,n),n&&r&4&&nx(s,a);break;case 13:Zi(s,a,n),n&&r&4&&ix(s,a);break;case 22:a.memoizedState===null&&Zi(s,a,n),jo(a,a.return);break;case 30:break;default:Zi(s,a,n)}t=t.sibling}}function mm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Sl(n))}function gm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Sl(e))}function ci(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)rx(e,t,n,i),t=t.sibling}function rx(e,t,n,i){var s=t.flags;switch(t.tag){case 0:case 11:case 15:ci(e,t,n,i),s&2048&&Ml(9,t);break;case 1:ci(e,t,n,i);break;case 3:ci(e,t,n,i),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Sl(e)));break;case 12:if(s&2048){ci(e,t,n,i),e=t.stateNode;try{var a=t.memoizedProps,r=a.id,o=a.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){ue(t,t.return,l)}}else ci(e,t,n,i);break;case 31:ci(e,t,n,i);break;case 13:ci(e,t,n,i);break;case 23:break;case 22:a=t.stateNode,r=t.alternate,t.memoizedState!==null?a._visibility&2?ci(e,t,n,i):Ko(e,t):a._visibility&2?ci(e,t,n,i):(a._visibility|=2,lr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),s&2048&&mm(r,t);break;case 24:ci(e,t,n,i),s&2048&&gm(t.alternate,t);break;default:ci(e,t,n,i)}}function lr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:lr(a,r,o,l,s),Ml(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?lr(a,r,o,l,s):Ko(a,r):(d._visibility|=2,lr(a,r,o,l,s)),s&&c&2048&&mm(r.alternate,r);break;case 24:lr(a,r,o,l,s),s&&c&2048&&gm(r.alternate,r);break;default:lr(a,r,o,l,s)}t=t.sibling}}function Ko(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Ko(n,i),s&2048&&mm(i.alternate,i);break;case 24:Ko(n,i),s&2048&&gm(i.alternate,i);break;default:Ko(n,i)}t=t.sibling}}var Ho=8192;function or(e,t,n){if(e.subtreeFlags&Ho)for(e=e.child;e!==null;)ox(e,t,n),e=e.sibling}function ox(e,t,n){switch(e.tag){case 26:or(e,t,n),e.flags&Ho&&e.memoizedState!==null&&RE(n,ui,e.memoizedState,e.memoizedProps);break;case 5:or(e,t,n);break;case 3:case 4:var i=ui;ui=_u(e.stateNode.containerInfo),or(e,t,n),ui=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ho,Ho=16777216,or(e,t,n),Ho=i):or(e,t,n));break;default:or(e,t,n)}}function lx(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Io(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ke=i,ux(i,e)}lx(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)cx(e),e=e.sibling}function cx(e){switch(e.tag){case 0:case 11:case 15:Io(e),e.flags&2048&&Ys(9,e,e.return);break;case 3:Io(e);break;case 12:Io(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,kc(e)):Io(e);break;default:Io(e)}}function kc(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ke=i,ux(i,e)}lx(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ys(8,t,t.return),kc(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,kc(t));break;default:kc(t)}e=e.sibling}}function ux(e,t){for(;Ke!==null;){var n=Ke;switch(n.tag){case 0:case 11:case 15:Ys(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Sl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Ke=i;else t:for(n=e;Ke!==null;){i=Ke;var s=i.sibling,a=i.return;if(tx(i),i===n){Ke=null;break t}if(s!==null){s.return=a,Ke=s;break t}Ke=a}}}var q1={getCacheForType:function(e){var t=rn(ke),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return rn(ke).controller.signal}},Y1=typeof WeakMap=="function"?WeakMap:Map,ie=0,ve=null,Yt=null,Zt=0,ce=0,Un=null,Ls=!1,Xr=!1,vm=!1,os=0,Ne=0,Zs=0,wa=0,_m=0,In=0,Or=0,Qo=null,En=null,vp=!1,Iu=0,hx=0,hu=1/0,du=null,Vs=null,qe=0,Hs=null,Pr=null,ns=0,_p=0,yp=null,dx=null,$o=0,xp=null;function Fn(){return(ie&2)!==0&&Zt!==0?Zt&-Zt:Rt.T!==null?xm():S_()}function fx(){if(In===0)if((Zt&536870912)===0||Jt){var e=vc;vc<<=1,(vc&3932160)===0&&(vc=262144),In=e}else In=536870912;return e=Vn.current,e!==null&&(e.flags|=32),In}function Tn(e,t,n){(e===ve&&(ce===2||ce===9)||e.cancelPendingCommit!==null)&&(Br(e,0),Is(e,Zt,In,!1)),_l(e,n),((ie&2)===0||e!==ve)&&(e===ve&&((ie&2)===0&&(wa|=n),Ne===4&&Is(e,Zt,In,!1)),Ri(e))}function px(e,t,n){if((ie&6)!==0)throw Error(J(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||vl(e,t),s=i?j1(e,t):Df(e,t,!0),a=i;do{if(s===0){Xr&&!i&&Is(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!Z1(n)){s=Df(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=Qo;var l=o.current.memoizedState.isDehydrated;if(l&&(Br(o,r).flags|=256),r=Df(o,r,!1),r!==2){if(vm&&!l){o.errorRecoveryDisabledLanes|=a,wa|=a,s=4;break t}a=En,En=s,a!==null&&(En===null?En=a:En.push.apply(En,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Br(e,0),Is(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(J(345));case 4:if((t&4194048)!==t)break;case 6:Is(i,t,In,!Ls);break t;case 2:En=null;break;case 3:case 5:break;default:throw Error(J(329))}if((t&62914560)===t&&(s=Iu+300-On(),10<s)){if(Is(i,t,In,!Ls),Mu(i,0,!0)!==0)break t;ns=t,i.timeoutHandle=Ix(Nv.bind(null,i,n,En,du,vp,t,In,wa,Or,Ls,a,"Throttled",-0,0),s);break t}Nv(i,n,En,du,vp,t,In,wa,Or,Ls,a,null,-0,0)}}break}while(!0);Ri(e)}function Nv(e,t,n,i,s,a,r,o,l,c,d,p,u,f){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},ox(t,a,p);var v=(a&62914560)===a?Iu-On():(a&4194048)===a?hx-On():0;if(v=DE(p,v),v!==null){ns=a,e.cancelPendingCommit=v(Iv.bind(null,e,t,a,n,i,s,r,o,l,d,p,null,u,f)),Is(e,a,r,!c);return}}Iv(e,t,a,n,i,s,r,o,l)}function Z1(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!zn(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Is(e,t,n,i){t&=~_m,t&=~wa,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-Bn(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&__(e,n,t)}function Ou(){return(ie&6)===0?(El(0,!1),!1):!0}function ym(){if(Yt!==null){if(ce===0)var e=Yt.return;else e=Yt,$i=Ba=null,sm(e),Ar=null,ol=0,e=Yt;for(;e!==null;)Yy(e.alternate,e),e=e.return;Yt=null}}function Br(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,dE(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ns=0,ym(),ve=e,Yt=n=ts(e.current,null),Zt=t,ce=0,Un=null,Ls=!1,Xr=vl(e,t),vm=!1,Or=In=_m=wa=Zs=Ne=0,En=Qo=null,vp=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var s=31-Bn(i),a=1<<s;t|=e[s],i&=~a}return os=t,wu(),n}function mx(e,t){Vt=null,Rt.H=cl,t===kr||t===Ru?(t=uv(),ce=3):t===Kp?(t=uv(),ce=4):ce=t===fm?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Un=t,Yt===null&&(Ne=1,lu(e,ti(t,e.current)))}function gx(){var e=Vn.current;return e===null?!0:(Zt&4194048)===Zt?ni===null:(Zt&62914560)===Zt||(Zt&536870912)!==0?e===ni:!1}function vx(){var e=Rt.H;return Rt.H=cl,e===null?cl:e}function _x(){var e=Rt.A;return Rt.A=q1,e}function fu(){Ne=4,Ls||(Zt&4194048)!==Zt&&Vn.current!==null||(Xr=!0),(Zs&134217727)===0&&(wa&134217727)===0||ve===null||Is(ve,Zt,In,!1)}function Df(e,t,n){var i=ie;ie|=2;var s=vx(),a=_x();(ve!==e||Zt!==t)&&(du=null,Br(e,t)),t=!1;var r=Ne;t:do try{if(ce!==0&&Yt!==null){var o=Yt,l=Un;switch(ce){case 8:ym(),r=6;break t;case 3:case 2:case 9:case 6:Vn.current===null&&(t=!0);var c=ce;if(ce=0,Un=null,Sr(e,o,l,c),n&&Xr){r=0;break t}break;default:c=ce,ce=0,Un=null,Sr(e,o,l,c)}}J1(),r=Ne;break}catch(d){mx(e,d)}while(!0);return t&&e.shellSuspendCounter++,$i=Ba=null,ie=i,Rt.H=s,Rt.A=a,Yt===null&&(ve=null,Zt=0,wu()),r}function J1(){for(;Yt!==null;)yx(Yt)}function j1(e,t){var n=ie;ie|=2;var i=vx(),s=_x();ve!==e||Zt!==t?(du=null,hu=On()+500,Br(e,t)):Xr=vl(e,t);t:do try{if(ce!==0&&Yt!==null){t=Yt;var a=Un;e:switch(ce){case 1:ce=0,Un=null,Sr(e,t,a,1);break;case 2:case 9:if(cv(a)){ce=0,Un=null,Lv(t);break}t=function(){ce!==2&&ce!==9||ve!==e||(ce=7),Ri(e)},a.then(t,t);break t;case 3:ce=7;break t;case 4:ce=5;break t;case 7:cv(a)?(ce=0,Un=null,Lv(t)):(ce=0,Un=null,Sr(e,t,a,7));break;case 5:var r=null;switch(Yt.tag){case 26:r=Yt.memoizedState;case 5:case 27:var o=Yt;if(r?zx(r):o.stateNode.complete){ce=0,Un=null;var l=o.sibling;if(l!==null)Yt=l;else{var c=o.return;c!==null?(Yt=c,Pu(c)):Yt=null}break e}}ce=0,Un=null,Sr(e,t,a,5);break;case 6:ce=0,Un=null,Sr(e,t,a,6);break;case 8:ym(),Ne=6;break t;default:throw Error(J(462))}}K1();break}catch(d){mx(e,d)}while(!0);return $i=Ba=null,Rt.H=i,Rt.A=s,ie=n,Yt!==null?0:(ve=null,Zt=0,wu(),Ne)}function K1(){for(;Yt!==null&&!xM();)yx(Yt)}function yx(e){var t=qy(e.alternate,e,os);e.memoizedProps=e.pendingProps,t===null?Pu(e):Yt=t}function Lv(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Av(n,t,t.pendingProps,t.type,void 0,Zt);break;case 11:t=Av(n,t,t.pendingProps,t.type.render,t.ref,Zt);break;case 5:sm(t);default:Yy(n,t),t=Yt=Y_(t,os),t=qy(n,t,os)}e.memoizedProps=e.pendingProps,t===null?Pu(e):Yt=t}function Sr(e,t,n,i){$i=Ba=null,sm(t),Ar=null,ol=0;var s=t.return;try{if(z1(e,s,t,n,Zt)){Ne=1,lu(e,ti(n,e.current)),Yt=null;return}}catch(a){if(s!==null)throw Yt=s,a;Ne=1,lu(e,ti(n,e.current)),Yt=null;return}t.flags&32768?(Jt||i===1?e=!0:Xr||(Zt&536870912)!==0?e=!1:(Ls=e=!0,(i===2||i===9||i===3||i===6)&&(i=Vn.current,i!==null&&i.tag===13&&(i.flags|=16384))),xx(t,e)):Pu(t)}function Pu(e){var t=e;do{if((t.flags&32768)!==0){xx(t,Ls);return}e=t.return;var n=G1(t.alternate,t,os);if(n!==null){Yt=n;return}if(t=t.sibling,t!==null){Yt=t;return}Yt=t=e}while(t!==null);Ne===0&&(Ne=5)}function xx(e,t){do{var n=k1(e.alternate,e);if(n!==null){n.flags&=32767,Yt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Yt=e;return}Yt=e=n}while(e!==null);Ne=6,Yt=null}function Iv(e,t,n,i,s,a,r,o,l){e.cancelPendingCommit=null;do Bu();while(qe!==0);if((ie&6)!==0)throw Error(J(327));if(t!==null){if(t===e.current)throw Error(J(177));if(a=t.lanes|t.childLanes,a|=Xp,DM(e,n,a,r,o,l),e===ve&&(Yt=ve=null,Zt=0),Pr=t,Hs=e,ns=n,_p=a,yp=s,dx=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,eE(Kc,function(){return Tx(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Rt.T,Rt.T=null,s=se.p,se.p=2,r=ie,ie|=4;try{X1(e,t,n)}finally{ie=r,se.p=s,Rt.T=i}}qe=1,Sx(),bx(),Mx()}}function Sx(){if(qe===1){qe=0;var e=Hs,t=Pr,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=Rt.T,Rt.T=null;var i=se.p;se.p=2;var s=ie;ie|=4;try{sx(t,e);var a=Ep,r=z_(e.containerInfo),o=a.focusedElem,l=a.selectionRange;if(r!==o&&o&&o.ownerDocument&&F_(o.ownerDocument.documentElement,o)){if(l!==null&&kp(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var f=u.getSelection(),v=o.textContent.length,b=Math.min(l.start,v),g=l.end===void 0?b:Math.min(l.end,v);!f.extend&&b>g&&(r=g,g=b,b=r);var h=nv(o,b),m=nv(o,g);if(h&&m&&(f.rangeCount!==1||f.anchorNode!==h.node||f.anchorOffset!==h.offset||f.focusNode!==m.node||f.focusOffset!==m.offset)){var _=p.createRange();_.setStart(h.node,h.offset),f.removeAllRanges(),b>g?(f.addRange(_),f.extend(m.node,m.offset)):(_.setEnd(m.node,m.offset),f.addRange(_))}}}}for(p=[],f=o;f=f.parentNode;)f.nodeType===1&&p.push({element:f,left:f.scrollLeft,top:f.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var S=p[o];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}Su=!!Mp,Ep=Mp=null}finally{ie=s,se.p=i,Rt.T=n}}e.current=t,qe=2}}function bx(){if(qe===2){qe=0;var e=Hs,t=Pr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Rt.T,Rt.T=null;var i=se.p;se.p=2;var s=ie;ie|=4;try{$y(e,t.alternate,t)}finally{ie=s,se.p=i,Rt.T=n}}qe=3}}function Mx(){if(qe===4||qe===3){qe=0,SM();var e=Hs,t=Pr,n=ns,i=dx;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?qe=5:(qe=0,Pr=Hs=null,Ex(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(Vs=null),Pp(n),t=t.stateNode,Pn&&typeof Pn.onCommitFiberRoot=="function")try{Pn.onCommitFiberRoot(gl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Rt.T,s=se.p,se.p=2,Rt.T=null;try{for(var a=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];a(o.value,{componentStack:o.stack})}}finally{Rt.T=t,se.p=s}}(ns&3)!==0&&Bu(),Ri(e),s=e.pendingLanes,(n&261930)!==0&&(s&42)!==0?e===xp?$o++:($o=0,xp=e):$o=0,El(0,!1)}}function Ex(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Sl(t)))}function Bu(){return Sx(),bx(),Mx(),Tx()}function Tx(){if(qe!==5)return!1;var e=Hs,t=_p;_p=0;var n=Pp(ns),i=Rt.T,s=se.p;try{se.p=32>n?32:n,Rt.T=null,n=yp,yp=null;var a=Hs,r=ns;if(qe=0,Pr=Hs=null,ns=0,(ie&6)!==0)throw Error(J(331));var o=ie;if(ie|=4,cx(a.current),rx(a,a.current,r,n),ie=o,El(0,!1),Pn&&typeof Pn.onPostCommitFiberRoot=="function")try{Pn.onPostCommitFiberRoot(gl,a)}catch{}return!0}finally{se.p=s,Rt.T=i,Ex(e,t)}}function Ov(e,t,n){t=ti(n,t),t=fp(e.stateNode,t,2),e=zs(e,t,2),e!==null&&(_l(e,2),Ri(e))}function ue(e,t,n){if(e.tag===3)Ov(e,e,n);else for(;t!==null;){if(t.tag===3){Ov(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Vs===null||!Vs.has(i))){e=ti(n,e),n=Vy(2),i=zs(t,n,2),i!==null&&(Hy(n,i,t,e),_l(i,2),Ri(i));break}}t=t.return}}function Uf(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Y1;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(vm=!0,s.add(n),e=Q1.bind(null,e,t,n),t.then(e,e))}function Q1(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ve===e&&(Zt&n)===n&&(Ne===4||Ne===3&&(Zt&62914560)===Zt&&300>On()-Iu?(ie&2)===0&&Br(e,0):_m|=n,Or===Zt&&(Or=0)),Ri(e)}function Ax(e,t){t===0&&(t=v_()),e=Pa(e,t),e!==null&&(_l(e,t),Ri(e))}function $1(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ax(e,n)}function tE(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(J(314))}i!==null&&i.delete(t),Ax(e,n)}function eE(e,t){return Ip(e,t)}var pu=null,cr=null,Sp=!1,mu=!1,Nf=!1,Os=0;function Ri(e){e!==cr&&e.next===null&&(cr===null?pu=cr=e:cr=cr.next=e),mu=!0,Sp||(Sp=!0,iE())}function El(e,t){if(!Nf&&mu){Nf=!0;do for(var n=!1,i=pu;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-Bn(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Pv(i,a))}else a=Zt,a=Mu(i,i===ve?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||vl(i,a)||(n=!0,Pv(i,a));i=i.next}while(n);Nf=!1}}function nE(){wx()}function wx(){mu=Sp=!1;var e=0;Os!==0&&hE()&&(e=Os);for(var t=On(),n=null,i=pu;i!==null;){var s=i.next,a=Cx(i,t);a===0?(i.next=null,n===null?pu=s:n.next=s,s===null&&(cr=n)):(n=i,(e!==0||(a&3)!==0)&&(mu=!0)),i=s}qe!==0&&qe!==5||El(e,!1),Os!==0&&(Os=0)}function Cx(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-Bn(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=RM(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=ve,n=Zt,n=Mu(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ce===2||ce===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&of(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||vl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&of(i),Pp(n)){case 2:case 8:n=m_;break;case 32:n=Kc;break;case 268435456:n=g_;break;default:n=Kc}return i=Rx.bind(null,e),n=Ip(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&of(i),e.callbackPriority=2,e.callbackNode=null,2}function Rx(e,t){if(qe!==0&&qe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var i=Zt;return i=Mu(e,e===ve?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(px(e,i,t),Cx(e,On()),e.callbackNode!=null&&e.callbackNode===n?Rx.bind(null,e):null)}function Pv(e,t){if(Bu())return null;px(e,t,!0)}function iE(){fE(function(){(ie&6)!==0?Ip(p_,nE):wx()})}function xm(){if(Os===0){var e=Nr;e===0&&(e=gc,gc<<=1,(gc&261888)===0&&(gc=256)),Os=e}return Os}function Bv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ic(""+e)}function Fv(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function sE(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=Bv((s[An]||null).action),r=i.submitter;r&&(t=(t=r[An]||null)?Bv(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Eu("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Os!==0){var l=r?Fv(s,r):new FormData(s);hp(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=r?Fv(s,r):new FormData(s),hp(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Cc=0;Cc<$f.length;Cc++)Rc=$f[Cc],zv=Rc.toLowerCase(),Vv=Rc[0].toUpperCase()+Rc.slice(1),hi(zv,"on"+Vv);var Rc,zv,Vv,Cc;hi(H_,"onAnimationEnd");hi(G_,"onAnimationIteration");hi(k_,"onAnimationStart");hi("dblclick","onDoubleClick");hi("focusin","onFocus");hi("focusout","onBlur");hi(b1,"onTransitionRun");hi(M1,"onTransitionStart");hi(E1,"onTransitionCancel");hi(X_,"onTransitionEnd");Dr("onMouseEnter",["mouseout","mouseover"]);Dr("onMouseLeave",["mouseout","mouseover"]);Dr("onPointerEnter",["pointerout","pointerover"]);Dr("onPointerLeave",["pointerout","pointerover"]);La("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));La("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));La("onBeforeInput",["compositionend","keypress","textInput","paste"]);La("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));La("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));La("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ul="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),aE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ul));function Dx(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){$c(d)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){$c(d)}s.currentTarget=null,a=l}}}}function qt(e,t){var n=t[Wf];n===void 0&&(n=t[Wf]=new Set);var i=e+"__bubble";n.has(i)||(Ux(t,e,2,!1),n.add(i))}function Lf(e,t,n){var i=0;t&&(i|=4),Ux(n,e,i,t)}var Dc="_reactListening"+Math.random().toString(36).slice(2);function Sm(e){if(!e[Dc]){e[Dc]=!0,b_.forEach(function(n){n!=="selectionchange"&&(aE.has(n)||Lf(n,!1,e),Lf(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Dc]||(t[Dc]=!0,Lf("selectionchange",!1,t))}}function Ux(e,t,n,i){switch(Xx(t)){case 2:var s=LE;break;case 8:s=IE;break;default:s=Tm}n=s.bind(null,t,n,e),s=void 0,!jf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function If(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=dr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}D_(function(){var c=a,d=zp(n),p=[];t:{var u=W_.get(e);if(u!==void 0){var f=Eu,v=e;switch(e){case"keypress":if(Pc(n)===0)break t;case"keydown":case"keyup":f=t1;break;case"focusin":v="focus",f=df;break;case"focusout":v="blur",f=df;break;case"beforeblur":case"afterblur":f=df;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=Y0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=GM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=i1;break;case H_:case G_:case k_:f=WM;break;case X_:f=a1;break;case"scroll":case"scrollend":f=VM;break;case"wheel":f=o1;break;case"copy":case"cut":case"paste":f=YM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=J0;break;case"toggle":case"beforetoggle":f=c1}var b=(t&4)!==0,g=!b&&(e==="scroll"||e==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var m=c,_;m!==null;){var S=m;if(_=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||_===null||h===null||(S=nl(m,h),S!=null&&b.push(hl(m,S,_))),g)break;m=m.return}0<b.length&&(u=new f(u,v,null,n,d),p.push({event:u,listeners:b}))}}if((t&7)===0){t:{if(u=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",u&&n!==Jf&&(v=n.relatedTarget||n.fromElement)&&(dr(v)||v[Vr]))break t;if((f||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,f?(v=n.relatedTarget||n.toElement,f=c,v=v?dr(v):null,v!==null&&(g=ml(v),b=v.tag,v!==g||b!==5&&b!==27&&b!==6)&&(v=null)):(f=null,v=c),f!==v)){if(b=Y0,S="onMouseLeave",h="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(b=J0,S="onPointerLeave",h="onPointerEnter",m="pointer"),g=f==null?u:zo(f),_=v==null?u:zo(v),u=new b(S,m+"leave",f,n,d),u.target=g,u.relatedTarget=_,S=null,dr(d)===c&&(b=new b(h,m+"enter",v,n,d),b.target=_,b.relatedTarget=g,S=b),g=S,f&&v)e:{for(b=rE,h=f,m=v,_=0,S=h;S;S=b(S))_++;S=0;for(var w=m;w;w=b(w))S++;for(;0<_-S;)h=b(h),_--;for(;0<S-_;)m=b(m),S--;for(;_--;){if(h===m||m!==null&&h===m.alternate){b=h;break e}h=b(h),m=b(m)}b=null}else b=null;f!==null&&Hv(p,u,f,b,!1),v!==null&&g!==null&&Hv(p,g,v,b,!0)}}t:{if(u=c?zo(c):window,f=u.nodeName&&u.nodeName.toLowerCase(),f==="select"||f==="input"&&u.type==="file")var C=$0;else if(Q0(u))if(P_)C=y1;else{C=v1;var T=g1}else f=u.nodeName,!f||f.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Fp(c.elementType)&&(C=$0):C=_1;if(C&&(C=C(e,c))){O_(p,C,n,d);break t}T&&T(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&Zf(u,"number",u.value)}switch(T=c?zo(c):window,e){case"focusin":(Q0(T)||T.contentEditable==="true")&&(mr=T,Kf=c,Xo=null);break;case"focusout":Xo=Kf=mr=null;break;case"mousedown":Qf=!0;break;case"contextmenu":case"mouseup":case"dragend":Qf=!1,iv(p,n,d);break;case"selectionchange":if(S1)break;case"keydown":case"keyup":iv(p,n,d)}var x;if(Gp)t:{switch(e){case"compositionstart":var E="onCompositionStart";break t;case"compositionend":E="onCompositionEnd";break t;case"compositionupdate":E="onCompositionUpdate";break t}E=void 0}else pr?L_(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(N_&&n.locale!=="ko"&&(pr||E!=="onCompositionStart"?E==="onCompositionEnd"&&pr&&(x=U_()):(Ns=d,Vp="value"in Ns?Ns.value:Ns.textContent,pr=!0)),T=gu(c,E),0<T.length&&(E=new Z0(E,e,null,n,d),p.push({event:E,listeners:T}),x?E.data=x:(x=I_(n),x!==null&&(E.data=x)))),(x=h1?d1(e,n):f1(e,n))&&(E=gu(c,"onBeforeInput"),0<E.length&&(T=new Z0("onBeforeInput","beforeinput",null,n,d),p.push({event:T,listeners:E}),T.data=x)),sE(p,e,c,n,d)}Dx(p,t)})}function hl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function gu(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=nl(e,n),s!=null&&i.unshift(hl(e,s,a)),s=nl(e,t),s!=null&&i.push(hl(e,s,a))),e.tag===3)return i;e=e.return}return[]}function rE(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Hv(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=nl(n,a),c!=null&&r.unshift(hl(n,c,l))):s||(c=nl(n,a),c!=null&&r.push(hl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var oE=/\r\n?/g,lE=/\u0000|\uFFFD/g;function Gv(e){return(typeof e=="string"?e:""+e).replace(oE,`
`).replace(lE,"")}function Nx(e,t){return t=Gv(t),Gv(e)===t}function fe(e,t,n,i,s,a){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Ur(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Ur(e,""+i);break;case"className":yc(e,"class",i);break;case"tabIndex":yc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":yc(e,n,i);break;case"style":R_(e,i,a);break;case"data":if(t!=="object"){yc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ic(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&fe(e,t,"name",s.name,s,null),fe(e,t,"formEncType",s.formEncType,s,null),fe(e,t,"formMethod",s.formMethod,s,null),fe(e,t,"formTarget",s.formTarget,s,null)):(fe(e,t,"encType",s.encType,s,null),fe(e,t,"method",s.method,s,null),fe(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ic(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Qi);break;case"onScroll":i!=null&&qt("scroll",e);break;case"onScrollEnd":i!=null&&qt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(J(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Ic(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":qt("beforetoggle",e),qt("toggle",e),Lc(e,"popover",i);break;case"xlinkActuate":Xi(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Xi(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Xi(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Xi(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Xi(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Xi(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Xi(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Xi(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Xi(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Lc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=FM.get(n)||n,Lc(e,n,i))}}function bp(e,t,n,i,s,a){switch(n){case"style":R_(e,i,a);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(J(60));e.innerHTML=n}}break;case"children":typeof i=="string"?Ur(e,i):(typeof i=="number"||typeof i=="bigint")&&Ur(e,""+i);break;case"onScroll":i!=null&&qt("scroll",e);break;case"onScrollEnd":i!=null&&qt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!M_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),t=n.slice(2,s?n.length-7:void 0),a=e[An]||null,a=a!=null?a[n]:null,typeof a=="function"&&e.removeEventListener(t,a,s),typeof i=="function")){typeof a!="function"&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,s);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Lc(e,n,i)}}}function on(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":qt("error",e),qt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:fe(e,t,a,r,n,null)}}s&&fe(e,t,"srcSet",n.srcSet,n,null),i&&fe(e,t,"src",n.src,n,null);return;case"input":qt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":s=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":a=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(J(137,t));break;default:fe(e,t,i,d,n,null)}}A_(e,a,o,l,c,r,s,!1);return;case"select":qt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:fe(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?Mr(e,!!i,t,!1):n!=null&&Mr(e,!!i,n,!0);return;case"textarea":qt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(J(91));break;default:fe(e,t,r,o,n,null)}C_(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":fe(e,t,l,i,n,null));return;case"dialog":qt("beforetoggle",e),qt("toggle",e),qt("cancel",e),qt("close",e);break;case"iframe":case"object":qt("load",e);break;case"video":case"audio":for(i=0;i<ul.length;i++)qt(ul[i],e);break;case"image":qt("error",e),qt("load",e);break;case"details":qt("toggle",e);break;case"embed":case"source":case"link":qt("error",e),qt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:fe(e,t,c,i,n,null)}return;default:if(Fp(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&bp(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&fe(e,t,o,i,n,null))}function cE(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,d=null;for(f in n){var p=n[f];if(n.hasOwnProperty(f)&&p!=null)switch(f){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(f)||fe(e,t,f,null,i,p)}}for(var u in i){var f=i[u];if(p=n[u],i.hasOwnProperty(u)&&(f!=null||p!=null))switch(u){case"type":a=f;break;case"name":s=f;break;case"checked":c=f;break;case"defaultChecked":d=f;break;case"value":r=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(J(137,t));break;default:f!==p&&fe(e,t,u,f,i,p)}}Yf(e,r,o,l,c,d,a,s);return;case"select":f=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":f=l;default:i.hasOwnProperty(a)||fe(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":u=a;break;case"defaultValue":o=a;break;case"multiple":r=a;default:a!==l&&fe(e,t,s,a,i,l)}t=o,n=r,i=f,u!=null?Mr(e,!!n,u,!1):!!i!=!!n&&(t!=null?Mr(e,!!n,t,!0):Mr(e,!!n,n?[]:"",!1));return;case"textarea":f=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:fe(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":u=s;break;case"defaultValue":f=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(J(91));break;default:s!==a&&fe(e,t,r,s,i,a)}w_(e,u,f);return;case"option":for(var v in n)u=n[v],n.hasOwnProperty(v)&&u!=null&&!i.hasOwnProperty(v)&&(v==="selected"?e.selected=!1:fe(e,t,v,null,i,u));for(l in i)u=i[l],f=n[l],i.hasOwnProperty(l)&&u!==f&&(u!=null||f!=null)&&(l==="selected"?e.selected=u&&typeof u!="function"&&typeof u!="symbol":fe(e,t,l,u,i,f));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&fe(e,t,b,null,i,u);for(c in i)if(u=i[c],f=n[c],i.hasOwnProperty(c)&&u!==f&&(u!=null||f!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(J(137,t));break;default:fe(e,t,c,u,i,f)}return;default:if(Fp(t)){for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!==void 0&&!i.hasOwnProperty(g)&&bp(e,t,g,void 0,i,u);for(d in i)u=i[d],f=n[d],!i.hasOwnProperty(d)||u===f||u===void 0&&f===void 0||bp(e,t,d,u,i,f);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&fe(e,t,h,null,i,u);for(p in i)u=i[p],f=n[p],!i.hasOwnProperty(p)||u===f||u==null&&f==null||fe(e,t,p,u,i,f)}function kv(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function uE(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&kv(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,p=l.initiatorType;d&&kv(p)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Mp=null,Ep=null;function vu(e){return e.nodeType===9?e:e.ownerDocument}function Xv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Lx(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Tp(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Of=null;function hE(){var e=window.event;return e&&e.type==="popstate"?e===Of?!1:(Of=e,!0):(Of=null,!1)}var Ix=typeof setTimeout=="function"?setTimeout:void 0,dE=typeof clearTimeout=="function"?clearTimeout:void 0,Wv=typeof Promise=="function"?Promise:void 0,fE=typeof queueMicrotask=="function"?queueMicrotask:typeof Wv<"u"?function(e){return Wv.resolve(null).then(e).catch(pE)}:Ix;function pE(e){setTimeout(function(){throw e})}function js(e){return e==="head"}function qv(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),zr(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")tl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,tl(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[yl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&tl(e.ownerDocument.body);n=s}while(n);zr(t)}function Yv(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function Ap(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ap(n),Bp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function mE(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[yl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=ii(e.nextSibling),e===null)break}return null}function gE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ii(e.nextSibling),e===null))return null;return e}function Ox(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ii(e.nextSibling),e===null))return null;return e}function wp(e){return e.data==="$?"||e.data==="$~"}function Cp(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function vE(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function ii(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Rp=null;function Zv(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return ii(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Jv(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Px(e,t,n){switch(t=vu(n),e){case"html":if(e=t.documentElement,!e)throw Error(J(452));return e;case"head":if(e=t.head,!e)throw Error(J(453));return e;case"body":if(e=t.body,!e)throw Error(J(454));return e;default:throw Error(J(451))}}function tl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bp(e)}var si=new Map,jv=new Set;function _u(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ls=se.d;se.d={f:_E,r:yE,D:xE,C:SE,L:bE,m:ME,X:TE,S:EE,M:AE};function _E(){var e=ls.f(),t=Ou();return e||t}function yE(e){var t=Hr(e);t!==null&&t.tag===5&&t.type==="form"?Ry(t):ls.r(e)}var Wr=typeof document>"u"?null:document;function Bx(e,t,n){var i=Wr;if(i&&typeof t=="string"&&t){var s=$n(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),jv.has(s)||(jv.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function xE(e){ls.D(e),Bx("dns-prefetch",e,null)}function SE(e,t){ls.C(e,t),Bx("preconnect",e,t)}function bE(e,t,n){ls.L(e,t,n);var i=Wr;if(i&&e&&t){var s='link[rel="preload"][as="'+$n(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+$n(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+$n(n.imageSizes)+'"]')):s+='[href="'+$n(e)+'"]';var a=s;switch(t){case"style":a=Fr(e);break;case"script":a=qr(e)}si.has(a)||(e=Te({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),si.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Tl(a))||t==="script"&&i.querySelector(Al(a))||(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function ME(e,t){ls.m(e,t);var n=Wr;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+$n(i)+'"][href="'+$n(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=qr(e)}if(!si.has(a)&&(e=Te({rel:"modulepreload",href:e},t),si.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(a)))return}i=n.createElement("link"),on(i,"link",e),Qe(i),n.head.appendChild(i)}}}function EE(e,t,n){ls.S(e,t,n);var i=Wr;if(i&&e){var s=br(i).hoistableStyles,a=Fr(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Tl(a)))o.loading=5;else{e=Te({rel:"stylesheet",href:e,"data-precedence":t},n),(n=si.get(a))&&bm(e,n);var l=r=i.createElement("link");Qe(l),on(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Xc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function TE(e,t){ls.X(e,t);var n=Wr;if(n&&e){var i=br(n).hoistableScripts,s=qr(e),a=i.get(s);a||(a=n.querySelector(Al(s)),a||(e=Te({src:e,async:!0},t),(t=si.get(s))&&Mm(e,t),a=n.createElement("script"),Qe(a),on(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function AE(e,t){ls.M(e,t);var n=Wr;if(n&&e){var i=br(n).hoistableScripts,s=qr(e),a=i.get(s);a||(a=n.querySelector(Al(s)),a||(e=Te({src:e,async:!0,type:"module"},t),(t=si.get(s))&&Mm(e,t),a=n.createElement("script"),Qe(a),on(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Kv(e,t,n,i){var s=(s=Ps.current)?_u(s):null;if(!s)throw Error(J(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Fr(n.href),n=br(s).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Fr(n.href);var a=br(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Tl(e)))&&!a._p&&(r.instance=a,r.state.loading=5),si.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},si.set(e,n),a||wE(s,e,n,r.state))),t&&i===null)throw Error(J(528,""));return r}if(t&&i!==null)throw Error(J(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=qr(n),n=br(s).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(J(444,e))}}function Fr(e){return'href="'+$n(e)+'"'}function Tl(e){return'link[rel="stylesheet"]['+e+"]"}function Fx(e){return Te({},e,{"data-precedence":e.precedence,precedence:null})}function wE(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),on(t,"link",n),Qe(t),e.head.appendChild(t))}function qr(e){return'[src="'+$n(e)+'"]'}function Al(e){return"script[async]"+e}function Qv(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+$n(n.href)+'"]');if(i)return t.instance=i,Qe(i),i;var s=Te({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Qe(i),on(i,"style",s),Xc(i,n.precedence,e),t.instance=i;case"stylesheet":s=Fr(n.href);var a=e.querySelector(Tl(s));if(a)return t.state.loading|=4,t.instance=a,Qe(a),a;i=Fx(n),(s=si.get(s))&&bm(i,s),a=(e.ownerDocument||e).createElement("link"),Qe(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(a,"link",i),t.state.loading|=4,Xc(a,n.precedence,e),t.instance=a;case"script":return a=qr(n.src),(s=e.querySelector(Al(a)))?(t.instance=s,Qe(s),s):(i=n,(s=si.get(a))&&(i=Te({},n),Mm(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),Qe(s),on(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(J(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Xc(i,n.precedence,e));return t.instance}function Xc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function bm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Mm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Wc=null;function $v(e,t,n){if(Wc===null){var i=new Map,s=Wc=new Map;s.set(n,i)}else s=Wc,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[yl]||a[sn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function t_(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function CE(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function zx(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function RE(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Fr(i.href),a=t.querySelector(Tl(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=yu.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Qe(a);return}a=t.ownerDocument||t,i=Fx(i),(s=si.get(s))&&bm(i,s),a=a.createElement("link"),Qe(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=yu.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Pf=0;function DE(e,t){return e.stylesheets&&e.count===0&&qc(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&qc(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&Pf===0&&(Pf=62500*uE());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&qc(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>Pf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function yu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)qc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var xu=null;function qc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,xu=new Map,t.forEach(UE,e),xu=null,yu.call(e))}function UE(e,t){if(!(t.state.loading&4)){var n=xu.get(e);if(n)var i=n.get(null);else{n=new Map,xu.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=yu.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var dl={$$typeof:Ki,Provider:null,Consumer:null,_currentValue:Ma,_currentValue2:Ma,_threadCount:0};function NE(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=lf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lf(0),this.hiddenUpdates=lf(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function Vx(e,t,n,i,s,a,r,o,l,c,d,p){return e=new NE(e,t,n,r,l,c,d,p,o),t=1,a===!0&&(t|=24),a=Ln(3,null,null,t),e.current=a,a.stateNode=e,t=Jp(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},Qp(a),e}function Hx(e){return e?(e=_r,e):_r}function Gx(e,t,n,i,s,a){s=Hx(s),i.context===null?i.context=s:i.pendingContext=s,i=Fs(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=zs(e,i,t),n!==null&&(Tn(n,e,t),qo(n,e,t))}function e_(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Em(e,t){e_(e,t),(e=e.alternate)&&e_(e,t)}function kx(e){if(e.tag===13||e.tag===31){var t=Pa(e,67108864);t!==null&&Tn(t,e,67108864),Em(e,67108864)}}function n_(e){if(e.tag===13||e.tag===31){var t=Fn();t=Op(t);var n=Pa(e,t);n!==null&&Tn(n,e,t),Em(e,t)}}var Su=!0;function LE(e,t,n,i){var s=Rt.T;Rt.T=null;var a=se.p;try{se.p=2,Tm(e,t,n,i)}finally{se.p=a,Rt.T=s}}function IE(e,t,n,i){var s=Rt.T;Rt.T=null;var a=se.p;try{se.p=8,Tm(e,t,n,i)}finally{se.p=a,Rt.T=s}}function Tm(e,t,n,i){if(Su){var s=Dp(i);if(s===null)If(e,t,i,bu,n),i_(e,i);else if(PE(s,e,t,n,i))i.stopPropagation();else if(i_(e,i),t&4&&-1<OE.indexOf(e)){for(;s!==null;){var a=Hr(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=xa(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Bn(r);o.entanglements[1]|=l,r&=~l}Ri(a),(ie&6)===0&&(hu=On()+500,El(0,!1))}}break;case 31:case 13:o=Pa(a,2),o!==null&&Tn(o,a,2),Ou(),Em(a,2)}if(a=Dp(i),a===null&&If(e,t,i,bu,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else If(e,t,i,null,n)}}function Dp(e){return e=zp(e),Am(e)}var bu=null;function Am(e){if(bu=null,e=dr(e),e!==null){var t=ml(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=c_(t),e!==null)return e;e=null}else if(n===31){if(e=u_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return bu=e,null}function Xx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bM()){case p_:return 2;case m_:return 8;case Kc:case MM:return 32;case g_:return 268435456;default:return 32}default:return 32}}var Up=!1,Gs=null,ks=null,Xs=null,fl=new Map,pl=new Map,Ds=[],OE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function i_(e,t){switch(e){case"focusin":case"focusout":Gs=null;break;case"dragenter":case"dragleave":ks=null;break;case"mouseover":case"mouseout":Xs=null;break;case"pointerover":case"pointerout":fl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pl.delete(t.pointerId)}}function Oo(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Hr(t),t!==null&&kx(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function PE(e,t,n,i,s){switch(t){case"focusin":return Gs=Oo(Gs,e,t,n,i,s),!0;case"dragenter":return ks=Oo(ks,e,t,n,i,s),!0;case"mouseover":return Xs=Oo(Xs,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return fl.set(a,Oo(fl.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,pl.set(a,Oo(pl.get(a)||null,e,t,n,i,s)),!0}return!1}function Wx(e){var t=dr(e.target);if(t!==null){var n=ml(t);if(n!==null){if(t=n.tag,t===13){if(t=c_(n),t!==null){e.blockedOn=t,V0(e.priority,function(){n_(n)});return}}else if(t===31){if(t=u_(n),t!==null){e.blockedOn=t,V0(e.priority,function(){n_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Yc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Jf=i,n.target.dispatchEvent(i),Jf=null}else return t=Hr(n),t!==null&&kx(t),e.blockedOn=n,!1;t.shift()}return!0}function s_(e,t,n){Yc(e)&&n.delete(t)}function BE(){Up=!1,Gs!==null&&Yc(Gs)&&(Gs=null),ks!==null&&Yc(ks)&&(ks=null),Xs!==null&&Yc(Xs)&&(Xs=null),fl.forEach(s_),pl.forEach(s_)}function Uc(e,t){e.blockedOn===t&&(e.blockedOn=null,Up||(Up=!0,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,BE)))}var Nc=null;function a_(e){Nc!==e&&(Nc=e,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,function(){Nc===e&&(Nc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Am(i||n)===null)continue;break}var a=Hr(n);a!==null&&(e.splice(t,3),t-=3,hp(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function zr(e){function t(l){return Uc(l,e)}Gs!==null&&Uc(Gs,e),ks!==null&&Uc(ks,e),Xs!==null&&Uc(Xs,e),fl.forEach(t),pl.forEach(t);for(var n=0;n<Ds.length;n++){var i=Ds[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Ds.length&&(n=Ds[0],n.blockedOn===null);)Wx(n),n.blockedOn===null&&Ds.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[An]||null;if(typeof a=="function")r||a_(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[An]||null)o=r.formAction;else if(Am(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),a_(n)}}}function qx(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function wm(e){this._internalRoot=e}Fu.prototype.render=wm.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));var n=t.current,i=Fn();Gx(n,i,e,t,null,null)};Fu.prototype.unmount=wm.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Gx(e.current,2,null,e,null,null),Ou(),t[Vr]=null}};function Fu(e){this._internalRoot=e}Fu.prototype.unstable_scheduleHydration=function(e){if(e){var t=S_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ds.length&&t!==0&&t<Ds[n].priority;n++);Ds.splice(n,0,e),n===0&&Wx(e)}};var r_=o_.version;if(r_!=="19.2.4")throw Error(J(527,r_,"19.2.4"));se.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=mM(t),e=e!==null?h_(e):null,e=e===null?null:e.stateNode,e};var FE={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Rt,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Po=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Po.isDisabled&&Po.supportsFiber))try{gl=Po.inject(FE),Pn=Po}catch{}var Po;zu.createRoot=function(e,t){if(!l_(e))throw Error(J(299));var n=!1,i="",s=By,a=Fy,r=zy;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Vx(e,1,!1,null,null,n,i,null,s,a,r,qx),e[Vr]=t.current,Sm(e),new wm(t)};zu.hydrateRoot=function(e,t,n){if(!l_(e))throw Error(J(299));var i=!1,s="",a=By,r=Fy,o=zy,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Vx(e,1,!0,t,n??null,i,s,l,a,r,o,qx),t.context=Hx(null),n=t.current,i=Fn(),i=Op(i),s=Fs(i),s.callback=null,zs(n,s,i),n=i,t.current.lanes=n,_l(t,n),Ri(t),e[Vr]=t.current,Sm(e),new Fu(t)};zu.version="19.2.4"});var jx=bi((x2,Jx)=>{"use strict";function Zx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zx)}catch(e){console.error(e)}}Zx(),Jx.exports=Yx()});var Db=bi(Bd=>{"use strict";var a2=Symbol.for("react.transitional.element"),r2=Symbol.for("react.fragment");function Rb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:a2,type:e,key:i,ref:t!==void 0?t:null,props:n}}Bd.Fragment=r2;Bd.jsx=Rb;Bd.jsxs=Rb});var oc=bi((nN,Ub)=>{"use strict";Ub.exports=Db()});var Fd=bs(To()),Lb=bs(jx());var ys=bs(To()),Nb=bs(nf());var vS=0,og=1,_S=2;var Jl=1,yS=2,vo=3,gs=0,Ie=1,Pi=2,Bi=0,ka=1,lg=2,cg=3,ug=4,xS=5;var sa=100,SS=101,bS=102,MS=103,ES=104,TS=200,AS=201,wS=202,CS=203,lh=204,ch=205,RS=206,DS=207,US=208,NS=209,LS=210,IS=211,OS=212,PS=213,BS=214,uh=0,hh=1,dh=2,Xa=3,fh=4,ph=5,mh=6,gh=7,hg=0,FS=1,zS=2,_i=0,dg=1,fg=2,pg=3,jl=4,mg=5,gg=6,vg=7;var _g=300,ha=301,Ya=302,Gh=303,kh=304,Kl=306,vh=1e3,Ni=1001,_h=1002,ze=1003,VS=1004;var Ql=1005;var cn=1006,Xh=1007;var da=1008;var Rn=1009,yg=1010,xg=1011,_o=1012,Wh=1013,yi=1014,xi=1015,Fi=1016,qh=1017,Yh=1018,yo=1020,Sg=35902,bg=35899,Mg=1021,Eg=1022,oi=1023,Li=1026,fa=1027,Tg=1028,Zh=1029,Za=1030,Jh=1031;var jh=1033,$l=33776,tc=33777,ec=33778,nc=33779,Kh=35840,Qh=35841,$h=35842,td=35843,ed=36196,nd=37492,id=37496,sd=37488,ad=37489,rd=37490,od=37491,ld=37808,cd=37809,ud=37810,hd=37811,dd=37812,fd=37813,pd=37814,md=37815,gd=37816,vd=37817,_d=37818,yd=37819,xd=37820,Sd=37821,bd=36492,Md=36494,Ed=36495,Td=36283,Ad=36284,wd=36285,Cd=36286;var Nl=2300,yh=2301,rh=2302,Qm=2303,$m=2400,tg=2401,eg=2402;var HS=3200;var Ag=0,GS=1,_s="",pn="srgb",Wa="srgb-linear",Ll="linear",oe="srgb";var Ga=7680;var ng=519,kS=512,XS=513,WS=514,Rd=515,qS=516,YS=517,Dd=518,ZS=519,ig=35044;var wg="300 es",mi=2e3,oo=2001;function zE(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function VE(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function lo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function JS(){let e=lo("canvas");return e.style.display="block",e}var Kx={},co=null;function Cg(...e){let t="THREE."+e.shift();co?co("log",t,...e):console.log(t,...e)}function jS(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=jS(e);let t="THREE."+e.shift();if(co)co("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Dt(...e){e=jS(e);let t="THREE."+e.shift();if(co)co("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Il(...e){let t=e.join(" ");t in Kx||(Kx[t]=!0,Ut(...e))}function KS(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var QS={[uh]:hh,[dh]:mh,[fh]:gh,[Xa]:ph,[hh]:uh,[mh]:dh,[gh]:fh,[ph]:Xa},vs=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Cm=Math.PI/180,xh=180/Math.PI;function ic(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(dn[e&255]+dn[e>>8&255]+dn[e>>16&255]+dn[e>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[n&63|128]+dn[n>>8&255]+"-"+dn[n>>16&255]+dn[n>>24&255]+dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]).toLowerCase()}function jt(e,t,n){return Math.max(t,Math.min(n,e))}function HE(e,t){return(e%t+t)%t}function Rm(e,t,n){return(1-n)*e+n*t}function wl(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Cn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var ee=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ii=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],d=i[s+2],p=i[s+3],u=a[r+0],f=a[r+1],v=a[r+2],b=a[r+3];if(p!==b||l!==u||c!==f||d!==v){let g=l*u+c*f+d*v+p*b;g<0&&(u=-u,f=-f,v=-v,b=-b,g=-g);let h=1-o;if(g<.9995){let m=Math.acos(g),_=Math.sin(m);h=Math.sin(h*m)/_,o=Math.sin(o*m)/_,l=l*h+u*o,c=c*h+f*o,d=d*h+v*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+f*o,d=d*h+v*o,p=p*h+b*o;let m=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=m,c*=m,d*=m,p*=m}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],p=a[r],u=a[r+1],f=a[r+2],v=a[r+3];return t[n]=o*v+d*p+l*f-c*u,t[n+1]=l*v+d*u+c*p-o*f,t[n+2]=c*v+d*f+o*u-l*p,t[n+3]=d*v-o*p-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),p=o(a/2),u=l(i/2),f=l(s/2),v=l(a/2);switch(r){case"XYZ":this._x=u*d*p+c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p-u*f*v;break;case"YXZ":this._x=u*d*p+c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p+u*f*v;break;case"ZXY":this._x=u*d*p-c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p-u*f*v;break;case"ZYX":this._x=u*d*p-c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p+u*f*v;break;case"YZX":this._x=u*d*p+c*f*v,this._y=c*f*p+u*d*v,this._z=c*d*v-u*f*p,this._w=c*d*p-u*f*v;break;case"XZY":this._x=u*d*p-c*f*v,this._y=c*f*p-u*d*v,this._z=c*d*v+u*f*p,this._w=c*d*p+u*f*v;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],p=n[10],u=i+o+p;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>p){let f=2*Math.sqrt(1+i-o-p);this._w=(d-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>p){let f=2*Math.sqrt(1+o-i-p);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+p-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+s*c-a*l,this._y=s*d+r*l+a*o-i*c,this._z=a*d+r*c+i*l-s*o,this._w=r*d-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Qx.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Qx.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),d=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*d,this.y=i+l*d+o*c-a*p,this.z=s+l*p+a*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this.z=jt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this.z=jt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Dm.copy(this).projectOnVector(t),this.sub(Dm)}reflect(t){return this.sub(Dm.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dm=new H,Qx=new Ii,Ht=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=n,d[4]=a,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],u=i[2],f=i[5],v=i[8],b=s[0],g=s[3],h=s[6],m=s[1],_=s[4],S=s[7],w=s[2],C=s[5],T=s[8];return a[0]=r*b+o*m+l*w,a[3]=r*g+o*_+l*C,a[6]=r*h+o*S+l*T,a[1]=c*b+d*m+p*w,a[4]=c*g+d*_+p*C,a[7]=c*h+d*S+p*T,a[2]=u*b+f*m+v*w,a[5]=u*g+f*_+v*C,a[8]=u*h+f*S+v*T,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*r*d-n*o*c-i*a*d+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],p=d*r-o*c,u=o*l-d*a,f=c*a-r*l,v=n*p+i*u+s*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return t[0]=p*b,t[1]=(s*c-d*i)*b,t[2]=(o*i-s*r)*b,t[3]=u*b,t[4]=(d*n-s*l)*b,t[5]=(s*a-o*n)*b,t[6]=f*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*a)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Um.makeScale(t,n)),this}rotate(t){return this.premultiply(Um.makeRotation(-t)),this}translate(t,n){return this.premultiply(Um.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Um=new Ht,$x=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tS=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function GE(){let e={enabled:!0,workingColorSpace:Wa,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===oe&&(s.r=ms(s.r),s.g=ms(s.g),s.b=ms(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===oe&&(s.r=ro(s.r),s.g=ro(s.g),s.b=ro(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_s?Ll:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Il("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Il("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Wa]:{primaries:t,whitePoint:i,transfer:Ll,toXYZ:$x,fromXYZ:tS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:$x,fromXYZ:tS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),e}var Kt=GE();function ms(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function ro(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Yr,Sh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Yr===void 0&&(Yr=lo("canvas")),Yr.width=t.width,Yr.height=t.height;let s=Yr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Yr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=lo("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=ms(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ms(n[i]/255)*255):n[i]=ms(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},kE=0,uo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kE++}),this.uuid=ic(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Nm(s[r].image)):a.push(Nm(s[r]))}else a=Nm(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function Nm(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Sh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}var XE=0,Lm=new H,yn=class e extends vs{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ni,s=Ni,a=cn,r=da,o=oi,l=Rn,c=e.DEFAULT_ANISOTROPY,d=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:XE++}),this.uuid=ic(),this.name="",this.source=new uo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Lm).x}get height(){return this.source.getSize(Lm).y}get depth(){return this.source.getSize(Lm).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_g)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vh:t.x=t.x-Math.floor(t.x);break;case Ni:t.x=t.x<0?0:1;break;case _h:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vh:t.y=t.y-Math.floor(t.y);break;case Ni:t.y=t.y<0?0:1;break;case _h:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=_g;yn.DEFAULT_ANISOTROPY=1;var Re=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],d=l[4],p=l[8],u=l[1],f=l[5],v=l[9],b=l[2],g=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,S=(f+1)/2,w=(h+1)/2,C=(d+u)/4,T=(p+b)/4,x=(v+g)/4;return _>S&&_>w?_<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(_),s=C/i,a=T/i):S>w?S<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(S),i=C/s,a=x/s):w<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(w),i=T/a,s=x/a),this.set(i,s,a,n),this}let m=Math.sqrt((g-v)*(g-v)+(p-b)*(p-b)+(u-d)*(u-d));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(p-b)/m,this.z=(u-d)/m,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this.z=jt(this.z,t.z,n.z),this.w=jt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this.z=jt(this.z,t,n),this.w=jt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},bh=class extends vs{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Re(0,0,t,n),this.scissorTest=!1,this.viewport=new Re(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new yn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new uo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xn=class extends bh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Ol=class extends yn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Mh=class extends yn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Le=class e{constructor(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g)}set(t,n,i,s,a,r,o,l,c,d,p,u,f,v,b,g){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=u,h[3]=f,h[7]=v,h[11]=b,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();let n=this.elements,i=t.elements,s=1/Zr.setFromMatrixColumn(t,0).length(),a=1/Zr.setFromMatrixColumn(t,1).length(),r=1/Zr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*d,f=r*p,v=o*d,b=o*p;n[0]=l*d,n[4]=-l*p,n[8]=c,n[1]=f+v*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=v+f*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*d,f=l*p,v=c*d,b=c*p;n[0]=u+b*o,n[4]=v*o-f,n[8]=r*c,n[1]=r*p,n[5]=r*d,n[9]=-o,n[2]=f*o-v,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*d,f=l*p,v=c*d,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=v+f*o,n[1]=f+v*o,n[5]=r*d,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*d,f=r*p,v=o*d,b=o*p;n[0]=l*d,n[4]=v*c-f,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=f*c-v,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,f=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=b-u*p,n[8]=v*p+f,n[1]=p,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=f*p+v,n[10]=u-b*p}else if(t.order==="XZY"){let u=r*l,f=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=-p,n[8]=c*d,n[1]=u*p+b,n[5]=r*d,n[9]=f*p-v,n[2]=v*p-f,n[6]=o*d,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(WE,t,qE)}lookAt(t,n,i){let s=this.elements;return Hn.subVectors(t,n),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),Ks.crossVectors(i,Hn),Ks.lengthSq()===0&&(Math.abs(i.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),Ks.crossVectors(i,Hn)),Ks.normalize(),Vu.crossVectors(Hn,Ks),s[0]=Ks.x,s[4]=Vu.x,s[8]=Hn.x,s[1]=Ks.y,s[5]=Vu.y,s[9]=Hn.y,s[2]=Ks.z,s[6]=Vu.z,s[10]=Hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],u=i[9],f=i[13],v=i[2],b=i[6],g=i[10],h=i[14],m=i[3],_=i[7],S=i[11],w=i[15],C=s[0],T=s[4],x=s[8],E=s[12],I=s[1],R=s[5],F=s[9],V=s[13],X=s[2],G=s[6],z=s[10],P=s[14],tt=s[3],K=s[7],dt=s[11],gt=s[15];return a[0]=r*C+o*I+l*X+c*tt,a[4]=r*T+o*R+l*G+c*K,a[8]=r*x+o*F+l*z+c*dt,a[12]=r*E+o*V+l*P+c*gt,a[1]=d*C+p*I+u*X+f*tt,a[5]=d*T+p*R+u*G+f*K,a[9]=d*x+p*F+u*z+f*dt,a[13]=d*E+p*V+u*P+f*gt,a[2]=v*C+b*I+g*X+h*tt,a[6]=v*T+b*R+g*G+h*K,a[10]=v*x+b*F+g*z+h*dt,a[14]=v*E+b*V+g*P+h*gt,a[3]=m*C+_*I+S*X+w*tt,a[7]=m*T+_*R+S*G+w*K,a[11]=m*x+_*F+S*z+w*dt,a[15]=m*E+_*V+S*P+w*gt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],p=t[6],u=t[10],f=t[14],v=t[3],b=t[7],g=t[11],h=t[15],m=l*f-c*u,_=o*f-c*p,S=o*u-l*p,w=r*f-c*d,C=r*u-l*d,T=r*p-o*d;return n*(b*m-g*_+h*S)-i*(v*m-g*w+h*C)+s*(v*_-b*w+h*T)-a*(v*S-b*C+g*T)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],p=t[9],u=t[10],f=t[11],v=t[12],b=t[13],g=t[14],h=t[15],m=n*o-i*r,_=n*l-s*r,S=n*c-a*r,w=i*l-s*o,C=i*c-a*o,T=s*c-a*l,x=d*b-p*v,E=d*g-u*v,I=d*h-f*v,R=p*g-u*b,F=p*h-f*b,V=u*h-f*g,X=m*V-_*F+S*R+w*I-C*E+T*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/X;return t[0]=(o*V-l*F+c*R)*G,t[1]=(s*F-i*V-a*R)*G,t[2]=(b*T-g*C+h*w)*G,t[3]=(u*C-p*T-f*w)*G,t[4]=(l*I-r*V-c*E)*G,t[5]=(n*V-s*I+a*E)*G,t[6]=(g*S-v*T-h*_)*G,t[7]=(d*T-u*S+f*_)*G,t[8]=(r*F-o*I+c*x)*G,t[9]=(i*I-n*F-a*x)*G,t[10]=(v*C-b*S+h*m)*G,t[11]=(p*S-d*C-f*m)*G,t[12]=(o*E-r*R-l*x)*G,t[13]=(n*R-i*E+s*x)*G,t[14]=(b*_-v*w-g*m)*G,t[15]=(d*w-p*_+u*m)*G,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,d=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*r,0,c*l-s*o,d*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,d=r+r,p=o+o,u=a*c,f=a*d,v=a*p,b=r*d,g=r*p,h=o*p,m=l*c,_=l*d,S=l*p,w=i.x,C=i.y,T=i.z;return s[0]=(1-(b+h))*w,s[1]=(f+S)*w,s[2]=(v-_)*w,s[3]=0,s[4]=(f-S)*C,s[5]=(1-(u+h))*C,s[6]=(g+m)*C,s[7]=0,s[8]=(v+_)*T,s[9]=(g-m)*T,s[10]=(1-(u+b))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinant();if(a===0)return i.set(1,1,1),n.identity(),this;let r=Zr.set(s[0],s[1],s[2]).length(),o=Zr.set(s[4],s[5],s[6]).length(),l=Zr.set(s[8],s[9],s[10]).length();a<0&&(r=-r),di.copy(this);let c=1/r,d=1/o,p=1/l;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=d,di.elements[5]*=d,di.elements[6]*=d,di.elements[8]*=p,di.elements[9]*=p,di.elements[10]*=p,n.setFromRotationMatrix(di),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=mi,l=!1){let c=this.elements,d=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s),v,b;if(l)v=a/(r-a),b=r*a/(r-a);else if(o===mi)v=-(r+a)/(r-a),b=-2*r*a/(r-a);else if(o===oo)v=-r/(r-a),b=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=mi,l=!1){let c=this.elements,d=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),f=-(i+s)/(i-s),v,b;if(l)v=1/(r-a),b=r/(r-a);else if(o===mi)v=-2/(r-a),b=-(r+a)/(r-a);else if(o===oo)v=-1/(r-a),b=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Zr=new H,di=new Le,WE=new H(0,0,0),qE=new H(1,1,1),Ks=new H,Vu=new H,Hn=new H,eS=new Le,nS=new Ii,gi=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],d=s[9],p=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-jt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-jt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return eS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return nS.setFromEuler(this),this.setFromQuaternion(nS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gi.DEFAULT_ORDER="XYZ";var Pl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},YE=0,iS=new H,Jr=new Ii,cs=new Le,Hu=new H,Cl=new H,ZE=new H,JE=new Ii,sS=new H(1,0,0),aS=new H(0,1,0),rS=new H(0,0,1),oS={type:"added"},jE={type:"removed"},jr={type:"childadded",child:null},Im={type:"childremoved",child:null},Wn=class e extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:YE++}),this.uuid=ic(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new gi,i=new Ii,s=new H(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ht}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Jr.setFromAxisAngle(t,n),this.quaternion.multiply(Jr),this}rotateOnWorldAxis(t,n){return Jr.setFromAxisAngle(t,n),this.quaternion.premultiply(Jr),this}rotateX(t){return this.rotateOnAxis(sS,t)}rotateY(t){return this.rotateOnAxis(aS,t)}rotateZ(t){return this.rotateOnAxis(rS,t)}translateOnAxis(t,n){return iS.copy(t).applyQuaternion(this.quaternion),this.position.add(iS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(sS,t)}translateY(t){return this.translateOnAxis(aS,t)}translateZ(t){return this.translateOnAxis(rS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(cs.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Hu.copy(t):Hu.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Cl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cs.lookAt(Cl,Hu,this.up):cs.lookAt(Hu,Cl,this.up),this.quaternion.setFromRotationMatrix(cs),s&&(cs.extractRotation(s.matrixWorld),Jr.setFromRotationMatrix(cs),this.quaternion.premultiply(Jr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oS),jr.child=t,this.dispatchEvent(jr),jr.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(jE),Im.child=t,this.dispatchEvent(Im),Im.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),cs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),cs.multiply(t.parent.matrixWorld)),t.applyMatrix4(cs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oS),jr.child=t,this.dispatchEvent(jr),jr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cl,t,ZE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cl,JE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),p=r(t.shapes),u=r(t.skeletons),f=r(t.animations),v=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=s,i;function r(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Wn.DEFAULT_UP=new H(0,1,0);Wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ps=class extends Wn{constructor(){super(),this.isGroup=!0,this.type="Group"}},KE={type:"move"},ho=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ps,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ps,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ps,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let g=n.getJointPose(b,i),h=this._getHandJoint(c,b);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),f=.02,v=.005;c.inputState.pinching&&u>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(KE)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new ps;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},$S={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qs={h:0,s:0,l:0},Gu={h:0,s:0,l:0};function Om(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Wt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Kt.workingColorSpace){if(t=HE(t,1),n=jt(n,0,1),i=jt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=Om(r,a,t+1/3),this.g=Om(r,a,t),this.b=Om(r,a,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,n=pn){function i(a){a!==void 0&&parseFloat(a)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=pn){let i=$S[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}copyLinearToSRGB(t){return this.r=ro(t.r),this.g=ro(t.g),this.b=ro(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pn){return Kt.workingToColorSpace(fn.copy(this),t),Math.round(jt(fn.r*255,0,255))*65536+Math.round(jt(fn.g*255,0,255))*256+Math.round(jt(fn.b*255,0,255))}getHexString(t=pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(fn.copy(this),n);let i=fn.r,s=fn.g,a=fn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,d=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=d<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(fn.copy(this),n),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=pn){Kt.workingToColorSpace(fn.copy(this),t);let n=fn.r,i=fn.g,s=fn.b;return t!==pn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Qs),this.setHSL(Qs.h+t,Qs.s+n,Qs.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Qs),t.getHSL(Gu);let i=Rm(Qs.h,Gu.h,n),s=Rm(Qs.s,Gu.s,n),a=Rm(Qs.l,Gu.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new Wt;Wt.NAMES=$S;var fo=class extends Wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}},fi=new H,us=new H,Pm=new H,hs=new H,Kr=new H,Qr=new H,lS=new H,Bm=new H,Fm=new H,zm=new H,Vm=new Re,Hm=new Re,Gm=new Re,ia=class e{constructor(t=new H,n=new H,i=new H){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),fi.subVectors(t,n),s.cross(fi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){fi.subVectors(s,n),us.subVectors(i,n),Pm.subVectors(t,n);let r=fi.dot(fi),o=fi.dot(us),l=fi.dot(Pm),c=us.dot(us),d=us.dot(Pm),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,f=(c*l-o*d)*u,v=(r*d-o*l)*u;return a.set(1-f-v,v,f)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,hs)===null?!1:hs.x>=0&&hs.y>=0&&hs.x+hs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,hs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,hs.x),l.addScaledVector(r,hs.y),l.addScaledVector(o,hs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return Vm.setScalar(0),Hm.setScalar(0),Gm.setScalar(0),Vm.fromBufferAttribute(t,n),Hm.fromBufferAttribute(t,i),Gm.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Vm,a.x),r.addScaledVector(Hm,a.y),r.addScaledVector(Gm,a.z),r}static isFrontFacing(t,n,i,s){return fi.subVectors(i,n),us.subVectors(t,n),fi.cross(us).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fi.subVectors(this.c,this.b),us.subVectors(this.a,this.b),fi.cross(us).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Kr.subVectors(s,i),Qr.subVectors(a,i),Bm.subVectors(t,i);let l=Kr.dot(Bm),c=Qr.dot(Bm);if(l<=0&&c<=0)return n.copy(i);Fm.subVectors(t,s);let d=Kr.dot(Fm),p=Qr.dot(Fm);if(d>=0&&p<=d)return n.copy(s);let u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(Kr,r);zm.subVectors(t,a);let f=Kr.dot(zm),v=Qr.dot(zm);if(v>=0&&f<=v)return n.copy(a);let b=f*c-l*v;if(b<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(Qr,o);let g=d*v-f*p;if(g<=0&&p-d>=0&&f-v>=0)return lS.subVectors(a,s),o=(p-d)/(p-d+(f-v)),n.copy(s).addScaledVector(lS,o);let h=1/(g+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(Kr,r).addScaledVector(Qr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},aa=class{constructor(t=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(pi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(pi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=pi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,pi):pi.fromBufferAttribute(a,r),pi.applyMatrix4(t.matrixWorld),this.expandByPoint(pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ku.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ku.copy(i.boundingBox)),ku.applyMatrix4(t.matrixWorld),this.union(ku)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pi),pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rl),Xu.subVectors(this.max,Rl),$r.subVectors(t.a,Rl),to.subVectors(t.b,Rl),eo.subVectors(t.c,Rl),$s.subVectors(to,$r),ta.subVectors(eo,to),Fa.subVectors($r,eo);let n=[0,-$s.z,$s.y,0,-ta.z,ta.y,0,-Fa.z,Fa.y,$s.z,0,-$s.x,ta.z,0,-ta.x,Fa.z,0,-Fa.x,-$s.y,$s.x,0,-ta.y,ta.x,0,-Fa.y,Fa.x,0];return!km(n,$r,to,eo,Xu)||(n=[1,0,0,0,1,0,0,0,1],!km(n,$r,to,eo,Xu))?!1:(Wu.crossVectors($s,ta),n=[Wu.x,Wu.y,Wu.z],km(n,$r,to,eo,Xu))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ds[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ds[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ds[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ds[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ds[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ds[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ds[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ds[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ds),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ds=[new H,new H,new H,new H,new H,new H,new H,new H],pi=new H,ku=new aa,$r=new H,to=new H,eo=new H,$s=new H,ta=new H,Fa=new H,Rl=new H,Xu=new H,Wu=new H,za=new H;function km(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){za.fromArray(e,a);let o=s.x*Math.abs(za.x)+s.y*Math.abs(za.y)+s.z*Math.abs(za.z),l=t.dot(za),c=n.dot(za),d=i.dot(za);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var We=new H,qu=new ee,QE=0,kn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:QE++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=ig,this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)qu.fromBufferAttribute(this,n),qu.applyMatrix3(t),this.setXY(n,qu.x,qu.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix3(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix4(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyNormalMatrix(t),this.setXYZ(n,We.x,We.y,We.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.transformDirection(t),this.setXYZ(n,We.x,We.y,We.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=wl(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Cn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=wl(n,this.array)),n}setX(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=wl(n,this.array)),n}setY(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=wl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=wl(n,this.array)),n}setW(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array),s=Cn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array),s=Cn(s,this.array),a=Cn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ig&&(t.usage=this.usage),t}};var Bl=class extends kn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Fl=class extends kn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var ri=class extends kn{constructor(t,n,i){super(new Float32Array(t),n,i)}},$E=new aa,Dl=new H,Xm=new H,po=class{constructor(t=new H,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):$E.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Dl.subVectors(t,this.center);let n=Dl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Dl,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xm.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Dl.copy(t.center).add(Xm)),this.expandByPoint(Dl.copy(t.center).sub(Xm))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},tT=0,ai=new Le,Wm=new Wn,no=new H,Gn=new aa,Ul=new aa,tn=new H,Oi=class e extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tT++}),this.uuid=ic(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zE(t)?Fl:Bl)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Ht().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ai.makeRotationFromQuaternion(t),this.applyMatrix4(ai),this}rotateX(t){return ai.makeRotationX(t),this.applyMatrix4(ai),this}rotateY(t){return ai.makeRotationY(t),this.applyMatrix4(ai),this}rotateZ(t){return ai.makeRotationZ(t),this.applyMatrix4(ai),this}translate(t,n,i){return ai.makeTranslation(t,n,i),this.applyMatrix4(ai),this}scale(t,n,i){return ai.makeScale(t,n,i),this.applyMatrix4(ai),this}lookAt(t){return Wm.lookAt(t),Wm.updateMatrix(),this.applyMatrix4(Wm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(no).negate(),this.translate(no.x,no.y,no.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ri(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new aa);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];Gn.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new po);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let i=this.boundingSphere.center;if(Gn.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Ul.setFromBufferAttribute(o),this.morphTargetsRelative?(tn.addVectors(Gn.min,Ul.min),Gn.expandByPoint(tn),tn.addVectors(Gn.max,Ul.max),Gn.expandByPoint(tn)):(Gn.expandByPoint(Ul.min),Gn.expandByPoint(Ul.max))}Gn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)tn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(tn));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)tn.fromBufferAttribute(o,c),l&&(no.fromBufferAttribute(t,c),tn.add(no)),s=Math.max(s,i.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new H,l[x]=new H;let c=new H,d=new H,p=new H,u=new ee,f=new ee,v=new ee,b=new H,g=new H;function h(x,E,I){c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,E),p.fromBufferAttribute(i,I),u.fromBufferAttribute(a,x),f.fromBufferAttribute(a,E),v.fromBufferAttribute(a,I),d.sub(c),p.sub(c),f.sub(u),v.sub(u);let R=1/(f.x*v.y-v.x*f.y);isFinite(R)&&(b.copy(d).multiplyScalar(v.y).addScaledVector(p,-f.y).multiplyScalar(R),g.copy(p).multiplyScalar(f.x).addScaledVector(d,-v.x).multiplyScalar(R),o[x].add(b),o[E].add(b),o[I].add(b),l[x].add(g),l[E].add(g),l[I].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let x=0,E=m.length;x<E;++x){let I=m[x],R=I.start,F=I.count;for(let V=R,X=R+F;V<X;V+=3)h(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let _=new H,S=new H,w=new H,C=new H;function T(x){w.fromBufferAttribute(s,x),C.copy(w);let E=o[x];_.copy(E),_.sub(w.multiplyScalar(w.dot(E))).normalize(),S.crossVectors(C,E);let R=S.dot(l[x])<0?-1:1;r.setXYZW(x,_.x,_.y,_.z,R)}for(let x=0,E=m.length;x<E;++x){let I=m[x],R=I.start,F=I.count;for(let V=R,X=R+F;V<X;V+=3)T(t.getX(V+0)),T(t.getX(V+1)),T(t.getX(V+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new H,a=new H,r=new H,o=new H,l=new H,c=new H,d=new H,p=new H;if(t)for(let u=0,f=t.count;u<f;u+=3){let v=t.getX(u+0),b=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,b),r.fromBufferAttribute(n,g),d.subVectors(r,a),p.subVectors(s,a),d.cross(p),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,a),p.subVectors(s,a),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)tn.fromBufferAttribute(t,n),tn.normalize(),t.setXYZ(n,tn.x,tn.y,tn.z)}toNonIndexed(){function t(o,l){let c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d),f=0,v=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?f=l[b]*o.data.stride+o.offset:f=l[b]*d;for(let h=0;h<d;h++)u[v++]=c[f++]}return new kn(u,d,p)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let d=0,p=c.length;d<p;d++){let u=c[d],f=t(u,i);l.push(f)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){let f=c[p];d.push(f.toJSON(t.data))}d.length>0&&(s[l]=d,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(n))}let a=t.morphAttributes;for(let c in a){let d=[],p=a[c];for(let u=0,f=p.length;u<f;u++)d.push(p[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,d=r.length;c<d;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var eT=0,ra=class extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eT++}),this.uuid=ic(),this.name="",this.type="Material",this.blending=ka,this.side=gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lh,this.blendDst=ch,this.blendEquation=sa,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Xa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ng,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ga,this.stencilZFail=Ga,this.stencilZPass=Ga,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ka&&(i.blending=this.blending),this.side!==gs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==lh&&(i.blendSrc=this.blendSrc),this.blendDst!==ch&&(i.blendDst=this.blendDst),this.blendEquation!==sa&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ng&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ga&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ga&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ga&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var fs=new H,qm=new H,Yu=new H,ea=new H,Ym=new H,Zu=new H,Zm=new H,Eh=class{constructor(t=new H,n=new H(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=fs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(fs.copy(this.origin).addScaledVector(this.direction,n),fs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){qm.copy(t).add(n).multiplyScalar(.5),Yu.copy(n).sub(t).normalize(),ea.copy(this.origin).sub(qm);let a=t.distanceTo(n)*.5,r=-this.direction.dot(Yu),o=ea.dot(this.direction),l=-ea.dot(Yu),c=ea.lengthSq(),d=Math.abs(1-r*r),p,u,f,v;if(d>0)if(p=r*l-o,u=r*o-l,v=a*d,p>=0)if(u>=-v)if(u<=v){let b=1/d;p*=b,u*=b,f=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u<=-v?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c):u<=v?(p=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(qm).addScaledVector(Yu,u),f}intersectSphere(t,n){fs.subVectors(t.center,this.origin);let i=fs.dot(this.direction),s=fs.dot(fs)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),d>=0?(a=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(a=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,fs)!==null}intersectTriangle(t,n,i,s,a){Ym.subVectors(n,t),Zu.subVectors(i,t),Zm.crossVectors(Ym,Zu);let r=this.direction.dot(Zm),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ea.subVectors(this.origin,t);let l=o*this.direction.dot(Zu.crossVectors(ea,Zu));if(l<0)return null;let c=o*this.direction.dot(Ym.cross(ea));if(c<0||l+c>r)return null;let d=-o*ea.dot(Zm);return d<0?null:this.at(d/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zl=class extends ra{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=hg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},cS=new Le,Va=new Eh,Ju=new po,uS=new H,ju=new H,Ku=new H,Qu=new H,Jm=new H,$u=new H,hS=new H,th=new H,Qt=class extends Wn{constructor(t=new Oi,n=new zl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){$u.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let d=o[l],p=a[l];d!==0&&(Jm.fromBufferAttribute(p,t),r?$u.addScaledVector(Jm,d):$u.addScaledVector(Jm.sub(n),d))}n.add($u)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ju.copy(i.boundingSphere),Ju.applyMatrix4(a),Va.copy(t.ray).recast(t.near),!(Ju.containsPoint(Va.origin)===!1&&(Va.intersectSphere(Ju,uS)===null||Va.origin.distanceToSquared(uS)>(t.far-t.near)**2))&&(cS.copy(a).invert(),Va.copy(t.ray).applyMatrix4(cS),!(i.boundingBox!==null&&Va.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Va)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,p=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=m,w=_;S<w;S+=3){let C=o.getX(S),T=o.getX(S+1),x=o.getX(S+2);s=eh(this,h,t,i,c,d,p,C,T,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let g=v,h=b;g<h;g+=3){let m=o.getX(g),_=o.getX(g+1),S=o.getX(g+2);s=eh(this,r,t,i,c,d,p,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=m,w=_;S<w;S+=3){let C=S,T=S+1,x=S+2;s=eh(this,h,t,i,c,d,p,C,T,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let g=v,h=b;g<h;g+=3){let m=g,_=g+1,S=g+2;s=eh(this,r,t,i,c,d,p,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}}};function nT(e,t,n,i,s,a,r,o){let l;if(t.side===Ie?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===gs,o),l===null)return null;th.copy(o),th.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(th);return c<n.near||c>n.far?null:{distance:c,point:th.clone(),object:e}}function eh(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,ju),e.getVertexPosition(l,Ku),e.getVertexPosition(c,Qu);let d=nT(e,t,n,i,ju,Ku,Qu,hS);if(d){let p=new H;ia.getBarycoord(hS,ju,Ku,Qu,p),s&&(d.uv=ia.getInterpolatedAttribute(s,o,l,c,p,new ee)),a&&(d.uv1=ia.getInterpolatedAttribute(a,o,l,c,p,new ee)),r&&(d.normal=ia.getInterpolatedAttribute(r,o,l,c,p,new H),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new H,materialIndex:0};ia.getNormal(ju,Ku,Qu,u.normal),d.face=u,d.barycoord=p}return d}var Th=class extends yn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=ze,d=ze,p,u){super(null,r,o,l,c,d,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var jm=new H,iT=new H,sT=new Ht,Ui=class{constructor(t=new H(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=jm.subVectors(i,n).cross(iT.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(jm),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||sT.getNormalMatrix(t),s=this.coplanarPoint(jm).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ha=new po,aT=new ee(.5,.5),nh=new H,mo=class{constructor(t=new Ui,n=new Ui,i=new Ui,s=new Ui,a=new Ui,r=new Ui){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=mi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],p=a[5],u=a[6],f=a[7],v=a[8],b=a[9],g=a[10],h=a[11],m=a[12],_=a[13],S=a[14],w=a[15];if(s[0].setComponents(c-r,f-d,h-v,w-m).normalize(),s[1].setComponents(c+r,f+d,h+v,w+m).normalize(),s[2].setComponents(c+o,f+p,h+b,w+_).normalize(),s[3].setComponents(c-o,f-p,h-b,w-_).normalize(),i)s[4].setComponents(l,u,g,S).normalize(),s[5].setComponents(c-l,f-u,h-g,w-S).normalize();else if(s[4].setComponents(c-l,f-u,h-g,w-S).normalize(),n===mi)s[5].setComponents(c+l,f+u,h+g,w+S).normalize();else if(n===oo)s[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ha.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ha.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ha)}intersectsSprite(t){Ha.center.set(0,0,0);let n=aT.distanceTo(t.center);return Ha.radius=.7071067811865476+n,Ha.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ha)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(nh.x=s.normal.x>0?t.max.x:t.min.x,nh.y=s.normal.y>0?t.max.y:t.min.y,nh.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(nh)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Vl=class extends yn{constructor(t=[],n=ha,i,s,a,r,o,l,c,d){super(t,n,i,s,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var oa=class extends yn{constructor(t,n,i=yi,s,a,r,o=ze,l=ze,c,d=Li,p=1){if(d!==Li&&d!==fa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new uo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Ah=class extends oa{constructor(t,n=yi,i=ha,s,a,r=ze,o=ze,l,c=Li){let d={width:t,height:t,depth:1},p=[d,d,d,d,d,d];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hl=class extends yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},_e=class e extends Oi{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],d=[],p=[],u=0,f=0;v("z","y","x",-1,-1,i,n,t,r,a,0),v("z","y","x",1,-1,i,n,-t,r,a,1),v("x","z","y",1,1,t,i,n,s,r,2),v("x","z","y",1,-1,t,i,-n,s,r,3),v("x","y","z",1,-1,t,n,i,s,a,4),v("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new ri(c,3)),this.setAttribute("normal",new ri(d,3)),this.setAttribute("uv",new ri(p,2));function v(b,g,h,m,_,S,w,C,T,x,E){let I=S/T,R=w/x,F=S/2,V=w/2,X=C/2,G=T+1,z=x+1,P=0,tt=0,K=new H;for(let dt=0;dt<z;dt++){let gt=dt*R-V;for(let lt=0;lt<G;lt++){let It=lt*I-F;K[b]=It*m,K[g]=gt*_,K[h]=X,c.push(K.x,K.y,K.z),K[b]=0,K[g]=0,K[h]=C>0?1:-1,d.push(K.x,K.y,K.z),p.push(lt/T),p.push(1-dt/x),P+=1}}for(let dt=0;dt<x;dt++)for(let gt=0;gt<T;gt++){let lt=u+gt+G*dt,It=u+gt+G*(dt+1),ae=u+(gt+1)+G*(dt+1),me=u+(gt+1)+G*dt;l.push(lt,It,me),l.push(It,ae,me),tt+=6}o.addGroup(f,tt,E),f+=tt,u+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var qa=class e extends Oi{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,p=t/o,u=n/l,f=[],v=[],b=[],g=[];for(let h=0;h<d;h++){let m=h*u-r;for(let _=0;_<c;_++){let S=_*p-a;v.push(S,-m,0),b.push(0,0,1),g.push(_/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let m=0;m<o;m++){let _=m+c*h,S=m+c*(h+1),w=m+1+c*(h+1),C=m+1+c*h;f.push(_,S,C),f.push(S,w,C)}this.setIndex(f),this.setAttribute("position",new ri(v,3)),this.setAttribute("normal",new ri(b,3)),this.setAttribute("uv",new ri(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ja(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function mn(e){let t={};for(let n=0;n<e.length;n++){let i=Ja(e[n]);for(let s in i)t[s]=i[s]}return t}function rT(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Rg(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var tb={clone:Ja,merge:mn},oT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends ra{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oT,this.fragmentShader=lT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ja(t.uniforms),this.uniformsGroups=rT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},wh=class extends qn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xn=class extends ra{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ag,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ch=class extends ra{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=HS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rh=class extends ra{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ih(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}var la=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dh=class extends la{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$m,endingEnd:$m}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case tg:a=t,o=2*n-i;break;case eg:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case tg:r=t,l=2*i-n;break;case eg:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,d=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*d,this._offsetNext=r*d}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,f=this._weightNext,v=(i-n)/(s-n),b=v*v,g=b*v,h=-u*g+2*u*b-u*v,m=(1+u)*g+(-1.5-2*u)*b+(-.5+u)*v+1,_=(-1-f)*g+(1.5+f)*b+.5*v,S=f*g-f*b;for(let w=0;w!==o;++w)a[w]=h*r[d+w]+m*r[c+w]+_*r[l+w]+S*r[p+w];return a}},Uh=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=(i-n)/(s-n),p=1-d;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*d;return a}},Nh=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Lh=class extends la{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this.settings||this.DefaultSettings_,p=d.inTangents,u=d.outTangents;if(!p||!u){let b=(i-n)/(s-n),g=1-b;for(let h=0;h!==o;++h)a[h]=r[c+h]*g+r[l+h]*b;return a}let f=o*2,v=t-1;for(let b=0;b!==o;++b){let g=r[c+b],h=r[l+b],m=v*f+b*2,_=u[m],S=u[m+1],w=t*f+b*2,C=p[w],T=p[w+1],x=(i-n)/(s-n),E,I,R,F,V;for(let X=0;X<8;X++){E=x*x,I=E*x,R=1-x,F=R*R,V=F*R;let z=V*n+3*F*x*_+3*R*E*C+I*s-i;if(Math.abs(z)<1e-10)break;let P=3*F*(_-n)+6*R*x*(C-_)+3*E*(s-C);if(Math.abs(P)<1e-10)break;x=x-z/P,x=Math.max(0,Math.min(1,x))}a[b]=V*g+3*F*x*S+3*R*E*T+I*h}return a}},Yn=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ih(n,this.TimeBufferType),this.values=ih(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:ih(t.times,Array),values:ih(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Nh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Uh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Dh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new Lh(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.settings=this.settings),n}setInterpolation(t){let n;switch(t){case Nl:n=this.InterpolantFactoryMethodDiscrete;break;case yh:n=this.InterpolantFactoryMethodLinear;break;case rh:n=this.InterpolantFactoryMethodSmooth;break;case Qm:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ut("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nl;case this.InterpolantFactoryMethodLinear:return yh;case this.InterpolantFactoryMethodSmooth:return rh;case this.InterpolantFactoryMethodBezier:return Qm}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&VE(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===rh,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],d=t[o+1];if(c!==d&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,f=p+i;for(let v=0;v!==i;++v){let b=n[p+v];if(b!==n[u+v]||b!==n[f+v]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let f=0;f!==i;++f)n[u+f]=n[p+f]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};Yn.prototype.ValueTypeName="";Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=yh;var ca=class extends Yn{constructor(t,n,i){super(t,n,i)}};ca.prototype.ValueTypeName="bool";ca.prototype.ValueBufferType=Array;ca.prototype.DefaultInterpolation=Nl;ca.prototype.InterpolantFactoryMethodLinear=void 0;ca.prototype.InterpolantFactoryMethodSmooth=void 0;var Ih=class extends Yn{constructor(t,n,i,s){super(t,n,i,s)}};Ih.prototype.ValueTypeName="color";var Oh=class extends Yn{constructor(t,n,i,s){super(t,n,i,s)}};Oh.prototype.ValueTypeName="number";var Ph=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let d=c+o;c!==d;c+=4)Ii.slerpFlat(a,0,r,c-o,r,c,l);return a}},Gl=class extends Yn{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new Ph(this.times,this.values,this.getValueSize(),t)}};Gl.prototype.ValueTypeName="quaternion";Gl.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends Yn{constructor(t,n,i){super(t,n,i)}};ua.prototype.ValueTypeName="string";ua.prototype.ValueBufferType=Array;ua.prototype.DefaultInterpolation=Nl;ua.prototype.InterpolantFactoryMethodLinear=void 0;ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Bh=class extends Yn{constructor(t,n,i,s){super(t,n,i,s)}};Bh.prototype.ValueTypeName="vector";var oh={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(dS(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!dS(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function dS(e){try{let t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Fh=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,a===!1&&s.onStart!==void 0&&s.onStart(d,r,o),a=!0},this.itemEnd=function(d){r++,s.onProgress!==void 0&&s.onProgress(d,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,p){return c.push(d,p),this},this.removeHandler=function(d){let p=c.indexOf(d);return p!==-1&&c.splice(p,2),this},this.getHandler=function(d){for(let p=0,u=c.length;p<u;p+=2){let f=c[p],v=c[p+1];if(f.global&&(f.lastIndex=0),f.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},eb=new Fh,go=class{constructor(t){this.manager=t!==void 0?t:eb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};go.DEFAULT_MATERIAL_NAME="__DEFAULT";var io=new WeakMap,zh=class extends go{constructor(t){super(t)}load(t,n,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,r=oh.get(`image:${t}`);if(r!==void 0){if(r.complete===!0)a.manager.itemStart(t),setTimeout(function(){n&&n(r),a.manager.itemEnd(t)},0);else{let p=io.get(r);p===void 0&&(p=[],io.set(r,p)),p.push({onLoad:n,onError:s})}return r}let o=lo("img");function l(){d(),n&&n(this);let p=io.get(this)||[];for(let u=0;u<p.length;u++){let f=p[u];f.onLoad&&f.onLoad(this)}io.delete(this),a.manager.itemEnd(t)}function c(p){d(),s&&s(p),oh.remove(`image:${t}`);let u=io.get(this)||[];for(let f=0;f<u.length;f++){let v=u[f];v.onError&&v.onError(p)}io.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),oh.add(`image:${t}`,o),a.manager.itemStart(t),o.src=t,o}};var kl=class extends go{constructor(t){super(t)}load(t,n,i,s){let a=new yn,r=new zh(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(o){a.image=o,a.needsUpdate=!0,n!==void 0&&n(a)},i,s),a}},Xl=class extends Wn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}};var Km=new Le,fS=new H,pS=new H,sg=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mo,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;fS.setFromMatrixPosition(t.matrixWorld),n.position.copy(fS),pS.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(pS),n.updateMatrixWorld(),Km.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Km,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===oo||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Km)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},sh=new H,ah=new Ii,Di=new H,Wl=class extends Wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sh,ah,Di),Di.x===1&&Di.y===1&&Di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sh,ah,Di.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(sh,ah,Di),Di.x===1&&Di.y===1&&Di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sh,ah,Di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},na=new H,mS=new ee,gS=new ee,ln=class extends Wl{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=xh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Cm*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xh*2*Math.atan(Math.tan(Cm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){na.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(na.x,na.y).multiplyScalar(-t/na.z),na.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(na.x,na.y).multiplyScalar(-t/na.z)}getViewSize(t,n){return this.getViewBounds(t,mS,gS),n.subVectors(gS,mS)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Cm*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var ag=class extends sg{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}},vi=class extends Xl{constructor(t,n,i=0,s=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ag}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}},ql=class extends Wl{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Yl=class extends Xl{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}};var so=-90,ao=1,Vh=class extends Wn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(so,ao,t,n);s.layers=this.layers,this.add(s);let a=new ln(so,ao,t,n);a.layers=this.layers,this.add(a);let r=new ln(so,ao,t,n);r.layers=this.layers,this.add(r);let o=new ln(so,ao,t,n);o.layers=this.layers,this.add(o);let l=new ln(so,ao,t,n);l.layers=this.layers,this.add(l);let c=new ln(so,ao,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===mi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===oo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,d]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(p,u,f),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Hh=class extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Dg="\\[\\]\\.:\\/",cT=new RegExp("["+Dg+"]","g"),Ug="[^"+Dg+"]",uT="[^"+Dg.replace("\\.","")+"]",hT=/((?:WC+[\/:])*)/.source.replace("WC",Ug),dT=/(WCOD+)?/.source.replace("WCOD",uT),fT=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ug),pT=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ug),mT=new RegExp("^"+hT+dT+fT+pT+"$"),gT=["material","materials","bones","map"],rg=class{constructor(t,n,i){let s=i||Ae.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ae=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cT,"")}static parseTrackName(t){let n=mT.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);gT.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ut("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=rg;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S2=new Float32Array(1);var Zl=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ut("THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=performance.now();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}};function Ng(e,t,n,i){let s=vT(i);switch(n){case Mg:return e*t;case Tg:return e*t/s.components*s.byteLength;case Zh:return e*t/s.components*s.byteLength;case Za:return e*t*2/s.components*s.byteLength;case Jh:return e*t*2/s.components*s.byteLength;case Eg:return e*t*3/s.components*s.byteLength;case oi:return e*t*4/s.components*s.byteLength;case jh:return e*t*4/s.components*s.byteLength;case $l:case tc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ec:case nc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qh:case td:return Math.max(e,16)*Math.max(t,8)/4;case Kh:case $h:return Math.max(e,8)*Math.max(t,8)/2;case ed:case nd:case sd:case ad:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case id:case rd:case od:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ld:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ud:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case hd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case dd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case fd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case pd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case md:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case gd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case vd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case _d:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case yd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Sd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case bd:case Md:case Ed:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Td:case Ad:return Math.ceil(e/4)*Math.ceil(t/4)*8;case wd:case Cd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function vT(e){switch(e){case Rn:case yg:return{byteLength:1,components:1};case _o:case xg:case Fi:return{byteLength:2,components:1};case qh:case Yh:return{byteLength:2,components:4};case yi:case Wh:case xi:return{byteLength:4,components:1};case Sg:case bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function Eb(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function yT(e){let t=new WeakMap;function n(o,l){let c=o.array,d=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=e.HALF_FLOAT:f=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=e.SHORT;else if(c instanceof Uint32Array)f=e.UNSIGNED_INT;else if(c instanceof Int32Array)f=e.INT;else if(c instanceof Int8Array)f=e.BYTE;else if(c instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let d=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,d);else{p.sort((f,v)=>f.start-v.start);let u=0;for(let f=1;f<p.length;f++){let v=p[u],b=p[f];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++u,p[u]=b)}p.length=u+1;for(let f=0,v=p.length;f<v;f++){let b=p[f];e.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var xT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ST=`#ifdef USE_ALPHAHASH
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
#endif`,bT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,MT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ET=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,TT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,AT=`#ifdef USE_AOMAP
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
#endif`,wT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,CT=`#ifdef USE_BATCHING
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
#endif`,RT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,DT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,UT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,NT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,LT=`#ifdef USE_IRIDESCENCE
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
#endif`,IT=`#ifdef USE_BUMPMAP
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
#endif`,OT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,PT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,BT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,FT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,VT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,HT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,GT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,kT=`#define PI 3.141592653589793
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
} // validated`,XT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,WT=`vec3 transformedNormal = objectNormal;
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
#endif`,qT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,YT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ZT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jT="gl_FragColor = linearToOutputTexel( gl_FragColor );",KT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QT=`#ifdef USE_ENVMAP
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
#endif`,$T=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tA=`#ifdef USE_ENVMAP
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
#endif`,eA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nA=`#ifdef USE_ENVMAP
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
#endif`,iA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,aA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,oA=`#ifdef USE_GRADIENTMAP
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
}`,lA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hA=`uniform bool receiveShadow;
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
#endif`,dA=`#ifdef USE_ENVMAP
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
#endif`,fA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vA=`PhysicalMaterial material;
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
#endif`,_A=`uniform sampler2D dfgLUT;
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
}`,yA=`
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
#endif`,xA=`#if defined( RE_IndirectDiffuse )
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
#endif`,SA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,MA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,EA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,AA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,CA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,RA=`#if defined( USE_POINTS_UV )
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
#endif`,DA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,UA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,NA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,LA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,IA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,OA=`#ifdef USE_MORPHTARGETS
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
#endif`,PA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,BA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,FA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,VA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,HA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,GA=`#ifdef USE_NORMALMAP
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
#endif`,kA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,XA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,WA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,YA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ZA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,JA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,KA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,QA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$A=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ew=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sw=`float getShadowMask() {
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
}`,aw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rw=`#ifdef USE_SKINNING
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
#endif`,ow=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lw=`#ifdef USE_SKINNING
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
#endif`,cw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fw=`#ifdef USE_TRANSMISSION
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
#endif`,pw=`#ifdef USE_TRANSMISSION
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
#endif`,mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_w=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xw=`uniform sampler2D t2D;
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
}`,Sw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ew=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tw=`#include <common>
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
}`,Aw=`#if DEPTH_PACKING == 3200
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
}`,ww=`#define DISTANCE
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
}`,Cw=`#define DISTANCE
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
}`,Rw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uw=`uniform float scale;
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
}`,Nw=`uniform vec3 diffuse;
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
}`,Lw=`#include <common>
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
}`,Iw=`uniform vec3 diffuse;
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
}`,Ow=`#define LAMBERT
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
}`,Pw=`#define LAMBERT
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
}`,Bw=`#define MATCAP
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
}`,Fw=`#define MATCAP
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
}`,zw=`#define NORMAL
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
}`,Vw=`#define NORMAL
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
}`,Hw=`#define PHONG
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
}`,Gw=`#define PHONG
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
}`,kw=`#define STANDARD
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
}`,Xw=`#define STANDARD
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
}`,Ww=`#define TOON
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
}`,qw=`#define TOON
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
}`,Yw=`uniform float size;
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
}`,Zw=`uniform vec3 diffuse;
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
}`,Jw=`#include <common>
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
}`,jw=`uniform vec3 color;
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
}`,Kw=`uniform float rotation;
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
}`,Qw=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:xT,alphahash_pars_fragment:ST,alphamap_fragment:bT,alphamap_pars_fragment:MT,alphatest_fragment:ET,alphatest_pars_fragment:TT,aomap_fragment:AT,aomap_pars_fragment:wT,batching_pars_vertex:CT,batching_vertex:RT,begin_vertex:DT,beginnormal_vertex:UT,bsdfs:NT,iridescence_fragment:LT,bumpmap_pars_fragment:IT,clipping_planes_fragment:OT,clipping_planes_pars_fragment:PT,clipping_planes_pars_vertex:BT,clipping_planes_vertex:FT,color_fragment:zT,color_pars_fragment:VT,color_pars_vertex:HT,color_vertex:GT,common:kT,cube_uv_reflection_fragment:XT,defaultnormal_vertex:WT,displacementmap_pars_vertex:qT,displacementmap_vertex:YT,emissivemap_fragment:ZT,emissivemap_pars_fragment:JT,colorspace_fragment:jT,colorspace_pars_fragment:KT,envmap_fragment:QT,envmap_common_pars_fragment:$T,envmap_pars_fragment:tA,envmap_pars_vertex:eA,envmap_physical_pars_fragment:dA,envmap_vertex:nA,fog_vertex:iA,fog_pars_vertex:sA,fog_fragment:aA,fog_pars_fragment:rA,gradientmap_pars_fragment:oA,lightmap_pars_fragment:lA,lights_lambert_fragment:cA,lights_lambert_pars_fragment:uA,lights_pars_begin:hA,lights_toon_fragment:fA,lights_toon_pars_fragment:pA,lights_phong_fragment:mA,lights_phong_pars_fragment:gA,lights_physical_fragment:vA,lights_physical_pars_fragment:_A,lights_fragment_begin:yA,lights_fragment_maps:xA,lights_fragment_end:SA,logdepthbuf_fragment:bA,logdepthbuf_pars_fragment:MA,logdepthbuf_pars_vertex:EA,logdepthbuf_vertex:TA,map_fragment:AA,map_pars_fragment:wA,map_particle_fragment:CA,map_particle_pars_fragment:RA,metalnessmap_fragment:DA,metalnessmap_pars_fragment:UA,morphinstance_vertex:NA,morphcolor_vertex:LA,morphnormal_vertex:IA,morphtarget_pars_vertex:OA,morphtarget_vertex:PA,normal_fragment_begin:BA,normal_fragment_maps:FA,normal_pars_fragment:zA,normal_pars_vertex:VA,normal_vertex:HA,normalmap_pars_fragment:GA,clearcoat_normal_fragment_begin:kA,clearcoat_normal_fragment_maps:XA,clearcoat_pars_fragment:WA,iridescence_pars_fragment:qA,opaque_fragment:YA,packing:ZA,premultiplied_alpha_fragment:JA,project_vertex:jA,dithering_fragment:KA,dithering_pars_fragment:QA,roughnessmap_fragment:$A,roughnessmap_pars_fragment:tw,shadowmap_pars_fragment:ew,shadowmap_pars_vertex:nw,shadowmap_vertex:iw,shadowmask_pars_fragment:sw,skinbase_vertex:aw,skinning_pars_vertex:rw,skinning_vertex:ow,skinnormal_vertex:lw,specularmap_fragment:cw,specularmap_pars_fragment:uw,tonemapping_fragment:hw,tonemapping_pars_fragment:dw,transmission_fragment:fw,transmission_pars_fragment:pw,uv_pars_fragment:mw,uv_pars_vertex:gw,uv_vertex:vw,worldpos_vertex:_w,background_vert:yw,background_frag:xw,backgroundCube_vert:Sw,backgroundCube_frag:bw,cube_vert:Mw,cube_frag:Ew,depth_vert:Tw,depth_frag:Aw,distance_vert:ww,distance_frag:Cw,equirect_vert:Rw,equirect_frag:Dw,linedashed_vert:Uw,linedashed_frag:Nw,meshbasic_vert:Lw,meshbasic_frag:Iw,meshlambert_vert:Ow,meshlambert_frag:Pw,meshmatcap_vert:Bw,meshmatcap_frag:Fw,meshnormal_vert:zw,meshnormal_frag:Vw,meshphong_vert:Hw,meshphong_frag:Gw,meshphysical_vert:kw,meshphysical_frag:Xw,meshtoon_vert:Ww,meshtoon_frag:qw,points_vert:Yw,points_frag:Zw,shadow_vert:Jw,shadow_frag:jw,sprite_vert:Kw,sprite_frag:Qw},ct={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Vi={basic:{uniforms:mn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:mn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:mn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:mn([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:mn([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:mn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:mn([ct.points,ct.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:mn([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:mn([ct.common,ct.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:mn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:mn([ct.sprite,ct.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:mn([ct.common,ct.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:mn([ct.lights,ct.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Vi.physical={uniforms:mn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var Ud={r:0,b:0,g:0},ja=new gi,$w=new Le;function tC(e,t,n,i,s,a){let r=new Wt(0),o=s===!0?0:1,l,c,d=null,p=0,u=null;function f(m){let _=m.isScene===!0?m.background:null;if(_&&_.isTexture){let S=m.backgroundBlurriness>0;_=t.get(_,S)}return _}function v(m){let _=!1,S=f(m);S===null?g(r,o):S&&S.isColor&&(g(S,1),_=!0);let w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(m,_){let S=f(_);S&&(S.isCubeTexture||S.mapping===Kl)?(c===void 0&&(c=new Qt(new _e(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Ja(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ja.copy(_.backgroundRotation),ja.x*=-1,ja.y*=-1,ja.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ja.y*=-1,ja.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($w.makeRotationFromEuler(ja)),c.material.toneMapped=Kt.getTransfer(S.colorSpace)!==oe,(d!==S||p!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=S,p=S.version,u=e.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Qt(new qa(2,2),new qn({name:"BackgroundMaterial",uniforms:Ja(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(S.colorSpace)!==oe,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||p!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,d=S,p=S.version,u=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,_){m.getRGB(Ud,Rg(e)),n.buffers.color.setClear(Ud.r,Ud.g,Ud.b,_,a)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(m,_=1){r.set(m),o=_,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,g(r,o)},render:v,addToRenderList:b,dispose:h}}function eC(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(R,F,V,X,G){let z=!1,P=p(R,X,V,F);a!==P&&(a=P,c(a.object)),z=f(R,X,V,G),z&&v(R,X,V,G),G!==null&&t.update(G,e.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,S(R,F,V,X),G!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return e.createVertexArray()}function c(R){return e.bindVertexArray(R)}function d(R){return e.deleteVertexArray(R)}function p(R,F,V,X){let G=X.wireframe===!0,z=i[F.id];z===void 0&&(z={},i[F.id]=z);let P=R.isInstancedMesh===!0?R.id:0,tt=z[P];tt===void 0&&(tt={},z[P]=tt);let K=tt[V.id];K===void 0&&(K={},tt[V.id]=K);let dt=K[G];return dt===void 0&&(dt=u(l()),K[G]=dt),dt}function u(R){let F=[],V=[],X=[];for(let G=0;G<n;G++)F[G]=0,V[G]=0,X[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:X,object:R,attributes:{},index:null}}function f(R,F,V,X){let G=a.attributes,z=F.attributes,P=0,tt=V.getAttributes();for(let K in tt)if(tt[K].location>=0){let gt=G[K],lt=z[K];if(lt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),gt===void 0||gt.attribute!==lt||lt&&gt.data!==lt.data)return!0;P++}return a.attributesNum!==P||a.index!==X}function v(R,F,V,X){let G={},z=F.attributes,P=0,tt=V.getAttributes();for(let K in tt)if(tt[K].location>=0){let gt=z[K];gt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(gt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(gt=R.instanceColor));let lt={};lt.attribute=gt,gt&&gt.data&&(lt.data=gt.data),G[K]=lt,P++}a.attributes=G,a.attributesNum=P,a.index=X}function b(){let R=a.newAttributes;for(let F=0,V=R.length;F<V;F++)R[F]=0}function g(R){h(R,0)}function h(R,F){let V=a.newAttributes,X=a.enabledAttributes,G=a.attributeDivisors;V[R]=1,X[R]===0&&(e.enableVertexAttribArray(R),X[R]=1),G[R]!==F&&(e.vertexAttribDivisor(R,F),G[R]=F)}function m(){let R=a.newAttributes,F=a.enabledAttributes;for(let V=0,X=F.length;V<X;V++)F[V]!==R[V]&&(e.disableVertexAttribArray(V),F[V]=0)}function _(R,F,V,X,G,z,P){P===!0?e.vertexAttribIPointer(R,F,V,G,z):e.vertexAttribPointer(R,F,V,X,G,z)}function S(R,F,V,X){b();let G=X.attributes,z=V.getAttributes(),P=F.defaultAttributeValues;for(let tt in z){let K=z[tt];if(K.location>=0){let dt=G[tt];if(dt===void 0&&(tt==="instanceMatrix"&&R.instanceMatrix&&(dt=R.instanceMatrix),tt==="instanceColor"&&R.instanceColor&&(dt=R.instanceColor)),dt!==void 0){let gt=dt.normalized,lt=dt.itemSize,It=t.get(dt);if(It===void 0)continue;let ae=It.buffer,me=It.type,Z=It.bytesPerElement,st=me===e.INT||me===e.UNSIGNED_INT||dt.gpuType===Wh;if(dt.isInterleavedBufferAttribute){let at=dt.data,Ot=at.stride,wt=dt.offset;if(at.isInstancedInterleavedBuffer){for(let et=0;et<K.locationSize;et++)h(K.location+et,at.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let et=0;et<K.locationSize;et++)g(K.location+et);e.bindBuffer(e.ARRAY_BUFFER,ae);for(let et=0;et<K.locationSize;et++)_(K.location+et,lt/K.locationSize,me,gt,Ot*Z,(wt+lt/K.locationSize*et)*Z,st)}else{if(dt.isInstancedBufferAttribute){for(let at=0;at<K.locationSize;at++)h(K.location+at,dt.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let at=0;at<K.locationSize;at++)g(K.location+at);e.bindBuffer(e.ARRAY_BUFFER,ae);for(let at=0;at<K.locationSize;at++)_(K.location+at,lt/K.locationSize,me,gt,lt*Z,lt/K.locationSize*at*Z,st)}}else if(P!==void 0){let gt=P[tt];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(K.location,gt);break;case 3:e.vertexAttrib3fv(K.location,gt);break;case 4:e.vertexAttrib4fv(K.location,gt);break;default:e.vertexAttrib1fv(K.location,gt)}}}}m()}function w(){E();for(let R in i){let F=i[R];for(let V in F){let X=F[V];for(let G in X){let z=X[G];for(let P in z)d(z[P].object),delete z[P];delete X[G]}}delete i[R]}}function C(R){if(i[R.id]===void 0)return;let F=i[R.id];for(let V in F){let X=F[V];for(let G in X){let z=X[G];for(let P in z)d(z[P].object),delete z[P];delete X[G]}}delete i[R.id]}function T(R){for(let F in i){let V=i[F];for(let X in V){let G=V[X];if(G[R.id]===void 0)continue;let z=G[R.id];for(let P in z)d(z[P].object),delete z[P];delete G[R.id]}}}function x(R){for(let F in i){let V=i[F],X=R.isInstancedMesh===!0?R.id:0,G=V[X];if(G!==void 0){for(let z in G){let P=G[z];for(let tt in P)d(P[tt].object),delete P[tt];delete G[z]}delete V[X],Object.keys(V).length===0&&delete i[F]}}}function E(){I(),r=!0,a!==s&&(a=s,c(a.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:g,disableUnusedAttributes:m}}function nC(e,t,n){let i;function s(c){i=c}function a(c,d){e.drawArrays(i,c,d),n.update(d,i,1)}function r(c,d,p){p!==0&&(e.drawArraysInstanced(i,c,d,p),n.update(d,i,p))}function o(c,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,p);let f=0;for(let v=0;v<p;v++)f+=d[v];n.update(f,i,1)}function l(c,d,p,u){if(p===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)r(c[v],d[v],u[v]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,p);let v=0;for(let b=0;b<p;b++)v+=d[b]*u[b];n.update(v,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function iC(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(T){return!(T!==oi&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let x=T===Fi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Rn&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==xi&&!x)}function l(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",d=l(c);d!==c&&(Ut("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:S,maxSamples:w,samples:C}}function sC(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Ui,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let f=p.length!==0||u||i!==0||s;return s=u,i=p.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=d(p,u,0)},this.setState=function(p,u,f){let v=p.clippingPlanes,b=p.clipIntersection,g=p.clipShadows,h=e.get(p);if(!s||v===null||v.length===0||a&&!g)a?d(null):c();else{let m=a?0:i,_=m*4,S=h.clippingState||null;l.value=S,S=d(v,u,_,f);for(let w=0;w!==_;++w)S[w]=n[w];h.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(p,u,f,v){let b=p!==null?p.length:0,g=null;if(b!==0){if(g=l.value,v!==!0||g===null){let h=f+b*4,m=u.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<h)&&(g=new Float32Array(h));for(let _=0,S=f;_!==b;++_,S+=4)r.copy(p[_]).applyMatrix4(m,o),r.normal.toArray(g,S),g[S+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,g}}var pa=4,nb=[.125,.215,.35,.446,.526,.582],Qa=20,aC=256,sc=new ql,ib=new Wt,Lg=null,Ig=0,Og=0,Pg=!1,rC=new H,bo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=rC}=a;Lg=this._renderer.getRenderTarget(),Ig=this._renderer.getActiveCubeFace(),Og=this._renderer.getActiveMipmapLevel(),Pg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rb(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ab(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Lg,Ig,Og),this._renderer.xr.enabled=Pg,t.scissorTest=!1,xo(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ha||t.mapping===Ya?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lg=this._renderer.getRenderTarget(),Ig=this._renderer.getActiveCubeFace(),Og=this._renderer.getActiveMipmapLevel(),Pg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Fi,format:oi,colorSpace:Wa,depthBuffer:!1},s=sb(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sb(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=oC(a)),this._blurMaterial=cC(a,t,n),this._ggxMaterial=lC(a,t,n)}return s}_compileMaterial(t){let n=new Qt(new Oi,t);this._renderer.compile(n,sc)}_sceneToCubeUV(t,n,i,s,a){let l=new ln(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(ib),p.toneMapping=_i,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new _e,new zl({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,h=!1,m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,h=!0):(g.color.copy(ib),h=!0);for(let _=0;_<6;_++){let S=_%3;S===0?(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[_],a.y,a.z)):S===1?(l.up.set(0,0,c[_]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[_],a.z)):(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[_]));let w=this._cubeSize;xo(s,S*w,_>2?w:0,w,w),p.setRenderTarget(s),h&&p.render(b,l),p.render(t,l)}p.toneMapping=f,p.autoClear=u,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===ha||t.mapping===Ya;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rb()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ab());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;xo(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,sc)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,f=p*u,{_lodMax:v}=this,b=this._sizeLods[i],g=3*b*(i>v-pa?i-v+pa:0),h=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=v-n,xo(a,g,h,3*b,2*b),s.setRenderTarget(a),s.render(o,sc),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=v-i,xo(t,g,h,3*b,2*b),s.setRenderTarget(t),s.render(o,sc)}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Dt("blur direction must be either latitudinal or longitudinal!");let d=3,p=this._lodMeshes[s];p.material=c;let u=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Qa-1),b=a/v,g=isFinite(a)?1+Math.floor(d*b):Qa;g>Qa&&Ut(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qa}`);let h=[],m=0;for(let T=0;T<Qa;++T){let x=T/b,E=Math.exp(-x*x/2);h.push(E),T===0?m+=E:T<g&&(m+=2*E)}for(let T=0;T<h.length;T++)h[T]=h[T]/m;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=v,u.mipInt.value=_-i;let S=this._sizeLods[s],w=3*S*(s>_-pa?s-_+pa:0),C=4*(this._cubeSize-S);xo(n,w,C,3*S,2*S),l.setRenderTarget(n),l.render(p,sc)}};function oC(e){let t=[],n=[],i=[],s=e,a=e-pa+1+nb.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);t.push(o);let l=1/o;r>e-pa?l=nb[r-e+pa-1]:r===0&&(l=0),n.push(l);let c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],f=6,v=6,b=3,g=2,h=1,m=new Float32Array(b*v*f),_=new Float32Array(g*v*f),S=new Float32Array(h*v*f);for(let C=0;C<f;C++){let T=C%3*2/3-1,x=C>2?0:-1,E=[T,x,0,T+2/3,x,0,T+2/3,x+1,0,T,x,0,T+2/3,x+1,0,T,x+1,0];m.set(E,b*v*C),_.set(u,g*v*C);let I=[C,C,C,C,C,C];S.set(I,h*v*C)}let w=new Oi;w.setAttribute("position",new kn(m,b)),w.setAttribute("uv",new kn(_,g)),w.setAttribute("faceIndex",new kn(S,h)),i.push(new Qt(w,null)),s>pa&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function sb(e,t,n){let i=new Xn(e,t,n);return i.texture.mapping=Kl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xo(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function lC(e,t,n){return new qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:aC,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Od(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function cC(e,t,n){let i=new Float32Array(Qa),s=new H(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Qa,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Od(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function ab(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Od(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function rb(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Od(){return`

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
	`}var Ld=class extends Xn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Vl(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _e(5,5,5),a=new qn({name:"CubemapFromEquirect",uniforms:Ja(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ie,blending:Bi});a.uniforms.tEquirect.value=n;let r=new Qt(s,a),o=n.minFilter;return n.minFilter===da&&(n.minFilter=cn),new Vh(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function uC(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){let f=u.mapping;if(f===Gh||f===kh)if(t.has(u)){let v=t.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let b=new Ld(v.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let f=u.mapping,v=f===Gh||f===kh,b=f===ha||f===Ya;if(v||b){let g=n.get(u),h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new bo(e)),g=v?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{let m=u.image;return v&&m&&m.height>0||b&&m&&l(m)?(i===null&&(i=new bo(e)),g=v?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,f){return f===Gh?u.mapping=ha:f===kh&&(u.mapping=Ya),u}function l(u){let f=0,v=6;for(let b=0;b<v;b++)u[b]!==void 0&&f++;return f===v}function c(u){let f=u.target;f.removeEventListener("dispose",c);let v=t.get(f);v!==void 0&&(t.delete(f),v.dispose())}function d(u){let f=u.target;f.removeEventListener("dispose",d);let v=n.get(f);v!==void 0&&(n.delete(f),v.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function hC(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&Il("WebGLRenderer: "+i+" extension not supported."),s}}}function dC(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let v in u.attributes)t.remove(u.attributes[v]);u.removeEventListener("dispose",r),delete s[u.id];let f=a.get(u);f&&(t.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let f in u)t.update(u[f],e.ARRAY_BUFFER)}function c(p){let u=[],f=p.index,v=p.attributes.position,b=0;if(v===void 0)return;if(f!==null){let m=f.array;b=f.version;for(let _=0,S=m.length;_<S;_+=3){let w=m[_+0],C=m[_+1],T=m[_+2];u.push(w,C,C,T,T,w)}}else{let m=v.array;b=v.version;for(let _=0,S=m.length/3-1;_<S;_+=3){let w=_+0,C=_+1,T=_+2;u.push(w,C,C,T,T,w)}}let g=new(v.count>=65535?Fl:Bl)(u,1);g.version=b;let h=a.get(p);h&&t.remove(h),a.set(p,g)}function d(p){let u=a.get(p);if(u){let f=p.index;f!==null&&u.version<f.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function fC(e,t,n){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,f){e.drawElements(i,f,a,u*r),n.update(f,i,1)}function c(u,f,v){v!==0&&(e.drawElementsInstanced(i,f,a,u*r,v),n.update(f,i,v))}function d(u,f,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,v);let g=0;for(let h=0;h<v;h++)g+=f[h];n.update(g,i,1)}function p(u,f,v,b){if(v===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<u.length;h++)c(u[h]/r,f[h],b[h]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,b,0,v);let h=0;for(let m=0;m<v;m++)h+=f[m]*b[m];n.update(h,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function pC(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Dt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function mC(e,t,n){let i=new WeakMap,s=new Re;function a(r,o,l){let c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==p){let E=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],m=o.morphAttributes.color||[],_=0;f===!0&&(_=1),v===!0&&(_=2),b===!0&&(_=3);let S=o.attributes.position.count*_,w=1;S>t.maxTextureSize&&(w=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let C=new Float32Array(S*w*4*p),T=new Ol(C,S,w,p);T.type=xi,T.needsUpdate=!0;let x=_*4;for(let I=0;I<p;I++){let R=g[I],F=h[I],V=m[I],X=S*w*4*I;for(let G=0;G<R.count;G++){let z=G*x;f===!0&&(s.fromBufferAttribute(R,G),C[X+z+0]=s.x,C[X+z+1]=s.y,C[X+z+2]=s.z,C[X+z+3]=0),v===!0&&(s.fromBufferAttribute(F,G),C[X+z+4]=s.x,C[X+z+5]=s.y,C[X+z+6]=s.z,C[X+z+7]=0),b===!0&&(s.fromBufferAttribute(V,G),C[X+z+8]=s.x,C[X+z+9]=s.y,C[X+z+10]=s.z,C[X+z+11]=V.itemSize===4?s.w:1)}}u={count:p,texture:T,size:new ee(S,w)},i.set(o,u),o.addEventListener("dispose",E)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let v=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(e,"morphTargetBaseInfluence",v),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function gC(e,t,n,i,s){let a=new WeakMap;function r(c){let d=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==d&&(t.update(u),a.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){let f=c.skeleton;a.get(f)!==d&&(f.update(),a.set(f,d))}return u}function o(){a=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}var vC={[dg]:"LINEAR_TONE_MAPPING",[fg]:"REINHARD_TONE_MAPPING",[pg]:"CINEON_TONE_MAPPING",[jl]:"ACES_FILMIC_TONE_MAPPING",[gg]:"AGX_TONE_MAPPING",[vg]:"NEUTRAL_TONE_MAPPING",[mg]:"CUSTOM_TONE_MAPPING"};function _C(e,t,n,i,s){let a=new Xn(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),r=new Xn(t,n,{type:Fi,depthBuffer:!1,stencilBuffer:!1}),o=new Oi;o.setAttribute("position",new ri([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ri([0,2,0,0,2,0],2));let l=new wh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Qt(o,l),d=new ql(-1,1,1,-1,0,1),p=null,u=null,f=!1,v,b=null,g=[],h=!1;this.setSize=function(m,_){a.setSize(m,_),r.setSize(m,_);for(let S=0;S<g.length;S++){let w=g[S];w.setSize&&w.setSize(m,_)}},this.setEffects=function(m){g=m,h=g.length>0&&g[0].isRenderPass===!0;let _=a.width,S=a.height;for(let w=0;w<g.length;w++){let C=g[w];C.setSize&&C.setSize(_,S)}},this.begin=function(m,_){if(f||m.toneMapping===_i&&g.length===0)return!1;if(b=_,_!==null){let S=_.width,w=_.height;(a.width!==S||a.height!==w)&&this.setSize(S,w)}return h===!1&&m.setRenderTarget(a),v=m.toneMapping,m.toneMapping=_i,!0},this.hasRenderPass=function(){return h},this.end=function(m,_){m.toneMapping=v,f=!0;let S=a,w=r;for(let C=0;C<g.length;C++){let T=g[C];if(T.enabled!==!1&&(T.render(m,w,S,_),T.needsSwap!==!1)){let x=S;S=w,w=x}}if(p!==m.outputColorSpace||u!==m.toneMapping){p=m.outputColorSpace,u=m.toneMapping,l.defines={},Kt.getTransfer(p)===oe&&(l.defines.SRGB_TRANSFER="");let C=vC[u];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,m.setRenderTarget(b),m.render(c,d),b=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),l.dispose()}}var Tb=new yn,zg=new oa(1,1),Ab=new Ol,wb=new Mh,Cb=new Vl,ob=[],lb=[],cb=new Float32Array(16),ub=new Float32Array(9),hb=new Float32Array(4);function Mo(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=ob[s];if(a===void 0&&(a=new Float32Array(s),ob[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function Ze(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Je(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Pd(e,t){let n=lb[t];n===void 0&&(n=new Int32Array(t),lb[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function yC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function xC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2fv(this.addr,t),Je(n,t)}}function SC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ze(n,t))return;e.uniform3fv(this.addr,t),Je(n,t)}}function bC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4fv(this.addr,t),Je(n,t)}}function MC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Je(n,t)}else{if(Ze(n,i))return;hb.set(i),e.uniformMatrix2fv(this.addr,!1,hb),Je(n,i)}}function EC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Je(n,t)}else{if(Ze(n,i))return;ub.set(i),e.uniformMatrix3fv(this.addr,!1,ub),Je(n,i)}}function TC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Je(n,t)}else{if(Ze(n,i))return;cb.set(i),e.uniformMatrix4fv(this.addr,!1,cb),Je(n,i)}}function AC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function wC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2iv(this.addr,t),Je(n,t)}}function CC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ze(n,t))return;e.uniform3iv(this.addr,t),Je(n,t)}}function RC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4iv(this.addr,t),Je(n,t)}}function DC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function UC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2uiv(this.addr,t),Je(n,t)}}function NC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ze(n,t))return;e.uniform3uiv(this.addr,t),Je(n,t)}}function LC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4uiv(this.addr,t),Je(n,t)}}function IC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(zg.compareFunction=n.isReversedDepthBuffer()?Dd:Rd,a=zg):a=Tb,n.setTexture2D(t||a,s)}function OC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||wb,s)}function PC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Cb,s)}function BC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Ab,s)}function FC(e){switch(e){case 5126:return yC;case 35664:return xC;case 35665:return SC;case 35666:return bC;case 35674:return MC;case 35675:return EC;case 35676:return TC;case 5124:case 35670:return AC;case 35667:case 35671:return wC;case 35668:case 35672:return CC;case 35669:case 35673:return RC;case 5125:return DC;case 36294:return UC;case 36295:return NC;case 36296:return LC;case 35678:case 36198:case 36298:case 36306:case 35682:return IC;case 35679:case 36299:case 36307:return OC;case 35680:case 36300:case 36308:case 36293:return PC;case 36289:case 36303:case 36311:case 36292:return BC}}function zC(e,t){e.uniform1fv(this.addr,t)}function VC(e,t){let n=Mo(t,this.size,2);e.uniform2fv(this.addr,n)}function HC(e,t){let n=Mo(t,this.size,3);e.uniform3fv(this.addr,n)}function GC(e,t){let n=Mo(t,this.size,4);e.uniform4fv(this.addr,n)}function kC(e,t){let n=Mo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function XC(e,t){let n=Mo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function WC(e,t){let n=Mo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function qC(e,t){e.uniform1iv(this.addr,t)}function YC(e,t){e.uniform2iv(this.addr,t)}function ZC(e,t){e.uniform3iv(this.addr,t)}function JC(e,t){e.uniform4iv(this.addr,t)}function jC(e,t){e.uniform1uiv(this.addr,t)}function KC(e,t){e.uniform2uiv(this.addr,t)}function QC(e,t){e.uniform3uiv(this.addr,t)}function $C(e,t){e.uniform4uiv(this.addr,t)}function tR(e,t,n){let i=this.cache,s=t.length,a=Pd(n,s);Ze(i,a)||(e.uniform1iv(this.addr,a),Je(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=zg:r=Tb;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function eR(e,t,n){let i=this.cache,s=t.length,a=Pd(n,s);Ze(i,a)||(e.uniform1iv(this.addr,a),Je(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||wb,a[r])}function nR(e,t,n){let i=this.cache,s=t.length,a=Pd(n,s);Ze(i,a)||(e.uniform1iv(this.addr,a),Je(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||Cb,a[r])}function iR(e,t,n){let i=this.cache,s=t.length,a=Pd(n,s);Ze(i,a)||(e.uniform1iv(this.addr,a),Je(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||Ab,a[r])}function sR(e){switch(e){case 5126:return zC;case 35664:return VC;case 35665:return HC;case 35666:return GC;case 35674:return kC;case 35675:return XC;case 35676:return WC;case 5124:case 35670:return qC;case 35667:case 35671:return YC;case 35668:case 35672:return ZC;case 35669:case 35673:return JC;case 5125:return jC;case 36294:return KC;case 36295:return QC;case 36296:return $C;case 35678:case 36198:case 36298:case 36306:case 35682:return tR;case 35679:case 36299:case 36307:return eR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}var Vg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=FC(n.type)}},Hg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=sR(n.type)}},Gg=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Bg=/(\w+)(\])?(\[|\.)?/g;function db(e,t){e.seq.push(t),e.map[t.id]=t}function aR(e,t,n){let i=e.name,s=i.length;for(Bg.lastIndex=0;;){let a=Bg.exec(i),r=Bg.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){db(n,c===void 0?new Vg(o,e,t):new Hg(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new Gg(o),db(n,p)),n=p}}}var So=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);aR(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function fb(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var rR=37297,oR=0;function lR(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var pb=new Ht;function cR(e){Kt._getMatrix(pb,Kt.workingColorSpace,e);let t=`mat3( ${pb.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case Ll:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function mb(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+lR(e.getShaderSource(t),o)}else return a}function uR(e,t){let n=cR(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var hR={[dg]:"Linear",[fg]:"Reinhard",[pg]:"Cineon",[jl]:"ACESFilmic",[gg]:"AgX",[vg]:"Neutral",[mg]:"Custom"};function dR(e,t){let n=hR[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Nd=new H;function fR(){Kt.getLuminanceCoefficients(Nd);let e=Nd.x.toFixed(4),t=Nd.y.toFixed(4),n=Nd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rc).join(`
`)}function mR(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function gR(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function rc(e){return e!==""}function gb(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var vR=/^[ \t]*#include +<([\w\d./]+)>/gm;function kg(e){return e.replace(vR,yR)}var _R=new Map;function yR(e,t){let n=Gt[t];if(n===void 0){let i=_R.get(t);if(i!==void 0)n=Gt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return kg(n)}var xR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _b(e){return e.replace(xR,SR)}function SR(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function yb(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var bR={[Jl]:"SHADOWMAP_TYPE_PCF",[vo]:"SHADOWMAP_TYPE_VSM"};function MR(e){return bR[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ER={[ha]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE",[Kl]:"ENVMAP_TYPE_CUBE_UV"};function TR(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":ER[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var AR={[Ya]:"ENVMAP_MODE_REFRACTION"};function wR(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":AR[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var CR={[hg]:"ENVMAP_BLENDING_MULTIPLY",[FS]:"ENVMAP_BLENDING_MIX",[zS]:"ENVMAP_BLENDING_ADD"};function RR(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":CR[e.combine]||"ENVMAP_BLENDING_NONE"}function DR(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function UR(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=MR(n),c=TR(n),d=wR(n),p=RR(n),u=DR(n),f=pR(n),v=mR(a),b=s.createProgram(),g,h,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(rc).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(rc).join(`
`),h.length>0&&(h+=`
`)):(g=[yb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rc).join(`
`),h=[yb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_i?"#define TONE_MAPPING":"",n.toneMapping!==_i?Gt.tonemapping_pars_fragment:"",n.toneMapping!==_i?dR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,uR("linearToOutputTexel",n.outputColorSpace),fR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(rc).join(`
`)),r=kg(r),r=gb(r,n),r=vb(r,n),o=kg(o),o=gb(o,n),o=vb(o,n),r=_b(r),o=_b(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===wg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===wg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let _=m+g+r,S=m+h+o,w=fb(s,s.VERTEX_SHADER,_),C=fb(s,s.FRAGMENT_SHADER,S);s.attachShader(b,w),s.attachShader(b,C),n.index0AttributeName!==void 0?s.bindAttribLocation(b,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function T(R){if(e.debug.checkShaderErrors){let F=s.getProgramInfoLog(b)||"",V=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(C)||"",G=F.trim(),z=V.trim(),P=X.trim(),tt=!0,K=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(tt=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,b,w,C);else{let dt=mb(s,w,"vertex"),gt=mb(s,C,"fragment");Dt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+dt+`
`+gt)}else G!==""?Ut("WebGLProgram: Program Info Log:",G):(z===""||P==="")&&(K=!1);K&&(R.diagnostics={runnable:tt,programLog:G,vertexShader:{log:z,prefix:g},fragmentShader:{log:P,prefix:h}})}s.deleteShader(w),s.deleteShader(C),x=new So(s,b),E=gR(s,b)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let I=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(b,rR)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=oR++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=w,this.fragmentShader=C,this}var NR=0,Xg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Wg(t),n.set(t,i)),i}},Wg=class{constructor(t){this.id=NR++,this.code=t,this.usedTimes=0}};function LR(e,t,n,i,s,a){let r=new Pl,o=new Xg,l=new Set,c=[],d=new Map,p=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function b(x,E,I,R,F){let V=R.fog,X=F.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,P=t.get(x.envMap||G,z),tt=P&&P.mapping===Kl?P.image.height:null,K=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ut("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let dt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,gt=dt!==void 0?dt.length:0,lt=0;X.morphAttributes.position!==void 0&&(lt=1),X.morphAttributes.normal!==void 0&&(lt=2),X.morphAttributes.color!==void 0&&(lt=3);let It,ae,me,Z;if(K){let le=Vi[K];It=le.vertexShader,ae=le.fragmentShader}else It=x.vertexShader,ae=x.fragmentShader,o.update(x),me=o.getVertexShaderID(x),Z=o.getFragmentShaderID(x);let st=e.getRenderTarget(),at=e.state.buffers.depth.getReversed(),Ot=F.isInstancedMesh===!0,wt=F.isBatchedMesh===!0,et=!!x.map,Bt=!!x.matcap,Ft=!!P,$t=!!x.aoMap,ne=!!x.lightMap,Nt=!!x.bumpMap,Oe=!!x.normalMap,D=!!x.displacementMap,Ve=!!x.emissiveMap,re=!!x.metalnessMap,ye=!!x.roughnessMap,bt=x.anisotropy>0,A=x.clearcoat>0,y=x.dispersion>0,N=x.iridescence>0,Y=x.sheen>0,j=x.transmission>0,q=bt&&!!x.anisotropyMap,vt=A&&!!x.clearcoatMap,rt=A&&!!x.clearcoatNormalMap,At=A&&!!x.clearcoatRoughnessMap,Ct=N&&!!x.iridescenceMap,Q=N&&!!x.iridescenceThicknessMap,nt=Y&&!!x.sheenColorMap,_t=Y&&!!x.sheenRoughnessMap,xt=!!x.specularMap,ft=!!x.specularColorMap,kt=!!x.specularIntensityMap,U=j&&!!x.transmissionMap,ot=j&&!!x.thicknessMap,it=!!x.gradientMap,mt=!!x.alphaMap,$=x.alphaTest>0,W=!!x.alphaHash,yt=!!x.extensions,Lt=_i;x.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Lt=e.toneMapping);let xe={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:It,fragmentShader:ae,defines:x.defines,customVertexShaderID:me,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:wt,batchingColor:wt&&F._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&F.instanceColor!==null,instancingMorph:Ot&&F.morphTexture!==null,outputColorSpace:st===null?e.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Wa,alphaToCoverage:!!x.alphaToCoverage,map:et,matcap:Bt,envMap:Ft,envMapMode:Ft&&P.mapping,envMapCubeUVHeight:tt,aoMap:$t,lightMap:ne,bumpMap:Nt,normalMap:Oe,displacementMap:D,emissiveMap:Ve,normalMapObjectSpace:Oe&&x.normalMapType===GS,normalMapTangentSpace:Oe&&x.normalMapType===Ag,metalnessMap:re,roughnessMap:ye,anisotropy:bt,anisotropyMap:q,clearcoat:A,clearcoatMap:vt,clearcoatNormalMap:rt,clearcoatRoughnessMap:At,dispersion:y,iridescence:N,iridescenceMap:Ct,iridescenceThicknessMap:Q,sheen:Y,sheenColorMap:nt,sheenRoughnessMap:_t,specularMap:xt,specularColorMap:ft,specularIntensityMap:kt,transmission:j,transmissionMap:U,thicknessMap:ot,gradientMap:it,opaque:x.transparent===!1&&x.blending===ka&&x.alphaToCoverage===!1,alphaMap:mt,alphaTest:$,alphaHash:W,combine:x.combine,mapUv:et&&v(x.map.channel),aoMapUv:$t&&v(x.aoMap.channel),lightMapUv:ne&&v(x.lightMap.channel),bumpMapUv:Nt&&v(x.bumpMap.channel),normalMapUv:Oe&&v(x.normalMap.channel),displacementMapUv:D&&v(x.displacementMap.channel),emissiveMapUv:Ve&&v(x.emissiveMap.channel),metalnessMapUv:re&&v(x.metalnessMap.channel),roughnessMapUv:ye&&v(x.roughnessMap.channel),anisotropyMapUv:q&&v(x.anisotropyMap.channel),clearcoatMapUv:vt&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:_t&&v(x.sheenRoughnessMap.channel),specularMapUv:xt&&v(x.specularMap.channel),specularColorMapUv:ft&&v(x.specularColorMap.channel),specularIntensityMapUv:kt&&v(x.specularIntensityMap.channel),transmissionMapUv:U&&v(x.transmissionMap.channel),thicknessMapUv:ot&&v(x.thicknessMap.channel),alphaMapUv:mt&&v(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Oe||bt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(et||mt),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||X.attributes.normal===void 0&&Oe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:at,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:lt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&I.length>0,shadowMapType:e.shadowMap.type,toneMapping:Lt,decodeVideoTexture:et&&x.map.isVideoTexture===!0&&Kt.getTransfer(x.map.colorSpace)===oe,decodeVideoTextureEmissive:Ve&&x.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(x.emissiveMap.colorSpace)===oe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pi,flipSided:x.side===Ie,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:yt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&x.extensions.multiDraw===!0||wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function g(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)E.push(I),E.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(h(E,x),m(E,x),E.push(e.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function h(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function m(x,E){r.disableAll(),E.instancing&&r.enable(0),E.instancingColor&&r.enable(1),E.instancingMorph&&r.enable(2),E.matcap&&r.enable(3),E.envMap&&r.enable(4),E.normalMapObjectSpace&&r.enable(5),E.normalMapTangentSpace&&r.enable(6),E.clearcoat&&r.enable(7),E.iridescence&&r.enable(8),E.alphaTest&&r.enable(9),E.vertexColors&&r.enable(10),E.vertexAlphas&&r.enable(11),E.vertexUv1s&&r.enable(12),E.vertexUv2s&&r.enable(13),E.vertexUv3s&&r.enable(14),E.vertexTangents&&r.enable(15),E.anisotropy&&r.enable(16),E.alphaHash&&r.enable(17),E.batching&&r.enable(18),E.dispersion&&r.enable(19),E.batchingColor&&r.enable(20),E.gradientMap&&r.enable(21),x.push(r.mask),r.disableAll(),E.fog&&r.enable(0),E.useFog&&r.enable(1),E.flatShading&&r.enable(2),E.logarithmicDepthBuffer&&r.enable(3),E.reversedDepthBuffer&&r.enable(4),E.skinning&&r.enable(5),E.morphTargets&&r.enable(6),E.morphNormals&&r.enable(7),E.morphColors&&r.enable(8),E.premultipliedAlpha&&r.enable(9),E.shadowMapEnabled&&r.enable(10),E.doubleSided&&r.enable(11),E.flipSided&&r.enable(12),E.useDepthPacking&&r.enable(13),E.dithering&&r.enable(14),E.transmission&&r.enable(15),E.sheen&&r.enable(16),E.opaque&&r.enable(17),E.pointsUvs&&r.enable(18),E.decodeVideoTexture&&r.enable(19),E.decodeVideoTextureEmissive&&r.enable(20),E.alphaToCoverage&&r.enable(21),x.push(r.mask)}function _(x){let E=f[x.type],I;if(E){let R=Vi[E];I=tb.clone(R.uniforms)}else I=x.uniforms;return I}function S(x,E){let I=d.get(E);return I!==void 0?++I.usedTimes:(I=new UR(e,E,x,s),c.push(I),d.set(E,I)),I}function w(x){if(--x.usedTimes===0){let E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function C(x){o.remove(x)}function T(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:C,programs:c,dispose:T}}function IR(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function OR(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function xb(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Sb(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,v,b,g,h){let m=e[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:v,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:g,group:h},e[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=v,m.materialVariant=r(u),m.groupOrder=b,m.renderOrder=u.renderOrder,m.z=g,m.group=h),t++,m}function l(u,f,v,b,g,h){let m=o(u,f,v,b,g,h);v.transmission>0?i.push(m):v.transparent===!0?s.push(m):n.push(m)}function c(u,f,v,b,g,h){let m=o(u,f,v,b,g,h);v.transmission>0?i.unshift(m):v.transparent===!0?s.unshift(m):n.unshift(m)}function d(u,f){n.length>1&&n.sort(u||OR),i.length>1&&i.sort(f||xb),s.length>1&&s.sort(f||xb)}function p(){for(let u=t,f=e.length;u<f;u++){let v=e[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:d}}function PR(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new Sb,e.set(i,[r])):s>=a.length?(r=new Sb,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function BR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new H,color:new Wt};break;case"SpotLight":n={position:new H,direction:new H,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":n={color:new Wt,position:new H,halfWidth:new H,halfHeight:new H};break}return e[t.id]=n,n}}}function FR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var zR=0;function VR(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function HR(e){let t=new BR,n=FR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);let s=new H,a=new Le,r=new Le;function o(c){let d=0,p=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,v=0,b=0,g=0,h=0,m=0,_=0,S=0,w=0,C=0,T=0;c.sort(VR);for(let E=0,I=c.length;E<I;E++){let R=c[E],F=R.color,V=R.intensity,X=R.distance,G=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Za?G=R.shadow.map.texture:G=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=F.r*V,p+=F.g*V,u+=F.b*V;else if(R.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],V);T++}else if(R.isDirectionalLight){let z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let P=R.shadow,tt=n.get(R);tt.shadowIntensity=P.intensity,tt.shadowBias=P.bias,tt.shadowNormalBias=P.normalBias,tt.shadowRadius=P.radius,tt.shadowMapSize=P.mapSize,i.directionalShadow[f]=tt,i.directionalShadowMap[f]=G,i.directionalShadowMatrix[f]=R.shadow.matrix,m++}i.directional[f]=z,f++}else if(R.isSpotLight){let z=t.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(F).multiplyScalar(V),z.distance=X,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,i.spot[b]=z;let P=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,P.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[b]=P.matrix,R.castShadow){let tt=n.get(R);tt.shadowIntensity=P.intensity,tt.shadowBias=P.bias,tt.shadowNormalBias=P.normalBias,tt.shadowRadius=P.radius,tt.shadowMapSize=P.mapSize,i.spotShadow[b]=tt,i.spotShadowMap[b]=G,S++}b++}else if(R.isRectAreaLight){let z=t.get(R);z.color.copy(F).multiplyScalar(V),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=z,g++}else if(R.isPointLight){let z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){let P=R.shadow,tt=n.get(R);tt.shadowIntensity=P.intensity,tt.shadowBias=P.bias,tt.shadowNormalBias=P.normalBias,tt.shadowRadius=P.radius,tt.shadowMapSize=P.mapSize,tt.shadowCameraNear=P.camera.near,tt.shadowCameraFar=P.camera.far,i.pointShadow[v]=tt,i.pointShadowMap[v]=G,i.pointShadowMatrix[v]=R.shadow.matrix,_++}i.point[v]=z,v++}else if(R.isHemisphereLight){let z=t.get(R);z.skyColor.copy(R.color).multiplyScalar(V),z.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[h]=z,h++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;let x=i.hash;(x.directionalLength!==f||x.pointLength!==v||x.spotLength!==b||x.rectAreaLength!==g||x.hemiLength!==h||x.numDirectionalShadows!==m||x.numPointShadows!==_||x.numSpotShadows!==S||x.numSpotMaps!==w||x.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=g,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=T,x.directionalLength=f,x.pointLength=v,x.spotLength=b,x.rectAreaLength=g,x.hemiLength=h,x.numDirectionalShadows=m,x.numPointShadows=_,x.numSpotShadows=S,x.numSpotMaps=w,x.numLightProbes=T,i.version=zR++)}function l(c,d){let p=0,u=0,f=0,v=0,b=0,g=d.matrixWorldInverse;for(let h=0,m=c.length;h<m;h++){let _=c[h];if(_.isDirectionalLight){let S=i.directional[p];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),p++}else if(_.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),r.identity(),a.copy(_.matrixWorld),a.premultiply(g),r.extractRotation(a),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),v++}else if(_.isPointLight){let S=i.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){let S=i.hemi[b];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),b++}}}return{setup:o,setupView:l,state:i}}function bb(e){let t=new HR(e),n=[],i=[];function s(d){c.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function r(d){i.push(d)}function o(){t.setup(n)}function l(d){t.setupView(n,d)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function GR(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new bb(e),t.set(s,[o])):a>=r.length?(o=new bb(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var kR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XR=`uniform sampler2D shadow_pass;
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
}`,WR=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],qR=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Mb=new Le,ac=new H,Fg=new H;function YR(e,t,n){let i=new mo,s=new ee,a=new ee,r=new Re,o=new Ch,l=new Rh,c={},d=n.maxTextureSize,p={[gs]:Ie,[Ie]:gs,[Pi]:Pi},u=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:kR,fragmentShader:XR}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let v=new Oi;v.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Qt(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jl;let h=this.type;this.render=function(C,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===yS&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Jl);let E=e.getRenderTarget(),I=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),F=e.state;F.setBlending(Bi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=h!==this.type;V&&T.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(G=>G.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,G=C.length;X<G;X++){let z=C[X],P=z.shadow;if(P===void 0){Ut("WebGLShadowMap:",z,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let tt=P.getFrameExtents();s.multiply(tt),a.copy(P.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/tt.x),s.x=a.x*tt.x,P.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/tt.y),s.y=a.y*tt.y,P.mapSize.y=a.y));let K=e.state.buffers.depth.getReversed();if(P.camera._reversedDepth=K,P.map===null||V===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===vo){if(z.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new Xn(s.x,s.y,{format:Za,type:Fi,minFilter:cn,magFilter:cn,generateMipmaps:!1}),P.map.texture.name=z.name+".shadowMap",P.map.depthTexture=new oa(s.x,s.y,xi),P.map.depthTexture.name=z.name+".shadowMapDepth",P.map.depthTexture.format=Li,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=ze,P.map.depthTexture.magFilter=ze}else z.isPointLight?(P.map=new Ld(s.x),P.map.depthTexture=new Ah(s.x,yi)):(P.map=new Xn(s.x,s.y),P.map.depthTexture=new oa(s.x,s.y,yi)),P.map.depthTexture.name=z.name+".shadowMap",P.map.depthTexture.format=Li,this.type===Jl?(P.map.depthTexture.compareFunction=K?Dd:Rd,P.map.depthTexture.minFilter=cn,P.map.depthTexture.magFilter=cn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=ze,P.map.depthTexture.magFilter=ze);P.camera.updateProjectionMatrix()}let dt=P.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<dt;gt++){if(P.map.isWebGLCubeRenderTarget)e.setRenderTarget(P.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(P.map),e.clear());let lt=P.getViewport(gt);r.set(a.x*lt.x,a.y*lt.y,a.x*lt.z,a.y*lt.w),F.viewport(r)}if(z.isPointLight){let lt=P.camera,It=P.matrix,ae=z.distance||lt.far;ae!==lt.far&&(lt.far=ae,lt.updateProjectionMatrix()),ac.setFromMatrixPosition(z.matrixWorld),lt.position.copy(ac),Fg.copy(lt.position),Fg.add(WR[gt]),lt.up.copy(qR[gt]),lt.lookAt(Fg),lt.updateMatrixWorld(),It.makeTranslation(-ac.x,-ac.y,-ac.z),Mb.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),P._frustum.setFromProjectionMatrix(Mb,lt.coordinateSystem,lt.reversedDepth)}else P.updateMatrices(z);i=P.getFrustum(),S(T,x,P.camera,z,this.type)}P.isPointLightShadow!==!0&&this.type===vo&&m(P,x),P.needsUpdate=!1}h=this.type,g.needsUpdate=!1,e.setRenderTarget(E,I,R)};function m(C,T){let x=t.update(b);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Xn(s.x,s.y,{format:Za,type:Fi})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(T,null,x,u,b,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(T,null,x,f,b,null)}function _(C,T,x,E){let I=null,R=x.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)I=R;else if(I=x.isPointLight===!0?l:o,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let F=I.uuid,V=T.uuid,X=c[F];X===void 0&&(X={},c[F]=X);let G=X[V];G===void 0&&(G=I.clone(),X[V]=G,T.addEventListener("dispose",w)),I=G}if(I.visible=T.visible,I.wireframe=T.wireframe,E===vo?I.side=T.shadowSide!==null?T.shadowSide:T.side:I.side=T.shadowSide!==null?T.shadowSide:p[T.side],I.alphaMap=T.alphaMap,I.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=e.properties.get(I);F.light=x}return I}function S(C,T,x,E,I){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&I===vo)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,C.matrixWorld);let V=t.update(C),X=C.material;if(Array.isArray(X)){let G=V.groups;for(let z=0,P=G.length;z<P;z++){let tt=G[z],K=X[tt.materialIndex];if(K&&K.visible){let dt=_(C,K,E,I);C.onBeforeShadow(e,C,T,x,V,dt,tt),e.renderBufferDirect(x,null,V,dt,C,tt),C.onAfterShadow(e,C,T,x,V,dt,tt)}}}else if(X.visible){let G=_(C,X,E,I);C.onBeforeShadow(e,C,T,x,V,G,null),e.renderBufferDirect(x,null,V,G,C,null),C.onAfterShadow(e,C,T,x,V,G,null)}}let F=C.children;for(let V=0,X=F.length;V<X;V++)S(F[V],T,x,E,I)}function w(C){C.target.removeEventListener("dispose",w);for(let x in c){let E=c[x],I=C.target.uuid;I in E&&(E[I].dispose(),delete E[I])}}}function ZR(e,t){function n(){let U=!1,ot=new Re,it=null,mt=new Re(0,0,0,0);return{setMask:function($){it!==$&&!U&&(e.colorMask($,$,$,$),it=$)},setLocked:function($){U=$},setClear:function($,W,yt,Lt,xe){xe===!0&&($*=Lt,W*=Lt,yt*=Lt),ot.set($,W,yt,Lt),mt.equals(ot)===!1&&(e.clearColor($,W,yt,Lt),mt.copy(ot))},reset:function(){U=!1,it=null,mt.set(-1,0,0,0)}}}function i(){let U=!1,ot=!1,it=null,mt=null,$=null;return{setReversed:function(W){if(ot!==W){let yt=t.get("EXT_clip_control");W?yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.ZERO_TO_ONE_EXT):yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.NEGATIVE_ONE_TO_ONE_EXT),ot=W;let Lt=$;$=null,this.setClear(Lt)}},getReversed:function(){return ot},setTest:function(W){W?st(e.DEPTH_TEST):at(e.DEPTH_TEST)},setMask:function(W){it!==W&&!U&&(e.depthMask(W),it=W)},setFunc:function(W){if(ot&&(W=QS[W]),mt!==W){switch(W){case uh:e.depthFunc(e.NEVER);break;case hh:e.depthFunc(e.ALWAYS);break;case dh:e.depthFunc(e.LESS);break;case Xa:e.depthFunc(e.LEQUAL);break;case fh:e.depthFunc(e.EQUAL);break;case ph:e.depthFunc(e.GEQUAL);break;case mh:e.depthFunc(e.GREATER);break;case gh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}mt=W}},setLocked:function(W){U=W},setClear:function(W){$!==W&&($=W,ot&&(W=1-W),e.clearDepth(W))},reset:function(){U=!1,it=null,mt=null,$=null,ot=!1}}}function s(){let U=!1,ot=null,it=null,mt=null,$=null,W=null,yt=null,Lt=null,xe=null;return{setTest:function(le){U||(le?st(e.STENCIL_TEST):at(e.STENCIL_TEST))},setMask:function(le){ot!==le&&!U&&(e.stencilMask(le),ot=le)},setFunc:function(le,Hi,Gi){(it!==le||mt!==Hi||$!==Gi)&&(e.stencilFunc(le,Hi,Gi),it=le,mt=Hi,$=Gi)},setOp:function(le,Hi,Gi){(W!==le||yt!==Hi||Lt!==Gi)&&(e.stencilOp(le,Hi,Gi),W=le,yt=Hi,Lt=Gi)},setLocked:function(le){U=le},setClear:function(le){xe!==le&&(e.clearStencil(le),xe=le)},reset:function(){U=!1,ot=null,it=null,mt=null,$=null,W=null,yt=null,Lt=null,xe=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},p={},u=new WeakMap,f=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,w=null,C=null,T=new Wt(0,0,0),x=0,E=!1,I=null,R=null,F=null,V=null,X=null,G=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,P=0,tt=e.getParameter(e.VERSION);tt.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(tt)[1]),z=P>=1):tt.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),z=P>=2);let K=null,dt={},gt=e.getParameter(e.SCISSOR_BOX),lt=e.getParameter(e.VIEWPORT),It=new Re().fromArray(gt),ae=new Re().fromArray(lt);function me(U,ot,it,mt){let $=new Uint8Array(4),W=e.createTexture();e.bindTexture(U,W),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let yt=0;yt<it;yt++)U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY?e.texImage3D(ot,0,e.RGBA,1,1,mt,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(ot+yt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return W}let Z={};Z[e.TEXTURE_2D]=me(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=me(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=me(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=me(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),st(e.DEPTH_TEST),r.setFunc(Xa),Nt(!1),Oe(og),st(e.CULL_FACE),$t(Bi);function st(U){d[U]!==!0&&(e.enable(U),d[U]=!0)}function at(U){d[U]!==!1&&(e.disable(U),d[U]=!1)}function Ot(U,ot){return p[U]!==ot?(e.bindFramebuffer(U,ot),p[U]=ot,U===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=ot),U===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=ot),!0):!1}function wt(U,ot){let it=f,mt=!1;if(U){it=u.get(ot),it===void 0&&(it=[],u.set(ot,it));let $=U.textures;if(it.length!==$.length||it[0]!==e.COLOR_ATTACHMENT0){for(let W=0,yt=$.length;W<yt;W++)it[W]=e.COLOR_ATTACHMENT0+W;it.length=$.length,mt=!0}}else it[0]!==e.BACK&&(it[0]=e.BACK,mt=!0);mt&&e.drawBuffers(it)}function et(U){return v!==U?(e.useProgram(U),v=U,!0):!1}let Bt={[sa]:e.FUNC_ADD,[SS]:e.FUNC_SUBTRACT,[bS]:e.FUNC_REVERSE_SUBTRACT};Bt[MS]=e.MIN,Bt[ES]=e.MAX;let Ft={[TS]:e.ZERO,[AS]:e.ONE,[wS]:e.SRC_COLOR,[lh]:e.SRC_ALPHA,[LS]:e.SRC_ALPHA_SATURATE,[US]:e.DST_COLOR,[RS]:e.DST_ALPHA,[CS]:e.ONE_MINUS_SRC_COLOR,[ch]:e.ONE_MINUS_SRC_ALPHA,[NS]:e.ONE_MINUS_DST_COLOR,[DS]:e.ONE_MINUS_DST_ALPHA,[IS]:e.CONSTANT_COLOR,[OS]:e.ONE_MINUS_CONSTANT_COLOR,[PS]:e.CONSTANT_ALPHA,[BS]:e.ONE_MINUS_CONSTANT_ALPHA};function $t(U,ot,it,mt,$,W,yt,Lt,xe,le){if(U===Bi){b===!0&&(at(e.BLEND),b=!1);return}if(b===!1&&(st(e.BLEND),b=!0),U!==xS){if(U!==g||le!==E){if((h!==sa||S!==sa)&&(e.blendEquation(e.FUNC_ADD),h=sa,S=sa),le)switch(U){case ka:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case lg:e.blendFunc(e.ONE,e.ONE);break;case cg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ug:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Dt("WebGLState: Invalid blending: ",U);break}else switch(U){case ka:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case lg:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case cg:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ug:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",U);break}m=null,_=null,w=null,C=null,T.set(0,0,0),x=0,g=U,E=le}return}$=$||ot,W=W||it,yt=yt||mt,(ot!==h||$!==S)&&(e.blendEquationSeparate(Bt[ot],Bt[$]),h=ot,S=$),(it!==m||mt!==_||W!==w||yt!==C)&&(e.blendFuncSeparate(Ft[it],Ft[mt],Ft[W],Ft[yt]),m=it,_=mt,w=W,C=yt),(Lt.equals(T)===!1||xe!==x)&&(e.blendColor(Lt.r,Lt.g,Lt.b,xe),T.copy(Lt),x=xe),g=U,E=!1}function ne(U,ot){U.side===Pi?at(e.CULL_FACE):st(e.CULL_FACE);let it=U.side===Ie;ot&&(it=!it),Nt(it),U.blending===ka&&U.transparent===!1?$t(Bi):$t(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);let mt=U.stencilWrite;o.setTest(mt),mt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ve(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?st(e.SAMPLE_ALPHA_TO_COVERAGE):at(e.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(U){I!==U&&(U?e.frontFace(e.CW):e.frontFace(e.CCW),I=U)}function Oe(U){U!==vS?(st(e.CULL_FACE),U!==R&&(U===og?e.cullFace(e.BACK):U===_S?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):at(e.CULL_FACE),R=U}function D(U){U!==F&&(z&&e.lineWidth(U),F=U)}function Ve(U,ot,it){U?(st(e.POLYGON_OFFSET_FILL),(V!==ot||X!==it)&&(V=ot,X=it,r.getReversed()&&(ot=-ot),e.polygonOffset(ot,it))):at(e.POLYGON_OFFSET_FILL)}function re(U){U?st(e.SCISSOR_TEST):at(e.SCISSOR_TEST)}function ye(U){U===void 0&&(U=e.TEXTURE0+G-1),K!==U&&(e.activeTexture(U),K=U)}function bt(U,ot,it){it===void 0&&(K===null?it=e.TEXTURE0+G-1:it=K);let mt=dt[it];mt===void 0&&(mt={type:void 0,texture:void 0},dt[it]=mt),(mt.type!==U||mt.texture!==ot)&&(K!==it&&(e.activeTexture(it),K=it),e.bindTexture(U,ot||Z[U]),mt.type=U,mt.texture=ot)}function A(){let U=dt[K];U!==void 0&&U.type!==void 0&&(e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function y(){try{e.compressedTexImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function N(){try{e.compressedTexImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function Y(){try{e.texSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function j(){try{e.texSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function q(){try{e.compressedTexSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function vt(){try{e.compressedTexSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function rt(){try{e.texStorage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function At(){try{e.texStorage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function Ct(){try{e.texImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function Q(){try{e.texImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function nt(U){It.equals(U)===!1&&(e.scissor(U.x,U.y,U.z,U.w),It.copy(U))}function _t(U){ae.equals(U)===!1&&(e.viewport(U.x,U.y,U.z,U.w),ae.copy(U))}function xt(U,ot){let it=c.get(ot);it===void 0&&(it=new WeakMap,c.set(ot,it));let mt=it.get(U);mt===void 0&&(mt=e.getUniformBlockIndex(ot,U.name),it.set(U,mt))}function ft(U,ot){let mt=c.get(ot).get(U);l.get(ot)!==mt&&(e.uniformBlockBinding(ot,mt,U.__bindingPointIndex),l.set(ot,mt))}function kt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),d={},K=null,dt={},p={},u=new WeakMap,f=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,w=null,C=null,T=new Wt(0,0,0),x=0,E=!1,I=null,R=null,F=null,V=null,X=null,It.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:st,disable:at,bindFramebuffer:Ot,drawBuffers:wt,useProgram:et,setBlending:$t,setMaterial:ne,setFlipSided:Nt,setCullFace:Oe,setLineWidth:D,setPolygonOffset:Ve,setScissorTest:re,activeTexture:ye,bindTexture:bt,unbindTexture:A,compressedTexImage2D:y,compressedTexImage3D:N,texImage2D:Ct,texImage3D:Q,updateUBOMapping:xt,uniformBlockBinding:ft,texStorage2D:rt,texStorage3D:At,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:q,compressedTexSubImage3D:vt,scissor:nt,viewport:_t,reset:kt}}function JR(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ee,d=new WeakMap,p,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,y){return f?new OffscreenCanvas(A,y):lo("canvas")}function b(A,y,N){let Y=1,j=bt(A);if((j.width>N||j.height>N)&&(Y=N/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let q=Math.floor(Y*j.width),vt=Math.floor(Y*j.height);p===void 0&&(p=v(q,vt));let rt=y?v(q,vt):p;return rt.width=q,rt.height=vt,rt.getContext("2d").drawImage(A,0,0,q,vt),Ut("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+q+"x"+vt+")."),rt}else return"data"in A&&Ut("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function g(A){return A.generateMipmaps}function h(A){e.generateMipmap(A)}function m(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(A,y,N,Y,j=!1){if(A!==null){if(e[A]!==void 0)return e[A];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=y;if(y===e.RED&&(N===e.FLOAT&&(q=e.R32F),N===e.HALF_FLOAT&&(q=e.R16F),N===e.UNSIGNED_BYTE&&(q=e.R8)),y===e.RED_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.R8UI),N===e.UNSIGNED_SHORT&&(q=e.R16UI),N===e.UNSIGNED_INT&&(q=e.R32UI),N===e.BYTE&&(q=e.R8I),N===e.SHORT&&(q=e.R16I),N===e.INT&&(q=e.R32I)),y===e.RG&&(N===e.FLOAT&&(q=e.RG32F),N===e.HALF_FLOAT&&(q=e.RG16F),N===e.UNSIGNED_BYTE&&(q=e.RG8)),y===e.RG_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RG8UI),N===e.UNSIGNED_SHORT&&(q=e.RG16UI),N===e.UNSIGNED_INT&&(q=e.RG32UI),N===e.BYTE&&(q=e.RG8I),N===e.SHORT&&(q=e.RG16I),N===e.INT&&(q=e.RG32I)),y===e.RGB_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RGB8UI),N===e.UNSIGNED_SHORT&&(q=e.RGB16UI),N===e.UNSIGNED_INT&&(q=e.RGB32UI),N===e.BYTE&&(q=e.RGB8I),N===e.SHORT&&(q=e.RGB16I),N===e.INT&&(q=e.RGB32I)),y===e.RGBA_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RGBA8UI),N===e.UNSIGNED_SHORT&&(q=e.RGBA16UI),N===e.UNSIGNED_INT&&(q=e.RGBA32UI),N===e.BYTE&&(q=e.RGBA8I),N===e.SHORT&&(q=e.RGBA16I),N===e.INT&&(q=e.RGBA32I)),y===e.RGB&&(N===e.UNSIGNED_INT_5_9_9_9_REV&&(q=e.RGB9_E5),N===e.UNSIGNED_INT_10F_11F_11F_REV&&(q=e.R11F_G11F_B10F)),y===e.RGBA){let vt=j?Ll:Kt.getTransfer(Y);N===e.FLOAT&&(q=e.RGBA32F),N===e.HALF_FLOAT&&(q=e.RGBA16F),N===e.UNSIGNED_BYTE&&(q=vt===oe?e.SRGB8_ALPHA8:e.RGBA8),N===e.UNSIGNED_SHORT_4_4_4_4&&(q=e.RGBA4),N===e.UNSIGNED_SHORT_5_5_5_1&&(q=e.RGB5_A1)}return(q===e.R16F||q===e.R32F||q===e.RG16F||q===e.RG32F||q===e.RGBA16F||q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function S(A,y){let N;return A?y===null||y===yi||y===yo?N=e.DEPTH24_STENCIL8:y===xi?N=e.DEPTH32F_STENCIL8:y===_o&&(N=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===yi||y===yo?N=e.DEPTH_COMPONENT24:y===xi?N=e.DEPTH_COMPONENT32F:y===_o&&(N=e.DEPTH_COMPONENT16),N}function w(A,y){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==ze&&A.minFilter!==cn?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function C(A){let y=A.target;y.removeEventListener("dispose",C),x(y),y.isVideoTexture&&d.delete(y)}function T(A){let y=A.target;y.removeEventListener("dispose",T),I(y)}function x(A){let y=i.get(A);if(y.__webglInit===void 0)return;let N=A.source,Y=u.get(N);if(Y){let j=Y[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(A),Object.keys(Y).length===0&&u.delete(N)}i.remove(A)}function E(A){let y=i.get(A);e.deleteTexture(y.__webglTexture);let N=A.source,Y=u.get(N);delete Y[y.__cacheKey],r.memory.textures--}function I(A){let y=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let j=0;j<y.__webglFramebuffer[Y].length;j++)e.deleteFramebuffer(y.__webglFramebuffer[Y][j]);else e.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)e.deleteFramebuffer(y.__webglFramebuffer[Y]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&e.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&e.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let N=A.textures;for(let Y=0,j=N.length;Y<j;Y++){let q=i.get(N[Y]);q.__webglTexture&&(e.deleteTexture(q.__webglTexture),r.memory.textures--),i.remove(N[Y])}i.remove(A)}let R=0;function F(){R=0}function V(){let A=R;return A>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),R+=1,A}function X(A){let y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function G(A,y){let N=i.get(A);if(A.isVideoTexture&&re(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&N.__version!==A.version){let Y=A.image;if(Y===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Z(N,A,y);return}}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,N.__webglTexture,e.TEXTURE0+y)}function z(A,y){let N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Z(N,A,y);return}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,N.__webglTexture,e.TEXTURE0+y)}function P(A,y){let N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Z(N,A,y);return}n.bindTexture(e.TEXTURE_3D,N.__webglTexture,e.TEXTURE0+y)}function tt(A,y){let N=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&N.__version!==A.version){st(N,A,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,N.__webglTexture,e.TEXTURE0+y)}let K={[vh]:e.REPEAT,[Ni]:e.CLAMP_TO_EDGE,[_h]:e.MIRRORED_REPEAT},dt={[ze]:e.NEAREST,[VS]:e.NEAREST_MIPMAP_NEAREST,[Ql]:e.NEAREST_MIPMAP_LINEAR,[cn]:e.LINEAR,[Xh]:e.LINEAR_MIPMAP_NEAREST,[da]:e.LINEAR_MIPMAP_LINEAR},gt={[kS]:e.NEVER,[ZS]:e.ALWAYS,[XS]:e.LESS,[Rd]:e.LEQUAL,[WS]:e.EQUAL,[Dd]:e.GEQUAL,[qS]:e.GREATER,[YS]:e.NOTEQUAL};function lt(A,y){if(y.type===xi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===cn||y.magFilter===Xh||y.magFilter===Ql||y.magFilter===da||y.minFilter===cn||y.minFilter===Xh||y.minFilter===Ql||y.minFilter===da)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,K[y.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,K[y.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,K[y.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,dt[y.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,dt[y.minFilter]),y.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,gt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ze||y.minFilter!==Ql&&y.minFilter!==da||y.type===xi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function It(A,y){let N=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",C));let Y=y.source,j=u.get(Y);j===void 0&&(j={},u.set(Y,j));let q=X(y);if(q!==A.__cacheKey){j[q]===void 0&&(j[q]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,N=!0),j[q].usedTimes++;let vt=j[A.__cacheKey];vt!==void 0&&(j[A.__cacheKey].usedTimes--,vt.usedTimes===0&&E(y)),A.__cacheKey=q,A.__webglTexture=j[q].texture}return N}function ae(A,y,N){return Math.floor(Math.floor(A/N)/y)}function me(A,y,N,Y){let q=A.updateRanges;if(q.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,y.width,y.height,N,Y,y.data);else{q.sort((Q,nt)=>Q.start-nt.start);let vt=0;for(let Q=1;Q<q.length;Q++){let nt=q[vt],_t=q[Q],xt=nt.start+nt.count,ft=ae(_t.start,y.width,4),kt=ae(nt.start,y.width,4);_t.start<=xt+1&&ft===kt&&ae(_t.start+_t.count-1,y.width,4)===ft?nt.count=Math.max(nt.count,_t.start+_t.count-nt.start):(++vt,q[vt]=_t)}q.length=vt+1;let rt=e.getParameter(e.UNPACK_ROW_LENGTH),At=e.getParameter(e.UNPACK_SKIP_PIXELS),Ct=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,y.width);for(let Q=0,nt=q.length;Q<nt;Q++){let _t=q[Q],xt=Math.floor(_t.start/4),ft=Math.ceil(_t.count/4),kt=xt%y.width,U=Math.floor(xt/y.width),ot=ft,it=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(e.UNPACK_SKIP_ROWS,U),n.texSubImage2D(e.TEXTURE_2D,0,kt,U,ot,it,N,Y,y.data)}A.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,rt),e.pixelStorei(e.UNPACK_SKIP_PIXELS,At),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ct)}}function Z(A,y,N){let Y=e.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=e.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=e.TEXTURE_3D);let j=It(A,y),q=y.source;n.bindTexture(Y,A.__webglTexture,e.TEXTURE0+N);let vt=i.get(q);if(q.version!==vt.__version||j===!0){n.activeTexture(e.TEXTURE0+N);let rt=Kt.getPrimaries(Kt.workingColorSpace),At=y.colorSpace===_s?null:Kt.getPrimaries(y.colorSpace),Ct=y.colorSpace===_s||rt===At?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let Q=b(y.image,!1,s.maxTextureSize);Q=ye(y,Q);let nt=a.convert(y.format,y.colorSpace),_t=a.convert(y.type),xt=_(y.internalFormat,nt,_t,y.colorSpace,y.isVideoTexture);lt(Y,y);let ft,kt=y.mipmaps,U=y.isVideoTexture!==!0,ot=vt.__version===void 0||j===!0,it=q.dataReady,mt=w(y,Q);if(y.isDepthTexture)xt=S(y.format===fa,y.type),ot&&(U?n.texStorage2D(e.TEXTURE_2D,1,xt,Q.width,Q.height):n.texImage2D(e.TEXTURE_2D,0,xt,Q.width,Q.height,0,nt,_t,null));else if(y.isDataTexture)if(kt.length>0){U&&ot&&n.texStorage2D(e.TEXTURE_2D,mt,xt,kt[0].width,kt[0].height);for(let $=0,W=kt.length;$<W;$++)ft=kt[$],U?it&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,ft.width,ft.height,nt,_t,ft.data):n.texImage2D(e.TEXTURE_2D,$,xt,ft.width,ft.height,0,nt,_t,ft.data);y.generateMipmaps=!1}else U?(ot&&n.texStorage2D(e.TEXTURE_2D,mt,xt,Q.width,Q.height),it&&me(y,Q,nt,_t)):n.texImage2D(e.TEXTURE_2D,0,xt,Q.width,Q.height,0,nt,_t,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){U&&ot&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,xt,kt[0].width,kt[0].height,Q.depth);for(let $=0,W=kt.length;$<W;$++)if(ft=kt[$],y.format!==oi)if(nt!==null)if(U){if(it)if(y.layerUpdates.size>0){let yt=Ng(ft.width,ft.height,y.format,y.type);for(let Lt of y.layerUpdates){let xe=ft.data.subarray(Lt*yt/ft.data.BYTES_PER_ELEMENT,(Lt+1)*yt/ft.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Lt,ft.width,ft.height,1,nt,xe)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ft.width,ft.height,Q.depth,nt,ft.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,xt,ft.width,ft.height,Q.depth,0,ft.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?it&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ft.width,ft.height,Q.depth,nt,_t,ft.data):n.texImage3D(e.TEXTURE_2D_ARRAY,$,xt,ft.width,ft.height,Q.depth,0,nt,_t,ft.data)}else{U&&ot&&n.texStorage2D(e.TEXTURE_2D,mt,xt,kt[0].width,kt[0].height);for(let $=0,W=kt.length;$<W;$++)ft=kt[$],y.format!==oi?nt!==null?U?it&&n.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,ft.width,ft.height,nt,ft.data):n.compressedTexImage2D(e.TEXTURE_2D,$,xt,ft.width,ft.height,0,ft.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?it&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,ft.width,ft.height,nt,_t,ft.data):n.texImage2D(e.TEXTURE_2D,$,xt,ft.width,ft.height,0,nt,_t,ft.data)}else if(y.isDataArrayTexture)if(U){if(ot&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,xt,Q.width,Q.height,Q.depth),it)if(y.layerUpdates.size>0){let $=Ng(Q.width,Q.height,y.format,y.type);for(let W of y.layerUpdates){let yt=Q.data.subarray(W*$/Q.data.BYTES_PER_ELEMENT,(W+1)*$/Q.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,Q.width,Q.height,1,nt,_t,yt)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,nt,_t,Q.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,xt,Q.width,Q.height,Q.depth,0,nt,_t,Q.data);else if(y.isData3DTexture)U?(ot&&n.texStorage3D(e.TEXTURE_3D,mt,xt,Q.width,Q.height,Q.depth),it&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,nt,_t,Q.data)):n.texImage3D(e.TEXTURE_3D,0,xt,Q.width,Q.height,Q.depth,0,nt,_t,Q.data);else if(y.isFramebufferTexture){if(ot)if(U)n.texStorage2D(e.TEXTURE_2D,mt,xt,Q.width,Q.height);else{let $=Q.width,W=Q.height;for(let yt=0;yt<mt;yt++)n.texImage2D(e.TEXTURE_2D,yt,xt,$,W,0,nt,_t,null),$>>=1,W>>=1}}else if(kt.length>0){if(U&&ot){let $=bt(kt[0]);n.texStorage2D(e.TEXTURE_2D,mt,xt,$.width,$.height)}for(let $=0,W=kt.length;$<W;$++)ft=kt[$],U?it&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,nt,_t,ft):n.texImage2D(e.TEXTURE_2D,$,xt,nt,_t,ft);y.generateMipmaps=!1}else if(U){if(ot){let $=bt(Q);n.texStorage2D(e.TEXTURE_2D,mt,xt,$.width,$.height)}it&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,nt,_t,Q)}else n.texImage2D(e.TEXTURE_2D,0,xt,nt,_t,Q);g(y)&&h(Y),vt.__version=q.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function st(A,y,N){if(y.image.length!==6)return;let Y=It(A,y),j=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+N);let q=i.get(j);if(j.version!==q.__version||Y===!0){n.activeTexture(e.TEXTURE0+N);let vt=Kt.getPrimaries(Kt.workingColorSpace),rt=y.colorSpace===_s?null:Kt.getPrimaries(y.colorSpace),At=y.colorSpace===_s||vt===rt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Ct=y.isCompressedTexture||y.image[0].isCompressedTexture,Q=y.image[0]&&y.image[0].isDataTexture,nt=[];for(let W=0;W<6;W++)!Ct&&!Q?nt[W]=b(y.image[W],!0,s.maxCubemapSize):nt[W]=Q?y.image[W].image:y.image[W],nt[W]=ye(y,nt[W]);let _t=nt[0],xt=a.convert(y.format,y.colorSpace),ft=a.convert(y.type),kt=_(y.internalFormat,xt,ft,y.colorSpace),U=y.isVideoTexture!==!0,ot=q.__version===void 0||Y===!0,it=j.dataReady,mt=w(y,_t);lt(e.TEXTURE_CUBE_MAP,y);let $;if(Ct){U&&ot&&n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,kt,_t.width,_t.height);for(let W=0;W<6;W++){$=nt[W].mipmaps;for(let yt=0;yt<$.length;yt++){let Lt=$[yt];y.format!==oi?xt!==null?U?it&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt,0,0,Lt.width,Lt.height,xt,Lt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt,kt,Lt.width,Lt.height,0,Lt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt,0,0,Lt.width,Lt.height,xt,ft,Lt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt,kt,Lt.width,Lt.height,0,xt,ft,Lt.data)}}}else{if($=y.mipmaps,U&&ot){$.length>0&&mt++;let W=bt(nt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,kt,W.width,W.height)}for(let W=0;W<6;W++)if(Q){U?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,nt[W].width,nt[W].height,xt,ft,nt[W].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,kt,nt[W].width,nt[W].height,0,xt,ft,nt[W].data);for(let yt=0;yt<$.length;yt++){let xe=$[yt].image[W].image;U?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt+1,0,0,xe.width,xe.height,xt,ft,xe.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt+1,kt,xe.width,xe.height,0,xt,ft,xe.data)}}else{U?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,xt,ft,nt[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,kt,xt,ft,nt[W]);for(let yt=0;yt<$.length;yt++){let Lt=$[yt];U?it&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt+1,0,0,xt,ft,Lt.image[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,yt+1,kt,xt,ft,Lt.image[W])}}}g(y)&&h(e.TEXTURE_CUBE_MAP),q.__version=j.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function at(A,y,N,Y,j,q){let vt=a.convert(N.format,N.colorSpace),rt=a.convert(N.type),At=_(N.internalFormat,vt,rt,N.colorSpace),Ct=i.get(y),Q=i.get(N);if(Q.__renderTarget=y,!Ct.__hasExternalTextures){let nt=Math.max(1,y.width>>q),_t=Math.max(1,y.height>>q);j===e.TEXTURE_3D||j===e.TEXTURE_2D_ARRAY?n.texImage3D(j,q,At,nt,_t,y.depth,0,vt,rt,null):n.texImage2D(j,q,At,nt,_t,0,vt,rt,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,j,Q.__webglTexture,0,D(y)):(j===e.TEXTURE_2D||j>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Y,j,Q.__webglTexture,q),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ot(A,y,N){if(e.bindRenderbuffer(e.RENDERBUFFER,A),y.depthBuffer){let Y=y.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,q=S(y.stencilBuffer,j),vt=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ve(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(y),q,y.width,y.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(y),q,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,q,y.width,y.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,vt,e.RENDERBUFFER,A)}else{let Y=y.textures;for(let j=0;j<Y.length;j++){let q=Y[j],vt=a.convert(q.format,q.colorSpace),rt=a.convert(q.type),At=_(q.internalFormat,vt,rt,q.colorSpace);Ve(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(y),At,y.width,y.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(y),At,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,At,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function wt(A,y,N){let Y=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=i.get(y.depthTexture);if(j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,y.depthTexture.addEventListener("dispose",C)),j.__webglTexture===void 0){j.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),lt(e.TEXTURE_CUBE_MAP,y.depthTexture);let Ct=a.convert(y.depthTexture.format),Q=a.convert(y.depthTexture.type),nt;y.depthTexture.format===Li?nt=e.DEPTH_COMPONENT24:y.depthTexture.format===fa&&(nt=e.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,nt,y.width,y.height,0,Ct,Q,null)}}else G(y.depthTexture,0);let q=j.__webglTexture,vt=D(y),rt=Y?e.TEXTURE_CUBE_MAP_POSITIVE_X+N:e.TEXTURE_2D,At=y.depthTexture.format===fa?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(y.depthTexture.format===Li)Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,At,rt,q,0,vt):e.framebufferTexture2D(e.FRAMEBUFFER,At,rt,q,0);else if(y.depthTexture.format===fa)Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,At,rt,q,0,vt):e.framebufferTexture2D(e.FRAMEBUFFER,At,rt,q,0);else throw new Error("Unknown depthTexture format")}function et(A){let y=i.get(A),N=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){let Y=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){let j=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),y.__depthDisposeCallback=j}y.__boundDepthTexture=Y}if(A.depthTexture&&!y.__autoAllocateDepthBuffer)if(N)for(let Y=0;Y<6;Y++)wt(y.__webglFramebuffer[Y],A,Y);else{let Y=A.texture.mipmaps;Y&&Y.length>0?wt(y.__webglFramebuffer[0],A,0):wt(y.__webglFramebuffer,A,0)}else if(N){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=e.createRenderbuffer(),Ot(y.__webglDepthbuffer[Y],A,!1);else{let j=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[Y];e.bindRenderbuffer(e.RENDERBUFFER,q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,q)}}else{let Y=A.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),Ot(y.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,q)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(A,y,N){let Y=i.get(A);y!==void 0&&at(Y.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),N!==void 0&&et(A)}function Ft(A){let y=A.texture,N=i.get(A),Y=i.get(y);A.addEventListener("dispose",T);let j=A.textures,q=A.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(Y.__webglTexture===void 0&&(Y.__webglTexture=e.createTexture()),Y.__version=y.version,r.memory.textures++),q){N.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[rt]=[];for(let At=0;At<y.mipmaps.length;At++)N.__webglFramebuffer[rt][At]=e.createFramebuffer()}else N.__webglFramebuffer[rt]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)N.__webglFramebuffer[rt]=e.createFramebuffer()}else N.__webglFramebuffer=e.createFramebuffer();if(vt)for(let rt=0,At=j.length;rt<At;rt++){let Ct=i.get(j[rt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&Ve(A)===!1){N.__webglMultisampledFramebuffer=e.createFramebuffer(),N.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let rt=0;rt<j.length;rt++){let At=j[rt];N.__webglColorRenderbuffer[rt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,N.__webglColorRenderbuffer[rt]);let Ct=a.convert(At.format,At.colorSpace),Q=a.convert(At.type),nt=_(At.internalFormat,Ct,Q,At.colorSpace,A.isXRRenderTarget===!0),_t=D(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,_t,nt,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,N.__webglColorRenderbuffer[rt])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(N.__webglDepthRenderbuffer=e.createRenderbuffer(),Ot(N.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(q){n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),lt(e.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let At=0;At<y.mipmaps.length;At++)at(N.__webglFramebuffer[rt][At],A,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At);else at(N.__webglFramebuffer[rt],A,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);g(y)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(vt){for(let rt=0,At=j.length;rt<At;rt++){let Ct=j[rt],Q=i.get(Ct),nt=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(nt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(nt,Q.__webglTexture),lt(nt,Ct),at(N.__webglFramebuffer,A,Ct,e.COLOR_ATTACHMENT0+rt,nt,0),g(Ct)&&h(nt)}n.unbindTexture()}else{let rt=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(rt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(rt,Y.__webglTexture),lt(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let At=0;At<y.mipmaps.length;At++)at(N.__webglFramebuffer[At],A,y,e.COLOR_ATTACHMENT0,rt,At);else at(N.__webglFramebuffer,A,y,e.COLOR_ATTACHMENT0,rt,0);g(y)&&h(rt),n.unbindTexture()}A.depthBuffer&&et(A)}function $t(A){let y=A.textures;for(let N=0,Y=y.length;N<Y;N++){let j=y[N];if(g(j)){let q=m(A),vt=i.get(j).__webglTexture;n.bindTexture(q,vt),h(q),n.unbindTexture()}}}let ne=[],Nt=[];function Oe(A){if(A.samples>0){if(Ve(A)===!1){let y=A.textures,N=A.width,Y=A.height,j=e.COLOR_BUFFER_BIT,q=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,vt=i.get(A),rt=y.length>1;if(rt)for(let Ct=0;Ct<y.length;Ct++)n.bindFramebuffer(e.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,vt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);let At=A.texture.mipmaps;At&&At.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Ct=0;Ct<y.length;Ct++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=e.STENCIL_BUFFER_BIT)),rt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,vt.__webglColorRenderbuffer[Ct]);let Q=i.get(y[Ct]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,N,Y,0,0,N,Y,j,e.NEAREST),l===!0&&(ne.length=0,Nt.length=0,ne.push(e.COLOR_ATTACHMENT0+Ct),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ne.push(q),Nt.push(q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Nt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ne))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),rt)for(let Ct=0;Ct<y.length;Ct++){n.bindFramebuffer(e.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.RENDERBUFFER,vt.__webglColorRenderbuffer[Ct]);let Q=i.get(y[Ct]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,vt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.TEXTURE_2D,Q,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let y=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function D(A){return Math.min(s.maxSamples,A.samples)}function Ve(A){let y=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function re(A){let y=r.render.frame;d.get(A)!==y&&(d.set(A,y),A.update())}function ye(A,y){let N=A.colorSpace,Y=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||N!==Wa&&N!==_s&&(Kt.getTransfer(N)===oe?(Y!==oi||j!==Rn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",N)),y}function bt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=G,this.setTexture2DArray=z,this.setTexture3D=P,this.setTextureCube=tt,this.rebindTextures=Bt,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function jR(e,t){function n(i,s=_s){let a,r=Kt.getTransfer(s);if(i===Rn)return e.UNSIGNED_BYTE;if(i===qh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Yh)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Sg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===bg)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===yg)return e.BYTE;if(i===xg)return e.SHORT;if(i===_o)return e.UNSIGNED_SHORT;if(i===Wh)return e.INT;if(i===yi)return e.UNSIGNED_INT;if(i===xi)return e.FLOAT;if(i===Fi)return e.HALF_FLOAT;if(i===Mg)return e.ALPHA;if(i===Eg)return e.RGB;if(i===oi)return e.RGBA;if(i===Li)return e.DEPTH_COMPONENT;if(i===fa)return e.DEPTH_STENCIL;if(i===Tg)return e.RED;if(i===Zh)return e.RED_INTEGER;if(i===Za)return e.RG;if(i===Jh)return e.RG_INTEGER;if(i===jh)return e.RGBA_INTEGER;if(i===$l||i===tc||i===ec||i===nc)if(r===oe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===$l)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===tc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ec)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===$l)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===tc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ec)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Kh||i===Qh||i===$h||i===td)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Kh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$h)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===td)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ed||i===nd||i===id||i===sd||i===ad||i===rd||i===od)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ed||i===nd)return r===oe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===id)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===sd)return a.COMPRESSED_R11_EAC;if(i===ad)return a.COMPRESSED_SIGNED_R11_EAC;if(i===rd)return a.COMPRESSED_RG11_EAC;if(i===od)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ld||i===cd||i===ud||i===hd||i===dd||i===fd||i===pd||i===md||i===gd||i===vd||i===_d||i===yd||i===xd||i===Sd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===ld)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ud)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===md)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_d)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sd)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bd||i===Md||i===Ed)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===bd)return r===oe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Md)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ed)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Td||i===Ad||i===wd||i===Cd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Td)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Ad)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var KR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QR=`
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

}`,qg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Hl(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new qn({vertexShader:KR,fragmentShader:QR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Qt(new qa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yg=class extends vs{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,f=null,v=null,b=typeof XRWebGLBinding<"u",g=new qg,h={},m=n.getContextAttributes(),_=null,S=null,w=[],C=[],T=new ee,x=null,E=new ln;E.viewport=new Re;let I=new ln;I.viewport=new Re;let R=[E,I],F=new Hh,V=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let st=w[Z];return st===void 0&&(st=new ho,w[Z]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Z){let st=w[Z];return st===void 0&&(st=new ho,w[Z]=st),st.getGripSpace()},this.getHand=function(Z){let st=w[Z];return st===void 0&&(st=new ho,w[Z]=st),st.getHandSpace()};function G(Z){let st=C.indexOf(Z.inputSource);if(st===-1)return;let at=w[st];at!==void 0&&(at.update(Z.inputSource,Z.frame,c||r),at.dispatchEvent({type:Z.type,data:Z.inputSource}))}function z(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",P);for(let Z=0;Z<w.length;Z++){let st=C[Z];st!==null&&(C[Z]=null,w[Z].disconnect(st))}V=null,X=null,g.reset();for(let Z in h)delete h[Z];t.setRenderTarget(_),f=null,u=null,p=null,s=null,S=null,me.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",z),s.addEventListener("inputsourceschange",P),m.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,Ot=null,wt=null;m.depth&&(wt=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,at=m.stencil?fa:Li,Ot=m.stencil?yo:yi);let et={colorFormat:n.RGBA8,depthFormat:wt,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(et),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Xn(u.textureWidth,u.textureHeight,{format:oi,type:Rn,depthTexture:new oa(u.textureWidth,u.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let at={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,n,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Xn(f.framebufferWidth,f.framebufferHeight,{format:oi,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),me.setContext(s),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function P(Z){for(let st=0;st<Z.removed.length;st++){let at=Z.removed[st],Ot=C.indexOf(at);Ot>=0&&(C[Ot]=null,w[Ot].disconnect(at))}for(let st=0;st<Z.added.length;st++){let at=Z.added[st],Ot=C.indexOf(at);if(Ot===-1){for(let et=0;et<w.length;et++)if(et>=C.length){C.push(at),Ot=et;break}else if(C[et]===null){C[et]=at,Ot=et;break}if(Ot===-1)break}let wt=w[Ot];wt&&wt.connect(at)}}let tt=new H,K=new H;function dt(Z,st,at){tt.setFromMatrixPosition(st.matrixWorld),K.setFromMatrixPosition(at.matrixWorld);let Ot=tt.distanceTo(K),wt=st.projectionMatrix.elements,et=at.projectionMatrix.elements,Bt=wt[14]/(wt[10]-1),Ft=wt[14]/(wt[10]+1),$t=(wt[9]+1)/wt[5],ne=(wt[9]-1)/wt[5],Nt=(wt[8]-1)/wt[0],Oe=(et[8]+1)/et[0],D=Bt*Nt,Ve=Bt*Oe,re=Ot/(-Nt+Oe),ye=re*-Nt;if(st.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ye),Z.translateZ(re),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),wt[10]===-1)Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{let bt=Bt+re,A=Ft+re,y=D-ye,N=Ve+(Ot-ye),Y=$t*Ft/A*bt,j=ne*Ft/A*bt;Z.projectionMatrix.makePerspective(y,N,Y,j,bt,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function gt(Z,st){st===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(st.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let st=Z.near,at=Z.far;g.texture!==null&&(g.depthNear>0&&(st=g.depthNear),g.depthFar>0&&(at=g.depthFar)),F.near=I.near=E.near=st,F.far=I.far=E.far=at,(V!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),V=F.near,X=F.far),F.layers.mask=Z.layers.mask|6,E.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let Ot=Z.parent,wt=F.cameras;gt(F,Ot);for(let et=0;et<wt.length;et++)gt(wt[et],Ot);wt.length===2?dt(F,E,I):F.projectionMatrix.copy(E.projectionMatrix),lt(Z,F,Ot)};function lt(Z,st,at){at===null?Z.matrix.copy(st.matrixWorld):(Z.matrix.copy(at.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(st.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xh*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(Z){return h[Z]};let It=null;function ae(Z,st){if(d=st.getViewerPose(c||r),v=st,d!==null){let at=d.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Ot=!1;at.length!==F.cameras.length&&(F.cameras.length=0,Ot=!0);for(let Ft=0;Ft<at.length;Ft++){let $t=at[Ft],ne=null;if(f!==null)ne=f.getViewport($t);else{let Oe=p.getViewSubImage(u,$t);ne=Oe.viewport,Ft===0&&(t.setRenderTargetTextures(S,Oe.colorTexture,Oe.depthStencilTexture),t.setRenderTarget(S))}let Nt=R[Ft];Nt===void 0&&(Nt=new ln,Nt.layers.enable(Ft),Nt.viewport=new Re,R[Ft]=Nt),Nt.matrix.fromArray($t.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray($t.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(ne.x,ne.y,ne.width,ne.height),Ft===0&&(F.matrix.copy(Nt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ot===!0&&F.cameras.push(Nt)}let wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=i.getBinding();let Ft=p.getDepthInformation(at[0]);Ft&&Ft.isValid&&Ft.texture&&g.init(Ft,s.renderState)}if(wt&&wt.includes("camera-access")&&b){t.state.unbindTexture(),p=i.getBinding();for(let Ft=0;Ft<at.length;Ft++){let $t=at[Ft].camera;if($t){let ne=h[$t];ne||(ne=new Hl,h[$t]=ne);let Nt=p.getCameraImage($t);ne.sourceTexture=Nt}}}}for(let at=0;at<w.length;at++){let Ot=C[at],wt=w[at];Ot!==null&&wt!==void 0&&wt.update(Ot,st,c||r)}It&&It(Z,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),v=null}let me=new Eb;me.setAnimationLoop(ae),this.setAnimationLoop=function(Z){It=Z},this.dispose=function(){}}},Ka=new gi,$R=new Le;function t2(e,t){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Rg(e)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function s(g,h,m,_,S){h.isMeshBasicMaterial?a(g,h):h.isMeshLambertMaterial?(a(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(a(g,h),p(g,h)):h.isMeshPhongMaterial?(a(g,h),d(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(a(g,h),u(g,h),h.isMeshPhysicalMaterial&&f(g,h,S)):h.isMeshMatcapMaterial?(a(g,h),v(g,h)):h.isMeshDepthMaterial?a(g,h):h.isMeshDistanceMaterial?(a(g,h),b(g,h)):h.isMeshNormalMaterial?a(g,h):h.isLineBasicMaterial?(r(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,m,_):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Ie&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Ie&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let m=t.get(h),_=m.envMap,S=m.envMapRotation;_&&(g.envMap.value=_,Ka.copy(S),Ka.x*=-1,Ka.y*=-1,Ka.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ka.y*=-1,Ka.z*=-1),g.envMapRotation.value.setFromMatrix4($R.makeRotationFromEuler(Ka)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function r(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,m,_){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*m,g.scale.value=_*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function p(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function f(g,h,m){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ie&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,h){h.matcap&&(g.matcap.value=h.matcap)}function b(g,h){let m=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function e2(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,_){let S=_.program;i.uniformBlockBinding(m,S)}function c(m,_){let S=s[m.id];S===void 0&&(v(m),S=d(m),s[m.id]=S,m.addEventListener("dispose",g));let w=_.program;i.updateUBOMapping(m,w);let C=t.render.frame;a[m.id]!==C&&(u(m),a[m.id]=C)}function d(m){let _=p();m.__bindingPointIndex=_;let S=e.createBuffer(),w=m.__size,C=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,w,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,S),S}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let _=s[m.id],S=m.uniforms,w=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let C=0,T=S.length;C<T;C++){let x=Array.isArray(S[C])?S[C]:[S[C]];for(let E=0,I=x.length;E<I;E++){let R=x[E];if(f(R,C,E,w)===!0){let F=R.__offset,V=Array.isArray(R.value)?R.value:[R.value],X=0;for(let G=0;G<V.length;G++){let z=V[G],P=b(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,e.bufferSubData(e.UNIFORM_BUFFER,F+X,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,X),X+=P.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,F,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(m,_,S,w){let C=m.value,T=_+"_"+S;if(w[T]===void 0)return typeof C=="number"||typeof C=="boolean"?w[T]=C:w[T]=C.clone(),!0;{let x=w[T];if(typeof C=="number"||typeof C=="boolean"){if(x!==C)return w[T]=C,!0}else if(x.equals(C)===!1)return x.copy(C),!0}return!1}function v(m){let _=m.uniforms,S=0,w=16;for(let T=0,x=_.length;T<x;T++){let E=Array.isArray(_[T])?_[T]:[_[T]];for(let I=0,R=E.length;I<R;I++){let F=E[I],V=Array.isArray(F.value)?F.value:[F.value];for(let X=0,G=V.length;X<G;X++){let z=V[X],P=b(z),tt=S%w,K=tt%P.boundary,dt=tt+K;S+=K,dt!==0&&w-dt<P.storage&&(S+=w-dt),F.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=P.storage}}}let C=S%w;return C>0&&(S+=w-C),m.__size=S,m.__cache={},this}function b(m){let _={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(_.boundary=4,_.storage=4):m.isVector2?(_.boundary=8,_.storage=8):m.isVector3||m.isColor?(_.boundary=16,_.storage=12):m.isVector4?(_.boundary=16,_.storage=16):m.isMatrix3?(_.boundary=48,_.storage=48):m.isMatrix4?(_.boundary=64,_.storage=64):m.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",m),_}function g(m){let _=m.target;_.removeEventListener("dispose",g);let S=r.indexOf(_.__bindingPointIndex);r.splice(S,1),e.deleteBuffer(s[_.id]),delete s[_.id],delete a[_.id]}function h(){for(let m in s)e.deleteBuffer(s[m]);r=[],s={},a={}}return{bind:l,update:c,dispose:h}}var n2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zi=null;function i2(){return zi===null&&(zi=new Th(n2,16,16,Za,Fi),zi.name="DFG_LUT",zi.minFilter=cn,zi.magFilter=cn,zi.wrapS=Ni,zi.wrapT=Ni,zi.generateMipmaps=!1,zi.needsUpdate=!0),zi}var Id=class{constructor(t={}){let{canvas:n=JS(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Rn}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=r;let b=f,g=new Set([jh,Jh,Zh]),h=new Set([Rn,yi,_o,yo,qh,Yh]),m=new Uint32Array(4),_=new Int32Array(4),S=null,w=null,C=[],T=[],x=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,I=!1;this._outputColorSpace=pn;let R=0,F=0,V=null,X=-1,G=null,z=new Re,P=new Re,tt=null,K=new Wt(0),dt=0,gt=n.width,lt=n.height,It=1,ae=null,me=null,Z=new Re(0,0,gt,lt),st=new Re(0,0,gt,lt),at=!1,Ot=new mo,wt=!1,et=!1,Bt=new Le,Ft=new H,$t=new Re,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Nt=!1;function Oe(){return V===null?It:1}let D=i;function Ve(M,L){return n.getContext(M,L)}try{let M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"183"}`),n.addEventListener("webglcontextlost",yt,!1),n.addEventListener("webglcontextrestored",Lt,!1),n.addEventListener("webglcontextcreationerror",xe,!1),D===null){let L="webgl2";if(D=Ve(L,M),D===null)throw Ve(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Dt("WebGLRenderer: "+M.message),M}let re,ye,bt,A,y,N,Y,j,q,vt,rt,At,Ct,Q,nt,_t,xt,ft,kt,U,ot,it,mt;function $(){re=new hC(D),re.init(),ot=new jR(D,re),ye=new iC(D,re,t,ot),bt=new ZR(D,re),ye.reversedDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),A=new pC(D),y=new IR,N=new JR(D,re,bt,y,ye,ot,A),Y=new uC(E),j=new yT(D),it=new eC(D,j),q=new dC(D,j,A,it),vt=new gC(D,q,j,it,A),ft=new mC(D,ye,N),nt=new sC(y),rt=new LR(E,Y,re,ye,it,nt),At=new t2(E,y),Ct=new PR,Q=new GR(re),xt=new tC(E,Y,bt,vt,v,l),_t=new YR(E,vt,ye),mt=new e2(D,A,ye,bt),kt=new nC(D,re,A),U=new fC(D,re,A),A.programs=rt.programs,E.capabilities=ye,E.extensions=re,E.properties=y,E.renderLists=Ct,E.shadowMap=_t,E.state=bt,E.info=A}$(),b!==Rn&&(x=new _C(b,n.width,n.height,s,a));let W=new Yg(E,D);this.xr=W,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let M=re.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=re.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return It},this.setPixelRatio=function(M){M!==void 0&&(It=M,this.setSize(gt,lt,!1))},this.getSize=function(M){return M.set(gt,lt)},this.setSize=function(M,L,k=!0){if(W.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=M,lt=L,n.width=Math.floor(M*It),n.height=Math.floor(L*It),k===!0&&(n.style.width=M+"px",n.style.height=L+"px"),x!==null&&x.setSize(n.width,n.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(gt*It,lt*It).floor()},this.setDrawingBufferSize=function(M,L,k){gt=M,lt=L,It=k,n.width=Math.floor(M*k),n.height=Math.floor(L*k),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(b===Rn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy(Z)},this.setViewport=function(M,L,k,B){M.isVector4?Z.set(M.x,M.y,M.z,M.w):Z.set(M,L,k,B),bt.viewport(z.copy(Z).multiplyScalar(It).round())},this.getScissor=function(M){return M.copy(st)},this.setScissor=function(M,L,k,B){M.isVector4?st.set(M.x,M.y,M.z,M.w):st.set(M,L,k,B),bt.scissor(P.copy(st).multiplyScalar(It).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(M){bt.setScissorTest(at=M)},this.setOpaqueSort=function(M){ae=M},this.setTransparentSort=function(M){me=M},this.getClearColor=function(M){return M.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,k=!0){let B=0;if(M){let O=!1;if(V!==null){let ut=V.texture.format;O=g.has(ut)}if(O){let ut=V.texture.type,pt=h.has(ut),ht=xt.getClearColor(),St=xt.getClearAlpha(),Et=ht.r,zt=ht.g,Xt=ht.b;pt?(m[0]=Et,m[1]=zt,m[2]=Xt,m[3]=St,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=Et,_[1]=zt,_[2]=Xt,_[3]=St,D.clearBufferiv(D.COLOR,0,_))}else B|=D.COLOR_BUFFER_BIT}L&&(B|=D.DEPTH_BUFFER_BIT),k&&(B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",yt,!1),n.removeEventListener("webglcontextrestored",Lt,!1),n.removeEventListener("webglcontextcreationerror",xe,!1),xt.dispose(),Ct.dispose(),Q.dispose(),y.dispose(),Y.dispose(),vt.dispose(),it.dispose(),mt.dispose(),rt.dispose(),W.dispose(),W.removeEventListener("sessionstart",$g),W.removeEventListener("sessionend",t0),ga.stop()};function yt(M){M.preventDefault(),Cg("WebGLRenderer: Context Lost."),I=!0}function Lt(){Cg("WebGLRenderer: Context Restored."),I=!1;let M=A.autoReset,L=_t.enabled,k=_t.autoUpdate,B=_t.needsUpdate,O=_t.type;$(),A.autoReset=M,_t.enabled=L,_t.autoUpdate=k,_t.needsUpdate=B,_t.type=O}function xe(M){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function le(M){let L=M.target;L.removeEventListener("dispose",le),Hi(L)}function Hi(M){Gi(M),y.remove(M)}function Gi(M){let L=y.get(M).programs;L!==void 0&&(L.forEach(function(k){rt.releaseProgram(k)}),M.isShaderMaterial&&rt.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,k,B,O,ut){L===null&&(L=ne);let pt=O.isMesh&&O.matrixWorld.determinant()<0,ht=Pb(M,L,k,B,O);bt.setMaterial(B,pt);let St=k.index,Et=1;if(B.wireframe===!0){if(St=q.getWireframeAttribute(k),St===void 0)return;Et=2}let zt=k.drawRange,Xt=k.attributes.position,Tt=zt.start*Et,he=(zt.start+zt.count)*Et;ut!==null&&(Tt=Math.max(Tt,ut.start*Et),he=Math.min(he,(ut.start+ut.count)*Et)),St!==null?(Tt=Math.max(Tt,0),he=Math.min(he,St.count)):Xt!=null&&(Tt=Math.max(Tt,0),he=Math.min(he,Xt.count));let Pe=he-Tt;if(Pe<0||Pe===1/0)return;it.setup(O,B,ht,k,St);let De,de=kt;if(St!==null&&(De=j.get(St),de=U,de.setIndex(De)),O.isMesh)B.wireframe===!0?(bt.setLineWidth(B.wireframeLinewidth*Oe()),de.setMode(D.LINES)):de.setMode(D.TRIANGLES);else if(O.isLine){let un=B.linewidth;un===void 0&&(un=1),bt.setLineWidth(un*Oe()),O.isLineSegments?de.setMode(D.LINES):O.isLineLoop?de.setMode(D.LINE_LOOP):de.setMode(D.LINE_STRIP)}else O.isPoints?de.setMode(D.POINTS):O.isSprite&&de.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Il("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))de.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let un=O._multiDrawStarts,Mt=O._multiDrawCounts,Dn=O._multiDrawCount,te=St?j.get(St).bytesPerElement:1,li=y.get(B).currentProgram.getUniforms();for(let Si=0;Si<Dn;Si++)li.setValue(D,"_gl_DrawID",Si),de.render(un[Si]/te,Mt[Si])}else if(O.isInstancedMesh)de.renderInstances(Tt,Pe,O.count);else if(k.isInstancedBufferGeometry){let un=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Mt=Math.min(k.instanceCount,un);de.renderInstances(Tt,Pe,Mt)}else de.render(Tt,Pe)};function Qg(M,L,k){M.transparent===!0&&M.side===Pi&&M.forceSinglePass===!1?(M.side=Ie,M.needsUpdate=!0,cc(M,L,k),M.side=gs,M.needsUpdate=!0,cc(M,L,k),M.side=Pi):cc(M,L,k)}this.compile=function(M,L,k=null){k===null&&(k=M),w=Q.get(k),w.init(L),T.push(w),k.traverseVisible(function(O){O.isLight&&O.layers.test(L.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),M!==k&&M.traverseVisible(function(O){O.isLight&&O.layers.test(L.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights();let B=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let ut=O.material;if(ut)if(Array.isArray(ut))for(let pt=0;pt<ut.length;pt++){let ht=ut[pt];Qg(ht,k,O),B.add(ht)}else Qg(ut,k,O),B.add(ut)}),w=T.pop(),B},this.compileAsync=function(M,L,k=null){let B=this.compile(M,L,k);return new Promise(O=>{function ut(){if(B.forEach(function(pt){y.get(pt).currentProgram.isReady()&&B.delete(pt)}),B.size===0){O(M);return}setTimeout(ut,10)}re.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let zd=null;function Ob(M){zd&&zd(M)}function $g(){ga.stop()}function t0(){ga.start()}let ga=new Eb;ga.setAnimationLoop(Ob),typeof self<"u"&&ga.setContext(self),this.setAnimationLoop=function(M){zd=M,W.setAnimationLoop(M),M===null?ga.stop():ga.start()},W.addEventListener("sessionstart",$g),W.addEventListener("sessionend",t0),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;let k=W.enabled===!0&&W.isPresenting===!0,B=x!==null&&(V===null||k)&&x.begin(E,V);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(L),L=W.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,L,V),w=Q.get(M,T.length),w.init(L),T.push(w),Bt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ot.setFromProjectionMatrix(Bt,mi,L.reversedDepth),et=this.localClippingEnabled,wt=nt.init(this.clippingPlanes,et),S=Ct.get(M,C.length),S.init(),C.push(S),W.enabled===!0&&W.isPresenting===!0){let pt=E.xr.getDepthSensingMesh();pt!==null&&Vd(pt,L,-1/0,E.sortObjects)}Vd(M,L,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(ae,me),Nt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Nt&&xt.addToRenderList(S,M),this.info.render.frame++,wt===!0&&nt.beginShadows();let O=w.state.shadowsArray;if(_t.render(O,M,L),wt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B&&x.hasRenderPass())===!1){let pt=S.opaque,ht=S.transmissive;if(w.setupLights(),L.isArrayCamera){let St=L.cameras;if(ht.length>0)for(let Et=0,zt=St.length;Et<zt;Et++){let Xt=St[Et];n0(pt,ht,M,Xt)}Nt&&xt.render(M);for(let Et=0,zt=St.length;Et<zt;Et++){let Xt=St[Et];e0(S,M,Xt,Xt.viewport)}}else ht.length>0&&n0(pt,ht,M,L),Nt&&xt.render(M),e0(S,M,L)}V!==null&&F===0&&(N.updateMultisampleRenderTarget(V),N.updateRenderTargetMipmap(V)),B&&x.end(E),M.isScene===!0&&M.onAfterRender(E,M,L),it.resetDefaultState(),X=-1,G=null,T.pop(),T.length>0?(w=T[T.length-1],wt===!0&&nt.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function Vd(M,L,k,B){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)k=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ot.intersectsSprite(M)){B&&$t.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Bt);let pt=vt.update(M),ht=M.material;ht.visible&&S.push(M,pt,ht,k,$t.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ot.intersectsObject(M))){let pt=vt.update(M),ht=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),$t.copy(M.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),$t.copy(pt.boundingSphere.center)),$t.applyMatrix4(M.matrixWorld).applyMatrix4(Bt)),Array.isArray(ht)){let St=pt.groups;for(let Et=0,zt=St.length;Et<zt;Et++){let Xt=St[Et],Tt=ht[Xt.materialIndex];Tt&&Tt.visible&&S.push(M,pt,Tt,k,$t.z,Xt)}}else ht.visible&&S.push(M,pt,ht,k,$t.z,null)}}let ut=M.children;for(let pt=0,ht=ut.length;pt<ht;pt++)Vd(ut[pt],L,k,B)}function e0(M,L,k,B){let{opaque:O,transmissive:ut,transparent:pt}=M;w.setupLightsView(k),wt===!0&&nt.setGlobalState(E.clippingPlanes,k),B&&bt.viewport(z.copy(B)),O.length>0&&lc(O,L,k),ut.length>0&&lc(ut,L,k),pt.length>0&&lc(pt,L,k),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function n0(M,L,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[B.id]===void 0){let Tt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[B.id]=new Xn(1,1,{generateMipmaps:!0,type:Tt?Fi:Rn,minFilter:da,samples:Math.max(4,ye.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}let ut=w.state.transmissionRenderTarget[B.id],pt=B.viewport||z;ut.setSize(pt.z*E.transmissionResolutionScale,pt.w*E.transmissionResolutionScale);let ht=E.getRenderTarget(),St=E.getActiveCubeFace(),Et=E.getActiveMipmapLevel();E.setRenderTarget(ut),E.getClearColor(K),dt=E.getClearAlpha(),dt<1&&E.setClearColor(16777215,.5),E.clear(),Nt&&xt.render(k);let zt=E.toneMapping;E.toneMapping=_i;let Xt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),w.setupLightsView(B),wt===!0&&nt.setGlobalState(E.clippingPlanes,B),lc(M,k,B),N.updateMultisampleRenderTarget(ut),N.updateRenderTargetMipmap(ut),re.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let he=0,Pe=L.length;he<Pe;he++){let De=L[he],{object:de,geometry:un,material:Mt,group:Dn}=De;if(Mt.side===Pi&&de.layers.test(B.layers)){let te=Mt.side;Mt.side=Ie,Mt.needsUpdate=!0,i0(de,k,B,un,Mt,Dn),Mt.side=te,Mt.needsUpdate=!0,Tt=!0}}Tt===!0&&(N.updateMultisampleRenderTarget(ut),N.updateRenderTargetMipmap(ut))}E.setRenderTarget(ht,St,Et),E.setClearColor(K,dt),Xt!==void 0&&(B.viewport=Xt),E.toneMapping=zt}function lc(M,L,k){let B=L.isScene===!0?L.overrideMaterial:null;for(let O=0,ut=M.length;O<ut;O++){let pt=M[O],{object:ht,geometry:St,group:Et}=pt,zt=pt.material;zt.allowOverride===!0&&B!==null&&(zt=B),ht.layers.test(k.layers)&&i0(ht,L,k,St,zt,Et)}}function i0(M,L,k,B,O,ut){M.onBeforeRender(E,L,k,B,O,ut),M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(E,L,k,B,M,ut),O.transparent===!0&&O.side===Pi&&O.forceSinglePass===!1?(O.side=Ie,O.needsUpdate=!0,E.renderBufferDirect(k,L,B,O,M,ut),O.side=gs,O.needsUpdate=!0,E.renderBufferDirect(k,L,B,O,M,ut),O.side=Pi):E.renderBufferDirect(k,L,B,O,M,ut),M.onAfterRender(E,L,k,B,O,ut)}function cc(M,L,k){L.isScene!==!0&&(L=ne);let B=y.get(M),O=w.state.lights,ut=w.state.shadowsArray,pt=O.state.version,ht=rt.getParameters(M,O.state,ut,L,k),St=rt.getProgramCacheKey(ht),Et=B.programs;B.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,B.fog=L.fog;let zt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;B.envMap=Y.get(M.envMap||B.environment,zt),B.envMapRotation=B.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,Et===void 0&&(M.addEventListener("dispose",le),Et=new Map,B.programs=Et);let Xt=Et.get(St);if(Xt!==void 0){if(B.currentProgram===Xt&&B.lightsStateVersion===pt)return a0(M,ht),Xt}else ht.uniforms=rt.getUniforms(M),M.onBeforeCompile(ht,E),Xt=rt.acquireProgram(ht,St),Et.set(St,Xt),B.uniforms=ht.uniforms;let Tt=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Tt.clippingPlanes=nt.uniform),a0(M,ht),B.needsLights=Fb(M),B.lightsStateVersion=pt,B.needsLights&&(Tt.ambientLightColor.value=O.state.ambient,Tt.lightProbe.value=O.state.probe,Tt.directionalLights.value=O.state.directional,Tt.directionalLightShadows.value=O.state.directionalShadow,Tt.spotLights.value=O.state.spot,Tt.spotLightShadows.value=O.state.spotShadow,Tt.rectAreaLights.value=O.state.rectArea,Tt.ltc_1.value=O.state.rectAreaLTC1,Tt.ltc_2.value=O.state.rectAreaLTC2,Tt.pointLights.value=O.state.point,Tt.pointLightShadows.value=O.state.pointShadow,Tt.hemisphereLights.value=O.state.hemi,Tt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Tt.spotLightMatrix.value=O.state.spotLightMatrix,Tt.spotLightMap.value=O.state.spotLightMap,Tt.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Xt,B.uniformsList=null,Xt}function s0(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=So.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function a0(M,L){let k=y.get(M);k.outputColorSpace=L.outputColorSpace,k.batching=L.batching,k.batchingColor=L.batchingColor,k.instancing=L.instancing,k.instancingColor=L.instancingColor,k.instancingMorph=L.instancingMorph,k.skinning=L.skinning,k.morphTargets=L.morphTargets,k.morphNormals=L.morphNormals,k.morphColors=L.morphColors,k.morphTargetsCount=L.morphTargetsCount,k.numClippingPlanes=L.numClippingPlanes,k.numIntersection=L.numClipIntersection,k.vertexAlphas=L.vertexAlphas,k.vertexTangents=L.vertexTangents,k.toneMapping=L.toneMapping}function Pb(M,L,k,B,O){L.isScene!==!0&&(L=ne),N.resetTextureUnits();let ut=L.fog,pt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?L.environment:null,ht=V===null?E.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Wa,St=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Et=Y.get(B.envMap||pt,St),zt=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Xt=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Tt=!!k.morphAttributes.position,he=!!k.morphAttributes.normal,Pe=!!k.morphAttributes.color,De=_i;B.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(De=E.toneMapping);let de=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,un=de!==void 0?de.length:0,Mt=y.get(B),Dn=w.state.lights;if(wt===!0&&(et===!0||M!==G)){let je=M===G&&B.id===X;nt.setState(B,M,je)}let te=!1;B.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Dn.state.version||Mt.outputColorSpace!==ht||O.isBatchedMesh&&Mt.batching===!1||!O.isBatchedMesh&&Mt.batching===!0||O.isBatchedMesh&&Mt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Mt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Mt.instancing===!1||!O.isInstancedMesh&&Mt.instancing===!0||O.isSkinnedMesh&&Mt.skinning===!1||!O.isSkinnedMesh&&Mt.skinning===!0||O.isInstancedMesh&&Mt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Mt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Mt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Mt.instancingMorph===!1&&O.morphTexture!==null||Mt.envMap!==Et||B.fog===!0&&Mt.fog!==ut||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==nt.numPlanes||Mt.numIntersection!==nt.numIntersection)||Mt.vertexAlphas!==zt||Mt.vertexTangents!==Xt||Mt.morphTargets!==Tt||Mt.morphNormals!==he||Mt.morphColors!==Pe||Mt.toneMapping!==De||Mt.morphTargetsCount!==un)&&(te=!0):(te=!0,Mt.__version=B.version);let li=Mt.currentProgram;te===!0&&(li=cc(B,L,O));let Si=!1,va=!1,$a=!1,ge=li.getUniforms(),en=Mt.uniforms;if(bt.useProgram(li.program)&&(Si=!0,va=!0,$a=!0),B.id!==X&&(X=B.id,va=!0),Si||G!==M){bt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ge.setValue(D,"projectionMatrix",M.projectionMatrix),ge.setValue(D,"viewMatrix",M.matrixWorldInverse);let Ss=ge.map.cameraPosition;Ss!==void 0&&Ss.setValue(D,Ft.setFromMatrixPosition(M.matrixWorld)),ye.logarithmicDepthBuffer&&ge.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ge.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),G!==M&&(G=M,va=!0,$a=!0)}if(Mt.needsLights&&(Dn.state.directionalShadowMap.length>0&&ge.setValue(D,"directionalShadowMap",Dn.state.directionalShadowMap,N),Dn.state.spotShadowMap.length>0&&ge.setValue(D,"spotShadowMap",Dn.state.spotShadowMap,N),Dn.state.pointShadowMap.length>0&&ge.setValue(D,"pointShadowMap",Dn.state.pointShadowMap,N)),O.isSkinnedMesh){ge.setOptional(D,O,"bindMatrix"),ge.setOptional(D,O,"bindMatrixInverse");let je=O.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),ge.setValue(D,"boneTexture",je.boneTexture,N))}O.isBatchedMesh&&(ge.setOptional(D,O,"batchingTexture"),ge.setValue(D,"batchingTexture",O._matricesTexture,N),ge.setOptional(D,O,"batchingIdTexture"),ge.setValue(D,"batchingIdTexture",O._indirectTexture,N),ge.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&ge.setValue(D,"batchingColorTexture",O._colorsTexture,N));let xs=k.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0)&&ft.update(O,k,li),(va||Mt.receiveShadow!==O.receiveShadow)&&(Mt.receiveShadow=O.receiveShadow,ge.setValue(D,"receiveShadow",O.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&L.environment!==null&&(en.envMapIntensity.value=L.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=i2()),va&&(ge.setValue(D,"toneMappingExposure",E.toneMappingExposure),Mt.needsLights&&Bb(en,$a),ut&&B.fog===!0&&At.refreshFogUniforms(en,ut),At.refreshMaterialUniforms(en,B,It,lt,w.state.transmissionRenderTarget[M.id]),So.upload(D,s0(Mt),en,N)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(So.upload(D,s0(Mt),en,N),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ge.setValue(D,"center",O.center),ge.setValue(D,"modelViewMatrix",O.modelViewMatrix),ge.setValue(D,"normalMatrix",O.normalMatrix),ge.setValue(D,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let je=B.uniformsGroups;for(let Ss=0,tr=je.length;Ss<tr;Ss++){let r0=je[Ss];mt.update(r0,li),mt.bind(r0,li)}}return li}function Bb(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Fb(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(M,L,k){let B=y.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),y.get(M.texture).__webglTexture=L,y.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:k,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let k=y.get(M);k.__webglFramebuffer=L,k.__useDefaultFramebuffer=L===void 0};let zb=D.createFramebuffer();this.setRenderTarget=function(M,L=0,k=0){V=M,R=L,F=k;let B=null,O=!1,ut=!1;if(M){let ht=y.get(M);if(ht.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(D.FRAMEBUFFER,ht.__webglFramebuffer),z.copy(M.viewport),P.copy(M.scissor),tt=M.scissorTest,bt.viewport(z),bt.scissor(P),bt.setScissorTest(tt),X=-1;return}else if(ht.__webglFramebuffer===void 0)N.setupRenderTarget(M);else if(ht.__hasExternalTextures)N.rebindTextures(M,y.get(M.texture).__webglTexture,y.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let zt=M.depthTexture;if(ht.__boundDepthTexture!==zt){if(zt!==null&&y.has(zt)&&(M.width!==zt.image.width||M.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(M)}}let St=M.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(ut=!0);let Et=y.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Et[L])?B=Et[L][k]:B=Et[L],O=!0):M.samples>0&&N.useMultisampledRTT(M)===!1?B=y.get(M).__webglMultisampledFramebuffer:Array.isArray(Et)?B=Et[k]:B=Et,z.copy(M.viewport),P.copy(M.scissor),tt=M.scissorTest}else z.copy(Z).multiplyScalar(It).floor(),P.copy(st).multiplyScalar(It).floor(),tt=at;if(k!==0&&(B=zb),bt.bindFramebuffer(D.FRAMEBUFFER,B)&&bt.drawBuffers(M,B),bt.viewport(z),bt.scissor(P),bt.setScissorTest(tt),O){let ht=y.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,ht.__webglTexture,k)}else if(ut){let ht=L;for(let St=0;St<M.textures.length;St++){let Et=y.get(M.textures[St]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+St,Et.__webglTexture,k,ht)}}else if(M!==null&&k!==0){let ht=y.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ht.__webglTexture,k)}X=-1},this.readRenderTargetPixels=function(M,L,k,B,O,ut,pt,ht=0){if(!(M&&M.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St){bt.bindFramebuffer(D.FRAMEBUFFER,St);try{let Et=M.textures[ht],zt=Et.format,Xt=Et.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ht),!ye.textureFormatReadable(zt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(Xt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-B&&k>=0&&k<=M.height-O&&D.readPixels(L,k,B,O,ot.convert(zt),ot.convert(Xt),ut)}finally{let Et=V!==null?y.get(V).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(M,L,k,B,O,ut,pt,ht=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&pt!==void 0&&(St=St[pt]),St)if(L>=0&&L<=M.width-B&&k>=0&&k<=M.height-O){bt.bindFramebuffer(D.FRAMEBUFFER,St);let Et=M.textures[ht],zt=Et.format,Xt=Et.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ht),!ye.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Tt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Tt),D.bufferData(D.PIXEL_PACK_BUFFER,ut.byteLength,D.STREAM_READ),D.readPixels(L,k,B,O,ot.convert(zt),ot.convert(Xt),0);let he=V!==null?y.get(V).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,he);let Pe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await KS(D,Pe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Tt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ut),D.deleteBuffer(Tt),D.deleteSync(Pe),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,k=0){let B=Math.pow(2,-k),O=Math.floor(M.image.width*B),ut=Math.floor(M.image.height*B),pt=L!==null?L.x:0,ht=L!==null?L.y:0;N.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,pt,ht,O,ut),bt.unbindTexture()};let Vb=D.createFramebuffer(),Hb=D.createFramebuffer();this.copyTextureToTexture=function(M,L,k=null,B=null,O=0,ut=0){let pt,ht,St,Et,zt,Xt,Tt,he,Pe,De=M.isCompressedTexture?M.mipmaps[ut]:M.image;if(k!==null)pt=k.max.x-k.min.x,ht=k.max.y-k.min.y,St=k.isBox3?k.max.z-k.min.z:1,Et=k.min.x,zt=k.min.y,Xt=k.isBox3?k.min.z:0;else{let en=Math.pow(2,-O);pt=Math.floor(De.width*en),ht=Math.floor(De.height*en),M.isDataArrayTexture?St=De.depth:M.isData3DTexture?St=Math.floor(De.depth*en):St=1,Et=0,zt=0,Xt=0}B!==null?(Tt=B.x,he=B.y,Pe=B.z):(Tt=0,he=0,Pe=0);let de=ot.convert(L.format),un=ot.convert(L.type),Mt;L.isData3DTexture?(N.setTexture3D(L,0),Mt=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(N.setTexture2DArray(L,0),Mt=D.TEXTURE_2D_ARRAY):(N.setTexture2D(L,0),Mt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Dn=D.getParameter(D.UNPACK_ROW_LENGTH),te=D.getParameter(D.UNPACK_IMAGE_HEIGHT),li=D.getParameter(D.UNPACK_SKIP_PIXELS),Si=D.getParameter(D.UNPACK_SKIP_ROWS),va=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,De.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,De.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Et),D.pixelStorei(D.UNPACK_SKIP_ROWS,zt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Xt);let $a=M.isDataArrayTexture||M.isData3DTexture,ge=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let en=y.get(M),xs=y.get(L),je=y.get(en.__renderTarget),Ss=y.get(xs.__renderTarget);bt.bindFramebuffer(D.READ_FRAMEBUFFER,je.__webglFramebuffer),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ss.__webglFramebuffer);for(let tr=0;tr<St;tr++)$a&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(M).__webglTexture,O,Xt+tr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(L).__webglTexture,ut,Pe+tr)),D.blitFramebuffer(Et,zt,pt,ht,Tt,he,pt,ht,D.DEPTH_BUFFER_BIT,D.NEAREST);bt.bindFramebuffer(D.READ_FRAMEBUFFER,null),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||y.has(M)){let en=y.get(M),xs=y.get(L);bt.bindFramebuffer(D.READ_FRAMEBUFFER,Vb),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hb);for(let je=0;je<St;je++)$a?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,en.__webglTexture,O,Xt+je):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,en.__webglTexture,O),ge?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xs.__webglTexture,ut,Pe+je):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xs.__webglTexture,ut),O!==0?D.blitFramebuffer(Et,zt,pt,ht,Tt,he,pt,ht,D.COLOR_BUFFER_BIT,D.NEAREST):ge?D.copyTexSubImage3D(Mt,ut,Tt,he,Pe+je,Et,zt,pt,ht):D.copyTexSubImage2D(Mt,ut,Tt,he,Et,zt,pt,ht);bt.bindFramebuffer(D.READ_FRAMEBUFFER,null),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ge?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Mt,ut,Tt,he,Pe,pt,ht,St,de,un,De.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(Mt,ut,Tt,he,Pe,pt,ht,St,de,De.data):D.texSubImage3D(Mt,ut,Tt,he,Pe,pt,ht,St,de,un,De):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ut,Tt,he,pt,ht,de,un,De.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ut,Tt,he,De.width,De.height,de,De.data):D.texSubImage2D(D.TEXTURE_2D,ut,Tt,he,pt,ht,de,un,De);D.pixelStorei(D.UNPACK_ROW_LENGTH,Dn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,te),D.pixelStorei(D.UNPACK_SKIP_PIXELS,li),D.pixelStorei(D.UNPACK_SKIP_ROWS,Si),D.pixelStorei(D.UNPACK_SKIP_IMAGES,va),ut===0&&L.generateMipmaps&&D.generateMipmap(Mt),bt.unbindTexture()},this.initRenderTarget=function(M){y.get(M).__webglFramebuffer===void 0&&N.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?N.setTextureCube(M,0):M.isData3DTexture?N.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?N.setTexture2DArray(M,0):N.setTexture2D(M,0),bt.unbindTexture()},this.resetState=function(){R=0,F=0,V=null,bt.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}};var Eo=bs(oc()),o2="/assets/pynqcast-white.png",Zg=class extends fo{constructor(){super();let t=new _e;t.deleteAttribute("uv");let n=new Qt(t,[new xn({color:8947848,side:Ie}),new xn({color:8947848,side:Ie}),new xn({color:16777215,side:Ie}),new xn({color:4473924,side:Ie}),new xn({color:8947848,side:Ie}),new xn({color:8947848,side:Ie})]);n.scale.setScalar(10),this.add(n);let i=new vi(16729088,2,20);i.position.set(5,5,5),this.add(i);let s=new vi(17663,1,20);s.position.set(-5,5,-5),this.add(s);let a=new vi(16777215,1,20);a.position.set(0,10,0),this.add(a)}};function l2({hostSlot:e}){let t=(0,ys.useRef)(null),n=(0,ys.useRef)(null),i=(0,ys.useRef)(null);return(0,ys.useEffect)(()=>{let s=t.current,a=n.current,r=i.current,o=e?.closest(".about-sprite-wrap");if(!s||!a||!r||!o)return()=>{};o.classList.add("board-ready");let l=Math.max(420,Math.round(s.clientWidth||620)),c=Math.max(420,Math.round(s.clientHeight||420)),d=new Id({antialias:!1,alpha:!0});d.setSize(Math.floor(l/4),Math.floor(c/4)),d.domElement.style.width=`${l}px`,d.domElement.style.height=`${c}px`,d.domElement.style.imageRendering="pixelated",d.setClearColor(0,0),d.toneMapping=jl,d.toneMappingExposure=1.2,d.setPixelRatio(1),d.outputColorSpace=pn,a.appendChild(d.domElement);let p=new bo(d);p.compileEquirectangularShader();let u=p.fromScene(new Zg).texture;p.dispose();let f=new fo;f.environment=u;let v=new ln(38,l/c,.1,100);v.position.set(0,.2,7.5),v.lookAt(0,0,0),f.add(new Yl(3342336,8));let b=new vi(12260608,600,16),g=new vi(16777215,400,7),h=new vi(16772829,300,6),m=new vi(1127338,150,10);b.position.set(2.5,1.8,3),g.position.set(1,1.5,2.5),h.position.set(-1.6,1.1,2),m.position.set(-2.4,1.6,-2.8),f.add(b),f.add(g),f.add(h),f.add(m);let _=new xn({color:4523014,metalness:.85,roughness:.08,emissive:new Wt("#120002"),emissiveIntensity:.38,envMapIntensity:1.8}),S=new xn({color:2752514,metalness:.8,roughness:.15,envMapIntensity:1.2}),w=new xn({color:16758784,metalness:1,roughness:.04,emissive:new Wt("#221100"),emissiveIntensity:.15,envMapIntensity:2.5}),C=new xn({color:65348,emissive:new Wt("#00ff44"),emissiveIntensity:.8,metalness:0,roughness:.5}),T=new ps;T.scale.setScalar(1.22),f.add(T);let x=new Qt(new _e(3.55,2.3,.16),S);T.add(x);let E=new Qt(new _e(3.35,2.1,.11),_);E.position.z=.03,T.add(E);let I=new Qt(new _e(3.35,2.1,.11),_);I.position.z=-.03,T.add(I);let R=(et,Bt,Ft,$t,ne=.012)=>{let Nt=new Qt(new _e(Ft,$t,ne),w);Nt.position.set(et,Bt,.09),T.add(Nt)};R(-.12,.56,.64,.03),R(.42,.56,.46,.03),R(.72,.48,.03,.18),R(.98,.48,.22,.03),R(-.78,.1,.36,.03),R(-.94,.02,.03,.46),R(-.84,-.18,.2,.03),R(.12,.1,.72,.03),R(.82,.02,.03,.7),R(.6,-.24,.42,.03),R(-.3,-.22,.03,.48),R(-.08,-.56,1.08,.03),R(-1.18,-.64,.03,.2),R(-1.04,-.72,.24,.03),R(.92,-.74,.03,.28),R(1.08,-.6,.28,.03),R(-.82,.84,1.22,.026),R(-.14,.94,.026,.12),R(-1.34,.32,.03,.86),R(1.3,.26,.03,.74);let F=new Qt(new _e(.85,.85,.12),S);F.position.set(-.3,.1,.14),T.add(F);let V=new Qt(new _e(.75,.75,.03),_);V.position.set(-.3,.1,.21),T.add(V);let X=new Qt(new _e(.55,.38,.08),S);X.position.set(.95,.55,.12),T.add(X);for(let et=0;et<3;et++){let Bt=new Qt(new _e(.18,.22,.1),S);Bt.position.set(-1.2+et*.26,-.7,.13),T.add(Bt)}let G=new Qt(new _e(.22,.18,.2),S);G.position.set(1.6,.2,.14),T.add(G);let z=new Qt(new _e(.28,.16,.18),S);z.position.set(1.6,-.15,.14),T.add(z);let P=new Qt(new _e(.24,.22,.22),S);P.position.set(1.6,.6,.14),T.add(P);for(let et=0;et<2;et++){let Bt=new Qt(new _e(.14,.48,.1),S);Bt.position.set(-1.6,.3-et*.6,.12),T.add(Bt)}let tt=new Qt(new _e(1.8,.1,.08),S);tt.position.set(.1,1.08,.12),T.add(tt);let K=new Qt(new _e(.22,.22,.24),S);K.position.set(-1.45,-.95,.16),T.add(K);let dt=new Qt(new _e(.32,.18,.1),w);dt.position.set(.9,-1.02,.1),T.add(dt);for(let et=0;et<4;et++){let Bt=new Qt(new _e(.06,.06,.05),C);Bt.position.set(.3+et*.12,.75,.18),T.add(Bt)}for(let et=0;et<2;et++){let Bt=new Qt(new _e(.1,.1,.08),S);Bt.position.set(.55+et*.18,-.55,.14),T.add(Bt)}for(let et=0;et<14;et++){let Bt=new Qt(new _e(.06,.06,.12),w);Bt.position.set(-1.1+et*.18,1.1,.1),T.add(Bt);let Ft=Bt.clone();Ft.position.y=1.18,T.add(Ft)}for(let et=0;et<18;et++){let Bt=new Qt(new _e(.055,.18,.04),w);Bt.position.set(-1.28+et*.145,-1.08,.06),T.add(Bt)}let lt=new kl().load(o2,()=>{lt.magFilter=ze,lt.minFilter=ze,lt.generateMipmaps=!1,lt.colorSpace=pn,lt.needsUpdate=!0}),It=new xn({map:lt,color:16777215,metalness:.18,roughness:.36,emissive:new Wt("#220000"),emissiveIntensity:.2,transparent:!0,alphaTest:.08}),ae=new Qt(new qa(3.28,2),It);ae.position.set(.04,.04,-.106),ae.rotation.y=Math.PI,T.add(ae);let me=[_,S,w,C,It],Z=[x.geometry,E.geometry,I.geometry,ae.geometry],st=[x,E,I,ae];T.children.forEach(et=>{st.includes(et)||Z.push(et.geometry)});let at=0,Ot=new Zl,wt=()=>{let et=Ot.getElapsedTime(),Bt=Math.sin(et*1.4),Ft=(Bt+1)/2;T.rotation.y=et*1.1,T.rotation.x=.25+Math.sin(et*.5)*.08,T.rotation.z=Math.sin(et*.7)*.06,T.position.y=.22+Bt*.18,b.position.x=Math.cos(et*.6)*4,b.position.z=Math.sin(et*.6)*4+2,g.position.x=Math.cos(et*2.2)*2.5,g.position.y=Math.sin(et*1.6)*2,g.position.z=2.5,h.position.x=Math.cos(et*1.8+Math.PI)*2,h.position.y=Math.sin(et*2.1+Math.PI)*1.5,h.position.z=2;let $t=.5+Ft*.5,ne=.25+Ft*.25,Nt=Math.sin(T.rotation.z)*12;r.style.transform=`translateX(calc(-50% + ${Nt.toFixed(1)}px)) scaleX(${$t.toFixed(3)}) scaleY(${ne.toFixed(3)})`,r.style.opacity=(.2+Ft*.65).toFixed(3),d.render(f,v),at=requestAnimationFrame(wt)};return wt(),()=>{o.classList.remove("board-ready"),cancelAnimationFrame(at),lt.dispose(),u.dispose(),me.forEach(et=>et.dispose()),Z.forEach(et=>et?.dispose()),d.dispose(),a&&d.domElement.parentNode===a&&a.removeChild(d.domElement)}},[e]),(0,Eo.jsxs)("div",{ref:t,style:{width:"100%",height:420,position:"relative",overflow:"visible"},children:[(0,Eo.jsx)("div",{ref:n,style:{position:"absolute",inset:0,overflow:"visible",transform:"translateY(-88px)"}}),(0,Eo.jsx)("div",{ref:i,style:{position:"absolute",bottom:8,left:"50%",width:260,height:22,background:"radial-gradient(ellipse at center, rgba(140,10,10,0.7) 0%, rgba(80,0,0,0.3) 40%, transparent 70%)",filter:"blur(4px)",pointerEvents:"none",transformOrigin:"center center"}})]})}function Jg({hostRef:e}){let[t,n]=(0,ys.useState)(null);return(0,ys.useEffect)(()=>{let i=e?.current?.querySelector(".about-react-board-slot");n(i||null)},[e]),t?(0,Nb.createPortal)((0,Eo.jsx)(l2,{hostSlot:t}),t):null}var jg={pynq:`<div class="app-shell">
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
    </nav>
    <div class="top-status">
      <span id="status" class="disconnected">\u25CF DISCONNECTED</span>
      <span id="game-chip">no game</span>
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
          <div class="hud-label">Socket Feed</div>
          <div id="hud-ws-rate" class="hud-value">0 / s</div>
          <div class="hud-sub">browser update stream</div>
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
          <div class="about-stage-label">dropped relic \xB7 live node cluster</div>
        </div>

        <div class="about-copy-column">
          <div class="about-title-row">
            <h2 class="about-title">&#9638; About PYNQCAST</h2>
            <span class="micro-chip">v1.0</span>
          </div>

          <div class="about-copy">
DISTRIBUTED FPGA RAY CASTER
4x PYNQ-Z2 \xB7 REDIS \xB7 KAFKA \xB7 AWS
BUILT @ IMPERIAL COLLEGE LONDON
          </div>

          <div class="about-credit-strip">
            <span class="about-credit-chip">retro ops HUD</span>
            <span class="about-credit-chip">ec2 + fpga transport</span>
            <span class="about-credit-chip">sidecar archive path</span>
          </div>
        </div>
      </section>
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
    </nav>
    <div class="top-status">
      <span id="status" class="disconnected">\u25CF DISCONNECTED</span>
      <span id="game-chip">no game</span>
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
          <div class="hud-label">Socket Feed</div>
          <div id="hud-ws-rate" class="hud-value">0 / s</div>
          <div class="hud-sub">browser update stream</div>
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
          <div class="about-stage-label">dropped relic \xB7 live node cluster</div>
        </div>

        <div class="about-copy-column">
          <div class="about-title-row">
            <h2 class="about-title">&#9638; About PYNQCAST</h2>
            <span class="micro-chip">v1.0</span>
          </div>

          <div class="about-copy">
DISTRIBUTED FPGA RAY CASTER
4x PYNQ-Z2 \xB7 REDIS \xB7 KAFKA \xB7 AWS
BUILT @ IMPERIAL COLLEGE LONDON
          </div>

          <div class="about-credit-strip">
            <span class="about-credit-chip">retro ops HUD</span>
            <span class="about-credit-chip">ec2 + fpga transport</span>
            <span class="about-credit-chip">sidecar archive path</span>
          </div>
        </div>
      </section>
    </section>
  </main>
</div>`};var ma=bs(oc()),Kg=["/monitor-state.js","/monitor-render.js","/monitor-app.js"];function c2(){if(window.__monitorLegacyBootstrapped)return;window.__monitorLegacyBootstrapped=!0;let e=t=>{if(t>=Kg.length){window.dispatchEvent(new Event("monitor:legacy-ready"));return}let n=document.createElement("script");n.src=Kg[t],n.async=!1,n.onload=()=>e(t+1),n.onerror=()=>{console.error(`[monitor-ui] failed to load legacy script: ${Kg[t]}`)},document.body.appendChild(n)};e(0)}function u2({mode:e}){let t=(0,Fd.useRef)(null);return(0,Fd.useEffect)(()=>{c2()},[]),(0,ma.jsxs)(ma.Fragment,{children:[(0,ma.jsx)("div",{ref:t,className:"react-monitor-root",dangerouslySetInnerHTML:{__html:jg[e]||jg.pynq}}),(0,ma.jsx)(Jg,{hostRef:t})]})}var h2=window.__MONITOR_MODE__==="sim"?"sim":"pynq",Ib=document.getElementById("root");if(!Ib)throw new Error("Missing #root for monitor React mount");(0,Lb.createRoot)(Ib).render((0,ma.jsx)(u2,{mode:h2}));})();
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
