export default class Exchange {
    constructor (data) {
    	this.pageHeadline = 'Конвертер валют'
    	this.dataValute = Object.assign({}, data.Valute);
    	this.dataValute.RUR = {Nominal: 1, Value: 1, Name: 'Рубль РФ'}
    	this.valuteInputDefault = 'USD'
    	this.valuteOutputDefault = 'RUR'
    	this.valuteNameIn = this.dataValute.USD.Name
    	this.valuteNameOut = this.dataValute.RUR.Name
    	this.valuteIn = this.valuteInputDefault
    	this.valuteNominalIn = 1
    	this.valuteOut = this.valuteOutputDefault
    	this.valuteNominalOut = 1
    	this.valuteInputIn = 1
    }

    getPageHeadline () {
      return `<h1>
	      	${this.pageHeadline}
	      </h1>`;
    }

    getInputIn (value) {
    		return `
    			<input type="number"  id="inputValuteIn" value="${value}" class="exchange-input text-extra">
    		`
    }

   	getInputOut (value) {
	    	return `
	    		<input type="number"  id="inputValuteOut" value="${value}" class="exchange-input text-extra pointer-events-none">
	    	`
    }

    getSelector(defaultValute, id) {
      return `<select class="exchange-select" id="${id}">
	    		${Object.keys(this.dataValute).map(key => {
		    	  return this.getOption(key, defaultValute);
		    	}).join('')}
		    	</select>`;
    }

    getOption (valuteChar, defaultValute) {
    	let selected

    	valuteChar === defaultValute ? selected = 'selected' : selected = ''

      return `<option ${selected} value="${valuteChar}">
	      	${valuteChar}
	      </option>`;
    }

    getCaption (name, id) {
      return `<div class="exchange-caption" id="${id}">
	      	${name}
	      </div>`;
    }

    getInputArea () {
    	return `
  			<div class="exchange-row">
    			${this.getInputIn(1)}
    			${this.getSelector('USD', 'selectorValuteIn')}
    			${this.getCaption(this.valuteNameIn, 'captionValuteIn')}
  			</div>
    	`
    }

    getOutputArea () {
    	const usdValue = this.dataValute.USD.Value

	  	return `
				<div class="exchange-row">
	  			${this.getInputOut(usdValue)}
	  			${this.getSelector('RUR', 'selectorValuteOut')}
    			${this.getCaption(this.valuteNameOut, 'captionValuteOut')}

				</div>
	  	`
    }

    getExchangeModule () {
      return `<div class="exchange">
    			${this.getInputArea()}
    			<div class="exchange-middle text-extra">=</div>
    			${this.getOutputArea()}
	      </div>`;
    }

    getPageContent () {
    	return `
    		${this.getPageHeadline()}
    		${this.getExchangeModule()}

    	`
    }

    changeValuteIn (e) {
    	this.valuteIn = e.target.value

    	this.valuteNameIn = this.dataValute[this.valuteIn].Name
    	this.valuteNominalIn = this.dataValute[this.valuteIn].Nominal

    	captionValuteIn.innerHTML = this.valuteNameIn

    	this.calculate()
    }

    changeValuteOut (e) {
    	this.valuteOut = e.target.value

    	this.valuteNameOut = this.dataValute[this.valuteOut].Name
    	this.valuteNominalOut = this.dataValute[this.valuteOut].Nominal

    	captionValuteOut.innerHTML = this.valuteNameOut

    	this.calculate()
    }

    inputValuteNominal (e) {
    	this.valuteInputIn = Number(e.target.value)
    	
    	this.calculate()
    }

    calculate () {
    	let result = this.dataValute[this.valuteIn].Value / this.valuteNominalIn * this.valuteInputIn  / this.dataValute[this.valuteOut].Value / this.valuteNominalOut

    	result = result.toFixed(2)

    	inputValuteOut.value = result
    }

    render () {
    	main.innerHTML = this.getPageContent();

    	this.changeSelectorValuteIn = this.changeValuteIn.bind(this)
    	this.changeSelectorValuteOut = this.changeValuteOut.bind(this)
    	this.inputNominal = this.inputValuteNominal.bind(this)

    	selectorValuteIn.addEventListener('change', this.changeSelectorValuteIn)
    	selectorValuteOut.addEventListener('change', this.changeSelectorValuteOut)
    	inputValuteIn.addEventListener('input', this.inputNominal)
    }

    removeListeners () {
    	// main.removeEventListener('click', this.clickListener)
    }

}
