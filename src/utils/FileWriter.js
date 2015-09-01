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
    let csv = this.arrayToCsvString(array);
    let template = this.createSettingsTemplate(condition);
    let output = csv + template;

    fs.writeFileSync(defaultPath + "/result_" + suffix + ".txt", output);
  }

  writeString(string, suffix) {
    fs.writeFileSync(defaultPath + "/result_" + suffix + ".txt", string);
  }

  arrayToCsvString(array) {
    return array.map(card => this._cardToString(card)).join(",") + '\r\n\n';
  }

  createSettingsTemplate(condtion) {
    let template = "Type: " + condtion.shuffleType + ", " + "Range: " + condtion.fromRange + " ~ " + condtion.toRange + ", " + "Range2: " + condtion.endFromRange + " ~ " + condtion.endToRange + ", " + "Times: " + condtion.shuffleTimes + ", \n\n";
    return template;
  }

  _cardToString(card) {
    switch (card.sute) {
      case 'heart':
        return "1-" + (card.number + 1);

      case 'spade':
        return "2-" + (card.number + 1);

      case 'dia':
        return "3-" + (card.number + 1)

      case 'club':
        return "4-" + (card.number + 1);

      default:
        return "1-" + (card.number + 1);
    }
  }
}

export default new FileWriter();
