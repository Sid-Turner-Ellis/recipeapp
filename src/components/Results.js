/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getRecipes } from '../services/services';
// https://developer.edamam.com/edamam-docs-recipe-api
export default function Results({
  filter,
  saved,
  setSaved,
  newSaved,
  setNewSaved,
}) {
  const id = process.env.REACT_APP_id;
  const key = process.env.REACT_APP_key;
  const [recipes, setRecipes] = useState({ hits: [] });
  const [firstRender, setFirstRender] = useState(true);
  const [numToLoad, setNumToLoad] = useState(10);
  console.log(recipes.hits);
  // Function that only runs if the value of filter has been changed & submitted
  useEffect(() => {
    const query = filter;
    const url = `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}&to=${numToLoad}`;
    // Caching
    if (!localStorage.getItem(url) || firstRender) {
      // if there is no data cached
      getRecipes(url).then((data) => {
        setRecipes(data);
        localStorage.setItem(url, JSON.stringify(data));
        setFirstRender(false);
      });
    } else {
      // if data has been cached before
      const data = localStorage.getItem(url);
      setRecipes(JSON.parse(data));
    }
  }, [filter, numToLoad]);
  useEffect(() => {
    setNumToLoad(10);
  }, [filter]);
  return (
    <div>
      <h1 className="search-something">
        {recipes.q
          ? recipes.count
            ? `Results for ${recipes.q}`
            : 'Sorry, no recipes were found'
          : 'Search something'}
      </h1>
      <ul
        style={{
          margin: 'auto',
          maxWidth: '1000px',
          width: '80%',
        }}
      >
        {recipes.hits.map((recipe) => (
          <Card
            saved={saved}
            setNewSaved={setNewSaved}
            setSaved={setSaved}
            key={recipe.recipe.uri}
            recipe={recipe}
            newSaved={newSaved}
          />
        ))}
      </ul>
      <p className="seemore" onClick={() => setNumToLoad((prev) => prev + 10)}>
        {recipes.hits.length > 9 ? 'See more...' : ''}
      </p>
    </div>
  );
}

const Card = ({ recipe, saved, setSaved, setNewSaved, newSaved }) => {
  recipe = recipe.recipe;
  let isAlreadySaved = false;
  saved.forEach((item) => {
    if (item.URL == recipe.url) {
      isAlreadySaved = true;
    }
  });
  return (
    <li className="outer">
      <div
        className="img"
        style={{
          backgroundImage: `url(${recipe.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="right">
        <h2>{recipe.label}</h2>
        <h5>At a glance:</h5>

        <div className="nested">
          <ul>
            <li>
              Energy:
              <span>{Math.floor(recipe.calories)}</span>
              kcal
            </li>
            <li>
              Fat:
              <span>{Math.floor(recipe.totalNutrients.FASAT.quantity)}g</span>
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
            <button
              className="card-button"
              ////////////////////////
              style={{
                backgroundColor: isAlreadySaved ? '#7aff5c' : false,
              }}
              onClick={() => {
                const newArr = [...saved];
                recipe = {
                  label: recipe.label,
                  img: recipe.image,
                  cookTime: recipe.totalTime,
                  healthLabels: recipe.healthLabels,
                  kcal: recipe.calories,
                  fat: recipe.totalNutrients.FASAT.quantity,
                  ingredients: recipe.ingredients,
                  URL: recipe.url,
                  URI: recipe.uri,
                };
                newArr.push(recipe);
                // setSaved(newArr);
                setNewSaved(recipe);
              }}
            >
              {isAlreadySaved ? 'saved' : 'save'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

function returnLabelStr(arr) {
  return arr.join(',');
}

// const test = () => {
//   return (
//     <li className="outer">
//       <div className="img"></div>
//       <div className="right">
//         <h2>{recipe.label}</h2>
//         <ul>
//         At a glance:
//           <li>
//             Calories:
//             {Math.floor(recipe.calories)}
//             kcal
//           </li>
//           <li>
//             Saturated fat:
//             {Math.floor(recipe.totalNutrients.FASAT.quantity)}g
//           </li>
//           <li>
//             Cooktime:
//             {recipe.totalTime ? `${recipe.totalTime} mins` : 'unknown'}
//           </li>
//           <li>
//             Health labels:
//             {returnLabelStr(recipe.healthLabels)}
//           </li>
//         </ul>
//         <div className="btn">
//         <button
//           className="card-button"
//           onClick={() => {
//             const newArr = [...saved];
//             recipe = {
//               label: recipe.label,
//               img: recipe.image,
//               cookTime: recipe.totalTime,
//               healthLabels: recipe.healthLabels,
//               kcal: recipe.calories,
//               fat: recipe.totalNutrients.FASAT.quantity,
//               ingredients: recipe.ingredients,
//               URL: recipe.url,
//               URI: recipe.uri,
//             };
//             newArr.push(recipe);
//             setSaved(newArr);
//             setNewSaved(recipe);
//           }}
//         >
//           save
//         </button>
//         </div>
//       </div>
//     </li>
//   );
// };
