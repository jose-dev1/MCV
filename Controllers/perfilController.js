const getPerfil = async (req, res) => {
  try {
    res.render("../views/cliente/perfilUsuario");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPerfil };
