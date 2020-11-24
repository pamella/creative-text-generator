const ARTISTS_SELECTED = []

const artists = document.querySelectorAll('.artists-wrapper .list .item');
const overviewContainer = document.querySelector('.overview-container');
const overviewContainerPhotos = document.querySelectorAll('.overview-container .photo');
const overviewContainerNames = document.querySelector('.overview-container .names');
const generateLink = document.querySelector('.overview-container .link');
const rootLink = generateLink.getAttribute('href');

artists.forEach(artist => {
	artist.addEventListener('click', () => handleArtistClick(artist));
});

const handleArtistClick = (artist) => {
	const photo = artist.querySelector('.photo');

	if (ARTISTS_SELECTED.includes(artist)) {
		removeAllElements(ARTISTS_SELECTED, artist);
		photo.style.border = null;
		overviewContainer.style.display = 'none';
		generateLink.setAttribute('href', `${rootLink}`);
		return;
	}

	if(ARTISTS_SELECTED.length !== 2) {
		ARTISTS_SELECTED.push(artist);
		photo.style.border = '5px solid white';
	}

	if (ARTISTS_SELECTED.length === 2) {
		overviewContainerPhotos[0].style.backgroundImage = ARTISTS_SELECTED[0].querySelector('.photo').style.backgroundImage;
		overviewContainerPhotos[1].style.backgroundImage = ARTISTS_SELECTED[1].querySelector('.photo').style.backgroundImage;
		overviewContainerNames.innerHTML = `${ARTISTS_SELECTED[0].querySelector('.name').innerHTML} & ${ARTISTS_SELECTED[1].querySelector('.name').innerHTML}`;
		overviewContainer.style.display = 'flex';
		generateLink.setAttribute('href', `${rootLink}?artists_names=${ARTISTS_SELECTED[0].getAttribute('id')}&artists_names=${ARTISTS_SELECTED[1].getAttribute('id')}`);
	}

	return;
};

const removeAllElements = (array, elem) => {
	var index = array.indexOf(elem);
	while (index > -1) {
		array.splice(index, 1);
		index = array.indexOf(elem);
	}
};

function showLoading() {
	const generateButton = document.getElementById("generate_button")
	generateButton.style.width = "320px";
	const generateButtonImg = document.getElementById("generate_button_img")
	generateButtonImg.src = "/static/img/loading.gif"
	const generateButtonText = document.getElementById("generate_button_text")
	generateButtonText.innerHTML = "OUVINDO DISCOGRAFIAS..."
	setTimeout(() => {
		generateButtonText.innerHTML = "RELEMBRANDO OS CLÁSSICOS..."
	}, 5000)
	setTimeout(() => {
		generateButtonText.innerHTML = "PENSANDO POSSÍVEIS FEATS..."
	}, 12000)
	setTimeout(() => {
		generateButtonText.innerHTML = "MESCLANDO TUDO. QUASE LÁ..."
	}, 19000)
}