import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

function App(): React.JSX.Element {
  return (
    <div className="page__content">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
