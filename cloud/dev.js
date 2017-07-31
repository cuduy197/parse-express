// Cloud normal
module.exports = function updateRole(params) {
  /* 
  _                       
 |_) ._ _  ._ _  o  _  _  
 |   | (_) | | | | _> (/_ 
                           */

  Parse.Cloud.define("checkRole", (req, res) => {
    let mode = req.params.mode || req.params.all;
    let userName =
      req.params.userName !== undefined
        ? req.params.userName
        : req.user.get("username");
    let roleName = req.params.roleName || req.params.role || req.params.r;
    //Promise query USER -> ROLE
    new Parse.Query(Parse.User)
      .equalTo("username", userName)
      .find({ useMasterKey: true })
      .then(userResult => {
        return mode === undefined
          ? new Parse.Query(Parse.Role)
              .equalTo("name", roleName)
              .equalTo("users", userResult[0])
              .find()
          : new Parse.Query(Parse.Role).equalTo("users", userResult[0]).find();
      })
      .then(roleResult => {
        if (mode === undefined) {
          roleResult.length !== 0
            ? res.success(`${userName} có trong role ${roleName} ✅`)
            : res.error(`${userName} không có trong role ${roleName} ️️⛔️`);
        } else {
          if (roleResult.length > 0) {
            let roleList = "";
            roleResult.forEach(role => {
              roleList =
                roleList.length !== 1
                  ? `${roleList}<li>👉 ${role.get("name")}</li>`
                  : role.get("name");
            });
            res.success(
              `😃 "${userName}" thuộc ${roleResult.length} role  ✅:<br>${roleList}<br>`
            );
          } else {
            res.error(`😃 "${userName}" chưa được thêm vào role nào ⛔️ `);
          }
        }
      })
      .catch(e => {
        res.error(e.message);
      });
  }); //end define checkRole

  /*   Parse.Cloud.define("isInRole", (req, res) => {
    let userName =
      req.params.userName !== undefined
        ? req.params.userName
        : req.user.get("username");
    let roleName = req.params.roleName || req.params.role || req.params.r;
    //Promise query USER -> ROLE
    new Parse.Query(Parse.User)
      .equalTo("username", userName)
      .find({ useMasterKey: true })
      .then(userResult => {
        return new Parse.Query(Parse.Role)
          .equalTo("name", roleName)
          .equalTo("users", userResult[0])
          .find();
      })
      .then(roleResult => {
        roleResult.length !== 0 ? res.success(true) : res.success(false);
      })
      .catch(e => {
        res.error(e.message);
      });
  }); //end define checkRole */

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
      adminCheckResult = await new Parse.Query(Parse.Role)
        .equalTo("name", "admin")
        .equalTo("users", req.user)
        .find();
      let isAdmin = adminCheckResult.length !== 0 ? true : false;

      if (isAdmin) {
        var roleResult = await new Parse.Query(Parse.Role)
          .equalTo("name", roleName)
          .equalTo("users", req.user)
          .find();
        roleResult.length !== 0 ? res.success(true) : res.success(false);
      } else {
        res.error("⛔️Bạn chưa có quyền quản trị để thực hiện!⛔️");
      }
    })();
  }); //kết thúc isInRole function.
}; //end cloud
