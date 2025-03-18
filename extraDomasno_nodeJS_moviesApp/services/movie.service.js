import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";
export default class MovieService {
  getAll() {
    return getDb().collection("my-movies").find({}).toArray();
  }

  getById(id) {
    return getDb()
      .collection("my-movies")
      .findOne({ _id: new ObjectId(id) });
  }
  deleteById(id){
    return getDb().collection("my-movies").deleteOne({_id: new ObjectId(id)});
  }
  deleteAll(){
    return getDb().collection("my-movies").deleteMany({});
  }
  updateMovie(id, body) {
    return getDb().collection("my-movies").updateOne({ _id: new ObjectId(id)}, { $set: body });
}
  addMovie(body){
    return getDb().collection("my-movies").insertOne(body);
  }
}
