(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),s=e.i(71645),r=e.i(90072),a=e.i(48546),o=r,l=r;let d=new l.VQ,c=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),d.setFromBufferAttribute(t),this.boundingBox.union(d))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let s=0,r=e.count;s<r;s++)c.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(c)),c.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=r,p=e.i(8560),h=e.i(31497);class m extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${h.f>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let g=h.f>=125?"uv1":"uv2",x=new o.$i,v=new o.cE,y=new o.cE,b=new o.$i,w=new o.$i,S=new o.$i,E=new o.cE,j=new o.nd,C=new o._i,M=new o.cE,_=new o.VQ,A=new o.L0,z=new o.$i;function L(e,t,n){return z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),z.multiplyScalar(1/z.w),z.x=i/n.width,z.y=i/n.height,z.applyMatrix4(e.projectionMatrixInverse),z.multiplyScalar(1/z.w),Math.abs(Math.max(z.x,z.y))}class U extends o.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,s=0,r=t.count;e<r;e++,s+=2)v.fromBufferAttribute(t,e),y.fromBufferAttribute(i,e),n[s]=0===s?0:n[s-1],n[s+1]=n[s]+v.distanceTo(y);let s=new o.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(s,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(s,1,1)),this}raycast(e,n){let s,r,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let d=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+d,null===u.boundingSphere&&u.computeBoundingSphere(),A.copy(u.boundingSphere).applyMatrix4(c),a)s=.5*i;else{let e=Math.max(l.near,A.distanceToPoint(t.origin));s=L(l,e,f.resolution)}if(A.radius+=s,!1!==t.intersectsSphere(A)){if(null===u.boundingBox&&u.computeBoundingBox(),_.copy(u.boundingBox).applyMatrix4(c),a)r=.5*i;else{let e=Math.max(l.near,_.distanceToPoint(t.origin));r=L(l,e,f.resolution)}_.expandByScalar(r),!1!==t.intersectsBox(_)&&(a?function(e,n){let s=e.matrixWorld,r=e.geometry,a=r.attributes.instanceStart,l=r.attributes.instanceEnd,d=Math.min(r.instanceCount,a.count);for(let r=0;r<d;r++){C.start.fromBufferAttribute(a,r),C.end.fromBufferAttribute(l,r),C.applyMatrix4(s);let d=new o.cE,c=new o.cE;t.distanceSqToSegment(C.start,C.end,c,d),c.distanceTo(d)<.5*i&&n.push({point:c,pointOnLine:d,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:r,uv:null,[g]:null})}}(this,n):function(e,n,s){let r=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,d=e.geometry,c=d.attributes.instanceStart,u=d.attributes.instanceEnd,f=Math.min(d.instanceCount,c.count),p=-n.near;t.at(1,S),S.w=1,S.applyMatrix4(n.matrixWorldInverse),S.applyMatrix4(r),S.multiplyScalar(1/S.w),S.x*=a.x/2,S.y*=a.y/2,S.z=0,E.copy(S),j.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(c,n),w.fromBufferAttribute(u,n),b.w=1,w.w=1,b.applyMatrix4(j),w.applyMatrix4(j),b.z>p&&w.z>p)continue;if(b.z>p){let e=b.z-w.z,t=(b.z-p)/e;b.lerp(w,t)}else if(w.z>p){let e=w.z-b.z,t=(w.z-p)/e;w.lerp(b,t)}b.applyMatrix4(r),w.applyMatrix4(r),b.multiplyScalar(1/b.w),w.multiplyScalar(1/w.w),b.x*=a.x/2,b.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,C.start.copy(b),C.start.z=0,C.end.copy(w),C.end.z=0;let d=C.closestPointToPointParameter(E,!0);C.at(d,M);let f=o.rB.lerp(b.z,w.z,d),h=f>=-1&&f<=1,m=E.distanceTo(M)<.5*i;if(h&&m){C.start.fromBufferAttribute(c,n),C.end.fromBufferAttribute(u,n),C.start.applyMatrix4(l),C.end.applyMatrix4(l);let i=new o.cE,r=new o.cE;t.distanceSqToSegment(C.start,C.end,r,i),s.push({point:r,pointOnLine:i,distance:t.origin.distanceTo(r),object:e,face:null,faceIndex:n,uv:null,[g]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(x),this.material.uniforms.resolution.value.set(x.z,x.w))}}class P extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let s=0;s<i;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];else for(let s=0;s<i;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5],n[2*s+6]=e[s+6],n[2*s+7]=e[s+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class B extends U{constructor(e=new P,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let N=s.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:d,dashed:c,...f},p){var h,g;let x=(0,a.f)(e=>e.size),v=s.useMemo(()=>d?new U:new B,[d]),[y]=s.useState(()=>new m),b=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,w=s.useMemo(()=>{let n=d?new u:new P,s=e.map(e=>{let t=Array.isArray(e);return e instanceof r.cE||e instanceof r.$i?[e.x,e.y,e.z]:e instanceof r.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(s.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof r.Es?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,d,i,b]);return s.useLayoutEffect(()=>{v.computeLineDistances()},[e,v]),s.useLayoutEffect(()=>{c?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[c,y]),s.useEffect(()=>()=>{w.dispose(),y.dispose()},[w]),s.createElement("primitive",(0,n.f)({object:v,ref:p},f),s.createElement("primitive",{object:w,attach:"geometry"}),s.createElement("primitive",(0,n.f)({object:y,attach:"material",color:t,vertexColors:!!i,resolution:[x.width,x.height],linewidth:null!=(g=null!=o?o:l)?g:1,dashed:c,transparent:4===b},f)))});e.s(["f",0,N],43216)},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let r=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:n,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:d,iconNode:c,...u},f)=>{let{size:p=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:g="currentColor",className:x=""}=(0,t.useContext)(r)??{},v=o??m?24*Number(a??h)/Number(n??p):a??h;return(0,t.createElement)("svg",{ref:f,...s,width:n??p??s.width,height:n??p??s.height,stroke:e??g,strokeWidth:v,className:i("lucide",x,l),...!d&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(d)?d:[d]])});e.s(["f",0,(e,s)=>{let r=(0,t.forwardRef)(({className:r,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:s,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,r),...o}));return r.displayName=n(e),r}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},69255,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989),s=e.i(90072),r=e.i(94800),a=e.i(43216);function o({onDataChange:e,charges:n,showFieldLines:l=!0,showVectors:d=!0,showEquipotential:c=!0,showForceVectors:u=!0,cursorPosition:f}){let p=(0,i.useRef)(0);(0,i.useRef)(0);let h=(0,i.useRef)({electricField:0,potential:0,fieldX:0,fieldY:0,fieldZ:0,forcesBetweenCharges:[],numCharges:n.length}),[m,g]=(0,i.useState)(h.current),x=e=>{let t=new s.cE(0,0,0);for(let i of n){if(0===i.magnitude)continue;let n=e.clone().sub(i.position),s=n.length();if(s<.5)continue;let r=8.99*i.magnitude/(s*s),a=n.normalize();t.add(a.multiplyScalar(r))}return t},v=e=>{let t=0;for(let i of n){if(0===i.magnitude)continue;let n=e.distanceTo(i.position);n<.5||(t+=8.99*i.magnitude/n)}return t},y=(e,t)=>{let i=e.position.distanceTo(t.position);return i<.1?{force:0,distance:i}:{force:8.99*Math.abs(e.magnitude*t.magnitude)/(i*i),distance:i}};(0,r.f)(()=>{if(p.current++,p.current%8!=0)return;let t=f||new s.cE(0,5,0),i=x(t),r=v(t),a=[];for(let e=0;e<n.length;e++)for(let t=e+1;t<n.length;t++){let i=y(n[e],n[t]);a.push({charge1:`Q${e+1}`,charge2:`Q${t+1}`,force:i.force,distance:i.distance})}let o={electricField:i.length(),potential:r,fieldX:i.x,fieldY:i.y,fieldZ:i.z,forcesBetweenCharges:a,numCharges:n.length};h.current=o,g(o),e?.(o)});let b=(0,i.useMemo)(()=>{if(!l)return[];let e=[],i=n.filter(e=>e.magnitude>0),r=n.filter(e=>e.magnitude<0);for(let n of i)for(let i=0;i<16;i++){let o=i/16*Math.PI*2,l=i%4/4*Math.PI,d=new s.cE(n.position.x+Math.cos(o)*Math.sin(l)*1.2,n.position.y+Math.sin(o)*Math.sin(l)*1.2,n.position.z+1.2*Math.cos(l)),c=[[d.x,d.y,d.z]];for(let e=0;e<80;e++){let e=x(d);if(0===e.length())break;let t=e.normalize();d.add(t.multiplyScalar(.3)),c.push([d.x,d.y,d.z]);let i=!1;for(let e of r)if(1.5>d.distanceTo(e.position)){i=!0;break}if(i||d.length()>25)break}c.length>2&&e.push((0,t.jsx)(a.f,{points:c,color:"#fbbf24",lineWidth:3,opacity:.7,transparent:!0},`field-${n.id}-${i}`))}return e},[n,l]),w=(0,i.useMemo)(()=>{if(!c||0===n.length)return[];let e=[];[new s.cE(0,0,0),new s.cE(5,0,0),new s.cE(10,0,0)].map(e=>v(e));for(let i=0;i<6;i++)for(let n=0;n<3;n++){let r=4+3*n,o=[];for(let e=0;e<=48;e++){let t=e/48*Math.PI*2;o.push([Math.cos(t)*r,Math.sin(t)*r,0])}let l=(i/6+.1*n)%1,d=new s.Es().setHSL(l,.7,.6);e.push((0,t.jsxs)("group",{children:[(0,t.jsx)(a.f,{points:o,color:d,lineWidth:2,opacity:.4,transparent:!0}),(0,t.jsxs)("mesh",{rotation:[Math.PI/2,0,0],children:[(0,t.jsx)("ringGeometry",{args:[r-.05,r+.05,48]}),(0,t.jsx)("meshBasicMaterial",{color:d,transparent:!0,opacity:.15,side:s.Vs})]})]},`equipotential-${i}-${n}`))}return e},[n,c]),S=(0,i.useMemo)(()=>{if(!u)return[];let e=[];for(let i=0;i<n.length;i++)for(let r=i+1;r<n.length;r++){let o=n[i],l=n[r];if(0===o.magnitude||0===l.magnitude)continue;let{force:d}=y(o,l);if(d<.1)continue;let c=l.position.clone().sub(o.position).normalize(),u=o.magnitude>0&&l.magnitude<0||o.magnitude<0&&l.magnitude>0,f=Math.min(.5*d,5);e.push((0,t.jsxs)("group",{children:[(0,t.jsx)(a.f,{points:[[o.position.x,o.position.y,o.position.z],[o.position.x+c.x*f*(u?1:-1),o.position.y+c.y*f*(u?1:-1),o.position.z+c.z*f*(u?1:-1)]],color:u?"#22c55e":"#ef4444",lineWidth:4}),(0,t.jsxs)("mesh",{position:new s.cE(o.position.x+c.x*f*(u?1:-1),o.position.y+c.y*f*(u?1:-1),o.position.z+c.z*f*(u?1:-1)),quaternion:new s.as().setFromUnitVectors(new s.cE(0,1,0),c.clone().multiplyScalar(u?1:-1)),children:[(0,t.jsx)("coneGeometry",{args:[.2,.5,8]}),(0,t.jsx)("meshStandardMaterial",{color:u?"#22c55e":"#ef4444",emissive:u?"#22c55e":"#ef4444",emissiveIntensity:.5})]})]},`force-${i}-${r}`))}return e},[n,u]),E=(0,i.useMemo)(()=>{if(!d)return[];let e=[];for(let i=-6;i<=6;i+=3)for(let n=-6;n<=6;n+=3){let r=x(new s.cE(i,n,0)),o=r.length();if(o>.1&&o<50){let s=r.clone().normalize(),l=Math.min(.3*o,1.5);e.push((0,t.jsx)("group",{position:[i,n,0],children:(0,t.jsx)(a.f,{points:[[0,0,0],[s.x*l,s.y*l,s.z*l]],color:"#06b6d4",lineWidth:1.5,opacity:.5,transparent:!0})},`grid-${i}-${n}`))}}return e},[n,d]);return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-15,0],receiveShadow:!0,children:[(0,t.jsx)("planeGeometry",{args:[60,60]}),(0,t.jsx)("meshStandardMaterial",{color:"#030312",roughness:.98})]}),(0,t.jsx)("gridHelper",{args:[60,30,"#1a1a3e","#0a0a1e"],position:[0,-14.99,0]}),n.map((e,i)=>{let n=e.magnitude>0,s=n?"#ef4444":"#3b82f6",r=Math.abs(e.magnitude);return(0,t.jsxs)("group",{position:[e.position.x,e.position.y,e.position.z],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[1.5+.1*r,32,32]}),(0,t.jsx)("meshBasicMaterial",{color:s,transparent:!0,opacity:.15})]}),(0,t.jsxs)("mesh",{castShadow:!0,children:[(0,t.jsx)("sphereGeometry",{args:[.6+.05*r,32,32]}),(0,t.jsx)("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:1.2,metalness:.4,roughness:.3})]}),(0,t.jsx)("group",{position:[0,0,.7],children:n?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("planeGeometry",{args:[.6,.15]}),(0,t.jsx)("meshBasicMaterial",{color:"#ffffff"})]}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("planeGeometry",{args:[.15,.6]}),(0,t.jsx)("meshBasicMaterial",{color:"#ffffff"})]})]}):(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("planeGeometry",{args:[.6,.15]}),(0,t.jsx)("meshBasicMaterial",{color:"#ffffff"})]})})}),(0,t.jsxs)("mesh",{position:[0,1.5,0],children:[(0,t.jsx)("planeGeometry",{args:[1.2,.4]}),(0,t.jsx)("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.9})]})]},e.id)}),b,w,S,E,f&&(0,t.jsxs)("group",{position:[f.x,f.y,f.z],children:[(0,t.jsxs)("mesh",{rotation:[Math.PI/2,0,0],children:[(0,t.jsx)("ringGeometry",{args:[.4,.5,32]}),(0,t.jsx)("meshBasicMaterial",{color:"#f59e0b",transparent:!0,opacity:.6})]}),d&&(0,t.jsx)(a.f,{points:[[0,0,0],[.3*m.fieldX,.3*m.fieldY,.3*m.fieldZ]],color:"#f59e0b",lineWidth:4})]}),Array.from({length:5}).map((e,i)=>{let n=5+4*i;return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{position:[n,-14.5,0],children:[(0,t.jsx)("boxGeometry",{args:[.1,.3,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#333366"})]}),i>0&&(0,t.jsxs)("mesh",{position:[-n,-14.5,0],children:[(0,t.jsx)("boxGeometry",{args:[.1,.3,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#333366"})]})]},i)})]})}e.i(81413);var l=e.i(48205),d=e.i(68647),c=e.i(82192),u=e.i(14228),f=e.i(4685);e.s(["default",0,function(){let e=(0,n.useRouter)(),[r,a]=(0,i.useState)(null),[p,h]=(0,i.useState)(!0),[m,g]=(0,i.useState)(!0),[x,v]=(0,i.useState)(1),[y,b]=(0,i.useState)(0),[w,S]=(0,i.useState)(!0),[E,j]=(0,i.useState)(!0),[C,M]=(0,i.useState)(!0),[_,A]=(0,i.useState)(!0),[z,L]=(0,i.useState)(new s.cE(0,5,0)),[U,P]=(0,i.useState)([{id:"1",position:new s.cE(-6,0,0),magnitude:8},{id:"2",position:new s.cE(6,0,0),magnitude:-8},{id:"3",position:new s.cE(0,6,0),magnitude:5}]),[B,N]=(0,i.useState)("1"),O=(0,i.useCallback)(()=>{let e=Date.now().toString(),t=Math.random()*Math.PI*2,i=4+4*Math.random();P(n=>[...n,{id:e,position:new s.cE(Math.cos(t)*i,Math.sin(t)*i,0),magnitude:5}]),N(e)},[]),D=(0,i.useCallback)(e=>{P(t=>{let i=t.filter(t=>t.id!==e);return B===e&&i.length>0&&N(i[0].id),i})},[B]),k=(0,i.useCallback)((e,t)=>{P(i=>i.map(i=>i.id===e?{...i,magnitude:t}:i))},[]),T=(0,i.useCallback)(e=>{P(t=>t.map(t=>t.id===e?{...t,magnitude:-t.magnitude}:t))},[]),R=(0,i.useCallback)((e,t,i)=>{P(n=>n.map(n=>n.id===e?{...n,position:new s.cE("x"===t?i:n.position.x,"y"===t?i:n.position.y,n.position.z)}:n))},[]),F=(0,i.useMemo)(()=>U.find(e=>e.id===B)||U[0],[U,B]);(0,i.useEffect)(()=>{if(!m)return;let e=setInterval(()=>{L(e=>{let t=3e-4*Date.now();return new s.cE(5*Math.cos(t),5*Math.sin(t),0)})},100);return()=>clearInterval(e)},[m]);let I=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(d.E,{title:"Charges",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("div",{className:"flex gap-1 flex-wrap",children:U.map((e,i)=>(0,t.jsxs)("button",{onClick:()=>N(e.id),className:`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${B===e.id?e.magnitude>=0?"bg-red-500 text-white":"bg-blue-500 text-white":e.magnitude>=0?"bg-red-100 text-red-700 hover:bg-red-200":"bg-blue-100 text-blue-700 hover:bg-blue-200"}`,children:["Q",i+1,": ",e.magnitude>0?"+":"",e.magnitude.toFixed(0),"µC"]},e.id))}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:O,disabled:U.length>=6,className:"flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium text-xs rounded-lg transition-all border border-green-300/50 disabled:opacity-50 disabled:cursor-not-allowed",children:"➕ Add Charge"}),(0,t.jsx)("button",{onClick:()=>D(B),disabled:U.length<=2,className:"flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium text-xs rounded-lg transition-all border border-red-300/50 disabled:opacity-50 disabled:cursor-not-allowed",children:"➖ Remove"})]})]}),F&&(0,t.jsxs)("div",{className:"mt-4 pt-4 border-t border-gray-200/50 space-y-3",children:[(0,t.jsxs)("div",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wide",children:["Edit Q",U.findIndex(e=>e.id===F.id)+1]}),(0,t.jsx)(d.p,{label:"Magnitude",value:Math.abs(F.magnitude),unit:"µC",min:1,max:15,step:1,color:F.magnitude>=0?"#ef4444":"#3b82f6",onChange:e=>k(F.id,F.magnitude>=0?e:-e),decimals:0}),(0,t.jsx)(d.p,{label:"Position X",value:F.position.x,unit:"m",min:-12,max:12,step:.5,color:"#8b5cf6",onChange:e=>R(F.id,"x",e),decimals:1}),(0,t.jsx)(d.p,{label:"Position Y",value:F.position.y,unit:"m",min:-12,max:12,step:.5,color:"#8b5cf6",onChange:e=>R(F.id,"y",e),decimals:1}),(0,t.jsx)("button",{onClick:()=>T(F.id),className:`w-full py-2 font-medium text-xs rounded-lg transition-all ${F.magnitude>=0?"bg-blue-100 hover:bg-blue-200 text-blue-700":"bg-red-100 hover:bg-red-200 text-red-700"}`,children:F.magnitude>=0?"🔄 Switch to Negative":"🔄 Switch to Positive"})]})]}),(0,t.jsxs)(d.E,{title:"Measurement Position",children:[(0,t.jsx)(d.p,{label:"Cursor X",value:z.x,unit:"m",min:-10,max:10,step:.5,color:"#f59e0b",onChange:e=>L(new s.cE(e,z.y,z.z)),decimals:1}),(0,t.jsx)(d.p,{label:"Cursor Y",value:z.y,unit:"m",min:-10,max:10,step:.5,color:"#f59e0b",onChange:e=>L(new s.cE(z.x,e,z.z)),decimals:1})]}),(0,t.jsx)(d.E,{title:"Display Options",children:[{label:"Electric Field Lines",checked:w,onChange:S,color:"text-yellow-500"},{label:"Field Vectors Grid",checked:E,onChange:j,color:"text-cyan-500"},{label:"Equipotential Surfaces",checked:C,onChange:M,color:"text-purple-500"},{label:"Force Vectors",checked:_,onChange:A,color:"text-green-500"}].map(e=>(0,t.jsxs)("label",{className:"flex items-center justify-between text-sm text-gray-700 cursor-pointer py-2 px-3 bg-gray-100/50 rounded-lg border border-gray-300/50 hover:bg-gray-200/50 transition-colors",children:[(0,t.jsx)("span",{className:e.color,children:e.label}),(0,t.jsx)("input",{type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.target.checked),className:"w-4 h-4 rounded accent-purple-500"})]},e.label))}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/electromagnetic/details"),className:"w-full py-2.5 bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 font-medium text-sm rounded-lg transition-all border border-purple-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),H=r?(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2",children:"Field at Measurement Point"}),(0,t.jsx)(d.Z,{data:{electricField:{value:r.electricField,unit:"N/C",color:"#f59e0b",decimals:2},potential:{value:r.potential,unit:"V",color:"#8b5cf6",decimals:2},fieldX:{value:r.fieldX,unit:"N/C",color:"#ef4444",decimals:2},fieldY:{value:r.fieldY,unit:"N/C",color:"#22c55e",decimals:2}},columns:2})]}),r.forcesBetweenCharges.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2",children:"Forces Between Charges"}),(0,t.jsx)("div",{className:"space-y-2",children:r.forcesBetweenCharges.map((e,i)=>(0,t.jsxs)("div",{className:"flex justify-between items-center bg-gray-50 rounded-lg p-2 text-sm",children:[(0,t.jsxs)("span",{className:"text-gray-600",children:[e.charge1," ↔ ",e.charge2]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsxs)("div",{className:"font-semibold",style:{color:"#ec4899"},children:["F = ",e.force.toFixed(3)," N"]}),(0,t.jsxs)("div",{className:"text-xs text-gray-500",children:["d = ",e.distance.toFixed(2)," m"]})]})]},i))})]})]}):(0,t.jsx)("div",{className:"text-center text-gray-500 text-sm py-8",children:"Waiting for simulation data..."});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.f,{title:"Electromagnetic Field",description:"Visualize electric fields, forces, and equipotential surfaces",cameraPosition:[0,0,45],backgroundColor:"#030312",controls:null,dataPanel:null,children:(0,t.jsx)(o,{onDataChange:a,charges:U,showFieldLines:w,showVectors:E,showEquipotential:C,showForceVectors:_,cursorPosition:z})}),(0,t.jsx)(u.f,{isPlaying:m,onPlayPause:()=>g(e=>!e),onReset:()=>{g(!0),v(1),b(0),L(new s.cE(0,5,0))},speed:x,onSpeedChange:v,timeElapsed:y}),(0,t.jsx)(c.f,{title:"⚡ Electric Field Controls",initialPosition:{x:20,y:80},children:I}),(0,t.jsx)(f.f,{isVisible:p,onToggle:()=>h(!p),children:H})]})}],69255)}]);