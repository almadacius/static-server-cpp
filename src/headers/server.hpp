// [builder] implementation: lib/server.cpp
#ifndef SERVER_H
#define SERVER_H

#include <string>

using std::string;

// ================================================
struct ServerConfig {
  string staticDir;
};

// ================================================
class Server {
  private:
  const ServerConfig& config;

  public:
  Server(const ServerConfig& config);

  void ensureDir();

  void run();
};

#endif
