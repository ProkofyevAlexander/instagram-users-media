const currentTime = (new Date()).getTime() / 1000;

export const timeToPeriodConverter = (time: number) => {
    let delta = currentTime - time; // seconds
    if (delta < 0) return '1min';
    if (delta < 60) return Math.floor(delta) + 'sec';
    delta = delta / 60; // minutes
    if (delta < 60) return Math.floor(delta) + 'min';
    delta = delta / 60; // hours
    if (delta < 24) return Math.floor(delta) + 'h';
    let days = delta / 24;
    if (days < 7) return Math.floor(days) + 'd';
    let weeks = days / 7;
    if (weeks < 10) return Math.floor(weeks) + 'w';
    let months = days / 31;
    if (months < 12) return Math.floor(months) + 'm';
    let years = Math.floor(days / 365);
    return years + 'year' + (years > 1 ? 's' : '');
};