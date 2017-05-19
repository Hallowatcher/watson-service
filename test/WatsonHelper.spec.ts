
import * as chai from 'chai'
import * as WatsonHelperFile from '../src/WatsonHelper'

const WatsonHelper = WatsonHelperFile.default;

describe('WatsonHelper', function () {

  this.timeout(10000);

  describe('.werTickToDate', function () {
    it('should create a helper object', function () {
      chai.assert.isNotNull(new WatsonHelper())
    })

    it('should convert to the correct date', function () {

      let helper = new WatsonHelper()

      // This tick was taken from a .WER file
      let ticks = 131241140334094972
      let date = helper.werTickToDate(ticks)

      chai.assert.equal(date.year(), 2016)
    })

    it('should be in "en" locale', function () {

      let helper = new WatsonHelper()

      // This tick was taken from a .WER file
      let ticks = 131241140334094972
      let date = helper.werTickToDate(ticks)

      chai.expect(date.locale()).to.equal('en');
    })

    it('should return year 1601 as default', function () {

      let helper = new WatsonHelper()

      // This tick was taken from a .WER file
      let ticks = 0
      let date = helper.werTickToDate(ticks)

      chai.assert.equal(date.year(), 1601)
    })
  })

  describe('.gatherLogsAt', function () {
    it('should gather and return the right reports', function () {

      let helper = new WatsonHelper()
      return helper.gatherLogsAt('./test').then(function (val) {
        chai.assert.lengthOf(val, 1, 'must only have 1 file')
        chai.assert.equal(val[0].name, 'UnitTestApp', 'must have right name')
        chai.assert.equal(val[0].path, 'C:\\', 'must have right path')
        chai.assert.equal(val[0].type, 2, 'must have right type')
      })
    })

    it('should not resolve because src has no reports', function () {

      let helper = new WatsonHelper()
      return helper.gatherLogsAt('./src').catch(function (err) {
        chai.assert.equal(err, 'No logs found at "./src"!', 'must be the correct error message')
      })

    })

    it('should not resolve because arg0 is null', function () {

      let helper = new WatsonHelper()
      return helper.gatherLogsAt(null).catch(function (err) {
        chai.assert.equal(err, 'Invalid argument!')
      })

    })
  })


})