import { useState } from "react";
import ReactMapGL from "react-map-gl";

function Map() {
    const [viewport, setViewport] = useState ({
        width: "100%",
        height: "100%",
        latitude: 37.7577,
        longitude: -122.4379,
        zoom: 13,
    });

    return (
    <ReactMapGL
        mapStyle='mapbox://styles/madybyvee/cl9g94tpu006p14mm794z8uxn'
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
    );
}

export default Map;
