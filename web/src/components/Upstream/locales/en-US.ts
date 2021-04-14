export default {
  'component.upstream.fields.tls.client_key': 'Client Key',
  'component.upstream.fields.tls.client_cert': 'Client Cert',

  'component.upstream.fields.checks.active.type': 'Type',
  'component.upstream.fields.checks.active.type.tooltip': 'Whether to perform active health checks using HTTP or HTTPS, or just attempt a TCP connection.',

  'component.upstream.fields.checks.active.concurrency': 'Concurrency',
  'component.upstream.fields.checks.active.concurrency.tooltip': 'Number of targets to check concurrently in active health checks.',

  'component.upstream.fields.checks.active.host': 'Host',
  'component.upstream.fields.checks.active.host.required': 'Please enter the hostname',
  'component.upstream.fields.checks.active.host.tooltip': 'The hostname of the HTTP request used to perform the active health check',
  'component.upstream.fields.checks.active.host.scope': 'Only letters, numbers and . are supported',

  'component.upstream.fields.checks.active.port': 'Port',
  'component.upstream.fields.checks.active.port.required': 'Please enter the port',

  'component.upstream.fields.checks.active.http_path': 'HTTP Path',
  'component.upstream.fields.checks.active.http_path.tooltip': 'The path that should be used when issuing the HTTP GET request to the target. The default value is /.',

  'component.upstream.fields.checks.active.https_verify_certificate': 'Verify HTTPs Certificate',
  'component.upstream.fields.checks.active.https_verify_certificate.tooltip': 'Whether to check the validity of the SSL certificate of the remote host when performing active health checks using HTTPS.',

  'component.upstream.fields.checks.active.healthy.interval': 'Interval',
  'component.upstream.fields.checks.active.healthy.interval.tooltip': 'Interval between checks for healthy targets (in seconds)',

  'component.upstream.fields.checks.active.healthy.successes': 'Successes',
  'component.upstream.fields.checks.active.healthy.successes.tooltip': 'Number of successes to consider a target healthy',
  'component.upstream.fields.checks.active.healthy.successes.required': 'Please enter successes number',

  'component.upstream.fields.checks.active.healthy.http_statuses': 'HTTP Statuses',
  'component.upstream.fields.checks.active.healthy.http_statuses.tooltip': 'An array of HTTP statuses to consider a success, indicating healthiness, when returned by a probe in active health checks.',

  'component.upstream.fields.checks.active.unhealthy.timeouts': 'Timeouts',
  'component.upstream.fields.checks.active.unhealthy.timeouts.tooltip': 'Number of timeouts in active probes to consider a target unhealthy.',

  'component.upstream.fields.checks.active.unhealthy.http_failures': 'HTTP Failures',
  'component.upstream.fields.checks.active.unhealthy.http_failures.tooltip': 'Number of HTTP failures to consider a target unhealthy',
  'component.upstream.fields.checks.active.unhealthy.http_failures.required': 'Please enter the HTTP failures',

  'component.upstream.fields.checks.active.unhealthy.interval': 'Interval',
  'component.upstream.fields.checks.active.unhealthy.interval.tooltip': 'Interval between active health checks for unhealthy targets (in seconds). A value of zero indicates that active probes for healthy targets should not be performed.',
  'component.upstream.fields.checks.active.unhealthy.required': 'Please enter the unhelthy interval',
}