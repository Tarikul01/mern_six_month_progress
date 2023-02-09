const ResourceModel = require("../models/ResourceModel")

// Create
exports.CreateResource = (req, res) => {
  let reqBody = req.body;
  ResourceModel.create(reqBody, (err, data) => {
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

exports.ReadResource = (req, res) => {
  ResourceModel.find((err, data) => {
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
exports.UpdateResource = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  let reqBody = req.body;
  ResourceModel.updateOne(Query, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

//Delete Product
exports.DeleteResource = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  ResourceModel.remove(Query, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};


//Delete Product
exports.ReadResourceById = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  ResourceModel.findOne(Query, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
