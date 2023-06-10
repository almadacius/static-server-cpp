#include "server.hpp"

// ================================================
int main() {
  Server* serverPtr = new Server();
  Server server = *serverPtr;
  server.run();

  return 0;
}
