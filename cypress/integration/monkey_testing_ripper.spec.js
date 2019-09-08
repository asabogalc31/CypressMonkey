describe('Los estudiantes under monkeys', function() {
	beforeEach(function() {
		cy.visit('https://losestudiantes.co')
		cy.contains('Cerrar').click()
        cy.wait(1000);
	})
	
    it.skip('visits los estudiantes and survives monkeys', function() {
        randomClick(10);
    })
	
	 it('visits the students and select a random event and thus survive the monkeys', function() {
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick(monkeysLeft) {
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
			var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }

            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }   
}

function randomEvent(monkeys){
	console.log(monkeys);
	if(monkeys > 0) {
		var eventsArray = [0,1,2,3];
		switch (getRandomInt(0, eventsArray.length)) {
		  case 0:
			clickLink(monkeys)
			break;
		  case 1:
			fillField(monkeys)
			break;
		  case 2:
			selectCombo(monkeys)
			break;
		  case 3:
			clickButton(monkeys)
			break;
		  default:
			break;
		}		
	}
}

function generateRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
   console.log(text)
  return text;
}

// Clicks on the random link 
function clickLink(monkeys){
	cy.get('a').then($links => {
		var randomLink = $links.get(getRandomInt(0, $links.length));
		if(!Cypress.dom.isHidden(randomLink)) {
			cy.wrap(randomLink).click({force: true});
			monkeys = monkeys - 1;
		}

		setTimeout(randomEvent, 1000, monkeys);
	});
}

function fillField(monkeys){
	cy.get('input').then($inputs => {
		var randomInput= $inputs.get(getRandomInt(0, $inputs.length));
		// Enters text when element is visible or hidden
		cy.wrap(randomInput).type(generateRandomString(15), { force: true });
		monkeys = monkeys - 1;
		setTimeout(randomEvent, 1000, monkeys);
	});
}

function selectCombo(monkeys){
	cy.get('select').children().its('length').then(($lenght) => {
		var randomItem = getRandomInt(0, $lenght);
		
		cy.get('select')
		.find('option')
		.eq(randomItem)
		.then(element => cy.get('select').select(element.val()))
		monkeys = monkeys - 1;
		
		setTimeout(randomEvent, 1000, monkeys);
	})
}

function clickButton(monkeys){
	cy.get('button').then($buttons => {
		var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
		if(!Cypress.dom.isHidden(randomButton)) {
			cy.wrap(randomButton).click({force: true});
			monkeys = monkeys - 1;
		}

		setTimeout(randomEvent, 1000, monkeys);
	});
}