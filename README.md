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
const { MathUtils } = require('swissknifejs');
```

ES Modules
```javascript
import { MathUtils } from 'swissknifejs';
```

## Documentation
#### MathUtils.isOdd

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

#### MathUtils.isEven

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

#### MathUtils.shuffle

Shuffles the given input randomly using the Fisher-Yates Shuffle Algorithm.

**Params**

* element **[(number | string | boolean)[] | string]**: The input to shuffle. Can be an array of strings, numbers, or booleans,
  or a string representing characters to shuffle.
* Returns **[(number | string | boolean)[] | string]**: The shuffled input, maintaining the same type (array or string).

### DirectoryManipulator

A class that provides additional utility methods for managing directories, including generating mock files.

#### DirectoryManipulator.getPath
Retrieves the full path of the directory.

**Params**

* Returns **[string]**: The full path as a string.


#### DirectoryManipulator.generateMockFiles
Creates mock files within the directory managed by this instance.

**Params**:
  - `options` *(MockFileGenerateOptions)*: The configuration for generating mock files.

##### *MockFileGenerateOptions*
| Property      | Type          | Description                                    |
|---------------|---------------|------------------------------------------------|
| `count`       | `number`      | Number of files to generate.                  |
| `extensions`  | `string[]`    | File extensions to use (e.g., `['txt']`).     |
| `minSizeKB`   | `number`      | Minimum file size in kilobytes.               |
| `maxSizeKB`   | `number`      | Maximum file size in kilobytes.               |
| `filePrefix`  | `string`      | Optional prefix for file names.               |

##### *GeneratedFileTypes*

| File Type | Notes                                                                                 |
|-----------|---------------------------------------------------------------------------------------|
| `txt`     | Filled with random alphanumeric text.                                                |
| `wav`     | A basic WAV file with a header and random noise as content.                          |
| `mp3`     | A basic MP3 file with a header and random data.                                      |
| Others    | Files of unsupported types are filled with random binary data using `crypto.randomBytes`. |

---

## Usage Example

```typescript
import { DirectoryManipulator } from 'swissknifejs';

// Initialize directory manipulator instance
const dirManipulator = new DirectoryManipulator('./test-directory');

// Options for mock file generation
const options = {
    count: 5,
    extensions: ['txt', 'wav', 'mp3'],
    minSizeKB: 10,
    maxSizeKB: 100,
    filePrefix: 'TestFile_'
};

// Generate mock files in the specified directory
dirManipulator.generateMockFiles(options);

console.log('Mock files generated successfully!');
```

## Contributing

Contributions are welcome! If you have ideas for new utilities or improvements, feel free to submit a pull request or open an issue.

### License

This project is licensed under the MIT License. See the LICENSE file for details.