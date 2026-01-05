import type { discordStatus } from '@/types'

const pfp = document.querySelector<HTMLImageElement>('#pfp img')!
const statusColours = { online: '#23A55A', idle: '#F0B232', dnd: '#F23F43', offline: '#80848E' };


(async () => {
  const res = await fetch('https://pi.invisyarcticfox.uk/api/discord')
  const d:discordStatus = await res.json()
  console.log(d)
  const statusColour = statusColours[d.status] || statusColours.offline
  pfp.style.borderColor = statusColour
})()