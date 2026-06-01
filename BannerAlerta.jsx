import usePulse from '../hooks/usePulse.js'
import { MONO } from '../data.js'

export default function BannerAlerta({ count }) {
  const on = usePulse(450)
  if (!count) return null
  return (
    <div
      style={{
        background: on ? '#5c0a18' : '#2a0510',
        borderBottom: '2px solid #f43f5e',
        padding: '9px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        transition: 'background 0.25s',
      }}
    >
      <span style={{ fontSize: 18, display: 'inline-block', animation: 'bellShake 0.6s infinite' }}>
        🔔
      </span>
      <span style={{ fontWeight: 'bold', fontSize: 13, letterSpacing: 2, color: '#fff', fontFamily: MONO }}>
        {count} NOVO{count > 1 ? 'S PEDIDOS' : ' PEDIDO'} AGUARDANDO ATENÇÃO
      </span>
      <span style={{ fontSize: 18, display: 'inline-block', animation: 'bellShake 0.6s infinite' }}>
        🔔
      </span>
    </div>
  )
}
