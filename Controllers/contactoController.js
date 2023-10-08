const getContacto = async (req, res) => {
  try {
    res.render("../views/contactano");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getContacto };
