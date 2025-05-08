import ErrorEnum from "../models/errorEnum.model.js";
export async function addErrorEnum(req, res, next) {
    return res.status(201).send({ message: "Hello"});
}
export async function getErrorEnum(req, res, next) {
    
        const data = await ErrorEnum.find();
        return res.status(200).send({ message: "Data fetched successfully", data });
}
