import { Transform } from "node:stream";

type OpenfoodfactsData = {
  code: string;
  countries_en: string;
};

export default class OpenfoodfactsDataTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: OpenfoodfactsData, encoding: string, callback: () => void) {
    const { code, countries_en } = chunk;

    if (code && countries_en) {
      this.push({
        "Barcode (EAN 13)": code,
        Country: countries_en,
      });
    }

    callback();
  }
}
