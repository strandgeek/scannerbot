import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Logo from "../assets/scannerbot-logo.png";
import AppScreenshot from "../assets/app-screenshot.png";
import PipelineScreenshot from "../assets/screenshot-pipeline.png";
import { Pricing } from "../components/Pricing";
import { Link } from "react-router-dom";

const stats = [
  { label: "Detectors", value: "88" },
  { label: "Execution Time", value: "< 1s" },
];

const footerNavigation = {
  main: [],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/strandgeek/scannerbot",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export function IndexPage() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <img className="h-16 w-auto" src={Logo} alt="Your Company" />
              </div>
              <div className="mt-20">
                <div>
                  <a
                    href="https://github.com/strandgeek/scannerbot"
                    target="_blank"
                    className="inline-flex space-x-4"
                  >
                    <span className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-500">
                      HackaTRON Season 5
                    </span>
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-rose-500">
                      <span>v0.1.0</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    TRON Solidity Code Scanner with AI Insights
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Detect vulnerabilities and potential bugs in your Solidity
                    for TRON Blockchain project.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/app/signup"
                    className="rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                  >
                    Signup
                  </Link>
                </div>
                <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="min-w-0 flex-1 py-1 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">
                        Already have an account?
                      </span>{" "}
                      <Link
                        to="/app/login"
                        className="font-medium text-rose-500"
                      >
                        Sign-in
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src={AppScreenshot}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial/stats section */}
        <div className="relative mt-20">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
            <div className="relative sm:py-16 lg:py-0">
              <div
                aria-hidden="true"
                className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
              >
                <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
                <svg
                  className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                  />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-6 sm:max-w-4xl lg:max-w-none lg:px-0 lg:py-20 w-full">
                {/* Testimonial card*/}
                <div className="relative overflow-hidden rounded-2xl pt-64 pb-10 w-full">
                  <img
                    className="absolute inset-0 h-full w-full object-contain"
                    src={PipelineScreenshot}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
              {/* Content area */}
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Static Analysis + AI Insights
                </h2>
                <div className="mt-6 space-y-6 text-gray-500">
                  <p className="text-lg">
                    ScannerBot is Open-Source and uses Slither with the TRON
                    Solidity Compiler to detect more than 80 vulnerabilities,
                    potential bugs, and potential optimizations for your
                    Solidity code for the TRON EVM.
                  </p>

                  <p className="text-lg">
                    Using the Statical Analysis result, ScannerBot generates
                    some AI Insights with suggestions to improve the security
                    and quality of your Smart Contracts on TRON Blockchain.
                  </p>
                </div>
              </div>

              {/* Stats section */}
              <div className="mt-10">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-t-2 border-gray-100 pt-6"
                    >
                      <dt className="text-base font-medium text-gray-500">
                        {stat.label}
                      </dt>
                      <dd className="text-3xl font-bold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10">
                  <a
                    href="https://github.com/crytic/slither/wiki/Detector-Documentation#public-detectors"
                    target="_blank"
                    className="text-base font-medium text-rose-500"
                  >
                    Learn more about the detectors &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0 my-48">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Compatible with TronBox
            </h2>
            <p className="mt-12 text-lg">
              ScannerBot supports, build-in, all versions of solc (Solidity
              Compiler) for TVM that are used in TronBox. Everything you need is
              run a simple CLI command like:
            </p>
            <div>
              <div className="bg-black text-white mt-12 w-full p-3 rounded-lg text-sm">
                npx -y @scannerbot/cli@latest --project-token{" "}
                <strong className="text-white">YOUR-PROJECT-TOKEN</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Pricing />
        </div>
      </main>

      {/* Footer section */}
      <footer className="mt-24 bg-gray-900 sm:mt-12">
        <div className="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {footerNavigation.main.map((item: any) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-400 hover:text-gray-300"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 ScannerBot, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
