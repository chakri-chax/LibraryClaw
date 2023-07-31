import React from "react";
import ui from './images/Library ui.png'

import { Outlet, Link } from "react-router-dom";
import Ui from "./Ui";
import Figma from "./Figma";
import FigmaForm from "./FigmaForm";
import FigmaBooks from "./FigmaBooks";
import FigmaTransactions from "./FigmaTransactions";
import  FigmaBook  from "./FigmaBook";
import Signup from "./SignUp";
import Form from "./Form";
import MyBooks from "./MyBooks";
import FigmaGetDetails from "./FigmaGetDetails";
import PaymentPage from "./PaymentPage";
import TransationQr from "./TransationQr";
import FigmaHowMuchToPay from "./FigmaHowMuchToPay";
import Fetch from "./Fetch";
import TransacQrForm from "./TransacQrForm";
import FigmaInfo from "./FigmaInfo";
import GeeksforGeeks from "./toast";
const Home = () => {
  return (
    // <div className="bgImage">
    //   <img src={ui}  alt="No Image"/>
    //   {/* <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li><br/>
    //       <li>
    //         <Link to="/Form">Borrow a Book</Link>
    //       </li><br/>
    //       <li>
    //         <Link to="/MyBooks">Mybooks</Link>
    //       </li><br/>
    //     </ul>
    //   </nav> */}
    // </div>
<>
{/* {<FigmaInfo/>} */}
{/* <FigmaHowMuchToPay/> */}
{/* {<TransacQrForm/>} */}
{/* <PaymentPage/> */}
{/* <FigmaForm/> */}
{/* <FigmaGetDetails/> */}
{/* <TransationQr/> */}
{/* <Form/> */}
{/* <Fetch/> */}
{/* {<FigmaBooks/>} */}
{/* <FigmaGetDetails/>
<FigmaForm/> */}
<div className="Home">
<Ui/>

</div>
   
    {/* <FigmaForm/>
    <FigmaBooks/>
    <FigmaTransactions/>
    <FigmaBook/> */}
    {/* <Form/>
    <FigmaForm/> */}
    {/* <GeeksforGeeks/> */}
    
    </>
  );
};

export default Home;
