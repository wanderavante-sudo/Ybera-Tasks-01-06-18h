import { useState } from 'react'
import logo from '../assets/logo.png'
import { MONO } from '../data.js'
import usePulse from '../hooks/usePulse.js'
import AcaoBtn from '../components/AcaoBtn.jsx'
import BannerAlerta from '../components/BannerAlerta.jsx'
import CardPedido from '../components/CardPedido.jsx'

export default function PainelPrestador({ usuario, pedidos, onAceitar, onConcluir, onLogout }) {
  const [aba, setAba] = useState('pendentes')
  const on = usePulse(480)

  const meus = pedidos.filter((p) => p.para === usuario.setor)
  const ativo = meus.find((p) => p.status === 'aceito') || null
  const pendentes = meus.filter((p) => p.status === 'pendente' || p.status === 'fila')
  const concluidos = meus.filter((p) => p.status === 'concluido')
  const novos = pendentes.filter((p) => p.novoAlerta)

  return (
    <div style={{ minHeight: '100vh', background: '#07090e', fontFamily: MONO, color: '#e2eaf4' }}>
      <BannerAlerta count={novos.length} />

      {/* Header */}
      <div
        style={{
          background: '#0d1117',
          borderBottom: '1px solid #1c2535',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: 36, height: 36, borderRadius: 8, boxShadow: '0 0 10px #ffffff10' }}
          />
          <div>
            <div style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 3, color: '#fff' }}>
              YBERA TASKS
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 1,
                color: ativo ? '#a78bfa' : '#4a6080',
                opacity: ativo ? (on ? 1 : 0.4) : 1,
                transition: 'opacity 0.4s',
              }}
            >
              {usuario.setor === 'Motorista' ? '🚗' : '🔧'} {usuario.setor.toUpperCase()} ·{' '}
              {ativo ? 'EM ANDAMENTO' : 'DISPONÍVEL'}
            </div>
          </div>
        </div>
        <AcaoBtn cor="#253040" onClick={onLogout}>
          SAIR
        </AcaoBtn>
      </div>

      {/* Pedido ativo em destaque */}
      {ativo && (
        <div
          style={{
            background: on ? '#0d0a1f' : '#0a0816',
            border: '1px solid #a78bfa',
            borderTop: 'none',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            boxShadow: '0 4px 20px #a78bfa20',
            transition: 'background 0.4s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 20,
                display: 'inline-block',
                animation: 'spin 2s linear infinite',
              }}
            >
              ⚙️
            </span>
            <div>
              <div style={{ fontSize: 11, color: '#a78bfa', letterSpacing: 2, marginBottom: 2 }}>
                ATENDENDO AGORA
              </div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{ativo.tarefa}</div>
              <div style={{ fontSize: 11, color: '#4a6080' }}>
                De: {ativo.de} · {ativo.hora}
              </div>
            </div>
          </div>
          <button
            onClick={() => onConcluir(ativo.id)}
            style={{
              background: 'linear-gradient(135deg,#065f46,#059669)',
              border: '1px solid #34d399',
              color: '#fff',
              borderRadius: 8,
              padding: '10px 18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 12,
              letterSpacing: 2,
              fontFamily: MONO,
              boxShadow: '0 0 12px #34d39930',
            }}
          >
            ✔ CONCLUIR SERVIÇO
          </button>
        </div>
      )}

      {/* Abas */}
      <div
        style={{
          display: 'flex',
          background: '#0d1117',
          borderBottom: '1px solid #1c2535',
        }}
      >
        {[
          ['pendentes', `⏳ FILA (${pendentes.length})`],
          ['concluidos', `✅ CONCLUÍDOS (${concluidos.length})`],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setAba(k)}
            style={{
              flex: 1,
              padding: '12px 4px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${aba === k ? '#a78bfa' : 'transparent'}`,
              color: aba === k ? '#a78bfa' : '#4a6080',
              fontWeight: aba === k ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: 12,
              letterSpacing: 1,
              fontFamily: MONO,
              transition: 'all 0.2s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <div style={{ padding: 14, maxWidth: 680, margin: '0 auto' }}>
        {aba === 'pendentes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ativo && pendentes.length > 0 && (
              <div
                style={{
                  background: '#0c0a18',
                  border: '1px solid #a78bfa30',
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontSize: 11,
                  color: '#4a6080',
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                🕐 {pendentes.length} pedido{pendentes.length > 1 ? 's' : ''} na fila · próximo
                será alertado ao concluir o atual
              </div>
            )}
            {!ativo && pendentes.length === 0 && (
              <div style={{ textAlign: 'center', color: '#253040', padding: 50, fontSize: 13 }}>
                Nenhum pedido pendente. Aguardando...
              </div>
            )}
            {pendentes.map((p) => (
              <CardPedido
                key={p.id}
                pedido={p}
                papel="prestador"
                prestadorOcupado={!!ativo}
                onAceitar={onAceitar}
                onConcluir={onConcluir}
              />
            ))}
          </div>
        )}

        {aba === 'concluidos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concluidos.length === 0 && (
              <div style={{ textAlign: 'center', color: '#253040', padding: 50, fontSize: 13 }}>
                Nenhum serviço concluído ainda.
              </div>
            )}
            {concluidos.map((p) => (
              <CardPedido key={p.id} pedido={p} papel="prestador" prestadorOcupado={false} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bellShake {
          0%,100% { transform: rotate(0); }
          20% { transform: rotate(-18deg); }
          40% { transform: rotate(18deg); }
          60% { transform: rotate(-12deg); }
          80% { transform: rotate(12deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
