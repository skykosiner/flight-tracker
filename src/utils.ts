import { Dates } from "./flights";
import { Page } from "puppeteer";
import nodemailer from "nodemailer";

// The first index (0) is going to bo the arive date and last index (1)
// is going to be tho leave date, length should never be greater then 2
export function getDates(dateRange: string[]): Dates {
    const dates: Dates = {
        ariveDate: "",
        leaveDate: "",
    };

    if (dateRange.length > 2) {
        throw new Error(`Date length of array should not be greater then 2. You fucked up ${dateRange}`);
    }

    for (let i = 0; i < dateRange.length; i++) {
        if (i === 0) {
            dates.ariveDate = dateRange[i];
        } else {
            dates.leaveDate = dateRange[i];
        }
    }

    return dates
}

/**
* If wait time is zero it will just not run setTimeout
*/
export function clickEnter(waitTime: number, page: Page): void {
    if (waitTime === 0) {
        page.keyboard.press("Enter");
    } else {
        setTimeout(() => {
            page.keyboard.press("Enter");
        }, waitTime)
    };
};

export function wait(waitTime: number): void {
    setTimeout(() => { }, waitTime);
};

export async function emailMeDaddy(email: string, to: string): Promise<void> {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ykosiner@gmail.com",
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: '"Sky Kosiner" <sky@kosiner.co.uk>',
        to,
        subject: "Flight Tracking Info",
        html: email,
    });
};
