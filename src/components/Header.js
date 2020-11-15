/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { getSaved } from '../services/services';
import { addSaved } from '../services/services';
import { Link } from 'react-router-dom';

export default function Header({ saved, setSaved, newSaved }) {
  const [firstRender, setFirstRender] = useState(true);
  const [firstRenderTwo, setFirstRenderTwo] = useState(true);
  useEffect(() => {
    if (firstRender) {
      getSaved().then((data) => {
        setSaved(data);
      });
      setFirstRender(false);
    } else {
      // each time a new one is added to saved we will save everything to the db
    }
  }, [saved]);
  useEffect(() => {
    if (!firstRenderTwo) {
      let obj = newSaved;
      addSaved(obj).then(({ data }) => {
        //return the saved item
        const newlySaved = [...saved];
        newlySaved.push(data);
        setSaved(newlySaved);
      });
      // add the newly saved object to saved....
    }
    setFirstRenderTwo(false);
  }, [newSaved]);

  return (
    <div className="header-div">
      <Link className="header-contain" to="/">
        <h1 className="header-name">Mr.RecipeBoi</h1>
      </Link>
      <Link className="saved-title" to="/saved">
        Saved ({saved.length})
      </Link>
    </div>
  );
}
