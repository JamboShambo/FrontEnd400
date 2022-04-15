import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Login from "./Login";

afterEach(cleanup);

it("renders without crashing", () => {
  // eslint-disable-next-line no-unused-vars
  const div = document.createElement("div");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Login></Login>);
  expect(getByTestId("loginButtonTest")).toHaveTextContent("Login");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Login></Login>).toJSON();
  expect(tree).toMatchSnapshot();
});
