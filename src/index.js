// Note: I would generally put these in separat JS files, but this project is so small, it would be easier to read the code if it were in 1 file.

/**
 * Retrieve data from API 
 */
export async function getData() {
	// This should point to the live json, but I didn't want to have to create a server just to avoid CORS issues
	const peopleData = await fetch('/people.json').catch(err => console.log(err));
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

		return petArr.filter(curr => {
			return curr.type.toLowerCase() === type.toLowerCase();
		})
	}

	return [];
}

/**
 * Organise petArr into an object sorted by every unique `sort`
 * 
 * @param {Array} petArr 
 * @param {String} sort 
 */
export function sortByOwner(petArr, sort = 'gender') {
	if (petArr && petArr.length > 0 && Array.isArray(petArr)) {
		return petArr.reduce((acc, curr) => {
			if(curr.owner && curr.owner[sort]) {
				if(!acc[curr.owner[sort]]) {
					acc[curr.owner[sort]] = {
						sortName: curr.owner[sort],
						pets: []
					};
				}

				acc[curr.owner[sort]].pets.push(curr);
			}


			return acc;
		}, {});
	}

	return {};
}

getData()
	.then((people) => organisePeopleForPets(people))
	.then((pets) => filterPetsByType(pets, 'Cat'))
	.then((pets) => sortByOwner(pets, 'gender'))
	.then((arr) => console.log(arr));
