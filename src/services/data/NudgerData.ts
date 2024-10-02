import { Data } from "./";

type RawNudgerData = {
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

class NudgerData implements Data {
  barcode: string;

  constructor(rawData: RawNudgerData) {
    this.barcode = rawData.code;
  }
}

export default NudgerData;
