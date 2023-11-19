import React,{useContext} from 'react'
import { TransactionContext } from '../context/TransactionContext'
import dummyData from '../utils/dummydata'
import {shortenString} from '../utils/shortenString'

const TransactionCard=({addressTo,addressFrom,timestamp,message,keyword,amount,url})=>{
  return(
    <div className="text-white text-base m-4 flex flex-1 bg-[#181918]
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/tx/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
<p>
  From:{shortenString(addressFrom)}
</p>
          </a>

          <a href={`https://sepolia.etherscan.io/tx/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
<p>
  To:{shortenString(addressTo)}
</p>
          </a>
          <p>Amount:{amount} ETH</p>
          {
            message&&(
              <>
              <br/>
              <p>Message: {message}</p>
              </>
            )
          }
           <div className="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl">
           <p className="font-bold text-[#37c7da]">
            {timestamp}
          </p>
           </div>
         
        </div>

      </div>
    </div>
  )
}

const Transactions = () => {
  const {currentAccount,txns}= useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
     <div className="flex flex-col md:p-12 py-12 px-4">
      {currentAccount?(
        <h3 className='text-white text-3xl text-center my-2'>Latest Transactions</h3>
      ):<h3 className='text-white text-3xl text-center my-2'>Connect Your Wallet.</h3>
      }
      <div className="flex flex-wrap justify-center items-center mt-10">
        {
          txns.reverse().map((txn,i)=>(
            <TransactionCard key={i} {...txn}/>

          ))
        }

      </div>
      </div> 
    </div>
  )
}

export default Transactions