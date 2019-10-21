'use strict';

import { webserverUrl as url, XMLHttpRequestPort as port } from './webServerConfig';

export default parent => {
  const qry = `http://${url}:${port}/`;
};