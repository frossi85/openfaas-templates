import responseFormatter from "./responseFormatter";

const handler = async (event: any, context: any) => {
  return context
    .status(200)
    .succeed(responseFormatter(event.body))
};

export default handler;
