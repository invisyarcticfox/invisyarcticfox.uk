import confetti from 'canvas-confetti'


function initAge() {
  const el = document.querySelector<HTMLSpanElement>('.cont .txt span.age')!
  const birth = '2005-05-04'
  const [y, m, d] = birth.split('-').map(Number)

  const today = new Date()
  let age = today.getFullYear() - y
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--

  el.textContent = age.toString()

  if (today.getMonth() + 1 === m && today.getDate() === d) {
    el.classList.add('birthday')
    el.title = "It's my birthday!"
  }

  el.addEventListener('mouseenter', () => {
    if (!el.classList.contains('birthday')) return

    const rect = el.getBoundingClientRect()

    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 20,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      ticks: 150,
    })
  })
}

document.addEventListener('astro:page-load', initAge)