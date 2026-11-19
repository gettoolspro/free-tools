(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),o=e.i(48546),a=s,l=s;let d=new l.VQ,c=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),d.setFromBufferAttribute(t),this.boundingBox.union(d))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)c.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(c)),c.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,p=e.i(8560),h=e.i(31497);class m extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h.f>=125?"uv1":"uv2",g=new a.$i,y=new a.cE,x=new a.cE,w=new a.$i,S=new a.$i,b=new a.$i,E=new a.cE,M=new a.nd,_=new a._i,A=new a.cE,C=new a.VQ,L=new a.L0,U=new a.$i;function z(e,t,n){return U.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),U.multiplyScalar(1/U.w),U.x=i/n.width,U.y=i/n.height,U.applyMatrix4(e.projectionMatrixInverse),U.multiplyScalar(1/U.w),Math.abs(Math.max(U.x,U.y))}class j extends a.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)y.fromBufferAttribute(t,e),x.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+y.distanceTo(x);let r=new a.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new a.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new a.Zq(r,1,1)),this}raycast(e,n){let r,s,o=this.material.worldUnits,l=e.camera;null!==l||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let d=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+d,null===u.boundingSphere&&u.computeBoundingSphere(),L.copy(u.boundingSphere).applyMatrix4(c),o)r=.5*i;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(L.radius+=r,!1!==t.intersectsSphere(L)){if(null===u.boundingBox&&u.computeBoundingBox(),C.copy(u.boundingBox).applyMatrix4(c),o)s=.5*i;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));s=z(l,e,f.resolution)}C.expandByScalar(s),!1!==t.intersectsBox(C)&&(o?function(e,n){let r=e.matrixWorld,s=e.geometry,o=s.attributes.instanceStart,l=s.attributes.instanceEnd,d=Math.min(s.instanceCount,o.count);for(let s=0;s<d;s++){_.start.fromBufferAttribute(o,s),_.end.fromBufferAttribute(l,s),_.applyMatrix4(r);let d=new a.cE,c=new a.cE;t.distanceSqToSegment(_.start,_.end,c,d),c.distanceTo(d)<.5*i&&n.push({point:c,pointOnLine:d,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:s,uv:null,[v]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,o=e.material.resolution,l=e.matrixWorld,d=e.geometry,c=d.attributes.instanceStart,u=d.attributes.instanceEnd,f=Math.min(d.instanceCount,c.count),p=-n.near;t.at(1,b),b.w=1,b.applyMatrix4(n.matrixWorldInverse),b.applyMatrix4(s),b.multiplyScalar(1/b.w),b.x*=o.x/2,b.y*=o.y/2,b.z=0,E.copy(b),M.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(w.fromBufferAttribute(c,n),S.fromBufferAttribute(u,n),w.w=1,S.w=1,w.applyMatrix4(M),S.applyMatrix4(M),w.z>p&&S.z>p)continue;if(w.z>p){let e=w.z-S.z,t=(w.z-p)/e;w.lerp(S,t)}else if(S.z>p){let e=S.z-w.z,t=(S.z-p)/e;S.lerp(w,t)}w.applyMatrix4(s),S.applyMatrix4(s),w.multiplyScalar(1/w.w),S.multiplyScalar(1/S.w),w.x*=o.x/2,w.y*=o.y/2,S.x*=o.x/2,S.y*=o.y/2,_.start.copy(w),_.start.z=0,_.end.copy(S),_.end.z=0;let d=_.closestPointToPointParameter(E,!0);_.at(d,A);let f=a.rB.lerp(w.z,S.z,d),h=f>=-1&&f<=1,m=E.distanceTo(A)<.5*i;if(h&&m){_.start.fromBufferAttribute(c,n),_.end.fromBufferAttribute(u,n),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let i=new a.cE,s=new a.cE;t.distanceSqToSegment(_.start,_.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[v]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class O extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class P extends j{constructor(e=new O,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let B=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:a,lineWidth:l,segments:d,dashed:c,...f},p){var h,v;let g=(0,o.f)(e=>e.size),y=r.useMemo(()=>d?new j:new P,[d]),[x]=r.useState(()=>new m),w=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,S=r.useMemo(()=>{let n=d?new u:new O,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),w)}return n},[e,d,i,w]);return r.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),r.useLayoutEffect(()=>{c?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[c,x]),r.useEffect(()=>()=>{S.dispose(),x.dispose()},[S]),r.createElement("primitive",(0,n.f)({object:y,ref:p},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:x,attach:"material",color:t,vertexColors:!!i,resolution:[g.width,g.height],linewidth:null!=(v=null!=a?a:l)?v:1,dashed:c,transparent:4===w},f)))});e.s(["f",0,B],43216)},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),o=(0,t.forwardRef)(({color:e,size:n,strokeWidth:o,absoluteStrokeWidth:a,className:l="",children:d,iconNode:c,...u},f)=>{let{size:p=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:v="currentColor",className:g=""}=(0,t.useContext)(s)??{},y=a??m?24*Number(o??h)/Number(n??p):o??h;return(0,t.createElement)("svg",{ref:f,...r,width:n??p??r.width,height:n??p??r.height,stroke:e??v,strokeWidth:y,className:i("lucide",g,l),...!d&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(d)?d:[d]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...a},l)=>(0,t.createElement)(o,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...a}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},4125,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989),r=e.i(94800),s=e.i(43216),o=e.i(90072);function a({surfaceType:e,resolution:n,rotationSpeed:l,isPlaying:d,onDataChange:c}){let u=(0,i.useRef)(null),f=(0,i.useRef)({frameCount:0,time:0}),[,p]=(0,i.useState)({}),h=(0,i.useMemo)(()=>({mobius:{genus:1,eulerCharacteristic:0,boundaryComponents:1},klein:{genus:2,eulerCharacteristic:0,boundaryComponents:0},torus:{genus:1,eulerCharacteristic:0,boundaryComponents:0}})[e],[e]),m=(0,i.useCallback)(()=>{c?.({surfaceType:e,genus:h.genus,eulerCharacteristic:h.eulerCharacteristic,boundaryComponents:h.boundaryComponents}),p({})},[e,h,c]);(0,r.f)((e,t)=>{if(!d)return;let i=f.current;i.time+=t,i.frameCount++,u.current&&(u.current.rotation.y+=t*l*.3,u.current.rotation.x=.2*Math.sin(.2*i.time)),i.frameCount%8==0&&m()});let v=(0,i.useMemo)(()=>{let t;if("mobius"===e){let e=[],i=[],r=Math.max(8,Math.floor(n/2));for(let t=0;t<=n;t++){let i=t/n*Math.PI*2;for(let t=0;t<=r;t++){let n=t/r*2-1,s=2.5+.8*n*Math.cos(i/2),o=s*Math.cos(i),a=s*Math.sin(i),l=.8*n*Math.sin(i/2);e.push(o,a,l)}}for(let e=0;e<n;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t,s=n+r+1;i.push(n,s,n+1),i.push(s,s+1,n+1)}(t=new o.ld).setAttribute("position",new o.ki(e,3)),t.setIndex(i),t.computeVertexNormals()}else if("torus"===e){let e=2*n,i=[],r=[];for(let t=0;t<=e;t++){let r=t/e*Math.PI*2;for(let e=0;e<=n;e++){let t=e/n*Math.PI*2,s=(2.2+.9*Math.cos(t))*Math.cos(r),o=(2.2+.9*Math.cos(t))*Math.sin(r),a=.9*Math.sin(t);i.push(s,o,a)}}for(let t=0;t<e;t++)for(let e=0;e<n;e++){let i=t*(n+1)+e,s=i+n+1;r.push(i,s,i+1),r.push(s,s+1,i+1)}(t=new o.ld).setAttribute("position",new o.ki(i,3)),t.setIndex(r),t.computeVertexNormals()}else{let e=[],i=[],r=Math.max(8,Math.floor(n/2));for(let t=0;t<=n;t++){let i=t/n*Math.PI*2;for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,s=2.2+.5*Math.cos(i/2),o=s*Math.cos(i),a=s*Math.sin(i),l=.6*Math.sin(i/2)*Math.cos(n)+.6*Math.cos(i/2)*Math.sin(n);e.push(o,a,l)}}for(let e=0;e<n;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t,s=n+r+1;i.push(n,s,n+1),i.push(s,s+1,n+1)}(t=new o.ld).setAttribute("position",new o.ki(e,3)),t.setIndex(i),t.computeVertexNormals()}return t},[e,n]),g=(0,i.useMemo)(()=>({mobius:{color:"#f97316",emissive:"#ea580c",metalness:.5,roughness:.2,wireframeColor:"#fdba74"},klein:{color:"#ec4899",emissive:"#db2777",metalness:.5,roughness:.2,wireframeColor:"#f9a8d4"},torus:{color:"#8b5cf6",emissive:"#7c3aed",metalness:.5,roughness:.2,wireframeColor:"#c4b5fd"}})[e],[e]),y=(0,i.useMemo)(()=>{let t=v.attributes.position,i=[],r="torus"===e?2*n:n,s="torus"===e?n:Math.max(8,Math.floor(n/2));for(let e=0;e<=s;e+=Math.max(1,Math.floor(s/12))){let n=[];for(let i=0;i<=r;i+=Math.max(1,Math.floor(r/24))){let r=i*(s+1)+e;n.push([t.getX(r),t.getY(r),t.getZ(r)])}i.push(n)}for(let e=0;e<=r;e+=Math.max(1,Math.floor(r/12))){let n=[];for(let i=0;i<=s;i+=Math.max(1,Math.floor(s/24))){let r=e*(s+1)+i;n.push([t.getX(r),t.getY(r),t.getZ(r)])}i.push(n)}return i},[v,e,n]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.4}),(0,t.jsx)("pointLight",{position:[10,10,10],intensity:1.5}),(0,t.jsx)("pointLight",{position:[-10,-5,-10],intensity:.5,color:g.emissive}),(0,t.jsx)("pointLight",{position:[0,10,-5],intensity:.3,color:"#ffffff"}),(0,t.jsx)("mesh",{ref:u,geometry:v,children:(0,t.jsx)("meshStandardMaterial",{color:g.color,emissive:g.emissive,emissiveIntensity:.15,metalness:g.metalness,roughness:g.roughness,side:o.Vs,wireframe:!1})}),y.map((e,i)=>(0,t.jsx)(s.f,{points:e,color:g.wireframeColor,lineWidth:1,opacity:.3,transparent:!0},i)),(0,t.jsx)("gridHelper",{args:[15,15,"#1a1a3e","#1a1a3e"],position:[0,-3,0]}),(0,t.jsx)(s.f,{points:[[-6,0,0],[6,0,0]],color:"#333",lineWidth:1}),(0,t.jsx)(s.f,{points:[[0,-6,0],[0,6,0]],color:"#333",lineWidth:1}),(0,t.jsx)(s.f,{points:[[0,0,-6],[0,0,6]],color:"#333",lineWidth:1})]})}e.i(81413);var l=e.i(48205),d=e.i(82192),c=e.i(68647),u=e.i(14228),f=e.i(4685);let p=["mobius","klein","torus"];e.s(["default",0,function(){let e=(0,n.useRouter)(),[r,s]=(0,i.useState)(null),[o,h]=(0,i.useState)(!0),[m,v]=(0,i.useState)(!0),[g,y]=(0,i.useState)(1),[x,w]=(0,i.useState)(0),[S,b]=(0,i.useState)("torus"),[E,M]=(0,i.useState)(32),[_,A]=(0,i.useState)(.5),C=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(c.E,{title:"Surface Type",children:(0,t.jsx)("div",{className:"grid grid-cols-3 gap-2",children:p.map(e=>(0,t.jsx)("button",{onClick:()=>b(e),className:`py-2 px-3 text-sm rounded-lg transition-all capitalize ${S===e?"bg-pink-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:e},e))})}),(0,t.jsxs)(c.E,{title:"Parameters",children:[(0,t.jsx)(c.p,{label:"Resolution",value:E,unit:"",min:16,max:64,step:4,color:"#ec4899",onChange:M,decimals:0}),(0,t.jsx)(c.p,{label:"Rotation Speed",value:_,unit:"",min:0,max:2,step:.1,color:"#f472b6",onChange:A,decimals:1})]}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/topology-surfaces/details"),className:"w-full py-2.5 bg-gradient-to-r from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 text-pink-700 font-medium text-sm rounded-lg transition-all border border-pink-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),L=r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Z,{data:{surface:{value:0,unit:r.surfaceType,color:"#ec4899",decimals:0},genus:{value:r.genus,unit:"holes",color:"#f472b6",decimals:0},euler:{value:r.eulerCharacteristic,unit:"χ",color:"#fb7185",decimals:0},boundary:{value:r.boundaryComponents,unit:"∂",color:"#fda4af",decimals:0}},columns:1}),(0,t.jsx)("div",{className:"mt-3 p-3 bg-gray-800/50 rounded-lg",children:(0,t.jsx)("div",{className:"text-center font-mono text-pink-400 text-sm",children:"χ = V - E + F = 2 - 2g (orientable)"})})]}):(0,t.jsx)("div",{className:"text-center text-gray-500 text-sm py-8",children:"Waiting for simulation data..."});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.f,{title:"Topology Surfaces",description:"Explore Mobius strip, Klein bottle, and torus",cameraPosition:[12,8,12],backgroundColor:"#050510",controls:null,dataPanel:null,children:(0,t.jsx)(a,{onDataChange:s,surfaceType:S,resolution:E,rotationSpeed:_,isPlaying:m})}),(0,t.jsx)(u.f,{isPlaying:m,onPlayPause:()=>v(e=>!e),onReset:()=>{w(e=>e+1),v(!0),y(1),M(32)},speed:g,onSpeedChange:y}),(0,t.jsx)(d.f,{title:"⚙️ Surface Settings",initialPosition:{x:20,y:80},children:C}),(0,t.jsx)(f.f,{isVisible:o,onToggle:()=>h(!o),children:L})]})}],4125)}]);