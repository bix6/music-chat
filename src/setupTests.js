import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// This is needed to prevent scrollIntoView from throwing an error
window.HTMLElement.prototype.scrollIntoView = function () {};
