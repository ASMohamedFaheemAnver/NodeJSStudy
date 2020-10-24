import { getFirstName } from "./example/util.js";

test("Should return first name when given full name", () => {
  const firstName = getFirstName("Andrew Mead");

  expect(firstName).toBe("Andrew");
});
