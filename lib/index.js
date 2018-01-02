import integrations from './integrations';
import XwingXWS from './XwingXWS';
import fetchList from './fetch-list';

export default new XwingXWS(integrations, fetchList);
