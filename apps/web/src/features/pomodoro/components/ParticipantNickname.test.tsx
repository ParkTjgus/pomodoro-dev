import { render, screen, fireEvent } from '@testing-library/react';
import ParticipantNickname from './ParticipantNickname';

describe('ParticipantNickname', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('자신의 닉네임을 화면에서 확인할 수 있다', () => {
    // given
    const nickname = '토마토';

    // when
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={() => {}} />,
    );

    // then
    const expectedNickname = '토마토';
    expect(screen.getByText(expectedNickname)).toBeTruthy();
  });

  it('수정 버튼을 누르면 닉네임을 고칠 수 있는 상태가 된다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={() => {}} />,
    );

    // when
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));

    // then
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('수정을 시작하면 쓰던 닉네임이 입력되어 있어 일부만 고칠 수 있다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={() => {}} />,
    );

    // when
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));

    // then
    const expectedValue = '토마토';
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe(
      expectedValue,
    );
  });

  it('수정을 시작하면 따로 클릭하지 않아도 바로 입력할 수 있다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={() => {}} />,
    );

    // when
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));

    // then
    const expectedFocusedElement = screen.getByRole('textbox');
    expect(document.activeElement).toBe(expectedFocusedElement);
  });

  it('수정 중에는 변경을 확정할 수 있는 버튼이 보인다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={() => {}} />,
    );

    // when
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));

    // then
    expect(screen.getByRole('button', { name: '닉네임 확인' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: '닉네임 수정' })).toBeNull();
  });

  it('Enter를 누르면 입력한 닉네임으로 변경되고 수정이 끝난다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const input = screen.getByRole('textbox');
    const newNickname = '케첩';

    // when
    fireEvent.change(input, { target: { value: newNickname } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // then
    const expectedNickname = '케첩';
    expect(onNicknameChange).toHaveBeenCalledWith(expectedNickname);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('확인 버튼을 누르면 입력한 닉네임으로 변경되고 수정이 끝난다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const input = screen.getByRole('textbox');
    const newNickname = '케첩';
    fireEvent.change(input, { target: { value: newNickname } });

    // when
    fireEvent.click(screen.getByRole('button', { name: '닉네임 확인' }));

    // then
    const expectedNickname = '케첩';
    expect(onNicknameChange).toHaveBeenCalledWith(expectedNickname);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('확인 버튼을 누르는 동안 입력창에서 포커스가 빠져나가지 않는다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname nickname={nickname} onNicknameChange={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const confirmButton = screen.getByRole('button', { name: '닉네임 확인' });

    // when
    const focusKeptOnInput = fireEvent.mouseDown(confirmButton) === false;

    // then
    const expectedFocusKept = true;
    expect(focusKeptOnInput).toBe(expectedFocusKept);
  });

  it('Escape를 누르면 수정이 취소되고 원래 닉네임이 유지된다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const input = screen.getByRole('textbox');

    // when
    fireEvent.change(input, { target: { value: '케첩' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    // then
    const expectedNickname = '토마토';
    expect(onNicknameChange).not.toHaveBeenCalled();
    expect(screen.getByText(expectedNickname)).toBeTruthy();
  });

  it('수정 도중 화면의 다른 곳을 클릭하면 변경이 취소되고 원래 닉네임이 유지된다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const input = screen.getByRole('textbox');
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    // when
    fireEvent.change(input, { target: { value: '케첩' } });
    fireEvent.blur(input);

    // then
    const expectedNickname = '토마토';
    expect(onNicknameChange).not.toHaveBeenCalled();
    expect(screen.getByText(expectedNickname)).toBeTruthy();
  });

  it('수정 도중 다른 창으로 전환해도 입력하던 내용이 그대로 남아있다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '닉네임 수정' }));
    const input = screen.getByRole('textbox');
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);

    // when
    fireEvent.change(input, { target: { value: '케첩' } });
    fireEvent.blur(input);

    // then
    const expectedValue = '케첩';
    expect(onNicknameChange).not.toHaveBeenCalled();
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe(
      expectedValue,
    );
  });

  it('닉네임 변경이 거절되면 거절 사유를 알려준다', () => {
    // given
    const nickname = '토마토';
    const rejection = {
      nickname: '케첩',
      message: '이미 사용 중인 닉네임입니다.',
    };

    // when
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={vi.fn()}
        rejection={rejection}
      />,
    );

    // then
    const expectedMessage = '이미 사용 중인 닉네임입니다.';
    expect(screen.getByRole('alert').textContent).toBe(expectedMessage);
  });

  it('닉네임 변경이 거절되면 거절된 닉네임을 그대로 고칠 수 있다', () => {
    // given
    const nickname = '토마토';
    const rejection = {
      nickname: '케첩',
      message: '이미 사용 중인 닉네임입니다.',
    };

    // when
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={vi.fn()}
        rejection={rejection}
      />,
    );

    // then
    const expectedValue = '케첩';
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe(
      expectedValue,
    );
  });

  it('닉네임 변경이 거절되면 수정 중인 영역이 거절을 알리는 색으로 표시된다', () => {
    // given
    const nickname = '토마토';
    const rejection = {
      nickname: '케첩',
      message: '이미 사용 중인 닉네임입니다.',
    };

    // when
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={vi.fn()}
        rejection={rejection}
      />,
    );

    // then
    const editArea = screen.getByRole<HTMLInputElement>('textbox')
      .parentElement as HTMLElement;
    expect(editArea.className).toContain('border-error');
    expect(editArea.className).toContain('animate-shake');
  });

  it('거절된 닉네임을 고쳐서 다시 확정하면 거절 사유가 사라진다', () => {
    // given
    const nickname = '토마토';
    const onNicknameChange = vi.fn();
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={onNicknameChange}
        rejection={{
          nickname: '케첩',
          message: '이미 사용 중인 닉네임입니다.',
        }}
      />,
    );
    const input = screen.getByRole('textbox');
    const newNickname = '마요';

    // when
    fireEvent.change(input, { target: { value: newNickname } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // then
    const expectedNickname = '마요';
    expect(onNicknameChange).toHaveBeenCalledWith(expectedNickname);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('거절된 뒤 수정을 취소하면 거절 사유가 사라지고 서버가 인정한 닉네임이 보인다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={vi.fn()}
        rejection={{
          nickname: '케첩',
          message: '이미 사용 중인 닉네임입니다.',
        }}
      />,
    );
    const input = screen.getByRole('textbox');

    // when
    fireEvent.keyDown(input, { key: 'Escape' });

    // then
    const expectedNickname = '토마토';
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText(expectedNickname)).toBeTruthy();
  });

  it('거절된 닉네임을 고쳐서 다시 확정하면 거절 표시가 사라진다', () => {
    // given
    const nickname = '토마토';
    render(
      <ParticipantNickname
        nickname={nickname}
        onNicknameChange={vi.fn()}
        rejection={{
          nickname: '케첩',
          message: '이미 사용 중인 닉네임입니다.',
        }}
      />,
    );
    const input = screen.getByRole('textbox');
    const editArea = input.parentElement as HTMLElement;

    // when
    fireEvent.change(input, { target: { value: '마요' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // then
    expect(editArea.className).not.toContain('border-error');
    expect(editArea.className).not.toContain('animate-shake');
  });
});
