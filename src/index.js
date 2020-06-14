import { displayData } from './view';

// Note: I would generally put these in separate JS files, but this project is so small, it would be easier to read the code if it were in 1 file.

/**
 * Retrieve data from API
 */
export async function getData() {
	// Could use axios instead of fetch here
	const peopleData = await fetch(
		'//agl-developer-test.azurewebsites.net/people.json'
	).catch((err) => console.log(err));
	const peopleJson = await peopleData.json();

	return peopleJson;
}

/**
 * Denormalise the peopleArr so each pet has a dedicated owner
 *
 * @param {Array} peopleArr
 */
export function organisePeopleForPets(peopleArr) {
	if (peopleArr && peopleArr.length > 0 && Array.isArray(peopleArr)) {
		return peopleArr.reduce((acc, curr) => {
			let petList;

			if (curr.pets) {
				petList = curr.pets.map((c) => {
					const output = Object.assign({}, c);
					output.owner = {
						name: curr.name,
						age: curr.age,
						gender: curr.gender,
					};

					return output;
				});

				acc.push(...petList);
			}

			return acc;
		}, []);
	}

	return [];
}

/**
 * Remove all pets except for `type`
 *
 * @param {Array} petArr
 * @param {String} type
 */
export function filterPetsByType(petArr, type = 'Cat') {
	if (petArr && petArr.length > 0 && Array.isArray(petArr)) {
		return petArr.filter((curr) => {
			return curr.type.toLowerCase() === type.toLowerCase();
		});
	}

	return [];
}

/**
 * Organise petArr into an object sorted by every unique `sort`
 *
 * @param {Array} petArr
 * @param {String} sort
 */
export function organiseByOwner(petArr, sort = 'gender') {
	const sortString = String(sort);
	if (sortString === '[object Object]' || sortString === '') {
		return {};
	}

	if (petArr && petArr.length > 0 && Array.isArray(petArr)) {
		return petArr.reduce((acc, curr) => {
			if (curr.owner && curr.owner[sortString]) {
				if (!acc[curr.owner[sortString]]) {
					acc[curr.owner[sortString]] = {
						sortName: curr.owner[sortString],
						pets: [],
					};
				}

				acc[curr.owner[sortString]].pets.push(curr);
			}

			return acc;
		}, {});
	}

	return {};
}

/**
 * Sort by pet param
 * 
 * @param {Array} petArr 
 * @param {String} sort 
 */
export function sortByPet(petArr, sort = 'name') {
	if(!Array.isArray(petArr) || petArr.length === 0) {
		return [];
	}

	return petArr.sort((a, b) => {
		const nameA = a[sort].toUpperCase(); // ignore upper and lowercase
		const nameB = b[sort].toUpperCase(); // ignore upper and lowercase

		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}

		return 0;
	});
}

getData()
	.then((people) => organisePeopleForPets(people))
	.then((pets) => sortByPet(pets, 'name')) // Easier to sort by name here, than later
	.then((pets) => filterPetsByType(pets, 'Cat'))
	.then((pets) => organiseByOwner(pets, 'gender'))
	.then((pets) => displayData(pets, 'container', 'pets', 'name'));
