import { organisePeopleForPets, filterPetsByType, sortByOwner } from './index';

describe('tests for organisePeopleForPets', () => {
	test('when empty param', () => {
		expect(organisePeopleForPets()).toEqual([]);
		expect(organisePeopleForPets([])).toEqual([]);
	});

	test('when invalid param', () => {
		expect(organisePeopleForPets('aaaaa')).toEqual([]);
		expect(organisePeopleForPets(123)).toEqual([]);
	});

	describe('to organise the data', () => {
		const data = [
			{
				name: 'Bob',
				gender: 'Male',
				age: 23,
				pets: [
					{ name: 'Garfield1', type: 'Cat' },
					{ name: 'Garfield2', type: 'Cat' },
				],
			},
		];

		test('organise data', () => {
			const result = organisePeopleForPets(data);
			expect(result.length).toBe(2);
			expect(result[0].name).toBe('Garfield1');
			expect(result[0].owner.name).toBe('Bob');
		});
	});
});

describe('tests for filterPetsByType', () => {
	test('when empty param', () => {
		expect(filterPetsByType()).toEqual([]);
		expect(filterPetsByType([])).toEqual([]);
	});

	test('when invalid param', () => {
		expect(filterPetsByType('aaaaa')).toEqual([]);
		expect(filterPetsByType(123)).toEqual([]);
	});

	describe('to organise filter the data', () => {
		const data = [
			{
				name: 'Garfield1',
				type: 'Cat',
				owner: { name: 'Bob', gender: 'Male', age: 23 },
			},
			{
				name: 'Fido',
				type: 'Dog',
				owner: { name: 'Bob2', gender: 'Male', age: 23 },
			},
		];

		test('filter data defaults', () => {
			const result = filterPetsByType(data);
			expect(result.length).toBe(1);
			expect(result[0].name).toBe('Garfield1');
			expect(result[0].owner.name).toBe('Bob');
		});

		test('filter data with param', () => {
			const result = filterPetsByType(data, 'Dog');
			expect(result.length).toBe(1);
			expect(result[0].name).toBe('Fido');
			expect(result[0].owner.name).toBe('Bob2');
		});
	});
});

describe('tests for sortByOwner', () => {
	test('when empty param', () => {
		expect(sortByOwner()).toEqual({});
		expect(sortByOwner([])).toEqual({});
	});

	test('when invalid param', () => {
		expect(sortByOwner('aaaaa')).toEqual({});
		expect(sortByOwner(123)).toEqual({});
	});

	describe('to organise the data', () => {
		const data = [
			{
				name: 'Garfield1',
				type: 'Cat',
				owner: { name: 'Bob', gender: 'Male', age: 23 },
			},
			{
				name: 'Fido',
				type: 'Dog',
				owner: { name: 'Bob2', gender: 'Male', age: 23 },
			},
			{
				name: 'Rex',
				type: 'Dinosaur',
				owner: { name: 'Bob3', gender: 'Female', age: 23 },
			},
		];

		test('sort data default param', () => {
			const result = sortByOwner(data);
			expect(result.Male.pets.length).toBe(2);
			expect(result.Female.pets.length).toBe(1);
		});

		test('sort data string param', () => {
			const result = sortByOwner(data, 'name');
			expect(result.Bob.pets.length).toBe(1);
			expect(result.Bob2.pets.length).toBe(1);
			expect(result.Bob3.pets.length).toBe(1);
		});

		test('sort data number param', () => {
			const result = sortByOwner(data, 'age');
			expect(result['23'].pets.length).toBe(3);
		});

		test('sort data object param', () => {
			const result = sortByOwner(data, {});
			expect(result).toStrictEqual({});
		});

		test('sort data array param', () => {
			const result = sortByOwner(data, []);
			expect(result).toStrictEqual({});
		});
	});
});
