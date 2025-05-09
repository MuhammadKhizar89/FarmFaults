import React, {useState} from "react";
import useCloudinary from "../../hooks/useCloudinary";

function ImageUploadSection({disable,setDisable,errors, images, setImages}) {
    
    const {uploadImage,deleteImage} = useCloudinary();
    const [startIndex, setStartIndex] = useState(0); // Keeps track of the first image in the view
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const uploadedImages = [];
            setDisable(true);
            for (const file of files) {
                const {success, imageUrl} = await uploadImage(file);
                if (success && imageUrl) {
                    uploadedImages.push(imageUrl);
                }
            }
            setDisable(false);

            setImages((prevImages) => [...prevImages, ...uploadedImages]);
        }
    };

    const handleDeleteImage = (url) => {
        setImages((prevImages) => prevImages.filter((image) => image !== url));
        deleteImage(url);
    };

    const handleNextImages = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + 4, images.length - 4));
    };

    const handlePrevImages = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    };

    return (
        <div className="flex flex-col space-y-2">
            <p className="text-xs font-light text-[#181C1E]">Uploaded Photos</p>
            <div className="flex gap-4  relative min-w-[210px]">
                {/* Display up to 4 images at a time */}
                {images.slice(startIndex, startIndex + 4).map((url, index) => (
                    <div key={index} className="relative w-16 h-16">
                        <img
                            src={url}
                            alt={`Uploaded Preview ${index}`}
                            className="w-14 h-14 object-cover rounded-2xl"
                        />
                        <button onClick={() => handleDeleteImage(url)} className="absolute !bg-transparent top-[-12px] right-[45%]">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="15" height="15" rx="7.5" fill="#F5EAD9" />
                                <path
                                    d="M4.8 11L4 10.2L7.2 7L4 3.8L4.8 3L8 6.2L11.2 3L12 3.8L8.8 7L12 10.2L11.2 11L8 7.8L4.8 11Z"
                                    fill="#181C1E"
                                />
                            </svg>
                        </button>
                    </div>
                ))}

                {/* Right navigation button */}
                {startIndex + 4 < images.length && (
                    <button
                        onClick={handleNextImages}
                        className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full shadow-md"
                    >
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="17" height="17" rx="8.5" fill="#F5EAD9" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.111 9.11102L7.22203 14L6 12.778L10.278 8.5L6 4.22203L7.22203 3L12.111 7.88898C12.273 8.05105 12.3641 8.27083 12.3641 8.5C12.3641 8.72916 12.273 8.94895 12.111 9.11102Z"
                                fill="#181C1E"
                            />
                        </svg>
                    </button>
                )}

                {/* Left navigation button */}
                {startIndex > 0 && (
                    <button
                        onClick={handlePrevImages}
                        className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full shadow-md"
                    >
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="17" height="17" rx="8.5" fill="#F5EAD9" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.889 9.11102L9.778 14L11 12.778L6.722 8.5L11 4.22203L9.778 3L4.889 7.88898C4.727 8.05105 4.63594 8.27083 4.63594 8.5C4.63594 8.72916 4.727 8.94895 4.889 9.11102Z"
                                fill="#181C1E"
                            />
                        </svg>
                    </button>
                )}
            </div>

            <input
                disabled={disable}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                multiple
            />
            <label
                htmlFor="image-upload"
                className={`flex justify-center items-center gap-2 bg-secondary rounded-lg p-2 ${
                    disable ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
            >
                <p className={`txt text-lg ${errors.photos ? "text-red-500" : ""} `}>Upload Photos</p>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.3125 14.25V4.57187L5.225 7.65937L3.5625 5.9375L9.5 0L15.4375 5.9375L13.775 7.65937L10.6875 4.57187V14.25H8.3125ZM2.375 19C1.72187 19 1.16296 18.7676 0.69825 18.3029C0.233541 17.8382 0.000791667 17.2789 0 16.625V13.0625H2.375V16.625H16.625V13.0625H19V16.625C19 17.2781 18.7676 17.8374 18.3029 18.3029C17.8382 18.7684 17.2789 19.0008 16.625 19H2.375Z"
                        fill="#181C1E"
                    />
                </svg>
            </label>
        </div>
    );
}

export default ImageUploadSection;
