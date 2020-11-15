import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteRecipe } from '../services/services';

export default function Saved({ saved, setSaved }) {
  if (saved[0]) {
    return (
      <ul
        style={{
          margin: 'auto',
          maxWidth: '1000px',
          width: '80%',
        }}
      >
        {saved.map((recipe) => (
          <SavedCard
            saved={saved}
            setSaved={setSaved}
            key={recipe._id}
            recipe={recipe}
          />
        ))}
      </ul>
    );
  } else {
    return <div></div>;
  }
}

const SavedCard = ({ recipe, saved, setSaved }) => {
  function returnSavedAfterDeleted(deleted) {
    const newArr = saved.filter((v) => {
      if (v._id !== deleted._id) {
        return v;
      } else {
      }
    });
    return newArr;
  }
  if (recipe) {
    return (
      <li className="outer">
        <div
          className="img"
          style={{
            backgroundImage: `url(${recipe.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        ></div>
        <div
          className="delete"
          onClick={() => {
            if (
              window.confirm('Are you sure you wanna delete that sir?') == true
            ) {
              //delete item from the saved array
              //delete item from the database
              deleteRecipe(recipe._id).then((data) => {
                const newArr = returnSavedAfterDeleted(data);
                setSaved(newArr);
              });
            }
          }}
        >
          ×
        </div>
        <div className="right">
          <h2>{recipe.label}</h2>
          <h5>At a glance:</h5>

          <div className="nested">
            <ul>
              <li>
                Energy:
                <span>{Math.floor(recipe.kcal)}</span>
                kcal
              </li>
              <li>
                Fat:
                <span>{Math.floor(recipe.fat)}g</span>
              </li>
              <li>
                Time:
                <span>
                  {recipe.totalTime ? `${recipe.totalTime} mins` : 'unknown'}
                </span>
              </li>
              <li>
                Labels:
                <span>{returnLabelStr(recipe.healthLabels)}</span>
              </li>
            </ul>
            <div className="btn">
              <a href={recipe.URL} target="_blank">
                <button id="make-it" className="card-button">
                  make it!
                </button>
                {/* <button className="card-button">Completed?</button> */}
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    return <div></div>;
  }

  function returnLabelStr(arr) {
    return arr.join(',');
  }
};
