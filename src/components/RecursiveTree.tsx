import type { FC } from 'react'

import { useRecoilState } from 'recoil'
import { devItemIsOpenState } from '../state/storage'

import { Mark, Key, Box } from '../styles/Styles'
import Badge from './Badge'
import Primitive from './Primitive'

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
    if (branch === null || branch === undefined || branch instanceof Date) {
      return <Primitive data={branch} />
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
                    <Badge
                      length={
                        Array.isArray(item.branch)
                          ? item.branch.length
                          : Object.keys(item.branch).length
                      }
                    />
                    {item.key}
                    {isOpen[currentDir] && <Mark>:</Mark>}
                  </Key>
                  <span style={{ paddingLeft: `12px` }}>
                    {isOpen[currentDir] && createTree(item.branch, currentDir)}
                  </span>
                </Box>
              )
            }

            // handle item in object with no nested objects
            return (
              <Box border="green" key={currentDir + 'no-nested'}>
                <p>
                  <Key>{item.key}</Key>
                  <Mark>:</Mark>
                  {` `}
                  <Primitive data={item.branch} />
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
    return <Primitive data={branch} />
  }

  return (
    <span style={{ paddingLeft: `12px` }}>
      {createTree(contents, branchName)}
    </span>
  )
}

export default RecursiveTree
