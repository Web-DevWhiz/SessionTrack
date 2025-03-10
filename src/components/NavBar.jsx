import React, {useState} from 'react'
import usePageContext from '../store/PageStore';

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {page, setPage} = usePageContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">SessionTrack</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <span 
                className={`${page == "dashboard"? "border-indigo-500 text-gray-900": "border-transparent text-gray-500 hover:border-gray-300"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                onClick={() => setPage("dashboard")}
                >
                  Dashboard
                </span>
                <span
                className={`${page == "session"? "border-indigo-500 text-gray-900": "border-transparent text-gray-500 hover:border-gray-300"} hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                onClick={() => setPage("session")}
                >
                  Session Reports
                </span>
                <span 
                className={`${[page] == "audio"? "border-indigo-500 text-gray-900": "border-transparent text-gray-500 hover:border-gray-300"} hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                onClick={() => setPage("audio")}
                >
                  Audio Task Reports
                </span>
                <span 
                className={`${page == "analytics"? "border-indigo-500 text-gray-900": "border-transparent text-gray-500 hover:border-gray-300"} hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                onClick={() => setPage("analytics")}
                >
                  Analytics
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                New Session
              </button>
              <div className="ml-4 flex items-center">
                <div className="relative">
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <img className="h-8 w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" alt="User profile" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center py-2 px-4 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu - fixed beneath navbar */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed w-full bg-white border-b border-gray-200`}>
          <div className="pt-2 pb-3 space-y-1">
            <span 
            className={`${page == "dashboard"? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium": "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}`}
            onClick={() => setPage("dashboard")}
            >
              Dashboard
            </span>
            <span 
            className={`${page == "session"? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium":"border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}`}
            onClick={() => setPage("session")}
            >
              Session Reports
            </span>
            <span 
            className={`${page == "audio"? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium": "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}`}
            onClick={() => setPage("audio")}
            >
              Audio Task Reports
            </span>
            <span 
            className={`${page == "analytics"? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium": "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}`}
            onClick={() => setPage("analytics")}
            >
              Analytics
            </span>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" alt="User profile" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">john@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Your Profile
              </a>
              <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
  )
}
