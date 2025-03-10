import React from 'react'

export const WorkUnderProgress = () => {
  return (
    <div className="flex w-full">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 relative w-full">
            <div className="w-full py-3">
              <div className="pr-16 sm:text-center sm:px-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="flex p-2 rounded-lg bg-purple-800">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <p className="ml-3 font-medium text-white truncate">
                      <span className="md:hidden">SessionTrack is under development!</span>
                      <span className="hidden md:inline">This platform is currently under development. Some features may not be available.</span>
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:ml-4">
                    <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              {/* <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-center sm:pt-1 sm:pr-2">
                <button
                  type="button"
                  className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>
        </div>
  )
}
