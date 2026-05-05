'use client'

import { useEffect, useState } from 'react'

interface Props {
  words: string[]
  interval?: number
  className?: string
  style?: React.CSSProperties
}

export default function WordRotate({ words, interval = 2800, className, style }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('exit')
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setPhase('enter')
      }, 320)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span
      className={`word-rotate word-rotate--${phase} ${className || ''}`}
      style={style}
    >
      {words[index]}
    </span>
  )
}
