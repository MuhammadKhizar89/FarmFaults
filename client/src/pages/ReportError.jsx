import { useEffect, useState } from "react";
import ReportErrorMap from "../components/GoogleMap/ReportErrorMap";
import ErrorForm from "../components/reportAnError/ErrorForm";
import { useDispatch, useSelector } from 'react-redux';
import { addError, clearAddErrorResponse } from '../store/slices/errorSlice';
import { useGeolocation } from "../hooks/useGeoLocation";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import Loader from "../svgs/Loader";

export default function ReportError() {
    const [type, setType] = useState("");
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [location, setLocation] = useState({ lat: 40.0139, lng: -83.0104 });
    const { isLoading: geoLoading, position, error, getPosition } = useGeolocation();
    const [errors, setErrors] = useState({ type: false, photos: false });
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, addErrorResponse } = useSelector((state) => state.error);

    useEffect(() => {
        getPosition();
    }, []);

    useEffect(() => {
        if (position) setLocation(position);
    }, [position]);

    useEffect(() => {
        if (addErrorResponse) {
            if (addErrorResponse.message === "Error with this location and type already exists for this user") {
                toast.error("Error with this location and type already exists for your Account");
            } else {
                setType("");
                setPhotos([]);
                setDescription("");
                setPoints(0);
                toast.success("Error Successfully Reported");
                navigate("/view-map");
            }
            dispatch(clearAddErrorResponse());
        }
    }, [addErrorResponse, navigate, points, dispatch]);

    const handleSubmit = async () => {
        if (type === "") {
            setErrors((prevErrors) => ({ ...prevErrors, type: true }));
            toast.error("Please Select Type of Error");
            return;
        }
        if (photos.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, photos: true }));
            toast.error("Please Select At least One Picture");
            return;
        }

        const body = {
            type,
            photos,
            description,
            location: {
                latitude: location.lat,
                longitude: location.lng,
            },
            points,
        };
        setDisable(true);
        dispatch(addError(body)).finally(() => setDisable(false));
    };

    return (
        <div className="flex flex-col w-[100%] min-h-[100vh] px-10 overflow-x-auto space-y-10 pt-14 lg:pt-4 bg-primary">
            <h1 className="heading font-light lg:ml-14">Report an error</h1>
            <div className="flex flex-col items-center lg:items-start justify-center w-[100%] space-x-0 lg:space-x-12 lg:flex-row">
                <ErrorForm
                    setDisable={setDisable}
                    disable={disable}
                    description={description}
                    type={type}
                    setType={setType}
                    photos={photos}
                    setPoints={setPoints}
                    setPhotos={setPhotos}
                    setDescription={setDescription}
                    errors={errors}
                >
                    <button
                        onClick={handleSubmit}
                        className={`bg-tertiary text-white txt-lg promoTest font-light p-4 ${disable ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            }`}
                        disabled={disable}
                    >
                        {(geoLoading || isLoading || disable) ? <Loader color={"white"} className={"animate-spin w-[28px] h-[28px] mx-auto"} /> : "Report Error"}
                    </button>
                </ErrorForm>
                <ReportErrorMap point={location} setPoint={setLocation} />
            </div>
        </div>
    );
}
