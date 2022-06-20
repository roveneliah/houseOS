import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import ironOptions from "./ironOptions";

import admin from "firebase-admin";

import { getAuth, signInWithCustomToken } from "firebase/auth";
import { applicationDefault } from "firebase-admin/app";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: applicationDefault(),
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
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        if (fields.nonce !== req.session.nonce)
          return res.status(422).json({ message: "Invalid nonce." });

        req.session.siwe = fields;
        await req.session.save();

        admin
          .auth()
          .createCustomToken(address)
          .then((customToken) => {
            // Send token back to client
            console.log("customToken: ", customToken);
            res.json({
              ok: true,
              token: customToken,
            });
          })
          .catch((error) => {
            console.log("Error creating custom token:", error);
          });
        console.log("here4");
      } catch (_error) {
        console.log("Got error creating token.", _error);

        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
