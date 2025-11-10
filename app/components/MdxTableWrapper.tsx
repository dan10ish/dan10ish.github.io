export const MdxTableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  )
} 