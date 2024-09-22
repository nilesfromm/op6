import React, { useRef, useEffect } from "react"
// import * as s from "./osc.module.css"
// import * as Tone from 'tone'
// import Dial from "./dial"
// import { useStore } from "../utils/store"
// import * as StartAudioContext from '../utils/StartAudioContext'

function Slider ({
    Id,
    value,
    handleChange
}){
    // let def_vol = -60
    // const { osc, setFreq, setAmp } = useStore()

    // const oscVals = useRef(useStore.getState().osc)

    // useEffect(() => useStore.subscribe(
    //     (osc) => (oscVals.current = osc),
    //     state => state.osc,
    // ), [])

    // const ampRef = useRef(null);
    // const freqRef = useRef(null);

    // useEffect(() => (
    //     ampRef.current = new Tone.Volume(osc[Id].amp).connect(dest),
    //     freqRef.current = new Tone.Oscillator(osc[Id].freq,"sine").connect(ampRef.current)
    // ), [])

    // const setF = (f) => {
    //     setFreq(Id,f)
    //     freqRef.current.frequency.value = f;
    // }
    // const setV = (v) => {
    //     setAmp(Id,v)
    //     // console.log(-10 + v/1)
    //     ampRef.current.volume.value = -30 + v/1;
    // }
    // console.log(Id);

    // StartAudioContext(Tone.context, 's.osc').then(function(){
    //     //started
    // })

    return (
        <input 
        type="range" 
        className="slider"
        id={"v" + Id} 
        value={value}
        min={0.0}
        max={1.0}
        step={0.001}
        onChange={(e) => {
            handleChange("amp", Id, e.target.value);
            // setV(event.target.value);
            // if(event.target.value<-59){
            //     freqRef.current.stop();
            // }
            // else if(freqRef.current.state === 'stopped'){
            //     freqRef.current.start();
            // }
        }}/>
    )
}

export default Slider