import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import MyStake from './components/MyStake/MyStake';
import StakeHistory from './components/StakeHistory/StakeHistory';
import Footer from './components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contract, ethers,utils } from 'ethers';
import { formatDate } from "./utils/helpers";
import {contractAddress} from "./utils/web3/constant";
import abi from "./utils/web3/abi/abi.json"







function App() {
  //a flag to check status of user
const [loading, setLoading] = useState(false)
const [connected,setConnected] = useState(false)

  const [userInfo, setUserInfo] = useState({
    matic_balance: 0,
    token_balance:0,
    address: null
  })

    // handler for when user switch from one account to another or completely disconnected
    const handleAccountChanged = async (accounts) => {
      if(!!accounts.length) {
        const networkId = await window.ethereum.request({method: "eth_chainId"})
        if(Number(networkId) !== 80001) return
        const accountDetails = await getAccountDetails(accounts[0])
  
        setUserInfo({
          matic_balance: accountDetails.userMaticBal,
          token_balance: accountDetails.userBRTBalance,
          address: accounts[0]
        })
        setConnected(true)
      }else {
        setConnected(false)
        setUserInfo({
          matic_balance: 0,
          token_balance: 0,
          address: null
        })
        
      }
    }

      // handler for handling chain/network changed
  const handleChainChanged = async (chainid) => {
    if(Number(chainid) !== 80001) {
      setConnected(false)
      setUserInfo({
        matic_balance: 0,
        token_balance: 0,
        address: null
      })
      
    return  toast.error("You are connected to the wrong network, please switch to mumbai")
    }else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if(!accounts.length) return
      const accountDetails = await getAccountDetails(accounts[0])
        setUserInfo({
          matic_balance: accountDetails.userMaticBal,
          token_balance: accountDetails.userBRTBalance,
          address: accounts[0]
        })
        setConnected(true)
      }
  }

const getAccountDetails = async (address) => {
  setLoading(true)
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const userMaticBal = await provider.getBalance(address);
    const TokenContractInstance = new Contract(contractAddress, abi, provider);
    const userBRTBalance = await TokenContractInstance.balanceOf(address)
    setLoading(false)
    return {userBRTBalance, userMaticBal}
  }catch(err) {
    console.log(err)
  }
}
// sdd

const connectWallet = async() =>{
  setLoading(true)
try {
  if (!!!window.ethereum || !!!window.web3){
    toast.error('please connect to an ethereum enabled browser')
    return;
  }
  const networkId = await window.ethereum.request({method: "eth_chainId"})
  if (!!window.ethereum || !!window.web3) {
    if((Number(networkId) === 80001)){
     await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      toast.success("wallet connected!")
   }else{
 await error()
   }
  }
  setLoading(false)
} catch (error) {
  toast.error(error)
  setLoading(false)
}
}

const eagerConnect = async () =>{
  const networkId = await window.ethereum.request({method: "eth_chainId"})
  if(Number(networkId) !== 80001) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider.listAccounts();
  if(!accounts.length)return;
  const accountDetails = await getAccountDetails(accounts[0])
  setUserInfo({
    matic_balance:accountDetails.userMaticBal,
    token_balance:accountDetails.userBRTBalance,
    address: accounts[0]
  })
setConnected(true)
}
const error = async() => {
const networkId = await window.ethereum.request({method:"eth_chainId"})
if(Number(networkId) !== 80001) toast.error("please connect to mumbai network")
}

useEffect(() => {
  // init()
  // withdraw()
  if(!window.ethereum) return;
  // binding handlers to wallet events we care about
  window.ethereum.on("connect", eagerConnect)
  window.ethereum.on("accountsChanged", handleAccountChanged)
  window.ethereum.on('chainChanged', handleChainChanged);
  // getStakeAmount()
  // getStakeReward()
},
// eslint-disable-next-line
[connectWallet])


// const onChangeInputHandler = ({target}) =>{
//   switch (target.id) {
//     case "stake":
//       setStakeInput(target.value)
//       break;
//       case "withdraw":
//         setWithdrawInput(target.value)
//         break;
//         case "address":
//           setAddressInput(target.value)
//           break;
//     default:
//       break;
//   }
// } 


  return (
    <div className="App">
      <ToastContainer/>
      <Header 
      connectWallet={connectWallet}
      userInfo={userInfo}
      connected={connected}
      />
      <>
      {
        connected && 
      
      <main className='main'>
        <MyStake
        />
        <StakeHistory
        />
      </main>
}
      </>
      {/* <Footer /> */}
    </div>
    
  );
}

export default App;
