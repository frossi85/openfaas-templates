
interface ContextData {
  status?: number;
  succeed?: any;
  fail?: any;
}

export default class Context {
  private data: ContextData

  constructor() {
    this.data = {};
  }

  status(code) {
    this.data.status = code;
    return this;
  }

  succeed(data) {
    this.data.succeed = data;
    return this;
  }

  fail(data) {
    this.data.fail = data;
    return this;
  }

  getData() {
    return this.data;
  }
};
