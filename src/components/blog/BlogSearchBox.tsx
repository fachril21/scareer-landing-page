import { useState } from 'react'
import { Search } from 'lucide-react'
import { navigate } from '../../app/router'
import './blog.css'

/** Kotak cari artikel. Enter atau tombol Cari membuka `/blog/cari?q=`; kata kunci tetap terisi di halaman hasil. */
export function BlogSearchBox({ initialQuery = '', id = 'blog-search' }: { initialQuery?: string; id?: string }) {
  const [value, setValue] = useState(initialQuery)

  return (
    <form
      className="bsearch"
      role="search"
      action="/blog/cari"
      method="get"
      onSubmit={(e) => {
        e.preventDefault()
        const q = value.trim()
        navigate(q ? `/blog/cari?q=${encodeURIComponent(q)}` : '/blog/cari')
      }}
    >
      <label htmlFor={id} className="sr-only">Cari artikel</label>
      <Search size={20} strokeWidth={1.75} aria-hidden="true" className="bsearch__icon" />
      <input
        id={id}
        name="q"
        type="search"
        className="bsearch__input"
        placeholder="Cari artikel…"
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="bsearch__submit">Cari</button>
    </form>
  )
}
