import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react/';
import "@testing-library/jest-dom";
import UrlForm from './UrlForm.js';
import { getUrls } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe("UrlForm", () => {
  beforeEach(() => {
    getUrls.mockResolvedValue({
      urls: [{id: 1,
      long_url: "this is longgg",
      short_url: "this is short",
      title: "Dogs"}]
    })
  })

  it("should display the correct labels", () => {
    const addUrl = jest.fn();

    const { getByPlaceholderText, getByText } = render(<UrlForm
        updateUrls={addUrl}
      />)

    const titleLabel = getByPlaceholderText("Title...")
    const urlLabel = getByPlaceholderText("URL to Shorten...")
    const submitButton = getByText('Shorten Please!')

    expect(titleLabel).toBeInTheDocument();
    expect(urlLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

  it("should send the correct data to updateUrls", async () => {
    const addUrl = jest.fn();

    const { getByPlaceholderText, getByRole } = render(<UrlForm
        updateUrls={addUrl}
      />)

    const titleInput = getByPlaceholderText("Title...");
    const urlInput = getByPlaceholderText("URL to Shorten...");
    const submitButton = getByRole("button", {name: 'Shorten Please!'});

    expect(titleInput).not.toHaveValue()
    expect(urlInput).not.toHaveValue()

    fireEvent.change(titleInput, {target: {value: "Cats"}});
    fireEvent.change(urlInput, {target: {value: "http://www.example.com/111"}});

    expect(titleInput).toHaveValue()
    expect(urlInput).toHaveValue()
    expect(titleInput.value).toBe("Cats")
    expect(urlInput.value).toBe("http://www.example.com/111")
  })

  it("should have submit button disable when input fields are empty", async () => {
    const addUrl = jest.fn();

    const { getByPlaceholderText, getByRole } = render(<UrlForm
        updateUrls={addUrl}
      />)

    const titleInput = getByPlaceholderText("Title...");
    const urlInput = getByPlaceholderText("URL to Shorten...");
    const submitButton = getByRole("button", {name: 'Shorten Please!'});

    expect(titleInput).not.toHaveValue()
    expect(urlInput).not.toHaveValue()
    expect(submitButton).toBeDisabled()

    fireEvent.change(titleInput, {target: {value: "Cats"}});

    expect(submitButton).toBeDisabled()
    expect(titleInput.value).toBe("Cats")
    expect(urlInput.value).toBe("")

    fireEvent.change(urlInput, {target: {value: "http://www.example.com/111"}});

    expect(submitButton).toBeEnabled()
    expect(titleInput.value).toBe("Cats")
    expect(urlInput.value).toBe("http://www.example.com/111")
  })

})
