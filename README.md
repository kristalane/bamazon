# **bamazon**
a command line (mock) product marketplace

This CLI uses node and the inquirer and mysql packages to ask the user which items (from a displayed list of items from a MySQL database currently containing dummy data) they would like to purchase, and their prices. If the desired quantity is available, the purchase will complete. If not, a message to the user explaining the shortage displays before showing the full item display again (to effectively restart the app). 

Here is what our terminal looks like when a user starts the app-- an inventory of the mock database opens up, displaying the item ID, product name and price (hidden from the user are other fields such as stock quantity and department name):

![Screenshot](bamazon/InventoryDisplay.png)

This view is of a successful purchase, which happens when the user requests a quantity that is available in the inventory. We know the quantity requested is available because of a query that checks the database against the user's request. If successful, the total cost will display to the user, and a second query will update the database to remove the requested items from the inventory. I've included a console.log of the result in this screenshot to demonstrate that the database successfully updated. 
![Screenshot] (/Users/klane/Desktop/Code/bamazon/bamazon/CompleteWithSQLUpdate.png)

Below is what happens when a user selects an item/quantity for which the database has insufficient quantities. The user is displayed a failure message and invited to begin the process again with an inventory display. 

![Screenshot] (/Users/klane/Desktop/Code/bamazon/bamazon/FailureMessage.png)

Here is a shot of the same failure with a console.log of the result. Because the second query never ran (due to failure in the first query), the result is showing the stock quantity and price of the item, which is what we asked for in the first query to make the user/DB comparison.

![Screenshot] (/Users/klane/Desktop/Code/bamazon/bamazon/FailWithConsole.png)
