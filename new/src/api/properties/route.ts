import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { Property } from "@/types/property";
import {Properties} from "@/models/listing"// Adjust path as needed
import {connectDb} from "@/helper/db";

// const uri = process.env.MONGO_URL as string;
// const client = new MongoClient(uri);

connectDb();

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  try {

    const cursor = await Properties.find({ country: 'Greece' });

    res.status(200).json(cursor);
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  } ;
}
