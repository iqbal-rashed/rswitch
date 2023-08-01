# rswitch

The `rswitch` library provides a compact and flexible way to implement a switch-like functionality in TypeScript. It allows you to define cases and their corresponding actions using an object literal syntax.

## Installation

Install the `rswitch` library using npm:

```bash
npm install rswitch
```

## Usage

The `rswitch` function takes a key and an object containing cases and actions. It evaluates the key against the cases and returns the corresponding action.

### Syntax

```javascript
rswitch(key, casesObj, options);
```

-   `key` : The value to evaluate against the cases.
-   `casesObj` : An object containing cases and their actions.
-   `options` : (Optional) An object to customize the behavior of the rswitch function.
    -   `returnFunction` (optional, default: false): If set to `false`, the `rswitch` function will call actions that are functions and return their values. If set to `true`, the function will return the functions as is.

### Example

```javascript
import { rswitch } from "rswitch";
// const {rswitch} = require("rswitch") // commonjs

const result = rswitch(
    "dev",
    {
        designer: "Designer",
        "dev, web": "Freelancer",
        "": () => {
            console.log("Hello");
        },
    },
    {
        returnFunction: true,
    }
);

console.log(result);
// Output: Freelancer
```

In this example, the `rswitch` function evaluates the key `'dev'` against the cases defined in `casesObj`. Since it matches the case `'dev, web'`, the corresponding action `'Freelancer'` is returned and assigned to the `result` variable. Finally, the value of `result` is logged to the console.

### Case Definitions

Cases are defined as key-value pairs in the `casesObj` object.

-   Single Case: `{ caseKey: action }`
-   Multiple Cases: `{ 'case1, case2, case3': action }`
-   Default Case: `{ '': action }`

> Actions can be any value or a function that returns a value. If the action is a function, and the `options` object has `returnFunction` set to `false`, it is called, and the returned value is returned.

If no cases match the evaluated key, the `rswitch` function checks for a default case. If a default case is defined, its corresponding action is performed. If no default case is defined or its action is not provided, `undefined` is returned.

<br/>
If you'd like to contribute, please do submit a pull request.

In case you want support my work

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/rashed.iqbal)
