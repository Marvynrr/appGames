import { useEffect, useState } from "react";
import haversine from "../haversine";

const MyShop = () => {

    const [myShop, setMyShop] = useState({name:"", distance:"", city:""});

useEffect( () => {
    const url = "https://formacitron.github.io/shopslist/shops.json";
    fetch(url)
    .then( (response) => response.json() )
    .then( (shops) => {console.log(shops) 

    navigator.geolocation.getCurrentPosition((position) => {
        const nearest = {distance: null, shop: null}
        for(const shop of shops){
            const a = {latitude: position.coords.latitude, longitude: position.coords.longitude}
            const b = {latitude: shop.gps_lat, longitude: shop.gps_lng}

            const distance = haversine(a, b) // 714504.18 (in meters)
            if (nearest.distance == null){
                nearest.distance = distance;
                nearest.shop = shop;
            } else {
                if (nearest.distance > distance){
                    nearest.distance = distance;
                    nearest.shop = shop;
                }
            }
        }
        setMyShop({name:nearest.shop.name, distance:(nearest.distance/1000).toFixed(2), city:nearest.shop.city});
        
    });
    });
}, []);

    return (
        <div className="flex flex-col h-full text-center">
        <h1 className="text-2xl text-center">{myShop.name}</h1>
        <p className="flex-grow">{myShop.city}</p>
        <p>{myShop.distance}</p>
        </div>
    )
}

export default MyShop;