import { useState } from 'react'
import reactLogo from './assets/react.svg'
import fakeData from './fake.json'
import styled from 'styled-components'

import { prettyPrintJson } from 'pretty-print-json'

const parseParamToJson = (param: string) => {
  let parsable = param
  if (param === undefined) {
    return ``
  }
  if (param[0] === `"`) {
    parsable = param.slice(1, -1)
  }
  // else {
  //   const [identifier, innerParam] = param.split(`/`)
  //   parsable = JSON.parse(innerParam)
  // }
  return prettyPrintJson.toHtml(parsable)
}

const Container = styled.div`
  .json-key {
    color: ${({ theme }) => theme.key};
  }
  .json-string {
    color: ${({ theme }) => theme.string};
  }
  .json-number {
    color: ${({ theme }) => theme.number};
  }
  .json-boolean {
    color: ${({ theme }) => theme.boolean};
  }
  .json-null {
    color: ${({ theme }) => theme.null};
  }
  .json-mark {
    color: ${({ theme }) => theme.mark};
  }
  .json-link {
    color: ${({ theme }) => theme.link};
  }
`

const cutData = (data: string) => {
  const sections = []
  let sliceStart = 0
  for (let i = 0; i < data.length; i++) {
    console.log('loop')

    let count = 0
    if (data[i] === '{') {
      sliceStart = i
      console.log('{', data[i])
      while (count > 0 && i < data.length) {
        console.log('loopyloop')
        if (data[i] === '{') {
          count++
        } else if (data[i] === '}') {
          count--
        }
        console.log('yyououhi', { i, sliceStart })
        i++
      }

      sections.push(data.slice(sliceStart, i))
    }
    i++
  }
  console.log(sections)
}

function App() {
  const data = cutData(JSON.stringify(fakeData))

  return (
    <Container>
      <pre>
        <output
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(data, { indent: 2 }),
          }}
        />
      </pre>
    </Container>
  )
}

export default App
