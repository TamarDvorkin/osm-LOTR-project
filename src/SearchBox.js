
import React, { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import Locations from './Components/Locations';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import { icon } from "leaflet";


import { render } from "@testing-library/react";


const NOMINATION_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails"


};



export default function SearchBox(props){

    const {selectPosition, setSelectPosition} = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace]=useState([]);

    return(
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
            
            
        
                <div style={{ display: "flex", padding: "20px" }}>
                    <div style={{ flex: 1, fontStyle: "oblique", fontSize: "50px", color: "black", }}>
                        New Zealand Or Middle Earth?

                        <OutlinedInput style={{ width: "100%", value: searchText }}
                            onChange={(event) => {

                                setSearchText(event.target.value);

                            }}



                        />




                    </div>

                    <div style={{ display: "flex", alignItems: "end", padding: "10px 50px" }}> 
                    
                        
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
                <div  style={{maxHeight:"20px", padding: "70px"}}>
                    <List component="nav" aria-label="main mailbox folders">
                        {listPlace.map((item)=>{
                            return(
                                 <div key = {item?.place_id}>
                                    <ListItem 
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                        //now Im keeping user input as js object
                                        console.log(item);
                                        //here I want to close the results- the list options that item was choosen from
                                        setListPlace([]);// this should be an empty array
                            


                                        
                                   
                                        
                                        const JsonItem = JSON.stringify(item);
                                       
                                        const ItemArray = [];
                                        ItemArray.push(item); 
                                        console.log(ItemArray);

                                        //Now  send request and get respond to and from back

                                    
                                        const options = {
                                             method: 'GET',
                                             url: "http://localhost:3001/locations?"+"lon="+item.lon+"&lat="+item.lat,  //that is my server response structre
                                             
                                         }
                                
                                         axios.request(options).then((response) => {
                                             console.log(response.data, "Hey there, you send data to server - wait for LOTR server  response :)")
                                             console.log(item)
 

                                            
                                             alert("Elen síla lúmenn' omentielvo\nA star shines on the hour of our meeting\n"+response.data.toString());
                                            
                                
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

