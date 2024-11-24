# SwissKnifeJS

SwissKnifeJS is your all-in-one utility library for JavaScript and TypeScript! Inspired by the versatility of a Swiss Army knife, this library aims to provide a comprehensive set of tools for common programming tasks.

## Features

- Simple and lightweight utilities.
- Written in TypeScript for type safety.
- Easy-to-use and extensible.

## Installation

Install the package via npm:

```javascript
npm install swissknifejs
```
or with Yarn:
```javascript
yarn add swissknifejs
```
## Usage
### Importing Functions

You can import the functions you need directly

CommonJS
```javascript
const { isOdd, isEven } = require('swissknifejs');
```

ES Modules
```javascript
import { isOdd, isEven } from 'swissknifejs';
```

## Documentation
#### .isOdd

Determines whether a number is odd.

**Params**

* number **[number|string]**: A number or a string representing an integer.
* Returns **[boolean]**: true if the number is odd, otherwise false.
* Throws **[TypeError]**: If the input is not a valid number. Error if the input is not an integer or exceeds the maximum safe integer limit.

Example
```javascript
isOdd(5); // true
isOdd('3'); // true
isOdd(4); // false
```

#### .isEven

Determines whether a number is even.

**Params**

* number **[number|string]**: A number or a string representing an integer.
* Returns **[boolean]**: true if the number is even, otherwise false.
* Throws **[TypeError]**: If the input is not a valid number. Error if the input is not an integer or exceeds the maximum safe integer limit.

Example
```javascript
isEven(4); // true
isEven('6'); // true
isEven(3); // false
```

## Contributing

Contributions are welcome! If you have ideas for new utilities or improvements, feel free to submit a pull request or open an issue.

### License

This project is licensed under the MIT License. See the LICENSE file for details.