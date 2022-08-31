import { FC } from 'react'
import { Mark } from '../styles/Styles'

const Badge: FC<{ length?: number }> = ({ length }) => {
  if (!length) return <></>
  return (
    <>
      {length > 0 && (
        <Mark>
          <span className="devtools-badge">({length})</span>
        </Mark>
      )}
    </>
  )
}

export default Badge
