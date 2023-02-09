const ProductsModel = require("../models/ProductsModel");

// Create
exports.CreateProduct = (req, res) => {
  let reqBody = req.body;
  ProductsModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: data,
      });
    }
  });
};

// Read

exports.ReadProducts = (req, res) => {
  ProductsModel.find((err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: err,
      });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

//Update Product
exports.UpdateProduct = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  let reqBody = req.body;
  ProductsModel.updateOne(Query, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

//Delete Product
exports.DeleteProduct = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  ProductsModel.remove(Query, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
