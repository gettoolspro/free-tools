(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43216,e=>{"use strict";let t,s;var i=e.i(31067),r=e.i(71645),n=e.i(90072),a=e.i(48546),o=n,l=n;let c=new l.VQ,d=new l.cE;class h extends l.Kx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.ki([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.ki([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,s=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),s.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let s=new l.hC(t,6,1);return this.setAttribute("instanceStart",new l.Zq(s,3,0)),this.setAttribute("instanceEnd",new l.Zq(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let s;e instanceof Float32Array?s=e:Array.isArray(e)&&(s=new Float32Array(e));let i=new l.hC(s,2*t,1);return this.setAttribute("instanceColorStart",new l.Zq(i,t,0)),this.setAttribute("instanceColorEnd",new l.Zq(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.nw(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.VQ);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.L0),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let s=this.boundingSphere.center;this.boundingBox.getCenter(s);let i=0;for(let r=0,n=e.count;r<n;r++)d.fromBufferAttribute(e,r),i=Math.max(i,s.distanceToSquared(d)),d.fromBufferAttribute(t,r),i=Math.max(i,s.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var u=n,p=e.i(8560),f=e.i(31497);class m extends u.Zg{constructor(e){super({type:"LineMaterial",uniforms:u.SP.clone(u.SP.merge([p.O.common,p.O.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new u.wq(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=f.f>=125?"uv1":"uv2",g=new o.$i,y=new o.cE,v=new o.cE,b=new o.$i,w=new o.$i,j=new o.$i,S=new o.cE,M=new o.nd,E=new o._i,P=new o.cE,C=new o.VQ,A=new o.L0,_=new o.$i;function I(e,t,i){return _.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),_.multiplyScalar(1/_.w),_.x=s/i.width,_.y=s/i.height,_.applyMatrix4(e.projectionMatrixInverse),_.multiplyScalar(1/_.w),Math.abs(Math.max(_.x,_.y))}class L extends o.kE{constructor(e=new h,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,s=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,n=t.count;e<n;e++,r+=2)y.fromBufferAttribute(t,e),v.fromBufferAttribute(s,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+y.distanceTo(v);let r=new o.hC(i,2,1);return e.setAttribute("instanceDistanceStart",new o.Zq(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.Zq(r,1,1)),this}raycast(e,i){let r,n,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,h=this.geometry,u=this.material;if(s=u.linewidth+c,null===h.boundingSphere&&h.computeBoundingSphere(),A.copy(h.boundingSphere).applyMatrix4(d),a)r=.5*s;else{let e=Math.max(l.near,A.distanceToPoint(t.origin));r=I(l,e,u.resolution)}if(A.radius+=r,!1!==t.intersectsSphere(A)){if(null===h.boundingBox&&h.computeBoundingBox(),C.copy(h.boundingBox).applyMatrix4(d),a)n=.5*s;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));n=I(l,e,u.resolution)}C.expandByScalar(n),!1!==t.intersectsBox(C)&&(a?function(e,i){let r=e.matrixWorld,n=e.geometry,a=n.attributes.instanceStart,l=n.attributes.instanceEnd,c=Math.min(n.instanceCount,a.count);for(let n=0;n<c;n++){E.start.fromBufferAttribute(a,n),E.end.fromBufferAttribute(l,n),E.applyMatrix4(r);let c=new o.cE,d=new o.cE;t.distanceSqToSegment(E.start,E.end,d,c),d.distanceTo(c)<.5*s&&i.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:n,uv:null,[x]:null})}}(this,i):function(e,i,r){let n=i.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,h=c.attributes.instanceEnd,u=Math.min(c.instanceCount,d.count),p=-i.near;t.at(1,j),j.w=1,j.applyMatrix4(i.matrixWorldInverse),j.applyMatrix4(n),j.multiplyScalar(1/j.w),j.x*=a.x/2,j.y*=a.y/2,j.z=0,S.copy(j),M.multiplyMatrices(i.matrixWorldInverse,l);for(let i=0;i<u;i++){if(b.fromBufferAttribute(d,i),w.fromBufferAttribute(h,i),b.w=1,w.w=1,b.applyMatrix4(M),w.applyMatrix4(M),b.z>p&&w.z>p)continue;if(b.z>p){let e=b.z-w.z,t=(b.z-p)/e;b.lerp(w,t)}else if(w.z>p){let e=w.z-b.z,t=(w.z-p)/e;w.lerp(b,t)}b.applyMatrix4(n),w.applyMatrix4(n),b.multiplyScalar(1/b.w),w.multiplyScalar(1/w.w),b.x*=a.x/2,b.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,E.start.copy(b),E.start.z=0,E.end.copy(w),E.end.z=0;let c=E.closestPointToPointParameter(S,!0);E.at(c,P);let u=o.rB.lerp(b.z,w.z,c),f=u>=-1&&u<=1,m=S.distanceTo(P)<.5*s;if(f&&m){E.start.fromBufferAttribute(d,i),E.end.fromBufferAttribute(h,i),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let s=new o.cE,n=new o.cE;t.distanceSqToSegment(E.start,E.end,n,s),r.push({point:n,pointOnLine:s,distance:t.origin.distanceTo(n),object:e,face:null,faceIndex:i,uv:null,[x]:null})}}}(this,l,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class N extends h{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,s=new Float32Array(2*t);for(let i=0;i<t;i+=3)s[2*i]=e[i],s[2*i+1]=e[i+1],s[2*i+2]=e[i+2],s[2*i+3]=e[i+3],s[2*i+4]=e[i+4],s[2*i+5]=e[i+5];return super.setPositions(s),this}setColors(e,t=3){let s=e.length-t,i=new Float32Array(2*s);if(3===t)for(let r=0;r<s;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<s;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class z extends L{constructor(e=new N,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let O=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:s,linewidth:o,lineWidth:l,segments:c,dashed:d,...u},p){var f,x;let g=(0,a.f)(e=>e.size),y=r.useMemo(()=>c?new L:new z,[c]),[v]=r.useState(()=>new m),b=(null==s||null==(f=s[0])?void 0:f.length)===4?4:3,w=r.useMemo(()=>{let i=c?new h:new N,r=e.map(e=>{let t=Array.isArray(e);return e instanceof n.cE||e instanceof n.$i?[e.x,e.y,e.z]:e instanceof n.wq?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),s){t=0xffffff;let e=s.map(e=>e instanceof n.Es?e.toArray():e);i.setColors(e.flat(),b)}return i},[e,c,s,b]);return r.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),r.useLayoutEffect(()=>{d?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[d,v]),r.useEffect(()=>()=>{w.dispose(),v.dispose()},[w]),r.createElement("primitive",(0,i.f)({object:y,ref:p},u),r.createElement("primitive",{object:w,attach:"geometry"}),r.createElement("primitive",(0,i.f)({object:v,attach:"material",color:t,vertexColors:!!s,resolution:[g.width,g.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===b},u)))});e.s(["f",0,O],43216)},60099,e=>{"use strict";let t,s;var i=e.i(31067),r=e.i(71645),n=e.i(88014),a=e.i(90072),o=e.i(48546),l=e.i(94800);let c=new a.cE,d=new a.cE,h=new a.cE,u=new a.wq;function p(e,t,s){let i=c.setFromMatrixPosition(e.matrixWorld);i.project(t);let r=s.width/2,n=s.height/2;return[i.x*r+r,-(i.y*n)+n]}let f=e=>1e-10>Math.abs(e)?0:e;function m(e,t,s=""){let i="matrix3d(";for(let s=0;16!==s;s++)i+=f(t[s]*e.elements[s])+(15!==s?",":")");return s+i}let x=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>m(e,t)),g=(s=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>m(e,s(t),"translate(-50%,-50%)")),y=r.forwardRef(({children:e,eps:t=.001,style:s,className:m,prepend:y,center:v,fullscreen:b,portal:w,distanceFactor:j,sprite:S=!1,transform:M=!1,occlude:E,onOcclude:P,castShadow:C,receiveShadow:A,material:_,geometry:I,zIndexRange:L=[0x1000037,0],calculatePosition:N=p,as:z="div",wrapperClass:O,pointerEvents:U="auto",...T},R)=>{let{gl:D,camera:k,scene:W,size:B,raycaster:F,events:G,viewport:H}=(0,o.f)(),[$]=r.useState(()=>document.createElement(z)),V=r.useRef(null),q=r.useRef(null),Z=r.useRef(0),K=r.useRef([0,0]),Q=r.useRef(null),X=r.useRef(null),J=(null==w?void 0:w.current)||G.connected||D.domElement.parentNode,Y=r.useRef(null),ee=r.useRef(!1),et=r.useMemo(()=>{var e;return E&&"blending"!==E||Array.isArray(E)&&E.length&&(e=E[0])&&"object"==typeof e&&"current"in e},[E]);r.useLayoutEffect(()=>{let e=D.domElement;E&&"blending"===E?(e.style.zIndex=`${Math.floor(L[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[E]),r.useLayoutEffect(()=>{if(q.current){let e=V.current=n.createRoot($);if(W.updateMatrixWorld(),M)$.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=N(q.current,k,B);$.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return J&&(y?J.prepend($):J.appendChild($)),()=>{J&&J.removeChild($),e.unmount()}}},[J,M]),r.useLayoutEffect(()=>{O&&($.className=O)},[O]);let es=r.useMemo(()=>M?{position:"absolute",top:0,left:0,width:B.width,height:B.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:v?"translate3d(-50%,-50%,0)":"none",...b&&{top:-B.height/2,left:-B.width/2,width:B.width,height:B.height},...s},[s,v,b,B,M]),ei=r.useMemo(()=>({position:"absolute",pointerEvents:U}),[U]);r.useLayoutEffect(()=>{var t,i;ee.current=!1,M?null==(t=V.current)||t.render(r.createElement("div",{ref:Q,style:es},r.createElement("div",{ref:X,style:ei},r.createElement("div",{ref:R,className:m,style:s,children:e})))):null==(i=V.current)||i.render(r.createElement("div",{ref:R,style:es,className:m,children:e}))});let er=r.useRef(!0);(0,l.f)(e=>{if(q.current){k.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=M?K.current:N(q.current,k,B);if(M||Math.abs(Z.current-k.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){var s;let t,i,r,n,o=(s=q.current,t=c.setFromMatrixPosition(s.matrixWorld),i=d.setFromMatrixPosition(k.matrixWorld),r=t.sub(i),n=k.getWorldDirection(h),r.angleTo(n)>Math.PI/2),l=!1;et&&(Array.isArray(E)?l=E.map(e=>e.current):"blending"!==E&&(l=[W]));let p=er.current;l?er.current=function(e,t,s,i){let r=c.setFromMatrixPosition(e.matrixWorld),n=r.clone();n.project(t),u.set(n.x,n.y),s.setFromCamera(u,t);let a=s.intersectObjects(i,!0);if(a.length){let e=a[0].distance;return r.distanceTo(s.ray.origin)<e}return!0}(q.current,k,F,l)&&!o:er.current=!o,p!==er.current&&(P?P(!er.current):$.style.display=er.current?"block":"none");let m=Math.floor(L[0]/2),y=E?et?[L[0],m]:[m-1,0]:L;if($.style.zIndex=`${function(e,t,s){if(t instanceof a.zm||t instanceof a.Sc){let i=c.setFromMatrixPosition(e.matrixWorld),r=d.setFromMatrixPosition(t.matrixWorld),n=i.distanceTo(r),a=(s[1]-s[0])/(t.far-t.near),o=s[1]-a*t.far;return Math.round(a*n+o)}}(q.current,k,y)}`,M){let[e,t]=[B.width/2,B.height/2],s=k.projectionMatrix.elements[5]*t,{isOrthographicCamera:i,top:r,left:n,bottom:a,right:o}=k,l=x(k.matrixWorldInverse),c=i?`scale(${s})translate(${f(-(o+n)/2)}px,${f((r+a)/2)}px)`:`translateZ(${s}px)`,d=q.current.matrixWorld;S&&((d=k.matrixWorldInverse.clone().transpose().copyPosition(d).scale(q.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),$.style.width=B.width+"px",$.style.height=B.height+"px",$.style.perspective=i?"":`${s}px`,Q.current&&X.current&&(Q.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,X.current.style.transform=g(d,1/((j||10)/400)))}else{let t=void 0===j?1:function(e,t){if(t instanceof a.Sc)return t.zoom;if(!(t instanceof a.zm))return 1;{let s=c.setFromMatrixPosition(e.matrixWorld),i=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*s.distanceTo(i))}}(q.current,k)*j;$.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,Z.current=k.zoom}}if(!et&&Y.current&&!ee.current)if(M){if(Q.current){let e=Q.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=k;if(t||I)T.scale&&(Array.isArray(T.scale)?T.scale instanceof a.cE?Y.current.scale.copy(T.scale.clone().divideScalar(1)):Y.current.scale.set(1/T.scale[0],1/T.scale[1],1/T.scale[2]):Y.current.scale.setScalar(1/T.scale));else{let t=(j||10)/400,s=e.clientWidth*t,i=e.clientHeight*t;Y.current.scale.set(s,i,1)}ee.current=!0}}}else{let t=$.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/H.factor,s=t.clientWidth*e,i=t.clientHeight*e;Y.current.scale.set(s,i,1),ee.current=!0}Y.current.lookAt(e.camera.position)}});let en=r.useMemo(()=>({vertexShader:M?void 0:`
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
      `}),[M]);return r.createElement("group",(0,i.f)({},T,{ref:q}),E&&!et&&r.createElement("mesh",{castShadow:C,receiveShadow:A,ref:Y},I||r.createElement("planeGeometry",null),_||r.createElement("shaderMaterial",{side:a.Vs,vertexShader:en.vertexShader,fragmentShader:en.fragmentShader})))});e.s(["f",0,y])},56420,e=>{"use strict";var t=e.i(71645);let s=(...e)=>e.filter((e,t,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===t).join(" ").trim(),i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:i,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:d,...h},u)=>{let{size:p=24,strokeWidth:f=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:g=""}=(0,t.useContext)(n)??{},y=o??m?24*Number(a??f)/Number(i??p):a??f;return(0,t.createElement)("svg",{ref:u,...r,width:i??p??r.width,height:i??p??r.height,stroke:e??x,strokeWidth:y,className:s("lucide",g,l),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(h)&&{"aria-hidden":"true"},...h},[...d.map(([e,s])=>(0,t.createElement)(e,s)),...Array.isArray(c)?c:[c]])});e.s(["f",0,(e,r)=>{let n=(0,t.forwardRef)(({className:n,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:s(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...o}));return n.displayName=i(e),n}],56420)},11241,e=>{"use strict";let t=(0,e.i(56420).f)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["f",0,t],11241)},92989,(e,t,s)=>{t.exports=e.r(76562)},42618,e=>{"use strict";var t=e.i(43476),s=e.i(71645);e.i(81413);var i=e.i(48205),r=e.i(14228),n=e.i(82192),a=e.i(4685),o=e.i(68647),l=e.i(94800),c=e.i(43216),d=e.i(60099),h=e.i(90072);let u=[{maternal:"#3b82f6",paternal:"#ef4444"},{maternal:"#60a5fa",paternal:"#f87171"},{maternal:"#93c5fd",paternal:"#fca5a5"},{maternal:"#2563eb",paternal:"#dc2626"}],p=["Interphase","Prophase","Metaphase","Anaphase","Telophase","Cytokinesis"],f=["Prophase I","Metaphase I","Anaphase I","Telophase I","Prophase II","Metaphase II","Anaphase II","Telophase II"];function m({onDataChange:e,isPlaying:i=!0,simulationSpeed:r=1,resetTrigger:n=0,stage:a=0,mode:o="mitosis",showLabels:x=!0}){let g=(0,s.useRef)({chromosomes:[],progress:0,nucleusOpacity:1,cellPinch:0,spindleOpacity:0}),y=(0,s.useRef)({chromosomes:[],progress:0,nucleusOpacity:1,cellPinch:0,spindleOpacity:0}),v=(0,s.useRef)(0),b=(0,s.useRef)(0),[w,j]=(0,s.useState)({phase:"Interphase",chromosomesCount:46,daughterCells:1,description:"Cell prepares for division. DNA replicates."}),S=(0,s.useCallback)(()=>{let e=[];for(let t=0;t<4;t++){let s=t/4*Math.PI*2;e.push({id:2*t,pairId:t,color:u[t].maternal,homologousColor:u[t].paternal,position:new h.cE(1.5*Math.cos(s),(Math.random()-.5)*.5,1.5*Math.sin(s)),targetPosition:new h.cE,angle:s,condensed:!1,separated:!1,isMaternal:!0,crossedOver:!1,chromatidOffset:0}),e.push({id:2*t+1,pairId:t,color:u[t].paternal,homologousColor:u[t].maternal,position:new h.cE(1.5*Math.cos(s+Math.PI),(Math.random()-.5)*.5,1.5*Math.sin(s+Math.PI)),targetPosition:new h.cE,angle:s+Math.PI,condensed:!1,separated:!1,isMaternal:!1,crossedOver:!1,chromatidOffset:0})}return e},[]);(0,s.useEffect)(()=>{v.current=0,b.current=0,g.current={chromosomes:S(),progress:0,nucleusOpacity:1,cellPinch:0,spindleOpacity:0},y.current={chromosomes:S(),progress:0,nucleusOpacity:1,cellPinch:0,spindleOpacity:0}},[n,S]);let M=(0,s.memo)(({chr:e,isSeparated:s})=>{let i=e.condensed?.5:.7,r=e.crossedOver?e.homologousColor:e.color;return(0,t.jsxs)("group",{position:e.position,children:[(0,t.jsxs)("mesh",{rotation:[0,0,Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[.08,.08,Math.max(.01,i),8]}),(0,t.jsx)("meshStandardMaterial",{color:r,roughness:.4,metalness:.1})]}),(0,t.jsxs)("mesh",{position:[0,i/2,0],children:[(0,t.jsx)("sphereGeometry",{args:[.12,12,12]}),(0,t.jsx)("meshStandardMaterial",{color:e.color,roughness:.3})]}),s?(0,t.jsxs)("mesh",{position:[.4,0,0],rotation:[0,0,Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[.08,.08,Math.max(.01,i),8]}),(0,t.jsx)("meshStandardMaterial",{color:e.color,roughness:.4,metalness:.1})]}):(0,t.jsxs)("mesh",{position:[.15,0,0],rotation:[0,0,Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[.08,.08,Math.max(.01,i),8]}),(0,t.jsx)("meshStandardMaterial",{color:e.color,roughness:.4,metalness:.1,opacity:.8,transparent:!0})]})]})}),E=(0,s.memo)(({position:e,state:i,isMitosis:r,currentStage:n})=>{let a=r?"#f59e0b":"#ec4899",o=(0,s.useMemo)(()=>{let e=[];for(let t=0;t<12;t++){let s=t/12*Math.PI*2,i=.3*Math.cos(s),r=.3*Math.sin(s);e.push([[i,0,r],[3.5*Math.cos(s),0,3.5*Math.sin(s)]])}return e},[]);return(0,t.jsxs)("group",{position:e,children:[(0,t.jsxs)("mesh",{scale:[1-.3*i.cellPinch,1,1],children:[(0,t.jsx)("sphereGeometry",{args:[3.5,32,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:a,transparent:!0,opacity:.15,roughness:.2,metalness:.1,side:h.Vs})]}),i.nucleusOpacity>.01&&(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[2,32,32]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#7c3aed",transparent:!0,opacity:.2*i.nucleusOpacity,roughness:.3,side:h.Vs})]}),n>=1&&n<=3&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[3.8,0,0],children:[(0,t.jsx)("cylinderGeometry",{args:[.15,.15,.4,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#fcd34d",emissive:"#fcd34d",emissiveIntensity:.5})]}),(0,t.jsxs)("mesh",{position:[-3.8,0,0],rotation:[0,0,Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[.15,.15,.4,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#fcd34d",emissive:"#fcd34d",emissiveIntensity:.5})]})]}),i.spindleOpacity>.01&&n>=1&&n<=3&&(0,t.jsx)(t.Fragment,{children:o.map((e,s)=>(0,t.jsx)(c.f,{points:e,color:"#fcd34d",lineWidth:1,opacity:.4*i.spindleOpacity,transparent:!0,dashed:!0,dashSize:.1,gapSize:.05},s))}),2===n&&(0,t.jsx)(c.f,{points:Array.from({length:30},(e,t)=>[(t-15)*.15,0,-.2]),color:"#ffffff",lineWidth:2,opacity:.3,transparent:!0,dashed:!0}),!r&&0===n&&i.progress>40&&(0,t.jsx)(t.Fragment,{children:u.map((e,s)=>(0,t.jsxs)("group",{position:[(s-1.5)*.8,.3,0],children:[(0,t.jsx)(c.f,{points:[[-.1,0,-.1],[.1,0,.1],[.1,0,-.1],[-.1,0,.1]],color:"#f472b6",lineWidth:2,opacity:.8}),(0,t.jsxs)("mesh",{position:[0,.1,0],children:[(0,t.jsx)("sphereGeometry",{args:[.05,8,8]}),(0,t.jsx)("meshStandardMaterial",{color:"#ec4899",emissive:"#ec4899",emissiveIntensity:.6+.3*Math.sin(5*v.current)})]})]},s))}),i.chromosomes.map(e=>{let s=i.progress>50&&(3===n||6===n);return(0,t.jsx)(M,{chr:e,isSeparated:s},e.id)}),(4===n||5===n||7===n)&&(0,t.jsx)(c.f,{points:[[0,-3,0],[0,3,0]],color:a,lineWidth:3,opacity:.5,transparent:!0}),n>=4&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[3.5,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[2,24,24]}),(0,t.jsx)("meshPhysicalMaterial",{color:a,transparent:!0,opacity:.15,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[-3.5,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[2,24,24]}),(0,t.jsx)("meshPhysicalMaterial",{color:a,transparent:!0,opacity:.15,roughness:.2})]}),(4===n||5===n||7===n)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[3.5,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.9,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#7c3aed",transparent:!0,opacity:.2,roughness:.3})]}),(0,t.jsxs)("mesh",{position:[-3.5,0,0],children:[(0,t.jsx)("sphereGeometry",{args:[.9,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#7c3aed",transparent:!0,opacity:.2,roughness:.3})]})]})]}),!r&&n>=7&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("mesh",{position:[3,2.2,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.3,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#f472b6",transparent:!0,opacity:.12,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[3,-2.2,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.3,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#f472b6",transparent:!0,opacity:.12,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[-3,2.2,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.3,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#f472b6",transparent:!0,opacity:.12,roughness:.2})]}),(0,t.jsxs)("mesh",{position:[-3,-2.2,0],children:[(0,t.jsx)("sphereGeometry",{args:[1.3,20,20]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#f472b6",transparent:!0,opacity:.12,roughness:.2})]})]})]})});(0,l.f)((t,s)=>{if(!i)return;v.current+=s*r,b.current++;let n="mitosis"===o?a:Math.min(a,p.length-1);g.current.progress=Math.min(100,g.current.progress+15*s*r),g.current.chromosomes.forEach(e=>{let t=((e,t,s)=>{let i=Math.min(s/100,1);switch(t){case 0:let r=1.8-.3*i;return new h.cE(Math.cos(e.angle)*r,.3*Math.sin(2*e.angle),Math.sin(e.angle)*r);case 1:let n=1.5-.8*i;return new h.cE(Math.cos(e.angle)*n,(e.pairId-1.5)*.3*(1-.5*i),Math.sin(e.angle)*n);case 2:let a=(e.pairId-1.5)*.5;return new h.cE(a,0,e.isMaternal?-.1:.1);case 3:let o=e.isMaternal?1:-1;return new h.cE(3.5*i*o,(e.pairId-1.5)*.4,0);case 4:return new h.cE(e.isMaternal?4:-4,(e.pairId-1.5)*.5,0);case 5:return new h.cE(e.isMaternal?5:-5,(e.pairId-1.5)*.5,0);default:return e.position.clone()}})(e,n,g.current.progress);e.position.lerp(t,.05*r),e.condensed=n>=1});let l="meiosis"===o?a:Math.min(a,f.length-1);y.current.progress=Math.min(100,y.current.progress+15*s*r),y.current.chromosomes.forEach(e=>{let t=((e,t,s)=>{let i=Math.min(s/100,1);switch(t){case 0:if(!(i<.5))return new h.cE((e.pairId-1.5)*.8,0,e.isMaternal?-.15:.15);{let t=e.pairId*Math.PI*.5;return new h.cE(Math.cos(t)*(1.5-i),(e.pairId-1.5)*.5,Math.sin(t)*(1.5-i))}case 1:return new h.cE((e.pairId-1.5)*.7,0,e.isMaternal?-.1:.1);case 2:let r=e.isMaternal?1:-1;return new h.cE(3*i*r,(e.pairId-1.5)*.3,0);case 3:return new h.cE(e.isMaternal?3.5:-3.5,(e.pairId-1.5)*.4,0);case 4:let n=e.isMaternal?1:-1;return new h.cE(2.5*n,(e.pairId-1.5)*.3,0);case 5:let a=e.isMaternal?1:-1;return new h.cE(1.5*a,(e.pairId-1.5)*.3,0);case 6:let o=e.isMaternal?1:-1;return new h.cE(o*(1.5+1.8*i),(e.pairId-1.5)*.35,0);case 7:let l=e.isMaternal?1:-1,c=(e.pairId%2==0?1:-1)*1.5;return new h.cE(3*l,c,0);default:return e.position.clone()}})(e,l,y.current.progress);e.position.lerp(t,.05*r),e.condensed=l>=1,e.crossedOver=0===l&&y.current.progress>50});let c=e=>0===e?1:1===e?Math.max(0,1-g.current.progress/100):e>=4?Math.min(.3,g.current.progress/100*.3):0;if(g.current.nucleusOpacity=c(n),y.current.nucleusOpacity=c(l),g.current.spindleOpacity=+(n>=1&&n<=3),y.current.spindleOpacity=+(l>=1&&l<=6),g.current.cellPinch=5===n?g.current.progress/100:0,y.current.cellPinch=7===l?y.current.progress/100:0,b.current%8==0){let t="mitosis"===o?p[a]:f[a],s=46,i=1;"mitosis"===o?i=a>=5?2:1:a<4?(i=a>=3?2:1,s=a>=2?23:46):(i=a>=7?4:2,s=23);let r="mitosis"===o?["Cell grows, DNA replicates. Chromosomes are invisible as chromatin.","Chromosomes condense into visible X shapes. Nuclear envelope dissolves. Spindle fibers form.","Chromosomes align at metaphase plate. Spindle fibers attach to centromeres.","Sister chromatids separate and move to opposite poles.","Chromosomes reach poles, new nuclear envelopes form.","Cell divides through cleavage furrow. 2 identical daughter cells result."]:["Homologous chromosomes pair up (synapsis). Crossing over creates genetic diversity.","Homologous pairs align at metaphase plate (not individual chromosomes).","Homologous chromosomes separate. Sister chromatids remain attached.","Two haploid cells form. Each chromosome still has two sister chromatids.","Chromosomes condense again in both daughter cells.","Chromosomes align at the center of each cell.","Sister chromatids finally separate and move to opposite poles.","Four genetically unique haploid gametes form."],n={phase:t,chromosomesCount:s,daughterCells:i,description:r[Math.min(a,r.length-1)]};j(n),e?.(n)}});let P=Math.min(a,p.length-1),C=Math.min(a,f.length-1);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ambientLight",{intensity:.6}),(0,t.jsx)("directionalLight",{position:[10,15,10],intensity:.8,castShadow:!0}),(0,t.jsx)("pointLight",{position:[0,5,0],intensity:.3,color:"#ffffff"}),(0,t.jsx)("pointLight",{position:[-6,0,5],intensity:.2,color:"#f59e0b"}),(0,t.jsx)("pointLight",{position:[6,0,5],intensity:.2,color:"#ec4899"}),(0,t.jsxs)("group",{children:[x&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.f,{position:[-6,5.5,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-amber-500/95 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg border-2 border-white/30",children:"🧬 MITOSIS"})}),(0,t.jsx)(d.f,{position:[6,5.5,0],distanceFactor:12,children:(0,t.jsx)("div",{className:"bg-pink-500/95 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg border-2 border-white/30",children:"🧬 MEIOSIS"})})]}),(0,t.jsx)(E,{position:[-6,0,0],state:g.current,isMitosis:!0,currentStage:P}),(0,t.jsx)(E,{position:[6,0,0],state:y.current,isMitosis:!1,currentStage:C}),x&&(0,t.jsx)(d.f,{position:[0,-6,0],distanceFactor:12,children:(0,t.jsxs)("div",{className:`${"mitosis"===o?"bg-amber-600":"bg-pink-600"}/95 text-white px-4 py-2 rounded-lg text-base font-bold shadow-lg`,children:["mitosis"===o?"Mitosis":"Meiosis"," - ","mitosis"===o?p[a]:f[a]]})}),x&&(0,t.jsx)(d.f,{position:[0,4,0],distanceFactor:10,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 text-white px-4 py-3 rounded-lg text-sm max-w-xs shadow-lg border border-gray-700",children:[(0,t.jsx)("div",{className:"font-bold mb-2 text-lg",children:w.phase}),(0,t.jsxs)("div",{className:"space-y-1 text-xs",children:[(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-gray-400",children:"Daughter cells:"}),(0,t.jsx)("span",{className:"font-bold",children:w.daughterCells})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-gray-400",children:"Chromosomes:"}),(0,t.jsx)("span",{className:"font-bold",children:w.chromosomesCount})]}),(0,t.jsx)("div",{className:"mt-2 pt-2 border-t border-gray-700 text-gray-300",children:w.description})]})]})}),x&&(0,t.jsx)(d.f,{position:[-10,3,0],distanceFactor:10,children:(0,t.jsxs)("div",{className:"bg-gray-900/95 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-gray-700",children:[(0,t.jsx)("div",{className:"font-bold mb-2",children:"Chromosome Colors"}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full",style:{background:u[0].maternal}}),(0,t.jsx)("span",{children:"Maternal (blue)"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full",style:{background:u[0].paternal}}),(0,t.jsx)("span",{children:"Paternal (red)"})]})]})]})})]}),(0,t.jsx)("gridHelper",{args:[24,48,"#1a1a3e","#1a1a3e"],position:[0,-7,0]})]})}e.s(["default",0,function(){let[e,l]=(0,s.useState)(!0),[c,d]=(0,s.useState)(1),[h,u]=(0,s.useState)(0),[p,f]=(0,s.useState)(!0),[x,g]=(0,s.useState)(!1),[y,v]=(0,s.useState)("mitosis"),[b,w]=(0,s.useState)(0),[j,S]=(0,s.useState)(!0),[M,E]=(0,s.useState)({phase:"Prophase",chromosomesCount:46,daughterCells:1,description:"Chromosomes condense and nuclear envelope dissolves."}),P=(0,s.useCallback)(()=>{l(e=>!e)},[]),C=(0,s.useCallback)(()=>{u(e=>e+1),w(0)},[]),A=(0,s.useCallback)(e=>{d(e)},[]),_=(0,s.useCallback)(e=>{E(e)},[]),I=(0,s.useCallback)(e=>{v(e),w(0)},[]),L=["Prophase","Metaphase","Anaphase","Telophase","Cytokinesis"],N=["Prophase I","Metaphase I","Anaphase I","Telophase I","Prophase II","Metaphase II","Anaphase II","Telophase II"],z=(0,s.useMemo)(()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.E,{title:"Division Mode",children:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>I("mitosis"),className:`flex-1 px-3 py-2 rounded text-sm transition-colors font-medium ${"mitosis"===y?"bg-[#f59e0b] text-white shadow-lg":"bg-gray-800 text-gray-300 hover:bg-gray-700"}`,children:"Mitosis"}),(0,t.jsx)("button",{onClick:()=>I("meiosis"),className:`flex-1 px-3 py-2 rounded text-sm transition-colors font-medium ${"meiosis"===y?"bg-[#ec4899] text-white shadow-lg":"bg-gray-800 text-gray-300 hover:bg-gray-700"}`,children:"Meiosis"})]})}),(0,t.jsx)(o.E,{title:"Phases",children:(0,t.jsx)("div",{className:"max-h-48 overflow-y-auto space-y-1 pr-1",children:("mitosis"===y?L:N).map((e,s)=>(0,t.jsxs)("button",{onClick:()=>w(s),className:`w-full px-2 py-1.5 rounded text-xs transition-colors text-left ${b===s?"mitosis"===y?"bg-[#f59e0b] text-white font-bold":"bg-[#ec4899] text-white font-bold":"bg-gray-800 text-gray-300 hover:bg-gray-700"}`,children:[s+1,". ",e]},e))})}),(0,t.jsx)(o.E,{title:"Display",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 text-gray-300 text-sm cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:j,onChange:e=>S(e.target.checked),className:"w-4 h-4 rounded",style:{accentColor:"mitosis"===y?"#f59e0b":"#ec4899"}}),"Show Labels"]})}),(0,t.jsx)(o.E,{title:"Key Info",children:(0,t.jsx)("div",{className:`text-xs ${"mitosis"===y?"bg-amber-900/30":"bg-pink-900/30"} rounded-lg p-3 space-y-2`,children:"mitosis"===y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Starting cells:"}),(0,t.jsx)("span",{className:"text-amber-400",children:"1"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Ending cells:"}),(0,t.jsx)("span",{className:"text-amber-400",children:"2"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Chromosomes:"}),(0,t.jsx)("span",{className:"text-amber-400",children:"46 (diploid)"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Purpose:"}),(0,t.jsx)("span",{className:"text-amber-400",children:"Growth/Repair"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Genetic variation:"}),(0,t.jsx)("span",{className:"text-amber-400",children:"None"})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Starting cells:"}),(0,t.jsx)("span",{className:"text-pink-400",children:"1"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Ending cells:"}),(0,t.jsx)("span",{className:"text-pink-400",children:"4"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Chromosomes:"}),(0,t.jsx)("span",{className:"text-pink-400",children:"23 (haploid)"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Purpose:"}),(0,t.jsx)("span",{className:"text-pink-400",children:"Gametes"})]}),(0,t.jsxs)("div",{className:"flex justify-between text-gray-300",children:[(0,t.jsx)("span",{children:"Genetic variation:"}),(0,t.jsx)("span",{className:"text-pink-400",children:"Yes (crossing over)"})]})]})})})]}),[y,b,j,I]),O=(0,s.useMemo)(()=>(0,t.jsx)(o.Z,{data:{phase:{value:0,unit:M.phase,color:"mitosis"===y?"#f59e0b":"#ec4899",decimals:0},chromosomes:{value:M.chromosomesCount,unit:"chromosomes",color:"mitosis"===y?"#fbbf24":"#f472b6",decimals:0},daughterCells:{value:M.daughterCells,unit:"cells",color:"mitosis"===y?"#fcd34d":"#fb7185",decimals:0},mode:{value:0,unit:"mitosis"===y?"Mitosis":"Meiosis",color:"mitosis"===y?"#f59e0b":"#ec4899",decimals:0},status:{value:+!!e,unit:e?"Active":"Paused",color:"#22c55e",decimals:0}},columns:2}),[M,y,e]),U=(0,s.useMemo)(()=>(0,t.jsx)(a.f,{isVisible:x,onToggle:()=>g(e=>!e),children:O}),[x,O]),T="mitosis"===y?"#f59e0b":"#ec4899";return(0,t.jsxs)("div",{className:"w-full h-screen relative",children:[(0,t.jsx)(i.f,{title:"Mitosis & Meiosis",description:"mitosis"===y?"Cell division for growth and repair - produces identical cells":"Gamete formation with crossing over - produces genetic diversity",cameraPosition:[0,0,14],backgroundColor:"#050510",controls:null,dataPanel:U,children:(0,t.jsx)(m,{onDataChange:_,isPlaying:e,simulationSpeed:c,resetTrigger:h,stage:b,mode:y,showLabels:j})}),(0,t.jsx)(r.f,{isPlaying:e,onPlayPause:P,onReset:C,speed:c,onSpeedChange:A,timeElapsed:0}),p&&(0,t.jsx)(n.f,{initialPosition:{x:window.innerWidth-340,y:80},children:z}),!p&&(0,t.jsx)("button",{onClick:()=>f(!0),className:"fixed top-20 right-4 z-20 px-4 py-2 rounded-lg border transition-colors text-sm font-medium",style:{backgroundColor:`${T}20`,color:T,borderColor:`${T}50`},children:"Show Controls"})]})}],42618)}]);