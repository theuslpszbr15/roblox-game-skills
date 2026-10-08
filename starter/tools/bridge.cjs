// Local-only bridge between the Studio plugin and the test CLI.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = 38741;
const queue = { edit: [], server: [], client: [] };
const results = new Map();
const logs = [];
const seen = {};
let serial = 0;

function body(req) {
  return new Promise(resolve => { let data = ''; req.on('data', c => { data += c; }); req.on('end', () => resolve(data)); });
}
function reply(res, value) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); }

function serve() {
  http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const ctx = url.searchParams.get('ctx') || 'edit';
    const text = await body(req);
    if (url.pathname === '/poll') {
      seen[ctx] = Date.now();
      try { for (const [kind, message] of JSON.parse(text || '[]')) logs.push({ n: logs.length, ctx, kind, message, at: Date.now() }); } catch {}
      return reply(res, (queue[ctx] || []).shift() || {});
    }
    if (url.pathname === '/result') { const value = JSON.parse(text); results.set(value.id, value); return reply(res, {}); }
    if (url.pathname === '/enqueue') {
      const id = ++serial;
      (queue[ctx] = queue[ctx] || []).push({ id, code: text });
      return reply(res, { id });
    }
    if (url.pathname === '/result-of') return reply(res, results.get(Number(url.searchParams.get('id'))) || {});
    if (url.pathname === '/logs') { const since = Number(url.searchParams.get('since') || 0); return reply(res, logs.filter(l => l.n >= since)); }
    if (url.pathname === '/status') return reply(res, { seen, now: Date.now(), logs: logs.length });
    res.writeHead(404); res.end();
  }).listen(PORT, '127.0.0.1', () => console.log(`bridge on ${PORT}`));
}

async function call(pathname, payload = '') {
  const res = await fetch(`http://127.0.0.1:${PORT}${pathname}`, { method: 'POST', body: payload });
  return res.json();
}

async function run(ctx, code, timeout = 30000) {
  const start = (await call('/status')).logs;
  const { id } = await call(`/enqueue?ctx=${ctx}`, code);
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    const result = await call(`/result-of?id=${id}`);
    if (result.id) {
      await new Promise(r => setTimeout(r, 400));
      return { result, logs: await call(`/logs?since=${start}`) };
    }
    await new Promise(r => setTimeout(r, 200));
  }
  return { result: { ok: false, value: `timeout: no ${ctx} plugin answered` }, logs: await call(`/logs?since=${start}`) };
}

if (require.main === module) {
  const [mode, ctx, arg, wait] = process.argv.slice(2);
  if (mode === 'serve') serve();
  else if (mode === 'status') call('/status').then(s => console.log(JSON.stringify(s)));
  else if (mode === 'logs') call(`/logs?since=${ctx || 0}`).then(l => l.forEach(e => console.log(`#${e.n} [${e.ctx}/${e.kind}] ${e.message}`)));
  else if (mode === 'run') {
    const code = fs.existsSync(arg) ? fs.readFileSync(path.resolve(arg), 'utf8') : arg;
    run(ctx, code, Number(wait || 30000)).then(({ result, logs: entries }) => {
      entries.forEach(e => console.log(`[${e.ctx}/${e.kind}] ${e.message}`));
      console.log(`RESULT ${result.ok ? 'OK' : 'FAIL'}: ${result.value}`);
      process.exitCode = result.ok ? 0 : 1;
    });
  }
}
