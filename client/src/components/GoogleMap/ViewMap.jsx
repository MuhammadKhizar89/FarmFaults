import React, {useState, useCallback, useEffect, useRef} from "react";
import {GoogleMap, useJsApiLoader, MarkerF, Autocomplete} from "@react-google-maps/api";
import convertToDMS from "../../utils/mapCordinatesConvertor";

function ViewMap({points, width, height, setSelectedPoint, setOpenInfo, location}) {
    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ["places"],
    });
    const [map, setMap] = useState(null);
    const calculateHighDensityCenter = useCallback(() => {
        if (!points || points.length === 0) {
            return {lat: location.lat, lng: location.lng};
        }
        const radius = 0.01;
        let maxCount = 0;
        let highDensityPoint = points[0].location;
        points.forEach((pointA) => {
            const nearbyPoints = points.filter((pointB) => {
                const latDiff = pointA.location.latitude - pointB.location.latitude;
                const lngDiff = pointA.location.longitude - pointB.location.longitude;
                return Math.sqrt(latDiff ** 2 + lngDiff ** 2) <= radius;
            });
            if (nearbyPoints.length > maxCount) {
                maxCount = nearbyPoints.length;
                highDensityPoint = pointA.location;
            }
        });
        return {
            lat: highDensityPoint.latitude,
            lng: highDensityPoint.longitude,
        };
    }, [points, location]);

    const onLoad = useCallback(
        (mapInstance) => {
            const center = calculateHighDensityCenter();
            mapInstance.setCenter(center);
            setMap(mapInstance);
        },
        [calculateHighDensityCenter]
    );

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const [autocomplete, setAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                map.setCenter(newPosition);
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
                mapContainerStyle={{width, height}}
                center={calculateHighDensityCenter()}
                zoom={20}
                mapTypeId="satellite"
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: false,
                    mapTypeId: "satellite",
                }}
            >
                {points.map((point, index) => (
                    <MarkerF
                        key={`marker-${index}`}
                        position={{lat: point.location.latitude, lng: point.location.longitude}}
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
