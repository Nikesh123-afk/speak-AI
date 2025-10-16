export function TestApp() {
  return (
    <div style={{
      padding: '50px',
      fontFamily: 'Arial',
      background: '#4CAF50',
      color: 'white',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px' }}>✅ TEST SUCCESS!</h1>
      <p style={{ fontSize: '24px' }}>If you see this, React is working!</p>
      <p>Server: Running ✅</p>
      <p>Build: Working ✅</p>
      <p>React: Rendering ✅</p>
    </div>
  )
}
