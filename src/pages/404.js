import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <main className="otherpage">
      <div className="text-center">
        <h1>ERROR</h1>
        <h1 className="error404">404</h1>
        <p><Link to="/" className="link-danger fw-bold fs-3">Go back home.</Link></p>
      </div>
    </main>
  )
}

export default Footer