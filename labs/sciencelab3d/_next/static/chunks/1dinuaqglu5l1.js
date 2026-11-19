(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var r=e.i(31067),s=e.i(71645),n=e.i(90072),a=e.i(48546),o=n,l=n;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let r=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(r,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,n=e.count;s<n;s++)d.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(d)),d.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var h=n,p=e.i(8560),f=e.i(31497);class m extends h.Zg{constructor(e){super({type:"LineMaterial",uniforms:h.SP.clone(h.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new h.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${f.f>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=f.f>=125?"uv1":"uv2",y=new o.$i,v=new o.cE,g=new o.cE,b=new o.$i,w=new o.$i,j=new o.$i,M=new o.cE,S=new o.nd,E=new o._i,P=new o.cE,A=new o.VQ,C=new o.L0,N=new o.$i;function T(e,t,r){return N.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),N.multiplyScalar(1/N.w),N.x=i/r.width,N.y=i/r.height,N.applyMatrix4(e.projectionMatrixInverse),N.multiplyScalar(1/N.w),Math.abs(Math.max(N.x,N.y))}class _ extends o.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,s=0,n=t.count;e<n;e++,s+=2)v.fromBufferAttribute(t,e),g.fromBufferAttribute(i,e),r[s]=0===s?0:r[s-1],r[s+1]=r[s]+v.distanceTo(g);let s=new o.hC(r,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(s,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(s,1,1)),this}raycast(e,r){let s,n,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,h=this.material;if(i=h.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),C.copy(u.boundingSphere).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));s=T(l,e,h.resolution)}if(C.radius+=s,!1!==t.intersectsSphere(C)){if(null===u.boundingBox&&u.computeBoundingBox(),A.copy(u.boundingBox).applyMatrix4(d),a)n=.5*i;else{let e=Math.max(l.near,A.distanceToPoint(t.origin));n=T(l,e,h.resolution)}A.expandByScalar(n),!1!==t.intersectsBox(A)&&(a?function(e,r){let s=e.matrixWorld,n=e.geometry,a=n.attributes.instanceStart,l=n.attributes.instanceEnd,c=Math.min(n.instanceCount,a.count);for(let n=0;n<c;n++){E.start.fromBufferAttribute(a,n),E.end.fromBufferAttribute(l,n),E.applyMatrix4(s);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(E.start,E.end,d,c),d.distanceTo(c)<.5*i&&r.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}(this,r):function(e,r,s){let n=r.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,h=Math.min(c.instanceCount,d.count),p=-r.near;t.at(1,j),j.w=1,j.applyMatrix4(r.matrixWorldInverse),j.applyMatrix4(n),j.multiplyScalar(1/j.w),j.x*=a.x/2,j.y*=a.y/2,j.z=0,M.copy(j),S.multiplyMatrices(r.matrixWorldInverse,l);for(let r=0;r<h;r++){if(b.fromBufferAttribute(d,r),w.fromBufferAttribute(u,r),b.w=1,w.w=1,b.applyMatrix4(S),w.applyMatrix4(S),b.z>p&&w.z>p)continue;if(b.z>p){let e=b.z-w.z,t=(b.z-p)/e;b.lerp(w,t)}else if(w.z>p){let e=w.z-b.z,t=(w.z-p)/e;w.lerp(b,t)}b.applyMatrix4(n),w.applyMatrix4(n),b.multiplyScalar(1/b.w),w.multiplyScalar(1/w.w),b.x*=a.x/2,b.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,E.start.copy(b),E.start.z=0,E.end.copy(w),E.end.z=0;let c=E.closestPointToPointParameter(M,!0);E.at(c,P);let h=o.rB.lerp(b.z,w.z,c),f=h>=-1&&h<=1,m=M.distanceTo(P)<.5*i;if(f&&m){E.start.fromBufferAttribute(d,r),E.end.fromBufferAttribute(u,r),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let i=new o.cE,n=new o.cE;t.distanceSqToSegment(E.start,E.end,n,i),s.push({point:n,pointOnLine:i,distance:t.origin.distanceTo(n),object:e,face:null,faceIndex:r,uv:null,[x]:null})}}}(this,l,r))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(y),this.material.uniforms.resolution.value.set(y.z,y.w))}}class z extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let r=0;r<t;r+=3)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,r=new Float32Array(2*i);if(3===t)for(let s=0;s<i;s+=t)r[2*s]=e[s],r[2*s+1]=e[s+1],r[2*s+2]=e[s+2],r[2*s+3]=e[s+3],r[2*s+4]=e[s+4],r[2*s+5]=e[s+5];else for(let s=0;s<i;s+=t)r[2*s]=e[s],r[2*s+1]=e[s+1],r[2*s+2]=e[s+2],r[2*s+3]=e[s+3],r[2*s+4]=e[s+4],r[2*s+5]=e[s+5],r[2*s+6]=e[s+6],r[2*s+7]=e[s+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class L extends _{constructor(e=new z,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let I=s.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...h},p){var f,x;let y=(0,a.f)(e=>e.size),v=s.useMemo(()=>c?new _:new L,[c]),[g]=s.useState(()=>new m),b=(null==i||null==(f=i[0])?void 0:f.length)===4?4:3,w=s.useMemo(()=>{let r=c?new u:new z,s=e.map(e=>{let t=Array.isArray(e);return e instanceof n.cE||e instanceof n.$i?[e.x,e.y,e.z]:e instanceof n.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(s.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof n.Es?e.toArray():e);r.setColors(e.flat(),b)}return r},[e,c,i,b]);return s.useLayoutEffect(()=>{v.computeLineDistances()},[e,v]),s.useLayoutEffect(()=>{d?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[d,g]),s.useEffect(()=>()=>{w.dispose(),g.dispose()},[w]),s.createElement("primitive",(0,r.f)({object:v,ref:p},h),s.createElement("primitive",{object:w,attach:"geometry"}),s.createElement("primitive",(0,r.f)({object:g,attach:"material",color:t,vertexColors:!!i,resolution:[y.width,y.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===b},h)))});e.s(["f",0,I],43216)},60099,e=>{"use strict";let t,i;var r=e.i(31067),s=e.i(71645),n=e.i(88014),a=e.i(90072),o=e.i(48546),l=e.i(94800);let c=new a.cE,d=new a.cE,u=new a.cE,h=new a.wq;function p(e,t,i){let r=c.setFromMatrixPosition(e.matrixWorld);r.project(t);let s=i.width/2,n=i.height/2;return[r.x*s+s,-(r.y*n)+n]}let f=e=>1e-10>Math.abs(e)?0:e;function m(e,t,i=""){let r="matrix3d(";for(let i=0;16!==i;i++)r+=f(t[i]*e.elements[i])+(15!==i?",":")");return i+r}let x=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>m(e,t)),y=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>m(e,i(t),"translate(-50%,-50%)")),v=s.forwardRef(({children:e,eps:t=.001,style:i,className:m,prepend:v,center:g,fullscreen:b,portal:w,distanceFactor:j,sprite:M=!1,transform:S=!1,occlude:E,onOcclude:P,castShadow:A,receiveShadow:C,material:N,geometry:T,zIndexRange:_=[0x1000037,0],calculatePosition:z=p,as:L="div",wrapperClass:I,pointerEvents:O="auto",...F},U)=>{let{gl:D,camera:R,scene:G,size:$,raycaster:H,events:W,viewport:B}=(0,o.f)(),[k]=s.useState(()=>document.createElement(L)),V=s.useRef(null),q=s.useRef(null),K=s.useRef(0),Z=s.useRef([0,0]),Q=s.useRef(null),J=s.useRef(null),X=(null==w?void 0:w.current)||W.connected||D.domElement.parentNode,Y=s.useRef(null),ee=s.useRef(!1),et=s.useMemo(()=>{var e;return E&&"blending"!==E||Array.isArray(E)&&E.length&&(e=E[0])&&"object"==typeof e&&"current"in e},[E]);s.useLayoutEffect(()=>{let e=D.domElement;E&&"blending"===E?(e.style.zIndex=`${Math.floor(_[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[E]),s.useLayoutEffect(()=>{if(q.current){let e=V.current=n.createRoot(k);if(G.updateMatrixWorld(),S)k.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=z(q.current,R,$);k.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(v?X.prepend(k):X.appendChild(k)),()=>{X&&X.removeChild(k),e.unmount()}}},[X,S]),s.useLayoutEffect(()=>{I&&(k.className=I)},[I]);let ei=s.useMemo(()=>S?{position:"absolute",top:0,left:0,width:$.width,height:$.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:g?"translate3d(-50%,-50%,0)":"none",...b&&{top:-$.height/2,left:-$.width/2,width:$.width,height:$.height},...i},[i,g,b,$,S]),er=s.useMemo(()=>({position:"absolute",pointerEvents:O}),[O]);s.useLayoutEffect(()=>{var t,r;ee.current=!1,S?null==(t=V.current)||t.render(s.createElement("div",{ref:Q,style:ei},s.createElement("div",{ref:J,style:er},s.createElement("div",{ref:U,className:m,style:i,children:e})))):null==(r=V.current)||r.render(s.createElement("div",{ref:U,style:ei,className:m,children:e}))});let es=s.useRef(!0);(0,l.f)(e=>{if(q.current){R.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=S?Z.current:z(q.current,R,$);if(S||Math.abs(K.current-R.zoom)>t||Math.abs(Z.current[0]-e[0])>t||Math.abs(Z.current[1]-e[1])>t){var i;let t,r,s,n,o=(i=q.current,t=c.setFromMatrixPosition(i.matrixWorld),r=d.setFromMatrixPosition(R.matrixWorld),s=t.sub(r),n=R.getWorldDirection(u),s.angleTo(n)>Math.PI/2),l=!1;et&&(Array.isArray(E)?l=E.map(e=>e.current):"blending"!==E&&(l=[G]));let p=es.current;l?es.current=function(e,t,i,r){let s=c.setFromMatrixPosition(e.matrixWorld),n=s.clone();n.project(t),h.set(n.x,n.y),i.setFromCamera(h,t);let a=i.intersectObjects(r,!0);if(a.length){let e=a[0].distance;return s.distanceTo(i.ray.origin)<e}return!0}(q.current,R,H,l)&&!o:es.current=!o,p!==es.current&&(P?P(!es.current):k.style.display=es.current?"block":"none");let m=Math.floor(_[0]/2),v=E?et?[_[0],m]:[m-1,0]:_;if(k.style.zIndex=`${function(e,t,i){if(t instanceof a.zm||t instanceof a.Sc){let r=c.setFromMatrixPosition(e.matrixWorld),s=d.setFromMatrixPosition(t.matrixWorld),n=r.distanceTo(s),a=(i[1]-i[0])/(t.far-t.near),o=i[1]-a*t.far;return Math.round(a*n+o)}}(q.current,R,v)}`,S){let[e,t]=[$.width/2,$.height/2],i=R.projectionMatrix.elements[5]*t,{isOrthographicCamera:r,top:s,left:n,bottom:a,right:o}=R,l=x(R.matrixWorldInverse),c=r?`scale(${i})translate(${f(-(o+n)/2)}px,${f((s+a)/2)}px)`:`translateZ(${i}px)`,d=q.current.matrixWorld;M&&((d=R.matrixWorldInverse.clone().transpose().copyPosition(d).scale(q.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),k.style.width=$.width+"px",k.style.height=$.height+"px",k.style.perspective=r?"":`${i}px`,Q.current&&J.current&&(Q.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,J.current.style.transform=y(d,1/((j||10)/400)))}else{let t=void 0===j?1:function(e,t){if(t instanceof a.Sc)return t.zoom;if(!(t instanceof a.zm))return 1;{let i=c.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(r))}}(q.current,R)*j;k.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}Z.current=e,K.current=R.zoom}}if(!et&&Y.current&&!ee.current)if(S){if(Q.current){let e=Q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=R;if(t||T)F.scale&&(Array.isArray(F.scale)?F.scale instanceof a.cE?Y.current.scale.copy(F.scale.clone().divideScalar(1)):Y.current.scale.set(1/F.scale[0],1/F.scale[1],1/F.scale[2]):Y.current.scale.setScalar(1/F.scale));else{let t=(j||10)/400,i=e.clientWidth*t,r=e.clientHeight*t;Y.current.scale.set(i,r,1)}ee.current=!0}}}else{let t=k.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/B.factor,i=t.clientWidth*e,r=t.clientHeight*e;Y.current.scale.set(i,r,1),ee.current=!0}Y.current.lookAt(e.camera.position)}});let en=s.useMemo(()=>({vertexShader:S?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[S]);return s.createElement("group",(0,r.f)({},F,{ref:q}),E&&!et&&s.createElement("mesh",{castShadow:A,receiveShadow:C,ref:Y},T||s.createElement("planeGeometry",null),N||s.createElement("shaderMaterial",{side:a.Vs,vertexShader:en.vertexShader,fragmentShader:en.fragmentShader})))});e.s(["f",0,v])},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:r,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...u},h)=>{let{size:p=24,strokeWidth:f=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:y=""}=(0,t.useContext)(n)??{},v=o??m?24*Number(a??f)/Number(r??p):a??f;return(0,t.createElement)("svg",{ref:h,...s,width:r??p??s.width,height:r??p??s.height,stroke:e??x,strokeWidth:v,className:i("lucide",y,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,s)=>{let n=(0,t.forwardRef)(({className:n,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:s,className:i(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...o}));return n.displayName=r(e),n}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},11601,e=>{"use strict";var t=e.i(43476),i=e.i(71645);e.i(81413);var r=e.i(48205),s=e.i(14228),n=e.i(82192),a=e.i(4685),o=e.i(68647),l=e.i(94800),c=e.i(43216),d=e.i(60099),u=e.i(90072);function h({onDataChange:e,isPlaying:r=!0,simulationSpeed:s=1,resetTrigger:n=0,stage:a=0,showLabels:o=!0}){let p=(0,i.useRef)(null),f=(0,i.useRef)(null),m=(0,i.useRef)(null),x=(0,i.useRef)([]),y=(0,i.useRef)(0),v=(0,i.useRef)(0),g=(0,i.useRef)(0),b=(0,i.useRef)(0),w=(0,i.useRef)(0),j=(0,i.useRef)(0),M=(0,i.useRef)(0),S=(0,i.useRef)(0),E=(0,i.useRef)(0),P=(0,i.useRef)(0),[A,C]=(0,i.useState)({stage:"Glycolysis",atpProduced:0,glucoseRemaining:100,co2Produced:0,nadhCount:0,fadh2Count:0,description:"Glucose (6C) splits into 2 pyruvate (3C) in cytoplasm. Net: 2 ATP + 2 NADH.",atpFromGlycolysis:0,atpFromPyruvate:0,atpFromKrebs:0,atpFromETC:0}),N=["Glycolysis","Pyruvate Oxidation","Krebs Cycle","Electron Transport Chain"],T=["Glucose (6C) splits into 2 pyruvate (3C) in cytoplasm. Net: 2 ATP + 2 NADH produced.","Each pyruvate (3C) → Acetyl-CoA (2C) + CO₂. 2 NADH produced for entire glucose.","Acetyl-CoA enters Krebs Cycle. Produces 2 ATP, 6 NADH, 2 FADH₂, and 4 CO₂ per glucose.","Electrons flow through protein complexes. ATP synthase produces ~32-34 ATP. O₂ → H₂O."],_=(0,i.useMemo)(()=>{let e=[];for(let t=0;t<=6;t++){let i=t/6*Math.PI*2;e.push([.2*Math.cos(i),.2*Math.sin(i),0])}return e},[]);(0,i.useMemo)(()=>{let e=new u.Ow;return e.moveTo(0,3.2),e.bezierCurveTo(1.8,3.2,2.6,2.2,2.6,0),e.bezierCurveTo(2.6,-2.2,1.8,-3.2,0,-3.2),e.bezierCurveTo(-1.8,-3.2,-2.6,-2.2,-2.6,0),e.bezierCurveTo(-2.6,2.2,-1.8,3.2,0,3.2),e},[]);let z=(0,i.useMemo)(()=>[{id:"I",pos:new u.cE(1.6,2,0),color:"#f59e0b",label:"I",isATPSynthase:!1},{id:"II",pos:new u.cE(-1.8,1.2,0),color:"#8b5cf6",label:"II",isATPSynthase:!1},{id:"III",pos:new u.cE(1.8,-.4,0),color:"#ef4444",label:"III",isATPSynthase:!1},{id:"IV",pos:new u.cE(-1.6,-1.6,0),color:"#06b6d4",label:"IV",isATPSynthase:!1},{id:"ATP",pos:new u.cE(0,0,0),color:"#22c55e",label:"ATP Synthase",isATPSynthase:!0}],[]),L=(0,i.useMemo)(()=>{let e=[];for(let t=0;t<=40;t++){let i=t/40*Math.PI*2,r=2.1+.15*Math.sin(.5*t);e.push([Math.cos(i)*r,Math.sin(i)*r*.7,(t%3-1)*.3])}return e},[]);return(0,i.useEffect)(()=>{x.current=[],y.current=0,v.current=0,g.current=0,b.current=0,w.current=0,j.current=0,M.current=0,S.current=0,E.current=0,P.current=0;for(let e=0;e<6;e++)x.current.push({id:`glucose-${e}`,type:"glucose",position:new u.cE(-5+2*Math.random(),(Math.random()-.5)*3,(Math.random()-.5)*1.5),velocity:new u.cE(.015+.01*Math.random(),(Math.random()-.5)*.008,(Math.random()-.5)*.008),active:!0,animProgress:0});for(let e=0;e<30;e++){let t=Math.random()*Math.PI*2;x.current.push({id:`proton-${e}`,type:"proton",position:new u.cE(2.3*Math.cos(t),(Math.random()-.5)*4,(Math.random()-.5)*1),velocity:new u.cE(0,0,0),active:!1,animProgress:0})}for(let e=0;e<8;e++)x.current.push({id:`o2-${e}`,type:"o2",position:new u.cE(-1.5+3*Math.random(),-2.5+(Math.random()-.5)*1,(Math.random()-.5)*1.5),velocity:new u.cE(0,.008,0),active:!1,animProgress:0})},[n]),(0,l.f)((t,i)=>{if(!r)return;E.current+=i*s,P.current++;let n=x.current;if(n.forEach(e=>{if(!e.active){3===a&&"proton"===e.type&&(e.active=!0),3===a&&"o2"===e.type&&(e.active=!0);return}if(e.position.add(e.velocity.clone().multiplyScalar(s)),0===a){if("glucose"===e.type&&(e.animProgress+=.35*i*s,e.animProgress>=1&&.03>Math.random())){if(v.current>=2){e.animProgress=0;return}e.type="pyruvate",e.animProgress=0,v.current=Math.min(2,v.current+.5),y.current=Math.min(38,y.current+.5);let t={id:`atp-${Date.now()}-${Math.random()}`,type:"atp",position:e.position.clone().add(new u.cE(0,.5,0)),velocity:new u.cE((Math.random()-.5)*.015,.02,(Math.random()-.5)*.01),active:!0,animProgress:0};n.push(t);let i={id:`pyruvate-${Date.now()}-${Math.random()}`,type:"pyruvate",position:e.position.clone().add(new u.cE(.4,.2,0)),velocity:e.velocity.clone(),active:!0,animProgress:0};n.push(i)}if("pyruvate"===e.type){let t=new u.cE(-1,0,0).sub(e.position).normalize().multiplyScalar(.008);e.velocity.add(t.multiplyScalar(.15))}"atp"===e.type&&e.position.length()>6&&(e.active=!1)}else if(1===a){if("pyruvate"===e.type&&(e.animProgress+=.3*i*s,e.animProgress>.6&&.02>Math.random())){let t={id:`co2-${Date.now()}-${Math.random()}`,type:"co2",position:e.position.clone(),velocity:new u.cE((Math.random()-.5)*.03,.025,(Math.random()-.5)*.03),active:!0,animProgress:0};n.push(t),j.current+=1,M.current+=.5,g.current=Math.min(2,g.current+.5);let i={id:`nadh-${Date.now()}-${Math.random()}`,type:"nadh",position:e.position.clone().add(new u.cE(.3,.2,0)),velocity:new u.cE(.01,.01,0),active:!0,animProgress:0};n.push(i),e.type="acetylCoA"}if("acetylCoA"===e.type){let t=new u.cE(0,0,0).sub(e.position).normalize().multiplyScalar(.012);e.velocity.add(t)}"co2"===e.type&&(e.velocity.y=.02,e.position.y>5&&(e.active=!1)),"nadh"===e.type&&e.position.length()>5&&(e.active=!1)}else if(2===a){if("acetylCoA"===e.type&&(e.animProgress+=.25*i*s,e.animProgress>.5&&.015>Math.random())){let t={id:`co2-${Date.now()}-${Math.random()}`,type:"co2",position:e.position.clone(),velocity:new u.cE((Math.random()-.5)*.035,.022,(Math.random()-.5)*.035),active:!0,animProgress:0};if(n.push(t),j.current+=1,M.current+=.15,.33>Math.random()){S.current+=.1;let t={id:`fadh2-${Date.now()}-${Math.random()}`,type:"fadh2",position:e.position.clone().add(new u.cE(-.2,.2,0)),velocity:new u.cE(-.008,.008,0),active:!0,animProgress:0};n.push(t)}b.current<2&&(b.current=Math.min(2,b.current+.25),y.current=Math.min(38,y.current+.25));let i={id:`atp-${Date.now()}-${Math.random()}`,type:"atp",position:e.position.clone().add(new u.cE(0,.3,0)),velocity:new u.cE((Math.random()-.5)*.012,.015,(Math.random()-.5)*.008),active:!0,animProgress:0};n.push(i),e.animProgress=0}"co2"===e.type&&(e.velocity.y=.018,e.position.y>5&&(e.active=!1)),("nadh"===e.type||"fadh2"===e.type)&&e.position.length()>4.5&&(e.active=!1)}else if(3===a){if("proton"===e.type)if(Math.sqrt(e.position.x**2+(e.position.z/.7)**2)>1.6)e.velocity.y+=(Math.random()-.5)*.003;else{let t=new u.cE(0,.95*e.position.y,0).sub(e.position).normalize().multiplyScalar(.015);if(e.velocity.add(t),.3>Math.abs(e.position.x)&&.08>Math.random()){if(y.current>=38||w.current>=34){e.active=!1;return}w.current=Math.min(34,w.current+1.1),y.current=Math.min(38,y.current+1.1);let t={id:`atp-${Date.now()}-${Math.random()}`,type:"atp",position:new u.cE(0,e.position.y,.5),velocity:new u.cE(.008,.008,.012),active:!0,animProgress:0};n.push(t)}}if(("nadh"===e.type||"fadh2"===e.type)&&.02>Math.random()){let t={id:`electron-${Date.now()}-${Math.random()}`,type:"electron",position:e.position.clone(),velocity:new u.cE(-.035-.02*Math.random(),(Math.random()-.5)*.015,0),active:!0,animProgress:0};n.push(t),e.active=!1}"electron"===e.type&&(e.animProgress+=.6*i*s,e.animProgress>=1&&(e.active=!1)),"o2"===e.type&&.015>Math.random()&&(e.type="h2o",e.velocity=new u.cE((Math.random()-.5)*.012,.01,(Math.random()-.5)*.012)),("atp"===e.type||"h2o"===e.type)&&e.position.length()>6&&(e.active=!1)}e.position.length()>7&&(e.velocity.multiplyScalar(-.4),e.position.normalize().multiplyScalar(7))}),y.current=Math.min(38,y.current),P.current%8==0){let t={stage:N[a],atpProduced:Math.round(y.current),glucoseRemaining:Math.max(0,100-Math.round(y.current/38*100)),co2Produced:j.current,nadhCount:Math.round(M.current),fadh2Count:Math.round(S.current),description:T[a],atpFromGlycolysis:Math.round(v.current),atpFromPyruvate:Math.round(g.current),atpFromKrebs:Math.round(b.current),atpFromETC:Math.round(w.current)};C(t),e?.(t)}f.current&&2===a&&(f.current.rotation.z+=i*s*.8),m.current&&3===a&&(m.current.rotation.z+=i*s*8)}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.35}),(0,t.jsx)("directionalLight",{position:[8,10,5],intensity:1.2,castShadow:!0}),(0,t.jsx)("pointLight",{position:[0,0,0],intensity:.4,color:"#ef4444"}),(0,t.jsx)("pointLight",{position:[-4,2,3],intensity:.3,color:"#f59e0b"}),(0,t.jsxs)("group",{ref:p,children:[(0,t.jsx)("gridHelper",{args:[16,32,"#1a1a3e","#1a1a3e"],position:[0,-5.5,0]}),0===a&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[-4,0,-.5],children:[(0,t.jsx)("sphereGeometry",{args:[3.5,32,32]}),(0,t.jsx)("meshStandardMaterial",{color:"#1e3a5f",transparent:!0,opacity:.08})]}),o&&(0,t.jsx)(d.f,{position:[-5.5,3.5,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-blue-600/95 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg border-2 border-blue-400",children:"🫧 Cytoplasm - Glycolysis"})}),Array.from({length:4}).map((e,i)=>(0,t.jsx)("group",{position:[-5+1.5*i,-2,.5],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.15,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#60a5fa",emissive:"#3b82f6",emissiveIntensity:.5+.3*Math.sin(4*E.current+i)})]})},i))]}),a>=1&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[0,0,0],rotation:[0,0,Math.PI/6],children:[(0,t.jsx)("capsuleGeometry",{args:[2.4,4.8,16,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#b91c1c",transparent:!0,opacity:.15,roughness:.3,metalness:.1,side:u.Vs})]}),(0,t.jsxs)("mesh",{position:[0,0,0],rotation:[0,0,Math.PI/6],children:[(0,t.jsx)("capsuleGeometry",{args:[1.7,3.8,16,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#991b1b",transparent:!0,opacity:.2,roughness:.4,metalness:.15,side:u.Vs})]}),Array.from({length:12}).map((e,i)=>{let r=i/12*Math.PI*2+Math.PI/6,s=1.5+.25*Math.sin(.6*i);return(0,t.jsx)("group",{position:[Math.cos(r)*s,(i-6)*.55,Math.sin(r)*s*.6],children:(0,t.jsxs)("mesh",{rotation:[0,0,Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[.08,.08,.7,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#f87171",transparent:!0,opacity:.6})]})},i)}),o&&(0,t.jsx)(d.f,{position:[0,0,0],distanceFactor:10,children:(0,t.jsx)("div",{className:"bg-amber-600/90 text-white px-2 py-1 rounded text-xs font-medium",children:"Mitochondrial Matrix"})})]}),1===a&&(0,t.jsxs)(t.Fragment,{children:[o&&(0,t.jsx)(d.f,{position:[0,4,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-orange-500/95 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg border-2 border-orange-400",children:"Pyruvate Oxidation"})}),(0,t.jsx)(c.f,{points:[[-2,1.5,0],[-.5,0,0],[0,-.5,0]],color:"#f59e0b",lineWidth:3,opacity:.6,transparent:!0,dashed:!0}),Array.from({length:3}).map((e,i)=>(0,t.jsx)("group",{position:[-1+.5*i,2.5+.3*i,0],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.08,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#9ca3af",transparent:!0,opacity:.5-.12*i,emissive:"#9ca3af",emissiveIntensity:.3})]})},i))]}),2===a&&(0,t.jsxs)(t.Fragment,{children:[o&&(0,t.jsx)(d.f,{position:[0,4,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-green-600/95 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg border-2 border-green-400",children:"🔄 Krebs Cycle (Citric Acid Cycle)"})}),(0,t.jsxs)("group",{ref:f,position:[0,0,0],children:[(0,t.jsx)(c.f,{points:Array.from({length:48},(e,t)=>{let i=t/48*Math.PI*2;return[1.1*Math.cos(i),1.1*Math.sin(i),0]}),color:"#22c55e",lineWidth:3,opacity:.7}),Array.from({length:8}).map((e,i)=>{let r=i/8*Math.PI*2;return(0,t.jsx)("group",{position:[1.1*Math.cos(r),1.1*Math.sin(r),0],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.12,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#22c55e",emissive:"#22c55e",emissiveIntensity:.6+.3*Math.sin(5*E.current+i)})]})},i)}),(0,t.jsxs)("mesh",{position:[0,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.3,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#22c55e",emissive:"#22c55e",emissiveIntensity:.5+.25*Math.sin(3*E.current)})]})]}),o&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(d.f,{position:[2,2,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-gray-900/90 px-3 py-2 rounded text-xs border border-gray-700",children:[(0,t.jsx)("div",{className:"text-gray-400",children:"Outputs per glucose:"}),(0,t.jsx)("div",{className:"text-green-400",children:"• 2 ATP"}),(0,t.jsx)("div",{className:"text-blue-400",children:"• 6 NADH"}),(0,t.jsx)("div",{className:"text-purple-400",children:"• 2 FADH₂"}),(0,t.jsx)("div",{className:"text-gray-400",children:"• 4 CO₂"})]})})})]}),3===a&&(0,t.jsxs)(t.Fragment,{children:[o&&(0,t.jsx)(d.f,{position:[0,4.5,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-cyan-600/95 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg border-2 border-cyan-400",children:"⚡ Electron Transport Chain"})}),z.map(e=>(0,t.jsxs)("group",{position:e.pos,children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("boxGeometry",{args:[.4,.5,.3]}),(0,t.jsx)("meshStandardMaterial",{color:e.color,emissive:e.color,emissiveIntensity:.5+.3*Math.sin(6*E.current+e.id.length)})]}),o&&(0,t.jsx)(d.f,{position:[0,.4,0],distanceFactor:8,children:(0,t.jsx)("div",{className:"bg-gray-900/90 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap border border-gray-700",children:e.label})}),e.isATPSynthase&&(0,t.jsxs)("group",{ref:m,children:[(0,t.jsxs)("mesh",{position:[0,.4,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.2,.2,.4,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#22c55e",emissive:"#22c55e",emissiveIntensity:.7})]}),(0,t.jsxs)("mesh",{position:[0,.7,0],children:[(0,t.jsx)("sphereGeometry",{args:[.16,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#fbbf24",emissive:"#fbbf24",emissiveIntensity:.6})]}),Array.from({length:3}).map((e,i)=>(0,t.jsxs)("mesh",{position:[.25*Math.cos(i/3*Math.PI*2),.4,.25*Math.sin(i/3*Math.PI*2)],rotation:[0,0,i/3*Math.PI*2],children:[(0,t.jsx)("boxGeometry",{args:[.15,.02,.3]}),(0,t.jsx)("meshStandardMaterial",{color:"#22c55e",emissive:"#22c55e",emissiveIntensity:.5})]},i))]})]},e.id)),(0,t.jsx)(c.f,{points:L,color:"#fbbf24",lineWidth:1.5,opacity:.4,transparent:!0,dashed:!0}),o&&(0,t.jsx)(d.f,{position:[2.5,2,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-yellow-600/90 text-white px-2 py-1 rounded text-xs font-bold",children:"H⁺ Gradient"})}),(0,t.jsx)(c.f,{points:Array.from({length:50},(e,t)=>{let i=t/50;return[1.8*Math.cos(i*Math.PI*2),(i-.5)*4,0]}),color:"#06b6d4",lineWidth:2,opacity:.5,transparent:!0,dashed:!0}),o&&(0,t.jsx)(d.f,{position:[-2,-3,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-blue-600/90 text-white px-2 py-1 rounded text-xs font-bold",children:"O₂ + e⁻ → H₂O"})})]}),x.current.map(e=>{if(!e.active)return null;let i=.4+.25*Math.sin(4*E.current+e.id.length);switch(e.type){case"glucose":return(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsx)(c.f,{points:_,color:"#f97316",lineWidth:2.5}),Array.from({length:6}).map((e,r)=>{let s=r/6*Math.PI*2;return(0,t.jsxs)("mesh",{position:[.2*Math.cos(s),.2*Math.sin(s),0],children:[(0,t.jsx)("sphereGeometry",{args:[.055,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#ea580c",emissive:"#f97316",emissiveIntensity:i})]},r)})]},e.id);case"pyruvate":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.14,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#f59e0b",emissive:"#f59e0b",emissiveIntensity:i})]})},e.id);case"acetylCoA":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.16,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#a855f7",emissive:"#a855f7",emissiveIntensity:i})]})},e.id);case"atp":return(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.15,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#22c55e",emissive:"#22c55e",emissiveIntensity:.8,transparent:!0,opacity:.9})]}),Array.from({length:3}).map((e,i)=>(0,t.jsxs)("mesh",{position:[.08*(i+1),.08,0],children:[(0,t.jsx)("sphereGeometry",{args:[.045,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#fbbf24",emissive:"#fbbf24",emissiveIntensity:.6})]},i))]},e.id);case"co2":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.1,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#9ca3af",transparent:!0,opacity:.6,emissive:"#9ca3af",emissiveIntensity:.3})]})},e.id);case"nadh":return(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.13,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#3b82f6",emissive:"#3b82f6",emissiveIntensity:.7})]}),(0,t.jsxs)("mesh",{position:[.08,0,0],children:[(0,t.jsx)("boxGeometry",{args:[.08,.08,.08]}),(0,t.jsx)("meshStandardMaterial",{color:"#1e40af"})]})]},e.id);case"fadh2":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.13,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#a855f7",emissive:"#a855f7",emissiveIntensity:.7})]})},e.id);case"electron":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.06,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#06b6d4",emissive:"#06b6d4",emissiveIntensity:.9+.4*Math.sin(15*E.current)})]})},e.id);case"proton":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.07,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#fbbf24",emissive:"#fbbf24",emissiveIntensity:.6+.3*Math.sin(8*E.current+e.id.length)})]})},e.id);case"o2":return(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsxs)("mesh",{position:[-.07,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.1,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:"#06b6d4",emissive:"#06b6d4",emissiveIntensity:.5})]}),(0,t.jsxs)("mesh",{position:[.07,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.1,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:"#06b6d4",emissive:"#06b6d4",emissiveIntensity:.5})]})]},e.id);case"h2o":return(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.09,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:"#60a5fa",transparent:!0,opacity:.8,emissive:"#3b82f6",emissiveIntensity:.4})]})},e.id);default:return null}}),o&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.f,{position:[0,-5.5,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-red-600/95 text-white px-5 py-2 rounded-lg text-base font-bold shadow-lg border-2 border-red-400",children:["Stage ",a+1,": ",N[a]]})}),(0,t.jsx)(d.f,{position:[-5.5,-3.5,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 px-4 py-3 rounded-lg shadow-lg border border-gray-700 min-w-[200px]",children:[(0,t.jsx)("div",{className:"text-white font-bold text-sm mb-3",children:"⚡ ATP Production"}),(0,t.jsxs)("div",{className:"space-y-2 text-xs",children:[(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Glycolysis:"}),(0,t.jsxs)("span",{className:"text-blue-400 font-bold",children:[A.atpFromGlycolysis," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Pyruvate Ox:"}),(0,t.jsxs)("span",{className:"text-orange-400 font-bold",children:[A.atpFromPyruvate," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Krebs Cycle:"}),(0,t.jsxs)("span",{className:"text-green-400 font-bold",children:[A.atpFromKrebs," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"ETC:"}),(0,t.jsxs)("span",{className:"text-cyan-400 font-bold",children:[A.atpFromETC," ATP"]})]}),(0,t.jsxs)("div",{className:"border-t border-gray-700 pt-2 mt-2 flex justify-between text-white font-bold text-sm",children:[(0,t.jsx)("span",{children:"Total:"}),(0,t.jsxs)("span",{className:`${A.atpProduced>=38?"text-yellow-400":"text-green-400"}`,children:[A.atpProduced>=38?"✓ ":"",A.atpProduced,"/38 ATP"]})]}),A.atpProduced>=38&&(0,t.jsx)("div",{className:"mt-2 text-xs text-yellow-400 font-bold text-center animate-pulse",children:"🎉 Cellular Respiration Complete!"})]})]})}),(0,t.jsx)(d.f,{position:[5,-3.5,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 px-4 py-3 rounded-lg shadow-lg border border-gray-700 min-w-[180px]",children:[(0,t.jsx)("div",{className:"text-white font-bold text-sm mb-3",children:"🧪 Molecules"}),(0,t.jsxs)("div",{className:"space-y-2 text-xs",children:[(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"CO₂ Produced:"}),(0,t.jsx)("span",{className:"text-gray-300 font-bold",children:A.co2Produced})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"NADH:"}),(0,t.jsx)("span",{className:"text-blue-400 font-bold",children:A.nadhCount})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"FADH₂:"}),(0,t.jsx)("span",{className:"text-purple-400 font-bold",children:A.fadh2Count})]})]})]})}),(0,t.jsx)(d.f,{position:[0,5.5,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-gray-800/95 text-white px-4 py-2 rounded-lg text-xs max-w-[300px] shadow-lg border border-gray-700 text-center",children:A.description})})]})]})]})}e.s(["default",0,function(){let[e,l]=(0,i.useState)(!0),[c,d]=(0,i.useState)(1),[u,p]=(0,i.useState)(0),[f,m]=(0,i.useState)(!0),[x,y]=(0,i.useState)(!1),[v,g]=(0,i.useState)(0),[b,w]=(0,i.useState)(!0),[j,M]=(0,i.useState)({stage:"Glycolysis",atpProduced:0,glucoseRemaining:100,co2Produced:0,nadhCount:0,fadh2Count:0,description:"Glucose (6C) splits into 2 pyruvate (3C) in cytoplasm. Net: 2 ATP + 2 NADH.",atpFromGlycolysis:0,atpFromPyruvate:0,atpFromKrebs:0,atpFromETC:0}),S=(0,i.useCallback)(()=>{l(e=>!e)},[]),E=(0,i.useCallback)(()=>{p(e=>e+1),g(0)},[]),P=(0,i.useCallback)(e=>{d(e)},[]),A=(0,i.useCallback)(e=>{M(e)},[]),C=(0,i.useMemo)(()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.E,{title:"Cellular Respiration Stages",children:["Glycolysis","Pyruvate Oxidation","Krebs Cycle","Electron Transport Chain"].map((e,i)=>(0,t.jsxs)("button",{onClick:()=>g(i),className:`w-full px-3 py-2 rounded text-sm transition-colors mb-2 ${v===i?"bg-[#ef4444] text-white font-bold":"bg-gray-800 text-gray-300 hover:bg-gray-700"}`,children:[i+1,". ",e]},e))}),(0,t.jsx)(o.E,{title:"ATP Accounting",children:(0,t.jsxs)("div",{className:"bg-gray-800/50 rounded-lg p-3 text-xs space-y-2",children:[(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Glycolysis:"}),(0,t.jsxs)("span",{className:"text-blue-400",children:[j.atpFromGlycolysis," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Pyruvate Ox:"}),(0,t.jsxs)("span",{className:"text-orange-400",children:[j.atpFromPyruvate," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"Krebs Cycle:"}),(0,t.jsxs)("span",{className:"text-green-400",children:[j.atpFromKrebs," ATP"]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-400",children:[(0,t.jsx)("span",{children:"ETC:"}),(0,t.jsxs)("span",{className:"text-cyan-400",children:[j.atpFromETC," ATP"]})]}),(0,t.jsxs)("div",{className:"border-t border-gray-700 pt-2 mt-2 flex justify-between text-gray-300 font-bold",children:[(0,t.jsx)("span",{children:"Total:"}),(0,t.jsxs)("span",{className:"text-green-400",children:[j.atpProduced,"/38 ATP"]})]})]})}),(0,t.jsx)(o.E,{title:"Display",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 text-gray-300 text-sm cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:b,onChange:e=>w(e.target.checked),className:"w-4 h-4 rounded accent-[#ef4444]"}),"Show Labels"]})})]}),[v,b,j]),N=(0,i.useMemo)(()=>(0,t.jsx)(o.Z,{data:{stage:{value:0,unit:j.stage,color:"#ef4444",decimals:0},atpProduced:{value:j.atpProduced,unit:"/38",color:"#22c55e",decimals:0},glucose:{value:j.glucoseRemaining,unit:"%",color:"#3b82f6",decimals:0},co2:{value:j.co2Produced,unit:"CO₂",color:"#6b7280",decimals:0},nadh:{value:j.nadhCount,unit:"NADH",color:"#f59e0b",decimals:0},fadh2:{value:j.fadh2Count,unit:"FADH₂",color:"#a855f7",decimals:0},status:{value:+!!e,unit:e?"Active":"Paused",color:"#22c55e",decimals:0}},columns:2}),[j,e]),T=(0,i.useMemo)(()=>(0,t.jsx)(a.f,{isVisible:x,onToggle:()=>y(e=>!e),children:N}),[x,N]);return(0,t.jsxs)("div",{className:"w-full h-screen relative",children:[(0,t.jsx)(r.f,{title:"Cellular Respiration",description:"ATP production through 4 stages: ~38 ATP per glucose molecule",cameraPosition:[0,0,13],backgroundColor:"#050510",controls:null,dataPanel:T,children:(0,t.jsx)(h,{onDataChange:A,isPlaying:e,simulationSpeed:c,resetTrigger:u,stage:v,showLabels:b})}),(0,t.jsx)(s.f,{isPlaying:e,onPlayPause:S,onReset:E,speed:c,onSpeedChange:P,timeElapsed:0}),f&&(0,t.jsx)(n.f,{initialPosition:{x:window.innerWidth-340,y:80},children:C}),!f&&(0,t.jsx)("button",{onClick:()=>m(!0),className:"fixed top-20 right-4 z-20 px-4 py-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] rounded-lg border border-[#ef4444]/50 transition-colors text-sm font-medium",children:"Show Controls"})]})}],11601)}]);