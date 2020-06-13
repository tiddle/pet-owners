export async function getData() {

	// This should point to the live json, but I didn't want to have to create a server just to avoid CORS issues
	const peopleData = await fetch('/people.json');
	const peopleJson = await peopleData.json();

	return peopleJson;
}

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

export function filterPetsByType(petArr, type = 'Cat') {
	if (petArr && petArr.length > 0 && Array.isArray(petArr)) {

		return petArr.filter(curr => {
			return curr.type.toLowerCase() === type.toLowerCase();
		})
	}

	return [];
}

export function sortByOwner(petArr, sort = 'gender') {
	
}

getData()
	.then((people) => organisePeopleForPets(people))
	.then((pets) => filterPetsByType(pets, 'Cat'))
	.then((arr) => console.log(arr));
