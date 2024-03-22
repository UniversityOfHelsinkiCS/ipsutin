import { User } from '@backend/types'

const mockUser: User = {
  id: 'hy-hlo-1441871',
  username: 'testuser',
  firstName: 'Testi',
  lastName: 'Kayttaja',
  email: 'grp-toska@helsinki.fi',
  language: 'fi',
  isAdmin: true,
  iamGroups: ['grp-toska', 'hy-mltdk-employees'],
  preferredFaculty: 'H50',
}

export default mockUser
