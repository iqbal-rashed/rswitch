type RSwitch = {
    [key: string]: any;
};

type Options = {
    returnFunction?: boolean;
};

export function rswitch(
    key: string | undefined,
    rswitch: RSwitch,
    options?: Options
): any {
    const fnCall = options?.returnFunction || false;
    const value = rswitch[key!];
    const keys = Object.keys(rswitch)
        .filter((v) => v.includes(","))
        .flatMap((v) => v.split(","))
        .map((v) => v.trim());
    if (!value) {
        if (keys.includes(key!)) {
            return typeof value === "function" && !fnCall ? value() : value;
        }
        const _default = rswitch[""];
        return typeof _default === "function" && !fnCall
            ? _default()
            : _default;
    } else {
        return typeof value === "function" && !fnCall ? value() : value;
    }
}

export default rswitch;
