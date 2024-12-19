import { Transform } from "node:stream";

type NudgerData = {
  code: string; // "3260014791012",
  brand: string; // "ALSATEK",
  model: string; // "TL33171",
  name: string; // "alsatek lg g3 coque protection aluminium rouge bumper tl33171",
  last_updated: string; // "1562430134146",
  gs1_country: string; // "FR",
  offers_count: string; // "0",
  min_price: string; // "",
  min_price_compensation: string; // "",
  currency: string; // "",
  categories: string; // "ACCESSOIRES>COQUE SMARTPHONE",
  url: string; // ""
};

export default class NudgerDataTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: NudgerData, encoding: string, callback: () => void) {
    const { code, gs1_country } = chunk;

    if (code && gs1_country) {
      this.push({
        "Barcode (EAN 13)": code,
        Country: gs1_country,
      });
    }

    callback();
  }
}
