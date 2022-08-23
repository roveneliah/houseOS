export const pageview = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_measurementId, {
    page_path: url,
  });
};

export const event = (name, metadata) => {
  window.gtag("event", name, metadata);
};
