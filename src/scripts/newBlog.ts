import type { blogEntries } from '@/types'


(async () => {
  try {
    const res = await fetch('https://blog.invisyarcticfox.uk/blogs.json')
    const [latest]:blogEntries = await res.json()
    const lsLastSeen = localStorage.getItem('lastSeenPost')
    const blogLink = document.querySelector<HTMLAnchorElement>('.links ul li a[href="https://blog.invisyarcticfox.uk"]')!
    
    console.log('latest blog:', latest.id)
    console.log('local storage:', lsLastSeen)
    
    if ( lsLastSeen && lsLastSeen !== latest.id ) {
      blogLink.classList.add('new')
      blogLink.title = 'new blog!'
      blogLink.innerHTML = `<span>blog</span>`
    }
    
    blogLink.addEventListener('click', () => {
      blogLink.classList.remove('new')
      blogLink.title = ''
      localStorage.setItem('lastSeenPost', latest.id)
    })
  } catch (error) { console.error(error) }
})()