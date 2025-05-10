import {useEffect, useState} from "react";
import {getErrorEnumApiCall} from "../../apis/errorEnum.api";

function SelectError({type,errors,setType, setPoints}) {
    const [errorTypes, setErrorTypes] = useState([]);
    useEffect(() => {
        const ApiCall = async () => {
            try {
                const response = await getErrorEnumApiCall();
                setErrorTypes(response.data);
            } catch (error) {
                console.error("Error fetching error types:", error);
            }
        };
        ApiCall();
    }, []);

    const handleSelectType = (e) => {
        const {points, type} = JSON.parse(e.target.value);
        setPoints(points);
        setType(type);
    };
    console.log(errors);
    return (
        <div className={`relative inline-block w-full border-b-2  ${errors.type ? "border-red-500" : "border-tertiary"}`}>
           <select
                onChange={handleSelectType}
                value={type ? JSON.stringify({ type, points: errorTypes.find(err => err.name === type)?.points }) : ""}
                className="block appearance-none promoTest w-full py-3 text-xl bg-primary focus:outline-none"
            >
                <option value="" disabled selected>
                    Select Error Type
                </option>
                {errorTypes.map((errorType, index) => (
                    <option key={index} value={JSON.stringify({type: errorType.name, points: errorType.points})}>
                        {errorType.name} - {errorType.points} Points
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-7 right-0 flex items-center pointer-events-none ">
                <svg
                    className="w-5 h-5 text-gray-400 bg-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
    );
}

export default SelectError;
