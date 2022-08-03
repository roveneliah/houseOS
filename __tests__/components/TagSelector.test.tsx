import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect as expectChai } from "chai";

import TagSelector from "../../components/TagSelector";
import { renderWithId } from "./renderWithId";

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

  it("should list the selected tags first", () => {
    const tags0 = ["0", "1", "2", "3", "4"];

    const component = renderWithId(<TagSelector tags={tags0} />);

    fireEvent.click(component.children[0].children[2]);
    expectChai(component.children[0].children[0].innerHTML).to.contain(2);

    fireEvent.click(component.children[0].children[2]);
    expectChai(component.children[0].children[0].innerHTML).to.contain(1);
    expectChai(component.children[0].children[1].innerHTML).to.contain(2);
    expectChai(component.children[0].children[2].innerHTML).to.contain(0);
    expectChai(component.children[0].children[3].innerHTML).to.contain(3);
    expectChai(component.children[0].children[4].innerHTML).to.contain(4);

    fireEvent.click(component.children[0].children[0]);
    expectChai(component.children[0].children[0].innerHTML).to.contain(2);
    expectChai(component.children[0].children[1].innerHTML).to.contain(0);
    expectChai(component.children[0].children[2].innerHTML).to.contain(1);
    expectChai(component.children[0].children[3].innerHTML).to.contain(3);
    expectChai(component.children[0].children[4].innerHTML).to.contain(4);
  });
});
