"use strict"
 
 $(document).ready(function(){
 	$('.slider').slick({
 		arrows:false,
 		autoplay: true,
 		adaptiveHeight: true,
 		speed:300,
 	});
 	$('.slider2').slick({
 		arrows:false,
 		autoplay: true,
 		adaptiveHeight: true,
 		speed:300,
 		dots: true,
 	});
 });




// loader

let maskImg = document.querySelector('.mask__img');
let maskTitle = document.querySelector('.mask__title');
let mask = document.querySelector('.mask');


window.addEventListener('load', () => {
	maskImg.classList.add('mask__img_show');
	setTimeout(() => {
		maskTitle.classList.add('mask__title_show');
	}, 3000);
	setTimeout(() => {
		mask.classList.add('mask__hide');
	}, 7000);
	setTimeout(() => {
		mask.remove();
	}, 10000);
});


// cheking device

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};


if (isMobile.any()) {
	document.body.classList.add('_touch');
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}


} else {
	document.body.classList.add('_pc');
}

// scroll

const menuLinks = document.querySelectorAll('.menu__link[data-goto]') ;

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}



// icon menu




const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}





// animation show block

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}


//  cards

const cards = document.querySelectorAll('.pobyt__button');


if (cards.length > 0) {
	cards.forEach(card => {
		card.addEventListener("click", changeCard);

		function changeCard(e){
			card.parentElement.parentElement.classList.toggle('_active');
		}
	});
};



// form


document.addEventListener('DOMContentLoaded', function(){
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);



		if (error === 0) {
			form.parentElement.classList.add('_sending');
			
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok){
				let result = await renponse.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.parentElement.classList.remove('_sending');
			} else{
				alert('error!')
				form.parentElement.classList.remove('_sending');
			}
			
		} else {
			alert('wypełnij wszystko!')
		}
	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for(let index = 0; index < formReq.length; index++){
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')){
				if(input.value === ''){
					formAddError(input);
					error++;
				}
			} else if(input.classList.contains('_name')){
				if(input.value === ''){
					formAddError(input);
					error++;
				}
			} else if(input.classList.contains('_number')){
				if(input.value === ''){
					formAddError(input);
					error++;
				}			 
			} else if(input.classList.contains('_text')){
				if(input.value === ''){
					formAddError(input);
					error++;
				}
			} 
		}
		return error;
	}
	

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

})

// pobyt more


const buttonMore = document.querySelector('.pobyt__button-more');
buttonMore.addEventListener("click", moreFunc);

function moreFunc(e){
	buttonMore.classList.toggle('_active');
	// const buttonsMore = buttonMore.parentElement;
	// const buttonsMorePrevious = buttonsMore.previousSibling.previousSibling.children;
	// console.log(buttonsMorePrevious);
	// buttonsMorePrevious.forEach(buttonMorePrevious => {
	// 	buttonMorePrevious.classList.toggle('_active');
	// });
	const staly = document.querySelector('.pobyt-staly');
	staly.classList.toggle('_active');
	const rezident = document.querySelector('.karta-rezydenta');
	rezident.classList.toggle('_active');
}























