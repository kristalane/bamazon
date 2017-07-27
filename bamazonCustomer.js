var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  inventoryDisplay();
});

function inventoryDisplay() {
  var sql = "SELECT item_id, product_name, price FROM products WHERE  stock_quantity > 0";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Items available: ");
    result.forEach(function (row) {
      console.log("ID: " + row.item_id + " || "
      + "Item: " + row.product_name + " || "
      + "Price: $" + row.price)
    });
  whatBuy();
  });
};

// this function walks the user through selecting an item.
function whatBuy() {
  inquirer.prompt([
    {name: "id",
    type: "input",
    message: "Enter the ID number of the item you'd like to purchase."
    },
    {name: "howMany",
    type: "input",
    message: "How many would you like to buy?"
    }
  ])
    .then(function(answer) {
      checkQuantity(answer.id, answer.howMany);
    });
};

// checkQuantity checks the quantity entered by the user against the DB's available quantity for that item_id and determines whether the purchase will be successful or not.
function checkQuantity(id, quantity) {
  var sql = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
  connection.query(sql, [id], function(err, result) {
    if (err) throw err;
    var dbQty = result[0].stock_quantity;
    var cost = result[0].price;
    if (dbQty > quantity) {
      console.log("Thank you for your purchase! Your total cost will be: $ " + (quantity*cost));
      updateInventory(id, quantity);
    }
    else {
      console.log("Too bad; looks like our inventory is a bit short of your needs. Please try another purchase.");
      inventoryDisplay();
    }
  })
};

// updateInventory updates the DB to reflect the successful purchase of items.
function updateInventory(id, quantity) {
  var sql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
  connection.query(sql, [quantity, id], function(err, result) {
    if (err) throw err;
    quit();
  });
}

function quit() {
  connection.end();
};
