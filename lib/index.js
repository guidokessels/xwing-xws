import integrations from './integrations';
import XwingListLoader from './XwingListLoader';
import fetchList from './fetch-list';

module.exports = new XwingListLoader(integrations, fetchList);
