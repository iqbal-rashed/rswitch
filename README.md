# rswitch

The `rswitch` library provides a flexible and compact way to implement switch-like functionality in TypeScript. It allows you to define cases and their corresponding actions using object literals or arrays. This version includes both **synchronous** and **asynchronous** handling of cases and actions.

## Installation

To install the `rswitch` library, use the following npm command:

```bash
npm install rswitch
```

## Usage

The `rswitch` function evaluates a given key against predefined cases and returns the corresponding action. There are two versions of this function available:

1. **Synchronous version**: `rswitch` – works for synchronous operations.
2. **Asynchronous version**: `rswitchAsync` – works for cases where the action is asynchronous (i.e., it returns a `Promise`).

### Syntax

```typescript
rswitch(key: string | number | undefined | null, casesObj: RSwitch, options?: Options): T | undefined;

rswitchAsync(key: string | number | undefined | null, casesObj: RSwitch, options?: Options): Promise<T | undefined>;
```

- **`key`**: The value to evaluate against the cases (can be a string, number, `undefined`, or `null`).
- **`casesObj`**: An object or an array of key-value pairs defining the cases and their corresponding actions.
- **`options`** _(optional)_: Configuration options to customize the behavior of the `rswitch` function.
  - **`callFn`** _(optional, default: `true`)_: If set to `true`, the function will call actions that are functions and return their result. If set to `false`, the function will return the function itself without calling it.

### Example Usage

#### Synchronous `rswitch` Example

```typescript
import rswitch from "rswitch";
// const {rswitch} = require("rswitch") // commonjs

// Example usage of rswitch (synchronous)
const result = rswitch("dev", {
  designer: "Designer",
  "dev, web": "Developer",
  "": "No match found", // Default case
});

console.log(result); // Output: "Developer"
```

#### Asynchronous `rswitchAsync` Example

```typescript
import { rswitchAsync } from "rswitch";
// const {rswitchAsync} = require("rswitch") // commonjs

// Example usage of rswitchAsync (asynchronous)
async function testAsyncSwitch() {
  const result = await rswitchAsync("web", {
    "dev, web": async () => {
      return "Developer"; // Async case
    },
    designer: "Designer",
    "": "No match found", // Default case
  });

  console.log(result); // Output: "Developer" (async case)
}

testAsyncSwitch();
```

### Case Definitions

Cases are defined as key-value pairs within the `casesObj`. Here’s how you can define various cases:

- **Single Case**: Use a direct key-value pair for a single match.

  ```typescript
  { 'dev': 'Developer' }
  ```

- **Multiple Cases**: You can group several cases together in one key, separated by commas (`,`), and the key will match any of those cases.

  ```typescript
  { 'dev, web': 'Developer' }
  ```

- **Default Case**: The empty string key (`""`) can be used for the default case, which is executed when no other key matches.
  ```typescript
  { '': 'No match found' }
  ```

### Actions

Actions can be:

- **Primitive values** (e.g., strings, numbers, booleans).
- **Functions**: If the action is a function, it will be executed. If the function returns a `Promise`, it will be awaited.

#### Function Actions:

If the action is a function:

- **Synchronous**: The function will be called and its result will be returned.
- **Asynchronous**: The function will return a `Promise`, which will be resolved before returning the result.

  If `options.callFn` is set to `false`, the function will **not** be invoked, and the function itself will be returned.

### Handling Undefined or Null Keys

If `rcase` is `undefined` or `null`, and no default case (`""`) is defined in `casesObj`, the function will return `undefined`. If a default case is defined, it will return the value of the default case.

### Full Example with Multiple Cases

```typescript
import rswitch, { rswitchAsync } from "rswitch";
// const { rswitch, rswitchAsync } = require("rswitch"); // commonjs

const result1 = rswitch("web", {
  "dev, web": "Developer",
  designer: "Designer",
  "": "No match found", // Default case
});

console.log("sync", result1); // Output: "Developer"

async function testAsyncSwitch() {
  const result2 = await rswitchAsync("web", {
    "dev, web": async () => {
      return "Developer"; // Async case
    },
    designer: "Designer",
    "": "No match found", // Default case
  });

  console.log("async", result2); // Output: "Developer" (async case)
}

testAsyncSwitch();
```

### Notes

- **Multiple Cases for One Action**: You can define one action for multiple cases by separating the case names with commas in a string, like `'dev, web'`.
- **Default Case**: The `""` key is treated as the default case, executed when no other match is found.
- **Type Safety**: TypeScript will provide type safety when using `rswitch`, ensuring that the provided `key`, `casesObj`, and `options` match expected types.

## Contributing

We welcome contributions to the `rswitch` library! If you find any issues or want to add new features, please fork the repository and submit a pull request.
