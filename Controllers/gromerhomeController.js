const getGromer = async (req, res) => {
  try {
    res.render("../views/groomer/Iniciogro");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getGromer };
