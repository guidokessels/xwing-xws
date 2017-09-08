export default class XwingXWS {
  constructor(integrations, fetch) {
    if (!Array.isArray(integrations) || !integrations.length) {
      throw new Error('Requires at least 1 XWS integration to be configured.');
    }
    if (typeof fetch !== 'function') {
      throw new Error('Requires a fetch() method to be defined.');
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
      const response = await this._fetch(xwsUrl);

      if (!response.ok) {
        return false;
      }

      const list = await response.json();

      if (!Array.isArray(list.pilots) || typeof list.faction !== 'string') {
        return false;
      }

      return list;
    } catch (err) {
      throw new Error('There was an error fetching the list. ' + err);
    }
  }
}
