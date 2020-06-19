import { Integration } from './Integration';

class FFG implements Integration {
  private regexp = /^(?:https?:\/\/)?squadbuilder\.fantasyflightgames\.com\/(?:saved-squads|squad-preview)\/([a-zA-Z0-9-]+)/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const matches = this.regexp.exec(input);
    const id = matches![1];
    return `https://squad2xws.herokuapp.com/translate/${id}`;
  }
}

export default FFG;
