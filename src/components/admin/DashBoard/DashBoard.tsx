type DashBoardVariant = "명" | "건" | "개";

// 대시보드 타입 정의
type DashBoardProps = {
  dashBoardImage: string;
  color?: string;
  mainTitle: string;
  mainValue: string | number;
  mainValueVariant: DashBoardVariant;
  firstTitle: string;
  firstValue: string | number;
  secondTitle: string;
  secondValue: string | number;
  thirdTitle: string;
  thirdValue: string | number;
  routeButton: string;
};

// 대시보드 컴포넌트
export default function DashBoard({
  dashBoardImage,
  mainTitle,
  mainValue,
  mainValueVariant,
  firstTitle,
  firstValue,
  secondTitle,
  secondValue,
  thirdTitle,
  thirdValue,
  routeButton,
}: DashBoardProps) {
  return (
    <>
      <div className="flex flex-col gap-9 border-2 rounded-md p-[36px] max-w-[548px] max-h-[408px]">
        <div className="flex gap-[10px] items-center">
          {/* 상단 이미지와 제목 */}
          <img
            className="w-[44px] h-[44px] bg-semantic-blueSoft p-[10px] rounded-[12px]"
            src={dashBoardImage}
            alt="Dashboard"
          />

          <span className="text-h4">{mainTitle}</span>
        </div>

        <div className="text-h1">
          {mainValue} <span className="text-body1">{mainValueVariant}</span>
        </div>

        {/* 하단 내용 부분 */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between min-w-[125px] w-[336px] text-body2 text-gray-500">
            {firstTitle}
            <span className="text-black">{firstValue}</span>
          </div>
          <div className="flex justify-between min-w-[125px] w-[336px] text-body2 text-gray-500">
            {secondTitle}
            <span className="text-black">{secondValue}</span>
          </div>
          <div className="flex justify-between min-w-[125px] w-[336px] text-body2 text-gray-500">
            {thirdTitle}
            <span className="text-black">{thirdValue}</span>
          </div>
        </div>
        <div className="text-body2 text-primary-500">
          <button>{routeButton}</button>
        </div>
      </div>
    </>
  );
}
