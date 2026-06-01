import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { SETORES_SOLICITANTES, PRESTADORES, SENHAS, MONO, INPUT_STYLE } from '../data.js'
import usePulse from '../hooks/usePulse.js'

export default function TelaLogin({ onLogin }) {
  const [tipo, setTipo] = useState(null)
  const [setor, setSetor] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const on = usePulse(1200)

  useEffect(() => {
    if (tipo === 'solicitante') setSetor(SETORES_SOLICITANTES[0])
    if (tipo === 'prestador') setSetor(PRESTADORES[0])
  }, [tipo])

  function entrar() {
    if (SENHAS[setor] === senha) {
      setErro('')
      onLogin({ setor, papel: tipo })
    } else {
      setErro('Senha incorreta.')
    }
  }

  const opcoes = tipo === 'solicitante' ? SETORES_SOLICITANTES : PRESTADORES

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07090e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: MONO,
        padding: 20,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <img
          src={logo}
          alt="Ybera Tasks"
          style={{
            width: 110,
            height: 110,
            borderRadius: 24,
            boxShadow: '0 0 40px #ffffff15, 0 0 80px #3b82f610',
          }}
        />
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            letterSpacing: 4,
            color: '#4a6080',
            opacity: on ? 1 : 0.3,
            transition: 'opacity 0.8s',
          }}
        >
          SISTEMA INTERNO DE PEDIDOS
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          background: '#0d1117',
          border: '1px solid #1c2535',
          borderRadius: 16,
          padding: 28,
          width: '100%',
          maxWidth: 370,
          boxShadow: '0 0 40px #3b82f608',
        }}
      >
        {!tipo ? (
          <>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: '#4a6080',
                textAlign: 'center',
                marginBottom: 18,
              }}
            >
              SELECIONE SEU TIPO DE ACESSO
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  k: 'solicitante',
                  icon: '🏭',
                  title: 'SETOR SOLICITANTE',
                  sub: 'Manipulação, Produção, Estoques...',
                },
                {
                  k: 'prestador',
                  icon: '⚙️',
                  title: 'PRESTADOR DE SERVIÇO',
                  sub: 'Motorista ou Manutenção',
                },
              ].map(({ k, icon, title, sub }) => (
                <button
                  key={k}
                  onClick={() => setTipo(k)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a3a55')}
                  style={{
                    background: '#090d14',
                    border: '1px solid #2a3a55',
                    color: '#e2eaf4',
                    borderRadius: 10,
                    padding: '15px 18px',
                    cursor: 'pointer',
                    fontFamily: MONO,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <span style={{ fontSize: 26 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 13, letterSpacing: 1 }}>{title}</div>
                    <div style={{ fontSize: 11, color: '#4a6080', marginTop: 2 }}>{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => { setTipo(null); setSenha(''); setErro('') }}
              style={{
                background: 'none',
                border: 'none',
                color: '#4a6080',
                cursor: 'pointer',
                fontSize: 12,
                marginBottom: 14,
                fontFamily: MONO,
                letterSpacing: 1,
                padding: 0,
              }}
            >
              ← VOLTAR
            </button>

            <div style={{ fontSize: 11, letterSpacing: 2, color: '#4a6080', marginBottom: 18 }}>
              {tipo === 'solicitante' ? 'ACESSO: SETOR SOLICITANTE' : 'ACESSO: PRESTADOR DE SERVIÇO'}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 11,
                  color: '#4a6080',
                  letterSpacing: 1,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {tipo === 'solicitante' ? 'SETOR' : 'FUNÇÃO'}
              </label>
              <select
                value={setor}
                onChange={(e) => { setSetor(e.target.value); setSenha(''); setErro('') }}
                style={INPUT_STYLE}
              >
                {opcoes.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontSize: 11,
                  color: '#4a6080',
                  letterSpacing: 1,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                SENHA DO SETOR
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro('') }}
                onKeyDown={(e) => e.key === 'Enter' && entrar()}
                placeholder="••••••••"
                style={INPUT_STYLE}
              />
              {erro && (
                <div style={{ color: '#f43f5e', fontSize: 12, marginTop: 6 }}>⚠ {erro}</div>
              )}
            </div>

            <button
              onClick={entrar}
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 8,
                background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
                border: '1px solid #3b82f6',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 13,
                letterSpacing: 2,
                fontFamily: MONO,
              }}
            >
              ENTRAR →
            </button>

            <div style={{ marginTop: 12, fontSize: 11, color: '#253040', textAlign: 'center' }}>
              senha demo:{' '}
              <span style={{ color: '#4a6080' }}>{SENHAS[setor] || '—'}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
