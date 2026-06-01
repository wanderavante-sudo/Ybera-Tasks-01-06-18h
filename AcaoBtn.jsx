import { useState } from 'react'
import { MONO } from '../data.js'

export default function AcaoBtn({ children, onClick, cor }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? cor : cor + '22',
        border: `1px solid ${cor}`,
        color: h ? '#fff' : cor,
        borderRadius: 8,
        padding: '7px 12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 11,
        letterSpacing: 1,
        fontFamily: MONO,
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}
