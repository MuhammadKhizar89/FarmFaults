import React, { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, Autocomplete } from "@react-google-maps/api";
import convertToDMS from "../../utils/mapCordinatesConvertor";
const containerStyle = {
    width: "100%",
    height: "400px",
};

function ReportErrorMap({point, setPoint}) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ["places"], 
    });    
    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null); 
    const inputRef = useRef(null); 
    const onLoad = useCallback(function callback(map) {
        if (point.lat !== 0 && point.lng !== 0) {
            map.setCenter(point);
        }
        setMap(map);
    }, [point]);
    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setPoint(newPosition);
                map.setCenter(newPosition);
            }
        }
    };
    const onAutocompleteLoad = (auto) => {
        setAutocomplete(auto);
    };
    const handleMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setPoint(newPosition);
    };
    return isLoaded ? (
        <div className="rounded-xl w-[100%]">
            <h2 className="txt-lg mb-2">Enter error location in the map below</h2>
            <div className="relative">
                <div className="absolute top-4 left-4 z-10 w-64">
                    <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search your location"
                            className="w-2/3 lg:w-full px-3 py-2 border rounded-lg"
                        />
                    </Autocomplete>
                </div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={point}
                    zoom={30}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={handleMapClick}
                    options={{
                        mapTypeControl: false,
                        mapTypeId: "satellite", 
                    }}
                >
                    <MarkerF position={point} icon={"./markerIcon.png"} />
                    {point && <MarkerF position={point} icon={"./userMarkerIcon.png"} />}
                    <OverlayView
                        position={{ lat: point.lat + 0.000022, lng: point.lng + 0.000015 }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className="flex items-center space-x-2">
                            <div className="text-white font-light">{`${convertToDMS(point.lat, "lat")}`}</div>
                            <div className="text-white font-light">{`${convertToDMS(point.lng, "lng")}`}</div>
                        </div>
                    </OverlayView>
                </GoogleMap>
            </div>

            <div className="flex items-center my-2 space-x-2 ">
                <h2 className="txt-lg text-sm lg:text-base">Current error location</h2>
                {point ? (
                    <div className="text-sm  flex space-x-2">
                        <div>{convertToDMS(point.lat, "lat")}</div>
                        <div>{convertToDMS(point.lng, "lng")}</div>
                    </div>
                ) : (
                    <div className="text-sm ">No location selected.</div>
                )}
            </div>
        </div>
    ) : (
        <div>Loading Map...</div>
    );
}
export default React.memo(ReportErrorMap);
