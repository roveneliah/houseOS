import React from "react";
import "@testing-library/jest-dom";
import { expect as expectChai } from "chai";

import TagSelector from "./TagSelector";
import { renderWithId } from "../../utils/test/renderWithId";
import { click } from "../../utils/test/click";

describe("TagSelector", () => {
  it("should render an element with each tag provided", () => {
    const tags = ["Steward", "Ball Hogs", "Full-Time"];
    const component = renderWithId(<TagSelector tags={tags} />);

    tags.forEach(expect(component).toHaveTextContent);
  });

  it("should render <></> when given no tags", () => {
    const component = renderWithId(<TagSelector tags={[]} />);
    expect(component).toBeEmptyDOMElement();
  });

  describe("toggle", () => {
    it("select should move tag to head", () => {
      const tags0 = ["0", "1", "2", "3", "4"];

      const component = renderWithId(<TagSelector tags={tags0} />);

      const tags1 = ["2", "0", "1", "3", "4"];
      click(component.children[0].children[2]);
      tags1.map((val, i) => {
        expectChai(component.children[0].children[i].innerHTML).to.equal(val);
      });

      const tags2 = ["1", "2", "0", "3", "4"];
      click(component.children[0].children[2]);
      tags2.map((val, i) => {
        expectChai(component.children[0].children[i].innerHTML).to.equal(val);
      });
    });

    it("unselect should keep selected first", () => {
      const tags0 = ["0", "1", "2", "3", "4"];

      const component = renderWithId(<TagSelector tags={tags0} />);
      click(component.children[0].children[3]);

      ["3", "0", "1", "2", "4"].map((val, i) => {
        expectChai(component.children[0].children[i].innerHTML).to.equal(val);
      });

      click(component.children[0].children[0]);

      tags0.map((val, i) => {
        expectChai(component.children[0].children[i].innerHTML).to.equal(val);
      });
    });
  });
});
