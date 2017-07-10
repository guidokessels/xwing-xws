import nodeFetch from 'node-fetch';
import defaultBuilders from './builders';
import XwingXWS from './XwingXWS';

export default new XwingXWS(defaultBuilders, nodeFetch);
