const problemsCat = require('../models/problemsCategory');

const createProblemCategory = async (req, res) => {
    const { problemCategoryName } = req.body;
    await problemsCat.create({ problemCategoryName });
    res.send({
        message: "Problem Category created!",
        status: true
    })
}

// const getProblemsCatogary = async function (req, res) {
//     try {
//         const data = await problemsCat.find({ problem: problem })
//         console.log(data)
//         if (data != null) {
//             res.send({
//                 message: 'get problems catogary successfully',
//                 status: true
//             })
//         } else {
//             res.send({
//                 message: 'getting error in fatching problems',
//                 status: false
//             })
//         }

//     } catch {
//         res.send({
//             message: 'Somthing went wrong',
//             status: false
//         })
//     }
// }
const getProblemsCatogary = async (req, res) => {
    try {
        const data = await problemsCat.find({ isDeleted: false });
        if (data.length) {
            res.send({
                message: "Problem Category is available!",
                status: true,
                data
            })
        } else {
            res.send({
                message: "Problem Category is not available!",
                status: false,
                data: []
            })
        }
    } catch (error) {
        res.send({
            message: "Something went wrong!",
            status: false,
            data: []
        })
    }
}

module.exports = { getProblemsCatogary, createProblemCategory }