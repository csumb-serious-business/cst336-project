### setup

add file & dir: secrets/db.json5:

```json5
{
    user: 'db-username',
    password: 'password-for-user'
}
```

webstorm - install twig plugin & associate with .njk

===

### references
https://mozilla.github.io/nunjucks/
https://riptutorial.com/node-js/example/20689/nunjucks
https://hackernoon.com/how-to-develop-a-boilerplate-for-api-with-node-js-express-and-mongodb-4c771ae1c2df
https://zellwk.com/blog/nunjucks-with-gulp/

===

- ✓ 

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
- DB Schema - modelio
- Screenshots - 

DB
- 4+ tables
- 10+ fields among db tables
- 20+ records in 1+ table

Site:
- 2+ ajax calls to web apis
- nice, consistend style/design (use bootstrap)

user section:
- search & filter data using 3+ fields
- add items to cart
- see items in cart (with total cost)

admin section:
- login/logout 
- load/update content for 1+ table (pre-pop existing data in the form)
- insert new records for 1+ table
- delete records
- generate 3+ reports (use aggregate functions)
    - ex: avg price of products in the table