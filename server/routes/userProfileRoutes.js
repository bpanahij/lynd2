var UserProfileApi = require('../api/userProfileApi');

var count = 0;
var userProfileRoute = {
  setupSocket:function (socket) {
    socket.on('getUserProfileById', function (data) {
      UserProfileApi.getUserProfileById(data.id, function (error, result) {
        if (error) {
          socket.emit('getUserProfileByIdError', error);
        } else {
          socket.emit("getUserProfileByIdResponse", result);
        }
      });
    });
    socket.on('getUserProfileByUsername', function (data) {
      UserProfileApi.getUserProfileByUsername(data.username, function (error, result) {
        if (error) {
          socket.emit('getUserProfileByUsernameError', error);
        } else {
          socket.emit("getUserProfileByUsernameResponse", result);
        }
      });
    });
    socket.on('getUserProfileByFacebookId', function (data) {
      UserProfileApi.getUserProfileByFacebookId(data, function (error, result) {
        if (error) {
          socket.emit('getUserProfileByFacebookIdError', error);
        } else {
          socket.emit("getUserProfileByFacebookIdResponse", result);
        }
      });
    });
    socket.on('updateUserProfileById', function (data) {
      UserProfileApi.updateUserProfileById(data, function (error, result) {
        if (error) {
          socket.emit('updateUserProfileByIdError', error);
        } else {
          socket.emit("updateUserProfileByIdResponse", result);
        }
      });
    });
    socket.on('updateUserProfileByUsername', function (data) {
      UserProfileApi.updateUserProfileByUsername(data, function (error, result) {
        if (error) {
          socket.emit('updateUserProfileByUsernameError', error);
        } else {
          socket.emit("updateUserProfileByUsernameResponse", result);
        }
      });
    });
    socket.on('addNewUserProfile', function (data) {
      UserProfileApi.addNewUserProfile(data, function (error, result) {
        if (error) {
          socket.emit('addNewUserProfileError', error);
        } else {
          socket.emit("addNewUserProfileResponse", result);
        }
      });
    });
  }
};

module.exports = userProfileRoute;
