export default function PrintHeader({ title, subtitle }) {
  return (
    <div className="hidden print:block mb-6 pb-4 border-b-2" style={{ borderColor: '#6B1A1A' }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl font-extrabold tracking-widest"
              style={{ color: '#C9A84C', letterSpacing: '0.15em' }}
            >
              PIRAHY
            </span>
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: '#6B1A1A' }}
            >
              ALIMENTOS
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">www.pratofino.com.br</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">{title}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          <p className="text-xs text-gray-400 mt-0.5">
            Emitido em: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}