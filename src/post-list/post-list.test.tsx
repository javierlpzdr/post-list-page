import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostList from "./";
import { isPrimeNumber } from "./post-list";
import { TestProviders } from "../test-utils";
import { setupServer } from "msw/node";
import apiMock from "../api/mocks";

const renderPostList = () =>
  render(
    <TestProviders>
      <PostList />
    </TestProviders>,
  );

describe("DataGrid", () => {
  const server = setupServer(...apiMock);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders an empty data grid", () => {
    renderPostList();

    expect(screen.getByText("Post list")).toBeVisible();
    expect(screen.getByTestId("post-data-grid")).toBeVisible();
    expect(screen.getByText("Title")).toBeVisible();
  });

  it("shows a loader fetching the posts", () => {
    renderPostList();

    expect(screen.getByText("Loading")).toBeVisible();
  });

  it("shows the title for row 1", async () => {
    renderPostList();

    expect(screen.getByText("Post list")).toBeVisible();
    expect(
      await screen.findByText(
        /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/,
      ),
    ).toBeVisible();
  });

  it("shows a filter field", () => {
    renderPostList();

    expect(screen.getByLabelText("Filter posts")).toBeVisible();
  });

  it("checks a primer number", () => {
    expect(isPrimeNumber(2)).toBe(true);
    expect(isPrimeNumber(3)).toBe(true);
    expect(isPrimeNumber(5)).toBe(true);
    expect(isPrimeNumber(7)).toBe(true);
    expect(isPrimeNumber(11)).toBe(true);

    expect(isPrimeNumber(-6)).toBe(false);
    expect(isPrimeNumber(6)).toBe(false);
    expect(isPrimeNumber(8)).toBe(false);
    expect(isPrimeNumber(10)).toBe(false);
    expect(isPrimeNumber(12)).toBe(false);
  });

  it("filters the posts", async () => {
    renderPostList()
    const filterElement = screen.getByLabelText("Filter posts");

    await userEvent.type(filterElement, "hey");

    expect(await screen.findByText(/hey/)).toBeVisible();
  });
});
