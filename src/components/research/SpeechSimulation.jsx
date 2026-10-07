import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Play, Pause, Volume2, Sparkles, RefreshCw, Cpu, Activity, Zap } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const PRESET_PAIRS = [
  {
    dir: 'en-vi',
    srcLang: 'English',
    tgtLang: 'Tiếng Việt',
    srcText: 'Real-time speech translation without cloud dependency.',
    tgtText: 'Dịch thuật tiếng nói thời gian thực không phụ thuộc đám mây.',
    tokensSrc: ['Real-time', 'speech', 'translation', 'offline', 'ONNX'],
    tokensTgt: ['Dịch thuật', 'tiếng nói', 'thời gian thực', 'cục bộ'],
    wer: '0.55%',
    latency: '68ms',
  },
  {
    dir: 'vi-en',
    srcLang: 'Tiếng Việt',
    tgtLang: 'English',
    srcText: 'Hệ thống tác nhân trí tuệ nhân tạo vận hành cục bộ.',
    tgtText: 'Autonomous artificial intelligence agent running locally.',
    tokensSrc: ['Hệ thống', 'tác nhân', 'AI', 'cục bộ', 'bảo mật'],
    tokensTgt: ['Autonomous', 'AI', 'agent', 'running', 'locally'],
    wer: '11.32%',
    latency: '74ms',
  },
  {
    dir: 'en-vi',
    srcLang: 'English',
    tgtLang: 'Tiếng Việt',
    srcText: 'High-throughput acoustic inference with EnViT5 & SenseVoice.',
    tgtText: 'Suy luận âm học thông lượng cao cùng EnViT5 và SenseVoice.',
    tokensSrc: ['High-throughput', 'acoustic', 'inference', 'SenseVoice'],
    tokensTgt: ['Suy luận', 'âm học', 'thông lượng cao', 'EnViT5'],
    wer: '0.55%',
    latency: '62ms',
  },
]

