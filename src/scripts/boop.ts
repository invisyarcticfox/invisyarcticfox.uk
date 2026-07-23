function initBoops() {
  const avatarEl = document.querySelector<HTMLDivElement>('.top .avatar')!
  const boopEl = avatarEl.querySelector<HTMLDivElement>('.boop.nose')!
  const countEl = document.querySelector<HTMLElement>('footer .boop.count code')!

  function spawnBoopTxt() {
    const el = document.createElement('div')
    el.className = 'boop txt'
    el.textContent = '*boop*'

    const offsetX = (Math.random() ** 2) * 20 * (Math.random() < 0.5 ? -1 : 1)
    el.style.setProperty('--x', `${offsetX}px`)

    avatarEl.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }

  ;(async () => {
    try {
      const response = await fetch('/api/boop')
      const data:{count:number} = await response.json()
      countEl.textContent = data.count.toString()
    }
    catch (error) { console.error(error) }
  })()

  boopEl.onclick = async () => {
    spawnBoopTxt()

    try {
      const response = await fetch('/api/boop', { method: 'POST' })
      if (!response.ok) return
      const data:{count:number} = await response.json()
      countEl.textContent = data.count.toString()
    }
    catch (error) { console.error(error) }
  }
}

document.addEventListener('astro:page-load', initBoops)