// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'http://api.realtimestockanalysis.com';
export const environment = {
  production: true,
  backendpoints: {
    login: BASE_URL + '/createSession',
    register: BASE_URL + '/createUser',
    updatePass: BASE_URL + '/updatePass',
    getMessages: BASE_URL + '/getMessages',
    sendMessage: BASE_URL + '/sendMessage',
    upgradeBroker: BASE_URL + '/createBroker'

  },
  baseurl: 'http://api.realtimestockanalysis.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
