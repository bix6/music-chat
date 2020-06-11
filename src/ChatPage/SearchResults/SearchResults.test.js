import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { BrowserRouter } from "react-router-dom";
import SearchResults from "./SearchResults";

describe("SearchResults Component", () => {
  it("Smoke Test: Renders Default", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Snapshot Test: Default", () => {
    const wrapper = shallow(<SearchResults />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
