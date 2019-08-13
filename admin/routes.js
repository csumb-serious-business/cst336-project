const express = require("express");
const router = express.Router();

//serve static files
router.use('/admin', express.static('admin/public'));

/* app routes
* DON'T USE THESE PATHS:
*    /    -- root path
*    /*   -- catch all path
* */
router.get('/admin',
    async (req, res) => res.render('admin/root.njk', {
        /* todo add app forms */
        example: await {/* some slow callback */}
    }));

// example of passing a function instead of anonymous
router.get('/example', example);

function example(req, res) {
    // do something here if required, ie check for redirects
    return res.render('admin/root.njk', {});
}

module.exports = router;
