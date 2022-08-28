export interface TreeBranch {
  readonly id: string
  readonly label: string
  branches?: Tree
  friends?: Tree
  readonly selected?: boolean
}

export type Tree = ReadonlyArray<TreeBranch>
