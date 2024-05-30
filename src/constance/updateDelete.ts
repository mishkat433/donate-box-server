

export type IDeleteType = {
    acknowledged: boolean;
    deletedCount: number;
}


export type IUpdateType = {
    acknowledged: boolean,
    modifiedCount: number;
    upsertedId: any;
    upsertedCount: number;
    matchedCount: number
}