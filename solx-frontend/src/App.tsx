import { useEffect, useState } from 'react'
import helloWorld from "./contracts/hello_world";
import {
    isConnected,
    getPublicKey,
    signAuthEntry,
    signTransaction,
    signBlob, requestAccess
} from "@stellar/freighter-api";

function App() {
    const [address, setAddress] = useState<string>("")

    useEffect(() => {
        (async () => {
            if (await isConnected()) {
                console.log("User has Freighter!");
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

            const res = await retrievePublicKey();
            console.log(res);
            setAddress(res);
            const { result } = await helloWorld.balance({ id: res });
            console.log(result);
        })();
    },[])

    async function getListedItems(){
        const { result } = await helloWorld.get_all_data();
        console.log(result);
    }

    getListedItems()

    async function addItem(hash:string,name:string,cost:number,owner:string){
        const res  = await helloWorld.place_item({
            nft_hash: hash,
            name, 
            cost: BigInt(cost),
            owner
        })
        const sign= await res.sign()
        console.log(sign)
    }

    return (
        <>
            <h1>StellarOLX</h1>
            <button onClick={() => addItem("QmXB1zNNQk1Enkx6cnern9SNwnFhYMixBaPKePD8SXB2CL/Naruto","Naruto", 5, address)}>add item</button>

        </>
    )
}

export default App
