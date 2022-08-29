import React, { Fragment, useState } from 'react'

import { atom, useRecoilState } from 'recoil'
import styled from 'styled-components'

interface TreeItemProps {
  readonly id: string
  readonly label: string
  readonly isSelected: boolean | undefined
  readonly children: JSX.Element
  readonly isOpen: any
  readonly toggleItemOpen: any
}

export interface RecursiveTreeProps {
  readonly listMeta: any
}

const TreeItem = ({
  label,
  isSelected,
  children,
  toggleItemOpen,
  isOpen,
}: TreeItemProps) => {
  return (
    <div>
      <StyledTreeItem
        className="json-key"
        style={{
          opacity: isOpen[label] ? 1 : 0.75,
          border: `1px solid orange`,
        }}
      >
        <div
          style={{ paddingLeft: `25px` }}
          onClick={() =>
            toggleItemOpen((prev: any) => ({
              ...prev,
              [label]: !prev[label],
            }))
          }
        >
          {<p className="json-text">{isOpen[label] ? `(-)` : `(+)`}</p>}
        </div>
        <StyledLabel>{label}</StyledLabel>
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen[label] && children}</StyledTreeChildren>
    </div>
  )
}

const checkIfItemIs = (item: any, checkFor: string[]) => {
  const checks = []

  if (checkFor.includes(`object`)) {
    checks.push(typeof item === `object`)
  }
  if (checkFor.includes(`array`)) {
    checks.push(Array.isArray(item))
  }
  if (checkFor.includes(`string`)) {
    checks.push(typeof item === `string`)
  }
  if (checkFor.includes(`number`)) {
    checks.push(typeof item === `number`)
  }
  if (checkFor.includes(`date`)) {
    checks.push(item instanceof Date)
  }

  return checks.some((check) => check)
}

const devItemIsOpenState = atom({
  key: `devItemIsOpenState`,
  default: {},
})

const RecursiveTree = ({ listMeta }: RecursiveTreeProps) => {
  const [isOpen, toggleItemOpen] = useRecoilState(devItemIsOpenState)
  const createTree = (branch: any) => {
    // handle array
    if (checkIfItemIs(branch, [`array`])) {
      return (
        <>
          [
          {branch.map((branch: any, index: number) => {
            return (
              <div
                style={{ paddingLeft: `25px`, border: `1px solid gray` }}
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
      return <p className={`json-null`}>null</p>
    }
    if (branch === undefined) {
      return <p className="json-undefined">undefined</p>
    }
    if (branch instanceof Date) {
      return <p className="json-string">{branch.toString()}</p>
    }

    // handle object
    if (checkIfItemIs(branch, [`object`])) {
      const result = Object.keys(branch).map((key) => ({
        key: key,
        branch: branch[key],
      }))
      const anyBranches = result.some((item) =>
        checkIfItemIs(item.branch, [`object`, `array`])
      )

      // handle object with no nested objects
      if (!anyBranches) {
        return (
          <div>
            {result.map((item, index) => (
              <Fragment key={item.key}>
                {index === 0 ? `{` : ``}
                <div
                  style={{ paddingLeft: `25px`, border: `1px solid purple` }}
                  key={item.key}
                >
                  <span className="json-key">{item.key}</span>
                  <span>{`: `}</span>
                  <span className={`json-${typeof item.branch}`}>
                    {item.branch.toString()}
                  </span>
                  <span>{index !== result.length - 1 && `,`}</span>
                </div>
                {index === result.length - 1 ? `},` : ``}
              </Fragment>
            ))}
          </div>
        )
      }

      // handle object with nested objects
      return (
        <>
          {`{`}
          {result.map((item) => {
            // handle item in object with nested objects and open
            if (
              checkIfItemIs(item.branch, [`object`, `array`]) &&
              isOpen[item.key]
            ) {
              return (
                <TreeItem
                  id={item.key}
                  key={item.key}
                  isSelected={item.branch}
                  label={item.key}
                  isOpen={isOpen}
                  toggleItemOpen={toggleItemOpen}
                >
                  <div style={{ paddingLeft: `25px`, border: `1px solid red` }}>
                    {createTree(item.branch)}
                  </div>
                </TreeItem>
              )
            }

            // handle item in object with nested objects and closed
            if (
              checkIfItemIs(item.branch, [`object`, `array`]) &&
              !isOpen[item.key]
            ) {
              return (
                <p
                  style={{ border: `1px solid blue` }}
                  onClick={() =>
                    toggleItemOpen((prev) => ({ ...prev, [item.key]: true }))
                  }
                >
                  (*) {item.key}
                </p>
              )
            }

            // handle item in object with no nested objects
            return (
              <div
                style={{ paddingLeft: `25px`, border: `1px solid green` }}
                key={item.key}
              >
                <p>
                  <span className="json-key">{item.key}</span>:{` `}
                  <span className={`json-${typeof item.branch}`}>
                    {typeof item.branch === `string`
                      ? `"${item.branch.toString()}"`
                      : item.branch.toString()}
                  </span>
                </p>
              </div>
            )
          })}
          {`}`}
        </>
      )
    }

    // non-object, non-array
    return (
      <p
        style={{ border: `1px solid pink` }}
        className={`json-${typeof branch}`}
      >
        {branch.toString()}
      </p>
    )
  }

  return (
    <div>
      {listMeta.map((branch: any, i: any) => (
        <div key={i}>{createTree(branch)}</div>
      ))}
    </div>
  )
}

export default RecursiveTree

const StyledLabel = styled.div``
const StyledTreeChildren = styled.div`
  padding-left: 10px;
`
const StyledTreeItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
