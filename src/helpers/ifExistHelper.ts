import httpStatus from "http-status";
import ApiError from "../Errors/ApiError";

const checkExist = async (dbName: any, field: object, other: any) => {

    const isExist = await dbName.findOne(field, { role: 1, password: 1, ...other }).lean();

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
    }

    return isExist

}

export default checkExist