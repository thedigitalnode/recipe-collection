import logo from './logo.svg';
import { useEffect, useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState({ recipes: [] });

  let submitRecipe = (event) => {
    event.preventDefault()

    let newRecipeName = document.getElementById('newRecipeName').value;
    let newRecipeInstructions = document.getElementById('newRecipeInstructions').value;


    let recipeObject = { recipes: [...recipes.recipes] }
    recipeObject.recipes.push(
      {
        name: newRecipeName,
        instructions: newRecipeInstructions
      }
    )
    setRecipes(recipeObject)

  }

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      {
        recipeFormShown ?
          <>
            <form id="recipe-form" name='recipe-form' onSubmit={submitRecipe}>
              <label htmlFor="newRecipeName">Recipe name: </label>
              <input type="text" id="newRecipeName" />
              <label htmlFor="newRecipeInstructions">Instructions:</label>
              <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
              <input type="submit" onClick={(event) => submitRecipe(event)} />
            </form>
          </>
          :
          <button onClick={() => showRecipeForm(!recipeFormShown)}>Add Recipe</button>
      }
      <>
        {
          recipes.recipes.map((recipe, index) => {
            return (
              <>
                <p>{recipe.name}</p>
                <p>{recipe.instructions}</p>
              </>
            )
          })
        }
      </>
    </div>
  );
}

export default App;
