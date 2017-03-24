
import * as path from 'path';
import * as fs from 'fs';
import WatsonService from './WatsonService';

const opts = {
  api: 'http://localhost:1337/report',
  reportsPath: path.resolve(process.env.APPDATA + '/../Local/Microsoft/Windows/WER/ReportArchive'),
  logPath: path.resolve(process.env.APPDATA + '/WatsonServiceNode')
}

run(opts);

export function run(options) {
  console.log('Starting service with opts ' + JSON.stringify(options))
  const watsonService = new WatsonService(options.api, options.reportsPath);
  watsonService.main().then(() => {
    console.log('Complete!')
  })
  .catch(err => {
    console.error(err)
  })
}