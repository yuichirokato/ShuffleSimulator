import fs from 'fs';
import path from 'path';

let dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
let defaultPath = path.join(dirHome, "Desktop");

class FileWriter {

  writeCSV(array, condition, suffix) {
    console.log("write csv!");
    let csv = this.arrayToCsvString(array);
    let template = this.createSettingsTemplate(condition);
    let output = template + csv;
    fs.writeFileSync(defaultPath + "/result_" + suffix + ".txt", output);
  }

  writeProcess(array, condition, suffix) {
    console.log("writeProcess!");
    let csv = this.arrayToCsvString(array);
    let template = this.createSettingsTemplate(condition);
    let output = csv + template;

    fs.writeFileSync(defaultPath + "/result_" + suffix + ".txt", output);
  }

  writeString(string, suffix) {
    fs.writeFileSync(defaultPath + "/result_" + suffix + ".txt", string);
  }

  arrayToCsvString(array) {
    console.log("arrayToCsvString!");
    console.log("array: " + JSON.stringify(array));
    return array.map(card => this._cardToString(card)).join(",") + '\r\n\n';
  }

  createSettingsTemplate(condtion) {
    let template = "Type: " + condtion.shuffleType + ", " + "Range: " + condtion.fromRange + " ~ " + condtion.toRange + ", " + "Range2: " + condtion.endFromRange + " ~ " + condtion.endToRange + ", " + "Times: " + condtion.shuffleTimes + ", \n\n";
    return template;
  }

  _cardToString(card) {
    switch (card.sute) {
      case 'heart':
        return "1-" + (card.number);

      case 'spade':
        return "2-" + (card.number);

      case 'dia':
        return "3-" + (card.number)

      case 'club':
        return "4-" + (card.number);

      default:
        return "1-" + (card.number);
    }
  }
}

export default new FileWriter();
