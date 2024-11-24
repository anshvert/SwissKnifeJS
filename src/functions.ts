import { IsOdd } from "./types";

export function isOdd (number: IsOdd): boolean {
    if (typeof number === 'number') {
        return number % 2 == 0
    }
    return false
}