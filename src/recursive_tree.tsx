import type { FC } from 'react'
import React, { Fragment, useState } from 'react'

import { atom, useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  devItemIsOpenState,
  localStorageEffect,
} from './DevTools/DebugInspector'

const DEBUG = false

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
          <span className="json-mark">[</span>
          {branch.map((item: any, index: number) => {
            return (
              <div
                style={{
                  paddingLeft: `25px`,
                  border: DEBUG ? `1px solid gray` : ``,
                }}
                key={dir + index}
              >
                {createTree(item, `${dir}/${index}`)}
              </div>
            )
          })}
          <span className="json-mark">]</span>
        </>
      )
    }

    // handle other
    if (branch === null) {
      return <span className="json-null">null</span>
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
          <span
            className="json-mark"
            style={{ display: `inline-block` }}
          >{`{`}</span>
          {result.map((item, index) => {
            const itemIsObject = typeof item.branch === `object`
            const itemIsArray = Array.isArray(item.branch)

            const currentDir = `${dir}/${item.key}`

            // handle item in object with nested objects and open
            if (
              (itemIsObject || itemIsArray) &&
              item.branch &&
              isOpen[currentDir]
            ) {
              return (
                <div
                  style={{
                    paddingLeft: `25px`,
                    border: DEBUG ? `1px solid orange` : ``,
                  }}
                  key={currentDir + 'open'}
                >
                  <span
                    className="json-key"
                    title={currentDir}
                    style={{ cursor: `pointer` }}
                    onClick={() =>
                      toggleItemOpen((prev) => ({
                        ...prev,
                        [currentDir]: false,
                      }))
                    }
                  >
                    <span className="json-mark">
                      {Array.isArray(item.branch)
                        ? `[${item.branch.length}]`
                        : `{${Object.keys(item.branch).length}}`}
                      {` `}
                    </span>
                    {item.key}
                    <span className="json-mark">:</span>
                  </span>
                  <span style={{ paddingLeft: `12px` }}>
                    {createTree(item.branch, currentDir)}
                  </span>
                </div>
              )
            }

            // handle item in object with nested objects and closed
            if (
              (itemIsObject || itemIsArray) &&
              item.branch &&
              !isOpen[currentDir]
            ) {
              return (
                <div
                  style={{
                    paddingLeft: `25px`,
                    border: DEBUG ? `1px solid blue` : ``,
                  }}
                  key={currentDir + 'closed'}
                >
                  <p
                    className="json-key"
                    style={{ cursor: 'pointer' }}
                    title={currentDir}
                    onClick={() =>
                      toggleItemOpen((prev) => ({
                        ...prev,
                        [currentDir]: true,
                      }))
                    }
                  >
                    <span className="json-mark">
                      {Array.isArray(item.branch)
                        ? `[${item.branch.length}]`
                        : `{${Object.keys(item.branch).length}}`}
                      {` `}
                    </span>
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
                key={currentDir + 'no-nested'}
              >
                <p>
                  <span className="json-key">{item.key}</span>
                  <span className="json-mark">:</span>
                  {` `}
                  {Inner}
                  <span className="json-mark">
                    {index !== result.length - 1 && `,`}
                  </span>
                </p>
              </div>
            )
          })}
          <span className="json-mark">{`}`}</span>
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

  return (
    <span style={{ paddingLeft: `10px` }}>
      {createTree(contents, branchName)}
    </span>
  )
}

export default RecursiveTree
