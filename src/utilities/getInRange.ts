export type Range = { min: number; max: number };

export function getInRange(value: number, range: Range): number {
    if (value > range.max) return range.max;
    if (value < range.min) return range.min;
    return value;
}
