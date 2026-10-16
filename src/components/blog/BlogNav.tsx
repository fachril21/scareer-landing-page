import { useEffect, useRef } from 'react'
import { BLOG_GROUPS, articlesOfCategory, categoriesOfGroup } from '../../content/blog'
import type { BlogGroup } from '../../content/blog.types'
import './blog.css'

/**
 * Tab grup artikel ("Artikel terbaru" lalu tiap grup). Tautan sungguhan, jadi URL bisa dibagikan dan tombol Kembali jalan.
 * Menggulung horizontal tanpa scrollbar tampak; tab aktif dijaga di tengah.
 */
export function BlogTabs({ activeGroup }: { activeGroup?: string }) {
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const box = scrollerRef.current
    const active = box?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!box || !active) return
    box.scrollLeft = active.offsetLeft - (box.clientWidth - active.offsetWidth) / 2
  }, [activeGroup])

  const items: { label: string; href: string; active: boolean }[] = [
    { label: 'Artikel terbaru', href: '/blog', active: activeGroup === undefined },
    ...BLOG_GROUPS.map((g) => ({ label: g.name, href: `/blog/grup/${g.slug}`, active: activeGroup === g.slug })),
  ]

  return (
    <nav className="btabs" aria-label="Grup artikel">
      <ul ref={scrollerRef}>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} data-keep-scroll="" aria-current={item.active ? 'page' : undefined}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Daftar kategori di dalam satu grup: "Semua" lalu tiap kategori. Sidebar di desktop, deretan chip di mobile. */
export function BlogCategoryNav({ group, activeCategory }: { group: BlogGroup; activeCategory?: string }) {
  const categories = categoriesOfGroup(group.slug)
  return (
    <nav className="bcats" aria-label={`Kategori ${group.name}`}>
      <ul>
        <li>
          <a href={`/blog/grup/${group.slug}`} data-keep-scroll="" aria-current={activeCategory === undefined ? 'page' : undefined}>
            Semua
          </a>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <a href={`/blog/kategori/${c.slug}`} data-keep-scroll="" aria-current={activeCategory === c.slug ? 'page' : undefined}>
              {c.name}
              <span className="bcats__count num" aria-label={`${articlesOfCategory(c.slug).length} artikel`}>{articlesOfCategory(c.slug).length}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
