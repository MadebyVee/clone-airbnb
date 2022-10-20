import { useState } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";


function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // transform search results to coord (lat,long) into object
        const coordinates = searchResults.map((result) => ({
            longitude: result.long,
            latitude: result.lat,
        }));

        const center = getCenter(coordinates);
        
        const [viewState, setViewState] = useState ({
            width: "100%",
            height: "100%",
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: 11,
        });
        // console.log (selectedLocation);
    return (
        <ReactMapGL
        mapStyle='mapbox://styles/madybyvee/cl9g94tpu006p14mm794z8uxn'
        mapboxAccessToken={process.env.mapbox_key}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}    // onViewStateChange={(nextViewState) => setViewState(nextViewState)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        // offsetLeft={-20}
                        // offsetTop={-10}
                        anchor="center" 
                        >
                        <p 
                            role="img"
                            onClick={() => setSelectedLocation(result)} 
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                            >📌</p>
                    </Marker>

                    {/* The Popup that should show if we click on a marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            <div className="text-xs">
                            {result.title}
                            </div>
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}

        </ReactMapGL>
    
    );
}

export default Map;
