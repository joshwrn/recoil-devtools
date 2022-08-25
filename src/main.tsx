import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'

const theme = {
  key: `#d2a8ff`,
  string: `#70c6f0`,
  number: `#ff7b72`,
  boolean: `#68c0ff`,
  null: `#68c0ff`,
  mark: `#c9d1d9`,
  link: `#c9d1d9`,
  text: `#c9d1d9`,
  primaryText: `#c9d1d9`,
  faintText: `#a5a5a5`,
  headerBackground: `#161b22`,
  faintOutline: `#30363d`,
  background: `#0d1117`,
  iconBackground: `#30363d`,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
