import { rswitch } from "../src/index";

test("first try", () => {
  expect(rswitch(1, { "1": () => "Hello", "2": "World" })).toBe("Hello");
});

test("check default value", () => {
  expect(
    rswitch("default", { "1": "one", "2": "two", "3": "three", "": "default" })
  ).toBe("default");
});

test("check null key", () => {
  expect(
    rswitch(null, { "1": "one", "2": "two", "3": "three", "": "default" })
  ).toBe("default");
});

test("check undefined key", () => {
  expect(
    rswitch(undefined, { "1": "one", "2": "two", "3": "three", "": "default" })
  ).toBe("default");
});

test("check number key", () => {
  expect(
    rswitch(2, { "1": "one", "2": "two", "3": "three", "": "default" })
  ).toBe("two");
});

test("check mulitple case", () => {
  expect(
    rswitch("2", {
      "1": "one",
      "hello, 2": "two",
      "": "default",
    })
  ).toBe("two");
});
