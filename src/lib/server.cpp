#include "headers/server.hpp"

#include "crow.h"

#include "headers/fs.hpp"
#include "headers/str.hpp"
#include "headers/logger.hpp"

#include <string>
#include <stdexcept>

// ================================================
using std::runtime_error;

using std::string;

using crow::SimpleApp;
using crow::request;
using crow::response;

// ================================================
Server::Server(const ServerConfig& config) : config(config) {
  // string message = str::formatString("static dir: {}", config.staticDir);
  // str::formatString("static dir: {}", "ser", "aber");
  // SimpleLogger::logHeader(message);

  // string message = str::concatenate("aa", "bb", 25);
  // string message = str::concatenate("aa", "bb");
  string message = str::concat("aa");
  SimpleLogger::logHeader(message);
  // str::concatenate("a");
}

void Server::ensureDir() {
  string staticDir = config.staticDir;

  if(!Fs::exists(staticDir)) {
    throw runtime_error("static dir does NOT exist");
  }
}

void Server::run() {
  this->ensureDir();

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
