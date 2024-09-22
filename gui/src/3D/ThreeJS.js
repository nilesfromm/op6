import React, { useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, softShadows } from "@react-three/drei"
// import { useStore } from "../utils/store"
import Model from './Sphere'

const Three = (props) => {
    useEffect(() => {
        console.log("three props loaded")
    }, [props.loaded])
    return (
        <Canvas 
            shadows
            shadowMap
            camera={{ position: [-8, 0.5, 8], fov: 28 }}
        >
            <ambientLight intensity={0.5} />
            {/* <spotLight
                castShadow
                position={[-3, 3, 0]}
                intensity={1}
                penumbra={1}
                // shadow-mapSize-width={1024}
                // shadow-mapSize-height={1024}
            /> */}
            {/* <directionalLight
                castShadow
                position={[1, 6, 0]}
                intensity={1}
                penumbra={1}
                // shadow-mapSize-width={1024}
                // shadow-mapSize-height={1024}
            /> */}
            {/* <color attach="background" args={["white"]} /> */}
            <fog attach="fog" args={["white", 10, 13]} />
            <Suspense fallback={null}>
                {/* <Environment files={"SoftLightsStudio2.hdr"} opacity={0} path={"/hdri/"} /> */}
                <Model loaded={props.loaded}  amps={props.amps} frqs={props.frqs}/>
                <OrbitControls enableZoom={false} />
                {/* <Ground /> */}
            </Suspense>
        </Canvas>
    )
}

export default Three