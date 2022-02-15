//1 tester le lien
// https://www.themealdb.com/api/json/v1/1/search.php?s=tomato

const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

// console.log(input);

async function fetchMeals(search) {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
}

function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>No result</h2>";
  } else {
    meals.length = 12;
    //   console.log(mealsDisplay());

    result.innerHTML = meals
      .map((meal) => {
        //Ici on souhaite énumérer le map sur plusieurs lignes donc on ajoute des {} apres le map. il est donc vital d'ecrire un return avant le premier `

        let ingredients = [];

        for (let i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }

        console.log(ingredients);
        //vital de mettre le return` comme ceci
        return `
            <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="pic ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
            </li>
            `;
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value).then(()=> mealsDisplay()); //.then(()=> mealsDisplay()) permet l'affichage selon input sans need valider l'input
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});

// fetchMeals();
