import { Document, Filter, MongoClient } from "mongodb";

export const clientPromise = new MongoClient("mongodb://localhost:27017/MyDb").connect()

export async function queryOne(db: string, container: string, query: Filter<Document>) {
  const client = await clientPromise
  const res = await client.db(db).collection(container).findOne(query) as Document
  return res
}

export async function queryMany(db: string, container: string, query: Filter<Document>) {
  const client = await clientPromise
  const res = await client.db(db).collection(container).find(query).toArray() as Document[]
  return res
}

export async function updateOneVote(db: string, container: string, vote: Document) {
  const client = await clientPromise
  const res = await client.db(db).collection(container).updateOne({user: vote.user}, {"$set": vote}, {upsert: true})
}

export async function clearContainer(db: string, container: string) {
  const client = await clientPromise
  const res = await client.db(db).collection(container).deleteMany({})
  return res
}