type RSwitch = {
  [key: string]: any;
};

type Options = {
  returnFunction?: boolean;
};

function rswitch(
  key: string | undefined,
  rswitch: RSwitch,
  options?: Options
): any {
  const fnCall = options?.returnFunction || false;

  const value = rswitch[key!];

  const filtered = Object.keys(rswitch).filter((v) => v.includes(","));

  const keys = filtered.flatMap((v) => v.split(",")).map((v) => v.trim());
  if (!value) {
    if (keys.includes(key!)) {
      const findKey = filtered.find((v) => v.includes(key!));
      const multiValue = rswitch[findKey!];
      return typeof multiValue === "function" && !fnCall
        ? multiValue()
        : multiValue;
    }
    const _default = rswitch[""];
    return typeof _default === "function" && !fnCall ? _default() : _default;
  } else {
    return typeof value === "function" && !fnCall ? value() : value;
  }
}
