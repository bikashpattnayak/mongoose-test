class HomeController {
  healthCheck = async (req, res, next) => {
    return res.status(200).json("Alz is well");
  };
}

module.exports = new HomeController();
