//Logic
//Conditions
//Loops
//arrays
//constructors
//callbacks

//Constants
var startingHealth = 100;
var startingHits = 0;
var playerName = "PlayerName";

// Item Constructor HERE
var ItemsConstructor = function (name, modifier, description) {
  this.name = name;
  this.modifier = modifier;
  this.description = description;
  this.draw = function () {

    return '<div class="item">' + this.name + '</div>';
    //...
  }
}



//global items placeholder HERE
var items = {
  helmet: new ItemsConstructor("Helmet", 0.2, "This will protect your face!"),
  shield: new ItemsConstructor("Shield", 0.3, "This is an awesome shield!"),
  armor: new ItemsConstructor("Armor", 0.4, "This armor rocks!!!")

};

var player = {
  name: "PlayerName",
  health: startingHealth,
  hits: startingHits,
  items: [],

  slap: function () {
    this.hit(1);
  },
  punch: function () {
    this.hit(5);
  },
  kick: function () {
    this.hit(10);
  },
  hit: function (damage) {
    this.health -= (damage - (damage * this.addMods()));
    this.hits++;
    if (this.health <= 0) {
      this.health = 0;
    }
    update();
  },
  reset: function () {
    this.health = startingHealth,
    this.hits = startingHits,
    this.items = [];
    children[0].disabled = false;
    children[1].disabled = false;
    children[2].disabled = false;
    update();
  },
  addMods: function () {
    var modTotal = 0
    for (var i = 0; i < this.items.length; i++) {
      modTotal += this.items[i].modifier;
    }
    return modTotal;
  }

}

function update() {
  document.getElementById("health").innerText = player.health;
  document.getElementById("name").innerText = player.name;
  document.getElementById("hits").innerText = player.hits;
  if (player.health <= 0) {
    document.getElementById("player-panel").classList.add("panel-danger")
  } else {
    document.getElementById("player-panel").classList.remove("panel-danger")
  }
       
  //IF HEALTH STATEMENT
  drawItems()

}

function drawItems() {
  var testItems = "";
  for (var i = 0; i < player.items.length; i++) {
    testItems += player.items[i].draw();
  }

  document.getElementById("player-items").innerHTML = testItems


}
var itemSelect = document.getElementById('item-select');
  var children = itemSelect.options;
function giveItem() {
  if (children[0].selected == true) {
    player.items.push(items.shield);
    children[0].disabled = true;
  }
  if (children[1].selected == true) {
    player.items.push(items.helmet);
    children[1].disabled = true;
  }
  if (children[2].selected == true) {
    player.items.push(items.armor);
    children[2].disabled = true;
  }

  update();
  return;
}


update();