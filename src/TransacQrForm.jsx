import React, { useEffect } from "react";
import "./Figma.css";
import "./Form.css"
import logo from "./images/pngwing.png";
import booksTree from "./images/bookTree.png";
import { useNavigate,useLocation} from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import QR from './images/QR.png'
import buttonText from "./Ui";
import transacVid from './videos/transacVid.mp4'
import abi from "./abis/libraryV6.json";
import load1 from "./images/load1.gif";
import tick from "./images/tickFinal.gif";
import Popup from "reactjs-popup";


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const TransacQrForm = () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  
  const location = useLocation();
  console.log('location', location)
  
  const contractAddress = "0x1973B3d7D9fc61C40b700DC209f8528C7cfd2312";

  const contractABI = abi;
  
  const images = [QR, load1, tick];
  const [msg, setMsg] = useState("0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B");

  const [pic, setPic] = useState(images[0]);

 

const [bookSerial,setBookSerial] = useState(0)
  const [details,setDetails] = ("Details")
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [buttonText, setButtonText] = useState("Connect");
  const [bookButton, setBoookButton] = useState("Borrow Book");
  const [feeAmt,setFeeAmt] = useState(15)
  const [people, setPeople] = useState([]);
  let [transactionState, setTransactionState] = useState(0);

  const values = location.state;
  console.log("Values...",values);

  const _feeAmt = values?values.amt:15;
   const _bookId = values?values.bookId:"BookIdDemo"
   const _bookName = values?values.bookName:"Demo Book "
   const _studentId = values?values.studentId:"N180491"
   const _studentName = values?values.studentName:"Demo Student"
   const _bookSerial = values?values.bookSerial:"0"
   
   console.log("Details","Fee ==",_feeAmt,"Book Id ==",_bookId,"Book Name ==",_bookName,"StdName ==",_studentName,"book serial ==",_bookSerial);
