import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Tree, TreeBranch } from '../types/types'

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
  readonly onSelectCallback: (value: TreeBranch) => void
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
      <StyledTreeItem>
        <div
          onClick={() =>
            toggleItemOpen((prev: any) => ({
              ...prev,
              [label]: !prev[label],
            }))
          }
        >
          {isOpen[label] ? <p>{'(-)'}</p> : <p>{'(+)'}</p>}
        </div>
        <StyledLabel>{label}</StyledLabel>
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen[label] && children}</StyledTreeChildren>
    </div>
  )
}

const checkIfItemIs = (item: any, checkFor: string[]) => {
  const checks = []

  if (checkFor.includes('object')) {
    checks.push(typeof item === 'object')
  }
  if (checkFor.includes('array')) {
    checks.push(Array.isArray(item))
  }
  if (checkFor.includes('string')) {
    checks.push(typeof item === 'string')
  }
  if (checkFor.includes('number')) {
    checks.push(typeof item === 'number')
  }

  return checks.some((check) => check)
}

const RecursiveTree = ({ listMeta, onSelectCallback }: RecursiveTreeProps) => {
  const [isOpen, toggleItemOpen] = useState({})
  const createTree = (branch: any) => {
    console.log({ branch })

    // handle array
    if (checkIfItemIs(branch, ['array'])) {
      return (
        <>
          {branch.map((branch: TreeBranch) => {
            return <div key={branch.id}>{createTree(branch)}</div>
          })}
        </>
      )
    }

    // handle object
    if (checkIfItemIs(branch, ['object'])) {
      const result = Object.keys(branch).map((key) => ({
        key: key,
        branch: branch[key],
      }))
      return (
        <>
          {result.map((item) => {
            if (checkIfItemIs(item.branch, ['object', 'array']) && isOpen) {
              return (
                <TreeItem
                  id={item.key}
                  key={item.key}
                  isSelected={item.branch}
                  label={item.key}
                  isOpen={isOpen}
                  toggleItemOpen={toggleItemOpen}
                >
                  <div>{createTree(item.branch)}</div>
                </TreeItem>
              )
            }

            if (checkIfItemIs(item.branch, ['object', 'array']) && !isOpen) {
              return (
                <p onClick={() => toggleItemOpen({ [item.key]: true })}>
                  (+) {item.key}
                </p>
              )
            }

            return (
              <p>
                <span className="json-key">{item.key}</span> :{' '}
                {item.branch.toString()}
              </p>
            )
          })}
        </>
      )
    }

    return <p>{branch.toString()}</p>
  }

  return (
    <div>
      {listMeta.map((branch: TreeBranch, i: any) => (
        <div key={i}>{createTree(branch)}</div>
      ))}
    </div>
  )
}

export default RecursiveTree

const StyledLabel = styled.div`
  &:hover {
    cursor: pointer;
  }
`
const StyledTreeChildren = styled.div`
  padding-left: 10px;
`
const StyledTreeItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
