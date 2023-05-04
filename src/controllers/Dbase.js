import Dbase from "../models/Dbase";

class dBaseController {
  async index(req, res) {
    const result = await Dbase.showAll();
    res.send(result);
  }
    
  async search(req, res) {
    const name = req.params.id;
    const result = await Dbase.showSome(name);
    res.send(result);
  }
    
  async edit(req, res) {
    const { Platform, email, password } = req.body;
    const name = req.params.id;
    const result = await Dbase.edit(name, { Platform, email, password });
    res.send(result);
  }
    
  async insert(req, res) {
    const { Platform, email, password } = req.body;
    const result = await Dbase.insert({ Platform, email, password });
    res.send(result);
  }
    
  async delete(req, res) {
    const name = req.params.id;
    const result = await Dbase.delete(name);
    res.send(result);
  }
}

export default new dBaseController();