console.log("Book Serial",_bookSerial);

   useEffect(() => {
 
    handleTransaction();
    setFeeAmt(_feeAmt);
    setBookId(_bookId);
    setBookName(_bookName);
    setStudentId(_studentId);
    setStudentName(_studentName)
    setBookSerial(_bookSerial)
   
    
  }, [transactionState]);
  // console.log("Book Name", _bookName);
  // console.log("Book ID",_bookId);

  const handleTransaction = async () => 
  
  {
    
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const initialBalance = await provider.getBalance(
          "0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
        );
        const formatedInitialBalance = ethers.utils.formatEther(initialBalance);
        console.log("formatedInitialBalance", formatedInitialBalance);
  
        while (transactionState === 0) {
          const updatedBalance = await provider.getBalance(
            "0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
          );
          const formatedUpdatedBalance = ethers.utils.formatEther(updatedBalance);
          const difference = formatedUpdatedBalance - formatedInitialBalance;
          console.log("formatedupdatedBalance", formatedUpdatedBalance);
          console.log("Differnce", difference);
  
          await delay(2000);
          console.log("Waiting..");

          /**************** * contract Interaction ******************************** */
          console.log("Book Serial",_bookSerial,typeof(_bookSerial));

          console.log("fee amt",_feeAmt,typeof(_feeAmt));
          console.log("Student Id",_studentId,typeof(_studentId));
       
         
          
          if (difference >= 0.0149) {

            setPic(images[1]);
            try {
              await contract.payFee(_studentId,_bookSerial,_feeAmt)
            } catch (error) {
              alert(`Error  :${error}`)
              toast.error(`Error  :${error}`,{
                position: toast.POSITION.TOP_CENTER
              })
            }
            
            // await (contract.payFee(studentId,bookSerial,feeAmt))
            setMsg("Transaction Loading");
            console.log("Transaction Done");
            await delay(4000);

            setBookId("")
            setBookName("")
            setStudentId("")
            setStudentName("")
           
            setMsg("");
            toast.success("Transaction Done ✔",{
              position: toast.POSITION.TOP_CENTER
            })
            setPic(images[2]);
            
            setFeeAmt(0)
            break;
          } else {
            console.log("Transaction not yet done");
          }
          setTransactionState(1);
        }

        
      } catch (error) {
        // reportError(error)
        // alert(`Error Found ${error}`)
        toast.error(`Error  :${error}`,{
          position: toast.POSITION.TOP_CENTER
        })
      }

      
    } else {
      // alert("Please Install Metamask");
      toast.warning("Connect Metamask",{
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

 


 

  const ButtonText = async () => {
    if (window.ethereum) {
      const truncate = (text, startChars, endChars, maxLength) => {
        if (text.length > maxLength) {
          var start = text.substring(0, startChars);
          var end = text.substring(text.length - endChars, text.length);
          while (start.length + end.length < maxLength) {
            start = start + ".";
          }
          return start + end;
        }
        return text;
      };
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      console.log("Balance", balance);
      setButtonText(truncate(accounts[0], 4, 4, 11));
    } else {
      // alert("Install metamask");//
      toast.warning("Connect metamask",{
        position: toast.POSITION.TOP_CENTER
      })

    }
  };

  let navigate = useNavigate();

  const handleHome = () => {
    let path = `/`;
    navigate(path);
  };
  const handleConnect = async () => {
    let path = `/Connect`;
    navigate(path);
  };
  const hadleSignUp = () => {
    let path = `/signUp`;
    navigate(path);
  };
  const handleBorrow = () => {
    let path = `/Borrow`;
    navigate(path);
  };
  const handleStore = () => {
    let path = `/MyBooks`;
    navigate(path);
  };
  const handleInfo=()=>navigate(`/info`)
  const handlePayFee = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };

  const reportError = (error) => {
    console.log(JSON.stringify(error), "red");
    throw new Error(error);
  };

  return (
    <>
    
    <div className="form">

    
      <div className="div">
        <div className="connect">
          <div className="overlap-group">
            <button onClick={ButtonText} className="text-wrapper">
              {buttonText}
            </button>
          </div>
        </div>
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button onClick={handleHome} className="h-1">
            Home
          </button>
          <button onClick={handleBorrow} className="text-wrapper-2">
            Borrow
          </button>
          <button onClick={handleStore} className="text-wrapper-3">
            Store
          </button>
          <button onClick={handleInfo} className="text-wrapper-4">
           Info
          </button>
          <button className="text-wrapper-5">Library Claw</button>
        </div>
        <div className="overlap">
          <div className="form-wrapper">

          <div className="AppTransac">


  


<div >
<div className='container'>
<div className='box'>
  <h2>Student ID</h2>
  <strong>{studentId}</strong>
</div>
<div className='box'>
  <h2>Student Name</h2>
  <strong>{studentName}</strong>
</div>
<div className='box'>
  <h2>Book ID</h2>
  <strong>{bookId}</strong>
</div>
<div className='box'>
  <h2>Book Name</h2>
  <strong>{bookName}</strong>
</div>
<div className='box'>
  <h2>Fee in Eth</h2>
  <strong>{feeAmt/1000}</strong>
</div>

<img
  src={pic}
  alt="0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
  className="image"
/>
</div>
</div>


<br />

<div>
  <br />
  {{ msg } ? <strong>{msg}</strong> : ""}
</div>


</div>

            
            <div className="overlap-wrapper">
              

              <div>
         

                {/* ************************************************ Recent Borrowings **************************************** */}
       
              </div>
            </div>
          </div>
          <div className="left-discription">
            <div className="overlap-3">
              <div className="connect-wallet">


                <div className="ellipse" />
                <div className="text-wrapper-11">Connect Wallet</div>
              </div>
              <div className="fillform">
               
                  <div className="ellipse" />
                
                <div className="text-wrapper-12">Fill the form</div>
              </div>
              
              <div className="connect-wallet-2">
                <div className="ellipse" />
                <div className="text-wrapper-11">Borrow book</div>
              </div>
              <div className="connect-wallet-3">
              
                <div className="ellipse-wrapper">
                  <div className="ellipse-2" />
                </div>
                <div className="text-wrapper-12">Late fee Transaction</div>
              
              </div>
              {/* <img className="line" alt="Line" src="line-1.svg" /> */}
              <div className="ellipse" />
            </div>


   

   
           

          </div>
          
    <video className="videoStyles" autoPlay muted loop>
            <source src={transacVid} type="video/mp4"/>
            </video>
        </div>

        
      </div>
    </div>
    </>
  );
};
export default TransacQrForm;
