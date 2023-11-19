import React,{useEffect,useState} from "react";
import {ethers} from 'ethers';
import { contractABI,contractaddress } from "../utils/constants";

export const TransactionContext=React.createContext();
const {ethereum} =window;

const getEthereumContract=() =>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const txnContract=new ethers.Contract(contractaddress,contractABI,signer);
    console.log({
        provider,
        signer,
        txnContract
    });
    return txnContract;
}

export const TransactionProvider=({children})=>{
    const [currentAccount,setCurrentAccount]=useState('');
    const [formData,setFormData]=useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isLoading,setIsLoading]=useState(false);
    const [txnCount, setTxnCount] = useState(localStorage.getItem('txnCount'));
    const [txns, setTxns] = useState([]);
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}));
    }
    const getAlltxn = async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");
            const txnContract= getEthereumContract();
            const availableTxn= await txnContract.getAllTxns();
            const structuredTxns=availableTxn.map((txn)=>({
                addressTo:txn.receiver,
                addressFrom:txn.sender,
                timestamp:new Date(txn.timestamp.toNumber()*1000).toLocaleString(),
                message:txn.message,
                keyword:txn.keyword,
                amount:parseInt(txn.amount._hex)/(10**18)

            }))
            setTxns(structuredTxns);
            console.log(structuredTxns);
            console.log(availableTxn);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }



    const iswalletConnected= async () =>{
        try {
            if(!ethereum) return alert("please install metamask");

            const accounts=await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAlltxn();
            }
            else{
                console.log('no Accounts Found');
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }

    }
const ifTxnExist= async()=>{
    try {
        const txnContract= getEthereumContract();
        const txnCount=await txnContract.getTxncnt();

        window.localStorage.setItem("txnCount",txnCount);

        
    } catch (error) {
        console.log(error);
        throw new Error("No ethereum object.")
    }
}

    const connectWallet = async ()=>{
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts= await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    const sendTxn = async()=>{
        try {
            if(!ethereum) return alert("Please install metamask");
            const {addressTo,amount,keyword,message}=formData;
            const txnContract= getEthereumContract();
            const parseAmt=ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0x5208', //21k gwei=subunit of eth
                    value:parseAmt._hex

                }]
            });
            const txnHash=await txnContract.addtoBlockchain(addressTo,parseAmt,message,keyword);
            setIsLoading(true);
            console.log(`Loading-${txnHash.hash}`);
            await txnHash.wait();
            setIsLoading(false);
            console.log(`Success-${txnHash.hash}`);

            const txnCount=await txnContract.getTxncnt();
            setTxnCount(txnCount.toNumber());
            window.reload();

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }



    useEffect(()=>{
        iswalletConnected();
        ifTxnExist();
    },[]);
return(
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTxn,handleChange,txns,isLoading}}>
        {children}
    </TransactionContext.Provider>
)
}