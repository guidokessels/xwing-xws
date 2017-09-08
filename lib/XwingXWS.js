export default class XwingXWS {
  constructor(integrations, fetch) {
    this._fetch = fetch;
    this._integrations = integrations;
  }
  async fromUrl(input) {
    const integration = this._integrations.find(integration => integration.matches(input));

    if (!integration) {
      throw new Error('URL does not point to a known XWS integration.');
    }

    try {
      const xwsUrl = integration.getXWSUrl(input);
      const response = await this._fetch(xwsUrl);
      return await response.json();
    } catch (err) {
      throw new Error('There was an error fetching the list: ' + err);
    }
  }
}
