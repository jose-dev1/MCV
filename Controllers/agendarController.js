const getAgendar = async (req, res) => {
  try {
    res.render("../views/cliente/agendarCita");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAgendar };
