/**
* @description Constructor for parent class that both Dino & Human will inherit from
* @constructor
* @param {string} species - The type of animal
* @param {number} weight - How much the animal weighs
* @param {number} height - How tall the animal is
* @param {string} diet - What the animal eats
*/
function BaseAnimal(species, weight, height, diet) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

/**
 * @description Constructor for Dino class
 * @constructor 
 * See BaseAnimal for description of params species through diet
 * @param {string} where - Location where the Dino primarily lived
 * @param {string} when - Time period when the Dino lived
 * @param {string} fact - Random fact about the Dino
 */
function Dino(species, weight, height, diet, where, when, fact) {
  BaseAnimal.call(this, species, weight, height, diet);
  this.where = where;
  this.when = when;
  this.fact = fact;
}

/**
 * @description Constructor for Human class
 * @constructor
 * See BaseAnimal for details about param's height through diet
 */
function Human(name, height, weight, diet) {
  BaseAnimal.call(this, 'Human', weight, height, diet);
  this.name = name;
}

// Construction of all the Dino's that are to be used in UI
const dinos = [
  new Dino(
    'Triceratops',
    13000,
    114,
    'Herbivore',
    'North America',
    'Late Cretaceous',
    'First discovered in 1889 by Othniel Charles Marsh'
  ),
  new Dino(
    'Tyrannosaurus Rex',
    11905,
    114,
    'Carnivore',
    'North America',
    'Late Cretaceous',
    'The largest known skull measures in at 5 feet long.'
  ),
  new Dino(
    'Anklyosaurus',
    10500,
    55,
    'Herbivore',
    'North America',
    'Late Cretaceous',
    'Anklyosaurus survived for approximately 135 million years.'
  ),
  new Dino(
    'Brachiosaurus',
    70000,
    372,
    'Herbivore',
    'North America',
    'Late Jurasic',
    'An asteroid was named 9954 Brachiosaurus in 1991.'
  ),
  new Dino(
    'Stegosaurus',
    11600,
    79,
    'Herbivore',
    'North America, Europe, Asia',
    'Late Jurasic to Early Cretaceous',
    'The Stegosaurus had between 17 and 22 seperate places and flat spines.'
  ),
  new Dino(
    'Elasmosaurus',
    16000,
    59,
    'Carnivore',
    'North America',
    'Late Cretaceous',
    'Elasmosaurus was a marine reptile first discovered in Kansas.'
  ),
  new Dino(
    'Pteranodon',
    44,
    20,
    'Carnivore',
    'North America',
    'Late Cretaceous',
    'Actually a flying reptile, the Pteranodon is not a dinosaur.'
  ),
  new Dino(
    'Pigeon',
    0.5,
    9,
    'Herbivore',
    'World Wide',
    'Holocene',
    'All birds are living dinosaurs.'
  )
];

// function to grab user input that will help generate the Human square in the display results
const getHumanData = function() {
  return (function() {
    return new Human(
      document.getElementById('name').value,
      +document.getElementById('feet').value * 12 +
        +document.getElementById('inches').value,
      +document.getElementById('weight').value,
      document.getElementById('diet').value
    );
  })();
};

// Comparing functions that will help with the generation of random facts about each dinosaur
// ===========================================================================================================
function compareWeight(dino, human) {
  const heaviestAnimal = dino.weight > human.weight ? 'dinosaur' : 'human';
  const lightestAnimal = dino.weight > human.weight ? 'human' : 'dinosaur';
  return `This ${heaviestAnimal} weighs ${Math.abs(
    dino.weight - human.weight
  )} more lbs. than this ${lightestAnimal}.`;
}


function compareHeight(dino, human) {
  const tallestAnimal = dino.height > human.height ? 'dinosaur' : 'human';
  const shortestAnimal = dino.height > human.height ? 'human' : 'dinosaur';
  return `This ${tallestAnimal} is ${Math.abs(
    dino.height - human.height
  )} in. taller than this ${shortestAnimal}.`;
}

// Create Dino Compare Method 3
function compareDiet(dino, human) {
  if (dino.diet === human.diet) {
    return `Both dinosaur and human both have a ${dino.diet} diet.`;
  } else {
    return `This dinosar eats a ${dino.diet} diet and this human eats a ${human.diet} diet.`;
  }
}
// ============================================================================================================

// Will generate the tiles in the result grid after the user enters information and hit's the Compare Me! button
function generateTiles() {
  const human = getHumanData();
  const grid = document.getElementById('grid');
  for (let i = 0; i < 4; ++i) {
    grid.appendChild(generateCell(dinos[i], human));
  }
  grid.appendChild(generateCell(null, human));
  for (let i = 4; i < dinos.length; ++i) {
    grid.appendChild(generateCell(dinos[i], human));
  }
}

// Helper function to help generate all the html required to properly generate the
// cells within the grid and properly display it.
function generateCell(dino, human) {
  const dataSource = dino != null ? dino : human;
  const cell = document.createElement('div');
  cell.className = 'grid-item';
  const cellHeader = document.createElement('h3');
  cellHeader.innerText = dataSource === dino ? dataSource.species : dataSource.name;
  const image = document.createElement('img');
  image.src = `images/${dataSource.species.toLowerCase()}.png`;
  cell.appendChild(cellHeader);
  cell.appendChild(image);
  if (dataSource === dino) {
    const fact = document.createElement('div');
    fact.style = 'width:auto;';
    fact.innerText = `Fact: ${getFact(dino, human)}`;
    cell.appendChild(fact);
  }
  return cell;
}

// Helper function to help randomly generate a fact to display in the results grid. 
// Potentially utilizes 1 of the 3 comparator functions or default fact in order to
// generate. 
function getFact(dino, human) {
  if (dino.species === 'Pigeon') {
    return dino.fact;
  } else {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return compareWeight(dino, human);
      case 1:
        return compareHeight(dino, human);
      case 2:
        return compareDiet(dino, human);
      default:
        return dino.fact;
    }
  }
}

// Allows for the user to toggle between the input form and the result grid.
// This allows the user to either change the info. of the human to see different
// calculations compared to the dinosaur and/or see different facts about the dino.'s.
// eslint-disable-next-line no-unused-vars
function togglePage(showForm) {
  const form = document.getElementById('dino-compare');
  const grid = document.getElementById('grid');
  if (showForm) {
    form.style.display = 'flex';
    grid.style.display = 'none';
    grid.innerHTML = '';
  } else {
    form.style.display = 'none';
    grid.style.display = 'flex';
    generateTiles();
  }
}
