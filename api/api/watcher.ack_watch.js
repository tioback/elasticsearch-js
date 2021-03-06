/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildWatcherAckWatch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [

  ]

  const snakeCase = {

  }

  /**
   * Perform a watcher.ack_watch request
   * Acknowledges a watch, manually throttling the execution of the watch's actions.
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-ack-watch.html
   */
  return function watcherAckWatch (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // check required parameters
    if (params['watch_id'] == null && params['watchId'] == null) {
      const err = new ConfigurationError('Missing required parameter: watch_id or watchId')
      return handleError(err, callback)
    }

    // check required url components
    if ((params['action_id'] != null || params['actionId'] != null) && ((params['watch_id'] == null && params['watchId'] == null))) {
      const err = new ConfigurationError('Missing required parameter of the url: watch_id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, watchId, watch_id, actionId, action_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((watch_id || watchId) != null && (action_id || actionId) != null) {
      if (method == null) method = 'PUT'
      path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_ack' + '/' + encodeURIComponent(action_id || actionId)
    } else {
      if (method == null) method = 'PUT'
      path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_ack'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildWatcherAckWatch
