import { Admin } from "./admin.model";


export const findLastAdminId = async () => {
    const lastUser = await Admin.findOne({}, { adminId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

    return lastUser?.adminId;
};

export const generateAdminId = async () => {
    const currentId = (await findLastAdminId()) || 'Admin-0';

    const incrementId = 'Admin-' + (parseInt(currentId.slice(6)) + 1).toString()

    return incrementId;

    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
};
