import { Data } from "./";

type RawSmolaData = {
  name: string;
  country: string;
  subcountry: string;
  geonameid: string;
};

class WorldCitiesData implements Data {
  input: string[];
  output: string[];

  constructor({ geonameid, country }: RawSmolaData) {
    this.input = [geonameid];
    this.output = [country];
  }
}

export default WorldCitiesData;
