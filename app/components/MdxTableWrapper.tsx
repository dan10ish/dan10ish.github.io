import React from 'react'

export const MdxTableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  )
} 