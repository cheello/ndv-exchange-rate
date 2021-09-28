export default class Home {
    constructor (data) {
    	this.dataValute = data.Valute;
    	this.favouritesValute = {}
    	this.pageHeadline = 'Курс валют ЦБ РФ на сегодня'
    	this.clickListener = this.favouritesClickListener.bind(this)

    	this.getFavouritesInLocalStorage()

    	main.addEventListener('click', this.clickListener)
    }

    getPageContent () {
    	return `
    		${this.getPageHeadline()}
    		${this.getTable(this.dataValute, this.favouritesValute)}

    	`
    }

    getPageHeadline () {
    	const nowDate = new Date();
    	const formatDate = `${nowDate.getDate()}/${nowDate.getMonth()}/${nowDate.getFullYear()}`

      return `<h1>
	      	${this.pageHeadline} (${formatDate})
	      </h1>`;
    }

    getTable (valute, favouritesValute) {
    	if (!this.isEmpty(favouritesValute)) {
	    	return `
		    	${this.getHeadTable()}
		    	<div id="table" class="table">
		    		${Object.keys(favouritesValute).map(key => {
			    	  return this.getTableRows(favouritesValute[key], true);
			    	}).join('')}
		    		${Object.keys(valute).map(key => {
			    	  return this.getTableRows(valute[key], false);
			    	}).join('')}
		    	</div>`
    	} else {
	    	return `
		    	${this.getHeadTable()}
		    	<div id="table" class="table"> 
		    		${Object.keys(valute).map(key => {
			    	  return this.getTableRows(valute[key]);
			    	}).join('')}
		    	</div>`
    	}
    }

    getHeadTable () {
    	return `
    		<div class="table-row table-head">
    			<div class="table-col-1">Код</div>
    			<div class="table-col-2">Номинал</div>
    			<div class="table-col-3">Валюта</div>
    			<div class="table-col-4">Курс ЦБ</div>
    			<div class="table-col-5 text-right">Избранное</div>
    		</div>
    	`
    }

    getTableRows (item, favourite) {

    	let difference = parseFloat(item.Previous) - parseFloat(item.Value)
    	let percents = parseFloat(item.Value) / parseFloat(item.Previous) * 100 - 100 
    	difference = difference.toFixed(4)
    	percents = percents.toFixed(2)
    	let classColorValue
    	let classColorFavourite
    	let signGaineValue

    	if (favourite) {
    		classColorFavourite = 'table-row-favourite'
    	} else {
    		classColorFavourite = '-'
    	}

    	if (item.Previous > item.Value) {
    		classColorValue = 'red'
    		signGaineValue = ''
    	} else {
    		classColorValue = 'green'
    		signGaineValue = '+'
    	}

    	return `
    		<div class="table-row ${classColorFavourite}" data-charcode="${item.CharCode}">
    			<div class="table-col-1 table-item-char">${item.CharCode}</div>
    			<div class="table-col-2 table-item-nominal">${item.Nominal} </div>
    			<div class="table-col-3 table-item-name">${item.Name}</div>
    			<div class="table-col-4 table-item-value">${item.Value}<label class="value-difference ${classColorValue}">${signGaineValue}${percents}%</label></div>
    			<div class="table-col-5 table-item-favourites">
    			<svg class="favourites-icon"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round">  
    				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    				</svg>
    			</div>
    		</div>
    	`
    }

    getFavouritesButton () {
    	return `
    		<div id="favouritesButton" class="favourites-button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
    			<div class="favourites-count"><div id="favouritesCount" class="favourites-count-num">12</div></div>
    			<svg class="favourite-icon"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round">  
    				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    			</svg>
    		</div>
    	`
    }

    favouritesClickListener (e) {
    	if (e.target.closest('.favourites-icon')) {
    		const item = e.target.closest('.table-row')
    		const charCode = item.dataset.charcode

    		if (this.favourites.indexOf(charCode) != -1) {
    			this.removeFavorite(item, charCode)
    		} else {
    			this.addFavorite(item, charCode)
    		}	
    	}
    }

    addFavorite (item, charCode) {
    	if (this.favourites.length === 0) this.addFavouritesButton()

    	this.favourites.push(charCode)

			this.favouritesValute[charCode] = this.dataValute[charCode]   
			delete this.dataValute[charCode] 		
	
  		this.updateFavouritesButtonCount()

    	this.setFavouritesInLocalStorage()

    	item.classList.add('table-row-favourite')
    	table.prepend(item)
    }

    removeFavorite (item, charCode) {
    	const positionInArray = this.favourites.indexOf(charCode)
    	this.favourites.splice(positionInArray, 1)

    	this.dataValute[charCode] = this.favouritesValute[charCode]   
    	delete this.favouritesValute[charCode] 	

    	if (this.favourites.length === 0) {
    		this.removeFavouritesButton()
    	} else {
  			this.updateFavouritesButtonCount()
    	}

    	this.setFavouritesInLocalStorage()	

    	item.classList.remove('table-row-favourite')
    	table.append(item)
    }

    parseValute () {
    	this.favourites.forEach((el) => {
				this.favouritesValute[el] = this.dataValute[el]   
				
				delete this.dataValute[el] 		
    	})
    }

    getFavouritesInLocalStorage () {
    	if (localStorage.favourites) {
    		this.favourites = JSON.parse(localStorage.getItem('favourites'))

    		this.parseValute()
    	} else {
    		this.favourites = []
    	}
    }

    setFavouritesInLocalStorage () {
    	localStorage.setItem('favourites', JSON.stringify(this.favourites));
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    addFavouritesButton () {
  		main.insertAdjacentHTML('beforeend', this.getFavouritesButton())
    }

    removeFavouritesButton () {
  		favouritesButton.remove();	
    }

    updateFavouritesButtonCount () {
    	favouritesCount.innerHTML = this.favourites.length
    }

    render () {
  		main.innerHTML = this.getPageContent();

  		if (this.favourites.length > 0) {
  			this.addFavouritesButton()
  			this.updateFavouritesButtonCount()
  		}
    }

    removeListeners () {
    	main.removeEventListener('click', this.clickListener)
    }
}