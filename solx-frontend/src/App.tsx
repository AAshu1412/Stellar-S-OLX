import { useState } from 'react'
import helloWorld from "./contracts/hello_world";

function App() {

    (async()=>{
        const { result } = await helloWorld.initialize({name: "POPPO", address: "GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR"});
        console.log(result);
console.log("dad");
    })();
    return (
        <>
            ok
        </>
    )
}

export default App
