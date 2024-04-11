import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <div
          className='collapse navbar-collapse d-flex'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav ms-auto me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Songs
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/artist'>
                Artists
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/albums'>
                Albums
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
