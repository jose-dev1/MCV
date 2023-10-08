const getLogin = async (req, res) => {
  try {
    res.render("../views/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getLogin };
