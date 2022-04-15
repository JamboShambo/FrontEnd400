import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import DetailsModal from "./DetailsModal";

afterEach(cleanup);

it("renders without crashing", () => {
  // eslint-disable-next-line no-unused-vars
  const div = document.createElement("div");
});

it("matches snapshot", () => {
  const tree = renderer.create(<DetailsModal></DetailsModal>).toJSON();
  expect(tree).toMatchSnapshot();
});
