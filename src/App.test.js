import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

// test('As a Chef, I want to store my recipes so that I can keep track of them.', () => {

//   // 1. render the landing page
//   render(<App />);

//   // 2. wait for the page to load
//   // Implied in this case, nothing to wait for

//   // 3. Then I should see a heading that reads "My Recipes"
//   let recipeHeader = screen.getByText('My Recipes');
//   expect(recipeHeader).toBeInTheDocument();

//   // 4. And I should see text beneath the heading that reads "There are no recipes to list"
//   let recipeList = screen.getByText('There are no recipes to list.');
//   expect(recipeList).toBeInTheDocument();

//   // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
//   expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
// });

test("contains an add recipe button", () => {
  // 1. render the landing page
  render(<App />);

  // 2. wait for the page to load (implied, no async operations)

  // 3. Then I should see a button that says "Add Recipe" beneath the "My Recipes" heading.
  let recipeHeader = screen.getByText('My Recipes');
  let button = screen.getByRole('button', {name: 'Add Recipe'});

  expect(button).toBeInTheDocument();
  // being particular, make sure the heading is above the button (at least in html)
  expect(recipeHeader.compareDocumentPosition(button)).toBe(4);
})

test("contains an add recipe button that when clicked opens a form", async () => {
  // render the landing page
  render(<App />);

  // wait for the page to load (implied, no async operations)

  // click Add Recipe button
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  // Wait for the form to appear on the screen (override the default of 1000ms as an example)
  let form = await screen.findByRole('form', undefined, {timeout:3000});

  // Verify the form appears
  expect(form).toBeInTheDocument();

  // Then I should see a form with fields: "Recipe Name" and "Recipe Instructions"
  expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();

  // And the "Add Recipe" button should no longer be on the screen.
  // Use queryBy instead of getBy because getBy throws an error when it doesn't have exactly 1 match
  button = screen.queryByRole('button', {name: 'Add Recipe'});
  expect(button).toBeNull();
});

test("shows new recipe after adding", async () => {
  // render the landing page
  render(<App />);

  // Add recipe
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  // wait for the form/textbox to appear, used findBy because it returns a promise
  let recipeNameBox = await screen.findByRole('textbox', {name: /Recipe name/i});
  let recipeInstructionBox = screen.getByRole('textbox', {name: /instructions/i});

  // add recipe
  const recipeName = 'Tofu Scramble Tacos';
  const recipeInstructions = "1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas";
  userEvent.type(recipeNameBox, recipeName);
  userEvent.type(recipeInstructionBox, recipeInstructions);

  // click the submit button
  let submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // wait for text to appear, a timeout means it was never found
  let recipe = await screen.findByText('Tofu Scramble Tacos');
});
