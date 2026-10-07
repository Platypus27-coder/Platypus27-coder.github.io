import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Github, MapPin, Sparkles } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { BentoCard } from '../ui/BentoCard'
import { site } from '../../data/site'
import { researchData } from '../../data/research'

const focusAreas = [
  'LLM Serving & Systems',
  'Neurosymbolic Agents',
  'Speech Processing & NMT',
  'Data Science & MLOps',
]

// Minh chứng thực tế từ CV & các bài toán đã thực hiện
const proof = [
  'Đạt 98.28% pass rate cho pipeline dịch giọng nói OneVoice (WER 0.55% EN).',
  'Xây dựng Neurosymbolic STEM Agent kết hợp Z3 Theorem Prover & SymPy (EXACT 2026).',
  'Tối ưu vLLM serving trên GPU NVIDIA H200 MiG cho Viettel AI Race 2026.',
]

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: site.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_#4F7CFF]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">
              01 // GIỚI THIỆU
            </span>
          </div>
        </Reveal>

        {/* Bento Grid Giới Thiệu Cốt Lõi */}
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Tuyên ngôn cốt lõi */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <BentoCard className="p-8 sm:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-5xl">
                  Tôi là một AI &amp; Data Science builder đam mê xây dựng{' '}
                  <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                    các hệ thống AI tốc độ cao &amp; suy luận chuẩn xác.
                  </span>
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                  Theo học chuyên ngành Khoa học Dữ liệu tại <span className="text-white font-medium">HCMUS (ĐHQG TP.HCM)</span> với GPA <span className="text-accent-cyan font-semibold">3.741/4.0</span> và chứng chỉ tiếng Anh <span className="text-accent-purple font-semibold">VSTEP 7.0 (B2)</span>. Tôi tập trung vào hạ tầng suy luận LLM (vLLM, H200 GPU), hệ thống Agent lai biểu tượng (Neurosymbolic AI) và công nghệ giọng nói song ngữ ngoại tuyến.
                </p>
              </div>
            </BentoCard>
          </Reveal>

          {/* Địa điểm & Giờ thực tế */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-accent-cyan" /> Nơi làm việc
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{site.location}</div>
                  <div className="mt-1 font-mono text-sm text-accent-cyan tabular-nums">
                    {LocalTime()} <span className="text-zinc-500">GMT+7</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Chủ đề đang nghiên cứu */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-purple opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-purple" />
                  </span>
                  Chủ đề đang nghiên cứu
                </div>
                <div className="font-display text-lg font-bold leading-snug text-white">
                  {researchData.primaryTopic}
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Lĩnh vực trọng tâm */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Lĩnh vực trọng tâm
              </div>
              <ul className="space-y-2">
                {focusAreas.map((f, i) => (
                  <li key={f} className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-sm text-zinc-200 last:border-0">
                    <span className="font-medium">{f}</span>
                    <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* Minh chứng > Lời nói */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Minh chứng &gt; Lời nói
              </div>
              <ul className="space-y-3">
                {proof.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-snug text-zinc-300">
                    <span className="mt-0.5 font-mono text-accent-cyan">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* GitHub Repo link */}
          <Reveal className="md:col-span-2" delay={0.24}>
            <BentoCard as="a" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="block p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Github className="h-6 w-6 text-white" />
                  <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Mã nguồn &amp; Thử nghiệm</div>
                  <div className="mt-1 font-display text-xl font-bold text-white">@Platypus27-coder</div>
                </div>
              </div>
            </BentoCard>
          </Reveal>
        </div>

        {/* Khung Ảnh đại diện & Bản sắc cá nhân — Thay thế mục ảnh cũ */}
        <div className="mt-14">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_#8B5CF6]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-purple">
                  ẢNH ĐẠI DIỆN &amp; BẢN SẮC // PROFILE IDENTITY
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
                <span>HCMUS • KHOA TOÁN - TIN HỌC</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/90 to-black/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-blue/40 hover:shadow-[0_20px_50px_rgba(79,124,255,0.15)]">
              {/* Glow hiệu ứng nền */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-blue/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent-purple/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                {/* Khung ảnh đại diện chân dung chuẩn tỷ lệ dọc 3:4 */}
                <div className="flex justify-center md:col-span-5 lg:col-span-4">
                  <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:shadow-[0_10px_30px_rgba(34,211,238,0.2)]">
                    <img
                      src={`${import.meta.env.BASE_URL}images/avatar.jpg`}
                      alt="Ngô Gia Huy"
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient tối nhẹ ở chân ảnh */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />

                    {/* Tag góc trên bên trái */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
                        PORTRAIT // PROFILE
                      </span>
                    </div>

                    {/* Huy hiệu trường lớp góc dưới */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-cyan/90">
                        HCMUS, TP. HỒ CHÍ MINH
                      </div>
                      <div className="font-display text-base font-bold text-white">
                        Ngô Gia Huy
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nội dung thông tin định danh bên phải */}
                <div className="flex flex-col justify-center space-y-5 md:col-span-7 lg:col-span-8">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 font-mono text-xs text-accent-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      Data Science &amp; AI Engineer
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                      Ngô Gia Huy
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      Sinh viên chuyên ngành Khoa học Dữ liệu tại HCMUS với đam mê kiến tạo các giải pháp AI đột phá. Kết hợp vững chắc giữa nền tảng toán học thuật toán, tư duy kỹ thuật hệ thống và tinh thần kiên trì giải quyết bài toán phức tạp.
                    </p>
                  </div>

                  {/* Badges thông số nổi bật */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Chuyên ngành</div>
                      <div className="mt-1 font-display text-sm font-semibold text-white">Khoa Học Dữ Liệu</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Học thuật</div>
                      <div className="mt-1 font-display text-sm font-semibold text-accent-cyan">GPA 3.74 / 4.0</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Tiếng Anh</div>
                      <div className="mt-1 font-display text-sm font-semibold text-accent-purple">VSTEP 7.0 (B2)</div>
                    </div>
                  </div>

                  {/* Phương châm làm việc */}
                  <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/40 p-3.5">
                    <span className="font-mono text-lg text-accent-cyan leading-none">“</span>
                    <p className="text-xs italic leading-relaxed text-zinc-300 sm:text-sm">
                      Tối ưu từng mili-giây suy luận, chính xác trong từng bước logic biểu tượng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>


      </div>
    </section>
  )
}
