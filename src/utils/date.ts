// export function formatDate(d: Date): string {
//     const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
//         d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
//     return datestring
// }

export function formatDate(date: Date, short?: boolean): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: short ? '2-digit' : 'numeric',
        month: short ? '2-digit' : 'long',
        year: short ? '2-digit' : 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Warsaw',
    });

    return formatter.format(date);
}