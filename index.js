const http = require("http");
const { read_file, write_file } = require("./file.manager/fs");

const uuid = require("uuid");

const opt = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
};

const app = http.createServer((req, res) => {
  const reqId = req.url.split("/")[req.url.split("/").length - 1];
  console.log(reqId);

  //  MArket   Crud ---------------------------------------------------------------------------------------

  // Market Get

  if (req.method === "GET" && req.url === "/get_market") {
    try {
      const file_d = read_file("market.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // market get one

  if (req.method === "GET" && req.url === `/get_market_one/${reqId}`) {
    try {
      const file_d = read_file("market.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //Market POST

  if (req.method === "POST" && req.url === "/add_market") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("market.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("market.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // market Put

  if (req.method === "PUT" && req.url === `/market_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("market.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("market.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// market
  // Delete market
  if(req.method === "DELETE" && req.url === `/del_market/${reqId}`){
    const file_d = read_file("market.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("market.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }

  // Cars ==============================================================================================================

  
  if (req.method === "GET" && req.url === "/get_cars") {
    try {
      const file_d = read_file("carshop.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // carshop get one

  if (req.method === "GET" && req.url === `/get_carshop_one/${reqId}`) {
    try {
      const file_d = read_file("carshop.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //carshop POST

  if (req.method === "POST" && req.url === "/add_carshop") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("carshop.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("carshop.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // carshop Put

  if (req.method === "PUT" && req.url === `/carshop_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("carshop.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("carshop.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// carshop
  // Delete carshop
  if(req.method === "DELETE" && req.url === `/del_carshop/${reqId}`){
    const file_d = read_file("carshop.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("carshop.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }


//   Flowers ================================================================================================


  
  if (req.method === "GET" && req.url === "/get_flower") {
    try {
      const file_d = read_file("flower.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // flower get one

  if (req.method === "GET" && req.url === `/get_flower_one/${reqId}`) {
    try {
      const file_d = read_file("flower.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //flower POST

  if (req.method === "POST" && req.url === "/add_flower") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("flower.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("flower.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // flower Put

  if (req.method === "PUT" && req.url === `/flower_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("flower.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("flower.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// flower
  // Delete flower
  if(req.method === "DELETE" && req.url === `/del_flower/${reqId}`){
    const file_d = read_file("flower.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("flower.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }


  // userss =======================================================================================================


  if (req.method === "GET" && req.url === "/get_phone") {
    try {
      const file_d = read_file("phone.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // phone get one

  if (req.method === "GET" && req.url === `/get_phone_one/${reqId}`) {
    try {
      const file_d = read_file("phone.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //phone POST

  if (req.method === "POST" && req.url === "/add_phone") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("phone.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("phone.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // phone Put

  if (req.method === "PUT" && req.url === `/phone_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("phone.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("phone.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// phone
  // Delete phone
  if(req.method === "DELETE" && req.url === `/del_phone/${reqId}`){
    const file_d = read_file("phone.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("phone.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }


// users ========================================================================================================================


  if (req.method === "GET" && req.url === "/get_users") {
    try {
      const file_d = read_file("users.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // users get one

  if (req.method === "GET" && req.url === `/get_users_one/${reqId}`) {
    try {
      const file_d = read_file("users.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //users POST

  if (req.method === "POST" && req.url === "/add_users") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("users.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("users.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // users Put

  if (req.method === "PUT" && req.url === `/users_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("users.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("users.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// users
  // Delete users
  if(req.method === "DELETE" && req.url === `/del_users/${reqId}`){
    const file_d = read_file("users.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("users.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }

//  ZAvod ==========================================================================


  if (req.method === "GET" && req.url === "/get_zavod") {
    try {
      const file_d = read_file("zavod.json");
      res.writeHead(200, opt);
      res.end(JSON.stringify(file_d));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }
  // zavod get one

  if (req.method === "GET" && req.url === `/get_zavod_one/${reqId}`) {
    try {
      const file_d = read_file("zavod.json");

      const find_file = file_d.find((item) => item.id === reqId);
      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      res.writeHead(200, opt);
      res.end(JSON.stringify(find_file));
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  //zavod POST

  if (req.method === "POST" && req.url === "/add_zavod") {
    try {
      req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { item, price, desc } = data;

        const file_d = read_file("zavod.json");

        file_d.push({
          id: uuid.v4(),
          item,
          price,
          desc,
        });
        write_file("zavod.json", file_d);

        res.writeHead(200, opt);
        res.end(
          JSON.stringify({
            messsage: "added",
          })
        );
      });
    } catch (error) {
      res.writeHead(500, opt);
      res.end(
        JSON.stringify({
          messagage: error.message,
        })
      );
    }
  }

  // zavod Put

  if (req.method === "PUT" && req.url === `/zavod_put/${reqId}`) {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const { item, price, desc } = data;
      const file_d = read_file("zavod.json");

      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }
      file_d.forEach(element => {
        if(element.id === reqId){
          element.item = item  ? item : element.item
          element.price = price  ? price : element.price
          element.desc = desc  ? desc : element.desc
        }
      })
      
      write_file("zavod.json" , file_d)
      res.writeHead(200,opt)
      res.end(JSON.stringify({
        message : "Updated"
      }))
    });
  }
// zavod
  // Delete zavod
  if(req.method === "DELETE" && req.url === `/del_zavod/${reqId}`){
    const file_d = read_file("zavod.json")
      const find_file = file_d.find((item) => item.id === reqId);

      if (!find_file) {
        res.writeHead(404, opt);
        return res.end(
          JSON.stringify({
            message: "not found",
          })
        );
      }

      file_d.forEach((item,index) =>{
        if (item.id === reqId) {
          file_d.splice(index, 1)
        }
      })

      write_file("zavod.json", file_d)
      res.writeHead(200, opt)
      res.end(JSON.stringify({
        message : "DELETEd"
      }))
  }



});



app.listen(3000, () => {
  console.log("server is running");
});
