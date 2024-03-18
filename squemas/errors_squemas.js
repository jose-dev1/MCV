const createErrorFactory = function (name) {
  return class BusinessError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }
}

export const ConnectionError = createErrorFactory('ConnectionError')
export const NotFoundUser = createErrorFactory('User not found')
export const InvalidCredential = createErrorFactory('invalid Credential')
export const NoDataFound = createErrorFactory('Data not found')
export const DuplicateInfo = createErrorFactory('The information is duplicated')
export const AccountAlreadyDisable = createErrorFactory('Account already disable')
export const InfoAlreadyExisting = createErrorFactory('The information already exists')
export const DataAlreadyChange = createErrorFactory('The data alrready changed')
export const OccupiedSpace = createErrorFactory('Space is already ocuipated')
export const NotAllowed = createErrorFactory('action not allowed')
