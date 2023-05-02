class Home {
  async index(req, res) {
    res.send("Home");
  }
}

export default new Home();