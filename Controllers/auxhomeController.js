const getAuxiliar = async (req, res) => {
  try {
    res.render("../views/auxiliar/Inicio");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAuxiliar };
