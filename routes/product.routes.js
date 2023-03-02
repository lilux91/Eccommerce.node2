const { Router } = require('express');
const { check } = require('express-validator');
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validProductById } = require('../middlewares/products.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createProductValidation,
  updateProductValidation,
} = require('../middlewares/validations.middleware');
const { upload } = require('../utils/multer');

const router = Router();
//IMPORTANTE ESTOS COMENTARIOS SON MERAMENTE EDUCATIVOS

// Esta ruta me va a encontrar todos los productos, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProduct

router.get('/', findProducts);
// Esta ruta me va a encontrar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProductById

router.get('/:id', validProductById, findProduct);

router.use(protect);

// Esta ruta me va a crear un un producto ,esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama createProduct

router.post(
  '/',
  upload.array('productImgs', 3),
  createProductValidation,
  validateFields,
  restrictTo('admin'),
  createProduct
);

router.patch(
  '/:id',
  updateProductValidation,
  validateFields,
  validProductById,
  restrictTo('admin'),
  updateProduct
);

router.delete('/:id', validProductById, restrictTo('admin'), deleteProduct);

module.exports = {
  productRouter: router,
};
