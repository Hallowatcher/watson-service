
import axios from 'axios';
import * as moment from 'moment';
import * as ini from 'ini';
import * as fs from 'fs';
import * as glob from 'glob';
import * as getmac from 'getmac';
import { WatsonReport } from './WatsonReport';

export default class WatsonHelper {

  /**
   * Converts a WER tick to a JavaScript
   * date with the help of MomentJS
   * @param {number} ticks - The tick as an int.
   * @returns {moment} The tick as a MomentJS Date.
   */
  werTickToDate(ticks): moment.Moment {

    // Converts nanoseconds to microseconds
    let microtime = ticks / 10000;

    // Gets the milliseconds between year 1 and 1600
    const epochMicrotime = Math.abs(moment('01-01-1601', 'MM-DD-YYYY').unix() * 1000);

    // Subtracts
    let tickDate = moment(microtime - epochMicrotime);

    // Adjusts time to timezone
    tickDate.add(tickDate.utcOffset(), 'minutes');

    return tickDate;
  }

  /**
 * Gathers all .wer logs at the given
 * path and maps them to an array
 * @param {string} logPath - The path to the folder of logs.
 * @return {Promise} The reports.
 */
  gatherLogsAt(logPath: string): Promise<WatsonReport[]> {

    return new Promise((resolve, reject) => {

      if (logPath === undefined || logPath === null)
        return reject('Invalid argument!');

      // Gets the PCs MAC asynchronously
      getmac.getMac((err, mac) => {
        if (err) return reject(err);

        // Gets all the .wer reports in the specified logPath
        glob(logPath + "/**/*.wer", (err, files) => {
          if (err) return reject(err);
          
          // Folder contains no logs, exit
          if (files.length === 0)
            return reject('No logs found at "' + logPath + '"!');

          let result = [];
          files.forEach(file => {
            try {

              // Read WER file
              let werFile = ini.parse(fs.readFileSync(file, 'ucs-2')) as any;
              
              // Convert tick to date
              let tickDate = this.werTickToDate(werFile.EventTime)

              // Adjusts time to timezone
              tickDate.add(tickDate.utcOffset(), 'minutes');

              // Map properties
              let mappedFile = <WatsonReport>{
                name: werFile.AppName,
                path: werFile.AppPath,
                date: tickDate.toDate(),
                type: parseInt(werFile.ReportType) || 0,
                mac: mac
              }

              // Push to result array
              result.push(mappedFile);
            } catch (e) {
              return reject(e);
            }
          });

          return resolve(result);
        });
      });
    });
  }
}