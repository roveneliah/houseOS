import { useSingleSelect } from "./useSingleSelect";

describe("useSingleSelect", () => {
  it.todo("options' names should match input");
  it.todo("only one option should be selected");

  describe("selected", () => {
    it.todo("initial {selected} should be 0 if called with no initialIndex");
    it.todo("initial {selected} should match initialIndex");
    it.todo("initial {selected} should be 0 if invalid initialIndex");
  });

  it.todo("should set {selected} to i when calling toggle on option[i]");
  it.todo("should trigger an option's injected onClick funcion when toggled");

  describe("next/prev", () => {
    it.todo("next should iterate to next option");
    it.todo("next should go to first option if called on last option");

    it.todo("prev should iterate to prev option");
    it.todo("prev should go to last option if called on first option");
  });
});
