const getRegistro = async (req, res) => {
  try {
    res.render("../views/registro");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRegistro };
