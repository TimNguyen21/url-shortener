import React from 'react';
import { render } from '@testing-library/react/';
import "@testing-library/jest-dom";
import UrlContainer from "./UrlContainer.js";

describe('UrlContainer', () => {
  it('should default labels we expect', () => {
    const urlsData = [
      {id: 1,
        long_url: "https://images.unsplash.com/photo-111111",
        short_url: "http://localhost:3001/useshorturl/1",
        title: "awesome photo"
      }
    ]

    const { getByText } = render(<UrlContainer
        urls= {urlsData}
      />)

    const shortLinkLabel = getByText("Short Link:")
    const originalLinkLabel = getByText("Original Link:")

    expect(shortLinkLabel).toBeInTheDocument();
    expect(originalLinkLabel).toBeInTheDocument();
  })

  it('should render text we expect', () => {
    const urlsData = [
      {id: 1,
        long_url: "https://images.unsplash.com/photo-111111",
        short_url: "http://localhost:3001/useshorturl/1",
        title: "awesome photo"
      },
      {id: 2,
        long_url: "https://images.unsplash.com/photo-222222",
        short_url: "http://localhost:3001/useshorturl/2",
        title: "new photo"
      }
    ]

    const { getByText } = render(<UrlContainer
        urls= {urlsData}
      />)

    const titleElementOne = getByText("awesome photo")
    const titleElementTwo = getByText("new photo")
    const shortUrlElementOne = getByText("http://localhost:3001/useshorturl/1")
    const shortUrlElementTwo = getByText("http://localhost:3001/useshorturl/2")
    const longUrlElementOne = getByText("https://images.unsplash.com/photo-111111")
    const longUrlElementTwo = getByText("https://images.unsplash.com/photo-222222")

    expect(titleElementOne).toBeInTheDocument()
    expect(titleElementTwo).toBeInTheDocument()
    expect(shortUrlElementOne).toBeInTheDocument()
    expect(shortUrlElementTwo).toBeInTheDocument()
    expect(longUrlElementOne).toBeInTheDocument()
    expect(longUrlElementTwo).toBeInTheDocument()
  })

})
