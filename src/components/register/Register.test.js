import React from "react";
import Register from "../register/Register";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  // eslint-disable-next-line no-unused-vars
  const div = document.createElement("div");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Register></Register>);
  expect(getByTestId("registerButtonTest")).toHaveTextContent("Register");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Register></Register>).toJSON();
  expect(tree).toMatchSnapshot();
});
