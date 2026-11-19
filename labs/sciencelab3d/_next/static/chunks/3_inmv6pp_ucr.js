(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),o=e.i(48546),a=s,l=s;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,h=e.i(8560),p=e.i(31497);class m extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([h.O.common,h.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=p.f>=125?"uv1":"uv2",g=new a.$i,y=new a.cE,v=new a.cE,b=new a.$i,w=new a.$i,S=new a.$i,j=new a.cE,A=new a.nd,E=new a._i,M=new a.cE,N=new a.VQ,C=new a.L0,L=new a.$i;function P(e,t,n){return L.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),L.multiplyScalar(1/L.w),L.x=i/n.width,L.y=i/n.height,L.applyMatrix4(e.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}class _ extends a.kE{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)y.fromBufferAttribute(t,e),v.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+y.distanceTo(v);let r=new a.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new a.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new a.Zq(r,1,1)),this}raycast(e,n){let r,s,o=this.material.worldUnits,l=e.camera;null!==l||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),C.copy(u.boundingSphere).applyMatrix4(d),o)r=.5*i;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));r=P(l,e,f.resolution)}if(C.radius+=r,!1!==t.intersectsSphere(C)){if(null===u.boundingBox&&u.computeBoundingBox(),N.copy(u.boundingBox).applyMatrix4(d),o)s=.5*i;else{let e=Math.max(l.near,N.distanceToPoint(t.origin));s=P(l,e,f.resolution)}N.expandByScalar(s),!1!==t.intersectsBox(N)&&(o?function(e,n){let r=e.matrixWorld,s=e.geometry,o=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,o.count);for(let s=0;s<c;s++){E.start.fromBufferAttribute(o,s),E.end.fromBufferAttribute(l,s),E.applyMatrix4(r);let c=new a.cE,d=new a.cE;t.distanceSqToSegment(E.start,E.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[x]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,o=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),h=-n.near;t.at(1,S),S.w=1,S.applyMatrix4(n.matrixWorldInverse),S.applyMatrix4(s),S.multiplyScalar(1/S.w),S.x*=o.x/2,S.y*=o.y/2,S.z=0,j.copy(S),A.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(d,n),w.fromBufferAttribute(u,n),b.w=1,w.w=1,b.applyMatrix4(A),w.applyMatrix4(A),b.z>h&&w.z>h)continue;if(b.z>h){let e=b.z-w.z,t=(b.z-h)/e;b.lerp(w,t)}else if(w.z>h){let e=w.z-b.z,t=(w.z-h)/e;w.lerp(b,t)}b.applyMatrix4(s),w.applyMatrix4(s),b.multiplyScalar(1/b.w),w.multiplyScalar(1/w.w),b.x*=o.x/2,b.y*=o.y/2,w.x*=o.x/2,w.y*=o.y/2,E.start.copy(b),E.start.z=0,E.end.copy(w),E.end.z=0;let c=E.closestPointToPointParameter(j,!0);E.at(c,M);let f=a.rB.lerp(b.z,w.z,c),p=f>=-1&&f<=1,m=j.distanceTo(M)<.5*i;if(p&&m){E.start.fromBufferAttribute(d,n),E.end.fromBufferAttribute(u,n),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let i=new a.cE,s=new a.cE;t.distanceSqToSegment(E.start,E.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class U extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class R extends _{constructor(e=new U,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let z=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:a,lineWidth:l,segments:c,dashed:d,...f},h){var p,x;let g=(0,o.f)(e=>e.size),y=r.useMemo(()=>c?new _:new R,[c]),[v]=r.useState(()=>new m),b=(null==i||null==(p=i[0])?void 0:p.length)===4?4:3,w=r.useMemo(()=>{let n=c?new u:new U,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,c,i,b]);return r.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),r.useLayoutEffect(()=>{d?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[d,v]),r.useEffect(()=>()=>{w.dispose(),v.dispose()},[w]),r.createElement("primitive",(0,n.f)({object:y,ref:h},f),r.createElement("primitive",{object:w,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:v,attach:"material",color:t,vertexColors:!!i,resolution:[g.width,g.height],linewidth:null!=(x=null!=a?a:l)?x:1,dashed:d,transparent:4===b},f)))});e.s(["f",0,z],43216)},60099,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(88014),o=e.i(90072),a=e.i(48546),l=e.i(94800);let c=new o.cE,d=new o.cE,u=new o.cE,f=new o.wq;function h(e,t,i){let n=c.setFromMatrixPosition(e.matrixWorld);n.project(t);let r=i.width/2,s=i.height/2;return[n.x*r+r,-(n.y*s)+s]}let p=e=>1e-10>Math.abs(e)?0:e;function m(e,t,i=""){let n="matrix3d(";for(let i=0;16!==i;i++)n+=p(t[i]*e.elements[i])+(15!==i?",":")");return i+n}let x=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>m(e,t)),g=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>m(e,i(t),"translate(-50%,-50%)")),y=r.forwardRef(({children:e,eps:t=.001,style:i,className:m,prepend:y,center:v,fullscreen:b,portal:w,distanceFactor:S,sprite:j=!1,transform:A=!1,occlude:E,onOcclude:M,castShadow:N,receiveShadow:C,material:L,geometry:P,zIndexRange:_=[0x1000037,0],calculatePosition:U=h,as:R="div",wrapperClass:z,pointerEvents:T="auto",...D},O)=>{let{gl:G,camera:B,scene:W,size:I,raycaster:k,events:F,viewport:H}=(0,a.f)(),[$]=r.useState(()=>document.createElement(R)),V=r.useRef(null),q=r.useRef(null),Z=r.useRef(0),K=r.useRef([0,0]),Q=r.useRef(null),J=r.useRef(null),X=(null==w?void 0:w.current)||F.connected||G.domElement.parentNode,Y=r.useRef(null),ee=r.useRef(!1),et=r.useMemo(()=>{var e;return E&&"blending"!==E||Array.isArray(E)&&E.length&&(e=E[0])&&"object"==typeof e&&"current"in e},[E]);r.useLayoutEffect(()=>{let e=G.domElement;E&&"blending"===E?(e.style.zIndex=`${Math.floor(_[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[E]),r.useLayoutEffect(()=>{if(q.current){let e=V.current=s.createRoot($);if(W.updateMatrixWorld(),A)$.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=U(q.current,B,I);$.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(y?X.prepend($):X.appendChild($)),()=>{X&&X.removeChild($),e.unmount()}}},[X,A]),r.useLayoutEffect(()=>{z&&($.className=z)},[z]);let ei=r.useMemo(()=>A?{position:"absolute",top:0,left:0,width:I.width,height:I.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:v?"translate3d(-50%,-50%,0)":"none",...b&&{top:-I.height/2,left:-I.width/2,width:I.width,height:I.height},...i},[i,v,b,I,A]),en=r.useMemo(()=>({position:"absolute",pointerEvents:T}),[T]);r.useLayoutEffect(()=>{var t,n;ee.current=!1,A?null==(t=V.current)||t.render(r.createElement("div",{ref:Q,style:ei},r.createElement("div",{ref:J,style:en},r.createElement("div",{ref:O,className:m,style:i,children:e})))):null==(n=V.current)||n.render(r.createElement("div",{ref:O,style:ei,className:m,children:e}))});let er=r.useRef(!0);(0,l.f)(e=>{if(q.current){B.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=A?K.current:U(q.current,B,I);if(A||Math.abs(Z.current-B.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){var i;let t,n,r,s,a=(i=q.current,t=c.setFromMatrixPosition(i.matrixWorld),n=d.setFromMatrixPosition(B.matrixWorld),r=t.sub(n),s=B.getWorldDirection(u),r.angleTo(s)>Math.PI/2),l=!1;et&&(Array.isArray(E)?l=E.map(e=>e.current):"blending"!==E&&(l=[W]));let h=er.current;l?er.current=function(e,t,i,n){let r=c.setFromMatrixPosition(e.matrixWorld),s=r.clone();s.project(t),f.set(s.x,s.y),i.setFromCamera(f,t);let o=i.intersectObjects(n,!0);if(o.length){let e=o[0].distance;return r.distanceTo(i.ray.origin)<e}return!0}(q.current,B,k,l)&&!a:er.current=!a,h!==er.current&&(M?M(!er.current):$.style.display=er.current?"block":"none");let m=Math.floor(_[0]/2),y=E?et?[_[0],m]:[m-1,0]:_;if($.style.zIndex=`${function(e,t,i){if(t instanceof o.zm||t instanceof o.Sc){let n=c.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld),s=n.distanceTo(r),o=(i[1]-i[0])/(t.far-t.near),a=i[1]-o*t.far;return Math.round(o*s+a)}}(q.current,B,y)}`,A){let[e,t]=[I.width/2,I.height/2],i=B.projectionMatrix.elements[5]*t,{isOrthographicCamera:n,top:r,left:s,bottom:o,right:a}=B,l=x(B.matrixWorldInverse),c=n?`scale(${i})translate(${p(-(a+s)/2)}px,${p((r+o)/2)}px)`:`translateZ(${i}px)`,d=q.current.matrixWorld;j&&((d=B.matrixWorldInverse.clone().transpose().copyPosition(d).scale(q.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),$.style.width=I.width+"px",$.style.height=I.height+"px",$.style.perspective=n?"":`${i}px`,Q.current&&J.current&&(Q.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,J.current.style.transform=g(d,1/((S||10)/400)))}else{let t=void 0===S?1:function(e,t){if(t instanceof o.Sc)return t.zoom;if(!(t instanceof o.zm))return 1;{let i=c.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(n))}}(q.current,B)*S;$.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,Z.current=B.zoom}}if(!et&&Y.current&&!ee.current)if(A){if(Q.current){let e=Q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=B;if(t||P)D.scale&&(Array.isArray(D.scale)?D.scale instanceof o.cE?Y.current.scale.copy(D.scale.clone().divideScalar(1)):Y.current.scale.set(1/D.scale[0],1/D.scale[1],1/D.scale[2]):Y.current.scale.setScalar(1/D.scale));else{let t=(S||10)/400,i=e.clientWidth*t,n=e.clientHeight*t;Y.current.scale.set(i,n,1)}ee.current=!0}}}else{let t=$.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/H.factor,i=t.clientWidth*e,n=t.clientHeight*e;Y.current.scale.set(i,n,1),ee.current=!0}Y.current.lookAt(e.camera.position)}});let es=r.useMemo(()=>({vertexShader:A?void 0:`
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
      `}),[A]);return r.createElement("group",(0,n.f)({},D,{ref:q}),E&&!et&&r.createElement("mesh",{castShadow:N,receiveShadow:C,ref:Y},P||r.createElement("planeGeometry",null),L||r.createElement("shaderMaterial",{side:o.Vs,vertexShader:es.vertexShader,fragmentShader:es.fragmentShader})))});e.s(["f",0,y])},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),o=(0,t.forwardRef)(({color:e,size:n,strokeWidth:o,absoluteStrokeWidth:a,className:l="",children:c,iconNode:d,...u},f)=>{let{size:h=24,strokeWidth:p=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:g=""}=(0,t.useContext)(s)??{},y=a??m?24*Number(o??p)/Number(n??h):o??p;return(0,t.createElement)("svg",{ref:f,...r,width:n??h??r.width,height:n??h??r.height,stroke:e??x,strokeWidth:y,className:i("lucide",g,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...a},l)=>(0,t.createElement)(o,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...a}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},56327,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989);e.i(81413);var r=e.i(48205),s=e.i(14228),o=e.i(82192),a=e.i(4685),l=e.i(68647),c=e.i(94800),d=e.i(30297),u=e.i(60099),f=e.i(43216),h=e.i(90072);let p=[{name:"Met",fullName:"Methionine (Start)",color:"#ef4444"},{name:"Lys",fullName:"Lysine",color:"#3b82f6"},{name:"Arg",fullName:"Arginine",color:"#22c55e"},{name:"Ser",fullName:"Serine",color:"#f59e0b"},{name:"Leu",fullName:"Leucine",color:"#8b5cf6"},{name:"Pro",fullName:"Proline",color:"#ec4899"},{name:"Gly",fullName:"Glycine",color:"#14b8a6"},{name:"Val",fullName:"Valine",color:"#f97316"}],m={A:"#1e40af",T:"#3b82f6",G:"#60a5fa",C:"#93c5fd"},x={A:"#ea580c",U:"#f97316",G:"#fb923c",C:"#fdba74"},g="#22c55e",y="#8b5cf6",v=["A","T","G","C","G","A","T","C","G","A","T","C","G","A","T"],b=[["A","U","G"],["A","A","A"],["C","G","U"],["U","C","U"],["U","U","A"],["C","C","U"],["G","G","U"],["G","U","U"]],w={A:"T",T:"A",G:"C",C:"G"},S={A:"U",U:"A",G:"C",C:"G"},j=[{phase:"Transcription",name:"DNA in Nucleus",desc:"DNA double helix in nucleus. RNA Polymerase binds to promoter region."},{phase:"Transcription",name:"mRNA Synthesis",desc:"RNA Polymerase reads DNA 3'→5', builds mRNA 5'→3'. Uracil pairs with Adenine."},{phase:"Transcription",name:"mRNA Processing & Export",desc:"mRNA detaches, exits nucleus through nuclear pore into cytoplasm."},{phase:"Translation",name:"Translation Initiation",desc:"Ribosome binds mRNA at start codon (AUG). Initiation tRNA brings first amino acid."},{phase:"Translation",name:"Elongation",desc:"tRNAs bring amino acids matching codons. Polypeptide chain grows bond by bond."},{phase:"Translation",name:"Termination & Folding",desc:"Stop codon reached. Polypeptide chain folds into functional protein."}];function A({onDataChange:e,isPlaying:n=!0,simulationSpeed:r=1,resetTrigger:s=0,speed:o=1,showLabels:a=!0,step:l=0}){let E=(0,i.useRef)(null),M=(0,i.useRef)(0),N=(0,i.useRef)(0),C=(0,i.useRef)(0),L=(0,i.useRef)(0),P=(0,i.useRef)(0),_=(0,i.useRef)(0),U=(0,i.useRef)(0),R=(0,i.useRef)(0),z=(0,i.useRef)(0),[T,D]=(0,i.useState)("AUG"),[O,G]=(0,i.useState)("Met"),[B,W]=(0,i.useState)(0),I=(0,i.useRef)(0);(0,i.useEffect)(()=>{M.current=0,N.current=0,C.current=0,L.current=0,P.current=0,_.current=0,U.current=0,R.current=0,z.current=0,D("AUG"),G("Met"),W(0)},[s,l]),(0,c.f)((t,i)=>{if(I.current++,E.current&&n&&(M.current+=i*r*o,N.current+=.06*i*r,1===l?(C.current=Math.min(100,C.current+10*i*r*o),z.current=Math.min(15,z.current+1.5*i*r*o)):2===l?(C.current=100,z.current=15,L.current=Math.min(100,L.current+15*i*r*o)):3===l?P.current=Math.min(100,P.current+25*i*r*o):4===l?(_.current=Math.min(8,_.current+1.2*i*r*o),U.current=Math.min(8,U.current+i*r*o)):5===l&&(U.current=8,R.current=Math.min(100,R.current+20*i*r*o)),I.current%8==0)){let t=Math.floor(_.current);t<8&&t>=0&&(D(b[t].join("")),G(p[t].name)),W(Math.floor(U.current)),e&&e({phase:j[l].phase,step:j[l].name,codonBeingRead:T,aminoAcidAdded:O,proteinLength:Math.floor(U.current),description:j[l].desc,nucleotidesTranscribed:Math.floor(z.current)})}});let k=(0,i.useCallback)((e=0)=>{let t=[];for(let i=0;i<16;i++){let n=.5*i+N.current;t.push(new h.cE(1.3*Math.cos(n)-4,.5*i-4+e,1.3*Math.sin(n)))}return t},[N.current]),F=(0,i.useCallback)((e=0)=>{let t=[];for(let i=0;i<9;i++)t.push(new h.cE(1.5+e,(i-4)*1.2,0));return t},[]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.4}),(0,t.jsx)("directionalLight",{position:[10,10,5],intensity:.8}),(0,t.jsx)("pointLight",{position:[-4,0,0],intensity:.4,color:"#3b82f6"}),(0,t.jsx)("pointLight",{position:[2,0,0],intensity:.4*(l>=3),color:"#f97316"}),(0,t.jsx)("pointLight",{position:[4,2,0],intensity:.4*(l>=3),color:"#8b5cf6"}),(0,t.jsx)(d.f,{enableDamping:!0,dampingFactor:.05}),(0,t.jsxs)("group",{ref:E,children:[a&&(0,t.jsx)(u.f,{position:[0,8,0],distanceFactor:10,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 px-4 py-3 rounded-xl border border-gray-700 shadow-xl",children:[(0,t.jsxs)("div",{className:"text-white text-lg font-bold",children:[j[l].phase,": ",j[l].name]}),(0,t.jsx)("div",{className:"text-gray-300 text-sm mt-1",children:j[l].desc}),(4===l||5===l)&&(0,t.jsxs)("div",{className:"text-gray-400 text-xs mt-2",children:["Codon: ",T," | AA: ",O," | Protein: ",B,"/8"]}),1===l&&(0,t.jsxs)("div",{className:"text-gray-400 text-xs mt-2",children:["Nucleotides: ",Math.floor(z.current),"/15"]})]})}),l<=2&&(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{position:[-3,1.5,0],children:[(0,t.jsx)("sphereGeometry",{args:[5.5,32,32]}),(0,t.jsx)("meshStandardMaterial",{color:"#1e3a5f",transparent:!0,opacity:.12,side:h.tw})]}),(0,t.jsx)(f.f,{points:k(),color:"#3b82f6",lineWidth:3,opacity:.7,transparent:!0}),(0,t.jsx)(f.f,{points:k().map(e=>new h.cE(e.x+.4,e.y,e.z+.4)),color:"#60a5fa",lineWidth:3,opacity:.7,transparent:!0}),v.map((e,i)=>(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{position:[1.3*Math.cos(.5*i+N.current)-4,.5*i-4,1.3*Math.sin(.5*i+N.current)],children:[(0,t.jsx)("sphereGeometry",{args:[.14,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:m[e]})]}),(0,t.jsxs)("mesh",{position:[1.3*Math.cos(.5*i+N.current)-4+.4,.5*i-4,1.3*Math.sin(.5*i+N.current)+.4],children:[(0,t.jsx)("sphereGeometry",{args:[.14,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:m[w[e]]})]})]},i)),l>=0&&l<=2&&(0,t.jsxs)("group",{position:[-4,-4+C.current/100*5,1.5],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[1,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#dc2626",emissive:"#dc2626",emissiveIntensity:.4})]}),a&&(0,t.jsx)(u.f,{position:[1.8,0,0],distanceFactor:10,children:(0,t.jsx)("div",{className:"bg-red-600/95 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg",children:"RNA Polymerase"})})]}),l>=1&&(0,t.jsx)("group",{position:[-2.5,-4+C.current/100*5,0],children:Array.from({length:Math.floor(C.current/100*8)}).map((e,i)=>(0,t.jsxs)("group",{position:[.4*i,0,0],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.1,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:x.A})]}),(0,t.jsxs)("mesh",{position:[.08,.08,0],children:[(0,t.jsx)("sphereGeometry",{args:[.08,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:x[["A","U","G","C"][i%4]]})]})]},i))}),2===l&&(0,t.jsxs)("group",{position:[-2.5+L.current/100*5,0,0],children:[(0,t.jsx)(f.f,{points:F(),color:"#f97316",lineWidth:2.5,opacity:.8,transparent:!0}),b.map((e,i)=>(0,t.jsx)("group",{position:[1.5,(i-4)*1.2,0],children:e.map((e,i)=>(0,t.jsxs)("mesh",{position:[.3*i,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.14,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:x[e]})]},i))},i))]}),2===l&&a&&(0,t.jsx)(u.f,{position:[.5,0,0],distanceFactor:10,children:(0,t.jsx)("div",{className:"bg-blue-500/95 text-white px-2 py-1 rounded-lg text-xs font-bold",children:"Nuclear Pore → Cytoplasm"})})]}),l>=3&&(0,t.jsxs)("group",{children:[(0,t.jsx)(f.f,{points:F(),color:"#f97316",lineWidth:2.5,opacity:.8,transparent:!0}),b.map((e,i)=>{let n=i<U.current,r=Math.floor(_.current)===i;return(0,t.jsxs)("group",{position:[1.5,(i-4)*1.2,0],children:[e.map((e,i)=>(0,t.jsxs)("mesh",{position:[.32*i,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.15,10,10]}),(0,t.jsx)("meshStandardMaterial",{color:x[e],emissive:r?x[e]:"#000000",emissiveIntensity:.5*!!r})]},i)),r&&a&&(0,t.jsxs)("group",{position:[1,0,.6],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.35,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:g,emissive:g,emissiveIntensity:.4})]}),e.map((e,i)=>(0,t.jsxs)("mesh",{position:[.2,.16*i-.16,.25],children:[(0,t.jsx)("sphereGeometry",{args:[.09,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:x[S[e]]})]},i)),a&&(0,t.jsx)(u.f,{position:[0,.7,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-green-500/95 text-white px-2 py-1 rounded text-xs font-bold",children:"tRNA"})})]}),n&&(0,t.jsxs)("mesh",{position:[1.8,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.38,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:p[i].color,emissive:p[i].color,emissiveIntensity:.35})]}),n&&i%2==0&&a&&(0,t.jsx)(u.f,{position:[1.8,.7,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"px-2 py-1 rounded text-xs font-bold whitespace-nowrap",style:{backgroundColor:p[i].color,color:"white"},children:p[i].name})})]},i)}),(0,t.jsxs)("group",{position:[3.5,2,0],children:[(0,t.jsxs)("mesh",{position:[0,.5,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.4,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:y,emissive:y,emissiveIntensity:.25,roughness:.4})]}),(0,t.jsxs)("mesh",{position:[0,-.7,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.1,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#a78bfa",roughness:.4})]}),a&&(0,t.jsx)(u.f,{position:[0,2.2,0],distanceFactor:10,children:(0,t.jsx)("div",{className:"bg-purple-500/95 text-white px-2 py-1 rounded-lg text-xs font-bold",children:"Ribosome"})})]}),U.current>0&&(0,t.jsx)("group",{position:[4.5,0,1],children:Array.from({length:Math.floor(U.current)}).map((e,i)=>(0,t.jsxs)("mesh",{position:[0,(i-Math.floor(U.current)/2)*.55,0],children:[(0,t.jsx)("sphereGeometry",{args:[.32,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:p[i].color,emissive:p[i].color,emissiveIntensity:.25})]},i))}),5===l&&R.current>0&&(0,t.jsxs)("group",{position:[6,-1,0],rotation:[0,.06*R.current,0],children:[Array.from({length:8}).map((e,i)=>{let n=i/8*Math.PI*2,r=.9+.25*Math.sin(2.5*n);return(0,t.jsxs)("mesh",{position:[Math.cos(n)*r,.6*Math.sin(3.5*n),Math.sin(n)*r],children:[(0,t.jsx)("sphereGeometry",{args:[.42,16,16]}),(0,t.jsx)("meshStandardMaterial",{color:p[i].color,emissive:p[i].color,emissiveIntensity:.35})]},i)}),a&&(0,t.jsx)(u.f,{position:[0,1.8,0],distanceFactor:10,children:(0,t.jsx)("div",{className:"bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg",children:"✨ Complete Protein!"})})]})]}),a&&l>=2&&(0,t.jsx)("group",{children:(0,t.jsx)(u.f,{position:[0,-6,0],distanceFactor:10,children:(0,t.jsxs)("div",{className:"bg-gray-800/95 px-4 py-2 rounded-lg border border-gray-600",children:[(0,t.jsxs)("div",{className:"text-white text-sm font-bold text-center",children:["DNA ",(0,t.jsx)("span",{className:"text-gray-400",children:"→"})," mRNA ",(0,t.jsx)("span",{className:"text-gray-400",children:"→"})," Protein"]}),(0,t.jsx)("div",{className:"text-gray-400 text-xs text-center mt-1",children:"Central Dogma of Molecular Biology"})]})})}),a&&(0,t.jsx)(u.f,{position:[-7,-5,0],distanceFactor:10,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 px-3 py-2 rounded-lg border border-gray-700 text-xs shadow-lg",children:[(0,t.jsx)("div",{className:"text-white font-bold mb-2",children:"Molecules"}),(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-blue-500"}),(0,t.jsx)("span",{className:"text-gray-300",children:"DNA"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-orange-500"}),(0,t.jsx)("span",{className:"text-gray-300",children:"mRNA"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-green-500"}),(0,t.jsx)("span",{className:"text-gray-300",children:"tRNA"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-purple-500"}),(0,t.jsx)("span",{className:"text-gray-300",children:"Ribosome"})]})]})]})})]})]})}e.s(["default",0,function(){let e=(0,n.useRouter)(),[c,d]=(0,i.useState)(!0),[u,f]=(0,i.useState)(1),[h,p]=(0,i.useState)(0),[m,x]=(0,i.useState)(!0),[g,y]=(0,i.useState)(!1),[v,b]=(0,i.useState)(!1),[w,S]=(0,i.useState)(1),[j,E]=(0,i.useState)(!0),[M,N]=(0,i.useState)(0),C=(0,i.useRef)(null),[L,P]=(0,i.useState)({phase:"Transcription",step:"DNA in Nucleus",codonBeingRead:"AUG",aminoAcidAdded:"Met",proteinLength:0,description:"DNA double helix in nucleus with RNA Polymerase",nucleotidesTranscribed:0});(0,i.useEffect)(()=>(v&&c&&(C.current=setTimeout(()=>{M<5?N(M+1):b(!1)},5500/u)),()=>{C.current&&clearTimeout(C.current)}),[v,M,c,u]);let _=(0,i.useCallback)(()=>{d(e=>!e)},[]),U=(0,i.useCallback)(()=>{p(e=>e+1),S(1),E(!0),N(0),b(!1),P({phase:"Transcription",step:"DNA in Nucleus",codonBeingRead:"AUG",aminoAcidAdded:"Met",proteinLength:0,description:"DNA double helix in nucleus with RNA Polymerase",nucleotidesTranscribed:0})},[]),R=(0,i.useCallback)(e=>{f(e)},[]),z=(0,i.useCallback)(e=>{P(e)},[]),T=(0,i.useMemo)(()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(l.E,{title:"Simulation Control",children:[(0,t.jsx)(l.p,{label:"Speed",value:w,min:.1,max:3,step:.1,onChange:S}),(0,t.jsxs)("div",{className:"mt-3 space-y-2",children:[(0,t.jsx)("label",{className:"text-xs text-gray-400 block mb-2",children:"Protein Synthesis Phase"}),["DNA in Nucleus","mRNA Synthesis","mRNA Processing & Export","Translation Initiation","Elongation","Termination & Folding"].map((e,i)=>(0,t.jsxs)("button",{onClick:()=>N(i),className:`w-full px-3 py-2 rounded text-sm transition-colors ${M===i?"bg-[#8b5cf6] text-white font-medium":"bg-gray-800 text-gray-300 hover:bg-gray-700"}`,children:[i+1,". ",e]},e))]}),(0,t.jsx)("button",{onClick:()=>b(!v),className:`w-full mt-3 px-3 py-2 rounded text-sm font-medium transition-colors ${v?"bg-green-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:v?"⏸ Auto Playing":"▶ Auto Play Steps"})]}),(0,t.jsx)(l.E,{title:"Display Options",children:(0,t.jsx)("div",{className:"space-y-2",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 text-sm",children:[(0,t.jsx)("input",{type:"checkbox",checked:j,onChange:e=>E(e.target.checked),className:"w-4 h-4 accent-[#8b5cf6]"}),(0,t.jsx)("span",{className:"text-gray-300",children:"Show Labels"})]})})}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/protein-synthesis/details"),className:"w-full mt-4 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 text-[#8b5cf6] rounded-lg border border-[#8b5cf6]/50 transition-colors text-sm font-medium",children:"View Details"})]}),[w,M,j,v,e]),D=(0,i.useMemo)(()=>(0,t.jsx)(l.Z,{data:{phase:{value:0,unit:L.phase,color:"#8b5cf6",decimals:0},step:{value:0,unit:L.step,color:"#f59e0b",decimals:0},codon:{value:0,unit:L.codonBeingRead,color:"#f97316",decimals:0},aminoAcid:{value:0,unit:L.aminoAcidAdded,color:"#22c55e",decimals:0},protein:{value:L.proteinLength,unit:"AA",color:"#3b82f6",decimals:0},nucleotides:{value:L.nucleotidesTranscribed,unit:"nt",color:"#06b6d4",decimals:0},status:{value:+!!c,unit:c?"Active":"Paused",color:"#22c55e",decimals:0}},columns:2}),[L,c]),O=(0,i.useMemo)(()=>(0,t.jsx)(a.f,{isVisible:g,onToggle:()=>y(e=>!e),children:D}),[g,D]);return(0,t.jsxs)("div",{className:"w-full h-screen relative",children:[(0,t.jsx)(r.f,{title:"Protein Synthesis",description:"Visualize transcription and translation - Central Dogma of Biology",cameraPosition:[0,0,14],backgroundColor:"#050510",controls:null,dataPanel:O,children:(0,t.jsx)(A,{onDataChange:z,isPlaying:c,simulationSpeed:u,resetTrigger:h,speed:w,showLabels:j,step:M})}),(0,t.jsx)(s.f,{isPlaying:c,onPlayPause:_,onReset:U,speed:u,onSpeedChange:R,timeElapsed:0}),m&&(0,t.jsx)(o.f,{initialPosition:{x:window.innerWidth-340,y:80},children:T}),!m&&(0,t.jsx)("button",{onClick:()=>x(!0),className:"fixed top-20 right-4 z-20 px-4 py-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 text-[#8b5cf6] rounded-lg border border-[#8b5cf6]/50 transition-colors text-sm font-medium",children:"Show Controls"})]})}],56327)}]);