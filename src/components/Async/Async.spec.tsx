import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

it("should render correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByText("Button"));
});
