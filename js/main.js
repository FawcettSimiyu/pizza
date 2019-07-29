// Business Logic
var pizzaCrust = {
  thin : 100,
  thick: 150,
  pan : 200
}

function AllOrders () {
  this.pizzaTotal = [];
  this.costTotal = 0;
}

function Pizza (toppings, size, chosen) {
  this.pizzaToppings = toppings;
  this.pizzaSize = size;
  this.chosenToppings = chosen;
}

Pizza.prototype.costOfToppings = function (chosen, toppings) {
  for (i = 0; i < this.chosenToppings.length; i += 100) {
    if (this.chosenToppings[i].checked) {
      this.pizzaToppings += 100;
    }
  }
}

Pizza.prototype.costOfPizza = function (toppings, size) {
  var pizzaPrice = this.pizzaToppings + this.pizzaSize;
  return pizzaPrice;
}

function resetFields() {
  $("select.new-pizza-size").val("");
  $("select.new-pizza-crusts").val("");
  $('input:checkbox').removeAttr('checked');
}

var deliveryPrice = parseInt(200);
// User Interface Logic
$(document).ready(function(){

  $("#add-more-pizza").click(function(){
    $("#extra-pizzas").append('<p>___________________________________</p>' +
                              '<h5>Select Another Pizza</h>' +
                              '<div class="another-pizza">' +
                              '<select class="form-control new-pizza-size">' +
                               '<option id="size1" value="1000">Small - Ksh1000</option>' +
                               '<option id="size2" value="1500">Medium - Ksh1500</option>' +
                               '<option id="size3" value="2000">Large - Ksh2000</option>' +
                               '</select>' +
                               '<h5>Select Pizza Crust</h5>' +
                               '<p>' +
                                 '<label><input type="radio" name="crust" value="thin">Thin</label>' +
                                 '<label><input type="radio" name="crust" value="thick">Thick</label>' +
                                 '<label><input type="radio" name="crust" value="pan">Pan</label>' +
                               '</p>' +
                               '<p id="btn"><input type="button" value="Submit Option"></p>' +
                               '<h5>Select Pizza Toppings</h5>' +
                               '<h6>Extra charges for each topping</h6>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Extra Cheese</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Mushrooms</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Peppers</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Sausage</label>' +
                               '</div>' +
                               '</div>'
    );
  });

  $("#new-pizza-order").submit(function(event){
    event.preventDefault();

    var newAllOrders = new AllOrders ();
    var overallTotal = newAllOrders.costTotal;

    $(".another-pizza").each(function() {
      var inputtedPizzaSize = parseInt( $(this).find( $("select.new-pizza-size") ) .val());
      var inputtedPizzaToppings = 100;
      var checkedBoxes = $(this).find( document.getElementsByName("toppings") );



      var newPizza = new Pizza(inputtedPizzaToppings, inputtedPizzaSize, checkedBoxes);

      newAllOrders.pizzaTotal.push(newPizza);

      newPizza.costOfToppings();

      var pizzaNumber = newAllOrders.pizzaTotal.indexOf(newPizza);
      console.log(newAllOrders.costTotal);

      $("#show-pizza-results").show();
      $("#pizza-price").append("<li> Pizza " + (pizzaNumber + 1) + ": Ksh" + newPizza.costOfPizza() + "</li>");

      overallTotal = overallTotal + newPizza.costOfPizza();
    });

    $("#complete-total").text("Total Order is Ksh" + overallTotal);
    resetFields();
  });
  $("input[type='button']").click(function(){
        	var radioValue = $("input[name='option']:checked").val();
            if(radioValue=="yes"){
                prompt("Please Enter Delivery Location and Phone Number")
                alert("Your Order Will be Delivered to Your Location Soon");
                alert("Pay 200Ksh on Delivery")
            }
        });
});
