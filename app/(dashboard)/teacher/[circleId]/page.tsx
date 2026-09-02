import React from 'react'

export default async function page({params}: {params: {circleId : string}}) {
    const {circleId} = await params;
  return (
    <div>page: {circleId}</div>
  )
}
