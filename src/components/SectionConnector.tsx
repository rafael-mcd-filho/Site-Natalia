type Bg = 'white' | 'bege-creme' | 'bege' | 'bege-quente'

const bgMap: Record<Bg, string> = {
  'white': '#FFFFFF',
  'bege-creme': '#FAF5EE',
  'bege': '#F2E6D8',
  'bege-quente': '#EDE0CC',
}

export default function SectionConnector({ from, to }: { from: Bg; to: Bg }) {
  // Se as duas seções têm a mesma cor, o conector exibe o ornamento centralizado
  // Se são diferentes, é um gradiente que faz a transição
  const same = from === to

  if (same) {
    return (
      <div style={{
        background: bgMap[from],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, padding: '4px 0', lineHeight: 0,
      }}>
        <div style={{ width: 36, height: 1, background: '#DCD0BF' }} />
        <span style={{ fontSize: 7, color: '#B8935A', lineHeight: 1 }}>◆</span>
        <div style={{ width: 36, height: 1, background: '#DCD0BF' }} />
      </div>
    )
  }

  // Transição gradual entre cores diferentes
  return (
    <div style={{
      height: 48,
      background: `linear-gradient(to bottom, ${bgMap[from]}, ${bgMap[to]})`,
    }} />
  )
}
