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
    const [isloading,setIsLoading]=useState(false);
    const [txnCount, setTxnCount] = useState(localStorage.getItem('txnCount'));
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}));
    }

    const iswalletConnected= async () =>{
        try {
            if(!ethereum) return alert("please install metamask");

            const accounts=await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }
            else{
                console.log('no Accounts Found');
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }

        // console.log(accounts);
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

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }



    useEffect(()=>{
        iswalletConnected();
    },[]);
return(
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTxn,handleChange}}>
        {children}
    </TransactionContext.Provider>
)
}