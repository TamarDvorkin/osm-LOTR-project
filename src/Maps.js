
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer,useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {useMapEvents} from "react-leaflet";
import {useState} from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { render } from "@testing-library/react";
import "./index.css";


const icon = L.icon({
    iconUrl: "./leafLorien.png",
    iconSize: [38,38]
});



const position = [-41.28664, 174.77557]
const center = position
const defaultZoom = 5;

function ResetCenterView(props){
    const{ selectPosition } = props;
    const map = useMap();
 
    useEffect(()=>{
        if(selectPosition){
            
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon), 12
            
            )
        }
       
        }, [selectPosition]);

        

        return null;
    

    }
    


export default function Map(props){

    const {selectPosition}= props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
              }
            },
          }),
          [],
        )
        const toggleDraggable = useCallback(() => {
          setDraggable((d) => !d)
        }, [])



    return(
        <MapContainer

            center={position} zoom={defaultZoom} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=EGyJrb2Jr8vTMD6zSMqN"
            />

            {selectPosition && (
                <Marker position={locationSelection} icon={icon} zoom={10}
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    //position_={position}
                    ref={markerRef}>

                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'ZOOM IN'
                                : 'ZOOM IN'}
                        </span>

                    </Popup>
                </Marker>
            )
            }
            
            <ResetCenterView selectPosition={selectPosition} /> 
        </MapContainer>

    )

}