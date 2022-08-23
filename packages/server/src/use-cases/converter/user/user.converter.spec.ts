import { User as UserSchema } from '@models/user/user.schema';

test('Convert user schema to user entity', () => {
  // mock을 객체로 만들고 타입만 유저 스키마로 해서 넘기자.
  const userSchema;

  const userEntity = convertUserSchemaToUserEntity(userSchema);

  // userEntity의 속성 값들이 userSchema의 속성 값들과 같은지 확인하자.
});
