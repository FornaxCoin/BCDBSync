import Web3 from 'web3';
import {blockAndTransactionToDB} from './sync'
import {MAIN_NET_WS} from '../config'

const options = {
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 10,
        onTimeout: false
    }
};
const web3 = new Web3(new Web3.providers.WebsocketProvider(MAIN_NET_WS,options));
export const subscribeBlock=async ()=>{
    var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error) {
            console.log(result);

            return;
        }

        console.error(error);
    })
        .on("connected", function(subscriptionId){
            console.log(subscriptionId);
        })
        .on("data", function(blockHeader){
            console.log("blockHeader:",blockHeader);
            (async()=>{
                let response = await blockAndTransactionToDB(blockHeader.number);
                if(!response){
                    let response = await blockAndTransactionToDB(blockHeader.number);
                    if(!response){
                        process.exit(13936);
                    }
                }
            })()
        })
        .on("error", console.error);

}
