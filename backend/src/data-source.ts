import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Software } from "./entity/Software";
import { Request } from "./entity/Request";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Software, Request],
  migrations: [],
  subscribers: [],
});
