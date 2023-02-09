import axios from "axios";

export function Create(data) {
  const bodyData = {
    ProductName: data.productName,
    ProductCode: data.productCode,
    Img: data.productImg,
    UnitPrice: data.productPrice,
    Qty: data.productQty,
    TotalPrice: data.totalPrice,
  };
  console.log(bodyData)
  let URL = "/api/v1/CreateProduct";
  return axios
    .post(URL, bodyData)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Read() {
  let URL = "/api/v1/ReadProduct";
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Update(data,id) {
  let URL = "/api/v1/UpdateProduct/" + id;
  const bodyData = {
    ProductName: data.productName,
    ProductCode: data.productCode,
    Img: data.productImg,
    UnitPrice: data.productPrice,
    Qty: data.productQty,
    TotalPrice: data.totalPrice,
  };

  return axios
    .post(URL,bodyData)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Delete(id) {
  let URL = "/api/v1/DeleteProduct/" + id;
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
