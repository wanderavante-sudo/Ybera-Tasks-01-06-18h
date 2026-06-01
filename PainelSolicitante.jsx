import { useState } from 'react'
import logo from '../assets/logo.png'
import {
  PRESTADORES,
  TAREFAS_RAPIDAS,
  PRIO,
  MONO,
  INPUT_STYLE,
} from '../data.js'
import AcaoBtn from '../components/AcaoBtn.jsx'
import CardPedido from '../components/CardPedido.jsx'
import StatusCard from '../components/StatusCard.jsx'

export default function PainelSolicitante({ usuario, pedidos, onNovo, onCancelar, onLogout }) {
  const [aba, setAba] = useState('status')
  const [para, setPara] = useState('Motorista')
  const [tarefa, setTarefa] = useState('')
  const [prio, setPrio] = useState('Normal')
  const [obs, setObs] = useState('')

  const meus = pedidos.filter((p) => p.de === usuario.setor)
  const abertos = meus.filter(
    (p) => p.status === 'pendente' || p.status === 'fila' || p.status === 'aceito'
  )

  function pedidoAtivoDe(prest) {
    return pedidos.find((p) => p.para === prest && p.status === 'aceito') || null
  }
  function filaDe(prest) {
    return pedidos.filter(
      (p) => p.para === prest && (p.status === 'pendente' || p.status === 'fila')
    )
  }

  function enviar() {
    if (!tarefa.trim()) return
    onNovo({ de: usuario.setor, para, tarefa, prio, obs: obs.trim() })
    setTarefa('')
    setObs('')
    setPrio('Normal')
    setAba('status')
  }

  const abas = [
    ['status', '📡 STATUS'],
    ['meus', '📋 MEUS PEDIDOS'],
    ['novo', '＋ NOVO'],
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#07090e', fontFamily: MONO, color: '#e2eaf4' }}>
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
            <div style={{ fontSize: 10, color: '#4a6080', letterSpacing: 1 }}>
              {usuario.setor.toUpperCase()}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {abertos.length > 0 && (
            <div
              style={{
                background: '#1a1030',
                border: '1px solid #7c3aed',
                color: '#a78bfa',
                borderRadius: 20,
                padding: '3px 11px',
                fontSize: 11,
              }}
            >
              {abertos.length} em aberto
            </div>
          )}
          <AcaoBtn cor="#253040" onClick={onLogout}>
            SAIR
          </AcaoBtn>
        </div>
      </div>

      {/* Abas */}
      <div
        style={{
          display: 'flex',
          background: '#0d1117',
          borderBottom: '1px solid #1c2535',
        }}
      >
        {abas.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setAba(k)}
            style={{
              flex: 1,
              padding: '12px 4px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${aba === k ? '#3b82f6' : 'transparent'}`,
              color: aba === k ? '#3b82f6' : '#4a6080',
              fontWeight: aba === k ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: 11,
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
        {/* STATUS */}
        {aba === 'status' && (
          <div>
            <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 2, marginBottom: 14 }}>
              STATUS EM TEMPO REAL
            </div>
            {PRESTADORES.map((prest) => (
              <StatusCard
                key={prest}
                prestador={prest}
                pedidoAtivo={pedidoAtivoDe(prest)}
                fila={filaDe(prest)}
              />
            ))}
            <div
              style={{ fontSize: 11, color: '#4a6080', letterSpacing: 2, margin: '18px 0 10px' }}
            >
              TODOS OS PEDIDOS ATIVOS
            </div>
            {pedidos.filter((p) => p.status !== 'concluido' && p.status !== 'cancelado')
              .length === 0 && (
              <div style={{ textAlign: 'center', color: '#253040', padding: 30, fontSize: 13 }}>
                Nenhum pedido em andamento.
              </div>
            )}
            {pedidos
              .filter((p) => p.status !== 'concluido' && p.status !== 'cancelado')
              .map((p) => (
                <CardPedido
                  key={p.id}
                  pedido={p}
                  papel="solicitante"
                  prestadorOcupado={false}
                  onCancelar={onCancelar}
                />
              ))}
          </div>
        )}

        {/* MEUS PEDIDOS */}
        {aba === 'meus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {meus.length === 0 && (
              <div style={{ textAlign: 'center', color: '#253040', padding: 50, fontSize: 13 }}>
                Você ainda não fez pedidos.
              </div>
            )}
            {meus.map((p) => (
              <CardPedido
                key={p.id}
                pedido={p}
                papel="solicitante"
                prestadorOcupado={false}
                onCancelar={onCancelar}
              />
            ))}
          </div>
        )}

        {/* NOVO PEDIDO */}
        {aba === 'novo' && (
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #1c2535',
              borderRadius: 14,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 11, letterSpacing: 2, color: '#4a6080', marginBottom: 18 }}>
              NOVO PEDIDO DE SERVIÇO
            </div>

            {/* Destino */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 8 }}>
                SOLICITAR PARA
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {PRESTADORES.map((pr) => (
                  <button
                    key={pr}
                    onClick={() => { setPara(pr); setTarefa('') }}
                    style={{
                      flex: 1,
                      padding: '12px 0',
                      borderRadius: 10,
                      border: `2px solid ${para === pr ? '#3b82f6' : '#1c2535'}`,
                      background: para === pr ? '#0d1829' : '#060a10',
                      color: para === pr ? '#3b82f6' : '#4a6080',
                      fontWeight: para === pr ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontFamily: MONO,
                      fontSize: 13,
                      letterSpacing: 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {pr === 'Motorista' ? '🚗 Motorista' : '🔧 Manutenção'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tarefas rápidas */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 8 }}>
                TAREFAS RÁPIDAS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {TAREFAS_RAPIDAS[para].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTarefa(t)}
                    style={{
                      background: tarefa === t ? '#0d1829' : '#060a10',
                      border: `1px solid ${tarefa === t ? '#3b82f6' : '#1c2535'}`,
                      color: tarefa === t ? '#3b82f6' : '#4a6080',
                      borderRadius: 20,
                      padding: '5px 12px',
                      fontSize: 11,
                      cursor: 'pointer',
                      fontFamily: MONO,
                      transition: 'all 0.15s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Descrição */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 6 }}>
                DESCRIÇÃO
              </div>
              <textarea
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
                placeholder="Descreva o serviço necessário..."
                rows={3}
                style={{ ...INPUT_STYLE, resize: 'vertical' }}
              />
            </div>

            {/* Obs */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 6 }}>
                OBSERVAÇÃO{' '}
                <span style={{ color: '#253040' }}>(opcional)</span>
              </div>
              <input
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                placeholder="Ex: levar para o corredor B..."
                style={INPUT_STYLE}
              />
            </div>

            {/* Prioridade */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, color: '#4a6080', letterSpacing: 1, marginBottom: 8 }}>
                PRIORIDADE
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {Object.entries(PRIO).map(([label, p]) => (
                  <button
                    key={label}
                    onClick={() => setPrio(label)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: 8,
                      border: `2px solid ${prio === label ? p.cor : '#1c2535'}`,
                      background: prio === label ? p.bg : '#060a10',
                      color: p.cor,
                      fontWeight: prio === label ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <AcaoBtn cor="#253040" onClick={() => setAba('status')}>
                CANCELAR
              </AcaoBtn>
              <button
                onClick={enviar}
                disabled={!tarefa.trim()}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 8,
                  background: tarefa.trim()
                    ? 'linear-gradient(135deg,#1d4ed8,#3b82f6)'
                    : '#090d14',
                  border: `1px solid ${tarefa.trim() ? '#3b82f6' : '#1c2535'}`,
                  color: tarefa.trim() ? '#fff' : '#253040',
                  fontWeight: 'bold',
                  cursor: tarefa.trim() ? 'pointer' : 'not-allowed',
                  fontSize: 13,
                  letterSpacing: 2,
                  fontFamily: MONO,
                  transition: 'all 0.2s',
                }}
              >
                🚀 ENVIAR PEDIDO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
