// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAtpzF4oPDDr-iLqhgKGlPIQrPh6-Fd3gw",
    authDomain: "notas-enfermeria.firebaseapp.com",
    projectId: "notas-enfermeria",
    storageBucket: "notas-enfermeria.appspot.com",
    messagingSenderId: "463820056151",
    appId: "1:463820056151:web:2c61298c3550f0b890e512",
    measurementId: "G-S5S9W693E4"
  }
  
};
// Initialize Firebase
// Initialize Firebase



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
