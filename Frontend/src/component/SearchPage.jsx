import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  //handle search here
   
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:4500/search?keyword=${keyword}`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="grid-container">
        {results.map((result) => (
          <div key={result._id}>
            <img src={result.imageUrl} alt={result.headline} />
            <div>{result.companyName}</div>
            <div>{result.primaryText}</div>
            <div>{result.headline}</div>
            <div>{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
