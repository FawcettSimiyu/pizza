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
  for (i = 0; i < this.chosenToppings.length; i += 1) {
    if (this.chosenToppings[i].checked) {
      this.pizzaToppings += 100;
    }
  }
}

Pizza.prototype.costOfPizza = function (toppings, size) {
  var pizzaPrice = this.pizzaToppings + this.pizzaSize ;
  return pizzaPrice;
}

function resetFields() {
  $("select.new-pizza-size").val("");
  $("input[name='crust']:checked").val();
  $("input[name='option']:checked").val();
  $('input:checkbox').removeAttr('checked');
}

// User Interface Logic
$(document).ready(function(){

  $("#add-more-pizza").click(function(){
    $("#extra-pizzas").append('<p>___________________________________</p>' +
                              '<div class="another-pizza">' +
                              '<h6>Select Pizza Size</h6>' +
                              '<select class="form-control new-pizza-size">' +
                               '<option id="size1" value="1000">Regular - Ksh1000</option>' +
                               '<option id="size2" value="1500">Medium - Ksh1500</option>' +
                               '<option id="size3" value="2000">Large - Ksh2000</option>' +
                               '</select>' +
                               '<h6>Select Pizza Crust</h6>' +
                               '<p>' +
                                 '<label><input type="radio" name="crust" value="thin">Thin</label>' +
                                 '<label><input type="radio" name="crust" value="thick">Thick</label>' +
                                 '<label><input type="radio" name="crust" value="pan">Pan</label>' +
                               '</p>' +
                               '<h6>Select Pizza Toppings</h6>' +
                               '<h6>Extra charges for each topping</h6>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Peperroni</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Bacon</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="100">Green Peppers</label>' +
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
      var inputtedPizzaSize = parseInt( $(this).find( $("select.new-pizza-size")).val());
      var inputtedPizzaToppings = 0;
      var checkedBoxes = $(this).find( document.getElementsByName("toppings"));


      var newPizza = new Pizza(inputtedPizzaToppings, inputtedPizzaSize, checkedBoxes);

      newAllOrders.pizzaTotal.push(newPizza);

      newPizza.costOfToppings();

      var pizzaNumber = newAllOrders.pizzaTotal.indexOf(newPizza);
      console.log(newAllOrders.costTotal);

      var radioValue1 = $("input[name='crust']:checked").val();
          if(radioValue1 =="thin"){
              var selectedCrust = parseInt(pizzaCrust.thin);
            } else if (radioValue1=="thick") {
              var selectedCrust = parseInt(pizzaCrust.thick);
            } else {
              var selectedCrust = parseInt(pizzaCrust.pan);
            }

      var radioValue = $("input[name='option']:checked").val();
            if(radioValue=="yes"){
                prompt("Please Enter Delivery Location and Phone Number")
                alert("Thank You. Your Order Will be Delivered to Your Location Soon");
            }

            if (radioValue=="yes"){
              var deliveryPrice = parseInt(200);
            } else {
              deliveryPrice = 0;
            }

      $("#show-pizza-results").show();
      $("#pizza-price").append("<li> Pizza " + (pizzaNumber + 1) + ": Ksh" + newPizza.costOfPizza()  + "(Pizza & Toppings Only)"+ "</li>");

      overallTotal = overallTotal + newPizza.costOfPizza() + selectedCrust + deliveryPrice;
    });

    $("#complete-total").text("Total Order Amount inclusive All Costs: Ksh" + overallTotal);
    resetFields();
  });
});
