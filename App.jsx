import { useState } from 'react'
import { uid, agora, playBeep } from './data.js'
import TelaLogin from './pages/TelaLogin.jsx'
import PainelSolicitante from './pages/PainelSolicitante.jsx'
import PainelPrestador from './pages/PainelPrestador.jsx'

export default function App() {
  const [usuario, setUsuario] = useState(null)
  const [pedidos, setPedidos] = useState([])

  function novoPedido({ de, para, tarefa, prio, obs }) {
    const ocupado = pedidos.some((p) => p.para === para && p.status === 'aceito')
    const status = ocupado ? 'fila' : 'pendente'
    const p = {
      id: uid(),
      de,
      para,
      tarefa,
      prioridade: prio,
      obs,
      status,
      hora: agora(),
      novoAlerta: !ocupado,
      solicitante: de,
    }
    setPedidos((prev) => [p, ...prev])
    if (!ocupado)
      playBeep(prio === 'Crítico' ? 'critico' : prio === 'Urgente' ? 'urgente' : 'normal')
  }

  function aceitar(id) {
    setPedidos((prev) => {
      // Marca o pedido como aceito
      const updated = prev.map((p) => {
        if (p.id === id)
          return { ...p, status: 'aceito', novoAlerta: false, aceitorPor: usuario.setor, aceitoAs: agora() }
        return p
      })
      // Move os demais pendentes do mesmo prestador para fila
      const aceito = updated.find((p) => p.id === id)
      return updated.map((p) => {
        if (p.id === id) return p
        if (p.para === aceito.para && p.status === 'pendente')
          return { ...p, status: 'fila', novoAlerta: false }
        return p
      })
    })
  }

  function concluir(id) {
    setPedidos((prev) => {
      const pedido = prev.find((p) => p.id === id)
      const updated = prev.map((p) => {
        if (p.id === id)
          return { ...p, status: 'concluido', novoAlerta: false, concluidoAs: agora() }
        return p
      })
      // Promove o próximo da fila
      const fila = updated
        .filter((p) => p.para === pedido.para && p.status === 'fila')
        .sort((a, b) => a.id - b.id)
      if (fila.length > 0) {
        playBeep('normal')
        return updated.map((p) =>
          p.id === fila[0].id ? { ...p, status: 'pendente', novoAlerta: true } : p
        )
      }
      return updated
    })
  }

  function cancelar(id) {
    setPedidos((prev) => {
      const pedido = prev.find((p) => p.id === id)
      const updated = prev.map((p) =>
        p.id === id ? { ...p, status: 'cancelado', novoAlerta: false } : p
      )
      // Se estava na fila, promove próximo
      if (pedido.status === 'fila') {
        const fila = updated
          .filter((p) => p.para === pedido.para && p.status === 'fila')
          .sort((a, b) => a.id - b.id)
        if (fila.length > 0)
          return updated.map((p) =>
            p.id === fila[0].id ? { ...p, status: 'pendente', novoAlerta: true } : p
          )
      }
      return updated
    })
  }

  if (!usuario) return <TelaLogin onLogin={setUsuario} />

  if (usuario.papel === 'solicitante')
    return (
      <PainelSolicitante
        usuario={usuario}
        pedidos={pedidos}
        onNovo={novoPedido}
        onCancelar={cancelar}
        onLogout={() => setUsuario(null)}
      />
    )

  return (
    <PainelPrestador
      usuario={usuario}
      pedidos={pedidos}
      onAceitar={aceitar}
      onConcluir={concluir}
      onLogout={() => setUsuario(null)}
    />
  )
}
