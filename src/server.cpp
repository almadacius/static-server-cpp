#include "server.hpp"

#include "crow.h"

#include "fs.hpp"
#include "logger.hpp"

// ================================================
using std::string;

using crow::SimpleApp;
using crow::request;
using crow::response;

// ================================================
void Server::run() {
  SimpleApp app;

  app
    .port(3000)
    .multithreaded();

  CROW_ROUTE(app, "/<path>")(
    [this](request& req, response& res, string path){
      // string path = req.url_params.get("path");
      SimpleLogger::log("received request:");
      SimpleLogger::log(path);

      if(Fs::exists(path)) {
        res.end("file exists");
      }
      else {
        res.end("file does NOT exist");
      }
    }
  );

  SimpleLogger::log("start server");
  app.run();
}
