import { formatDate } from "@angular/common";

export function formatShortDateTime(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export function formatLongDate(dateStr: string) {
    const date = new Date(dateStr);
    return `${formatMonth(date.getMonth())} ${formatDay(date.getDate())}, ${date.getFullYear()}`;

    // Otra forma, pero no pone el st, nd, rd, th después de los números:

    // return date.toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });
}

function formatMonth(month: number) {
    switch (month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default: return 'Unknown month';
    }
}

function formatDay(day: number) {
    const lastDigit = day % 10;
    const last2digits = day % 100;

    if (last2digits === 11 || last2digits === 12 || last2digits === 13) { return `${day}th` }

    switch (lastDigit) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}