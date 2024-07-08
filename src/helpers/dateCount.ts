

const nextDateCount = async (originalDate: string, restMonth: number) => {

    let nextDonateDate = new Date(originalDate);
    nextDonateDate.setMonth(nextDonateDate.getMonth() + restMonth);
    const formateDate = nextDonateDate.toISOString()

    return formateDate

}

export default nextDateCount