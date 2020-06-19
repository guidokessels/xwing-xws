import { XWSSquadron } from './XWS';
import { Integration } from './integrations/Integration';

type Fetch = (url: string) => Promise<XWSSquadron | false>;

export default class XwingListLoader {
  constructor(private integrations: Array<Integration>, private fetch: Fetch) {
    if (!Array.isArray(integrations) || !integrations.length) {
      throw new Error('Requires at least 1 XWS integration to be configured.');
    }
    if (typeof fetch !== 'function') {
      throw new Error('Requires a fetch() method.');
    }
  }
  async load(url: string): Promise<XWSSquadron | false> {
    const integration = this.integrations.find((integration) => integration.matches(url));

    if (!integration) {
      return false;
    }

    const xwsUrl = integration.getXWSUrl(url);

    try {
      return await this.fetch(xwsUrl);
    } catch (err) {
      throw new Error('There was an error fetching the list. ' + err);
    }
  }
}
