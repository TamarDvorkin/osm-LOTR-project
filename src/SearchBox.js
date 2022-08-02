
import React, { useState, useRef, useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { color } from "@mui/system";



const NOMINATION_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails"

};




export default function SearchBox(props){

    const {selectPosition, setSelectPosition} = props;
    const {positionLOTR, setPositionLOTR} = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace]=useState([]);

    
 
    

    return(
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <div style={{ display: "flex", padding: "20px" }}>
                    <div style={{ flex: 1, fontStyle: "oblique", fontSize: "50px", color: "black", textShadow: "2px 2px 2px white" }}>
                        New Zealand Or Middle Earth?

                        <OutlinedInput style={{ width: "100%", value: searchText, color:"black", fontWeight: "bold" }}
                            onChange={(event) => {

                                setSearchText(event.target.value);
                            

                            }}

                        />
                    </div>
                    <div  style={{ display: "flex", alignItems: "end", padding: "10px 50px"}} > 
                    
                        
                        <Button variant="contained" color="primary" onClick={() => {
                            

                            const params = {

                                q: searchText,
                                format: "json",
                                addressdetails: 1,
                                polygon_geojson: 0
                            };

                            const queryString = new URLSearchParams(params).toString();
                            const requestOptions = {
                                method: "GET",
                                redirect: "follow"
                            };
                            fetch(`${NOMINATION_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())

                                .then((result) => {
                                   
                                    const parseResult = JSON.parse(result);
                                    console.log(JSON.parse(result));
                                    setListPlace(JSON.parse(result));


                                })
                                .catch((err) => console.log("err: ", err));

                        }}>
                            SearchBox
                        </Button>
                        
                </div>
                <div id = "placeList" style={{maxHeight:"20px", padding: "70px" }}>
                    <List id = "scrollList" component="nav" aria-label="main mailbox folders">  
                        {listPlace.map((item)=>{
                            return(
                                 <div key = {item?.place_id} >
                                 
                                    <ListItem 
                                   
                                    button
                                    onClick={() => {
                                        
                                        setSelectPosition(item);    
                                        console.log(item)
                                        
                                      
                                        
                                        // close the list results
                                        setListPlace([]);
                                        //Now send request and get respond to and from back
                                    
                                        const options = {
                                             method: 'GET',
                                             url: "http://localhost:3001/locations?"+"lon="+item.lon+"&lat="+item.lat,  //that is my server response structre
                                             
                                         }
                                
                                         axios.request(options).then((response) => {
                                            console.log("axius re" +response)
                                             

                                                let obj = JSON.parse(response.data);
                                                let resArray = [];
                                              
                                                for(let i in obj)
                                                    resArray.push(obj[i]);
                                               

                                                
                                                const alarmLon = parseFloat(resArray[1])
                                                const alarmLat = parseFloat(resArray[2]) 


                                                const coordToDrawLine =[];
                                                coordToDrawLine.push(alarmLon, alarmLat);
                                             
                                                setPositionLOTR(coordToDrawLine); //take to Map compennent
                                                console.log("take to map" +  coordToDrawLine); //remove me 
                                                

                                              
                                              
                                                const LOTRname= response.data.toString()
                                                const SpliteachLOTRname = LOTRname.split(",")

                                                const NameFromResopnse = SpliteachLOTRname[0]           
                                                let alertThis = ""

                                                if(NameFromResopnse.includes("Shire")){
                                                    alertThis = "What about second breakfast?\n"}
                                                else if(NameFromResopnse== "Ithilien"){
                                                    alertThis = "All we wish is to catch a fish!\n"}
                                                else if(NameFromResopnse.includes("Mordor")){
                                                    alertThis = "One does not simply walk into Mordor!\n"}
                                                else if(NameFromResopnse.includes("Dimholt Road")){
                                                    alertThis = "Fight for us, and regain your honor.\n What say you?\n"}
                                                else if(NameFromResopnse.includes("Dimrill Dale")){
                                                    alertThis = "Run, you fools!\n"}
                                                else if(NameFromResopnse.includes("Ered Nimrais")){
                                                    alertThis = "The beacon of Amon Din is lit!\n Gondor calls for aid\n"}
                                                else if(NameFromResopnse.includes("Edoras")){
                                                    alertThis = "And Rohan will answer. Muster the Rohirrim\n"}
                                                else if(NameFromResopnse.includes("Ford of Bruinen")){
                                                        alertThis = "Nîn o Chithaeglir,lasto beth dhaer\nRimmo nîn Bruinen dan in Ulaer\n"}
                                                else if(NameFromResopnse.includes("Isengard")){
                                                    alertThis = "There will be no dawn... for Men\n"}
                                                else if(NameFromResopnse.includes("camp")){
                                                    alertThis = "What's taters, precious? What's taters, eh?\n Po-tay-toes!\n"}
                                                else if(NameFromResopnse.includes("The Argonath on the Anduin River")){
                                                    alertThis = "Long have I desired to look upon the Kings of old. My kin\n"}
                                                else if(NameFromResopnse.includes("Silverlode and Anduin rivers")){
                                                    alertThis = "I give you the light of Earendil, our most beloved star.\n May it be a light for you in dark places,\n when all other lights go out\n"}
                                                else if(NameFromResopnse.includes("Fangorn Forest")){
                                                    alertThis = " Tree? I am no tree! I am an Ent\n"}
                                                else if(NameFromResopnse.includes("Rivendell")){
                                                    alertThis = "Elen síla lúmenn' omentielvo\nA star shines on the hour of our meeting\n"}
                                                else if(NameFromResopnse.includes("Dead Marshes")){
                                                    alertThis = "Don't follow the lights\n"}
  
                                                alert(alertThis + response.data.toString());

                                        }).catch((error) => {
                                             console.error(error)
                                            
                                         })

                                    }}
   
                                    >
                                     
                                        <ListItemIcon>
                                            <img src="./leafLorien.png" alt="Leaf of Lorien Icon " style={{ width: "20%", height: "20%" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item?.display_name} />
                                    </ListItem>
                                    <Divider />

                                 </div>

                            )
                        })}
                     
                    </List>
            </div>
            </div>

        </div>
    </div>

    )
}

