// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["require","exports","../geometry/Polygon","../Graphic","../geometry/Polyline","../geometry/Point","../geometry/Extent","../geometry/Multipoint","../geometry/SpatialReference","./languageUtils","./treeAnalysis","./Dictionary","./Feature","./FunctionWrapper","./functions/date","./functions/string","./functions/maths","./functions/geometry","./functions/stats","./ImmutablePathArray","./ImmutablePointArray","../geometry/Geometry"],function(e,r,t,n,o,a,i,s,u,l,c,f,h,p,E,d,g,m,w,v,N,I){function y(e,r){for(var t=[],n=0;n<r.arguments.length;n++)t.push(T(e,r.arguments[n]));return t}function b(e,r,t){try{return t(e,r,y(e,r))}catch(n){throw n}}function S(e){return e instanceof fr||e instanceof p}function T(e,r){try{switch(r.type){case"EmptyStatement":return hr;case"VariableDeclarator":return B(e,r);case"VariableDeclaration":return k(e,r);case"BlockStatement":return _(e,r);case"FunctionDeclaration":return V(e,r);case"ReturnStatement":return L(e,r);case"IfStatement":return D(e,r);case"ExpressionStatement":return F(e,r);case"AssignmentExpression":return P(e,r);case"UpdateExpression":return U(e,r);case"BreakStatement":return pr;case"ContinueStatement":return Er;case"ForStatement":return C(e,r);case"ForInStatement":return R(e,r);case"Identifier":return H(e,r);case"MemberExpression":return G(e,r);case"Literal":return r.value;case"ThisExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"CallExpression":return W(e,r);case"UnaryExpression":return q(e,r);case"BinaryExpression":return z(e,r);case"LogicalExpression":return Z(e,r);case"ConditionalExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return j(e,r);case"ObjectExpression":return M(e,r);case"Property":return O(e,r);case"Array":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(t){throw t}}function M(e,r){for(var t={},n=0;n<r.properties.length;n++){var o=T(e,r.properties[n]);if(S(o.value))throw new Error("Illegal Argument");if(l.isString(o.key)===!1)throw new Error("Illegal Argument");t[o.key.toString()]=o.value}var a=new f(t);return a.immutable=!1,a}function O(e,r){return{key:"Identifier"===r.key.type?r.key.name:T(e,r.key),value:T(e,r.value)}}function R(e,r){var t=T(e,r.right);"VariableDeclaration"===r.left.type&&T(e,r.left);var n=null,o="VariableDeclaration"===r.left.type?r.left.declarations[0].id.name:r.left.name;if(null!==e.localScope&&void 0!==e.localScope[o]&&(n=e.localScope[o]),null===n&&void 0!==e.globalScope[o]&&(n=e.globalScope[o]),null===n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTDECLARED"));if(l.isArray(t)||l.isString(t)){for(var a=t.length,i=0;a>i;i++){n.value=i;var s=T(e,r.body);if(s===pr)break;if(s instanceof lr)return s}return hr}if(l.isImmutableArray(t)){for(var i=0;i<t.length();i++){n.value=i;var s=T(e,r.body);if(s===pr)break;if(s instanceof lr)return s}return hr}if(!(t instanceof f||t instanceof h))return hr;for(var u=t.keys(),p=0;p<u.length;p++){n.value=u[p];var s=T(e,r.body);if(s===pr)break;if(s instanceof lr)return s}}function C(e,r){null!==r.init&&T(e,r.init);var t={testResult:!0,lastAction:hr};do A(e,r,t);while(t.testResult===!0);return t.lastAction instanceof lr?t.lastAction:hr}function A(e,r,t){if(null!==r.test){if(t.testResult=T(e,r.test),t.testResult===!1)return;if(t.testResult!==!0)throw new Error(c.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))}return t.lastAction=T(e,r.body),t.lastAction===pr?void(t.testResult=!1):t.lastAction instanceof lr?void(t.testResult=!1):void(null!==r.update&&T(e,r.update))}function U(e,r){var t,n=null,o=!1,a="";if("MemberExpression"===r.argument.type){if(o=!0,n=T(e,r.argument.object),a=r.argument.computed===!0?T(e,r.argument.property):r.argument.property.name,l.isArray(n)){if(!l.isNumber(a))throw new Error("Invalid Parameter");if(0>a||a>=n.length)throw new Error("Assignment outside of array bounds");t=n[a],n[a]=l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1}else if(n instanceof f){if(l.isString(a)===!1)throw new Error("Dictionary accessor must be a string");if(n.hasField(a)!==!0)throw new Error("Invalid Parameter");t=n.field(a),n.setField(a,l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1)}else{if(!(n instanceof h))throw new Error(l.isImmutableArray(n)?"Array is Immutable":"Invalid Parameter");if(l.isString(a)===!1)throw new Error("Feature accessor must be a string");if(n.hasField(a)!==!0)throw new Error("Invalid Parameter");t=n.field(a),n.setField(a,l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1)}return r.prefix===!1?l.isNumber(t)===!1?0/0:t:l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1}if(n=r.argument.name.toLowerCase(),null!==e.localScope&&void 0!==e.localScope[n])return t=e.localScope[n].value,e.localScope[n]={value:l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1,valueset:!0,node:r},r.prefix===!1?l.isNumber(t)===!1?0/0:t:l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1;if(void 0!==e.globalScope[n])return t=e.globalScope[n].value,e.globalScope[n]={value:l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1,valueset:!0,node:r},r.prefix===!1?l.isNumber(t)===!1?0/0:t:l.isNumber(t)===!1?0/0:"++"===r.operator?t+1:t-1;throw new Error("Variable not recognised")}function x(e,r,t,n){switch(r){case"=":return e;case"/=":return l.toNumber(t)/l.toNumber(e);case"*=":return l.toNumber(t)*l.toNumber(e);case"-=":return l.toNumber(t)-l.toNumber(e);case"+=":return l.isString(t)||l.isString(e)?l.toString(t)+l.toString(e):l.toNumber(t)+l.toNumber(e);case"%=":return l.toNumber(t)%l.toNumber(e);default:throw new Error(c.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}}function P(e,r){var t=T(e,r.right),n=null,o=!1,a="";if("MemberExpression"===r.left.type){if(o=!0,n=T(e,r.left.object),a=r.left.computed===!0?T(e,r.left.property):r.left.property.name,l.isArray(n)){if(!l.isNumber(a))throw new Error("Invalid Parameter");if(0>a||a>n.length)throw new Error("Assignment outside of array bounds");if(a===n.length){if("="!==r.operator)throw new Error("Invalid Parameter");n[a]=x(t,r.operator,n[a],r)}else n[a]=x(t,r.operator,n[a],r)}else if(n instanceof f){if(l.isString(a)===!1)throw new Error("Dictionary accessor must be a string");if(n.hasField(a)===!0)n.setField(a,x(t,r.operator,n.field(a),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");n.setField(a,x(t,r.operator,null,r))}}else{if(!(n instanceof h))throw new Error(l.isImmutableArray(n)?"Array is Immutable":"Invalid Parameter");if(l.isString(a)===!1)throw new Error("Feature accessor must be a string");if(n.hasField(a)===!0)n.setField(a,x(t,r.operator,n.field(a),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");n.setField(a,x(t,r.operator,null,r))}}return hr}if(n=r.left.name.toLowerCase(),null!==e.localScope&&void 0!==e.localScope[n])return e.localScope[n]={value:x(t,r.operator,e.localScope[n].value,r),valueset:!0,node:r.right},hr;if(void 0!==e.globalScope[n])return e.globalScope[n]={value:x(t,r.operator,e.globalScope[n].value,r),valueset:!0,node:r.right},hr;throw new Error("Variable not recognised")}function F(e,r){if("AssignmentExpression"===r.expression.type||"UpdateExpression"===r.expression.type)return T(e,r.expression);if("CallExpression"===r.expression.type){var t=T(e,r.expression);return t===hr?hr:new cr(t)}var t=T(e,r.expression);return t===hr?hr:new cr(t)}function D(e,r){if("AssignmentExpression"===r.test.type||"UpdateExpression"===r.test.type)throw new Error(c.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var t=T(e,r.test);if(t===!0)return T(e,r.consequent);if(t===!1)return null!==r.alternate?T(e,r.alternate):hr;throw new Error(c.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))}function _(e,r){for(var t=hr,n=0;n<r.body.length;n++)if(t=T(e,r.body[n]),t instanceof lr||t===pr||t===Er)return t;return t}function L(e,r){if(null===r.argument)return new lr(hr);var t=T(e,r.argument);return new lr(t)}function V(e,r){var t=r.id.name.toLowerCase();return e.globalScope[t]={valueset:!0,node:null,value:new p(r,e)},hr}function k(e,r){for(var t=0;t<r.declarations.length;t++)T(e,r.declarations[t]);return hr}function B(e,r){var t=null===r.init?null:T(e,r.init),n=r.id.name.toLowerCase();return null!==e.localScope?e.localScope[n]={value:t,valueset:!0,node:r.init}:e.globalScope[n]={value:t,valueset:!0,node:r.init},hr}function Y(e,r,t,n){var o;switch(r=r.toLowerCase()){case"hasz":var a=e.hasZ;return void 0===a?!1:a;case"hasm":var i=e.hasM;return void 0===i?!1:i;case"spatialreference":var s=e.spatialReference._arcadeCacheId;if(void 0===s){var u=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(u=!1),u&&(dr++,e.spatialReference._arcadeCacheId=dr,s=dr)}var h=new f({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==s&&(h._arcadeCacheId="SPREF"+s.toString()),h}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":var p=e[r];return void 0!==p?p:null;case"type":return"Extent"}break;case"polygon":switch(r){case"rings":o=l.isVersion4?e.cache._arcadeCacheId:e.getCacheValue("_arcadeCacheId"),void 0===o&&(dr++,o=dr,l.isVersion4?e.cache._arcadeCacheId=o:e.setCacheValue("_arcadeCacheId",o));var E=new v(e.rings,e.spatialReference,e.hasZ===!0,e.hasM===!0,o);return E;case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":o=l.isVersion4?e.cache._arcadeCacheId:e.getCacheValue("_arcadeCacheId"),void 0===o&&(dr++,o=dr,l.isVersion4?e.cache._arcadeCacheId=o:e.setCacheValue("_arcadeCacheId",o));var E=new v(e.paths,e.spatialReference,e.hasZ===!0,e.hasM===!0,o);return E;case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":o=l.isVersion4?e.cache._arcadeCacheId:e.getCacheValue("_arcadeCacheId"),void 0===o&&(dr++,o=dr,l.isVersion4?e.cache._arcadeCacheId=o:e.setCacheValue("_arcadeCacheId",o));var E=new N(e.points,e.spatialReference,e.hasZ===!0,e.hasM===!0,o,1);return E;case"type":return"Multipoint"}}throw new Error(c.nodeErrorMessage(n,"RUNTIME","PROPERTYNOTFOUND"))}function G(e,r){try{var t=T(e,r.object);if(null===t)throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"));if(r.computed===!1){if(t instanceof f||t instanceof h)return t.field(r.property.name);if(t instanceof I)return Y(t,r.property.name,e,r);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}var n=T(e,r.property);if(t instanceof f||t instanceof h){if(l.isString(n))return t.field(n);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(t instanceof I){if(l.isString(n))return Y(t,n,e,r);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isArray(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n>=t.length||0>n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t[n]}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isString(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n>=t.length||0>n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t[n]}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isImmutableArray(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n>=t.length()||0>n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t.get(n)}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}catch(o){throw o}}function q(e,r){try{var t=T(e,r.argument);if(l.isBoolean(t)){if("!"===r.operator)return!t;throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}if(l.isNumber(t)){if("-"===r.operator)return-1*t;if("+"===r.operator)return 1*t;throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDTYPE"))}catch(n){throw n}}function j(e,r){try{for(var t=[],n=0;n<r.elements.length;n++){var o=T(e,r.elements[n]);if(S(o))throw new Error(c.nodeErrorMessage(r,"RUNTIME","FUNCTIONCONTEXTILLEGAL"));t.push(o)}return t}catch(a){throw a}}function z(e,r){try{var t=[T(e,r.left),T(e,r.right)],n=t[0],o=t[1];switch(r.operator){case"==":return l.equalityTest(n,o);case"=":return l.equalityTest(n,o);case"!=":return!l.equalityTest(n,o);case"<":return o>n;case">":return n>o;case"<=":return o>=n;case">=":return n>=o;case"+":return l.isString(n)||l.isString(o)?l.toString(n)+l.toString(o):l.toNumber(n)+l.toNumber(o);case"-":return l.toNumber(n)-l.toNumber(o);case"*":return l.toNumber(n)*l.toNumber(o);case"/":return l.toNumber(n)/l.toNumber(o);case"%":return l.toNumber(n)%l.toNumber(o);default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","OPERATORNOTRECOGNISED"))}}catch(a){throw a}}function Z(e,r){try{if("AssignmentExpression"===r.left.type||"UpdateExpression"===r.left.type)throw new Error(c.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===r.right.type||"UpdateExpression"===r.right.type)throw new Error(c.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var t=[T(e,r.left),T(e,r.right)],n=t[0],o=t[1];if(!l.isBoolean(n)||!l.isBoolean(o))throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYBOOLEAN"));switch(r.operator){case"||":return n||o;case"&&":return n&&o;default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}}catch(a){throw a}}function H(e,r){var t;try{var n=r.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[n])return t=e.localScope[n],t.valueset===!0?t.value:(t.value=T(e,t.node),t.valueset=!0,t.value);if(void 0!==e.globalScope[n])return t=e.globalScope[n],t.valueset===!0?t.value:(t.value=T(e,t.node),t.valueset=!0,t.value);throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND"))}catch(o){throw o}}function W(e,r){try{if("Identifier"!==r.callee.type)throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));if(null!==e.localScope&&void 0!==e.localScope[r.callee.name.toLowerCase()]){var t=e.localScope[r.callee.name.toLowerCase()];if(t.value instanceof fr)return t.value.fn(e,r);if(t.value instanceof p)return rr(e,r,t.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}if(void 0!==e.globalScope[r.callee.name.toLowerCase()]){var t=e.globalScope[r.callee.name.toLowerCase()];if(t.value instanceof fr)return t.value.fn(e,r);if(t.value instanceof p)return rr(e,r,t.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(n){throw n}}function K(e){return null==e?"":l.isArray(e)?"Array":l.isImmutableArray(e)?"Array":l.isDate(e)?"Date":l.isString(e)?"String":l.isBoolean(e)?"Boolean":l.isNumber(e)?"Number":e instanceof f?"Dictionary":e instanceof h?"Feature":e instanceof a?"Point":e instanceof t?"Polygon":e instanceof o?"Polyline":e instanceof s?"Multipoint":e instanceof i?"Extent":S(e)?"Function":e===hr?"Void":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function X(e,r,t,n){try{var o=T(e,r.arguments[t]);if(l.equalityTest(o,n))return T(e,r.arguments[t+1]);var a=r.arguments.length-t;return 1===a?T(e,r.arguments[t]):2===a?null:X(e,r,t+2,n)}catch(i){throw i}}function J(e,r,t,n){try{if(n===!0)return T(e,r.arguments[t+1]);var o=r.arguments.length-t;if(3===o)return T(e,r.arguments[t+2]);var a=T(e,r.arguments[t+2]);if(l.isBoolean(a)===!1)throw new Error("WHEN needs boolean test conditions");return J(e,r,t+2,a)}catch(i){throw i}}function Q(e,r){var t=e.length,n=Math.floor(t/2);return 0===t?[]:1===t?[e[0]]:$(Q(e.slice(0,n),r),Q(e.slice(n,t),r),r)}function $(e,r,t){for(var n=[];e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=t(e[0],r[0]);isNaN(o)&&(o=0),0>=o?(n.push(e[0]),e=e.slice(1)):(n.push(r[0]),r=r.slice(1))}else e.length>0?(n.push(e[0]),e=e.slice(1)):r.length>0&&(n.push(r[0]),r=r.slice(1));return n}function er(e,r,t){try{var n=e.body;if(t.length!==e.params.length)throw new Error("Invalid Parameter calls to function.");for(var o=0;o<t.length;o++)r.localScope[e.params[o].name.toLowerCase()]={d:null,value:t[o],valueset:!0,node:null};var a=T(r,n);if(a instanceof lr)return a.value;if(a===pr)throw new Error("Cannot Break from a Function");if(a===Er)throw new Error("Cannot Continue from a Function");return a instanceof cr?a.value:a}catch(i){throw i}}function rr(e,r,t){return b(e,r,function(r,n,o){var a={spatialReference:e.spatialReference,applicationCache:void 0===e.applicationCache?null:e.applicationCache,globalScope:e.globalScope,depthCounter:e.depthCounter+1,localScope:{}};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return er(t,a,o)})}function tr(e){var r=function(){var r={applicationCache:void 0===e.context.applicationCache?null:e.context.applicationCache,spatialReference:e.context.spatialReference,localScope:{},depthCounter:e.context.depthCounter+1,globalScope:e.context.globalScope};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return er(e.definition,r,arguments)};return r}function nr(e,r,t){var o={};e||(e={}),t||(t={});var a=new f({newline:"\n",tab:"	",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});a.immutable=!1,o.textformatting={value:a,valueset:!0,node:null},o.infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},o.pi={value:Math.PI,valueset:!0,node:null};for(var i in r)o[i]={value:new fr(r[i]),valueset:!0,node:null};for(var i in t)o[i]={value:new fr(t[i]),"native":!0,valueset:!0,node:null};for(var i in e)o[i]=e[i]instanceof n?{value:new h(e[i]),valueset:!0,node:null}:{value:e[i],valueset:!0,node:null};return o}function or(e,r,t){t||(t=new u(102100));var n=nr(r.vars,gr,r.customfunctions),o={spatialReference:t,globalScope:n,localScope:null,depthCounter:1,applicationCache:void 0===r.applicationCache?null:r.applicationCache},a=T(o,e.body[0].body);if(a instanceof lr&&(a=a.value),a instanceof cr&&(a=a.value),a===hr)throw new Error("Cannot return VOID");if(a===pr)throw new Error("Cannot return BREAK");if(a===Er)throw new Error("Cannot return CONTINUE");if(a instanceof p)throw new Error("Cannot return FUNCTION");if(a instanceof fr)throw new Error("Cannot return FUNCTION");return a}function ar(e,r){return void 0===r&&(r=!1),c.findFieldLiterals(e,r)}function ir(e,r){return c.validateScript(e,r,"simple")}function sr(e,r){return c.referencesMember(e,r)}function ur(e,r){return c.referencesFunction(e,r)}var lr=function(){function e(e){this.value=e}return e}(),cr=function(){function e(e){this.value=e}return e}(),fr=function(){function e(e){this.fn=e}return e}(),hr={type:"VOID"},pr={type:"BREAK"},Er={type:"CONTINUE"},dr=0,gr={};E.registerFunctions(gr,b),d.registerFunctions(gr,b),g.registerFunctions(gr,b),m.registerFunctions(gr,b,S),w.registerFunctions(gr,b),gr["typeof"]=function(e,r){return b(e,r,function(e,r,t){l.pcCheck(t,1,1);var n=K(t[0]);if("Unrecognised Type"===n)throw new Error("Unrecognised Type");return n})},gr.iif=function(e,r){try{l.pcCheck(null===r.arguments?[]:r.arguments,3,3);var t=T(e,r.arguments[0]);if(l.isBoolean(t)===!1)throw new Error("IF Function must have a boolean test condition");return t===!0?T(e,r.arguments[1]):T(e,r.arguments[2])}catch(n){throw n}},gr.decode=function(e,r){try{if(r.arguments.length<2)throw new Error("Missing Parameters");if(2===r.arguments.length)return T(e,r.arguments[1]);if((r.arguments.length-1)%2===0)throw new Error("Must have a default value result.");var t=T(e,r.arguments[0]),n=1;return X(e,r,n,t)}catch(o){throw o}},gr.when=function(e,r){try{if(r.arguments.length<3)throw new Error("Missing Parameters");if(r.arguments.length%2===0)throw new Error("Must have a default value result.");var t=T(e,r.arguments[0]);if(l.isBoolean(t)===!1)throw new Error("WHEN needs boolean test conditions");var n=0;return J(e,r,n,t)}catch(o){throw o}},gr.top=function(e,r){return b(e,r,function(e,r,t){if(l.pcCheck(t,2,2),l.isArray(t[0]))return l.toNumber(t[1])>=t[0].length?t[0].slice(0):t[0].slice(0,l.toNumber(t[1]));if(l.isImmutableArray(t[0]))return l.toNumber(t[1])>=t[0].length()?t[0].slice(0):t[0].slice(0,l.toNumber(t[1]));throw new Error("Top cannot accept this parameter type")})},gr.first=function(e,r){return b(e,r,function(e,r,t){return l.pcCheck(t,1,1),l.isArray(t[0])?0===t[0].length?null:t[0][0]:l.isImmutableArray(t[0])?0===t[0].length()?null:t[0].get(0):null})},gr.sort=function(e,r){return b(e,r,function(e,r,t){l.pcCheck(t,1,2);var n=t[0];if(l.isImmutableArray(n)&&(n=n.toArray()),l.isArray(n)===!1)throw new Error("Illegal Argument");if(t.length>1){if(S(t[1])===!1)throw new Error("Illegal Argument");var o=n,a=tr(t[1]);return o=Q(o,function(e,r){return a(e,r)})}var o=n;if(0===o.length)return[];for(var i={},s=!0,u=0;u<o.length;u++){var c=K(o[u]);""!==c?i[c]=!0:s=!0}if(i.Array===!0||i.Dictionary===!0||i.Feature===!0||i.Point===!0||i.Polygon===!0||i.Polyline===!0||i.Multipoint===!0||i.Extent===!0||i.Function===!0)return o.slice(0);var f=0,h="";for(var p in i)f++,h=p;return o=f>1||"String"===h?Q(o,function(e,r){return null===e||void 0===e?null===r||void 0===r?0:1:null===r||void 0===r?-1:e.toString()<r.toString()?-1:e.toString()===r.toString()?0:1}):"Number"===h?Q(o,function(e,r){return e-r}):"Boolean"===h?Q(o,function(e,r){return e===r?0:r?-1:1}):"Date"===h?Q(o,function(e,r){return r-e}):o.slice(0)})};var mr={fixSpatialReference:l.fixSpatialReference,parseArguments:y,standardFunction:b};r.functionHelper=mr,r.executeScript=or,r.extractFieldLiterals=ar,r.validateScript=ir,r.referencesMember=sr,r.referencesFunction=ur});