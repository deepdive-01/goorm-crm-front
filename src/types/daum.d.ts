interface DaumPostcodeData {
  zonecode: string; // 우편번호
  address: string; // 기본 주소
  addressType: "R" | "J"; // R: 도로명, J: 지번
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
  width?: string | number;
  height?: string | number;
}

interface DaumPostcodeConstructor {
  new (options: DaumPostcodeOptions): {
    open: () => void;
  };
}

interface Daum {
  Postcode: DaumPostcodeConstructor;
}

interface Window {
  daum: Daum;
}
