import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { daisyui } from '../tailwind.config'
const themes: Object[] = daisyui.themes

const Home: NextPage = () => {
  const [themeIndex, setThemeIndex] = useState<number>(0)
  const nextTheme = () => setThemeIndex((i) => i + 1)
  const prevTheme = () => setThemeIndex((i) => i - 1)
  const themeName = themes[themeIndex]?.toString()

  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>LFG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-[100vh] w-full flex-1 flex-col justify-center space-y-10 bg-[url(/pretty1.jpeg)] bg-cover text-center">
        <div className="flex w-full flex-row justify-center">
          <div className="flex flex-col items-start space-y-5 rounded-xl bg-neutral bg-opacity-90 p-16">
            <h1 className="text-5xl font-bold">Harlem</h1>
            <h1 className="text-2xl font-bold">Langston Hughes</h1>
            <p className="text-left text-xl">
              What happens to a dream deferred?
            </p>
            <div className="flex flex-col pl-5">
              <p className="text-left text-xl">
                Does it dry up like a raisin in
              </p>
              <p className="text-left text-xl">
                the sun? Or fester like a sore— And then run? Does it stink like
              </p>
              <p className="text-left text-xl">
                rotten meat? Or crust and sugar over— like a syrupy sweet? Maybe
              </p>
              <p className="text-left text-xl">
                it just sags like a heavy load. Or does it explode?
              </p>
              <p className="text-left text-xl"></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
