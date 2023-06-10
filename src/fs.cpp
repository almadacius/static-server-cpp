#include "fs.hpp"

#include <sys/stat.h>
#include <string>

using std::string;

// ================================================
bool Fs::exists(string& path) {
  struct stat buffer;
  int result = stat(path.c_str(), &buffer);
  return result == 0;
}
