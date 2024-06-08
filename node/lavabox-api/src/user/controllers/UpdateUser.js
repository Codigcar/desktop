import GetUsers from "../../helpers/getters/GetUsers";
import culqi from "../../configs/culqi";
import { SaveLogInternalError } from "logError/controllers/CreateLogInternalError";
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const UpdateUser = async (req, res, next) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      buildingId,
      password,
      create_customer,
    } = req.body;
    console.log(name, address, phone, email, buildingId, password);
    if (!req.params.userId)
      return res
        .status(400)
        .send({ type: "missing-userrId", msg: "You need to provide a userId" });
    const user = await GetUsers({ _id: req.params.userId }, "id");
    //console.log(user);
    if (name) {
      user.local.name = name;
    }
    if (address) {
      user.local.address = address;
    }
    if (phone) {
      user.local.phone = phone;
    }
    if (email) {
      user.local.email = email;
    }
    if (buildingId) {
      user.local.buildingId = buildingId;
    }
    if (password) {
      let hashedPassword = await bcrypt.hashSync(password, 8);
      //console.log(hashedPassword);
      user.local.password = hashedPassword;
    }
    if (create_customer && !user.local.customer_id) {
      const culqi_customer = {
        first_name: user.local.firstName,
        last_name: user.local.lastName,
        email: user.local.email,
        address: "Direccion " + user.local.address,
        address_city: "Lima",
        country_code: "PE",
        phone_number: user.local.phone,
      };
      const findCustomer = await FindCustomer(user.local.email);
      if (!findCustomer) {
        const customer = await CreateCustomer(culqi_customer);
        if (customer) {
          user.local.customer_id = customer.id;
        }
      } else if (findCustomer) {
        user.local.customer_id = findCustomer.id;
      }
    }
    let userUpdated = await user.save();
    res.status(200).send({ oldInfo: user, newInfo: userUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

async function FindCustomer(email) {
  try {
    let url = "https://api.culqi.com/v2/customers?email=" + email;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "*",
        Authorization: "Bearer " + culqi.private_key,
      },
      redirect: "follow",
    });

    const responseJson = await response.json();
    if (response.status === 200 || response.status === 201) {
      if (responseJson.data.length > 0) {
        return responseJson.data[0];
      } else {
        await SaveLogInternalError({
          file: "UpdateUser.js",
          functionName: "FindCustomer",
          type: "culqi",
          info: responseJson,
          status: response.status,
        });
        return false;
      }
    } else {
      await SaveLogInternalError({
        file: "UpdateUser.js",
        functionName: "FindCustomer",
        type: "culqi",
        info: responseJson,
        status: response.status,
      });
      return false;
    }
  } catch (error) {
    await SaveLogInternalError({
      file: "UpdateUser.js",
      functionName: "FindCustomer",
      type: "fetch-culqi",
      info: error,
    });
    return false;
  }
}

async function CreateCustomer(customer_data) {
  try {
    var data = JSON.stringify(customer_data);
    let url = "https://api.culqi.com/v2/customers";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "*",
        Authorization: "Bearer " + culqi.private_key,
      },
      body: data,
    });

    const responseJson = await response.json();
    if (response.status === 200 || response.status === 201) {
      return responseJson;
    } else {
      await SaveLogInternalError({
        file: "UpdateUser.js",
        functionName: "CreateCustomer",
        type: "culqi",
        info: responseJson,
        status: response.status,
      });
      return false;
    }
  } catch (error) {
    await SaveLogInternalError({
      file: "UpdateUser.js",
      functionName: "CreateCustomer",
      type: "fetch-culqi",
      info: responseJson,
    });
    return false;
  }
}

export default UpdateUser;
