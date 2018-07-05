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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/has","dojo/text!./DefaultMaterial.xml","../../layers/graphics/graphicUtils","../../support/buffer/glUtil","../../support/buffer/InterleavedLayout","../lib/DefaultVertexAttributeLocations","../lib/gl-matrix","../lib/GLMaterialTexture","../lib/Material","../lib/RenderSlot","../lib/ShaderVariations","../lib/Util","./internal/MaterialUtil","../../../webgl/Program","../../../webgl/Util"],function(e,r,t,a,i,n,o,s,l,d,c,p,u,v,f,m,S,g){function h(e){return e.cullFace?"none"!==e.cullFace:!e.transparent}function b(e,r){var t=e.gl;h(r)?(e.setFaceCullingEnabled(!0),"front"===r.cullFace&&e.setCullFace(t.FRONT)):e.setFaceCullingEnabled(!1)}function C(e,r){var t=e.gl;h(r)?(e.setFaceCullingEnabled(!1),"front"===r.cullFace&&e.setCullFace(t.BACK)):e.setFaceCullingEnabled(!0)}function O(e,r){return e?u.TRANSPARENT_MATERIAL:r?u.STENCIL_MATERIAL:u.OPAQUE_MATERIAL}function D(e,r){var t=r.vvSizeEnabled;r.vvSizeEnabled?(e.setUniform3fv("vvSizeMinSize",r.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",r.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",r.vvSizeOffset),e.setUniform3fv("vvSizeFactor",r.vvSizeFactor)):t&&e.setUniform3fv("vvSizeValue",r.vvSizeValue),t&&(e.setUniform3fv("vvSymbolAnchor",r.vvSymbolAnchor),n.computeObjectRotation(r.vvSymbolRotation[2],r.vvSymbolRotation[0],r.vvSymbolRotation[1],N.identity(Y)),e.setUniformMatrix3fv("vvSymbolRotation",N.toMat3(Y,Z))),r.vvColorEnabled&&(e.setUniform1fv("vvColorValues",r.vvColorValues),e.setUniform4fv("vvColorColors",r.vvColorColors))}function P(e,r){e.vvSizeEnabled=r.vvSizeEnabled,e.vvSizeMinSize=r.vvSizeMinSize,e.vvSizeMaxSize=r.vvSizeMaxSize,e.vvSizeOffset=r.vvSizeOffset,e.vvSizeFactor=r.vvSizeFactor,e.vvSizeValue=r.vvSizeValue,e.vvSymbolAnchor=r.vvSymbolAnchor,e.vvSymbolRotation=r.vvSymbolRotation}var y,E=d.vec3d,x=d.vec4d,I=d.mat3d,N=d.mat4d,T=f.assert,A={DIFFUSE:0,COMPONENT_COLOR:1},V=function(e){function r(t,a){var i=e.call(this,a)||this;return i.supportsEdges=!0,i.params=m.copyParameters(t,F),i.instanced=!!t.instanced,i.vertexBufferLayout=r.getVertexBufferLayout(i.params),i.instanceBufferLayout=i.instanced?r.getInstanceBufferLayout(i.params):null,i}return t(r,e),r.prototype.isVisible=function(){var r=this.params;if(!e.prototype.isVisible.call(this)||0===r.layerOpacity)return!1;var t=y&&r.instanced,a=r.vertexColors,i=r.symbolColors,n=!!t&&t.indexOf("color")>-1,o=r.vvColorEnabled,s="replace"===r.colorMixMode,l=r.opacity>0,d=r.externalColor&&r.externalColor[3]>0;return a&&(n||o||i)?!!s||l:a?s?d:l:n||o||i?!!s||l:s?d:l},r.prototype.getParams=function(){return this.params},r.prototype.getParameterValues=function(){var e=this.params;return{textureId:e.textureId,ambient:e.ambient,diffuse:e.diffuse,specular:e.specular,externalColor:e.externalColor,colorMixMode:e.colorMixMode,opacity:e.opacity,layerOpacity:e.layerOpacity,transparent:e.transparent,polygonOffset:e.polygonOffset,atlasRegions:e.atlasRegions,flipV:e.flipV,doubleSided:e.doubleSided,doubleSidedType:e.doubleSidedType,cullFace:e.cullFace,writeStencil:e.writeStencil,receiveSSAO:e.receiveSSAO,castShadows:e.castShadows,verticalOffset:e.verticalOffset,screenSizePerspective:e.screenSizePerspective,vvSizeEnabled:e.vvSizeEnabled,vvSizeMinSize:e.vvSizeMinSize,vvSizeMaxSize:e.vvSizeMaxSize,vvSizeOffset:e.vvSizeOffset,vvSizeFactor:e.vvSizeFactor,vvSizeValue:e.vvSizeValue,vvColorEnabled:e.vvColorEnabled,vvColorValues:e.vvColorValues,vvColorColors:e.vvColorColors,instancedDoublePrecision:e.instancedDoublePrecision,compressedNormals:e.compressedNormals,groundNormalShading:e.groundNormalShading,vvSymbolAnchor:e.vvSymbolAnchor,vvSymbolRotation:e.vvSymbolRotation}},r.prototype.setParameterValues=function(e){var r=this.params;for(var t in e)"textureId"===t&&T(r.textureId,"Can only change texture of material that already has a texture"),"castShadows"===t&&T(e.castShadows===r.castShadows,"Can not change shadow casting behavior."),r[t]=e[t];this.notifyDirty("matChanged")},r.prototype.getOutputAmount=function(e){return e*(g.getStride(this.vertexBufferLayout)/4)},r.prototype.getVertexBufferLayout=function(){return this.vertexBufferLayout},r.prototype.getInstanceBufferLayout=function(){return this.instanceBufferLayout},r.prototype.fillInterleaved=function(e,r,t,a,i,n,o){m.fillInterleaved(e,r,t,a,this.vertexBufferLayout,i,n,o)},r.prototype.intersect=function(e,r,t,a,i,n,o,s){if(null!==this.params.verticalOffset){var l=a.camera;E.set3(t[12],t[13],t[14],Q);var d=E.subtract(Q,l.eye,J),c=E.length(d),p=E.scale(d,1/c),u=null,v=null;switch(a.viewingMode){case"global":v=E.normalize(Q,q);break;case"local":v=E.set(X,q)}this.params.screenSizePerspective&&(u=E.dot(v,p));var f=m.verticalOffsetAtDistance(l,c,this.params.verticalOffset,u,this.params.screenSizePerspective);E.scale(v,f),I.multiplyVec3(a.transformInverseRotation,v,K),i=E.subtract(i,K,j),n=E.subtract(n,K,k)}m.intersectTriangleGeometry(e,r,t,a,i,n,o)},r.prototype.getGLMaterials=function(){return{color:R,depthShadowMap:this.params.castShadows?w:null,normal:M,depth:z,highlight:_}},r.prototype.getAllTextureIds=function(){var e=this.params,r=[];return e.textureId&&r.push(e.textureId),r},r.loadShaders=function(e,r,t){e._parse(i),y=null!==t.capabilities.instancing;var a=new v("phong",["vsPhong","fsPhong"],null,r,e,t);a.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),a.addDefine("Color","VERTEXCOLORS"),a.addDefine("symbolColor","SYMBOLVERTEXCOLORS"),a.addDefine("FlipV","FLIPV"),a.addDefine("DoubleSided","DOUBLESIDED"),a.addDefine("WindingOrderDoubleSided","WINDINGORDERDOUBLESIDED"),a.addDefine("Instanced","INSTANCED"),a.addDefine("instancedDoublePrecision","INSTANCED_DOUBLE_PRECISION"),a.addDefine("InstColor","INSTANCEDCOLOR"),a.addDefine("ReceiveShadows","RECEIVE_SHADOWS"),a.addDefine("ReceiveSSAO","RECEIVE_SSAO"),a.addDefine("vvSize","VV_SIZE"),a.addDefine("vvColor","VV_COLOR"),a.addDefine("VerticalOffset","VERTICAL_OFFSET"),a.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),a.addDefine("groundNormalShading","GROUND_NORMAL_SHADING"),a.addDefine("compressedNormals","COMPRESSED_NORMALS"),a.addDefine("componentColor","COMPONENTCOLORS"),a.addDefine("transparencyDiscard","TRANSPARENCY_DISCARD"),a.addDefine("alphaCoverageCorrection","ALPHA_COVERAGE_CORRECTION"),r.addShaderVariations(U,a);var n=new v("depth",["vsDepth","fsDepth"],null,r,e,t);n.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),n.addDefine("FlipV","FLIPV"),n.addDefine("Instanced","INSTANCED"),n.addDefine("instancedDoublePrecision","INSTANCED_DOUBLE_PRECISION"),n.addDefine("ShadowMap","BIAS_SHADOWMAP"),n.addDefine("vvSize","VV_SIZE"),n.addDefine("VerticalOffset","VERTICAL_OFFSET"),n.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),n.addDefine("transparencyDiscard","TRANSPARENCY_DISCARD"),n.addDefine("alphaCoverageCorrection","ALPHA_COVERAGE_CORRECTION"),r.addShaderVariations(B,n);var o=new v("normal",["vsNormal","fsNormal"],null,r,e,t);o.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),o.addDefine("FlipV","FLIPV"),o.addDefine("Instanced","INSTANCED"),o.addDefine("instancedDoublePrecision","INSTANCED_DOUBLE_PRECISION"),o.addDefine("vvSize","VV_SIZE"),o.addDefine("VerticalOffset","VERTICAL_OFFSET"),o.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),o.addDefine("compressedNormals","COMPRESSED_NORMALS"),o.addDefine("transparencyDiscard","TRANSPARENCY_DISCARD"),o.addDefine("alphaCoverageCorrection","ALPHA_COVERAGE_CORRECTION"),r.addShaderVariations(W,o);var s=new v("highlight",["vsHighlight","fsHighlight"],null,r,e,t);s.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),s.addDefine("FlipV","FLIPV"),s.addDefine("Instanced","INSTANCED"),s.addDefine("instancedDoublePrecision","INSTANCED_DOUBLE_PRECISION"),s.addDefine("vvSize","VV_SIZE"),s.addDefine("VerticalOffset","VERTICAL_OFFSET"),s.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),s.addDefine("transparencyDiscard","TRANSPARENCY_DISCARD"),s.addDefine("alphaCoverageCorrection","ALPHA_COVERAGE_CORRECTION"),r.addShaderVariations(H,s);var d=new S(t,e.vsDepth,e.fsDepth,l.Default3D,["BIAS_SHADOWMAP 1"]),c=new S(t,e.vsDepthTextured,e.fsDepthTextured,l.Default3D,["BIAS_SHADOWMAP 1"]),p=new S(t,e.vsDepth,e.fsDepth,l.Default3D),u=new S(t,e.vsDepthTextured,e.fsDepthTextured,l.Default3D),f=new S(t,e.vsNormal,e.fsNormal,l.Default3D),m=new S(t,e.vsNormalTextured,e.fsNormalTextured,l.Default3D),g=new S(t,e.vsHighlight,e.fsHighlight,l.Default3D),h=new S(t,e.vsHighlightTextured,e.fsHighlightTextured,l.Default3D);r.add("depthShadowMap",d),r.add("depthTexturedShadowMap",c),r.add("depth",p),r.add("depthTextured",u),r.add("normal",f),r.add("normalTextured",m),r.add("highlight",g),r.add("highlightTextured",h)},r.getVertexBufferLayout=function(e){var r=s.newLayout().vec3f("position");return e.groundNormalShading||(r=e.compressedNormals?r.vec2i16("normalCompressed",{glNormalized:!0}):r.vec3f("normal")),e.textureId&&(r=r.vec2f("uv0"),e.atlasRegions&&(r=r.vec4u16("region"))),e.vertexColors&&(r=r.vec4u8("color")),e.symbolColors&&(r=r.vec4u8("symbolColor")),e.componentIndices&&(r=r.u16("componentIndex").u16("_padding",{glPadding:!0})),o.glLayout(r)},r.getInstanceBufferLayout=function(e){var r=s.newLayout();return r=e.instancedDoublePrecision?r.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):r.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(r=r.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(r=r.vec4f("instanceFeatureAttribute")),o.glLayout(r,{divisor:1})},r}(p),R=function(e){function r(r,t,a){var i=e.call(this,r,t,a,r.getParams().textureId)||this;i.programs=[[null,null],[null,null]],i.params=m.copyParameters(r.getParams()),i.slot=O(i.params.transparent,i.params.writeStencil);var n=i.params;i.texturing=n.textureId?n.atlasRegions?"AtlasTextured":"Textured":"none";var o=y&&n.instanced;return i.instanced=!!o,i.instancedColor=!!o&&o.indexOf("color")>-1,i.pseudoInstancedColor=!y&&n.instanced&&n.instanced.indexOf("color")>-1,i._loadPrograms(),i}return t(r,e),r.prototype._loadPrograms=function(){this.programs[0][0]=this._loadProgram(!1,!1),this.programs[1][0]=this._loadProgram(!0,!1),this.params.receiveSSAO?(this.programs[0][1]=this._loadProgram(!1,!0),this.programs[1][1]=this._loadProgram(!0,!0),this.allPrograms=this.programs[0].concat(this.programs[1])):(this.programs[0][1]=this.programs[0][0],this.programs[1][1]=this.programs[1][0],this.allPrograms=[this.programs[0][0],this.programs[1][0]])},r.prototype._loadProgram=function(e,r){var t=this.params;return this.programRep.getShaderVariationsProgram(U,[this.texturing,t.vertexColors,t.symbolColors,t.flipV,t.doubleSided&&"normal"===t.doubleSidedType,t.doubleSided&&"winding-order"===t.doubleSidedType,!!this.instanced,t.instancedDoublePrecision,this.instancedColor,e,r,t.vvSizeEnabled,t.vvColorEnabled,null!==t.verticalOffset,null!==t.screenSizePerspective,t.groundNormalShading,t.compressedNormals,null!=t.componentColorBuffer,t.transparent,L])},r.prototype.beginSlot=function(e){return e===this.slot},r.prototype.getProgram=function(){return this.program||this.programs[0][0]},r.prototype.getPrograms=function(){return this.allPrograms},r.prototype.updateParameters=function(){var e=this.material.getParams(),r=this.params;r.ambient=e.ambient,r.diffuse=e.diffuse,r.specular=e.specular,r.externalColor=e.externalColor,r.colorMixMode=e.colorMixMode,r.opacity=e.opacity,r.layerOpacity=e.layerOpacity,r.polygonOffset=e.polygonOffset,r.flipV=e.flipV,r.doubleSided=e.doubleSided,r.doubleSidedType=e.doubleSidedType,r.cullFace=e.cullFace,r.receiveSSAO=e.receiveSSAO,r.castShadows=e.castShadows,r.verticalOffset=e.verticalOffset,r.screenSizePerspective=e.screenSizePerspective,P(r,e),r.vvColorEnabled=e.vvColorEnabled,r.vvColorValues=e.vvColorValues,r.vvColorColors=e.vvColorColors,r.transparent!==e.transparent&&(this.slot=O(e.transparent,e.writeStencil),r.transparent=e.transparent),r.instancedDoublePrecision=e.instancedDoublePrecision,r.compressedNormals=e.compressedNormals,r.groundNormalShading=e.groundNormalShading,this.updateTexture(e.textureId),e.atlasRegions&&(r.atlasRegions=e.atlasRegions),r.blendModeOneOne=e.blendModeOneOne,r.inverseWindingOrder=e.inverseWindingOrder,this._loadPrograms()},r.prototype.bind=function(e,r){var t=e.gl,a=this.params,i=this.program=this.programs[r.shadowMappingEnabled?1:0][r.ssaoEnabled?1:0];e.bindProgram(i),i.setUniform3fv("ambient",a.ambient),i.setUniform3fv("diffuse",a.diffuse),i.setUniform3fv("specular",a.specular),i.setUniform4fv("externalColor",a.externalColor),i.setUniform1i("colorMixMode",m.colorMixModes[a.colorMixMode]),i.setUniform1f("opacity",a.opacity),i.setUniform1f("layerOpacity",a.layerOpacity),m.bindVerticalOffset(a.verticalOffset,r,i),m.bindScreenSizePerspective(a.screenSizePerspective,i),D(i,a),this.bindTexture(e,i),"none"!==this.texturing&&this.bindTextureSize(e,i),e.setBlendFunctionSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA),a.inverseWindingOrder&&e.setFrontFace(t.CW),a.transparent?(e.setBlendingEnabled(!0),a.blendModeOneOne?(e.setBlendFunction(t.ONE,t.ONE),e.setDepthWriteEnabled(!1)):e.setBlendFunctionSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA)):e.setBlendingEnabled(!1),a.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(2,2)),b(e,a),e.setDepthTestEnabled(!0),a.componentIndices&&a.componentColorBuffer&&(a.componentColorBuffer.updateTexture(),a.componentColorBuffer.bind(i,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:A.COMPONENT_COLOR}))},r.prototype.release=function(e,r){var t=e.gl;e.setPolygonOffsetFillEnabled(!1),C(e,this.params),e.setBlendingEnabled(!1),e.setBlendFunctionSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA),e.setDepthWriteEnabled(!0),e.setFrontFace(t.CCW)},r.prototype.bindView=function(e,r){var t=this.program=this.programs[r.shadowMappingEnabled?1:0][r.ssaoEnabled?1:0],a=this.params,i=a.instancedDoublePrecision?[r.viewInvTransp[3],r.viewInvTransp[7],r.viewInvTransp[11]]:r.origin;m.bindView(i,r.view,t),m.bindCamPos(i,r.viewInvTransp,t),a.instancedDoublePrecision&&m.bindViewOriginDouble(i,t),r.shadowMappingEnabled&&r.shadowMap.bindView(t,i)},r.prototype.bindInstance=function(e,r){var t=this.program;if(t.setUniformMatrix4fv("model",r.transformation),t.setUniformMatrix4fv("modelNormal",r.transformationNormal),r.instanceParameters&&this.pseudoInstancedColor){var a=r.instanceParameters.color;a&&(x.multiply(a,this.params.externalColor,G),t.setUniform4fv("externalColor",G))}},r.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},r}(c),z=function(e){function r(r,t,a,i){void 0===i&&(i=!1);var n=e.call(this,r,t,a,r.getParams().textureId)||this;return n.params=m.copyParameters(r.getParams()),n.instanced=y&&!!n.params.instanced,n.texturing=g.hasAttribute(r.getVertexBufferLayout(),"uv0")?(n.params.atlasRegions,"Textured"):"none",n.program=t.getShaderVariationsProgram(B,[n.texturing,n.params.flipV,n.instanced,n.params.instancedDoublePrecision,i,n.params.vvSizeEnabled,null!==n.params.verticalOffset,null!==n.params.screenSizePerspective,n.params.transparent,L]),n.slot=O(n.params.transparent,n.params.writeStencil),n}return t(r,e),r.prototype.beginSlot=function(e){return e===this.slot},r.prototype.getProgram=function(){return this.program},r.prototype.updateParameters=function(){var e=this.material.getParams(),r=this.params;r.cullFace=e.cullFace,r.inverseWindingOrder=e.inverseWindingOrder,r.flipV=e.flipV,P(r,e),this.updateTexture(e.textureId),r.instancedDoublePrecision=e.instancedDoublePrecision},r.prototype.bind=function(e,r){var t=e.gl,a=this.program,i=this.params;e.bindProgram(a),a.setUniform2fv("nearFar",r.nearFar),i.inverseWindingOrder&&e.setFrontFace(t.CW),m.bindVerticalOffset(i.verticalOffset,r,a),m.bindScreenSizePerspective(i.screenSizePerspective,a),D(a,i),this.bindTexture(e,a),b(e,i),e.setDepthTestEnabled(!0)},r.prototype.release=function(e){var r=e.gl,t=this.params;C(e,t),t.inverseWindingOrder&&e.setFrontFace(r.CCW)},r.prototype.bindView=function(e,r){var t=this.program,a=this.params,i=a.instancedDoublePrecision?[r.viewInvTransp[3],r.viewInvTransp[7],r.viewInvTransp[11]]:r.origin;m.bindView(i,r.view,t),a.screenSizePerspective&&m.bindCamPos(i,r.viewInvTransp,t),a.instancedDoublePrecision&&m.bindViewOriginDouble(i,t)},r.prototype.bindInstance=function(e,r){this.program.setUniformMatrix4fv("model",r.transformation)},r.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},r}(c),w=function(e){function r(r,t,a){return e.call(this,r,t,a,!0)||this}return t(r,e),r}(z),M=function(e){function r(r,t,a,i){void 0===i&&(i=!1);var n=e.call(this,r,t,a,r.getParams().textureId)||this;return n.params=m.copyParameters(r.getParams()),n.instanced=y&&!!n.params.instanced,n.texturing=g.hasAttribute(r.getVertexBufferLayout(),"uv0")?(n.params.atlasRegions,"Textured"):"none",n.program=t.getShaderVariationsProgram(W,[n.texturing,n.params.flipV,n.instanced,n.params.instancedDoublePrecision,n.params.vvSizeEnabled,null!==n.params.verticalOffset,null!==n.params.screenSizePerspective,n.params.compressedNormals,n.params.transparent,L]),n.slot=O(n.params.transparent,n.params.writeStencil),n}return t(r,e),r.prototype.beginSlot=function(e){return e===this.slot},r.prototype.getProgram=function(){return this.program},r.prototype.updateParameters=function(){var e=this.material.getParams(),r=this.params;r.cullFace=e.cullFace,r.inverseWindingOrder=e.inverseWindingOrder,r.flipV=e.flipV,P(r,e),this.updateTexture(e.textureId),r.instancedDoublePrecision=e.instancedDoublePrecision},r.prototype.bind=function(e,r){var t=e.gl,a=this.program,i=this.params;e.bindProgram(a),this.bindTexture(e,a),m.bindVerticalOffset(i.verticalOffset,r,a),m.bindScreenSizePerspective(i.screenSizePerspective,a),D(a,i),b(e,i),i.inverseWindingOrder&&e.setFrontFace(t.CW),e.setDepthTestEnabled(!0)},r.prototype.release=function(e){var r=e.gl,t=this.params;C(e,t),t.inverseWindingOrder&&e.setFrontFace(r.CCW)},r.prototype.bindView=function(e,r){var t=this.program,a=this.params,i=a.instancedDoublePrecision?[r.viewInvTransp[3],r.viewInvTransp[7],r.viewInvTransp[11]]:r.origin;m.bindView(i,r.view,t),t.setUniformMatrix4fv("viewNormal",r.viewInvTransp),a.screenSizePerspective&&m.bindCamPos(i,r.viewInvTransp,t),a.instancedDoublePrecision&&m.bindViewOriginDouble(i,t)},r.prototype.bindInstance=function(e,r){var t=this.program;t.setUniformMatrix4fv("model",r.transformation),t.setUniformMatrix4fv("modelNormal",r.transformationNormal)},r.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},r}(c),_=function(e){function r(r,t,a,i){void 0===i&&(i=!1);var n=e.call(this,r,t,a,r.getParams().textureId)||this;return n.params=m.copyParameters(r.getParams()),n.instanced=y&&!!n.params.instanced,n.texturing=g.hasAttribute(r.getVertexBufferLayout(),"uv0")?(n.params.atlasRegions,"Textured"):"none",n.program=t.getShaderVariationsProgram(H,[n.texturing,n.params.flipV,n.instanced,n.params.instancedDoublePrecision,n.params.vvSizeEnabled,null!==n.params.verticalOffset,null!==n.params.screenSizePerspective,n.params.transparent,L]),n.slot=O(n.params.transparent,n.params.writeStencil),n}return t(r,e),r.prototype.beginSlot=function(e){return e===this.slot},r.prototype.getProgram=function(){return this.program},r.prototype.updateParameters=function(){var e=this.material.getParams(),r=this.params;r.cullFace=e.cullFace,r.inverseWindingOrder=e.inverseWindingOrder,r.flipV=e.flipV,P(r,e),this.updateTexture(e.textureId),r.instancedDoublePrecision=e.instancedDoublePrecision},r.prototype.bind=function(e,r){var t=e.gl,a=this.program,i=this.params;e.bindProgram(a),this.bindTexture(e,a),m.bindVerticalOffset(i.verticalOffset,r,a),m.bindScreenSizePerspective(i.screenSizePerspective,a),D(a,i),b(e,i),i.inverseWindingOrder&&e.setFrontFace(t.CW),e.setDepthTestEnabled(!0)},r.prototype.release=function(e){var r=e.gl,t=this.params;C(e,t),t.inverseWindingOrder&&e.setFrontFace(r.CW)},r.prototype.bindView=function(e,r){var t=this.program,a=this.params,i=a.instancedDoublePrecision?[r.viewInvTransp[3],r.viewInvTransp[7],r.viewInvTransp[11]]:r.origin;m.bindView(i,r.view,t),a.screenSizePerspective&&m.bindCamPos(i,r.viewInvTransp,t),a.instancedDoublePrecision&&m.bindViewOriginDouble(i,t)},r.prototype.bindInstance=function(e,r){var t=this.program;t.setUniformMatrix4fv("model",r.transformation),t.setUniformMatrix4fv("modelNormal",r.transformationNormal)},r.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},r}(c),F={textureId:void 0,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,blendModeOneOne:!1,inverseWindingOrder:!1,vertexColors:!1,symbolColors:!1,componentIndices:!1,componentColorBuffer:null,flipV:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,instanced:void 0,instancedDoublePrecision:!1,compressedNormals:!1,groundNormalShading:!1,writeStencil:!1,receiveSSAO:!0,castShadows:!0,verticalOffset:null,screenSizePerspective:null,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotation:[0,0,0],transparent:!1,polygonOffset:!1,atlasRegions:!1},L=!!a("enable-feature:skallweit/lod-rendering"),U="material",B="material-depth",W="material-normal",H="material-highlight",G=x.create(),Z=I.create(),Y=N.create(),j=E.create(),k=E.create(),X=E.createFrom(0,0,1),q=E.create(),K=E.create(),Q=E.create(),J=E.create();return V});