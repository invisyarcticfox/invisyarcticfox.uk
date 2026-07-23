import Lottie from 'lottie-web'
import colonthree from '~/assets/colonthree.json'


function initColonThree() {
  const ct = document.querySelector<HTMLSpanElement>('.cont .txt .top span.colonthree')!
  let playing = false

  const anim = Lottie.loadAnimation({
    container: ct,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: colonthree,
  })

  anim.goToAndStop(0, true)

  ct.addEventListener('mouseenter', () => {
    if (playing) return
    playing = true

    anim.stop()
    anim.play()
  })

  anim.addEventListener('complete', () => {
    playing = false
    anim.goToAndStop(0, true)
  })
}

document.addEventListener('astro:page-load', initColonThree)