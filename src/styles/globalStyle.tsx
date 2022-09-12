import { css } from "styled-components"

export const globalStyle = css`
  * {
    margin: 0;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    ::-webkit-scrollbar {
      width: 8px;
      height: 0;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.faintOutline};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.faintText};
    }
    ::-webkit-scrollbar-corner {
      background: ${({ theme }) => theme.background};
    }
  }
`
