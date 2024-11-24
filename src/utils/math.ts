import { NumericInput, Shufflable, ShuffledResult } from "./types";
import { fisherYatesShuffle } from "./algorithms";
import isNumber from "is-number";

export class MathUtils {
    /**
     * Determines whether a number is odd.
     * @param number - The number to check. Can be a number or a string representing an integer.
     * @returns `true` if the number is odd; otherwise, `false`.
     * @throws {TypeError} If the input is not a valid number or cannot be parsed.
     * @throws {Error} If the number is not an integer or exceeds the maximum safe integer limit.
     */
    static isOdd(number: NumericInput): boolean {
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
    static isEven(number: NumericInput): boolean {
        return !MathUtils.isOdd(number);
    }

    /**
     * Shuffles the given input randomly using the Fisher-Yates Shuffle Algorithm.
     *
     * If the input is an array, the elements are shuffled and returned as an array.
     * If the input is a string, the characters are shuffled and returned as a string.
     *
     * @param element - The input to shuffle. Can be an array of strings, numbers, or booleans,
     *                  or a string representing characters to shuffle.
     * @returns The shuffled input, maintaining the same type (array or string).
     * @throws {TypeError} If the input is not a valid array or string.
     */
    static shuffle(element: Shufflable): ShuffledResult {
        if (Array.isArray(element)) {
            return fisherYatesShuffle(element);
        }
        return fisherYatesShuffle(element.split('')).join('');
    }
}



