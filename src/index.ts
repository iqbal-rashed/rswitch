type RSwitch =
  | {
      [key: string]: any;
    }
  | [string, any][];

type Options = {
  callFn?: boolean;
};

export function rswitch<T = any>(
  rcase: string | number | undefined | null,
  rs: RSwitch,
  options?: Options,
): T | undefined {
  let defaultValue = undefined;

  for (const [key, value] of Array.isArray(rs) ? rs : Object.entries(rs)) {
    if (key.includes(",")) {
      const spiltKey = key.split(",").map((v: string) => v.trim());
      if (spiltKey.includes(String(rcase))) {
        return resolveReturnValue(value, options);
      }
    }
    if (key === String(rcase)) {
      return resolveReturnValue(value, options);
    }
    if (key === "") {
      defaultValue = resolveReturnValue(value, options);
    }
  }

  return defaultValue;
}

function resolveReturnValue(value: any, options?: Options) {
  const { callFn = true } = options || {};
  return typeof value === "function" ? (callFn ? value() : value) : value;
}

export async function rswitchAsync<T = any>(
  rcase: string | number | undefined | null,
  rs: RSwitch,
  options?: Options,
): Promise<T | undefined> {
  let defaultValue = undefined;

  for (const [key, value] of Array.isArray(rs) ? rs : Object.entries(rs)) {
    if (key.includes(",")) {
      const splitKey = key.split(",").map((v: string) => v.trim());
      if (splitKey.includes(String(rcase))) {
        return await resolveReturnValueAsync(value, options);
      }
    }

    if (key === String(rcase)) {
      return await resolveReturnValueAsync(value, options);
    }

    if (key === "") {
      defaultValue = await resolveReturnValueAsync(value, options);
    }
  }

  return defaultValue;
}

async function resolveReturnValueAsync(value: any, options?: Options) {
  const { callFn = true } = options || {};

  if (typeof value === "function") {
    return callFn ? await value() : value;
  }

  return value;
}

export default rswitch;
