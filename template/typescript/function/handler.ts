const handler = async (event: any, context: any) => {
  const res = await Promise.resolve({res: 2, a: 1})

  return context
    .status(200)
    .succeed(res)
};

export default handler
