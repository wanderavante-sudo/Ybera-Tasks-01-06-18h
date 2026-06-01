import usePulse from '../hooks/usePulse.js'
import { MONO } from '../data.js'

export default function StatusCard({ prestador, pedidoAtivo, fila }) {
  const on = usePulse(900)
  const p = pedidoAtivo

  return (
    <div
      style={{
        background: '#0d1117',
        border: `1px solid ${p ? '#a78bfa' : '#1c2535'}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        boxShadow: p ? '0 0 20px #a78bfa20' : 'none',
        transition: 'all 0.4s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: p ? 12 : 0 }}>
        <span style={{ fontSize: 22 }}>{prestador === 'Motorista' ? '🚗' : '🔧'}</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 'bold', color: '#e2eaf4', letterSpacing: 1 }}>
            {prestador}
          </div>
          <div
            style={{
              fontSize: 11,
              color: p ? '#a78bfa' : '#4a6080',
              letterSpacing: 1,
              opacity: p ? (on ? 1 : 0.4) : 1,
              transition: 'opacity 0.4s',
            }}
          >
            {p ? '● EM ANDAMENTO' : '● DISPONÍVEL'}
          </div>
        </div>
      </div>

      {p && (
        <div
          style={{
            background: '#0d0a1f',
            border: '1px solid #a78bfa40',
            borderRadius: 8,
            padding: '10px 12px',
          }}
        >
          <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 4 }}>
            ATENDENDO AGORA
          </div>
          <div style={{ fontSize: 13, color: '#a78bfa', fontWeight: 'bold', marginBottom: 2 }}>
            {p.tarefa}
          </div>
          <div style={{ fontSize: 11, color: '#4a6080' }}>
            Solicitado por {p.de} · {p.hora}
          </div>
          {fila.length > 0 && (
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                color: '#4a6080',
                borderTop: '1px solid #1c2535',
                paddingTop: 8,
              }}
            >
              +{fila.length} na fila de espera
            </div>
          )}
        </div>
      )}
    </div>
  )
}
