import { render, screen } from '@testing-library/react';
import Pomodoro from './page';

vi.stubGlobal('localStorage', {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
});

describe('Pomodoro', () => {
  it('벽 이미지는 1280w, 1920w, 2560w 후보와 sizes를 제공한다', () => {
    // given
    // when
    render(<Pomodoro />);

    // then
    const expectedWidths = ['1280w', '1920w', '2560w'];
    const expectedSizes = 'max(100vw, 107vh)';
    const wall = screen.getByAltText('벽 이미지');
    const srcset = wall.getAttribute('srcset') ?? '';
    expectedWidths.forEach((width) => expect(srcset).toContain(width));
    expect(srcset.match(/,/g)).toHaveLength(expectedWidths.length - 1);
    expect(wall.getAttribute('sizes')).toBe(expectedSizes);
  });

  it('바닥 이미지는 1280w, 1920w, 2560w 후보와 sizes를 제공한다', () => {
    // given
    // when
    render(<Pomodoro />);

    // then
    const expectedWidths = ['1280w', '1920w', '2560w'];
    const expectedSizes = 'max(100vw, 71vh)';
    const floor = screen.getByAltText('바닥 이미지');
    const srcset = floor.getAttribute('srcset') ?? '';
    expectedWidths.forEach((width) => expect(srcset).toContain(width));
    expect(srcset.match(/,/g)).toHaveLength(expectedWidths.length - 1);
    expect(floor.getAttribute('sizes')).toBe(expectedSizes);
  });
});
