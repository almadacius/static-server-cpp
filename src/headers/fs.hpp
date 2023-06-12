// [builder] implementation: lib/fs.cpp
#ifndef FS_H
#define FS_H

#include <string>

using std::string;

class Fs {
  public:
  static bool exists(string& path);
};

#endif
