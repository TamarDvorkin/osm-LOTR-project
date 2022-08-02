import React, { useState} from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import "./index.css";
import ReactDOM from "react-dom/client"

export default function App() {
    const[selectPosition, setSelectPosition]= useState(null);
    const[positionLOTR, setPositionLOTR]= useState(null);

    
    return(
      <div className = "searchBox" style = {{ border: "2px solid black", width: "100vw", height: "100vh" }}>
           <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} positionLOTR = {positionLOTR} setPositionLOTR = {setPositionLOTR} />
           
           
     
        <div className="Map" style={{ border: "2px solid black", width: " 100vw", height: "100vh" }}>
           <Maps selectPosition={selectPosition} positionLOTR = {positionLOTR}  /> 
        </div>
      </div >);
    }

//ReactDOM.createRoot(document.getElementById("root"),).render(<App/> , document.querySelector('#scrollList'));













