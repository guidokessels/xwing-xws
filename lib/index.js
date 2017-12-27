import integrations from './integrations';
import XwingXWS from './XwingXWS';
import { fetchList } from './ListFetcher';

export default new XwingXWS(integrations, fetchList);
