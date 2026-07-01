export function burst(originEl) {
  const rect = originEl.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const colors = ['#42b883', '#86efac', '#ffffff', '#34d399', '#6ee7b7']

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div')
    const size = Math.random() * 7 + 4
    const angle = Math.random() * 360
    const distance = Math.random() * 120 + 60
    const rad = (angle * Math.PI) / 180
    const tx = Math.cos(rad) * distance
    const ty = Math.sin(rad) * distance

    Object.assign(el.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
      opacity: 1,
    })

    document.body.appendChild(el)
    requestAnimationFrame(() => {
      el.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) rotate(' + (angle * 3) + 'deg)'
      el.style.opacity = '0'
    })
    setTimeout(() => el.remove(), 750)
  }
}
