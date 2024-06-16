import { useState } from 'react'
import helloWorld from "./contracts/hello_world";
import {
    isConnected,
    getPublicKey,
    signAuthEntry,
    signTransaction,
    signBlob,requestAccess
  } from "@stellar/freighter-api";

function App() {
    

    (async()=>{
        if (await isConnected()) {
            alert("User has Freighter!");
          }

          
          const retrievePublicKey = async () => {
            let publicKey = "";
            let error = "";
          
            try {
              publicKey = await requestAccess();
            } catch (e) {
              console.log(e);
            }
          
            if (error) {
              return error;
            }
          
            return publicKey;
          };
          
          const res = retrievePublicKey();
          console.log(res);
        const { result } = await helloWorld.balance({id: "GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR"});
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
