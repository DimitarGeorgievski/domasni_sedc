import fs from "fs/promises";

export default class DataHelper {
  static async readData(path) {
    const data = await fs.readFile(path, { encoding: "utf-8" });
    return JSON.parse(data);
  }
  static async writeData(path, data = []) {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }
}
