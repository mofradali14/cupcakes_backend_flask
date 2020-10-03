const URL = 'http://localhost:5000/api';

function createCupcakeHTML(cupcake) {
	return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} || ${cupcake.size} || ${cupcake.rating}
            <button class="delete">Delete</button>
        </li>
        <img src="${cupcake.image}" class="cupcake_img">
    </div>
    `;
}

async function listCupcakes() {
	const resp = await axios.get(`${URL}/cupcakes`);

	for (let cupcake of resp.data.cupcakes) {
		let newCupcake = $(createCupcakeHTML(cupcake));
		$('#list').append(newCupcake);
	}
}

$('#create-form').on('submit', async function(evt) {
	evt.preventDefault();

	let flavor = $('#flavor').val();
	let rating = $('#rating').val();
	let size = $('#size').val();
	let image = $('#image').val();

	const newResp = await axios.post(`${URL}/cupcakes`, {
		flavor,
		rating,
		size,
		image
	});

	let newCupcake = $(createCupcakeHTML(newResp.data.cupcake));
	$('#list').append(newCupcake);
	$('#create-form').trigger('reset');
});

$('#list').on('click', '.delete', async function(evt) {
	evt.preventDefault();

	let $cupcake = $(evt.target).closest('div');
	let id = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${URL}/cupcakes/${id}`);
	$cupcake.remove();
});

$(listCupcakes);
