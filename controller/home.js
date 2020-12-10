class HomeController {
  healthCheck = async (req, res, next) => {
    return res.status(200).json({ status: 0, message: "Alz is well" });
  };
}

module.exports = new HomeController();
