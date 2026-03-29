function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-0 z-50 glass bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white text-xs font-black tracking-tight shadow-md shadow-red-900/30">
            ET
          </span>
          <div className="leading-none">
            <h1 className="text-lg font-black text-red-700 dark:text-red-400 tracking-tight">MyET AI</h1>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">Personalized Business Intelligence</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
          {[
            { href: '#feed', label: 'Feed' },
            { href: '#briefing', label: 'Briefing' },
            { href: '#story-tracker', label: 'Story Tracker' },
            { href: '#audio', label: 'Audio' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
