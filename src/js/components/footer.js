export default class Footer {
    constructor() {

    }

    getFooterContent () {
    	return `
    		<div>
    			ver. 0.0.1 | source <a href="https://github.com/cheello/ndv-exchange-rate" target="_blank">GitHub</a>
    		</div>
    	`
    }

    render () {
  		footer.innerHTML = this.getFooterContent();
    }
}