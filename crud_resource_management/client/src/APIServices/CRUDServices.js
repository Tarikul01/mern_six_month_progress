import axios from "axios";

export function Create(data) {

  console.log(data)
  let URL = "/api/v1/add-resource";
  return axios
    .post(URL, data)
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
  let URL = "/api/v1/read-resource";
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        console.log("api data",res.data.data)
        return res.data.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
export function ReadById(id) {
  let URL = "/api/v1/read-resource/"+id;
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        console.log("Reddata By user id",res.data.data)
        return res.data.data;
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
  let URL = "/api/v1/update-resource/"+id;

  return axios
    .post(URL,data)
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
  let URL = "/api/v1/delete-resource/" + id;
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
