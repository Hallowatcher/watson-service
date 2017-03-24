

import * as fs from 'fs';
import * as path from 'path';

import WatsonHelper from './WatsonHelper';
import WatsonApi from './WatsonApi';
import { WatsonReport } from './WatsonReport';

export default class WatsonService {

  constructor(public apiUrl: string, public reportsPath: string) {}

  main(): Promise<any> {
    return new Promise((resolve, reject) => {
      let myApi = new WatsonApi(this.apiUrl);
      let myService = new WatsonHelper();

      console.log('Trying to gather all .wer reports at ' + this.reportsPath)
      myService.gatherLogsAt(this.reportsPath).then(logs => {
        console.log('Found ' + logs.length + ' reports')
        console.log('Attempting to POST logs to ' + this.apiUrl)
        myApi.postReports(logs).then(result => {
          console.log('OK from server received')
          console.log('Attempting to delete all .wer files at '+this.reportsPath+' (placeholder)')
          console.log('OK')
          resolve();
        })
        .catch(err => {
          if (err.code && err.code === 'ECONNREFUSED')
            reject('Connection refused at ' + err.address)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  }

}