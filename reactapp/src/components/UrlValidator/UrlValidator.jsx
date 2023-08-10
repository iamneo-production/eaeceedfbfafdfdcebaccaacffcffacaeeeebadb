import React, { useState,useEffect } from 'react';

function UrlValidator() {
  const [domain, setDomain] = useState('');
  const [path, setPath] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (domain && path && method) {
      let url = "";
    if (!/^w+\.[A-Za-z0-9]+\.com$/i.test(domain)) {
      setMessage('Invalid URL! Please recheck your URL');
      return;
    }
    const cleanedPath = path.trim().replace(' ', '/');
    if (['POST', 'PUT'].includes(method)) {
      if((body.trim().length === 0) || (body.trim().length > 0 && (!/^\{.*"[A-Za-z]+".*:.*"[A-Za-z]+".*\}$/i.test(body)))) {
      setMessage('Error in the Body');
      return;
      }
    }
    if(['GET'].includes(method) && body.trim().length > 0) {
      if(!/^\{.*"[A-Za-z]+".*:.*"[A-Za-z]+".*\}$/i.test(body)) {
      setMessage('Error in the Body of the Query Params');
      return;
      }
    }
    if(['GET'].includes(method) && body.trim().length > 0) {
      let te = body.trim().replace(/[\s\{\}\"]+/g,"");
      const tem = te.trim().replace(":","=");
      url = `${domain}/${cleanedPath}?${tem}`;
    }
    else {
      url = `${domain}/${cleanedPath}`;
    }
    console.log(`URL: ${url}`);
    console.log(`Body: ${body}`);
    setDomain('');
    setPath('');
    setMethod('GET');
    setBody('');
    setMessage(url);
    }
  }, [domain, path, method]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    setDomain(target[0].value);
    setPath(target[1].value);
    setMethod(target[2].value);
    setBody(target[3].value);
  }
  return (
    <div data-testid="url-validator">
      <form data-testid="submit" onSubmit={handleSubmit}>
        <label htmlFor="domain">Domain:</label>
        <input data-testid="domain" type="text" id="domain" value={domain} onChange={(event) => setDomain(event.target.value)} />

        <label htmlFor="path">Path:</label>
        <input data-testid="path" type="text" id="path" value={path} onChange={(event) => setPath(event.target.value)} />

        <label htmlFor="method">Method:</label>
        <select data-testid="method" id="method" value={method} onChange={(event) => setMethod(event.target.value)} >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        {method !== "DELETE" &&
          <React.Fragment>
            <label htmlFor="body">Body:</label>
            <textarea data-testid="body" id="body" value={body} onChange={(event) => setBody(event.target.value)} ></textarea>
          </React.Fragment>
        }

        <button type="submit">Validate URL</button>
      </form>

      {message && <div data-testid="message">{message}</div>}
      
    </div>
  );
}

export default UrlValidator;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WikipediaSearch() {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [searchResults, setSearchResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        axios
          .get(`https://en.wikipedia.org/w/api.php`, {
            params: {
              action: 'opensearch',
              origin: '*',
              search: searchTerm,
            },
          })
          .then((response) => {
            const [, titles, descriptions, links] = response.data;
            setSearchResults(
              titles.map((title, index) => ({
                title,
                description: descriptions[index],
                link: links[index],
              }))
            );
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setTimeout(() => {
        setSearchResults([]);
      }, 200);
    }
  }, [searchTerm]);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '600',
          height: '150px',
        }}
      >
        Wiki Search
      </div>
      <div style={{ marginLeft: '100px' }}>
        <form>
          {/* <label>
            Search Wikipedia:
          </label> */}
          <input
            type='text'
            style={{
              width: '200px',
              border: '1px solid grey',
              borderRadius: '3px',
              paddingLeft: '10px',
              paddingBlock: ' 5px',
            }}
            value={searchTerm}
            onChange={handleSearchTermChange}
            data-testid='searchterm'
          />
        </form>
        <ul>
          {searchResults.map((result, index) => (
            <div
              key={index}
              style={
                index % 2 === 0
                  ? {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgb(239, 204, 239)',
                      paddingBlock: '10px',
                      marginLeft: '-40px',
                      width: '80vw',
                    }
                  : {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgb(218, 181, 218)',
                      paddingBlock: '10px',
                      marginLeft: '-40px',
                      width: '80vw',
                    }
              }
            >
              <a
                href={result.link}
                data-testid='suggestion'
                style={{
                  textDecoration: 'none',
                  color: 'cornflowerblue',
                  marginLeft: '10px',
                }}
              >
                {result.title}
              </a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WikipediaSearch;