import RandomUser from "./RandomUser";
import { render, screen } from "@testing-library/react";

describe("Random User", () => {
  it("has button to load random user", () => {
    render(<RandomUser />);
    const loadButton = screen.queryByRole("button", {
      name: "Load Random User",
    });
    expect(loadButton).toBeInTheDocument();
  });
});
