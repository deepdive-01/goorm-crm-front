const fs = require('fs');

const msg = fs.readFileSync(process.argv[2], 'utf-8').trim();

// [GOO-9] message 형태
const regex = /^\[GOO-\d+\] .+/;

if (!regex.test(msg)) {
  console.error(
    '\n❌ 커밋 메시지 형식 오류\n\n형식: [GOO-번호] 메시지\n예: [GOO-9] user entity 구현\n',
  );
  process.exit(1);
}

console.log('✅ 커밋 메시지 통과');
