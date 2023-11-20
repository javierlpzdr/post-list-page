import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import { TestProviders } from "./test-utils";

describe("App", () => {
  it("renders the App", () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    );
    expect(screen.getByText("Hello CodeSandbox")).toBeVisible();
  });
});
