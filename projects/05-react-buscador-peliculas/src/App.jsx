import './App.css'
import { useState } from 'react';
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App() {

  const { movies } = useMovies();
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  // Cada vez que cambia el input, se esta renderizando el componente
  console.log('render');

  const handleSubmit = ( event ) => {
    event.preventDefault()
    console.log({ query })
  }

  // Validando en el onChange del input
  const handleChange = ( event ) => {

    // Para asegurarse de leer el estado actual, tomar el valor directamente del input
    const newQuery = event.target.value

    setQuery( newQuery )

    if ( newQuery === '' ) {
      setError('No se puede buscar una película vacia')
      return
    }

    if ( newQuery.match(/^\d+$/) ) {
      setError('No se puede buscar una película con un número')
      return
    }

    if ( newQuery.length < 3 ) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError( null )

  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={ handleSubmit }>
          <input onChange={ handleChange } value={ query } name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        { error && <p style={{ color: 'red' }}>{ error }</p>}
      </header>

      <main>
        <Movies movies={ movies } />
      </main>

    </div>
  )
}

export default App


/* --------------------------------------------------------------
  - Hook useRef:

  Te permite crear una referencia mutable que persiste durante todo el ciclo de vida del componente, y lo que es mejor que es muy util para guardar cualquier valor que puedas mutar, como un identificador, un elemento del DOM, un contador, etc, y que cada vez que cambia no vuelve a renderizar el componente
-------------------------------------------------------------- */