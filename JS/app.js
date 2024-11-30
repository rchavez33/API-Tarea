const marvel = {
    render: () => {
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a62118545390a6b1178344aec40436b8&hash=32f2f4d023f103efb0b395fd051d292b';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al obtener datos de la API');
                }
                return res.json();
            })
            .then((json) => {
                if (json.data && json.data.results) {
                    for (const hero of json.data.results) {
                        let urlHero = hero.urls[0].url;
                        contentHTML += `
                        <div class="col-md-4">
                            <a href="${urlHero}" target="_blank">
                                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" 
                                class="img-thumbnail">
                            </a>
                            <h3 class="title">${hero.name}</h3>
                        </div>`;
                    }
                    container.innerHTML = contentHTML;
                } else {
                    container.innerHTML = '<p>No se encontraron héroes</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
                container.innerHTML = '<p>Hubo un error al cargar los datos. Inténtalo más tarde.</p>';
            });
    }
};
marvel.render();