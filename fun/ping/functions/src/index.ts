import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const doneSleepHeroku = functions.pubsub
  .schedule("every 20 minutes")
  .onRun(async (context) => {
    const res = await axios.get("https://hit-point.herokuapp.com/ping");
    console.log(res);
    return res;
  });
