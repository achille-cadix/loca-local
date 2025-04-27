export function AppHeader() {
  return (
    <header className="px-6 pt-4 pb-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="text-green-600">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">LocaLocal</h1>
      </div>
      <span className="text-gray-500 ml-2 text-sm">Trouvez des événements locaux proches de vous !</span>
    </header>
  );
} 