
import axios from 'axios';
import { WatsonReport } from './WatsonReport';

/**
 * A client that is able to communicate
 * to the Watson API.
 * @export
 * @class WatsonApi
 */
export default class WatsonApi {

  /**
   * Creates an instance of WatsonApi.
   * @param {string} apiEndPoint - The Watson API endpoint.
   * 
   * @memberOf WatsonApi
   */
  constructor(public apiEndPoint: string) {}

  /**
   * Posts a list of reports
   * to the Watson API.
   * @param {WatsonReport[]} reports - The reports to post.
   * @returns {Promise<any>} - The request as a Promise.
   * 
   * @memberOf WatsonApi
   */
  postReports(reports: any[]): Promise<any> {
    if (reports === undefined || reports === null || reports.length === 0)
      throw new Error('Invalid arguments!')
    
    return axios.post(this.apiEndPoint, reports) as Promise<any>;
  }

}