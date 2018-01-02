import integrations from './integrations';
import XwingListLoader from './XwingListLoader';
import fetchList from './fetch-list';

export default new XwingListLoader(integrations, fetchList);
