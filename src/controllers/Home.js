class Home {
  async index(req, res) {
    try {
      res.status(200).send('Success');
    } catch (err) {
      res.status(404).json(err);
    }
  }
}

module.exports = new Home();
