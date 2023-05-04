class Home {
  async index(req, res) {
    res.send("Success");
  }
}

export default new Home();