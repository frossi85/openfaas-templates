"use strict";
import result from "./result";

const handler = async (event, context) => {
  //const result = {
  //  'status': 'Received input: ' + JSON.stringify(event.body)
  //};

  return context
    .status(200)
    .succeed(result(event.body))
};


module.exports = handler;
//export default handler;
