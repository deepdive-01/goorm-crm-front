type SpinnerProps = {
  size?: number;
};

/** API 통신 중 로딩 상태를 나타내는 인디케이터 */
export default function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div
      className="rounded-full border-2 border-gray-100 border-t-primary-500 animate-spin"
      style={{ width: size, height: size }}
    />
  );
}
