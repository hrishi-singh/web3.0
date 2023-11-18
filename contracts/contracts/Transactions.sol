// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions{
uint256 txnCnt;
event Transfer(address from,address reciever,uint amount,string message,uint timestamp,string keyword);
struct TransferStruct{
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
}
TransferStruct[] transactions;

function addtoBtransactionschain(address payable receiver,uint amount,string memory message,string memory keyword) public{
    txnCnt+=1;
    transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
}
function getAllTxns() public view returns(TransferStruct[] memory){
    return transactions;
}
function getTxncnt() public view returns (uint256){
    return txnCnt;
}
}
