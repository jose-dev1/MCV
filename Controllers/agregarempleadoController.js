const getAgegarempleado = async (req, res) => {
  try {
    res.render("../views/Adiministrador/agregarEmpleado");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAgegarempleado };
