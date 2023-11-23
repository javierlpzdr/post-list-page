import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostList from "./post-list";
import { isPrimeNumber } from "./utils";
import { TestProviders } from "../../test-utils";
import { setupServer } from "msw/node";
import apiMock from "../../api/mocks";

const renderPostList = () =>
  render(
    <TestProviders>
      <PostList />
    </TestProviders>
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
    expect(screen.getByText("Body")).toBeVisible();
  });

  it("shows a loader fetching the posts", () => {
    renderPostList();

    expect(screen.getByText("Loading")).toBeVisible();
  });

  it("shows the title and body for row 1", async () => {
    renderPostList();

    expect(screen.getByText("Post list")).toBeVisible();
    expect(
      await screen.findByText(
        /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/
      )
    ).toBeVisible();

    expect(
      await screen.findByText(
        /quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto/i
      )
    ).toBeVisible();
  });

  it("shows a filter field", () => {
    renderPostList();

    expect(screen.getByLabelText(/filter posts by title/i)).toBeVisible();
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
    renderPostList();
    const filterElement = screen.getByRole("textbox", {
      name: /filter posts/i,
    });

    fireEvent.change(filterElement, { target: { value: "hey" } });

    expect(filterElement).toHaveValue("hey");

    await userEvent.click(
      screen.getByRole("button", {
        name: /filter/i,
      })
    );

    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    expect(await screen.findByText(/hey/)).toBeVisible();
  });

  it("shows in italic fields with ids that are prime numbers", async () => {
    renderPostList();

    const title = await screen.findByText(
      /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/
    );

    const style = window.getComputedStyle(title);

    expect(style.fontStyle).toBe("italic");
  });

  it("has a button to edit the post", async () => {
    renderPostList();

    const editButton = await screen.findByText("Edit post");

    expect(editButton).toBeVisible();

    await userEvent.click(editButton);

    expect(await screen.getByText(/edit your post/i)).toBeVisible();

    const postTitleField = screen.getByLabelText(/post title/i);
    expect(postTitleField).toBeVisible();

    const postDescriptionField = screen.getByLabelText(/post body/i);
    expect(postDescriptionField).toBeVisible();

    const postSaveButton = screen.getByText(/save/i);
    expect(postSaveButton).toBeVisible();

    await userEvent.clear(postTitleField)
    await userEvent.type(postTitleField, "hello");
    expect(postTitleField).toHaveValue("hello");

    await     userEvent.clear(postDescriptionField)
    await userEvent.type(postDescriptionField, "body");
    expect(postDescriptionField).toHaveValue("body");

    await userEvent.click(postSaveButton);

    expect(screen.getByText(/saving.../i)).toBeVisible();

    expect(await screen.findByText(/saved succesfully!/i)).toBeVisible();
  });
});
