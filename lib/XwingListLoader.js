export default class XwingListLoader {
  constructor(integrations, fetch) {
    if (!Array.isArray(integrations) || !integrations.length) {
      throw new Error('Requires at least 1 XWS integration to be configured.');
    }
    if (typeof fetch !== 'function') {
      throw new Error('Requires a fetch() method.');
    }

    this._fetch = fetch;
    this._integrations = integrations;
  }
  async fromUrl(input) {
    const integration = this._integrations.find(integration => integration.matches(input));

    if (!integration) {
      return false;
    }

    const xwsUrl = integration.getXWSUrl(input);

    try {
      return await this._fetch(xwsUrl);
    } catch (err) {
      throw new Error('There was an error fetching the list. ' + err);
    }
  }
}
