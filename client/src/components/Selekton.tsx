import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export default function Selekton({height, width}:{height?:number, width?:number, }) {
  return (
    <Skeleton variant="rectangular" width={width||210} height={height||60}  />
  )
}
