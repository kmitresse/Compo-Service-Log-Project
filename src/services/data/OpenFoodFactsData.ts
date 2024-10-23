import { Data, InvalidData } from "./";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

type RawOpenFoodFactsData = {
  code: string;
  countries_en: string;
};

@Entity()
class OpenFoodFactsData implements Data {
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

  fromRaw({
    code,
    countries_en,
  }: RawOpenFoodFactsData): OpenFoodFactsData {
    if (!code || !countries_en || code.length !== 13) {
      throw new InvalidData("Invalid data");
    }

    return new OpenFoodFactsData(code, countries_en);
  }

  asData(openData: OpenFoodFactsData): any {
    return {
      "Barcode (EAN 13)": openData.barcode_ean_13,
      Country: openData.country,
    };
  }
}

export default OpenFoodFactsData;
