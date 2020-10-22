import { getFirstName } from "./example/util";

test("Get firstname.", () => {
  const firstName = getFirstName("Mohamed Faheem");
  expect(firstName).toBe("Mohamed");
});
