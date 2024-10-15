import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("timestamp")
  timestamp: Date = new Date();

  @Column("text")
  url: string;

  @Column("text")
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET";

  @Column("blob")
  body: string = "";

  constructor(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: string
  ) {
    this.url = url;
    this.method = method;
    this.body = body;
  }
}
