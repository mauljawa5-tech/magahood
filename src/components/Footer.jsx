import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#hero" className="inline-flex">
            <Logo
              variant="full"
              showTagline
              markClassName="h-8 w-8"
              className="items-center"
            />
          </a>

          <p className="text-xs text-muted text-center">
            Digital Nation · SocialFi · AI Economy · Web3 Infrastructure · Robinhood Chain
          </p>

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} $MAGAHOOD
          </p>
        </div>
      </div>
    </footer>
  )
}
