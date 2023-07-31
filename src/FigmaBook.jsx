import React, { useEffect } from "react";
import "./Figma.css";
import logo from './images/pngwing.png'
import physics from './images/physics.jpg'
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const FigmaBook = () => {

 
  
  const [img, setImg] = useState(physics);
  const [title, setTitle] = useState("Applied Physics");
  const [author, setAuthor] = useState("A.K JHA");
  const [pages, setPages] = useState("506");
  const [reviews, setReviews] = useState("NA");
  const [plot, setPlot] = useState("Not Available");
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const location = useLocation();
  console.log('location', location)
    let navigate = useNavigate();
  console.log("title parent",location.state.title);
  console.log("title",location.state.author);
  console.log("title",location.state.plot);

  const _title = location.state.title
  const _author = location.state.author
  const _publisher = location.state.publisher
  const _pages = location.state.pages
  const _img = location.state.img
  const _id = location.state.id
  const _plot = location.state.plot
  const _subTitle = location.state.subTitle






  // useEffect=()=>{
    
  //   console.log("_title",_title);
 
  // setTitle(_title)
  // setAuthor()
  // setPages(location.state.pages)
  // setPlot(location.state.plot)
  // setReviews(location.state.reviews)
  // setImg(location.state.img)
  // setId(location.state.id)
  // setSearch(location.state.search)

  // }

    const handleHome =()=>
    {
      let path = `/`
      navigate(path);
    }

    const handleStore =()=>{
      let path = `/MyBooks`
      navigate(path);
    }
    const handleBorrow =()=>{
      let path = `/Borrow`
      navigate(path,{state:{bookId:_id?_id:"BookId1",
      bookName:_title}});
    }
    
      const hadleSignUp =()=>{
        let path = `/signUp`
        navigate(path)
  
      }
     
      
      const handleContact =()=>{
        let path = `/Contact`
        navigate(path);
      }
      const handleLibraryClaw =()=>{
        let path = `/LibraryClaw`
        navigate(path);
      }
  

  
  return (
    
    <div className="book">
      {console.log("Title in main div",(title))}
      <div className="div">
        
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button onClick={handleHome}  className="text-wrapper-2">Home</button>
          <button onClick={handleBorrow} className="text-wrapper-3">Borrow</button>
          <button onClick={handleStore} className="text-wrapper-4">Store</button>
          <button onClick={handleContact} className="text-wrapper-5">Contact</button>
          <button onClick={handleLibraryClaw} className="text-wrapper-6">Library Claw</button>
        </div>
        <div className="overlap">
          <div className="infobook">
            <div className="text-wrapper-7">About the Book</div>
            <img className="img" alt="Book" src= {_img}/>
            <p className="title-textbook-of">
              <span className="span">
                Title
                <br />
              </span>
              <span className="text-wrapper-8">
                {console.log("title in element",title)}
                {_title}
                <br />
              </span>

              <span className="text-wrapper-8">
               Book Id : {_id}<br />
                <br />
              </span>

              <span className="span">
                Author
                <br />
              </span>
              <span className="text-wrapper-8">&nbsp;</span>
             
                <span className="text-wrapper-9">
                 {_author}
                  <br />
                  <br />
                </span>
            
              <span className="span">Publisher</span>
              <span className="text-wrapper-8">
                {" "}
                <br />
                {_publisher}  <br />
                <br />
              </span>
              <span className="span">
              
                <br />
              </span>
             
            </p>
            <div className="revuew-box">
              <img className="line" alt="Line" src="line-2.svg" />
              <div className="group">
                <div className="overlap-group-2">
                  <div className="text-wrapper-10">{_pages}</div>
                  <div className="text-wrapper-11">pages</div>
                </div>
              </div>
              <div className="overlap-wrapper">
                <div className="overlap-group-2">
                  <div className="text-wrapper-10">{reviews}</div>
                  <div className="text-wrapper-11">reviews</div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-wrapper">
            <div className="description">
              <p className="element-INTRODUCTION">
                <span className="text-wrapper-12">
                  <br />
                </span>
                <span className="text-wrapper-13">
                  <br />
                  1.1{" "}
                </span>
                <span className="text-wrapper-14">
                  INTRODUCTION: {_subTitle}
                  <br /><br/>
                </span>
                <span className="text-wrapper-13"> </span>
                <span className="text-wrapper-15">
                  {_plot}
                   
                </span>
              </p>

              
              <h1 className="h-1">{_title} </h1>
            </div>
            <div className="connect">
          <div className="overlap-group">
            <button onClick={handleBorrow} className="text-wrapper">Borrow</button >
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FigmaBook; 
