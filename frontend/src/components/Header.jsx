


export default function Header() {
  return (
    <header className=" p-3 flex gap-5 items-center justify-end  w-[1215px]">
      {/* Search Box */}
      <div className="flex items-center gap-1.5 w-64 bg-[#f9f9f9] px-2 rounded-md shadow-sm search-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
          className="bi bi-search text-gray-500" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 text-sm border-none outline-none bg-[#f8f8f8] search-input"
        />
      </div>

      {/* Notification Icon */}
      <div className="bg-[#f9f9f9] py-1 px-2 rounded shadow cursor-pointer">
        <i class="bi bi-bell-fill"></i>
      </div>

      {/* User Icon */}
      <div className="user-icon">
        <img
          src='https://plus.unsplash.com/premium_photo-1663933534186-e50d9fcef389?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt="User Icon"
          className="w-9 h-9 rounded-full object-cover cursor-pointer shadow"
        />
      </div>
    </header>
  );
}
