import Menu from './components/Menu'
import Card from './components/Card'
import Nav from './components/Nav'

export default function Home() {
  return (
    <>
      <Menu page="home" />
      <Nav currentPage="home" />
      <div className="flex! w-full! max-w-4xl! flex-col! items-center! justify-center! max-h-[90dvh]!">
        <Card />
      </div>
    </>
  )
}
