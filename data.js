export const SETORES_SOLICITANTES = [
  'Manipulação',
  'Produção',
  'Estoque G0',
  'Estoque G1',
  'Estoque G9',
  'Manutenção',
]

export const PRESTADORES = ['Motorista', 'Manutenção']

export const SENHAS = {
  Manipulação: 'manip123',
  Produção: 'prod123',
  'Estoque G0': 'g0123',
  'Estoque G1': 'g1123',
  'Estoque G9': 'g9123',
  Manutenção: 'manut123',
  Motorista: 'moto123',
}

export const TAREFAS_RAPIDAS = {
  Motorista: [
    'Pesagem de matéria prima',
    'Buscar insumos no estoque',
    'Transportar baldes sujos p/ lavagem',
    'Levar produto acabado',
    'Buscar embalagens',
    'Coleta de resíduos',
    'Entrega interna de materiais',
  ],
  Manutenção: [
    'Equipamento com defeito',
    'Vazamento identificado',
    'Troca de peça',
    'Calibração de equipamento',
    'Elétrica / curto-circuito',
    'Manutenção preventiva',
    'Reparo urgente de máquina',
  ],
}

export const PRIO = {
  Normal: { cor: '#38bdf8', bg: '#0c1a2e', borda: '#1e4a7a' },
  Urgente: { cor: '#fb923c', bg: '#1c0e04', borda: '#7c3a10' },
  Crítico: { cor: '#f43f5e', bg: '#1c0408', borda: '#7c1020' },
}

export const MONO = "'DM Mono','Courier New',monospace"

export const C = {
  bg: '#07090e',
  surface: '#0d1117',
  border: '#1c2535',
  borderHi: '#2a3a55',
  text: '#e2eaf4',
  muted: '#4a6080',
  dim: '#253040',
  accent: '#3b82f6',
  purple: '#a78bfa',
  green: '#34d399',
  orange: '#fb923c',
  red: '#f43f5e',
}

export const INPUT_STYLE = {
  background: '#060a10',
  border: '1px solid #1c2535',
  color: '#e2eaf4',
  borderRadius: 8,
  padding: '10px 13px',
  fontSize: 14,
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: MONO,
  outline: 'none',
}

let _id = 100
export const uid = () => ++_id
export const agora = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

export function playBeep(tipo = 'normal') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const freqs =
      tipo === 'critico'
        ? [1046, 1318, 1046, 1318]
        : tipo === 'urgente'
        ? [880, 1108, 880]
        : [660, 880]
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g)
      g.connect(ctx.destination)
      o.frequency.value = f
      o.type = 'sine'
      const t = ctx.currentTime + i * 0.22
      g.gain.setValueAtTime(0.35, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
      o.start(t)
      o.stop(t + 0.2)
    })
  } catch (_) {}
}

export function statusInfo(s) {
  if (s === 'pendente') return { label: 'AGUARDANDO', icon: '⏳', cor: '#fb923c' }
  if (s === 'fila') return { label: 'NA FILA', icon: '🕐', cor: '#4a6080' }
  if (s === 'aceito') return { label: 'EM ANDAMENTO', icon: '⚙️', cor: '#a78bfa' }
  if (s === 'concluido') return { label: 'CONCLUÍDO', icon: '✅', cor: '#34d399' }
  if (s === 'cancelado') return { label: 'CANCELADO', icon: '❌', cor: '#253040' }
  return { label: s, icon: '•', cor: '#4a6080' }
}
