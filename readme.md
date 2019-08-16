### application setup

add file & dir: secrets/db.json5:

```json5
{
    host: 'db-hostname',
    user: 'db-username',
    password: 'password-for-user',
    database: 'database-name'
}
```

run `bootstrap.js` to initialize the DB with schema, stored procedures and data
note: if your setting up a new DB for this installation (ie. Local Env), on the last line of `bootstrap.js` change:
```
main(true, false);
``` 
to
```
main(true, true);
```
see main function docs for more info

webstorm - install twig plugin & associate with .njk

---

### references
nunjucks:
- https://mozilla.github.io/nunjucks/
- https://riptutorial.com/node-js/example/20689/nunjucks
- https://hackernoon.com/how-to-develop-a-boilerplate-for-api-with-node-js-express-and-mongodb-4c771ae1c2df
- https://zellwk.com/blog/nunjucks-with-gulp/


art mediums:
- https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_artistic_mediums.html
