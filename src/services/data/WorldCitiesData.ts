import { Data, InvalidData } from "./";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type RawWorldCitiesData = {
  name: string;
  country: string;
  subcountry: string;
  geonameid: string;
};

@Entity()
class WorldCitiesData implements Data {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id?: number;

  @Column()
  geoname_id: string;

  @Column()
  country: string;

  constructor(geonameId: string, country: string) {
    this.geoname_id = geonameId;
    this.country = country;
  }

  fromRaw({ geonameid, country }: RawWorldCitiesData): WorldCitiesData {
    if (!geonameid || !country || geonameid.length !== 6) {
      throw new InvalidData("Invalid data");
    }

    return new WorldCitiesData(geonameid, country);
  }

  asData(worldCitiesData: WorldCitiesData): any {
    return {
      "Geoname ID": worldCitiesData.geoname_id,
      Country: worldCitiesData.country,
    };
  }
}

export default WorldCitiesData;
