import React from "react";
import { useState, useEffect } from "react";
import abi from "./abis/libraryV4.json";
import { ethers } from "ethers";

import { useNavigate } from "react-router-dom";
import "./Form.css";

const FigmaHowMuchToPay = () => {
    console.log("My Books");
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [fee,setFee]= useState()

  
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractAddress = "0x2659e67BeC53930a1fF519d04402b663Bc4aE1CF";
    const contractABI = abi;

console.log("In pay fee");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    //console.log(await contract.GetDetails("N180491", 0));
    const fee = await contract.howMuchToPay("n",1)
    console.log("Fee",fee.toSting());
    // let i = 1;
    // while (i) {
    //     console.log(studentId);
    //   const myBook = await contract.GetDetails(studentId, i-1);
    //   const fee = await contract.howMuchToPay(studentId, i-1)
    //   setFee(fee);
    //   const length = parseInt(myBook.bookSerial, 16);

    //   const _name = await myBook.studentName;

    //   const _bookId = myBook.bookId;
    //   const _bookName = myBook.bookName;

    //   const book = { id: parseInt(myBook.bookSerial, 16), _bookName, _bookId };

    //   setBooks((books) => {
    //     return [...books, book];
    //   });

    //   if (i <= length) {
    //     i++;
    //   } else {
    //     break;
    //   }
    // }
  };

  return (
    <>
    <p>Hello boooks</p>
    <div className="home-page">
    <br/><br/>
      <form className="my-form" onSubmit={handleSubmit}>
        <h1 className="h1" align="center">
          Get Deatils
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

        <br />

        <div class="center">
          <button>My Books</button>
        </div>
      </form>
      <div>
       

        <div class="grid-container">
          
          {books.map((book) => {
            const { id, _bookId, _bookName } = book;
            <h1 align="center">
            {/* <span></span><strong>{studentId}</strong> */}
            {
              {studentId}?studentId:""
            }
          </h1>
            return (
              <div className="result-box">
                <div className="center">
                </div>
                <div key={id}>
                  <h4>Book Id :{_bookId}</h4>
                  <h4>Book Name :{_bookName}</h4>
                  <button onClick={routeChange}>{`Pay ${fee} Wei`}</button>
                
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
      </div>
    </>
  );
};

export default FigmaHowMuchToPay;
