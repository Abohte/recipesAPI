const router = require('express').Router()
const { Recipe } = require('../models')

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    // Newest recipes first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((recipes) => res.json(recipes))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .post('/recipes', (req, res, next) => {
    let newRecipe = req.body

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .put('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    const updatedRecipe = req.body

    Recipe.findByIdAndUpdate(id, { $set: updatedRecipe }, { new: true })
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .patch('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    const updatedRecipe = req.body

    Recipe.findByIdAndUpdate(id, { $set: updatedRecipe }, { new: true })
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .delete('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findByIdAndRemove(id)
    .then((recipe) => res.json(recipe))

    // or:
    //   res.status = 200
    //   res.json({
    //     message: 'Removed',
    //     _id: id
    //   })

    .catch((error) => next(error))
  })


module.exports = router
