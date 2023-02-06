const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
const dbCategoryData = await Category.findAll({
attributes: ['id', 'category_name'],
include: [
{
model: Product,
attributes: ['id', 'product_name', 'price', 'stock', 'category_id']  
}  
] 
});
res.status(200).json(dbCategoryData);
} catch(err) {
  res.status(500).json(err);  
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const idData = await Category.findByPk( req.params.id, {
  include: [{model: Product}],
  });

  if (!idData) {
    res.status(404).json({ message: 'No category found with that ID!'});
    return;
  };

  res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }  
  });

router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
  const upCat = Category.update(
  {category_name: req.body.category_name},
  {
  where: {
  id: req.params.id,  
  }  
  }  
  )
.then((upCat) => {
if (!upCat) {
res.status(404).json({ message: "No Category found with this ID."});
return;  
}
})
res.status(200).json(upCat)
} catch (err) {
  res.status(500).json(err);  
}
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCat) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
