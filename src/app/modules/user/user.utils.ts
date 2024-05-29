import { User } from "./user.model";


export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { userId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

    return lastUser?.userId;
};

export const generateUserId = async () => {
    const currentId = (await findLastUserId()) || 'Donner-0';

    const incrementId = 'Donner-' + (parseInt(currentId.slice(7)) + 1).toString()

    return incrementId;

    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
};
