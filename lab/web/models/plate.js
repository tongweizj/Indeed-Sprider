const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  // 'products.json'
  'plate.json'
);   // 'products.json'

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent).data);
      // console.log(JSON.parse(fileContent).data)
    }
  });
};

const getPlate = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent).data.id);
      // console.log(JSON.parse(fileContent).data)
    }
  });
};

let getJson = function(tmpArr) {
  let backData = {}
  // console.log(tmpArr)
  backData.data = tmpArr
  backData.total = tmpArr.length
  backData.todo = tmpArr.length
  return backData
}

module.exports = class Product {
  constructor(id, imageUrl, plateNum, checkPlate, checkVehicle) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.plateNum = plateNum;
    this.checkPlate = checkPlate;
    this.checkVehicle = checkVehicle;
  }

  save() {
    console.log('product.save')
    console.log(this.id)
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === parseInt(this.id)
        );
        let updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        // console.log(updatedProducts)
        updatedProducts = getJson(updatedProducts)
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static fetch(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === parseInt(id, 10));
      cb(product);
    });
  }
};
