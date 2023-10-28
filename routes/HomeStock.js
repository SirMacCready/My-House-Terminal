// Import the required Express.js library and other dependencies
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Food = require('../src/data/Mongo/DBInit.js');

// Parse form data using body-parser middleware
router.use(bodyParser.urlencoded({ extended: false }));

// Define a GET route for the root path ('/')
router.get('/', async (req, res) => {
  // Retrieve the 'search' query parameter from the request
  let search = req.query.search;
  let searchInt = parseInt(search, 10);

  // Check if 'search' is not a number, set it to undefined
  if (isNaN(searchInt)) {
    searchInt = undefined;
  }

  // Check if 'search' query parameter is provided
  if (search) {
    try {
      // Use Mongoose to find documents that match the search criteria
      const food = await Food.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { Brand: { $regex: search, $options: 'i' } },
          { UseByDate: { $regex: search, $options: 'i' } },
          { AVGTimeToFinish: { $regex: search, $options: 'i' } },
          { Quantity: searchInt },
        ],
      });
      // Render the 'HomeStock' view with the found food items
      res.render('HomeStock', {
        foodList: food,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  // If no search query parameter is provided, retrieve and render all food items
  try {
    const food = await Food.find({});
    res.render('HomeStock', {
      foodList: food,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a DELETE route for deleting a resource by ID
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

// Define a POST route for adding a new food item
router.post('/', async (req, res) => {
  // Extract form data from the request body
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
    // Create a new 'Food' document and save it to the database
    const newFood = new Food(formData);
    await newFood.save();
    res.status(204).redirect('back');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router to make it available to other parts of the application
module.exports = router;
