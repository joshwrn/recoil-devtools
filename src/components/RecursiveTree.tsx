import type { FC } from "react"

import { useRecoilState } from "recoil"

import { devItemIsOpenState } from "../state/storage"
import { Mark, Key, Box } from "../styles/Styles"
import Badge from "./Badge"
import Primitive from "./Primitive"

const RecursiveTree: FC<{ contents: unknown; branchName: string }> = ({
  contents,
  branchName,
}) => {
  const [isOpen, toggleItemOpen] = useRecoilState(devItemIsOpenState)

  const createTree = (branch: unknown, dir: string) => {
    // handle array
    const branchIsObject = typeof branch === `object`

    if (branch instanceof Set || branch instanceof Map) {
      branch = Array.from(branch)
    }

    if (branch instanceof Array) {
      return (
        <>
          <Mark>[</Mark>
          {branch.map((item: unknown, index: number) => {
            return (
              <Box border="gray" key={dir + index}>
                {createTree(item, `${dir}/${index}`)}
                {index < (branch as Array<unknown>).length - 1 && <Mark>,</Mark>}
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
      const result = Object.keys(branch).map(
        (key): { key: number | string | symbol; branch: unknown } => ({
          key: key,
          branch: (branch as object)[key as keyof typeof branch],
        })
      )

      // handle object with nested objects
      return (
        <>
          <Mark style={{ display: `inline-block` }}>{`{`}</Mark>
          {result.map((item, index) => {
            const itemIsObject = typeof item.branch === `object`
            const itemIsArray = Array.isArray(item.branch)

            if (item.branch instanceof Set || item.branch instanceof Map) {
              item.branch = Array.from(item.branch)
            }

            const currentDir = `${dir}/${String(item.key)}`

            // handle item in object with nested objects
            if ((itemIsObject || itemIsArray) && item.branch) {
              return (
                <Box border="orange" key={currentDir + `obj/array`}>
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
                    <>
                      <Badge
                        length={
                          Array.isArray(item.branch)
                            ? item.branch.length
                            : Object.keys(item.branch).length
                        }
                      />
                      {item.key}
                      {isOpen[currentDir] && <Mark>:</Mark>}
                    </>
                  </Key>
                  <span style={{ paddingLeft: `12px` }}>
                    {isOpen[currentDir] && createTree(item.branch, currentDir)}
                  </span>
                </Box>
              )
            }

            // handle item in object with no nested objects
            return (
              <Box border="green" key={currentDir + `no-nested`}>
                <p>
                  <Key>{String(item.key)}</Key>
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
