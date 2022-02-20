import Fuse from "fuse.js";
import React, { useState, useEffect } from "react";

function SearchBar(props) {
  const [searchResults, setSearchResults] = useState(null);
  const [traditionalList, setTradtionalList] = useState(null);

  props.ChangeList = false;
  props.SearchedList = searchResults;

  const options = {
    includeScore: false,
    keys: ["utility", "city", "state_abbrv"],
  };

  const fuse = new Fuse(traditionalList, options);

  const [text, setText] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (text === "") {
      alert("Please enter something!");
    } else {
      const result = fuse.search(text);
      setSearchResults(result);
      props.SearchedList = searchResults;
    }
  };

  const onChange = (evt) => setText(evt.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="formSearch">
        <input
          type="search"
          name="text"
          placeholder="search database..."
          value={text}
          onChange={onChange}
          className="buttonSearch"
        />
      </form>
    </div>
  );
}

export default SearchBar;
