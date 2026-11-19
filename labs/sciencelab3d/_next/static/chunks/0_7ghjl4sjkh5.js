(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),a=e.i(48546),o=s,l=s;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,h=e.i(8560),m=e.i(31497);class p extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([h.O.common,h.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let g=m.f>=125?"uv1":"uv2",v=new o.$i,x=new o.cE,y=new o.cE,b=new o.$i,S=new o.$i,w=new o.$i,M=new o.cE,j=new o.nd,E=new o._i,A=new o.cE,z=new o.VQ,L=new o.L0,_=new o.$i;function P(e,t,n){return _.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),_.multiplyScalar(1/_.w),_.x=i/n.width,_.y=i/n.height,_.applyMatrix4(e.projectionMatrixInverse),_.multiplyScalar(1/_.w),Math.abs(Math.max(_.x,_.y))}class C extends o.kE{constructor(e=new u,t=new p({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)x.fromBufferAttribute(t,e),y.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+x.distanceTo(y);let r=new o.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(r,1,1)),this}raycast(e,n){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),L.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*i;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));r=P(l,e,f.resolution)}if(L.radius+=r,!1!==t.intersectsSphere(L)){if(null===u.boundingBox&&u.computeBoundingBox(),z.copy(u.boundingBox).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,z.distanceToPoint(t.origin));s=P(l,e,f.resolution)}z.expandByScalar(s),!1!==t.intersectsBox(z)&&(a?function(e,n){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){E.start.fromBufferAttribute(a,s),E.end.fromBufferAttribute(l,s),E.applyMatrix4(r);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(E.start,E.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[g]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),h=-n.near;t.at(1,w),w.w=1,w.applyMatrix4(n.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=a.x/2,w.y*=a.y/2,w.z=0,M.copy(w),j.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(d,n),S.fromBufferAttribute(u,n),b.w=1,S.w=1,b.applyMatrix4(j),S.applyMatrix4(j),b.z>h&&S.z>h)continue;if(b.z>h){let e=b.z-S.z,t=(b.z-h)/e;b.lerp(S,t)}else if(S.z>h){let e=S.z-b.z,t=(S.z-h)/e;S.lerp(b,t)}b.applyMatrix4(s),S.applyMatrix4(s),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=a.x/2,b.y*=a.y/2,S.x*=a.x/2,S.y*=a.y/2,E.start.copy(b),E.start.z=0,E.end.copy(S),E.end.z=0;let c=E.closestPointToPointParameter(M,!0);E.at(c,A);let f=o.rB.lerp(b.z,S.z,c),m=f>=-1&&f<=1,p=M.distanceTo(A)<.5*i;if(m&&p){E.start.fromBufferAttribute(d,n),E.end.fromBufferAttribute(u,n),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let i=new o.cE,s=new o.cE;t.distanceSqToSegment(E.start,E.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[g]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class R extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class U extends C{constructor(e=new R,t=new p({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let N=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},h){var m,g;let v=(0,a.f)(e=>e.size),x=r.useMemo(()=>c?new C:new U,[c]),[y]=r.useState(()=>new p),b=(null==i||null==(m=i[0])?void 0:m.length)===4?4:3,S=r.useMemo(()=>{let n=c?new u:new R,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,c,i,b]);return r.useLayoutEffect(()=>{x.computeLineDistances()},[e,x]),r.useLayoutEffect(()=>{d?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[d,y]),r.useEffect(()=>()=>{S.dispose(),y.dispose()},[S]),r.createElement("primitive",(0,n.f)({object:x,ref:h},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:y,attach:"material",color:t,vertexColors:!!i,resolution:[v.width,v.height],linewidth:null!=(g=null!=o?o:l)?g:1,dashed:d,transparent:4===b},f)))});e.s(["f",0,N],43216)},60099,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(88014),a=e.i(90072),o=e.i(48546),l=e.i(94800);let c=new a.cE,d=new a.cE,u=new a.cE,f=new a.wq;function h(e,t,i){let n=c.setFromMatrixPosition(e.matrixWorld);n.project(t);let r=i.width/2,s=i.height/2;return[n.x*r+r,-(n.y*s)+s]}let m=e=>1e-10>Math.abs(e)?0:e;function p(e,t,i=""){let n="matrix3d(";for(let i=0;16!==i;i++)n+=m(t[i]*e.elements[i])+(15!==i?",":")");return i+n}let g=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>p(e,t)),v=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>p(e,i(t),"translate(-50%,-50%)")),x=r.forwardRef(({children:e,eps:t=.001,style:i,className:p,prepend:x,center:y,fullscreen:b,portal:S,distanceFactor:w,sprite:M=!1,transform:j=!1,occlude:E,onOcclude:A,castShadow:z,receiveShadow:L,material:_,geometry:P,zIndexRange:C=[0x1000037,0],calculatePosition:R=h,as:U="div",wrapperClass:N,pointerEvents:O="auto",...T},B)=>{let{gl:D,camera:W,scene:G,size:I,raycaster:F,events:H,viewport:k}=(0,o.f)(),[$]=r.useState(()=>document.createElement(U)),V=r.useRef(null),q=r.useRef(null),Z=r.useRef(0),K=r.useRef([0,0]),Q=r.useRef(null),J=r.useRef(null),X=(null==S?void 0:S.current)||H.connected||D.domElement.parentNode,Y=r.useRef(null),ee=r.useRef(!1),et=r.useMemo(()=>{var e;return E&&"blending"!==E||Array.isArray(E)&&E.length&&(e=E[0])&&"object"==typeof e&&"current"in e},[E]);r.useLayoutEffect(()=>{let e=D.domElement;E&&"blending"===E?(e.style.zIndex=`${Math.floor(C[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[E]),r.useLayoutEffect(()=>{if(q.current){let e=V.current=s.createRoot($);if(G.updateMatrixWorld(),j)$.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=R(q.current,W,I);$.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(x?X.prepend($):X.appendChild($)),()=>{X&&X.removeChild($),e.unmount()}}},[X,j]),r.useLayoutEffect(()=>{N&&($.className=N)},[N]);let ei=r.useMemo(()=>j?{position:"absolute",top:0,left:0,width:I.width,height:I.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:y?"translate3d(-50%,-50%,0)":"none",...b&&{top:-I.height/2,left:-I.width/2,width:I.width,height:I.height},...i},[i,y,b,I,j]),en=r.useMemo(()=>({position:"absolute",pointerEvents:O}),[O]);r.useLayoutEffect(()=>{var t,n;ee.current=!1,j?null==(t=V.current)||t.render(r.createElement("div",{ref:Q,style:ei},r.createElement("div",{ref:J,style:en},r.createElement("div",{ref:B,className:p,style:i,children:e})))):null==(n=V.current)||n.render(r.createElement("div",{ref:B,style:ei,className:p,children:e}))});let er=r.useRef(!0);(0,l.f)(e=>{if(q.current){W.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=j?K.current:R(q.current,W,I);if(j||Math.abs(Z.current-W.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){var i;let t,n,r,s,o=(i=q.current,t=c.setFromMatrixPosition(i.matrixWorld),n=d.setFromMatrixPosition(W.matrixWorld),r=t.sub(n),s=W.getWorldDirection(u),r.angleTo(s)>Math.PI/2),l=!1;et&&(Array.isArray(E)?l=E.map(e=>e.current):"blending"!==E&&(l=[G]));let h=er.current;l?er.current=function(e,t,i,n){let r=c.setFromMatrixPosition(e.matrixWorld),s=r.clone();s.project(t),f.set(s.x,s.y),i.setFromCamera(f,t);let a=i.intersectObjects(n,!0);if(a.length){let e=a[0].distance;return r.distanceTo(i.ray.origin)<e}return!0}(q.current,W,F,l)&&!o:er.current=!o,h!==er.current&&(A?A(!er.current):$.style.display=er.current?"block":"none");let p=Math.floor(C[0]/2),x=E?et?[C[0],p]:[p-1,0]:C;if($.style.zIndex=`${function(e,t,i){if(t instanceof a.zm||t instanceof a.Sc){let n=c.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld),s=n.distanceTo(r),a=(i[1]-i[0])/(t.far-t.near),o=i[1]-a*t.far;return Math.round(a*s+o)}}(q.current,W,x)}`,j){let[e,t]=[I.width/2,I.height/2],i=W.projectionMatrix.elements[5]*t,{isOrthographicCamera:n,top:r,left:s,bottom:a,right:o}=W,l=g(W.matrixWorldInverse),c=n?`scale(${i})translate(${m(-(o+s)/2)}px,${m((r+a)/2)}px)`:`translateZ(${i}px)`,d=q.current.matrixWorld;M&&((d=W.matrixWorldInverse.clone().transpose().copyPosition(d).scale(q.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),$.style.width=I.width+"px",$.style.height=I.height+"px",$.style.perspective=n?"":`${i}px`,Q.current&&J.current&&(Q.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,J.current.style.transform=v(d,1/((w||10)/400)))}else{let t=void 0===w?1:function(e,t){if(t instanceof a.Sc)return t.zoom;if(!(t instanceof a.zm))return 1;{let i=c.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(n))}}(q.current,W)*w;$.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,Z.current=W.zoom}}if(!et&&Y.current&&!ee.current)if(j){if(Q.current){let e=Q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=W;if(t||P)T.scale&&(Array.isArray(T.scale)?T.scale instanceof a.cE?Y.current.scale.copy(T.scale.clone().divideScalar(1)):Y.current.scale.set(1/T.scale[0],1/T.scale[1],1/T.scale[2]):Y.current.scale.setScalar(1/T.scale));else{let t=(w||10)/400,i=e.clientWidth*t,n=e.clientHeight*t;Y.current.scale.set(i,n,1)}ee.current=!0}}}else{let t=$.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/k.factor,i=t.clientWidth*e,n=t.clientHeight*e;Y.current.scale.set(i,n,1),ee.current=!0}Y.current.lookAt(e.camera.position)}});let es=r.useMemo(()=>({vertexShader:j?void 0:`
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
      `}),[j]);return r.createElement("group",(0,n.f)({},T,{ref:q}),E&&!et&&r.createElement("mesh",{castShadow:z,receiveShadow:L,ref:Y},P||r.createElement("planeGeometry",null),_||r.createElement("shaderMaterial",{side:a.Vs,vertexShader:es.vertexShader,fragmentShader:es.fragmentShader})))});e.s(["f",0,x])},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:n,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...u},f)=>{let{size:h=24,strokeWidth:m=2,absoluteStrokeWidth:p=!1,color:g="currentColor",className:v=""}=(0,t.useContext)(s)??{},x=o??p?24*Number(a??m)/Number(n??h):a??m;return(0,t.createElement)("svg",{ref:f,...r,width:n??h??r.width,height:n??h??r.height,stroke:e??g,strokeWidth:x,className:i("lucide",v,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},50319,e=>{"use strict";var t=e.i(43476),i=e.i(71645);e.i(81413);var n=e.i(48205),r=e.i(14228),s=e.i(82192),a=e.i(4685),o=e.i(68647),l=e.i(94800),c=e.i(30297),d=e.i(60099),u=e.i(43216),f=e.i(90072);function h({onDataChange:e,isPlaying:n=!0,simulationSpeed:r=1,resetTrigger:s=0,mutationRate:a=.15,predatorSpeed:o=1,initialPopulation:m=40,generationSpeed:p=1}){let g=(0,i.useRef)(null),v=(0,i.useRef)(0),x=(0,i.useRef)([]),y=(0,i.useRef)({id:0,position:[0,0,0],target:null}),b=(0,i.useRef)(0),S=(0,i.useRef)(0),w=(0,i.useRef)(0),M=(0,i.useRef)([]),j=(0,i.useRef)(0),E=(0,i.useRef)("grass"),A=(0,i.useRef)(0),[z,L]=(0,i.useState)({generation:0,populationCount:m,percentGreen:50,percentRed:50,percentSmall:50,percentLarge:50,averageSize:.5,percentSurviving:100,environmentPhase:"Grassland"}),_={grass:{background:"#1a2e1a",ground:"#15803d",name:"Grassland",advantage:"green"},dirt:{background:"#2e251a",ground:"#8B4513",name:"Dirt Field",advantage:"red"},snow:{background:"#1a1e2e",ground:"#e0e7ff",name:"Snowy Area",advantage:"none"}};(0,i.useEffect)(()=>{let e=[];b.current=0;for(let t=0;t<m;t++){let t=Math.random()>.5,i=Math.random();e.push({id:b.current++,position:[(Math.random()-.5)*14,0,(Math.random()-.5)*14],velocity:[(Math.random()-.5)*.02,0,(Math.random()-.5)*.02],size:i,color:t?"green":"red",alive:!0,age:0})}x.current=e,y.current={id:0,position:[0,0,0],target:null},S.current=0,w.current=0,M.current=[],j.current=0,E.current="grass",A.current=0},[s,m]);let P=(0,i.useCallback)(e=>.025*(1-.7*e),[]),C=(0,i.useCallback)((e,t)=>{let i=.2+.3*e.size;return"grass"===t?"green"===e.color?i-=.4:i+=.3:"dirt"===t?"red"===e.color?i-=.3:i+=.2:"snow"===t&&(i+=.1),Math.max(.05,Math.min(1,i))},[]);(0,l.f)((t,i)=>{if(!g.current||!n)return;v.current++,j.current+=i*r*p;let s=x.current,l=y.current;if(A.current+=i*r,A.current>15){A.current=0;let e=["grass","dirt","snow"],t=e.indexOf(E.current);E.current=e[(t+1)%e.length]}let c=E.current;s.forEach(e=>{if(!e.alive)return;let t=P(e.size);e.velocity[0]+=(Math.random()-.5)*.01*r,e.velocity[2]+=(Math.random()-.5)*.01*r;let n=Math.sqrt(e.velocity[0]**2+e.velocity[2]**2);if(n>t){let i=t/n;e.velocity[0]*=i,e.velocity[2]*=i}e.position[0]+=e.velocity[0]*r,e.position[2]+=e.velocity[2]*r,e.position[0]>7&&(e.position[0]=-7),e.position[0]<-7&&(e.position[0]=7),e.position[2]>7&&(e.position[2]=-7),e.position[2]<-7&&(e.position[2]=7),e.age+=i*r});let d=s.filter(e=>e.alive);if(d.length>0){let e=d.find(e=>e.id===l.target);if(!e||!e.alive){let t=d.filter(e=>Math.random()<C(e,c));e=t.length>0?t[Math.floor(Math.random()*t.length)]:d[Math.floor(Math.random()*d.length)],l.target=e?.id??null}if(e){let t=e.position[0]-l.position[0],i=e.position[2]-l.position[2],n=Math.sqrt(t*t+i*i),s=.035*o*r;n>.5?(l.position[0]+=t/n*s,l.position[2]+=i/n*s):(e.alive=!1,l.target=null)}}if(j.current-w.current>6/p){w.current=j.current;let e=S.current+1;S.current=e;let t=s.filter(e=>e.alive),i=t.filter(e=>"green"===e.color).length,n=t.filter(e=>"red"===e.color).length,r=t.reduce((e,t)=>e+t.size,0)/t.length;M.current.push({gen:e,green:i,red:n,avgSize:r});let o=[];for(;t.length+o.length<m&&t.length>0;){let e=t[Math.floor(Math.random()*t.length)],i=Math.random()<a,n=e.size;i&&(n=Math.max(0,Math.min(1,e.size+(Math.random()-.5)*.4)));let r=e.color;i&&.3>Math.random()&&(r="green"===e.color?"red":"green"),o.push({id:b.current++,position:[e.position[0]+(Math.random()-.5)*2,0,e.position[2]+(Math.random()-.5)*2],velocity:[(Math.random()-.5)*.02,0,(Math.random()-.5)*.02],size:n,color:r,alive:!0,age:0})}x.current=[...t,...o]}if(v.current%8==0){let t=x.current.filter(e=>e.alive),i=t.filter(e=>"green"===e.color).length,n=t.filter(e=>"red"===e.color).length,r=t.filter(e=>e.size<.5).length,s=t.filter(e=>e.size>=.5).length,a=t.reduce((e,t)=>e+t.size,0)/t.length,o=Math.round(t.length/m*100),l=_[c],d={generation:S.current,populationCount:t.length,percentGreen:Math.round(i/t.length*100),percentRed:Math.round(n/t.length*100),percentSmall:Math.round(r/t.length*100),percentLarge:Math.round(s/t.length*100),averageSize:Math.round(100*a)/100,percentSurviving:o,environmentPhase:l.name};L(d),e?.(d)}});let R=(0,i.useMemo)(()=>{let e=M.current;if(0===e.length)return[];let t=[];return e.forEach((i,n)=>{let r=-6+.5*n;t.push([r,.5,-5+i.green/m*3]),n<e.length-1&&t.push([r+.5,.5,-5+e[n+1].green/m*3])}),t},[z,m]),U=(0,i.useMemo)(()=>{let e=M.current;if(0===e.length)return[];let t=[];return e.forEach((i,n)=>{let r=-6+.5*n;t.push([r,0,-5+i.red/m*3]),n<e.length-1&&t.push([r+.5,0,-5+e[n+1].red/m*3])}),t},[z,m]),N=E.current,O=_[N],T=(0,i.useMemo)(()=>x.current.filter(e=>e.alive).map(e=>(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.15+.1*e.size,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:"green"===e.color?"#22c55e":"#ef4444",emissive:"green"===e.color?"#22c55e":"#ef4444",emissiveIntensity:.4,roughness:.5,metalness:.3})]}),e.size<.3&&(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.2,8,8]}),(0,t.jsx)("meshBasicMaterial",{color:"#3b82f6",transparent:!0,opacity:.3,blending:f.tq})]})]},e.id)),[z,N]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.5}),(0,t.jsx)("directionalLight",{position:[10,15,10],intensity:.8,castShadow:!0}),(0,t.jsx)("pointLight",{position:[0,8,0],intensity:.3,color:O.ground}),(0,t.jsx)(c.f,{enableDamping:!0,dampingFactor:.05,maxPolarAngle:Math.PI/2.5}),(0,t.jsxs)("group",{ref:g,children:[(0,t.jsxs)("mesh",{position:[0,-.1,0],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,t.jsx)("planeGeometry",{args:[16,16]}),(0,t.jsx)("meshStandardMaterial",{color:O.ground,roughness:.95,metalness:.05})]}),"grass"===N&&Array.from({length:150}).map((e,i)=>(0,t.jsxs)("mesh",{position:[(Math.random()-.5)*15,0,(Math.random()-.5)*15],rotation:[0,Math.random()*Math.PI,0],children:[(0,t.jsx)("coneGeometry",{args:[.02,.12,4]}),(0,t.jsx)("meshStandardMaterial",{color:"#16a34a",roughness:.8})]},i)),"snow"===N&&Array.from({length:100}).map((e,i)=>(0,t.jsxs)("mesh",{position:[(Math.random()-.5)*15,.05,(Math.random()-.5)*15],children:[(0,t.jsx)("sphereGeometry",{args:[.08,6,6]}),(0,t.jsx)("meshStandardMaterial",{color:"#ffffff",roughness:.9})]},i)),"dirt"===N&&Array.from({length:50}).map((e,i)=>(0,t.jsxs)("mesh",{position:[(Math.random()-.5)*15,0,(Math.random()-.5)*15],children:[(0,t.jsx)("dodecahedronGeometry",{args:[.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#654321",roughness:.9})]},i)),T,(0,t.jsxs)("mesh",{position:[y.current.position[0],.5,y.current.position[2]],children:[(0,t.jsx)("coneGeometry",{args:[.5,1,4]}),(0,t.jsx)("meshStandardMaterial",{color:"#dc2626",emissive:"#dc2626",emissiveIntensity:.5,roughness:.4,metalness:.4})]}),(0,t.jsxs)("mesh",{position:[y.current.position[0],.5,y.current.position[2]],children:[(0,t.jsx)("sphereGeometry",{args:[.15,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#fbbf24",emissive:"#fbbf24",emissiveIntensity:.8})]}),(0,t.jsxs)("group",{position:[-5,4,5],rotation:[-Math.PI/3,0,0],children:[(0,t.jsxs)("mesh",{position:[3,.25,-1.5],children:[(0,t.jsx)("boxGeometry",{args:[8,1.5,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#1f2937",transparent:!0,opacity:.9})]}),R.length>1&&(0,t.jsx)(u.f,{points:R,color:"#22c55e",lineWidth:3}),U.length>1&&(0,t.jsx)(u.f,{points:U,color:"#ef4444",lineWidth:3}),(0,t.jsx)(d.f,{position:[7,1,-1.5],distanceFactor:15,children:(0,t.jsx)("div",{className:"bg-gray-900/90 text-white px-2 py-1 rounded text-xs whitespace-nowrap",children:"Population Over Generations"})})]}),(0,t.jsxs)("group",{position:[5,4,0],rotation:[-Math.PI/4,0,0],children:[(0,t.jsxs)("mesh",{position:[0,.5,0],children:[(0,t.jsx)("boxGeometry",{args:[3,2,.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#1f2937",transparent:!0,opacity:.9})]}),(0,t.jsxs)("mesh",{position:[-.8,.5,0],children:[(0,t.jsx)("boxGeometry",{args:[.4,Math.max(.01,z.percentSmall/50),.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#3b82f6"})]}),(0,t.jsxs)("mesh",{position:[.8,.5,0],children:[(0,t.jsx)("boxGeometry",{args:[.4,Math.max(.01,z.percentLarge/50),.1]}),(0,t.jsx)("meshStandardMaterial",{color:"#f59e0b"})]}),(0,t.jsx)(d.f,{position:[0,1.8,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"text-xs text-white",children:"Size Distribution"})})]}),(0,t.jsx)(d.f,{position:[0,5,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:`bg-gradient-to-r px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${"grass"===N?"from-green-600/90 to-green-700/90 text-white":"dirt"===N?"from-amber-700/90 to-amber-800/90 text-white":"from-blue-400/90 to-blue-500/90 text-white"}`,children:[O.name," | Generation: ",z.generation," | Population: ",z.populationCount]})}),(0,t.jsx)(d.f,{position:[0,-2.5,0],distanceFactor:15,children:(0,t.jsxs)("div",{className:`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${"grass"===N?"bg-green-600/90 text-white":"dirt"===N?"bg-amber-700/90 text-white":"bg-blue-400/90 text-gray-900"}`,children:["Environment: ",O.name," ","grass"===N?"(🌿 Green Advantage)":"dirt"===N?"(🟤 Red Advantage)":"(❄️ Both Visible)"]})}),(0,t.jsx)(d.f,{position:[-6,3,4],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-gray-900/90 text-white px-3 py-2 rounded text-xs space-y-1",children:[(0,t.jsx)("div",{className:"font-bold text-green-400 mb-2",children:"Color Traits"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-green-500"}),(0,t.jsxs)("span",{children:["Green (Camouflaged in grass): ",z.percentGreen,"%"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-red-500"}),(0,t.jsxs)("span",{children:["Red (Visible in grass): ",z.percentRed,"%"]})]}),(0,t.jsxs)("div",{className:"mt-2 pt-2 border-t border-gray-700",children:[(0,t.jsx)("div",{className:"font-bold text-blue-400 mb-1",children:"Size Traits"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-blue-500"}),(0,t.jsxs)("span",{children:["Small (Fast): ",z.percentSmall,"%"]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-amber-500"}),(0,t.jsxs)("span",{children:["Large (Slow): ",z.percentLarge,"%"]})]})]})]})}),(0,t.jsx)(d.f,{position:[6,3,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:"bg-gray-900/90 text-white px-3 py-2 rounded text-xs max-w-[200px]",children:[(0,t.jsx)("div",{className:"font-bold text-amber-400 mb-2",children:"How Natural Selection Works"}),(0,t.jsxs)("div",{className:"space-y-1 text-gray-300",children:[(0,t.jsx)("div",{children:"1. Environment favors certain traits"}),(0,t.jsx)("div",{children:"2. Camouflaged organisms survive more"}),(0,t.jsx)("div",{children:"3. Small organisms escape faster"}),(0,t.jsx)("div",{children:"4. Survivors pass traits to offspring"}),(0,t.jsx)("div",{children:"5. Population adapts over generations"})]}),(0,t.jsxs)("div",{className:"mt-2 pt-2 border-t border-gray-700",children:[(0,t.jsx)("div",{className:"text-green-400",children:"✓ Camouflaged = Less visible"}),(0,t.jsx)("div",{className:"text-blue-400",children:"✓ Small = Fast escape"})]})]})}),(0,t.jsx)(d.f,{position:[0,2.5,-3],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-red-600/90 text-white px-3 py-1 rounded text-xs",children:"🔴 Predator Hunts Visible Organisms"})}),(0,t.jsx)(d.f,{position:[0,-1.8,3],distanceFactor:15,children:(0,t.jsxs)("div",{className:"bg-gray-900/90 text-white px-4 py-2 rounded-lg text-sm",children:["Surviving to Next Generation: ",(0,t.jsxs)("span",{className:"font-bold text-yellow-400",children:[z.percentSurviving,"%"]})]})})]})]})}e.s(["default",0,function(){let[e,l]=(0,i.useState)(!0),[c,d]=(0,i.useState)(1),[u,f]=(0,i.useState)(0),[m,p]=(0,i.useState)(!0),[g,v]=(0,i.useState)(!1),[x,y]=(0,i.useState)(.15),[b,S]=(0,i.useState)(1),[w,M]=(0,i.useState)(40),[j,E]=(0,i.useState)(1),[A,z]=(0,i.useState)({generation:0,populationCount:40,percentGreen:50,percentRed:50,percentSmall:50,percentLarge:50,averageSize:.5,percentSurviving:100,environmentPhase:"Grassland"}),L=(0,i.useCallback)(()=>{l(e=>!e)},[]),_=(0,i.useCallback)(()=>{f(e=>e+1)},[]),P=(0,i.useCallback)(e=>{d(e)},[]),C=(0,i.useCallback)(e=>{z(e)},[]),R=(0,i.useMemo)(()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(o.E,{title:"Evolution Parameters",children:[(0,t.jsx)(o.p,{label:"Mutation Rate",value:x,min:0,max:.5,step:.05,onChange:y,color:"#22c55e",decimals:2}),(0,t.jsx)(o.p,{label:"Predator Speed",value:b,min:.5,max:2,step:.1,onChange:S,color:"#ef4444",decimals:1}),(0,t.jsx)(o.p,{label:"Initial Population",value:w,min:20,max:80,step:5,onChange:M,color:"#3b82f6",decimals:0}),(0,t.jsx)(o.p,{label:"Generation Speed",value:j,min:.5,max:3,step:.1,onChange:E,color:"#fbbf24",decimals:1})]}),(0,t.jsxs)("div",{className:"bg-green-50/50 rounded-lg p-3 border border-green-200/50",children:[(0,t.jsx)("div",{className:"text-xs text-gray-600 mb-2 font-medium",children:"Natural Selection Info"}),(0,t.jsxs)("div",{className:"text-xs text-gray-500 space-y-1",children:[(0,t.jsx)("div",{children:"• Green organisms are camouflaged in grass"}),(0,t.jsx)("div",{children:"• Red organisms are visible to predators"}),(0,t.jsx)("div",{children:"• Small organisms move faster"}),(0,t.jsx)("div",{children:"• Environment changes every 15 seconds"}),(0,t.jsx)("div",{children:"• Survivors reproduce with mutations"})]})]}),(0,t.jsx)("button",{onClick:_,className:"w-full mt-4 px-4 py-2 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] rounded-lg border border-[#22c55e]/50 transition-colors text-sm font-medium",children:"Reset Simulation"})]}),[x,b,w,j,_]),U=(0,i.useMemo)(()=>(0,t.jsx)(o.Z,{data:{generation:{value:A.generation,unit:"gen",color:"#22c55e",decimals:0},population:{value:A.populationCount,unit:"organisms",color:"#34d399",decimals:0},green:{value:A.percentGreen,unit:"camouflaged",color:"#22c55e",decimals:0},red:{value:A.percentRed,unit:"visible",color:"#ef4444",decimals:0},small:{value:A.percentSmall,unit:"fast",color:"#3b82f6",decimals:0},large:{value:A.percentLarge,unit:"slow",color:"#f59e0b",decimals:0},surviving:{value:A.percentSurviving,unit:"%",color:"#fbbf24",decimals:0}},columns:2}),[A]),N=(0,i.useMemo)(()=>(0,t.jsx)(a.f,{isVisible:g,onToggle:()=>v(e=>!e),children:U}),[g,U]);return(0,t.jsxs)("div",{className:"w-full h-screen relative",children:[(0,t.jsx)(n.f,{title:"Natural Selection",description:"Watch evolution in action: environment changes favor different traits, and survivors pass on their genes",cameraPosition:[0,8,12],backgroundColor:"#0a0a0f",controls:null,dataPanel:N,children:(0,t.jsx)(h,{onDataChange:C,isPlaying:e,simulationSpeed:c,resetTrigger:u,mutationRate:x,predatorSpeed:b,initialPopulation:w,generationSpeed:j})}),(0,t.jsx)(r.f,{isPlaying:e,onPlayPause:L,onReset:_,speed:c,onSpeedChange:P,timeElapsed:0}),m&&(0,t.jsx)(s.f,{initialPosition:{x:window.innerWidth-340,y:80},children:R}),!m&&(0,t.jsx)("button",{onClick:()=>p(!0),className:"fixed top-20 right-4 z-20 px-4 py-2 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] rounded-lg border border-[#22c55e]/50 transition-colors text-sm font-medium",children:"Show Controls"})]})}],50319)}]);