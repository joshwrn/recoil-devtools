import type { FC } from 'react'
import React, { Fragment, useState } from 'react'

import { atom, useRecoilState } from 'recoil'
import styled from 'styled-components'

export interface RecursiveTreeProps {
  readonly listMeta: any
}

const DEBUG = false

interface Storage {
  [key: string]: boolean
}

const devItemIsOpenState = atom<Storage>({
  key: `devItemIsOpenState`,
  default: {},
})

const nullState = atom<null>({
  key: `nullState`,
  default: null,
})

const RecursiveTree: FC<{ contents: any }> = ({ contents }) => {
  const [isOpen, toggleItemOpen] = useRecoilState(devItemIsOpenState)
  const [nullStateValue, setNullStateValue] = useRecoilState(nullState)
  const createTree = (branch: any) => {
    // handle array
    const branchIsArray = Array.isArray(branch)
    const branchIsObject = typeof branch === `object`
    if (branchIsArray) {
      return (
        <>
          <span style={{ display: `inline-block` }}>[</span>
          {branch.map((branch: any, index: number) => {
            return (
              <div
                style={{
                  paddingLeft: `25px`,
                  border: DEBUG ? `1px solid gray` : ``,
                }}
                key={branch.id}
              >
                {createTree(branch)}
              </div>
            )
          })}
          ]
        </>
      )
    }

    // handle other
    if (branch === null) {
      return <span className={`json-null`}>null</span>
    }
    if (branch === undefined) {
      return <span className="json-undefined">undefined</span>
    }
    if (branch instanceof Date) {
      return <span className="json-string">{branch.toString()}</span>
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
          <span style={{ display: `inline-block` }}>{`{`}</span>
          {result.map((item, index) => {
            // handle item in object with nested objects and open
            const itemIsObject = typeof item.branch === `object`
            const itemIsArray = Array.isArray(item.branch)

            if (
              (itemIsObject || itemIsArray) &&
              item.branch &&
              isOpen[item.key]
            ) {
              return (
                <div
                  style={{
                    paddingLeft: `25px`,
                    border: DEBUG ? `1px solid orange` : ``,
                  }}
                  key={item.key}
                >
                  <span
                    className="json-key"
                    style={{ fontWeight: `bold` }}
                    onClick={() =>
                      toggleItemOpen((prev) => ({ ...prev, [item.key]: false }))
                    }
                  >
                    {Array.isArray(item.branch)
                      ? `[ ${item.branch.length} ]`
                      : `{ ${Object.keys(item.branch).length} }`}
                    {` `}
                    {item.key}:
                  </span>
                  <span style={{ paddingLeft: `12px` }}>
                    {createTree(item.branch)}
                  </span>
                </div>
              )
            }

            // handle item in object with nested objects and closed
            if (
              (itemIsObject || itemIsArray) &&
              item.branch &&
              !isOpen[item.key]
            ) {
              return (
                <div
                  style={{
                    paddingLeft: `25px`,
                    border: DEBUG ? `1px solid blue` : ``,
                  }}
                  key={item.key}
                >
                  <p
                    className="json-key"
                    style={{ fontWeight: `bold` }}
                    onClick={() =>
                      toggleItemOpen((prev) => ({ ...prev, [item.key]: true }))
                    }
                  >
                    {Array.isArray(item.branch)
                      ? `[${item.branch.length}]`
                      : `{${Object.keys(item.branch).length}}`}
                    {` `}
                    {item.key}
                  </p>
                </div>
              )
            }

            let Inner = <span></span>
            // handle other
            if (item.branch === null) {
              Inner = <span className={`json-null`}>null</span>
            } else if (item.branch === undefined) {
              Inner = <span className="json-undefined">undefined</span>
            } else if (item.branch instanceof Date) {
              Inner = <span className="json-string">{branch.toString()}</span>
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
              <div
                style={{
                  paddingLeft: `25px`,
                  border: DEBUG ? `1px solid green` : ``,
                }}
                key={item.key}
              >
                <p>
                  <span className="json-key">{item.key}</span>:{` `}
                  {Inner}
                  <span className="json-mark">
                    {index !== result.length - 1 && `,`}
                  </span>
                </p>
              </div>
            )
          })}
          {`}`}
        </>
      )
    }

    // non-object, non-array. aka is a "primitive"
    return (
      <span>
        <span
          style={{ border: DEBUG ? `1px solid tan` : `` }}
          className={`json-${typeof branch}`}
        >
          {typeof branch === `string`
            ? `"${branch.toString()}"`
            : branch.toString()}
        </span>
        {/* <span className="json-mark">{`,`}</span> */}
      </span>
    )
  }

  return <span style={{ paddingLeft: `10px` }}>{createTree(contents)}</span>
}

export default RecursiveTree
