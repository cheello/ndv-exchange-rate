import './style.css'
import Home from './src/js/pages/home.js'
import Exchange from './src/js/pages/exchange.js'
import Nav from './src/js/components/nav.js'
import Footer from './src/js/components/footer.js'

import fetch from './src/js/utils/fetch.js'

class App {
  constructor() {
    this.pathname = window.location.pathname

    this.routes = {
      '/' : 'Курс валют',
      '/exchange' : 'Конвертер валют'
    };

    // window.onpopstate = () => {
    //   app.innerHTML = routes[window.location.pathname]
    // }
  }

  render () {

  }

  // const nav = `<a href="/#/">Home</a> | 
  //              <a href="/#/about">About</a> | 
  //              <a href="/#/contact">Contact</a>`;
  // const routes = {
  //   "": `<h1>Home</h1>${nav}<p>Welcome home!</p>`,
  //   "about": `<h1>About</h1>${nav}<p>This is a tiny SPA</p>`,
  // };
  // const render = path => {
  //   document.querySelector("#app")
  //     .innerHTML = routes[path.replace(/^#\//, "")] || `<h1>404</h1>${nav}`;
  // };
  // window.onhashchange = evt => render(window.location.hash);
  // render(window.location.hash);

  navigation (pathname) {
    this.pathname = pathname

    this.nav.render()

    if (pathname === '/') {
      this.homePage.render()
    } else if (pathname === '/exchange') {
      this.exchangePage.render()
    } else {
      pathname = '/'
      this.homePage.render()
    }

    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
    )
  }

  init () {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js', (data) => {
      this.data = data
      this.homePage = new Home(this.data)
      this.exchangePage = new Exchange(this.data)
      this.nav = new Nav()
      this.footer = new Footer()

      this.nav.render()
      this.navigation(this.pathname)
      this.footer.render()
    })

  }
}

window.app = new App()
app.init()
