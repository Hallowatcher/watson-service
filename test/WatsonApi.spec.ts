
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as nock from 'nock';
import WatsonApi from '../src/WatsonApi'
import { WatsonReport } from '../src/WatsonReport';

describe('WatsonApi', function () {

  let apiUrl = 'http://localhost:9999'

  it('should create an api', function () {
    let endpoint = apiUrl + '/report'
    let api = new WatsonApi(endpoint);
    chai.expect(api.apiEndPoint).to.equal(endpoint);
  })

  it('should post the reports', function (done) {

    let testData: WatsonReport = {
      name: '',
      path: '',
      type: 0,
      mac: '',
      date: new Date()
    }

    let scope = nock(apiUrl)
      .post('/report')
      .reply(201);

    let endpoint = apiUrl + '/report'
    let api = new WatsonApi(endpoint);
    api.postReports([testData]).then(() => {
      done()
    })
  })

  it('should throw because arg is empty array', function () {

    let scope = nock(apiUrl)
      .post('/report')
      .reply(201);

    let endpoint = apiUrl + '/report'
    let api = new WatsonApi(endpoint);

    chai.expect(api.postReports.bind(api)).to.throw(Error, 'Invalid arguments')
    
  })

  it('should throw because arg is null', function () {

    let scope = nock(apiUrl)
      .post('/report')
      .reply(201);

    let endpoint = apiUrl + '/report'
    let api = new WatsonApi(endpoint);

    chai.expect(api.postReports.bind(api)).to.throw(Error, 'Invalid arguments')
    
    
  })

})