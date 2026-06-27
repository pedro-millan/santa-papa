/** Eyebrow / section-kicker reutilizable */
export default function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex gap-[10px] items-center justify-center
                    uppercase tracking-[.24em] text-[#c58641] text-[12px] mb-[26px]
                    before:content-['✦'] before:text-[13px]">
      {children}
    </div>
  )
}
