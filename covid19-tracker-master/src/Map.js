import React from 'react'
import { Map as LeafletMap, TileLayer} from 'leaflet'

function MapBox() {
    return (
        <div className="map__box">
            <LeafletMap>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright"> OpenStreetMap</a> Contributors'
            
            />
            </LeafletMap>
        </div>
    )
}

export default MapBox
