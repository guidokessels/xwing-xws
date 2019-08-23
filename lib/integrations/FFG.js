class FFG {
  constructor() {
    this.regexp = /^(?:https?:\/\/)?squadbuilder\.fantasyflightgames\.com\/(?:saved-squads|squad-preview)\/([a-zA-Z0-9-]+)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const matches = this.regexp.exec(input);
    const id = matches[1];
    return `http://sb2xws.herokuapp.com/translate/${id}`;
  }
}

export default FFG;
