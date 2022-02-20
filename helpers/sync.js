import {getBlock, getTransaction, getTransactionReceipt} from './Web3Wrapper.js'
import {Block, Transaction} from "../models/index.js";
import {subscribeBlock} from "./Web3WebSocket.js"

var ObjectId = require('mongodb').ObjectID;

export const syncBlockChain = async () => {

    while (true) {
        console.log("inloop")
        let response = await Block.findOne({}).sort('-number')
        let responseCrash = await Block.findOne({hash: ""})
        let crashTxn = await Transaction.findOne({transactionHash: ""})
        console.log("responseCrash:", responseCrash)
        console.log("crashTxn:", crashTxn)
        let currentBlock = -1;
        console.log("response", response)
        if (response !== null && response !== "" && responseCrash === null) {
            console.log("error:1")
            currentBlock = response.number;
            if (crashTxn !== null) {
                console.log("error:11")
                let previousCrashTxn = await Transaction.findOne({"_id": {"$lt": ObjectId(crashTxn.id)}}).sort({"_id": -1}).limit(1)//get the previous record of the given id
                currentBlock = parseInt(previousCrashTxn.blockNumber);
                currentBlock = currentBlock - 1;
                console.log("currentBlock:",currentBlock)
                await Block.deleteMany({$or: [{number: {$gt: currentBlock}}, {hash: ""}]})
                await Transaction.deleteMany({$or: [{blockNumber: {$gt: currentBlock}}, {blockHash: ""}]})
            }
        } else if (responseCrash !== null) {
            console.log("error:2")
            let previousCrash = await Block.findOne({"_id": {"$lt": ObjectId(responseCrash.id)}}).sort({"_id": -1}).limit(1)//get the previous record of the given id
            console.log("previousCrash:", previousCrash);
            currentBlock = parseInt(previousCrash.number);
            currentBlock = currentBlock - 1;
            console.log("currentBlock:", currentBlock)
            if (crashTxn !== null) {
                console.log("error:22")
                let previousCrashTxn = await Transaction.findOne({"_id": {"$lt": ObjectId(crashTxn.id)}}).sort({"_id": -1}).limit(1)//get the previous record of the given id
                currentBlock = parseInt(previousCrashTxn.blockNumber);
                currentBlock = currentBlock - 1;
                console.log("currentBlock:", currentBlock)
                await Block.deleteMany({$or: [{number: {$gt: currentBlock}}, {hash: ""}]})
                await Transaction.deleteMany({$or: [{blockNumber: {$gt: currentBlock}}, {blockHash: ""}]})
                console.log("error:222")
            }
            console.log("error:23")
            await Block.deleteMany({$or: [{number: {$gt: currentBlock}}, {hash: ""}]})
            await Transaction.deleteMany({$or: [{blockNumber: {$gt: currentBlock}}, {blockHash: ""}]})
            console.log("error:24")
        } else {
            console.log("error:3")
        }
        let latestBlock = await getBlock('latest')
        console.log("currentBlock", currentBlock)
        if (currentBlock < latestBlock.number) {
            console.log("error:4")
            console.log("Downloading...")
            await downloadBlockChain(currentBlock + 1, latestBlock.number)
        } else if (currentBlock === latestBlock.number) {
            console.log("error:5")
            console.log("Syncing...")
            await subscribeBlock();
            break;
        } else {
            console.log("error:6")
        }
    }

}
export const downloadBlockChain = async (fromBlockNumber, toBlockNumber) => {
    console.log("Downloading...")
    for (let i = fromBlockNumber; i <= toBlockNumber; i++) {
        let response = await blockAndTransactionToDB(i);
        if(!response){
            process.exit(13936);
        }
    }
}

export let blockAndTransactionToDB = async (blockNumberOrBlockHash) => {
    console.log("Downloading:", blockNumberOrBlockHash)
    let block = await getBlock(blockNumberOrBlockHash.toString());
    if (block) {
        console.log("blockDownloaded:", block.number)
    } else {
        block = await getBlock(blockNumberOrBlockHash.toString());
        console.log("blockReDownloading...")
        if(block?.number){
            console.log("blockReDownloaded", block.number)
        }else{
            return false
        }
    }
    let newBlock = new Block;
    newBlock = {
        ...block
    };
    // console.log("newBlocktransactions:",newBlock.transactions)
    let transactionsArray = newBlock.transactions;
    newBlock.transactions = [];
    await (async () => {
        if (transactionsArray != null) {
            let receipt
            await (async () => {
                for (let transactionHash of transactionsArray) {
                    receipt = await getTransactionReceipt(transactionHash)
                    if(!receipt?.transactionHash){
                        console.log("fetching Receipt Again")
                        receipt = await getTransactionReceipt(transactionHash)
                    }
                    console.log("receipt:", receipt.transactionHash)
                    let transaction = await getTransaction(transactionHash);
                    if(transaction?.transactionHash){
                        console.log("fetching Transaction Again")
                        transaction = await getTransaction(transactionHash);
                    }
                    console.log("transactionFromBlockchain:", transaction.hash)
                    let newTransaction = new Transaction({
                        ...receipt,
                        value: transaction.value,
                        nonce: transaction.nonce,
                        gasPrice: transaction.gasPrice,
                        input: transaction.input,
                        timestamp: newBlock.timestamp,
                    });
                    console.log("transactionToDB:", newTransaction.transactionHash);
                    let response = await newTransaction.save();
                    if (response.transactionHash === "") {
                        response = await newTransaction.save();
                        if (response.transactionHash === "") {
                            process.exit(13936);
                        }
                    }
                    console.log('transactionFromDB:', response.transactionHash);
                    newBlock.transactions.push(response._id);
                }
            })()
        }
    })()
    console.log("blockToDB:", newBlock.number);
    let blockReturn = await Block.create(newBlock);
    console.log("blockFromBD:", blockReturn.number);
    if (blockReturn.hash === "") {
        process.exit(13936);
    }else{
        return true
    }
}


