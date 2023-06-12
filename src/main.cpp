#include "headers/logger.hpp"
#include "headers/server.hpp"

#include <stdexcept>

using std::runtime_error;

// ================================================
void mainOperation(int argc, char* argv[]) {
  if(argc < 2) {
    throw runtime_error("base dir to serve not provided");
  }

  ServerConfig config;
  config.staticDir = argv[1];

  Server* server = new Server(config);
  server->run();
}

int main(int argc, char* argv[]) {
  SimpleLogger::tryRun([argc, argv](){
    mainOperation(argc, argv);
  });

  return 0;
}
