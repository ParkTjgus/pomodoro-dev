import wall1280 from '@/assets/wall-1280.webp?no-inline';
import wall1920 from '@/assets/wall-1920.webp';
import wall2560 from '@/assets/wall-2560.webp';
import floor1280 from '@/assets/floor-1280.webp';
import floor1920 from '@/assets/floor-1920.webp';
import floor2560 from '@/assets/floor-2560.webp';
import Desk from '@/assets/desk.svg?react';
import Lamp from '@/assets/lamp.svg?react';
import Shelf from '@/assets/shelf.svg?react';
import LPPlayer from '@/assets/lp_player.svg?react';
import { WALL_SIZES, FLOOR_SIZES } from './image-sizes';

function Pomodoro() {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      {/* 배경 레이어 */}
      <div className="grid h-full w-full grid-cols-1 grid-rows-[6fr_4fr]">
        <img
          className="h-full min-h-0 w-full object-cover object-bottom"
          src={wall2560}
          srcSet={`${wall1280} 1280w, ${wall1920} 1920w, ${wall2560} 2560w`}
          sizes={WALL_SIZES}
          alt="벽 이미지"
        />
        <img
          className="h-full min-h-0 w-full object-cover object-top"
          src={floor2560}
          srcSet={`${floor1280} 1280w, ${floor1920} 1920w, ${floor2560} 2560w`}
          sizes={FLOOR_SIZES}
          alt="바닥 이미지"
        />
      </div>

      {/* 콘텐츠 레이어 */}
      <div className="absolute inset-0">
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
          <Desk />
          <Lamp className="absolute bottom-18 -left-38 [&_.lamp-outline]:opacity-0 hover:[&_.lamp-outline]:opacity-100" />
        </div>
        <div className="absolute right-14.5 bottom-[40%]">
          <Shelf />
          <LPPlayer className="absolute top-23.5 left-0 [&_.lp-outline]:opacity-0 hover:[&_.lp-outline]:opacity-100" />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
