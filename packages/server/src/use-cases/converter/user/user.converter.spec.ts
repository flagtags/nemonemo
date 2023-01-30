import { UserDocument } from '@models/user/user.schema';
import convertUserDocumentToUserEntity from './user.converter';

test('Convert user schema to user entity', () => {
  const userDocument: UserDocument = {
    name: 'dante',
    userName: 'kkirico',
    password: '1234',
    isBanned: false,
  } as UserDocument;

  const userEntity = convertUserDocumentToUserEntity(userDocument);

  // userEntity의 속성 값들이 userDocument의 속성 값들과 같은지 확인하자.
  Object.keys(userDocument).forEach((key) => {
    expect(userEntity[key]).toEqual(userDocument[key]);
  });
});
