'use strict';

import { webserverUrl as url, XMLHttpRequestPort as port } from './webServerConfig';

export default parent => {
  const qry = `http://${url}:${port}/`;
  const cb = parent.cb;   // callback for each command
  const req = parent.req; // Command to execute
  const payload = parent.payload; // optional content of command

  const xhr = new XMLHttpRequest();
  xhr.ontimeout = e => cb(true, null);

  const jParser = str => {
    let jObj = null;
    try {
      jObj = JSON.parse(str);
    } catch {
      console.log("json not valid!");
    }
    return jObj;
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const resTx = xhr.responseText;
        if (resTx !== undefined) {
          return cb(false, jParser(resTx));
        }
        cb(true, resTx);
      }
      else {
        console.log("xhr resolves error code: " + xhr.status);
      }
    }
  };

  let u = qry + req;
  if(req === 'init') {
    xhr.open('GET', encodeURI(u), true);
    xhr.timeout = 2000;
    xhr.send();
  } else if(req === 'addone') {
    xhr.open('POST', encodeURI(u), true);
    xhr.timeout = 2000;
    xhr.send(JSON.stringify(payload));
  }
};