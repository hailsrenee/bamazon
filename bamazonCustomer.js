var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "tuckerbug",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT item_id, product_name, price FROM products",
        function (error, result) {
            if (error) throw error;
            console.log(result);
            runSearch(result);
        });
}

function runSearch(results) {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy? [Q to Exit]",
                validate: function(val) {
                    return !isNaN(val) || val === "Q";
                }
            }
        ])
        .then(function(val) {
            exitStrategy(val.id);
            var answerId = parseInt(val.id);
            var chosen = countInventory(answerId, results);

            if (chosen) {
                howMany(chosen);
            }
            else {
                console.log("That item is unavailable.");
                afterConnection();
            }
        });
}

function howMany(chosen) {
    inquirer
        .prompt([
            {
                name: "units",
                type: "input",
                message: "How many units of the product would you like to buy? [Q to Exit]",
                validate: function(val) {
                    return val > 0 || val === "Q";
                }
            }
        ])
        .then(function(val) {
            exitStrategy(val.units);
        
            var units = parseInt(val.units);

            if (units > chosen.stock_quantity) {
                console.log("There's not enough in stock!");
                afterConnection();
            }
            else {
                purchase(chosen, units);
            }
        });
}

function purchase(chosen, units) {
    var total = (chosen.price * units);
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [units, chosen.item_id],
        function (error, result) {
            if (error) throw error;
            console.log("Order placed successfully! Your total is $" + total.toFixed(2));
            afterConnection();
        }
    );
}

function countInventory(answerId, results) {
    for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === answerId) {
                return results[i];
        }
    }
    return null;
}

function exitStrategy(respond) {
    if (respond === "Q") {
        console.log("Adios!");
        process.exit(0);
    }
}