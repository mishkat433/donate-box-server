

const nextDateCount = async (originalDate: string, restMonth: number) => {

    let nextDonateDate = new Date(originalDate);
    nextDonateDate.setMonth(nextDonateDate.getMonth() + restMonth);
    console.log(nextDonateDate);
    const formateDate = nextDonateDate.toISOString()

    return formateDate

}

export default nextDateCount