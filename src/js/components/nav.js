export default class Nav {
    constructor() {
        
    }

    getNavBar () {
        return `
            <div>
                ${Object.keys(app.routes).map(key => {
                  return this.getNavItem(key, app.routes[key]);
                }).join('')}
            </div>`
    }

    getNavItem (pathname, title) {
        if (app.pathname === pathname) {
            return `
                <div onClick="window.app.navigation('${pathname}')"  class="nav-item nav-item-active">${title}</div>
            `
        } else {
            return `
                <div onClick="window.app.navigation('${pathname}')"  class="nav-item">${title}</div>
            `
        }
    }

    render () {
  		nav.innerHTML = this.getNavBar();
    }
}