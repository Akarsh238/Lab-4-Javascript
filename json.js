const header = document.querySelector("header");
const section = document.querySelector("section");

async function populate() {
  const requestURL = "i-scream.json";
  const response = await fetch(requestURL);
  const iScream = await response.json();
  console.log(iScream);

  populateHeader(iScream);
  showTopFlavors(iScream);
}

populate();

function populateHeader(jsonObj) {
  const myH1 = document.createElement("h1");
  myH1.textContent = jsonObj.companyName;
  header.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent = `Head Office: ${jsonObj.headOffice} | Established: ${jsonObj.established}`;
  header.appendChild(myPara);
}

function showTopFlavors(jsonObj) {
  const topFlavors = jsonObj.topFlavors;

  for (let i = 0; i < topFlavors.length; i++) {
    const flavour = topFlavors[i];

    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const typePara = document.createElement("p");
    const calPara = document.createElement("p");
    const notePara = document.createElement("p");
    const ingredientsHeading = document.createElement("h3");
    const ingredientsList = document.createElement("ul");

    article.classList.add("card");

    if (flavour.calories <= 280) {
      article.classList.add("low-cal");
    } else if (flavour.calories <= 350) {
      article.classList.add("mid-cal");
    } else {
      article.classList.add("high-cal");
    }

    let typeEmoji = "🍨";
    if (flavour.type.toLowerCase() === "sorbet") {
      typeEmoji = "🍧";
    } else if (flavour.type.toLowerCase() === "gelato") {
      typeEmoji = "🍦";
    }

    h2.textContent = flavour.name;
    img.src = flavour.image;
    img.alt = flavour.name;

    typePara.textContent = `${typeEmoji} Type: ${flavour.type}`;
    calPara.textContent = `Calories: ${flavour.calories} kcal`;

    if (flavour.calories > 350) {
      notePara.textContent = "High-calorie treat – enjoy in moderation! 😈";
    } else if (flavour.calories < 300) {
      notePara.textContent = "Lighter option – good if you are watching calories. ✅";
    } else {
      notePara.textContent = "Medium calorie – nice balance. 😋";
    }

    ingredientsHeading.textContent = "Ingredients:";
    const ingredients = flavour.ingredients;

    for (let j = 0; j < ingredients.length; j++) {
      const listItem = document.createElement("li");
      listItem.textContent = ingredients[j];
      ingredientsList.appendChild(listItem);
    }

    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(typePara);
    article.appendChild(calPara);
    article.appendChild(notePara);
    article.appendChild(ingredientsHeading);
    article.appendChild(ingredientsList);

    section.appendChild(article);
  }
}
