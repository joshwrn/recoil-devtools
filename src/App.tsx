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

const copyName = (data: string) => {}

const cutData = (data: string[]) => {
  const sections = []
  const names = []
  let sliceStart = 0
  for (let index = 2; index < data.length; index++) {
    const letter = data[index]

    // copy name
    let name = ''
    if (letter === `:`) {
      let i = index
      while (data[i] !== `,` && i > 0) {
        name += data[i]
        i--
      }
      names.push(name.split('').reverse().join(''))
      name = ''
    }

    // copy object
    if (letter === '{') {
      sliceStart = index
      for (let i = index; i < data.length; i++) {
        if (data[i] === '}') {
          const nextLetter = data[i + 1]
          const amount = nextLetter === ',' ? 2 : 1
          sections.push(
            data.splice(sliceStart, i - sliceStart + amount).join('')
          )
          index = sliceStart - amount
          break
        }
      }
    }
  }
  console.log({ names, sections })
  return data.join('')
}

function App() {
  const stringData = JSON.stringify(fakeData)

  const data = cutData([...stringData])

  return (
    <Container>
      <pre>
        <output
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(JSON.parse(data), {
              indent: 2,
            }),
          }}
        />
      </pre>
    </Container>
  )
}

export default App
