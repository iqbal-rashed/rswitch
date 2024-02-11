type RSwitch = {
  [key: string]: any;
};

type Options = {
  returnFn?: boolean;
};

export function rswitch<T = any>(
  rcase: string | number | undefined | null,
  rs: RSwitch,
  options?: Options
): T | undefined {
  for (const [key, value] of Array.isArray(rs) ? rs : Object.entries(rs)) {
    if (key.includes(",")) {
      let spiltKey = key.split(",").map((v: string) => v.trim());
      if (spiltKey.includes(String(rcase))) {
        return returnFunction(value, options);
      }
    }
    if (key === String(rcase)) {
      return returnFunction(value, options);
    }
    if (key === "") {
      return returnFunction(value, options);
    }
  }
}

function returnFunction(value: any, options?: Options) {
  const returnFn = options?.returnFn || false;
  return typeof value === "function" ? (!returnFn ? value() : value) : value;
}

export default rswitch;
