(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(90072),a=e.i(48546),o=s,l=s;let c=new l.VQ,d=new l.cE;class u extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(i,3,0)),this.setAttribute("instanceEnd",new l.Zq(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.hC(i,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(n,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,m=e.i(8560),p=e.i(31497);class h extends f.Zg{constructor(e){super({type:"LineMaterial",uniforms:f.SP.clone(f.SP.merge([m.O.common,m.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=p.f>=125?"uv1":"uv2",v=new o.$i,g=new o.cE,y=new o.cE,b=new o.$i,S=new o.$i,w=new o.$i,E=new o.cE,j=new o.nd,M=new o._i,A=new o.cE,_=new o.VQ,P=new o.L0,L=new o.$i;function z(e,t,n){return L.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),L.multiplyScalar(1/L.w),L.x=i/n.width,L.y=i/n.height,L.applyMatrix4(e.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}class C extends o.kE{constructor(e=new u,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)g.fromBufferAttribute(t,e),y.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+g.distanceTo(y);let r=new o.hC(n,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(r,1,1)),this}raycast(e,n){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),P.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*i;else{let e=Math.max(l.near,P.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(P.radius+=r,!1!==t.intersectsSphere(P)){if(null===u.boundingBox&&u.computeBoundingBox(),_.copy(u.boundingBox).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,_.distanceToPoint(t.origin));s=z(l,e,f.resolution)}_.expandByScalar(s),!1!==t.intersectsBox(_)&&(a?function(e,n){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){M.start.fromBufferAttribute(a,s),M.end.fromBufferAttribute(l,s),M.applyMatrix4(r);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(M.start,M.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[x]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),m=-n.near;t.at(1,w),w.w=1,w.applyMatrix4(n.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=a.x/2,w.y*=a.y/2,w.z=0,E.copy(w),j.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(d,n),S.fromBufferAttribute(u,n),b.w=1,S.w=1,b.applyMatrix4(j),S.applyMatrix4(j),b.z>m&&S.z>m)continue;if(b.z>m){let e=b.z-S.z,t=(b.z-m)/e;b.lerp(S,t)}else if(S.z>m){let e=S.z-b.z,t=(S.z-m)/e;S.lerp(b,t)}b.applyMatrix4(s),S.applyMatrix4(s),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=a.x/2,b.y*=a.y/2,S.x*=a.x/2,S.y*=a.y/2,M.start.copy(b),M.start.z=0,M.end.copy(S),M.end.z=0;let c=M.closestPointToPointParameter(E,!0);M.at(c,A);let f=o.rB.lerp(b.z,S.z,c),p=f>=-1&&f<=1,h=E.distanceTo(A)<.5*i;if(p&&h){M.start.fromBufferAttribute(d,n),M.end.fromBufferAttribute(u,n),M.start.applyMatrix4(l),M.end.applyMatrix4(l);let i=new o.cE,s=new o.cE;t.distanceSqToSegment(M.start,M.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class U extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class N extends C{constructor(e=new U,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let O=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},m){var p,x;let v=(0,a.f)(e=>e.size),g=r.useMemo(()=>c?new C:new N,[c]),[y]=r.useState(()=>new h),b=(null==i||null==(p=i[0])?void 0:p.length)===4?4:3,S=r.useMemo(()=>{let n=c?new u:new U,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.cE||e instanceof s.$i?[e.x,e.y,e.z]:e instanceof s.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Es?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,c,i,b]);return r.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),r.useLayoutEffect(()=>{d?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[d,y]),r.useEffect(()=>()=>{S.dispose(),y.dispose()},[S]),r.createElement("primitive",(0,n.f)({object:g,ref:m},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,n.f)({object:y,attach:"material",color:t,vertexColors:!!i,resolution:[v.width,v.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===b},f)))});e.s(["f",0,O],43216)},60099,e=>{"use strict";let t,i;var n=e.i(31067),r=e.i(71645),s=e.i(88014),a=e.i(90072),o=e.i(48546),l=e.i(94800);let c=new a.cE,d=new a.cE,u=new a.cE,f=new a.wq;function m(e,t,i){let n=c.setFromMatrixPosition(e.matrixWorld);n.project(t);let r=i.width/2,s=i.height/2;return[n.x*r+r,-(n.y*s)+s]}let p=e=>1e-10>Math.abs(e)?0:e;function h(e,t,i=""){let n="matrix3d(";for(let i=0;16!==i;i++)n+=p(t[i]*e.elements[i])+(15!==i?",":")");return i+n}let x=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>h(e,t)),v=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>h(e,i(t),"translate(-50%,-50%)")),g=r.forwardRef(({children:e,eps:t=.001,style:i,className:h,prepend:g,center:y,fullscreen:b,portal:S,distanceFactor:w,sprite:E=!1,transform:j=!1,occlude:M,onOcclude:A,castShadow:_,receiveShadow:P,material:L,geometry:z,zIndexRange:C=[0x1000037,0],calculatePosition:U=m,as:N="div",wrapperClass:O,pointerEvents:R="auto",...T},D)=>{let{gl:B,camera:W,scene:F,size:I,raycaster:H,events:k,viewport:G}=(0,o.f)(),[$]=r.useState(()=>document.createElement(N)),q=r.useRef(null),V=r.useRef(null),Z=r.useRef(0),J=r.useRef([0,0]),K=r.useRef(null),Q=r.useRef(null),X=(null==S?void 0:S.current)||k.connected||B.domElement.parentNode,Y=r.useRef(null),ee=r.useRef(!1),et=r.useMemo(()=>{var e;return M&&"blending"!==M||Array.isArray(M)&&M.length&&(e=M[0])&&"object"==typeof e&&"current"in e},[M]);r.useLayoutEffect(()=>{let e=B.domElement;M&&"blending"===M?(e.style.zIndex=`${Math.floor(C[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[M]),r.useLayoutEffect(()=>{if(V.current){let e=q.current=s.createRoot($);if(F.updateMatrixWorld(),j)$.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=U(V.current,W,I);$.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return X&&(g?X.prepend($):X.appendChild($)),()=>{X&&X.removeChild($),e.unmount()}}},[X,j]),r.useLayoutEffect(()=>{O&&($.className=O)},[O]);let ei=r.useMemo(()=>j?{position:"absolute",top:0,left:0,width:I.width,height:I.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:y?"translate3d(-50%,-50%,0)":"none",...b&&{top:-I.height/2,left:-I.width/2,width:I.width,height:I.height},...i},[i,y,b,I,j]),en=r.useMemo(()=>({position:"absolute",pointerEvents:R}),[R]);r.useLayoutEffect(()=>{var t,n;ee.current=!1,j?null==(t=q.current)||t.render(r.createElement("div",{ref:K,style:ei},r.createElement("div",{ref:Q,style:en},r.createElement("div",{ref:D,className:h,style:i,children:e})))):null==(n=q.current)||n.render(r.createElement("div",{ref:D,style:ei,className:h,children:e}))});let er=r.useRef(!0);(0,l.f)(e=>{if(V.current){W.updateMatrixWorld(),V.current.updateWorldMatrix(!0,!1);let e=j?J.current:U(V.current,W,I);if(j||Math.abs(Z.current-W.zoom)>t||Math.abs(J.current[0]-e[0])>t||Math.abs(J.current[1]-e[1])>t){var i;let t,n,r,s,o=(i=V.current,t=c.setFromMatrixPosition(i.matrixWorld),n=d.setFromMatrixPosition(W.matrixWorld),r=t.sub(n),s=W.getWorldDirection(u),r.angleTo(s)>Math.PI/2),l=!1;et&&(Array.isArray(M)?l=M.map(e=>e.current):"blending"!==M&&(l=[F]));let m=er.current;l?er.current=function(e,t,i,n){let r=c.setFromMatrixPosition(e.matrixWorld),s=r.clone();s.project(t),f.set(s.x,s.y),i.setFromCamera(f,t);let a=i.intersectObjects(n,!0);if(a.length){let e=a[0].distance;return r.distanceTo(i.ray.origin)<e}return!0}(V.current,W,H,l)&&!o:er.current=!o,m!==er.current&&(A?A(!er.current):$.style.display=er.current?"block":"none");let h=Math.floor(C[0]/2),g=M?et?[C[0],h]:[h-1,0]:C;if($.style.zIndex=`${function(e,t,i){if(t instanceof a.zm||t instanceof a.Sc){let n=c.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld),s=n.distanceTo(r),a=(i[1]-i[0])/(t.far-t.near),o=i[1]-a*t.far;return Math.round(a*s+o)}}(V.current,W,g)}`,j){let[e,t]=[I.width/2,I.height/2],i=W.projectionMatrix.elements[5]*t,{isOrthographicCamera:n,top:r,left:s,bottom:a,right:o}=W,l=x(W.matrixWorldInverse),c=n?`scale(${i})translate(${p(-(o+s)/2)}px,${p((r+a)/2)}px)`:`translateZ(${i}px)`,d=V.current.matrixWorld;E&&((d=W.matrixWorldInverse.clone().transpose().copyPosition(d).scale(V.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),$.style.width=I.width+"px",$.style.height=I.height+"px",$.style.perspective=n?"":`${i}px`,K.current&&Q.current&&(K.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,Q.current.style.transform=v(d,1/((w||10)/400)))}else{let t=void 0===w?1:function(e,t){if(t instanceof a.Sc)return t.zoom;if(!(t instanceof a.zm))return 1;{let i=c.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(n))}}(V.current,W)*w;$.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}J.current=e,Z.current=W.zoom}}if(!et&&Y.current&&!ee.current)if(j){if(K.current){let e=K.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=W;if(t||z)T.scale&&(Array.isArray(T.scale)?T.scale instanceof a.cE?Y.current.scale.copy(T.scale.clone().divideScalar(1)):Y.current.scale.set(1/T.scale[0],1/T.scale[1],1/T.scale[2]):Y.current.scale.setScalar(1/T.scale));else{let t=(w||10)/400,i=e.clientWidth*t,n=e.clientHeight*t;Y.current.scale.set(i,n,1)}ee.current=!0}}}else{let t=$.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/G.factor,i=t.clientWidth*e,n=t.clientHeight*e;Y.current.scale.set(i,n,1),ee.current=!0}Y.current.lookAt(e.camera.position)}});let es=r.useMemo(()=>({vertexShader:j?void 0:`
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
      `}),[j]);return r.createElement("group",(0,n.f)({},T,{ref:V}),M&&!et&&r.createElement("mesh",{castShadow:_,receiveShadow:P,ref:Y},z||r.createElement("planeGeometry",null),L||r.createElement("shaderMaterial",{side:a.Vs,vertexShader:es.vertexShader,fragmentShader:es.fragmentShader})))});e.s(["f",0,g])},56420,e=>{"use strict";var t=e.i(71645);let i=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:n,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...u},f)=>{let{size:m=24,strokeWidth:p=2,absoluteStrokeWidth:h=!1,color:x="currentColor",className:v=""}=(0,t.useContext)(s)??{},g=o??h?24*Number(a??p)/Number(n??m):a??p;return(0,t.createElement)("svg",{ref:f,...r,width:n??m??r.width,height:n??m??r.height,stroke:e??x,strokeWidth:g,className:i("lucide",v,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:i(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=n(e),s}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,i)=>{t.exports=e.r(76562)},18293,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(92989),r=e.i(94800),s=e.i(43216),a=e.i(60099),o=e.i(90072);function l({position:e,value:i,maxValue:n,color:r,label:s}){let o=Math.max(.1,i/n*3);return(0,t.jsxs)("group",{position:e,children:[(0,t.jsxs)("mesh",{position:[0,-.05,0],children:[(0,t.jsx)("boxGeometry",{args:[1.5*.3,.1,1.5*.3]}),(0,t.jsx)("meshStandardMaterial",{color:"#222",metalness:.5,roughness:.5})]}),(0,t.jsxs)("mesh",{position:[0,o/2,0],children:[(0,t.jsx)("boxGeometry",{args:[.3,o,.3]}),(0,t.jsx)("meshStandardMaterial",{color:r,metalness:.3,roughness:.4,emissive:r,emissiveIntensity:.2})]}),(0,t.jsx)(a.f,{position:[.3,.5,0],center:!0,distanceFactor:8,children:(0,t.jsxs)("div",{className:"text-[9px] font-bold whitespace-nowrap pointer-events-none select-none",style:{color:r,backgroundColor:"rgba(0,0,0,0.7)",padding:"2px 6px",borderRadius:"4px"},children:[s,": ",i.toFixed(2)," J"]})})]})}function c({onDataChange:e,mass:n=2,springConstant:f=50,damping:m=.3,initialDisplacement:p=2,numberOfMasses:h=1,showTrail:x=!0,showVectors:v=!0,showEnergyBars:g=!0,isPlaying:y=!0,simulationSpeed:b=1,resetTrigger:S}){var w,E,j,M;let A=(0,i.useRef)([]),_=(0,i.useRef)([]),P=(0,i.useRef)(null),L=(0,i.useRef)(null),z=(0,i.useRef)(null),C=(0,i.useRef)({displacements:[],velocities:[],time:0}),U=(0,i.useMemo)(()=>({positions:new Float32Array(2400),colors:new Float32Array(2400),idx:0}),[]),N=(0,i.useMemo)(()=>{let e=new o.ld;return e.setAttribute("position",new o.f5(U.positions,3)),e.setAttribute("color",new o.f5(U.colors,3)),e},[]),O=(0,i.useMemo)(()=>{if(1===h)return -1-9.81*n/f-.3;let e=[],t=2;for(let i=0;i<h;i++)e.push(t=t-3-(h-i)*n*9.81/f-.6);return e},[h,n,f,2,3,.6,9.81]),R=(0,i.useRef)(0);(0,i.useEffect)(()=>{C.current={displacements:Array(h).fill(p),velocities:Array(h).fill(0),time:0},U.idx=0,U.positions.fill(0),U.colors.fill(0)},[S,p,h,U]),(0,i.useEffect)(()=>()=>{N.dispose()},[N]),(0,r.f)((t,i)=>{let r=Math.min(i,.02),s=r*b,a=C.current;if(y&&s>0){let e=Math.max(1,Math.ceil(s/.004)),t=s/e;for(let i=0;i<e;i++)if(1===h){let[e,i]=function(e,t,i,n,r,s){let a=(e,t)=>[t,-(i/n)*e-r/n*t],[o,l]=a(e,t),[c,d]=a(e+o*s*.5,t+l*s*.5),[u,f]=a(e+c*s*.5,t+d*s*.5),[m,p]=a(e+u*s,t+f*s);return[e+s/6*(o+2*c+2*u+m),t+s/6*(l+2*d+2*f+p)]}(a.displacements[0],a.velocities[0],f,n,m,t);a.displacements[0]=e,a.velocities[0]=i}else{let e=[...a.displacements],i=[...a.velocities];for(let r=0;r<h;r++){let s=a.displacements[r],o=a.velocities[r],l=0,c=((l=0===r?-f*s+f*(a.displacements[1]-s):r===h-1?f*(a.displacements[r-1]-s):f*(a.displacements[r-1]-s)+f*(a.displacements[r+1]-s))+-m*o)/n;i[r]=o+c*t,e[r]=s+i[r]*t}a.displacements=e,a.velocities=i}a.time+=s}let l=Array.isArray(O)?O:[O];for(let e=0;e<h;e++)if(A.current[e]){let t=l[e]+a.displacements[e];A.current[e].position.y=t}let c=2;for(let e=0;e<h;e++)if(_.current[e]){let t=l[e]+a.displacements[e]+.3;c=0===e?2:l[e-1]+a.displacements[e-1]+.3;let i=_.current[e];if(i){for(;i.children.length>0;)i.remove(i.children[0]);let n=[],r=c-t,s=(8+2*e)*4;for(let t=0;t<=s;t++){let i=c-t/s*r,a=0,o=t%4;1===o?a=.3+.1*e:3===o&&(a=-(.3+.1*e)),n.push([a,i,0])}let a=new o.ld().setFromPoints(n.map(e=>new o.cE(...e))),l=new o.NQ({color:0xaaaaaa,linewidth:2}),d=new o.DL(a,l);i.add(d)}}if(x&&y){let e=h-1,t=l[e]+a.displacements[e],i=U.idx%800;U.positions[3*i]=0,U.positions[3*i+1]=t,U.positions[3*i+2]=0;let n=Math.min(Math.abs(a.velocities[e])/4,1);if(U.colors[3*i]=.3+.7*n,U.colors[3*i+1]=.5+.3*n,U.colors[3*i+2]=1-.5*n,U.idx++,P.current){let e=P.current.geometry.attributes.position,t=P.current.geometry.attributes.color;e.needsUpdate=!0,t.needsUpdate=!0,P.current.geometry.setDrawRange(0,Math.min(U.idx,800))}}let d=h-1,u=l[d]+a.displacements[d],p=a.velocities[d],g=-f*a.displacements[d],S=-m*p;if(v){if(L.current){let e=.3*Math.abs(p);L.current.position.set(-1.5,u,0),L.current.scale.set(1,Math.max(e,.01),1),L.current.rotation.z=p>0?Math.PI:0,L.current.visible=Math.abs(p)>.05}if(z.current){let e=g+S,t=.02*Math.abs(e);z.current.position.set(1.5,u,0),z.current.scale.set(1,Math.max(t,.01),1),z.current.rotation.z=e>0?Math.PI:0,z.current.visible=Math.abs(e)>.1}}if(R.current+=r,R.current>=.066){var w;R.current=0;let t=.5*n*p*p,i=.5*f*(w=a.displacements[d])*w,r=9.81*n*u;e?.({period:2*Math.PI*Math.sqrt(n/f),frequency:1/(2*Math.PI*Math.sqrt(n/f)),angularFrequency:Math.sqrt(f/n),displacement:a.displacements[d],velocity:p,kineticEnergy:t,springPotentialEnergy:i,gravitationalPotentialEnergy:r,totalEnergy:t+i+r,springForce:g,dampingForce:S,elapsedTime:a.time,equilibriumPosition:l[d]})}});let T=(0,i.useMemo)(()=>(.5*f*p*p+9.81*n*(Array.isArray(O)?O[h-1]:O))*1.5||100,[f,p,n,O,h,9.81]);return(0,t.jsxs)("group",{children:[(0,t.jsx)("ambientLight",{intensity:.4}),(0,t.jsx)("directionalLight",{position:[10,20,10],intensity:1,castShadow:!0}),(0,t.jsx)("directionalLight",{position:[-10,15,-10],intensity:.3}),(0,t.jsx)("pointLight",{position:[0,5,8],intensity:.5,color:"#8b5cf6"}),(0,t.jsx)(u,{ceilingY:2,width:12}),(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-15,0],receiveShadow:!0,children:[(0,t.jsx)("planeGeometry",{args:[40,40]}),(0,t.jsx)("meshStandardMaterial",{color:"#050510",roughness:.95})]}),(0,t.jsx)("gridHelper",{args:[40,40,"#1a1a3e","#0a0a1e"],position:[0,-14.99,0]}),Array.isArray(O)?O.map((e,i)=>(0,t.jsxs)("group",{children:[(0,t.jsx)(s.f,{points:[[2,e,0],[4,e,0]],color:"#22c55e",lineWidth:2,dashed:!0,dashSize:.2,gapSize:.1}),(0,t.jsxs)("mesh",{position:[4.5,e,0],children:[(0,t.jsx)("sphereGeometry",{args:[.05,8,8]}),(0,t.jsx)("meshBasicMaterial",{color:"#22c55e"})]})]},i)):(0,t.jsxs)("group",{children:[(0,t.jsx)(s.f,{points:[[2,O,0],[4,O,0]],color:"#22c55e",lineWidth:2,dashed:!0,dashSize:.2,gapSize:.1}),(0,t.jsxs)("mesh",{position:[4.5,O,0],children:[(0,t.jsx)("sphereGeometry",{args:[.05,8,8]}),(0,t.jsx)("meshBasicMaterial",{color:"#22c55e"})]})]}),Array.from({length:h}).map((e,i)=>(0,t.jsx)("group",{ref:e=>{_.current[i]=e}},i)),Array.from({length:h}).map((e,i)=>{let r=(Array.isArray(O)?O[i]:O)+p;return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{ref:e=>{A.current[i]=e},position:[0,r,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[1.2,.6,1.2]}),(0,t.jsx)("meshStandardMaterial",{color:"#4f8fff",metalness:.7,roughness:.2,emissive:"#4f8fff",emissiveIntensity:.2})]}),(0,t.jsx)(a.f,{position:[.6+.3,0,0],center:!0,children:(0,t.jsxs)("div",{className:"text-[10px] text-blue-300 bg-black/50 px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none select-none",children:["m",h>1?`${i+1}`:"",": ",n.toFixed(1)," kg"]})})]},i)}),x&&(0,t.jsx)("points",{ref:P,geometry:N,children:(0,t.jsx)("pointsMaterial",{size:.1,vertexColors:!0,transparent:!0,opacity:.7,sizeAttenuation:!0,blending:o.tq,depthWrite:!1})}),v&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("group",{ref:L,children:(0,t.jsx)(d,{color:"#22c55e",label:"v"})}),(0,t.jsx)("group",{ref:z,children:(0,t.jsx)(d,{color:"#ef4444",label:"F"})})]}),g&&(0,t.jsxs)("group",{position:[-6,0,0],children:[(0,t.jsx)(l,{position:[0,0,0],value:.5*n*(w=Math.abs(C.current.velocities[h-1]||0))*w,maxValue:T,color:"#22c55e",label:"KE"}),(0,t.jsx)(l,{position:[1.5,0,0],value:.5*f*(E=C.current.displacements[h-1]||0)*E,maxValue:T,color:"#f59e0b",label:"PE_spring"}),(0,t.jsx)(l,{position:[3,0,0],value:9.81*n*(Array.isArray(O)?O[h-1]:O),maxValue:T,color:"#3b82f6",label:"PE_grav"}),(0,t.jsx)(l,{position:[4.5,0,0],value:.5*n*(j=Math.abs(C.current.velocities[h-1]||0))*j+.5*f*(M=C.current.displacements[h-1]||0)*M+9.81*n*(Array.isArray(O)?O[h-1]:O),maxValue:T,color:"#a855f7",label:"Total"})]})]})}function d({color:e,label:i}){return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{position:[0,-1,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.05,.05,2,8]}),(0,t.jsx)("meshStandardMaterial",{color:e,emissive:e,emissiveIntensity:.4})]}),(0,t.jsxs)("mesh",{position:[0,0,0],children:[(0,t.jsx)("coneGeometry",{args:[.12,.35,8]}),(0,t.jsx)("meshStandardMaterial",{color:e,emissive:e,emissiveIntensity:.4})]}),(0,t.jsx)(a.f,{position:[.25,-.5,0],center:!0,children:(0,t.jsx)("div",{className:"text-[9px] font-bold px-1 py-0.5 rounded pointer-events-none select-none",style:{color:e,backgroundColor:"rgba(0,0,0,0.6)"},children:i})})]})}function u({ceilingY:e,width:i}){let n={color:"#2a2a3e",metalness:.8,roughness:.25};return(0,t.jsxs)("group",{children:[(0,t.jsxs)("mesh",{position:[0,e+.2,0],castShadow:!0,receiveShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[i,.4,4]}),(0,t.jsx)("meshStandardMaterial",{...n})]}),(0,t.jsxs)("mesh",{position:[0,e+.4*.4,0],children:[(0,t.jsx)("boxGeometry",{args:[i,.06,4.5]}),(0,t.jsx)("meshStandardMaterial",{...n})]}),(0,t.jsxs)("mesh",{position:[0,e-.4*.4,0],children:[(0,t.jsx)("boxGeometry",{args:[i,.06,4.5]}),(0,t.jsx)("meshStandardMaterial",{...n})]}),(0,t.jsxs)("mesh",{position:[-i/2+.3,e-2,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,4,.3]}),(0,t.jsx)("meshStandardMaterial",{...n})]}),(0,t.jsxs)("mesh",{position:[i/2-.3,e-2,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.3,4,.3]}),(0,t.jsx)("meshStandardMaterial",{...n})]}),(0,t.jsxs)("mesh",{position:[0,e-.2,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.25,.25,.3,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#555",metalness:.9,roughness:.1})]}),[-1,1].map(n=>(0,t.jsxs)("mesh",{position:[n*(i/2-.3),e-4.15,0],receiveShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[1,.1,1]}),(0,t.jsx)("meshStandardMaterial",{color:"#1a1a2e",metalness:.7,roughness:.3})]},n))]})}e.i(81413);var f=e.i(48205),m=e.i(68647),p=e.i(82192),h=e.i(14228),x=e.i(4685);e.s(["default",0,function(){let e=(0,n.useRouter)(),[r,s]=(0,i.useState)(null),[a,o]=(0,i.useState)(!0),[l,d]=(0,i.useState)(!0),[u,v]=(0,i.useState)(1),[g,y]=(0,i.useState)(0),[b,S]=(0,i.useState)(2),[w,E]=(0,i.useState)(50),[j,M]=(0,i.useState)(.3),[A,_]=(0,i.useState)(2),[P,L]=(0,i.useState)(1),z=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)(m.E,{title:"Physics Parameters",children:[(0,t.jsx)(m.p,{label:"Mass (m)",value:b,unit:"kg",min:.5,max:10,step:.5,color:"#4f8fff",onChange:S,decimals:1}),(0,t.jsx)(m.p,{label:"Spring Constant (k)",value:w,unit:"N/m",min:10,max:200,step:5,color:"#22c55e",onChange:E,decimals:0}),(0,t.jsx)(m.p,{label:"Damping (b)",value:j,unit:"Ns/m",min:0,max:2,step:.1,color:"#ef4444",onChange:M,decimals:2}),(0,t.jsx)(m.p,{label:"Initial Displacement",value:A,unit:"m",min:.5,max:4,step:.5,color:"#f59e0b",onChange:_,decimals:1}),(0,t.jsx)(m.p,{label:"Number of Masses",value:P,unit:"",min:1,max:3,step:1,color:"#a855f7",onChange:e=>L(Math.round(e)),decimals:0})]}),(0,t.jsx)("button",{onClick:()=>e.push("/experiments/spring-mass/details"),className:"w-full py-2.5 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-700 font-medium text-sm rounded-lg transition-all border border-amber-300/50 flex items-center justify-center gap-2",children:"📖 View Experiment Details"})]}),C=r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m.Z,{data:{period:{value:r.period,unit:"s",color:"#f59e0b",decimals:3},frequency:{value:r.frequency,unit:"Hz",color:"#8b5cf6",decimals:2},displacement:{value:r.displacement,unit:"m",color:"#ec4899",decimals:2},velocity:{value:r.velocity,unit:"m/s",color:"#22c55e",decimals:2},springForce:{value:r.springForce,unit:"N",color:"#ef4444",decimals:1},dampingForce:{value:r.dampingForce,unit:"N",color:"#3b82f6",decimals:2}},columns:2}),(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-gray-700",children:(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"p-2 bg-gray-800/50 rounded",children:[(0,t.jsx)("span",{className:"text-gray-500",children:"Kinetic Energy"}),(0,t.jsxs)("div",{className:"font-mono text-green-400",children:[r.kineticEnergy.toFixed(2)," J"]})]}),(0,t.jsxs)("div",{className:"p-2 bg-gray-800/50 rounded",children:[(0,t.jsx)("span",{className:"text-gray-500",children:"Spring PE"}),(0,t.jsxs)("div",{className:"font-mono text-amber-400",children:[r.springPotentialEnergy.toFixed(2)," J"]})]}),(0,t.jsxs)("div",{className:"p-2 bg-gray-800/50 rounded",children:[(0,t.jsx)("span",{className:"text-gray-500",children:"Gravitational PE"}),(0,t.jsxs)("div",{className:"font-mono text-blue-400",children:[r.gravitationalPotentialEnergy.toFixed(2)," J"]})]}),(0,t.jsxs)("div",{className:"p-2 bg-gray-800/50 rounded",children:[(0,t.jsx)("span",{className:"text-gray-500",children:"Total Energy"}),(0,t.jsxs)("div",{className:"font-mono text-purple-400",children:[r.totalEnergy.toFixed(2)," J"]})]})]})})]}):(0,t.jsx)("div",{className:"text-center text-gray-500 text-sm py-8",children:"Waiting for simulation data..."});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f.f,{title:"Spring-Mass System",description:"Explore simple harmonic motion with Hooke's Law: F = -kx - bv. Supports 1-3 masses in series.",cameraPosition:[18,10,18],backgroundColor:"#050510",controls:null,dataPanel:null,children:(0,t.jsx)(c,{onDataChange:s,mass:b,springConstant:w,damping:j,initialDisplacement:A,numberOfMasses:P,resetTrigger:g,isPlaying:l,simulationSpeed:u})}),(0,t.jsx)(h.f,{isPlaying:l,onPlayPause:()=>d(e=>!e),onReset:()=>{y(e=>e+1),d(!0),v(1)},speed:u,onSpeedChange:v,timeElapsed:r?.elapsedTime??0}),(0,t.jsx)(p.f,{title:"⚙️ Spring-Mass Parameters",initialPosition:{x:20,y:80},children:z}),(0,t.jsx)(x.f,{isVisible:a,onToggle:()=>o(!a),children:C})]})}],18293)}]);