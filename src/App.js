import React from "react";
import { ReactDOM } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GreetMsg from "./GreetMsg";
import PaymentPage from "./PaymentPage";
import Home from "./Home";

import Form from "./FigmaForm";
import MyBooks from "./FigmaBooks";
import FigmaBook from "./FigmaBook";
import TransationQr from "./TransationQr";
import TransacQrForm from "./TransacQrForm";
import SignUp from "./SignUp";
import Fetch from "./Fetch";
import FigmaInfo from "./FigmaInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Borrow" element={<Form />} />
      <Route path="/MyBooks" element={<MyBooks />} />
      <Route path="MyBooks/TransactionQr" element={<TransacQrForm />} />
      <Route path="/Book" element={<FigmaBook />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/info" element={<FigmaInfo />} />
      <Route path="/Fetch" element={<Fetch />} />
    </Routes>
  );
};

export default App;
//dont change routes
