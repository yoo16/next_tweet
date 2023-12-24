import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-wrap items-center mx-auto p-4">
        <Link href="/" className="px-5">
          <span className="self-center text-2xl font-semibold">Next Tweet</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className='flex flex-wrap'>
            <li>
              <Link href="/profile" className="py-2 px-3">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/login" className="py-2 px-3">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="items-right">
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar