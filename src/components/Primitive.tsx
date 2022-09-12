import type { FC } from "react"

import { Null, Undefined, String, Number, Boolean, Text } from "../styles/Styles"

const Primitive: FC<{ data: unknown }> = ({ data }) => {
  if (data === null) {
    return <Null>null</Null>
  }
  if (data === undefined) {
    return <Undefined>undefined</Undefined>
  }
  if (data instanceof Date) {
    return <String>{data.toString()}</String>
  }
  if (typeof data === `string`) {
    return <String>{`"${data}"`}</String>
  }
  if (typeof data === `number`) {
    return <Number>{data}</Number>
  }
  if (typeof data === `boolean`) {
    return <Boolean>{data ? `true` : `false`}</Boolean>
  }
  return <Text>unknown</Text>
}

export default Primitive
