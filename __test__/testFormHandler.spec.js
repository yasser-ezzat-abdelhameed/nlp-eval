import { handleSubmit } from "../src/client/js/formHandler";
import { checkForName } from "../src/client/js/nameChecker";

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });
  test("Testing the checkForName() function", () => {
    expect(checkForName).toBeDefined();
    expect(checkForName("")).toEqual("");
    expect(checkForName("trump")).toEqual(true);
  });
});
