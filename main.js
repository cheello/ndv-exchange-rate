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
  }

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
      this.exchangeData = JSON.parse(JSON.stringify(this.data));
      this.homePage = new Home(this.data)
      this.exchangePage = new Exchange(this.exchangeData)
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
