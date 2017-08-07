// Cloud normal
module.exports = function updateRole(params) {
  /* 
 █████╗ ███████╗██╗   ██╗███╗   ██╗ ██████╗    ██╗ █████╗ ██╗    ██╗ █████╗ ██╗   ██╗
██╔══██╗██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝   ██╔╝██╔══██╗██║    ██║██╔══██╗╚██╗ ██╔╝
███████║███████╗ ╚████╔╝ ██╔██╗ ██║██║       ██╔╝ ███████║██║ █╗ ██║███████║ ╚████╔╝ 
██╔══██║╚════██║  ╚██╔╝  ██║╚██╗██║██║      ██╔╝  ██╔══██║██║███╗██║██╔══██║  ╚██╔╝  
██║  ██║███████║   ██║   ██║ ╚████║╚██████╗██╔╝   ██║  ██║╚███╔███╔╝██║  ██║   ██║   
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝╚═╝    ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   
                                                                                     */
  Parse.Cloud.define("testAsync", (req, res) => {
    (async () => {
      try {
        let isQueryAll = req.params.all !== undefined ? true : false;
        let userName =
          req.params.userName !== undefined
            ? req.params.userName
            : req.user.get("username");

        let roleName = req.params.roleName || req.params.role || req.params.r;
        !isQueryAll &&
          roleName === undefined &&
          res.error("Vui lòng nhập tên role");

        var userResult = await new Parse.Query(Parse.User)
          .equalTo("username", userName)
          .find({ useMasterKey: true });

        var roleResult = isQueryAll
          ? await new Parse.Query(Parse.Role)
              .equalTo("users", userResult[0])
              .find()
          : await new Parse.Query(Parse.Role)
              .equalTo("name", roleName)
              .equalTo("users", userResult[0])
              .find();

        res.success(
          isQueryAll ? res.success(roleResult) : res.success(roleResult[0])
        );
      } catch (error) {
        res.error(error.message);
      }
    })(); //end async
  }); //end define test Async

  //NEW

  Parse.Cloud.define("isInRole", (req, res) => {
    console.log(req);

    req.user === undefined && res.error("Vui lòng đăng nhập ");
    let roleName = req.params.roleName || req.params.role || req.params.r;
    roleName === undefined && res.error("Vui lòng nhập tên role");

    (async () => {
      var roleResult = await new Parse.Query(Parse.Role)
        .equalTo("name", roleName)
        .equalTo("users", req.user)
        .find();
      roleResult.length !== 0 ? res.success(true) : res.success(false);
    })();
  }); //kết thúc isInRole function.
}; //end cloud
