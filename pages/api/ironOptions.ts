export default {
  cookieName: "siwe",
  password: process.env.NEXT_PUBLIC_ironOptionsPW,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
