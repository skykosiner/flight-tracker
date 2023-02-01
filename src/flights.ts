import puppeteer from "puppeteer";
import { clickEnter, getDates, wait } from "./utils";

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
    leaveDate: string,
};

export class Flights {
    constructor(private dateRange: string[], private email: string, private price: number, private startLocation: string, private endLocation: string) { };

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
        console.log(this.price);
        let flights: Flight[] = [];
        const dates = getDates(this.dateRange);

        if (dates.leaveDate == "" || dates.ariveDate == "") {
            throw new Error(`Dates are blank ${dates}`)
        }

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.skyscanner.net");

        // Accept cookies
        wait(1000)
        const cookies = await page.$x('//*[@id="acceptCookieButton"]');
        //@ts-ignore
        cookies[0].click();

        // Start location
        wait(1000);
        await page.click("#fsc-origin-search");
        await page.type("#fsc-origin-search", this.startLocation, { delay: 500 });
        clickEnter(1000, page);

        // End location
        wait(1000);
        await page.click("#fsc-destination-search");
        await page.type("#fsc-destination-search", this.endLocation, { delay: 500 });
        clickEnter(2000, page);

        return flights;
   };

    private emailInfo(flightInfo: Flight): void {
        console.log(flightInfo);
        console.log(this.email);
    }
};
