(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),a=e.i(48546),o=s,l=s;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,h=e.i(8560),p=e.i(31497);class m extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([h.O.common,h.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${p.f>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=p.f>=125?"uv1":"uv2",v=new o.$i,g=new o.cE,y=new o.cE,b=new o.$i,S=new o.$i,w=new o.$i,j=new o.cE,E=new o.nd,_=new o._i,A=new o.cE,M=new o.VQ,L=new o.L0,C=new o.$i;function z(e,t,n){return C.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),C.multiplyScalar(1/C.w),C.x=i/n.width,C.y=i/n.height,C.applyMatrix4(e.projectionMatrixInverse),C.multiplyScalar(1/C.w),Math.abs(Math.max(C.x,C.y))}class U extends o.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)g.fromBufferAttribute(t,e),y.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+g.distanceTo(y);let r=new o.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(r,1,1)),this}raycast(e,n){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),L.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*i;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(L.radius+=r,!1!==t.intersectsSphere(L)){if(null===u.boundingBox&&u.computeBoundingBox(),M.copy(u.boundingBox).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,M.distanceToPoint(t.origin));s=z(l,e,f.resolution)}M.expandByScalar(s),!1!==t.intersectsBox(M)&&(a?function(e,n){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){_.start.fromBufferAttribute(a,s),_.end.fromBufferAttribute(l,s),_.applyMatrix4(r);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(_.start,_.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[x]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),h=-n.near;t.at(1,w),w.w=1,w.applyMatrix4(n.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=a.x/2,w.y*=a.y/2,w.z=0,j.copy(w),E.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(d,n),S.fromBufferAttribute(u,n),b.w=1,S.w=1,b.applyMatrix4(E),S.applyMatrix4(E),b.z>h&&S.z>h)continue;if(b.z>h){let e=b.z-S.z,t=(b.z-h)/e;b.lerp(S,t)}else if(S.z>h){let e=S.z-b.z,t=(S.z-h)/e;S.lerp(b,t)}b.applyMatrix4(s),S.applyMatrix4(s),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=a.x/2,b.y*=a.y/2,S.x*=a.x/2,S.y*=a.y/2,_.start.copy(b),_.start.z=0,_.end.copy(S),_.end.z=0;let c=_.closestPointToPointParameter(j,!0);_.at(c,A);let f=o.rB.lerp(b.z,S.z,c),p=f>=-1&&f<=1,m=j.distanceTo(A)<.5*i;if(p&&m){_.start.fromBufferAttribute(d,n),_.end.fromBufferAttribute(u,n),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let i=new o.cE,s=new o.cE;t.distanceSqToSegment(_.start,_.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class O extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class P extends U{constructor(e=new O,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let N=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},h){var p,x;let v=(0,a.f)(e=>e.size),g=r.useMemo(()=>c?new U:new P,[c]),[y]=r.useState(()=>new m),b=(null==i||null==(p=i[0])?void 0:p.length)===4?4:3,S=r.useMemo(()=>{let n=c?new u:new O,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,c,i,b]);return r.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),r.useLayoutEffect(()=>{d?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[d,y]),r.useEffect(()=>()=>{S.dispose(),y.dispose()},[S]),r.createElement("primitive",(0,n.f)({object:g,ref:h},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:y,attach:"material",color:t,vertexColors:!!i,resolution:[v.width,v.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===b},f)))});e.s(["f",0,N],43216)},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:n,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...u},f)=>{let{size:h=24,strokeWidth:p=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:v=""}=(0,t.useContext)(s)??{},g=o??m?24*Number(a??p)/Number(n??h):a??p;return(0,t.createElement)("svg",{ref:f,...r,width:n??h??r.width,height:n??h??r.height,stroke:e??x,strokeWidth:g,className:i("lucide",v,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},39671,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989),r=e.i(94800),s=e.i(43216),a=e.i(90072);function o({onDataChange:e,sourceFrequency:n=2,sourceVelocity:l=5,sourceDirection:c=0,autoOscillate:d=!0,observerPosition:u=15,waveSpeed:f=10,showWavefronts:h=!0,resetTrigger:p}){let m=(0,i.useRef)(0),x=(0,i.useRef)(0),v=(0,i.useRef)(0),g=(0,i.useRef)(0),y=(0,i.useRef)([]),[b,S]=(0,i.useState)({sourceFrequency:n,observedFrequency:n,dopplerShiftRatio:1,machNumber:0,waveSpeed:f,shiftType:"none"});return(0,i.useEffect)(()=>{void 0!==p&&(m.current=0,x.current=0,v.current=0,g.current=0,y.current=[])},[p]),(0,r.f)((t,i)=>{m.current+=i,x.current++,d?(v.current=10*Math.sin(.5*m.current),g.current=10*Math.cos(.5*m.current)*.5):(g.current=c*l,v.current+=g.current*i,v.current>18&&(v.current=18),v.current<-18&&(v.current=-18));let r=1/n,s=y.current[y.current.length-1];if((!s||m.current-s.emissionTime>=r)&&(y.current.push({emissionX:v.current,emissionTime:m.current}),y.current.length>25&&y.current.shift()),x.current%8==0){let t,i,r=v.current,s=g.current,a=u-r>0?s:-s;.1>Math.abs(s)?(t=n,i="none"):a>0?(t=f/(f-a)*n,i="blueshift"):(t=f/(f+Math.abs(a))*n,i="redshift");let o=t/n,l={sourceFrequency:n,observedFrequency:Math.max(0,t),dopplerShiftRatio:o,machNumber:Math.abs(s)/f,waveSpeed:f,shiftType:i};S(l),e?.(l)}}),(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-2,0],receiveShadow:!0,children:[(0,t.jsx)("planeGeometry",{args:[80,50]}),(0,t.jsx)("meshStandardMaterial",{color:"#050510",roughness:.98})]}),(0,t.jsx)("gridHelper",{args:[80,80,"#1a1a3e","#0a0a1e"],position:[0,-1.99,0]}),(0,t.jsxs)("group",{position:[u,0,0],children:[(0,t.jsxs)("mesh",{position:[0,-1,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.8,1,.5,32]}),(0,t.jsx)("meshStandardMaterial",{color:"#4a5568",metalness:.5,roughness:.5})]}),(0,t.jsxs)("mesh",{position:[0,.3,0],children:[(0,t.jsx)("sphereGeometry",{args:[.6,32,32]}),(0,t.jsx)("meshStandardMaterial",{color:"#8b5cf6",emissive:"#8b5cf6",emissiveIntensity:.6,metalness:.3,roughness:.4})]}),(0,t.jsxs)("mesh",{position:[.4,.4,0],children:[(0,t.jsx)("sphereGeometry",{args:[.2,16,16]}),(0,t.jsx)("meshBasicMaterial",{color:"#c4b5fd"})]}),(0,t.jsxs)("mesh",{position:[0,.3,0],children:[(0,t.jsx)("sphereGeometry",{args:[.9,32,32]}),(0,t.jsx)("meshBasicMaterial",{color:"#8b5cf6",transparent:!0,opacity:.15})]}),(0,t.jsxs)("mesh",{position:[0,1.5,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.05,.05,1.2,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#666"})]}),(0,t.jsxs)("mesh",{position:[0,2.2,0],rotation:[0,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.25,16,16]}),(0,t.jsx)("meshBasicMaterial",{color:"#8b5cf6"})]})]}),(0,t.jsxs)("group",{position:[v.current,0,0],children:[(0,t.jsxs)("mesh",{castShadow:!0,children:[(0,t.jsx)("sphereGeometry",{args:[1,32,32]}),(0,t.jsx)("meshStandardMaterial",{color:"#f59e0b",emissive:"#f59e0b",emissiveIntensity:.8,metalness:.4,roughness:.3})]}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[1.3,32,32]}),(0,t.jsx)("meshBasicMaterial",{color:"#f59e0b",transparent:!0,opacity:.2})]}),Math.abs(g.current)>.1&&(0,t.jsx)("group",{rotation:[0,0,g.current>0?-Math.PI/2:Math.PI/2],children:(0,t.jsxs)("mesh",{position:[1.8,0,0],children:[(0,t.jsx)("coneGeometry",{args:[.4,.8,8]}),(0,t.jsx)("meshBasicMaterial",{color:"#f59e0b"})]})})]}),h&&(0,t.jsx)("group",{children:y.current.map((e,i)=>{let n=m.current-e.emissionTime,r=n*f;if(r>35||r<.1)return null;let s=Math.max(0,.7-n/6),o=(e=>{let t=v.current,i=g.current;if(.1>Math.abs(i))return"#22c55e";let n=e-t;return(i>0?n<0:n>0)?"#ef4444":"#3b82f6"})(e.emissionX);return(0,t.jsx)("group",{position:[e.emissionX,0,0],children:(0,t.jsxs)("mesh",{rotation:[Math.PI/2,0,0],children:[(0,t.jsx)("ringGeometry",{args:[r-.1,r+.1,64]}),(0,t.jsx)("meshBasicMaterial",{color:o,transparent:!0,opacity:s,side:a.Vs})]})},i)})}),(0,t.jsx)(s.f,{points:[[-35,0,0],[35,0,0]],color:"#333355",lineWidth:2,opacity:.6,transparent:!0}),(0,t.jsx)(s.f,{points:[[-25,-1.95,5],[-20,-1.95,5]],color:"#4a5568",lineWidth:3,dashed:!0,dashSize:.5,gapSize:.3}),(0,t.jsxs)("mesh",{position:[-26,-1.9,5],rotation:[0,0,Math.PI],children:[(0,t.jsx)("coneGeometry",{args:[.3,.6,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#4a5568"})]}),(0,t.jsxs)("mesh",{position:[-19,-1.9,5],rotation:[0,0,0],children:[(0,t.jsx)("coneGeometry",{args:[.3,.6,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#4a5568"})]}),b.machNumber>=1&&(0,t.jsx)("group",{position:[v.current,0,0],children:(0,t.jsxs)("mesh",{rotation:[0,g.current>0?0:Math.PI,0],children:[(0,t.jsx)("coneGeometry",{args:[20,40,2]}),(0,t.jsx)("meshBasicMaterial",{color:"#ff00ff",transparent:!0,opacity:.08,side:a.Vs})]})})]})}e.i(81413);var l=e.i(48205),c=e.i(68647),d=e.i(82192),u=e.i(14228),f=e.i(4685);e.s(["default",0,function(){let e=(0,n.useRouter)(),[r,s]=(0,i.useState)(null),[a,h]=(0,i.useState)(!0),[p,m]=(0,i.useState)(!0),[x,v]=(0,i.useState)(1),[g,y]=(0,i.useState)(0),[b,S]=(0,i.useState)(0),[w,j]=(0,i.useState)(2),[E,_]=(0,i.useState)(5),[A,M]=(0,i.useState)(10),[L,C]=(0,i.useState)(!0),[z,U]=(0,i.useState)(!0),[O,P]=(0,i.useState)(0),[N,B]=(0,i.useState)(15),R=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(c.E,{title:"Wave Parameters",children:[(0,t.jsx)(c.p,{label:"Source Frequency (f₀)",value:w,unit:"Hz",min:.5,max:5,step:.1,color:"#f59e0b",onChange:j,decimals:1}),(0,t.jsx)(c.p,{label:"Source Speed (vₛ)",value:E,unit:"m/s",min:0,max:15,step:.5,color:"#3b82f6",onChange:_,decimals:1}),(0,t.jsx)(c.p,{label:"Wave Speed (v)",value:A,unit:"m/s",min:5,max:20,step:1,color:"#22c55e",onChange:M,decimals:0})]}),(0,t.jsxs)(c.E,{title:"Source Motion",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-700",children:"Mode"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>U(!0),className:`px-3 py-1 text-xs font-medium rounded transition-all ${z?"bg-orange-500 text-white":"bg-gray-200 text-gray-600 hover:bg-gray-300"}`,children:"Auto"}),(0,t.jsx)("button",{onClick:()=>U(!1),className:`px-3 py-1 text-xs font-medium rounded transition-all ${!z?"bg-orange-500 text-white":"bg-gray-200 text-gray-600 hover:bg-gray-300"}`,children:"Manual"})]})]}),!z&&(0,t.jsxs)("div",{className:"mb-3 p-3 bg-gray-100/50 rounded-lg border border-gray-300/50",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:"text-xs text-gray-600",children:"Direction"}),(0,t.jsx)("span",{className:"text-xs font-mono text-gray-800",children:O>.1?"→ Right":O<-.1?"← Left":"● Stop"})]}),(0,t.jsx)(c.p,{label:"",value:O,unit:"",min:-1,max:1,step:.1,color:"#f59e0b",onChange:P,decimals:1})]}),(0,t.jsx)(c.p,{label:"Observer Position",value:N,unit:"m",min:-20,max:20,step:1,color:"#8b5cf6",onChange:B,decimals:0})]}),(0,t.jsx)(c.E,{title:"Display Options",children:(0,t.jsxs)("label",{className:"flex items-center justify-between text-sm text-gray-700 cursor-pointer py-2 px-3 bg-gray-100/50 rounded-lg border border-gray-300/50",children:[(0,t.jsx)("span",{children:"Show Wavefronts"}),(0,t.jsx)("input",{type:"checkbox",checked:L,onChange:e=>C(e.target.checked),className:"w-4 h-4 rounded accent-orange-500"})]})}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/doppler/details"),className:"w-full py-2.5 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-orange-700 font-medium text-sm rounded-lg transition-all border border-orange-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),D=r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Z,{data:{sourceFrequency:{value:r.sourceFrequency,unit:"Hz",color:"#f59e0b",decimals:1},observedFrequency:{value:r.observedFrequency,unit:"Hz",color:"blueshift"===r.shiftType?"#3b82f6":"redshift"===r.shiftType?"#ef4444":"#22c55e",decimals:1},dopplerShiftRatio:{value:r.dopplerShiftRatio,unit:"×",color:"#ec4899",decimals:2},machNumber:{value:r.machNumber,unit:"",color:"#a855f7",decimals:2},waveSpeed:{value:r.waveSpeed,unit:"m/s",color:"#22c55e",decimals:0}},columns:1}),(0,t.jsxs)("div",{className:"mt-3 p-3 bg-gray-800/50 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-gray-400 text-sm",children:"Shift Type:"}),(0,t.jsx)("span",{className:`font-bold ${"blueshift"===r.shiftType?"text-blue-400":"redshift"===r.shiftType?"text-red-400":"text-green-400"}`,children:"blueshift"===r.shiftType?"🔵 Blueshift (Approaching)":"redshift"===r.shiftType?"🔴 Redshift (Receding)":"🟢 None (Stationary)"})]}),r.machNumber>=1&&(0,t.jsxs)("div",{className:"mt-2 text-xs text-purple-400 font-medium",children:["⚠️ SUPERSONIC! Mach ",r.machNumber.toFixed(2)]}),1!==r.dopplerShiftRatio&&(0,t.jsx)("div",{className:"mt-2 text-xs text-gray-400",children:r.dopplerShiftRatio>1?`Frequency increased by ${((r.dopplerShiftRatio-1)*100).toFixed(0)}%`:`Frequency decreased by ${((1-r.dopplerShiftRatio)*100).toFixed(0)}%`})]})]}):(0,t.jsx)("div",{className:"text-center text-gray-500 text-sm py-8",children:"Waiting for simulation data..."});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.f,{title:"Doppler Effect",description:"Observe frequency shift from moving sound sources",cameraPosition:[0,30,40],backgroundColor:"#050510",controls:null,dataPanel:null,children:(0,t.jsx)(o,{onDataChange:s,sourceFrequency:w,sourceVelocity:E,waveSpeed:A,autoOscillate:z,sourceDirection:O,observerPosition:N,showWavefronts:L,resetTrigger:g})}),(0,t.jsx)(u.f,{isPlaying:p,onPlayPause:()=>m(e=>!e),onReset:()=>{y(e=>e+1),m(!0),v(1),S(0)},speed:x,onSpeedChange:v,timeElapsed:b}),(0,t.jsx)(d.f,{title:"⚙️ Doppler Parameters",initialPosition:{x:20,y:80},children:R}),(0,t.jsx)(f.f,{isVisible:a,onToggle:()=>h(!a),children:D})]})}],39671)}]);