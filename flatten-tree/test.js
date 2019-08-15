const { expect, test } = require('../expect');
const flattenTree = require('./flattenTree');

test('빈 객체를 넘기면 빈 배열이 리턴되어야 한다.', () => {
  const data = {};
  expect(flattenTree(data)).isEqual([]);
});


test('깊이가 2인 객체를 넘기면 해당 객체의 키 배열을 반환한다.', () => {
  const data = {
    고양이: {},
    강아지: {},
  };
  expect(flattenTree(data)).isEqual(Object.keys(data));
});

test('객체가 아닌 다른 값을 인자로 넘기면 에러를 발생시킨다.', () => {
  expect(() => flattenTree(1023)).shouldError();
  expect(() => flattenTree((_) => _)).shouldError();
  expect(() => flattenTree(['강아지', '고양이'])).shouldError();
  expect(() => flattenTree('{"아우터":{"코트":{"트렌치코트":{}}}}')).shouldError();
});
