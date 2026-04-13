type DashBoardVariant = "명" | "건" | "개";
type DashBoardColor = "blue" | "green" | "purple" | "orange";

export interface DashBoardProps {
  dashBoardImage: string;
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
  color?: DashBoardColor;
}
