export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-flex gap-[10px] items-center justify-center
      uppercase tracking-[.24em] text-sp-gold text-eyebrow mb-[26px]
      before:content-['✦'] before:text-[13px]">
      {children}
    </span>
  )
}
