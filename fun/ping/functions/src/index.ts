import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const dontSleepHeroku = functions.pubsub
  .schedule("every 20 minutes")
  .onRun(async (context) => {
    try {
      await axios.get("https://hit-point.herokuapp.com/ping");
      // console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
    return 0;
  });
