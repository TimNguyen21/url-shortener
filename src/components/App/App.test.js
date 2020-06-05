
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react/';
import "@testing-library/jest-dom";
import App from './App.js';
import { getUrls, addUrl } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe("UrlForm", () => {
  beforeEach(() => {
    getUrls.mockResolvedValue({
      urls: [{id: 1,
      long_url: "this is longgg",
      short_url: "this is short",
      title: "Dogs"}]
    })

    addUrl.mockResolvedValue({id: 2,
      long_url: "longgger URL",
      short_url: "shorter URL",
      title: "Cats"
    })
  })

  it("should display the correct labels", () => {
    const { getByText, getByPlaceholderText } = render(<App/>);

    const headerTitle = getByText("URL Shortener");
    const titleInput = getByPlaceholderText("Title...");
    const urlLInput = getByPlaceholderText("URL to Shorten...");
    const submitUrlButton = getByText('Shorten Please!');

    expect(headerTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(urlLInput).toBeInTheDocument();
    expect(submitUrlButton).toBeInTheDocument();
  })

  it("should display the correct display", async () => {
    const { getByText, queryByText } = render(<App/>);

    const title = await waitFor(() => getByText("Dogs"));
    const longUrl = await waitFor(() => getByText("this is longgg"));
    const shortUrl = await waitFor(() => getByText("this is short"));

    expect(title).toBeInTheDocument();
    expect(longUrl).toBeInTheDocument();
    expect(shortUrl).toBeInTheDocument();
  })

  it("should display the correct display when adding url", async () => {
    const { getByText, queryByText, getByRole, getByPlaceholderText } = render(<App/>)

    const titleInput = getByPlaceholderText("Title...");
    const urlInput = getByPlaceholderText("URL to Shorten...");
    const submitButton = getByRole("button", {name: 'Shorten Please!'});

    expect(titleInput).not.toHaveValue();
    expect(urlInput).not.toHaveValue();

    fireEvent.change(titleInput, {target: {value: "Cats"}});
    fireEvent.change(urlInput, {target: {value: "longgger URL"}});

    expect(titleInput).toHaveValue();
    expect(urlInput).toHaveValue();

    fireEvent.click(submitButton);

    expect(titleInput).not.toHaveValue();
    expect(urlInput).not.toHaveValue();

    const title = await waitFor(() => getByText("Cats"));
    const longUrl = await waitFor(() => getByText("longgger URL"));
    const shortUrl = await waitFor(() => getByText("shorter URL"));

    expect(title).toBeInTheDocument();
    expect(longUrl).toBeInTheDocument();
    expect(shortUrl).toBeInTheDocument();
  })

})
