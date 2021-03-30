const Engineer = require("../lib/engineer");

it("getRole() should return \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Alice", 1, "test@test.com");
    expect(e.getRole()).toBe(testValue);
  });

  it("Can get name via getName()", () => {
    const testValue = "Alice";
    const e = new Engineer(testValue);
    expect(e.getName()).toBe(testValue);
  });

  it("Can get id via getId()", () => {
    const testValue = 100;
    const e = new Engineer("Foo", testValue);
    expect(e.getId()).toBe(testValue);
  });

  it("Can set email via constructor argument", () => {
    const testValue = "test@test.com";
    const e = new Engineer("Foo", 1, testValue);
    expect(e.email).toBe(testValue);
  });

  it("Can get Github username via getGithub()", () => {
    const testValue = "GithubUser";
    const e = new Engineer(testValue);
    expect(e.getName()).toBe(testValue);
  });


  
