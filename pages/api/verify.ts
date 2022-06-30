import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import ironOptions from "./ironOptions";

import admin from "firebase-admin";
// import { applicationDefault } from "firebase-admin/app";

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: applicationDefault(),
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    }),
    // databaseURL:
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("/verify");
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature, address } = req.body;
        admin
          .auth()
          .createCustomToken(address)
          .then(async (customToken: string) => {
            const siweMessage = new SiweMessage(message);
            const fields = await siweMessage.validate(signature);

            if (fields.nonce !== req.session.nonce)
              return res.status(422).json({ message: "Invalid nonce." });
            req.session.siwe = new SiweMessage({
              ...fields,
              resources: [customToken],
            });
            await req.session.save();

            res.json({
              ok: true,
            });
          })
          .catch((error) => {
            console.log("Error creating custom token:", error);
          });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
