// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Collection","../../../../core/Handles","../../../../core/Logger","../../../../core/throttle","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingRect","./FeatureTileDescriptor3D","./FeatureTileMeasurements3D","../../support/projectionUtils"],function(e,t,i,r,n,s,o,l,a,u,p,c,d,h,f){function y(){return v++}Object.defineProperty(t,"__esModule",{value:!0});var g=l.getLogger("esri.views.3d.layers.support.FeatureTileFetcher3D"),m=function(e){function t(t){var i=e.call(this,t)||this;return i.tiles=new s,i.tileSize=512,i.disableThrottling=!1,i.idToTile=new Map,i.handles=new o,i.clients=new Set,i.geometryEnginePromise=null,i}return i(t,e),Object.defineProperty(t.prototype,"tilingScheme",{get:function(){var e=this.tilingSchemeOwner.tilingScheme;return e?e.clone():null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtent",{set:function(e){if(e&&!e.spatialReference.equals(this.viewState.spatialReference))return void g.error("#extent","extent spatial reference needs to be in the same spatial reference as the view");var t=this._get("filterExtent");if(t!==e&&!(t&&e&&t.equals(e))){var i=e?e.clone():null;this._set("filterExtent",i),this.update()}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtentRect",{get:function(){if(!this.filterExtent||!this.tilingScheme)return null;var e=c.create();return f.extentToBoundingRect(this.filterExtent,e,this.tilingScheme.spatialReference),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rootTileIds",{get:function(){return this.filterExtentRect?this.tilingScheme.rootTilesInExtent(this.filterExtentRect):[[0,0,0]]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspended",{set:function(e){e!==this._get("suspended")&&(this._set("suspended",e),e||this.update())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this.throttledUpdate.hasPendingUpdates()||null!=this.geometryEnginePromise},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"changeId",{get:function(){var e=this._get("changeId")||0;return!this.hasClients||this.suspended?e:e+1},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.throttledUpdate=a.throttle(this.update,function(){return e.notifyChange("updating")},1e3,this);var t=this.disableThrottling?function(){return e.update}:this.throttledUpdate;this.handles.add(this.watch(["tilingScheme","tileSize"],function(){return e.tileMeasurements=null},!0)),this.handles.add(u.init(this,"changeId",t))},t.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null)},t.prototype.addClient=function(){var e=this,t=y();return this.clients.add(t),1===this.clients.size&&this.update(),{remove:function(){return e.removeClient(t)}}},t.prototype.removeClient=function(e){this.clients.delete(e),this.hasClients||this.update()},Object.defineProperty(t.prototype,"hasClients",{get:function(){return this.clients.size>0},enumerable:!0,configurable:!0}),t.prototype.update=function(){if(this.suspended)return void this.notifyChange("updating");if(!this.tilingScheme||!this.hasClients)return this.tiles.removeAll(),this.idToTile.clear(),void this.notifyChange("updating");this.tileMeasurements||(this.tileMeasurements=new h.FeatureTileMeasurements3D({renderCoordsHelper:this.renderCoordsHelper,tilingScheme:this.tilingScheme,tileSize:this.tileSize,maxVerticalScreenSize:b}));var e=this.viewState.camera,t=this.cameraOnSurface.location;this.tileMeasurements.begin(e,this.focus?this.focus.locationOnSurface:t,t.z),this.updateTiles(this.subdivideTilesForView(this.getRootTiles())),this.tileMeasurements.end(),this.notifyChange("updating")},t.prototype.getRootTiles=function(){var e=this;return this.rootTileIds.map(function(t){return new d.FeatureTileDescriptor3D(t[0],t[1],t[2],e.tilingScheme)})},t.prototype.purgeHorizonTiles=function(e){e.sort(function(e,t){return t.measures.screen.rect[1]-e.measures.screen.rect[1]}),c.empty(S);for(var t=0;t<e.length;t++)if(c.expand(S,e[t].measures.screen.rect),c.height(S)>b)return e.slice(t);return[]},t.prototype.subdivideTilesForView=function(e){for(var t=e.slice(),i=[];t.length>0;){var r=t.pop();this.filterExtentRect&&!c.intersects(this.filterExtentRect,r.extent)||(this.tileMeasurements.updateTile(r),0!==r.measures.visibility&&(r.measures.shouldSplit?(this.tilingScheme.ensureMaxLod(r.lij[0]+1),t.push.apply(t,r.getChildren())):i.push(r)))}return this.purgeHorizonTiles(i)},t.prototype.updateTiles=function(e){for(var t=this,i=0,r=this.tiles.items;i<r.length;i++){r[i].used=!1}var n=e.filter(function(e){var i=t.idToTile.get(e.id);return i?(i.copyMeasurementsFrom(e),i.used=!0):t.idToTile.set(e.id,e),!i}),s=this.tiles.items.filter(function(e){return!e.used&&(t.idToTile.delete(e.id),!0)});this.tiles.removeMany(s),this.tiles.addMany(n),this.sortTiles()},t.prototype.sortTiles=function(){this.tiles.sort(function(e,t){return e.measures.visibility!==t.measures.visibility?2===e.measures.visibility?-1:1:e.measures.distance-t.measures.distance}),this.tiles.forEach(function(e,t){return e.loadPriority=t})},r([p.property({constructOnly:!0})],t.prototype,"renderCoordsHelper",void 0),r([p.property({constructOnly:!0})],t.prototype,"tilingSchemeOwner",void 0),r([p.property({constructOnly:!0})],t.prototype,"cameraOnSurface",void 0),r([p.property({constructOnly:!0})],t.prototype,"focus",void 0),r([p.property({constructOnly:!0})],t.prototype,"viewState",void 0),r([p.property()],t.prototype,"tiles",void 0),r([p.property()],t.prototype,"tileSize",void 0),r([p.property({readOnly:!0,dependsOn:["tilingSchemeOwner.tilingScheme"]})],t.prototype,"tilingScheme",null),r([p.property()],t.prototype,"filterExtent",null),r([p.property({readOnly:!0,dependsOn:["filterExtent","tilingScheme"]})],t.prototype,"filterExtentRect",null),r([p.property({readOnly:!0,dependsOn:["filterExtentRect"]})],t.prototype,"rootTileIds",null),r([p.property({value:!1})],t.prototype,"suspended",null),r([p.property()],t.prototype,"updating",null),r([p.property({readOnly:!0,dependsOn:["tileSize","cameraOnSurface.location","tilingScheme","viewState.camera","focus.locationOnSurface"]})],t.prototype,"changeId",null),r([p.property({constructOnly:!0})],t.prototype,"disableThrottling",void 0),t=r([p.subclass()],t)}(p.declared(n));t.FeatureTileTree3D=m;var v=0,S=c.create(),b=10;t.default=m});