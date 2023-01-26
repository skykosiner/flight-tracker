import { GetDates } from "./utils";

export interface Flight {
    airline: string,
    price: string,
    dates: string[],
    stops?: string[],
    luggageSize: string,
    url: string,
};

export interface Dates {
    ariveDate: string,
    leaveDate: string
};

export class Flights {
    constructor(private dateRange: string[], private email: string, private price: number, private startFrom: string, private endFrom: string) { };

    public init(): void {
        const flights = this.findFlights();
        flights.then((flights) => {
            flights.map((flight) => {
                this.emailInfo(flight);
                console.log(flight);
            });
        });
    };

    private async findFlights(): Promise<Flight[]> {
        let flights: Flight[] = [];
        const dates = GetDates(this.dateRange);

        if (dates.leaveDate === "" || dates.ariveDate === "") {
            throw new Error(`Dates are blank ${dates}`)
        }

        return flights;
    };

    private emailInfo(flightInfo: Flight): void {
        console.log(flightInfo);
        console.log(this.email);
    }
};
