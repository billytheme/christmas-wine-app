import nextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "../../../database/mongo";
import CredentialsProvider from "next-auth/providers/credentials";

export default nextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Name: { label: "Name", type: "text" },
      },
      async authorize(credentials, req) {
        return { name: req.query?.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "beans",
});
