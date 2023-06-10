#include "logger.hpp"

#include <sys/stat.h>
#include <string>
#include <iostream>

using std::string;
using std::cout;
using std::endl;

// ================================================
void SimpleLogger::log(string msg) {
  cout << msg << endl;
}
