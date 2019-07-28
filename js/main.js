//Business Logic
function PizzaOrders (){
  this.pizzaTotal = [];
  this.costTotal = 0;
}

function Piza (toppings,size,chosen) {
  this.pizzaToppings = toppings;
  this.pizzaSize = size;
  this.chosenToppings = chosen;
}
