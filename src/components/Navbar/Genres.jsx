import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { fetcher } from "@/utils/API"
import Link from "next/link"

const Genres = () => {
  const [genres, setGenres] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchGenres() {
      const data = await fetcher(
        `genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setGenres(data.genres)
    }
    fetchGenres()
  }, [])

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }
  return (
    <div>
      <ul>
        <li>
          <Link href={`./`} onClick={toggleGenresDropdown}>
            Genres
          </Link>
          <div>
            {isGenresDropdownOpen && (
              <ul className="absolute left-12 w-full h-28 px-4 py-2 text-base border border-transparent rounded-md appearance-none overflow-y-auto">
                {/* Render each genre as a list item */}
                {genres?.map((genre) => (
                  <li key={genre.id}>
                    <Link href={`./movies`}>{genre.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Genres
{
  /*<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div> */
}
