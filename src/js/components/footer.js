export default class Footer {
    constructor() {

    }

    getFooterContent () {
    	return `
    		<div>
    			ver. 0.0.1 | source GitHub | dev by <a href='' target="_blank">Alexander Chachillo</a>
    		</div>
    	`
    }

    render () {
  		footer.innerHTML = this.getFooterContent();
    }
}