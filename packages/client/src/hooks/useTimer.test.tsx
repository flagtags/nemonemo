import { act, renderHook } from '@testing-library/react';
import useTimer from './useTimer';

describe('usetTimer 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('5초 뒤 onTimerEnd 호출', () => {
    const onTimerEnd = jest.fn();

    const { result } = renderHook(() => useTimer(5000, onTimerEnd));

    act(() => result.current.startTimer());

    expect(result.current.isCounting).toBe(true);

    act(() => jest.advanceTimersByTime(5000));

    expect(result.current.isCounting).toBe(false);
    expect(onTimerEnd).toBeCalled();
  });

  test('제한시간 10초, 5초 뒤 stopTimer 호출', () => {
    const onTimerEnd = jest.fn();

    const { result } = renderHook(() => useTimer(10000, onTimerEnd));

    act(() => result.current.startTimer());

    act(() => jest.advanceTimersByTime(5000));

    act(() => result.current.stopTimer());

    expect(result.current.remainSeconds).toBe(5);

    act(() => result.current.init());

    expect(result.current.remainSeconds).toBe(10);
  });
});
