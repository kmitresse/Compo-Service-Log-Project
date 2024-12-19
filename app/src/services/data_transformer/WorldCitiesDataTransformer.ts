import { Transform } from "node:stream";

type WorldCitiesData = {
  name: string;
  country: string;
  subcountry: string;
  geonameid: string;
};

export default class WorldCitiesDataTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: WorldCitiesData, encoding: string, callback: () => void) {
    const { geonameid, country } = chunk;

    if (geonameid && country) {
      this.push({
        "Geoname ID": geonameid,
        Country: country,
      });
    }

    callback();
  }
}
