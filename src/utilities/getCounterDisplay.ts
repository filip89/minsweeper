export function getCounterDisplay(count: number): string {
    if (count >= 999) return (999).toString();
    if (count <= -99) return (-99).toString();
    return ('00' + count).slice(-3);
}