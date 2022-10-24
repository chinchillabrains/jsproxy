import fetch from 'node-fetch';
import pkg from 'https-proxy-agent';
const {HttpsProxyAgent} = pkg;

const versionEndpoint = 'http://localhost:5000';
const cookie = 'hjysaukdaskuncakjsdnkas';
const proxyAgent = new HttpsProxyAgent("http://localhost:3000");


function getLatestVersion() {
    return new Promise(async (resolve) => {
      const versionsRes = await fetch(versionEndpoint, {
        agent: proxyAgent,
        headers: {
          Cookie: cookie
        },
      });
   
      if (!versionsRes.ok)
        throw new Error(`Unexpected response: ${versionsRes.statusText}`);
   
      const versions = await versionsRes.json();
      console.log("VERSIONS: ", inspect(versions, { depth: null }));
      const latest = versions.data[0].VersionNumber.toString();
      console.log(`LATEST VERSION: ${latest}`);
      resolve(latest);
    });
}


(async () => {
    try {
      const latest = await getLatestVersion();
    } catch (err) {
      throw new Error(err.message);
    }
  })();
