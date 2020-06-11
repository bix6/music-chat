import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { BrowserRouter } from "react-router-dom";
import SearchInput from "./SearchInput";

describe("SearchInput Component", () => {
  it("Smoke Test: Renders Default", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <SearchInput />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Snapshot Test: Default", () => {
    const wrapper = shallow(<SearchInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
