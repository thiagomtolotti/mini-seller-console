import { render, screen } from "@testing-library/react";
import CardsSkeleton from "./CardsSkeleton";

describe("CardsSkeleton", () => {
  it("renders 10 skeleton cards", () => {
    render(<CardsSkeleton />);

    const skeletons = screen.getAllByRole("presentation");

    expect(skeletons).toHaveLength(10);
  });
});
