const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
    {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']  
    },
    ] 
    });
    res.status(200).json(dbTagData);
    } catch(err) {
      res.status(500).json(err);  
    }
    });

router.get('/:id', async (req, res) => {
  try {
    const dbSingleTag = await Tag.findOne({
    where: {
     id: req.params.id, 
    },
    include: [
      {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']  
      }, 
      ],  
    })
    .then((dbSingleTag) => {
    if(!dbSingleTag) {
    res.status(404).json({message: 'No product with that id!'});
    return;  
    }
    res.json(dbSingleTag); 
    })  
    } catch(err) {
      res.status(500).json(err);  
    }
    });

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const upTag = await Tag.update(
    {tag_name: req.body.tag_name},
    {
    where: {
    id: req.params.id,  
    }  
    }  
    )
  .then((upTag) => {
  if (!upTag) {
  res.status(404).json({ message: "No Tag found with this ID."});
  return;  
  }
  })
  res.status(200).json(upTag)
  } catch (err) {
    res.status(500).json(err);  
  }
  });

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
