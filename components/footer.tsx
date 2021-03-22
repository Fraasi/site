import Container from './container'


const Footer = () => {
  return (
    <footer className="bg-accent-2 border-t border-accent-2">
      <Container>
        <div className="flex flex-row items-center py-10">
          <h3 className="text-3xl font-bold tracking-tighter leading-tight text-center lg:w-1/2">
            Statically Generated footer.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              A button
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
