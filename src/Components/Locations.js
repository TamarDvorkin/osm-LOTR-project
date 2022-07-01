import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";


  
      
 function Locations () {
        const [locations, setLocations]= useState([]);
  
     

    return (<div style={{ display: "flex", alignItems: "end", padding: "10px 20px" }}>
            {locations.map(location => <li key={locations.id}>{location}</li>)}
            <button onClick={Locations}>getLOTR</button>
            
        </div>)
    
}

export default Locations;