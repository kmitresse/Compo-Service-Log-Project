import { Data, InvalidData } from "./";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

@Entity()
class NudgerData implements Data {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id?: number;

  @Column()
  barcode_ean_13: string;

  @Column()
  country: string;

  constructor(code: string, gs1_country: string) {
    this.barcode_ean_13 = code;
    this.country = gs1_country;
  }

  fromRaw({ code, gs1_country }: RawNudgerData): NudgerData {
    if (!code || !gs1_country || code.length !== 13) {
      throw new InvalidData("Invalid data");
    }

    return new NudgerData(code, gs1_country);
  }

  asData(nudgerData: NudgerData): any {
    return {
      "Barcode (EAN 13)": nudgerData.barcode_ean_13,
      Country: nudgerData.country,
    };
  }
}

export default NudgerData;
