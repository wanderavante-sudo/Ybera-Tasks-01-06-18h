import { useState, useEffect } from 'react'

export default function usePulse(ms = 600) {
  const [v, setV] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setV((x) => !x), ms)
    return () => clearInterval(t)
  }, [ms])
  return v
}
