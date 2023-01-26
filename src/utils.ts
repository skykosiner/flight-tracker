import { Dates } from "./flights";

export function GetDates(dateRange: string[]): Dates {
    const dates: Dates = {
        ariveDate: "",
        leaveDate: "",
    };

    for (let i = 0; i < dateRange.length; i++) {
        if (i === 0) {
            dates.ariveDate = dateRange[i];
        } else {
            dates.leaveDate = dateRange[i];
        }
    }

    return dates
}
