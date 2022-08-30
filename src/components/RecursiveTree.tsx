import type { FC } from 'react'
import React, { Fragment, useState } from 'react'

import { atom, useRecoilState } from 'recoil'
import styled from 'styled-components'
import { devItemIsOpenState, localStorageEffect } from '../App'

// import * as Styled from './Styles'
import {
  Mark,
  Null,
  Undefined,
  String,
  Number,
  Boolean,
  Key,
  Link,
  Text,
  Box,
} from '../styles/Styles'

const RecursiveTree: FC<{ contents: any; branchName: string }> = ({
  contents,
  branchName,
}) => {
  const [isOpen, toggleItemOpen] = useRecoilState(devItemIsOpenState)

  const createTree = (branch: any, dir: string) => {
    // handle array
    const branchIsArray = Array.isArray(branch)
    const branchIsObject = typeof branch === `object`
    if (branchIsArray) {
      return (
        <>
          <Mark>[</Mark>
          {branch.map((item: any, index: number) => {
            return (
              <Box border="gray" key={dir + index}>
                {createTree(item, `${dir}/${index}`)}
              </Box>
            )
          })}
          <Mark>]</Mark>
        </>
      )
    }

    // handle other
    if (branch === null) {
      return <Null>null</Null>
    }
    if (branch === undefined) {
      return <Undefined>undefined</Undefined>
    }
    if (branch instanceof Date) {
      return <String>{branch.toString()}</String>
    }

    // handle object
    if (branchIsObject) {
      const result = Object.keys(branch).map((key) => ({
        key: key,
        branch: branch[key],
      }))

      // handle object with nested objects
      return (
        <>
          <Mark style={{ display: `inline-block` }}>{`{`}</Mark>
          {result.map((item, index) => {
            const itemIsObject = typeof item.branch === `object`
            const itemIsArray = Array.isArray(item.branch)

            const currentDir = `${dir}/${item.key}`

            // handle item in object with nested objects
            if ((itemIsObject || itemIsArray) && item.branch) {
              return (
                <Box border="orange" key={currentDir + 'obj/array'}>
                  <Key
                    title={currentDir}
                    style={{ cursor: `pointer` }}
                    onClick={() =>
                      toggleItemOpen((prev) => ({
                        ...prev,
                        [currentDir]: !prev[currentDir],
                      }))
                    }
                  >
                    <Mark>
                      {Array.isArray(item.branch)
                        ? `[${item.branch.length}]`
                        : `{${Object.keys(item.branch).length}}`}
                      {` `}
                    </Mark>
                    {item.key}
                    {isOpen[currentDir] && <Mark>:</Mark>}
                  </Key>
                  <span style={{ paddingLeft: `12px` }}>
                    {isOpen[currentDir] && createTree(item.branch, currentDir)}
                  </span>
                </Box>
              )
            }

            let Inner = <span></span>
            // handle other
            if (item.branch === null) {
              Inner = <Null>null</Null>
            } else if (item.branch === undefined) {
              Inner = <Undefined>undefined</Undefined>
            } else if (item.branch instanceof Date) {
              Inner = <String>{branch.toString()}</String>
            } else {
              Inner = (
                <span className={`json-${typeof item.branch}`}>
                  {typeof item.branch === `string`
                    ? `"${item.branch.toString()}"`
                    : item.branch.toString()}
                </span>
              )
            }
            // handle item in object with no nested objects
            return (
              <Box border="green" key={currentDir + 'no-nested'}>
                <p>
                  <Key>{item.key}</Key>
                  <Mark>:</Mark>
                  {` `}
                  {Inner}
                  <Mark>{index !== result.length - 1 && `,`}</Mark>
                </p>
              </Box>
            )
          })}
          <Mark>{`}`}</Mark>
        </>
      )
    }

    // non-object, non-array. aka is a "primitive"
    return (
      <span>
        <span className={`json-${typeof branch}`}>
          {typeof branch === `string`
            ? `"${branch.toString()}"`
            : branch.toString()}
        </span>
        {/* <Mark>{`,`}</Mark> */}
      </span>
    )
  }

  return (
    <span style={{ paddingLeft: `10px` }}>
      {createTree(contents, branchName)}
    </span>
  )
}

export default RecursiveTree
