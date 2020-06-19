import integrations from './integrations';
import XwingListLoader from './XwingListLoader';
import fetchList from './fetch-list';

const loader = new XwingListLoader(integrations, fetchList);
export default loader;
