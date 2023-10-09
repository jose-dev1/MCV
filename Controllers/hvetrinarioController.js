const getVeterinario = async (req, res) => {
  try {
    res.render("../views/veterinario/Inicio");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getVeterinario };
