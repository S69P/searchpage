import * as React from 'react'

interface IProps {
  query: string
}

export default function Query(props: IProps) {
  return (
    <div className="query">
      <p className="query-term">{props.query}</p>
    </div>
  )
}
