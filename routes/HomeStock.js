const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Food = require('../src/data/Mongo/DBInit.js');

// Parse form data
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/', async (req, res) => {
  let search = req.query.search
  let searchInt = parseInt(search, 10)
if (isNaN(searchInt)) {
  searchInt = undefined
}
  if(search) {
    try {
      const food = await Food.find({ $or:
                                  [ {name : { $regex: search, $options: 'i' }},
                                    {Brand: { $regex: search, $options: 'i' }},
                                    {UseByDate : { $regex: search, $options: 'i' }},
                                    {AVGTimeToFinish : { $regex: search, $options: 'i' }},
                                    {Quantity : searchInt }
                                  ] });
      res.render('HomeStock', {
          foodList: food
      });
    } 
    catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
    try {
        const food = await Food.find({});
        res.render('HomeStock', {
            foodList: food
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.delete('/:id', async (req, res) => {
    const resourceId = req.params.id;
  
    try {
      // Use Mongoose to find and delete the document by its ID
      const deletedDocument = await Food.findByIdAndRemove(resourceId);
  
      if (!deletedDocument) {
        return res.status(204).redirect('back');
        
      }
  
      return res.status(204).json(); 
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting resource', error: err.message });
    }
  });
router.post('/', async (req, res) => {
    const formData = {
        name: req.body.Name,
        Brand: req.body.Brand,
        UseByDate: req.body.UseByDate,
        AVGTimeToFinish: req.body.AVGTimeToFinish,
        Quantity: req.body.Quantity,
        Place: req.body.Place,
        Type: req.body.Type,
    };
    try {
        const newFood = new Food(formData);
        await newFood.save();
        res.status(204).redirect('back');
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});
  
module.exports = router;
