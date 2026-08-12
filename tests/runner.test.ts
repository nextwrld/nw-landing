import { describe, expect, it } from "vitest";

describe("test runner", () => {
  it("discovers and runs a passing test", () => {
    expect(1 + 1).toBe(2);
  });
});