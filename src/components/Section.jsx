// Section shell: eyebrow + balanced heading + one lead paragraph, then content.
export default function Section({ id, eyebrow, title, lead, children, className = '' }) {
  return (
    <section id={id} className={`py-24 md:py-28 ${className}`}>
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-3.5 max-w-[640px]">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">{eyebrow}</span>
          <h2 className="heading text-3xl md:text-[40px] font-bold">{title}</h2>
          {lead && <p className="text-[17px] text-base-content/70 max-w-[54ch]">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
