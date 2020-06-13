import { organisePeopleForPets, filterPetsByType } from './index';

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
});
