import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { daisyui } from "../tailwind.config";
const themes: Object[] = daisyui.themes;

const Home: NextPage = () => {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const nextTheme = () => setThemeIndex((i) => i + 1);
  const prevTheme = () => setThemeIndex((i) => i - 1);
  const themeName = themes[themeIndex]?.toString();

  return (
    <div data-theme={themeName} className="min-h-screen py-2">
      <Head>
        <title>LFG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-start justify-start space-y-10 px-20 pt-20 text-center">
        <div className="flex flex-col space-y-4">
          {/* <h1 className="text-6xl font-bold">Theme</h1> */}
          <h1 className="w-[10vw] text-6xl font-bold">"{themeName}"</h1>
          <div className="space-x-3">
            <button onClick={prevTheme} className="btn btn-primary">
              Prev
            </button>
            <button onClick={nextTheme} className="btn btn-secondary">
              Next
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-2">
          <div className="flex flex-col items-start space-y-4">
            <a
              href="https://daisyui.com/components/button/"
              className="text-primary-content text-3xl font-bold"
            >
              Colors
            </a>
            <div className="flex flex-row space-x-2">
              <p className="bg-base-100 rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Base-100
              </p>
              <p className="bg-base-200 rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Base-200
              </p>
              <p className="bg-base-300 rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Base-300
              </p>
              <p className="bg-base-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Base Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-neutral rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Neutral
              </p>
              <p className="bg-neutral-focus rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Neutral Focus
              </p>
              <p className="bg-neutral-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Neutral Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-primary rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Primary
              </p>
              <p className="bg-primary-focus rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Primary Focus
              </p>
              <p className="bg-primary-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Primary Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-secondary rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Secondary
              </p>
              <p className="bg-secondary-focus rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Secondary Focus
              </p>
              <p className="bg-secondary-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Secondary Content
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <a
              href="https://daisyui.com/components/button/"
              className="text-primary text-3xl font-bold"
            >
              Accents
            </a>
            <div className="flex flex-row space-x-2">
              <p className="bg-accent rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Accent
              </p>
              <p className="bg-accent-focus rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Accent Focus
              </p>
              <p className="bg-accent-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Accent Content
              </p>
            </div>

            <div className="flex flex-row space-x-2">
              <p className="bg-info rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Info
              </p>
              <p className="bg-info-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Info Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-success rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Success
              </p>
              <p className="bg-success-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Success Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-warning rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Warning
              </p>
              <p className="bg-warning-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Warning Content
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="bg-error rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Error
              </p>
              <p className="bg-error-content rounded-lg px-6 py-4 text-xl font-semibold text-white">
                Error Content
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <a
            href="https://daisyui.com/components/button/"
            className="text-primary text-3xl font-bold"
          >
            Buttons
          </a>
          <div className="grid grid-cols-4 gap-2">
            <button className="btn">Button</button>
            <button className="btn glass">Glass</button>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-error">Error</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-link">Link</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-disabled">Disabled</button>
            <button className="btn loading">Loading</button>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start space-y-4">
            <a
              href="https://daisyui.com/components/button/"
              className="text-primary-content text-3xl font-bold"
            >
              Alerts
            </a>
            <div className="alert shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>12 unread messages. Tap to see.</span>
              </div>
            </div>
            <div className="alert alert-info shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>New software update available.</span>
              </div>
            </div>
            <div className="alert alert-success shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your purchase has been confirmed!</span>
              </div>
            </div>
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Warning: Invalid email address!</span>
              </div>
            </div>
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Task failed successfully.</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start space-y-3">
            <a
              href="https://daisyui.com/components/button/"
              className="text-primary-content text-3xl font-bold"
            >
              Badges
            </a>
            <div className="space-x-2">
              <div className="badge">neutral</div>
              <div className="badge badge-primary">primary</div>
              <div className="badge badge-secondary">secondary</div>
              <div className="badge badge-accent">accent</div>
              <div className="badge badge-ghost">ghost</div>
            </div>
            <div className="space-x-2">
              <div className="badge badge-outline">neutral</div>
              <div className="badge badge-primary badge-outline">primary</div>
              <div className="badge badge-secondary badge-outline">
                secondary
              </div>
              <div className="badge badge-accent badge-outline">accent</div>
            </div>
            <div className="space-x-2">
              <div className="badge badge-info gap-2">info</div>
              <div className="badge badge-success gap-2">success</div>
              <div className="badge badge-warning gap-2">warning</div>
              <div className="badge badge-error gap-2">error</div>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="my-modal-4" className="modal-button btn">
            open modal
          </label>

          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold">
                Congratulations random Interner user!
              </h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
            </label>
          </label>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
