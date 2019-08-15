const { expect, test } = require('../expect');
const calculateScore = require('./calculateScore');

test('string이 아닌 다른 타입을 인자로 넘기면 에러를 발생시킨다.', () => {
  expect(() => calculateScore(1023))
    .shouldError();
  expect(() => calculateScore([1023]))
    .shouldError();
});
test('숫자 또는 대문자 A 이외의 문자가 포함되어있으면 에러를 발생시킨다.', () => {
  expect(() => calculateScore('123a45')).shouldError();
  expect(() => calculateScore('1$2d3*45')).shouldError();
});
test('프레임의 갯수가 10개를 초과하는 기록은 에러를 발생시킨다.', () => {
  expect(() => calculateScore('123451234512345123456')).shouldError();
  expect(() => calculateScore('1234512345123451234667')).shouldError();
});
test('한 프레임의 점수가 10점을 초과하면 에러를 발생 시킨다.', () => {
  expect(() => calculateScore('102385')).shouldError();
});
test('마지막 프레임의 투구가 진행 중이라면 해당 프레임의 점수는 계산하지 않는다.', () => {
  expect(calculateScore('102')).isEqual([1]);
});
test('스트라이크를 기록한 프레임 이후의 투구가 2회 미만이라면 해당 프레임의 이후의 점수는 계산하지 않는다.', () => {
  expect(calculateScore('AA')).isEqual([]);
  expect(calculateScore('AAA')).isEqual([30]);
  expect(calculateScore('AAAA')).isEqual([30, 60]);
  expect(calculateScore('A1')).isEqual([]);
  expect(calculateScore('A19')).isEqual([20]);
  expect(calculateScore('A191')).isEqual([20, 31]);
  expect(calculateScore('A1')).isEqual([]);
  expect(calculateScore('A10')).isEqual([11, 12]);
  expect(calculateScore('A1023')).isEqual([11, 12, 17]);
});
test('진행 중인 경기의 마지막 프레임의 기록이 스페어라면 해당 프레임의 점수는 계산하지 않는다.', () => {
  expect(calculateScore('1128')).isEqual([2]);
  expect(calculateScore('37')).isEqual([]);
});
test('모든 프레임의 기록이 스트라이크인 경우 각 프레임의 점수는 30씩 증가한다.', () => {
  expect(calculateScore('AAAAAAAAAAAA'))
    .isEqual([30, 60, 90, 120, 150, 180, 210, 240, 270, 300]);
});
test('단 한번도 스트라이크 또는 스페어를 기록하지 못한 경우 각 프레임의 점수를 누산한 값을 반환한다.', () => {
  expect(calculateScore('111111')).isEqual([2, 4, 6]);
});
test('calculateScore(\'82A900519A\') is equals [20, 39, 48, 53, 73]', () => {
  expect(calculateScore('82A900519A')).isEqual([20, 39, 48, 53, 73]);
});
