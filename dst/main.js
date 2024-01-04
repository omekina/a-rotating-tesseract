class w{x;y;z;constructor(B,D,I){this.x=B,this.y=D,this.z=I}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}dot(B){return this.x*B.x+this.y*B.y+this.z*B.z}cross(B){return new w(B.y*this.z-B.z*this.y,B.z*this.x-B.x*this.z,B.x*this.y-B.y*this.x)}multiply(B){this.x*=B,this.y*=B,this.z*=B}add_vector(B){this.x+=B.x,this.y+=B.y,this.z+=B.z}subtract_vector(B){this.x-=B.x,this.y-=B.y,this.z-=B.z}add_constant(B){this.x+=B,this.y+=B,this.z+=B}clone(){return new w(this.x,this.y,this.z)}}var F=w;class f{origin;direction;constructor(B,D,I,q,A,H){this.origin=new F(B,D,I),this.direction=new F(q,A,H)}static from_points(B,D){let I=D.clone();return I.subtract_vector(B),new f(B.x,B.y,B.z,I.x,I.y,I.z)}normalize(){let B=this.direction.length();this.direction.multiply(1/B)}intersection_epsilon=0.001;intersect(B){let D=this.direction.dot(B.normal);if(Math.abs(D)<this.intersection_epsilon)throw new Error("No ray-plane collision");let I=B.point.clone();I.subtract_vector(this.origin);let q=I.dot(B.normal)/D;if(q<0)throw new Error("No ray-plane collision");let A=this.direction.clone();return A.multiply(q),A.add_vector(this.origin),A}}var $=f;var z;(function(T){let D,I,q,A,H,j,P;function a(){let K=document.getElementById("render-canvas");if(K===null)throw new Error("Could not find the rendering canvas");T.canvas=K,I=T.canvas.width,q=T.canvas.height,j=I/2,P=q/2,A=I/2,H=q/2,D=T.canvas.getContext("2d"),D.strokeStyle="white",D.beginPath()}T.init=a;function o(){D.clearRect(0,0,I,q)}T.clear=o;function s(K,G,J){let O,L;try{O=K.project_on_sensor(G)}catch{try{L=K.project_on_sensor(J)}catch{throw new Error("Could not project any of the two points")}const U=new $(J.x,J.y,J.z,G.x-J.x,G.y-J.y,G.z-J.z);let S;try{S=U.intersect(K.sensor)}catch{throw new Error("Could not intersect the line with the sensor")}return O=K.translate_point_on_sensor(S),[O[0],O[1],L[0],L[1]]}try{L=K.project_on_sensor(J)}catch{const U=new $(G.x,G.y,G.z,J.x-G.x,J.y-G.y,J.z-G.z);let S;try{S=U.intersect(K.sensor)}catch{throw new Error("Could not intersect the line with the sensor")}return L=K.translate_point_on_sensor(S),[O[0],O[1],L[0],L[1]]}return[O[0],O[1],L[0],L[1]]}function Y(K,G,J,O="white",L=1){D.strokeStyle=O,D.lineWidth=L;let U,S,Z;try{Z=s(K,G,J)}catch{return}U=[Z[0],Z[1]],S=[Z[2],Z[3]],D.beginPath(),D.moveTo(A+U[0]*j,H-U[1]*P),D.lineTo(A+S[0]*j,H-S[1]*P),D.closePath(),D.stroke()}T.line=Y;function n(K,G=0.1){for(let J=-1/G;J*G<=1;++J)Y(K,new F(-1,J*G,0),new F(1,J*G,0),"white",0.5),Y(K,new F(J*G,-1,0),new F(J*G,1,0),"white",0.5)}T.grid=n;function r(K,G=1){Y(K,new F(0,0,0),new F(G,0,0),"red",1),Y(K,new F(0,0,0),new F(0,G,0),"green",1),Y(K,new F(0,0,0),new F(0,0,G),"blue",1)}T.axis=r})(z||(z={}));var N=z;class m{point;normal;constructor(B,D,I,q,A,H){this.point=new F(B,D,I),this.normal=new F(q,A,H)}}var h=m;class E{data;constructor(){this.data=[0,0,0,0,0,0,0,0,0]}static from_euler_xyz(B,D,I){B=B*Math.PI/180,D=D*Math.PI/180,I=I*Math.PI/180;let q=new E;return q.data=[Math.cos(I)*Math.cos(D),Math.cos(I)*Math.sin(D)*Math.sin(B)-Math.sin(I)*Math.cos(B),Math.cos(I)*Math.sin(D)*Math.cos(B)+Math.sin(I)*Math.sin(B),Math.sin(I)*Math.cos(D),Math.sin(I)*Math.sin(D)*Math.sin(B)+Math.cos(I)*Math.cos(B),Math.sin(I)*Math.sin(D)*Math.cos(B)-Math.cos(I)*Math.sin(B),-Math.sin(D),Math.cos(D)*Math.sin(B),Math.cos(D)*Math.cos(B)],q}static from_scale(B,D,I){let q=new E;return q.data=[B,0,0,0,D,0,0,0,I],q}chain(B){let D=[];for(let I=0;I<3;++I)for(let q=0;q<3;++q){let A=0;for(let H=0;H<3;++H)A+=B.data[I*3+H]*this.data[H*3+q];D.push(A)}this.data=D}apply(B){return new F(B.x*this.data[0]+B.y*this.data[1]+B.z*this.data[2],B.x*this.data[3]+B.y*this.data[4]+B.z*this.data[5],B.x*this.data[6]+B.y*this.data[7]+B.z*this.data[8])}to_string(){let B="";for(let D=0;D<3;++D){for(let I=0;I<3;++I)B+=this.data[D*3+I].toFixed(2)+" ";B+="\n"}return B}}var W=E;class v{focal_point;transformation_forward;transformation_backward;direction;sensor;sensor_size=[0.036,0.024];constructor(B,D){this.focal_point=B,this.transformation_forward=W.from_euler_xyz(D[0],D[1],D[2]),this.transformation_backward=W.from_euler_xyz(0,0,-D[2]),this.transformation_backward.chain(W.from_euler_xyz(0,-D[1],0)),this.transformation_backward.chain(W.from_euler_xyz(-D[0],0,0)),this.direction=this.transformation_forward.apply(new F(0,0.025,0));let I=this.focal_point.clone();I.add_vector(this.direction),this.sensor=new h(I.x,I.y,I.z,this.direction.x,this.direction.y,this.direction.z)}project_on_sensor(B){let D=$.from_points(B,this.focal_point);if(D.direction.dot(this.sensor.normal)>0)throw new Error("No ray-plane collision");let I=D.intersect(this.sensor);return I.subtract_vector(this.focal_point),I=this.transformation_backward.apply(I),[I.x/this.sensor_size[0],I.z/this.sensor_size[1]]}translate_point_on_sensor(B){return B.subtract_vector(this.focal_point),B=this.transformation_backward.apply(B),[B.x/this.sensor_size[0],B.z/this.sensor_size[1]]}}var R=v;var k;(function(q){q[q["XY"]=0]="XY";q[q["XZ"]=1]="XZ";q[q["YZ"]=2]="YZ"})(k||(k={}));class p{vertices;constructor(B){this.vertices=B}extrude(B){const D=this.vertices.length;for(let q=0;q<D;++q){const A=this.vertices[q].clone();A.add_vector(B),this.vertices.push(A)}let I=!0;for(let q=0;q<D;++q){const A=this.vertices[q].clone(),H=A.clone();if(H.add_vector(B),I){this.vertices.push(H),this.vertices.push(A),I=!1;continue}this.vertices.push(A),this.vertices.push(H),I=!0}}scale(B){console.log(this.vertices);for(let D=0;D<this.vertices.length;++D)this.vertices[D].multiply(B)}rotate(B,D){if(D=D*Math.PI/180,B===k.XY){for(let I=0;I<this.vertices.length;++I){const q=this.vertices[I].clone();this.vertices[I].x=q.x*Math.cos(D)-q.y*Math.sin(D),this.vertices[I].y=q.x*Math.sin(D)+q.y*Math.cos(D)}return}if(B===k.XZ){for(let I=0;I<this.vertices.length;++I){const q=this.vertices[I].clone();this.vertices[I].x=q.x*Math.cos(D)-q.z*Math.sin(D),this.vertices[I].z=q.x*Math.sin(D)+q.z*Math.cos(D)}return}if(B===k.YZ){for(let I=0;I<this.vertices.length;++I){const q=this.vertices[I].clone();this.vertices[I].y=q.y*Math.cos(D)-q.z*Math.sin(D),this.vertices[I].z=q.y*Math.sin(D)+q.z*Math.cos(D)}return}console.error("Invalid 3D rotation plane")}render(B){for(let D=0;D<this.vertices.length-1;++D)N.line(B,this.vertices[D],this.vertices[D+1])}}var g=p;var X;(function(q){q[q["XW"]=0]="XW";q[q["YW"]=1]="YW";q[q["ZW"]=2]="ZW"})(X||(X={}));class d{vertices;constructor(B){this.vertices=B}extrude(B){const D=this.vertices.length;for(let q=0;q<D;++q){const A=this.vertices[q].clone();A.add_vector(B),this.vertices.push(A)}let I=!0;for(let q=0;q<D;++q){const A=this.vertices[q].clone(),H=A.clone();if(H.add_vector(B),I){this.vertices.push(H),this.vertices.push(A),I=!1;continue}this.vertices.push(A),this.vertices.push(H),I=!0}}scale(B){for(let D=0;D<this.vertices.length;D++)this.vertices[D].multiply(B)}rotate(B,D){if(D=D*Math.PI/180,B===X.XW){for(let I=0;I<this.vertices.length;I++){const q=this.vertices[I].clone();this.vertices[I].x=q.x*Math.cos(D)-q.w*Math.sin(D),this.vertices[I].w=q.x*Math.sin(D)+q.w*Math.cos(D)}return}if(B===X.YW){for(let I=0;I<this.vertices.length;I++){const q=this.vertices[I].clone();this.vertices[I].y=q.y*Math.cos(D)-q.w*Math.sin(D),this.vertices[I].w=q.y*Math.sin(D)+q.w*Math.cos(D)}return}if(B===X.ZW){for(let I=0;I<this.vertices.length;I++){const q=this.vertices[I].clone();this.vertices[I].z=q.z*Math.cos(D)-q.w*Math.sin(D),this.vertices[I].w=q.z*Math.sin(D)+q.w*Math.cos(D)}return}console.error("Invalid 4D rotation plane")}project(B){const D=[];for(let I=0;I<this.vertices.length;I++)D.push(B.project(this.vertices[I]));return new g(D)}}var x=d;class V{x;y;z;w;constructor(B,D,I,q){this.x=B,this.y=D,this.z=I,this.w=q}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}dot(B){return this.x*B.x+this.y*B.y+this.z*B.z+this.w*B.w}multiply(B){this.x*=B,this.y*=B,this.z*=B,this.w*=B}add_vector(B){this.x+=B.x,this.y+=B.y,this.z+=B.z,this.w+=B.w}subtract_vector(B){this.x-=B.x,this.y-=B.y,this.z-=B.z,this.w-=B.w}add_constant(B){this.x+=B,this.y+=B,this.z+=B,this.w+=B}clone(){return new V(this.x,this.y,this.z,this.w)}}var Q=V;class C{focal_point;static sensor_w=-2;constructor(B=1){this.focal_point=new Q(0,0,0,C.sensor_w-B)}project(B){let D=this.focal_point.clone();D.subtract_vector(B);const I=(C.sensor_w-B.w)/D.w;return D.multiply(I),D.add_vector(B),new F(D.x,D.y,D.z)}}var u=C;var c=function(){M=new x([new Q(-1,-1,-1,-1),new Q(-1,-1,1,-1),new Q(-1,1,1,-1),new Q(-1,1,-1,-1),new Q(-1,-1,-1,-1)]),M.extrude(new Q(2,0,0,0)),M.extrude(new Q(0,0,0,2)),y(),setInterval(_,40),window.addEventListener("mousemove",i)},_=function(){M.rotate(X.XW,1),y()},i=function(B){const D=N.canvas.getBoundingClientRect(),I=-(B.clientX-(D.left+N.canvas.width/2))/(N.canvas.width/2),q=-(B.clientY-(D.top+N.canvas.height/2))/(N.canvas.height/2),A=W.from_euler_xyz(q*90,0,I*90);b=new R(A.apply(new F(0,-1.5,0)),[q*90,0,I*90]),y()},y=function(){N.clear(),N.axis(b),M.project(l).render(b)},b=new R(new F(0,-1.5,0),[0,0,0]),l=new u,M;N.init();c();