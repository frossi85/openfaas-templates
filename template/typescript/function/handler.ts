const handler = async (event: any, context: any) => {
  return context
    .status(200)
    .succeed({
      'status': 'Received input: ' + JSON.stringify(event.body)
    })
};

export default handler