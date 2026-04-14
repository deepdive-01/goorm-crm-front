import type { DashBoardProps } from "../../../types/dashBoard.types";

// 대시보드 컴포넌트

const colorMap = {
  blue: { bg: "bg-semantic-blueSoft", text: "text-primary-500" },
  green: { bg: "bg-semantic-greenSoft", text: "text-semantic-green" },
  purple: { bg: "bg-semantic-purpleSoft", text: "text-semantic-purple" },
  orange: { bg: "bg-semantic-yellowSoft", text: "text-semantic-orange" },
};

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
  color,
}: DashBoardProps) {
  const { bg, text } = colorMap[color || "blue"];

  return (
    <>
      <div className="flex flex-col gap-4 border-2 rounded-lg p-[36px] w-[440px]">
        <div className="flex gap-[10px] items-center">
          {/* 상단 이미지와 제목 */}
          <img
            className={`w-[44px] h-[44px] ${bg} p-[10px] rounded-[12px]`}
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
          <div className="flex justify-between w-full text-body2 text-gray-500">
            {firstTitle}
            <span className="text-black">{firstValue}</span>
          </div>
          <div className="flex justify-between w-full text-body2 text-gray-500">
            {secondTitle}
            <span className="text-black">{secondValue}</span>
          </div>
          <div className="flex justify-between w-full text-body2 text-gray-500">
            {thirdTitle}
            <span className="text-black">{thirdValue}</span>
          </div>
        </div>
        <div className={`text-body2 ${text}`}>
          <button>{routeButton}</button>
        </div>
      </div>
    </>
  );
}
