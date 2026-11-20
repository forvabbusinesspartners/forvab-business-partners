import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface HeroCanvasProps {
  className?: string
}

const PARTICLE_COUNT = 600
const MAX_SEGMENTS = 150
const LINK_DISTANCE = 3
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE

const EMERALD_COLORS = [0x34d399, 0x10b981, 0x065f46]

/** Drift bounds for the particle field. */
const BOUNDS = { x: 28, y: 14, zMin: -12, zMax: 4 }

/**
 * Animated emerald particle network with a slowly rotating wireframe
 * icosahedron. Plain three.js (no react-three-fiber).
 *
 * - Transparent background (alpha) so the page background shows through.
 * - Pauses when the tab is hidden or the canvas is off-screen.
 * - Renders a single static frame when reduced motion is preferred.
 * - Renders nothing (no crash, no console error) when WebGL is unavailable.
 */
export default function HeroCanvas({ className }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // WebGL unavailable — render nothing instead of crashing.
      setFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.016)

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0, 0, 18)

    // ---- Particles -------------------------------------------------------
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const color = new THREE.Color()
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      positions[ix] = (Math.random() * 2 - 1) * BOUNDS.x
      positions[ix + 1] = (Math.random() * 2 - 1) * BOUNDS.y
      positions[ix + 2] = BOUNDS.zMin + Math.random() * (BOUNDS.zMax - BOUNDS.zMin)

      color.setHex(EMERALD_COLORS[i % EMERALD_COLORS.length])
      const jitter = 0.85 + Math.random() * 0.3
      colors[ix] = Math.min(color.r * jitter, 1)
      colors[ix + 1] = Math.min(color.g * jitter, 1)
      colors[ix + 2] = Math.min(color.b * jitter, 1)

      velocities[ix] = (Math.random() - 0.5) * 0.012
      velocities[ix + 1] = (Math.random() - 0.5) * 0.012
      velocities[ix + 2] = (Math.random() - 0.5) * 0.006
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    points.frustumCulled = false
    scene.add(points)

    // ---- Connection lines (capped segment count) -------------------------
    const linePositions = new Float32Array(MAX_SEGMENTS * 6)
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    lines.frustumCulled = false
    scene.add(lines)

    // ---- Wireframe icosahedron (globe-like, right-of-center) -------------
    const icoGeometry = new THREE.IcosahedronGeometry(3.4, 1)
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry)
    const icoMaterial = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const icosahedron = new THREE.LineSegments(icoWireframe, icoMaterial)
    icosahedron.position.set(8, 0.6, -2)
    scene.add(icosahedron)

    // ---- Sizing ----------------------------------------------------------
    const parent = canvas.parentElement
    const resize = () => {
      const width = parent ? parent.clientWidth : window.innerWidth
      const height = parent ? parent.clientHeight : window.innerHeight
      if (width === 0 || height === 0) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // Keep the globe visible on narrow screens: center it low instead of
      // pushing it off-canvas to the right.
      if (camera.aspect < 0.8) {
        icosahedron.position.set(0, -4.5, -2)
      } else if (camera.aspect < 1.2) {
        icosahedron.position.set(5, 0.6, -2)
      } else {
        icosahedron.position.set(8, 0.6, -2)
      }
    }
    resize()

    const resizeObserver = parent ? new ResizeObserver(resize) : null
    if (resizeObserver && parent) {
      resizeObserver.observe(parent)
    } else {
      window.addEventListener('resize', resize)
    }

    // ---- Frame updates ---------------------------------------------------
    const updateParticles = () => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3
        positions[ix] += velocities[ix]
        positions[ix + 1] += velocities[ix + 1]
        positions[ix + 2] += velocities[ix + 2]

        if (positions[ix] > BOUNDS.x) positions[ix] = -BOUNDS.x
        else if (positions[ix] < -BOUNDS.x) positions[ix] = BOUNDS.x

        if (positions[ix + 1] > BOUNDS.y) positions[ix + 1] = -BOUNDS.y
        else if (positions[ix + 1] < -BOUNDS.y) positions[ix + 1] = BOUNDS.y

        if (positions[ix + 2] > BOUNDS.zMax) positions[ix + 2] = BOUNDS.zMin
        else if (positions[ix + 2] < BOUNDS.zMin) positions[ix + 2] = BOUNDS.zMax
      }
      pointsGeometry.attributes.position.needsUpdate = true
    }

    const updateLines = () => {
      let count = 0
      for (let i = 0; i < PARTICLE_COUNT && count < MAX_SEGMENTS; i++) {
        const ix = i * 3
        for (let j = i + 1; j < PARTICLE_COUNT && count < MAX_SEGMENTS; j++) {
          const jx = j * 3
          const dx = positions[ix] - positions[jx]
          if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue
          const dy = positions[ix + 1] - positions[jx + 1]
          if (dy > LINK_DISTANCE || dy < -LINK_DISTANCE) continue
          const dz = positions[ix + 2] - positions[jx + 2]
          if (dz > LINK_DISTANCE || dz < -LINK_DISTANCE) continue
          if (dx * dx + dy * dy + dz * dz > LINK_DISTANCE_SQ) continue

          const o = count * 6
          linePositions[o] = positions[ix]
          linePositions[o + 1] = positions[ix + 1]
          linePositions[o + 2] = positions[ix + 2]
          linePositions[o + 3] = positions[jx]
          linePositions[o + 4] = positions[jx + 1]
          linePositions[o + 5] = positions[jx + 2]
          count++
        }
      }
      linesGeometry.setDrawRange(0, count * 2)
      linesGeometry.attributes.position.needsUpdate = true
    }

    // ---- Animation loop with pause/resume --------------------------------
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = 0
    let running = false
    let frame = 0
    let tabVisible = !document.hidden
    let inView = true

    const renderFrame = () => {
      frame++
      updateParticles()
      // Rebuilding links every 3rd frame keeps the O(n^2) scan cheap.
      if (frame % 3 === 0) updateLines()
      icosahedron.rotation.x += 0.0016
      icosahedron.rotation.y += 0.0022
      renderer.render(scene, camera)
    }

    const loop = () => {
      if (!running) return
      renderFrame()
      rafId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion || !tabVisible || !inView) return
      running = true
      rafId = requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const onVisibilityChange = () => {
      tabVisible = !document.hidden
      if (tabVisible && inView) start()
      else stop()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true
        if (inView && tabVisible) start()
        else stop()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    // Initial paint: one static frame (the only frame when reduced motion
    // is preferred), then start the loop when motion is allowed.
    updateLines()
    renderer.render(scene, camera)
    start()

    // ---- Cleanup ---------------------------------------------------------
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', resize)
      }
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
      icoGeometry.dispose()
      icoWireframe.dispose()
      icoMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  if (failed) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 block h-full w-full ${className ?? ''}`}
    />
  )
}
