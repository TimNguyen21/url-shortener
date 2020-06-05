import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div key={url.id} className="url">
        <h3>{url.title}</h3>
        <h4>Short Link:</h4>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <h4>Original Link:</h4>
        <p>{url.long_url}</p>
        <button onClick={() => props.deleteUrl(url.id)}>
          Delete URL
        </button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
