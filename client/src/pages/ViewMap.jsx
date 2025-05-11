import { useEffect, useState } from "react";
import ViewMapComp from "../components/GoogleMap/ViewMap";
import { useDispatch, useSelector } from "react-redux";
import { getAllErrors } from "../store/slices/errorSlice";
import ErrorInfo from "../components/viewMap/ErrorInfo";
import { useGeolocation } from "../hooks/useGeoLocation";

export default function ViewMap() {
    const [selectedPoint, setSelectedPoint] = useState({});
    const [openInfo, setOpenInfo] = useState(false);
    const [location, setLocation] = useState({lat: 40.0139, lng: -83.0104});
    const { isLoading: geoLoading, position, error, getPosition } = useGeolocation();

    const dispatch = useDispatch();
    const { errors, isLoading } = useSelector((state) => state.error);

    useEffect(() => {
        getPosition();
    }, []);

    useEffect(() => {
        if (position) setLocation(position);
    }, [position]);

    useEffect(() => {
        dispatch(getAllErrors());
    }, [dispatch]);

    return (
        <div className="w-[100%] min-h-[100vh] bg-primary flex flex-col py-8 pt-14  lg:p-4 ">
            <h1 className="heading font-light my-2 ">View Map</h1>
            {!isLoading && (
                <ViewMapComp location={location} setOpenInfo={setOpenInfo} setSelectedPoint={setSelectedPoint} points={errors} width={"100%"} height={"70vh"} />
            )}
            {!isLoading && openInfo && <ErrorInfo setOpenInfo={setOpenInfo} selectedPoint={selectedPoint} />}
        </div>
    );
}
