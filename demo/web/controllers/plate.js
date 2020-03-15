const Plate = require('../models/plate');

exports.getIndex = (req, res, next) => {
  Plate.fetchAll(plates => {
    res.render('plate/index', {
      prods: plates,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

// ======= plate  ========== 
exports.getPlate = (req, res, next) => {
  const plateid = parseInt(req.params.plateid, 10);
  // console.log(plateid)
  Plate.fetch(plate => {
    res.render('plate/plate', {
      prods: plate,
      pageTitle: 'plate',
      path: '/'
    });
  });
};

exports.getEditPlate = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const plateid = req.params.plateid;
  console.log(plateid)
  Plate.findById(plateid, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('plate/plate', {
      pageTitle: 'Edit Plate',
      path: '/plate/edit/',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditPlate = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPlateNum = req.body.plateNum;
  const updatedCheckPlate = req.body.checkPlate;
  const updatedCheckVehicle = req.body.checkVehicle;
  console.log(req.body)
  console.log(prodId)
  console.log(updatedImageUrl)
  console.log(updatedPlateNum)
  console.log(updatedCheckPlate)
  console.log(updatedCheckVehicle)
  const updatedProduct = new Plate(
    prodId,
    updatedImageUrl,
    updatedPlateNum,
    updatedCheckPlate,
    updatedCheckVehicle
  );
  updatedProduct.save();
  res.redirect('/');
};
