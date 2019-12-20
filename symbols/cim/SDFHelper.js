// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../geometry/support/jsonUtils","./packingUtils","./Rect"],function(r,n,a,t,o){function e(r){if(!r)return null;switch(r.type){case"CIMPointSymbol":var n=r.symbolLayers;return n&&1===n.length?e(n[0]):null;case"CIMVectorMarker":var a=r.markerGraphics;if(!a||1!==a.length)return null;var t=a[0];if(!t)return null;var o=t.geometry;if(!o)return null;var i=t.symbol;return!i||"CIMPolygonSymbol"!==i.type&&"CIMLineSymbol"!==i.type?null:{geom:o,asFill:"CIMPolygonSymbol"===i.type};case"sdf":return{geom:r.geom,asFill:r.asFill}}return null}function i(r){var n=r.markerGraphics;if(!n||1!==n.length)return null;var a=n[0];if(!a)return null;var t=a.symbol;return!t||"CIMPolygonSymbol"!==t.type&&"CIMLineSymbol"!==t.type?null:t}function l(r){return r?r.rings?r.rings:r.paths?r.paths:void 0!==r.xmin&&void 0!==r.ymin&&void 0!==r.xmax&&void 0!==r.ymax?[[[r.xmin,r.ymin],[r.xmin,r.ymax],[r.xmax,r.ymax],[r.xmax,r.ymin],[r.xmin,r.ymin]]]:null:null}function v(r){for(var n=1/0,a=-1/0,t=1/0,e=-1/0,i=0,l=r;i<l.length;i++)for(var v=l[i],f=0,u=v;f<u.length;f++){var m=u[f];m[0]<n&&(n=m[0]),m[0]>a&&(a=m[0]),m[1]<t&&(t=m[1]),m[1]>e&&(e=m[1])}return new o.default(n,t,a-n,e-t)}function f(r){for(var n=1/0,a=-1/0,t=1/0,o=-1/0,e=0,i=r;e<i.length;e++)for(var l=i[e],v=0,f=l;v<f.length;v++){var u=f[v];u[0]<n&&(n=u[0]),u[0]>a&&(a=u[0]),u[1]<t&&(t=u[1]),u[1]>o&&(o=u[1])}return[n,t,a,o]}function u(r){return r?r.rings?f(r.rings):r.paths?f(r.paths):a.isExtent(r)?[r.xmin,r.ymin,r.xmax,r.ymax]:null:null}function m(r,n,a,t,o){var e=r[0],i=r[1],l=r[2],v=r[3];if(l<e||v<i)return[0,0,0];var f=l-e,u=v-i,m=Math.floor(31.5),h=128-2*(m+1),y=Math.max(f,u),x=h/y,s=Math.round(f*x),g=Math.round(u*x),M=s+2*m,d=g+2*m,c=1;if(n){c=d/x/(n.ymax-n.ymin)}var p=0,b=0;if(t)if(o){if(n&&a&&n.ymax-n.ymin>0){var S=(n.xmax-n.xmin)/(n.ymax-n.ymin);p=t.x/(a*S),b=t.y/a}}else p=t.x,b=t.y;return p=.5*(n.xmax+n.xmin)+p*(n.xmax-n.xmin),b=.5*(n.ymax+n.ymin)+b*(n.ymax-n.ymin),p-=e,b-=i,p*=x,b*=x,p+=m,b+=m,[c,p/M-.5,-(b/d-.5)]}function h(r){for(var n=l(r.geom),a=v(n),t=Math.floor(31.5),o=128-2*(t+1),e=Math.max(a.width,a.height),i=o/e,f=Math.round(a.width*i),u=Math.round(a.height*i),m=f+2*t,h=u+2*t,g=[],M=0,d=n;M<d.length;M++){var c=d[M];if(c&&c.length>1){for(var p=[],b=0,S=c;b<S.length;b++){var F=S[b],I=F[0],C=F[1];I-=a.x,C-=a.y,I*=i,C*=i,I+=t-.5,C+=t-.5,p.push([I,C])}if(r.asFill){var w=p.length-1;p[0][0]===p[w][0]&&p[0][1]===p[w][1]||p.push(p[0])}g.push(p)}}var k=y(g,m,h,t);return r.asFill&&x(g,m,h,t,k),[s(k,t),m,h]}function y(r,n,a,t){for(var o=n*a,e=new Array(o),i=t*t+1,l=0;l<o;++l)e[l]=i;for(var v=0,f=r;v<f.length;v++)for(var u=f[v],m=u.length,l=1;l<m;++l){var h=u[l-1],y=u[l],x=void 0,s=void 0;h[0]<y[0]?(x=h[0],s=y[0]):(x=y[0],s=h[0]);var g=void 0,M=void 0;h[1]<y[1]?(g=h[1],M=y[1]):(g=y[1],M=h[1]);var d=Math.floor(x)-t,c=Math.floor(s)+t,p=Math.floor(g)-t,b=Math.floor(M)+t;d<0&&(d=0),c>n&&(c=n),p<0&&(p=0),b>a&&(b=a);for(var S=y[0]-h[0],F=y[1]-h[1],I=S*S+F*F,C=d;C<c;C++)for(var w=p;w<b;w++){var k=(C-h[0])*S+(w-h[1])*F,P=void 0,D=void 0;k<0?(P=h[0],D=h[1]):k>I?(P=y[0],D=y[1]):(k/=I,P=h[0]+k*S,D=h[1]+k*F);var A=(C-P)*(C-P)+(w-D)*(w-D),G=(a-w-1)*n+C;A<e[G]&&(e[G]=A)}}for(var l=0;l<o;++l)e[l]=Math.sqrt(e[l]);return e}function x(r,n,a,t,o){for(var e=0,i=r;e<i.length;e++)for(var l=i[e],v=l.length,f=1;f<v;++f){var u=l[f-1],m=l[f],h=void 0,y=void 0;u[0]<m[0]?(h=u[0],y=m[0]):(h=m[0],y=u[0]);var x=void 0,s=void 0;u[1]<m[1]?(x=u[1],s=m[1]):(x=m[1],s=u[1]);var g=Math.floor(h),M=Math.floor(y)+1,d=Math.floor(x),c=Math.floor(s)+1;g<t&&(g=t),M>n-t&&(M=n-t),d<t&&(d=t),c>a-t&&(c=a-t);for(var p=d;p<c;++p)if(u[1]>p!=m[1]>p){for(var b=(a-p-1)*n,S=g;S<M;++S)S<(m[0]-u[0])*(p-u[1])/(m[1]-u[1])+u[0]&&(o[b+S]=-o[b+S]);for(var S=t;S<g;++S)o[b+S]=-o[b+S]}}}function s(r,n){for(var a=2*n,o=r.length,e=new Uint8Array(4*o),i=0;i<o;++i){var l=.5-r[i]/a;t.packFloatRGBA(l,e,4*i)}return e}Object.defineProperty(n,"__esModule",{value:!0}),n.getSDFInfo=e,n.getSDFSymbol=i,n.getExtent=u,n.getSDFMetrics=m,n.buildSDF=h});