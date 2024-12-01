export enum APIEndpoint {
  // Default
  Alive = '/api/alive', // GET
  UploadImage = '/api/upload', //POST

  // Auth
  Login = '/api/auth/token', // POST
  Register = '/api/auth/register', // POST
  OtpVerify = '/api/auth/verify-otp', // POST
  ResendOtp = '/api/auth/resend-otp', // POST

  // User
  UserDetails = '/api/user', // GET
  ChangePassword = '/api/user/change-password', // POST
  ChangeRole = '/api/user/change-role', //POST
  UpdateUserDetails = '/api/user/update', //PUT
  GetUserByID = '/api/user/profile/', //GET
  UpdateAvatar = '/api/user/update-avatar', //PATCH
  UpdateCoverPhoto = '/api/user/update-cover-photo', //PATCH

  // Poster
  PosterHome = '/api/poster/posted-jobs', //GET
  PosterJobCount = '/api/poster/job-count', //GET

  // Tasker
  taskHomeData = '/api/tasker/home', //GET
  CheckOnlineStatus = '/api/tasker/check-online-status', //GET
  VerificationStatus = '/api/tasker/verification-status', //GET
  ChangeTaskerWorkStatus = '/api/tasker/change-work-status', //POST
}
