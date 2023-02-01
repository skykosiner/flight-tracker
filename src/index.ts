import { Flights } from "./flights";
import { emailMeDaddy } from "./utils";

require('dotenv').config();

interface Args {
    dateRange: string[],
    email: string,
    price: number,
    startFrom: string,
    endFrom: string,
}

// new Flights(["16th March 2023", "20th March 2023"], "ykosiner@gmail.com", 3000, "Brazil", "London - Heathrow").init()
const argsArr = process.argv.slice(2);
const args: Args = {
    dateRange: [argsArr[0], argsArr[1]],
    email: argsArr[2],
    price: Number(argsArr[3]),
    startFrom: argsArr[4],
    endFrom: argsArr[5],
};

new Flights(args.dateRange, args.email, args.price, args.startFrom, args.endFrom).init();

emailMeDaddy("<h1>Hello world</h1><br /><p>Cum</p>", args.email);
