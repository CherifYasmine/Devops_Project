const client = require('prom-client');

const register = new client.Registry();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
    name: 'requests_total',
    help: 'The total number of requests handled by the server',
    labelNames: ['route','status_code']
});

const total_tasks = new client.Gauge({
    name: 'total_tasks',
    help: 'Total number of items in the system',
  });

module.exports = {requestCounter, total_tasks}