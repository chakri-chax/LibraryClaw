import React, { useEffect } from "react";
import "./Figma.css";
import logo from "./images/pngwing.png";
import booksTree from "./images/bookTree.png";
import { useNavigate,useLocation} from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abis/libraryV6.json";
import Popup from "reactjs-popup";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


const FigmaForm = () => {
  const location = useLocation();
  console.log('location', location)
  const values = location.state;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [details,setDetails] = ("Details")
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [buttonText, setButtonText] = useState("Connect");
  const [bookButton, setBoookButton] = useState("Borrow Book");
  const [succesfull,setSuccessfull] = useState(" ")

  const [people, setPeople] = useState([]);

  // console.log("Book Name", _bookName);
  // console.log("Book ID",_bookId);



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      if (checkIdInput(studentId) && studentName && bookId && bookName) {
        const person = {
          id: new Date().getTime().toString(),
          studentId,
          studentName,
          bookId,
          bookName,
        };
         setBoookButton("Loading.....")
        const exportPerson = { studentId, studentName, bookId, bookName };

        console.log("Details", exportPerson.studentId);

        const contractAddress = "0x1973B3d7D9fc61C40b700DC209f8528C7cfd2312";
        const contractABI = abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const Borrow = await contract.Borrow(
          exportPerson.studentId,
          exportPerson.studentName,
          exportPerson.bookId,
          exportPerson.bookName
        );
       
        await Borrow.wait();
        
        setPeople((people) => {
          return [...people, person];
        });
       
        setStudentId("");
        setStudentName("");
        setBookId("");
        setBookName("");
        setSuccessfull(toast.success('Borrowed successful',{
          position: toast.POSITION.TOP_CENTER
        }))
        await delay(5000);
        setSuccessfull("")
      } else {
        // alert("Fill details correctly Especially ID ");
        toast.warning("Enter details correctly",{
          position: toast.POSITION.TOP_CENTER
        })
      }
      
    } catch (error) {
      // reportError(error);
      // alert()
      toast.error(`Error Found :${error}`,{
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

  function checkIdInput(id) {
    // Check if the length is 7
    if (id.length !== 7) {
      return false;
    }
  
    // Convert the first letter to uppercase
    const firstLetter = id[0].toUpperCase();
    
    // Check if the first letter is "N", "R", "I", or "S"
    if (!["N", "R", "I", "S"].includes(firstLetter)) {
      return false;
    }
  
    // Check if the last 4 digits are less than 1500
    const lastDigits = parseInt(id.slice(3), 10);
    if (isNaN(lastDigits) || lastDigits >= 1500) {
      return false;
    }
  
    return true;
  }
  
  
  

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
      // alert("Install metamask");
      toast.warning("Connect Metamask",{
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
  const handleInfo =()=> navigate(`/info`)
  const handlePayFee = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };

  const reportError = (error) => {
    console.log(JSON.stringify(error), "red");
    throw new Error(error);
  };

  return (
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
            <div className="overlap-wrapper">
              

              <div>
              
                <form className="my-form" onSubmit={handleSubmit}>
                  <h1 className="h1" align="center">
                   <strong>Details</strong> 
                  </h1>
                  <div>
                    <label htmlFor="Student ID :">
                      {" "}
                      <strong>Student ID :</strong>{" "}
                    </label>
                    <input
                      placeholder="N180001"
                      type="text"
                      onChange={(e) => {
                        setStudentId(e.target.value);
                      }}
                      value={studentId}
                    />{" "}
                    <br />
                  </div>
                  <div>
                    <label htmlFor="Student Name :">
                      <strong>Student Name :</strong>{" "}
                    </label>
                    <input
                      placeholder="Alice"
                      type="text"
                      onChange={(e) => {
                        setStudentName(e.target.value);
                      }}
                      value={studentName}
                    />
                    <br />
                  </div>
                  <div>
                    <label htmlFor="Book Id :">
                      <strong>Book ID :</strong>
                    </label>
                    <input
                      placeholder={values?values.bookId:"XundHJYd43nud"}
                      type="text"
                      onChange={(e) => {(values)?
                        setBookId(values.bookId): setBookId(e.target.value)
                      }}
                      value={bookId}
                    />
                    <br />
                  </div>

                  <div>
                    <label htmlFor="Book Name :">
                      <strong>Book Name :</strong>
                    </label>
                    <input
                      placeholder={values?values.bookName:"Harry Potter"}
                      type="text"
                      onChange={(e) => {
                       values?setBookName(values.bookName):
                        setBookName(e.target.value);
                      }}
                      value={bookName}
                    />
                    <br />
                  </div>

                  <br />

                  <div class="center">{(studentId && studentName && bookId && bookName)?<button>{bookButton}</button>:<button>Complete the form</button>}
                    
                  </div>
                </form>
                {/* <br/><h2 style={{fontWeight:"bold",fontSize:"25px",marginLeft:"100px",textAlign:"center"}}>{succesfull}</h2> */}

                {/* ************************************************ Recent Borrowings **************************************** */}
                {/* <h1 align="center" >Recent Borrowings </h1> */}

                {/* <div class="grid-container">
    
    {

        people.map((person)=>{
            const {id,studentId,studentName,bookId,bookName} = person;
            return (
                <div className="result-box">
                
                <div key={id}>
                    <h2>Student Id : {studentId}</h2>
                    <h4>Stundent Name :{studentName}</h4>
                    <h4>Book Id    :{bookId}</h4>                           
                    <h4>Book Name :{bookName}</h4>
                </div>
            </div>
            )
        })
    }
</div> */}
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
                <div className="ellipse-wrapper">
                  <div className="ellipse-2" />
                </div>
                <div className="text-wrapper-12">Fill the form</div>
              </div>
              <div className="connect-wallet-2">
                <div className="ellipse" />
                <div className="text-wrapper-11">Borrow book</div>
              </div>
              <div className="connect-wallet-3">
                <p className="text-wrapper-11">Return the book in time</p>
                <div className="ellipse" />
              </div>
              {/* <img className="line" alt="Line" src="line-1.svg" /> */}
              <div className="ellipse-3" />
            </div>
            <img className="img" alt="Pngwing" src={booksTree} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FigmaForm;