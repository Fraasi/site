
import { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Meta title={'fraasi'} />
      <Header />
      <div className='layout'>
        {children}
      </div>
      <Footer />
    </>
  )
}
