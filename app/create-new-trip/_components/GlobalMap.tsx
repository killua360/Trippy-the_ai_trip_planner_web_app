import React,{useEffect,useRef} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

function GlobalMap(){

    const mapContainerRef=useRef(null);
    
   useEffect(() => {
  if (!mapContainerRef.current) return;

  const MAPBOX_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  if (!MAPBOX_KEY) {
    console.error("Mapbox key missing");
    return;
  }

  mapboxgl.accessToken = MAPBOX_KEY;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-74.5, 40],
    zoom: 1.3,
    projection:'globe'
  });

  return () => map.remove();
}, []);
    return (
        <div>
            <div ref={mapContainerRef} 
            style={{
                width:'100%',
                height: '90vh',
                borderRadius: 20
            }}>

            </div>
        </div>
    )
}

export default GlobalMap