// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product);
// Products belongToMany Tags (through ProductTag)
Product.belongstoMany(Tag, {through: 'ProductTag', foreignKey: 'product_id'});
// Tags belongToMany Products (through ProductTag)
Tag.belongstoMany(Product, {through: 'ProductTag', foreignKey: 'tag_id'});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
