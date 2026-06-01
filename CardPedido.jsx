import { PRIO, MONO, statusInfo } from '../data.js'
import usePulse from '../hooks/usePulse.js'
import AcaoBtn from './AcaoBtn.jsx'

export default function CardPedido({
  pedido,
  papel,
  prestadorOcupado,
  onAceitar,
  onConcluir,
  onCancelar,
}) {
  const on = usePulse(550)
  const pr = PRIO[pedido.prioridade] || PRIO.Normal
  const st = statusInfo(pedido.status)
  const isNovo = pedido.status === 'pendente' && pedido.novoAlerta
  const isFila = pedido.status === 'fila'
  const isAceito = pedido.status === 'aceito'

  const bordaColor = isNovo
    ? on ? pr.cor : pr.borda
    : isAceito
    ? '#a78bfa'
    : isFila
    ? '#1c2535'
    : st.cor

  const bgCard = isNovo
    ? on ? '#0e1828' : '#080e18'
    : isAceito
    ? '#0d0a1f'
    : '#0d1117'

  return (
    <div
      style={{
        background: bgCard,
        border: `1px solid ${bordaColor}`,
        borderLeft: `4px solid ${st.cor}`,
        borderRadius: 12,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        transition: 'all 0.35s',
        boxShadow: isNovo
          ? `0 0 18px ${pr.cor}20`
          : isAceito
          ? '0 0 14px #a78bfa20'
          : 'none',
        opacity: isFila ? 0.7 : 1,
      }}
    >
      <div
        style={{
          fontSize: 22,
          paddingTop: 2,
          flexShrink: 0,
          filter: isNovo
            ? `drop-shadow(0 0 5px ${pr.cor})`
            : isAceito
            ? 'drop-shadow(0 0 5px #a78bfa)'
            : 'none',
          transition: 'filter 0.35s',
        }}
      >
        {st.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 6,
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 12, color: '#4a6080' }}>#{pedido.id}</span>
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#e2eaf4' }}>{pedido.de}</span>
          <span style={{ color: '#253040', fontSize: 12 }}>→</span>
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#3b82f6' }}>{pedido.para}</span>

          <span
            style={{
              background: pr.bg,
              color: pr.cor,
              border: `1px solid ${pr.cor}60`,
              borderRadius: 20,
              padding: '1px 9px',
              fontSize: 10,
              letterSpacing: 1,
              fontWeight: 'bold',
            }}
          >
            {pedido.prioridade.toUpperCase()}
          </span>

          <span
            style={{
              background: 'transparent',
              color: st.cor,
              border: `1px solid ${st.cor}60`,
              borderRadius: 20,
              padding: '1px 9px',
              fontSize: 10,
              letterSpacing: 1,
              fontWeight: 'bold',
              opacity: isNovo ? (on ? 1 : 0.4) : 1,
              transition: 'opacity 0.35s',
            }}
          >
            {st.label}
          </span>

          {isFila && (
            <span style={{ fontSize: 10, color: '#4a6080', letterSpacing: 1 }}>
              🕐 AGUARDANDO FILA
            </span>
          )}
        </div>

        <div style={{ fontSize: 14, color: '#e2eaf4', marginBottom: 4 }}>{pedido.tarefa}</div>

        {pedido.obs && (
          <div
            style={{
              fontSize: 12,
              color: '#4a6080',
              background: '#060a10',
              border: '1px solid #1c2535',
              borderRadius: 6,
              padding: '4px 10px',
              marginBottom: 5,
            }}
          >
            💬 {pedido.obs}
          </div>
        )}

        <div style={{ fontSize: 11, color: '#253040', fontFamily: MONO }}>
          {pedido.hora}
          {pedido.aceitorPor && ` · aceito por ${pedido.aceitorPor}`}
          {pedido.concluidoAs && ` · concluído ${pedido.concluidoAs}`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        {papel === 'prestador' && pedido.status === 'pendente' && !prestadorOcupado && (
          <AcaoBtn cor="#a78bfa" onClick={() => onAceitar && onAceitar(pedido.id)}>
            ✓ ACEITAR
          </AcaoBtn>
        )}
        {papel === 'prestador' && pedido.status === 'aceito' && (
          <AcaoBtn cor="#34d399" onClick={() => onConcluir && onConcluir(pedido.id)}>
            ✔ CONCLUIR
          </AcaoBtn>
        )}
        {papel === 'solicitante' &&
          (pedido.status === 'pendente' || pedido.status === 'fila') && (
            <AcaoBtn cor="#253040" onClick={() => onCancelar && onCancelar(pedido.id)}>
              ✕
            </AcaoBtn>
          )}
      </div>
    </div>
  )
}
