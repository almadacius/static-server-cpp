#include "headers/logger.hpp"
#include "headers/fs.hpp"
// #include "headers/server.hpp"

#include <stdexcept>
#include <iostream>
#include <filesystem>

using std::runtime_error;

// ================================================
void mainOperation(int argc, char* argv[]) {
  if(argc < 2) {
    throw runtime_error("base dir to serve not provided");
  }

  string execPathRel = argv[0];
  string execPathAbs = fs::absPath(execPathRel);

  std::cout << "BB " << execPathAbs << std::endl;

  std::cout << "AAA " << argv[0] << std::endl;
  std::cout << "AA " << argv[1] << std::endl;

  // ServerConfig config;
  // config.staticDir = argv[1];
  //
  // Server* server = new Server(config);
  // server->run();
}

int main(int argc, char* argv[]) {
  SimpleLogger::tryRun([argc, argv](){
    mainOperation(argc, argv);
  });

  return 0;
}
