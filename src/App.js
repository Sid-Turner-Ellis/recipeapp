/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import Saved from './components/Saved';

function App() {
  const [filter, setFilter] = useState('');
  const [saved, setSaved] = useState([]);
  const [newSaved, setNewSaved] = useState({});
  return (
    <Router>
      <Header saved={saved} newSaved={newSaved} setSaved={setSaved} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <div>
              <Search setFilter={setFilter} />
              <Results
                filter={filter}
                saved={saved}
                setNewSaved={setNewSaved}
                setSaved={setSaved}
                newSaved={newSaved}
              />
            </div>
          )}
        />
        <Route
          path="/saved"
          render={(props) => <Saved saved={saved} setSaved={setSaved} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
