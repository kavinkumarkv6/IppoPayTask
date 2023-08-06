import PasswordModel from "../modal/password.js";

//Create and save a new password
export const create = async (req, res) => {
  try {
    const password = new PasswordModel(req.body);
    await password
      .save()
      .then((data) => {
        res.send({
          message: "Password stored successfully",
          password: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while storing the User.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while storing the User.",
    });
  }
};