export function SpeechSimulation() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const isVisibleRef = useRef(true)
  const reduced = useReducedMotion()

  const [activePairIndex, setActivePairIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [sampleRate, setSampleRate] = useState(24) // kHz (16 - 48)
  const [attentionDensity, setAttentionDensity] = useState(6) // 3 - 10
  const [mousePos, setMousePos] = useState({ x: -1, y: -1, isHover: false })

  const currentPair = PRESET_PAIRS[activePairIndex]

  // Quản lý IntersectionObserver để ngắt render khi ra khỏi màn hình (tiết kiệm pin & GPU)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  // Canvas render loop — Trực quan hóa âm học 60 FPS
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let t = 0
    let lastTime = performance.now()

    // Khởi tạo các hạt lượng tử âm học (Acoustic Phoneme Particles)
    const particleCount = reduced ? 20 : 65
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 2.2 + 1,
      color: Math.random() > 0.5 ? '#22D3EE' : '#8B5CF6',
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }))

    const render = (now) => {
      animRef.current = requestAnimationFrame(render)
      if (!isVisibleRef.current) return

      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      if (isPlaying && !reduced) {
        t += dt * (sampleRate / 24)
      }

      // Xử lý kích thước hiển thị theo DPI
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
      }

      ctx.save()
      ctx.scale(dpr, dpr)

      // Xóa nền với hiệu ứng làm mờ nhẹ (motion blur trail)
      ctx.fillStyle = '#07070A'
      ctx.fillRect(0, 0, w, h)

      // Lưới tọa độ HUD công nghệ cao
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 36
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // 1. VẼ CÁC HẠT LƯỢNG TỬ ÂM HỌC BỒNG BỀNH
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        p.pulse += dt * 3
        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))

        ctx.fillStyle = p.color
        ctx.globalAlpha = pulseAlpha
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      // 2. KHU VỰC TRỤC SÓNG ÂM ĐẦU VÀO (INPUT ASR SENSEVOICE) — NỬA TRÁI
      const midY = h * 0.5
      const waveWidth = w * 0.42

      // Sóng nền mờ thứ nhất
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(79, 124, 255, 0.35)'
      for (let x = 0; x < waveWidth; x += 3) {
        const normX = x / waveWidth
        const envelope = Math.sin(normX * Math.PI)
        const wave =
          Math.sin(normX * 18 - t * 6) * 16 * envelope +
          Math.sin(normX * 32 + t * 4) * 8 * envelope
        const y = midY + wave
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Sóng âm chính phát sáng phát ra từ mic (Cyan Neon Glow)
      ctx.shadowColor = '#22D3EE'
      ctx.shadowBlur = 14
      ctx.beginPath()
      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#22D3EE'
      for (let x = 0; x < waveWidth; x += 3) {
        const normX = x / waveWidth
        const envelope = Math.sin(normX * Math.PI)
        // Hiệu ứng tương tác chuột
        let mouseMod = 1
        if (mousePos.isHover && mousePos.x < waveWidth) {
          const distToMouse = Math.abs(x - mousePos.x)
          if (distToMouse < 90) {
            mouseMod = 1 + (1 - distToMouse / 90) * 0.9
          }
        }
        const wave =
          Math.sin(normX * 24 - t * 8) * 22 * envelope * mouseMod +
          Math.cos(normX * 42 + t * 5) * 11 * envelope * mouseMod
        const y = midY + wave
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Mel-spectrogram Bars nhỏ ở phía đáy bên trái
      const barCount = 28
      const barWidth = 3
      const barGap = 4
      const specStartX = w * 0.05
      for (let i = 0; i < barCount; i++) {
        const normI = i / barCount
        const barHeight =
          Math.abs(Math.sin(normI * 12 + t * 5) * 28 + Math.cos(normI * 20 - t * 3) * 14) *
          (sampleRate / 24)
        const bx = specStartX + i * (barWidth + barGap)
        const by = h * 0.85

        const grad = ctx.createLinearGradient(0, by, 0, by - barHeight)
        grad.addColorStop(0, 'rgba(34, 211, 238, 0.15)')
        grad.addColorStop(1, 'rgba(34, 211, 238, 0.85)')

        ctx.fillStyle = grad
        ctx.fillRect(bx, by - barHeight, barWidth, barHeight)
      }

      // 3. KHU VỰC TRỤ THẦN KINH TRUNG TÂM (LATENT CROSS-ATTENTION ENVIT5)
      const centerCenterX = w * 0.5
      const numNodes = attentionDensity
      const nodeSpacing = (h * 0.55) / (numNodes - 1 || 1)
      const topNodeY = h * 0.22

      // Vòng tròn phát quang lõi NMT Engine
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.25)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])
      ctx.arc(centerCenterX, midY, 68, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Các tia chú ý đa điểm (Cross-Attention Connections) nối từ nguồn sang đích
      for (let i = 0; i < numNodes; i++) {
        const ny1 = topNodeY + i * nodeSpacing
        for (let j = 0; j < numNodes; j++) {
          const ny2 = topNodeY + j * nodeSpacing
          const attWeight = Math.sin(t * 3 + i * 1.3 + j * 1.7) * 0.5 + 0.5
          if (attWeight > 0.42) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${attWeight * 0.35})`
            ctx.lineWidth = attWeight * 1.8
            ctx.moveTo(w * 0.42, ny1)
            ctx.bezierCurveTo(centerCenterX, ny1, centerCenterX, ny2, w * 0.58, ny2)
            ctx.stroke()
          }
        }
      }

      // Hạt năng lượng photon chạy qua mạng Attention
      for (let i = 0; i < 4; i++) {
        const prog = ((t * 1.8 + i * 0.25) % 1)
        const nodeSrcY = topNodeY + (i % numNodes) * nodeSpacing
        const nodeTgtY = topNodeY + ((i + 2) % numNodes) * nodeSpacing

        // Tọa độ trên đường cong Bezier
        const bx = (1 - prog) * (1 - prog) * (w * 0.42) + 2 * (1 - prog) * prog * centerCenterX + prog * prog * (w * 0.58)
        const by = (1 - prog) * (1 - prog) * nodeSrcY + 2 * (1 - prog) * prog * ((nodeSrcY + nodeTgtY) / 2) + prog * prog * nodeTgtY

        ctx.shadowColor = '#8B5CF6'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(bx, by, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Các node biểu diễn nơ-ron trung tâm
      for (let i = 0; i < numNodes; i++) {
        const ny = topNodeY + i * nodeSpacing

        // Node nguồn (ASR Phonemes)
        ctx.fillStyle = '#22D3EE'
        ctx.beginPath()
        ctx.arc(w * 0.42, ny, 3.5, 0, Math.PI * 2)
        ctx.fill()

        // Node đích (NMT Target Tokens)
        ctx.fillStyle = '#8B5CF6'
        ctx.beginPath()
        ctx.arc(w * 0.58, ny, 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // 4. KHU VỰC SÓNG ÂM ĐẦU RA TỔNG HỢP (SYNTHESIZED SPEECH TTS) — NỬA PHẢI
      const outStartX = w * 0.58
      const outWidth = w - outStartX

      // Sóng nền mờ thứ nhất
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)'
      for (let x = 0; x < outWidth; x += 3) {
        const normX = x / outWidth
        const envelope = Math.sin(normX * Math.PI)
        const wave =
          Math.sin(normX * 16 - t * 6) * 15 * envelope +
          Math.cos(normX * 30 + t * 4) * 8 * envelope
        const y = midY + wave
        if (x === 0) ctx.moveTo(outStartX + x, y)
        else ctx.lineTo(outStartX + x, y)
      }
      ctx.stroke()

      // Sóng tổng hợp chính (Magenta / Purple Glow)
      ctx.shadowColor = '#8B5CF6'
      ctx.shadowBlur = 14
      ctx.beginPath()
      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#A78BFA'
      for (let x = 0; x < outWidth; x += 3) {
        const normX = x / outWidth
        const envelope = Math.sin(normX * Math.PI)
        const wave =
          Math.sin(normX * 22 - t * 7.5) * 20 * envelope +
          Math.cos(normX * 38 + t * 5) * 10 * envelope
        const y = midY + wave
        if (x === 0) ctx.moveTo(outStartX + x, y)
        else ctx.lineTo(outStartX + x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Mel-spectrogram Bars nhỏ ở phía đáy bên phải
      const specOutStartX = w * 0.72
      for (let i = 0; i < barCount; i++) {
        const normI = i / barCount
        const barHeight =
          Math.abs(Math.cos(normI * 14 + t * 4.5) * 26 + Math.sin(normI * 22 - t * 3.5) * 12) *
          (sampleRate / 24)
        const bx = specOutStartX + i * (barWidth + barGap)
        const by = h * 0.85

        const grad = ctx.createLinearGradient(0, by, 0, by - barHeight)
        grad.addColorStop(0, 'rgba(139, 92, 246, 0.15)')
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.85)')

        ctx.fillStyle = grad
        ctx.fillRect(bx, by - barHeight, barWidth, barHeight)
      }

      ctx.restore()
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isPlaying, sampleRate, attentionDensity, reduced, mousePos])

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHover: true,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1, y: -1, isHover: false })
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070709] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Glow ambient nền trang trí */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent-purple/10 blur-3xl" />

      {/* HEADER: Tiêu đề & Chọn hướng dịch */}
      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan font-bold">
              ONEVOICE · NEURAL SPEECH PIPELINE
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Mô phỏng xử lý âm thanh hai chiều: <span className="text-zinc-200">SenseVoice ASR</span> ➔ <span className="text-zinc-200">EnViT5 NMT</span> ➔ <span className="text-zinc-200">Neural TTS</span>
          </p>
        </div>

        {/* Nút chọn mẫu kịch bản hội thoại */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_PAIRS.map((pair, idx) => (
            <button
              key={idx}
              onClick={() => setActivePairIndex(idx)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                activePairIndex === idx
                  ? 'border border-accent-cyan/50 bg-accent-cyan/15 font-semibold text-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                  : 'border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {pair.dir === 'en-vi' ? 'EN ➔ VI' : 'VI ➔ EN'} (Mẫu {idx + 1})
            </button>
          ))}

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs text-white transition-all hover:bg-white/20 active:scale-95"
            title={isPlaying ? 'Tạm dừng mô phỏng' : 'Tiếp tục phát'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5 text-accent-cyan" /> : <Play className="h-3.5 w-3.5 text-accent-cyan" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>
      </div>

      {/* KHUNG HIỂN THỊ CÂU ĐANG DỊCH & TOKEN ATTENTION STREAM */}
      <div className="relative mb-5 grid grid-cols-1 gap-3 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 sm:grid-cols-2">
        <div className="flex flex-col justify-between rounded-lg border border-cyan-500/20 bg-cyan-950/15 p-3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-accent-cyan">
            <span className="flex items-center gap-1.5">
              <Volume2 className="h-3.5 w-3.5" /> Đầu vào giọng nói ({currentPair.srcLang})
            </span>
            <span className="text-zinc-500">ASR SenseVoice</span>
          </div>
          <div className="my-2 font-display text-sm font-semibold text-white">
            "{currentPair.srcText}"
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentPair.tokensSrc.map((t, i) => (
              <span
                key={i}
                className="rounded border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-purple-500/20 bg-purple-950/15 p-3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-accent-purple">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Bản dịch tổng hợp ({currentPair.tgtLang})
            </span>
            <span className="text-zinc-500">NMT EnViT5 + TTS</span>
          </div>
          <div className="my-2 font-display text-sm font-semibold text-white">
            "{currentPair.tgtText}"
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentPair.tokensTgt.map((t, i) => (
              <span
                key={i}
                className="rounded border border-purple-400/20 bg-purple-400/10 px-1.5 py-0.5 font-mono text-[10px] text-purple-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CANVAS MÔ PHÒNG SÓNG ÂM VÀ CROSS-ATTENTION */}
      <div className="relative aspect-[16/8] w-full min-h-[260px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#07070A]">
        {/* HUD Overlay Labels */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] text-accent-cyan/90">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#22D3EE]" />
          <span>PHỔ SÓNG ĐẦU VÀO // ASR ENCODER</span>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[11px] text-accent-purple">
          <Cpu className="h-3.5 w-3.5" />
          <span>LATENT CROSS-ATTENTION</span>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] text-purple-400">
          <span>TỔNG HỢP TTS // OUTPUT SPECTRUM</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple shadow-[0_0_6px_#8B5CF6]" />
        </div>

        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="h-full w-full cursor-crosshair"
        />
      </div>

      {/* THANH ĐIỀU KHIỂN & CHỈ SỐ THỜI GIAN THỰC */}
      <div className="mt-6 grid grid-cols-1 gap-5 pt-2 md:grid-cols-12 md:items-center">
        {/* Sliders điều chỉnh thông số */}
        <div className="space-y-4 md:col-span-7">
          <div>
            <div className="mb-1.5 flex justify-between font-mono text-xs text-zinc-400">
              <span>Tần số lấy mẫu âm học (Sample Rate):</span>
              <span className="font-bold text-accent-cyan">{sampleRate} kHz</span>
            </div>
            <input
              type="range"
              min="16"
              max="48"
              step="4"
              value={sampleRate}
              onChange={(e) => setSampleRate(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-cyan"
            />
          </div>

          <div>
            <div className="mb-1.5 flex justify-between font-mono text-xs text-zinc-400">
              <span>Độ sâu Attention Layers (EnViT5):</span>
              <span className="font-bold text-accent-purple">{attentionDensity} Layers</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={attentionDensity}
              onChange={(e) => setAttentionDensity(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-purple"
            />
          </div>
        </div>

        {/* 3 Metric Cards thực tế từ kết quả đo đạc dự án OneVoice */}
        <div className="grid grid-cols-3 gap-2 md:col-span-5">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center">
            <div className="font-mono text-[10px] uppercase text-zinc-500">Độ trễ suy luận</div>
            <div className="mt-1 flex items-center justify-center gap-1 font-mono text-sm font-bold text-accent-cyan">
              <Zap className="h-3 w-3 text-accent-cyan" />
              {currentPair.latency}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center">
            <div className="font-mono text-[10px] uppercase text-zinc-500">ASR WER</div>
            <div className="mt-1 font-mono text-sm font-bold text-emerald-400">
              {currentPair.wer}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center">
            <div className="font-mono text-[10px] uppercase text-zinc-500">Pass Rate</div>
            <div className="mt-1 font-mono text-sm font-bold text-accent-purple">
              98.28%
            </div>
          </div>
        </div>
      </div>

      {/* Chú thích phương pháp luận */}
      <p className="mt-5 border-t border-white/[0.05] pt-4 font-mono text-[11px] leading-relaxed text-zinc-500">
        * Minh họa mô phỏng luồng suy luận thời gian thực của hệ thống <span className="text-zinc-300">OneVoice</span>. Tối ưu hóa mô hình SenseVoice và EnViT5 qua định dạng ONNX Runtime giúp giảm độ trễ dưới 80ms trên CPU thông thường mà không cần kết nối Internet.
      </p>
    </div>
  )
}
