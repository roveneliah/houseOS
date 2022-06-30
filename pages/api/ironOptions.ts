export default {
  cookieName: "siwe",
  password: process.env.NEXT_PUBLIC_ironOptionsPW || "", // TODO:
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
