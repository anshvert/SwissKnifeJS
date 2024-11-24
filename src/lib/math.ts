import { IsOddEvenProp } from "../types";
import isNumber from "is-number";

/**
 * Determines whether a number is odd.
 * @param number - The number to check. Can be a number or a string representing an integer.
 * @returns `true` if the number is odd; otherwise, `false`.
 * @throws {TypeError} If the input is not a valid number or cannot be parsed.
 * @throws {Error} If the number is not an integer or exceeds the maximum safe integer limit.
 */
export function isOdd(number: IsOddEvenProp): boolean {
    if (typeof number === "string") {
        if (!isNumber(number)) {
            throw new TypeError(`Expected a numeric string but got '${number}'`);
        }
        number = parseInt(number, 10);
    }

    if (isNaN(number)) {
        throw new TypeError(`Expected a valid number but got '${number}'`);
    }

    const n: number = Math.abs(number);

    if (!Number.isInteger(n)) {
        throw new Error("Expected an integer");
    }

    if (!Number.isSafeInteger(n)) {
        throw new Error("Value exceeds the maximum safe integer limit");
    }

    return n % 2 === 1;
}

/**
 * Determines whether a number is even.
 * @param number - The number to check. Can be a number or a string representing an integer.
 * @returns `true` if the number is even; otherwise, `false`.
 * @throws {TypeError} If the input is not a valid number or cannot be parsed.
 * @throws {Error} If the number is not an integer or exceeds the maximum safe integer limit.
 */
export function isEven(number: IsOddEvenProp): boolean {
    return !isOdd(number);
}