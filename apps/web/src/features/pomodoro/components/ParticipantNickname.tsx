import { useEffect, useState, type KeyboardEvent } from 'react';
import EditIcon from '@/assets/edit.svg?react';
import OkIcon from '@/assets/ok.svg?react';
import { cn } from '@/lib/cn';

interface NicknameRejection {
  nickname: string;
  message: string;
}

interface ParticipantNicknameProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  rejection?: NicknameRejection | null;
}

function ParticipantNickname({
  nickname,
  onNicknameChange,
  rejection = null,
}: ParticipantNicknameProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEditing = draft !== null;

  useEffect(() => {
    if (!rejection) {
      return;
    }

    setDraft(rejection.nickname);
    setError(rejection.message);
  }, [rejection]);

  const startEditing = () => {
    setDraft(nickname);
    setError(null);
  };

  const cancelEditing = () => {
    setDraft(null);
    setError(null);
  };

  const confirmEditing = () => {
    if (draft === null) {
      return;
    }

    setDraft(null);
    setError(null);
    onNicknameChange(draft);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      confirmEditing();
    }

    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleBlur = () => {
    if (!document.hasFocus()) {
      return;
    }

    cancelEditing();
  };

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div
        className={cn(
          'inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-transparent bg-white/60 px-3.5',
          error && 'border-error animate-shake',
        )}
      >
        {isEditing ? (
          <>
            <input
              autoFocus
              aria-label="닉네임 입력"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="field-sizing-content min-w-0 bg-transparent text-2xl leading-[normal] tracking-[2.4px] outline-none"
            />
            <button
              type="button"
              aria-label="닉네임 확인"
              onMouseDown={(event) => event.preventDefault()}
              onClick={confirmEditing}
              className="size-4"
            >
              <OkIcon className="size-full" />
            </button>
          </>
        ) : (
          <>
            <span className="text-2xl leading-[normal] tracking-[2.4px]">
              {nickname}
            </span>
            <button
              type="button"
              aria-label="닉네임 수정"
              onClick={startEditing}
              className="size-4"
            >
              <EditIcon className="size-full" />
            </button>
          </>
        )}
      </div>
      {error && (
        <p role="alert" className="text-error text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

export default ParticipantNickname;
