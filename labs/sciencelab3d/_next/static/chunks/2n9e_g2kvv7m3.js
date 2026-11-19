(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),a=e.i(48546),o=s,l=s;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,p=e.i(8560),h=e.i(31497);class m extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=h.f>=125?"uv1":"uv2",v=new o.$i,g=new o.cE,y=new o.cE,S=new o.$i,w=new o.$i,b=new o.$i,E=new o.cE,j=new o.nd,A=new o._i,_=new o.cE,M=new o.VQ,L=new o.L0,C=new o.$i;function z(e,t,n){return C.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),C.multiplyScalar(1/C.w),C.x=i/n.width,C.y=i/n.height,C.applyMatrix4(e.projectionMatrixInverse),C.multiplyScalar(1/C.w),Math.abs(Math.max(C.x,C.y))}class U extends o.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)g.fromBufferAttribute(t,e),y.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+g.distanceTo(y);let r=new o.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(r,1,1)),this}raycast(e,n){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),L.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*i;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(L.radius+=r,!1!==t.intersectsSphere(L)){if(null===u.boundingBox&&u.computeBoundingBox(),M.copy(u.boundingBox).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,M.distanceToPoint(t.origin));s=z(l,e,f.resolution)}M.expandByScalar(s),!1!==t.intersectsBox(M)&&(a?function(e,n){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){A.start.fromBufferAttribute(a,s),A.end.fromBufferAttribute(l,s),A.applyMatrix4(r);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(A.start,A.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[x]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),p=-n.near;t.at(1,b),b.w=1,b.applyMatrix4(n.matrixWorldInverse),b.applyMatrix4(s),b.multiplyScalar(1/b.w),b.x*=a.x/2,b.y*=a.y/2,b.z=0,E.copy(b),j.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(S.fromBufferAttribute(d,n),w.fromBufferAttribute(u,n),S.w=1,w.w=1,S.applyMatrix4(j),w.applyMatrix4(j),S.z>p&&w.z>p)continue;if(S.z>p){let e=S.z-w.z,t=(S.z-p)/e;S.lerp(w,t)}else if(w.z>p){let e=w.z-S.z,t=(w.z-p)/e;w.lerp(S,t)}S.applyMatrix4(s),w.applyMatrix4(s),S.multiplyScalar(1/S.w),w.multiplyScalar(1/w.w),S.x*=a.x/2,S.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,A.start.copy(S),A.start.z=0,A.end.copy(w),A.end.z=0;let c=A.closestPointToPointParameter(E,!0);A.at(c,_);let f=o.rB.lerp(S.z,w.z,c),h=f>=-1&&f<=1,m=E.distanceTo(_)<.5*i;if(h&&m){A.start.fromBufferAttribute(d,n),A.end.fromBufferAttribute(u,n),A.start.applyMatrix4(l),A.end.applyMatrix4(l);let i=new o.cE,s=new o.cE;t.distanceSqToSegment(A.start,A.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class O extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class P extends U{constructor(e=new O,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let B=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},p){var h,x;let v=(0,a.f)(e=>e.size),g=r.useMemo(()=>c?new U:new P,[c]),[y]=r.useState(()=>new m),S=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,w=r.useMemo(()=>{let n=c?new u:new O,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),S)}return n},[e,c,i,S]);return r.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),r.useLayoutEffect(()=>{d?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[d,y]),r.useEffect(()=>()=>{w.dispose(),y.dispose()},[w]),r.createElement("primitive",(0,n.f)({object:g,ref:p},f),r.createElement("primitive",{object:w,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:y,attach:"material",color:t,vertexColors:!!i,resolution:[v.width,v.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===S},f)))});e.s(["f",0,B],43216)},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:n,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...u},f)=>{let{size:p=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:v=""}=(0,t.useContext)(s)??{},g=o??m?24*Number(a??h)/Number(n??p):a??h;return(0,t.createElement)("svg",{ref:f,...r,width:n??p??r.width,height:n??p??r.height,stroke:e??x,strokeWidth:g,className:i("lucide",v,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},46843,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989),r=e.i(94800),s=e.i(43216),a=e.i(90072);function o({onDataChange:e,wavelength:n=500,slitSeparation:l=2,slitWidth:c=.3,particleRate:d=2,showParticles:u=!0,showWaveView:f=!1,isPlaying:p=!0,simulationSpeed:h=1,resetTrigger:m}){let x=(0,i.useRef)([]),v=(0,i.useRef)(Array(300).fill(0)),g=(0,i.useRef)(1),y=(0,i.useRef)(0),S=(0,i.useRef)(0),w=(0,i.useRef)(0),b=(0,i.useMemo)(()=>new a.cE(-12,0,0),[]),[E,j]=(0,i.useState)(new Float32Array(1500)),[A,_]=(0,i.useState)(new Float32Array(300)),M=e=>{let t=n/1e4,i=e/12,r=Math.cos(Math.PI*l*i/t)**2,s=Math.PI*c*i/t,a=1;return Math.abs(s)>1e-4&&(a=(Math.sin(s)/s)**2),r*a};(0,i.useEffect)(()=>{let t={fringeSpacing:n/1e4*12/l*1e3,particleCount:w.current,wavelength:n,slitSeparation:l,slitWidth:c};e?.(t)},[n,l,c,e,A]),(0,i.useEffect)(()=>{void 0!==m&&(x.current=[],v.current=Array(300).fill(0),g.current=1,y.current=0,S.current=0,w.current=0,j(new Float32Array(1500)),_(new Float32Array(300)))},[m]),(0,r.f)((e,t)=>{if(!p)return;let i=Math.min(t,.033)*h;if(y.current+=i,y.current-S.current>1/d){let e=(()=>{for(let e=0;e<200;e++){let e=(Math.random()-.5)*48;if(Math.random()<M(e))return e}return(Math.random()-.5)*16})(),t=(12-b.x)/10,i={position:b.clone(),targetY:e,velocity:new a.cE(10,e/t,0),active:!0,phase:"source",progress:0};x.current.push(i),S.current=y.current}let n=new Float32Array(1500),r=0;for(let e=x.current.length-1;e>=0;e--){let t=x.current[e];if(t.active){if(t.position.add(t.velocity.clone().multiplyScalar(i)),t.progress=(t.position.x-b.x)/(12-b.x),"source"===t.phase&&t.position.x>=0){let e=l/2,i=-l/2,n=t.position.y,r=Math.abs(n-e)<c/2,s=Math.abs(n-i)<c/2;r||s?(t.phase="travelling",t.velocity.y+=(Math.random()-.5)*.3,t.velocity.normalize().multiplyScalar(10)):t.active=!1}if(t.position.x>=12){t.phase="screen";let e=Math.floor((t.position.y+8)/16*300);e>=0&&e<300&&(v.current[e]++,w.current++,v.current[e]>g.current&&(g.current=v.current[e])),t.active=!1}t.active&&r<500&&(n[3*r]=t.position.x,n[3*r+1]=t.position.y,n[3*r+2]=t.position.z,r++),t.active||x.current.splice(e,1)}}j(n);let s=new Float32Array(300);for(let e=0;e<300;e++)g.current>0&&(s[e]=v.current[e]/g.current);_(s)});let L=(0,i.useMemo)(()=>{let e=[];for(let t=0;t<=200;t++){let i=t/200*22.4-11.2,n=M(i);e.push([13+5*n,i,0])}return e},[n,l,c,16]),C=(0,i.useMemo)(()=>{let e=[],t=16/300;for(let i=0;i<300;i++){let n=v.current[i];if(n>0){let r=Math.min(n/g.current,1),s=i/300*16-8;e.push({y:s,height:.95*t,opacity:r})}}return e},[A]),z=(0,i.useMemo)(()=>{let e=540-.6*n;return`hsl(${e}, 100%, 50%)`},[n]);return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-8,0],receiveShadow:!0,children:[(0,t.jsx)("planeGeometry",{args:[35,25]}),(0,t.jsx)("meshStandardMaterial",{color:"#050510",roughness:.95,metalness:.1})]}),(0,t.jsx)("gridHelper",{args:[35,35,"#1a1a3e","#0a0a1e"],position:[0,-7.99,0]}),(0,t.jsxs)("group",{position:b,children:[(0,t.jsxs)("mesh",{castShadow:!0,children:[(0,t.jsx)("cylinderGeometry",{args:[.6,.8,1.5,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#333",metalness:.8,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[.5,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.3,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:z,emissive:z,emissiveIntensity:3})]}),(0,t.jsx)("pointLight",{color:z,intensity:3,distance:8}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.5,16,16]}),(0,t.jsx)("meshBasicMaterial",{color:z,transparent:!0,opacity:.3})]})]}),(0,t.jsxs)("group",{position:[0,0,0],children:[(0,t.jsxs)("mesh",{position:[0,l/2+c/2+3.5,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,7,2.5]}),(0,t.jsx)("meshStandardMaterial",{color:"#2a2a3e",metalness:.7,roughness:.3})]}),(0,t.jsxs)("mesh",{position:[0,0,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,l-c,2.5]}),(0,t.jsx)("meshStandardMaterial",{color:"#2a2a3e",metalness:.7,roughness:.3})]}),(0,t.jsxs)("mesh",{position:[0,-l/2-c/2-3.5,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,7,2.5]}),(0,t.jsx)("meshStandardMaterial",{color:"#2a2a3e",metalness:.7,roughness:.3})]}),(0,t.jsxs)("mesh",{position:[.15,l/2,0],children:[(0,t.jsx)("boxGeometry",{args:[.05,c,2.6]}),(0,t.jsx)("meshBasicMaterial",{color:z,transparent:!0,opacity:.6})]}),(0,t.jsxs)("mesh",{position:[.15,-l/2,0],children:[(0,t.jsx)("boxGeometry",{args:[.05,c,2.6]}),(0,t.jsx)("meshBasicMaterial",{color:z,transparent:!0,opacity:.6})]})]}),(0,t.jsxs)("group",{position:[12,0,0],children:[(0,t.jsxs)("mesh",{receiveShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,16,.8]}),(0,t.jsx)("meshStandardMaterial",{color:"#1a1a2e",metalness:.5,roughness:.5})]}),(0,t.jsxs)("mesh",{position:[0,8.4,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.5,.6,1]}),(0,t.jsx)("meshStandardMaterial",{color:"#444",metalness:.8,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[0,-8.4,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.5,.6,1]}),(0,t.jsx)("meshStandardMaterial",{color:"#444",metalness:.8,roughness:.2})]}),C.map((e,i)=>(0,t.jsxs)("mesh",{position:[.2,e.y,.15],children:[(0,t.jsx)("boxGeometry",{args:[.08,e.height,.08]}),(0,t.jsx)("meshBasicMaterial",{color:z,transparent:!0,opacity:.9*e.opacity})]},i))]}),u&&(0,t.jsx)("points",{geometry:new a.ld().setAttribute("position",new a.f5(E,3)),children:(0,t.jsx)("pointsMaterial",{size:.12,color:z,transparent:!0,opacity:.95,sizeAttenuation:!0,depthWrite:!1,blending:a.tq})}),f&&(0,t.jsxs)("group",{position:[0,0,-.8],children:[(0,t.jsx)(s.f,{points:L,color:z,lineWidth:3,opacity:.9}),(0,t.jsx)(s.f,{points:[[13,-11.2,0],[13,11.2,0]],color:"#444",lineWidth:1,opacity:.5}),[-8,-4,0,4,8].map((e,i)=>(0,t.jsx)(s.f,{points:[[12.8,e,0],[13.2,e,0]],color:"#666",lineWidth:1,opacity:.3},i))]}),(0,t.jsx)("group",{position:[b.x,2.5,0],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("planeGeometry",{args:[4,.6]}),(0,t.jsx)("meshBasicMaterial",{color:"#1a1a3e",transparent:!0,opacity:.8})]})}),(0,t.jsx)("group",{position:[0,-7.95,2],children:[void 0,void 0,void 0,void 0,void 0].map((e,i)=>(0,t.jsx)("group",{position:[-10+5*i,0,0],children:(0,t.jsxs)("mesh",{children:[(0,t.jsx)("boxGeometry",{args:[.08,.08,.4]}),(0,t.jsx)("meshStandardMaterial",{color:"#555"})]})},i))})]})}e.i(81413);var l=e.i(48205),c=e.i(68647),d=e.i(82192),u=e.i(14228),f=e.i(4685);e.s(["default",0,function(){let e=(0,n.useRouter)(),[r,s]=(0,i.useState)(null),[a,p]=(0,i.useState)(!0),[h,m]=(0,i.useState)(!0),[x,v]=(0,i.useState)(1),[g,y]=(0,i.useState)(0),[S,w]=(0,i.useState)(500),[b,E]=(0,i.useState)(2),[j,A]=(0,i.useState)(.3),[_,M]=(0,i.useState)(3),[L,C]=(0,i.useState)(!0),[z,U]=(0,i.useState)(!1),O=`hsl(${540-.6*S}, 100%, 50%)`,P=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(c.E,{title:"Quantum Parameters",children:[(0,t.jsx)(c.p,{label:"Wavelength (λ)",value:S,unit:"nm",min:380,max:700,step:10,color:O,onChange:w,decimals:0}),(0,t.jsx)(c.p,{label:"Slit Separation (d)",value:b,unit:"mm",min:.5,max:5,step:.1,color:"#ec4899",onChange:E,decimals:1}),(0,t.jsx)(c.p,{label:"Slit Width (a)",value:j,unit:"mm",min:.1,max:1,step:.05,color:"#22c55e",onChange:A,decimals:2}),(0,t.jsx)(c.p,{label:"Fire Rate",value:_,unit:"/s",min:1,max:10,step:1,color:"#8b5cf6",onChange:M,decimals:0})]}),(0,t.jsx)(c.E,{title:"Display Options",children:[{label:"Show Particles",checked:L,onChange:C},{label:"Theory Curve",checked:z,onChange:U}].map(e=>(0,t.jsxs)("label",{className:"flex items-center justify-between text-sm text-gray-700 cursor-pointer py-2 px-3 bg-gray-100/50 rounded-lg border border-gray-300/50",children:[(0,t.jsx)("span",{children:e.label}),(0,t.jsx)("input",{type:"checkbox",checked:e.checked,onChange:t=>e.onChange(t.target.checked),className:"w-4 h-4 rounded accent-purple-500"})]},e.label))}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/double-slit/details"),className:"w-full py-2.5 bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 font-medium text-sm rounded-lg transition-all border border-purple-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),B=r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Z,{data:{wavelength:{value:r.wavelength,unit:"nm",color:O,decimals:0},fringeSpacing:{value:r.fringeSpacing,unit:"mm",color:"#a855f7",decimals:3},slitSeparation:{value:r.slitSeparation,unit:"mm",color:"#ec4899",decimals:2},particleCount:{value:r.particleCount,unit:"",color:"#22c55e",decimals:0}},columns:2}),(0,t.jsxs)("div",{className:"mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700",children:[(0,t.jsxs)("p",{className:"text-xs text-gray-400 leading-relaxed",children:[(0,t.jsx)("strong",{className:"text-purple-400",children:"Wave-Particle Duality:"})," Individual particles hit randomly but accumulate to form an interference pattern."]}),(0,t.jsx)("p",{className:"text-xs text-gray-500 mt-2 font-mono",children:"I(y) = cos²(π·d·y/λ·L) · sinc²(π·a·y/λ·L)"})]})]}):(0,t.jsx)("div",{className:"text-center text-gray-500 text-sm py-8",children:"Starting simulation..."});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.f,{title:"Double-Slit Experiment",description:"Quantum mechanics: particles build up wave interference patterns",cameraPosition:[25,15,25],backgroundColor:"#050510",controls:null,dataPanel:null,children:(0,t.jsx)(o,{onDataChange:s,wavelength:S,slitSeparation:b,slitWidth:j,particleRate:_,showParticles:L,showWaveView:z,isPlaying:h,simulationSpeed:x,resetTrigger:g})}),(0,t.jsx)(u.f,{isPlaying:h,onPlayPause:()=>m(e=>!e),onReset:()=>{y(e=>e+1),m(!0),v(1)},speed:x,onSpeedChange:v}),(0,t.jsx)(d.f,{title:"⚛️ Quantum Parameters",initialPosition:{x:20,y:80},children:P}),(0,t.jsx)(f.f,{isVisible:a,onToggle:()=>p(!a),children:B})]})}],46843)}]);