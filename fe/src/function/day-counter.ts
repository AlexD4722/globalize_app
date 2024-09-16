//Count days between date range
export function DayCounterBetweenDateRange (first: Date, second: Date) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    return Math.round((second.getTime()  - first.getTime() ) / millisecondsPerDay);
}