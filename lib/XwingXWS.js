export default class XwingXWS {
  constructor(integrations, fetcher) {
    if (!Array.isArray(integrations) || !integrations.length) {
      throw new Error('Requires at least 1 XWS integration to be configured.');
    }
    if (!fetcher || typeof fetcher.fetch !== 'function') {
      throw new Error('Requires a fetch() method.');
    }

    this._fetcher = fetcher;
    this._integrations = integrations;
  }
  async fromUrl(input) {
    const integration = this._integrations.find(integration => integration.matches(input));

    if (!integration) {
      return false;
    }

    const xwsUrl = integration.getXWSUrl(input);

    try {
      return await this._fetcher.fetch(xwsUrl);
    } catch (err) {
      throw new Error('There was an error fetching the list. ' + err);
    }
  }
}
