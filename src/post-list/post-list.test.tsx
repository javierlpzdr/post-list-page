import React from "react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
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

  it("renders the columns", () => {
    renderPostList();

    expect(screen.getByText("Post list")).toBeVisible();
    expect(screen.getByTestId("post-data-grid")).toBeVisible();
    expect(screen.getByText("Title")).toBeVisible();
    expect(screen.getByText("ID")).toBeVisible();
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
    const filterElement = screen.getByRole('textbox', { name: /filter posts/i })

    fireEvent.change(filterElement, {target: {value: "hey"}});
    
    expect(filterElement).toHaveValue('hey')
    
    await userEvent.click(screen.getByRole('button', {
      name: /search/i
    }));

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(await screen.findByText(/hey/)).toBeVisible();
  });

  it("shows in italic fields with ids that are prime numbers", async () => {
    renderPostList();

    const title =    
      await screen.findByText(
        /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/,
      );


    screen.debug(title)
    const style = window.getComputedStyle(title)

    expect(style.fontStyle).toBe("italic")
  })


  it("has a button to edit the post", async () => {
    renderPostList();

    const editButton =    
      await screen.findByText(
        "Edit post"
      );


    expect(editButton).toBeVisible()
  })
});
