import type { NextApiRequest, NextApiResponse } from 'next';
import type httpProxy from 'http-proxy';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { messageLogger } from '@/middleware/log';

// const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

// http://localhost:3000/api/proxy/のリクエストがproxyされる。
// Axios.post(`api/proxy/users` こんな感じ

const handleProxyInit = (proxy: httpProxy) => {
  /**
   * Check the list of bindable events in the `http-proxy` specification.
   * @see https://www.npmjs.com/package/http-proxy#listening-for-proxy-events
   */
  proxy.on('proxyReq', (proxyReq, req, res) => {});
  proxy.on('proxyRes', (proxyRes, req, res) => {});
};

const ProxyServer = async (req: NextApiRequest, res: NextApiResponse) => {
  messageLogger.info({ file: __filename, msg: 'Proxy Server' });
  // どうやって識別するか
  // proxy serverでvalidation

  const target = process.env.BACKEND_API_URL;
  const serializedBackend = req.query; // get時？
  const serializedBody = req.body; // post時？

  return httpProxyMiddleware(req, res, {
    // target: `http://host.docker.internal:8080`, // docker同士であれば
    target,
    pathRewrite: [
      {
        patternStr: '^/api/proxy',
        replaceStr: '',
      },
    ],
    changeOrigin: true,
    onProxyInit: handleProxyInit,
  });
};

export default ProxyServer;
