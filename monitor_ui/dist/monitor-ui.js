(()=>{var $b=Object.create;var p0=Object.defineProperty;var tM=Object.getOwnPropertyDescriptor;var eM=Object.getOwnPropertyNames;var nM=Object.getPrototypeOf,iM=Object.prototype.hasOwnProperty;var Si=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var sM=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of eM(t))!iM.call(e,s)&&s!==n&&p0(e,s,{get:()=>t[s],enumerable:!(i=tM(t,s))||i.enumerable});return e};var mc=(e,t,n)=>(n=e!=null?$b(nM(e)):{},sM(t||!e||!e.__esModule?p0(n,"default",{value:e,enumerable:!0}):n,e));var E0=Si(Ot=>{"use strict";var tf=Symbol.for("react.transitional.element"),aM=Symbol.for("react.portal"),rM=Symbol.for("react.fragment"),oM=Symbol.for("react.strict_mode"),lM=Symbol.for("react.profiler"),cM=Symbol.for("react.consumer"),uM=Symbol.for("react.context"),hM=Symbol.for("react.forward_ref"),dM=Symbol.for("react.suspense"),fM=Symbol.for("react.memo"),y0=Symbol.for("react.lazy"),pM=Symbol.for("react.activity"),m0=Symbol.iterator;function mM(e){return e===null||typeof e!="object"?null:(e=m0&&e[m0]||e["@@iterator"],typeof e=="function"?e:null)}var x0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S0=Object.assign,b0={};function nr(e,t,n){this.props=e,this.context=t,this.refs=b0,this.updater=n||x0}nr.prototype.isReactComponent={};nr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};nr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function M0(){}M0.prototype=nr.prototype;function ef(e,t,n){this.props=e,this.context=t,this.refs=b0,this.updater=n||x0}var nf=ef.prototype=new M0;nf.constructor=ef;S0(nf,nr.prototype);nf.isPureReactComponent=!0;var g0=Array.isArray;function $d(){}var xe={H:null,A:null,T:null,S:null},T0=Object.prototype.hasOwnProperty;function sf(e,t,n){var i=n.ref;return{$$typeof:tf,type:e,key:t,ref:i!==void 0?i:null,props:n}}function gM(e,t){return sf(e.type,t,e.props)}function af(e){return typeof e=="object"&&e!==null&&e.$$typeof===tf}function vM(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var v0=/\/+/g;function Qd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?vM(""+e.key):t.toString(36)}function _M(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then($d,$d):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function er(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case tf:case aM:r=!0;break;case y0:return r=e._init,er(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Qd(e,0):i,g0(s)?(n="",r!=null&&(n=r.replace(v0,"$&/")+"/"),er(s,t,n,"",function(c){return c})):s!=null&&(af(s)&&(s=gM(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(v0,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(g0(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Qd(i,l),r+=er(i,t,n,a,s);else if(l=mM(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Qd(i,l++),r+=er(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return er(_M(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function gc(e,t,n){if(e==null)return e;var i=[],s=0;return er(e,i,"","",function(a){return t.call(n,a,s++)}),i}function yM(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var _0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},xM={map:gc,forEach:function(e,t,n){gc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return gc(e,function(){t++}),t},toArray:function(e){return gc(e,function(t){return t})||[]},only:function(e){if(!af(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ot.Activity=pM;Ot.Children=xM;Ot.Component=nr;Ot.Fragment=rM;Ot.Profiler=lM;Ot.PureComponent=ef;Ot.StrictMode=oM;Ot.Suspense=dM;Ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=xe;Ot.__COMPILER_RUNTIME={__proto__:null,c:function(e){return xe.H.useMemoCache(e)}};Ot.cache=function(e){return function(){return e.apply(null,arguments)}};Ot.cacheSignal=function(){return null};Ot.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=S0({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!T0.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return sf(e.type,s,i)};Ot.createContext=function(e){return e={$$typeof:uM,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:cM,_context:e},e};Ot.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)T0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return sf(e,a,s)};Ot.createRef=function(){return{current:null}};Ot.forwardRef=function(e){return{$$typeof:hM,render:e}};Ot.isValidElement=af;Ot.lazy=function(e){return{$$typeof:y0,_payload:{_status:-1,_result:e},_init:yM}};Ot.memo=function(e,t){return{$$typeof:fM,type:e,compare:t===void 0?null:t}};Ot.startTransition=function(e){var t=xe.T,n={};xe.T=n;try{var i=e(),s=xe.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then($d,_0)}catch(a){_0(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),xe.T=t}};Ot.unstable_useCacheRefresh=function(){return xe.H.useCacheRefresh()};Ot.use=function(e){return xe.H.use(e)};Ot.useActionState=function(e,t,n){return xe.H.useActionState(e,t,n)};Ot.useCallback=function(e,t){return xe.H.useCallback(e,t)};Ot.useContext=function(e){return xe.H.useContext(e)};Ot.useDebugValue=function(){};Ot.useDeferredValue=function(e,t){return xe.H.useDeferredValue(e,t)};Ot.useEffect=function(e,t){return xe.H.useEffect(e,t)};Ot.useEffectEvent=function(e){return xe.H.useEffectEvent(e)};Ot.useId=function(){return xe.H.useId()};Ot.useImperativeHandle=function(e,t,n){return xe.H.useImperativeHandle(e,t,n)};Ot.useInsertionEffect=function(e,t){return xe.H.useInsertionEffect(e,t)};Ot.useLayoutEffect=function(e,t){return xe.H.useLayoutEffect(e,t)};Ot.useMemo=function(e,t){return xe.H.useMemo(e,t)};Ot.useOptimistic=function(e,t){return xe.H.useOptimistic(e,t)};Ot.useReducer=function(e,t,n){return xe.H.useReducer(e,t,n)};Ot.useRef=function(e){return xe.H.useRef(e)};Ot.useState=function(e){return xe.H.useState(e)};Ot.useSyncExternalStore=function(e,t,n){return xe.H.useSyncExternalStore(e,t,n)};Ot.useTransition=function(){return xe.H.useTransition()};Ot.version="19.2.4"});var vc=Si((A2,A0)=>{"use strict";A0.exports=E0()});var P0=Si(we=>{"use strict";function cf(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<_c(s,t))e[i]=t,e[n]=s,n=i;else break t}}function bi(e){return e.length===0?null:e[0]}function xc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>_c(o,n))l<s&&0>_c(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>_c(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function _c(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}we.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(w0=performance,we.unstable_now=function(){return w0.now()}):(rf=Date,C0=rf.now(),we.unstable_now=function(){return rf.now()-C0});var w0,rf,C0,Xi=[],bs=[],SM=1,Yn=null,dn=3,uf=!1,To=!1,Eo=!1,hf=!1,U0=typeof setTimeout=="function"?setTimeout:null,N0=typeof clearTimeout=="function"?clearTimeout:null,R0=typeof setImmediate<"u"?setImmediate:null;function yc(e){for(var t=bi(bs);t!==null;){if(t.callback===null)xc(bs);else if(t.startTime<=e)xc(bs),t.sortIndex=t.expirationTime,cf(Xi,t);else break;t=bi(bs)}}function df(e){if(Eo=!1,yc(e),!To)if(bi(Xi)!==null)To=!0,sr||(sr=!0,ir());else{var t=bi(bs);t!==null&&ff(df,t.startTime-e)}}var sr=!1,Ao=-1,L0=5,I0=-1;function O0(){return hf?!0:!(we.unstable_now()-I0<L0)}function of(){if(hf=!1,sr){var e=we.unstable_now();I0=e;var t=!0;try{t:{To=!1,Eo&&(Eo=!1,N0(Ao),Ao=-1),uf=!0;var n=dn;try{e:{for(yc(e),Yn=bi(Xi);Yn!==null&&!(Yn.expirationTime>e&&O0());){var i=Yn.callback;if(typeof i=="function"){Yn.callback=null,dn=Yn.priorityLevel;var s=i(Yn.expirationTime<=e);if(e=we.unstable_now(),typeof s=="function"){Yn.callback=s,yc(e),t=!0;break e}Yn===bi(Xi)&&xc(Xi),yc(e)}else xc(Xi);Yn=bi(Xi)}if(Yn!==null)t=!0;else{var a=bi(bs);a!==null&&ff(df,a.startTime-e),t=!1}}break t}finally{Yn=null,dn=n,uf=!1}t=void 0}}finally{t?ir():sr=!1}}}var ir;typeof R0=="function"?ir=function(){R0(of)}:typeof MessageChannel<"u"?(lf=new MessageChannel,D0=lf.port2,lf.port1.onmessage=of,ir=function(){D0.postMessage(null)}):ir=function(){U0(of,0)};var lf,D0;function ff(e,t){Ao=U0(function(){e(we.unstable_now())},t)}we.unstable_IdlePriority=5;we.unstable_ImmediatePriority=1;we.unstable_LowPriority=4;we.unstable_NormalPriority=3;we.unstable_Profiling=null;we.unstable_UserBlockingPriority=2;we.unstable_cancelCallback=function(e){e.callback=null};we.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L0=0<e?Math.floor(1e3/e):5};we.unstable_getCurrentPriorityLevel=function(){return dn};we.unstable_next=function(e){switch(dn){case 1:case 2:case 3:var t=3;break;default:t=dn}var n=dn;dn=t;try{return e()}finally{dn=n}};we.unstable_requestPaint=function(){hf=!0};we.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=dn;dn=e;try{return t()}finally{dn=n}};we.unstable_scheduleCallback=function(e,t,n){var i=we.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:SM++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,cf(bs,e),bi(Xi)===null&&e===bi(bs)&&(Eo?(N0(Ao),Ao=-1):Eo=!0,ff(df,n-i))):(e.sortIndex=s,cf(Xi,e),To||uf||(To=!0,sr||(sr=!0,ir()))),e};we.unstable_shouldYield=O0;we.unstable_wrapCallback=function(e){var t=dn;return function(){var n=dn;dn=t;try{return e.apply(this,arguments)}finally{dn=n}}}});var F0=Si((C2,B0)=>{"use strict";B0.exports=P0()});var V0=Si(_n=>{"use strict";var bM=vc();function z0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ms(){}var vn={d:{f:Ms,r:function(){throw Error(z0(522))},D:Ms,C:Ms,L:Ms,m:Ms,X:Ms,S:Ms,M:Ms},p:0,findDOMNode:null},MM=Symbol.for("react.portal");function TM(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:MM,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var wo=bM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Sc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}_n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=vn;_n.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(z0(299));return TM(e,t,null,n)};_n.flushSync=function(e){var t=wo.T,n=vn.p;try{if(wo.T=null,vn.p=2,e)return e()}finally{wo.T=t,vn.p=n,vn.d.f()}};_n.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,vn.d.C(e,t))};_n.prefetchDNS=function(e){typeof e=="string"&&vn.d.D(e)};_n.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Sc(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?vn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&vn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};_n.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Sc(t.as,t.crossOrigin);vn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&vn.d.M(e)};_n.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Sc(n,t.crossOrigin);vn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};_n.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Sc(t.as,t.crossOrigin);vn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else vn.d.m(e)};_n.requestFormReset=function(e){vn.d.r(e)};_n.unstable_batchedUpdates=function(e,t){return e(t)};_n.useFormState=function(e,t,n){return wo.H.useFormState(e,t,n)};_n.useFormStatus=function(){return wo.H.useHostTransitionStatus()};_n.version="19.2.4"});var k0=Si((D2,G0)=>{"use strict";function H0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(H0)}catch(e){console.error(e)}}H0(),G0.exports=V0()});var eS=Si(qu=>{"use strict";var qe=F0(),m_=vc(),EM=k0();function J(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function g_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function fl(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function v_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function __(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function X0(e){if(fl(e)!==e)throw Error(J(188))}function AM(e){var t=e.alternate;if(!t){if(t=fl(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return X0(s),e;if(a===i)return X0(s),t;a=a.sibling}throw Error(J(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(J(189))}}if(n.alternate!==i)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function y_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=y_(e),t!==null)return t;e=e.sibling}return null}var Me=Object.assign,wM=Symbol.for("react.element"),bc=Symbol.for("react.transitional.element"),Oo=Symbol.for("react.portal"),ur=Symbol.for("react.fragment"),x_=Symbol.for("react.strict_mode"),Yf=Symbol.for("react.profiler"),S_=Symbol.for("react.consumer"),Qi=Symbol.for("react.context"),Gp=Symbol.for("react.forward_ref"),Zf=Symbol.for("react.suspense"),Jf=Symbol.for("react.suspense_list"),kp=Symbol.for("react.memo"),Ts=Symbol.for("react.lazy"),jf=Symbol.for("react.activity"),CM=Symbol.for("react.memo_cache_sentinel"),W0=Symbol.iterator;function Co(e){return e===null||typeof e!="object"?null:(e=W0&&e[W0]||e["@@iterator"],typeof e=="function"?e:null)}var RM=Symbol.for("react.client.reference");function Kf(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===RM?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ur:return"Fragment";case Yf:return"Profiler";case x_:return"StrictMode";case Zf:return"Suspense";case Jf:return"SuspenseList";case jf:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Oo:return"Portal";case Qi:return e.displayName||"Context";case S_:return(e._context.displayName||"Context")+".Consumer";case Gp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case kp:return t=e.displayName||null,t!==null?t:Kf(e.type)||"Memo";case Ts:t=e._payload,e=e._init;try{return Kf(e(t))}catch{}}return null}var Po=Array.isArray,Rt=m_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee=EM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ba={pending:!1,data:null,method:null,action:null},Qf=[],hr=-1;function wi(e){return{current:e}}function Qe(e){0>hr||(e.current=Qf[hr],Qf[hr]=null,hr--)}function ye(e,t){hr++,Qf[hr]=e.current,e.current=t}var Ai=wi(null),$o=wi(null),Os=wi(null),eu=wi(null);function nu(e,t){switch(ye(Os,t),ye($o,e),ye(Ai,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Qv(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Qv(t),e=Hx(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Qe(Ai),ye(Ai,e)}function Rr(){Qe(Ai),Qe($o),Qe(Os)}function $f(e){e.memoizedState!==null&&ye(eu,e);var t=Ai.current,n=Hx(t,e.type);t!==n&&(ye($o,e),ye(Ai,n))}function iu(e){$o.current===e&&(Qe(Ai),Qe($o)),eu.current===e&&(Qe(eu),ul._currentValue=ba)}var pf,q0;function _a(e){if(pf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);pf=t&&t[1]||"",q0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+pf+e+q0}var mf=!1;function gf(e,t){if(!e||mf)return"";mf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(p){var u=p}Reflect.construct(e,[],f)}else{try{f.call()}catch(p){u=p}e.call(f.prototype)}}else{try{throw Error()}catch(p){u=p}(f=e())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=s);break}}}finally{mf=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?_a(n):""}function DM(e,t){switch(e.tag){case 26:case 27:case 5:return _a(e.type);case 16:return _a("Lazy");case 13:return e.child!==t&&t!==null?_a("Suspense Fallback"):_a("Suspense");case 19:return _a("SuspenseList");case 0:case 15:return gf(e.type,!1);case 11:return gf(e.type.render,!1);case 1:return gf(e.type,!0);case 31:return _a("Activity");default:return""}}function Y0(e){try{var t="",n=null;do t+=DM(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var tp=Object.prototype.hasOwnProperty,Xp=qe.unstable_scheduleCallback,vf=qe.unstable_cancelCallback,UM=qe.unstable_shouldYield,NM=qe.unstable_requestPaint,Pn=qe.unstable_now,LM=qe.unstable_getCurrentPriorityLevel,b_=qe.unstable_ImmediatePriority,M_=qe.unstable_UserBlockingPriority,su=qe.unstable_NormalPriority,IM=qe.unstable_LowPriority,T_=qe.unstable_IdlePriority,OM=qe.log,PM=qe.unstable_setDisableYieldValue,pl=null,Bn=null;function Ds(e){if(typeof OM=="function"&&PM(e),Bn&&typeof Bn.setStrictMode=="function")try{Bn.setStrictMode(pl,e)}catch{}}var Fn=Math.clz32?Math.clz32:zM,BM=Math.log,FM=Math.LN2;function zM(e){return e>>>=0,e===0?32:31-(BM(e)/FM|0)|0}var Mc=256,Tc=262144,Ec=4194304;function ya(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Du(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=ya(i):(r&=o,r!==0?s=ya(r):n||(n=o&~e,n!==0&&(s=ya(n))))):(o=i&~a,o!==0?s=ya(o):r!==0?s=ya(r):n||(n=i&~e,n!==0&&(s=ya(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function ml(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function VM(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function E_(){var e=Ec;return Ec<<=1,(Ec&62914560)===0&&(Ec=4194304),e}function _f(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function gl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function HM(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Fn(n),f=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var p=u[d];p!==null&&(p.lane&=-536870913)}n&=~f}i!==0&&A_(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function A_(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Fn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function w_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Fn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function C_(e,t){var n=t&-t;return n=(n&42)!==0?1:Wp(n),(n&(e.suspendedLanes|t))!==0?0:n}function Wp(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function qp(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function R_(){var e=ee.p;return e!==0?e:(e=window.event,e===void 0?32:Qx(e.type))}function Z0(e,t){var n=ee.p;try{return ee.p=e,t()}finally{ee.p=n}}var Zs=Math.random().toString(36).slice(2),sn="__reactFiber$"+Zs,An="__reactProps$"+Zs,Vr="__reactContainer$"+Zs,ep="__reactEvents$"+Zs,GM="__reactListeners$"+Zs,kM="__reactHandles$"+Zs,J0="__reactResources$"+Zs,vl="__reactMarker$"+Zs;function Yp(e){delete e[sn],delete e[An],delete e[ep],delete e[GM],delete e[kM]}function dr(e){var t=e[sn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Vr]||n[sn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=i_(e);e!==null;){if(n=e[sn])return n;e=i_(e)}return t}e=n,n=e.parentNode}return null}function Hr(e){if(e=e[sn]||e[Vr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Bo(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(J(33))}function br(e){var t=e[J0];return t||(t=e[J0]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ke(e){e[vl]=!0}var D_=new Set,U_={};function Na(e,t){Dr(e,t),Dr(e+"Capture",t)}function Dr(e,t){for(U_[e]=t,e=0;e<t.length;e++)D_.add(t[e])}var XM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),j0={},K0={};function WM(e){return tp.call(K0,e)?!0:tp.call(j0,e)?!1:XM.test(e)?K0[e]=!0:(j0[e]=!0,!1)}function Vc(e,t,n){if(WM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Ac(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Wi(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Jn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function N_(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function qM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function np(e){if(!e._valueTracker){var t=N_(e)?"checked":"value";e._valueTracker=qM(e,t,""+e[t])}}function L_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=N_(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function au(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var YM=/[\n"\\]/g;function Qn(e){return e.replace(YM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function ip(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Jn(t)):e.value!==""+Jn(t)&&(e.value=""+Jn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?sp(e,r,Jn(t)):n!=null?sp(e,r,Jn(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Jn(o):e.removeAttribute("name")}function I_(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){np(e);return}n=n!=null?""+Jn(n):"",t=t!=null?""+Jn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),np(e)}function sp(e,t,n){t==="number"&&au(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Mr(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Jn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function O_(e,t,n){if(t!=null&&(t=""+Jn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Jn(n):""}function P_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(J(92));if(Po(i)){if(1<i.length)throw Error(J(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Jn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),np(e)}function Ur(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ZM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Q0(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||ZM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function B_(e,t,n){if(t!=null&&typeof t!="object")throw Error(J(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&Q0(e,s,i)}else for(var a in t)t.hasOwnProperty(a)&&Q0(e,a,t[a])}function Zp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var JM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),jM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Hc(e){return jM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $i(){}var ap=null;function Jp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fr=null,Tr=null;function $0(e){var t=Hr(e);if(t&&(e=t.stateNode)){var n=e[An]||null;t:switch(e=t.stateNode,t.type){case"input":if(ip(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Qn(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[An]||null;if(!s)throw Error(J(90));ip(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&L_(i)}break t;case"textarea":O_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Mr(e,!!n.multiple,t,!1)}}}var yf=!1;function F_(e,t,n){if(yf)return e(t,n);yf=!0;try{var i=e(t);return i}finally{if(yf=!1,(fr!==null||Tr!==null)&&(Gu(),fr&&(t=fr,e=Tr,Tr=fr=null,$0(t),e)))for(t=0;t<e.length;t++)$0(e[t])}}function tl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[An]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var ss=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),rp=!1;if(ss)try{ar={},Object.defineProperty(ar,"passive",{get:function(){rp=!0}}),window.addEventListener("test",ar,ar),window.removeEventListener("test",ar,ar)}catch{rp=!1}var ar,Us=null,jp=null,Gc=null;function z_(){if(Gc)return Gc;var e,t=jp,n=t.length,i,s="value"in Us?Us.value:Us.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Gc=s.slice(e,1<i?1-i:void 0)}function kc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function wc(){return!0}function tv(){return!1}function wn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?wc:tv,this.isPropagationStopped=tv,this}return Me(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=wc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=wc)},persist:function(){},isPersistent:wc}),t}var La={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Uu=wn(La),_l=Me({},La,{view:0,detail:0}),KM=wn(_l),xf,Sf,Ro,Nu=Me({},_l,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ro&&(Ro&&e.type==="mousemove"?(xf=e.screenX-Ro.screenX,Sf=e.screenY-Ro.screenY):Sf=xf=0,Ro=e),xf)},movementY:function(e){return"movementY"in e?e.movementY:Sf}}),ev=wn(Nu),QM=Me({},Nu,{dataTransfer:0}),$M=wn(QM),t1=Me({},_l,{relatedTarget:0}),bf=wn(t1),e1=Me({},La,{animationName:0,elapsedTime:0,pseudoElement:0}),n1=wn(e1),i1=Me({},La,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),s1=wn(i1),a1=Me({},La,{data:0}),nv=wn(a1),r1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},o1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},l1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function c1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=l1[e])?!!t[e]:!1}function Kp(){return c1}var u1=Me({},_l,{key:function(e){if(e.key){var t=r1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=kc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?o1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kp,charCode:function(e){return e.type==="keypress"?kc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?kc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),h1=wn(u1),d1=Me({},Nu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),iv=wn(d1),f1=Me({},_l,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kp}),p1=wn(f1),m1=Me({},La,{propertyName:0,elapsedTime:0,pseudoElement:0}),g1=wn(m1),v1=Me({},Nu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),_1=wn(v1),y1=Me({},La,{newState:0,oldState:0}),x1=wn(y1),S1=[9,13,27,32],Qp=ss&&"CompositionEvent"in window,Vo=null;ss&&"documentMode"in document&&(Vo=document.documentMode);var b1=ss&&"TextEvent"in window&&!Vo,V_=ss&&(!Qp||Vo&&8<Vo&&11>=Vo),sv=" ",av=!1;function H_(e,t){switch(e){case"keyup":return S1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function G_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pr=!1;function M1(e,t){switch(e){case"compositionend":return G_(t);case"keypress":return t.which!==32?null:(av=!0,sv);case"textInput":return e=t.data,e===sv&&av?null:e;default:return null}}function T1(e,t){if(pr)return e==="compositionend"||!Qp&&H_(e,t)?(e=z_(),Gc=jp=Us=null,pr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return V_&&t.locale!=="ko"?null:t.data;default:return null}}var E1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!E1[e.type]:t==="textarea"}function k_(e,t,n,i){fr?Tr?Tr.push(i):Tr=[i]:fr=i,t=Mu(t,"onChange"),0<t.length&&(n=new Uu("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ho=null,el=null;function A1(e){Fx(e,0)}function Lu(e){var t=Bo(e);if(L_(t))return e}function ov(e,t){if(e==="change")return t}var X_=!1;ss&&(ss?(Rc="oninput"in document,Rc||(Mf=document.createElement("div"),Mf.setAttribute("oninput","return;"),Rc=typeof Mf.oninput=="function"),Cc=Rc):Cc=!1,X_=Cc&&(!document.documentMode||9<document.documentMode));var Cc,Rc,Mf;function lv(){Ho&&(Ho.detachEvent("onpropertychange",W_),el=Ho=null)}function W_(e){if(e.propertyName==="value"&&Lu(el)){var t=[];k_(t,el,e,Jp(e)),F_(A1,t)}}function w1(e,t,n){e==="focusin"?(lv(),Ho=t,el=n,Ho.attachEvent("onpropertychange",W_)):e==="focusout"&&lv()}function C1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Lu(el)}function R1(e,t){if(e==="click")return Lu(t)}function D1(e,t){if(e==="input"||e==="change")return Lu(t)}function U1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Vn=typeof Object.is=="function"?Object.is:U1;function nl(e,t){if(Vn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!tp.call(t,s)||!Vn(e[s],t[s]))return!1}return!0}function cv(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uv(e,t){var n=cv(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=cv(n)}}function q_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?q_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Y_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=au(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=au(e.document)}return t}function $p(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var N1=ss&&"documentMode"in document&&11>=document.documentMode,mr=null,op=null,Go=null,lp=!1;function hv(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;lp||mr==null||mr!==au(i)||(i=mr,"selectionStart"in i&&$p(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Go&&nl(Go,i)||(Go=i,i=Mu(op,"onSelect"),0<i.length&&(t=new Uu("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=mr)))}function va(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var gr={animationend:va("Animation","AnimationEnd"),animationiteration:va("Animation","AnimationIteration"),animationstart:va("Animation","AnimationStart"),transitionrun:va("Transition","TransitionRun"),transitionstart:va("Transition","TransitionStart"),transitioncancel:va("Transition","TransitionCancel"),transitionend:va("Transition","TransitionEnd")},Tf={},Z_={};ss&&(Z_=document.createElement("div").style,"AnimationEvent"in window||(delete gr.animationend.animation,delete gr.animationiteration.animation,delete gr.animationstart.animation),"TransitionEvent"in window||delete gr.transitionend.transition);function Ia(e){if(Tf[e])return Tf[e];if(!gr[e])return e;var t=gr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Z_)return Tf[e]=t[n];return e}var J_=Ia("animationend"),j_=Ia("animationiteration"),K_=Ia("animationstart"),L1=Ia("transitionrun"),I1=Ia("transitionstart"),O1=Ia("transitioncancel"),Q_=Ia("transitionend"),$_=new Map,cp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");cp.push("scrollEnd");function fi(e,t){$_.set(e,t),Na(t,[e])}var ru=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Zn=[],vr=0,tm=0;function Iu(){for(var e=vr,t=tm=vr=0;t<e;){var n=Zn[t];Zn[t++]=null;var i=Zn[t];Zn[t++]=null;var s=Zn[t];Zn[t++]=null;var a=Zn[t];if(Zn[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&ty(n,s,a)}}function Ou(e,t,n,i){Zn[vr++]=e,Zn[vr++]=t,Zn[vr++]=n,Zn[vr++]=i,tm|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function em(e,t,n,i){return Ou(e,t,n,i),ou(e)}function Oa(e,t){return Ou(e,null,null,t),ou(e)}function ty(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-Fn(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function ou(e){if(50<Ko)throw Ko=0,Dp=null,Error(J(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var _r={};function P1(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function In(e,t,n,i){return new P1(e,t,n,i)}function nm(e){return e=e.prototype,!(!e||!e.isReactComponent)}function es(e,t){var n=e.alternate;return n===null?(n=In(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ey(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Xc(e,t,n,i,s,a){var r=0;if(i=e,typeof e=="function")nm(e)&&(r=1);else if(typeof e=="string")r=zT(e,n,Ai.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case jf:return e=In(31,n,t,s),e.elementType=jf,e.lanes=a,e;case ur:return Ma(n.children,s,a,t);case x_:r=8,s|=24;break;case Yf:return e=In(12,n,t,s|2),e.elementType=Yf,e.lanes=a,e;case Zf:return e=In(13,n,t,s),e.elementType=Zf,e.lanes=a,e;case Jf:return e=In(19,n,t,s),e.elementType=Jf,e.lanes=a,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Qi:r=10;break t;case S_:r=9;break t;case Gp:r=11;break t;case kp:r=14;break t;case Ts:r=16,i=null;break t}r=29,n=Error(J(130,e===null?"null":typeof e,"")),i=null}return t=In(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Ma(e,t,n,i){return e=In(7,e,i,t),e.lanes=n,e}function Ef(e,t,n){return e=In(6,e,null,t),e.lanes=n,e}function ny(e){var t=In(18,null,null,0);return t.stateNode=e,t}function Af(e,t,n){return t=In(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var dv=new WeakMap;function $n(e,t){if(typeof e=="object"&&e!==null){var n=dv.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Y0(t)},dv.set(e,t),t)}return{value:e,source:t,stack:Y0(t)}}var yr=[],xr=0,lu=null,il=0,jn=[],Kn=0,Xs=null,Mi=1,Ti="";function ji(e,t){yr[xr++]=il,yr[xr++]=lu,lu=e,il=t}function iy(e,t,n){jn[Kn++]=Mi,jn[Kn++]=Ti,jn[Kn++]=Xs,Xs=e;var i=Mi;e=Ti;var s=32-Fn(i)-1;i&=~(1<<s),n+=1;var a=32-Fn(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,Mi=1<<32-Fn(t)+s|n<<s|i,Ti=a+e}else Mi=1<<a|n<<s|i,Ti=e}function im(e){e.return!==null&&(ji(e,1),iy(e,1,0))}function sm(e){for(;e===lu;)lu=yr[--xr],yr[xr]=null,il=yr[--xr],yr[xr]=null;for(;e===Xs;)Xs=jn[--Kn],jn[Kn]=null,Ti=jn[--Kn],jn[Kn]=null,Mi=jn[--Kn],jn[Kn]=null}function sy(e,t){jn[Kn++]=Mi,jn[Kn++]=Ti,jn[Kn++]=Xs,Mi=t.id,Ti=t.overflow,Xs=e}var an=null,be=null,Zt=!1,Ps=null,ti=!1,up=Error(J(519));function Ws(e){var t=Error(J(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw sl($n(t,e)),up}function fv(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[sn]=e,t[An]=i,n){case"dialog":Xt("cancel",t),Xt("close",t);break;case"iframe":case"object":case"embed":Xt("load",t);break;case"video":case"audio":for(n=0;n<ll.length;n++)Xt(ll[n],t);break;case"source":Xt("error",t);break;case"img":case"image":case"link":Xt("error",t),Xt("load",t);break;case"details":Xt("toggle",t);break;case"input":Xt("invalid",t),I_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Xt("invalid",t);break;case"textarea":Xt("invalid",t),P_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||Vx(t.textContent,n)?(i.popover!=null&&(Xt("beforetoggle",t),Xt("toggle",t)),i.onScroll!=null&&Xt("scroll",t),i.onScrollEnd!=null&&Xt("scrollend",t),i.onClick!=null&&(t.onclick=$i),t=!0):t=!1,t||Ws(e,!0)}function pv(e){for(an=e.return;an;)switch(an.tag){case 5:case 31:case 13:ti=!1;return;case 27:case 3:ti=!0;return;default:an=an.return}}function rr(e){if(e!==an)return!1;if(!Zt)return pv(e),Zt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Op(e.type,e.memoizedProps)),n=!n),n&&be&&Ws(e),pv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));be=n_(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));be=n_(e)}else t===27?(t=be,Js(e.type)?(e=zp,zp=null,be=e):be=t):be=an?ni(e.stateNode.nextSibling):null;return!0}function wa(){be=an=null,Zt=!1}function wf(){var e=Ps;return e!==null&&(Tn===null?Tn=e:Tn.push.apply(Tn,e),Ps=null),e}function sl(e){Ps===null?Ps=[e]:Ps.push(e)}var hp=wi(null),Pa=null,ts=null;function As(e,t,n){ye(hp,t._currentValue),t._currentValue=n}function ns(e){e._currentValue=hp.current,Qe(hp)}function dp(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function fp(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),dp(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(J(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),dp(r,n,e),r=null}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function Gr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(J(387));if(r=r.memoizedProps,r!==null){var o=s.type;Vn(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===eu.current){if(r=s.alternate,r===null)throw Error(J(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(ul):e=[ul])}s=s.return}e!==null&&fp(t,e,n,i),t.flags|=262144}function cu(e){for(e=e.firstContext;e!==null;){if(!Vn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){Pa=e,ts=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rn(e){return ay(Pa,e)}function Dc(e,t){return Pa===null&&Ca(e),ay(e,t)}function ay(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ts===null){if(e===null)throw Error(J(308));ts=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ts=ts.next=t;return n}var B1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},F1=qe.unstable_scheduleCallback,z1=qe.unstable_NormalPriority,He={$$typeof:Qi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function am(){return{controller:new B1,data:new Map,refCount:0}}function yl(e){e.refCount--,e.refCount===0&&F1(z1,function(){e.controller.abort()})}var ko=null,pp=0,Nr=0,Er=null;function V1(e,t){if(ko===null){var n=ko=[];pp=0,Nr=Dm(),Er={status:"pending",value:void 0,then:function(i){n.push(i)}}}return pp++,t.then(mv,mv),t}function mv(){if(--pp===0&&ko!==null){Er!==null&&(Er.status="fulfilled");var e=ko;ko=null,Nr=0,Er=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function H1(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var gv=Rt.S;Rt.S=function(e,t){yx=Pn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&V1(e,t),gv!==null&&gv(e,t)};var Ta=wi(null);function rm(){var e=Ta.current;return e!==null?e:me.pooledCache}function Wc(e,t){t===null?ye(Ta,Ta.current):ye(Ta,t.pool)}function ry(){var e=rm();return e===null?null:{parent:He._currentValue,pool:e}}var kr=Error(J(460)),om=Error(J(474)),Pu=Error(J(542)),uu={then:function(){}};function vv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function oy(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then($i,$i),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yv(e),e;default:if(typeof t.status=="string")t.then($i,$i);else{if(e=me,e!==null&&100<e.shellSuspendCounter)throw Error(J(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yv(e),e}throw Ea=t,kr}}function xa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ea=n,kr):n}}var Ea=null;function _v(){if(Ea===null)throw Error(J(459));var e=Ea;return Ea=null,e}function yv(e){if(e===kr||e===Pu)throw Error(J(483))}var Ar=null,al=0;function Uc(e){var t=al;return al+=1,Ar===null&&(Ar=[]),oy(Ar,e,t)}function Do(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Nc(e,t){throw t.$$typeof===wM?Error(J(525)):(e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ly(e){function t(h,m){if(e){var _=h.deletions;_===null?(h.deletions=[m],h.flags|=16):_.push(m)}}function n(h,m){if(!e)return null;for(;m!==null;)t(h,m),m=m.sibling;return null}function i(h){for(var m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function s(h,m){return h=es(h,m),h.index=0,h.sibling=null,h}function a(h,m,_){return h.index=_,e?(_=h.alternate,_!==null?(_=_.index,_<m?(h.flags|=67108866,m):_):(h.flags|=67108866,m)):(h.flags|=1048576,m)}function r(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,m,_,S){return m===null||m.tag!==6?(m=Ef(_,h.mode,S),m.return=h,m):(m=s(m,_),m.return=h,m)}function l(h,m,_,S){var E=_.type;return E===ur?d(h,m,_.props.children,S,_.key):m!==null&&(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Ts&&xa(E)===m.type)?(m=s(m,_.props),Do(m,_),m.return=h,m):(m=Xc(_.type,_.key,_.props,null,h.mode,S),Do(m,_),m.return=h,m)}function c(h,m,_,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=Af(_,h.mode,S),m.return=h,m):(m=s(m,_.children||[]),m.return=h,m)}function d(h,m,_,S,E){return m===null||m.tag!==7?(m=Ma(_,h.mode,S,E),m.return=h,m):(m=s(m,_),m.return=h,m)}function f(h,m,_){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=Ef(""+m,h.mode,_),m.return=h,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case bc:return _=Xc(m.type,m.key,m.props,null,h.mode,_),Do(_,m),_.return=h,_;case Oo:return m=Af(m,h.mode,_),m.return=h,m;case Ts:return m=xa(m),f(h,m,_)}if(Po(m)||Co(m))return m=Ma(m,h.mode,_,null),m.return=h,m;if(typeof m.then=="function")return f(h,Uc(m),_);if(m.$$typeof===Qi)return f(h,Dc(h,m),_);Nc(h,m)}return null}function u(h,m,_,S){var E=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return E!==null?null:o(h,m,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case bc:return _.key===E?l(h,m,_,S):null;case Oo:return _.key===E?c(h,m,_,S):null;case Ts:return _=xa(_),u(h,m,_,S)}if(Po(_)||Co(_))return E!==null?null:d(h,m,_,S,null);if(typeof _.then=="function")return u(h,m,Uc(_),S);if(_.$$typeof===Qi)return u(h,m,Dc(h,_),S);Nc(h,_)}return null}function p(h,m,_,S,E){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return h=h.get(_)||null,o(m,h,""+S,E);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case bc:return h=h.get(S.key===null?_:S.key)||null,l(m,h,S,E);case Oo:return h=h.get(S.key===null?_:S.key)||null,c(m,h,S,E);case Ts:return S=xa(S),p(h,m,_,S,E)}if(Po(S)||Co(S))return h=h.get(_)||null,d(m,h,S,E,null);if(typeof S.then=="function")return p(h,m,_,Uc(S),E);if(S.$$typeof===Qi)return p(h,m,_,Dc(m,S),E);Nc(m,S)}return null}function v(h,m,_,S){for(var E=null,A=null,C=m,y=m=0,T=null;C!==null&&y<_.length;y++){C.index>y?(T=C,C=null):T=C.sibling;var I=u(h,C,_[y],S);if(I===null){C===null&&(C=T);break}e&&C&&I.alternate===null&&t(h,C),m=a(I,m,y),A===null?E=I:A.sibling=I,A=I,C=T}if(y===_.length)return n(h,C),Zt&&ji(h,y),E;if(C===null){for(;y<_.length;y++)C=f(h,_[y],S),C!==null&&(m=a(C,m,y),A===null?E=C:A.sibling=C,A=C);return Zt&&ji(h,y),E}for(C=i(C);y<_.length;y++)T=p(C,h,y,_[y],S),T!==null&&(e&&T.alternate!==null&&C.delete(T.key===null?y:T.key),m=a(T,m,y),A===null?E=T:A.sibling=T,A=T);return e&&C.forEach(function(R){return t(h,R)}),Zt&&ji(h,y),E}function b(h,m,_,S){if(_==null)throw Error(J(151));for(var E=null,A=null,C=m,y=m=0,T=null,I=_.next();C!==null&&!I.done;y++,I=_.next()){C.index>y?(T=C,C=null):T=C.sibling;var R=u(h,C,I.value,S);if(R===null){C===null&&(C=T);break}e&&C&&R.alternate===null&&t(h,C),m=a(R,m,y),A===null?E=R:A.sibling=R,A=R,C=T}if(I.done)return n(h,C),Zt&&ji(h,y),E;if(C===null){for(;!I.done;y++,I=_.next())I=f(h,I.value,S),I!==null&&(m=a(I,m,y),A===null?E=I:A.sibling=I,A=I);return Zt&&ji(h,y),E}for(C=i(C);!I.done;y++,I=_.next())I=p(C,h,y,I.value,S),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?y:I.key),m=a(I,m,y),A===null?E=I:A.sibling=I,A=I);return e&&C.forEach(function(O){return t(h,O)}),Zt&&ji(h,y),E}function g(h,m,_,S){if(typeof _=="object"&&_!==null&&_.type===ur&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case bc:t:{for(var E=_.key;m!==null;){if(m.key===E){if(E=_.type,E===ur){if(m.tag===7){n(h,m.sibling),S=s(m,_.props.children),S.return=h,h=S;break t}}else if(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Ts&&xa(E)===m.type){n(h,m.sibling),S=s(m,_.props),Do(S,_),S.return=h,h=S;break t}n(h,m);break}else t(h,m);m=m.sibling}_.type===ur?(S=Ma(_.props.children,h.mode,S,_.key),S.return=h,h=S):(S=Xc(_.type,_.key,_.props,null,h.mode,S),Do(S,_),S.return=h,h=S)}return r(h);case Oo:t:{for(E=_.key;m!==null;){if(m.key===E)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(h,m.sibling),S=s(m,_.children||[]),S.return=h,h=S;break t}else{n(h,m);break}else t(h,m);m=m.sibling}S=Af(_,h.mode,S),S.return=h,h=S}return r(h);case Ts:return _=xa(_),g(h,m,_,S)}if(Po(_))return v(h,m,_,S);if(Co(_)){if(E=Co(_),typeof E!="function")throw Error(J(150));return _=E.call(_),b(h,m,_,S)}if(typeof _.then=="function")return g(h,m,Uc(_),S);if(_.$$typeof===Qi)return g(h,m,Dc(h,_),S);Nc(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,m!==null&&m.tag===6?(n(h,m.sibling),S=s(m,_),S.return=h,h=S):(n(h,m),S=Ef(_,h.mode,S),S.return=h,h=S),r(h)):n(h,m)}return function(h,m,_,S){try{al=0;var E=g(h,m,_,S);return Ar=null,E}catch(C){if(C===kr||C===Pu)throw C;var A=In(29,C,null,h.mode);return A.lanes=S,A.return=h,A}}}var Ra=ly(!0),cy=ly(!1),Es=!1;function lm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Bs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(te&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=ou(e),ty(e,null,n),t}return Ou(e,i,t,n),ou(e)}function Xo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,w_(e,n)}}function Cf(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var gp=!1;function Wo(){if(gp){var e=Er;if(e!==null)throw e}}function qo(e,t,n,i){gp=!1;var s=e.updateQueue;Es=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(a!==null){var f=s.baseState;r=0,d=c=l=null,o=a;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(qt&u)===u:(i&u)===u){u!==0&&u===Nr&&(gp=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var v=e,b=o;u=t;var g=n;switch(b.tag){case 1:if(v=b.payload,typeof v=="function"){f=v.call(g,f,u);break t}f=v;break t;case 3:v.flags=v.flags&-65537|128;case 0:if(v=b.payload,u=typeof v=="function"?v.call(g,f,u):v,u==null)break t;f=Me({},f,u);break t;case 2:Es=!0}}u=o.callback,u!==null&&(e.flags|=64,p&&(e.flags|=8192),p=s.callbacks,p===null?s.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=f):d=d.next=p,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);d===null&&(l=f),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=d,a===null&&(s.shared.lanes=0),Ys|=r,e.lanes=r,e.memoizedState=f}}function uy(e,t){if(typeof e!="function")throw Error(J(191,e));e.call(t)}function hy(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)uy(n[e],t)}var Lr=wi(null),hu=wi(0);function xv(e,t){e=ls,ye(hu,e),ye(Lr,t),ls=e|t.baseLanes}function vp(){ye(hu,ls),ye(Lr,Lr.current)}function cm(){ls=hu.current,Qe(Lr),Qe(hu)}var Hn=wi(null),ei=null;function ws(e){var t=e.alternate;ye(Oe,Oe.current&1),ye(Hn,e),ei===null&&(t===null||Lr.current!==null||t.memoizedState!==null)&&(ei=e)}function _p(e){ye(Oe,Oe.current),ye(Hn,e),ei===null&&(ei=e)}function dy(e){e.tag===22?(ye(Oe,Oe.current),ye(Hn,e),ei===null&&(ei=e)):Cs(e)}function Cs(){ye(Oe,Oe.current),ye(Hn,Hn.current)}function Ln(e){Qe(Hn),ei===e&&(ei=null),Qe(Oe)}var Oe=wi(0);function du(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Bp(n)||Fp(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var as=0,Bt=null,he=null,ze=null,fu=!1,wr=!1,Da=!1,pu=0,rl=0,Cr=null,G1=0;function Ue(){throw Error(J(321))}function um(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vn(e[n],t[n]))return!1;return!0}function hm(e,t,n,i,s,a){return as=a,Bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Rt.H=e===null||e.memoizedState===null?ky:bm,Da=!1,a=n(i,s),Da=!1,wr&&(a=py(t,n,i,s)),fy(e),a}function fy(e){Rt.H=ol;var t=he!==null&&he.next!==null;if(as=0,ze=he=Bt=null,fu=!1,rl=0,Cr=null,t)throw Error(J(300));e===null||Ge||(e=e.dependencies,e!==null&&cu(e)&&(Ge=!0))}function py(e,t,n,i){Bt=e;var s=0;do{if(wr&&(Cr=null),rl=0,wr=!1,25<=s)throw Error(J(301));if(s+=1,ze=he=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Rt.H=Xy,a=t(n,i)}while(wr);return a}function k1(){var e=Rt.H,t=e.useState()[0];return t=typeof t.then=="function"?xl(t):t,e=e.useState()[0],(he!==null?he.memoizedState:null)!==e&&(Bt.flags|=1024),t}function dm(){var e=pu!==0;return pu=0,e}function fm(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function pm(e){if(fu){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fu=!1}as=0,ze=he=Bt=null,wr=!1,rl=pu=0,Cr=null}function yn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ze===null?Bt.memoizedState=ze=e:ze=ze.next=e,ze}function Pe(){if(he===null){var e=Bt.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=ze===null?Bt.memoizedState:ze.next;if(t!==null)ze=t,he=e;else{if(e===null)throw Bt.alternate===null?Error(J(467)):Error(J(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},ze===null?Bt.memoizedState=ze=e:ze=ze.next=e}return ze}function Bu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xl(e){var t=rl;return rl+=1,Cr===null&&(Cr=[]),e=oy(Cr,e,t),t=Bt,(ze===null?t.memoizedState:ze.next)===null&&(t=t.alternate,Rt.H=t===null||t.memoizedState===null?ky:bm),e}function Fu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xl(e);if(e.$$typeof===Qi)return rn(e)}throw Error(J(438,String(e)))}function mm(e){var t=null,n=Bt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Bt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Bu(),Bt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=CM;return t.index++,n}function rs(e,t){return typeof t=="function"?t(e):t}function qc(e){var t=Pe();return gm(t,he,e)}function gm(e,t,n){var i=e.queue;if(i===null)throw Error(J(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,d=!1;do{var f=c.lane&-536870913;if(f!==c.lane?(qt&f)===f:(as&f)===f){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),f===Nr&&(d=!0);else if((as&u)===u){c=c.next,u===Nr&&(d=!0);continue}else f={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,r=a):l=l.next=f,Bt.lanes|=u,Ys|=u;f=c.action,Da&&n(a,f),a=c.hasEagerState?c.eagerState:n(a,f)}else u={lane:f,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Bt.lanes|=f,Ys|=f;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!Vn(a,e.memoizedState)&&(Ge=!0,d&&(n=Er,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Rf(e){var t=Pe(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);Vn(a,t.memoizedState)||(Ge=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function my(e,t,n){var i=Bt,s=Pe(),a=Zt;if(a){if(n===void 0)throw Error(J(407));n=n()}else n=t();var r=!Vn((he||s).memoizedState,n);if(r&&(s.memoizedState=n,Ge=!0),s=s.queue,vm(_y.bind(null,i,s,e),[e]),s.getSnapshot!==t||r||ze!==null&&ze.memoizedState.tag&1){if(i.flags|=2048,Ir(9,{destroy:void 0},vy.bind(null,i,s,n,t),null),me===null)throw Error(J(349));a||(as&127)!==0||gy(i,t,n)}return n}function gy(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Bt.updateQueue,t===null?(t=Bu(),Bt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vy(e,t,n,i){t.value=n,t.getSnapshot=i,yy(t)&&xy(e)}function _y(e,t,n){return n(function(){yy(t)&&xy(e)})}function yy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vn(e,n)}catch{return!0}}function xy(e){var t=Oa(e,2);t!==null&&En(t,e,2)}function yp(e){var t=yn();if(typeof e=="function"){var n=e;if(e=n(),Da){Ds(!0);try{n()}finally{Ds(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:e},t}function Sy(e,t,n,i){return e.baseState=n,gm(e,he,typeof i=="function"?i:rs)}function X1(e,t,n,i,s){if(Vu(e))throw Error(J(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Rt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,by(t,a)):(a.next=n.next,t.pending=n.next=a)}}function by(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Rt.T,r={};Rt.T=r;try{var o=n(s,i),l=Rt.S;l!==null&&l(r,o),Sv(e,t,o)}catch(c){xp(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Rt.T=a}}else try{a=n(s,i),Sv(e,t,a)}catch(c){xp(e,t,c)}}function Sv(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){bv(e,t,i)},function(i){return xp(e,t,i)}):bv(e,t,n)}function bv(e,t,n){t.status="fulfilled",t.value=n,My(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,by(e,n)))}function xp(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,My(t),t=t.next;while(t!==i)}e.action=null}function My(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ty(e,t){return t}function Mv(e,t){if(Zt){var n=me.formState;if(n!==null){t:{var i=Bt;if(Zt){if(be){e:{for(var s=be,a=ti;s.nodeType!==8;){if(!a){s=null;break e}if(s=ni(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){be=ni(s.nextSibling),i=s.data==="F!";break t}}Ws(i)}i=!1}i&&(t=n[0])}}return n=yn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ty,lastRenderedState:t},n.queue=i,n=Vy.bind(null,Bt,i),i.dispatch=n,i=yp(!1),a=Sm.bind(null,Bt,!1,i.queue),i=yn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=X1.bind(null,Bt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function Tv(e){var t=Pe();return Ey(t,he,e)}function Ey(e,t,n){if(t=gm(e,t,Ty)[0],e=qc(rs)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xl(t)}catch(r){throw r===kr?Pu:r}else i=t;t=Pe();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Bt.flags|=2048,Ir(9,{destroy:void 0},W1.bind(null,s,n),null)),[i,a,e]}function W1(e,t){e.action=t}function Ev(e){var t=Pe(),n=he;if(n!==null)return Ey(t,n,e);Pe(),t=t.memoizedState,n=Pe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Ir(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Bt.updateQueue,t===null&&(t=Bu(),Bt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Ay(){return Pe().memoizedState}function Yc(e,t,n,i){var s=yn();Bt.flags|=e,s.memoizedState=Ir(1|t,{destroy:void 0},n,i===void 0?null:i)}function zu(e,t,n,i){var s=Pe();i=i===void 0?null:i;var a=s.memoizedState.inst;he!==null&&i!==null&&um(i,he.memoizedState.deps)?s.memoizedState=Ir(t,a,n,i):(Bt.flags|=e,s.memoizedState=Ir(1|t,a,n,i))}function Av(e,t){Yc(8390656,8,e,t)}function vm(e,t){zu(2048,8,e,t)}function q1(e){Bt.flags|=4;var t=Bt.updateQueue;if(t===null)t=Bu(),Bt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function wy(e){var t=Pe().memoizedState;return q1({ref:t,nextImpl:e}),function(){if((te&2)!==0)throw Error(J(440));return t.impl.apply(void 0,arguments)}}function Cy(e,t){return zu(4,2,e,t)}function Ry(e,t){return zu(4,4,e,t)}function Dy(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Uy(e,t,n){n=n!=null?n.concat([e]):null,zu(4,4,Dy.bind(null,t,e),n)}function _m(){}function Ny(e,t){var n=Pe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&um(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ly(e,t){var n=Pe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&um(t,i[1]))return i[0];if(i=e(),Da){Ds(!0);try{e()}finally{Ds(!1)}}return n.memoizedState=[i,t],i}function ym(e,t,n){return n===void 0||(as&1073741824)!==0&&(qt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=Sx(),Bt.lanes|=e,Ys|=e,n)}function Iy(e,t,n,i){return Vn(n,t)?n:Lr.current!==null?(e=ym(e,n,i),Vn(e,t)||(Ge=!0),e):(as&42)===0||(as&1073741824)!==0&&(qt&261930)===0?(Ge=!0,e.memoizedState=n):(e=Sx(),Bt.lanes|=e,Ys|=e,t)}function Oy(e,t,n,i,s){var a=ee.p;ee.p=a!==0&&8>a?a:8;var r=Rt.T,o={};Rt.T=o,Sm(e,!1,t,n);try{var l=s(),c=Rt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=H1(l,i);Yo(e,t,d,zn(e))}else Yo(e,t,i,zn(e))}catch(f){Yo(e,t,{then:function(){},status:"rejected",reason:f},zn())}finally{ee.p=a,r!==null&&o.types!==null&&(r.types=o.types),Rt.T=r}}function Y1(){}function Sp(e,t,n,i){if(e.tag!==5)throw Error(J(476));var s=Py(e).queue;Oy(e,s,t,ba,n===null?Y1:function(){return By(e),n(i)})}function Py(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ba,baseState:ba,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:ba},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function By(e){var t=Py(e);t.next===null&&(t=e.alternate.memoizedState),Yo(e,t.next.queue,{},zn())}function xm(){return rn(ul)}function Fy(){return Pe().memoizedState}function zy(){return Pe().memoizedState}function Z1(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=zn();e=Bs(n);var i=Fs(t,e,n);i!==null&&(En(i,t,n),Xo(i,t,n)),t={cache:am()},e.payload=t;return}t=t.return}}function J1(e,t,n){var i=zn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Vu(e)?Hy(t,n):(n=em(e,t,n,i),n!==null&&(En(n,e,i),Gy(n,t,i)))}function Vy(e,t,n){var i=zn();Yo(e,t,n,i)}function Yo(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vu(e))Hy(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,Vn(o,r))return Ou(e,t,s,0),me===null&&Iu(),!1}catch{}if(n=em(e,t,s,i),n!==null)return En(n,e,i),Gy(n,t,i),!0}return!1}function Sm(e,t,n,i){if(i={lane:2,revertLane:Dm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Vu(e)){if(t)throw Error(J(479))}else t=em(e,n,i,2),t!==null&&En(t,e,2)}function Vu(e){var t=e.alternate;return e===Bt||t!==null&&t===Bt}function Hy(e,t){wr=fu=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Gy(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,w_(e,n)}}var ol={readContext:rn,use:Fu,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useLayoutEffect:Ue,useInsertionEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useSyncExternalStore:Ue,useId:Ue,useHostTransitionStatus:Ue,useFormState:Ue,useActionState:Ue,useOptimistic:Ue,useMemoCache:Ue,useCacheRefresh:Ue};ol.useEffectEvent=Ue;var ky={readContext:rn,use:Fu,useCallback:function(e,t){return yn().memoizedState=[e,t===void 0?null:t],e},useContext:rn,useEffect:Av,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Yc(4194308,4,Dy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Yc(4194308,4,e,t)},useInsertionEffect:function(e,t){Yc(4,2,e,t)},useMemo:function(e,t){var n=yn();t=t===void 0?null:t;var i=e();if(Da){Ds(!0);try{e()}finally{Ds(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=yn();if(n!==void 0){var s=n(t);if(Da){Ds(!0);try{n(t)}finally{Ds(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=J1.bind(null,Bt,e),[i.memoizedState,e]},useRef:function(e){var t=yn();return e={current:e},t.memoizedState=e},useState:function(e){e=yp(e);var t=e.queue,n=Vy.bind(null,Bt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:_m,useDeferredValue:function(e,t){var n=yn();return ym(n,e,t)},useTransition:function(){var e=yp(!1);return e=Oy.bind(null,Bt,e.queue,!0,!1),yn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Bt,s=yn();if(Zt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),me===null)throw Error(J(349));(qt&127)!==0||gy(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Av(_y.bind(null,i,a,e),[e]),i.flags|=2048,Ir(9,{destroy:void 0},vy.bind(null,i,a,n,t),null),n},useId:function(){var e=yn(),t=me.identifierPrefix;if(Zt){var n=Ti,i=Mi;n=(i&~(1<<32-Fn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=pu++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=G1++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:xm,useFormState:Mv,useActionState:Mv,useOptimistic:function(e){var t=yn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Sm.bind(null,Bt,!0,n),n.dispatch=t,[e,t]},useMemoCache:mm,useCacheRefresh:function(){return yn().memoizedState=Z1.bind(null,Bt)},useEffectEvent:function(e){var t=yn(),n={impl:e};return t.memoizedState=n,function(){if((te&2)!==0)throw Error(J(440));return n.impl.apply(void 0,arguments)}}},bm={readContext:rn,use:Fu,useCallback:Ny,useContext:rn,useEffect:vm,useImperativeHandle:Uy,useInsertionEffect:Cy,useLayoutEffect:Ry,useMemo:Ly,useReducer:qc,useRef:Ay,useState:function(){return qc(rs)},useDebugValue:_m,useDeferredValue:function(e,t){var n=Pe();return Iy(n,he.memoizedState,e,t)},useTransition:function(){var e=qc(rs)[0],t=Pe().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:my,useId:Fy,useHostTransitionStatus:xm,useFormState:Tv,useActionState:Tv,useOptimistic:function(e,t){var n=Pe();return Sy(n,he,e,t)},useMemoCache:mm,useCacheRefresh:zy};bm.useEffectEvent=wy;var Xy={readContext:rn,use:Fu,useCallback:Ny,useContext:rn,useEffect:vm,useImperativeHandle:Uy,useInsertionEffect:Cy,useLayoutEffect:Ry,useMemo:Ly,useReducer:Rf,useRef:Ay,useState:function(){return Rf(rs)},useDebugValue:_m,useDeferredValue:function(e,t){var n=Pe();return he===null?ym(n,e,t):Iy(n,he.memoizedState,e,t)},useTransition:function(){var e=Rf(rs)[0],t=Pe().memoizedState;return[typeof e=="boolean"?e:xl(e),t]},useSyncExternalStore:my,useId:Fy,useHostTransitionStatus:xm,useFormState:Ev,useActionState:Ev,useOptimistic:function(e,t){var n=Pe();return he!==null?Sy(n,he,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:mm,useCacheRefresh:zy};Xy.useEffectEvent=wy;function Df(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Me({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var bp={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=zn(),s=Bs(i);s.payload=t,n!=null&&(s.callback=n),t=Fs(e,s,i),t!==null&&(En(t,e,i),Xo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=zn(),s=Bs(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Fs(e,s,i),t!==null&&(En(t,e,i),Xo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=zn(),i=Bs(n);i.tag=2,t!=null&&(i.callback=t),t=Fs(e,i,n),t!==null&&(En(t,e,n),Xo(t,e,n))}};function wv(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!nl(n,i)||!nl(s,a):!0}function Cv(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&bp.enqueueReplaceState(t,t.state,null)}function Ua(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Me({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function Wy(e){ru(e)}function qy(e){console.error(e)}function Yy(e){ru(e)}function mu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Rv(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function Mp(e,t,n){return n=Bs(n),n.tag=3,n.payload={element:null},n.callback=function(){mu(e,t)},n}function Zy(e){return e=Bs(e),e.tag=3,e}function Jy(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Rv(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Rv(t,n,i),typeof s!="function"&&(zs===null?zs=new Set([this]):zs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function j1(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Gr(t,n,s,!0),n=Hn.current,n!==null){switch(n.tag){case 31:case 13:return ei===null?xu():n.alternate===null&&Ne===0&&(Ne=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===uu?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Hf(e,i,s)),!1;case 22:return n.flags|=65536,i===uu?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Hf(e,i,s)),!1}throw Error(J(435,n.tag))}return Hf(e,i,s),xu(),!1}if(Zt)return t=Hn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==up&&(e=Error(J(422),{cause:i}),sl($n(e,n)))):(i!==up&&(t=Error(J(423),{cause:i}),sl($n(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=$n(i,n),s=Mp(e.stateNode,i,s),Cf(e,s),Ne!==4&&(Ne=2)),!1;var a=Error(J(520),{cause:i});if(a=$n(a,n),jo===null?jo=[a]:jo.push(a),Ne!==4&&(Ne=2),t===null)return!0;i=$n(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=Mp(n.stateNode,i,e),Cf(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(zs===null||!zs.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Zy(s),Jy(s,e,n,i),Cf(n,s),!1}n=n.return}while(n!==null);return!1}var Mm=Error(J(461)),Ge=!1;function nn(e,t,n,i){t.child=e===null?cy(t,null,n,i):Ra(t,e.child,n,i)}function Dv(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ca(t),i=hm(e,t,n,r,a,s),o=dm(),e!==null&&!Ge?(fm(e,t,s),os(e,t,s)):(Zt&&o&&im(t),t.flags|=1,nn(e,t,i,s),t.child)}function Uv(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!nm(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,jy(e,t,a,i,s)):(e=Xc(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Tm(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:nl,n(r,i)&&e.ref===t.ref)return os(e,t,s)}return t.flags|=1,e=es(a,i),e.ref=t.ref,e.return=t,t.child=e}function jy(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(nl(a,i)&&e.ref===t.ref)if(Ge=!1,t.pendingProps=i=a,Tm(e,s))(e.flags&131072)!==0&&(Ge=!0);else return t.lanes=e.lanes,os(e,t,s)}return Tp(e,t,n,i,s)}function Ky(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Nv(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wc(t,a!==null?a.cachePool:null),a!==null?xv(t,a):vp(),dy(t);else return i=t.lanes=536870912,Nv(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(Wc(t,a.cachePool),xv(t,a),Cs(t),t.memoizedState=null):(e!==null&&Wc(t,null),vp(),Cs(t));return nn(e,t,s,n),t.child}function Fo(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Nv(e,t,n,i,s){var a=rm();return a=a===null?null:{parent:He._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Wc(t,null),vp(),dy(t),e!==null&&Gr(e,t,i,!0),t.childLanes=s,null}function Zc(e,t){return t=gu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Lv(e,t,n){return Ra(t,e.child,null,n),e=Zc(t,t.pendingProps),e.flags|=2,Ln(t),t.memoizedState=null,e}function K1(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Zt){if(i.mode==="hidden")return e=Zc(t,i),t.lanes=536870912,Fo(null,e);if(_p(t),(e=be)?(e=kx(e,ti),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Xs!==null?{id:Mi,overflow:Ti}:null,retryLane:536870912,hydrationErrors:null},n=ny(e),n.return=t,t.child=n,an=t,be=null)):e=null,e===null)throw Ws(t);return t.lanes=536870912,null}return Zc(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(_p(t),s)if(t.flags&256)t.flags&=-257,t=Lv(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(J(558));else if(Ge||Gr(e,t,n,!1),s=(n&e.childLanes)!==0,Ge||s){if(i=me,i!==null&&(r=C_(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Oa(e,r),En(i,e,r),Mm;xu(),t=Lv(e,t,n)}else e=a.treeContext,be=ni(r.nextSibling),an=t,Zt=!0,Ps=null,ti=!1,e!==null&&sy(t,e),t=Zc(t,i),t.flags|=4096;return t}return e=es(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Jc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(J(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Tp(e,t,n,i,s){return Ca(t),n=hm(e,t,n,i,void 0,s),i=dm(),e!==null&&!Ge?(fm(e,t,s),os(e,t,s)):(Zt&&i&&im(t),t.flags|=1,nn(e,t,n,s),t.child)}function Iv(e,t,n,i,s,a){return Ca(t),t.updateQueue=null,n=py(t,i,n,s),fy(e),i=dm(),e!==null&&!Ge?(fm(e,t,a),os(e,t,a)):(Zt&&i&&im(t),t.flags|=1,nn(e,t,n,a),t.child)}function Ov(e,t,n,i,s){if(Ca(t),t.stateNode===null){var a=_r,r=n.contextType;typeof r=="object"&&r!==null&&(a=rn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=bp,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},lm(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?rn(r):_r,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Df(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&bp.enqueueReplaceState(a,a.state,null),qo(t,i,a,s),Wo(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=Ua(n,o);a.props=l;var c=a.context,d=n.contextType;r=_r,typeof d=="object"&&d!==null&&(r=rn(d));var f=n.getDerivedStateFromProps;d=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&Cv(t,a,i,r),Es=!1;var u=t.memoizedState;a.state=u,qo(t,i,a,s),Wo(),c=t.memoizedState,o||u!==c||Es?(typeof f=="function"&&(Df(t,n,f,i),c=t.memoizedState),(l=Es||wv(t,n,l,i,u,c,r))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,mp(e,t),r=t.memoizedProps,d=Ua(n,r),a.props=d,f=t.pendingProps,u=a.context,c=n.contextType,l=_r,typeof c=="object"&&c!==null&&(l=rn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==f||u!==l)&&Cv(t,a,i,l),Es=!1,u=t.memoizedState,a.state=u,qo(t,i,a,s),Wo();var p=t.memoizedState;r!==f||u!==p||Es||e!==null&&e.dependencies!==null&&cu(e.dependencies)?(typeof o=="function"&&(Df(t,n,o,i),p=t.memoizedState),(d=Es||wv(t,n,d,i,u,p,l)||e!==null&&e.dependencies!==null&&cu(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,p,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,p,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),a.props=i,a.state=p,a.context=l,i=d):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Jc(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=Ra(t,e.child,null,s),t.child=Ra(t,null,n,s)):nn(e,t,n,s),t.memoizedState=a.state,e=t.child):e=os(e,t,s),e}function Pv(e,t,n,i){return wa(),t.flags|=256,nn(e,t,n,i),t.child}var Uf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Nf(e){return{baseLanes:e,cachePool:ry()}}function Lf(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=On),e}function Qy(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(Oe.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Zt){if(s?ws(t):Cs(t),(e=be)?(e=kx(e,ti),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Xs!==null?{id:Mi,overflow:Ti}:null,retryLane:536870912,hydrationErrors:null},n=ny(e),n.return=t,t.child=n,an=t,be=null)):e=null,e===null)throw Ws(t);return Fp(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,s?(Cs(t),s=t.mode,o=gu({mode:"hidden",children:o},s),i=Ma(i,s,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=Nf(n),i.childLanes=Lf(e,r,n),t.memoizedState=Uf,Fo(null,i)):(ws(t),Ep(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(a)t.flags&256?(ws(t),t.flags&=-257,t=If(e,t,n)):t.memoizedState!==null?(Cs(t),t.child=e.child,t.flags|=128,t=null):(Cs(t),o=i.fallback,s=t.mode,i=gu({mode:"visible",children:i.children},s),o=Ma(o,s,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,Ra(t,e.child,null,n),i=t.child,i.memoizedState=Nf(n),i.childLanes=Lf(e,r,n),t.memoizedState=Uf,t=Fo(null,i));else if(ws(t),Fp(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(J(419)),i.stack="",i.digest=r,sl({value:i,source:null,stack:null}),t=If(e,t,n)}else if(Ge||Gr(e,t,n,!1),r=(n&e.childLanes)!==0,Ge||r){if(r=me,r!==null&&(i=C_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,Oa(e,i),En(r,e,i),Mm;Bp(o)||xu(),t=If(e,t,n)}else Bp(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,be=ni(o.nextSibling),an=t,Zt=!0,Ps=null,ti=!1,e!==null&&sy(t,e),t=Ep(t,i.children),t.flags|=4096);return t}return s?(Cs(t),o=i.fallback,s=t.mode,l=e.child,c=l.sibling,i=es(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=es(c,o):(o=Ma(o,s,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,Fo(null,i),i=t.child,o=e.child.memoizedState,o===null?o=Nf(n):(s=o.cachePool,s!==null?(l=He._currentValue,s=s.parent!==l?{parent:l,pool:l}:s):s=ry(),o={baseLanes:o.baseLanes|n,cachePool:s}),i.memoizedState=o,i.childLanes=Lf(e,r,n),t.memoizedState=Uf,Fo(e.child,i)):(ws(t),n=e.child,e=n.sibling,n=es(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Ep(e,t){return t=gu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function gu(e,t){return e=In(22,e,null,t),e.lanes=0,e}function If(e,t,n){return Ra(t,e.child,null,n),e=Ep(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Bv(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),dp(e.return,t,n)}function Of(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function $y(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=Oe.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,ye(Oe,r),nn(e,t,i,n),i=Zt?il:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Bv(e,n,t);else if(e.tag===19)Bv(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&du(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Of(t,!1,s,n,a,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&du(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Of(t,!0,n,null,a,i);break;case"together":Of(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function os(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ys|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Gr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=es(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=es(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&cu(e)))}function Q1(e,t,n){switch(t.tag){case 3:nu(t,t.stateNode.containerInfo),As(t,He,e.memoizedState.cache),wa();break;case 27:case 5:$f(t);break;case 4:nu(t,t.stateNode.containerInfo);break;case 10:As(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,_p(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(ws(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Qy(e,t,n):(ws(t),e=os(e,t,n),e!==null?e.sibling:null);ws(t);break;case 19:var s=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Gr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return $y(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ye(Oe,Oe.current),i)break;return null;case 22:return t.lanes=0,Ky(e,t,n,t.pendingProps);case 24:As(t,He,e.memoizedState.cache)}return os(e,t,n)}function tx(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ge=!0;else{if(!Tm(e,n)&&(t.flags&128)===0)return Ge=!1,Q1(e,t,n);Ge=(e.flags&131072)!==0}else Ge=!1,Zt&&(t.flags&1048576)!==0&&iy(t,il,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=xa(t.elementType),t.type=e,typeof e=="function")nm(e)?(i=Ua(e,i),t.tag=1,t=Ov(null,t,e,i,n)):(t.tag=0,t=Tp(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Gp){t.tag=11,t=Dv(null,t,e,i,n);break t}else if(s===kp){t.tag=14,t=Uv(null,t,e,i,n);break t}}throw t=Kf(e)||e,Error(J(306,t,""))}}return t;case 0:return Tp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Ua(i,t.pendingProps),Ov(e,t,i,s,n);case 3:t:{if(nu(t,t.stateNode.containerInfo),e===null)throw Error(J(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,mp(e,t),qo(t,i,null,n);var r=t.memoizedState;if(i=r.cache,As(t,He,i),i!==a.cache&&fp(t,[He],n,!0),Wo(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Pv(e,t,i,n);break t}else if(i!==s){s=$n(Error(J(424)),t),sl(s),t=Pv(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,be=ni(e.firstChild),an=t,Zt=!0,Ps=null,ti=!0,n=cy(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(wa(),i===s){t=os(e,t,n);break t}nn(e,t,i,n)}t=t.child}return t;case 26:return Jc(e,t),e===null?(n=a_(t.type,null,t.pendingProps,null))?t.memoizedState=n:Zt||(n=t.type,e=t.pendingProps,i=Tu(Os.current).createElement(n),i[sn]=t,i[An]=e,on(i,n,e),Ke(i),t.stateNode=i):t.memoizedState=a_(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return $f(t),e===null&&Zt&&(i=t.stateNode=Xx(t.type,t.pendingProps,Os.current),an=t,ti=!0,s=be,Js(t.type)?(zp=s,be=ni(i.firstChild)):be=s),nn(e,t,t.pendingProps.children,n),Jc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Zt&&((s=i=be)&&(i=AT(i,t.type,t.pendingProps,ti),i!==null?(t.stateNode=i,an=t,be=ni(i.firstChild),ti=!1,s=!0):s=!1),s||Ws(t)),$f(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Op(s,a)?i=null:r!==null&&Op(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=hm(e,t,k1,null,null,n),ul._currentValue=s),Jc(e,t),nn(e,t,i,n),t.child;case 6:return e===null&&Zt&&((e=n=be)&&(n=wT(n,t.pendingProps,ti),n!==null?(t.stateNode=n,an=t,be=null,e=!0):e=!1),e||Ws(t)),null;case 13:return Qy(e,t,n);case 4:return nu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Ra(t,null,i,n):nn(e,t,i,n),t.child;case 11:return Dv(e,t,t.type,t.pendingProps,n);case 7:return nn(e,t,t.pendingProps,n),t.child;case 8:return nn(e,t,t.pendingProps.children,n),t.child;case 12:return nn(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,As(t,t.type,i.value),nn(e,t,i.children,n),t.child;case 9:return s=t.type._context,i=t.pendingProps.children,Ca(t),s=rn(s),i=i(s),t.flags|=1,nn(e,t,i,n),t.child;case 14:return Uv(e,t,t.type,t.pendingProps,n);case 15:return jy(e,t,t.type,t.pendingProps,n);case 19:return $y(e,t,n);case 31:return K1(e,t,n);case 22:return Ky(e,t,n,t.pendingProps);case 24:return Ca(t),i=rn(He),e===null?(s=rm(),s===null&&(s=me,a=am(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},lm(t),As(t,He,s)):((e.lanes&n)!==0&&(mp(e,t),qo(t,null,null,n),Wo()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),As(t,He,i)):(i=a.cache,As(t,He,i),i!==s.cache&&fp(t,[He],n,!0))),nn(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(J(156,t.tag))}function qi(e){e.flags|=4}function Pf(e,t,n,i,s){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(Tx())e.flags|=8192;else throw Ea=uu,om}else e.flags&=-16777217}function Fv(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yx(t))if(Tx())e.flags|=8192;else throw Ea=uu,om}function Lc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?E_():536870912,e.lanes|=t,Or|=t)}function Uo(e,t){if(!Zt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&65011712,i|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function $1(e,t,n){var i=t.pendingProps;switch(sm(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(t),null;case 1:return Se(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),ns(He),Rr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(rr(t)?qi(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,wf())),Se(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(qi(t),a!==null?(Se(t),Fv(t,a)):(Se(t),Pf(t,s,null,i,n))):a?a!==e.memoizedState?(qi(t),Se(t),Fv(t,a)):(Se(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&qi(t),Se(t),Pf(t,s,e,i,n)),null;case 27:if(iu(t),n=Os.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&qi(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Se(t),null}e=Ai.current,rr(t)?fv(t,e):(e=Xx(s,i,n),t.stateNode=e,qi(t))}return Se(t),null;case 5:if(iu(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&qi(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Se(t),null}if(a=Ai.current,rr(t))fv(t,a);else{var r=Tu(Os.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[sn]=t,a[An]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(on(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&qi(t)}}return Se(t),Pf(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&qi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(J(166));if(e=Os.current,rr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=an,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[sn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||Vx(e.nodeValue,n)),e||Ws(t,!0)}else e=Tu(e).createTextNode(i),e[sn]=t,t.stateNode=e}return Se(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=rr(t),n!==null){if(e===null){if(!i)throw Error(J(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(557));e[sn]=t}else wa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Se(t),e=!1}else n=wf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ln(t),t):(Ln(t),null);if((t.flags&128)!==0)throw Error(J(558))}return Se(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=rr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(J(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(J(317));s[sn]=t}else wa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Se(t),s=!1}else s=wf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Ln(t),t):(Ln(t),null)}return Ln(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Lc(t,t.updateQueue),Se(t),null);case 4:return Rr(),e===null&&Um(t.stateNode.containerInfo),Se(t),null;case 10:return ns(t.type),Se(t),null;case 19:if(Qe(Oe),i=t.memoizedState,i===null)return Se(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Uo(i,!1);else{if(Ne!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=du(e),a!==null){for(t.flags|=128,Uo(i,!1),e=a.updateQueue,t.updateQueue=e,Lc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ey(n,e),n=n.sibling;return ye(Oe,Oe.current&1|2),Zt&&ji(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Pn()>_u&&(t.flags|=128,s=!0,Uo(i,!1),t.lanes=4194304)}else{if(!s)if(e=du(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Lc(t,e),Uo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Zt)return Se(t),null}else 2*Pn()-i.renderingStartTime>_u&&n!==536870912&&(t.flags|=128,s=!0,Uo(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Pn(),e.sibling=null,n=Oe.current,ye(Oe,s?n&1|2:n&1),Zt&&ji(t,i.treeForkCount),e):(Se(t),null);case 22:case 23:return Ln(t),cm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Se(t),t.subtreeFlags&6&&(t.flags|=8192)):Se(t),n=t.updateQueue,n!==null&&Lc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&Qe(Ta),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ns(He),Se(t),null;case 25:return null;case 30:return null}throw Error(J(156,t.tag))}function tT(e,t){switch(sm(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ns(He),Rr(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return iu(t),null;case 31:if(t.memoizedState!==null){if(Ln(t),t.alternate===null)throw Error(J(340));wa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ln(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));wa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Qe(Oe),null;case 4:return Rr(),null;case 10:return ns(t.type),null;case 22:case 23:return Ln(t),cm(),e!==null&&Qe(Ta),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ns(He),null;case 25:return null;default:return null}}function ex(e,t){switch(sm(t),t.tag){case 3:ns(He),Rr();break;case 26:case 27:case 5:iu(t);break;case 4:Rr();break;case 31:t.memoizedState!==null&&Ln(t);break;case 13:Ln(t);break;case 19:Qe(Oe);break;case 10:ns(t.type);break;case 22:case 23:Ln(t),cm(),e!==null&&Qe(Ta);break;case 24:ns(He)}}function Sl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){re(t,t.return,o)}}function qs(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(d){re(s,l,d)}}}i=i.next}while(i!==a)}}catch(d){re(t,t.return,d)}}function nx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{hy(t,n)}catch(i){re(e,e.return,i)}}}function ix(e,t,n){n.props=Ua(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){re(e,t,i)}}function Zo(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(s){re(e,t,s)}}function Ei(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){re(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){re(e,t,s)}else n.current=null}function sx(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){re(e,e.return,s)}}function Bf(e,t,n){try{var i=e.stateNode;xT(i,e.type,n,t),i[An]=t}catch(s){re(e,e.return,s)}}function ax(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Js(e.type)||e.tag===4}function Ff(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||ax(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Js(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ap(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$i));else if(i!==4&&(i===27&&Js(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Ap(e,t,n),e=e.sibling;e!==null;)Ap(e,t,n),e=e.sibling}function vu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&Js(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(vu(e,t,n),e=e.sibling;e!==null;)vu(e,t,n),e=e.sibling}function rx(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);on(t,i,n),t[sn]=e,t[An]=n}catch(a){re(e,e.return,a)}}var Ki=!1,Ve=!1,zf=!1,zv=typeof WeakSet=="function"?WeakSet:Set,je=null;function eT(e,t){if(e=e.containerInfo,Lp=Cu,e=Y_(e),$p(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var s=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,d=0,f=e,u=null;e:for(;;){for(var p;f!==n||s!==0&&f.nodeType!==3||(o=r+s),f!==a||i!==0&&f.nodeType!==3||(l=r+i),f.nodeType===3&&(r+=f.nodeValue.length),(p=f.firstChild)!==null;)u=f,f=p;for(;;){if(f===e)break e;if(u===n&&++c===s&&(o=r),u===a&&++d===i&&(l=r),(p=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ip={focusedElem:e,selectionRange:n},Cu=!1,je=t;je!==null;)if(t=je,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,je=e;else for(;je!==null;){switch(t=je,a=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)s=e[n],s.ref.impl=s.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&a!==null){e=void 0,n=t,s=a.memoizedProps,a=a.memoizedState,i=n.stateNode;try{var v=Ua(n.type,s);e=i.getSnapshotBeforeUpdate(v,a),i.__reactInternalSnapshotBeforeUpdate=e}catch(b){re(n,n.return,b)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Pp(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Pp(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(J(163))}if(e=t.sibling,e!==null){e.return=t.return,je=e;break}je=t.return}}function ox(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Zi(e,n),i&4&&Sl(5,n);break;case 1:if(Zi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){re(n,n.return,r)}else{var s=Ua(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){re(n,n.return,r)}}i&64&&nx(n),i&512&&Zo(n,n.return);break;case 3:if(Zi(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{hy(e,t)}catch(r){re(n,n.return,r)}}break;case 27:t===null&&i&4&&rx(n);case 26:case 5:Zi(e,n),t===null&&i&4&&sx(n),i&512&&Zo(n,n.return);break;case 12:Zi(e,n);break;case 31:Zi(e,n),i&4&&ux(e,n);break;case 13:Zi(e,n),i&4&&hx(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=uT.bind(null,n),CT(e,n))));break;case 22:if(i=n.memoizedState!==null||Ki,!i){t=t!==null&&t.memoizedState!==null||Ve,s=Ki;var a=Ve;Ki=i,(Ve=t)&&!a?Ji(e,n,(n.subtreeFlags&8772)!==0):Zi(e,n),Ki=s,Ve=a}break;case 30:break;default:Zi(e,n)}}function lx(e){var t=e.alternate;t!==null&&(e.alternate=null,lx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Yp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ce=null,Mn=!1;function Yi(e,t,n){for(n=n.child;n!==null;)cx(e,t,n),n=n.sibling}function cx(e,t,n){if(Bn&&typeof Bn.onCommitFiberUnmount=="function")try{Bn.onCommitFiberUnmount(pl,n)}catch{}switch(n.tag){case 26:Ve||Ei(n,t),Yi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ve||Ei(n,t);var i=Ce,s=Mn;Js(n.type)&&(Ce=n.stateNode,Mn=!1),Yi(e,t,n),Qo(n.stateNode),Ce=i,Mn=s;break;case 5:Ve||Ei(n,t);case 6:if(i=Ce,s=Mn,Ce=null,Yi(e,t,n),Ce=i,Mn=s,Ce!==null)if(Mn)try{(Ce.nodeType===9?Ce.body:Ce.nodeName==="HTML"?Ce.ownerDocument.body:Ce).removeChild(n.stateNode)}catch(a){re(n,t,a)}else try{Ce.removeChild(n.stateNode)}catch(a){re(n,t,a)}break;case 18:Ce!==null&&(Mn?(e=Ce,t_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),zr(e)):t_(Ce,n.stateNode));break;case 4:i=Ce,s=Mn,Ce=n.stateNode.containerInfo,Mn=!0,Yi(e,t,n),Ce=i,Mn=s;break;case 0:case 11:case 14:case 15:qs(2,n,t),Ve||qs(4,n,t),Yi(e,t,n);break;case 1:Ve||(Ei(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&ix(n,t,i)),Yi(e,t,n);break;case 21:Yi(e,t,n);break;case 22:Ve=(i=Ve)||n.memoizedState!==null,Yi(e,t,n),Ve=i;break;default:Yi(e,t,n)}}function ux(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{zr(e)}catch(n){re(t,t.return,n)}}}function hx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{zr(e)}catch(n){re(t,t.return,n)}}function nT(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new zv),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new zv),t;default:throw Error(J(435,e.tag))}}function Ic(e,t){var n=nT(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=hT.bind(null,e,i);i.then(s,s)}})}function Sn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i],a=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(Js(o.type)){Ce=o.stateNode,Mn=!1;break t}break;case 5:Ce=o.stateNode,Mn=!1;break t;case 3:case 4:Ce=o.stateNode.containerInfo,Mn=!0;break t}o=o.return}if(Ce===null)throw Error(J(160));cx(a,r,s),Ce=null,Mn=!1,a=s.alternate,a!==null&&(a.return=null),s.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)dx(t,e),t=t.sibling}var di=null;function dx(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Sn(t,e),bn(e),i&4&&(qs(3,e,e.return),Sl(3,e),qs(5,e,e.return));break;case 1:Sn(t,e),bn(e),i&512&&(Ve||n===null||Ei(n,n.return)),i&64&&Ki&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var s=di;if(Sn(t,e),bn(e),i&512&&(Ve||n===null||Ei(n,n.return)),i&4){var a=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,s=s.ownerDocument||s;e:switch(i){case"title":a=s.getElementsByTagName("title")[0],(!a||a[vl]||a[sn]||a.namespaceURI==="http://www.w3.org/2000/svg"||a.hasAttribute("itemprop"))&&(a=s.createElement(i),s.head.insertBefore(a,s.querySelector("head > title"))),on(a,i,n),a[sn]=e,Ke(a),i=a;break t;case"link":var r=o_("link","href",s).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(a=r[o],a.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&a.getAttribute("rel")===(n.rel==null?null:n.rel)&&a.getAttribute("title")===(n.title==null?null:n.title)&&a.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}a=s.createElement(i),on(a,i,n),s.head.appendChild(a);break;case"meta":if(r=o_("meta","content",s).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(a=r[o],a.getAttribute("content")===(n.content==null?null:""+n.content)&&a.getAttribute("name")===(n.name==null?null:n.name)&&a.getAttribute("property")===(n.property==null?null:n.property)&&a.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}a=s.createElement(i),on(a,i,n),s.head.appendChild(a);break;default:throw Error(J(468,i))}a[sn]=e,Ke(a),i=a}e.stateNode=i}else l_(s,e.type,e.stateNode);else e.stateNode=r_(s,i,e.memoizedProps);else a!==i?(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,i===null?l_(s,e.type,e.stateNode):r_(s,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Bf(e,e.memoizedProps,n.memoizedProps)}break;case 27:Sn(t,e),bn(e),i&512&&(Ve||n===null||Ei(n,n.return)),n!==null&&i&4&&Bf(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Sn(t,e),bn(e),i&512&&(Ve||n===null||Ei(n,n.return)),e.flags&32){s=e.stateNode;try{Ur(s,"")}catch(v){re(e,e.return,v)}}i&4&&e.stateNode!=null&&(s=e.memoizedProps,Bf(e,s,n!==null?n.memoizedProps:s)),i&1024&&(zf=!0);break;case 6:if(Sn(t,e),bn(e),i&4){if(e.stateNode===null)throw Error(J(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(v){re(e,e.return,v)}}break;case 3:if(Qc=null,s=di,di=Eu(t.containerInfo),Sn(t,e),di=s,bn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{zr(t.containerInfo)}catch(v){re(e,e.return,v)}zf&&(zf=!1,fx(e));break;case 4:i=di,di=Eu(e.stateNode.containerInfo),Sn(t,e),bn(e),di=i;break;case 12:Sn(t,e),bn(e);break;case 31:Sn(t,e),bn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Ic(e,i)));break;case 13:Sn(t,e),bn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Hu=Pn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Ic(e,i)));break;case 22:s=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Ki,d=Ve;if(Ki=c||s,Ve=d||l,Sn(t,e),Ve=d,Ki=c,bn(e),i&8192)t:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(n===null||l||Ki||Ve||Sa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,s)r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var f=l.memoizedProps.style,u=f!=null&&f.hasOwnProperty("display")?f.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(v){re(l,l.return,v)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=s?"":l.memoizedProps}catch(v){re(l,l.return,v)}}}else if(t.tag===18){if(n===null){l=t;try{var p=l.stateNode;s?e_(p,!0):e_(l.stateNode,!1)}catch(v){re(l,l.return,v)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Ic(e,n))));break;case 19:Sn(t,e),bn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Ic(e,i)));break;case 30:break;case 21:break;default:Sn(t,e),bn(e)}}function bn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(ax(i)){n=i;break}i=i.return}if(n==null)throw Error(J(160));switch(n.tag){case 27:var s=n.stateNode,a=Ff(e);vu(e,a,s);break;case 5:var r=n.stateNode;n.flags&32&&(Ur(r,""),n.flags&=-33);var o=Ff(e);vu(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Ff(e);Ap(e,c,l);break;default:throw Error(J(161))}}catch(d){re(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function fx(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;fx(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Zi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ox(e,t.alternate,t),t=t.sibling}function Sa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:qs(4,t,t.return),Sa(t);break;case 1:Ei(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&ix(t,t.return,n),Sa(t);break;case 27:Qo(t.stateNode);case 26:case 5:Ei(t,t.return),Sa(t);break;case 22:t.memoizedState===null&&Sa(t);break;case 30:Sa(t);break;default:Sa(t)}e=e.sibling}}function Ji(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags;switch(a.tag){case 0:case 11:case 15:Ji(s,a,n),Sl(4,a);break;case 1:if(Ji(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){re(i,i.return,c)}if(i=a,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)uy(l[s],o)}catch(c){re(i,i.return,c)}}n&&r&64&&nx(a),Zo(a,a.return);break;case 27:rx(a);case 26:case 5:Ji(s,a,n),n&&i===null&&r&4&&sx(a),Zo(a,a.return);break;case 12:Ji(s,a,n);break;case 31:Ji(s,a,n),n&&r&4&&ux(s,a);break;case 13:Ji(s,a,n),n&&r&4&&hx(s,a);break;case 22:a.memoizedState===null&&Ji(s,a,n),Zo(a,a.return);break;case 30:break;default:Ji(s,a,n)}t=t.sibling}}function Em(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&yl(n))}function Am(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&yl(e))}function hi(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)px(e,t,n,i),t=t.sibling}function px(e,t,n,i){var s=t.flags;switch(t.tag){case 0:case 11:case 15:hi(e,t,n,i),s&2048&&Sl(9,t);break;case 1:hi(e,t,n,i);break;case 3:hi(e,t,n,i),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&yl(e)));break;case 12:if(s&2048){hi(e,t,n,i),e=t.stateNode;try{var a=t.memoizedProps,r=a.id,o=a.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){re(t,t.return,l)}}else hi(e,t,n,i);break;case 31:hi(e,t,n,i);break;case 13:hi(e,t,n,i);break;case 23:break;case 22:a=t.stateNode,r=t.alternate,t.memoizedState!==null?a._visibility&2?hi(e,t,n,i):Jo(e,t):a._visibility&2?hi(e,t,n,i):(a._visibility|=2,lr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),s&2048&&Em(r,t);break;case 24:hi(e,t,n,i),s&2048&&Am(t.alternate,t);break;default:hi(e,t,n,i)}}function lr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:lr(a,r,o,l,s),Sl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?lr(a,r,o,l,s):Jo(a,r):(d._visibility|=2,lr(a,r,o,l,s)),s&&c&2048&&Em(r.alternate,r);break;case 24:lr(a,r,o,l,s),s&&c&2048&&Am(r.alternate,r);break;default:lr(a,r,o,l,s)}t=t.sibling}}function Jo(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Jo(n,i),s&2048&&Em(i.alternate,i);break;case 24:Jo(n,i),s&2048&&Am(i.alternate,i);break;default:Jo(n,i)}t=t.sibling}}var zo=8192;function or(e,t,n){if(e.subtreeFlags&zo)for(e=e.child;e!==null;)mx(e,t,n),e=e.sibling}function mx(e,t,n){switch(e.tag){case 26:or(e,t,n),e.flags&zo&&e.memoizedState!==null&&VT(n,di,e.memoizedState,e.memoizedProps);break;case 5:or(e,t,n);break;case 3:case 4:var i=di;di=Eu(e.stateNode.containerInfo),or(e,t,n),di=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=zo,zo=16777216,or(e,t,n),zo=i):or(e,t,n));break;default:or(e,t,n)}}function gx(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function No(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,_x(i,e)}gx(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)vx(e),e=e.sibling}function vx(e){switch(e.tag){case 0:case 11:case 15:No(e),e.flags&2048&&qs(9,e,e.return);break;case 3:No(e);break;case 12:No(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,jc(e)):No(e);break;default:No(e)}}function jc(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,_x(i,e)}gx(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:qs(8,t,t.return),jc(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,jc(t));break;default:jc(t)}e=e.sibling}}function _x(e,t){for(;je!==null;){var n=je;switch(n.tag){case 0:case 11:case 15:qs(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:yl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,je=i;else t:for(n=e;je!==null;){i=je;var s=i.sibling,a=i.return;if(lx(i),i===n){je=null;break t}if(s!==null){s.return=a,je=s;break t}je=a}}}var iT={getCacheForType:function(e){var t=rn(He),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return rn(He).controller.signal}},sT=typeof WeakMap=="function"?WeakMap:Map,te=0,me=null,Wt=null,qt=0,ae=0,Nn=null,Ns=!1,Xr=!1,wm=!1,ls=0,Ne=0,Ys=0,Aa=0,Cm=0,On=0,Or=0,jo=null,Tn=null,wp=!1,Hu=0,yx=0,_u=1/0,yu=null,zs=null,We=0,Vs=null,Pr=null,is=0,Cp=0,Rp=null,xx=null,Ko=0,Dp=null;function zn(){return(te&2)!==0&&qt!==0?qt&-qt:Rt.T!==null?Dm():R_()}function Sx(){if(On===0)if((qt&536870912)===0||Zt){var e=Tc;Tc<<=1,(Tc&3932160)===0&&(Tc=262144),On=e}else On=536870912;return e=Hn.current,e!==null&&(e.flags|=32),On}function En(e,t,n){(e===me&&(ae===2||ae===9)||e.cancelPendingCommit!==null)&&(Br(e,0),Ls(e,qt,On,!1)),gl(e,n),((te&2)===0||e!==me)&&(e===me&&((te&2)===0&&(Aa|=n),Ne===4&&Ls(e,qt,On,!1)),Ci(e))}function bx(e,t,n){if((te&6)!==0)throw Error(J(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||ml(e,t),s=i?oT(e,t):Vf(e,t,!0),a=i;do{if(s===0){Xr&&!i&&Ls(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!aT(n)){s=Vf(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=jo;var l=o.current.memoizedState.isDehydrated;if(l&&(Br(o,r).flags|=256),r=Vf(o,r,!1),r!==2){if(wm&&!l){o.errorRecoveryDisabledLanes|=a,Aa|=a,s=4;break t}a=Tn,Tn=s,a!==null&&(Tn===null?Tn=a:Tn.push.apply(Tn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Br(e,0),Ls(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(J(345));case 4:if((t&4194048)!==t)break;case 6:Ls(i,t,On,!Ns);break t;case 2:Tn=null;break;case 3:case 5:break;default:throw Error(J(329))}if((t&62914560)===t&&(s=Hu+300-Pn(),10<s)){if(Ls(i,t,On,!Ns),Du(i,0,!0)!==0)break t;is=t,i.timeoutHandle=Gx(Vv.bind(null,i,n,Tn,yu,wp,t,On,Aa,Or,Ns,a,"Throttled",-0,0),s);break t}Vv(i,n,Tn,yu,wp,t,On,Aa,Or,Ns,a,null,-0,0)}}break}while(!0);Ci(e)}function Vv(e,t,n,i,s,a,r,o,l,c,d,f,u,p){if(e.timeoutHandle=-1,f=t.subtreeFlags,f&8192||(f&16785408)===16785408){f={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$i},mx(t,a,f);var v=(a&62914560)===a?Hu-Pn():(a&4194048)===a?yx-Pn():0;if(v=HT(f,v),v!==null){is=a,e.cancelPendingCommit=v(Gv.bind(null,e,t,a,n,i,s,r,o,l,d,f,null,u,p)),Ls(e,a,r,!c);return}}Gv(e,t,a,n,i,s,r,o,l)}function aT(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!Vn(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ls(e,t,n,i){t&=~Cm,t&=~Aa,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-Fn(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&A_(e,n,t)}function Gu(){return(te&6)===0?(bl(0,!1),!1):!0}function Rm(){if(Wt!==null){if(ae===0)var e=Wt.return;else e=Wt,ts=Pa=null,pm(e),Ar=null,al=0,e=Wt;for(;e!==null;)ex(e.alternate,e),e=e.return;Wt=null}}function Br(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,MT(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),is=0,Rm(),me=e,Wt=n=es(e.current,null),qt=t,ae=0,Nn=null,Ns=!1,Xr=ml(e,t),wm=!1,Or=On=Cm=Aa=Ys=Ne=0,Tn=jo=null,wp=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var s=31-Fn(i),a=1<<s;t|=e[s],i&=~a}return ls=t,Iu(),n}function Mx(e,t){Bt=null,Rt.H=ol,t===kr||t===Pu?(t=_v(),ae=3):t===om?(t=_v(),ae=4):ae=t===Mm?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Nn=t,Wt===null&&(Ne=1,mu(e,$n(t,e.current)))}function Tx(){var e=Hn.current;return e===null?!0:(qt&4194048)===qt?ei===null:(qt&62914560)===qt||(qt&536870912)!==0?e===ei:!1}function Ex(){var e=Rt.H;return Rt.H=ol,e===null?ol:e}function Ax(){var e=Rt.A;return Rt.A=iT,e}function xu(){Ne=4,Ns||(qt&4194048)!==qt&&Hn.current!==null||(Xr=!0),(Ys&134217727)===0&&(Aa&134217727)===0||me===null||Ls(me,qt,On,!1)}function Vf(e,t,n){var i=te;te|=2;var s=Ex(),a=Ax();(me!==e||qt!==t)&&(yu=null,Br(e,t)),t=!1;var r=Ne;t:do try{if(ae!==0&&Wt!==null){var o=Wt,l=Nn;switch(ae){case 8:Rm(),r=6;break t;case 3:case 2:case 9:case 6:Hn.current===null&&(t=!0);var c=ae;if(ae=0,Nn=null,Sr(e,o,l,c),n&&Xr){r=0;break t}break;default:c=ae,ae=0,Nn=null,Sr(e,o,l,c)}}rT(),r=Ne;break}catch(d){Mx(e,d)}while(!0);return t&&e.shellSuspendCounter++,ts=Pa=null,te=i,Rt.H=s,Rt.A=a,Wt===null&&(me=null,qt=0,Iu()),r}function rT(){for(;Wt!==null;)wx(Wt)}function oT(e,t){var n=te;te|=2;var i=Ex(),s=Ax();me!==e||qt!==t?(yu=null,_u=Pn()+500,Br(e,t)):Xr=ml(e,t);t:do try{if(ae!==0&&Wt!==null){t=Wt;var a=Nn;e:switch(ae){case 1:ae=0,Nn=null,Sr(e,t,a,1);break;case 2:case 9:if(vv(a)){ae=0,Nn=null,Hv(t);break}t=function(){ae!==2&&ae!==9||me!==e||(ae=7),Ci(e)},a.then(t,t);break t;case 3:ae=7;break t;case 4:ae=5;break t;case 7:vv(a)?(ae=0,Nn=null,Hv(t)):(ae=0,Nn=null,Sr(e,t,a,7));break;case 5:var r=null;switch(Wt.tag){case 26:r=Wt.memoizedState;case 5:case 27:var o=Wt;if(r?Yx(r):o.stateNode.complete){ae=0,Nn=null;var l=o.sibling;if(l!==null)Wt=l;else{var c=o.return;c!==null?(Wt=c,ku(c)):Wt=null}break e}}ae=0,Nn=null,Sr(e,t,a,5);break;case 6:ae=0,Nn=null,Sr(e,t,a,6);break;case 8:Rm(),Ne=6;break t;default:throw Error(J(462))}}lT();break}catch(d){Mx(e,d)}while(!0);return ts=Pa=null,Rt.H=i,Rt.A=s,te=n,Wt!==null?0:(me=null,qt=0,Iu(),Ne)}function lT(){for(;Wt!==null&&!UM();)wx(Wt)}function wx(e){var t=tx(e.alternate,e,ls);e.memoizedProps=e.pendingProps,t===null?ku(e):Wt=t}function Hv(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Iv(n,t,t.pendingProps,t.type,void 0,qt);break;case 11:t=Iv(n,t,t.pendingProps,t.type.render,t.ref,qt);break;case 5:pm(t);default:ex(n,t),t=Wt=ey(t,ls),t=tx(n,t,ls)}e.memoizedProps=e.pendingProps,t===null?ku(e):Wt=t}function Sr(e,t,n,i){ts=Pa=null,pm(t),Ar=null,al=0;var s=t.return;try{if(j1(e,s,t,n,qt)){Ne=1,mu(e,$n(n,e.current)),Wt=null;return}}catch(a){if(s!==null)throw Wt=s,a;Ne=1,mu(e,$n(n,e.current)),Wt=null;return}t.flags&32768?(Zt||i===1?e=!0:Xr||(qt&536870912)!==0?e=!1:(Ns=e=!0,(i===2||i===9||i===3||i===6)&&(i=Hn.current,i!==null&&i.tag===13&&(i.flags|=16384))),Cx(t,e)):ku(t)}function ku(e){var t=e;do{if((t.flags&32768)!==0){Cx(t,Ns);return}e=t.return;var n=$1(t.alternate,t,ls);if(n!==null){Wt=n;return}if(t=t.sibling,t!==null){Wt=t;return}Wt=t=e}while(t!==null);Ne===0&&(Ne=5)}function Cx(e,t){do{var n=tT(e.alternate,e);if(n!==null){n.flags&=32767,Wt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Wt=e;return}Wt=e=n}while(e!==null);Ne=6,Wt=null}function Gv(e,t,n,i,s,a,r,o,l){e.cancelPendingCommit=null;do Xu();while(We!==0);if((te&6)!==0)throw Error(J(327));if(t!==null){if(t===e.current)throw Error(J(177));if(a=t.lanes|t.childLanes,a|=tm,HM(e,n,a,r,o,l),e===me&&(Wt=me=null,qt=0),Pr=t,Vs=e,is=n,Cp=a,Rp=s,xx=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,dT(su,function(){return Lx(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Rt.T,Rt.T=null,s=ee.p,ee.p=2,r=te,te|=4;try{eT(e,t,n)}finally{te=r,ee.p=s,Rt.T=i}}We=1,Rx(),Dx(),Ux()}}function Rx(){if(We===1){We=0;var e=Vs,t=Pr,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=Rt.T,Rt.T=null;var i=ee.p;ee.p=2;var s=te;te|=4;try{dx(t,e);var a=Ip,r=Y_(e.containerInfo),o=a.focusedElem,l=a.selectionRange;if(r!==o&&o&&o.ownerDocument&&q_(o.ownerDocument.documentElement,o)){if(l!==null&&$p(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var f=o.ownerDocument||document,u=f&&f.defaultView||window;if(u.getSelection){var p=u.getSelection(),v=o.textContent.length,b=Math.min(l.start,v),g=l.end===void 0?b:Math.min(l.end,v);!p.extend&&b>g&&(r=g,g=b,b=r);var h=uv(o,b),m=uv(o,g);if(h&&m&&(p.rangeCount!==1||p.anchorNode!==h.node||p.anchorOffset!==h.offset||p.focusNode!==m.node||p.focusOffset!==m.offset)){var _=f.createRange();_.setStart(h.node,h.offset),p.removeAllRanges(),b>g?(p.addRange(_),p.extend(m.node,m.offset)):(_.setEnd(m.node,m.offset),p.addRange(_))}}}}for(f=[],p=o;p=p.parentNode;)p.nodeType===1&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<f.length;o++){var S=f[o];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}Cu=!!Lp,Ip=Lp=null}finally{te=s,ee.p=i,Rt.T=n}}e.current=t,We=2}}function Dx(){if(We===2){We=0;var e=Vs,t=Pr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Rt.T,Rt.T=null;var i=ee.p;ee.p=2;var s=te;te|=4;try{ox(e,t.alternate,t)}finally{te=s,ee.p=i,Rt.T=n}}We=3}}function Ux(){if(We===4||We===3){We=0,NM();var e=Vs,t=Pr,n=is,i=xx;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?We=5:(We=0,Pr=Vs=null,Nx(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(zs=null),qp(n),t=t.stateNode,Bn&&typeof Bn.onCommitFiberRoot=="function")try{Bn.onCommitFiberRoot(pl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Rt.T,s=ee.p,ee.p=2,Rt.T=null;try{for(var a=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];a(o.value,{componentStack:o.stack})}}finally{Rt.T=t,ee.p=s}}(is&3)!==0&&Xu(),Ci(e),s=e.pendingLanes,(n&261930)!==0&&(s&42)!==0?e===Dp?Ko++:(Ko=0,Dp=e):Ko=0,bl(0,!1)}}function Nx(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,yl(t)))}function Xu(){return Rx(),Dx(),Ux(),Lx()}function Lx(){if(We!==5)return!1;var e=Vs,t=Cp;Cp=0;var n=qp(is),i=Rt.T,s=ee.p;try{ee.p=32>n?32:n,Rt.T=null,n=Rp,Rp=null;var a=Vs,r=is;if(We=0,Pr=Vs=null,is=0,(te&6)!==0)throw Error(J(331));var o=te;if(te|=4,vx(a.current),px(a,a.current,r,n),te=o,bl(0,!1),Bn&&typeof Bn.onPostCommitFiberRoot=="function")try{Bn.onPostCommitFiberRoot(pl,a)}catch{}return!0}finally{ee.p=s,Rt.T=i,Nx(e,t)}}function kv(e,t,n){t=$n(n,t),t=Mp(e.stateNode,t,2),e=Fs(e,t,2),e!==null&&(gl(e,2),Ci(e))}function re(e,t,n){if(e.tag===3)kv(e,e,n);else for(;t!==null;){if(t.tag===3){kv(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(zs===null||!zs.has(i))){e=$n(n,e),n=Zy(2),i=Fs(t,n,2),i!==null&&(Jy(n,i,t,e),gl(i,2),Ci(i));break}}t=t.return}}function Hf(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new sT;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(wm=!0,s.add(n),e=cT.bind(null,e,t,n),t.then(e,e))}function cT(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,me===e&&(qt&n)===n&&(Ne===4||Ne===3&&(qt&62914560)===qt&&300>Pn()-Hu?(te&2)===0&&Br(e,0):Cm|=n,Or===qt&&(Or=0)),Ci(e)}function Ix(e,t){t===0&&(t=E_()),e=Oa(e,t),e!==null&&(gl(e,t),Ci(e))}function uT(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ix(e,n)}function hT(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(J(314))}i!==null&&i.delete(t),Ix(e,n)}function dT(e,t){return Xp(e,t)}var Su=null,cr=null,Up=!1,bu=!1,Gf=!1,Is=0;function Ci(e){e!==cr&&e.next===null&&(cr===null?Su=cr=e:cr=cr.next=e),bu=!0,Up||(Up=!0,pT())}function bl(e,t){if(!Gf&&bu){Gf=!0;do for(var n=!1,i=Su;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-Fn(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Xv(i,a))}else a=qt,a=Du(i,i===me?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||ml(i,a)||(n=!0,Xv(i,a));i=i.next}while(n);Gf=!1}}function fT(){Ox()}function Ox(){bu=Up=!1;var e=0;Is!==0&&bT()&&(e=Is);for(var t=Pn(),n=null,i=Su;i!==null;){var s=i.next,a=Px(i,t);a===0?(i.next=null,n===null?Su=s:n.next=s,s===null&&(cr=n)):(n=i,(e!==0||(a&3)!==0)&&(bu=!0)),i=s}We!==0&&We!==5||bl(e,!1),Is!==0&&(Is=0)}function Px(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-Fn(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=VM(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=me,n=qt,n=Du(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ae===2||ae===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&vf(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||ml(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&vf(i),qp(n)){case 2:case 8:n=M_;break;case 32:n=su;break;case 268435456:n=T_;break;default:n=su}return i=Bx.bind(null,e),n=Xp(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&vf(i),e.callbackPriority=2,e.callbackNode=null,2}function Bx(e,t){if(We!==0&&We!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Xu()&&e.callbackNode!==n)return null;var i=qt;return i=Du(e,e===me?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(bx(e,i,t),Px(e,Pn()),e.callbackNode!=null&&e.callbackNode===n?Bx.bind(null,e):null)}function Xv(e,t){if(Xu())return null;bx(e,t,!0)}function pT(){TT(function(){(te&6)!==0?Xp(b_,fT):Ox()})}function Dm(){if(Is===0){var e=Nr;e===0&&(e=Mc,Mc<<=1,(Mc&261888)===0&&(Mc=256)),Is=e}return Is}function Wv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Hc(""+e)}function qv(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function mT(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=Wv((s[An]||null).action),r=i.submitter;r&&(t=(t=r[An]||null)?Wv(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Uu("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Is!==0){var l=r?qv(s,r):new FormData(s);Sp(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=r?qv(s,r):new FormData(s),Sp(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Oc=0;Oc<cp.length;Oc++)Pc=cp[Oc],Yv=Pc.toLowerCase(),Zv=Pc[0].toUpperCase()+Pc.slice(1),fi(Yv,"on"+Zv);var Pc,Yv,Zv,Oc;fi(J_,"onAnimationEnd");fi(j_,"onAnimationIteration");fi(K_,"onAnimationStart");fi("dblclick","onDoubleClick");fi("focusin","onFocus");fi("focusout","onBlur");fi(L1,"onTransitionRun");fi(I1,"onTransitionStart");fi(O1,"onTransitionCancel");fi(Q_,"onTransitionEnd");Dr("onMouseEnter",["mouseout","mouseover"]);Dr("onMouseLeave",["mouseout","mouseover"]);Dr("onPointerEnter",["pointerout","pointerover"]);Dr("onPointerLeave",["pointerout","pointerover"]);Na("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Na("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Na("onBeforeInput",["compositionend","keypress","textInput","paste"]);Na("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Na("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Na("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ll="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gT=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ll));function Fx(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){ru(d)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(d){ru(d)}s.currentTarget=null,a=l}}}}function Xt(e,t){var n=t[ep];n===void 0&&(n=t[ep]=new Set);var i=e+"__bubble";n.has(i)||(zx(t,e,2,!1),n.add(i))}function kf(e,t,n){var i=0;t&&(i|=4),zx(n,e,i,t)}var Bc="_reactListening"+Math.random().toString(36).slice(2);function Um(e){if(!e[Bc]){e[Bc]=!0,D_.forEach(function(n){n!=="selectionchange"&&(gT.has(n)||kf(n,!1,e),kf(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bc]||(t[Bc]=!0,kf("selectionchange",!1,t))}}function zx(e,t,n,i){switch(Qx(t)){case 2:var s=XT;break;case 8:s=WT;break;default:s=Om}n=s.bind(null,t,n,e),s=void 0,!rp||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Xf(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=dr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}F_(function(){var c=a,d=Jp(n),f=[];t:{var u=$_.get(e);if(u!==void 0){var p=Uu,v=e;switch(e){case"keypress":if(kc(n)===0)break t;case"keydown":case"keyup":p=h1;break;case"focusin":v="focus",p=bf;break;case"focusout":v="blur",p=bf;break;case"beforeblur":case"afterblur":p=bf;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=ev;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=$M;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=p1;break;case J_:case j_:case K_:p=n1;break;case Q_:p=g1;break;case"scroll":case"scrollend":p=KM;break;case"wheel":p=_1;break;case"copy":case"cut":case"paste":p=s1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=iv;break;case"toggle":case"beforetoggle":p=x1}var b=(t&4)!==0,g=!b&&(e==="scroll"||e==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var m=c,_;m!==null;){var S=m;if(_=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||_===null||h===null||(S=tl(m,h),S!=null&&b.push(cl(m,S,_))),g)break;m=m.return}0<b.length&&(u=new p(u,v,null,n,d),f.push({event:u,listeners:b}))}}if((t&7)===0){t:{if(u=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",u&&n!==ap&&(v=n.relatedTarget||n.fromElement)&&(dr(v)||v[Vr]))break t;if((p||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?dr(v):null,v!==null&&(g=fl(v),b=v.tag,v!==g||b!==5&&b!==27&&b!==6)&&(v=null)):(p=null,v=c),p!==v)){if(b=ev,S="onMouseLeave",h="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(b=iv,S="onPointerLeave",h="onPointerEnter",m="pointer"),g=p==null?u:Bo(p),_=v==null?u:Bo(v),u=new b(S,m+"leave",p,n,d),u.target=g,u.relatedTarget=_,S=null,dr(d)===c&&(b=new b(h,m+"enter",v,n,d),b.target=_,b.relatedTarget=g,S=b),g=S,p&&v)e:{for(b=vT,h=p,m=v,_=0,S=h;S;S=b(S))_++;S=0;for(var E=m;E;E=b(E))S++;for(;0<_-S;)h=b(h),_--;for(;0<S-_;)m=b(m),S--;for(;_--;){if(h===m||m!==null&&h===m.alternate){b=h;break e}h=b(h),m=b(m)}b=null}else b=null;p!==null&&Jv(f,u,p,b,!1),v!==null&&g!==null&&Jv(f,g,v,b,!0)}}t:{if(u=c?Bo(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var A=ov;else if(rv(u))if(X_)A=D1;else{A=C1;var C=w1}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Zp(c.elementType)&&(A=ov):A=R1;if(A&&(A=A(e,c))){k_(f,A,n,d);break t}C&&C(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&sp(u,"number",u.value)}switch(C=c?Bo(c):window,e){case"focusin":(rv(C)||C.contentEditable==="true")&&(mr=C,op=c,Go=null);break;case"focusout":Go=op=mr=null;break;case"mousedown":lp=!0;break;case"contextmenu":case"mouseup":case"dragend":lp=!1,hv(f,n,d);break;case"selectionchange":if(N1)break;case"keydown":case"keyup":hv(f,n,d)}var y;if(Qp)t:{switch(e){case"compositionstart":var T="onCompositionStart";break t;case"compositionend":T="onCompositionEnd";break t;case"compositionupdate":T="onCompositionUpdate";break t}T=void 0}else pr?H_(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(V_&&n.locale!=="ko"&&(pr||T!=="onCompositionStart"?T==="onCompositionEnd"&&pr&&(y=z_()):(Us=d,jp="value"in Us?Us.value:Us.textContent,pr=!0)),C=Mu(c,T),0<C.length&&(T=new nv(T,e,null,n,d),f.push({event:T,listeners:C}),y?T.data=y:(y=G_(n),y!==null&&(T.data=y)))),(y=b1?M1(e,n):T1(e,n))&&(T=Mu(c,"onBeforeInput"),0<T.length&&(C=new nv("onBeforeInput","beforeinput",null,n,d),f.push({event:C,listeners:T}),C.data=y)),mT(f,e,c,n,d)}Fx(f,t)})}function cl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Mu(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=tl(e,n),s!=null&&i.unshift(cl(e,s,a)),s=tl(e,t),s!=null&&i.push(cl(e,s,a))),e.tag===3)return i;e=e.return}return[]}function vT(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Jv(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=tl(n,a),c!=null&&r.unshift(cl(n,c,l))):s||(c=tl(n,a),c!=null&&r.push(cl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var _T=/\r\n?/g,yT=/\u0000|\uFFFD/g;function jv(e){return(typeof e=="string"?e:""+e).replace(_T,`
`).replace(yT,"")}function Vx(e,t){return t=jv(t),jv(e)===t}function ue(e,t,n,i,s,a){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Ur(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Ur(e,""+i);break;case"className":Ac(e,"class",i);break;case"tabIndex":Ac(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ac(e,n,i);break;case"style":B_(e,i,a);break;case"data":if(t!=="object"){Ac(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Hc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&ue(e,t,"name",s.name,s,null),ue(e,t,"formEncType",s.formEncType,s,null),ue(e,t,"formMethod",s.formMethod,s,null),ue(e,t,"formTarget",s.formTarget,s,null)):(ue(e,t,"encType",s.encType,s,null),ue(e,t,"method",s.method,s,null),ue(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Hc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=$i);break;case"onScroll":i!=null&&Xt("scroll",e);break;case"onScrollEnd":i!=null&&Xt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(J(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Hc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Xt("beforetoggle",e),Xt("toggle",e),Vc(e,"popover",i);break;case"xlinkActuate":Wi(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Wi(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Wi(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Wi(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Wi(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Wi(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Vc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=JM.get(n)||n,Vc(e,n,i))}}function Np(e,t,n,i,s,a){switch(n){case"style":B_(e,i,a);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(J(60));e.innerHTML=n}}break;case"children":typeof i=="string"?Ur(e,i):(typeof i=="number"||typeof i=="bigint")&&Ur(e,""+i);break;case"onScroll":i!=null&&Xt("scroll",e);break;case"onScrollEnd":i!=null&&Xt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$i);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!U_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),t=n.slice(2,s?n.length-7:void 0),a=e[An]||null,a=a!=null?a[n]:null,typeof a=="function"&&e.removeEventListener(t,a,s),typeof i=="function")){typeof a!="function"&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,s);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Vc(e,n,i)}}}function on(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xt("error",e),Xt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:ue(e,t,a,r,n,null)}}s&&ue(e,t,"srcSet",n.srcSet,n,null),i&&ue(e,t,"src",n.src,n,null);return;case"input":Xt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":s=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":a=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(J(137,t));break;default:ue(e,t,i,d,n,null)}}I_(e,a,o,l,c,r,s,!1);return;case"select":Xt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ue(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?Mr(e,!!i,t,!1):n!=null&&Mr(e,!!i,n,!0);return;case"textarea":Xt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(J(91));break;default:ue(e,t,r,o,n,null)}P_(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":ue(e,t,l,i,n,null));return;case"dialog":Xt("beforetoggle",e),Xt("toggle",e),Xt("cancel",e),Xt("close",e);break;case"iframe":case"object":Xt("load",e);break;case"video":case"audio":for(i=0;i<ll.length;i++)Xt(ll[i],e);break;case"image":Xt("error",e),Xt("load",e);break;case"details":Xt("toggle",e);break;case"embed":case"source":case"link":Xt("error",e),Xt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:ue(e,t,c,i,n,null)}return;default:if(Zp(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Np(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ue(e,t,o,i,n,null))}function xT(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,d=null;for(p in n){var f=n[p];if(n.hasOwnProperty(p)&&f!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=f;default:i.hasOwnProperty(p)||ue(e,t,p,null,i,f)}}for(var u in i){var p=i[u];if(f=n[u],i.hasOwnProperty(u)&&(p!=null||f!=null))switch(u){case"type":a=p;break;case"name":s=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(J(137,t));break;default:p!==f&&ue(e,t,u,p,i,f)}}ip(e,r,o,l,c,d,a,s);return;case"select":p=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(a)||ue(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":u=a;break;case"defaultValue":o=a;break;case"multiple":r=a;default:a!==l&&ue(e,t,s,a,i,l)}t=o,n=r,i=p,u!=null?Mr(e,!!n,u,!1):!!i!=!!n&&(t!=null?Mr(e,!!n,t,!0):Mr(e,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ue(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":u=s;break;case"defaultValue":p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(J(91));break;default:s!==a&&ue(e,t,r,s,i,a)}O_(e,u,p);return;case"option":for(var v in n)u=n[v],n.hasOwnProperty(v)&&u!=null&&!i.hasOwnProperty(v)&&(v==="selected"?e.selected=!1:ue(e,t,v,null,i,u));for(l in i)u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null)&&(l==="selected"?e.selected=u&&typeof u!="function"&&typeof u!="symbol":ue(e,t,l,u,i,p));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&ue(e,t,b,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(J(137,t));break;default:ue(e,t,c,u,i,p)}return;default:if(Zp(t)){for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!==void 0&&!i.hasOwnProperty(g)&&Np(e,t,g,void 0,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u===void 0&&p===void 0||Np(e,t,d,u,i,p);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&ue(e,t,h,null,i,u);for(f in i)u=i[f],p=n[f],!i.hasOwnProperty(f)||u===p||u==null&&p==null||ue(e,t,f,u,i,p)}function Kv(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ST(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&Kv(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,f=l.initiatorType;d&&Kv(f)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Lp=null,Ip=null;function Tu(e){return e.nodeType===9?e:e.ownerDocument}function Qv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Hx(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Op(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wf=null;function bT(){var e=window.event;return e&&e.type==="popstate"?e===Wf?!1:(Wf=e,!0):(Wf=null,!1)}var Gx=typeof setTimeout=="function"?setTimeout:void 0,MT=typeof clearTimeout=="function"?clearTimeout:void 0,$v=typeof Promise=="function"?Promise:void 0,TT=typeof queueMicrotask=="function"?queueMicrotask:typeof $v<"u"?function(e){return $v.resolve(null).then(e).catch(ET)}:Gx;function ET(e){setTimeout(function(){throw e})}function Js(e){return e==="head"}function t_(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),zr(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Qo(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Qo(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[vl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Qo(e.ownerDocument.body);n=s}while(n);zr(t)}function e_(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function Pp(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Pp(n),Yp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function AT(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[vl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=ni(e.nextSibling),e===null)break}return null}function wT(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ni(e.nextSibling),e===null))return null;return e}function kx(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ni(e.nextSibling),e===null))return null;return e}function Bp(e){return e.data==="$?"||e.data==="$~"}function Fp(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function CT(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function ni(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var zp=null;function n_(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return ni(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function i_(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Xx(e,t,n){switch(t=Tu(n),e){case"html":if(e=t.documentElement,!e)throw Error(J(452));return e;case"head":if(e=t.head,!e)throw Error(J(453));return e;case"body":if(e=t.body,!e)throw Error(J(454));return e;default:throw Error(J(451))}}function Qo(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Yp(e)}var ii=new Map,s_=new Set;function Eu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var cs=ee.d;ee.d={f:RT,r:DT,D:UT,C:NT,L:LT,m:IT,X:PT,S:OT,M:BT};function RT(){var e=cs.f(),t=Gu();return e||t}function DT(e){var t=Hr(e);t!==null&&t.tag===5&&t.type==="form"?By(t):cs.r(e)}var Wr=typeof document>"u"?null:document;function Wx(e,t,n){var i=Wr;if(i&&typeof t=="string"&&t){var s=Qn(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),s_.has(s)||(s_.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),on(t,"link",e),Ke(t),i.head.appendChild(t)))}}function UT(e){cs.D(e),Wx("dns-prefetch",e,null)}function NT(e,t){cs.C(e,t),Wx("preconnect",e,t)}function LT(e,t,n){cs.L(e,t,n);var i=Wr;if(i&&e&&t){var s='link[rel="preload"][as="'+Qn(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+Qn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+Qn(n.imageSizes)+'"]')):s+='[href="'+Qn(e)+'"]';var a=s;switch(t){case"style":a=Fr(e);break;case"script":a=qr(e)}ii.has(a)||(e=Me({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),ii.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Ml(a))||t==="script"&&i.querySelector(Tl(a))||(t=i.createElement("link"),on(t,"link",e),Ke(t),i.head.appendChild(t)))}}function IT(e,t){cs.m(e,t);var n=Wr;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Qn(i)+'"][href="'+Qn(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=qr(e)}if(!ii.has(a)&&(e=Me({rel:"modulepreload",href:e},t),ii.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Tl(a)))return}i=n.createElement("link"),on(i,"link",e),Ke(i),n.head.appendChild(i)}}}function OT(e,t,n){cs.S(e,t,n);var i=Wr;if(i&&e){var s=br(i).hoistableStyles,a=Fr(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ml(a)))o.loading=5;else{e=Me({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ii.get(a))&&Nm(e,n);var l=r=i.createElement("link");Ke(l),on(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Kc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function PT(e,t){cs.X(e,t);var n=Wr;if(n&&e){var i=br(n).hoistableScripts,s=qr(e),a=i.get(s);a||(a=n.querySelector(Tl(s)),a||(e=Me({src:e,async:!0},t),(t=ii.get(s))&&Lm(e,t),a=n.createElement("script"),Ke(a),on(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function BT(e,t){cs.M(e,t);var n=Wr;if(n&&e){var i=br(n).hoistableScripts,s=qr(e),a=i.get(s);a||(a=n.querySelector(Tl(s)),a||(e=Me({src:e,async:!0,type:"module"},t),(t=ii.get(s))&&Lm(e,t),a=n.createElement("script"),Ke(a),on(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function a_(e,t,n,i){var s=(s=Os.current)?Eu(s):null;if(!s)throw Error(J(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Fr(n.href),n=br(s).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Fr(n.href);var a=br(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Ml(e)))&&!a._p&&(r.instance=a,r.state.loading=5),ii.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ii.set(e,n),a||FT(s,e,n,r.state))),t&&i===null)throw Error(J(528,""));return r}if(t&&i!==null)throw Error(J(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=qr(n),n=br(s).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(J(444,e))}}function Fr(e){return'href="'+Qn(e)+'"'}function Ml(e){return'link[rel="stylesheet"]['+e+"]"}function qx(e){return Me({},e,{"data-precedence":e.precedence,precedence:null})}function FT(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),on(t,"link",n),Ke(t),e.head.appendChild(t))}function qr(e){return'[src="'+Qn(e)+'"]'}function Tl(e){return"script[async]"+e}function r_(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Qn(n.href)+'"]');if(i)return t.instance=i,Ke(i),i;var s=Me({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Ke(i),on(i,"style",s),Kc(i,n.precedence,e),t.instance=i;case"stylesheet":s=Fr(n.href);var a=e.querySelector(Ml(s));if(a)return t.state.loading|=4,t.instance=a,Ke(a),a;i=qx(n),(s=ii.get(s))&&Nm(i,s),a=(e.ownerDocument||e).createElement("link"),Ke(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(a,"link",i),t.state.loading|=4,Kc(a,n.precedence,e),t.instance=a;case"script":return a=qr(n.src),(s=e.querySelector(Tl(a)))?(t.instance=s,Ke(s),s):(i=n,(s=ii.get(a))&&(i=Me({},n),Lm(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),Ke(s),on(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(J(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Kc(i,n.precedence,e));return t.instance}function Kc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Nm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Lm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Qc=null;function o_(e,t,n){if(Qc===null){var i=new Map,s=Qc=new Map;s.set(n,i)}else s=Qc,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[vl]||a[sn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function l_(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function zT(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Yx(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function VT(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Fr(i.href),a=t.querySelector(Ml(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Au.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ke(a);return}a=t.ownerDocument||t,i=qx(i),(s=ii.get(s))&&Nm(i,s),a=a.createElement("link"),Ke(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),on(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Au.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var qf=0;function HT(e,t){return e.stylesheets&&e.count===0&&$c(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&$c(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&qf===0&&(qf=62500*ST());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&$c(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>qf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function Au(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$c(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var wu=null;function $c(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,wu=new Map,t.forEach(GT,e),wu=null,Au.call(e))}function GT(e,t){if(!(t.state.loading&4)){var n=wu.get(e);if(n)var i=n.get(null);else{n=new Map,wu.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=Au.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var ul={$$typeof:Qi,Provider:null,Consumer:null,_currentValue:ba,_currentValue2:ba,_threadCount:0};function kT(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=_f(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_f(0),this.hiddenUpdates=_f(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function Zx(e,t,n,i,s,a,r,o,l,c,d,f){return e=new kT(e,t,n,r,l,c,d,f,o),t=1,a===!0&&(t|=24),a=In(3,null,null,t),e.current=a,a.stateNode=e,t=am(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},lm(a),e}function Jx(e){return e?(e=_r,e):_r}function jx(e,t,n,i,s,a){s=Jx(s),i.context===null?i.context=s:i.pendingContext=s,i=Bs(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=Fs(e,i,t),n!==null&&(En(n,e,t),Xo(n,e,t))}function c_(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Im(e,t){c_(e,t),(e=e.alternate)&&c_(e,t)}function Kx(e){if(e.tag===13||e.tag===31){var t=Oa(e,67108864);t!==null&&En(t,e,67108864),Im(e,67108864)}}function u_(e){if(e.tag===13||e.tag===31){var t=zn();t=Wp(t);var n=Oa(e,t);n!==null&&En(n,e,t),Im(e,t)}}var Cu=!0;function XT(e,t,n,i){var s=Rt.T;Rt.T=null;var a=ee.p;try{ee.p=2,Om(e,t,n,i)}finally{ee.p=a,Rt.T=s}}function WT(e,t,n,i){var s=Rt.T;Rt.T=null;var a=ee.p;try{ee.p=8,Om(e,t,n,i)}finally{ee.p=a,Rt.T=s}}function Om(e,t,n,i){if(Cu){var s=Vp(i);if(s===null)Xf(e,t,i,Ru,n),h_(e,i);else if(YT(s,e,t,n,i))i.stopPropagation();else if(h_(e,i),t&4&&-1<qT.indexOf(e)){for(;s!==null;){var a=Hr(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=ya(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Fn(r);o.entanglements[1]|=l,r&=~l}Ci(a),(te&6)===0&&(_u=Pn()+500,bl(0,!1))}}break;case 31:case 13:o=Oa(a,2),o!==null&&En(o,a,2),Gu(),Im(a,2)}if(a=Vp(i),a===null&&Xf(e,t,i,Ru,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else Xf(e,t,i,null,n)}}function Vp(e){return e=Jp(e),Pm(e)}var Ru=null;function Pm(e){if(Ru=null,e=dr(e),e!==null){var t=fl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=v_(t),e!==null)return e;e=null}else if(n===31){if(e=__(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ru=e,null}function Qx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(LM()){case b_:return 2;case M_:return 8;case su:case IM:return 32;case T_:return 268435456;default:return 32}default:return 32}}var Hp=!1,Hs=null,Gs=null,ks=null,hl=new Map,dl=new Map,Rs=[],qT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function h_(e,t){switch(e){case"focusin":case"focusout":Hs=null;break;case"dragenter":case"dragleave":Gs=null;break;case"mouseover":case"mouseout":ks=null;break;case"pointerover":case"pointerout":hl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":dl.delete(t.pointerId)}}function Lo(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Hr(t),t!==null&&Kx(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function YT(e,t,n,i,s){switch(t){case"focusin":return Hs=Lo(Hs,e,t,n,i,s),!0;case"dragenter":return Gs=Lo(Gs,e,t,n,i,s),!0;case"mouseover":return ks=Lo(ks,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return hl.set(a,Lo(hl.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,dl.set(a,Lo(dl.get(a)||null,e,t,n,i,s)),!0}return!1}function $x(e){var t=dr(e.target);if(t!==null){var n=fl(t);if(n!==null){if(t=n.tag,t===13){if(t=v_(n),t!==null){e.blockedOn=t,Z0(e.priority,function(){u_(n)});return}}else if(t===31){if(t=__(n),t!==null){e.blockedOn=t,Z0(e.priority,function(){u_(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function tu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Vp(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);ap=i,n.target.dispatchEvent(i),ap=null}else return t=Hr(n),t!==null&&Kx(t),e.blockedOn=n,!1;t.shift()}return!0}function d_(e,t,n){tu(e)&&n.delete(t)}function ZT(){Hp=!1,Hs!==null&&tu(Hs)&&(Hs=null),Gs!==null&&tu(Gs)&&(Gs=null),ks!==null&&tu(ks)&&(ks=null),hl.forEach(d_),dl.forEach(d_)}function Fc(e,t){e.blockedOn===t&&(e.blockedOn=null,Hp||(Hp=!0,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,ZT)))}var zc=null;function f_(e){zc!==e&&(zc=e,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,function(){zc===e&&(zc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Pm(i||n)===null)continue;break}var a=Hr(n);a!==null&&(e.splice(t,3),t-=3,Sp(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function zr(e){function t(l){return Fc(l,e)}Hs!==null&&Fc(Hs,e),Gs!==null&&Fc(Gs,e),ks!==null&&Fc(ks,e),hl.forEach(t),dl.forEach(t);for(var n=0;n<Rs.length;n++){var i=Rs[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Rs.length&&(n=Rs[0],n.blockedOn===null);)$x(n),n.blockedOn===null&&Rs.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[An]||null;if(typeof a=="function")r||f_(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[An]||null)o=r.formAction;else if(Pm(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),f_(n)}}}function tS(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function Bm(e){this._internalRoot=e}Wu.prototype.render=Bm.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));var n=t.current,i=zn();jx(n,i,e,t,null,null)};Wu.prototype.unmount=Bm.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;jx(e.current,2,null,e,null,null),Gu(),t[Vr]=null}};function Wu(e){this._internalRoot=e}Wu.prototype.unstable_scheduleHydration=function(e){if(e){var t=R_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rs.length&&t!==0&&t<Rs[n].priority;n++);Rs.splice(n,0,e),n===0&&$x(e)}};var p_=m_.version;if(p_!=="19.2.4")throw Error(J(527,p_,"19.2.4"));ee.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=AM(t),e=e!==null?y_(e):null,e=e===null?null:e.stateNode,e};var JT={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Rt,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Io=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Io.isDisabled&&Io.supportsFiber))try{pl=Io.inject(JT),Bn=Io}catch{}var Io;qu.createRoot=function(e,t){if(!g_(e))throw Error(J(299));var n=!1,i="",s=Wy,a=qy,r=Yy;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Zx(e,1,!1,null,null,n,i,null,s,a,r,tS),e[Vr]=t.current,Um(e),new Bm(t)};qu.hydrateRoot=function(e,t,n){if(!g_(e))throw Error(J(299));var i=!1,s="",a=Wy,r=qy,o=Yy,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Zx(e,1,!0,t,n??null,i,s,l,a,r,o,tS),t.context=Jx(null),n=t.current,i=zn(),i=Wp(i),s=Bs(i),s.callback=null,Fs(n,s,i),n=i,t.current.lanes=n,gl(t,n),Ci(t),e[Vr]=t.current,Um(e),new Wu(t)};qu.version="19.2.4"});var sS=Si((N2,iS)=>{"use strict";function nS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nS)}catch(e){console.error(e)}}nS(),iS.exports=eS()});var Gb=Si(Zd=>{"use strict";var y2=Symbol.for("react.transitional.element"),x2=Symbol.for("react.fragment");function Hb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:y2,type:e,key:i,ref:t!==void 0?t:null,props:n}}Zd.Fragment=x2;Zd.jsx=Hb;Zd.jsxs=Hb});var n0=Si((fN,kb)=>{"use strict";kb.exports=Gb()});var Jd=mc(vc()),Xb=mc(sS());var wS=0,vg=1,CS=2;var ec=1,RS=2,go=3,ai=0,un=1,Bi=2,Fi=0,Ga=1,_g=2,yg=3,xg=4,DS=5;var ia=100,US=101,NS=102,LS=103,IS=104,OS=200,PS=201,BS=202,FS=203,gh=204,vh=205,zS=206,VS=207,HS=208,GS=209,kS=210,XS=211,WS=212,qS=213,YS=214,_h=0,yh=1,xh=2,ka=3,Sh=4,bh=5,Mh=6,Th=7,Jh=0,ZS=1,JS=2,_i=0,Sg=1,bg=2,Mg=3,nc=4,Tg=5,Eg=6,Ag=7;var wg=300,ha=301,Ya=302,jh=303,Kh=304,ic=306,Eh=1e3,Ui=1001,Ah=1002,Be=1003,jS=1004;var sc=1005;var cn=1006,Qh=1007;var da=1008;var Dn=1009,Cg=1010,Rg=1011,vo=1012,$h=1013,yi=1014,li=1015,zi=1016,td=1017,ed=1018,_o=1020,Dg=35902,Ug=35899,Ng=1021,Lg=1022,ci=1023,Ni=1026,fa=1027,nd=1028,id=1029,Za=1030,sd=1031;var ad=1033,ac=33776,rc=33777,oc=33778,lc=33779,rd=35840,od=35841,ld=35842,cd=35843,ud=36196,hd=37492,dd=37496,fd=37488,pd=37489,md=37490,gd=37491,vd=37808,_d=37809,yd=37810,xd=37811,Sd=37812,bd=37813,Md=37814,Td=37815,Ed=37816,Ad=37817,wd=37818,Cd=37819,Rd=37820,Dd=37821,Ud=36492,Nd=36494,Ld=36495,Id=36283,Od=36284,Pd=36285,Bd=36286;var Nl=2300,wh=2301,ph=2302,lg=2303,cg=2400,ug=2401,hg=2402;var KS=3200;var Fd=0,QS=1,ys="",mn="srgb",Xa="srgb-linear",Ll="linear",ie="srgb";var Ha=7680;var dg=519,$S=512,tb=513,eb=514,zd=515,nb=516,ib=517,Vd=518,sb=519,fg=35044;var Ig="300 es",vi=2e3,lo=2001;function jT(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function KT(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function co(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function ab(){let e=co("canvas");return e.style.display="block",e}var aS={},uo=null;function Og(...e){let t="THREE."+e.shift();uo?uo("log",t,...e):console.log(t,...e)}function rb(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=rb(e);let t="THREE."+e.shift();if(uo)uo("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Dt(...e){e=rb(e);let t="THREE."+e.shift();if(uo)uo("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Il(...e){let t=e.join(" ");t in aS||(aS[t]=!0,Ut(...e))}function ob(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var lb={[_h]:yh,[xh]:Mh,[Sh]:Th,[ka]:bh,[yh]:_h,[Mh]:xh,[Th]:Sh,[bh]:ka},vs=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Fm=Math.PI/180,Ch=180/Math.PI;function cc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(fn[e&255]+fn[e>>8&255]+fn[e>>16&255]+fn[e>>24&255]+"-"+fn[t&255]+fn[t>>8&255]+"-"+fn[t>>16&15|64]+fn[t>>24&255]+"-"+fn[n&63|128]+fn[n>>8&255]+"-"+fn[n>>16&255]+fn[n>>24&255]+fn[i&255]+fn[i>>8&255]+fn[i>>16&255]+fn[i>>24&255]).toLowerCase()}function Jt(e,t,n){return Math.max(t,Math.min(n,e))}function QT(e,t){return(e%t+t)%t}function zm(e,t,n){return(1-n)*e+n*t}function El(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Cn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var jt=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Li=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],d=i[s+2],f=i[s+3],u=a[r+0],p=a[r+1],v=a[r+2],b=a[r+3];if(f!==b||l!==u||c!==p||d!==v){let g=l*u+c*p+d*v+f*b;g<0&&(u=-u,p=-p,v=-v,b=-b,g=-g);let h=1-o;if(g<.9995){let m=Math.acos(g),_=Math.sin(m);h=Math.sin(h*m)/_,o=Math.sin(o*m)/_,l=l*h+u*o,c=c*h+p*o,d=d*h+v*o,f=f*h+b*o}else{l=l*h+u*o,c=c*h+p*o,d=d*h+v*o,f=f*h+b*o;let m=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=m,c*=m,d*=m,f*=m}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=f}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],f=a[r],u=a[r+1],p=a[r+2],v=a[r+3];return t[n]=o*v+d*f+l*p-c*u,t[n+1]=l*v+d*u+c*f-o*p,t[n+2]=c*v+d*p+o*u-l*f,t[n+3]=d*v-o*f-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),f=o(a/2),u=l(i/2),p=l(s/2),v=l(a/2);switch(r){case"XYZ":this._x=u*d*f+c*p*v,this._y=c*p*f-u*d*v,this._z=c*d*v+u*p*f,this._w=c*d*f-u*p*v;break;case"YXZ":this._x=u*d*f+c*p*v,this._y=c*p*f-u*d*v,this._z=c*d*v-u*p*f,this._w=c*d*f+u*p*v;break;case"ZXY":this._x=u*d*f-c*p*v,this._y=c*p*f+u*d*v,this._z=c*d*v+u*p*f,this._w=c*d*f-u*p*v;break;case"ZYX":this._x=u*d*f-c*p*v,this._y=c*p*f+u*d*v,this._z=c*d*v-u*p*f,this._w=c*d*f+u*p*v;break;case"YZX":this._x=u*d*f+c*p*v,this._y=c*p*f+u*d*v,this._z=c*d*v-u*p*f,this._w=c*d*f-u*p*v;break;case"XZY":this._x=u*d*f-c*p*v,this._y=c*p*f-u*d*v,this._z=c*d*v+u*p*f,this._w=c*d*f+u*p*v;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],f=n[10],u=i+o+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>f){let p=2*Math.sqrt(1+i-o-f);this._w=(d-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>f){let p=2*Math.sqrt(1+o-i-f);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+d)/p}else{let p=2*Math.sqrt(1+f-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+s*c-a*l,this._y=s*d+r*l+a*o-i*c,this._z=a*d+r*c+i*l-s*o,this._w=r*d-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(rS.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(rS.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),d=2*(o*n-a*s),f=2*(a*i-r*n);return this.x=n+l*c+r*f-o*d,this.y=i+l*d+o*c-a*f,this.z=s+l*f+a*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Vm.copy(this).projectOnVector(t),this.sub(Vm)}reflect(t){return this.sub(Vm.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vm=new V,rS=new Li,Ft=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=n,d[4]=a,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],v=i[8],b=s[0],g=s[3],h=s[6],m=s[1],_=s[4],S=s[7],E=s[2],A=s[5],C=s[8];return a[0]=r*b+o*m+l*E,a[3]=r*g+o*_+l*A,a[6]=r*h+o*S+l*C,a[1]=c*b+d*m+f*E,a[4]=c*g+d*_+f*A,a[7]=c*h+d*S+f*C,a[2]=u*b+p*m+v*E,a[5]=u*g+p*_+v*A,a[8]=u*h+p*S+v*C,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*r*d-n*o*c-i*a*d+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],f=d*r-o*c,u=o*l-d*a,p=c*a-r*l,v=n*f+i*u+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return t[0]=f*b,t[1]=(s*c-d*i)*b,t[2]=(o*i-s*r)*b,t[3]=u*b,t[4]=(d*n-s*l)*b,t[5]=(s*a-o*n)*b,t[6]=p*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*a)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Hm.makeScale(t,n)),this}rotate(t){return this.premultiply(Hm.makeRotation(-t)),this}translate(t,n){return this.premultiply(Hm.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Hm=new Ft,oS=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lS=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $T(){let e={enabled:!0,workingColorSpace:Xa,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===ie&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ie&&(s.r=oo(s.r),s.g=oo(s.g),s.b=oo(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ys?Ll:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Il("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Il("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Xa]:{primaries:t,whitePoint:i,transfer:Ll,toXYZ:oS,fromXYZ:lS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:t,whitePoint:i,transfer:ie,toXYZ:oS,fromXYZ:lS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),e}var Kt=$T();function gs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function oo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Yr,Rh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Yr===void 0&&(Yr=co("canvas")),Yr.width=t.width,Yr.height=t.height;let s=Yr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Yr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=co("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=gs(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(gs(n[i]/255)*255):n[i]=gs(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},tE=0,ho=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tE++}),this.uuid=cc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Gm(s[r].image)):a.push(Gm(s[r]))}else a=Gm(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function Gm(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Rh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}var eE=0,km=new V,Xe=class e extends vs{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ui,s=Ui,a=cn,r=da,o=ci,l=Dn,c=e.DEFAULT_ANISOTROPY,d=ys){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eE++}),this.uuid=cc(),this.name="",this.source=new ho(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(km).x}get height(){return this.source.getSize(km).y}get depth(){return this.source.getSize(km).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Eh:t.x=t.x-Math.floor(t.x);break;case Ui:t.x=t.x<0?0:1;break;case Ah:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Eh:t.y=t.y-Math.floor(t.y);break;case Ui:t.y=t.y<0?0:1;break;case Ah:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=wg;Xe.DEFAULT_ANISOTROPY=1;var Re=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],d=l[4],f=l[8],u=l[1],p=l[5],v=l[9],b=l[2],g=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(f-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,S=(p+1)/2,E=(h+1)/2,A=(d+u)/4,C=(f+b)/4,y=(v+g)/4;return _>S&&_>E?_<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(_),s=A/i,a=C/i):S>E?S<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(S),i=A/s,a=y/s):E<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(E),i=C/a,s=y/a),this.set(i,s,a,n),this}let m=Math.sqrt((g-v)*(g-v)+(f-b)*(f-b)+(u-d)*(u-d));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(f-b)/m,this.z=(u-d)/m,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this.w=Jt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this.w=Jt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Dh=class extends vs{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Re(0,0,t,n),this.scissorTest=!1,this.viewport=new Re(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Xe(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new ho(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xn=class extends Dh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Ol=class extends Xe{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Uh=class extends Xe{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ee=class e{constructor(t,n,i,s,a,r,o,l,c,d,f,u,p,v,b,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,d,f,u,p,v,b,g)}set(t,n,i,s,a,r,o,l,c,d,f,u,p,v,b,g){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=f,h[14]=u,h[3]=p,h[7]=v,h[11]=b,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();let n=this.elements,i=t.elements,s=1/Zr.setFromMatrixColumn(t,0).length(),a=1/Zr.setFromMatrixColumn(t,1).length(),r=1/Zr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(a),f=Math.sin(a);if(t.order==="XYZ"){let u=r*d,p=r*f,v=o*d,b=o*f;n[0]=l*d,n[4]=-l*f,n[8]=c,n[1]=p+v*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=v+p*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*d,p=l*f,v=c*d,b=c*f;n[0]=u+b*o,n[4]=v*o-p,n[8]=r*c,n[1]=r*f,n[5]=r*d,n[9]=-o,n[2]=p*o-v,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*d,p=l*f,v=c*d,b=c*f;n[0]=u-b*o,n[4]=-r*f,n[8]=v+p*o,n[1]=p+v*o,n[5]=r*d,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*d,p=r*f,v=o*d,b=o*f;n[0]=l*d,n[4]=v*c-p,n[8]=u*c+b,n[1]=l*f,n[5]=b*c+u,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,p=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=b-u*f,n[8]=v*f+p,n[1]=f,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*f+v,n[10]=u-b*f}else if(t.order==="XZY"){let u=r*l,p=r*c,v=o*l,b=o*c;n[0]=l*d,n[4]=-f,n[8]=c*d,n[1]=u*f+b,n[5]=r*d,n[9]=p*f-v,n[2]=v*f-p,n[6]=o*d,n[10]=b*f+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(nE,t,iE)}lookAt(t,n,i){let s=this.elements;return Gn.subVectors(t,n),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),js.crossVectors(i,Gn),js.lengthSq()===0&&(Math.abs(i.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),js.crossVectors(i,Gn)),js.normalize(),Yu.crossVectors(Gn,js),s[0]=js.x,s[4]=Yu.x,s[8]=Gn.x,s[1]=js.y,s[5]=Yu.y,s[9]=Gn.y,s[2]=js.z,s[6]=Yu.z,s[10]=Gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],v=i[2],b=i[6],g=i[10],h=i[14],m=i[3],_=i[7],S=i[11],E=i[15],A=s[0],C=s[4],y=s[8],T=s[12],I=s[1],R=s[5],O=s[9],P=s[13],H=s[2],k=s[6],B=s[10],z=s[14],et=s[3],Q=s[7],lt=s[11],pt=s[15];return a[0]=r*A+o*I+l*H+c*et,a[4]=r*C+o*R+l*k+c*Q,a[8]=r*y+o*O+l*B+c*lt,a[12]=r*T+o*P+l*z+c*pt,a[1]=d*A+f*I+u*H+p*et,a[5]=d*C+f*R+u*k+p*Q,a[9]=d*y+f*O+u*B+p*lt,a[13]=d*T+f*P+u*z+p*pt,a[2]=v*A+b*I+g*H+h*et,a[6]=v*C+b*R+g*k+h*Q,a[10]=v*y+b*O+g*B+h*lt,a[14]=v*T+b*P+g*z+h*pt,a[3]=m*A+_*I+S*H+E*et,a[7]=m*C+_*R+S*k+E*Q,a[11]=m*y+_*O+S*B+E*lt,a[15]=m*T+_*P+S*z+E*pt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],f=t[6],u=t[10],p=t[14],v=t[3],b=t[7],g=t[11],h=t[15],m=l*p-c*u,_=o*p-c*f,S=o*u-l*f,E=r*p-c*d,A=r*u-l*d,C=r*f-o*d;return n*(b*m-g*_+h*S)-i*(v*m-g*E+h*A)+s*(v*_-b*E+h*C)-a*(v*S-b*A+g*C)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],f=t[9],u=t[10],p=t[11],v=t[12],b=t[13],g=t[14],h=t[15],m=n*o-i*r,_=n*l-s*r,S=n*c-a*r,E=i*l-s*o,A=i*c-a*o,C=s*c-a*l,y=d*b-f*v,T=d*g-u*v,I=d*h-p*v,R=f*g-u*b,O=f*h-p*b,P=u*h-p*g,H=m*P-_*O+S*R+E*I-A*T+C*y;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/H;return t[0]=(o*P-l*O+c*R)*k,t[1]=(s*O-i*P-a*R)*k,t[2]=(b*C-g*A+h*E)*k,t[3]=(u*A-f*C-p*E)*k,t[4]=(l*I-r*P-c*T)*k,t[5]=(n*P-s*I+a*T)*k,t[6]=(g*S-v*C-h*_)*k,t[7]=(d*C-u*S+p*_)*k,t[8]=(r*O-o*I+c*y)*k,t[9]=(i*I-n*O-a*y)*k,t[10]=(v*A-b*S+h*m)*k,t[11]=(f*S-d*A-p*m)*k,t[12]=(o*T-r*R-l*y)*k,t[13]=(n*R-i*T+s*y)*k,t[14]=(b*_-v*E-g*m)*k,t[15]=(d*E-f*_+u*m)*k,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,d=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*r,0,c*l-s*o,d*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,d=r+r,f=o+o,u=a*c,p=a*d,v=a*f,b=r*d,g=r*f,h=o*f,m=l*c,_=l*d,S=l*f,E=i.x,A=i.y,C=i.z;return s[0]=(1-(b+h))*E,s[1]=(p+S)*E,s[2]=(v-_)*E,s[3]=0,s[4]=(p-S)*A,s[5]=(1-(u+h))*A,s[6]=(g+m)*A,s[7]=0,s[8]=(v+_)*C,s[9]=(g-m)*C,s[10]=(1-(u+b))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinant();if(a===0)return i.set(1,1,1),n.identity(),this;let r=Zr.set(s[0],s[1],s[2]).length(),o=Zr.set(s[4],s[5],s[6]).length(),l=Zr.set(s[8],s[9],s[10]).length();a<0&&(r=-r),pi.copy(this);let c=1/r,d=1/o,f=1/l;return pi.elements[0]*=c,pi.elements[1]*=c,pi.elements[2]*=c,pi.elements[4]*=d,pi.elements[5]*=d,pi.elements[6]*=d,pi.elements[8]*=f,pi.elements[9]*=f,pi.elements[10]*=f,n.setFromRotationMatrix(pi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=vi,l=!1){let c=this.elements,d=2*a/(n-t),f=2*a/(i-s),u=(n+t)/(n-t),p=(i+s)/(i-s),v,b;if(l)v=a/(r-a),b=r*a/(r-a);else if(o===vi)v=-(r+a)/(r-a),b=-2*r*a/(r-a);else if(o===lo)v=-r/(r-a),b=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=vi,l=!1){let c=this.elements,d=2/(n-t),f=2/(i-s),u=-(n+t)/(n-t),p=-(i+s)/(i-s),v,b;if(l)v=1/(r-a),b=r/(r-a);else if(o===vi)v=-2/(r-a),b=-(r+a)/(r-a);else if(o===lo)v=-1/(r-a),b=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Zr=new V,pi=new Ee,nE=new V(0,0,0),iE=new V(1,1,1),js=new V,Yu=new V,Gn=new V,cS=new Ee,uS=new Li,ri=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],d=s[9],f=s[2],u=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Jt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return cS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return uS.setFromEuler(this),this.setFromQuaternion(uS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ri.DEFAULT_ORDER="XYZ";var Pl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},sE=0,hS=new V,Jr=new Li,us=new Ee,Zu=new V,Al=new V,aE=new V,rE=new Li,dS=new V(1,0,0),fS=new V(0,1,0),pS=new V(0,0,1),mS={type:"added"},oE={type:"removed"},jr={type:"childadded",child:null},Xm={type:"childremoved",child:null},xn=class e extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=cc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new ri,i=new Li,s=new V(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ee},normalMatrix:{value:new Ft}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Jr.setFromAxisAngle(t,n),this.quaternion.multiply(Jr),this}rotateOnWorldAxis(t,n){return Jr.setFromAxisAngle(t,n),this.quaternion.premultiply(Jr),this}rotateX(t){return this.rotateOnAxis(dS,t)}rotateY(t){return this.rotateOnAxis(fS,t)}rotateZ(t){return this.rotateOnAxis(pS,t)}translateOnAxis(t,n){return hS.copy(t).applyQuaternion(this.quaternion),this.position.add(hS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(dS,t)}translateY(t){return this.translateOnAxis(fS,t)}translateZ(t){return this.translateOnAxis(pS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(us.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Zu.copy(t):Zu.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Al.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?us.lookAt(Al,Zu,this.up):us.lookAt(Zu,Al,this.up),this.quaternion.setFromRotationMatrix(us),s&&(us.extractRotation(s.matrixWorld),Jr.setFromRotationMatrix(us),this.quaternion.premultiply(Jr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mS),jr.child=t,this.dispatchEvent(jr),jr.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(oE),Xm.child=t,this.dispatchEvent(Xm),Xm.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),us.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),us.multiply(t.parent.matrixWorld)),t.applyMatrix4(us),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mS),jr.child=t,this.dispatchEvent(jr),jr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Al,t,aE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Al,rE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let f=l[c];a(t.shapes,f)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),f=r(t.shapes),u=r(t.skeletons),p=r(t.animations),v=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function r(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};xn.DEFAULT_UP=new V(0,1,0);xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ms=class extends xn{constructor(){super(),this.isGroup=!0,this.type="Group"}},lE={type:"move"},fo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let g=n.getJointPose(b,i),h=this._getHandJoint(c,b);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&u>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lE)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new ms;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},cb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ks={h:0,s:0,l:0},Ju={h:0,s:0,l:0};function Wm(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var zt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Kt.workingColorSpace){if(t=QT(t,1),n=Jt(n,0,1),i=Jt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=Wm(r,a,t+1/3),this.g=Wm(r,a,t),this.b=Wm(r,a,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,n=mn){function i(a){a!==void 0&&parseFloat(a)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=mn){let i=cb[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}copyLinearToSRGB(t){return this.r=oo(t.r),this.g=oo(t.g),this.b=oo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mn){return Kt.workingToColorSpace(pn.copy(this),t),Math.round(Jt(pn.r*255,0,255))*65536+Math.round(Jt(pn.g*255,0,255))*256+Math.round(Jt(pn.b*255,0,255))}getHexString(t=mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(pn.copy(this),n);let i=pn.r,s=pn.g,a=pn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,d=(o+r)/2;if(o===r)l=0,c=0;else{let f=r-o;switch(c=d<=.5?f/(r+o):f/(2-r-o),r){case i:l=(s-a)/f+(s<a?6:0);break;case s:l=(a-i)/f+2;break;case a:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(pn.copy(this),n),t.r=pn.r,t.g=pn.g,t.b=pn.b,t}getStyle(t=mn){Kt.workingToColorSpace(pn.copy(this),t);let n=pn.r,i=pn.g,s=pn.b;return t!==mn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Ks),this.setHSL(Ks.h+t,Ks.s+n,Ks.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ks),t.getHSL(Ju);let i=zm(Ks.h,Ju.h,n),s=zm(Ks.s,Ju.s,n),a=zm(Ks.l,Ju.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new zt;zt.NAMES=cb;var Wa=class extends xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}},mi=new V,hs=new V,qm=new V,ds=new V,Kr=new V,Qr=new V,gS=new V,Ym=new V,Zm=new V,Jm=new V,jm=new Re,Km=new Re,Qm=new Re,na=class e{constructor(t=new V,n=new V,i=new V){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),mi.subVectors(t,n),s.cross(mi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){mi.subVectors(s,n),hs.subVectors(i,n),qm.subVectors(t,n);let r=mi.dot(mi),o=mi.dot(hs),l=mi.dot(qm),c=hs.dot(hs),d=hs.dot(qm),f=r*c-o*o;if(f===0)return a.set(0,0,0),null;let u=1/f,p=(c*l-o*d)*u,v=(r*d-o*l)*u;return a.set(1-p-v,v,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,ds)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,ds.x),l.addScaledVector(r,ds.y),l.addScaledVector(o,ds.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return jm.setScalar(0),Km.setScalar(0),Qm.setScalar(0),jm.fromBufferAttribute(t,n),Km.fromBufferAttribute(t,i),Qm.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(jm,a.x),r.addScaledVector(Km,a.y),r.addScaledVector(Qm,a.z),r}static isFrontFacing(t,n,i,s){return mi.subVectors(i,n),hs.subVectors(t,n),mi.cross(hs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mi.subVectors(this.c,this.b),hs.subVectors(this.a,this.b),mi.cross(hs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Kr.subVectors(s,i),Qr.subVectors(a,i),Ym.subVectors(t,i);let l=Kr.dot(Ym),c=Qr.dot(Ym);if(l<=0&&c<=0)return n.copy(i);Zm.subVectors(t,s);let d=Kr.dot(Zm),f=Qr.dot(Zm);if(d>=0&&f<=d)return n.copy(s);let u=l*f-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(Kr,r);Jm.subVectors(t,a);let p=Kr.dot(Jm),v=Qr.dot(Jm);if(v>=0&&p<=v)return n.copy(a);let b=p*c-l*v;if(b<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(Qr,o);let g=d*v-p*f;if(g<=0&&f-d>=0&&p-v>=0)return gS.subVectors(a,s),o=(f-d)/(f-d+(p-v)),n.copy(s).addScaledVector(gS,o);let h=1/(g+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(Kr,r).addScaledVector(Qr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ii=class{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(gi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(gi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=gi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,gi):gi.fromBufferAttribute(a,r),gi.applyMatrix4(t.matrixWorld),this.expandByPoint(gi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ju.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ju.copy(i.boundingBox)),ju.applyMatrix4(t.matrixWorld),this.union(ju)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gi),gi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wl),Ku.subVectors(this.max,wl),$r.subVectors(t.a,wl),to.subVectors(t.b,wl),eo.subVectors(t.c,wl),Qs.subVectors(to,$r),$s.subVectors(eo,to),Ba.subVectors($r,eo);let n=[0,-Qs.z,Qs.y,0,-$s.z,$s.y,0,-Ba.z,Ba.y,Qs.z,0,-Qs.x,$s.z,0,-$s.x,Ba.z,0,-Ba.x,-Qs.y,Qs.x,0,-$s.y,$s.x,0,-Ba.y,Ba.x,0];return!$m(n,$r,to,eo,Ku)||(n=[1,0,0,0,1,0,0,0,1],!$m(n,$r,to,eo,Ku))?!1:(Qu.crossVectors(Qs,$s),n=[Qu.x,Qu.y,Qu.z],$m(n,$r,to,eo,Ku))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},fs=[new V,new V,new V,new V,new V,new V,new V,new V],gi=new V,ju=new Ii,$r=new V,to=new V,eo=new V,Qs=new V,$s=new V,Ba=new V,wl=new V,Ku=new V,Qu=new V,Fa=new V;function $m(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){Fa.fromArray(e,a);let o=s.x*Math.abs(Fa.x)+s.y*Math.abs(Fa.y)+s.z*Math.abs(Fa.z),l=t.dot(Fa),c=n.dot(Fa),d=i.dot(Fa);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var ke=new V,$u=new jt,cE=0,Rn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cE++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=fg,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)$u.fromBufferAttribute(this,n),$u.applyMatrix3(t),this.setXY(n,$u.x,$u.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix3(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix4(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyNormalMatrix(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.transformDirection(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=El(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Cn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=El(n,this.array)),n}setX(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=El(n,this.array)),n}setY(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=El(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=El(n,this.array)),n}setW(t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array),s=Cn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Cn(n,this.array),i=Cn(i,this.array),s=Cn(s,this.array),a=Cn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fg&&(t.usage=this.usage),t}};var Bl=class extends Rn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Fl=class extends Rn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var tn=class extends Rn{constructor(t,n,i){super(new Float32Array(t),n,i)}},uE=new Ii,Cl=new V,tg=new V,sa=class{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):uE.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cl.subVectors(t,this.center);let n=Cl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Cl,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tg.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cl.copy(t.center).add(tg)),this.expandByPoint(Cl.copy(t.center).sub(tg))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},hE=0,si=new Ee,eg=new xn,no=new V,kn=new Ii,Rl=new Ii,$e=new V,oi=class e extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hE++}),this.uuid=cc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jT(t)?Fl:Bl)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Ft().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return si.makeRotationFromQuaternion(t),this.applyMatrix4(si),this}rotateX(t){return si.makeRotationX(t),this.applyMatrix4(si),this}rotateY(t){return si.makeRotationY(t),this.applyMatrix4(si),this}rotateZ(t){return si.makeRotationZ(t),this.applyMatrix4(si),this}translate(t,n,i){return si.makeTranslation(t,n,i),this.applyMatrix4(si),this}scale(t,n,i){return si.makeScale(t,n,i),this.applyMatrix4(si),this}lookAt(t){return eg.lookAt(t),eg.updateMatrix(),this.applyMatrix4(eg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(no).negate(),this.translate(no.x,no.y,no.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new tn(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];kn.setFromBufferAttribute(a),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sa);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){let i=this.boundingSphere.center;if(kn.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Rl.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(kn.min,Rl.min),kn.expandByPoint($e),$e.addVectors(kn.max,Rl.max),kn.expandByPoint($e)):(kn.expandByPoint(Rl.min),kn.expandByPoint(Rl.max))}kn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)$e.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared($e));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)$e.fromBufferAttribute(o,c),l&&(no.fromBufferAttribute(t,c),$e.add(no)),s=Math.max(s,i.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new V,l[y]=new V;let c=new V,d=new V,f=new V,u=new jt,p=new jt,v=new jt,b=new V,g=new V;function h(y,T,I){c.fromBufferAttribute(i,y),d.fromBufferAttribute(i,T),f.fromBufferAttribute(i,I),u.fromBufferAttribute(a,y),p.fromBufferAttribute(a,T),v.fromBufferAttribute(a,I),d.sub(c),f.sub(c),p.sub(u),v.sub(u);let R=1/(p.x*v.y-v.x*p.y);isFinite(R)&&(b.copy(d).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(R),g.copy(f).multiplyScalar(p.x).addScaledVector(d,-v.x).multiplyScalar(R),o[y].add(b),o[T].add(b),o[I].add(b),l[y].add(g),l[T].add(g),l[I].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let y=0,T=m.length;y<T;++y){let I=m[y],R=I.start,O=I.count;for(let P=R,H=R+O;P<H;P+=3)h(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let _=new V,S=new V,E=new V,A=new V;function C(y){E.fromBufferAttribute(s,y),A.copy(E);let T=o[y];_.copy(T),_.sub(E.multiplyScalar(E.dot(T))).normalize(),S.crossVectors(A,T);let R=S.dot(l[y])<0?-1:1;r.setXYZW(y,_.x,_.y,_.z,R)}for(let y=0,T=m.length;y<T;++y){let I=m[y],R=I.start,O=I.count;for(let P=R,H=R+O;P<H;P+=3)C(t.getX(P+0)),C(t.getX(P+1)),C(t.getX(P+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);let s=new V,a=new V,r=new V,o=new V,l=new V,c=new V,d=new V,f=new V;if(t)for(let u=0,p=t.count;u<p;u+=3){let v=t.getX(u+0),b=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,b),r.fromBufferAttribute(n,g),d.subVectors(r,a),f.subVectors(s,a),d.cross(f),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,a),f.subVectors(s,a),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)$e.fromBufferAttribute(t,n),$e.normalize(),t.setXYZ(n,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(l.length*d),p=0,v=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*d;for(let h=0;h<d;h++)u[v++]=c[p++]}return new Rn(u,d,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let d=0,f=c.length;d<f;d++){let u=c[d],p=t(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let f=0,u=c.length;f<u;f++){let p=c[f];d.push(p.toJSON(t.data))}d.length>0&&(s[l]=d,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(n))}let a=t.morphAttributes;for(let c in a){let d=[],f=a[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,d=r.length;c<d;c++){let f=r[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var dE=0,_s=class extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dE++}),this.uuid=cc(),this.name="",this.type="Material",this.blending=Ga,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=vh,this.blendEquation=ia,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ha,this.stencilZFail=Ha,this.stencilZPass=Ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ga&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gh&&(i.blendSrc=this.blendSrc),this.blendDst!==vh&&(i.blendDst=this.blendDst),this.blendEquation!==ia&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ka&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ha&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ha&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ha&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ps=new V,ng=new V,th=new V,ta=new V,ig=new V,eh=new V,sg=new V,Nh=class{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ps)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=ps.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ps.copy(this.origin).addScaledVector(this.direction,n),ps.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){ng.copy(t).add(n).multiplyScalar(.5),th.copy(n).sub(t).normalize(),ta.copy(this.origin).sub(ng);let a=t.distanceTo(n)*.5,r=-this.direction.dot(th),o=ta.dot(this.direction),l=-ta.dot(th),c=ta.lengthSq(),d=Math.abs(1-r*r),f,u,p,v;if(d>0)if(f=r*l-o,u=r*o-l,v=a*d,f>=0)if(u>=-v)if(u<=v){let b=1/d;f*=b,u*=b,p=f*(f+r*u+2*o)+u*(r*f+u+2*l)+c}else u=a,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;else u=-a,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-v?(f=Math.max(0,-(-r*a+o)),u=f>0?-a:Math.min(Math.max(-a,-l),a),p=-f*f+u*(u+2*l)+c):u<=v?(f=0,u=Math.min(Math.max(-a,-l),a),p=u*(u+2*l)+c):(f=Math.max(0,-(r*a+o)),u=f>0?a:Math.min(Math.max(-a,-l),a),p=-f*f+u*(u+2*l)+c);else u=r>0?-a:a,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ng).addScaledVector(th,u),p}intersectSphere(t,n){ps.subVectors(t.center,this.origin);let i=ps.dot(this.direction),s=ps.dot(ps)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),d>=0?(a=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(a=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,ps)!==null}intersectTriangle(t,n,i,s,a){ig.subVectors(n,t),eh.subVectors(i,t),sg.crossVectors(ig,eh);let r=this.direction.dot(sg),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ta.subVectors(this.origin,t);let l=o*this.direction.dot(eh.crossVectors(ta,eh));if(l<0)return null;let c=o*this.direction.dot(ig.cross(ta));if(c<0||l+c>r)return null;let d=-o*ta.dot(sg);return d<0?null:this.at(d/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qa=class extends _s{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Jh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},vS=new Ee,za=new Nh,nh=new sa,_S=new V,ih=new V,sh=new V,ah=new V,ag=new V,rh=new V,yS=new V,oh=new V,de=class extends xn{constructor(t=new oi,n=new qa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){rh.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let d=o[l],f=a[l];d!==0&&(ag.fromBufferAttribute(f,t),r?rh.addScaledVector(ag,d):rh.addScaledVector(ag.sub(n),d))}n.add(rh)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),nh.copy(i.boundingSphere),nh.applyMatrix4(a),za.copy(t.ray).recast(t.near),!(nh.containsPoint(za.origin)===!1&&(za.intersectSphere(nh,_S)===null||za.origin.distanceToSquared(_S)>(t.far-t.near)**2))&&(vS.copy(a).invert(),za.copy(t.ray).applyMatrix4(vS),!(i.boundingBox!==null&&za.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,za)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,f=a.attributes.normal,u=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,p.start),_=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let S=m,E=_;S<E;S+=3){let A=o.getX(S),C=o.getX(S+1),y=o.getX(S+2);s=lh(this,h,t,i,c,d,f,A,C,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let g=v,h=b;g<h;g+=3){let m=o.getX(g),_=o.getX(g+1),S=o.getX(g+2);s=lh(this,r,t,i,c,d,f,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){let g=u[v],h=r[g.materialIndex],m=Math.max(g.start,p.start),_=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=m,E=_;S<E;S+=3){let A=S,C=S+1,y=S+2;s=lh(this,h,t,i,c,d,f,A,C,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let g=v,h=b;g<h;g+=3){let m=g,_=g+1,S=g+2;s=lh(this,r,t,i,c,d,f,m,_,S),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}}};function fE(e,t,n,i,s,a,r,o){let l;if(t.side===un?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===ai,o),l===null)return null;oh.copy(o),oh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(oh);return c<n.near||c>n.far?null:{distance:c,point:oh.clone(),object:e}}function lh(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,ih),e.getVertexPosition(l,sh),e.getVertexPosition(c,ah);let d=fE(e,t,n,i,ih,sh,ah,yS);if(d){let f=new V;na.getBarycoord(yS,ih,sh,ah,f),s&&(d.uv=na.getInterpolatedAttribute(s,o,l,c,f,new jt)),a&&(d.uv1=na.getInterpolatedAttribute(a,o,l,c,f,new jt)),r&&(d.normal=na.getInterpolatedAttribute(r,o,l,c,f,new V),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new V,materialIndex:0};na.getNormal(ih,sh,ah,u.normal),d.face=u,d.barycoord=f}return d}var zl=class extends Xe{constructor(t=null,n=1,i=1,s,a,r,o,l,c=Be,d=Be,f,u){super(null,r,o,l,c,d,s,a,f,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vl=class extends Rn{constructor(t,n,i,s=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},io=new Ee,xS=new Ee,ch=[],SS=new Ii,pE=new Ee,Dl=new de,Ul=new sa,Hl=class extends de{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Vl(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,pE)}computeBoundingBox(){let t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ii),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,io),SS.copy(t.boundingBox).applyMatrix4(io),this.boundingBox.union(SS)}computeBoundingSphere(){let t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new sa),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,io),Ul.copy(t.boundingSphere).applyMatrix4(io),this.boundingSphere.union(Ul)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){let i=n.morphTargetInfluences,s=this.morphTexture.source.data.data,a=i.length+1,r=t*a+1;for(let o=0;o<i.length;o++)i[o]=s[r+o]}raycast(t,n){let i=this.matrixWorld,s=this.count;if(Dl.geometry=this.geometry,Dl.material=this.material,Dl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ul.copy(this.boundingSphere),Ul.applyMatrix4(i),t.ray.intersectsSphere(Ul)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,io),xS.multiplyMatrices(i,io),Dl.matrixWorld=xS,Dl.raycast(t,ch);for(let r=0,o=ch.length;r<o;r++){let l=ch[r];l.instanceId=a,l.object=this,n.push(l)}ch.length=0}}setColorAt(t,n){this.instanceColor===null&&(this.instanceColor=new Vl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,n){n.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,n){let i=n.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new zl(new Float32Array(s*this.count),s,this.count,nd,li));let a=this.morphTexture.source.data.data,r=0;for(let c=0;c<i.length;c++)r+=i[c];let o=this.geometry.morphTargetsRelative?1:1-r,l=s*t;a[l]=o,a.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},rg=new V,mE=new V,gE=new Ft,Di=class{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=rg.subVectors(i,n).cross(mE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(rg),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||gE.getNormalMatrix(t),s=this.coplanarPoint(rg).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Va=new sa,vE=new jt(.5,.5),uh=new V,po=class{constructor(t=new Di,n=new Di,i=new Di,s=new Di,a=new Di,r=new Di){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=vi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],f=a[5],u=a[6],p=a[7],v=a[8],b=a[9],g=a[10],h=a[11],m=a[12],_=a[13],S=a[14],E=a[15];if(s[0].setComponents(c-r,p-d,h-v,E-m).normalize(),s[1].setComponents(c+r,p+d,h+v,E+m).normalize(),s[2].setComponents(c+o,p+f,h+b,E+_).normalize(),s[3].setComponents(c-o,p-f,h-b,E-_).normalize(),i)s[4].setComponents(l,u,g,S).normalize(),s[5].setComponents(c-l,p-u,h-g,E-S).normalize();else if(s[4].setComponents(c-l,p-u,h-g,E-S).normalize(),n===vi)s[5].setComponents(c+l,p+u,h+g,E+S).normalize();else if(n===lo)s[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Va.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Va.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Va)}intersectsSprite(t){Va.center.set(0,0,0);let n=vE.distanceTo(t.center);return Va.radius=.7071067811865476+n,Va.applyMatrix4(t.matrixWorld),this.intersectsSphere(Va)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(uh.x=s.normal.x>0?t.max.x:t.min.x,uh.y=s.normal.y>0?t.max.y:t.min.y,uh.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(uh)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Gl=class extends Xe{constructor(t=[],n=ha,i,s,a,r,o,l,c,d){super(t,n,i,s,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},kl=class extends Xe{constructor(t,n,i,s,a,r,o,l,c){super(t,n,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},aa=class extends Xe{constructor(t,n,i=yi,s,a,r,o=Be,l=Be,c,d=Ni,f=1){if(d!==Ni&&d!==fa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:f};super(u,s,a,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ho(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Lh=class extends aa{constructor(t,n=yi,i=ha,s,a,r=Be,o=Be,l,c=Ni){let d={width:t,height:t,depth:1},f=[d,d,d,d,d,d];super(t,t,n,i,s,a,r,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Xl=class extends Xe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ra=class e extends oi{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],d=[],f=[],u=0,p=0;v("z","y","x",-1,-1,i,n,t,r,a,0),v("z","y","x",1,-1,i,n,-t,r,a,1),v("x","z","y",1,1,t,i,n,s,r,2),v("x","z","y",1,-1,t,i,-n,s,r,3),v("x","y","z",1,-1,t,n,i,s,a,4),v("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(d,3)),this.setAttribute("uv",new tn(f,2));function v(b,g,h,m,_,S,E,A,C,y,T){let I=S/C,R=E/y,O=S/2,P=E/2,H=A/2,k=C+1,B=y+1,z=0,et=0,Q=new V;for(let lt=0;lt<B;lt++){let pt=lt*R-P;for(let ht=0;ht<k;ht++){let Lt=ht*I-O;Q[b]=Lt*m,Q[g]=pt*_,Q[h]=H,c.push(Q.x,Q.y,Q.z),Q[b]=0,Q[g]=0,Q[h]=A>0?1:-1,d.push(Q.x,Q.y,Q.z),f.push(ht/C),f.push(1-lt/y),z+=1}}for(let lt=0;lt<y;lt++)for(let pt=0;pt<C;pt++){let ht=u+pt+k*lt,Lt=u+pt+k*(lt+1),oe=u+(pt+1)+k*(lt+1),ge=u+(pt+1)+k*lt;l.push(ht,Lt,ge),l.push(Lt,oe,ge),et+=6}o.addGroup(p,et,T),p+=et,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var oa=class e extends oi{constructor(t=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);let a=[],r=[],o=[],l=[],c=new V,d=new jt;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=n;f++,u+=3){let p=i+f/n*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),r.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(r[u]/t+1)/2,d.y=(r[u+1]/t+1)/2,l.push(d.x,d.y)}for(let f=1;f<=n;f++)a.push(f,f+1,0);this.setIndex(a),this.setAttribute("position",new tn(r,3)),this.setAttribute("normal",new tn(o,3)),this.setAttribute("uv",new tn(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Wl=class e extends oi{constructor(t=1,n=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),a=Math.floor(a);let d=[],f=[],u=[],p=[],v=0,b=[],g=i/2,h=0;m(),r===!1&&(t>0&&_(!0),n>0&&_(!1)),this.setIndex(d),this.setAttribute("position",new tn(f,3)),this.setAttribute("normal",new tn(u,3)),this.setAttribute("uv",new tn(p,2));function m(){let S=new V,E=new V,A=0,C=(n-t)/i;for(let y=0;y<=a;y++){let T=[],I=y/a,R=I*(n-t)+t;for(let O=0;O<=s;O++){let P=O/s,H=P*l+o,k=Math.sin(H),B=Math.cos(H);E.x=R*k,E.y=-I*i+g,E.z=R*B,f.push(E.x,E.y,E.z),S.set(k,C,B).normalize(),u.push(S.x,S.y,S.z),p.push(P,1-I),T.push(v++)}b.push(T)}for(let y=0;y<s;y++)for(let T=0;T<a;T++){let I=b[T][y],R=b[T+1][y],O=b[T+1][y+1],P=b[T][y+1];(t>0||T!==0)&&(d.push(I,R,P),A+=3),(n>0||T!==a-1)&&(d.push(R,O,P),A+=3)}c.addGroup(h,A,0),h+=A}function _(S){let E=v,A=new jt,C=new V,y=0,T=S===!0?t:n,I=S===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,g*I,0),u.push(0,I,0),p.push(.5,.5),v++;let R=v;for(let O=0;O<=s;O++){let H=O/s*l+o,k=Math.cos(H),B=Math.sin(H);C.x=T*B,C.y=g*I,C.z=T*k,f.push(C.x,C.y,C.z),u.push(0,I,0),A.x=k*.5+.5,A.y=B*.5*I+.5,p.push(A.x,A.y),v++}for(let O=0;O<s;O++){let P=E+O,H=R+O;S===!0?d.push(H,H+1,P):d.push(H+1,H,P),y+=3}c.addGroup(h,y,S===!0?1:2),h+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ql=class e extends oi{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,f=t/o,u=n/l,p=[],v=[],b=[],g=[];for(let h=0;h<d;h++){let m=h*u-r;for(let _=0;_<c;_++){let S=_*f-a;v.push(S,-m,0),b.push(0,0,1),g.push(_/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let m=0;m<o;m++){let _=m+c*h,S=m+c*(h+1),E=m+1+c*(h+1),A=m+1+c*h;p.push(_,S,A),p.push(S,E,A)}this.setIndex(p),this.setAttribute("position",new tn(v,3)),this.setAttribute("normal",new tn(b,3)),this.setAttribute("uv",new tn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ja(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function gn(e){let t={};for(let n=0;n<e.length;n++){let i=Ja(e[n]);for(let s in i)t[s]=i[s]}return t}function _E(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Pg(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var ub={clone:Ja,merge:gn},yE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends _s{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yE,this.fragmentShader=xE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ja(t.uniforms),this.uniformsGroups=_E(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Ih=class extends Wn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Oi=class extends _s{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fd,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Yl=class extends _s{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fd,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Jh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Oh=class extends _s{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=KS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ph=class extends _s{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function hh(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}var la=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bh=class extends la{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cg,endingEnd:cg}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case ug:a=t,o=2*n-i;break;case hg:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ug:r=t,l=2*i-n;break;case hg:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,d=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*d,this._offsetNext=r*d}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,v=(i-n)/(s-n),b=v*v,g=b*v,h=-u*g+2*u*b-u*v,m=(1+u)*g+(-1.5-2*u)*b+(-.5+u)*v+1,_=(-1-p)*g+(1.5+p)*b+.5*v,S=p*g-p*b;for(let E=0;E!==o;++E)a[E]=h*r[d+E]+m*r[c+E]+_*r[l+E]+S*r[f+E];return a}},Fh=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=(i-n)/(s-n),f=1-d;for(let u=0;u!==o;++u)a[u]=r[c+u]*f+r[l+u]*d;return a}},zh=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Vh=class extends la{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this.settings||this.DefaultSettings_,f=d.inTangents,u=d.outTangents;if(!f||!u){let b=(i-n)/(s-n),g=1-b;for(let h=0;h!==o;++h)a[h]=r[c+h]*g+r[l+h]*b;return a}let p=o*2,v=t-1;for(let b=0;b!==o;++b){let g=r[c+b],h=r[l+b],m=v*p+b*2,_=u[m],S=u[m+1],E=t*p+b*2,A=f[E],C=f[E+1],y=(i-n)/(s-n),T,I,R,O,P;for(let H=0;H<8;H++){T=y*y,I=T*y,R=1-y,O=R*R,P=O*R;let B=P*n+3*O*y*_+3*R*T*A+I*s-i;if(Math.abs(B)<1e-10)break;let z=3*O*(_-n)+6*R*y*(A-_)+3*T*(s-A);if(Math.abs(z)<1e-10)break;y=y-B/z,y=Math.max(0,Math.min(1,y))}a[b]=P*g+3*O*y*S+3*R*T*C+I*h}return a}},qn=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=hh(n,this.TimeBufferType),this.values=hh(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:hh(t.times,Array),values:hh(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new zh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Fh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new Vh(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.settings=this.settings),n}setInterpolation(t){let n;switch(t){case Nl:n=this.InterpolantFactoryMethodDiscrete;break;case wh:n=this.InterpolantFactoryMethodLinear;break;case ph:n=this.InterpolantFactoryMethodSmooth;break;case lg:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ut("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nl;case this.InterpolantFactoryMethodLinear:return wh;case this.InterpolantFactoryMethodSmooth:return ph;case this.InterpolantFactoryMethodBezier:return lg}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&KT(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ph,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],d=t[o+1];if(c!==d&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*i,u=f-i,p=f+i;for(let v=0;v!==i;++v){let b=n[f+v];if(b!==n[u+v]||b!==n[p+v]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let f=o*i,u=r*i;for(let p=0;p!==i;++p)n[u+p]=n[f+p]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};qn.prototype.ValueTypeName="";qn.prototype.TimeBufferType=Float32Array;qn.prototype.ValueBufferType=Float32Array;qn.prototype.DefaultInterpolation=wh;var ca=class extends qn{constructor(t,n,i){super(t,n,i)}};ca.prototype.ValueTypeName="bool";ca.prototype.ValueBufferType=Array;ca.prototype.DefaultInterpolation=Nl;ca.prototype.InterpolantFactoryMethodLinear=void 0;ca.prototype.InterpolantFactoryMethodSmooth=void 0;var Hh=class extends qn{constructor(t,n,i,s){super(t,n,i,s)}};Hh.prototype.ValueTypeName="color";var Gh=class extends qn{constructor(t,n,i,s){super(t,n,i,s)}};Gh.prototype.ValueTypeName="number";var kh=class extends la{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let d=c+o;c!==d;c+=4)Li.slerpFlat(a,0,r,c-o,r,c,l);return a}},Zl=class extends qn{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new kh(this.times,this.values,this.getValueSize(),t)}};Zl.prototype.ValueTypeName="quaternion";Zl.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends qn{constructor(t,n,i){super(t,n,i)}};ua.prototype.ValueTypeName="string";ua.prototype.ValueBufferType=Array;ua.prototype.DefaultInterpolation=Nl;ua.prototype.InterpolantFactoryMethodLinear=void 0;ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Xh=class extends qn{constructor(t,n,i,s){super(t,n,i,s)}};Xh.prototype.ValueTypeName="vector";var mh={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(bS(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!bS(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function bS(e){try{let t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Wh=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,a===!1&&s.onStart!==void 0&&s.onStart(d,r,o),a=!0},this.itemEnd=function(d){r++,s.onProgress!==void 0&&s.onProgress(d,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,f){return c.push(d,f),this},this.removeHandler=function(d){let f=c.indexOf(d);return f!==-1&&c.splice(f,2),this},this.getHandler=function(d){for(let f=0,u=c.length;f<u;f+=2){let p=c[f],v=c[f+1];if(p.global&&(p.lastIndex=0),p.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hb=new Wh,mo=class{constructor(t){this.manager=t!==void 0?t:hb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};mo.DEFAULT_MATERIAL_NAME="__DEFAULT";var so=new WeakMap,qh=class extends mo{constructor(t){super(t)}load(t,n,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,r=mh.get(`image:${t}`);if(r!==void 0){if(r.complete===!0)a.manager.itemStart(t),setTimeout(function(){n&&n(r),a.manager.itemEnd(t)},0);else{let f=so.get(r);f===void 0&&(f=[],so.set(r,f)),f.push({onLoad:n,onError:s})}return r}let o=co("img");function l(){d(),n&&n(this);let f=so.get(this)||[];for(let u=0;u<f.length;u++){let p=f[u];p.onLoad&&p.onLoad(this)}so.delete(this),a.manager.itemEnd(t)}function c(f){d(),s&&s(f),mh.remove(`image:${t}`);let u=so.get(this)||[];for(let p=0;p<u.length;p++){let v=u[p];v.onError&&v.onError(f)}so.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mh.add(`image:${t}`,o),a.manager.itemStart(t),o.src=t,o}};var Jl=class extends mo{constructor(t){super(t)}load(t,n,i,s){let a=new Xe,r=new qh(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(o){a.image=o,a.needsUpdate=!0,n!==void 0&&n(a)},i,s),a}},jl=class extends xn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}};var og=new Ee,MS=new V,TS=new V,pg=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new jt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;MS.setFromMatrixPosition(t.matrixWorld),n.position.copy(MS),TS.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(TS),n.updateMatrixWorld(),og.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(og,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===lo||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(og)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},dh=new V,fh=new Li,Ri=new V,Kl=class extends xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(dh,fh,Ri),Ri.x===1&&Ri.y===1&&Ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dh,fh,Ri.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(dh,fh,Ri),Ri.x===1&&Ri.y===1&&Ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(dh,fh,Ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ea=new V,ES=new jt,AS=new jt,ln=class extends Kl{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Ch*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fm*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ch*2*Math.atan(Math.tan(Fm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ea.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ea.x,ea.y).multiplyScalar(-t/ea.z),ea.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ea.x,ea.y).multiplyScalar(-t/ea.z)}getViewSize(t,n){return this.getViewBounds(t,ES,AS),n.subVectors(AS,ES)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Fm*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var mg=class extends pg{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}},Pi=class extends jl{constructor(t,n,i=0,s=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new mg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}},Ql=class extends Kl{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var $l=class extends jl{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}};var ao=-90,ro=1,Yh=class extends xn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(ao,ro,t,n);s.layers=this.layers,this.add(s);let a=new ln(ao,ro,t,n);a.layers=this.layers,this.add(a);let r=new ln(ao,ro,t,n);r.layers=this.layers,this.add(r);let o=new ln(ao,ro,t,n);o.layers=this.layers,this.add(o);let l=new ln(ao,ro,t,n);l.layers=this.layers,this.add(l);let c=new ln(ao,ro,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===vi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,d]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(f,u,p),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Zh=class extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Bg="\\[\\]\\.:\\/",SE=new RegExp("["+Bg+"]","g"),Fg="[^"+Bg+"]",bE="[^"+Bg.replace("\\.","")+"]",ME=/((?:WC+[\/:])*)/.source.replace("WC",Fg),TE=/(WCOD+)?/.source.replace("WCOD",bE),EE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fg),AE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fg),wE=new RegExp("^"+ME+TE+EE+AE+"$"),CE=["material","materials","bones","map"],gg=class{constructor(t,n,i){let s=i||Te.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Te=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(SE,"")}static parseTrackName(t){let n=wE.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);CE.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ut("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=gg;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var L2=new Float32Array(1);var tc=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ut("THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=performance.now();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}};function zg(e,t,n,i){let s=RE(i);switch(n){case Ng:return e*t;case nd:return e*t/s.components*s.byteLength;case id:return e*t/s.components*s.byteLength;case Za:return e*t*2/s.components*s.byteLength;case sd:return e*t*2/s.components*s.byteLength;case Lg:return e*t*3/s.components*s.byteLength;case ci:return e*t*4/s.components*s.byteLength;case ad:return e*t*4/s.components*s.byteLength;case ac:case rc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oc:case lc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case od:case cd:return Math.max(e,16)*Math.max(t,8)/4;case rd:case ld:return Math.max(e,8)*Math.max(t,8)/2;case ud:case hd:case fd:case pd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case dd:case md:case gd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case vd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case _d:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case yd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case xd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Sd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case bd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Md:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Td:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ed:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ad:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case wd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Cd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Rd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Dd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ud:case Nd:case Ld:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Id:case Od:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Pd:case Bd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function RE(e){switch(e){case Dn:case Cg:return{byteLength:1,components:1};case vo:case Rg:case zi:return{byteLength:2,components:1};case td:case ed:return{byteLength:2,components:4};case yi:case $h:case li:return{byteLength:4,components:1};case Dg:case Ug:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function Ib(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function UE(e){let t=new WeakMap;function n(o,l){let c=o.array,d=o.usage,f=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let d=l.array,f=l.updateRanges;if(e.bindBuffer(c,o),f.length===0)e.bufferSubData(c,0,d);else{f.sort((p,v)=>p.start-v.start);let u=0;for(let p=1;p<f.length;p++){let v=f[u],b=f[p];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++u,f[u]=b)}f.length=u+1;for(let p=0,v=f.length;p<v;p++){let b=f[p];e.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var NE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,LE=`#ifdef USE_ALPHAHASH
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
#endif`,IE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,OE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,BE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,FE=`#ifdef USE_AOMAP
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
#endif`,zE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VE=`#ifdef USE_BATCHING
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
#endif`,HE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,GE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,WE=`#ifdef USE_IRIDESCENCE
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
#endif`,qE=`#ifdef USE_BUMPMAP
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
#endif`,YE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ZE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,KE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,QE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$E=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,eA=`#define PI 3.141592653589793
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
} // validated`,nA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,iA=`vec3 transformedNormal = objectNormal;
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
#endif`,sA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,oA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lA="gl_FragColor = linearToOutputTexel( gl_FragColor );",cA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uA=`#ifdef USE_ENVMAP
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
#endif`,hA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dA=`#ifdef USE_ENVMAP
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
#endif`,fA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pA=`#ifdef USE_ENVMAP
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
#endif`,mA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_A=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yA=`#ifdef USE_GRADIENTMAP
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
}`,xA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,SA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,MA=`uniform bool receiveShadow;
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
#endif`,TA=`#ifdef USE_ENVMAP
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
#endif`,EA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,CA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,RA=`PhysicalMaterial material;
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
#endif`,DA=`uniform sampler2D dfgLUT;
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
}`,UA=`
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
#endif`,NA=`#if defined( RE_IndirectDiffuse )
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
#endif`,LA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,IA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,HA=`#if defined( USE_POINTS_UV )
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
#endif`,GA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,WA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YA=`#ifdef USE_MORPHTARGETS
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
#endif`,ZA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,KA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$A=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tw=`#ifdef USE_NORMALMAP
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
#endif`,ew=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ow=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gw=`float getShadowMask() {
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
}`,vw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_w=`#ifdef USE_SKINNING
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
#endif`,yw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xw=`#ifdef USE_SKINNING
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
#endif`,Sw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ew=`#ifdef USE_TRANSMISSION
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
#endif`,Aw=`#ifdef USE_TRANSMISSION
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
#endif`,ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Uw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nw=`uniform sampler2D t2D;
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
}`,Lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ow=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bw=`#include <common>
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
}`,Fw=`#if DEPTH_PACKING == 3200
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
}`,zw=`#define DISTANCE
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
}`,Vw=`#define DISTANCE
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
}`,Hw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kw=`uniform float scale;
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
}`,Xw=`uniform vec3 diffuse;
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
}`,Ww=`#include <common>
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
}`,qw=`uniform vec3 diffuse;
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
}`,Yw=`#define LAMBERT
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
}`,Zw=`#define LAMBERT
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
}`,Jw=`#define MATCAP
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
}`,jw=`#define MATCAP
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
}`,Kw=`#define NORMAL
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
}`,Qw=`#define NORMAL
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
}`,$w=`#define PHONG
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
}`,tC=`#define PHONG
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
}`,eC=`#define STANDARD
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
}`,nC=`#define STANDARD
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
}`,iC=`#define TOON
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
}`,sC=`#define TOON
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
}`,aC=`uniform float size;
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
}`,rC=`uniform vec3 diffuse;
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
}`,oC=`#include <common>
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
}`,lC=`uniform vec3 color;
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
}`,cC=`uniform float rotation;
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
}`,uC=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:NE,alphahash_pars_fragment:LE,alphamap_fragment:IE,alphamap_pars_fragment:OE,alphatest_fragment:PE,alphatest_pars_fragment:BE,aomap_fragment:FE,aomap_pars_fragment:zE,batching_pars_vertex:VE,batching_vertex:HE,begin_vertex:GE,beginnormal_vertex:kE,bsdfs:XE,iridescence_fragment:WE,bumpmap_pars_fragment:qE,clipping_planes_fragment:YE,clipping_planes_pars_fragment:ZE,clipping_planes_pars_vertex:JE,clipping_planes_vertex:jE,color_fragment:KE,color_pars_fragment:QE,color_pars_vertex:$E,color_vertex:tA,common:eA,cube_uv_reflection_fragment:nA,defaultnormal_vertex:iA,displacementmap_pars_vertex:sA,displacementmap_vertex:aA,emissivemap_fragment:rA,emissivemap_pars_fragment:oA,colorspace_fragment:lA,colorspace_pars_fragment:cA,envmap_fragment:uA,envmap_common_pars_fragment:hA,envmap_pars_fragment:dA,envmap_pars_vertex:fA,envmap_physical_pars_fragment:TA,envmap_vertex:pA,fog_vertex:mA,fog_pars_vertex:gA,fog_fragment:vA,fog_pars_fragment:_A,gradientmap_pars_fragment:yA,lightmap_pars_fragment:xA,lights_lambert_fragment:SA,lights_lambert_pars_fragment:bA,lights_pars_begin:MA,lights_toon_fragment:EA,lights_toon_pars_fragment:AA,lights_phong_fragment:wA,lights_phong_pars_fragment:CA,lights_physical_fragment:RA,lights_physical_pars_fragment:DA,lights_fragment_begin:UA,lights_fragment_maps:NA,lights_fragment_end:LA,logdepthbuf_fragment:IA,logdepthbuf_pars_fragment:OA,logdepthbuf_pars_vertex:PA,logdepthbuf_vertex:BA,map_fragment:FA,map_pars_fragment:zA,map_particle_fragment:VA,map_particle_pars_fragment:HA,metalnessmap_fragment:GA,metalnessmap_pars_fragment:kA,morphinstance_vertex:XA,morphcolor_vertex:WA,morphnormal_vertex:qA,morphtarget_pars_vertex:YA,morphtarget_vertex:ZA,normal_fragment_begin:JA,normal_fragment_maps:jA,normal_pars_fragment:KA,normal_pars_vertex:QA,normal_vertex:$A,normalmap_pars_fragment:tw,clearcoat_normal_fragment_begin:ew,clearcoat_normal_fragment_maps:nw,clearcoat_pars_fragment:iw,iridescence_pars_fragment:sw,opaque_fragment:aw,packing:rw,premultiplied_alpha_fragment:ow,project_vertex:lw,dithering_fragment:cw,dithering_pars_fragment:uw,roughnessmap_fragment:hw,roughnessmap_pars_fragment:dw,shadowmap_pars_fragment:fw,shadowmap_pars_vertex:pw,shadowmap_vertex:mw,shadowmask_pars_fragment:gw,skinbase_vertex:vw,skinning_pars_vertex:_w,skinning_vertex:yw,skinnormal_vertex:xw,specularmap_fragment:Sw,specularmap_pars_fragment:bw,tonemapping_fragment:Mw,tonemapping_pars_fragment:Tw,transmission_fragment:Ew,transmission_pars_fragment:Aw,uv_pars_fragment:ww,uv_pars_vertex:Cw,uv_vertex:Rw,worldpos_vertex:Dw,background_vert:Uw,background_frag:Nw,backgroundCube_vert:Lw,backgroundCube_frag:Iw,cube_vert:Ow,cube_frag:Pw,depth_vert:Bw,depth_frag:Fw,distance_vert:zw,distance_frag:Vw,equirect_vert:Hw,equirect_frag:Gw,linedashed_vert:kw,linedashed_frag:Xw,meshbasic_vert:Ww,meshbasic_frag:qw,meshlambert_vert:Yw,meshlambert_frag:Zw,meshmatcap_vert:Jw,meshmatcap_frag:jw,meshnormal_vert:Kw,meshnormal_frag:Qw,meshphong_vert:$w,meshphong_frag:tC,meshphysical_vert:eC,meshphysical_frag:nC,meshtoon_vert:iC,meshtoon_frag:sC,points_vert:aC,points_frag:rC,shadow_vert:oC,shadow_frag:lC,sprite_vert:cC,sprite_frag:uC},ot={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},Hi={basic:{uniforms:gn([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:gn([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:gn([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:gn([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:gn([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new zt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:gn([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:gn([ot.points,ot.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:gn([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:gn([ot.common,ot.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:gn([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:gn([ot.sprite,ot.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:gn([ot.common,ot.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:gn([ot.lights,ot.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Hi.physical={uniforms:gn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var Hd={r:0,b:0,g:0},ja=new ri,hC=new Ee;function dC(e,t,n,i,s,a){let r=new zt(0),o=s===!0?0:1,l,c,d=null,f=0,u=null;function p(m){let _=m.isScene===!0?m.background:null;if(_&&_.isTexture){let S=m.backgroundBlurriness>0;_=t.get(_,S)}return _}function v(m){let _=!1,S=p(m);S===null?g(r,o):S&&S.isColor&&(g(S,1),_=!0);let E=e.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(m,_){let S=p(_);S&&(S.isCubeTexture||S.mapping===ic)?(c===void 0&&(c=new de(new ra(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Ja(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ja.copy(_.backgroundRotation),ja.x*=-1,ja.y*=-1,ja.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ja.y*=-1,ja.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(hC.makeRotationFromEuler(ja)),c.material.toneMapped=Kt.getTransfer(S.colorSpace)!==ie,(d!==S||f!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,u=e.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new de(new ql(2,2),new Wn({name:"BackgroundMaterial",uniforms:Ja(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(S.colorSpace)!==ie,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,d=S,f=S.version,u=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,_){m.getRGB(Hd,Pg(e)),n.buffers.color.setClear(Hd.r,Hd.g,Hd.b,_,a)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(m,_=1){r.set(m),o=_,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,g(r,o)},render:v,addToRenderList:b,dispose:h}}function fC(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(R,O,P,H,k){let B=!1,z=f(R,H,P,O);a!==z&&(a=z,c(a.object)),B=p(R,H,P,k),B&&v(R,H,P,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,S(R,O,P,H),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return e.createVertexArray()}function c(R){return e.bindVertexArray(R)}function d(R){return e.deleteVertexArray(R)}function f(R,O,P,H){let k=H.wireframe===!0,B=i[O.id];B===void 0&&(B={},i[O.id]=B);let z=R.isInstancedMesh===!0?R.id:0,et=B[z];et===void 0&&(et={},B[z]=et);let Q=et[P.id];Q===void 0&&(Q={},et[P.id]=Q);let lt=Q[k];return lt===void 0&&(lt=u(l()),Q[k]=lt),lt}function u(R){let O=[],P=[],H=[];for(let k=0;k<n;k++)O[k]=0,P[k]=0,H[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:P,attributeDivisors:H,object:R,attributes:{},index:null}}function p(R,O,P,H){let k=a.attributes,B=O.attributes,z=0,et=P.getAttributes();for(let Q in et)if(et[Q].location>=0){let pt=k[Q],ht=B[Q];if(ht===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(ht=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(ht=R.instanceColor)),pt===void 0||pt.attribute!==ht||ht&&pt.data!==ht.data)return!0;z++}return a.attributesNum!==z||a.index!==H}function v(R,O,P,H){let k={},B=O.attributes,z=0,et=P.getAttributes();for(let Q in et)if(et[Q].location>=0){let pt=B[Q];pt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(pt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(pt=R.instanceColor));let ht={};ht.attribute=pt,pt&&pt.data&&(ht.data=pt.data),k[Q]=ht,z++}a.attributes=k,a.attributesNum=z,a.index=H}function b(){let R=a.newAttributes;for(let O=0,P=R.length;O<P;O++)R[O]=0}function g(R){h(R,0)}function h(R,O){let P=a.newAttributes,H=a.enabledAttributes,k=a.attributeDivisors;P[R]=1,H[R]===0&&(e.enableVertexAttribArray(R),H[R]=1),k[R]!==O&&(e.vertexAttribDivisor(R,O),k[R]=O)}function m(){let R=a.newAttributes,O=a.enabledAttributes;for(let P=0,H=O.length;P<H;P++)O[P]!==R[P]&&(e.disableVertexAttribArray(P),O[P]=0)}function _(R,O,P,H,k,B,z){z===!0?e.vertexAttribIPointer(R,O,P,k,B):e.vertexAttribPointer(R,O,P,H,k,B)}function S(R,O,P,H){b();let k=H.attributes,B=P.getAttributes(),z=O.defaultAttributeValues;for(let et in B){let Q=B[et];if(Q.location>=0){let lt=k[et];if(lt===void 0&&(et==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),et==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),lt!==void 0){let pt=lt.normalized,ht=lt.itemSize,Lt=t.get(lt);if(Lt===void 0)continue;let oe=Lt.buffer,ge=Lt.type,Z=Lt.bytesPerElement,nt=ge===e.INT||ge===e.UNSIGNED_INT||lt.gpuType===$h;if(lt.isInterleavedBufferAttribute){let K=lt.data,Nt=K.stride,Tt=lt.offset;if(K.isInstancedInterleavedBuffer){for(let wt=0;wt<Q.locationSize;wt++)h(Q.location+wt,K.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let wt=0;wt<Q.locationSize;wt++)g(Q.location+wt);e.bindBuffer(e.ARRAY_BUFFER,oe);for(let wt=0;wt<Q.locationSize;wt++)_(Q.location+wt,ht/Q.locationSize,ge,pt,Nt*Z,(Tt+ht/Q.locationSize*wt)*Z,nt)}else{if(lt.isInstancedBufferAttribute){for(let K=0;K<Q.locationSize;K++)h(Q.location+K,lt.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let K=0;K<Q.locationSize;K++)g(Q.location+K);e.bindBuffer(e.ARRAY_BUFFER,oe);for(let K=0;K<Q.locationSize;K++)_(Q.location+K,ht/Q.locationSize,ge,pt,ht*Z,ht/Q.locationSize*K*Z,nt)}}else if(z!==void 0){let pt=z[et];if(pt!==void 0)switch(pt.length){case 2:e.vertexAttrib2fv(Q.location,pt);break;case 3:e.vertexAttrib3fv(Q.location,pt);break;case 4:e.vertexAttrib4fv(Q.location,pt);break;default:e.vertexAttrib1fv(Q.location,pt)}}}}m()}function E(){T();for(let R in i){let O=i[R];for(let P in O){let H=O[P];for(let k in H){let B=H[k];for(let z in B)d(B[z].object),delete B[z];delete H[k]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;let O=i[R.id];for(let P in O){let H=O[P];for(let k in H){let B=H[k];for(let z in B)d(B[z].object),delete B[z];delete H[k]}}delete i[R.id]}function C(R){for(let O in i){let P=i[O];for(let H in P){let k=P[H];if(k[R.id]===void 0)continue;let B=k[R.id];for(let z in B)d(B[z].object),delete B[z];delete k[R.id]}}}function y(R){for(let O in i){let P=i[O],H=R.isInstancedMesh===!0?R.id:0,k=P[H];if(k!==void 0){for(let B in k){let z=k[B];for(let et in z)d(z[et].object),delete z[et];delete k[B]}delete P[H],Object.keys(P).length===0&&delete i[O]}}}function T(){I(),r=!0,a!==s&&(a=s,c(a.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:g,disableUnusedAttributes:m}}function pC(e,t,n){let i;function s(c){i=c}function a(c,d){e.drawArrays(i,c,d),n.update(d,i,1)}function r(c,d,f){f!==0&&(e.drawArraysInstanced(i,c,d,f),n.update(d,i,f))}function o(c,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,f);let p=0;for(let v=0;v<f;v++)p+=d[v];n.update(p,i,1)}function l(c,d,f,u){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)r(c[v],d[v],u[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,f);let v=0;for(let b=0;b<f;b++)v+=d[b]*u[b];n.update(v,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function mC(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(C){return!(C!==ci&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===zi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Dn&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==li&&!y)}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",d=l(c);d!==c&&(Ut("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let f=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=e.getParameter(e.MAX_SAMPLES),A=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:S,maxSamples:E,samples:A}}function gC(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Di,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,u){n=d(f,u,0)},this.setState=function(f,u,p){let v=f.clippingPlanes,b=f.clipIntersection,g=f.clipShadows,h=e.get(f);if(!s||v===null||v.length===0||a&&!g)a?d(null):c();else{let m=a?0:i,_=m*4,S=h.clippingState||null;l.value=S,S=d(v,u,_,p);for(let E=0;E!==_;++E)S[E]=n[E];h.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(f,u,p,v){let b=f!==null?f.length:0,g=null;if(b!==0){if(g=l.value,v!==!0||g===null){let h=p+b*4,m=u.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<h)&&(g=new Float32Array(h));for(let _=0,S=p;_!==b;++_,S+=4)r.copy(f[_]).applyMatrix4(m,o),r.normal.toArray(g,S),g[S+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,g}}var pa=4,db=[.125,.215,.35,.446,.526,.582],Qa=20,vC=256,uc=new Ql,fb=new zt,Vg=null,Hg=0,Gg=0,kg=!1,_C=new V,So=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=_C}=a;Vg=this._renderer.getRenderTarget(),Hg=this._renderer.getActiveCubeFace(),Gg=this._renderer.getActiveMipmapLevel(),kg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gb(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mb(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Vg,Hg,Gg),this._renderer.xr.enabled=kg,t.scissorTest=!1,yo(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ha||t.mapping===Ya?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vg=this._renderer.getRenderTarget(),Hg=this._renderer.getActiveCubeFace(),Gg=this._renderer.getActiveMipmapLevel(),kg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:zi,format:ci,colorSpace:Xa,depthBuffer:!1},s=pb(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pb(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yC(a)),this._blurMaterial=SC(a,t,n),this._ggxMaterial=xC(a,t,n)}return s}_compileMaterial(t){let n=new de(new oi,t);this._renderer.compile(n,uc)}_sceneToCubeUV(t,n,i,s,a){let l=new ln(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(fb),f.toneMapping=_i,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new de(new ra,new qa({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,h=!1,m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,h=!0):(g.color.copy(fb),h=!0);for(let _=0;_<6;_++){let S=_%3;S===0?(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[_],a.y,a.z)):S===1?(l.up.set(0,0,c[_]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[_],a.z)):(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[_]));let E=this._cubeSize;yo(s,S*E,_>2?E:0,E,E),f.setRenderTarget(s),h&&f.render(b,l),f.render(t,l)}f.toneMapping=p,f.autoClear=u,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===ha||t.mapping===Ya;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gb()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mb());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;yo(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,uc)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=0+c*1.25,p=f*u,{_lodMax:v}=this,b=this._sizeLods[i],g=3*b*(i>v-pa?i-v+pa:0),h=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=v-n,yo(a,g,h,3*b,2*b),s.setRenderTarget(a),s.render(o,uc),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=v-i,yo(t,g,h,3*b,2*b),s.setRenderTarget(t),s.render(o,uc)}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Dt("blur direction must be either latitudinal or longitudinal!");let d=3,f=this._lodMeshes[s];f.material=c;let u=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*Qa-1),b=a/v,g=isFinite(a)?1+Math.floor(d*b):Qa;g>Qa&&Ut(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qa}`);let h=[],m=0;for(let C=0;C<Qa;++C){let y=C/b,T=Math.exp(-y*y/2);h.push(T),C===0?m+=T:C<g&&(m+=2*T)}for(let C=0;C<h.length;C++)h[C]=h[C]/m;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=v,u.mipInt.value=_-i;let S=this._sizeLods[s],E=3*S*(s>_-pa?s-_+pa:0),A=4*(this._cubeSize-S);yo(n,E,A,3*S,2*S),l.setRenderTarget(n),l.render(f,uc)}};function yC(e){let t=[],n=[],i=[],s=e,a=e-pa+1+db.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);t.push(o);let l=1/o;r>e-pa?l=db[r-e+pa-1]:r===0&&(l=0),n.push(l);let c=1/(o-2),d=-c,f=1+c,u=[d,d,f,d,f,f,d,d,f,f,d,f],p=6,v=6,b=3,g=2,h=1,m=new Float32Array(b*v*p),_=new Float32Array(g*v*p),S=new Float32Array(h*v*p);for(let A=0;A<p;A++){let C=A%3*2/3-1,y=A>2?0:-1,T=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];m.set(T,b*v*A),_.set(u,g*v*A);let I=[A,A,A,A,A,A];S.set(I,h*v*A)}let E=new oi;E.setAttribute("position",new Rn(m,b)),E.setAttribute("uv",new Rn(_,g)),E.setAttribute("faceIndex",new Rn(S,h)),i.push(new de(E,null)),s>pa&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function pb(e,t,n){let i=new Xn(e,t,n);return i.texture.mapping=ic,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yo(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function xC(e,t,n){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:vC,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function SC(e,t,n){let i=new Float32Array(Qa),s=new V(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Qa,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function mb(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function gb(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Wd(){return`

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
	`}var kd=class extends Xn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gl(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ra(5,5,5),a=new Wn({name:"CubemapFromEquirect",uniforms:Ja(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Fi});a.uniforms.tEquirect.value=n;let r=new de(s,a),o=n.minFilter;return n.minFilter===da&&(n.minFilter=cn),new Yh(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function bC(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?r(u):a(u)}function a(u){if(u&&u.isTexture){let p=u.mapping;if(p===jh||p===Kh)if(t.has(u)){let v=t.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let b=new kd(v.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let p=u.mapping,v=p===jh||p===Kh,b=p===ha||p===Ya;if(v||b){let g=n.get(u),h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new So(e)),g=v?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{let m=u.image;return v&&m&&m.height>0||b&&m&&l(m)?(i===null&&(i=new So(e)),g=v?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,p){return p===jh?u.mapping=ha:p===Kh&&(u.mapping=Ya),u}function l(u){let p=0,v=6;for(let b=0;b<v;b++)u[b]!==void 0&&p++;return p===v}function c(u){let p=u.target;p.removeEventListener("dispose",c);let v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function d(u){let p=u.target;p.removeEventListener("dispose",d);let v=n.get(p);v!==void 0&&(n.delete(p),v.dispose())}function f(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function MC(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&Il("WebGLRenderer: "+i+" extension not supported."),s}}}function TC(e,t,n,i){let s={},a=new WeakMap;function r(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let v in u.attributes)t.remove(u.attributes[v]);u.removeEventListener("dispose",r),delete s[u.id];let p=a.get(u);p&&(t.remove(p),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(f){let u=f.attributes;for(let p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(f){let u=[],p=f.index,v=f.attributes.position,b=0;if(v===void 0)return;if(p!==null){let m=p.array;b=p.version;for(let _=0,S=m.length;_<S;_+=3){let E=m[_+0],A=m[_+1],C=m[_+2];u.push(E,A,A,C,C,E)}}else{let m=v.array;b=v.version;for(let _=0,S=m.length/3-1;_<S;_+=3){let E=_+0,A=_+1,C=_+2;u.push(E,A,A,C,C,E)}}let g=new(v.count>=65535?Fl:Bl)(u,1);g.version=b;let h=a.get(f);h&&t.remove(h),a.set(f,g)}function d(f){let u=a.get(f);if(u){let p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return a.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function EC(e,t,n){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,p){e.drawElements(i,p,a,u*r),n.update(p,i,1)}function c(u,p,v){v!==0&&(e.drawElementsInstanced(i,p,a,u*r,v),n.update(p,i,v))}function d(u,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,u,0,v);let g=0;for(let h=0;h<v;h++)g+=p[h];n.update(g,i,1)}function f(u,p,v,b){if(v===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<u.length;h++)c(u[h]/r,p[h],b[h]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,a,u,0,b,0,v);let h=0;for(let m=0;m<v;m++)h+=p[m]*b[m];n.update(h,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function AC(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Dt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function wC(e,t,n){let i=new WeakMap,s=new Re;function a(r,o,l){let c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==f){let T=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],m=o.morphAttributes.color||[],_=0;p===!0&&(_=1),v===!0&&(_=2),b===!0&&(_=3);let S=o.attributes.position.count*_,E=1;S>t.maxTextureSize&&(E=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let A=new Float32Array(S*E*4*f),C=new Ol(A,S,E,f);C.type=li,C.needsUpdate=!0;let y=_*4;for(let I=0;I<f;I++){let R=g[I],O=h[I],P=m[I],H=S*E*4*I;for(let k=0;k<R.count;k++){let B=k*y;p===!0&&(s.fromBufferAttribute(R,k),A[H+B+0]=s.x,A[H+B+1]=s.y,A[H+B+2]=s.z,A[H+B+3]=0),v===!0&&(s.fromBufferAttribute(O,k),A[H+B+4]=s.x,A[H+B+5]=s.y,A[H+B+6]=s.z,A[H+B+7]=0),b===!0&&(s.fromBufferAttribute(P,k),A[H+B+8]=s.x,A[H+B+9]=s.y,A[H+B+10]=s.z,A[H+B+11]=P.itemSize===4?s.w:1)}}u={count:f,texture:C,size:new jt(S,E)},i.set(o,u),o.addEventListener("dispose",T)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let b=0;b<c.length;b++)p+=c[b];let v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",v),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function CC(e,t,n,i,s){let a=new WeakMap;function r(c){let d=s.render.frame,f=c.geometry,u=t.get(c,f);if(a.get(u)!==d&&(t.update(u),a.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){let p=c.skeleton;a.get(p)!==d&&(p.update(),a.set(p,d))}return u}function o(){a=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}var RC={[Sg]:"LINEAR_TONE_MAPPING",[bg]:"REINHARD_TONE_MAPPING",[Mg]:"CINEON_TONE_MAPPING",[nc]:"ACES_FILMIC_TONE_MAPPING",[Eg]:"AGX_TONE_MAPPING",[Ag]:"NEUTRAL_TONE_MAPPING",[Tg]:"CUSTOM_TONE_MAPPING"};function DC(e,t,n,i,s){let a=new Xn(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),r=new Xn(t,n,{type:zi,depthBuffer:!1,stencilBuffer:!1}),o=new oi;o.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new tn([0,2,0,0,2,0],2));let l=new Ih({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new de(o,l),d=new Ql(-1,1,1,-1,0,1),f=null,u=null,p=!1,v,b=null,g=[],h=!1;this.setSize=function(m,_){a.setSize(m,_),r.setSize(m,_);for(let S=0;S<g.length;S++){let E=g[S];E.setSize&&E.setSize(m,_)}},this.setEffects=function(m){g=m,h=g.length>0&&g[0].isRenderPass===!0;let _=a.width,S=a.height;for(let E=0;E<g.length;E++){let A=g[E];A.setSize&&A.setSize(_,S)}},this.begin=function(m,_){if(p||m.toneMapping===_i&&g.length===0)return!1;if(b=_,_!==null){let S=_.width,E=_.height;(a.width!==S||a.height!==E)&&this.setSize(S,E)}return h===!1&&m.setRenderTarget(a),v=m.toneMapping,m.toneMapping=_i,!0},this.hasRenderPass=function(){return h},this.end=function(m,_){m.toneMapping=v,p=!0;let S=a,E=r;for(let A=0;A<g.length;A++){let C=g[A];if(C.enabled!==!1&&(C.render(m,E,S,_),C.needsSwap!==!1)){let y=S;S=E,E=y}}if(f!==m.outputColorSpace||u!==m.toneMapping){f=m.outputColorSpace,u=m.toneMapping,l.defines={},Kt.getTransfer(f)===ie&&(l.defines.SRGB_TRANSFER="");let A=RC[u];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,m.setRenderTarget(b),m.render(c,d),b=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),l.dispose()}}var Ob=new Xe,qg=new aa(1,1),Pb=new Ol,Bb=new Uh,Fb=new Gl,vb=[],_b=[],yb=new Float32Array(16),xb=new Float32Array(9),Sb=new Float32Array(4);function bo(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=vb[s];if(a===void 0&&(a=new Float32Array(s),vb[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function Ye(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ze(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function qd(e,t){let n=_b[t];n===void 0&&(n=new Int32Array(t),_b[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function UC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function NC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2fv(this.addr,t),Ze(n,t)}}function LC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ye(n,t))return;e.uniform3fv(this.addr,t),Ze(n,t)}}function IC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4fv(this.addr,t),Ze(n,t)}}function OC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;Sb.set(i),e.uniformMatrix2fv(this.addr,!1,Sb),Ze(n,i)}}function PC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;xb.set(i),e.uniformMatrix3fv(this.addr,!1,xb),Ze(n,i)}}function BC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;yb.set(i),e.uniformMatrix4fv(this.addr,!1,yb),Ze(n,i)}}function FC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function zC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2iv(this.addr,t),Ze(n,t)}}function VC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ye(n,t))return;e.uniform3iv(this.addr,t),Ze(n,t)}}function HC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4iv(this.addr,t),Ze(n,t)}}function GC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function kC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2uiv(this.addr,t),Ze(n,t)}}function XC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ye(n,t))return;e.uniform3uiv(this.addr,t),Ze(n,t)}}function WC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4uiv(this.addr,t),Ze(n,t)}}function qC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(qg.compareFunction=n.isReversedDepthBuffer()?Vd:zd,a=qg):a=Ob,n.setTexture2D(t||a,s)}function YC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||Bb,s)}function ZC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Fb,s)}function JC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Pb,s)}function jC(e){switch(e){case 5126:return UC;case 35664:return NC;case 35665:return LC;case 35666:return IC;case 35674:return OC;case 35675:return PC;case 35676:return BC;case 5124:case 35670:return FC;case 35667:case 35671:return zC;case 35668:case 35672:return VC;case 35669:case 35673:return HC;case 5125:return GC;case 36294:return kC;case 36295:return XC;case 36296:return WC;case 35678:case 36198:case 36298:case 36306:case 35682:return qC;case 35679:case 36299:case 36307:return YC;case 35680:case 36300:case 36308:case 36293:return ZC;case 36289:case 36303:case 36311:case 36292:return JC}}function KC(e,t){e.uniform1fv(this.addr,t)}function QC(e,t){let n=bo(t,this.size,2);e.uniform2fv(this.addr,n)}function $C(e,t){let n=bo(t,this.size,3);e.uniform3fv(this.addr,n)}function tR(e,t){let n=bo(t,this.size,4);e.uniform4fv(this.addr,n)}function eR(e,t){let n=bo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function nR(e,t){let n=bo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function iR(e,t){let n=bo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function sR(e,t){e.uniform1iv(this.addr,t)}function aR(e,t){e.uniform2iv(this.addr,t)}function rR(e,t){e.uniform3iv(this.addr,t)}function oR(e,t){e.uniform4iv(this.addr,t)}function lR(e,t){e.uniform1uiv(this.addr,t)}function cR(e,t){e.uniform2uiv(this.addr,t)}function uR(e,t){e.uniform3uiv(this.addr,t)}function hR(e,t){e.uniform4uiv(this.addr,t)}function dR(e,t,n){let i=this.cache,s=t.length,a=qd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=qg:r=Ob;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function fR(e,t,n){let i=this.cache,s=t.length,a=qd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||Bb,a[r])}function pR(e,t,n){let i=this.cache,s=t.length,a=qd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||Fb,a[r])}function mR(e,t,n){let i=this.cache,s=t.length,a=qd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||Pb,a[r])}function gR(e){switch(e){case 5126:return KC;case 35664:return QC;case 35665:return $C;case 35666:return tR;case 35674:return eR;case 35675:return nR;case 35676:return iR;case 5124:case 35670:return sR;case 35667:case 35671:return aR;case 35668:case 35672:return rR;case 35669:case 35673:return oR;case 5125:return lR;case 36294:return cR;case 36295:return uR;case 36296:return hR;case 35678:case 36198:case 36298:case 36306:case 35682:return dR;case 35679:case 36299:case 36307:return fR;case 35680:case 36300:case 36308:case 36293:return pR;case 36289:case 36303:case 36311:case 36292:return mR}}var Yg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=jC(n.type)}},Zg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=gR(n.type)}},Jg=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Xg=/(\w+)(\])?(\[|\.)?/g;function bb(e,t){e.seq.push(t),e.map[t.id]=t}function vR(e,t,n){let i=e.name,s=i.length;for(Xg.lastIndex=0;;){let a=Xg.exec(i),r=Xg.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){bb(n,c===void 0?new Yg(o,e,t):new Zg(o,e,t));break}else{let f=n.map[o];f===void 0&&(f=new Jg(o),bb(n,f)),n=f}}}var xo=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);vR(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function Mb(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var _R=37297,yR=0;function xR(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var Tb=new Ft;function SR(e){Kt._getMatrix(Tb,Kt.workingColorSpace,e);let t=`mat3( ${Tb.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case Ll:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Eb(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+xR(e.getShaderSource(t),o)}else return a}function bR(e,t){let n=SR(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var MR={[Sg]:"Linear",[bg]:"Reinhard",[Mg]:"Cineon",[nc]:"ACESFilmic",[Eg]:"AgX",[Ag]:"Neutral",[Tg]:"Custom"};function TR(e,t){let n=MR[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Gd=new V;function ER(){Kt.getLuminanceCoefficients(Gd);let e=Gd.x.toFixed(4),t=Gd.y.toFixed(4),n=Gd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dc).join(`
`)}function wR(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function CR(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function dc(e){return e!==""}function Ab(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var RR=/^[ \t]*#include +<([\w\d./]+)>/gm;function jg(e){return e.replace(RR,UR)}var DR=new Map;function UR(e,t){let n=Vt[t];if(n===void 0){let i=DR.get(t);if(i!==void 0)n=Vt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return jg(n)}var NR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cb(e){return e.replace(NR,LR)}function LR(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Rb(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var IR={[ec]:"SHADOWMAP_TYPE_PCF",[go]:"SHADOWMAP_TYPE_VSM"};function OR(e){return IR[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var PR={[ha]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE",[ic]:"ENVMAP_TYPE_CUBE_UV"};function BR(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":PR[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var FR={[Ya]:"ENVMAP_MODE_REFRACTION"};function zR(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":FR[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var VR={[Jh]:"ENVMAP_BLENDING_MULTIPLY",[ZS]:"ENVMAP_BLENDING_MIX",[JS]:"ENVMAP_BLENDING_ADD"};function HR(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":VR[e.combine]||"ENVMAP_BLENDING_NONE"}function GR(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function kR(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=OR(n),c=BR(n),d=zR(n),f=HR(n),u=GR(n),p=AR(n),v=wR(a),b=s.createProgram(),g,h,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(dc).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(dc).join(`
`),h.length>0&&(h+=`
`)):(g=[Rb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dc).join(`
`),h=[Rb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_i?"#define TONE_MAPPING":"",n.toneMapping!==_i?Vt.tonemapping_pars_fragment:"",n.toneMapping!==_i?TR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,bR("linearToOutputTexel",n.outputColorSpace),ER(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(dc).join(`
`)),r=jg(r),r=Ab(r,n),r=wb(r,n),o=jg(o),o=Ab(o,n),o=wb(o,n),r=Cb(r),o=Cb(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===Ig?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ig?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let _=m+g+r,S=m+h+o,E=Mb(s,s.VERTEX_SHADER,_),A=Mb(s,s.FRAGMENT_SHADER,S);s.attachShader(b,E),s.attachShader(b,A),n.index0AttributeName!==void 0?s.bindAttribLocation(b,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function C(R){if(e.debug.checkShaderErrors){let O=s.getProgramInfoLog(b)||"",P=s.getShaderInfoLog(E)||"",H=s.getShaderInfoLog(A)||"",k=O.trim(),B=P.trim(),z=H.trim(),et=!0,Q=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(et=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,b,E,A);else{let lt=Eb(s,E,"vertex"),pt=Eb(s,A,"fragment");Dt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+lt+`
`+pt)}else k!==""?Ut("WebGLProgram: Program Info Log:",k):(B===""||z==="")&&(Q=!1);Q&&(R.diagnostics={runnable:et,programLog:k,vertexShader:{log:B,prefix:g},fragmentShader:{log:z,prefix:h}})}s.deleteShader(E),s.deleteShader(A),y=new xo(s,b),T=CR(s,b)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let I=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(b,_R)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yR++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=A,this}var XR=0,Kg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Qg(t),n.set(t,i)),i}},Qg=class{constructor(t){this.id=XR++,this.code=t,this.usedTimes=0}};function WR(e,t,n,i,s,a){let r=new Pl,o=new Kg,l=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer,u=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,T,I,R,O){let P=R.fog,H=O.geometry,k=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,z=t.get(y.envMap||k,B),et=z&&z.mapping===ic?z.image.height:null,Q=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Ut("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let lt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,pt=lt!==void 0?lt.length:0,ht=0;H.morphAttributes.position!==void 0&&(ht=1),H.morphAttributes.normal!==void 0&&(ht=2),H.morphAttributes.color!==void 0&&(ht=3);let Lt,oe,ge,Z;if(Q){let se=Hi[Q];Lt=se.vertexShader,oe=se.fragmentShader}else Lt=y.vertexShader,oe=y.fragmentShader,o.update(y),ge=o.getVertexShaderID(y),Z=o.getFragmentShaderID(y);let nt=e.getRenderTarget(),K=e.state.buffers.depth.getReversed(),Nt=O.isInstancedMesh===!0,Tt=O.isBatchedMesh===!0,wt=!!y.map,Ae=!!y.matcap,Yt=!!z,$t=!!y.aoMap,fe=!!y.lightMap,Ht=!!y.bumpMap,Le=!!y.normalMap,D=!!y.displacementMap,Fe=!!y.emissiveMap,ne=!!y.metalnessMap,ve=!!y.roughnessMap,St=y.anisotropy>0,w=y.clearcoat>0,x=y.dispersion>0,N=y.iridescence>0,Y=y.sheen>0,j=y.transmission>0,q=St&&!!y.anisotropyMap,gt=w&&!!y.clearcoatMap,at=w&&!!y.clearcoatNormalMap,At=w&&!!y.clearcoatRoughnessMap,Ct=N&&!!y.iridescenceMap,$=N&&!!y.iridescenceThicknessMap,it=Y&&!!y.sheenColorMap,vt=Y&&!!y.sheenRoughnessMap,yt=!!y.specularMap,dt=!!y.specularColorMap,Gt=!!y.specularIntensityMap,U=j&&!!y.transmissionMap,rt=j&&!!y.thicknessMap,st=!!y.gradientMap,mt=!!y.alphaMap,tt=y.alphaTest>0,W=!!y.alphaHash,_t=!!y.extensions,It=_i;y.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(It=e.toneMapping);let _e={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:Lt,fragmentShader:oe,defines:y.defines,customVertexShaderID:ge,customFragmentShaderID:Z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Tt,batchingColor:Tt&&O._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&O.instanceColor!==null,instancingMorph:Nt&&O.morphTexture!==null,outputColorSpace:nt===null?e.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Xa,alphaToCoverage:!!y.alphaToCoverage,map:wt,matcap:Ae,envMap:Yt,envMapMode:Yt&&z.mapping,envMapCubeUVHeight:et,aoMap:$t,lightMap:fe,bumpMap:Ht,normalMap:Le,displacementMap:D,emissiveMap:Fe,normalMapObjectSpace:Le&&y.normalMapType===QS,normalMapTangentSpace:Le&&y.normalMapType===Fd,metalnessMap:ne,roughnessMap:ve,anisotropy:St,anisotropyMap:q,clearcoat:w,clearcoatMap:gt,clearcoatNormalMap:at,clearcoatRoughnessMap:At,dispersion:x,iridescence:N,iridescenceMap:Ct,iridescenceThicknessMap:$,sheen:Y,sheenColorMap:it,sheenRoughnessMap:vt,specularMap:yt,specularColorMap:dt,specularIntensityMap:Gt,transmission:j,transmissionMap:U,thicknessMap:rt,gradientMap:st,opaque:y.transparent===!1&&y.blending===Ga&&y.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:W,combine:y.combine,mapUv:wt&&v(y.map.channel),aoMapUv:$t&&v(y.aoMap.channel),lightMapUv:fe&&v(y.lightMap.channel),bumpMapUv:Ht&&v(y.bumpMap.channel),normalMapUv:Le&&v(y.normalMap.channel),displacementMapUv:D&&v(y.displacementMap.channel),emissiveMapUv:Fe&&v(y.emissiveMap.channel),metalnessMapUv:ne&&v(y.metalnessMap.channel),roughnessMapUv:ve&&v(y.roughnessMap.channel),anisotropyMapUv:q&&v(y.anisotropyMap.channel),clearcoatMapUv:gt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:at&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:$&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:it&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:vt&&v(y.sheenRoughnessMap.channel),specularMapUv:yt&&v(y.specularMap.channel),specularColorMapUv:dt&&v(y.specularColorMap.channel),specularIntensityMapUv:Gt&&v(y.specularIntensityMap.channel),transmissionMapUv:U&&v(y.transmissionMap.channel),thicknessMapUv:rt&&v(y.thicknessMap.channel),alphaMapUv:mt&&v(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Le||St),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(wt||mt),fog:!!P,useFog:y.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&Le===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:K,skinning:O.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:ht,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:e.shadowMap.enabled&&I.length>0,shadowMapType:e.shadowMap.type,toneMapping:It,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&Kt.getTransfer(y.map.colorSpace)===ie,decodeVideoTextureEmissive:Fe&&y.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(y.emissiveMap.colorSpace)===ie,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Bi,flipSided:y.side===un,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:_t&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&y.extensions.multiDraw===!0||Tt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function g(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)T.push(I),T.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(h(T,y),m(T,y),T.push(e.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function h(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function m(y,T){r.disableAll(),T.instancing&&r.enable(0),T.instancingColor&&r.enable(1),T.instancingMorph&&r.enable(2),T.matcap&&r.enable(3),T.envMap&&r.enable(4),T.normalMapObjectSpace&&r.enable(5),T.normalMapTangentSpace&&r.enable(6),T.clearcoat&&r.enable(7),T.iridescence&&r.enable(8),T.alphaTest&&r.enable(9),T.vertexColors&&r.enable(10),T.vertexAlphas&&r.enable(11),T.vertexUv1s&&r.enable(12),T.vertexUv2s&&r.enable(13),T.vertexUv3s&&r.enable(14),T.vertexTangents&&r.enable(15),T.anisotropy&&r.enable(16),T.alphaHash&&r.enable(17),T.batching&&r.enable(18),T.dispersion&&r.enable(19),T.batchingColor&&r.enable(20),T.gradientMap&&r.enable(21),y.push(r.mask),r.disableAll(),T.fog&&r.enable(0),T.useFog&&r.enable(1),T.flatShading&&r.enable(2),T.logarithmicDepthBuffer&&r.enable(3),T.reversedDepthBuffer&&r.enable(4),T.skinning&&r.enable(5),T.morphTargets&&r.enable(6),T.morphNormals&&r.enable(7),T.morphColors&&r.enable(8),T.premultipliedAlpha&&r.enable(9),T.shadowMapEnabled&&r.enable(10),T.doubleSided&&r.enable(11),T.flipSided&&r.enable(12),T.useDepthPacking&&r.enable(13),T.dithering&&r.enable(14),T.transmission&&r.enable(15),T.sheen&&r.enable(16),T.opaque&&r.enable(17),T.pointsUvs&&r.enable(18),T.decodeVideoTexture&&r.enable(19),T.decodeVideoTextureEmissive&&r.enable(20),T.alphaToCoverage&&r.enable(21),y.push(r.mask)}function _(y){let T=p[y.type],I;if(T){let R=Hi[T];I=ub.clone(R.uniforms)}else I=y.uniforms;return I}function S(y,T){let I=d.get(T);return I!==void 0?++I.usedTimes:(I=new kR(e,T,y,s),c.push(I),d.set(T,I)),I}function E(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function A(y){o.remove(y)}function C(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:E,releaseShaderCache:A,programs:c,dispose:C}}function qR(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function YR(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Db(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Ub(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,v,b,g,h){let m=e[t];return m===void 0?(m={id:u.id,object:u,geometry:p,material:v,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:g,group:h},e[t]=m):(m.id=u.id,m.object=u,m.geometry=p,m.material=v,m.materialVariant=r(u),m.groupOrder=b,m.renderOrder=u.renderOrder,m.z=g,m.group=h),t++,m}function l(u,p,v,b,g,h){let m=o(u,p,v,b,g,h);v.transmission>0?i.push(m):v.transparent===!0?s.push(m):n.push(m)}function c(u,p,v,b,g,h){let m=o(u,p,v,b,g,h);v.transmission>0?i.unshift(m):v.transparent===!0?s.unshift(m):n.unshift(m)}function d(u,p){n.length>1&&n.sort(u||YR),i.length>1&&i.sort(p||Db),s.length>1&&s.sort(p||Db)}function f(){for(let u=t,p=e.length;u<p;u++){let v=e[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:f,sort:d}}function ZR(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new Ub,e.set(i,[r])):s>=a.length?(r=new Ub,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function JR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new zt};break;case"SpotLight":n={position:new V,direction:new V,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new zt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":n={color:new zt,position:new V,halfWidth:new V,halfHeight:new V};break}return e[t.id]=n,n}}}function jR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var KR=0;function QR(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function $R(e){let t=new JR,n=jR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);let s=new V,a=new Ee,r=new Ee;function o(c){let d=0,f=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,v=0,b=0,g=0,h=0,m=0,_=0,S=0,E=0,A=0,C=0;c.sort(QR);for(let T=0,I=c.length;T<I;T++){let R=c[T],O=R.color,P=R.intensity,H=R.distance,k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Za?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=O.r*P,f+=O.g*P,u+=O.b*P;else if(R.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(R.sh.coefficients[B],P);C++}else if(R.isDirectionalLight){let B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let z=R.shadow,et=n.get(R);et.shadowIntensity=z.intensity,et.shadowBias=z.bias,et.shadowNormalBias=z.normalBias,et.shadowRadius=z.radius,et.shadowMapSize=z.mapSize,i.directionalShadow[p]=et,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=R.shadow.matrix,m++}i.directional[p]=B,p++}else if(R.isSpotLight){let B=t.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(O).multiplyScalar(P),B.distance=H,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,i.spot[b]=B;let z=R.shadow;if(R.map&&(i.spotLightMap[E]=R.map,E++,z.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[b]=z.matrix,R.castShadow){let et=n.get(R);et.shadowIntensity=z.intensity,et.shadowBias=z.bias,et.shadowNormalBias=z.normalBias,et.shadowRadius=z.radius,et.shadowMapSize=z.mapSize,i.spotShadow[b]=et,i.spotShadowMap[b]=k,S++}b++}else if(R.isRectAreaLight){let B=t.get(R);B.color.copy(O).multiplyScalar(P),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=B,g++}else if(R.isPointLight){let B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){let z=R.shadow,et=n.get(R);et.shadowIntensity=z.intensity,et.shadowBias=z.bias,et.shadowNormalBias=z.normalBias,et.shadowRadius=z.radius,et.shadowMapSize=z.mapSize,et.shadowCameraNear=z.camera.near,et.shadowCameraFar=z.camera.far,i.pointShadow[v]=et,i.pointShadowMap[v]=k,i.pointShadowMatrix[v]=R.shadow.matrix,_++}i.point[v]=B,v++}else if(R.isHemisphereLight){let B=t.get(R);B.skyColor.copy(R.color).multiplyScalar(P),B.groundColor.copy(R.groundColor).multiplyScalar(P),i.hemi[h]=B,h++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;let y=i.hash;(y.directionalLength!==p||y.pointLength!==v||y.spotLength!==b||y.rectAreaLength!==g||y.hemiLength!==h||y.numDirectionalShadows!==m||y.numPointShadows!==_||y.numSpotShadows!==S||y.numSpotMaps!==E||y.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=g,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+E-A,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,y.directionalLength=p,y.pointLength=v,y.spotLength=b,y.rectAreaLength=g,y.hemiLength=h,y.numDirectionalShadows=m,y.numPointShadows=_,y.numSpotShadows=S,y.numSpotMaps=E,y.numLightProbes=C,i.version=KR++)}function l(c,d){let f=0,u=0,p=0,v=0,b=0,g=d.matrixWorldInverse;for(let h=0,m=c.length;h<m;h++){let _=c[h];if(_.isDirectionalLight){let S=i.directional[f];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(_.isSpotLight){let S=i.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),p++}else if(_.isRectAreaLight){let S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),r.identity(),a.copy(_.matrixWorld),a.premultiply(g),r.extractRotation(a),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),v++}else if(_.isPointLight){let S=i.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){let S=i.hemi[b];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),b++}}}return{setup:o,setupView:l,state:i}}function Nb(e){let t=new $R(e),n=[],i=[];function s(d){c.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function r(d){i.push(d)}function o(){t.setup(n)}function l(d){t.setupView(n,d)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function t2(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new Nb(e),t.set(s,[o])):a>=r.length?(o=new Nb(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var e2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n2=`uniform sampler2D shadow_pass;
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
}`,i2=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],s2=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Lb=new Ee,hc=new V,Wg=new V;function a2(e,t,n){let i=new po,s=new jt,a=new jt,r=new Re,o=new Oh,l=new Ph,c={},d=n.maxTextureSize,f={[ai]:un,[un]:ai,[Bi]:Bi},u=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:e2,fragmentShader:n2}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let v=new oi;v.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new de(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ec;let h=this.type;this.render=function(A,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===RS&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ec);let T=e.getRenderTarget(),I=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),O=e.state;O.setBlending(Fi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let P=h!==this.type;P&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(k=>k.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,k=A.length;H<k;H++){let B=A[H],z=B.shadow;if(z===void 0){Ut("WebGLShadowMap:",B,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let et=z.getFrameExtents();s.multiply(et),a.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/et.x),s.x=a.x*et.x,z.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/et.y),s.y=a.y*et.y,z.mapSize.y=a.y));let Q=e.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Q,z.map===null||P===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===go){if(B.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Xn(s.x,s.y,{format:Za,type:zi,minFilter:cn,magFilter:cn,generateMipmaps:!1}),z.map.texture.name=B.name+".shadowMap",z.map.depthTexture=new aa(s.x,s.y,li),z.map.depthTexture.name=B.name+".shadowMapDepth",z.map.depthTexture.format=Ni,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Be,z.map.depthTexture.magFilter=Be}else B.isPointLight?(z.map=new kd(s.x),z.map.depthTexture=new Lh(s.x,yi)):(z.map=new Xn(s.x,s.y),z.map.depthTexture=new aa(s.x,s.y,yi)),z.map.depthTexture.name=B.name+".shadowMap",z.map.depthTexture.format=Ni,this.type===ec?(z.map.depthTexture.compareFunction=Q?Vd:zd,z.map.depthTexture.minFilter=cn,z.map.depthTexture.magFilter=cn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Be,z.map.depthTexture.magFilter=Be);z.camera.updateProjectionMatrix()}let lt=z.map.isWebGLCubeRenderTarget?6:1;for(let pt=0;pt<lt;pt++){if(z.map.isWebGLCubeRenderTarget)e.setRenderTarget(z.map,pt),e.clear();else{pt===0&&(e.setRenderTarget(z.map),e.clear());let ht=z.getViewport(pt);r.set(a.x*ht.x,a.y*ht.y,a.x*ht.z,a.y*ht.w),O.viewport(r)}if(B.isPointLight){let ht=z.camera,Lt=z.matrix,oe=B.distance||ht.far;oe!==ht.far&&(ht.far=oe,ht.updateProjectionMatrix()),hc.setFromMatrixPosition(B.matrixWorld),ht.position.copy(hc),Wg.copy(ht.position),Wg.add(i2[pt]),ht.up.copy(s2[pt]),ht.lookAt(Wg),ht.updateMatrixWorld(),Lt.makeTranslation(-hc.x,-hc.y,-hc.z),Lb.multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Lb,ht.coordinateSystem,ht.reversedDepth)}else z.updateMatrices(B);i=z.getFrustum(),S(C,y,z.camera,B,this.type)}z.isPointLightShadow!==!0&&this.type===go&&m(z,y),z.needsUpdate=!1}h=this.type,g.needsUpdate=!1,e.setRenderTarget(T,I,R)};function m(A,C){let y=t.update(b);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Xn(s.x,s.y,{format:Za,type:zi})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(C,null,y,u,b,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(C,null,y,p,b,null)}function _(A,C,y,T){let I=null,R=y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)I=R;else if(I=y.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let O=I.uuid,P=C.uuid,H=c[O];H===void 0&&(H={},c[O]=H);let k=H[P];k===void 0&&(k=I.clone(),H[P]=k,C.addEventListener("dispose",E)),I=k}if(I.visible=C.visible,I.wireframe=C.wireframe,T===go?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:f[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=e.properties.get(I);O.light=y}return I}function S(A,C,y,T,I){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&I===go)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,A.matrixWorld);let P=t.update(A),H=A.material;if(Array.isArray(H)){let k=P.groups;for(let B=0,z=k.length;B<z;B++){let et=k[B],Q=H[et.materialIndex];if(Q&&Q.visible){let lt=_(A,Q,T,I);A.onBeforeShadow(e,A,C,y,P,lt,et),e.renderBufferDirect(y,null,P,lt,A,et),A.onAfterShadow(e,A,C,y,P,lt,et)}}}else if(H.visible){let k=_(A,H,T,I);A.onBeforeShadow(e,A,C,y,P,k,null),e.renderBufferDirect(y,null,P,k,A,null),A.onAfterShadow(e,A,C,y,P,k,null)}}let O=A.children;for(let P=0,H=O.length;P<H;P++)S(O[P],C,y,T,I)}function E(A){A.target.removeEventListener("dispose",E);for(let y in c){let T=c[y],I=A.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function r2(e,t){function n(){let U=!1,rt=new Re,st=null,mt=new Re(0,0,0,0);return{setMask:function(tt){st!==tt&&!U&&(e.colorMask(tt,tt,tt,tt),st=tt)},setLocked:function(tt){U=tt},setClear:function(tt,W,_t,It,_e){_e===!0&&(tt*=It,W*=It,_t*=It),rt.set(tt,W,_t,It),mt.equals(rt)===!1&&(e.clearColor(tt,W,_t,It),mt.copy(rt))},reset:function(){U=!1,st=null,mt.set(-1,0,0,0)}}}function i(){let U=!1,rt=!1,st=null,mt=null,tt=null;return{setReversed:function(W){if(rt!==W){let _t=t.get("EXT_clip_control");W?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),rt=W;let It=tt;tt=null,this.setClear(It)}},getReversed:function(){return rt},setTest:function(W){W?nt(e.DEPTH_TEST):K(e.DEPTH_TEST)},setMask:function(W){st!==W&&!U&&(e.depthMask(W),st=W)},setFunc:function(W){if(rt&&(W=lb[W]),mt!==W){switch(W){case _h:e.depthFunc(e.NEVER);break;case yh:e.depthFunc(e.ALWAYS);break;case xh:e.depthFunc(e.LESS);break;case ka:e.depthFunc(e.LEQUAL);break;case Sh:e.depthFunc(e.EQUAL);break;case bh:e.depthFunc(e.GEQUAL);break;case Mh:e.depthFunc(e.GREATER);break;case Th:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}mt=W}},setLocked:function(W){U=W},setClear:function(W){tt!==W&&(tt=W,rt&&(W=1-W),e.clearDepth(W))},reset:function(){U=!1,st=null,mt=null,tt=null,rt=!1}}}function s(){let U=!1,rt=null,st=null,mt=null,tt=null,W=null,_t=null,It=null,_e=null;return{setTest:function(se){U||(se?nt(e.STENCIL_TEST):K(e.STENCIL_TEST))},setMask:function(se){rt!==se&&!U&&(e.stencilMask(se),rt=se)},setFunc:function(se,Gi,ki){(st!==se||mt!==Gi||tt!==ki)&&(e.stencilFunc(se,Gi,ki),st=se,mt=Gi,tt=ki)},setOp:function(se,Gi,ki){(W!==se||_t!==Gi||It!==ki)&&(e.stencilOp(se,Gi,ki),W=se,_t=Gi,It=ki)},setLocked:function(se){U=se},setClear:function(se){_e!==se&&(e.clearStencil(se),_e=se)},reset:function(){U=!1,rt=null,st=null,mt=null,tt=null,W=null,_t=null,It=null,_e=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},f={},u=new WeakMap,p=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,E=null,A=null,C=new zt(0,0,0),y=0,T=!1,I=null,R=null,O=null,P=null,H=null,k=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,z=0,et=e.getParameter(e.VERSION);et.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(et)[1]),B=z>=1):et.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),B=z>=2);let Q=null,lt={},pt=e.getParameter(e.SCISSOR_BOX),ht=e.getParameter(e.VIEWPORT),Lt=new Re().fromArray(pt),oe=new Re().fromArray(ht);function ge(U,rt,st,mt){let tt=new Uint8Array(4),W=e.createTexture();e.bindTexture(U,W),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _t=0;_t<st;_t++)U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY?e.texImage3D(rt,0,e.RGBA,1,1,mt,0,e.RGBA,e.UNSIGNED_BYTE,tt):e.texImage2D(rt+_t,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,tt);return W}let Z={};Z[e.TEXTURE_2D]=ge(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=ge(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=ge(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=ge(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),nt(e.DEPTH_TEST),r.setFunc(ka),Ht(!1),Le(vg),nt(e.CULL_FACE),$t(Fi);function nt(U){d[U]!==!0&&(e.enable(U),d[U]=!0)}function K(U){d[U]!==!1&&(e.disable(U),d[U]=!1)}function Nt(U,rt){return f[U]!==rt?(e.bindFramebuffer(U,rt),f[U]=rt,U===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=rt),U===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=rt),!0):!1}function Tt(U,rt){let st=p,mt=!1;if(U){st=u.get(rt),st===void 0&&(st=[],u.set(rt,st));let tt=U.textures;if(st.length!==tt.length||st[0]!==e.COLOR_ATTACHMENT0){for(let W=0,_t=tt.length;W<_t;W++)st[W]=e.COLOR_ATTACHMENT0+W;st.length=tt.length,mt=!0}}else st[0]!==e.BACK&&(st[0]=e.BACK,mt=!0);mt&&e.drawBuffers(st)}function wt(U){return v!==U?(e.useProgram(U),v=U,!0):!1}let Ae={[ia]:e.FUNC_ADD,[US]:e.FUNC_SUBTRACT,[NS]:e.FUNC_REVERSE_SUBTRACT};Ae[LS]=e.MIN,Ae[IS]=e.MAX;let Yt={[OS]:e.ZERO,[PS]:e.ONE,[BS]:e.SRC_COLOR,[gh]:e.SRC_ALPHA,[kS]:e.SRC_ALPHA_SATURATE,[HS]:e.DST_COLOR,[zS]:e.DST_ALPHA,[FS]:e.ONE_MINUS_SRC_COLOR,[vh]:e.ONE_MINUS_SRC_ALPHA,[GS]:e.ONE_MINUS_DST_COLOR,[VS]:e.ONE_MINUS_DST_ALPHA,[XS]:e.CONSTANT_COLOR,[WS]:e.ONE_MINUS_CONSTANT_COLOR,[qS]:e.CONSTANT_ALPHA,[YS]:e.ONE_MINUS_CONSTANT_ALPHA};function $t(U,rt,st,mt,tt,W,_t,It,_e,se){if(U===Fi){b===!0&&(K(e.BLEND),b=!1);return}if(b===!1&&(nt(e.BLEND),b=!0),U!==DS){if(U!==g||se!==T){if((h!==ia||S!==ia)&&(e.blendEquation(e.FUNC_ADD),h=ia,S=ia),se)switch(U){case Ga:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case _g:e.blendFunc(e.ONE,e.ONE);break;case yg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case xg:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Dt("WebGLState: Invalid blending: ",U);break}else switch(U){case Ga:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case _g:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case yg:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xg:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",U);break}m=null,_=null,E=null,A=null,C.set(0,0,0),y=0,g=U,T=se}return}tt=tt||rt,W=W||st,_t=_t||mt,(rt!==h||tt!==S)&&(e.blendEquationSeparate(Ae[rt],Ae[tt]),h=rt,S=tt),(st!==m||mt!==_||W!==E||_t!==A)&&(e.blendFuncSeparate(Yt[st],Yt[mt],Yt[W],Yt[_t]),m=st,_=mt,E=W,A=_t),(It.equals(C)===!1||_e!==y)&&(e.blendColor(It.r,It.g,It.b,_e),C.copy(It),y=_e),g=U,T=!1}function fe(U,rt){U.side===Bi?K(e.CULL_FACE):nt(e.CULL_FACE);let st=U.side===un;rt&&(st=!st),Ht(st),U.blending===Ga&&U.transparent===!1?$t(Fi):$t(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);let mt=U.stencilWrite;o.setTest(mt),mt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Fe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(e.SAMPLE_ALPHA_TO_COVERAGE):K(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(U){I!==U&&(U?e.frontFace(e.CW):e.frontFace(e.CCW),I=U)}function Le(U){U!==wS?(nt(e.CULL_FACE),U!==R&&(U===vg?e.cullFace(e.BACK):U===CS?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):K(e.CULL_FACE),R=U}function D(U){U!==O&&(B&&e.lineWidth(U),O=U)}function Fe(U,rt,st){U?(nt(e.POLYGON_OFFSET_FILL),(P!==rt||H!==st)&&(P=rt,H=st,r.getReversed()&&(rt=-rt),e.polygonOffset(rt,st))):K(e.POLYGON_OFFSET_FILL)}function ne(U){U?nt(e.SCISSOR_TEST):K(e.SCISSOR_TEST)}function ve(U){U===void 0&&(U=e.TEXTURE0+k-1),Q!==U&&(e.activeTexture(U),Q=U)}function St(U,rt,st){st===void 0&&(Q===null?st=e.TEXTURE0+k-1:st=Q);let mt=lt[st];mt===void 0&&(mt={type:void 0,texture:void 0},lt[st]=mt),(mt.type!==U||mt.texture!==rt)&&(Q!==st&&(e.activeTexture(st),Q=st),e.bindTexture(U,rt||Z[U]),mt.type=U,mt.texture=rt)}function w(){let U=lt[Q];U!==void 0&&U.type!==void 0&&(e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{e.compressedTexImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function N(){try{e.compressedTexImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function Y(){try{e.texSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function j(){try{e.texSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function q(){try{e.compressedTexSubImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function gt(){try{e.compressedTexSubImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function at(){try{e.texStorage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function At(){try{e.texStorage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function Ct(){try{e.texImage2D(...arguments)}catch(U){Dt("WebGLState:",U)}}function $(){try{e.texImage3D(...arguments)}catch(U){Dt("WebGLState:",U)}}function it(U){Lt.equals(U)===!1&&(e.scissor(U.x,U.y,U.z,U.w),Lt.copy(U))}function vt(U){oe.equals(U)===!1&&(e.viewport(U.x,U.y,U.z,U.w),oe.copy(U))}function yt(U,rt){let st=c.get(rt);st===void 0&&(st=new WeakMap,c.set(rt,st));let mt=st.get(U);mt===void 0&&(mt=e.getUniformBlockIndex(rt,U.name),st.set(U,mt))}function dt(U,rt){let mt=c.get(rt).get(U);l.get(rt)!==mt&&(e.uniformBlockBinding(rt,mt,U.__bindingPointIndex),l.set(rt,mt))}function Gt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),d={},Q=null,lt={},f={},u=new WeakMap,p=[],v=null,b=!1,g=null,h=null,m=null,_=null,S=null,E=null,A=null,C=new zt(0,0,0),y=0,T=!1,I=null,R=null,O=null,P=null,H=null,Lt.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:nt,disable:K,bindFramebuffer:Nt,drawBuffers:Tt,useProgram:wt,setBlending:$t,setMaterial:fe,setFlipSided:Ht,setCullFace:Le,setLineWidth:D,setPolygonOffset:Fe,setScissorTest:ne,activeTexture:ve,bindTexture:St,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:N,texImage2D:Ct,texImage3D:$,updateUBOMapping:yt,uniformBlockBinding:dt,texStorage2D:at,texStorage3D:At,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:q,compressedTexSubImage3D:gt,scissor:it,viewport:vt,reset:Gt}}function o2(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new jt,d=new WeakMap,f,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,x){return p?new OffscreenCanvas(w,x):co("canvas")}function b(w,x,N){let Y=1,j=St(w);if((j.width>N||j.height>N)&&(Y=N/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let q=Math.floor(Y*j.width),gt=Math.floor(Y*j.height);f===void 0&&(f=v(q,gt));let at=x?v(q,gt):f;return at.width=q,at.height=gt,at.getContext("2d").drawImage(w,0,0,q,gt),Ut("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+q+"x"+gt+")."),at}else return"data"in w&&Ut("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function g(w){return w.generateMipmaps}function h(w){e.generateMipmap(w)}function m(w){return w.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?e.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(w,x,N,Y,j=!1){if(w!==null){if(e[w]!==void 0)return e[w];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=x;if(x===e.RED&&(N===e.FLOAT&&(q=e.R32F),N===e.HALF_FLOAT&&(q=e.R16F),N===e.UNSIGNED_BYTE&&(q=e.R8)),x===e.RED_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.R8UI),N===e.UNSIGNED_SHORT&&(q=e.R16UI),N===e.UNSIGNED_INT&&(q=e.R32UI),N===e.BYTE&&(q=e.R8I),N===e.SHORT&&(q=e.R16I),N===e.INT&&(q=e.R32I)),x===e.RG&&(N===e.FLOAT&&(q=e.RG32F),N===e.HALF_FLOAT&&(q=e.RG16F),N===e.UNSIGNED_BYTE&&(q=e.RG8)),x===e.RG_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RG8UI),N===e.UNSIGNED_SHORT&&(q=e.RG16UI),N===e.UNSIGNED_INT&&(q=e.RG32UI),N===e.BYTE&&(q=e.RG8I),N===e.SHORT&&(q=e.RG16I),N===e.INT&&(q=e.RG32I)),x===e.RGB_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RGB8UI),N===e.UNSIGNED_SHORT&&(q=e.RGB16UI),N===e.UNSIGNED_INT&&(q=e.RGB32UI),N===e.BYTE&&(q=e.RGB8I),N===e.SHORT&&(q=e.RGB16I),N===e.INT&&(q=e.RGB32I)),x===e.RGBA_INTEGER&&(N===e.UNSIGNED_BYTE&&(q=e.RGBA8UI),N===e.UNSIGNED_SHORT&&(q=e.RGBA16UI),N===e.UNSIGNED_INT&&(q=e.RGBA32UI),N===e.BYTE&&(q=e.RGBA8I),N===e.SHORT&&(q=e.RGBA16I),N===e.INT&&(q=e.RGBA32I)),x===e.RGB&&(N===e.UNSIGNED_INT_5_9_9_9_REV&&(q=e.RGB9_E5),N===e.UNSIGNED_INT_10F_11F_11F_REV&&(q=e.R11F_G11F_B10F)),x===e.RGBA){let gt=j?Ll:Kt.getTransfer(Y);N===e.FLOAT&&(q=e.RGBA32F),N===e.HALF_FLOAT&&(q=e.RGBA16F),N===e.UNSIGNED_BYTE&&(q=gt===ie?e.SRGB8_ALPHA8:e.RGBA8),N===e.UNSIGNED_SHORT_4_4_4_4&&(q=e.RGBA4),N===e.UNSIGNED_SHORT_5_5_5_1&&(q=e.RGB5_A1)}return(q===e.R16F||q===e.R32F||q===e.RG16F||q===e.RG32F||q===e.RGBA16F||q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function S(w,x){let N;return w?x===null||x===yi||x===_o?N=e.DEPTH24_STENCIL8:x===li?N=e.DEPTH32F_STENCIL8:x===vo&&(N=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===yi||x===_o?N=e.DEPTH_COMPONENT24:x===li?N=e.DEPTH_COMPONENT32F:x===vo&&(N=e.DEPTH_COMPONENT16),N}function E(w,x){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Be&&w.minFilter!==cn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function A(w){let x=w.target;x.removeEventListener("dispose",A),y(x),x.isVideoTexture&&d.delete(x)}function C(w){let x=w.target;x.removeEventListener("dispose",C),I(x)}function y(w){let x=i.get(w);if(x.__webglInit===void 0)return;let N=w.source,Y=u.get(N);if(Y){let j=Y[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&T(w),Object.keys(Y).length===0&&u.delete(N)}i.remove(w)}function T(w){let x=i.get(w);e.deleteTexture(x.__webglTexture);let N=w.source,Y=u.get(N);delete Y[x.__cacheKey],r.memory.textures--}function I(w){let x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let j=0;j<x.__webglFramebuffer[Y].length;j++)e.deleteFramebuffer(x.__webglFramebuffer[Y][j]);else e.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)e.deleteFramebuffer(x.__webglFramebuffer[Y]);else e.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&e.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&e.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&e.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let N=w.textures;for(let Y=0,j=N.length;Y<j;Y++){let q=i.get(N[Y]);q.__webglTexture&&(e.deleteTexture(q.__webglTexture),r.memory.textures--),i.remove(N[Y])}i.remove(w)}let R=0;function O(){R=0}function P(){let w=R;return w>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),R+=1,w}function H(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function k(w,x){let N=i.get(w);if(w.isVideoTexture&&ne(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&N.__version!==w.version){let Y=w.image;if(Y===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Z(N,w,x);return}}else w.isExternalTexture&&(N.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,N.__webglTexture,e.TEXTURE0+x)}function B(w,x){let N=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){Z(N,w,x);return}else w.isExternalTexture&&(N.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,N.__webglTexture,e.TEXTURE0+x)}function z(w,x){let N=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){Z(N,w,x);return}n.bindTexture(e.TEXTURE_3D,N.__webglTexture,e.TEXTURE0+x)}function et(w,x){let N=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&N.__version!==w.version){nt(N,w,x);return}n.bindTexture(e.TEXTURE_CUBE_MAP,N.__webglTexture,e.TEXTURE0+x)}let Q={[Eh]:e.REPEAT,[Ui]:e.CLAMP_TO_EDGE,[Ah]:e.MIRRORED_REPEAT},lt={[Be]:e.NEAREST,[jS]:e.NEAREST_MIPMAP_NEAREST,[sc]:e.NEAREST_MIPMAP_LINEAR,[cn]:e.LINEAR,[Qh]:e.LINEAR_MIPMAP_NEAREST,[da]:e.LINEAR_MIPMAP_LINEAR},pt={[$S]:e.NEVER,[sb]:e.ALWAYS,[tb]:e.LESS,[zd]:e.LEQUAL,[eb]:e.EQUAL,[Vd]:e.GEQUAL,[nb]:e.GREATER,[ib]:e.NOTEQUAL};function ht(w,x){if(x.type===li&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===cn||x.magFilter===Qh||x.magFilter===sc||x.magFilter===da||x.minFilter===cn||x.minFilter===Qh||x.minFilter===sc||x.minFilter===da)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(w,e.TEXTURE_WRAP_S,Q[x.wrapS]),e.texParameteri(w,e.TEXTURE_WRAP_T,Q[x.wrapT]),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,Q[x.wrapR]),e.texParameteri(w,e.TEXTURE_MAG_FILTER,lt[x.magFilter]),e.texParameteri(w,e.TEXTURE_MIN_FILTER,lt[x.minFilter]),x.compareFunction&&(e.texParameteri(w,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(w,e.TEXTURE_COMPARE_FUNC,pt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Be||x.minFilter!==sc&&x.minFilter!==da||x.type===li&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");e.texParameterf(w,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Lt(w,x){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",A));let Y=x.source,j=u.get(Y);j===void 0&&(j={},u.set(Y,j));let q=H(x);if(q!==w.__cacheKey){j[q]===void 0&&(j[q]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,N=!0),j[q].usedTimes++;let gt=j[w.__cacheKey];gt!==void 0&&(j[w.__cacheKey].usedTimes--,gt.usedTimes===0&&T(x)),w.__cacheKey=q,w.__webglTexture=j[q].texture}return N}function oe(w,x,N){return Math.floor(Math.floor(w/N)/x)}function ge(w,x,N,Y){let q=w.updateRanges;if(q.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,x.width,x.height,N,Y,x.data);else{q.sort(($,it)=>$.start-it.start);let gt=0;for(let $=1;$<q.length;$++){let it=q[gt],vt=q[$],yt=it.start+it.count,dt=oe(vt.start,x.width,4),Gt=oe(it.start,x.width,4);vt.start<=yt+1&&dt===Gt&&oe(vt.start+vt.count-1,x.width,4)===dt?it.count=Math.max(it.count,vt.start+vt.count-it.start):(++gt,q[gt]=vt)}q.length=gt+1;let at=e.getParameter(e.UNPACK_ROW_LENGTH),At=e.getParameter(e.UNPACK_SKIP_PIXELS),Ct=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,x.width);for(let $=0,it=q.length;$<it;$++){let vt=q[$],yt=Math.floor(vt.start/4),dt=Math.ceil(vt.count/4),Gt=yt%x.width,U=Math.floor(yt/x.width),rt=dt,st=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Gt),e.pixelStorei(e.UNPACK_SKIP_ROWS,U),n.texSubImage2D(e.TEXTURE_2D,0,Gt,U,rt,st,N,Y,x.data)}w.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,at),e.pixelStorei(e.UNPACK_SKIP_PIXELS,At),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ct)}}function Z(w,x,N){let Y=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=e.TEXTURE_3D);let j=Lt(w,x),q=x.source;n.bindTexture(Y,w.__webglTexture,e.TEXTURE0+N);let gt=i.get(q);if(q.version!==gt.__version||j===!0){n.activeTexture(e.TEXTURE0+N);let at=Kt.getPrimaries(Kt.workingColorSpace),At=x.colorSpace===ys?null:Kt.getPrimaries(x.colorSpace),Ct=x.colorSpace===ys||at===At?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let $=b(x.image,!1,s.maxTextureSize);$=ve(x,$);let it=a.convert(x.format,x.colorSpace),vt=a.convert(x.type),yt=_(x.internalFormat,it,vt,x.colorSpace,x.isVideoTexture);ht(Y,x);let dt,Gt=x.mipmaps,U=x.isVideoTexture!==!0,rt=gt.__version===void 0||j===!0,st=q.dataReady,mt=E(x,$);if(x.isDepthTexture)yt=S(x.format===fa,x.type),rt&&(U?n.texStorage2D(e.TEXTURE_2D,1,yt,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,yt,$.width,$.height,0,it,vt,null));else if(x.isDataTexture)if(Gt.length>0){U&&rt&&n.texStorage2D(e.TEXTURE_2D,mt,yt,Gt[0].width,Gt[0].height);for(let tt=0,W=Gt.length;tt<W;tt++)dt=Gt[tt],U?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,vt,dt.data):n.texImage2D(e.TEXTURE_2D,tt,yt,dt.width,dt.height,0,it,vt,dt.data);x.generateMipmaps=!1}else U?(rt&&n.texStorage2D(e.TEXTURE_2D,mt,yt,$.width,$.height),st&&ge(x,$,it,vt)):n.texImage2D(e.TEXTURE_2D,0,yt,$.width,$.height,0,it,vt,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,yt,Gt[0].width,Gt[0].height,$.depth);for(let tt=0,W=Gt.length;tt<W;tt++)if(dt=Gt[tt],x.format!==ci)if(it!==null)if(U){if(st)if(x.layerUpdates.size>0){let _t=zg(dt.width,dt.height,x.format,x.type);for(let It of x.layerUpdates){let _e=dt.data.subarray(It*_t/dt.data.BYTES_PER_ELEMENT,(It+1)*_t/dt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,It,dt.width,dt.height,1,it,_e)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,$.depth,it,dt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,tt,yt,dt.width,dt.height,$.depth,0,dt.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?st&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,$.depth,it,vt,dt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,tt,yt,dt.width,dt.height,$.depth,0,it,vt,dt.data)}else{U&&rt&&n.texStorage2D(e.TEXTURE_2D,mt,yt,Gt[0].width,Gt[0].height);for(let tt=0,W=Gt.length;tt<W;tt++)dt=Gt[tt],x.format!==ci?it!==null?U?st&&n.compressedTexSubImage2D(e.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,dt.data):n.compressedTexImage2D(e.TEXTURE_2D,tt,yt,dt.width,dt.height,0,dt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,vt,dt.data):n.texImage2D(e.TEXTURE_2D,tt,yt,dt.width,dt.height,0,it,vt,dt.data)}else if(x.isDataArrayTexture)if(U){if(rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,yt,$.width,$.height,$.depth),st)if(x.layerUpdates.size>0){let tt=zg($.width,$.height,x.format,x.type);for(let W of x.layerUpdates){let _t=$.data.subarray(W*tt/$.data.BYTES_PER_ELEMENT,(W+1)*tt/$.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,$.width,$.height,1,it,vt,_t)}x.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,it,vt,$.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,yt,$.width,$.height,$.depth,0,it,vt,$.data);else if(x.isData3DTexture)U?(rt&&n.texStorage3D(e.TEXTURE_3D,mt,yt,$.width,$.height,$.depth),st&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,it,vt,$.data)):n.texImage3D(e.TEXTURE_3D,0,yt,$.width,$.height,$.depth,0,it,vt,$.data);else if(x.isFramebufferTexture){if(rt)if(U)n.texStorage2D(e.TEXTURE_2D,mt,yt,$.width,$.height);else{let tt=$.width,W=$.height;for(let _t=0;_t<mt;_t++)n.texImage2D(e.TEXTURE_2D,_t,yt,tt,W,0,it,vt,null),tt>>=1,W>>=1}}else if(Gt.length>0){if(U&&rt){let tt=St(Gt[0]);n.texStorage2D(e.TEXTURE_2D,mt,yt,tt.width,tt.height)}for(let tt=0,W=Gt.length;tt<W;tt++)dt=Gt[tt],U?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,it,vt,dt):n.texImage2D(e.TEXTURE_2D,tt,yt,it,vt,dt);x.generateMipmaps=!1}else if(U){if(rt){let tt=St($);n.texStorage2D(e.TEXTURE_2D,mt,yt,tt.width,tt.height)}st&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,it,vt,$)}else n.texImage2D(e.TEXTURE_2D,0,yt,it,vt,$);g(x)&&h(Y),gt.__version=q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function nt(w,x,N){if(x.image.length!==6)return;let Y=Lt(w,x),j=x.source;n.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+N);let q=i.get(j);if(j.version!==q.__version||Y===!0){n.activeTexture(e.TEXTURE0+N);let gt=Kt.getPrimaries(Kt.workingColorSpace),at=x.colorSpace===ys?null:Kt.getPrimaries(x.colorSpace),At=x.colorSpace===ys||gt===at?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Ct=x.isCompressedTexture||x.image[0].isCompressedTexture,$=x.image[0]&&x.image[0].isDataTexture,it=[];for(let W=0;W<6;W++)!Ct&&!$?it[W]=b(x.image[W],!0,s.maxCubemapSize):it[W]=$?x.image[W].image:x.image[W],it[W]=ve(x,it[W]);let vt=it[0],yt=a.convert(x.format,x.colorSpace),dt=a.convert(x.type),Gt=_(x.internalFormat,yt,dt,x.colorSpace),U=x.isVideoTexture!==!0,rt=q.__version===void 0||Y===!0,st=j.dataReady,mt=E(x,vt);ht(e.TEXTURE_CUBE_MAP,x);let tt;if(Ct){U&&rt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Gt,vt.width,vt.height);for(let W=0;W<6;W++){tt=it[W].mipmaps;for(let _t=0;_t<tt.length;_t++){let It=tt[_t];x.format!==ci?yt!==null?U?st&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t,0,0,It.width,It.height,yt,It.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t,Gt,It.width,It.height,0,It.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t,0,0,It.width,It.height,yt,dt,It.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t,Gt,It.width,It.height,0,yt,dt,It.data)}}}else{if(tt=x.mipmaps,U&&rt){tt.length>0&&mt++;let W=St(it[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Gt,W.width,W.height)}for(let W=0;W<6;W++)if($){U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,it[W].width,it[W].height,yt,dt,it[W].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Gt,it[W].width,it[W].height,0,yt,dt,it[W].data);for(let _t=0;_t<tt.length;_t++){let _e=tt[_t].image[W].image;U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t+1,0,0,_e.width,_e.height,yt,dt,_e.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t+1,Gt,_e.width,_e.height,0,yt,dt,_e.data)}}else{U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,yt,dt,it[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Gt,yt,dt,it[W]);for(let _t=0;_t<tt.length;_t++){let It=tt[_t];U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t+1,0,0,yt,dt,It.image[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,_t+1,Gt,yt,dt,It.image[W])}}}g(x)&&h(e.TEXTURE_CUBE_MAP),q.__version=j.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function K(w,x,N,Y,j,q){let gt=a.convert(N.format,N.colorSpace),at=a.convert(N.type),At=_(N.internalFormat,gt,at,N.colorSpace),Ct=i.get(x),$=i.get(N);if($.__renderTarget=x,!Ct.__hasExternalTextures){let it=Math.max(1,x.width>>q),vt=Math.max(1,x.height>>q);j===e.TEXTURE_3D||j===e.TEXTURE_2D_ARRAY?n.texImage3D(j,q,At,it,vt,x.depth,0,gt,at,null):n.texImage2D(j,q,At,it,vt,0,gt,at,null)}n.bindFramebuffer(e.FRAMEBUFFER,w),Fe(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,j,$.__webglTexture,0,D(x)):(j===e.TEXTURE_2D||j>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Y,j,$.__webglTexture,q),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Nt(w,x,N){if(e.bindRenderbuffer(e.RENDERBUFFER,w),x.depthBuffer){let Y=x.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,q=S(x.stencilBuffer,j),gt=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Fe(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(x),q,x.width,x.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(x),q,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,q,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,gt,e.RENDERBUFFER,w)}else{let Y=x.textures;for(let j=0;j<Y.length;j++){let q=Y[j],gt=a.convert(q.format,q.colorSpace),at=a.convert(q.type),At=_(q.internalFormat,gt,at,q.colorSpace);Fe(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,D(x),At,x.width,x.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,D(x),At,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,At,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Tt(w,x,N){let Y=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=i.get(x.depthTexture);if(j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),ht(e.TEXTURE_CUBE_MAP,x.depthTexture);let Ct=a.convert(x.depthTexture.format),$=a.convert(x.depthTexture.type),it;x.depthTexture.format===Ni?it=e.DEPTH_COMPONENT24:x.depthTexture.format===fa&&(it=e.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,it,x.width,x.height,0,Ct,$,null)}}else k(x.depthTexture,0);let q=j.__webglTexture,gt=D(x),at=Y?e.TEXTURE_CUBE_MAP_POSITIVE_X+N:e.TEXTURE_2D,At=x.depthTexture.format===fa?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ni)Fe(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,At,at,q,0,gt):e.framebufferTexture2D(e.FRAMEBUFFER,At,at,q,0);else if(x.depthTexture.format===fa)Fe(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,At,at,q,0,gt):e.framebufferTexture2D(e.FRAMEBUFFER,At,at,q,0);else throw new Error("Unknown depthTexture format")}function wt(w){let x=i.get(w),N=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let Y=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=Y}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(N)for(let Y=0;Y<6;Y++)Tt(x.__webglFramebuffer[Y],w,Y);else{let Y=w.texture.mipmaps;Y&&Y.length>0?Tt(x.__webglFramebuffer[0],w,0):Tt(x.__webglFramebuffer,w,0)}else if(N){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=e.createRenderbuffer(),Nt(x.__webglDepthbuffer[Y],w,!1);else{let j=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[Y];e.bindRenderbuffer(e.RENDERBUFFER,q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,q)}}else{let Y=w.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=e.createRenderbuffer(),Nt(x.__webglDepthbuffer,w,!1);else{let j=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,q)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(w,x,N){let Y=i.get(w);x!==void 0&&K(Y.__webglFramebuffer,w,w.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),N!==void 0&&wt(w)}function Yt(w){let x=w.texture,N=i.get(w),Y=i.get(x);w.addEventListener("dispose",C);let j=w.textures,q=w.isWebGLCubeRenderTarget===!0,gt=j.length>1;if(gt||(Y.__webglTexture===void 0&&(Y.__webglTexture=e.createTexture()),Y.__version=x.version,r.memory.textures++),q){N.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer[at]=[];for(let At=0;At<x.mipmaps.length;At++)N.__webglFramebuffer[at][At]=e.createFramebuffer()}else N.__webglFramebuffer[at]=e.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)N.__webglFramebuffer[at]=e.createFramebuffer()}else N.__webglFramebuffer=e.createFramebuffer();if(gt)for(let at=0,At=j.length;at<At;at++){let Ct=i.get(j[at]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=e.createTexture(),r.memory.textures++)}if(w.samples>0&&Fe(w)===!1){N.__webglMultisampledFramebuffer=e.createFramebuffer(),N.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let at=0;at<j.length;at++){let At=j[at];N.__webglColorRenderbuffer[at]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,N.__webglColorRenderbuffer[at]);let Ct=a.convert(At.format,At.colorSpace),$=a.convert(At.type),it=_(At.internalFormat,Ct,$,At.colorSpace,w.isXRRenderTarget===!0),vt=D(w);e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,it,w.width,w.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+at,e.RENDERBUFFER,N.__webglColorRenderbuffer[at])}e.bindRenderbuffer(e.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=e.createRenderbuffer(),Nt(N.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(q){n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),ht(e.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let At=0;At<x.mipmaps.length;At++)K(N.__webglFramebuffer[at][At],w,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,At);else K(N.__webglFramebuffer[at],w,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);g(x)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(gt){for(let at=0,At=j.length;at<At;at++){let Ct=j[at],$=i.get(Ct),it=e.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(it=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,$.__webglTexture),ht(it,Ct),K(N.__webglFramebuffer,w,Ct,e.COLOR_ATTACHMENT0+at,it,0),g(Ct)&&h(it)}n.unbindTexture()}else{let at=e.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(at=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(at,Y.__webglTexture),ht(at,x),x.mipmaps&&x.mipmaps.length>0)for(let At=0;At<x.mipmaps.length;At++)K(N.__webglFramebuffer[At],w,x,e.COLOR_ATTACHMENT0,at,At);else K(N.__webglFramebuffer,w,x,e.COLOR_ATTACHMENT0,at,0);g(x)&&h(at),n.unbindTexture()}w.depthBuffer&&wt(w)}function $t(w){let x=w.textures;for(let N=0,Y=x.length;N<Y;N++){let j=x[N];if(g(j)){let q=m(w),gt=i.get(j).__webglTexture;n.bindTexture(q,gt),h(q),n.unbindTexture()}}}let fe=[],Ht=[];function Le(w){if(w.samples>0){if(Fe(w)===!1){let x=w.textures,N=w.width,Y=w.height,j=e.COLOR_BUFFER_BIT,q=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,gt=i.get(w),at=x.length>1;if(at)for(let Ct=0;Ct<x.length;Ct++)n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let At=w.texture.mipmaps;At&&At.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Ct=0;Ct<x.length;Ct++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=e.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=e.STENCIL_BUFFER_BIT)),at){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,gt.__webglColorRenderbuffer[Ct]);let $=i.get(x[Ct]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$,0)}e.blitFramebuffer(0,0,N,Y,0,0,N,Y,j,e.NEAREST),l===!0&&(fe.length=0,Ht.length=0,fe.push(e.COLOR_ATTACHMENT0+Ct),w.depthBuffer&&w.resolveDepthBuffer===!1&&(fe.push(q),Ht.push(q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ht)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,fe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),at)for(let Ct=0;Ct<x.length;Ct++){n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.RENDERBUFFER,gt.__webglColorRenderbuffer[Ct]);let $=i.get(x[Ct]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ct,e.TEXTURE_2D,$,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let x=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[x])}}}function D(w){return Math.min(s.maxSamples,w.samples)}function Fe(w){let x=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ne(w){let x=r.render.frame;d.get(w)!==x&&(d.set(w,x),w.update())}function ve(w,x){let N=w.colorSpace,Y=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||N!==Xa&&N!==ys&&(Kt.getTransfer(N)===ie?(Y!==ci||j!==Dn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",N)),x}function St(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=O,this.setTexture2D=k,this.setTexture2DArray=B,this.setTexture3D=z,this.setTextureCube=et,this.rebindTextures=Ae,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=K,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function l2(e,t){function n(i,s=ys){let a,r=Kt.getTransfer(s);if(i===Dn)return e.UNSIGNED_BYTE;if(i===td)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ed)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Dg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ug)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Cg)return e.BYTE;if(i===Rg)return e.SHORT;if(i===vo)return e.UNSIGNED_SHORT;if(i===$h)return e.INT;if(i===yi)return e.UNSIGNED_INT;if(i===li)return e.FLOAT;if(i===zi)return e.HALF_FLOAT;if(i===Ng)return e.ALPHA;if(i===Lg)return e.RGB;if(i===ci)return e.RGBA;if(i===Ni)return e.DEPTH_COMPONENT;if(i===fa)return e.DEPTH_STENCIL;if(i===nd)return e.RED;if(i===id)return e.RED_INTEGER;if(i===Za)return e.RG;if(i===sd)return e.RG_INTEGER;if(i===ad)return e.RGBA_INTEGER;if(i===ac||i===rc||i===oc||i===lc)if(r===ie)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===ac)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===ac)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rd||i===od||i===ld||i===cd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===rd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===od)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ld)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ud||i===hd||i===dd||i===fd||i===pd||i===md||i===gd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ud||i===hd)return r===ie?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===dd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===fd)return a.COMPRESSED_R11_EAC;if(i===pd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===md)return a.COMPRESSED_RG11_EAC;if(i===gd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===vd||i===_d||i===yd||i===xd||i===Sd||i===bd||i===Md||i===Td||i===Ed||i===Ad||i===wd||i===Cd||i===Rd||i===Dd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===vd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_d)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===yd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Sd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Md)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Td)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ed)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ad)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Dd)return r===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ud||i===Nd||i===Ld)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Ud)return r===ie?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Nd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ld)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Id||i===Od||i===Pd||i===Bd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Id)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Od)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_o?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var c2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u2=`
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

}`,$g=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Xl(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Wn({vertexShader:c2,fragmentShader:u2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new de(new ql(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},t0=class extends vs{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,f=null,u=null,p=null,v=null,b=typeof XRWebGLBinding<"u",g=new $g,h={},m=n.getContextAttributes(),_=null,S=null,E=[],A=[],C=new jt,y=null,T=new ln;T.viewport=new Re;let I=new ln;I.viewport=new Re;let R=[T,I],O=new Zh,P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let nt=E[Z];return nt===void 0&&(nt=new fo,E[Z]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Z){let nt=E[Z];return nt===void 0&&(nt=new fo,E[Z]=nt),nt.getGripSpace()},this.getHand=function(Z){let nt=E[Z];return nt===void 0&&(nt=new fo,E[Z]=nt),nt.getHandSpace()};function k(Z){let nt=A.indexOf(Z.inputSource);if(nt===-1)return;let K=E[nt];K!==void 0&&(K.update(Z.inputSource,Z.frame,c||r),K.dispatchEvent({type:Z.type,data:Z.inputSource}))}function B(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",z);for(let Z=0;Z<E.length;Z++){let nt=A[Z];nt!==null&&(A[Z]=null,E[Z].disconnect(nt))}P=null,H=null,g.reset();for(let Z in h)delete h[Z];t.setRenderTarget(_),p=null,u=null,f=null,s=null,S=null,ge.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(s,n)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",B),s.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await n.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,Nt=null,Tt=null;m.depth&&(Tt=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,K=m.stencil?fa:Ni,Nt=m.stencil?_o:yi);let wt={colorFormat:n.RGBA8,depthFormat:Tt,scaleFactor:a};f=this.getBinding(),u=f.createProjectionLayer(wt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Xn(u.textureWidth,u.textureHeight,{format:ci,type:Dn,depthTexture:new aa(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let K={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,n,K),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Xn(p.framebufferWidth,p.framebufferHeight,{format:ci,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ge.setContext(s),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(Z){for(let nt=0;nt<Z.removed.length;nt++){let K=Z.removed[nt],Nt=A.indexOf(K);Nt>=0&&(A[Nt]=null,E[Nt].disconnect(K))}for(let nt=0;nt<Z.added.length;nt++){let K=Z.added[nt],Nt=A.indexOf(K);if(Nt===-1){for(let wt=0;wt<E.length;wt++)if(wt>=A.length){A.push(K),Nt=wt;break}else if(A[wt]===null){A[wt]=K,Nt=wt;break}if(Nt===-1)break}let Tt=E[Nt];Tt&&Tt.connect(K)}}let et=new V,Q=new V;function lt(Z,nt,K){et.setFromMatrixPosition(nt.matrixWorld),Q.setFromMatrixPosition(K.matrixWorld);let Nt=et.distanceTo(Q),Tt=nt.projectionMatrix.elements,wt=K.projectionMatrix.elements,Ae=Tt[14]/(Tt[10]-1),Yt=Tt[14]/(Tt[10]+1),$t=(Tt[9]+1)/Tt[5],fe=(Tt[9]-1)/Tt[5],Ht=(Tt[8]-1)/Tt[0],Le=(wt[8]+1)/wt[0],D=Ae*Ht,Fe=Ae*Le,ne=Nt/(-Ht+Le),ve=ne*-Ht;if(nt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ve),Z.translateZ(ne),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Tt[10]===-1)Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let St=Ae+ne,w=Yt+ne,x=D-ve,N=Fe+(Nt-ve),Y=$t*Yt/w*St,j=fe*Yt/w*St;Z.projectionMatrix.makePerspective(x,N,Y,j,St,w),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pt(Z,nt){nt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(nt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let nt=Z.near,K=Z.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(K=g.depthFar)),O.near=I.near=T.near=nt,O.far=I.far=T.far=K,(P!==O.near||H!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,H=O.far),O.layers.mask=Z.layers.mask|6,T.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;let Nt=Z.parent,Tt=O.cameras;pt(O,Nt);for(let wt=0;wt<Tt.length;wt++)pt(Tt[wt],Nt);Tt.length===2?lt(O,T,I):O.projectionMatrix.copy(T.projectionMatrix),ht(Z,O,Nt)};function ht(Z,nt,K){K===null?Z.matrix.copy(nt.matrixWorld):(Z.matrix.copy(K.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(nt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ch*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Z){return h[Z]};let Lt=null;function oe(Z,nt){if(d=nt.getViewerPose(c||r),v=nt,d!==null){let K=d.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Nt=!1;K.length!==O.cameras.length&&(O.cameras.length=0,Nt=!0);for(let Yt=0;Yt<K.length;Yt++){let $t=K[Yt],fe=null;if(p!==null)fe=p.getViewport($t);else{let Le=f.getViewSubImage(u,$t);fe=Le.viewport,Yt===0&&(t.setRenderTargetTextures(S,Le.colorTexture,Le.depthStencilTexture),t.setRenderTarget(S))}let Ht=R[Yt];Ht===void 0&&(Ht=new ln,Ht.layers.enable(Yt),Ht.viewport=new Re,R[Yt]=Ht),Ht.matrix.fromArray($t.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray($t.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(fe.x,fe.y,fe.width,fe.height),Yt===0&&(O.matrix.copy(Ht.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Nt===!0&&O.cameras.push(Ht)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){f=i.getBinding();let Yt=f.getDepthInformation(K[0]);Yt&&Yt.isValid&&Yt.texture&&g.init(Yt,s.renderState)}if(Tt&&Tt.includes("camera-access")&&b){t.state.unbindTexture(),f=i.getBinding();for(let Yt=0;Yt<K.length;Yt++){let $t=K[Yt].camera;if($t){let fe=h[$t];fe||(fe=new Xl,h[$t]=fe);let Ht=f.getCameraImage($t);fe.sourceTexture=Ht}}}}for(let K=0;K<E.length;K++){let Nt=A[K],Tt=E[K];Nt!==null&&Tt!==void 0&&Tt.update(Nt,nt,c||r)}Lt&&Lt(Z,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),v=null}let ge=new Ib;ge.setAnimationLoop(oe),this.setAnimationLoop=function(Z){Lt=Z},this.dispose=function(){}}},Ka=new ri,h2=new Ee;function d2(e,t){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Pg(e)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function s(g,h,m,_,S){h.isMeshBasicMaterial?a(g,h):h.isMeshLambertMaterial?(a(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(a(g,h),f(g,h)):h.isMeshPhongMaterial?(a(g,h),d(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(a(g,h),u(g,h),h.isMeshPhysicalMaterial&&p(g,h,S)):h.isMeshMatcapMaterial?(a(g,h),v(g,h)):h.isMeshDepthMaterial?a(g,h):h.isMeshDistanceMaterial?(a(g,h),b(g,h)):h.isMeshNormalMaterial?a(g,h):h.isLineBasicMaterial?(r(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,m,_):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===un&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===un&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let m=t.get(h),_=m.envMap,S=m.envMapRotation;_&&(g.envMap.value=_,Ka.copy(S),Ka.x*=-1,Ka.y*=-1,Ka.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ka.y*=-1,Ka.z*=-1),g.envMapRotation.value.setFromMatrix4(h2.makeRotationFromEuler(Ka)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function r(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,m,_){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*m,g.scale.value=_*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,m){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===un&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,h){h.matcap&&(g.matcap.value=h.matcap)}function b(g,h){let m=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function f2(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,_){let S=_.program;i.uniformBlockBinding(m,S)}function c(m,_){let S=s[m.id];S===void 0&&(v(m),S=d(m),s[m.id]=S,m.addEventListener("dispose",g));let E=_.program;i.updateUBOMapping(m,E);let A=t.render.frame;a[m.id]!==A&&(u(m),a[m.id]=A)}function d(m){let _=f();m.__bindingPointIndex=_;let S=e.createBuffer(),E=m.__size,A=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,E,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,S),S}function f(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let _=s[m.id],S=m.uniforms,E=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let A=0,C=S.length;A<C;A++){let y=Array.isArray(S[A])?S[A]:[S[A]];for(let T=0,I=y.length;T<I;T++){let R=y[T];if(p(R,A,T,E)===!0){let O=R.__offset,P=Array.isArray(R.value)?R.value:[R.value],H=0;for(let k=0;k<P.length;k++){let B=P[k],z=b(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,e.bufferSubData(e.UNIFORM_BUFFER,O+H,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):(B.toArray(R.__data,H),H+=z.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,O,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(m,_,S,E){let A=m.value,C=_+"_"+S;if(E[C]===void 0)return typeof A=="number"||typeof A=="boolean"?E[C]=A:E[C]=A.clone(),!0;{let y=E[C];if(typeof A=="number"||typeof A=="boolean"){if(y!==A)return E[C]=A,!0}else if(y.equals(A)===!1)return y.copy(A),!0}return!1}function v(m){let _=m.uniforms,S=0,E=16;for(let C=0,y=_.length;C<y;C++){let T=Array.isArray(_[C])?_[C]:[_[C]];for(let I=0,R=T.length;I<R;I++){let O=T[I],P=Array.isArray(O.value)?O.value:[O.value];for(let H=0,k=P.length;H<k;H++){let B=P[H],z=b(B),et=S%E,Q=et%z.boundary,lt=et+Q;S+=Q,lt!==0&&E-lt<z.storage&&(S+=E-lt),O.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=z.storage}}}let A=S%E;return A>0&&(S+=E-A),m.__size=S,m.__cache={},this}function b(m){let _={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(_.boundary=4,_.storage=4):m.isVector2?(_.boundary=8,_.storage=8):m.isVector3||m.isColor?(_.boundary=16,_.storage=12):m.isVector4?(_.boundary=16,_.storage=16):m.isMatrix3?(_.boundary=48,_.storage=48):m.isMatrix4?(_.boundary=64,_.storage=64):m.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",m),_}function g(m){let _=m.target;_.removeEventListener("dispose",g);let S=r.indexOf(_.__bindingPointIndex);r.splice(S,1),e.deleteBuffer(s[_.id]),delete s[_.id],delete a[_.id]}function h(){for(let m in s)e.deleteBuffer(s[m]);r=[],s={},a={}}return{bind:l,update:c,dispose:h}}var p2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vi=null;function m2(){return Vi===null&&(Vi=new zl(p2,16,16,Za,zi),Vi.name="DFG_LUT",Vi.minFilter=cn,Vi.magFilter=cn,Vi.wrapS=Ui,Vi.wrapT=Ui,Vi.generateMipmaps=!1,Vi.needsUpdate=!0),Vi}var Xd=class{constructor(t={}){let{canvas:n=ab(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Dn}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=r;let b=p,g=new Set([ad,sd,id]),h=new Set([Dn,yi,vo,_o,td,ed]),m=new Uint32Array(4),_=new Int32Array(4),S=null,E=null,A=[],C=[],y=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,I=!1;this._outputColorSpace=mn;let R=0,O=0,P=null,H=-1,k=null,B=new Re,z=new Re,et=null,Q=new zt(0),lt=0,pt=n.width,ht=n.height,Lt=1,oe=null,ge=null,Z=new Re(0,0,pt,ht),nt=new Re(0,0,pt,ht),K=!1,Nt=new po,Tt=!1,wt=!1,Ae=new Ee,Yt=new V,$t=new Re,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function Le(){return P===null?Lt:1}let D=i;function Fe(M,L){return n.getContext(M,L)}try{let M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"183"}`),n.addEventListener("webglcontextlost",_t,!1),n.addEventListener("webglcontextrestored",It,!1),n.addEventListener("webglcontextcreationerror",_e,!1),D===null){let L="webgl2";if(D=Fe(L,M),D===null)throw Fe(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Dt("WebGLRenderer: "+M.message),M}let ne,ve,St,w,x,N,Y,j,q,gt,at,At,Ct,$,it,vt,yt,dt,Gt,U,rt,st,mt;function tt(){ne=new MC(D),ne.init(),rt=new l2(D,ne),ve=new mC(D,ne,t,rt),St=new r2(D,ne),ve.reversedDepthBuffer&&u&&St.buffers.depth.setReversed(!0),w=new AC(D),x=new qR,N=new o2(D,ne,St,x,ve,rt,w),Y=new bC(T),j=new UE(D),st=new fC(D,j),q=new TC(D,j,w,st),gt=new CC(D,q,j,st,w),dt=new wC(D,ve,N),it=new gC(x),at=new WR(T,Y,ne,ve,st,it),At=new d2(T,x),Ct=new ZR,$=new t2(ne),yt=new dC(T,Y,St,gt,v,l),vt=new a2(T,gt,ve),mt=new f2(D,w,ve,St),Gt=new pC(D,ne,w),U=new EC(D,ne,w),w.programs=at.programs,T.capabilities=ve,T.extensions=ne,T.properties=x,T.renderLists=Ct,T.shadowMap=vt,T.state=St,T.info=w}tt(),b!==Dn&&(y=new DC(b,n.width,n.height,s,a));let W=new t0(T,D);this.xr=W,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let M=ne.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ne.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Lt},this.setPixelRatio=function(M){M!==void 0&&(Lt=M,this.setSize(pt,ht,!1))},this.getSize=function(M){return M.set(pt,ht)},this.setSize=function(M,L,X=!0){if(W.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}pt=M,ht=L,n.width=Math.floor(M*Lt),n.height=Math.floor(L*Lt),X===!0&&(n.style.width=M+"px",n.style.height=L+"px"),y!==null&&y.setSize(n.width,n.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(pt*Lt,ht*Lt).floor()},this.setDrawingBufferSize=function(M,L,X){pt=M,ht=L,Lt=X,n.width=Math.floor(M*X),n.height=Math.floor(L*X),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(b===Dn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(B)},this.getViewport=function(M){return M.copy(Z)},this.setViewport=function(M,L,X,G){M.isVector4?Z.set(M.x,M.y,M.z,M.w):Z.set(M,L,X,G),St.viewport(B.copy(Z).multiplyScalar(Lt).round())},this.getScissor=function(M){return M.copy(nt)},this.setScissor=function(M,L,X,G){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,L,X,G),St.scissor(z.copy(nt).multiplyScalar(Lt).round())},this.getScissorTest=function(){return K},this.setScissorTest=function(M){St.setScissorTest(K=M)},this.setOpaqueSort=function(M){oe=M},this.setTransparentSort=function(M){ge=M},this.getClearColor=function(M){return M.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,X=!0){let G=0;if(M){let F=!1;if(P!==null){let ct=P.texture.format;F=g.has(ct)}if(F){let ct=P.texture.type,ft=h.has(ct),ut=yt.getClearColor(),xt=yt.getClearAlpha(),Mt=ut.r,Pt=ut.g,kt=ut.b;ft?(m[0]=Mt,m[1]=Pt,m[2]=kt,m[3]=xt,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=Mt,_[1]=Pt,_[2]=kt,_[3]=xt,D.clearBufferiv(D.COLOR,0,_))}else G|=D.COLOR_BUFFER_BIT}L&&(G|=D.DEPTH_BUFFER_BIT),X&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",_t,!1),n.removeEventListener("webglcontextrestored",It,!1),n.removeEventListener("webglcontextcreationerror",_e,!1),yt.dispose(),Ct.dispose(),$.dispose(),x.dispose(),Y.dispose(),gt.dispose(),st.dispose(),mt.dispose(),at.dispose(),W.dispose(),W.removeEventListener("sessionstart",r0),W.removeEventListener("sessionend",o0),ma.stop()};function _t(M){M.preventDefault(),Og("WebGLRenderer: Context Lost."),I=!0}function It(){Og("WebGLRenderer: Context Restored."),I=!1;let M=w.autoReset,L=vt.enabled,X=vt.autoUpdate,G=vt.needsUpdate,F=vt.type;tt(),w.autoReset=M,vt.enabled=L,vt.autoUpdate=X,vt.needsUpdate=G,vt.type=F}function _e(M){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function se(M){let L=M.target;L.removeEventListener("dispose",se),Gi(L)}function Gi(M){ki(M),x.remove(M)}function ki(M){let L=x.get(M).programs;L!==void 0&&(L.forEach(function(X){at.releaseProgram(X)}),M.isShaderMaterial&&at.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,X,G,F,ct){L===null&&(L=fe);let ft=F.isMesh&&F.matrixWorld.determinant()<0,ut=Yb(M,L,X,G,F);St.setMaterial(G,ft);let xt=X.index,Mt=1;if(G.wireframe===!0){if(xt=q.getWireframeAttribute(X),xt===void 0)return;Mt=2}let Pt=X.drawRange,kt=X.attributes.position,Et=Pt.start*Mt,le=(Pt.start+Pt.count)*Mt;ct!==null&&(Et=Math.max(Et,ct.start*Mt),le=Math.min(le,(ct.start+ct.count)*Mt)),xt!==null?(Et=Math.max(Et,0),le=Math.min(le,xt.count)):kt!=null&&(Et=Math.max(Et,0),le=Math.min(le,kt.count));let Ie=le-Et;if(Ie<0||Ie===1/0)return;st.setup(F,G,ut,X,xt);let De,ce=Gt;if(xt!==null&&(De=j.get(xt),ce=U,ce.setIndex(De)),F.isMesh)G.wireframe===!0?(St.setLineWidth(G.wireframeLinewidth*Le()),ce.setMode(D.LINES)):ce.setMode(D.TRIANGLES);else if(F.isLine){let hn=G.linewidth;hn===void 0&&(hn=1),St.setLineWidth(hn*Le()),F.isLineSegments?ce.setMode(D.LINES):F.isLineLoop?ce.setMode(D.LINE_LOOP):ce.setMode(D.LINE_STRIP)}else F.isPoints?ce.setMode(D.POINTS):F.isSprite&&ce.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Il("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ce.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let hn=F._multiDrawStarts,bt=F._multiDrawCounts,Un=F._multiDrawCount,Qt=xt?j.get(xt).bytesPerElement:1,ui=x.get(G).currentProgram.getUniforms();for(let xi=0;xi<Un;xi++)ui.setValue(D,"_gl_DrawID",xi),ce.render(hn[xi]/Qt,bt[xi])}else if(F.isInstancedMesh)ce.renderInstances(Et,Ie,F.count);else if(X.isInstancedBufferGeometry){let hn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,bt=Math.min(X.instanceCount,hn);ce.renderInstances(Et,Ie,bt)}else ce.render(Et,Ie)};function a0(M,L,X){M.transparent===!0&&M.side===Bi&&M.forceSinglePass===!1?(M.side=un,M.needsUpdate=!0,pc(M,L,X),M.side=ai,M.needsUpdate=!0,pc(M,L,X),M.side=Bi):pc(M,L,X)}this.compile=function(M,L,X=null){X===null&&(X=M),E=$.get(X),E.init(L),C.push(E),X.traverseVisible(function(F){F.isLight&&F.layers.test(L.layers)&&(E.pushLight(F),F.castShadow&&E.pushShadow(F))}),M!==X&&M.traverseVisible(function(F){F.isLight&&F.layers.test(L.layers)&&(E.pushLight(F),F.castShadow&&E.pushShadow(F))}),E.setupLights();let G=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ct=F.material;if(ct)if(Array.isArray(ct))for(let ft=0;ft<ct.length;ft++){let ut=ct[ft];a0(ut,X,F),G.add(ut)}else a0(ct,X,F),G.add(ct)}),E=C.pop(),G},this.compileAsync=function(M,L,X=null){let G=this.compile(M,L,X);return new Promise(F=>{function ct(){if(G.forEach(function(ft){x.get(ft).currentProgram.isReady()&&G.delete(ft)}),G.size===0){F(M);return}setTimeout(ct,10)}ne.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let jd=null;function qb(M){jd&&jd(M)}function r0(){ma.stop()}function o0(){ma.start()}let ma=new Ib;ma.setAnimationLoop(qb),typeof self<"u"&&ma.setContext(self),this.setAnimationLoop=function(M){jd=M,W.setAnimationLoop(M),M===null?ma.stop():ma.start()},W.addEventListener("sessionstart",r0),W.addEventListener("sessionend",o0),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;let X=W.enabled===!0&&W.isPresenting===!0,G=y!==null&&(P===null||X)&&y.begin(T,P);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(L),L=W.getCamera()),M.isScene===!0&&M.onBeforeRender(T,M,L,P),E=$.get(M,C.length),E.init(L),C.push(E),Ae.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Nt.setFromProjectionMatrix(Ae,vi,L.reversedDepth),wt=this.localClippingEnabled,Tt=it.init(this.clippingPlanes,wt),S=Ct.get(M,A.length),S.init(),A.push(S),W.enabled===!0&&W.isPresenting===!0){let ft=T.xr.getDepthSensingMesh();ft!==null&&Kd(ft,L,-1/0,T.sortObjects)}Kd(M,L,0,T.sortObjects),S.finish(),T.sortObjects===!0&&S.sort(oe,ge),Ht=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ht&&yt.addToRenderList(S,M),this.info.render.frame++,Tt===!0&&it.beginShadows();let F=E.state.shadowsArray;if(vt.render(F,M,L),Tt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&y.hasRenderPass())===!1){let ft=S.opaque,ut=S.transmissive;if(E.setupLights(),L.isArrayCamera){let xt=L.cameras;if(ut.length>0)for(let Mt=0,Pt=xt.length;Mt<Pt;Mt++){let kt=xt[Mt];c0(ft,ut,M,kt)}Ht&&yt.render(M);for(let Mt=0,Pt=xt.length;Mt<Pt;Mt++){let kt=xt[Mt];l0(S,M,kt,kt.viewport)}}else ut.length>0&&c0(ft,ut,M,L),Ht&&yt.render(M),l0(S,M,L)}P!==null&&O===0&&(N.updateMultisampleRenderTarget(P),N.updateRenderTargetMipmap(P)),G&&y.end(T),M.isScene===!0&&M.onAfterRender(T,M,L),st.resetDefaultState(),H=-1,k=null,C.pop(),C.length>0?(E=C[C.length-1],Tt===!0&&it.setGlobalState(T.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?S=A[A.length-1]:S=null};function Kd(M,L,X,G){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Nt.intersectsSprite(M)){G&&$t.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ae);let ft=gt.update(M),ut=M.material;ut.visible&&S.push(M,ft,ut,X,$t.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Nt.intersectsObject(M))){let ft=gt.update(M),ut=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),$t.copy(M.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),$t.copy(ft.boundingSphere.center)),$t.applyMatrix4(M.matrixWorld).applyMatrix4(Ae)),Array.isArray(ut)){let xt=ft.groups;for(let Mt=0,Pt=xt.length;Mt<Pt;Mt++){let kt=xt[Mt],Et=ut[kt.materialIndex];Et&&Et.visible&&S.push(M,ft,Et,X,$t.z,kt)}}else ut.visible&&S.push(M,ft,ut,X,$t.z,null)}}let ct=M.children;for(let ft=0,ut=ct.length;ft<ut;ft++)Kd(ct[ft],L,X,G)}function l0(M,L,X,G){let{opaque:F,transmissive:ct,transparent:ft}=M;E.setupLightsView(X),Tt===!0&&it.setGlobalState(T.clippingPlanes,X),G&&St.viewport(B.copy(G)),F.length>0&&fc(F,L,X),ct.length>0&&fc(ct,L,X),ft.length>0&&fc(ft,L,X),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function c0(M,L,X,G){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let Et=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Xn(1,1,{generateMipmaps:!0,type:Et?zi:Dn,minFilter:da,samples:Math.max(4,ve.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}let ct=E.state.transmissionRenderTarget[G.id],ft=G.viewport||B;ct.setSize(ft.z*T.transmissionResolutionScale,ft.w*T.transmissionResolutionScale);let ut=T.getRenderTarget(),xt=T.getActiveCubeFace(),Mt=T.getActiveMipmapLevel();T.setRenderTarget(ct),T.getClearColor(Q),lt=T.getClearAlpha(),lt<1&&T.setClearColor(16777215,.5),T.clear(),Ht&&yt.render(X);let Pt=T.toneMapping;T.toneMapping=_i;let kt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),Tt===!0&&it.setGlobalState(T.clippingPlanes,G),fc(M,X,G),N.updateMultisampleRenderTarget(ct),N.updateRenderTargetMipmap(ct),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let le=0,Ie=L.length;le<Ie;le++){let De=L[le],{object:ce,geometry:hn,material:bt,group:Un}=De;if(bt.side===Bi&&ce.layers.test(G.layers)){let Qt=bt.side;bt.side=un,bt.needsUpdate=!0,u0(ce,X,G,hn,bt,Un),bt.side=Qt,bt.needsUpdate=!0,Et=!0}}Et===!0&&(N.updateMultisampleRenderTarget(ct),N.updateRenderTargetMipmap(ct))}T.setRenderTarget(ut,xt,Mt),T.setClearColor(Q,lt),kt!==void 0&&(G.viewport=kt),T.toneMapping=Pt}function fc(M,L,X){let G=L.isScene===!0?L.overrideMaterial:null;for(let F=0,ct=M.length;F<ct;F++){let ft=M[F],{object:ut,geometry:xt,group:Mt}=ft,Pt=ft.material;Pt.allowOverride===!0&&G!==null&&(Pt=G),ut.layers.test(X.layers)&&u0(ut,L,X,xt,Pt,Mt)}}function u0(M,L,X,G,F,ct){M.onBeforeRender(T,L,X,G,F,ct),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(T,L,X,G,M,ct),F.transparent===!0&&F.side===Bi&&F.forceSinglePass===!1?(F.side=un,F.needsUpdate=!0,T.renderBufferDirect(X,L,G,F,M,ct),F.side=ai,F.needsUpdate=!0,T.renderBufferDirect(X,L,G,F,M,ct),F.side=Bi):T.renderBufferDirect(X,L,G,F,M,ct),M.onAfterRender(T,L,X,G,F,ct)}function pc(M,L,X){L.isScene!==!0&&(L=fe);let G=x.get(M),F=E.state.lights,ct=E.state.shadowsArray,ft=F.state.version,ut=at.getParameters(M,F.state,ct,L,X),xt=at.getProgramCacheKey(ut),Mt=G.programs;G.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,G.fog=L.fog;let Pt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;G.envMap=Y.get(M.envMap||G.environment,Pt),G.envMapRotation=G.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,Mt===void 0&&(M.addEventListener("dispose",se),Mt=new Map,G.programs=Mt);let kt=Mt.get(xt);if(kt!==void 0){if(G.currentProgram===kt&&G.lightsStateVersion===ft)return d0(M,ut),kt}else ut.uniforms=at.getUniforms(M),M.onBeforeCompile(ut,T),kt=at.acquireProgram(ut,xt),Mt.set(xt,kt),G.uniforms=ut.uniforms;let Et=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Et.clippingPlanes=it.uniform),d0(M,ut),G.needsLights=Jb(M),G.lightsStateVersion=ft,G.needsLights&&(Et.ambientLightColor.value=F.state.ambient,Et.lightProbe.value=F.state.probe,Et.directionalLights.value=F.state.directional,Et.directionalLightShadows.value=F.state.directionalShadow,Et.spotLights.value=F.state.spot,Et.spotLightShadows.value=F.state.spotShadow,Et.rectAreaLights.value=F.state.rectArea,Et.ltc_1.value=F.state.rectAreaLTC1,Et.ltc_2.value=F.state.rectAreaLTC2,Et.pointLights.value=F.state.point,Et.pointLightShadows.value=F.state.pointShadow,Et.hemisphereLights.value=F.state.hemi,Et.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Et.spotLightMatrix.value=F.state.spotLightMatrix,Et.spotLightMap.value=F.state.spotLightMap,Et.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=kt,G.uniformsList=null,kt}function h0(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=xo.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function d0(M,L){let X=x.get(M);X.outputColorSpace=L.outputColorSpace,X.batching=L.batching,X.batchingColor=L.batchingColor,X.instancing=L.instancing,X.instancingColor=L.instancingColor,X.instancingMorph=L.instancingMorph,X.skinning=L.skinning,X.morphTargets=L.morphTargets,X.morphNormals=L.morphNormals,X.morphColors=L.morphColors,X.morphTargetsCount=L.morphTargetsCount,X.numClippingPlanes=L.numClippingPlanes,X.numIntersection=L.numClipIntersection,X.vertexAlphas=L.vertexAlphas,X.vertexTangents=L.vertexTangents,X.toneMapping=L.toneMapping}function Yb(M,L,X,G,F){L.isScene!==!0&&(L=fe),N.resetTextureUnits();let ct=L.fog,ft=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?L.environment:null,ut=P===null?T.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Xa,xt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Mt=Y.get(G.envMap||ft,xt),Pt=G.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,kt=!!X.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Et=!!X.morphAttributes.position,le=!!X.morphAttributes.normal,Ie=!!X.morphAttributes.color,De=_i;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(De=T.toneMapping);let ce=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,hn=ce!==void 0?ce.length:0,bt=x.get(G),Un=E.state.lights;if(Tt===!0&&(wt===!0||M!==k)){let Je=M===k&&G.id===H;it.setState(G,M,Je)}let Qt=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==Un.state.version||bt.outputColorSpace!==ut||F.isBatchedMesh&&bt.batching===!1||!F.isBatchedMesh&&bt.batching===!0||F.isBatchedMesh&&bt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&bt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&bt.instancing===!1||!F.isInstancedMesh&&bt.instancing===!0||F.isSkinnedMesh&&bt.skinning===!1||!F.isSkinnedMesh&&bt.skinning===!0||F.isInstancedMesh&&bt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&bt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&bt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&bt.instancingMorph===!1&&F.morphTexture!==null||bt.envMap!==Mt||G.fog===!0&&bt.fog!==ct||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==it.numPlanes||bt.numIntersection!==it.numIntersection)||bt.vertexAlphas!==Pt||bt.vertexTangents!==kt||bt.morphTargets!==Et||bt.morphNormals!==le||bt.morphColors!==Ie||bt.toneMapping!==De||bt.morphTargetsCount!==hn)&&(Qt=!0):(Qt=!0,bt.__version=G.version);let ui=bt.currentProgram;Qt===!0&&(ui=pc(G,L,F));let xi=!1,ga=!1,$a=!1,pe=ui.getUniforms(),en=bt.uniforms;if(St.useProgram(ui.program)&&(xi=!0,ga=!0,$a=!0),G.id!==H&&(H=G.id,ga=!0),xi||k!==M){St.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),pe.setValue(D,"projectionMatrix",M.projectionMatrix),pe.setValue(D,"viewMatrix",M.matrixWorldInverse);let Ss=pe.map.cameraPosition;Ss!==void 0&&Ss.setValue(D,Yt.setFromMatrixPosition(M.matrixWorld)),ve.logarithmicDepthBuffer&&pe.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&pe.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),k!==M&&(k=M,ga=!0,$a=!0)}if(bt.needsLights&&(Un.state.directionalShadowMap.length>0&&pe.setValue(D,"directionalShadowMap",Un.state.directionalShadowMap,N),Un.state.spotShadowMap.length>0&&pe.setValue(D,"spotShadowMap",Un.state.spotShadowMap,N),Un.state.pointShadowMap.length>0&&pe.setValue(D,"pointShadowMap",Un.state.pointShadowMap,N)),F.isSkinnedMesh){pe.setOptional(D,F,"bindMatrix"),pe.setOptional(D,F,"bindMatrixInverse");let Je=F.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),pe.setValue(D,"boneTexture",Je.boneTexture,N))}F.isBatchedMesh&&(pe.setOptional(D,F,"batchingTexture"),pe.setValue(D,"batchingTexture",F._matricesTexture,N),pe.setOptional(D,F,"batchingIdTexture"),pe.setValue(D,"batchingIdTexture",F._indirectTexture,N),pe.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&pe.setValue(D,"batchingColorTexture",F._colorsTexture,N));let xs=X.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0)&&dt.update(F,X,ui),(ga||bt.receiveShadow!==F.receiveShadow)&&(bt.receiveShadow=F.receiveShadow,pe.setValue(D,"receiveShadow",F.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&L.environment!==null&&(en.envMapIntensity.value=L.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=m2()),ga&&(pe.setValue(D,"toneMappingExposure",T.toneMappingExposure),bt.needsLights&&Zb(en,$a),ct&&G.fog===!0&&At.refreshFogUniforms(en,ct),At.refreshMaterialUniforms(en,G,Lt,ht,E.state.transmissionRenderTarget[M.id]),xo.upload(D,h0(bt),en,N)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(xo.upload(D,h0(bt),en,N),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&pe.setValue(D,"center",F.center),pe.setValue(D,"modelViewMatrix",F.modelViewMatrix),pe.setValue(D,"normalMatrix",F.normalMatrix),pe.setValue(D,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Je=G.uniformsGroups;for(let Ss=0,tr=Je.length;Ss<tr;Ss++){let f0=Je[Ss];mt.update(f0,ui),mt.bind(f0,ui)}}return ui}function Zb(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Jb(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,L,X){let G=x.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),x.get(M.texture).__webglTexture=L,x.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:X,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let X=x.get(M);X.__webglFramebuffer=L,X.__useDefaultFramebuffer=L===void 0};let jb=D.createFramebuffer();this.setRenderTarget=function(M,L=0,X=0){P=M,R=L,O=X;let G=null,F=!1,ct=!1;if(M){let ut=x.get(M);if(ut.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(D.FRAMEBUFFER,ut.__webglFramebuffer),B.copy(M.viewport),z.copy(M.scissor),et=M.scissorTest,St.viewport(B),St.scissor(z),St.setScissorTest(et),H=-1;return}else if(ut.__webglFramebuffer===void 0)N.setupRenderTarget(M);else if(ut.__hasExternalTextures)N.rebindTextures(M,x.get(M.texture).__webglTexture,x.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Pt=M.depthTexture;if(ut.__boundDepthTexture!==Pt){if(Pt!==null&&x.has(Pt)&&(M.width!==Pt.image.width||M.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(M)}}let xt=M.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(ct=!0);let Mt=x.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Mt[L])?G=Mt[L][X]:G=Mt[L],F=!0):M.samples>0&&N.useMultisampledRTT(M)===!1?G=x.get(M).__webglMultisampledFramebuffer:Array.isArray(Mt)?G=Mt[X]:G=Mt,B.copy(M.viewport),z.copy(M.scissor),et=M.scissorTest}else B.copy(Z).multiplyScalar(Lt).floor(),z.copy(nt).multiplyScalar(Lt).floor(),et=K;if(X!==0&&(G=jb),St.bindFramebuffer(D.FRAMEBUFFER,G)&&St.drawBuffers(M,G),St.viewport(B),St.scissor(z),St.setScissorTest(et),F){let ut=x.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,ut.__webglTexture,X)}else if(ct){let ut=L;for(let xt=0;xt<M.textures.length;xt++){let Mt=x.get(M.textures[xt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+xt,Mt.__webglTexture,X,ut)}}else if(M!==null&&X!==0){let ut=x.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ut.__webglTexture,X)}H=-1},this.readRenderTargetPixels=function(M,L,X,G,F,ct,ft,ut=0){if(!(M&&M.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=x.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(xt=xt[ft]),xt){St.bindFramebuffer(D.FRAMEBUFFER,xt);try{let Mt=M.textures[ut],Pt=Mt.format,kt=Mt.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ut),!ve.textureFormatReadable(Pt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable(kt)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-G&&X>=0&&X<=M.height-F&&D.readPixels(L,X,G,F,rt.convert(Pt),rt.convert(kt),ct)}finally{let Mt=P!==null?x.get(P).__webglFramebuffer:null;St.bindFramebuffer(D.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(M,L,X,G,F,ct,ft,ut=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=x.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(xt=xt[ft]),xt)if(L>=0&&L<=M.width-G&&X>=0&&X<=M.height-F){St.bindFramebuffer(D.FRAMEBUFFER,xt);let Mt=M.textures[ut],Pt=Mt.format,kt=Mt.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ut),!ve.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Et=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Et),D.bufferData(D.PIXEL_PACK_BUFFER,ct.byteLength,D.STREAM_READ),D.readPixels(L,X,G,F,rt.convert(Pt),rt.convert(kt),0);let le=P!==null?x.get(P).__webglFramebuffer:null;St.bindFramebuffer(D.FRAMEBUFFER,le);let Ie=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await ob(D,Ie,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Et),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ct),D.deleteBuffer(Et),D.deleteSync(Ie),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,X=0){let G=Math.pow(2,-X),F=Math.floor(M.image.width*G),ct=Math.floor(M.image.height*G),ft=L!==null?L.x:0,ut=L!==null?L.y:0;N.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,ft,ut,F,ct),St.unbindTexture()};let Kb=D.createFramebuffer(),Qb=D.createFramebuffer();this.copyTextureToTexture=function(M,L,X=null,G=null,F=0,ct=0){let ft,ut,xt,Mt,Pt,kt,Et,le,Ie,De=M.isCompressedTexture?M.mipmaps[ct]:M.image;if(X!==null)ft=X.max.x-X.min.x,ut=X.max.y-X.min.y,xt=X.isBox3?X.max.z-X.min.z:1,Mt=X.min.x,Pt=X.min.y,kt=X.isBox3?X.min.z:0;else{let en=Math.pow(2,-F);ft=Math.floor(De.width*en),ut=Math.floor(De.height*en),M.isDataArrayTexture?xt=De.depth:M.isData3DTexture?xt=Math.floor(De.depth*en):xt=1,Mt=0,Pt=0,kt=0}G!==null?(Et=G.x,le=G.y,Ie=G.z):(Et=0,le=0,Ie=0);let ce=rt.convert(L.format),hn=rt.convert(L.type),bt;L.isData3DTexture?(N.setTexture3D(L,0),bt=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(N.setTexture2DArray(L,0),bt=D.TEXTURE_2D_ARRAY):(N.setTexture2D(L,0),bt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Un=D.getParameter(D.UNPACK_ROW_LENGTH),Qt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ui=D.getParameter(D.UNPACK_SKIP_PIXELS),xi=D.getParameter(D.UNPACK_SKIP_ROWS),ga=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,De.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,De.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Pt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,kt);let $a=M.isDataArrayTexture||M.isData3DTexture,pe=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let en=x.get(M),xs=x.get(L),Je=x.get(en.__renderTarget),Ss=x.get(xs.__renderTarget);St.bindFramebuffer(D.READ_FRAMEBUFFER,Je.__webglFramebuffer),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ss.__webglFramebuffer);for(let tr=0;tr<xt;tr++)$a&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,x.get(M).__webglTexture,F,kt+tr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,x.get(L).__webglTexture,ct,Ie+tr)),D.blitFramebuffer(Mt,Pt,ft,ut,Et,le,ft,ut,D.DEPTH_BUFFER_BIT,D.NEAREST);St.bindFramebuffer(D.READ_FRAMEBUFFER,null),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||x.has(M)){let en=x.get(M),xs=x.get(L);St.bindFramebuffer(D.READ_FRAMEBUFFER,Kb),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,Qb);for(let Je=0;Je<xt;Je++)$a?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,en.__webglTexture,F,kt+Je):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,en.__webglTexture,F),pe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xs.__webglTexture,ct,Ie+Je):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xs.__webglTexture,ct),F!==0?D.blitFramebuffer(Mt,Pt,ft,ut,Et,le,ft,ut,D.COLOR_BUFFER_BIT,D.NEAREST):pe?D.copyTexSubImage3D(bt,ct,Et,le,Ie+Je,Mt,Pt,ft,ut):D.copyTexSubImage2D(bt,ct,Et,le,Mt,Pt,ft,ut);St.bindFramebuffer(D.READ_FRAMEBUFFER,null),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else pe?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(bt,ct,Et,le,Ie,ft,ut,xt,ce,hn,De.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(bt,ct,Et,le,Ie,ft,ut,xt,ce,De.data):D.texSubImage3D(bt,ct,Et,le,Ie,ft,ut,xt,ce,hn,De):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ct,Et,le,ft,ut,ce,hn,De.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ct,Et,le,De.width,De.height,ce,De.data):D.texSubImage2D(D.TEXTURE_2D,ct,Et,le,ft,ut,ce,hn,De);D.pixelStorei(D.UNPACK_ROW_LENGTH,Un),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ui),D.pixelStorei(D.UNPACK_SKIP_ROWS,xi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ga),ct===0&&L.generateMipmaps&&D.generateMipmap(bt),St.unbindTexture()},this.initRenderTarget=function(M){x.get(M).__webglFramebuffer===void 0&&N.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?N.setTextureCube(M,0):M.isData3DTexture?N.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?N.setTexture2DArray(M,0):N.setTexture2D(M,0),St.unbindTexture()},this.resetState=function(){R=0,O=0,P=null,St.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}};var Yd=class extends Wa{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new ra;t.deleteAttribute("uv");let n=new Oi({side:un}),i=new Oi,s=new Pi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let a=new de(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let r=new Hl(t,i,6),o=new xn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),r.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),r.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),r.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),r.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),r.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),r.setMatrixAt(5,o.matrix),this.add(r);let l=new de(t,Mo(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new de(t,Mo(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let d=new de(t,Mo(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let f=new de(t,Mo(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new de(t,Mo(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let p=new de(t,Mo(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(n=>{n.isMesh&&(t.add(n.geometry),t.add(n.material))});for(let n of t)n.dispose()}};function Mo(e){return new Yl({color:0,emissive:16777215,emissiveIntensity:e})}var v2="/BNW_LOGO.png";function _2(e){let t=e.naturalWidth||e.videoWidth||e.width,n=e.naturalHeight||e.videoHeight||e.height;if(!t||!n)return new Xe(e);let i=document.createElement("canvas");i.width=t,i.height=n;let s=i.getContext("2d",{willReadFrequently:!0});if(!s)return new Xe(e);s.drawImage(e,0,0,t,n);let a=s.getImageData(0,0,t,n),{data:r}=a,o=t,l=n,c=-1,d=-1;for(let E=0;E<n;E+=1)for(let A=0;A<t;A+=1){let C=(E*t+A)*4,y=r[C+3],T=Math.max(r[C],r[C+1],r[C+2]);y>8&&T>12&&(A<o&&(o=A),E<l&&(l=E),A>c&&(c=A),E>d&&(d=E))}(c<o||d<l)&&(o=0,l=0,c=t-1,d=n-1);let f=c-o+1,u=d-l+1,p=Math.max(4,Math.round(Math.max(f,u)*.02)),v=Math.min(Math.max(t,n),Math.max(f,u)+p*2),b=(o+c)/2,g=(l+d)/2,h=Math.round(b-v/2),m=Math.round(g-v/2);h=Math.max(0,Math.min(t-v,h)),m=Math.max(0,Math.min(n-v,m));let _=document.createElement("canvas");_.width=v,_.height=v;let S=_.getContext("2d");return S?(S.clearRect(0,0,v,v),S.drawImage(e,h,m,v,v,0,0,v,v),new kl(_)):new Xe(e)}function zb(e){e.magFilter=Be,e.minFilter=Be,e.generateMipmaps=!1,"colorSpace"in e&&(e.colorSpace=mn),e.center.set(.5,.5),e.repeat.set(1,1),e.needsUpdate=!0}function Vb(e){let t=e?.querySelector(".about-sprite-wrap"),n=t?.querySelector(".about-logo-sprite"),i=e?.querySelector(".about-stage"),s=i?.querySelector(".about-light-cone");if(!t||!n||t.dataset.threeMounted==="1")return()=>{};t.dataset.threeMounted="1",t.classList.add("three-ready"),i?.classList.add("three-ready");let a=document.createElement("div");a.className="about-coin-stage",t.appendChild(a);let r=document.createElement("div");r.className="about-3d-host",a.appendChild(r);let o=document.createElement("div");o.id="ground-shadow",a.appendChild(o);let l=!1,c=0,d=null,f=null,u=null,p=null,v=null,b=null,g=null,h=null,m=null,_=null,S=null,E=null,A=null,C=null,y=null,T=null,I=null,R=null,O=[],P=()=>{!f||!u||!p||f.render(u,p)},H=()=>{if(!f||!p)return;let K=Math.max(280,Math.round(r.clientWidth||480)),Nt=Math.max(280,Math.round(r.clientHeight||K)),Tt=Math.max(1,Math.floor(K/6)),wt=Math.max(1,Math.floor(Nt/6));f.setSize(Tt,wt,!1),f.domElement.style.width=`${K}px`,f.domElement.style.height=`${Nt}px`,f.domElement.style.imageRendering="pixelated",p.aspect=K/Nt,p.updateProjectionMatrix(),P()};try{f=new Xd({antialias:!1,alpha:!0,powerPreference:"high-performance"}),f.setClearColor(0,0),f.toneMapping=nc,f.toneMappingExposure=1.8}catch(K){return console.error("[monitor-ui] failed to create WebGL renderer:",K),t.dataset.threeMounted="0",t.classList.remove("three-ready"),i?.classList.remove("three-ready"),a.remove(),r.remove(),o.remove(),()=>{}}f.setPixelRatio(1),"outputColorSpace"in f&&(f.outputColorSpace=mn),f.domElement.style.imageRendering="pixelated",f.domElement.setAttribute("aria-hidden","true"),r.appendChild(f.domElement),u=new Wa,p=new ln(40,1,.1,100),p.position.set(0,.06,4.9);let k=new So(f);v=k.fromScene(new Yd),u.environment=v.texture,u.background=null,k.dispose();let B=new $l(16772829,3);u.add(B);let z=new Pi(15751760,80,14);z.position.set(2.5,3,3),u.add(z);let et=new Pi(4482764,20,12);et.position.set(-3,-1,2),u.add(et);let Q=new Pi(16742246,50,10);Q.position.set(0,-2.5,-3),u.add(Q);let lt=new Pi(16777215,120,6);lt.position.set(1,1.5,2),u.add(lt),C=new Wl(1.14,1.14,.14,32,1,!0),y=new oa(1.13,32),T=new oa(1.13,32),I=new oa(1.14,32),R=new oa(1.14,32);let pt=new Oi({color:8201257,metalness:.95,roughness:.05,emissive:new zt("#260709"),emissiveIntensity:.22,transparent:!1,depthWrite:!0}),ht=new Oi({map:null,metalness:.85,roughness:.08,emissive:new zt("#ffffff"),emissiveIntensity:.25,transparent:!0,alphaTest:.1,depthWrite:!0,side:ai}),Lt=new Oi({map:null,metalness:.85,roughness:.08,emissive:new zt("#ffffff"),emissiveIntensity:.25,transparent:!0,alphaTest:.1,depthWrite:!0,side:ai}),oe=new qa({color:656133,transparent:!1,depthWrite:!0});O=[pt,ht,Lt,oe],b=new ms,b.rotation.z=.05,u.add(b),g=new de(C,pt),g.rotation.x=Math.PI/2,b.add(g),h=new de(y,oe),h.position.z=.065,b.add(h),m=new de(T,oe),m.position.z=-.065,m.rotation.y=Math.PI,b.add(m),_=new de(I,ht),_.position.z=.07,b.add(_),S=new de(R,Lt),S.position.z=-.07,S.rotation.y=Math.PI,b.add(S),E=new Jl().load(v2,()=>{let K=_2(E.image);E.dispose(),E=K,zb(E),A=E.clone(),zb(A),A.repeat.set(-1,1),A.offset.set(1,0),A.needsUpdate=!0,ht.map=E,ht.needsUpdate=!0,Lt.map=A,Lt.needsUpdate=!0,P()});let Z=new tc,nt=()=>{if(l)return;let K=Z.getElapsedTime(),Nt=Math.sin(K*1.55)*.18,Tt=(Math.sin(K*1.55)+1)/2,wt=K*2.02;if(b&&(b.position.y=Nt,b.rotation.y=wt,b.rotation.z=.05+Math.sin(K*.7)*.025),z.position.x=Math.cos(K*.6)*3,z.position.z=Math.sin(K*.6)*3+1,lt.position.x=Math.cos(K*2.5)*2,lt.position.y=Math.sin(K*1.8)*1.5,lt.position.z=2,o){let Ae=(Math.sin(K*1.55)+1)/2;document.getElementById("ground-shadow").style.transform=`translateX(-50%) scaleX(${(.88+Ae*.28).toFixed(3)}) scaleY(${(.7+Ae*.3).toFixed(3)})`,document.getElementById("ground-shadow").style.opacity=(.4+Ae*.45).toFixed(3)}if(s){let Ae=.94+Tt*.08,Yt=.98+Tt*.16,$t=-Tt*16;s.style.transform=`translateX(-50%) translateY(${$t.toFixed(2)}px) scaleX(${Ae.toFixed(3)}) scaleY(${Yt.toFixed(3)})`,s.style.opacity=`${(.56+Tt*.14).toFixed(3)}`}P(),c=window.requestAnimationFrame(nt)};return H(),nt(),"ResizeObserver"in window?(d=new ResizeObserver(()=>H()),d.observe(r)):window.addEventListener("resize",H),()=>{l=!0,window.cancelAnimationFrame(c),d?d.disconnect():window.removeEventListener("resize",H),g?.removeFromParent(),h?.removeFromParent(),m?.removeFromParent(),_?.removeFromParent(),S?.removeFromParent(),b?.removeFromParent(),C?.dispose(),y?.dispose(),T?.dispose(),I?.dispose(),R?.dispose(),E?.dispose(),A?.dispose(),v?.dispose(),O.forEach(K=>K.dispose()),f?.dispose(),a.remove(),t.classList.remove("three-ready"),i?.classList.remove("three-ready"),s&&(s.style.removeProperty("transform"),s.style.removeProperty("opacity")),delete t.dataset.threeMounted}}var e0={pynq:`<div class="app-shell">
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
            <img
              class="about-logo-sprite"
              src="/PNG_LOGO.png"
              alt="PYNQCAST logo"
              draggable="false"
            >
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
            <img
              class="about-logo-sprite"
              src="/PNG_LOGO.png"
              alt="PYNQCAST logo"
              draggable="false"
            >
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
</div>`};var s0=mc(n0()),i0=["/monitor-state.js","/monitor-render.js","/monitor-app.js"];function S2(){if(window.__monitorLegacyBootstrapped)return;window.__monitorLegacyBootstrapped=!0;let e=t=>{if(t>=i0.length){window.dispatchEvent(new Event("monitor:legacy-ready"));return}let n=document.createElement("script");n.src=i0[t],n.async=!1,n.onload=()=>e(t+1),n.onerror=()=>{console.error(`[monitor-ui] failed to load legacy script: ${i0[t]}`)},document.body.appendChild(n)};e(0)}function b2({mode:e}){let t=(0,Jd.useRef)(null);return(0,Jd.useEffect)(()=>{let n=Vb(t.current);return S2(),()=>n()},[]),(0,s0.jsx)("div",{ref:t,className:"react-monitor-root",dangerouslySetInnerHTML:{__html:e0[e]||e0.pynq}})}var M2=window.__MONITOR_MODE__==="sim"?"sim":"pynq",Wb=document.getElementById("root");if(!Wb)throw new Error("Missing #root for monitor React mount");(0,Xb.createRoot)(Wb).render((0,s0.jsx)(b2,{mode:M2}));})();
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
