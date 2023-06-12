//npm


//requires
const probandsol = require('../models/probandsolSchema');


//sdk setup
const PandS = async (req, res) => {
    const { problemCategoryId, problem, description, comment } = req.body;
    await probandsol.create({ problemCategoryId, problem, description, comment, });
    res.send({
        message: "Problem created!",
        status: true
    });
}

module.exports = { PandS };