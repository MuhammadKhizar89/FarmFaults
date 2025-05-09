import {useState} from "react";
import convertToDMS from "../../utils/mapCordinatesConvertor";
import Description from "../reportAnError/Description";
function ErrorInfo({setOpenInfo, selectedPoint}) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    console.log(selectedPoint);
    const photos = selectedPoint?.photos || [];
    const handleNextImage = () => {
        setCurrentPhotoIndex((prevIndex) => Math.min(prevIndex + 1, photos.length - 1));
    };
    const handlePrevImage = () => {
        setCurrentPhotoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    return (
        <div className="absolute top-0  lg:right-0 z-50  bg-secondary w-[100%] lg:w-96 flex flex-col p-3 lg:p-10 lg:h-full">
            <button
                onClick={() => setOpenInfo(false)}
                className="absolute top-0 left-0 z-50 lg:left-3 lg:top-3 bg-[#E7DBCA] p-1 rounded-full shadow-md"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="#181C1E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <div className="relative">
                {photos.length == 0 && <img src={"./noImageAvailable.jpg"} alt="error" className="w-full h-64" />}
                {photos.length > 0 && (
                    <img src={photos[currentPhotoIndex]} alt="error" className="w-full h-64 object-cover " />
                )}

                {photos.length > 2 && (
                    <>
                        {currentPhotoIndex > 0 && (
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-[#E7DBCA] p-1 rounded-full shadow-md"
                            >
                                <svg
                                className="scale-x-[-1]"
                                    width="45"
                                    height="45"
                                    viewBox="0 0 59 59"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M29.6845 25.7597L23.3957 32.0485L21.8237 30.4766L27.3266 24.9737L21.8237 19.4709L23.3957 17.8989L29.6845 24.1878C29.8929 24.3962 30.01 24.6789 30.01 24.9737C30.01 25.2685 29.8929 25.5512 29.6845 25.7597Z"
                                        fill="#181C1E"
                                    />
                                </svg>
                            </button>
                        )}
                        {currentPhotoIndex < photos.length - 1 && (
                            <button
                                onClick={handleNextImage}
                                className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-[#E7DBCA] p-1 rounded-full shadow-md"
                            >
                                <svg
                                    width="45"
                                    height="45"
                                    viewBox="0 0 59 59"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M29.6845 25.7597L23.3957 32.0485L21.8237 30.4766L27.3266 24.9737L21.8237 19.4709L23.3957 17.8989L29.6845 24.1878C29.8929 24.3962 30.01 24.6789 30.01 24.9737C30.01 25.2685 29.8929 25.5512 29.6845 25.7597Z"
                                        fill="#181C1E"
                                    />
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>
            <p className="font-semibold">Location</p>
            <div className="flex space-x-1">
                <p className="opacity-60">{convertToDMS(selectedPoint.location?.latitude, "lat")}</p>
                <p className="opacity-60">{convertToDMS(selectedPoint.location?.longitude, "long")}</p>
            </div>
            <p className="font-semibold">Error Type</p>
            <p className="opacity-60">{selectedPoint.type}</p>
            <Description optional={false} description={selectedPoint.description} isEditable={false} />
        </div>
    );
}

export default ErrorInfo;
