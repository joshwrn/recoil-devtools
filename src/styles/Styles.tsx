import styled from "styled-components"

const DEBUG = false

export const Box = styled.div<{ border?: string }>`
  padding-left: 25px;
  ${({ border }) =>
    DEBUG ? `border: 1px solid ${border ?? `transparent`} !important;` : ``}
`

export const Mark = styled.span`
  color: ${({ theme }) => theme.mark};
`
export const Null = styled.span`
  color: ${({ theme }) => theme.null};
`
export const Undefined = styled.span`
  color: ${({ theme }) => theme.null};
`
export const String = styled.span`
  color: ${({ theme }) => theme.string};
`
export const Number = styled.span`
  color: ${({ theme }) => theme.number};
`
export const Boolean = styled.span`
  color: ${({ theme }) => theme.boolean};
`
export const Key = styled.span`
  color: ${({ theme }) => theme.key};
`
export const Link = styled.span`
  color: ${({ theme }) => theme.link};
`
export const Text = styled.span`
  color: ${({ theme }) => theme.text};
`
