import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";

const vert = `
precision mediump float;
precision mediump int;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float time;

//new code
float pi = 3.14159265358979323846;
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0): vec3(0.0, -v.z, v.y));
}
varying float intensity;
uniform float u_time, u_scale;
uniform float x1_freq, x2_freq, y1_freq, y2_freq, z1_freq, z2_freq;
uniform float x1_amp, x2_amp, y1_amp, y2_amp, z1_amp, z2_amp;
vec3 displace(vec3 point) {
  return vec3((x1_amp * sin(-u_time + u_scale * x1_freq *( point.z/(2.*pi))))+(x2_amp * cos(u_time + u_scale * x2_freq*( point.y/(2.*pi)))), (y1_amp * sin(-u_time + u_scale * y1_freq *( point.z/(2.*pi))))+(y2_amp * cos(u_time + u_scale * y2_freq*( point.x/(2.*pi)))), (z1_amp * sin(u_time + u_scale * z1_freq*( point.y/(2.*pi))))+(z2_amp * cos(u_time + u_scale * z2_freq*( point.x/(2.*pi)))));
}

void main() {
    
    vec3 displacedPosition = position + displace(position);
    float offset = 0.0140625;

    vec3 tangent = orthogonal(normal);
    vec3 bitangent = normalize(cross(normal, tangent));
    vec3 neighbour1 = position + tangent * offset; //transformed was position???
    vec3 neighbour2 = position + bitangent * offset;
    vec3 displacedNeighbour1 = neighbour1 + displace(neighbour1);
    vec3 displacedNeighbour2 = neighbour2 + displace(neighbour2);
    
    vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
    vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;

    vec3 displacedNormal = normalize(cross(displacedTangent, displacedBitangent));

    vec3 transformed = displacedPosition;
    vNormal = normalize(normalMatrix * displacedNormal);
    intensity = pow(1.0 - abs(dot(normalize(normalMatrix * displacedNormal), vec3(0, 0, 1))), 1.);
    vec3 pos = transformed;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
}
`

const frag = `
precision mediump float;
varying vec3 vpos;
varying float intensity;
vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}
uniform vec3 glowColor;

void main() {
    vec3 brightness = vec3(0.5, 0.5, 0.5);
    vec3 contrast = vec3(0.5, 0.5, 0.5);
    vec3 oscilation = vec3(1.0, 1.0, 1.0);
    vec3 phase = vec3(0.2, 0.1, 0.0);
    vec3 color = cosPalette(intensity, brightness, contrast, oscilation, phase);
    vec3 glow = vec3(0.25,1.0,1.0) * intensity;
    vec4 diffuseColor = vec4(color, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}
`

const Model = ({amps, frqs}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_scale: {
        value: 1.0,
      },
      u_time: {
        value: 0.0,
      },

      x1_freq: {
        value: 0.0,
      }, 
      x2_freq: {
        value: 0.0,
      }, 
      y1_freq: {
        value: 0.0,
      }, 
      y2_freq: {
        value: 0.0,
      }, 
      z1_freq: {
        value: 0.0,
      }, 
      z2_freq: {
        value: 0.0,
      },
      x1_amp: {
        value: 0.0,
      }, 
      x2_amp: {
        value: 0.0,
      },
      y1_amp: {
        value: 0.0,
      }, 
      y2_amp: {
        value: 0.0,
      }, 
      z1_amp: {
        value: 0.0,
      }, 
      z2_amp: {
        value: 0.0,
      }
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.x1_freq.value = 5 + frqs[0] / 25;
    mesh.current.material.uniforms.x2_freq.value = 5 + frqs[1] / 25;
    mesh.current.material.uniforms.y1_freq.value = 5 + frqs[2] / 25;
    mesh.current.material.uniforms.y2_freq.value = 5 + frqs[3] / 25;
    mesh.current.material.uniforms.z1_freq.value = 5 + frqs[4] / 25;
    mesh.current.material.uniforms.z2_freq.value = 5 + frqs[5] / 25;
    
    mesh.current.material.uniforms.x1_amp.value = amps[0] / 2.5;
    mesh.current.material.uniforms.x2_amp.value = amps[1] / 2.5;
    mesh.current.material.uniforms.y1_amp.value = amps[2] / 2.5;
    mesh.current.material.uniforms.y2_amp.value = amps[3] / 2.5;
    mesh.current.material.uniforms.z1_amp.value = amps[4] / 2.5;
    mesh.current.material.uniforms.z2_amp.value = amps[5] / 2.5;

    mesh.current.rotation.y += 0.003;

  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[0.75, 60]}/>
      <shaderMaterial
        fragmentShader={frag}
        vertexShader={vert}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default Model;
