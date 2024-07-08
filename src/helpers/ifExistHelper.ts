import httpStatus from "http-status";
import ApiError from "../Errors/ApiError";

const checkExist = async (dbName: any, findField: object, other: any, message: string = "User") => {

    const isExist = await dbName.findOne(findField, { role: 1, password: 1, ...other }).lean();

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, `${message} does not exist`);
    }

    return isExist

}

export default checkExist