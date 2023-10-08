const getHome = async (req, res) => {
  try {
    const user = [{ nombre: "jose" }];
    res.render("../views/home", { user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHome };
