import React, { useState, Component } from "react";


import SearchBox from "./SearchBox";
import Maps from "./Maps";
// import axios from 'axios'
// import { render } from "@testing-library/react";
// import Locations from './Components/Locations';


import "./index.css"




export default function App() {
 

    const[selectPosition, setSelectPosition]= useState(null);
    
    return(
     

      

      
      <div className = "searchBox" style = {{ border: "2px solid black", width: "100vw", height: "100vh" }}>
        
        
  
           <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />  
         
        
        
        
        
       

           
         
          
  
  
        <div className="Map" style={{ border: "2px solid black", width: " 100vw", height: "100vh" }}>
         
  
           <Maps selectPosition={selectPosition} /> 

        
  
  
  
  
        </div>
  
  
  
  
       </div >);
    }






