import { Table } from "@vapor-ui/core";

import { GRADES, GRADE_TEXT_COLORS } from "../gradeConfig";

// 등급별 선정기준·혜택 정보
// freeShipping: MEMBER는 미제공, BRONZE 이상부터 무료배송 제공
const GRADE_CONFIG = {
  MEMBER: { criteria: "가입시", discount: "3%", freeShipping: false },
  BRONZE: {
    criteria: "누적 구매금액 10만원 이상 시",
    discount: "5%",
    freeShipping: true,
  },
  SILVER: {
    criteria: "누적 구매금액 20만원 이상 시",
    discount: "7%",
    freeShipping: true,
  },
  GOLD: {
    criteria: "누적 구매금액 50만원 이상 시",
    discount: "할인 10% / 적립 7%",
    freeShipping: true,
  },
};

// 사용자 등급과 무관하게 모든 등급의 혜택 기준을 표시하는 정적 테이블
export default function GradeTable() {
  return (
    <Table.Root $css={{ width: "100%" }}>
      <Table.Header>
        <Table.Row className="bg-gray-50">
          <Table.Heading className="text-center">등급</Table.Heading>
          <Table.Heading className="text-center">선정기준</Table.Heading>
          <Table.Heading className="text-center">할인/적립</Table.Heading>
          <Table.Heading className="text-center">무료배송</Table.Heading>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {GRADES.map((grade) => {
          const { criteria, discount, freeShipping } = GRADE_CONFIG[grade];
          return (
            <Table.Row key={grade}>
              {/* 등급명은 등급별 색상으로 강조 */}
              <Table.Cell
                className={`text-center font-semibold ${GRADE_TEXT_COLORS[grade]}`}
              >
                {grade}
              </Table.Cell>
              <Table.Cell className="text-center">{criteria}</Table.Cell>
              <Table.Cell className="text-center">{discount}</Table.Cell>
              {/* 무료배송: BRONZE 이상 O, MEMBER는 - */}
              <Table.Cell className="text-center">
                {freeShipping ? "O" : "-"}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
