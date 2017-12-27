import nodeFetch from 'node-fetch';

import integrations from './integrations';
import XwingXWS from './XwingXWS';
import ListFetcher from './ListFetcher';

const fetcher = new ListFetcher(nodeFetch);
export default new XwingXWS(integrations, fetcher);
