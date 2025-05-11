import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete } from "@react-google-maps/api";
import convertToDMS from "../../utils/mapCordinatesConvertor";

function ViewMap({ points, width, height, setSelectedPoint, setOpenInfo, location }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ["places"],
    });

    const defaultLocation = { lat: location?.lat || 37.7749, lng: location?.lng || -122.4194 }; 
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(defaultLocation);
    const [autocomplete, setAutocomplete] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => {
                setCenter(defaultLocation); 
            }
        );
    }, []);

    const onLoad = useCallback((mapInstance) => {
        mapInstance.setTilt(67.5); 
        mapInstance.setHeading(90); 
        mapInstance.setZoom(20); 
        mapInstance.setMapTypeId("satellite");
        mapInstance.setCenter(center);
        setMap(mapInstance);
    }, [center]);
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(newPosition);
                map?.setCenter(newPosition);
            }
        }
    };

    const onAutocompleteLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    useEffect(() => {
        if (map && isLoaded) {
            points.forEach((point) => {
                const overlayPosition = {
                    lat: point.location.latitude + 0.000022,
                    lng: point.location.longitude + 0.000015,
                };
                const div = document.createElement("div");
                div.className = "flex items-center space-x-2";
                div.innerHTML = `
                    <div class="text-white font-light">${convertToDMS(point.location.latitude, "lat")}</div>
                    <div class="text-white font-light">${convertToDMS(point.location.longitude, "lng")}</div>
                `;
                const overlayView = new window.google.maps.OverlayView();
                overlayView.onAdd = function () {
                    this.getPanes().overlayMouseTarget.appendChild(div);
                };
                overlayView.draw = function () {
                    const projection = this.getProjection();
                    const position = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(overlayPosition));
                    if (div) {
                        div.style.position = "absolute";
                        div.style.left = `${position.x}px`;
                        div.style.top = `${position.y}px`;
                    }
                };
                overlayView.onRemove = function () {
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                };
                overlayView.setMap(map);
            });
        }
    }, [map, points, isLoaded]);

    return isLoaded ? (
        <div className="relative rounded-xl lg:px-20 px-2">
            <div className="absolute p-3 z-10 w-96 lg:w-64">
                <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a location"
                        className="w-2/3 lg:w-full px-3 py-2 border rounded-lg"
                    />
                </Autocomplete>
            </div>
            <GoogleMap
                mapContainerStyle={{ width, height }}
                center={center}
                zoom={18}
                mapTypeId="satellite"
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: false,
                }}
            >
                {points.map((point, index) => (
                    <MarkerF
                        key={`marker-${index}`}
                        position={{ lat: point.location.latitude, lng: point.location.longitude }}
                        icon="./markerIcon.png"
                        onClick={() => {
                            setSelectedPoint(point);
                            setOpenInfo(true);
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    ) : (
        <div>Loading Map...</div>
    );
}

export default React.memo(ViewMap);
