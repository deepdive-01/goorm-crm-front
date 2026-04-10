import DashBoard from "../admin/DashBoard/DashBoard";

export default function DashBoardExample() {
  return (
    <>
      <DashBoard
        dashBoardImage="/admin/DashBoard/MemberManagement.svg"
        mainTitle="Main Title"
        mainValue="0"
        mainValueVariant="명"
        firstTitle="First Title"
        firstValue="0"
        secondTitle="Second Title"
        secondValue="0"
        thirdTitle="Third Title"
        thirdValue="0"
        routeButton="Route Button"
      />
    </>
  );
}
