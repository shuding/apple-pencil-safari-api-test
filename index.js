const $force = document.querySelectorAll('#force')[0]
const $touches = document.querySelectorAll('#touches')[0]
const canvas = document.querySelectorAll('canvas')[0]
const context = canvas.getContext('2d')
let lineWidth = 0
let isMousedown = false
let points = []

canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2

const requestIdleCallback = window.requestIdleCallback || function (fn) { setTimeout(fn, 1) };

for (const ev of ["touchstart", "mousedown"]) {
  canvas.addEventListener(ev, function (e) {
    let pressure = 0.1;
    let x, y;
    if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
      if (e.touches[0]["force"] > 0) {
        pressure = e.touches[0]["force"]
      }
      x = e.touches[0].pageX * 2
      y = e.touches[0].pageY * 2
    } else {
      pressure = 1.0
      x = e.pageX * 2
      y = e.pageY * 2
    }

    isMousedown = true

    lineWidth = Math.log(pressure + 1) * 40
    context.lineWidth = lineWidth// pressure * 50;
    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(x, y)

    points.push({ x, y, lineWidth })
  })
}

for (const ev of ['touchmove', 'mousemove']) {
  canvas.addEventListener(ev, function (e) {
    if (!isMousedown) return
    e.preventDefault()

    let pressure = 0.1
    let x, y
    if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
      if (e.touches[0]["force"] > 0) {
        pressure = e.touches[0]["force"]
      }
      x = e.touches[0].pageX * 2
      y = e.touches[0].pageY * 2
    } else {
      pressure = 1.0
      x = e.pageX * 2
      y = e.pageY * 2
    }

    // smoothen line width
    lineWidth = (Math.log(pressure + 1) * 40 * 0.2 + lineWidth * 0.8)
    points.push({ x, y, lineWidth })

    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    // context.lineWidth   = lineWidth// pressure * 50;
    // context.lineTo(x, y);
    // context.moveTo(x, y);

    if (points.length >= 3) {
      const l = points.length - 1
      const xc = (points[l].x + points[l - 1].x) / 2
      const yc = (points[l].y + points[l - 1].y) / 2
      context.lineWidth = points[l - 1].lineWidth
      context.quadraticCurveTo(points[l - 1].x, points[l - 1].y, xc, yc)
      context.stroke()
      context.beginPath()
      context.moveTo(xc, yc)
    }

    requestIdleCallback(() => {
      $force.textContent = 'force = ' + pressure

      const touch = e.touches ? e.touches[0] : null
      if (touch) {
        $touches.innerHTML = `
          touchType = ${touch.touchType} ${touch.touchType === 'direct' ? '👆' : '✍️'} <br/>
          radiusX = ${touch.radiusX} <br/>
          radiusY = ${touch.radiusY} <br/>
          rotationAngle = ${touch.rotationAngle} <br/>
          altitudeAngle = ${touch.altitudeAngle} <br/>
          azimuthAngle = ${touch.azimuthAngle} <br/>
        `

        // 'touchev = ' + (e.touches ? JSON.stringify(
        //   ['force', 'radiusX', 'radiusY', 'rotationAngle', 'altitudeAngle', 'azimuthAngle', 'touchType'].reduce((o, key) => {
        //     o[key] = e.touches[0][key]
        //     return o
        //   }, {})
        // , null, 2) : '')
      }
    })
  })
}

for (const ev of ['touchend', 'touchleave', 'mouseup']) {
  canvas.addEventListener(ev, function (e) {
    let pressure = 0.1;
    let x, y;

    if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
      if (e.touches[0]["force"] > 0) {
        pressure = e.touches[0]["force"]
      }
      x = e.touches[0].pageX * 2
      y = e.touches[0].pageY * 2
    } else {
      pressure = 1.0
      x = e.pageX * 2
      y = e.pageY * 2
    }

    isMousedown = false

    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.lineJoin = 'round'

    if (points.length >= 3) {
      const l = points.length - 1
      context.quadraticCurveTo(points[l].x, points[l].y, x, y)
      context.stroke()
    }

    points = []
    lineWidth = 0
  })
};
