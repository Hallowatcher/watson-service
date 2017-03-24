
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as nock from 'nock'
import WatsonService from '../src/WatsonService';

describe('WatsonService', function () {
  let watsonService: WatsonService;
  let serviceName = 'watson';
  let apiUrl = 'http://localhost:9999';
  let endPoint = 'http://localhost:9999/report';
  let reportsPath = './test'

  beforeEach(function () {
    watsonService = new WatsonService(endPoint, reportsPath);
  })

  it('INTEGRATION TEST: should run all functions', function () {
    let scope = nock(apiUrl)
      .post('/report')
      .reply(201);

    return watsonService.main()
  })
})