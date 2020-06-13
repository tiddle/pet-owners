import { organisePeopleForPets } from './index';

describe('test for organisePeopleForPets', () => {
	test('empty param test', () => {
    expect(organisePeopleForPets()).toEqual([])
    expect(organisePeopleForPets([])).toEqual([])
  });
  
  test('invalid param test', () => {
    expect(organisePeopleForPets('aaaaa')).toEqual([]);
    expect(organisePeopleForPets(123)).toEqual([]);
  })
});
