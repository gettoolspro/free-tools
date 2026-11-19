(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var r=e.i(31067),n=e.i(71645),s=e.i(90072),o=e.i(48546),a=s,l=s;let c=new l.VQ,d=new l.cE;class f extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let r=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(r,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let n=0,s=e.count;n<s;n++)d.fromBufferAttribute(e,n),r=Math.max(r,i.distanceToSquared(d)),d.fromBufferAttribute(t,n),r=Math.max(r,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var u=s,p=e.i(8560),m=e.i(31497);class h extends u.Zg{constructor(e){super({type:"LineMaterial",uniforms:u.SP.clone(u.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new u.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${m.f>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let y=m.f>=125?"uv1":"uv2",g=new a.$i,x=new a.cE,v=new a.cE,S=new a.$i,w=new a.$i,b=new a.$i,j=new a.cE,E=new a.nd,M=new a._i,_=new a.cE,C=new a.VQ,A=new a.L0,P=new a.$i;function L(e,t,r){return P.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),P.multiplyScalar(1/P.w),P.x=i/r.width,P.y=i/r.height,P.applyMatrix4(e.projectionMatrixInverse),P.multiplyScalar(1/P.w),Math.abs(Math.max(P.x,P.y))}class z extends a.kE{constructor(e=new f,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,n=0,s=t.count;e<s;e++,n+=2)x.fromBufferAttribute(t,e),v.fromBufferAttribute(i,e),r[n]=0===n?0:r[n-1],r[n+1]=r[n]+x.distanceTo(v);let n=new a.hC(r,2,1);return e.setAttribute("instanceDistanceStart",new a.Zq(n,1,0)),e.setAttribute("instanceDistanceEnd",new a.Zq(n,1,1)),this}raycast(e,r){let n,s,o=this.material.worldUnits,l=e.camera;null!==l||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,f=this.geometry,u=this.material;if(i=u.linewidth+c,null===f.boundingSphere&&f.computeBoundingSphere(),A.copy(f.boundingSphere).applyMatrix4(d),o)n=.5*i;else{let e=Math.max(l.near,A.distanceToPoint(t.origin));n=L(l,e,u.resolution)}if(A.radius+=n,!1!==t.intersectsSphere(A)){if(null===f.boundingBox&&f.computeBoundingBox(),C.copy(f.boundingBox).applyMatrix4(d),o)s=.5*i;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));s=L(l,e,u.resolution)}C.expandByScalar(s),!1!==t.intersectsBox(C)&&(o?function(e,r){let n=e.matrixWorld,s=e.geometry,o=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,o.count);for(let s=0;s<c;s++){M.start.fromBufferAttribute(o,s),M.end.fromBufferAttribute(l,s),M.applyMatrix4(n);let c=new a.cE,d=new a.cE;t.distanceSqToSegment(M.start,M.end,d,c),d.distanceTo(c)<.5*i&&r.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[y]:null})}}(this,r):function(e,r,n){let s=r.projectionMatrix,o=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,f=c.attributes.instanceEnd,u=Math.min(c.instanceCount,d.count),p=-r.near;t.at(1,b),b.w=1,b.applyMatrix4(r.matrixWorldInverse),b.applyMatrix4(s),b.multiplyScalar(1/b.w),b.x*=o.x/2,b.y*=o.y/2,b.z=0,j.copy(b),E.multiplyMatrices(r.matrixWorldInverse,l);for(let r=0;r<u;r++){if(S.fromBufferAttribute(d,r),w.fromBufferAttribute(f,r),S.w=1,w.w=1,S.applyMatrix4(E),w.applyMatrix4(E),S.z>p&&w.z>p)continue;if(S.z>p){let e=S.z-w.z,t=(S.z-p)/e;S.lerp(w,t)}else if(w.z>p){let e=w.z-S.z,t=(w.z-p)/e;w.lerp(S,t)}S.applyMatrix4(s),w.applyMatrix4(s),S.multiplyScalar(1/S.w),w.multiplyScalar(1/w.w),S.x*=o.x/2,S.y*=o.y/2,w.x*=o.x/2,w.y*=o.y/2,M.start.copy(S),M.start.z=0,M.end.copy(w),M.end.z=0;let c=M.closestPointToPointParameter(j,!0);M.at(c,_);let u=a.rB.lerp(S.z,w.z,c),m=u>=-1&&u<=1,h=j.distanceTo(_)<.5*i;if(m&&h){M.start.fromBufferAttribute(d,r),M.end.fromBufferAttribute(f,r),M.start.applyMatrix4(l),M.end.applyMatrix4(l);let i=new a.cE,s=new a.cE;t.distanceSqToSegment(M.start,M.end,s,i),n.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[y]:null})}}}(this,l,r))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class H extends f{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let r=0;r<t;r+=3)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,r=new Float32Array(2*i);if(3===t)for(let n=0;n<i;n+=t)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];else for(let n=0;n<i;n+=t)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5],r[2*n+6]=e[n+6],r[2*n+7]=e[n+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class O extends z{constructor(e=new H,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let U=n.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:a,lineWidth:l,segments:c,dashed:d,...u},p){var m,y;let g=(0,o.f)(e=>e.size),x=n.useMemo(()=>c?new z:new O,[c]),[v]=n.useState(()=>new h),S=(null==i||null==(m=i[0])?void 0:m.length)===4?4:3,w=n.useMemo(()=>{let r=c?new f:new H,n=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(n.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);r.setColors(e.flat(),S)}return r},[e,c,i,S]);return n.useLayoutEffect(()=>{x.computeLineDistances()},[e,x]),n.useLayoutEffect(()=>{d?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[d,v]),n.useEffect(()=>()=>{w.dispose(),v.dispose()},[w]),n.createElement("primitive",(0,r.f)({object:x,ref:p},u),n.createElement("primitive",{object:w,attach:"geometry"}),n.createElement("primitive",(0,r.f)({object:v,attach:"material",color:t,vertexColors:!!i,resolution:[g.width,g.height],linewidth:null!=(y=null!=a?a:l)?y:1,dashed:d,transparent:4===S},u)))});e.s(["f",0,U],43216)},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),o=(0,t.forwardRef)(({color:e,size:r,strokeWidth:o,absoluteStrokeWidth:a,className:l="",children:c,iconNode:d,...f},u)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,color:y="currentColor",className:g=""}=(0,t.useContext)(s)??{},x=a??h?24*Number(o??m)/Number(r??p):o??m;return(0,t.createElement)("svg",{ref:u,...n,width:r??p??n.width,height:r??p??n.height,stroke:e??y,strokeWidth:x,className:i("lucide",g,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(f)&&{"aria-hidden":"true"},...f},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,n)=>{let s=(0,t.forwardRef)(({className:s,...a},l)=>(0,t.createElement)(o,{ref:l,iconNode:n,className:i(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...a}));return s.displayName=r(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},48944,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(92989);e.i(81413);var n=e.i(48205),s=e.i(14228),o=e.i(82192),a=e.i(4685),l=e.i(68647),c=e.i(94800),d=e.i(43216),f=e.i(90072);let u=[{ph:1,color:new f.Es("#ff0000")},{ph:3,color:new f.Es("#ff8800")},{ph:5,color:new f.Es("#ffff00")},{ph:7,color:new f.Es("#00ff00")},{ph:9,color:new f.Es("#00ffff")},{ph:11,color:new f.Es("#0000ff")},{ph:14,color:new f.Es("#8000ff")}],p=function({acidConcentration:e,baseConcentration:r,acidType:n,isPlaying:s,stepMode:o,currentStep:a,onDataChange:l}){let p=(0,i.useRef)(null),m=(0,i.useRef)({molecules:[],pourProgress:0,reactionProgress:0,productsFormed:0,temperature:298,frameCount:0,pH:1}),[h,y]=(0,i.useState)({pH:1,temperature:298,reactionProgress:0,productsFormed:0,currentStep:1});(0,i.useEffect)(()=>{let t=[],i=Math.floor(20*e),s=Math.floor(20*r);for(let e=0;e<i;e++)t.push({position:new f.cE((Math.random()-.5)*1.5-1.5,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),velocity:new f.cE((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02),type:"H_plus",active:!0}),"HCl"===n&&t.push({position:new f.cE((Math.random()-.5)*1.5-1.5,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),velocity:new f.cE((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02),type:"Cl_minus",active:!0});for(let e=0;e<s;e++)t.push({position:new f.cE((Math.random()-.5)*1.5+1.5,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),velocity:new f.cE((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02),type:"OH_minus",active:!0}),t.push({position:new f.cE((Math.random()-.5)*1.5+1.5,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),velocity:new f.cE((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02),type:"Na_plus",active:!0});m.current.molecules=t,m.current.pourProgress=0,m.current.reactionProgress=0,m.current.productsFormed=0,m.current.temperature=298,m.current.pH=e>r?1:13},[e,r,n]),(0,c.f)(()=>{if(!p.current||!s)return;let t=m.current;o?1===a||(2===a?t.pourProgress=Math.min(t.pourProgress+.02,1):3===a?t.pourProgress=1:4===a?(t.pourProgress=1,t.reactionProgress=1):5===a&&(t.pourProgress=1,t.reactionProgress=1)):t.pourProgress<1?t.pourProgress=Math.min(t.pourProgress+.01,1):t.reactionProgress<1&&(t.reactionProgress=Math.min(t.reactionProgress+.005,1));let i=t.molecules;for(let e of i)if(e.active&&(e.velocity.x+=(Math.random()-.5)*.002,e.velocity.y+=(Math.random()-.5)*.002,e.velocity.z+=(Math.random()-.5)*.002,e.velocity.length()>.03&&e.velocity.normalize().multiplyScalar(.03),e.position.add(e.velocity),t.pourProgress<1&&("OH_minus"===e.type||"Na_plus"===e.type)&&(e.position.x+=(-.5-e.position.x)*.05),t.pourProgress>=1&&(Math.abs(e.position.x+.5)>1.2&&(e.velocity.x*=-1),Math.abs(e.position.y)>1&&(e.velocity.y*=-1),Math.abs(e.position.z)>1.2&&(e.velocity.z*=-1)),t.pourProgress>=1&&t.reactionProgress<1&&"H_plus"===e.type))for(let r of i)r.active&&r!==e&&"OH_minus"===r.type&&.2>e.position.distanceTo(r.position)&&(e.type="H2O",r.type="NaCl",e.active=!0,r.active=!0,t.productsFormed++,t.temperature+=.5);let n=e>r?1:13,c=n+(7-n)*t.reactionProgress;if(t.pH=c,t.frameCount++,t.frameCount%8==0){let e={pH:c,temperature:t.temperature,reactionProgress:t.reactionProgress,productsFormed:t.productsFormed,currentStep:o?a:Math.floor(5*t.reactionProgress)+1};y(e),l?.(e)}});let g=(e=>{for(let t=0;t<u.length-1;t++)if(e>=u[t].ph&&e<=u[t+1].ph){let i=(e-u[t].ph)/(u[t+1].ph-u[t].ph);return u[t].color.clone().lerp(u[t+1].color,i)}return new f.Es("#ff0000")})(m.current.pH),x=(0,i.useMemo)(()=>m.current.molecules.map((e,t)=>({position:e.position.clone(),type:e.type,active:e.active})),[h]),v=(0,i.useMemo)(()=>{if(m.current.pourProgress>=1)return[];let e=[];for(let t=0;t<=10;t++){let i=t/10;e.push([1.5-2*i+(Math.random()-.5)*.2,1+2.5*i,(Math.random()-.5)*.2])}return e},[h.pH]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.4}),(0,t.jsx)("directionalLight",{position:[10,10,5],intensity:.8,castShadow:!0}),(0,t.jsx)("pointLight",{position:[0,0,0],intensity:.3,color:"#6366f1"}),(0,t.jsxs)("group",{ref:p,children:[(0,t.jsxs)("mesh",{position:[-1.5,0,0],children:[(0,t.jsx)("cylinderGeometry",{args:[1,1,2.5,32,1,!0]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#ff4444",transparent:!0,opacity:.3,roughness:.1,metalness:.1,side:f.Vs})]}),(0,t.jsxs)("mesh",{position:[-1.5,-1.25,0],children:[(0,t.jsx)("cylinderGeometry",{args:[1,1,.1,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#ff4444",roughness:.3,metalness:.2})]}),(0,t.jsxs)("mesh",{position:[-1.5,-.3,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.95,.95,1.6,32,1,!0]}),(0,t.jsx)("meshStandardMaterial",{color:g,transparent:!0,opacity:.5})]}),(0,t.jsxs)("mesh",{position:[1.5,0,0],children:[(0,t.jsx)("cylinderGeometry",{args:[1,1,2.5,32,1,!0]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#4444ff",transparent:!0,opacity:.3,roughness:.1,metalness:.1,side:f.Vs})]}),(0,t.jsxs)("mesh",{position:[1.5,-1.25,0],children:[(0,t.jsx)("cylinderGeometry",{args:[1,1,.1,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#4444ff",roughness:.3,metalness:.2})]}),(0,t.jsxs)("mesh",{position:[1.5,-.3,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.95,.95,1.6,32,1,!0]}),(0,t.jsx)("meshStandardMaterial",{color:"#4444ff",transparent:!0,opacity:.5})]}),(0,t.jsxs)("mesh",{position:[-1.5,1.8,0],children:[(0,t.jsx)("boxGeometry",{args:[.8,.3,.05]}),(0,t.jsx)("meshBasicMaterial",{color:"#ff4444"})]}),(0,t.jsxs)("mesh",{position:[1.5,1.8,0],children:[(0,t.jsx)("boxGeometry",{args:[.8,.3,.05]}),(0,t.jsx)("meshBasicMaterial",{color:"#4444ff"})]}),m.current.pourProgress<1&&(0,t.jsx)(d.f,{points:v,color:"#4444ff",lineWidth:3,opacity:.6,transparent:!0}),x.map((e,i)=>e.active&&(0,t.jsx)("group",{position:e.position,children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:["H2O"===e.type||"NaCl"===e.type?.08:.06,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"H_plus"===e.type?"#ff0000":"OH_minus"===e.type?"#0000ff":"Na_plus"===e.type?"#8888ff":"Cl_minus"===e.type?"#ff8888":"H2O"===e.type?"#00ff00":"#00aa00",emissive:"H_plus"===e.type?"#ff0000":"OH_minus"===e.type?"#0000ff":"H2O"===e.type?"#00ff00":"#00aa00",emissiveIntensity:.4})]})},i)),(0,t.jsxs)("group",{position:[3,0,0],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("boxGeometry",{args:[.4,3,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#1a1a2e"})]}),(0,t.jsxs)("mesh",{position:[0,(h.pH-7)*.2,.06],children:[(0,t.jsx)("boxGeometry",{args:[.3,.2*h.pH,.05]}),(0,t.jsx)("meshStandardMaterial",{color:g,emissive:g,emissiveIntensity:.5})]}),(0,t.jsxs)("mesh",{position:[0,(h.pH-7)*.2,.1],children:[(0,t.jsx)("sphereGeometry",{args:[.08,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#ffffff",emissive:"#ffffff",emissiveIntensity:.8})]}),[0,4,-4].map((e,i)=>(0,t.jsxs)("mesh",{position:[.2,.2*e,.07],children:[(0,t.jsx)("boxGeometry",{args:[.05,.03,.02]}),(0,t.jsx)("meshBasicMaterial",{color:"#666"})]},i))]}),(0,t.jsxs)("group",{position:[-3,0,0],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("cylinderGeometry",{args:[.1,.1,3,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#333",metalness:.6,roughness:.4})]}),(0,t.jsxs)("mesh",{position:[0,(h.temperature-273)/50*1.2-.6,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.06,.06,(h.temperature-273)/50*2.4,16]}),(0,t.jsx)("meshStandardMaterial",{color:h.temperature>320?"#ff0000":h.temperature<290?"#0000ff":"#00ff00",emissive:h.temperature>320?"#ff0000":h.temperature<290?"#0000ff":"#00ff00",emissiveIntensity:.6})]}),(0,t.jsxs)("mesh",{position:[0,-1.6,0],children:[(0,t.jsx)("sphereGeometry",{args:[.15,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:h.temperature>320?"#ff0000":h.temperature<290?"#0000ff":"#00ff00",emissive:h.temperature>320?"#ff0000":h.temperature<290?"#0000ff":"#00ff00",emissiveIntensity:.6})]})]}),(0,t.jsxs)("group",{position:[0,2.5,0],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("boxGeometry",{args:[4,.2,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#1a1a2e"})]}),(0,t.jsxs)("mesh",{position:[-2+4*h.reactionProgress,0,.06],children:[(0,t.jsx)("boxGeometry",{args:[4*h.reactionProgress,.15,.05]}),(0,t.jsx)("meshStandardMaterial",{color:"#00ff00",emissive:"#00ff00",emissiveIntensity:.5})]})]}),5===h.currentStep&&(0,t.jsx)("group",{position:[0,-2,2],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("boxGeometry",{args:[3,.4,.1]}),(0,t.jsx)("meshBasicMaterial",{color:"#00ff00"})]})})]}),(0,t.jsx)("gridHelper",{args:[12,24,"#1a1a3e","#1a1a3e"],position:[0,-2.5,0]})]})};e.s(["default",0,function(){let e=(0,r.useRouter)(),[c,d]=(0,i.useState)(!0),[f,u]=(0,i.useState)(1),[m,h]=(0,i.useState)(0),[y,g]=(0,i.useState)(!0),[x,v]=(0,i.useState)(5),[S,w]=(0,i.useState)(5),[b,j]=(0,i.useState)("HCl"),[E,M]=(0,i.useState)(!1),[_,C]=(0,i.useState)(1),[A,P]=(0,i.useState)({pH:1,temperature:298,reactionProgress:0,productsFormed:0,currentStep:1}),L=(0,i.useCallback)(()=>{d(e=>!e)},[]),z=(0,i.useCallback)(()=>{h(e=>e+1),v(5),w(5),j("HCl"),C(1)},[]),H=(0,i.useCallback)(e=>{u(e)},[]),O=(0,i.useCallback)(e=>{P(e)},[]),U=(0,i.useCallback)(()=>{E&&_<5&&C(e=>e+1)},[E,_]),N=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(l.E,{title:"Concentrations",children:[(0,t.jsx)(l.p,{label:"Acid Concentration",value:x,unit:"M",min:1,max:10,step:.5,color:"#ef4444",onChange:v,decimals:1}),(0,t.jsx)(l.p,{label:"Base Concentration",value:S,unit:"M",min:1,max:10,step:.5,color:"#3b82f6",onChange:w,decimals:1})]}),(0,t.jsx)(l.E,{title:"Acid Type",children:(0,t.jsx)("div",{className:"grid grid-cols-3 gap-2",children:["HCl","H2SO4","HNO3"].map(e=>(0,t.jsx)("button",{onClick:()=>j(e),className:`py-2 px-2 rounded-lg text-xs font-medium transition-all ${b===e?"bg-red-600 text-white":"bg-gray-200/50 text-gray-700 hover:bg-gray-300/50"}`,children:e},e))})}),(0,t.jsx)(l.E,{title:"Mode",children:(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsx)("button",{onClick:()=>{M(!1),C(1)},className:`py-2 px-3 rounded-lg text-sm font-medium transition-all ${!E?"bg-purple-600 text-white":"bg-gray-200/50 text-gray-700 hover:bg-gray-300/50"}`,children:"Auto"}),(0,t.jsx)("button",{onClick:()=>{M(!0),C(1)},className:`py-2 px-3 rounded-lg text-sm font-medium transition-all ${E?"bg-purple-600 text-white":"bg-gray-200/50 text-gray-700 hover:bg-gray-300/50"}`,children:"Step"})]})}),E&&(0,t.jsx)("button",{onClick:U,disabled:_>=5,className:"w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50",children:_>=5?"✓ Complete":`Step ${_}/5 - Mix`}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/acid-base-reactions/details"),className:"w-full py-2.5 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 font-medium text-sm rounded-lg transition-all border border-red-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),B=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.Z,{data:{pH:{value:A.pH,unit:"",color:A.pH>7?"#3b82f6":A.pH<7?"#ef4444":"#22c55e",decimals:2},temperature:{value:A.temperature,unit:"K",color:A.temperature>310?"#ef4444":"#22c55e",decimals:1},progress:{value:100*A.reactionProgress,unit:"%",color:"#8b5cf6",decimals:1},products:{value:A.productsFormed,unit:"molecules",color:"#06b6d4",decimals:0}},columns:2}),(0,t.jsxs)("div",{className:"mt-3 p-3 bg-gray-800/50 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-gray-400 text-sm",children:"Step:"}),(0,t.jsx)("span",{className:"font-mono text-purple-400",children:E?`${_}/5`:"Auto"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-2",children:[(0,t.jsx)("span",{className:"text-gray-400 text-sm",children:"Status:"}),(0,t.jsx)("span",{className:"font-mono text-green-400 text-sm",children:1===A.currentStep?"Reactants":2===A.currentStep?"Pouring...":3===A.currentStep?"Reacting...":4===A.currentStep?"Products":"NaOH + HCl → NaCl + H₂O"})]})]})]});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.f,{title:"Acid-Base Reactions",description:"Neutralization reaction: HCl + NaOH → NaCl + H₂O",cameraPosition:[0,2,10],backgroundColor:"#050510",controls:null,dataPanel:null,children:(0,t.jsx)(p,{onDataChange:O,acidConcentration:x,baseConcentration:S,acidType:b,isPlaying:c,stepMode:E,currentStep:_})}),(0,t.jsx)(s.f,{isPlaying:c,onPlayPause:L,onReset:z,speed:f,onSpeedChange:H}),(0,t.jsx)(o.f,{title:"⚙️ Acid-Base Parameters",initialPosition:{x:20,y:80},children:N}),(0,t.jsx)(a.f,{isVisible:y,onToggle:()=>g(!y),children:B})]})}],48944)}]);