// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'https://api.realtimestockanalysis.com';
export const environment = {
  production: true,
  backendpoints: {
    getUser: BASE_URL + '/user',
    login: BASE_URL + '/createSession',
    register: BASE_URL + '/createUser',
    updatePass: BASE_URL + '/updatePass',
    deleteUser: BASE_URL + '/deleteUser',
    activateUser: BASE_URL + '/activateUser',
    updateRole: BASE_URL + '/updateRole',
    sendMessage: BASE_URL + '/sendMessage',
    getMessages: BASE_URL + '/getMessages',
    deleteMessage: BASE_URL + '/deleteMessage',
    getStockInfo: BASE_URL + '/stockInfo',
    getStockHistory: BASE_URL + '/stockHistory',

  },
  baseurl: 'https://api.realtimestockanalysis.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
