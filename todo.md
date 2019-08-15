
Final Project
create a shopping-cart type site with backing database

example:
    http://elmanzo-cst336.herokuapp.com/projects/finalProject/index.php
    http://elmanzo-cst336.herokuapp.com/projects/finalProject/adminLogin.php
        Username: admin
        Password: secret

users can:
- search for products
- add/remove from shopping cart
- checkout

admins can:
- add/update/delete records from 1+ table

Docs:
- Title
- Description
- Mockup
- DB Schema
- Screenshots - 

DB
- ✓ 4+ tables
- ✓ 10+ fields among db tables
- ✓ 20+ records in 1+ table

Site:
- 1/2 -- 2+ ajax calls to web apis
- nice, consistent style/design (use bootstrap)

user section:
- search & filter data using 3+ fields
    + ✓ filter by type/materials
    + ✓ filter by artist
    + ✓ filter by masterpiece title (substring)
    + ✓ filter by sale price
- add items to cart
    + see item popover (from click item in list)
    + add item from cart
- see items in cart (with total cost)
    + see cart popover (from floating cart icon)
    + remove item from cart
    + place order (clears cart)

admin section:
- login/logout
    + express-session
- load/update content for 1+ table (pre-pop existing data in the form)
    + update masterpiece/inventory info
- insert new records for 1+ table
    + add masterpiece to inventory
- delete records
    + remove masterpiece from inventory
- generate 3+ reports (use aggregate functions)
    - ex: avg price of products in the table
    + sales profit by timeframe & artist
    + sales profit by timeframe & medium
    + inventory value by artist
    + inventory value by medium
    
extra:
+ ✓ bootstrap site -- load csv content into table
+ gulp
+ tests
+ favicon.ico  
