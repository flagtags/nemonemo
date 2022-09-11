import { UserDocument } from '@models/user/user.schema';
import { UserEntity } from '@entities/user-entity/user-entity.service';

const convertUserDocumentToUserEntity = (
  userDocument: UserDocument,
): UserEntity => {
  const userEntity = new UserEntity(userDocument);

  return userEntity;
};

export default convertUserDocumentToUserEntity;
