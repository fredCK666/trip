"use client";

import { useEffect } from "react";
import { divIcon, latLngBounds } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type MapPoint = { title:string; time:string; lat:number; lng:number };

function FitRoute({points}:{points:MapPoint[]}) {
  const map=useMap();
  useEffect(()=>{
    if(!points.length)return;
    const bounds=latLngBounds(points.map(point=>[point.lat,point.lng]));
    map.fitBounds(bounds,{padding:[38,38],maxZoom:15});
  },[map,points]);
  return null;
}

export default function ItineraryMap({points,color}:{points:MapPoint[];color:string}) {
  if(!points.length)return null;
  const center:[number,number]=[points[0].lat,points[0].lng];
  return <div className="map-shell">
    <div className="map-title"><div><span>MAP ROUTE</span><h3>當日地圖動線</h3></div><p>拖曳移動・雙指縮放・點編號看地點</p></div>
    <MapContainer center={center} zoom={12} scrollWheelZoom className="route-map">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <FitRoute points={points}/>
      <Polyline positions={points.map(point=>[point.lat,point.lng])} pathOptions={{color,weight:4,opacity:.72,dashArray:"9 8"}}/>
      {points.map((point,index)=><Marker key={`${point.title}-${index}`} position={[point.lat,point.lng]} icon={divIcon({className:"number-marker-wrap",html:`<span class="number-marker" style="--marker:${color}">${index+1}</span>`,iconSize:[34,34],iconAnchor:[17,17]})}><Popup><strong>{index+1}. {point.title}</strong><br/><span>{point.time}</span></Popup></Marker>)}
    </MapContainer>
    <div className="map-legend">{points.map((point,index)=><span key={`${point.title}-legend`}><b style={{background:color}}>{index+1}</b>{point.title}</span>)}</div>
  </div>;
}
