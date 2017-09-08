import nodeFetch from 'node-fetch';
import integrations from './integrations';
import XwingXWS from './XwingXWS';

export default new XwingXWS(integrations, nodeFetch);
