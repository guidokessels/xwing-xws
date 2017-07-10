export default class XwingXWS {
  constructor(builders, fetch) {
    this._fetch = fetch;
    this._builders = builders;
  }
  async fromUrl(input) {
    const builder = this._builders.find(builder => builder.matches(input));

    if (!builder) {
      throw new Error('URL does not point to a known builder.');
    }

    try {
      const xwsUrl = builder.getXWSUrl(input);
      const response = await this._fetch(xwsUrl);
      return await response.json();
    } catch (err) {
      throw new Error('There was an error fetching the list: ' + err);
    }
  }
}
