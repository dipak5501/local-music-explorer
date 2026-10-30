import test from "node:test";
import assert from "node:assert/strict";
import { filterEvents } from "../src/logic.js";
test("filter", () => {
  assert.equal(filterEvents([{ title: "Jazz", venue: "Cafe", notes: "", tags: "" }], "jazz").length, 1);
});
