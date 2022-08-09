import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./utils";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface ReqRes {
  req: Request;
  res: Response;
}
export type context = {
  prisma: PrismaClient;
  isAuthorized: boolean;
};
export async function createContext(e: ReqRes): Promise<context> {
  //check if _req has headers set
  const { req } = e;
  const bearer = req.headers ? req.headers.authorization || "" : "";
  const token = bearer.split(" ")[1];
  const isAuthorized = await verifyToken(token);
  return {
    prisma,
    isAuthorized,
  };
}
