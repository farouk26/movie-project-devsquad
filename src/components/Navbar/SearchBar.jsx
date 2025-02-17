import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import Link from "next/link"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [actors, setActors] = useState([])
  const [movieResults, setMovieResults] = useState([])

  const fetchActors = async () => {
    try {
      const actorResults = await fetcher(
        `search/person?query=${searchQuery}&api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setActors(actorResults.results)
    } catch (error) {
      console.error("Failed to fetch actors:", error)
    }
  }

  const fetchMovies = async () => {
    try {
      const movieResults = await fetcher(
        `search/movie?query=${searchQuery}&api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setMovieResults(movieResults.results)
    } catch (error) {
      console.error("Failed to fetch movies:", error)
    }
  }

  useEffect(() => {
    fetchActors()
    fetchMovies()
  }, [searchQuery])

  const handleSearch = async (e) => {
    e.preventDefault()
    fetchActors()
    fetchMovies()
    setSearchQuery("") // Clear search query after search
  }

  const itemsToDisplay = [...actors, ...movieResults].filter((item) => {
    if (item.name) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase())
    } else if (item.title) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return false
  })

  return (
    <div>
      <form className="relative">
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          className="w-full p-2 rounded-full bg-slate-200 text-slate-900 text-center"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="p-2 bg-slate-900 rounded-full bg-opacity-70"
          style={{
            position: "absolute",
            top: "75%",
            left: "100%",
            transform: "translate(-130%, -80%)",
          }}
          onClick={handleSearch}
        >
          <BiSearchAlt2 size={20} />
        </button>
      </form>
      {searchQuery && itemsToDisplay.length > 0 && (
        <div className="dropdown ">
          <ul className="absolute z-20 rounded h-64 bg-slate-300 pt-2 pb-2 pl-4 pr-4 overflow-y-auto">
            <Link href={`./`}>
              {itemsToDisplay.map((item) => (
                <li
                  className="text-slate-800 hover:bg-slate-800 hover:text-slate-200 hover:rounded"
                  key={item.id}
                >
                  <Link
                    href={
                      item.hasOwnProperty("gender")
                        ? `/actors/actorId?id=${item.id}`
                        : `/movies/${item.id}`
                    }
                  >
                    {item.name || item.title}
                  </Link>
                </li>
              ))}
            </Link>
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
