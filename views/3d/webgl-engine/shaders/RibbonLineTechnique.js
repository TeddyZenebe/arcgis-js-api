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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/maybe","../../../../core/maybe","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/shading/VisualVariables.glsl","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","./RibbonLine.glsl","../../../webgl/Program","../../../webgl/renderState"],function(e,t,i,r,o,p,a,n,s,l,u,d,h,f,c,b,g){Object.defineProperty(t,"__esModule",{value:!0}),t.RibbonVertexAttributeConstants={POSITION:"position",SUBDIVISIONFACTOR:"subdivisionFactor",UV0:"uv0",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",SUBDIVISIONS:"subdivisions",COLOR:"color",COLORFEATUREATTRIBUTE:"colorFeatureAttribute",SIZE:"size",SIZEFEATUREATTRIBUTE:"sizeFeatureAttribute",OPACITYFEATUREATTRIBUTE:"opacityFeatureAttribute"},t.ribbonVertexAttributeLocations={position:0,subdivisionFactor:1,uv0:2,auxpos1:3,auxpos2:4,size:6,sizeFeatureAttribute:6,color:5,colorFeatureAttribute:5,opacityFeatureAttribute:7};var m=function(r){function o(e,t){var i=r.call(this,e,t)||this;return i.stipplePattern=null,i.stippleTextureBind=null,i.stippleTextureRepository=e.stippleTextureRepository,i}return i(o,r),o.prototype.initializeProgram=function(e){var i=o.shader.get(),r=this.configuration,p=i.build({output:r.output,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,stippleEnabled:r.stippleEnabled,stippleOffColorEnabled:r.stippleOffColorEnabled,stippleUVMaxEnabled:r.stippleIntegerRepeatsEnabled,stippleIntegerRepeatsEnabled:r.stippleIntegerRepeatsEnabled,roundCaps:r.roundCaps,roundJoins:r.roundJoins,vvColor:r.vvColor,vvSize:r.vvSize,vvOpacity:r.vvOpacity});return new b(e.rctx,p.generateSource("vertex"),p.generateSource("fragment"),t.ribbonVertexAttributeLocations)},o.prototype.dispose=function(){r.prototype.dispose.call(this),this.stippleTextureRepository.release(this.stipplePattern),this.stipplePattern=null,this.stippleTextureBind=null},o.prototype.bindPass=function(e,t,i){if(4===this.configuration.output&&l.OutputHighlight.bindOutputHighlight(e,this.program,i),this.program.setUniform1f("symbolLineWidth",t.width),this.program.setUniform4fv("symbolColor",t.color),this.program.setUniform1f("miterLimit","miter"!==t.join?0:t.miterLimit),this.program.setUniform1f("nearPlane",i.nearFar[0]),this.program.setUniform1f("pixelRatio",i.pixelRatio),this.program.setUniform2fv("screenSize",[i.viewport[2],i.viewport[3]]),u.VisualVariables.bindUniformsWithOpacity(this.program,t),this.stipplePattern!==t.stipplePattern){var r=t.stipplePattern;this.stippleTextureBind=this.stippleTextureRepository.swap(this.stipplePattern,r),this.stipplePattern=r}if(this.configuration.stippleEnabled){var o=a.isSome(this.stippleTextureBind)?this.stippleTextureBind(e,0)*i.pixelRatio:1;if(this.program.setUniform1i("stipplePatternTexture",0),this.program.setUniform1f("stipplePatternPixelSizeInv",1/o),this.configuration.stippleOffColorEnabled){var n=p.expect(t.stippleOffColor);this.program.setUniform4f("stippleOffColor",n[0],n[1],n[2],n.length>3?n[3]:1)}}},o.prototype.bindDraw=function(e){s.Transform.bindUniforms(this.program,e),n.Slice.bindUniformsWithOrigin(this.program,this.configuration,e)},o.prototype.bindInstance=function(e){this.program.setUniformMatrix4fv("model",e.transformation)},o.prototype.initializePipeline=function(){var e=this.configuration;return 0===e.output?g.makePipelineState({blending:g.separateBlendingParams(770,1,771,771),polygonOffset:e.polygonOffset&&v,depthTest:{func:513},depthWrite:!e.transparent&&e.writeDepth&&g.defaultDepthWriteParams,colorWrite:g.defaultColorWriteParams}):g.makePipelineState({polygonOffset:e.polygonOffset&&v,depthTest:{func:513},depthWrite:!e.transparent&&e.writeDepth&&g.defaultDepthWriteParams,colorWrite:g.defaultColorWriteParams})},o.prototype.bindPipelineState=function(e){e.setPipelineState(this.pipeline)},o.shader=new d.ReloadableShaderModule(c,"./RibbonLine.glsl",e),o}(h.ShaderTechnique);t.RibbonLineTechnique=m;var v={factor:0,units:-4},y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.output=0,t.slicePlaneEnabled=!1,t.sliceHighlightDisabled=!1,t.vertexColors=!1,t.transparent=!1,t.polygonOffset=!1,t.writeDepth=!1,t.stippleEnabled=!1,t.stippleOffColorEnabled=!1,t.stippleIntegerRepeatsEnabled=!1,t.roundCaps=!1,t.roundJoins=!1,t.vvSize=!1,t.vvColor=!1,t.vvOpacity=!1,t}return i(t,e),r([f.parameter({count:6})],t.prototype,"output",void 0),r([f.parameter()],t.prototype,"slicePlaneEnabled",void 0),r([f.parameter()],t.prototype,"sliceHighlightDisabled",void 0),r([f.parameter()],t.prototype,"vertexColors",void 0),r([f.parameter()],t.prototype,"transparent",void 0),r([f.parameter()],t.prototype,"polygonOffset",void 0),r([f.parameter()],t.prototype,"writeDepth",void 0),r([f.parameter()],t.prototype,"stippleEnabled",void 0),r([f.parameter()],t.prototype,"stippleOffColorEnabled",void 0),r([f.parameter()],t.prototype,"stippleIntegerRepeatsEnabled",void 0),r([f.parameter()],t.prototype,"roundCaps",void 0),r([f.parameter()],t.prototype,"roundJoins",void 0),r([f.parameter()],t.prototype,"vvSize",void 0),r([f.parameter()],t.prototype,"vvColor",void 0),r([f.parameter()],t.prototype,"vvOpacity",void 0),t}(f.ShaderTechniqueConfiguration);t.RibbonLineTechniqueConfiguration=y});