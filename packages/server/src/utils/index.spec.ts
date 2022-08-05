import { filterEmptyObjectField } from './index';

it('fiter objects key of empty value', () => {
  const testObj1 = {
    name: 'dante',
    age: undefined,
    mbti: 'ENTP',
  };

  const resultObj1 = {
    name: 'dante',
    mbti: 'ENTP',
  };
  expect(filterEmptyObjectField(testObj1)).toEqual(resultObj1);
});
