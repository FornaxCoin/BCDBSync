import {getBlock, getTransaction, getTransactionReceipt} from './Web3Wrapper.js'
import {Block,Transaction} from "../models/index.js";
import {subscribeBlock} from "./Web3WebSocket.js"
var ObjectId = require('mongodb').ObjectID;

export const syncBlockChain = async()=>{

    while(true){
        console.log("inloop")
        let response = await Block.findOne({}).sort('-number')
        let responseCrash = await Block.findOne({hash:""})
        console.log("responseCrash:",responseCrash)
        let currentBlock = -1;
        console.log("response",response)
        if(response !== null && response!=="" && responseCrash  === null){
            currentBlock = response.number;
        }else if(responseCrash !== null){
            let previousCrash = await Block.findOne({ "_id": { "$lt": ObjectId(responseCrash.id) }}).sort({ "_id": -1 }).limit(1)//get the previous record of the given id
            console.log("previousCrash:",previousCrash.number);
            currentBlock = parseInt(previousCrash.number);
            currentBlock = currentBlock - 1;
            console.log("currentBlock:",currentBlock)
            await Block.deleteMany({ $or: [{number: {$gt: currentBlock}},{hash:""}]})
            await Transaction.deleteMany({$or: [{blockNumber: {$gt: currentBlock}},{blockHash:""}]})
        }else{

        }
        let latestBlock= await getBlock('latest')
        console.log("currentBlock",currentBlock)
        if(currentBlock<latestBlock.number){
            console.log("Downloading...")
            await downloadBlockChain(currentBlock+1,latestBlock.number)
        }else if(currentBlock===latestBlock.number){
            console.log("Syncing...")
            await subscribeBlock();
            break;
        }else{

        }
    }

}
export const downloadBlockChain = async (fromBlockNumber,toBlockNumber) =>{
    console.log("Downloading...")
    for (let i=fromBlockNumber;i<=toBlockNumber;i++){
        await blockAndTransactionToDB(i);
    }
}

export const blockAndTransactionToDB = async(blockNumberOrBlockHash)=>{
    console.log("Downloading:",blockNumberOrBlockHash)
    let block = await getBlock(blockNumberOrBlockHash.toString());
    if(block){
        console.log("blockDownloaded:", block.number)
    }else{
        block = await getBlock(blockNumberOrBlockHash.toString());
        console.log("blockReDownloaded:", blockNumberOrBlockHash)
    }
    let newBlock = new Block;
    newBlock = {
        ...block
    };
    // console.log("newBlocktransactions:",newBlock.transactions)
    let transactionsArray=newBlock.transactions;
    newBlock.transactions=[];
    await (async () =>{
        if(transactionsArray!=null){
            let receipt
            await (async () =>{
                for(let transactionHash of transactionsArray ){
                    receipt = await getTransactionReceipt(transactionHash)
                    let transaction = await getTransaction(transactionHash);
                    let newTransaction = new Transaction({
                        ...receipt,
                        value: transaction.value,
                        nonce: transaction.nonce,
                        gasPrice: transaction.gasPrice,
                        input:transaction.input,
                        timestamp:newBlock.timestamp,
                    });
                    console.log("transactionToDB:",newTransaction.transactionHash);
                    let response = await newTransaction.save();
                    console.log('transactionFromDB:',response.transactionHash);
                    newBlock.transactions.push(response._id);
                }
            })()
        }
    })()
    console.log("blockToDB:",newBlock.number);
    let blockReturn =  await Block.create(newBlock);
    console.log("blockFromBD:",blockReturn.number);
    if(blockReturn.hash === ""){
        process.exit(13936);
    }
}


