import { Data } from "./";

type RawOpenFoodFactsData = {
  code: string;
  countries_en: string;
};

class OpenFoodFactsData implements Data {
  input: string[] = [];
  output: string[] = [];

  constructor({ code, countries_en }: RawOpenFoodFactsData) {
    this.input = [code];
    this.output = [countries_en];
  }
}

export default OpenFoodFactsData;
